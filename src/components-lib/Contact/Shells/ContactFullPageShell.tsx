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
      <nav className={`${styles.surface} w-full px-6 md:px-12 py-4`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <img
            src={slot.nav_logo_icon_url}
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          <div className="flex items-center gap-8">
            {slot.nav_links.map((link, i) => (
              <span key={i} className={styles.body}>{link}</span>
            ))}
          </div>
          <button className={styles.action}>
            {slot.nav_action}
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Left — Info */}
        <div className="flex flex-col justify-start">
          <span className={`${styles.mutedBody} uppercase tracking-widest mb-4`}>
            {slot.hero_label}
          </span>
          <h2 className={`${styles.heading} mb-4`}>{slot.headline}</h2>
          <p className={`${styles.body} mb-10`}>{slot.subheading}</p>

          <div className="flex flex-col gap-6 mb-10">
            {slot.contact_methods.map((method, i) => (
              <div key={i}>
                <p className={`${styles.heading} mb-1`}>{method.title}</p>
                <p className={styles.body}>{method.value}</p>
              </div>
            ))}
          </div>

          {slot.primary_action && (
            <button className={styles.action}>
              {slot.primary_action}
            </button>
          )}
        </div>

        {/* Right — Form */}
        <div className={`${styles.formSurface} rounded-xl p-8`}>
          <div className="flex flex-col gap-4">
            {renderFormFields(slot.form_fields, styles)}
          </div>

          <button className={`${styles.action} w-full mt-6`}>
            {slot.submit_button}
          </button>
        </div>

      </div>
    </div>
  );
}