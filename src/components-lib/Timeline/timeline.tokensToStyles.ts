import type { TimelineTokens } from './timeline.types';

export interface TimelineStyles {
  wrapper:        string;
  heading:        string;
  sectionHeading: string;
  body:           string;
  mutedBody:      string;
  eyebrow:        string;
  label:          string;
  meta:           string;
}

export function tokensToTimelineStyles(tokens: TimelineTokens): TimelineStyles {
  if (!tokens) {
    throw new Error('tokensToTimelineStyles: tokens is required');
  }

  return {
    wrapper:        `${tokens.background} ${tokens.spacing}`,
    heading:        tokens['heading-scale'],
    sectionHeading: tokens['section-heading-scale'],
    body:           `${tokens['text-role']} ${tokens['body-scale']}`,
    mutedBody:      tokens['text-role'],
    eyebrow:        tokens['eyebrow-scale'],
    label:          tokens['label-scale'],
    meta:           tokens['meta-scale'],
  };
}