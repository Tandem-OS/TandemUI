import { validateTestimonialsProps } from '../../components-lib/Testimonials/testimonials.validation';
import { slotToTestimonialsProps } from '../../components-lib/Testimonials/testimonials.slotToProps';
import { TestimonialsBase } from '../../components-lib/Testimonials/TestimonialsBase';
import type { TestimonialsLayoutStructure, TestimonialsTokens } from '../../components-lib/Testimonials/testimonials.types';

interface TestimonialsRendererInput {
  layout_structure: string;
  tokens: TestimonialsTokens;
  content_slots: Record<string, unknown>;
}

interface TestimonialsRendererProps {
  raw: TestimonialsRendererInput;
}

export function TestimonialsRenderer({ raw }: TestimonialsRendererProps) {
  const validated = validateTestimonialsProps({
    layoutStructure: raw.layout_structure as TestimonialsLayoutStructure,
    tokens:          raw.tokens,
    slot:            raw.content_slots,
  });

  if (!validated) {
    console.error('[TestimonialsRenderer] validateTestimonialsProps returned null', {
      layout_structure: raw.layout_structure,
      hasTokens:        Boolean(raw.tokens),
    })
    return null;
  }

  const props = slotToTestimonialsProps(
    validated.layoutStructure,
    validated.tokens,
    validated.slot
  );

  if (!props) {
    console.error('[TestimonialsRenderer] slotToTestimonialsProps returned null', {
      layoutStructure: validated.layoutStructure,
    })
    return null;
  }

  return <TestimonialsBase {...props} />;
}