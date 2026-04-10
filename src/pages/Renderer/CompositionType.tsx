// ── Nav — types owned by nav.types.ts ─────────────────────────────────────
export type {
  NavLink,
  NavSlots,
  NavTokens,
  NavColors,
  NavComposeSection,
} from '@/components-lib/Nav/nav.types'

// ── Features — types owned by features.types.ts ───────────────────────────
export type {
  FeaturesAction,
  FeaturesItem,
  FeaturesSlots,
  FeaturesTokens,
  FeaturesColors,
  FeaturesComposeSection,
} from '@/components-lib/Features/features.types'

// ── Hero ──────────────────────────────────────────────────────────────────
export interface ComposeSectionTokens {
  background?: string
  heading_color?: string
  subheading_color?: string
  btn_primary_bg?: string
  btn_primary_color?: string
  btn_outline_border?: string
  padding?: string
  link_size?: string
  btn_radius?: string
  [key: string]: string | undefined
}

export interface ComposeSectionSlots {
  hero_heading?: string | null
  hero_subheading?: string | null
  hero_media?: string | null
  hero_media_slides?: string[] | null
  hero_cta_primary?: string | null
  hero_cta_secondary?: string | null
  hero_primary_action?: string | null
  hero_primary_href?: string | null
  hero_primary_variant?: string | null
  hero_secondary_action?: string | null
  hero_secondary_href?: string | null
  hero_secondary_variant?: string | null
  hero_animated?: boolean | null
  [key: string]: string | string[] | import('@/components-lib/Nav/nav.types').NavLink[] | boolean | null | undefined
}

export interface HeroColors {
  background?: string
  heading_color?: string
  subheading_color?: string
  text_color?: string
  btn_primary_bg?: string
  btn_primary_color?: string
  btn_primary_border?: string
  btn_primary_hover_bg?: string
  btn_primary_hover_color?: string
  btn_primary_hover_border?: string
  btn_outline_bg?: string
  btn_outline_color?: string
  btn_outline_border?: string
  btn_outline_hover_bg?: string
  btn_outline_hover_color?: string
  btn_outline_hover_border?: string
  btn_radius?: string
  padding?: string
}

export interface HeroAction {
  label: string
  target: string
  variant?: 'primary' | 'outline' | 'ghost'
  aria_label?: string
}

export interface HeroComposeSection {
  position: number
  category: 'hero'
  component_id: string
  layout_structure?: string
  tags: string[]
  content_slots: ComposeSectionSlots
  tokens: ComposeSectionTokens
}

// ── Pricing 
export interface PricingPlanRawAction {
  label: string
  target: string
  variant?: string | null
  aria_label?: string | null
}

export interface PricingPlanRaw {
  id?: string | null
  title: string
  price: string | null
  price_suffix?: string | null
  price_annual?: string | null
  currency_label?: string | null
  description?: string | null
  features?: string[] | null
  is_featured?: boolean | null
  featured_badge?: string | null
  action?: PricingPlanRawAction | null
}

export interface PricingSlots {
  pricing_heading?: string | null
  pricing_subheading?: string | null
  pricing_plans?: PricingPlanRaw[] | null
  pricing_billing_toggle?: boolean | null
  pricing_billing_note?: string | null
  pricing_logos?: string[] | null
  [key: string]: unknown
}

export interface PricingTokens {
  'background'?: string
  'padding'?: string
  'heading-color'?: string
  'subheading-color'?: string
  'heading-size'?: string
  'heading-weight'?: string
  'card-surface'?: string
  'card-radius'?: string
  'card-border'?: string
  'card-shadow'?: string
  'card-padding'?: string
  'featured-card-background'?: string
  'featured-card-border'?: string
  'badge-background'?: string
  'badge-text'?: string
  'feature-text-color'?: string
  'price-color'?: string
  'price-suffix-color'?: string
  'currency-label-color'?: string
  'cta-background'?: string
  'cta-text'?: string
  'featured-cta-background'?: string
  'featured-cta-text'?: string
  'toggle-active-background'?: string
  'toggle-background'?: string
  'toggle-active-text'?: string
  'toggle-inactive-text'?: string
  'billing-note-color'?: string
  'footer-note-color'?: string
  'upgrade-action-color'?: string
  'logos-color'?: string
  'summary-color'?: string
  'expand-icon-color'?: string
  'comparison-note-color'?: string
  [key: string]: string | undefined
}

export interface PricingComposeSection {
  position: number
  category: 'pricing'
  component_id: string
  layout_structure?: string
  tags: string[]
  content_slots: PricingSlots
  tokens: PricingTokens
}
// ── FAQ 
export interface FAQComposeSection {
  position: number
  category: 'faq'
  component_id: string
  layout_structure?: string
  tags: string[]
  content_slots: any
  tokens: any
}
// ── Discriminated union 
import type { NavComposeSection } from '@/components-lib/Nav/nav.types'
import type { FeaturesComposeSection } from '@/components-lib/Features/features.types'

export type ComposeSection =
  | NavComposeSection
  | HeroComposeSection
  | FeaturesComposeSection
  | PricingComposeSection
  | FAQComposeSection