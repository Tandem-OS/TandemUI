import React from 'react'
import componentRegistry from '@/registry/ComponentRegistry'
import { navSlotsToProps } from '@/components-lib/Nav/NavSlotsToProps'
import { navTokensToColors } from '@/components-lib/Nav/NavTokensToColors'
import type { ComposeSection, NavSlots, NavTokens } from '@/pages/Renderer/CompositionType'

interface NavRendererProps {
  sections: ComposeSection[]
}

const NavRenderer: React.FC<NavRendererProps> = ({ sections }) => {
  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section, i) => {
        const slots = section.content_slots as NavSlots
        const tokens = section.tokens as NavTokens
        const colors = navTokensToColors(tokens)

        const props = navSlotsToProps(
          slots,
          section.layout_structure,
          section.tags,
          tokens.padding,
          tokens.link_size,
        )

        const Component = componentRegistry[section.component_id]

        if (!Component) {
          console.warn(`[NavRenderer] Unknown component_id: "${section.component_id}"`)
          return null
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

export default NavRenderer