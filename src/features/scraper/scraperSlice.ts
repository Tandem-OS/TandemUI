import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createScraper } from '@/lib/requests/ScraperRequest';

// ─── Types 

export type TasteProfile = Record<string, number>;

export interface ScrapedSection {
  id: string;
  category?: string;
  section_type?: string;
  tone?: string;
  layout_structure?: string;
  tasteScore?: number;
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

export interface ScrapedData {
  url: string;
  analyzedAt: Date | string;
  sections: ScrapedSection[];
}

export type LayoutPlan = ScrapedSection[];

export interface ScraperState {
  url: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  scrapedData: ScrapedData | null;
  tasteProfile: TasteProfile | null;
  layoutPlan: LayoutPlan | null;
  error: string | null;
}

// ─── Thunk payload types ──────────────────────────────────────────────────────

interface ScrapePayload {
  designer_email: string;
  client_email: string | null;
  project_id: string;
  role: string;
  url: string;
}

// ─── Initial state 

const initialState: ScraperState = {
  url: '',
  status: 'idle',
  scrapedData: null,
  tasteProfile: null,
  layoutPlan: null,
  error: null,
};

// ─── Thunk ─

export const scrapeUrl = createAsyncThunk<
  ScrapedData,
  ScrapePayload,
  { rejectValue: string }
>(
  'scraper/scrapeUrl',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createScraper(payload);
      if (!response?.data) {
        return rejectWithValue('Scraper returned no data');
      }
      return { ...response.data, url: payload.url } as ScrapedData;
    } catch (error: any) {
      if (error.response?.status === 429) {
        return rejectWithValue(
          error.response.data?.message ?? 'Daily scraping limit reached.'
        );
      }
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

// ─── Slice ─

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
    },

    updateTaste(
      state,
      action: PayloadAction<{ action: 'like' | 'dislike'; tone: string; layout_structure: string }>
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

    resetScraper() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(scrapeUrl.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.scrapedData = null;
      })
      .addCase(scrapeUrl.fulfilled, (state, action) => {
        state.status = 'success';
        state.scrapedData = action.payload;
        state.url = action.payload.url;
        state.error = null;
      })
      .addCase(scrapeUrl.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload ?? 'Unknown error';
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
  resetScraper,
} = scraperSlice.actions;

export default scraperSlice.reducer;
