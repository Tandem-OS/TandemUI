import React from 'react'
import HeroBase from '@/components-lib/Hero/HeroBase'
import type { HeroComposeSection } from '@/pages/Renderer/CompositionType'

// ── Props 
interface HeroRendererProps {
  sections: HeroComposeSection[]
}

// ── HeroRenderer (pure) 
const HeroRenderer: React.FC<HeroRendererProps> = ({ sections }) => {
  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section, i) => (
        <HeroBase
          key={section.component_id ?? i}
          section={section}
        />
      ))}
    </>
  )
}

export default HeroRenderer