import type { CTATokens } from './cta.types';

export interface CTAStyles {
  wrapper: string;
  heading: string;
  body: string;
  action: string;
  surface: string;
  footerWrapper: string;
  footerText: string;
}

export function tokensToCTAStyles(tokens: CTATokens): CTAStyles {
  if (!tokens) {
    throw new Error('tokensToCTAStyles: tokens is required');
  }

  return {
    wrapper: `${tokens.background} ${tokens.spacing}`,
    heading: tokens['heading-scale'],
    body: `${tokens['text-role']} ${tokens['body-scale']}`,
    action: tokens['action-style'],
    surface: tokens.surface,
    footerWrapper: tokens['footer-background'],
    footerText: tokens['footer-text'],
  };
}