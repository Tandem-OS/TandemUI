import type { ContactBookingProfileShellProps } from '../contact.types';

export function ContactBookingProfileShell({ layoutStructure, slot, styles }: ContactBookingProfileShellProps) {
  if (layoutStructure !== 'booking_profile_split') {
    throw new Error(
      `ContactBookingProfileShell: expected "booking_profile_split", received "${layoutStructure}"`
    );
  }

  return (
    <section className={`${styles.wrapper} w-full px-6 md:px-12`}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Left — Profile */}
        <div className="flex flex-col justify-center">
          <img
            src={slot.contact_person_avatar_url}
            alt={slot.contact_person_name}
            className="w-20 h-20 rounded-full object-cover mb-6"
          />
          <h2 className={`${styles.heading} mb-2`}>{slot.headline}</h2>
          <p className={`${styles.body} mb-6`}>{slot.subheading}</p>

          <div className="flex flex-col gap-1">
            <p className={`${styles.heading} text-sm font-semibold`}>{slot.contact_person_name}</p>
            <p className={`${styles.subheading} text-sm`}>{slot.contact_person_role}</p>
          </div>

          <img
            src={slot.decorative_icon_url}
            alt=""
            aria-hidden="true"
            className="w-12 h-12 mt-8 opacity-60"
          />
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

          <div className="flex items-start gap-3 mt-6">
            <input
              type="checkbox"
              id="contact-checkbox"
              className="mt-1 flex-shrink-0"
            />
            <label
              htmlFor="contact-checkbox"
              className={`${styles.body} text-sm`}
            >
              {slot.checkbox_label}
            </label>
          </div>

          <button className={`${styles.action} w-full mt-6 px-6 py-3 font-medium`}>
            {slot.submit_button}
          </button>
        </div>

      </div>
    </section>
  );
}