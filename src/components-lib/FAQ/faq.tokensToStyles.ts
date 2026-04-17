import type { FAQTokens, FAQStyles } from './faq.types'

export function faqTokensToStyles(tokens: FAQTokens): FAQStyles {
  if (!tokens) {
    throw new Error('faqTokensToStyles: tokens is required');
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
    divider:        tokens.divider,
  }
}