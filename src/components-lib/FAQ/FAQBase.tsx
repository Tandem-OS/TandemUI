import React from 'react'
import type { FAQComposeSection } from '@/pages/Renderer/CompositionType'
import { validateFAQPayload } from './faq.validation'
import { faqSlotToProps } from './faq.slotToProps'
import { faqTokensToStyles } from './faq.tokensToStyles'
import { resolveFAQLayout } from './faq.layoutResolver'

interface FAQBaseProps {
  section: FAQComposeSection
}

const FAQBase: React.FC<FAQBaseProps> = ({ section }) => {

  const { valid, warnings } = validateFAQPayload(section)

  if (warnings.length > 0) {
    // Validation warnings — section will still render
  }

  if (!valid) {
    return null
  }

  const props = faqSlotToProps(section.content_slots ?? {})
  if (!props) {
    return null
  }

  if (!section.tokens) {
    return null
  }

  const styles = faqTokensToStyles(section.tokens)
  const Shell  = resolveFAQLayout(section.layout_structure)
  return <Shell props={props} styles={styles} />
}

FAQBase.displayName = 'FAQBase'
export default FAQBase
