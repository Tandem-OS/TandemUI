import type { FooterProps } from './footer.types';
import { resolveFooterLayout } from './footer.layoutResolver';
import { tokensToFooterStyles } from './footer.tokensToStyles';

export function FooterBase(props: FooterProps) {
  if (!props.tokens || !props.layoutStructure) {
    return null;
  }
  const Shell = resolveFooterLayout(props.layoutStructure);
  const styles = tokensToFooterStyles(props.tokens);
  return <Shell {...props} styles={styles} />;
}
