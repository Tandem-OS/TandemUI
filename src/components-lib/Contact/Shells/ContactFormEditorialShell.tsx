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
      <nav className={`${styles.surface} w-full px-6 md:px-12 py-4`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className={styles.heading}>{slot.nav_logo_text}</span>
          <div className="flex items-center gap-8">
            {slot.nav_links.map((link, i) => (
              <span key={i} className={styles.body}>{link}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Left — Form */}
        <div className={`${styles.formSurface} rounded-xl p-8`}>
          <div className="flex flex-col gap-4">
            {renderFormFields(slot.form_fields, styles)}
          </div>

          <button className={`${styles.action} w-full mt-6`}>
            {slot.submit_button}
          </button>
        </div>

        {/* Right — Editorial */}
        <div className="flex flex-col justify-center">
          <h2 className={`${styles.heading} mb-4`}>{slot.headline}</h2>
          <p className={`${styles.body} mb-12`}>{slot.subheading}</p>

          <div className="flex flex-col gap-6 pt-8 border-t border-opacity-20">
            {slot.contact_footer_items.map((item, i) => (
              <div key={i}>
                <p className={`${styles.mutedBody} uppercase tracking-widest mb-1`}>
                  {item.title}
                </p>
                <p className={styles.body}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}