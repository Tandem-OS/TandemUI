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
    return null;
  }

  const props = slotToContactProps(
    validated.layoutStructure,
    validated.tokens,
    validated.slot
  );

  if (!props) {
    return null;
  }

  return <ContactBase {...props} />;
}
