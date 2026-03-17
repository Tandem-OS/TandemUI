import React from 'react'
import componentRegistry from '@/registry/ComponentRegistry'
import { heroSlotsToProps } from '@/components-lib/Hero/HeroSlotsToProps'
import { heroTokensToColors } from '@/components-lib/Hero/HeroTokensToColors'
import type { ComposeSection, ComposeSectionSlots, ComposeSectionTokens } from '@/pages/Renderer/CompositionType'

// ── Helper ────────────────────────────────────────────────────
function isRealImage(url?: string | null): boolean {
  if (!url) return false
  if (url.includes('placehold.co')) return false
  if (url.includes('placeholder')) return false
  return true
}

// ── Props ─────────────────────────────────────────────────────
interface HeroRendererProps {
  sections: ComposeSection[]
}

// ── HeroRenderer (pure) ───────────────────────────────────────
const HeroRenderer: React.FC<HeroRendererProps> = ({ sections }) => {
  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section, i) => {
        const slots = section.content_slots as ComposeSectionSlots
        const tokens = section.tokens as ComposeSectionTokens
        const props = heroSlotsToProps(slots)
        const colors = heroTokensToColors(tokens)
        const Component = componentRegistry[section.component_id]

        if (!Component) {
          console.warn(`[HeroRenderer] Unknown component_id: "${section.component_id}"`)
          return null
        }

        return (
          <Component
            key={section.component_id ?? i}
            {...props}
            colors={colors}
            overlayColor={isRealImage(props.backgroundImage) ? undefined : tokens.background}
          />
        )
      })}
    </>
  )
}

export default HeroRenderer