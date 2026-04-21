import type { ContactStyles } from './contact.tokensToStyles';

export type ContactLayoutStructure =
  | 'split_form_grid'
  | 'booking_profile_split'
  | 'full_page_split'
  | 'form_editorial_split';

// ─── Tokens 
export interface ContactTokens {
  spacing: string;
  surface: string;
  'text-role': string;
  background: string;
  'body-scale': string;
  'action-style': string;
  'form-surface': string;
  'heading-scale': string;
}

// ─── Shared
export interface ContactFormField {
  type: string;
  label: string;
  placeholder: string;
}

export interface ContactMethod {
  title: string;
  value: string;
}

export interface ContactFooterItem {
  title: string;
  value: string;
}

// ─── Split Form Grid
export interface ContactSplitFormSlot {
  headline: string;
  subheading: string;
  form_title: string;
  form_fields: ContactFormField[];
  submit_button: string;
  contact_methods: ContactMethod[];
  social_links: string[];
}

// ─── Booking Profile Split
export interface ContactBookingProfileSlot {
  headline: string;
  subheading: string;
  form_fields: ContactFormField[];
  submit_button: string;
  checkbox_label: string;
  contact_person_name: string;
  contact_person_role: string;
  decorative_icon_url: string;
  contact_person_avatar_url: string;
}

// ─── Full Page Split
export interface ContactFullPageSlot {
  headline: string;
  subheading: string;
  nav_links: string[];
  hero_label: string;
  nav_action: string;
  form_fields: ContactFormField[];
  submit_button: string;
  primary_action: string;
  contact_methods: ContactMethod[];
  nav_logo_icon_url: string;
}

// ─── Form Editorial Split
export interface ContactFormEditorialSlot {
  headline: string;
  subheading: string;
  nav_links: string[];
  nav_logo_text: string;
  form_fields: ContactFormField[];
  submit_button: string;
  contact_footer_items: ContactFooterItem[];
}

export interface ContactSplitFormProps {
  layoutStructure: 'split_form_grid';
  tokens: ContactTokens;
  slot: ContactSplitFormSlot;
}

export interface ContactBookingProfileProps {
  layoutStructure: 'booking_profile_split';
  tokens: ContactTokens;
  slot: ContactBookingProfileSlot;
}

export interface ContactFullPageProps {
  layoutStructure: 'full_page_split';
  tokens: ContactTokens;
  slot: ContactFullPageSlot;
}

export interface ContactFormEditorialProps {
  layoutStructure: 'form_editorial_split';
  tokens: ContactTokens;
  slot: ContactFormEditorialSlot;
}

export type ContactProps =
  | ContactSplitFormProps
  | ContactBookingProfileProps
  | ContactFullPageProps
  | ContactFormEditorialProps;

// ─── Shell props 
export type ContactSplitFormShellProps       = ContactSplitFormProps       & { styles: ContactStyles };
export type ContactBookingProfileShellProps  = ContactBookingProfileProps  & { styles: ContactStyles };
export type ContactFullPageShellProps        = ContactFullPageProps        & { styles: ContactStyles };
export type ContactFormEditorialShellProps   = ContactFormEditorialProps   & { styles: ContactStyles };

export type ContactShellProps =
  | ContactSplitFormShellProps
  | ContactBookingProfileShellProps
  | ContactFullPageShellProps
  | ContactFormEditorialShellProps;