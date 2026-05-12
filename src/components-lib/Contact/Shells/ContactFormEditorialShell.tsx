import type { ContactFormEditorialShellProps } from '../contact.types';
import { renderFormFields } from '../contact.shellUtils';

export function ContactFormEditorialShell({ layoutStructure, slot, styles }: ContactFormEditorialShellProps) {
  if (layoutStructure !== 'form_editorial_split') {
    throw new Error(
      `ContactFormEditorialShell: expected "form_editorial_split", received "${layoutStructure}"`
    );
  }

  return (
    <div className={`${styles.wrapper} w-full`}>

      {/* Nav */}
      <nav className={`${styles.surface} w-full border-b border-border-muted`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between gap-4">
          <span className={`${styles.sectionHeading} font-bold tracking-tight`}>
            {slot.nav_logo_text}
          </span>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {slot.nav_links.map((link, i) => (
              <span
                key={i}
                className={`${styles.body} text-sm opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer`}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">

          {/* Left — Form */}
          <div className={`${styles.formSurface} rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm`}>
            <div className="flex flex-col gap-4 sm:gap-5">
              {renderFormFields(slot.form_fields, styles)}
            </div>

            <button
              className={`${styles.action} w-full mt-6 sm:mt-8 transition-opacity duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {slot.submit_button}
            </button>
          </div>

          {/* Right — Editorial */}
          <div className="flex flex-col justify-center">
            <h2 className={`${styles.heading} mb-3 sm:mb-4`}>{slot.headline}</h2>
            <p className={`${styles.body} mb-10 sm:mb-12 leading-relaxed opacity-80`}>{slot.subheading}</p>

            <div className="flex flex-col gap-5 sm:gap-6 pt-6 sm:pt-8 border-t border-border-muted">
              {slot.contact_footer_items.map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <p className={`${styles.eyebrow} uppercase tracking-widest text-xs opacity-50`}>
                    {item.title}
                  </p>
                  <p className={`${styles.body} opacity-80`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
