import type { CTANewsletterCenteredProps } from '../cta.types';

export function CTANewsletterCenteredShell({ layoutStructure, slot }: CTANewsletterCenteredProps) {
  if (layoutStructure !== 'newsletter-centered') {
    throw new Error(
      `CTANewsletterCenteredShell: expected "newsletter-centered", received "${layoutStructure}"`
    );
  }

  return (
    <section className="w-full py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {slot.headline}
        </h2>
        <p className="text-gray-500 text-lg mb-10">{slot.subheading}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <input
            type="email"
            placeholder={slot.email_placeholder}
            className="px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 w-full sm:w-80"
          />
          <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
            {slot.form_button}
          </button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {slot.social_proof_avatars.map((avatar, i) => (
              <img
                key={i}
                src={avatar}
                alt={`User ${i + 1}`}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">{slot.social_proof_text}</p>
        </div>

      </div>
    </section>
  );
}