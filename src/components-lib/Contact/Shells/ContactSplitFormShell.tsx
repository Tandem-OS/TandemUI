import type { ContactSplitFormShellProps } from '../contact.types';
import { renderFormFields } from '../contact.shellUtils';

export function ContactSplitFormShell({ layoutStructure, slot, styles }: ContactSplitFormShellProps) {
  if (layoutStructure !== 'split_form_grid') {
    throw new Error(
      `ContactSplitFormShell: expected "split_form_grid", received "${layoutStructure}"`
    );
  }

  return (
    <section className={`${styles.wrapper} w-full`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">

          {/* Left — Info */}
          <div className="flex flex-col justify-center">
            <h2 className={`${styles.heading} mb-3 sm:mb-4`}>{slot.headline}</h2>
            <p className={`${styles.body} mb-8 sm:mb-10 leading-relaxed`}>{slot.subheading}</p>

            <div className="flex flex-col gap-5 sm:gap-6 mb-8 sm:mb-10">
              {slot.contact_methods.map((method, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <p className={`${styles.label} font-semibold`}>{method.title}</p>
                  <p className={`${styles.body} opacity-80`}>{method.value}</p>
                </div>
              ))}
            </div>

            {slot.social_links.length > 0 && (
              <div className="flex items-center gap-4 flex-wrap">
                {slot.social_links.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.mutedBody} hover:opacity-100 opacity-60 transition-opacity duration-200 text-sm underline underline-offset-2`}
                  >
                    {link}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right — Form */}
          <div className={`${styles.formSurface} rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm`}>
            <h3 className={`${styles.sectionHeading} mb-6`}>{slot.form_title}</h3>

            <div className="flex flex-col gap-4 sm:gap-5">
              {renderFormFields(slot.form_fields, styles)}
            </div>

            <button
              className={`${styles.action} w-full mt-6 sm:mt-8 transition-opacity duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {slot.submit_button}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
