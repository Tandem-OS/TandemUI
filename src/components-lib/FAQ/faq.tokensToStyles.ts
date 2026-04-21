import type { FAQStyles } from './faq.types'

export function faqTokensToStyles(tokens: any): FAQStyles {
  return {
    padding: tokens?.padding,
    background: tokens?.background,

    border_color: tokens?.border_color,

    question_size: tokens?.question_size,
    answer_size: tokens?.answer_size,

    heading_size: tokens?.heading_size,
    heading_weight: tokens?.heading_weight,

    text_color: tokens?.text_color,
    icon_color: tokens?.icon_color,

    panel_radius: tokens?.panel_radius,
    panel_padding: tokens?.panel_padding,
    panel_background: tokens?.panel_background,
    panel_border: tokens?.panel_border,

    link_color: tokens?.link_color,
    tag_color: tokens?.tag_color,
    supporting_text_color: tokens?.supporting_text_color,

    item_gap: tokens?.item_gap,
  }
}