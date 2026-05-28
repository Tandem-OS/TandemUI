import type { CTANewsletterCenteredShellProps } from '../cta.types';

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

export function CTANewsletterCenteredShell({ layoutStructure, slot, styles }: CTANewsletterCenteredShellProps) {
  if (layoutStructure !== 'newsletter-centered') {
    throw new Error(
      `CTANewsletterCenteredShell: expected "newsletter-centered", received "${layoutStructure}"`
    );
  }

  // wrapperBg may be a design-system class name like "cta-background" (no CSS defined).
  // Only use it if it's a real hex value; otherwise default to white.
  const bgColor = isValidHexColor(styles.wrapperBg) ? styles.wrapperBg : '#ffffff'
  const textColor = isDarkHexColor(bgColor) ? 'white' : '#111111'

  return (
    <section
      className={`${styles.wrapper} w-full px-6`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
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