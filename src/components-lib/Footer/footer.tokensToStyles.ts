import type { FooterTokens } from './footer.types';

export interface FooterStyles {
  wrapper: string;
  heading: string;
  body: string;
  action: string;
  surface: string;
  bottomBar: string;
  subheading: string;
}

export function tokensToFooterStyles(tokens: FooterTokens): FooterStyles {
  if (!tokens) {
    throw new Error('tokensToFooterStyles: tokens is required');
  }

  return {
    wrapper:    `${tokens.background} ${tokens.spacing}`,
    heading:    tokens['heading-scale'],
    body:       `${tokens['text-role']} ${tokens['body-scale']}`,
    action:     tokens['action-style'],
    surface:    tokens.surface,
    bottomBar:  tokens['bottom-bar'],
    subheading: tokens['text-role'],
  };
}