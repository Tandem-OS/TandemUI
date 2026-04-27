import { useState } from 'react';
import type { TestimonialsCarouselShellProps } from '../testimonials.types';
import { renderStars, formatAuthorLine } from '../testimonials.shellUtils';

export function TestimonialsCarouselShell({ layoutStructure, slot, styles }: TestimonialsCarouselShellProps) {
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
    <section className={`${styles.wrapper} w-full px-6 md:px-12`}>
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

        <div className="flex justify-center gap-1 mb-6">
          {stars.map((state, i) => (
            <span key={i} className={styles.accent}>
              {state === 'filled' ? '★' : '☆'}
            </span>
          ))}
        </div>

        <blockquote className={`${styles.heading} mb-8`}>
          "{slot.quote}"
        </blockquote>

        <p className={`${styles.heading} mb-1`}>{authorLine}</p>
        <p className={`${styles.subheading} mb-8`}>{slot.author_supporting_text}</p>

        <div className="flex items-center gap-6">
          <button
            onClick={handlePrev}
            aria-label={slot.carousel_controls.left_control}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
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
                  i === activeIndex ? styles.card : styles.subheading
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label={slot.carousel_controls.right_control}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
          >
            ›
          </button>
        </div>

        <p className={`${styles.subheading} mt-4`}>
          {activeIndex + 1} / {total}
        </p>

      </div>
    </section>
  );
}