import type { ComponentType } from 'react';
import type { TestimonialsLayoutStructure, TestimonialsShellProps } from './testimonials.types';

import { TestimonialsVideoGridShell } from './Shells/TestimonialsVideoGridShell';
import { TestimonialsFeaturedStatsShell } from './Shells/TestimonialsFeaturedStatsShell';
import { TestimonialsNotesShell } from './Shells/TestimonialsNotesShell';
import { TestimonialsCarouselShell } from './Shells/TestimonialsCarouselShell';

const LAYOUT_REGISTRY: Record<TestimonialsLayoutStructure, ComponentType<TestimonialsShellProps>> = {
  'video-grid':     TestimonialsVideoGridShell as ComponentType<TestimonialsShellProps>,
  'featured-stats': TestimonialsFeaturedStatsShell as ComponentType<TestimonialsShellProps>,
  'notes':          TestimonialsNotesShell as ComponentType<TestimonialsShellProps>,
  'carousel':       TestimonialsCarouselShell as ComponentType<TestimonialsShellProps>,
};

export function resolveTestimonialsLayout(
  layoutStructure: TestimonialsLayoutStructure
): ComponentType<TestimonialsShellProps> {
  const Shell = LAYOUT_REGISTRY[layoutStructure];

  if (!Shell) {
    throw new Error(
      `resolveTestimonialsLayout: no shell registered for layout "${layoutStructure}"`
    );
  }

  return Shell;
}