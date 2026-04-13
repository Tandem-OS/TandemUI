import type { FAQProps } from './faq.types'

export function faqSlotToProps(slots: any): FAQProps | null {
  if (!slots) return null

  const items = slots.faq_items
  if (!Array.isArray(items) || items.length === 0) {
    console.error('[faqSlotToProps] faq_items is missing or empty — cannot build props', {
      received: items,
    })
    return null
  }

  return {
    faq_items: items,

    section_heading: slots.faq_heading,
    section_tag: slots.section_tag,
    supporting_text: slots.supporting_text,

    bottom_support_link: slots.bottom_support_link,
    bottom_support_text: slots.bottom_support_text,
  }
}