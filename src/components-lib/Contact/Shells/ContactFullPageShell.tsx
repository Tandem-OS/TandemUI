import type { ContactFullPageShellProps } from '../contact.types';

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
              <span key={i} className={`${styles.body} text-sm`}>{link}</span>
            ))}
          </div>
          <button className={`${styles.action} px-5 py-2 text-sm font-medium`}>
            {slot.nav_action}
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Left — Info */}
        <div className="flex flex-col justify-start">
          <span className={`${styles.subheading} text-xs font-semibold uppercase tracking-widest mb-4`}>
            {slot.hero_label}
          </span>
          <h2 className={`${styles.heading} mb-4`}>{slot.headline}</h2>
          <p className={`${styles.body} mb-10`}>{slot.subheading}</p>

          <div className="flex flex-col gap-6">
            {slot.contact_methods.map((method, i) => (
              <div key={i}>
                <p className={`${styles.heading} text-sm font-semibold mb-1`}>{method.title}</p>
                <p className={`${styles.body} text-sm`}>{method.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className={`${styles.formSurface} rounded-xl p-8`}>
          <div className="flex flex-col gap-4">
            {slot.form_fields.map((field, i) => (
              <div key={i} className="flex flex-col gap-1">
                <label className={`${styles.body} text-sm font-medium`}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    placeholder={field.placeholder}
                    rows={4}
                    className={`${styles.surface} w-full px-4 py-3 rounded-lg text-sm focus:outline-none resize-none`}
                  />
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`${styles.surface} w-full px-4 py-3 rounded-lg text-sm focus:outline-none`}
                  />
                )}
              </div>
            ))}
          </div>

          <button className={`${styles.action} w-full mt-6 px-6 py-3 font-medium`}>
            {slot.submit_button}
          </button>
        </div>

      </div>
    </div>
  );
}