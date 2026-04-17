import type { CTAHeroFooterShellProps } from '../cta.types';

export function CTAHeroFooterShell({ layoutStructure, slot, styles }: CTAHeroFooterShellProps) {
  if (layoutStructure !== 'hero-footer') {
    throw new Error(
      `CTAHeroFooterShell: expected "hero-footer", received "${layoutStructure}"`
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full min-h-[480px] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <img
          src={slot.hero_background_image_url}
          alt={slot.hero_background_image_alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <img
              src={slot.logo_icon_url}
              alt={slot.logo_text}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className={styles.heading}>{slot.logo_text}</span>
          </div>
          <h2 className={`${styles.heading} mb-4`}>
            {slot.hero_headline}
          </h2>
          <p className={`${styles.body} mb-8`}>{slot.hero_subheading}</p>
          <button className={styles.action}>
            {slot.primary_action}
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <div className={`${styles.footerWrapper} px-6 py-12`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="max-w-sm">
            <h3 className={`${styles.heading} mb-2`}>{slot.newsletter_heading}</h3>
            <p className={styles.footerText}>{slot.newsletter_text}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder={slot.newsletter_placeholder}
              aria-label={slot.newsletter_label}
              className={`${styles.surface} px-4 py-2 rounded-lg w-full sm:w-72`}
            />
            <button className={styles.action}>
              {slot.newsletter_button}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`${styles.footerWrapper} border-t px-6 py-12`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
            {slot.footer_columns.map((col, i) => (
              <div key={i}>
                <h4 className={`${styles.heading} mb-4`}>{col.heading}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className={styles.mutedBody}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t">
            <p className={styles.footerText}>{slot.footer_bottom_text}</p>
            <div className="flex items-center gap-3">
              {slot.social_icons.map((icon, i) => (
                <img
                  key={i}
                  src={icon}
                  alt={`Social icon ${i + 1}`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}