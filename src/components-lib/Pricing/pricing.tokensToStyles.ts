import type { PricingTokens } from '@/pages/Renderer/CompositionType'
import type { PricingStyles } from '@/components-lib/Pricing/pricing.types'

export function pricingTokensToStyles(tokens: PricingTokens): PricingStyles {
  return {
    background:           tokens.background,
    heading_color:        tokens.heading_color,
    subheading_color:     tokens.subheading_color,
    heading_size:         tokens.heading_size,
    heading_weight:       tokens.heading_weight,
    card_bg:              tokens.card_bg,
    card_radius:          tokens.card_radius,
    card_border:          tokens.card_border,
    featured_card_bg:     tokens.featured_card_bg,
    featured_card_border: tokens.featured_card_border,
    body_color:           tokens.body_color,
    price_color:          tokens.price_color,
    feature_color:        tokens.feature_color,
    btn_primary_bg:       tokens.btn_primary_bg,
    btn_primary_color:    tokens.btn_primary_color,
    btn_outline_color:    tokens.btn_outline_color,
    btn_outline_border:   tokens.btn_outline_border,
    btn_radius:           tokens.btn_radius,
    padding:              tokens.padding,
    toggle_active:        tokens.toggle_active,
    toggle_inactive:      tokens.toggle_inactive,
  }
}