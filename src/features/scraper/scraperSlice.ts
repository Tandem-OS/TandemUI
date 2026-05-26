import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createScraper } from '@/lib/requests/ScraperRequest';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TasteProfile = Record<string, number>;

export interface ScrapedSection {
  id: string;
  category?: string;
  section_type?: string;
  tone?: string;
  layout_structure?: string;
  tasteScore?: number;
  confidence_score?: number;
  metadata?: {
    tone?: string;
    layout_structure?: string;
    insight?: string;
    intent?: string;
    section_type?: string;
    tags?: string[];
  };
  [key: string]: unknown;
}

export interface ExtractionSummary {
  total: number;
  failed: number;
  usable: number;
  all_failed: boolean;
  message: string | null;
}

export interface ScrapedData {
  url: string;
  analyzedAt: Date | string;
  sections: ScrapedSection[];
  usage?: {
    current_count: number;
    limit: number | null;
  };
  extraction_summary?: ExtractionSummary;
}

export type LayoutPlan = ScrapedSection[];

// ─── Scraper error types — each maps to a distinct UI state ──────────────────

export type ScraperErrorType =
  | 'usage_limit_pro'       // 403 — Pro plan limit hit
  | 'usage_limit_daily'     // 429 — Daily rate limit hit
  | 'extraction_failed'     // 200 OK but all sections are garbage / auth-walled
  | 'partial_extraction'    // 200 OK but some sections failed
  | 'network_error'         // Network/timeout failure
  | 'server_error'          // 500 from backend
  | 'unknown'               // Catch-all

export interface ScraperError {
  type: ScraperErrorType;
  message: string;
  retryAfterSeconds?: number;
  usable?: number;
  total?: number;
}

export interface ScraperState {
  url: string;
  status: 'idle' | 'loading' | 'success' | 'error' | 'partial';
  scrapedData: ScrapedData | null;
  tasteProfile: TasteProfile | null;
  layoutPlan: LayoutPlan | null;
  error: ScraperError | null;
}

// ─── Thunk payload types ──────────────────────────────────────────────────────

