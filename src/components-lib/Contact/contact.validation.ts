import type {
  ContactTokens,
  ContactProps,
  ContactLayoutStructure,
  ContactFormField,
  ContactMethod,
  ContactFooterItem,
  ContactSplitFormSlot,
  ContactBookingProfileSlot,
  ContactFullPageSlot,
  ContactFormEditorialSlot,
} from './contact.types';

const VALID_LAYOUTS: ContactLayoutStructure[] = [
  'split_form_grid',
  'booking_profile_split',
  'full_page_split',
  'form_editorial_split',
];

function validateTokens(tokens: unknown): ContactTokens {
  if (!tokens || typeof tokens !== 'object') {
    throw new Error('ContactTokens: must be an object');
  }
  const t = tokens as Record<string, unknown>;

  const requiredKeys: (keyof ContactTokens)[] = [
    'spacing', 'surface', 'text-role', 'background',
    'body-scale', 'action-style', 'form-surface', 'heading-scale',
    'section-heading-scale', 'eyebrow-scale', 'label-scale', 'meta-scale',
  ];

  for (const key of requiredKeys) {
    if (typeof t[key] !== 'string' || !(t[key] as string).trim()) {
      throw new Error(`ContactTokens: "${key}" is required`);
    }
  }

  return {
    spacing: t['spacing'] as string,
    surface: t['surface'] as string,
    'text-role': t['text-role'] as string,
    background: t['background'] as string,
    'body-scale': t['body-scale'] as string,
    'action-style': t['action-style'] as string,
    'form-surface': t['form-surface'] as string,
    'heading-scale': t['heading-scale'] as string,
    'section-heading-scale': t['section-heading-scale'] as string,
    'eyebrow-scale': t['eyebrow-scale'] as string,
    'label-scale': t['label-scale'] as string,
    'meta-scale': t['meta-scale'] as string,
  };

}

function validateFormField(field: unknown, index: number): ContactFormField {
  const ctx = `form_fields[${index}]`;
  if (!field || typeof field !== 'object') throw new Error(`${ctx}: must be an object`);
  const f = field as Record<string, unknown>;

  if (typeof f.type !== 'string' || !f.type.trim()) throw new Error(`${ctx}: type is required`);
  if (typeof f.label !== 'string' || !f.label.trim()) throw new Error(`${ctx}: label is required`);
  if (typeof f.placeholder !== 'string' || !f.placeholder.trim()) throw new Error(`${ctx}: placeholder is required`);

  return { type: f.type, label: f.label, placeholder: f.placeholder };
}

function validateContactMethod(method: unknown, index: number): ContactMethod {
  const ctx = `contact_methods[${index}]`;
  if (!method || typeof method !== 'object') throw new Error(`${ctx}: must be an object`);
  const m = method as Record<string, unknown>;

  if (typeof m.title !== 'string' || !m.title.trim()) throw new Error(`${ctx}: title is required`);
  if (typeof m.value !== 'string' || !m.value.trim()) throw new Error(`${ctx}: value is required`);

  return { title: m.title, value: m.value };
}

function validateContactFooterItem(item: unknown, index: number): ContactFooterItem {
  const ctx = `contact_footer_items[${index}]`;
  if (!item || typeof item !== 'object') throw new Error(`${ctx}: must be an object`);
  const i = item as Record<string, unknown>;

  if (typeof i.title !== 'string' || !i.title.trim()) throw new Error(`${ctx}: title is required`);
  if (typeof i.value !== 'string' || !i.value.trim()) throw new Error(`${ctx}: value is required`);

  return { title: i.title, value: i.value };
}

