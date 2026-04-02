// Nav Validation 

import type { NavComposeSection, NavSlots, NavTokens } from './nav.types'

export interface NavValidationResult {
  valid: boolean
  warnings: string[]
}

export function validateNavSection(
  section: Partial<NavComposeSection>,
): NavValidationResult {
  const warnings: string[] = []

  if (!section.category || section.category !== 'nav') {
    warnings.push('section.category must be "nav"')
  }

  if (!section.component_id) {
    warnings.push('section.component_id is missing')
  }

  if (!section.layout_structure) {
    warnings.push('section.layout_structure is missing — shell will fall back to "split"')
  }

  if (!section.tags || !Array.isArray(section.tags)) {
    warnings.push('section.tags is missing or not an array')
  }

  if (!section.content_slots) {
    warnings.push('section.content_slots is missing')
  } else {
    validateNavSlots(section.content_slots, warnings)
  }

  if (!section.tokens) {
    warnings.push('section.tokens is missing — styles will be undefined')
  } else {
    validateNavTokens(section.tokens, warnings)
  }

  return {
    valid: warnings.length === 0,
    warnings,
  }
}

function validateNavSlots(slots: NavSlots, warnings: string[]): void {
  if (!slots.nav_logo) {
    warnings.push('content_slots.nav_logo is missing — logo will not render')
  }

  if (!slots.nav_links || slots.nav_links.length === 0) {
    warnings.push('content_slots.nav_links is empty — nav will render no links')
  } else {
    slots.nav_links.forEach((link, i) => {
      if (!link.href) warnings.push(`nav_links[${i}].href is missing`)
      if (!link.label) warnings.push(`nav_links[${i}].label is missing`)
    })
  }
}

function validateNavTokens(tokens: NavTokens, warnings: string[]): void {
  if (!tokens.background) {
    warnings.push('tokens.background is missing')
  }
  if (!tokens.text_color) {
    warnings.push('tokens.text_color is missing')
  }
  if (!tokens.btn_primary_bg) {
    warnings.push('tokens.btn_primary_bg is missing — CTA button bg will be undefined')
  }
}