import type { TimelineTokens } from './timeline.types';

export interface TimelineStyles {
  wrapper: string;
  heading: string;
  body: string;
  action: string;
  surface: string;
  subheading: string;
}

export function tokensToTimelineStyles(tokens: TimelineTokens): TimelineStyles {
  if (!tokens) {
    throw new Error('tokensToTimelineStyles: tokens is required');
  }

  return {
    wrapper:    `${tokens.background} ${tokens.spacing}`,
    heading:    tokens['heading-scale'],
    body:       `${tokens['text-role']} ${tokens['body-scale']}`,
    action:     tokens['action-style'],
    surface:    tokens.surface,
    subheading: tokens['text-role'],
  };
}