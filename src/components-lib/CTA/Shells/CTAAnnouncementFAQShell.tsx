import { useState } from 'react';
import type { CTAAnnouncementFAQShellProps } from '../cta.types';

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

  return (
    <div className="w-full">
      {/* Announcement Panel */}
      <div className={`${styles.wrapper} px-6 py-16 text-center`}>
        <div className="max-w-3xl mx-auto">
          <p className={`${styles.footerText} text-sm font-medium mb-4 uppercase tracking-widest`}>
            {slot.eyebrow}
          </p>
          <h2 className={`${styles.heading} mb-6 leading-tight`}>
            {slot.section_heading}
          </h2>
          <p className={`${styles.body} mb-10`}>{slot.section_subheading}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className={`${styles.action} px-8 py-3`}>
              {slot.primary_action}
            </button>
            <button className="px-8 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:border-gray-400 transition-colors">
              {slot.secondary_action}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`${styles.surface} px-6 py-16`}>
        <div className="max-w-6xl mx-auto">
          <h3 className={`${styles.heading} text-center mb-12`}>
            {slot.faq_section_heading}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {slot.faq_columns.map((col, ci) => (
              <div key={ci} className="divide-y divide-gray-100">
                {col.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const isOpen = expandedItems[key];
                  return (
                    <div key={ii} className="py-4">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between text-left gap-4"
                      >
                        <span className={`${styles.body} text-sm font-medium`}>{item.question}</span>
                        <span className="text-gray-400 text-lg flex-shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <p className={`${styles.body} mt-3 text-sm leading-relaxed`}>
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