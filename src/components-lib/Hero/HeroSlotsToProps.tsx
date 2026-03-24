import type { ComposeSectionSlots, HeroAction } from '@/pages/Renderer/CompositionType'

export function heroSlotsToProps(slots: ComposeSectionSlots): {
  hero_heading?:          string | null
  hero_subheading?:       string | null
  hero_media?:            string | null
  hero_animated?:         boolean | null
  hero_primary_action?:   HeroAction | null
  hero_secondary_action?: HeroAction | null
} {
  const primaryLabel  = slots.hero_cta_primary  ?? slots.hero_primary_action
  const secondaryLabel = slots.hero_cta_secondary ?? slots.hero_secondary_action

  const primaryAction: HeroAction | null = primaryLabel
    ? {
        label:     primaryLabel,
        target:    slots.hero_primary_href ?? '/',
        variant:   (slots.hero_primary_variant as HeroAction['variant']) ?? 'primary',
      }
    : null

  const secondaryAction: HeroAction | null = secondaryLabel
    ? {
        label:     secondaryLabel,
        target:    slots.hero_secondary_href ?? '/',
        variant:   (slots.hero_secondary_variant as HeroAction['variant']) ?? 'outline',
      }
    : null

  return {
    hero_heading:          slots.hero_heading   ?? null,
    hero_subheading:       slots.hero_subheading ?? null,
    hero_media:            slots.hero_media      ?? null,
    hero_animated:         slots.hero_animated   ?? null,
    hero_primary_action:   primaryAction,
    hero_secondary_action: secondaryAction,
  }
}