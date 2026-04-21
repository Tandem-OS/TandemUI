import type { TestimonialsFeaturedStatsShellProps } from '../testimonials.types';
import { renderStars, formatAuthorLine } from '../testimonials.shellUtils';

export function TestimonialsFeaturedStatsShell({ layoutStructure, slot, styles }: TestimonialsFeaturedStatsShellProps) {
  if (layoutStructure !== 'featured-stats') {
    throw new Error(
      `TestimonialsFeaturedStatsShell: expected "featured-stats", received "${layoutStructure}"`
    );
  }

  const stars = renderStars(slot.rating_stars);
  const authorLine = formatAuthorLine(slot.author_name, slot.author_role);

  return (
    <section className={`${styles.wrapper} w-full px-6 md:px-12`}>
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-center gap-1 mb-6">
          {stars.map((state, i) => (
            <span key={i} className={`${styles.accent} text-xl`}>
              {state === 'filled' ? '★' : '☆'}
            </span>
          ))}
        </div>

        <blockquote className={`${styles.heading} text-center leading-snug mb-8`}>
          "{slot.quote}"
        </blockquote>

        <div className="flex items-center justify-center gap-3 mb-12">
          <div className={`${styles.card} w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm`}>
            {slot.author_avatar_text}
          </div>
          <div className="text-left">
            <p className={`${styles.heading} text-sm`}>{authorLine}</p>
            <p className={`${styles.subheading} text-xs`}>{slot.company_name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slot.stats.map((stat, i) => (
            <div key={i} className={`${styles.card} text-center p-6 rounded-xl`}>
              <p className={`${styles.heading} text-3xl mb-1`}>{stat.value}</p>
              <p className={`${styles.subheading} text-sm`}>{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}