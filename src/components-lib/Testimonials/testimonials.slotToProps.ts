import type {
  TestimonialsProps,
  TestimonialsLayoutStructure,
  TestimonialsTokens,
  TestimonialsVideoGridSlot,
  TestimonialsFeaturedStatsSlot,
  TestimonialsNotesSlot,
  TestimonialsCarouselSlot,
} from './testimonials.types';

export function slotToTestimonialsProps(
  layoutStructure: TestimonialsLayoutStructure,
  tokens: TestimonialsTokens,
  slot: TestimonialsVideoGridSlot | TestimonialsFeaturedStatsSlot | TestimonialsNotesSlot | TestimonialsCarouselSlot
): TestimonialsProps {
  if (!layoutStructure) throw new Error('slotToTestimonialsProps: layoutStructure is required');
  if (!tokens) throw new Error('slotToTestimonialsProps: tokens is required');
  if (!slot) throw new Error('slotToTestimonialsProps: slot is required');

  switch (layoutStructure) {
    case 'video-grid':
      return { layoutStructure, tokens, slot: slot as TestimonialsVideoGridSlot };
    case 'featured-stats':
      return { layoutStructure, tokens, slot: slot as TestimonialsFeaturedStatsSlot };
    case 'notes':
      return { layoutStructure, tokens, slot: slot as TestimonialsNotesSlot };
    case 'carousel':
      return { layoutStructure, tokens, slot: slot as TestimonialsCarouselSlot };
  }
}