import { validateCTAProps } from '../../components-lib/CTA/cta.validation';
import { slotToCTAProps } from '../../components-lib/CTA/cta.slotToProps';
import { CTABase } from '../../components-lib/CTA/CTABase';
import type { CTALayoutStructure, CTATokens } from '../../components-lib/CTA/cta.types';

interface CTARendererInput {
  layout_structure: string;
  tokens:           CTATokens;
  content_slots:    Record<string, unknown>;
}

interface CTARendererProps {
  raw: CTARendererInput;
}

export function CTARenderer({ raw }: CTARendererProps) {
  const validated = validateCTAProps({
    layoutStructure: raw.layout_structure as CTALayoutStructure,
    tokens:          raw.tokens,
    slot:            raw.content_slots,
  });

  if (!validated) {
    return null;
  }

  const props = slotToCTAProps(
    validated.layoutStructure,
    validated.tokens,
    validated.slot
  );

  if (!props) {
    return null;
  }

  return <CTABase {...props} />;
}
