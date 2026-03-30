import type { ComposeSectionSlots } from '@/pages/Renderer/CompositionType'
import type { HeroProps, HeroAction } from '@/components-lib/Hero/HeroTypes'

export function heroSlotToProps(slots: ComposeSectionSlots): HeroProps | null {
 
  const heading = slots.hero_heading ?? null
  if (!heading) {
    console.warn('[heroSlotToProps] Missing family-required slot: hero_heading')
    return null
  }

  const primaryLabel = slots.hero_cta_primary ?? slots.hero_primary_action
  const primaryAction: HeroAction | null = primaryLabel
    ? {
        label:    primaryLabel,
        target:   (slots.hero_primary_href   as string) ?? '/',
        variant:  (slots.hero_primary_variant as HeroAction['variant']) ?? 'primary',
      }
    : null

  const secondaryLabel = slots.hero_cta_secondary ?? slots.hero_secondary_action
  const secondaryAction: HeroAction | null = secondaryLabel
    ? {
        label:   secondaryLabel,
        target:  (slots.hero_secondary_href    as string) ?? '/',
        variant: (slots.hero_secondary_variant as HeroAction['variant']) ?? 'outline',
      }
    : null

  return {
    hero_heading:          heading,
    hero_subheading:       slots.hero_subheading       ?? null,
    hero_media:            slots.hero_media             ?? null,
    hero_media_slides:     (slots.hero_media_slides as string[]) ?? null,
    hero_animated:         slots.hero_animated          ?? null,
    hero_primary_action:   primaryAction,
    hero_secondary_action: secondaryAction,
  }
}
