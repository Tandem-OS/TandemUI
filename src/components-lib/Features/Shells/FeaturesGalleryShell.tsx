// ── FeaturesGalleryShell

import React from 'react'
import FeaturesBase from '../FeaturesBase'
import { resolveFeaturesShellData, type FeaturesShellProps } from '../features.shellUtils'

const FeaturesGalleryShell: React.FC<FeaturesShellProps> = ({
  section,
  className,
}) => {
  const data = resolveFeaturesShellData(section, className)

  if (!data) return null

  return (
    <FeaturesBase
      features_heading={data.features_heading}
      features_subheading={data.features_subheading}
      features_variant={data.features_variant}
      features_items={data.features_items}
      features_media={data.features_media}
      features_primary_action={data.features_primary_action}
      features_secondary_action={data.features_secondary_action}
      colors={data.colors}
    />
  )
}

export default FeaturesGalleryShell