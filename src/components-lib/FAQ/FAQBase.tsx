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

  const trace = {
    componentId: section.component_id,
    layout: section.layout_structure ?? '(no layout)',
    slotKeys: Object.keys(section.content_slots ?? {}),
    hasTokens: Boolean(section.tokens && Object.keys(section.tokens).length),
  }

  const { valid, errors, warnings } = validateFAQPayload(section)

  if (warnings.length > 0) {
    console.warn('[FAQBase] Validation warnings — section will still render', {
      ...trace,
      warnings,
    })
  }

  if (!valid) {
    console.error('[FAQBase] Validation failed — section will not render', {
      ...trace,
      errors,
      contentSlots: section.content_slots ?? null,
      tokens: section.tokens ?? null,
    })
    return null
  }

  const props = faqSlotToProps(section.content_slots ?? {})
  if (!props) {
    console.error('[FAQBase] faqSlotToProps returned null after passing validation — contract gap suspected', {
      ...trace,
      contentSlots: section.content_slots ?? null,
    })
    return null
  }

  const styles = faqTokensToStyles(section.tokens ?? {})
  const Shell = resolveFAQLayout(section.layout_structure)
  return <Shell props={props} styles={styles} />
}

FAQBase.displayName = 'FAQBase'
export default FAQBase