import type { ComposeSectionSlots } from '@/pages/Renderer/CompositionType'
import { type CTASize, type CTAVariant } from '@/components-lib/Hero/Hero_01/Hero_01.types'

export function heroSlotsToProps(slots: ComposeSectionSlots) {
  const primaryText = slots.hero_cta_primary ?? slots.hero_primary_action
  const secondaryText = slots.hero_cta_secondary ?? slots.hero_secondary_action

  return {
    title: slots.hero_heading ?? '',
    description: slots.hero_subheading ?? undefined,
    backgroundImage: slots.hero_media ?? undefined,
    backgroundSlides: slots.hero_media_slides ?? undefined,

    primaryCTA: primaryText ? {
      text: primaryText,
      href: slots.hero_primary_href ?? '/',
      size: 'lg' as CTASize,
      variant: (slots.hero_primary_variant ?? 'solid') as CTAVariant,
    } : undefined,

    secondaryCTA: secondaryText ? {
      text: secondaryText,
      href: slots.hero_secondary_href ?? '/',
      size: 'lg' as CTASize,
      variant: (slots.hero_secondary_variant ?? 'outline') as CTAVariant,
    } : undefined,

    animated: slots.hero_animated ?? true,
    className: '',
  }
}
