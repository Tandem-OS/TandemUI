import type { CTASearchFooterShellProps } from '../cta.types';

export function CTASearchFooterShell({ layoutStructure, slot, styles }: CTASearchFooterShellProps) {
  if (layoutStructure !== 'search-footer') {
    throw new Error(
      `CTASearchFooterShell: expected "search-footer", received "${layoutStructure}"`
    );
  }

  return (
    <div className="w-full">
      {/* Hero Search Section */}
      <div className="relative w-full min-h-[480px] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <img
          src={slot.hero_background_image_url}
          alt={slot.hero_background_image_alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className={`${styles.heading} mb-4`}>
            {slot.hero_headline}
          </h2>
          <p className={`${styles.body} mb-10`}>{slot.hero_subheading}</p>

          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
            <div className="flex-1 w-full">
              <label className={`${styles.mutedBody} block mb-1 text-left`}>
                {slot.search_label}
              </label>
              <input
                type="text"
                placeholder={slot.search_placeholder}
                className={`${styles.surface} w-full px-4 py-3 rounded-lg`}
              />
            </div>
            <button className={`${styles.action} whitespace-nowrap mt-5 sm:mt-0 self-end`}>
              {slot.search_action}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`${styles.footerWrapper} px-6 py-14`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <p className={`${styles.heading} mb-3`}>{slot.logo_text}</p>
              <p className={styles.mutedBody}>{slot.brand_description}</p>
            </div>
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
        </div>
      </div>
    </div>
  );
}