import type { TimelineAlternatingMediaShellProps } from '../timeline.types';

export function TimelineAlternatingMediaShell({ slot, styles }: TimelineAlternatingMediaShellProps) {
  return (
    <section className={styles.wrapper}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="relative">
          {/* Central vertical divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-current opacity-20 -translate-x-1/2" />

          <div className="flex flex-col gap-24">
            {slot.timeline_items.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-10 ${
                  item.alignment === 'left_media' ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Media side */}
                <div className="w-full md:w-1/2">
                  <img
                    src={item.image_url}
                    alt={item.image_alt}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>

                {/* Text side */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  {item.eyebrow && (
                    <p className={`${styles.body} opacity-50 uppercase tracking-widest text-sm`}>
                      {item.eyebrow}
                    </p>
                  )}
                  <h3 className={styles.heading}>{item.title}</h3>
                  <p className={`${styles.subheading} opacity-80 leading-relaxed`}>
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