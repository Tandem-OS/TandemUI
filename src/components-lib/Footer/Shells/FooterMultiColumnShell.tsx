import type { FooterMultiColumnShellProps } from '../footer.types';

export function FooterMultiColumnShell({ slot, styles }: FooterMultiColumnShellProps) {
  return (
    <footer
      className={`${styles.wrapper}`}
      style={{ backgroundColor: slot.background_color }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 py-12 border-b border-current border-opacity-20">

          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src={slot.logo_icon_url}
                alt={slot.logo_text}
                className="h-8 w-auto object-contain"
              />
              <span className={styles.heading}>{slot.logo_text}</span>
            </div>
            <p className={styles.mutedBody}>
              {slot.brand_description}
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {slot.footer_columns.map((column, index: number) => (
              <div key={index} className="flex flex-col gap-3">
                <h4 className={styles.heading}>
                  {column.heading}
                </h4>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link: string, linkIndex: number) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className={`${styles.mutedBody} transition-opacity`}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <div className={`${styles.bottomBar} flex flex-col sm:flex-row items-center justify-between gap-4 py-6`}>
          <p className={styles.mutedBody}>{slot.footer_bottom_text}</p>
          <a
            href="#"
            className={`${styles.mutedBody} transition-opacity`}
          >
            {slot.footer_bottom_link}
          </a>
        </div>

      </div>
    </footer>
  );
}