import { validateTestimonialsProps } from '../../components-lib/Testimonials/testimonials.validation';
import { slotToTestimonialsProps } from '../../components-lib/Testimonials/testimonials.slotToProps';
import { TestimonialsBase } from '../../components-lib/Testimonials/TestimonialsBase';
import type { TestimonialsLayoutStructure } from '../../components-lib/Testimonials/testimonials.types';

interface TestimonialsRendererInput {
  layout_structure: string;
  tokens: Record<string, string>;
  content_slots: Record<string, unknown>;
}

interface TestimonialsRendererProps {
  raw: TestimonialsRendererInput;
}

export function TestimonialsRenderer({ raw }: TestimonialsRendererProps) {
  const validated = validateTestimonialsProps({
    layoutStructure: raw.layout_structure as TestimonialsLayoutStructure,
    tokens: raw.tokens,
    slot: raw.content_slots,
  });

  const props = slotToTestimonialsProps(
    validated.layoutStructure,
    validated.tokens,
    validated.slot
  );

  return <TestimonialsBase {...props} />;
}