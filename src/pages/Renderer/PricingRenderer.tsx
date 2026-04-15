import React from 'react'
import PricingBase from '@/components-lib/Pricing/PricingBase'
import type { PricingComposeSection } from '@/pages/Renderer/CompositionType'

// ── Props 
interface PricingRendererProps {
  sections: PricingComposeSection[]
}

// ── PricingRenderer (pure) 
const PricingRenderer: React.FC<PricingRendererProps> = ({ sections }) => {
  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section, i) => (
        <PricingBase
          key={section.component_id ?? i}
          section={section}
        />
      ))}
    </>
  )
}

export default PricingRenderer