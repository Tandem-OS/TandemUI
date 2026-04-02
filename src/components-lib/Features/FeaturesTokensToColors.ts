// ── Features Tokens → Colors

import type { FeaturesTokens, FeaturesColors } from './features.types'
export type { FeaturesColors, FeaturesTokens }

export function featuresTokensToColors(tokens: FeaturesTokens): FeaturesColors {
  return {
    background:     tokens.background,
    text_color:     tokens.text_color,
    card_bg:        tokens.card_bg,
    card_radius:    tokens.card_radius,
    padding:        tokens.padding,
    heading_size:   tokens.heading_size,
    heading_weight: tokens.heading_weight,
  }
}