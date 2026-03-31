
export type PricingLayoutStructure = 'three-column'


export interface PricingAction {
  label:       string
  target:      string
  variant?:    'primary' | 'outline' | 'ghost'
  aria_label?: string
}


export interface PricingPlan {
  id:              string
  name:            string
  price_monthly?:  string | null
  price_annual?:   string | null
  currency_label?: string | null
  description?:    string | null
  features:        string[]
  is_featured:     boolean
  featured_badge?: string | null
  action?:         PricingAction | null
}


export interface PricingProps {
  pricing_plans: PricingPlan[]

  pricing_heading?:        string | null
  pricing_subheading?:     string | null
  pricing_billing_toggle?: boolean | null
  pricing_billing_note?:   string | null
  pricing_logos?:          string[] | null
}


export interface PricingStyles {
  background?:           string
  heading_color?:        string
  subheading_color?:     string
  heading_size?:         string
  heading_weight?:       string
  card_bg?:              string
  card_radius?:          string
  card_border?:          string
  featured_card_bg?:     string
  featured_card_border?: string
  body_color?:           string
  price_color?:          string
  feature_color?:        string
  btn_primary_bg?:       string
  btn_primary_color?:    string
  btn_outline_color?:    string
  btn_outline_border?:   string
  btn_radius?:           string
  padding?:              string
  toggle_active?:        string
  toggle_inactive?:      string
}


export interface PricingShellProps {
  props:  PricingProps
  styles: PricingStyles
}