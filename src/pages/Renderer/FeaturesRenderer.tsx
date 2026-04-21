import React from 'react'
import FeaturesGalleryShell from '@/components-lib/Features/Shells/FeaturesGalleryShell'
import FeaturesStatsShell from '@/components-lib/Features/Shells/FeaturesStatsShell'
import { resolveFeaturesLayout } from '@/components-lib/Features/features.layoutResolver'
import type { FeaturesComposeSection } from '@/components-lib/Features/features.types'

// ── Props 
interface FeaturesRendererProps {
  sections: FeaturesComposeSection[]
}

const shellMap = {
  gallery: FeaturesGalleryShell,
  stats:   FeaturesStatsShell,
} as const

// ── FeaturesRenderer 
const FeaturesRenderer: React.FC<FeaturesRendererProps> = ({ sections }) => {
  if (!sections.length) return null

  return (
    <>
      {sections.map((section, i) => {
        const layout = resolveFeaturesLayout(section.content_slots.features_variant)

        if (!layout) {
          console.error(
            `[FeaturesRenderer] Unknown variant "${section.content_slots.features_variant}" ` +
            `at position ${section.position}`
          )
          return null
        }

        const Shell = shellMap[layout]
        return <Shell key={section.component_id ?? i} section={section} />
      })}
    </>
  )
}

export default FeaturesRenderer