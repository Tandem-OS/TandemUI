import { type CTASize, type CTAVariant } from '@/components-lib/Hero/Hero_01/Hero_01.types'

export interface HeroSlots {
    hero_heading: string
    hero_subheading?: string | null
    hero_media?: string | null
    hero_media_slides?: string[] | null
    hero_cta_primary?: string | null
    hero_primary_action?: string | null
    hero_primary_href?: string | null
    hero_primary_variant?: string | null
    hero_cta_secondary?: string | null
    hero_secondary_action?: string | null
    hero_secondary_href?: string | null
    hero_secondary_variant?: string | null
    hero_animated?: boolean | null
}

export function slotsToProps(slots: HeroSlots) {
    const primaryText = slots.hero_cta_primary ?? slots.hero_primary_action
    const secondaryText = slots.hero_cta_secondary ?? slots.hero_secondary_action

    return {
        title: slots.hero_heading,
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