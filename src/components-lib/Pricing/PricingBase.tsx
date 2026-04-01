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
  const trace = {
    componentId: section.component_id,
    layout:      section.layout_structure    ?? '(no layout)',
    slotKeys:    Object.keys(section.content_slots ?? {}),
    planCount:   section.content_slots?.pricing_plans?.length ?? 0,
    hasTokens:   Boolean(section.tokens && Object.keys(section.tokens).length),
  }

  const { valid, errors, warnings } = validatePricingPayload(section)

  if (warnings.length > 0) {
    console.warn('[PricingBase] Validation warnings — section will still render', {
      ...trace,
      warnings,
    })
  }
  if (!valid) {
    console.error('[PricingBase] Validation failed — section will not render', {
      ...trace,
      errors,
      contentSlots: section.content_slots ?? null,
      tokens:       section.tokens        ?? null,
    })
    return null
  }
  const props = pricingSlotToProps(section.content_slots)

  if (!props) {
    console.error('[PricingBase] pricingSlotToProps returned null after passing validation — contract gap suspected', {
      ...trace,
      contentSlots: section.content_slots ?? null,
    })
    return null
  }

  const styles = pricingTokensToStyles(section.tokens ?? {})
  const Shell  = resolvePricingLayout(section.layout_structure)

  return <Shell props={props} styles={styles} />
}

PricingBase.displayName = 'PricingBase'
export default PricingBase