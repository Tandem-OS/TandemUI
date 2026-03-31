import type { PricingSlots, PricingPlanRaw } from '@/pages/Renderer/CompositionType'
import type { PricingProps, PricingPlan, PricingAction } from '@/components-lib/Pricing/pricing.types'

function mapPlan(raw: PricingPlanRaw): PricingPlan {
  const action: PricingAction | null = raw.action_label && raw.action_target
    ? {
        label:      raw.action_label,
        target:     raw.action_target,
        variant:    (raw.action_variant as PricingAction['variant']) ?? undefined,
        aria_label: raw.action_aria_label ?? undefined,
      }
    : null

  return {
    id:             raw.id,
    name:           raw.name,
    price_monthly:  raw.price_monthly  ?? null,
    price_annual:   raw.price_annual   ?? null,
    currency_label: raw.currency_label ?? null,
    description:    raw.description    ?? null,
    features:       raw.features       ?? [],
    is_featured:    raw.is_featured    ?? false,
    featured_badge: raw.featured_badge ?? null,
    action,
  }
}

export function pricingSlotToProps(slots: PricingSlots): PricingProps | null {
  const rawPlans = slots.pricing_plans

  if (!rawPlans || rawPlans.length === 0) {
    console.warn('[pricingSlotToProps] Missing family-required slot: pricing_plans')
    return null
  }

  return {
    pricing_plans:          rawPlans.map(mapPlan),
    pricing_heading:        slots.pricing_heading        ?? null,
    pricing_subheading:     slots.pricing_subheading     ?? null,
    pricing_billing_toggle: slots.pricing_billing_toggle ?? null,
    pricing_billing_note:   slots.pricing_billing_note   ?? null,
    pricing_logos:          slots.pricing_logos          ?? null,
  }
}