import type {
  FooterTokens,
  FooterProps,
  FooterLayoutStructure,
  FooterColumn,
  FooterInfoColumn,
  FooterLinkStyle,
  FooterInlineMinimalSlot,
  FooterSplitExpandedSlot,
  FooterMultiColumnSlot,
  FooterInfoLinksBarSlot,
} from './footer.types';

const VALID_LAYOUTS: FooterLayoutStructure[] = [
  'inline_minimal',
  'split_expanded',
  'multi_column',
  'info_links_bar',
];

const VALID_LINK_STYLES: FooterLinkStyle[] = ['arrow_links', 'plain_links'];

function validateTokens(tokens: unknown): FooterTokens {
  if (!tokens || typeof tokens !== 'object') {
    throw new Error('FooterTokens: must be an object');
  }
  const t = tokens as Record<string, unknown>;

  const requiredKeys: (keyof FooterTokens)[] = [
    'spacing', 'surface', 'text-role', 'background',
    'body-scale', 'bottom-bar', 'action-style', 'heading-scale',
    'section-heading-scale', 'eyebrow-scale', 'label-scale', 'meta-scale',
  ];

  for (const key of requiredKeys) {
    if (typeof t[key] !== 'string' || !(t[key] as string).trim()) {
      throw new Error(`FooterTokens: "${key}" is required`);
    }
  }
  return {
    spacing: t['spacing'] as string,
    surface: t['surface'] as string,
    'text-role': t['text-role'] as string,
    background: t['background'] as string,
    'body-scale': t['body-scale'] as string,
    'bottom-bar': t['bottom-bar'] as string,
    'action-style': t['action-style'] as string,
    'heading-scale': t['heading-scale'] as string,
    'section-heading-scale': t['section-heading-scale'] as string,
    'eyebrow-scale': t['eyebrow-scale'] as string,
    'label-scale': t['label-scale'] as string,
    'meta-scale': t['meta-scale'] as string,
  };
}

function validateFooterColumn(column: unknown, index: number): FooterColumn {
  const ctx = `footer_columns[${index}]`;
  if (!column || typeof column !== 'object') throw new Error(`${ctx}: must be an object`);
  const c = column as Record<string, unknown>;

  if (typeof c.heading !== 'string' || !c.heading.trim()) throw new Error(`${ctx}: heading is required`);
  if (!Array.isArray(c.links) || c.links.length === 0) throw new Error(`${ctx}: links must be a non-empty array`);

  const links = c.links.map((link: unknown, li: number) => {
    if (typeof link === 'string') {
      if (!link.trim()) throw new Error(`${ctx}.links[${li}]: must not be empty`);
      return { label: link, href: '#' };
    }
    if (!link || typeof link !== 'object') throw new Error(`${ctx}.links[${li}]: must be an object or string`);
    const l = link as Record<string, unknown>;
    if (typeof l.label !== 'string' || !l.label.trim()) throw new Error(`${ctx}.links[${li}]: label is required`);
    if (typeof l.href !== 'string' || !l.href.trim()) throw new Error(`${ctx}.links[${li}]: href is required`);
    return { label: l.label, href: l.href };
  });
  return { heading: c.heading, links };
}

function validateFooterInfoColumn(column: unknown, index: number): FooterInfoColumn {
  const ctx = `info_columns[${index}]`;
  if (!column || typeof column !== 'object') throw new Error(`${ctx}: must be an object`);
  const c = column as Record<string, unknown>;

  if (typeof c.heading !== 'string' || !c.heading.trim()) throw new Error(`${ctx}: heading is required`);

  return {
    heading: c.heading,
    lines: Array.isArray(c.lines) ? c.lines as string[] : undefined,
    icon_blocks: Array.isArray(c.icon_blocks) ? c.icon_blocks as string[] : undefined,
  };
}

