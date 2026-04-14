import type { ComponentType } from 'react';
import type { TestimonialsLayoutStructure, TestimonialsProps } from './testimonials.types';

import { TestimonialsVideoGridShell } from './Shells/TestimonialsVideoGridShell';
import { TestimonialsFeaturedStatsShell } from './Shells/TestimonialsFeaturedStatsShell';
import { TestimonialsNotesShell } from './Shells/TestimonialsNotesShell';
import { TestimonialsCarouselShell } from './Shells/TestimonialsCarouselShell';

const LAYOUT_REGISTRY: Record<TestimonialsLayoutStructure, ComponentType<TestimonialsProps>> = {
  'video-grid': TestimonialsVideoGridShell as ComponentType<TestimonialsProps>,
  'featured-stats': TestimonialsFeaturedStatsShell as ComponentType<TestimonialsProps>,
  'notes': TestimonialsNotesShell as ComponentType<TestimonialsProps>,
  'carousel': TestimonialsCarouselShell as ComponentType<TestimonialsProps>,
};

export function resolveTestimonialsLayout(
  layoutStructure: TestimonialsLayoutStructure
): ComponentType<TestimonialsProps> {
  const Shell = LAYOUT_REGISTRY[layoutStructure];

  if (!Shell) {
    throw new Error(
      `resolveTestimonialsLayout: no shell registered for layout "${layoutStructure}"`
    );
  }

  return Shell;
}