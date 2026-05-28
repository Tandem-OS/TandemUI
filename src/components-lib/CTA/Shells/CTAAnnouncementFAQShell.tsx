import { useState } from 'react';
import type { CTAAnnouncementFAQShellProps } from '../cta.types';

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


export function CTAAnnouncementFAQShell({ layoutStructure, slot, styles }: CTAAnnouncementFAQShellProps) {
  if (layoutStructure !== 'announcement-faq') {
    throw new Error(
      `CTAAnnouncementFAQShell: expected "announcement-faq", received "${layoutStructure}"`
    );
  }

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    slot.faq_columns.forEach((col, ci) => {
      col.items.forEach((item, ii) => {
        initial[`${ci}-${ii}`] = item.is_expanded;
      });
    });
    return initial;
  });

  function toggleItem(key: string) {
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
  }

  // wrapperBg may be a design-system class name (not real CSS) — fall back to white
  const annBg = isValidHexColor(styles.wrapperBg) ? styles.wrapperBg : '#ffffff'
  const annText = isDarkHexColor(annBg) ? 'white' : '#111111'

  // FAQ surface — if surface is also a class name, use a light neutral
  const faqBg = isValidHexColor(styles.surface) ? styles.surface : '#f9fafb'

  return (
    <div className="w-full">
      {/* Announcement Panel */}
      <div
        className="px-6 py-16 text-center"
        style={{ backgroundColor: annBg, color: annText }}
      >
        <div className="max-w-3xl mx-auto">
          <p className={`${styles.mutedBody} mb-4 uppercase tracking-widest`}>
            {slot.eyebrow}
          </p>
          <h2 className={`${styles.heading} mb-6`}>
            {slot.section_heading}
          </h2>
          <p className={`${styles.body} mb-10`}>{slot.section_subheading}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className={styles.action}>
              {slot.primary_action}
            </button>
            <button className={styles.action}>
              {slot.secondary_action}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-6 py-16" style={{ backgroundColor: faqBg }}>
        <div className="max-w-6xl mx-auto">
          <h3 className={`${styles.heading} text-center mb-12`}>
            {slot.faq_section_heading}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {slot.faq_columns.map((col, ci) => (
              <div key={ci}>
                {col.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const isOpen = expandedItems[key];
                  return (
                    <div key={ii} className="py-4 border-b">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between text-left gap-4"
                      >
                        <span className={styles.body}>{item.question}</span>
                        <span className={`${styles.mutedBody} flex-shrink-0`}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <p className={`${styles.mutedBody} mt-3`}>
                          {item.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}