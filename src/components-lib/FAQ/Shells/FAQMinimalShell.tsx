import React from 'react'
import type { FAQShellProps } from '@/components-lib/FAQ/faq.types'

const FAQMinimalShell: React.FC<FAQShellProps> = ({ props, styles }) => {
  const { faq_items } = props

  return (
    <section style={{ padding: styles.padding, backgroundColor: styles.background }}>
      {faq_items.map((item, index) => (
        <div key={`${item.question}-${index}`} style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: styles.question_size, color: styles.text_color }}>
            {item.question}
          </p>
          <p style={{ fontSize: styles.answer_size, color: styles.text_color }}>
            {item.answer ?? ''}
          </p>
        </div>
      ))}
    </section>
  )
}

export default FAQMinimalShell