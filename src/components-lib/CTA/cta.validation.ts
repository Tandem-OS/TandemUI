import type {
  CTATokens,
  CTAProps,
  CTALayoutStructure,
  CTAFooterColumn,
  CTAFAQItem,
  CTAFAQColumn,
  CTAHeroFooterSlot,
  CTAAnnouncementFAQSlot,
  CTANewsletterCenteredSlot,
  CTASearchFooterSlot,
} from './cta.types';

const VALID_LAYOUTS: CTALayoutStructure[] = [
  'hero-footer',
  'announcement-faq',
  'newsletter-centered',
  'search-footer',
];

function validateTokens(tokens: unknown): CTATokens {
  if (!tokens || typeof tokens !== 'object') {
    throw new Error('CTATokens: must be an object');
  }
  const t = tokens as Record<string, unknown>;

  const requiredKeys: (keyof CTATokens)[] = [
    'spacing', 'surface', 'text-role', 'background',
    'body-scale', 'footer-text', 'action-style',
    'heading-scale', 'footer-background',
  ];

  for (const key of requiredKeys) {
    if (typeof t[key] !== 'string' || !(t[key] as string).trim()) {
      throw new Error(`CTATokens: "${key}" is required`);
    }
  }

  return {
    spacing: t['spacing'] as string,
    surface: t['surface'] as string,
    'text-role': t['text-role'] as string,
    background: t['background'] as string,
    'body-scale': t['body-scale'] as string,
    'footer-text': t['footer-text'] as string,
    'action-style': t['action-style'] as string,
    'heading-scale': t['heading-scale'] as string,
    'footer-background': t['footer-background'] as string,
  };
}

function validateFooterColumn(col: unknown, index: number): CTAFooterColumn {
  const ctx = `footer_columns[${index}]`;
  if (!col || typeof col !== 'object') throw new Error(`${ctx}: must be an object`);
  const c = col as Record<string, unknown>;

  if (typeof c.heading !== 'string' || !c.heading.trim()) throw new Error(`${ctx}: heading is required`);
  if (!Array.isArray(c.links) || c.links.length === 0) throw new Error(`${ctx}: links must be a non-empty array`);

  return { heading: c.heading, links: c.links as string[] };
}

function validateFAQItem(item: unknown, ctx: string): CTAFAQItem {
  if (!item || typeof item !== 'object') throw new Error(`${ctx}: must be an object`);
  const i = item as Record<string, unknown>;

  if (typeof i.question !== 'string' || !i.question.trim()) throw new Error(`${ctx}: question is required`);
  if (typeof i.answer !== 'string' || !i.answer.trim()) throw new Error(`${ctx}: answer is required`);
  if (typeof i.is_expanded !== 'boolean') throw new Error(`${ctx}: is_expanded must be a boolean`);

  return { question: i.question, answer: i.answer, is_expanded: i.is_expanded };
}

function validateFAQColumn(col: unknown, index: number): CTAFAQColumn {
  const ctx = `faq_columns[${index}]`;
  if (!col || typeof col !== 'object') throw new Error(`${ctx}: must be an object`);
  const c = col as Record<string, unknown>;

  if (!Array.isArray(c.items) || c.items.length === 0) throw new Error(`${ctx}: items must be a non-empty array`);

  return {
    items: c.items.map((item, i) => validateFAQItem(item, `${ctx}.items[${i}]`)),
  };
}

