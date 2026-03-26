import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import {
  postCompose,
  getCompose,
  postRefine,
  getVersions,
  getVersionByNumber,
  postRestoreVersion,
} from '@/lib/requests/CompositionRequest';
import type { PageSchema } from '@/lib/requests/CompositionRequest';


// ─── Types ────────────────────────────────────────────────────────────────────

export interface Thumbnails {
  desktop: string; // 1440px screenshot URL
  tablet: string;  // 768px screenshot URL
  mobile: string;  // 375px screenshot URL
}

export type ThumbnailStatus =
  | 'idle'
  | 'composing'   // POST /compose in flight
  | 'generating'  // polling, thumbnails not yet ready
  | 'ready'       // thumbnails available
  | 'refining'
  | 'error';
export type VersionEntry = {
  version_number: number;
  refine_prompt: string;
  stacking_version: string;
  created_at: string;
};

export type VersionsState = {
  versions: VersionEntry[];
  currentVersion: number | null;
  status: 'idle' | 'loading' | 'error';
  restoreStatus: 'idle' | 'loading' | 'error';
};
export interface CompositionState {
  compositionId: string | null;
  projectId: string | null;
  pageSchema: PageSchema | null;
  thumbnails: Thumbnails | null;
  thumbnailStatus: ThumbnailStatus;
  thumbnailError: string | null;
  isRefining: boolean;
  versions: VersionsState;

  // NOTE: html_snapshot intentionally excluded — large string, per SMA spec
}

// ─── Polling Config ───────────────────────────────────────────────────────────

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 20; // 20 × 3s = 60s max
let activePollPromise: { abort: () => void } | null = null;


// ─── Async Thunks ─────────────────────────────────────────────────────────────

/**
 * Step 1 — POST /compose
 * Call ONCE after KOH completes with winner_ids.
 * NEVER call again to re-poll — each call creates a new DB row.
 */
export const submitComposition = createAsyncThunk(
  'composition/submit',
  async (
    payload: { winnerIds: string[]; projectId: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const data = await postCompose({
        winner_ids: payload.winnerIds,
        project_id: payload.projectId,
      });

      // thumbnails will be null here — expected, not an error
      activePollPromise?.abort();
      activePollPromise = dispatch(pollForThumbnails({ compositionId: data.composition_id }));

      return {
        compositionId: data.composition_id,
        projectId: payload.projectId,
      };
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.detail ?? err.message ?? 'Failed to submit composition'
      );
    }
  }
);

/**
 * Step 2 — GET /compose/{id} polling
 * Polls every 3s up to 20 attempts (60s timeout).
 * Only dispatched internally by submitComposition — never call POST again.
 */
export const refineComposition = createAsyncThunk(
  'composition/refine',
  async (
    payload: { compositionId: string; sections: string[]; userInstruction: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await postRefine({
        composition_id: payload.compositionId,
        sections: payload.sections,
        user_instruction: payload.userInstruction,
      });
     return {
        compositionId: data.composition_id,
        pageSchema: data.updated_sections,
        chatResponse: data.chat_response,
        currentVersion: data.current_version as number ?? null,
      };
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.detail ?? err.message ?? 'Failed to refine composition'
      );
    }
  }
);
export const fetchVersions = createAsyncThunk(
  'composition/fetchVersions',
  async (projectId: string, { rejectWithValue }) => {
  try {
      const data = await getVersions(projectId);
      return {
        versions: data.versions as VersionEntry[],
        currentVersion: data.current_version as number,
      };
    } catch (err: any) {
      return rejectWithValue(err.message ?? 'Failed to fetch versions');
    }
  }
);
export const fetchVersionByNumber = createAsyncThunk(
  'composition/fetchVersionByNumber',
  async (
    payload: { projectId: string; versionNumber: number },
    { rejectWithValue }
  ) => {
 try {
      const data = await getVersionByNumber(payload.projectId, payload.versionNumber);
      return {
        pageSchema: data.page_schema,
        chatResponse: data.chat_response as string,
        reasoning: data.reasoning as string,
        refinePrompt: data.refine_prompt as string,
        isCurrent: data.is_current as boolean,
      };
    } catch (err: any) {
      return rejectWithValue(err.message ?? 'Failed to fetch version');
    }
  }
);
export const restoreVersion = createAsyncThunk(
  'composition/restoreVersion',
  async (
    payload: { projectId: string; targetVersion: number },
    { dispatch, rejectWithValue }
  ) => {
try {
      const data = await postRestoreVersion(payload.projectId, payload.targetVersion);

      // Reload composition so canvas picks up restored schema

      dispatch(setPageSchema(data.page_schema));
      dispatch(fetchVersions(payload.projectId));

      return { newCompositionId: data.composition_id as string };
    } catch (err: any) {
      return rejectWithValue(err.message ?? 'Failed to restore version');
    }
  }
);
export const pollForThumbnails = createAsyncThunk(
  'composition/pollThumbnails',
  async (
    payload: { compositionId: string },
    { rejectWithValue, signal }
  ) => {
    for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
      if (signal.aborted) return rejectWithValue('Polling cancelled');

      // Abort-aware sleep
      await new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, POLL_INTERVAL_MS);
        signal.addEventListener('abort', () => {
          clearTimeout(timer);
          resolve();
        }, { once: true });
      });

      if (signal.aborted) return rejectWithValue('Polling cancelled');

      try {
        const data = await getCompose(payload.compositionId);
        if (data.thumbnails !== null) {
          return { thumbnails: data.thumbnails as Thumbnails, pageSchema: data.page_schema };
        }
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.detail ?? err.message ?? 'Polling request failed'
        );
      }
    }

    return rejectWithValue('Thumbnails timed out after 60 seconds. Please retry.');
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: CompositionState = {
  compositionId: null,
  projectId: null,
  pageSchema: null,
  thumbnails: null,
  thumbnailStatus: 'idle',
  thumbnailError: null,
  isRefining: false,
  versions: {                    // ← add from here
    versions: [],
    currentVersion: null,
    status: 'idle',
    restoreStatus: 'idle',
  },
};

