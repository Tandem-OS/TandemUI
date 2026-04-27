import type { FooterTokens } from './footer.types';

export interface FooterStyles {
  wrapper:        string;
  heading:        string;
  sectionHeading: string;
  body:           string;
  mutedBody:      string;
  eyebrow:        string;
  label:          string;
  meta:           string;
  action:         string;
  bottomBar:      string;
  overlayText:    string;
}

export function tokensToFooterStyles(tokens: FooterTokens): FooterStyles {
  if (!tokens) {
    throw new Error('tokensToFooterStyles: tokens is required');
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
    bottomBar:      tokens['bottom-bar'],
overlayText: tokens['overlay-text'] ?? '',
  };
}