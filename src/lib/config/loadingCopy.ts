/**
 * loadingCopy
 *
 * Human-readable loading messages for every long-running task in Tandem.
 * Always use these instead of writing inline copy.
 *
 * Usage:
 *   import { LOADING_COPY } from '@/lib/constants/loadingCopy';
 *   <GlobalSpinner {...LOADING_COPY.scraping} />
 */

export interface LoadingCopy {
  message: string;
  subMessage?: string;
}

export const LOADING_COPY = {
  // Scraper
  scraping: {
    message: "Scanning your site",
    subMessage: "Reading design signals and layout patterns…",
  },

  // Composition
  composing: {
    message: "Building your page",
    subMessage: "Applying your taste profile to generate a layout…",
  },

  // Refine
  refining: {
    message: "Refining your design",
    subMessage: "Applying your instructions to the layout…",
  },

  // Version restore
  restoringVersion: {
    message: "Restoring this version",
    subMessage: "Rewinding your page to an earlier state…",
  },

  // Export / delivery
  exporting: {
    message: "Preparing your export",
    subMessage: "Getting your files ready for download…",
  },

  // Swiper round save
  savingRound: {
    message: "Saving your selections",
    subMessage: "Recording match results and preparing the next round…",
  },

  // King of the Hill save
  savingKOH: {
    message: "Locking in your pick",
    subMessage: "Recording your top choice for this round…",
  },

  // Generic fallback — avoid using this directly
  loading: {
    message: "Loading",
    subMessage: "Just a moment…",
  },
} as const satisfies Record<string, LoadingCopy>;