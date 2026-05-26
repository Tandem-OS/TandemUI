import type { ContactProps } from './contact.types';
import { resolveContactLayout } from './contact.layoutResolver';
import { tokensToContactStyles } from './contact.tokensToStyles';

export function ContactBase(props: ContactProps) {
  if (!props.tokens || !props.layoutStructure) {
    return null;
  }
  const Shell = resolveContactLayout(props.layoutStructure);
  const styles = tokensToContactStyles(props.tokens);
  return <Shell {...props} styles={styles} />;
}
