import type { PricingComposeSection } from '@/pages/Renderer/CompositionType'
import type { PricingLayoutStructure } from '@/components-lib/Pricing/pricing.types'

const ALLOWED_LAYOUTS:    PricingLayoutStructure[] = ['three-column']

const REQUIRED_SLOTS:     string[] = ['pricing_plans']
const OPTIONAL_SLOTS:     string[] = [
  'pricing_heading',
  'pricing_subheading',
  'pricing_billing_toggle',
  'pricing_billing_note',
  'pricing_logos',
]
const ALLOWED_SLOTS:      Set<string> = new Set([...REQUIRED_SLOTS, ...OPTIONAL_SLOTS])

const ALLOWED_TOKEN_KEYS: Set<string> = new Set([
  'background',
  'heading_color',
  'subheading_color',
  'heading_size',
  'heading_weight',
  'card_bg',
  'card_radius',
  'card_border',
  'featured_card_bg',
  'featured_card_border',
  'body_color',
  'price_color',
  'feature_color',
  'btn_primary_bg',
  'btn_primary_color',
  'btn_outline_color',
  'btn_outline_border',
  'btn_radius',
  'padding',
  'toggle_active',
  'toggle_inactive',
])

export interface PricingValidationResult {
  valid:    boolean
  errors:   string[]
  warnings: string[]
}

export function validatePricingPayload(
  section: PricingComposeSection
): PricingValidationResult {
  const errors:   string[] = []
  const warnings: string[] = []

  const slots  = section.content_slots ?? {}
  const tokens = section.tokens        ?? {}

  if (!section.layout_structure) {
    warnings.push('layout_structure is missing — will fall back to PricingThreeColumnShell')
  } else if (!ALLOWED_LAYOUTS.includes(section.layout_structure as PricingLayoutStructure)) {
    warnings.push(
      `layout_structure "${section.layout_structure}" is not recognized. ` +
      `Supported: ${ALLOWED_LAYOUTS.join(', ')}. Will fall back to PricingThreeColumnShell.`
    )
  }

  const plans = slots.pricing_plans
  if (!plans || plans.length === 0) {
    errors.push('Missing or empty family-required slot: "pricing_plans"')
  }

  for (const key of Object.keys(slots)) {
    if (!ALLOWED_SLOTS.has(key) && slots[key] !== null) {
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