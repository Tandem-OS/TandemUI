import type { FAQComposeSection } from '@/pages/Renderer/CompositionType'

const ALLOWED_LAYOUTS: string[] = ['accordion', 'contained', 'centered-support', 'minimal']

const REQUIRED_SLOTS: string[] = ['faq_items']

const OPTIONAL_SLOTS: string[] = [
  'section_heading',
  'section_tag',
  'supporting_text',
  'bottom_support_link',
  'bottom_support_text',
  'faq_animated',
]

const ALLOWED_SLOTS: Set<string> = new Set([...REQUIRED_SLOTS, ...OPTIONAL_SLOTS])

const ALLOWED_TOKEN_KEYS: Set<string> = new Set([
  'background',
  'padding',
  'border_color',
  'question_size',
  'answer_size',
  'heading_size',
  'heading_weight',
  'text_color',
  'icon_color',
  'panel_radius',
  'panel_padding',
  'panel_background',
  'panel_border',
  'link_color',
  'tag_color',
  'supporting_text_color',
  'item_gap',
])

export interface FAQValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export function validateFAQPayload(
  section: FAQComposeSection
): FAQValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  const slots = section.content_slots ?? {}
  const tokens = section.tokens ?? {}

  if (!section.layout_structure) {
    errors.push('layout_structure is missing — cannot resolve shell without canonical layout from backend')
  } else if (!ALLOWED_LAYOUTS.includes(section.layout_structure)) {
    errors.push(
      `layout_structure "${section.layout_structure}" is not recognized. ` +
      `Supported: ${ALLOWED_LAYOUTS.join(', ')}.`
    )
  }

  const faqItems = slots['faq_items' as keyof typeof slots]
  if (!faqItems) {
    errors.push('Missing required slot: "faq_items"')
  } else if (!Array.isArray(faqItems)) {
    errors.push('"faq_items" must be an array')
  } else if (faqItems.length === 0) {
    errors.push('"faq_items" is empty — cannot render FAQ section with no items')
  } else {
    faqItems.forEach((item: unknown, index: number) => {
      if (!item || typeof item !== 'object') {
        errors.push(`faq_items[${index}] is not a valid object`)
        return
      }
      const i = item as Record<string, unknown>
      if (typeof i.question !== 'string' || i.question.trim() === '') {
        errors.push(`faq_items[${index}] is missing a valid "question" string`)
      }
      if ('is_expanded' in i && typeof i.is_expanded !== 'boolean') {
        errors.push(`faq_items[${index}] "is_expanded" must be a boolean if present`)
      }
    })
  }

  for (const key of Object.keys(slots)) {
    if (!ALLOWED_SLOTS.has(key) && slots[key as keyof typeof slots] !== null) {
      warnings.push(`Unrecognized slot: "${key}" — will be ignored by adapter`)
    }
  }

  for (const key of Object.keys(tokens)) {
    if (!ALLOWED_TOKEN_KEYS.has(key)) {
      warnings.push(`Unrecognized token key: "${key}" — will be ignored by adapter`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}