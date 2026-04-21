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
          <h2 className={`${styles.heading} mb-4 leading-tight`}>
            {slot.hero_headline}
          </h2>
          <p className={`${styles.body} mb-10`}>{slot.hero_subheading}</p>

          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
            <div className="flex-1 w-full">
              <label className="block text-white/70 text-xs font-medium mb-1 text-left">
                {slot.search_label}
              </label>
              <input
                type="text"
                placeholder={slot.search_placeholder}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 backdrop-blur-sm"
              />
            </div>
            <button className={`${styles.action} px-6 py-3 whitespace-nowrap mt-5 sm:mt-0 self-end`}>
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
              <p className={`${styles.heading} font-bold text-lg mb-3`}>{slot.logo_text}</p>
              <p className={`${styles.footerText} text-sm leading-relaxed`}>{slot.brand_description}</p>
            </div>
            {slot.footer_columns.map((col, i) => (
              <div key={i}>
                <h4 className={`${styles.heading} font-semibold mb-4 text-sm`}>{col.heading}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className={`${styles.footerText} text-sm hover:text-white transition-colors`}>
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