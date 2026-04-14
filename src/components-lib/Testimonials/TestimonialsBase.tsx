import type { TestimonialsProps } from './testimonials.types';
import { resolveTestimonialsLayout } from './testimonials.layoutResolver';

export function TestimonialsBase(props: TestimonialsProps) {
  const Shell = resolveTestimonialsLayout(props.layoutStructure);
  return <Shell {...props} />;
}