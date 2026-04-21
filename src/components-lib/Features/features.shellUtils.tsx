// ── Features Shell Utils 

import type {
  FeaturesComposeSection,
  FeaturesColors,
  FeaturesItem,
  FeaturesAction,
} from './features.types'
import { featuresSlotsToProps } from './FeaturesSlotsToProps'
import { featuresTokensToColors } from './FeaturesTokensToColors'
import { resolveFeaturesLayout, type FeaturesLayoutKey } from './features.layoutResolver'
import { validateFeaturesSection } from './features.validation'

// ── Shell entry prop 
export interface FeaturesShellProps {
  section: FeaturesComposeSection
  className?: string
}

// ── Resolved data passed into FeaturesBase 
export interface ResolvedFeaturesShellData {
  features_heading?: string
  features_subheading?: string
  features_variant: string
  features_items: FeaturesItem[]
  features_media?: string
  features_primary_action?: FeaturesAction
  features_secondary_action?: FeaturesAction
  colors: FeaturesColors
  layout: FeaturesLayoutKey
  className: string
}


export function resolveFeaturesShellData(
  section: FeaturesComposeSection,
  className = '',
): ResolvedFeaturesShellData | null {
if (import.meta.env.DEV) {
    const { valid, warnings } = validateFeaturesSection(section)
    if (!valid) {
      warnings.forEach(w => console.warn(`[FeaturesShell] ${w}`))
    }
  }

  const slotProps = featuresSlotsToProps(section.content_slots)
  const colors = featuresTokensToColors(section.tokens)
  const layout = resolveFeaturesLayout(slotProps.features_variant)

  if (!layout) {
    console.error(
      `[FeaturesShell] Cannot resolve layout from features_variant: "${slotProps.features_variant}"`
    )
    return null
  }

  return {
    features_heading:          slotProps.features_heading,
    features_subheading:       slotProps.features_subheading,
    features_variant:          layout,
    features_items:            slotProps.features_items,
    features_media:            slotProps.features_media,
    features_primary_action:   slotProps.features_primary_action,
    features_secondary_action: slotProps.features_secondary_action,
    colors,
    layout,
    className,
  }
}