function validateHeroFooterSlot(slot: unknown): CTAHeroFooterSlot {
  if (!slot || typeof slot !== 'object') throw new Error('CTAHeroFooterSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.hero_headline !== 'string' || !s.hero_headline.trim()) throw new Error('CTAHeroFooterSlot: hero_headline is required');
  if (typeof s.hero_subheading !== 'string' || !s.hero_subheading.trim()) throw new Error('CTAHeroFooterSlot: hero_subheading is required');
  if (typeof s.hero_background_image_url !== 'string' || !s.hero_background_image_url.trim()) throw new Error('CTAHeroFooterSlot: hero_background_image_url is required');
  if (typeof s.hero_background_image_alt !== 'string' || !s.hero_background_image_alt.trim()) throw new Error('CTAHeroFooterSlot: hero_background_image_alt is required');
  if (typeof s.primary_action !== 'string' || !s.primary_action.trim()) throw new Error('CTAHeroFooterSlot: primary_action is required');
  if (typeof s.logo_text !== 'string' || !s.logo_text.trim()) throw new Error('CTAHeroFooterSlot: logo_text is required');
  if (typeof s.logo_icon_url !== 'string' || !s.logo_icon_url.trim()) throw new Error('CTAHeroFooterSlot: logo_icon_url is required');
  if (typeof s.newsletter_heading !== 'string' || !s.newsletter_heading.trim()) throw new Error('CTAHeroFooterSlot: newsletter_heading is required');
  if (typeof s.newsletter_text !== 'string' || !s.newsletter_text.trim()) throw new Error('CTAHeroFooterSlot: newsletter_text is required');
  if (typeof s.newsletter_label !== 'string' || !s.newsletter_label.trim()) throw new Error('CTAHeroFooterSlot: newsletter_label is required');
  if (typeof s.newsletter_placeholder !== 'string' || !s.newsletter_placeholder.trim()) throw new Error('CTAHeroFooterSlot: newsletter_placeholder is required');
  if (typeof s.newsletter_button !== 'string' || !s.newsletter_button.trim()) throw new Error('CTAHeroFooterSlot: newsletter_button is required');
  if (typeof s.footer_bottom_text !== 'string' || !s.footer_bottom_text.trim()) throw new Error('CTAHeroFooterSlot: footer_bottom_text is required');
  if (!Array.isArray(s.footer_columns) || s.footer_columns.length === 0) throw new Error('CTAHeroFooterSlot: footer_columns must be a non-empty array');
  if (!Array.isArray(s.social_icons) || s.social_icons.length === 0) throw new Error('CTAHeroFooterSlot: social_icons must be a non-empty array');

  return {
    hero_headline: s.hero_headline,
    hero_subheading: s.hero_subheading,
    hero_background_image_url: s.hero_background_image_url,
    hero_background_image_alt: s.hero_background_image_alt,
    primary_action: s.primary_action,
    logo_text: s.logo_text,
    logo_icon_url: s.logo_icon_url,
    newsletter_heading: s.newsletter_heading,
    newsletter_text: s.newsletter_text,
    newsletter_label: s.newsletter_label,
    newsletter_placeholder: s.newsletter_placeholder,
    newsletter_button: s.newsletter_button,
    footer_bottom_text: s.footer_bottom_text,
    footer_columns: s.footer_columns.map((col, i) => validateFooterColumn(col, i)),
    social_icons: s.social_icons as string[],
  };
}

function validateAnnouncementFAQSlot(slot: unknown): CTAAnnouncementFAQSlot {
  if (!slot || typeof slot !== 'object') throw new Error('CTAAnnouncementFAQSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.section_heading !== 'string' || !s.section_heading.trim()) throw new Error('CTAAnnouncementFAQSlot: section_heading is required');
  if (typeof s.section_subheading !== 'string' || !s.section_subheading.trim()) throw new Error('CTAAnnouncementFAQSlot: section_subheading is required');
  if (typeof s.eyebrow !== 'string' || !s.eyebrow.trim()) throw new Error('CTAAnnouncementFAQSlot: eyebrow is required');
  if (typeof s.primary_action !== 'string' || !s.primary_action.trim()) throw new Error('CTAAnnouncementFAQSlot: primary_action is required');
  if (typeof s.secondary_action !== 'string' || !s.secondary_action.trim()) throw new Error('CTAAnnouncementFAQSlot: secondary_action is required');
  if (typeof s.faq_section_heading !== 'string' || !s.faq_section_heading.trim()) throw new Error('CTAAnnouncementFAQSlot: faq_section_heading is required');
  if (!Array.isArray(s.faq_columns) || s.faq_columns.length === 0) throw new Error('CTAAnnouncementFAQSlot: faq_columns must be a non-empty array');

  return {
    section_heading: s.section_heading,
    section_subheading: s.section_subheading,
    eyebrow: s.eyebrow,
    primary_action: s.primary_action,
    secondary_action: s.secondary_action,
    faq_section_heading: s.faq_section_heading,
    faq_columns: s.faq_columns.map((col, i) => validateFAQColumn(col, i)),
  };
}

function validateNewsletterCenteredSlot(slot: unknown): CTANewsletterCenteredSlot {
  if (!slot || typeof slot !== 'object') throw new Error('CTANewsletterCenteredSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.headline !== 'string' || !s.headline.trim()) throw new Error('CTANewsletterCenteredSlot: headline is required');
  if (typeof s.subheading !== 'string' || !s.subheading.trim()) throw new Error('CTANewsletterCenteredSlot: subheading is required');
  if (typeof s.email_placeholder !== 'string' || !s.email_placeholder.trim()) throw new Error('CTANewsletterCenteredSlot: email_placeholder is required');
  if (typeof s.form_button !== 'string' || !s.form_button.trim()) throw new Error('CTANewsletterCenteredSlot: form_button is required');
  if (typeof s.social_proof_text !== 'string' || !s.social_proof_text.trim()) throw new Error('CTANewsletterCenteredSlot: social_proof_text is required');
  if (!Array.isArray(s.social_proof_avatars) || s.social_proof_avatars.length === 0) throw new Error('CTANewsletterCenteredSlot: social_proof_avatars must be a non-empty array');

  return {
    headline: s.headline,
    subheading: s.subheading,
    email_placeholder: s.email_placeholder,
    form_button: s.form_button,
    social_proof_text: s.social_proof_text,
    social_proof_avatars: s.social_proof_avatars as string[],
  };
}

function validateSearchFooterSlot(slot: unknown): CTASearchFooterSlot {
  if (!slot || typeof slot !== 'object') throw new Error('CTASearchFooterSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.hero_headline !== 'string' || !s.hero_headline.trim()) throw new Error('CTASearchFooterSlot: hero_headline is required');
  if (typeof s.hero_subheading !== 'string' || !s.hero_subheading.trim()) throw new Error('CTASearchFooterSlot: hero_subheading is required');
  if (typeof s.hero_background_image_url !== 'string' || !s.hero_background_image_url.trim()) throw new Error('CTASearchFooterSlot: hero_background_image_url is required');
  if (typeof s.hero_background_image_alt !== 'string' || !s.hero_background_image_alt.trim()) throw new Error('CTASearchFooterSlot: hero_background_image_alt is required');
  if (typeof s.search_label !== 'string' || !s.search_label.trim()) throw new Error('CTASearchFooterSlot: search_label is required');
  if (typeof s.search_placeholder !== 'string' || !s.search_placeholder.trim()) throw new Error('CTASearchFooterSlot: search_placeholder is required');
  if (typeof s.search_action !== 'string' || !s.search_action.trim()) throw new Error('CTASearchFooterSlot: search_action is required');
  if (typeof s.logo_text !== 'string' || !s.logo_text.trim()) throw new Error('CTASearchFooterSlot: logo_text is required');
  if (typeof s.brand_description !== 'string' || !s.brand_description.trim()) throw new Error('CTASearchFooterSlot: brand_description is required');
  if (!Array.isArray(s.footer_columns) || s.footer_columns.length === 0) throw new Error('CTASearchFooterSlot: footer_columns must be a non-empty array');

  return {
    hero_headline: s.hero_headline,
    hero_subheading: s.hero_subheading,
    hero_background_image_url: s.hero_background_image_url,
    hero_background_image_alt: s.hero_background_image_alt,
    search_label: s.search_label,
    search_placeholder: s.search_placeholder,
    search_action: s.search_action,
    logo_text: s.logo_text,
    brand_description: s.brand_description,
    footer_columns: s.footer_columns.map((col, i) => validateFooterColumn(col, i)),
  };
}

export function validateCTAProps(raw: unknown): CTAProps {
  if (!raw || typeof raw !== 'object') throw new Error('CTAProps: must be an object');
  const r = raw as Record<string, unknown>;

  if (!VALID_LAYOUTS.includes(r.layoutStructure as CTALayoutStructure)) {
    throw new Error(
      `CTAProps: invalid layoutStructure "${r.layoutStructure}". Must be one of: ${VALID_LAYOUTS.join(', ')}`
    );
  }

  const layout = r.layoutStructure as CTALayoutStructure;
  const tokens = validateTokens(r.tokens);

  switch (layout) {
    case 'hero-footer':
      return { layoutStructure: 'hero-footer', tokens, slot: validateHeroFooterSlot(r.slot) };
    case 'announcement-faq':
      return { layoutStructure: 'announcement-faq', tokens, slot: validateAnnouncementFAQSlot(r.slot) };
    case 'newsletter-centered':
      return { layoutStructure: 'newsletter-centered', tokens, slot: validateNewsletterCenteredSlot(r.slot) };
    case 'search-footer':
      return { layoutStructure: 'search-footer', tokens, slot: validateSearchFooterSlot(r.slot) };
  }
}