function validateSplitFormSlot(slot: unknown): ContactSplitFormSlot {
  if (!slot || typeof slot !== 'object') throw new Error('ContactSplitFormSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.headline !== 'string' || !s.headline.trim()) throw new Error('ContactSplitFormSlot: headline is required');
  if (typeof s.subheading !== 'string' || !s.subheading.trim()) throw new Error('ContactSplitFormSlot: subheading is required');
  if (typeof s.form_title !== 'string' || !s.form_title.trim()) throw new Error('ContactSplitFormSlot: form_title is required');
  if (typeof s.submit_button !== 'string' || !s.submit_button.trim()) throw new Error('ContactSplitFormSlot: submit_button is required');
  if (!Array.isArray(s.form_fields) || s.form_fields.length === 0) throw new Error('ContactSplitFormSlot: form_fields must be a non-empty array');
  if (!Array.isArray(s.contact_methods) || s.contact_methods.length === 0) throw new Error('ContactSplitFormSlot: contact_methods must be a non-empty array');
  if (!Array.isArray(s.social_links) || s.social_links.length === 0) throw new Error('ContactSplitFormSlot: social_links must be a non-empty array');

  return {
    headline: s.headline,
    subheading: s.subheading,
    form_title: s.form_title,
    submit_button: s.submit_button,
    form_fields: s.form_fields.map((f, i) => validateFormField(f, i)),
    contact_methods: s.contact_methods.map((m, i) => validateContactMethod(m, i)),
    social_links: s.social_links as string[],
  };
}

function validateBookingProfileSlot(slot: unknown): ContactBookingProfileSlot {
  if (!slot || typeof slot !== 'object') throw new Error('ContactBookingProfileSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.headline !== 'string' || !s.headline.trim()) throw new Error('ContactBookingProfileSlot: headline is required');
  if (typeof s.subheading !== 'string' || !s.subheading.trim()) throw new Error('ContactBookingProfileSlot: subheading is required');
  if (typeof s.submit_button !== 'string' || !s.submit_button.trim()) throw new Error('ContactBookingProfileSlot: submit_button is required');
  if (typeof s.checkbox_label !== 'string' || !s.checkbox_label.trim()) throw new Error('ContactBookingProfileSlot: checkbox_label is required');
  if (typeof s.contact_person_name !== 'string' || !s.contact_person_name.trim()) throw new Error('ContactBookingProfileSlot: contact_person_name is required');
  if (typeof s.contact_person_role !== 'string' || !s.contact_person_role.trim()) throw new Error('ContactBookingProfileSlot: contact_person_role is required');
  if (typeof s.decorative_icon_url !== 'string' || !s.decorative_icon_url.trim()) throw new Error('ContactBookingProfileSlot: decorative_icon_url is required');
  if (typeof s.contact_person_avatar_url !== 'string' || !s.contact_person_avatar_url.trim()) throw new Error('ContactBookingProfileSlot: contact_person_avatar_url is required');
  if (!Array.isArray(s.form_fields) || s.form_fields.length === 0) throw new Error('ContactBookingProfileSlot: form_fields must be a non-empty array');

  return {
    headline: s.headline,
    subheading: s.subheading,
    submit_button: s.submit_button,
    checkbox_label: s.checkbox_label,
    contact_person_name: s.contact_person_name,
    contact_person_role: s.contact_person_role,
    decorative_icon_url: s.decorative_icon_url,
    contact_person_avatar_url: s.contact_person_avatar_url,
    form_fields: s.form_fields.map((f, i) => validateFormField(f, i)),
  };
}

function validateFullPageSlot(slot: unknown): ContactFullPageSlot {
  if (!slot || typeof slot !== 'object') throw new Error('ContactFullPageSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.headline !== 'string' || !s.headline.trim()) throw new Error('ContactFullPageSlot: headline is required');
  if (typeof s.subheading !== 'string' || !s.subheading.trim()) throw new Error('ContactFullPageSlot: subheading is required');
  if (typeof s.hero_label !== 'string' || !s.hero_label.trim()) throw new Error('ContactFullPageSlot: hero_label is required');
  if (typeof s.nav_action !== 'string' || !s.nav_action.trim()) throw new Error('ContactFullPageSlot: nav_action is required');
  if (typeof s.submit_button !== 'string' || !s.submit_button.trim()) throw new Error('ContactFullPageSlot: submit_button is required');
  if (typeof s.primary_action !== 'string' || !s.primary_action.trim()) throw new Error('ContactFullPageSlot: primary_action is required');
  if (typeof s.nav_logo_icon_url !== 'string' || !s.nav_logo_icon_url.trim()) throw new Error('ContactFullPageSlot: nav_logo_icon_url is required');
  if (!Array.isArray(s.nav_links) || s.nav_links.length === 0) throw new Error('ContactFullPageSlot: nav_links must be a non-empty array');
  if (!Array.isArray(s.form_fields) || s.form_fields.length === 0) throw new Error('ContactFullPageSlot: form_fields must be a non-empty array');
  if (!Array.isArray(s.contact_methods) || s.contact_methods.length === 0) throw new Error('ContactFullPageSlot: contact_methods must be a non-empty array');

  return {
    headline: s.headline,
    subheading: s.subheading,
    hero_label: s.hero_label,
    nav_action: s.nav_action,
    submit_button: s.submit_button,
    primary_action: s.primary_action,
    nav_logo_icon_url: s.nav_logo_icon_url,
    nav_links: s.nav_links as string[],
    form_fields: s.form_fields.map((f, i) => validateFormField(f, i)),
    contact_methods: s.contact_methods.map((m, i) => validateContactMethod(m, i)),
  };
}

function validateFormEditorialSlot(slot: unknown): ContactFormEditorialSlot {
  if (!slot || typeof slot !== 'object') throw new Error('ContactFormEditorialSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.headline !== 'string' || !s.headline.trim()) throw new Error('ContactFormEditorialSlot: headline is required');
  if (typeof s.subheading !== 'string' || !s.subheading.trim()) throw new Error('ContactFormEditorialSlot: subheading is required');
  if (typeof s.nav_logo_text !== 'string' || !s.nav_logo_text.trim()) throw new Error('ContactFormEditorialSlot: nav_logo_text is required');
  if (typeof s.submit_button !== 'string' || !s.submit_button.trim()) throw new Error('ContactFormEditorialSlot: submit_button is required');
  if (!Array.isArray(s.nav_links) || s.nav_links.length === 0) throw new Error('ContactFormEditorialSlot: nav_links must be a non-empty array');
  if (!Array.isArray(s.form_fields) || s.form_fields.length === 0) throw new Error('ContactFormEditorialSlot: form_fields must be a non-empty array');
  if (!Array.isArray(s.contact_footer_items) || s.contact_footer_items.length === 0) throw new Error('ContactFormEditorialSlot: contact_footer_items must be a non-empty array');

  return {
    headline: s.headline,
    subheading: s.subheading,
    nav_logo_text: s.nav_logo_text,
    submit_button: s.submit_button,
    nav_links: s.nav_links as string[],
    form_fields: s.form_fields.map((f, i) => validateFormField(f, i)),
    contact_footer_items: s.contact_footer_items.map((item, i) => validateContactFooterItem(item, i)),
  };
}

export function validateContactProps(raw: unknown): ContactProps {
  if (!raw || typeof raw !== 'object') throw new Error('ContactProps: must be an object');
  const r = raw as Record<string, unknown>;

  if (!VALID_LAYOUTS.includes(r.layoutStructure as ContactLayoutStructure)) {
    throw new Error(
      `ContactProps: invalid layoutStructure "${r.layoutStructure}". Must be one of: ${VALID_LAYOUTS.join(', ')}`
    );
  }

  const layout = r.layoutStructure as ContactLayoutStructure;
  const tokens = validateTokens(r.tokens);

  switch (layout) {
    case 'split_form_grid':
      return { layoutStructure: 'split_form_grid', tokens, slot: validateSplitFormSlot(r.slot) };
    case 'booking_profile_split':
      return { layoutStructure: 'booking_profile_split', tokens, slot: validateBookingProfileSlot(r.slot) };
    case 'full_page_split':
      return { layoutStructure: 'full_page_split', tokens, slot: validateFullPageSlot(r.slot) };
    case 'form_editorial_split':
      return { layoutStructure: 'form_editorial_split', tokens, slot: validateFormEditorialSlot(r.slot) };
  }
}