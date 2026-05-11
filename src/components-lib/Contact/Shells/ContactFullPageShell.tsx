import type { ContactFullPageShellProps } from '../contact.types';
import { renderFormFields } from '../contact.shellUtils';

export function ContactFullPageShell({ layoutStructure, slot, styles }: ContactFullPageShellProps) {
  if (layoutStructure !== 'full_page_split') {
    throw new Error(
      `ContactFullPageShell: expected "full_page_split", received "${layoutStructure}"`
    );
  }

  return (
    <div className={`${styles.wrapper} w-full`}>

      {/* Nav */}
      <nav className={`${styles.surface} w-full border-b border-border-muted`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between gap-4">
          <img
            src={slot.nav_logo_icon_url}
            alt="Logo"
            className="w-8 h-8 object-contain flex-shrink-0"
          />
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
          <button
            className={`${styles.action} hidden md:inline-flex items-center text-sm px-4 py-2 transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            {slot.nav_action}
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">

          {/* Left — Info */}
          <div className="flex flex-col justify-start">
            <span className={`${styles.eyebrow} uppercase tracking-widest text-xs sm:text-sm mb-4 sm:mb-5 opacity-60`}>
              {slot.hero_label}
            </span>
            <h2 className={`${styles.heading} mb-3 sm:mb-4`}>{slot.headline}</h2>
            <p className={`${styles.body} mb-8 sm:mb-10 leading-relaxed opacity-80`}>{slot.subheading}</p>

            <div className="flex flex-col gap-5 sm:gap-6 mb-8 sm:mb-10">
              {slot.contact_methods.map((method, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <p className={`${styles.label} font-semibold text-sm`}>{method.title}</p>
                  <p className={`${styles.body} opacity-70`}>{method.value}</p>
                </div>
              ))}
            </div>

            {slot.primary_action && (
              <button
                className={`${styles.action} self-start transition-opacity duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                {slot.primary_action}
              </button>
            )}
          </div>

          {/* Right — Form */}
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

        </div>
      </div>
    </div>
  );
}
