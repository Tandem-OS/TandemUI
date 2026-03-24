import React from 'react'
import componentRegistry from '@/registry/ComponentRegistry'
import { heroSlotsToProps } from '@/components-lib/Hero/HeroSlotsToProps'
import { heroTokensToColors } from '@/components-lib/Hero/HeroTokensToColors'
import type { HeroComposeSection } from '@/pages/Renderer/CompositionType'

// ── Props ─────────────────────────────────────────────────────
interface HeroRendererProps {
  sections: HeroComposeSection[]
}

// ── HeroRenderer (pure) ───────────────────────────────────────
const HeroRenderer: React.FC<HeroRendererProps> = ({ sections }) => {
  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section, i) => {
        const props  = heroSlotsToProps(section.content_slots)
        const colors = heroTokensToColors(section.tokens)
        const Component = componentRegistry[section.component_id]

        if (!Component) {
          console.error(`[HeroRenderer] Unknown component_id: "${section.component_id}"`)
          return (
            <section key={section.component_id ?? i} style={{ padding: '2rem', color: 'red' }}>
              [HeroRenderer] Unknown component: "{section.component_id}"
            </section>
          )
        }

        return (
          <Component
            key={section.component_id ?? i}
            {...props}
            colors={colors}
          />
        )
      })}
    </>
  )
}

export default HeroRenderer
