import React from 'react'
import type { FAQShellProps } from '@/components-lib/FAQ/faq.types'

const FAQContainedShell: React.FC<FAQShellProps> = ({ props, styles }) => {
  const { faq_items } = props

  return (
    <section style={{ padding: styles.padding, background: styles.background }}>
      <div style={{
        maxWidth: '48rem',
        margin: '0 auto',
        background: styles.panel_background,
        padding: styles.panel_padding,
        borderRadius: styles.panel_radius,
        border: `1px solid ${styles.panel_border}`,
      }}>
        {faq_items.map((item, index) => (
          <div key={`${item.question}-${index}`}>
            <p>{item.question}</p>
            <p>{item.answer ?? ''}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQContainedShell