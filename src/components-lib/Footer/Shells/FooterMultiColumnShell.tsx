import type { FooterMultiColumnShellProps } from '../footer.types';

// ── Color utilities ───────────────────────────────────────────────────────────
function isValidHexColor(val?: string | null): boolean {
  return !!val && /^#[0-9a-fA-F]{3,8}$/.test(val.trim())
}

function isDarkHexColor(val?: string | null): boolean {
  if (!val || !isValidHexColor(val)) return false
  const c = val.trim().replace('#', '')
  const full = c.length === 3 ? c[0] + c[0] + c[1] + c[1] + c[2] + c[2] : c
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.50
}


export function FooterMultiColumnShell({ slot, styles }: FooterMultiColumnShellProps) {
  return (
    <footer
      className={`${styles.wrapper}`}
      style={{ backgroundColor: slot.background_color, color: isDarkHexColor(slot.background_color) ? 'white' : undefined }}
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
                  {column.links.map((link, linkIndex: number) => (
                    <li key={linkIndex}>
                      <a href={link.href} className={`${styles.mutedBody} transition-opacity`}>
                        {link.label}
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