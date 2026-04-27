import type { TestimonialsProps } from './testimonials.types';
import { resolveTestimonialsLayout } from './testimonials.layoutResolver';
import { tokensToTestimonialsStyles } from './testimonials.tokensToStyles';

export function TestimonialsBase(props: TestimonialsProps) {
  if (!props.tokens || !props.layoutStructure) {
    console.error('[TestimonialsBase] Missing tokens or layoutStructure — section will not render', {
      layoutStructure: props.layoutStructure ?? '(missing)',
      hasTokens: Boolean(props.tokens),
    });
    return null;
  }
  const Shell = resolveTestimonialsLayout(props.layoutStructure);
  const styles = tokensToTestimonialsStyles(props.tokens);
  return <Shell {...props} styles={styles} />;
}