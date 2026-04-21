import type { ContactSplitFormShellProps } from '../contact.types';

export function ContactSplitFormShell({ layoutStructure, slot, styles }: ContactSplitFormShellProps) {
  if (layoutStructure !== 'split_form_grid') {
    throw new Error(
      `ContactSplitFormShell: expected "split_form_grid", received "${layoutStructure}"`
    );
  }

  return (
    <section className={`${styles.wrapper} w-full px-6 md:px-12`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Left — Info */}
        <div className="flex flex-col justify-center">
          <h2 className={`${styles.heading} mb-4`}>{slot.headline}</h2>
          <p className={`${styles.body} mb-10`}>{slot.subheading}</p>

          <div className="flex flex-col gap-6 mb-10">
            {slot.contact_methods.map((method, i) => (
              <div key={i}>
                <p className={`${styles.heading} text-sm font-semibold mb-1`}>{method.title}</p>
                <p className={`${styles.body} text-sm`}>{method.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {slot.social_links.map((link, i) => (
              <span key={i} className={`${styles.subheading} text-sm font-medium`}>{link}</span>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className={`${styles.formSurface} rounded-xl p-8`}>
          <h3 className={`${styles.heading} text-lg mb-6`}>{slot.form_title}</h3>

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
    </section>
  );
}