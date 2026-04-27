import type { TimelineStyles } from './timeline.tokensToStyles';

export type TimelineLayoutStructure =
  | 'vertical_editorial'
  | 'alternating_media';

// ─── Tokens
export interface TimelineTokens {
  spacing: string;
  surface: string;
  'text-role': string;
  background: string;
  'body-scale': string;
  'action-style': string;
  'heading-scale': string;
  'section-heading-scale': string;
  'eyebrow-scale':         string;
  'label-scale':           string;
  'meta-scale':            string;
}

// ─── Shared
export interface TimelineVerticalItem {
  year: string;
  title: string;
  description: string;
}

export type TimelineAlignmentValue = 'left_media' | 'right_media';

export interface TimelineAlternatingItem {
  title: string;
  eyebrow: string;
  alignment: TimelineAlignmentValue;
  image_alt: string;
  image_url: string;
  description: string;
}

// ─── Vertical Editorial Slot
export interface TimelineVerticalEditorialSlot {
  section_label: string;
  timeline_variant: 'vertical_editorial';
  timeline_items: TimelineVerticalItem[];
}

// ─── Alternating Media Slot
export interface TimelineAlternatingMediaSlot {
  timeline_variant: 'alternating_media';
  timeline_items: TimelineAlternatingItem[];
}

// ─── Props
export interface TimelineVerticalEditorialProps {
  layoutStructure: 'vertical_editorial';
  tokens: TimelineTokens;
  slot: TimelineVerticalEditorialSlot;
}

export interface TimelineAlternatingMediaProps {
  layoutStructure: 'alternating_media';
  tokens: TimelineTokens;
  slot: TimelineAlternatingMediaSlot;
}

export type TimelineProps =
  | TimelineVerticalEditorialProps
  | TimelineAlternatingMediaProps;

// ─── Shell props
export type TimelineVerticalEditorialShellProps = TimelineVerticalEditorialProps & { styles: TimelineStyles };
export type TimelineAlternatingMediaShellProps  = TimelineAlternatingMediaProps  & { styles: TimelineStyles };

export type TimelineShellProps =
  | TimelineVerticalEditorialShellProps
  | TimelineAlternatingMediaShellProps;