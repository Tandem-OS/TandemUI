import type { TimelineAlternatingMediaShellProps } from '../timeline.types';

export function TimelineAlternatingMediaShell({ slot, styles }: TimelineAlternatingMediaShellProps) {
  return (
    <section className={`${styles.wrapper} w-full`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24">

        <div className="relative">
          {/* Central vertical divider — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-current opacity-10 -translate-x-1/2" />

          <div className="flex flex-col gap-16 sm:gap-20 md:gap-28">
            {slot.timeline_items.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-16 ${
                  item.alignment === 'right_media' ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Media side */}
                <div className="w-full md:w-1/2">
                  <img
                    src={item.image_url}
                    alt={item.image_alt}
                    className="w-full h-56 sm:h-72 md:h-80 rounded-2xl object-cover shadow-sm"
                  />
                </div>

                {/* Text side */}
                <div className={`w-full md:w-1/2 flex flex-col gap-3 sm:gap-4 ${
                  item.alignment === 'right_media' ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'
                }`}>
                  {item.eyebrow && (
                    <p className={`${styles.eyebrow} uppercase tracking-widest text-xs opacity-50`}>
                      {item.eyebrow}
                    </p>
                  )}
                  <h3 className={`${styles.heading}`}>{item.title}</h3>
                  <p className={`${styles.body} leading-relaxed opacity-75 max-w-prose`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
