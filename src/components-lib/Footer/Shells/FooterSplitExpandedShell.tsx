import type { FooterSplitExpandedShellProps } from '../footer.types';

export function FooterSplitExpandedShell({ slot, styles }: FooterSplitExpandedShellProps) {
  return (
    <footer
      className={`${styles.wrapper}`}
      style={{ backgroundColor: slot.background_color }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-8 border-b border-current border-opacity-20">
          <div className="flex items-center gap-3">
            <img
              src={slot.logo_icon_url}
              alt={slot.brand_text}
              className="h-8 w-auto object-contain"
            />
            <span className={styles.heading}>{slot.brand_text}</span>
          </div>

          <nav className="flex flex-wrap items-center gap-6">
            {slot.primary_links.map((link: string, index: number) => (
              <a
                key={index}
                href="#"
                className={`${styles.mutedBody} transition-opacity flex items-center gap-1`}
              >
                {slot.link_style === 'arrow_links' && (
                  <span aria-hidden="true">→</span>
                )}
                {link}
              </a>
            ))}
          </nav>

          <a
            href="#"
            className={`${styles.action} px-6 py-2 rounded-lg whitespace-nowrap`}
          >
            {slot.primary_action}
          </a>
        </div>

        <div className="py-8 border-b border-current border-opacity-20">
          <h3 className={`${styles.heading} mb-4`}>{slot.expanded_content_title}</h3>
          <ul className="flex flex-col gap-3">
            {slot.expanded_content_lines.map((line: string, index: number) => (
              <li key={index} className={styles.mutedBody}>
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.bottomBar} flex flex-col sm:flex-row items-center justify-between gap-4 py-6`}>
          <p className={styles.mutedBody}>{slot.copyright_text}</p>
          <nav className="flex flex-wrap items-center gap-6">
            {slot.bottom_links.map((link: string, index: number) => (
              <a
                key={index}
                href="#"
                className={`${styles.mutedBody} transition-opacity`}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
}