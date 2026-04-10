import type { FAQProps } from './faq.types'

export function faqSlotToProps(slots: any): FAQProps | null {
  if (!slots) return null

  const items = Array.isArray(slots.faq_items)
    ? slots.faq_items
    : []

  return {
    faq_items: items,

    section_heading: slots.faq_heading ?? null,
    section_tag: slots.section_tag,
    supporting_text: slots.supporting_text,

    bottom_support_link: slots.bottom_support_link,
    bottom_support_text: slots.bottom_support_text,
  }
}