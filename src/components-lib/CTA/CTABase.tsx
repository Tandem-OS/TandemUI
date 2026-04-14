import type { CTAProps } from './cta.types';
import { resolveCTALayout } from './cta.layoutResolver';

export function CTABase(props: CTAProps) {
  const Shell = resolveCTALayout(props.layoutStructure);
  return <Shell {...props} />;
}