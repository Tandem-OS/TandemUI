import React from 'react'
import FAQBase from '@/components-lib/FAQ/FAQBase'
import type { FAQComposeSection } from '@/pages/Renderer/CompositionType'

interface FAQRendererProps {
  sections: FAQComposeSection[]
}

const FAQRenderer: React.FC<FAQRendererProps> = ({ sections }) => {
  return (
    <>
      {sections.map((section) => (
        <FAQBase key={section.component_id} section={section} />
      ))}
    </>
  )
}

export default FAQRenderer