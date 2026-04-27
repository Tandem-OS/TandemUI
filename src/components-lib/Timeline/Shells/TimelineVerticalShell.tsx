import type { TimelineVerticalEditorialShellProps } from '../timeline.types';

export function TimelineVerticalShell({ slot, styles }: TimelineVerticalEditorialShellProps) {
  return (
    <section className={styles.wrapper}>
      <div className="max-w-3xl mx-auto px-6">

        {slot.section_label && (
          <p className={`${styles.body} uppercase tracking-widest mb-10`}>
            {slot.section_label}
          </p>
        )}

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-current opacity-20" />

          <div className="flex flex-col gap-12 pl-8">
            {slot.timeline_items.map((item, index) => (
              <div key={index} className="relative">
                {/* Dot on spine */}
                <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-current opacity-60 -translate-x-1" />

                <p className={`${styles.mutedBody} mb-1`}>{item.year}</p>
                <h3 className={`${styles.heading} mb-2`}>{item.title}</h3>
                <p className={styles.body}>
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