const compositionSlice = createSlice({
  name: 'composition',
  initialState,
  reducers: {
    resetComposition: () => initialState,

    clearThumbnailError: (state) => {
      state.thumbnailError = null;
      state.thumbnailStatus = 'idle';
    },

    setThumbnailStatus: (state, action: PayloadAction<ThumbnailStatus>) => {
      state.thumbnailStatus = action.payload;
    },

    setPageSchema: (state, action: PayloadAction<any>) => {
      state.pageSchema = action.payload;
    },

    setProjectId: (state, action: PayloadAction<string>) => {
      state.projectId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ── submitComposition ──
    builder
      .addCase(submitComposition.pending, (state) => {
        state.thumbnailStatus = 'composing';
        state.thumbnailError = null;
        state.thumbnails = null;
      })
      .addCase(submitComposition.fulfilled, (state, action) => {
        state.compositionId = action.payload.compositionId;
        state.projectId = action.payload.projectId;
        // status moves to 'generating' via pollForThumbnails.pending
      })
      .addCase(submitComposition.rejected, (state, action) => {
        state.thumbnailStatus = 'error';
        state.thumbnailError = action.payload as string;
      });

    // ── pollForThumbnails ──
    builder
      .addCase(pollForThumbnails.pending, (state) => {
        state.thumbnailStatus = 'generating';
      })
      .addCase(pollForThumbnails.fulfilled, (state, action) => {
        state.thumbnails = action.payload.thumbnails;
        state.pageSchema = action.payload.pageSchema;
        state.thumbnailStatus = 'ready';
        state.thumbnailError = null;
      })
      .addCase(pollForThumbnails.rejected, (state, action) => {
        state.thumbnailStatus = 'error';
        state.thumbnailError = action.payload as string;
      });
    // ── fetchVersions ──
    builder
      .addCase(fetchVersions.pending, (state) => {
        state.versions.status = 'loading';
      })
      .addCase(fetchVersions.fulfilled, (state, action) => {
        state.versions.versions = action.payload.versions;
        state.versions.currentVersion = action.payload.currentVersion;
        state.versions.status = 'idle';
      })
      .addCase(fetchVersions.rejected, (state) => {
        state.versions.status = 'error';
      });

    // ── restoreVersion ──
    builder
      .addCase(restoreVersion.pending, (state) => {
        state.versions.restoreStatus = 'loading';
      })
      .addCase(restoreVersion.fulfilled, (state) => {
        state.versions.restoreStatus = 'idle';
      })
      .addCase(restoreVersion.rejected, (state) => {
        state.versions.restoreStatus = 'error';
      });
    // ── refineComposition ──
    builder
      .addCase(refineComposition.pending, (state) => {
        state.isRefining = true;
      })
      .addCase(refineComposition.fulfilled, (state, action) => {
        state.isRefining = false;
        state.versions.currentVersion = action.payload.currentVersion ?? state.versions.currentVersion;

        if (state.pageSchema?.sections) {
          // pageSchema exists — merge by category
          action.payload.pageSchema.forEach((updatedSection: any) => {
            const index = state.pageSchema!.sections.findIndex(
              s => s.category === updatedSection.category
            );
            if (index !== -1) {
              state.pageSchema!.sections[index] = updatedSection;
            }
          });
        } else {
          // pageSchema null — store as-is, will be incomplete but better than nothing
          state.pageSchema = { sections: action.payload.pageSchema } as any;
        }
      })
      .addCase(refineComposition.rejected, (state) => {
        state.isRefining = false;
      });
  },
});

export const {
  resetComposition,
  clearThumbnailError,
  setThumbnailStatus,
  setPageSchema,
  setProjectId,
} = compositionSlice.actions;

export default compositionSlice.reducer;