// ── Features Types 

export interface FeaturesAction {
  label: string
  target: string
  variant?: 'primary' | 'secondary' | 'ghost'
  aria_label?: string
}

export interface FeaturesItem {
  title: string
  description?: string
  image?: string
}

export interface FeaturesSlots {
  features_heading?: string
  features_subheading?: string
  features_variant?: string
  features_items?: FeaturesItem[]
  features_media?: string
  features_primary_action?: FeaturesAction
  features_secondary_action?: FeaturesAction
}

export interface FeaturesTokens {
  background?:        string
  text_color?:        string
  card_bg?:           string
  card_radius?:       string
  padding?:           string
  heading_size?:      string
  heading_weight?:    string
  description_color?: string
  [key: string]: string | undefined
}

export interface FeaturesColors {
  background?:        string
  text_color?:        string
  card_bg?:           string
  card_radius?:       string
  padding?:           string
  heading_size?:      string
  heading_weight?:    string
  description_color?: string
}

// ── DB section shape
export interface FeaturesComposeSection {
  position:          number
  category:          'features'
  component_id:      string
  layout_structure?: string
  tags:              string[]
  content_slots:     FeaturesSlots
  tokens:            FeaturesTokens
}