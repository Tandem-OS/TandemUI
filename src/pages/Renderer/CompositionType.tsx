// ── Nav
export interface NavLink {
  href: string;
  label: string;
}

export interface NavSlots {
  nav_logo?: string | null;
  nav_links?: NavLink[] | null;
  nav_cta?: string | null;
}

export interface NavTokens {
  background?: string;
  text_color?: string;
  padding?: string;
  link_size?: string;
  btn_radius?: string;
  btn_primary_bg?: string;
  btn_primary_color?: string;
  link_gap?: string;
  logo_height?: string;
  link_weight?: string;
  btn_padding?: string;
  btn_weight?: string;
  container_max_width?: string;
  [key: string]: string | undefined;
}

export interface NavColors {
  background?: string;
  text?: string;
  btnBg?: string;
  btnText?: string;
  btnRadius?: string;
  btnHoverBg?: string;
  btnHoverText?: string;
}

// ── Hero
export interface ComposeSectionTokens {
  background?: string;
  heading_color?:    string;
  subheading_color?: string;
  btn_primary_bg?: string;
  btn_primary_color?: string;
  btn_outline_border?: string;
  padding?: string;
  link_size?: string;
  btn_radius?: string;
  [key: string]: string | undefined;
}

export interface ComposeSectionSlots {
  hero_heading?: string | null;
  hero_subheading?: string | null;
  hero_media?: string | null;
  hero_media_slides?: string[] | null;
  hero_cta_primary?: string | null;
  hero_cta_secondary?: string | null;
  hero_primary_action?: string | null;
  hero_primary_href?: string | null;
  hero_primary_variant?: string | null;
  hero_secondary_action?: string | null;
  hero_secondary_href?: string | null;
  hero_secondary_variant?: string | null;
  hero_animated?: boolean | null;
  [key: string]: string | string[] | NavLink[] | boolean | null | undefined;
}

// ── Features
export interface FeaturesTokens {
  background?: string;
  text_color?: string;
  card_bg?: string;
  card_radius?: string;
  padding?: string;
  heading_size?: string;
  heading_weight?: string;
  [key: string]: string | undefined;
}

export interface FeaturesColors {
  background?: string;
  text_color?: string;
  card_bg?: string;
  card_radius?: string;
  padding?: string;
  heading_size?: string;
  heading_weight?: string;
}

export interface FeaturesAction {
  label: string;
  target: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  aria_label?: string;
}

export interface FeaturesItem {
  title: string;
  description?: string;
  image?: string;
}

export interface FeaturesSlots {
  features_heading?: string;
  features_subheading?: string;
  features_variant?: string;
  features_items?: FeaturesItem[];
  features_media?: string;
  features_primary_action?: FeaturesAction;
  features_secondary_action?: FeaturesAction;
}

// ── Discriminated section types
export interface NavComposeSection {
  position: number;
  category: 'nav';
  component_id: string;
  layout_structure?: string;
  tags: string[];
  content_slots: NavSlots;
  tokens: NavTokens;
}

export interface HeroComposeSection {
  position: number;
  category: 'hero';
  component_id: string;
  layout_structure?: string;
  tags: string[];
  content_slots: ComposeSectionSlots;
  tokens: ComposeSectionTokens;
}

export interface FeaturesComposeSection {
  position: number;
  category: 'features';
  component_id: string;
  layout_structure?: string;
  tags: string[];
  content_slots: FeaturesSlots;
  tokens: FeaturesTokens;
}

export interface HeroColors {
  background?:               string;
  heading_color?:            string;
  subheading_color?:         string;
  text_color?:               string;
  btn_primary_bg?:           string;
  btn_primary_color?:        string;
  btn_primary_border?:       string;
  btn_primary_hover_bg?:     string;
  btn_primary_hover_color?:  string;
  btn_primary_hover_border?: string;
  btn_outline_bg?:           string;
  btn_outline_color?:        string;
  btn_outline_border?:       string;
  btn_outline_hover_bg?:     string;
  btn_outline_hover_color?:  string;
  btn_outline_hover_border?: string;
  btn_radius?:               string;
  padding?:                  string;
}

export interface HeroAction {
  label:        string;
  target:       string;
  variant?:     'primary' | 'outline' | 'ghost';
  aria_label?:  string;
}

// ── Pricing

export interface PricingPlanRawAction {
  label:       string
  target:      string
  variant?:    string | null
  aria_label?: string | null
}

export interface PricingPlanRaw {
  id?:             string | null
  title:           string
  price:           string | null
  price_suffix?:   string | null
  price_annual?:   string | null
  currency_label?: string | null
  description?:    string | null
  features?:       string[] | null
  is_featured?:    boolean | null
  featured_badge?: string | null
  action?:         PricingPlanRawAction | null
}

export interface PricingSlots {
  pricing_heading?:        string | null
  pricing_subheading?:     string | null
  pricing_plans?:          PricingPlanRaw[] | null
  pricing_billing_toggle?: boolean | null
  pricing_billing_note?:   string | null
  pricing_logos?:          string[] | null
  [key: string]: unknown
}

// ── Pricing tokens — kebab-case keys matching the backend payload exactly
export interface PricingTokens {
  'background'?:                  string
  'padding'?:                     string

  // Heading
  'heading-color'?:               string
  'subheading-color'?:            string
  'heading-size'?:                string
  'heading-weight'?:              string

  // Card
  'card-surface'?:                string
  'card-radius'?:                 string
  'card-border'?:                 string
  'card-shadow'?:                 string
  'card-padding'?:                string

  // Featured card
  'featured-card-background'?:    string
  'featured-card-border'?:        string

  // Badge
  'badge-background'?:            string
  'badge-text'?:                  string

  // Body / feature text
  'feature-text-color'?:          string

  // Price
  'price-color'?:                 string
  'price-suffix-color'?:          string
  'currency-label-color'?:        string

  // CTA
  'cta-background'?:              string
  'cta-text'?:                    string
  'featured-cta-background'?:     string
  'featured-cta-text'?:           string

  // Toggle
  'toggle-active-background'?:    string
  'toggle-background'?:           string
  'toggle-active-text'?:          string
  'toggle-inactive-text'?:        string

  // Misc
  'billing-note-color'?:          string
  'footer-note-color'?:           string
  'upgrade-action-color'?:        string
  'logos-color'?:                 string
  'summary-color'?:               string
  'expand-icon-color'?:           string
  'comparison-note-color'?:       string

  [key: string]: string | undefined
}

export interface PricingComposeSection {
  position:          number
  category:          'pricing'
  component_id:      string
  layout_structure?: string
  tags:              string[]
  content_slots:     PricingSlots
  tokens:            PricingTokens
}

export type ComposeSection =
  | NavComposeSection
  | HeroComposeSection
  | FeaturesComposeSection
  | PricingComposeSection