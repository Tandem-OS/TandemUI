export interface FAQItem {
  question: string
  answer?: string
  is_expanded?: boolean
}

export interface FAQProps {
  faq_items: FAQItem[]
  section_heading?: string
  section_tag?: string
  supporting_text?: string
  bottom_support_link?: string
  bottom_support_text?: string
  faq_animated?: boolean
}

export interface FAQTokens {
  divider:                 string
  spacing:                 string
  surface:                 string
  'text-role':             string
  background:              string
  'body-scale':            string
  'action-style':          string
  'heading-scale':         string
  'section-heading-scale': string
  'eyebrow-scale':         string
  'label-scale':           string
  'meta-scale':            string
}

export interface FAQStyles {
  wrapper:        string
  heading:        string
  sectionHeading: string
  body:           string
  mutedBody:      string
  eyebrow:        string
  label:          string
  meta:           string
  action:         string
  surface:        string
  divider:        string
}

export interface FAQShellProps {
  props:   FAQProps
  
  styles:  FAQStyles
}