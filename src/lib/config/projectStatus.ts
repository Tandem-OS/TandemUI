// src/lib/constants/projectStatus.ts
// ─── Single source of truth for all backend project status strings ────────────
// Never use raw backend status strings in UI. Always use this file.
// Backend statuses: intake | scraping | swiping | embedded | composing |
//                   refining | revisions | completed | handoff

// ─── Types ────────────────────────────────────────────────────────────────────

export type ApiStatus =
  | 'intake'
  | 'scraping'
  | 'swiping'
  | 'embedded'
  | 'composing'
  | 'refining'
  | 'revisions'
  | 'completed'
  | 'handoff';

export type UiStatus = 'in-progress' | 'reviewing' | 'final-review' | 'completed';

export type ProjectStage = 'scraper' | 'swiper' | 'testimonial' | 'finalReview';

// ─── Pipeline order ───────────────────────────────────────────────────────────

export const PIPELINE_ORDER: ApiStatus[] = [
  'intake',
  'scraping',
  'swiping',
  'embedded',
  'composing',
  'refining',
  'revisions',
  'completed',
  'handoff',
];

// ─── Progress percentages ─────────────────────────────────────────────────────

export const STATUS_TO_PROGRESS: Record<ApiStatus, number> = {
  intake:    10,
  scraping:  20,
  swiping:   35,
  embedded:  45,
  composing: 55,
  refining:  65,
  revisions: 75,
  completed: 90,
  handoff:   100,
};

// ─── Human-readable labels ────────────────────────────────────────────────────
// These are what appear in badges, cards, and any UI surface.
// 'handoff' and 'scraping' etc. must NEVER appear raw in the UI.

export const STATUS_LABEL: Record<ApiStatus, string> = {
  intake:    'Getting Started',
  scraping:  'Gathering Inspiration',
  swiping:   'Training Taste',
  embedded:  'Processing',
  composing: 'Composing',
  refining:  'Refining',
  revisions: 'In Review',
  completed: 'Completed',
  handoff:   'Delivered',
};

// ─── UI status buckets (for badge colour logic) ───────────────────────────────

export const STATUS_TO_UI_STATUS: Record<ApiStatus, UiStatus> = {
  intake:    'in-progress',
  scraping:  'in-progress',
  swiping:   'in-progress',
  embedded:  'reviewing',
  composing: 'reviewing',
  refining:  'reviewing',
  revisions: 'final-review',
  completed: 'completed',
  handoff:   'completed',
};

// ─── Current action stage (which surface to navigate to) ─────────────────────

export const STATUS_TO_STAGE: Record<ApiStatus, ProjectStage> = {
  intake:    'scraper',
  scraping:  'scraper',
  swiping:   'swiper',
  embedded:  'swiper',
  composing: 'swiper',
  refining:  'swiper',
  revisions: 'finalReview',
  completed: 'finalReview',
  handoff:   'finalReview',
};

// ─── Timeline stage labels (for ProjectTimeline component) ───────────────────

export const STAGE_LABEL: Record<ApiStatus, string> = {
  intake:    'Intake',
  scraping:  'Scraping',
  swiping:   'Swiping',
  embedded:  'Embedded',
  composing: 'Composing',
  refining:  'Refining',
  revisions: 'Revisions',
  completed: 'Completed',
  handoff:   'Handoff',
};

// ─── Helper functions ─────────────────────────────────────────────────────────

/** Returns human-readable label. Falls back gracefully for unknown statuses. */
export const getStatusLabel = (apiStatus: string | null | undefined): string => {
  if (!apiStatus) return 'Not started';
  return STATUS_LABEL[apiStatus as ApiStatus] ?? apiStatus;
};

/** Returns UI status bucket for badge colour logic. */
export const getUiStatus = (apiStatus: string | null | undefined): UiStatus => {
  if (!apiStatus) return 'in-progress';
  return STATUS_TO_UI_STATUS[apiStatus as ApiStatus] ?? 'in-progress';
};

/** Returns progress percentage 0–100. */
export const getProgress = (apiStatus: string | null | undefined): number => {
  if (!apiStatus) return 0;
  return STATUS_TO_PROGRESS[apiStatus as ApiStatus] ?? 0;
};

/** Returns which app surface to navigate to for the current stage. */
export const getProjectStage = (apiStatus: string | null | undefined): ProjectStage => {
  if (!apiStatus) return 'scraper';
  return STATUS_TO_STAGE[apiStatus as ApiStatus] ?? 'scraper';
};

/** Derives per-stage completed/active state for the timeline component. */
export const deriveStages = (
  apiStatus: string | null | undefined
): Record<ApiStatus, { completed: boolean; active: boolean }> => {
  const currentIdx = apiStatus ? PIPELINE_ORDER.indexOf(apiStatus as ApiStatus) : -1;
  return Object.fromEntries(
    PIPELINE_ORDER.map((stage, idx) => [
      stage,
      { completed: idx < currentIdx, active: idx === currentIdx },
    ])
  ) as Record<ApiStatus, { completed: boolean; active: boolean }>;
};

/** Returns 'completed' | 'current' | 'pending' for a specific stage dot. */
export const deriveStageStatus = (
  stageId: string,
  currentStatus: string | null | undefined
): 'completed' | 'current' | 'pending' => {
  if (!currentStatus) return 'pending';
  const currentIdx = PIPELINE_ORDER.indexOf(currentStatus as ApiStatus);
  const stageIdx = PIPELINE_ORDER.indexOf(stageId as ApiStatus);
  if (stageIdx < currentIdx) return 'completed';
  if (stageIdx === currentIdx) return 'current';
  return 'pending';
};