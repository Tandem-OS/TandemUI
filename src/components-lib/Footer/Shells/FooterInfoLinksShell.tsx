import type { FooterInfoLinksBarShellProps } from '../footer.types';

export function FooterInfoLinksShell({ slot, styles }: FooterInfoLinksBarShellProps) {
  return (
    <footer
      className={`${styles.wrapper}`}
      style={{ backgroundColor: slot.background_color }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 py-12 border-b border-current border-opacity-20">
          {slot.info_columns.map((column, index: number) => (
            <div key={index} className="flex flex-col gap-3">
              <h4 className={styles.heading}>{column.heading}</h4>
              {column.lines && column.lines.map((line: string, lineIndex: number) => (
                <p key={lineIndex} className={styles.mutedBody}>
                  {line}
                </p>
              ))}
              {column.icon_blocks && column.icon_blocks.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {column.icon_blocks.map((iconUrl: string, iconIndex: number) => (
                    <img
                      key={iconIndex}
                      src={iconUrl}
                      alt=""
                      className="h-10 w-auto object-contain"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <nav className="flex flex-wrap gap-8 py-10 border-b border-current border-opacity-20">
          {slot.large_links.map((link: string, index: number) => (
            <a
              key={index}
              href="#"
              className={`${styles.heading} transition-opacity`}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-6 py-6 border-b border-current border-opacity-20">
          {slot.legal_links.map((link: string, index: number) => (
            <a
              key={index}
              href="#"
              className={`${styles.mutedBody} transition-opacity`}
            >
              {link}
            </a>
          ))}
        </div>

      </div>

      <div
        className="w-full"
        style={{ backgroundColor: slot.bottom_bar_color }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <span className={styles.mutedBody}>{slot.copyright_left}</span>
            <span className={styles.mutedBody}>{slot.copyright_right}</span>
          </div>
          <a
            href="#"
            className={`${styles.mutedBody} transition-opacity`}
          >
            {slot.bottom_bar_cta}
          </a>
        </div>
      </div>

    </footer>
  );
}