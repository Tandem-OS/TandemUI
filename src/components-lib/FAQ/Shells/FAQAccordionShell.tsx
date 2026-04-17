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
      className={`${styles.wrapper} w-full flex flex-col`}
    >
      <div className="max-w-3xl w-full mx-auto flex flex-col">

        {section_heading && (
          <h2 className={`${styles.heading} mb-6`}>
            {section_heading}
          </h2>
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

      </div>
    </section>
  )
}

FAQAccordionShell.displayName = 'FAQAccordionShell'
export default FAQAccordionShell