function validateInlineMinimalSlot(slot: unknown): FooterInlineMinimalSlot {
  if (!slot || typeof slot !== 'object') throw new Error('FooterInlineMinimalSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.footer_text !== 'string' || !s.footer_text.trim())
    throw new Error('FooterInlineMinimalSlot: footer_text is required');
  if (typeof s.background_image_url !== 'string' || !s.background_image_url.trim())
    throw new Error('FooterInlineMinimalSlot: background_image_url is required');
  if (typeof s.background_image_alt !== 'string' || !s.background_image_alt.trim())
    throw new Error('FooterInlineMinimalSlot: background_image_alt is required');
  if (s.footer_variant !== 'inline_minimal')
    throw new Error('FooterInlineMinimalSlot: footer_variant must be "inline_minimal"');
  if (!Array.isArray(s.footer_links) || s.footer_links.length === 0)
    throw new Error('FooterInlineMinimalSlot: footer_links must be a non-empty array');

  return {
    footer_text: s.footer_text,
    footer_links: (s.footer_links as unknown[]).map((link: unknown, li: number) => {
      if (!link || typeof link !== 'object') throw new Error(`footer_links[${li}]: must be an object`);
      const l = link as Record<string, unknown>;
      if (typeof l.label !== 'string' || !l.label.trim()) throw new Error(`footer_links[${li}]: label is required`);
      if (typeof l.href !== 'string' || !l.href.trim()) throw new Error(`footer_links[${li}]: href is required`);
      return { label: l.label, href: l.href };
    }), footer_variant: 'inline_minimal',
    background_image_url: s.background_image_url,
    background_image_alt: s.background_image_alt,
  };
}

function validateSplitExpandedSlot(slot: unknown): FooterSplitExpandedSlot {
  if (!slot || typeof slot !== 'object') throw new Error('FooterSplitExpandedSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.brand_text !== 'string' || !s.brand_text.trim())
    throw new Error('FooterSplitExpandedSlot: brand_text is required');
  if (typeof s.copyright_text !== 'string' || !s.copyright_text.trim())
    throw new Error('FooterSplitExpandedSlot: copyright_text is required');
  if (typeof s.footer_variant !== 'string' || s.footer_variant !== 'split_expanded')
    throw new Error('FooterSplitExpandedSlot: footer_variant must be "split_expanded"');
  if (typeof s.primary_action !== 'string' || !s.primary_action.trim())
    throw new Error('FooterSplitExpandedSlot: primary_action is required');
  if (typeof s.background_color !== 'string' || !s.background_color.trim())
    throw new Error('FooterSplitExpandedSlot: background_color is required');
  if (typeof s.logo_icon_url !== 'string' || !s.logo_icon_url.trim())
    throw new Error('FooterSplitExpandedSlot: logo_icon_url is required');
  if (typeof s.expanded_content_title !== 'string' || !s.expanded_content_title.trim())
    throw new Error('FooterSplitExpandedSlot: expanded_content_title is required');
  if (!Array.isArray(s.bottom_links) || s.bottom_links.length === 0)
    throw new Error('FooterSplitExpandedSlot: bottom_links must be a non-empty array');
  if (!Array.isArray(s.primary_links) || s.primary_links.length === 0)
    throw new Error('FooterSplitExpandedSlot: primary_links must be a non-empty array');
  if (!Array.isArray(s.expanded_content_lines) || s.expanded_content_lines.length === 0)
    throw new Error('FooterSplitExpandedSlot: expanded_content_lines must be a non-empty array');

  if (!VALID_LINK_STYLES.includes(s.link_style as FooterLinkStyle)) {
    throw new Error(
      `FooterSplitExpandedSlot: link_style "${s.link_style}" is invalid. Must be one of: ${VALID_LINK_STYLES.join(', ')}`
    );
  }

  return {
    brand_text: s.brand_text,
    link_style: s.link_style as FooterLinkStyle,
    bottom_links: s.bottom_links as string[],
    logo_icon_url: s.logo_icon_url,
    primary_links: s.primary_links as string[],
    copyright_text: s.copyright_text,
    footer_variant: 'split_expanded',
    primary_action: s.primary_action,
    background_color: s.background_color,
    expanded_content_lines: s.expanded_content_lines as string[],
    expanded_content_title: s.expanded_content_title,
  };
}

function validateMultiColumnSlot(slot: unknown): FooterMultiColumnSlot {
  if (!slot || typeof slot !== 'object') throw new Error('FooterMultiColumnSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.logo_text !== 'string' || !s.logo_text.trim())
    throw new Error('FooterMultiColumnSlot: logo_text is required');
  if (typeof s.logo_icon_url !== 'string' || !s.logo_icon_url.trim())
    throw new Error('FooterMultiColumnSlot: logo_icon_url is required');
  if (typeof s.background_color !== 'string' || !s.background_color.trim())
    throw new Error('FooterMultiColumnSlot: background_color is required');
  if (typeof s.brand_description !== 'string' || !s.brand_description.trim())
    throw new Error('FooterMultiColumnSlot: brand_description is required');
  if (typeof s.footer_bottom_link !== 'string' || !s.footer_bottom_link.trim())
    throw new Error('FooterMultiColumnSlot: footer_bottom_link is required');
  if (typeof s.footer_bottom_text !== 'string' || !s.footer_bottom_text.trim())
    throw new Error('FooterMultiColumnSlot: footer_bottom_text is required');
  if (s.footer_variant !== 'multi_column')
    throw new Error('FooterMultiColumnSlot: footer_variant must be "multi_column"');
  if (!Array.isArray(s.footer_columns) || s.footer_columns.length === 0)
    throw new Error('FooterMultiColumnSlot: footer_columns must be a non-empty array');

  return {
    logo_text: s.logo_text,
    logo_icon_url: s.logo_icon_url,
    footer_columns: s.footer_columns.map((c, i) => validateFooterColumn(c, i)),
    footer_variant: 'multi_column',
    background_color: s.background_color,
    brand_description: s.brand_description,
    footer_bottom_link: s.footer_bottom_link,
    footer_bottom_text: s.footer_bottom_text,
  };
}

function validateInfoLinksBarSlot(slot: unknown): FooterInfoLinksBarSlot {
  if (!slot || typeof slot !== 'object') throw new Error('FooterInfoLinksBarSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.bottom_bar_cta !== 'string' || !s.bottom_bar_cta.trim())
    throw new Error('FooterInfoLinksBarSlot: bottom_bar_cta is required');
  if (typeof s.copyright_left !== 'string' || !s.copyright_left.trim())
    throw new Error('FooterInfoLinksBarSlot: copyright_left is required');
  if (typeof s.copyright_right !== 'string' || !s.copyright_right.trim())
    throw new Error('FooterInfoLinksBarSlot: copyright_right is required');
  if (typeof s.background_color !== 'string' || !s.background_color.trim())
    throw new Error('FooterInfoLinksBarSlot: background_color is required');
  if (typeof s.bottom_bar_color !== 'string' || !s.bottom_bar_color.trim())
    throw new Error('FooterInfoLinksBarSlot: bottom_bar_color is required');
  if (s.footer_variant !== 'info_links_bar')
    throw new Error('FooterInfoLinksBarSlot: footer_variant must be "info_links_bar"');
  if (!Array.isArray(s.large_links) || s.large_links.length === 0)
    throw new Error('FooterInfoLinksBarSlot: large_links must be a non-empty array');
  if (!Array.isArray(s.legal_links) || s.legal_links.length === 0)
    throw new Error('FooterInfoLinksBarSlot: legal_links must be a non-empty array');
  if (!Array.isArray(s.info_columns) || s.info_columns.length === 0)
    throw new Error('FooterInfoLinksBarSlot: info_columns must be a non-empty array');

  return {
    large_links: s.large_links as string[],
    legal_links: s.legal_links as string[],
    info_columns: s.info_columns.map((c, i) => validateFooterInfoColumn(c, i)),
    bottom_bar_cta: s.bottom_bar_cta,
    copyright_left: s.copyright_left,
    footer_variant: 'info_links_bar',
    copyright_right: s.copyright_right,
    background_color: s.background_color,
    bottom_bar_color: s.bottom_bar_color,
  };
}

export function validateFooterProps(raw: unknown): FooterProps {
  if (!raw || typeof raw !== 'object') throw new Error('FooterProps: must be an object');
  const r = raw as Record<string, unknown>;

  if (!VALID_LAYOUTS.includes(r.layoutStructure as FooterLayoutStructure)) {
    throw new Error(
      `FooterProps: invalid layoutStructure "${r.layoutStructure}". Must be one of: ${VALID_LAYOUTS.join(', ')}`
    );
  }

  const layout = r.layoutStructure as FooterLayoutStructure;
  const tokens = validateTokens(r.tokens);

  switch (layout) {
    case 'inline_minimal':
      return { layoutStructure: 'inline_minimal', tokens, slot: validateInlineMinimalSlot(r.slot) };
    case 'split_expanded':
      return { layoutStructure: 'split_expanded', tokens, slot: validateSplitExpandedSlot(r.slot) };
    case 'multi_column':
      return { layoutStructure: 'multi_column', tokens, slot: validateMultiColumnSlot(r.slot) };
    case 'info_links_bar':
      return { layoutStructure: 'info_links_bar', tokens, slot: validateInfoLinksBarSlot(r.slot) };
  }
}