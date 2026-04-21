import type { TestimonialsVideoGridShellProps } from '../testimonials.types';
import { formatSpeakers } from '../testimonials.shellUtils';

export function TestimonialsVideoGridShell({ layoutStructure, slot, styles }: TestimonialsVideoGridShellProps) {
  if (layoutStructure !== 'video-grid') {
    throw new Error(
      `TestimonialsVideoGridShell: expected "video-grid", received "${layoutStructure}"`
    );
  }

  return (
    <section className={`${styles.wrapper} w-full px-6 md:px-12`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`${styles.heading} text-center mb-12`}>
          {slot.section_heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {slot.testimonials.map((item, index) => (
            <div key={index} className={`${styles.card} rounded-xl overflow-hidden`}>
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={item.video_thumbnail_url}
                  alt={item.video_thumbnail_alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <span className="text-gray-900 text-lg ml-1">▶</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className={`${styles.heading} text-base mb-2`}>{item.title}</h3>
                <p className={`${styles.body} text-sm mb-4`}>{item.description}</p>
                <p className={`${styles.subheading} text-xs font-medium`}>
                  {formatSpeakers(item.speakers, item.speaker_label)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}