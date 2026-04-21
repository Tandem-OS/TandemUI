import React from 'react'
import type { FAQShellProps } from '@/components-lib/FAQ/faq.types'
import { getAnim, resolveWrap } from '@/components-lib/FAQ/faq.shellUtils'

const FAQMinimalShell: React.FC<FAQShellProps> = ({ props, styles }) => {
  const {
    faq_items,
    faq_animated,
    section_heading,
    section_tag,
    supporting_text,
  } = props

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
      <div
        style={{
          maxWidth: '48rem',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: styles.item_gap,
        }}
      >
        {section_tag && (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: styles.tag_color,
            }}
          >
            {section_tag}
          </span>
        )}

        {section_heading && (
          <h2
            style={{
              fontSize: styles.heading_size,
              fontWeight: styles.heading_weight,
              color: styles.text_color,
              marginBottom: '0.5rem',
            }}
          >
            {section_heading}
          </h2>
        )}

        {supporting_text && (
          <p
            style={{
              fontSize: styles.answer_size,
              color: styles.supporting_text_color,
              marginBottom: '1.5rem',
            }}
          >
            {supporting_text}
          </p>
        )}

        {faq_items.map((item, index) => (
          <Wrap key={`${item.question}-${index}`} {...getAnim(index * 0.05, animated)}>
            <div
              data-testid="faq-item"
              aria-label={`FAQ item ${index + 1}`}
              style={{
                borderBottom: `1px solid ${styles.border_color}`,
                paddingBottom: '0.75rem',
              }}
            >
              <p
                style={{
                  fontSize: styles.question_size,
                  color: styles.text_color,
                  fontWeight: styles.heading_weight,
                }}
              >
                {item.question}
              </p>

              {item.answer && (
                <p
                  style={{
                    marginTop: '0.5rem',
                    fontSize: styles.answer_size,
                    color: styles.text_color,
                    opacity: 0.85,
                  }}
                >
                  {item.answer}
                </p>
              )}
            </div>
          </Wrap>
        ))}
      </div>
    </section>
  )
}

FAQMinimalShell.displayName = 'FAQMinimalShell'
export default FAQMinimalShell