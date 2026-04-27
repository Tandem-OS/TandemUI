import type { CTATokens } from './cta.types';

export interface CTAStyles {
  wrapper: string;
  wrapperBg: string;
  heading: string;
  sectionHeading: string;
  body: string;
  mutedBody: string;
  eyebrow: string;
  label: string;
  meta: string;
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
    wrapper:        tokens.spacing ?? '',
    wrapperBg:      tokens.background,
        heading: tokens['heading-scale'],
    sectionHeading: tokens['section-heading-scale'],
    body: `${tokens['text-role']} ${tokens['body-scale']}`,
    mutedBody: tokens['text-role'],
    eyebrow: tokens['eyebrow-scale'],
    label: tokens['label-scale'],
    meta: tokens['meta-scale'],
    action: tokens['action-style'],
    surface: tokens.surface,
    footerWrapper: tokens['footer-background'],
    footerText: tokens['footer-text'],
  };
}