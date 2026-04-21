import React from 'react'
import type { FAQShellProps } from '@/components-lib/FAQ/faq.types'
import { getAnim, resolveWrap } from '@/components-lib/FAQ/faq.shellUtils'

const FAQCenteredSupportShell: React.FC<FAQShellProps> = ({ props, styles }) => {
  const {
    faq_items,
    faq_animated,
    section_tag,
    section_heading,
    supporting_text,
    bottom_support_text,
    bottom_support_link,
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
        alignItems: 'center',
        backgroundColor: styles.background,
        padding: styles.padding,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '48rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
            <details
              open={item.is_expanded === true}
              data-testid="faq-item"
              aria-label={`FAQ item ${index + 1}`}
              style={{
                width: '100%',
                borderBottom: `1px solid ${styles.border_color}`,
                paddingBottom: '0.75rem',
                textAlign: 'left',
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
            </details>
          </Wrap>
        ))}

        {bottom_support_link && bottom_support_text ? (

          <a href={bottom_support_link}
            style={{
              marginTop: '1.5rem',
              fontSize: styles.answer_size,
              color: styles.link_color,
              textDecoration: 'underline',
            }}
          >
            {bottom_support_text}
          </a>
        ) : null}

      </div>
    </section>
  )
}

FAQCenteredSupportShell.displayName = 'FAQCenteredSupportShell'
export default FAQCenteredSupportShell