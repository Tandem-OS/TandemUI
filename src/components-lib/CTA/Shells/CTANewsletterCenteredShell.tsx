import type { CTANewsletterCenteredShellProps } from '../cta.types';

export function CTANewsletterCenteredShell({ layoutStructure, slot, styles }: CTANewsletterCenteredShellProps) {
  if (layoutStructure !== 'newsletter-centered') {
    throw new Error(
      `CTANewsletterCenteredShell: expected "newsletter-centered", received "${layoutStructure}"`
    );
  }

  return (
    <section className={`${styles.wrapper} w-full px-6`}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className={`${styles.heading} mb-4`}>{slot.headline}</h2>
        <p className={`${styles.body} mb-10`}>{slot.subheading}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <input
            type="email"
            placeholder={slot.email_placeholder}
            className={`${styles.surface} px-4 py-3 rounded-lg w-full sm:w-80`}
          />
          <button className={styles.action}>{slot.form_button}</button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {slot.social_proof_avatars.map((avatar, i) => (
              <img key={i} src={avatar} alt={`User ${i + 1}`} className="w-8 h-8 rounded-full object-cover" />
            ))}
          </div>
          <p className={styles.mutedBody}>{slot.social_proof_text}</p>
        </div>
      </div>
    </section>
  );
}