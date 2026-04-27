export type PricingLayoutStructure = 'three-column'


export interface PricingAction {
  label:       string
  target:      string
  variant?:    'primary' | 'outline' | 'ghost'
  aria_label?: string
}


export interface PricingPlan {
  id?:             string | null
  name:            string
  price_monthly?:  string | null
  price_suffix?:   string | null
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
  // ─── Section 
  background?:              string
  padding?:                 string

  // ─── Heading 
  heading_color?:           string
  subheading_color?:        string
  heading_size?:            string
  heading_weight?:          string

  // ─── Card ─
  card_bg?:                 string
  card_radius?:             string
  card_border?:             string
  card_shadow?:             string   
  card_padding?:            string  

  // ─── Featured card 
  featured_card_bg?:        string
  featured_card_border?:    string

  // ─── Badge 
  badge_bg?:                string
  badge_color?:             string

  // ─── Body / feature text 
  body_color?:              string
  feature_color?:           string

  // ─── Price 
  price_color?:             string
  price_suffix_color?:      string
  currency_label_color?:    string

  // ─── CTA 
  btn_primary_bg?:          string
  btn_primary_color?:       string
  btn_radius?:              string
  btn_outline_color?:       string
  btn_outline_border?:      string
  featured_btn_bg?:         string
  featured_btn_color?:      string

  // ─── Toggle 
  toggle_active?:           string
  toggle_inactive?:         string
  toggle_active_text?:      string
toggle_inactive_text?:    string
toggle_thumb_color?:      string
  // ─── Misc 
  billing_note_color?:      string
  footer_note_color?:       string
  upgrade_action_color?:    string
  logos_color?:             string
  summary_color?:           string
  expand_icon_color?:       string
  comparison_note_color?:   string
}


export interface PricingShellProps {
  props:  PricingProps
  styles: PricingStyles
}