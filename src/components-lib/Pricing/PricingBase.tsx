import React from 'react'
import type { PricingComposeSection } from '@/pages/Renderer/CompositionType'
import { validatePricingPayload } from '@/components-lib/Pricing/pricing.validation'
import { pricingSlotToProps }     from '@/components-lib/Pricing/pricing.slotToProps'
import { pricingTokensToStyles }  from '@/components-lib/Pricing/pricing.tokensToStyles'
import { resolvePricingLayout }   from '@/components-lib/Pricing/pricing.layoutResolver'

interface PricingBaseProps {
  section: PricingComposeSection
}

const PricingBase: React.FC<PricingBaseProps> = ({ section }) => {

  const { valid, warnings } = validatePricingPayload(section)

  if (warnings.length > 0) {
    // Validation warnings — section will still render
  }

  if (!valid) {
    return null
  }

  const props = pricingSlotToProps(section.content_slots)

  if (!props) {
    return null
  }

  const styles = pricingTokensToStyles(section.tokens ?? {})
  const Shell  = resolvePricingLayout(section.layout_structure)

  return <Shell props={props} styles={styles} />
}

PricingBase.displayName = 'PricingBase'
export default PricingBase
