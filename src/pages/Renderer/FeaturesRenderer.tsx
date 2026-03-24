import React from 'react'
import componentRegistry from '@/registry/ComponentRegistry'
import { featuresSlotsToProps } from '@/components-lib/Features/FeaturesSlotsToProps'
import { featuresTokensToColors } from '@/components-lib/Features/FeaturesTokensToColors'
import type { FeaturesComposeSection } from '@/pages/Renderer/CompositionType'

interface FeaturesRendererProps {
  sections: FeaturesComposeSection[]
}

const FeaturesRenderer: React.FC<FeaturesRendererProps> = ({ sections }) => {
  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section, i) => {
        const colors = featuresTokensToColors(section.tokens)
        const props  = featuresSlotsToProps(section.content_slots)
        const Component = componentRegistry[section.component_id]

        if (!Component) {
          console.error(`[FeaturesRenderer] Unknown component_id: "${section.component_id}"`)
          return (
            <section key={section.component_id ?? i} style={{ padding: '2rem', color: 'red' }}>
              [FeaturesRenderer] Unknown component: "{section.component_id}"
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

export default FeaturesRenderer