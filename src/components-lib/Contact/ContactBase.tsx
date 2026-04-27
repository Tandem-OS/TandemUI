import type { ContactProps } from './contact.types';
import { resolveContactLayout } from './contact.layoutResolver';
import { tokensToContactStyles } from './contact.tokensToStyles';

export function ContactBase(props: ContactProps) {
  if (!props.tokens || !props.layoutStructure) {
    console.error('[ContactBase] Missing tokens or layoutStructure — section will not render', {
      layoutStructure: props.layoutStructure ?? '(missing)',
      hasTokens: Boolean(props.tokens),
    });
    return null;
  }
  const Shell = resolveContactLayout(props.layoutStructure);
  const styles = tokensToContactStyles(props.tokens);
  return <Shell {...props} styles={styles} />;
}