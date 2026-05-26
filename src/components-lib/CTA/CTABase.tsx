import type { CTAProps } from './cta.types';
import { resolveCTALayout } from './cta.layoutResolver';
import { tokensToCTAStyles } from './cta.tokensToStyles';

export function CTABase(props: CTAProps) {
  if (!props.tokens || !props.layoutStructure) {
    return null;
  }
  const Shell = resolveCTALayout(props.layoutStructure);
  const styles = tokensToCTAStyles(props.tokens);
  return <Shell {...props} styles={styles} />;
}
