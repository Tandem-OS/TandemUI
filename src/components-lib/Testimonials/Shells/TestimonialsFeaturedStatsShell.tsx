import type { TestimonialsFeaturedStatsProps } from '../testimonials.types';
import { renderStars, formatAuthorLine } from '../testimonials.shellUtils';

export function TestimonialsFeaturedStatsShell({ layoutStructure, slot }: TestimonialsFeaturedStatsProps) {
  if (layoutStructure !== 'featured-stats') {
    throw new Error(
      `TestimonialsFeaturedStatsShell: expected "featured-stats", received "${layoutStructure}"`
    );
  }

  const stars = renderStars(slot.rating_stars);
  const authorLine = formatAuthorLine(slot.author_name, slot.author_role);

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-center gap-1 mb-6">
          {stars.map((state, i) => (
            <span key={i} className={state === 'filled' ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}>
              {state === 'filled' ? '★' : '☆'}
            </span>
          ))}
        </div>

        <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 text-center leading-snug mb-8">
          "{slot.quote}"
        </blockquote>

        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold text-sm">
            {slot.author_avatar_text}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">{authorLine}</p>
            <p className="text-xs text-gray-500">{slot.company_name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slot.stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100"
            >
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}