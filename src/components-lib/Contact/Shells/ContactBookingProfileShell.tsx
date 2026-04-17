import type { ContactBookingProfileShellProps } from '../contact.types';
import { renderFormFields } from '../contact.shellUtils';

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
            <p className={styles.heading}>{slot.contact_person_name}</p>
            <p className={styles.mutedBody}>{slot.contact_person_role}</p>
          </div>

          <img
            src={slot.decorative_icon_url}
            alt=""
            aria-hidden="true"
            className="w-12 h-12 mt-8"
          />
        </div>

        {/* Right — Form */}
        <div className={`${styles.formSurface} rounded-xl p-8`}>
          <div className="flex flex-col gap-4">
            {renderFormFields(slot.form_fields, styles)}
          </div>

          <div className="flex items-start gap-3 mt-6">
            <input
              type="checkbox"
              id="contact-checkbox"
              className="mt-1 flex-shrink-0"
            />
            <label htmlFor="contact-checkbox" className={styles.body}>
              {slot.checkbox_label}
            </label>
          </div>

          <button className={`${styles.action} w-full mt-6`}>
            {slot.submit_button}
          </button>
        </div>

      </div>
    </section>
  );
}