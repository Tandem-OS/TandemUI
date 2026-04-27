import type {
  CTAProps,
  CTALayoutStructure,
  CTATokens,
  CTAHeroFooterSlot,
  CTAAnnouncementFAQSlot,
  CTANewsletterCenteredSlot,
  CTASearchFooterSlot,
} from './cta.types';

export function slotToCTAProps(
  layoutStructure: CTALayoutStructure,
  tokens: CTATokens,
  slot:
    | CTAHeroFooterSlot
    | CTAAnnouncementFAQSlot
    | CTANewsletterCenteredSlot
    | CTASearchFooterSlot
): CTAProps {
  if (!layoutStructure) throw new Error('slotToCTAProps: layoutStructure is required');
  if (!tokens) throw new Error('slotToCTAProps: tokens is required');
  if (!slot) throw new Error('slotToCTAProps: slot is required');

  switch (layoutStructure) {
    case 'hero-footer':
      return { layoutStructure, tokens, slot: slot as CTAHeroFooterSlot };
    case 'announcement-faq':
      return { layoutStructure, tokens, slot: slot as CTAAnnouncementFAQSlot };
    case 'newsletter-centered':
      return { layoutStructure, tokens, slot: slot as CTANewsletterCenteredSlot };
    case 'search-footer':
      return { layoutStructure, tokens, slot: slot as CTASearchFooterSlot };
  }
}