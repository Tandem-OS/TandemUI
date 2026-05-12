import type { ContactBookingProfileShellProps } from '../contact.types';
import { renderFormFields } from '../contact.shellUtils';

export function ContactBookingProfileShell({ layoutStructure, slot, styles }: ContactBookingProfileShellProps) {
  if (layoutStructure !== 'booking_profile_split') {
    throw new Error(
      `ContactBookingProfileShell: expected "booking_profile_split", received "${layoutStructure}"`
    );
  }

  return (
    <section className={`${styles.wrapper} w-full`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* Left — Profile */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 sm:mb-8">
              <img
                src={slot.contact_person_avatar_url}
                alt={slot.contact_person_name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-offset-2 ring-border-default"
              />
            </div>

            <h2 className={`${styles.heading} mb-2 sm:mb-3`}>{slot.headline}</h2>
            <p className={`${styles.body} mb-6 sm:mb-8 leading-relaxed opacity-80`}>{slot.subheading}</p>

            <div className="flex flex-col gap-1 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border-muted">
              <p className={`${styles.label} font-semibold`}>{slot.contact_person_name}</p>
              <p className={`${styles.mutedBody} opacity-60`}>{slot.contact_person_role}</p>
            </div>

            <img
              src={slot.decorative_icon_url}
              alt=""
              aria-hidden="true"
              className="w-10 h-10 sm:w-12 sm:h-12 opacity-40"
            />
          </div>

          {/* Right — Form */}
          <div className={`${styles.formSurface} rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm`}>
            <div className="flex flex-col gap-4 sm:gap-5">
              {renderFormFields(slot.form_fields, styles)}
            </div>

            <div className="flex items-start gap-3 mt-6">
              <input
                type="checkbox"
                id="contact-checkbox"
                className="mt-1 flex-shrink-0 w-4 h-4 rounded border-border-default accent-accent-default cursor-pointer"
              />
              <label
                htmlFor="contact-checkbox"
                className={`${styles.body} text-sm leading-relaxed opacity-70 cursor-pointer`}
              >
                {slot.checkbox_label}
              </label>
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
