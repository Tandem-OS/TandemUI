import type { TestimonialsTokens } from './testimonials.types';

export interface TestimonialsStyles {
  wrapper: string;
  heading: string;
  subheading: string;
  body: string;
  card: string;
  accent: string;
  action: string;
}

export function tokensToTestimonialsStyles(tokens: TestimonialsTokens): TestimonialsStyles {
  if (!tokens) {
    throw new Error('tokensToTestimonialsStyles: tokens is required');
  }

  return {
    wrapper: `bg-[${tokens.background}] ${tokens.spacing}`,
    heading: tokens['heading-scale'],
    subheading: tokens['text-role'],
    body: `${tokens['text-role']} ${tokens['body-scale']}`,
    card: `bg-[${tokens.surface}]`,
    accent: tokens['text-role'],
    action: tokens['action-style'],
  };
}