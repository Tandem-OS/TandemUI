import type { TimelineVerticalEditorialShellProps } from '../timeline.types';

export function TimelineVerticalShell({ slot, styles }: TimelineVerticalEditorialShellProps) {
  return (
    <section className={`${styles.wrapper} w-full`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24">

        {slot.section_label && (
          <p className={`${styles.eyebrow} uppercase tracking-widest text-xs sm:text-sm opacity-50 mb-10 sm:mb-14`}>
            {slot.section_label}
          </p>
        )}

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-current opacity-10" />

          <div className="flex flex-col gap-10 sm:gap-14 pl-6 sm:pl-10">
            {slot.timeline_items.map((item, index) => (
              <div key={index} className="relative group">
                {/* Dot on spine */}
                <div className="absolute -left-6 sm:-left-10 top-2 w-2.5 h-2.5 rounded-full bg-current opacity-40 group-hover:opacity-80 transition-opacity duration-300 -translate-x-[calc(50%-0.5px)]" />

                <p className={`${styles.meta} text-xs sm:text-sm opacity-50 mb-1.5 font-medium tabular-nums`}>
                  {item.year}
                </p>
                <h3 className={`${styles.heading} mb-2 sm:mb-3`}>{item.title}</h3>
                <p className={`${styles.body} leading-relaxed opacity-75 max-w-prose`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
