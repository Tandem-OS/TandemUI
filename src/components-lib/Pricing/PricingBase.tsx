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

  const { valid, errors, warnings } = validatePricingPayload(section)

  warnings.forEach(w => console.warn(`[PricingBase] ${w}`))

  if (!valid) {
    errors.forEach(e => console.error(`[PricingBase] ${e}`))
    return null
  }

  const props = pricingSlotToProps(section.content_slots)

  if (!props) {
    console.error('[PricingBase] pricingSlotToProps returned null after passing validation — skipping render')
    return null
  }

  const styles = pricingTokensToStyles(section.tokens ?? {})
  const Shell  = resolvePricingLayout(section.layout_structure)

  return <Shell props={props} styles={styles} />
}

PricingBase.displayName = 'PricingBase'
export default PricingBase