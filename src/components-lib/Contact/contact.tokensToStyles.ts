import type { ContactTokens } from './contact.types';

export interface ContactStyles {
  wrapper: string;
  heading: string;
  body: string;
  action: string;
  surface: string;
  formSurface: string;
  subheading: string;
}

export function tokensToContactStyles(tokens: ContactTokens): ContactStyles {
  if (!tokens) {
    throw new Error('tokensToContactStyles: tokens is required');
  }

  return {
    wrapper:    `${tokens.background} ${tokens.spacing}`,
    heading:    tokens['heading-scale'],
    body:       `${tokens['text-role']} ${tokens['body-scale']}`,
    action:     tokens['action-style'],
    surface:    tokens.surface,
    formSurface: tokens['form-surface'],
    subheading: tokens['text-role'],
  };
}