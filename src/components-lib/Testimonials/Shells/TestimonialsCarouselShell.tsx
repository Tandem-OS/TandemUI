import { useState } from 'react';
import type { TestimonialsCarouselProps } from '../testimonials.types';
import { renderStars, formatAuthorLine } from '../testimonials.shellUtils';

export function TestimonialsCarouselShell({ layoutStructure, slot }: TestimonialsCarouselProps) {
  if (layoutStructure !== 'carousel') {
    throw new Error(
      `TestimonialsCarouselShell: expected "carousel", received "${layoutStructure}"`
    );
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const stars = renderStars(slot.rating_stars);
  const authorLine = formatAuthorLine(slot.author_name, slot.author_role);
  const total = slot.carousel_indicators.length;

  function handlePrev() {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }

  function handleNext() {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

        <div className="flex justify-center gap-1 mb-6">
          {stars.map((state, i) => (
            <span key={i} className={state === 'filled' ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}>
              {state === 'filled' ? '★' : '☆'}
            </span>
          ))}
        </div>

        <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 leading-snug mb-8">
          "{slot.quote}"
        </blockquote>

        <p className="text-sm font-semibold text-gray-900 mb-1">{authorLine}</p>
        <p className="text-xs text-gray-500 mb-8">{slot.author_supporting_text}</p>

        <div className="flex items-center gap-6">
          <button
            onClick={handlePrev}
            aria-label={slot.carousel_controls.left_control}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {slot.carousel_indicators.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeIndex ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label={slot.carousel_controls.right_control}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ›
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          {activeIndex + 1} / {total}
        </p>

      </div>
    </section>
  );
}