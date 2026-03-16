import React from 'react'
import componentRegistry from '@/registry/ComponentRegistry'
import { featuresSlotsToProps } from '@/components-lib/Features/FeaturesSlotsToProps'
import { featuresTokensToColors } from '@/components-lib/Features/FeaturesTokensToColors'
import type { ComposeSection, FeaturesSlots, FeaturesTokens } from '@/pages/Renderer/CompositionType'

interface FeaturesRendererProps {
  sections: ComposeSection[]
}

const FeaturesRenderer: React.FC<FeaturesRendererProps> = ({ sections }) => {
  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section, i) => {
        const slots  = section.content_slots as FeaturesSlots
        const tokens = section.tokens as FeaturesTokens
        const colors = featuresTokensToColors(tokens)
        const props  = featuresSlotsToProps(slots)

        const Component = componentRegistry[section.component_id]

        if (!Component) {
          console.warn(`[FeaturesRenderer] Unknown component_id: "${section.component_id}"`)
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

export default FeaturesRenderer