import React from 'react'
import type { FAQShellProps } from '@/components-lib/FAQ/faq.types'
import { getAnim, resolveWrap } from '@/components-lib/FAQ/faq.shellUtils'

const FAQContainedShell: React.FC<FAQShellProps> = ({ props, styles }) => {
  const {
    faq_items,
    faq_animated,
    section_heading,
    section_tag,
    supporting_text,
    bottom_support_link,
    bottom_support_text,
  } = props

  const animated = faq_animated ?? false
  const Wrap = resolveWrap(animated)

  return (
    <section
      data-testid="faq-section"
      aria-label="Frequently asked questions"
      className={`${styles.wrapper} w-full flex flex-col`}
    >
      <div className={`${styles.surface} max-w-3xl w-full mx-auto flex flex-col rounded-xl border p-8`}>

        {section_tag && (
          <span className={`${styles.mutedBody} uppercase tracking-widest mb-2`}>
            {section_tag}
          </span>
        )}

        {section_heading && (
          <h2 className={`${styles.heading} mb-2`}>
            {section_heading}
          </h2>
        )}

        {supporting_text && (
          <p className={`${styles.mutedBody} mb-6`}>
            {supporting_text}
          </p>
        )}

        {faq_items.map((item, index) => (
          <Wrap key={`${item.question}-${index}`} {...getAnim(index * 0.05, animated)}>
            <details
              open={item.is_expanded === true}
              data-testid="faq-item"
              aria-label={`FAQ item ${index + 1}`}
              className={`${styles.divider} border-b pb-3`}
            >
              <summary className={`${styles.body} cursor-pointer`}>
                {item.question}
              </summary>

              {item.answer && (
                <p className={`${styles.mutedBody} mt-2`}>
                  {item.answer}
                </p>
              )}
            </details>
          </Wrap>
        ))}

        {bottom_support_link && bottom_support_text && (
          <a href={bottom_support_link} className={`${styles.action} mt-6`}>
            {bottom_support_text}
          </a>
        )}

      </div>
    </section>
  )
}

FAQContainedShell.displayName = 'FAQContainedShell'
export default FAQContainedShell