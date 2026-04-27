import { validateContactProps } from '../../components-lib/Contact/contact.validation';
import { slotToContactProps } from '../../components-lib/Contact/contact.slotToProps';
import { ContactBase } from '../../components-lib/Contact/ContactBase';
import type { ContactLayoutStructure, ContactTokens } from '../../components-lib/Contact/contact.types';

interface ContactRendererInput {
  layout_structure: string;
  tokens:           ContactTokens;
  content_slots:    Record<string, unknown>;
}

interface ContactRendererProps {
  raw: ContactRendererInput;
}

export function ContactRenderer({ raw }: ContactRendererProps) {
  const validated = validateContactProps({
    layoutStructure: raw.layout_structure as ContactLayoutStructure,
    tokens:          raw.tokens,
    slot:            raw.content_slots,
  });

  if (!validated) {
    console.error('[ContactRenderer] validateContactProps returned null', {
      layout_structure: raw.layout_structure,
      hasTokens:        Boolean(raw.tokens),
    })
    return null;
  }

  const props = slotToContactProps(
    validated.layoutStructure,
    validated.tokens,
    validated.slot
  );

  if (!props) {
    console.error('[ContactRenderer] slotToContactProps returned null', {
      layoutStructure: validated.layoutStructure,
    })
    return null;
  }

  return <ContactBase {...props} />;
}