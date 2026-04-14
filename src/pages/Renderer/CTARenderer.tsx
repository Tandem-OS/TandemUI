import { validateCTAProps } from '../../components-lib/CTA/cta.validation';
import { slotToCTAProps } from '../../components-lib/CTA/cta.slotToProps';
import { CTABase } from '../../components-lib/CTA/CTABase';
import type { CTALayoutStructure } from '../../components-lib/CTA/cta.types';

interface CTARendererInput {
  layout_structure: string;
  tokens: Record<string, string>;
  content_slots: Record<string, unknown>;
}

interface CTARendererProps {
  raw: CTARendererInput;
}

export function CTARenderer({ raw }: CTARendererProps) {
  const validated = validateCTAProps({
    layoutStructure: raw.layout_structure as CTALayoutStructure,
    tokens: raw.tokens,
    slot: raw.content_slots,
  });

  const props = slotToCTAProps(
    validated.layoutStructure,
    validated.tokens,
    validated.slot
  );

  return <CTABase {...props} />;
}