import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import {
  postCompose,
  getCompose,
  postRefine,
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

export interface CompositionState {
  compositionId: string | null;
  projectId: string | null;
  pageSchema: PageSchema | null;
  thumbnails: Thumbnails | null;
  thumbnailStatus: ThumbnailStatus;
  thumbnailError: string | null;
  // NOTE: html_snapshot intentionally excluded — large string, per SMA spec
}

// ─── Polling Config ───────────────────────────────────────────────────────────

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 20; // 20 × 3s = 60s max

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
      dispatch(pollForThumbnails({ compositionId: data.composition_id }));

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
    { dispatch, rejectWithValue }
  ) => {
    try {
      const data = await postRefine({
        composition_id: payload.compositionId,
        sections: payload.sections,
        user_instruction: payload.userInstruction,
      });
      dispatch(pollForThumbnails({ compositionId: data.composition_id }));
      return {
        compositionId: data.composition_id,
        pageSchema: data.page_schema,
      };
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.detail ?? err.message ?? 'Failed to refine composition'
      );
    }
  }
);
export const pollForThumbnails = createAsyncThunk(
  'composition/pollThumbnails',
  async (
    payload: { compositionId: string },
    { rejectWithValue }
  ) => {
    for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));

      try {
        const data = await getCompose(payload.compositionId);

        if (data.thumbnails !== null) {
          return { thumbnails: data.thumbnails as Thumbnails, pageSchema: data.page_schema };
        }
        // thumbnails still null — keep polling
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

    // ── refineComposition ──
    builder
      .addCase(refineComposition.pending, (state) => {
        state.thumbnailStatus = 'refining';
        state.thumbnailError = null;
      })
      .addCase(refineComposition.fulfilled, (state, action) => {
        state.compositionId = action.payload.compositionId;
        state.pageSchema = action.payload.pageSchema;
        state.thumbnails = null;
      })
      .addCase(refineComposition.rejected, (state, action) => {
        state.thumbnailStatus = 'error';
        state.thumbnailError = action.payload as string;
      });
  },
});

export const {
  resetComposition,
  clearThumbnailError,
  setThumbnailStatus,
} = compositionSlice.actions;

export default compositionSlice.reducer;