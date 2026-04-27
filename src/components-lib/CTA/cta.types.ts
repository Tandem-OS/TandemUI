import type { CTAStyles } from './cta.tokensToStyles';

export type CTALayoutStructure =
  | 'hero-footer'
  | 'announcement-faq'
  | 'newsletter-centered'
  | 'search-footer';

// ─── Tokens (semantic strings from DB) 
export interface CTATokens {
  spacing: string;
  surface: string;
  'text-role': string;
  background: string;
  'body-scale': string;
  'footer-text': string;
  'action-style': string;
  'heading-scale': string;
  'footer-background': string;
  'section-heading-scale': string;
  'eyebrow-scale':         string;
  'label-scale':           string;
  'meta-scale':            string;
}

// ─── Shared 
export interface CTAFooterColumn {
  heading: string;
links: { label: string; href: string }[];
}

export interface CTAFAQItem {
  question: string;
  answer: string;
  is_expanded: boolean;
}

export interface CTAFAQColumn {
  items: CTAFAQItem[];
}

// ─── Hero Footer 
export interface CTAHeroFooterSlot {
  hero_headline: string;
  hero_subheading: string;
  hero_background_image_url: string;
  hero_background_image_alt: string;
  primary_action: string;
  logo_text: string;
  logo_icon_url: string;
  newsletter_heading: string;
  newsletter_text: string;
  newsletter_label: string;
  newsletter_placeholder: string;
  newsletter_button: string;
  footer_columns: CTAFooterColumn[];
  social_icons: string[];
  footer_bottom_text: string;
}

// ─── Announcement FAQ 
export interface CTAAnnouncementFAQSlot {
  section_heading: string;
  section_subheading: string;
  eyebrow: string;
  primary_action: string;
  secondary_action: string;
  faq_section_heading: string;
  faq_columns: CTAFAQColumn[];
}

// ─── Newsletter Centered 
export interface CTANewsletterCenteredSlot {
  headline: string;
  subheading: string;
  email_placeholder: string;
  form_button: string;
  social_proof_text: string;
  social_proof_avatars: string[];
}

// ─── Search Footer 
export interface CTASearchFooterSlot {
  hero_headline: string;
  hero_subheading: string;
  hero_background_image_url: string;
  hero_background_image_alt: string;
  search_label: string;
  search_placeholder: string;
  search_action: string;
  logo_text: string;
  brand_description: string;
  footer_columns: CTAFooterColumn[];
}

// ─── DB contract props (used by validateCTAProps, slotToCTAProps, CTABase)
export interface CTAHeroFooterProps {
  layoutStructure: 'hero-footer';
  tokens: CTATokens;
  slot: CTAHeroFooterSlot;
}

export interface CTAAnnouncementFAQProps {
  layoutStructure: 'announcement-faq';
  tokens: CTATokens;
  slot: CTAAnnouncementFAQSlot;
}

export interface CTANewsletterCenteredProps {
  layoutStructure: 'newsletter-centered';
  tokens: CTATokens;
  slot: CTANewsletterCenteredSlot;
}

export interface CTASearchFooterProps {
  layoutStructure: 'search-footer';
  tokens: CTATokens;
  slot: CTASearchFooterSlot;
}

export type CTAProps =
  | CTAHeroFooterProps
  | CTAAnnouncementFAQProps
  | CTANewsletterCenteredProps
  | CTASearchFooterProps;

// ─── Shell props (render-time — CTABase adds styles before passing to shells)
export type CTAHeroFooterShellProps         = CTAHeroFooterProps         & { styles: CTAStyles };
export type CTAAnnouncementFAQShellProps    = CTAAnnouncementFAQProps    & { styles: CTAStyles };
export type CTANewsletterCenteredShellProps = CTANewsletterCenteredProps & { styles: CTAStyles };
export type CTASearchFooterShellProps       = CTASearchFooterProps       & { styles: CTAStyles };

export type CTAShellProps =
  | CTAHeroFooterShellProps
  | CTAAnnouncementFAQShellProps
  | CTANewsletterCenteredShellProps
  | CTASearchFooterShellProps;