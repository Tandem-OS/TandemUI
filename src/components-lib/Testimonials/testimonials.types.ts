import type { TestimonialsStyles } from './testimonials.tokensToStyles';

export type TestimonialsLayoutStructure =
  | 'video-grid'
  | 'featured-stats'
  | 'notes'
  | 'carousel';

// ─── Tokens (semantic strings from DB)
export interface TestimonialsTokens {
  spacing: string;
  surface: string;
  'text-role': string;
  background: string;
  'body-scale': string;
  'action-style': string;
  'heading-scale': string;
}

// ─── Video Grid
export interface TestimonialsVideoItem {
  title: string;
  speakers: string[];
  description: string;
  speaker_label: string;
  video_thumbnail_alt: string;
  video_thumbnail_url: string;
}

export interface TestimonialsVideoGridSlot {
  section_heading: string;
  testimonials: TestimonialsVideoItem[];
}

// ─── Featured Stats
export interface TestimonialsStat {
  label: string;
  value: string;
}

export interface TestimonialsFeaturedStatsSlot {
  quote: string;
  author_name: string;
  author_role: string;
  company_name: string;
  rating_stars: number;
  author_avatar_text: string;
  stats: TestimonialsStat[];
}

// ─── Notes
export interface TestimonialsNoteItem {
  quote: string;
  author_name: string;
  author_date: string;
}

export interface TestimonialsNotesSlot {
  section_heading: string;
  section_cta: string;
  testimonial_notes: TestimonialsNoteItem[];
}

// ─── Carousel
export interface TestimonialsCarouselControls {
  left_control: string;
  right_control: string;
}

export interface TestimonialsCarouselSlot {
  quote: string;
  author_name: string;
  author_role: string;
  rating_stars: number;
  author_supporting_text: string;
  carousel_controls: TestimonialsCarouselControls;
  carousel_indicators: string[];
}

// ─── DB contract props (used by validateTestimonialsProps, slotToTestimonialsProps, TestimonialsBase)
export interface TestimonialsVideoGridProps {
  layoutStructure: 'video-grid';
  tokens: TestimonialsTokens;
  slot: TestimonialsVideoGridSlot;
}

export interface TestimonialsFeaturedStatsProps {
  layoutStructure: 'featured-stats';
  tokens: TestimonialsTokens;
  slot: TestimonialsFeaturedStatsSlot;
}

export interface TestimonialsNotesProps {
  layoutStructure: 'notes';
  tokens: TestimonialsTokens;
  slot: TestimonialsNotesSlot;
}

export interface TestimonialsCarouselProps {
  layoutStructure: 'carousel';
  tokens: TestimonialsTokens;
  slot: TestimonialsCarouselSlot;
}

export type TestimonialsProps =
  | TestimonialsVideoGridProps
  | TestimonialsFeaturedStatsProps
  | TestimonialsNotesProps
  | TestimonialsCarouselProps;

// ─── Shell props (render-time — TestimonialsBase adds styles before passing to shells)
export type TestimonialsVideoGridShellProps      = TestimonialsVideoGridProps      & { styles: TestimonialsStyles };
export type TestimonialsFeaturedStatsShellProps  = TestimonialsFeaturedStatsProps  & { styles: TestimonialsStyles };
export type TestimonialsNotesShellProps          = TestimonialsNotesProps          & { styles: TestimonialsStyles };
export type TestimonialsCarouselShellProps       = TestimonialsCarouselProps       & { styles: TestimonialsStyles };

export type TestimonialsShellProps =
  | TestimonialsVideoGridShellProps
  | TestimonialsFeaturedStatsShellProps
  | TestimonialsNotesShellProps
  | TestimonialsCarouselShellProps;