interface ScrapePayload {
  designer_email: string;
  client_email: string | null;
  project_id?: string | null;
  role: string;
  url: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns true if a section was flagged as extraction_failed by the backend.
 * These sections have confidence_score=0.0 and tags containing 'extraction_failed'.
 */
function isExtractionFailed(section: ScrapedSection): boolean {
  return (
    section.confidence_score === 0.0 &&
    (section.metadata?.tags ?? []).includes('extraction_failed')
  );
}

/**
 * Filter out extraction_failed sections from scrapedData.sections
 * so compose and swiper never receive garbage content.
 */
function filterUsableSections(sections: ScrapedSection[]): ScrapedSection[] {
  return sections.filter((s) => !isExtractionFailed(s));
}

/**
 * Build a typed ScraperError from a backend error response or JS error.
 */
function buildScraperError(
  status: number | undefined,
  data: any,
  fallbackMessage?: string
): ScraperError {
  // 403 — Pro plan usage limit
  if (status === 403 && data?.code === 'USAGE_LIMIT_REACHED') {
    return {
      type: 'usage_limit_pro',
      message:
        data?.message ??
        'You have reached your usage limit. Upgrade to Pro for unlimited scraper runs.',
    };
  }

  // 429 — Daily rate limit
  if (status === 429) {
    return {
      type: 'usage_limit_daily',
      message:
        data?.message ??
        'Daily scraping limit reached. Please try again tomorrow.',
      retryAfterSeconds: data?.retry_after_seconds ?? 86400,
    };
  }

  // 500 — Server error
  if (status && status >= 500) {
    return {
      type: 'server_error',
      message: 'Something went wrong on our end. Please try again in a moment.',
    };
  }

  // Network error (no status)
  if (!status) {
    return {
      type: 'network_error',
      message:
        fallbackMessage ??
        'Could not reach the server. Check your connection and try again.',
    };
  }

  return {
    type: 'unknown',
    message: fallbackMessage ?? 'An unexpected error occurred. Please try again.',
  };
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: ScraperState = {
  url: '',
  status: 'idle',
  scrapedData: null,
  tasteProfile: null,
  layoutPlan: null,
  error: null,
};

// ─── Thunk ────────────────────────────────────────────────────────────────────

export const scrapeUrl = createAsyncThunk<
  ScrapedData,
  ScrapePayload,
  { rejectValue: ScraperError }
>(
  'scraper/scrapeUrl',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createScraper(payload);

      if (!response?.data) {
        return rejectWithValue({
          type: 'unknown',
          message: 'Scraper returned no data. Please try again.',
        });
      }

      const data = response.data;
      const summary: ExtractionSummary | undefined = data.extraction_summary;

      // --- All sections failed — auth wall / JS-rendered page ---
      if (summary?.all_failed) {
        return rejectWithValue({
          type: 'extraction_failed',
          message:
            summary.message ??
            'Could not extract meaningful content from this URL. ' +
            'The page may be behind a login or heavily JavaScript-rendered.',
          usable: 0,
          total: summary.total,
        });
      }

      // --- Partial failure — some sections extracted, some failed ---
      // Return success with partial data; slice will set status='partial'
      return {
        ...data,
        url: payload.url,
        usage: data.usage ?? null,
        // Only expose usable sections to the rest of the app
        sections: filterUsableSections(data.sections ?? []),
        extraction_summary: summary,
      } as ScrapedData;

    } catch (error: any) {
      const status: number | undefined = error.response?.status;
      const data = error.response?.data;

      return rejectWithValue(buildScraperError(status, data, error.message));
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const scraperSlice = createSlice({
  name: 'scraper',
  initialState,
  reducers: {
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },

    setScrapedDataFromIdea(state, action: PayloadAction<ScrapedData>) {
      state.scrapedData = action.payload;
      state.status = 'success';
      state.error = null;
    },

    updateTaste(
      state,
      action: PayloadAction<{
        action: 'like' | 'dislike';
        tone: string;
        layout_structure: string;
      }>
    ) {
      const { action: feedback, tone, layout_structure } = action.payload;
      const key = `${tone}_${layout_structure}`;
      if (!state.tasteProfile) {
        state.tasteProfile = {};
      }
      state.tasteProfile[key] =
        (state.tasteProfile[key] ?? 0) + (feedback === 'like' ? 1 : -1);
    },

    clearTaste(state) {
      state.tasteProfile = null;
    },

    addToLayoutPlan(state, action: PayloadAction<ScrapedSection>) {
      if (!state.layoutPlan) {
        state.layoutPlan = [];
      }
      state.layoutPlan.push(action.payload);
    },

    updateLayoutPlan(state, action: PayloadAction<LayoutPlan>) {
      state.layoutPlan = action.payload;
    },

    clearError(state) {
      state.error = null;
    },

    resetScraper() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      // ── Pending ────────────────────────────────────────────────────────────
      .addCase(scrapeUrl.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.scrapedData = null;
      })

      // ── Fulfilled ──────────────────────────────────────────────────────────
      .addCase(scrapeUrl.fulfilled, (state, action) => {
        const summary = action.payload.extraction_summary;

        // Partial — some sections extracted but not all
        if (summary && summary.failed > 0 && !summary.all_failed) {
          state.status = 'partial';
          state.error = {
            type: 'partial_extraction',
            message: `${summary.usable} of ${summary.total} sections extracted successfully. Some content could not be read.`,
            usable: summary.usable,
            total: summary.total,
          };
        } else {
          state.status = 'success';
          state.error = null;
        }

        state.scrapedData = action.payload;
        state.url = action.payload.url;
      })

      // ── Rejected ───────────────────────────────────────────────────────────
      .addCase(scrapeUrl.rejected, (state, action) => {
        state.status = 'error';
        state.scrapedData = null;

        // action.payload is typed ScraperError when rejectWithValue was used
        // action.error.message is a string when an unhandled JS error escaped
        state.error = action.payload ?? {
          type: 'unknown',
          message:
            action.error?.message ??
            'An unexpected error occurred. Please try again.',
        };
      });
  },
});

export const {
  setUrl,
  setScrapedDataFromIdea,
  updateTaste,
  clearTaste,
  addToLayoutPlan,
  updateLayoutPlan,
  clearError,
  resetScraper,
} = scraperSlice.actions;

export default scraperSlice.reducer;
