// components-lib/FAQ/faq.types.ts

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

export interface FAQStyles {
  padding: string
  background: string

  border_color: string

  question_size: string
  answer_size: string

  heading_size?: string
  heading_weight?: React.CSSProperties['fontWeight']

  text_color?: string
  icon_color?: string

  panel_radius?: string
  panel_padding?: string
  panel_background?: string
  panel_border?: string

  link_color?: string
  tag_color?: string
  supporting_text_color?: string

  item_gap?: string
}

export interface FAQShellProps {
  props: FAQProps
  styles: FAQStyles
}