// ── Features Validation 


import type { FeaturesComposeSection, FeaturesSlots, FeaturesTokens } from './features.types'

export interface FeaturesValidationResult {
  valid: boolean
  warnings: string[]
}

const SUPPORTED_VARIANTS = ['gallery', 'stats']

export function validateFeaturesSection(
  section: Partial<FeaturesComposeSection>,
): FeaturesValidationResult {
  const warnings: string[] = []

  if (!section.category || section.category !== 'features') {
    warnings.push('section.category must be "features"')
  }

  if (!section.component_id) {
    warnings.push('section.component_id is missing')
  }

  if (!section.content_slots) {
    warnings.push('section.content_slots is missing')
  } else {
    validateFeaturesSlots(section.content_slots, warnings)
  }

  if (!section.tokens) {
    warnings.push('section.tokens is missing — styles will be undefined')
  } else {
    validateFeaturesTokens(section.tokens, warnings)
  }

  return {
    valid: warnings.length === 0,
    warnings,
  }
}

function validateFeaturesSlots(slots: FeaturesSlots, warnings: string[]): void {
  if (!slots.features_variant) {
    warnings.push('content_slots.features_variant is missing — shell cannot resolve layout')
  } else if (!SUPPORTED_VARIANTS.includes(slots.features_variant)) {
    warnings.push(
      `content_slots.features_variant "${slots.features_variant}" is not supported. ` +
      `Supported: ${SUPPORTED_VARIANTS.join(', ')}`
    )
  }

  if (!slots.features_items || slots.features_items.length === 0) {
    warnings.push('content_slots.features_items is empty — no items will render')
  } else {
    slots.features_items.forEach((item, i) => {
      if (!item.title) warnings.push(`features_items[${i}].title is missing`)
    })
  }

  if (!slots.features_heading) {
    warnings.push('content_slots.features_heading is missing')
  }
}

function validateFeaturesTokens(tokens: FeaturesTokens, warnings: string[]): void {
  if (!tokens.background) {
    warnings.push('tokens.background is missing')
  }
  if (!tokens.text_color) {
    warnings.push('tokens.text_color is missing')
  }
}