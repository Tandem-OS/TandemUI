import type { PricingTokens } from '@/pages/Renderer/CompositionType'
import type { PricingStyles } from '@/components-lib/Pricing/pricing.types'

export function pricingTokensToStyles(tokens: PricingTokens): PricingStyles {
  return {
    // ─── Section 
    background:                tokens['background'],
    padding:                   tokens['padding'],

    // ─── Heading 
    heading_color:             tokens['heading-color'],
    subheading_color:          tokens['subheading-color'],
    heading_size:              tokens['heading-size'],
    heading_weight:            tokens['heading-weight'],

    // ─── Card ───
    card_bg:                   tokens['card-surface'],
    card_radius:               tokens['card-radius'],
    card_border:               tokens['card-border'],
    card_shadow:               tokens['card-shadow'],
    card_padding:              tokens['card-padding'],

    // ─── Featured card 
    featured_card_bg:          tokens['featured-card-background'],
    featured_card_border:      tokens['featured-card-border'],

    // ─── Badge ─
    badge_bg:                  tokens['badge-background'],
    badge_color:               tokens['badge-text'],

    // ─── Body / feature text 
    body_color:                tokens['subheading-color'],
    feature_color:             tokens['feature-text-color'],

    // ─── Price ─
    price_color:               tokens['price-color'],
    price_suffix_color:        tokens['price-suffix-color'],
    currency_label_color:      tokens['currency-label-color'],

    // ─── CTA 
    btn_primary_bg:            tokens['cta-background'],
    btn_primary_color:         tokens['cta-text'],
    featured_btn_bg:           tokens['featured-cta-background'],
    featured_btn_color:        tokens['featured-cta-text'],


    // ─── Toggle 
    toggle_active:             tokens['toggle-active-background'],
    toggle_inactive:           tokens['toggle-background'],
    toggle_active_text:        tokens['toggle-active-text'],
    toggle_inactive_text:      tokens['toggle-inactive-text'],

    // ─── Misc 
    billing_note_color:        tokens['billing-note-color'],
    footer_note_color:         tokens['footer-note-color'],
    upgrade_action_color:      tokens['upgrade-action-color'],
    logos_color:               tokens['logos-color'],
    summary_color:             tokens['summary-color'],
    expand_icon_color:         tokens['expand-icon-color'],
    comparison_note_color:     tokens['comparison-note-color'],
  }
}