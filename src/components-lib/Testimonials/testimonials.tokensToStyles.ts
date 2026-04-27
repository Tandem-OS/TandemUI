import type { TestimonialsTokens } from './testimonials.types';

export interface TestimonialsStyles {
  wrapper:        string;
  heading:        string;
  sectionHeading: string;
  subheading:     string;
  body:           string;
  mutedBody:      string;
  eyebrow:        string;
  label:          string;
  meta:           string;
  card:           string;
  accent:         string;
  action:         string;
}

export function tokensToTestimonialsStyles(tokens: TestimonialsTokens): TestimonialsStyles {
  if (!tokens) {
    throw new Error('tokensToTestimonialsStyles: tokens is required');
  }

  return {
    wrapper:        `${tokens.background} ${tokens.spacing}`,
    heading:        tokens['heading-scale'],
    sectionHeading: tokens['section-heading-scale'],
    subheading:     tokens['text-role'],
    body:           `${tokens['text-role']} ${tokens['body-scale']}`,
    mutedBody:      tokens['text-role'],
    eyebrow:        tokens['eyebrow-scale'],
    label:          tokens['label-scale'],
    meta:           tokens['meta-scale'],
    card:           tokens.surface,
    accent:         tokens['text-role'],
    action:         tokens['action-style'],
  };
}