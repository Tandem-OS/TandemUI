import type { ContactTokens } from './contact.types';

export interface ContactStyles {
  wrapper:        string;
  heading:        string;
  sectionHeading: string;
  body:           string;
  mutedBody:      string;
  eyebrow:        string;
  label:          string;
  meta:           string;
  action:         string;
  surface:        string;
  formSurface:    string;
}

export function tokensToContactStyles(tokens: ContactTokens): ContactStyles {
  if (!tokens) {
    throw new Error('tokensToContactStyles: tokens is required');
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
    action:         tokens['action-style'],
    surface:        tokens.surface,
    formSurface:    tokens['form-surface'],
  };
}