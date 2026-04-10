import React from 'react'
import type { FAQShellProps } from '@/components-lib/FAQ/faq.types'

const FAQCenteredSupportShell: React.FC<FAQShellProps> = ({ props, styles }) => {
  const {
    section_tag,
    section_heading,
    supporting_text,
    bottom_support_text,
    bottom_support_link,
  } = props

  return (
    <section style={{ padding: styles.padding, textAlign: 'center' }}>
      {section_tag && <p>{section_tag}</p>}
      {section_heading && <h2>{section_heading}</h2>}
      {supporting_text && <p>{supporting_text}</p>}

      {bottom_support_text && <p>{bottom_support_text}</p>}
      {bottom_support_link && <a href="#">{bottom_support_link}</a>}
    </section>
  )
}

export default FAQCenteredSupportShell