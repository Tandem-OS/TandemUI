import type {
  ContactProps,
  ContactLayoutStructure,
  ContactTokens,
  ContactSplitFormSlot,
  ContactBookingProfileSlot,
  ContactFullPageSlot,
  ContactFormEditorialSlot,
} from './contact.types';

export function slotToContactProps(
  layoutStructure: ContactLayoutStructure,
  tokens: ContactTokens,
  slot:
    | ContactSplitFormSlot
    | ContactBookingProfileSlot
    | ContactFullPageSlot
    | ContactFormEditorialSlot
): ContactProps {
  if (!layoutStructure) throw new Error('slotToContactProps: layoutStructure is required');
  if (!tokens) throw new Error('slotToContactProps: tokens is required');
  if (!slot) throw new Error('slotToContactProps: slot is required');

  switch (layoutStructure) {
    case 'split_form_grid':
      return { layoutStructure, tokens, slot: slot as ContactSplitFormSlot };
    case 'booking_profile_split':
      return { layoutStructure, tokens, slot: slot as ContactBookingProfileSlot };
    case 'full_page_split':
      return { layoutStructure, tokens, slot: slot as ContactFullPageSlot };
    case 'form_editorial_split':
      return { layoutStructure, tokens, slot: slot as ContactFormEditorialSlot };
  }
}