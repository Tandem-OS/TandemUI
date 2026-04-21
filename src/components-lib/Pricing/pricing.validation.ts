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
  'padding',
  'heading-color',
  'subheading-color',
  'heading-size',
  'heading-weight',
  'card-surface',
  'card-radius',
  'card-border',
  'card-shadow',
  'card-padding',
  'featured-card-background',
  'featured-card-border',
  'badge-background',
  'badge-text',
  'feature-text-color',
  'price-color',
  'price-suffix-color',
  'currency-label-color',
  'cta-background',
  'cta-text',
  'featured-cta-background',
  'featured-cta-text',
  'toggle-active-background',
  'toggle-background',
  'toggle-active-text',
  'toggle-inactive-text',
  'billing-note-color',
  'footer-note-color',
  'upgrade-action-color',
  'logos-color',
  'summary-color',
  'expand-icon-color',
  'comparison-note-color',
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