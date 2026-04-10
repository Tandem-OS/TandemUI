import React from 'react'
import type { FAQShellProps } from '@/components-lib/FAQ/faq.types'
import { getAnim, resolveWrap } from '@/components-lib/FAQ/faq.shellUtils'

const FAQAccordionShell: React.FC<FAQShellProps> = ({ props, styles }) => {
  const { faq_items, faq_animated, section_heading } = props
  const animated = faq_animated ?? false
  const Wrap = resolveWrap(animated)

  return (
    <section
      data-testid="faq-section"
      aria-label="Frequently asked questions"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: styles.background,
        padding: styles.padding,
      }}
    >
      <div style={{
        maxWidth: '48rem',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: styles.item_gap ?? '1rem',
      }}>

        {section_heading && (
          <h2
            style={{
              fontSize: styles.heading_size,
              fontWeight: styles.heading_weight,
              color: styles.text_color,
              marginBottom: '1.5rem',
            }}
          >
            {section_heading}
          </h2>
        )}

        {faq_items.map((item, index) => (
          <Wrap key={`${item.question}-${index}`} {...getAnim(index * 0.05, animated)}>
            <details
              open
              data-testid="faq-item"
              aria-label={`FAQ item ${index + 1}`}
              style={{
                borderBottom: `1px solid ${styles.border_color}`,
                paddingBottom: '0.75rem',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  fontSize: styles.question_size,
                  color: styles.text_color,
                }}
              >
                {item.question}
              </summary>

              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: styles.answer_size,
                  color: styles.text_color,
                  opacity: 0.85,
                }}
              >
                {item.answer ?? ''}
              </p>
            </details>
          </Wrap>
        ))}
      </div>
    </section >
  )
}

FAQAccordionShell.displayName = 'FAQAccordionShell'
export default FAQAccordionShell