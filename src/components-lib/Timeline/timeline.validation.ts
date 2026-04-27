import type {
  TimelineTokens,
  TimelineProps,
  TimelineLayoutStructure,
  TimelineVerticalItem,
  TimelineAlternatingItem,
  TimelineAlignmentValue,
  TimelineVerticalEditorialSlot,
  TimelineAlternatingMediaSlot,
} from './timeline.types';

const VALID_LAYOUTS: TimelineLayoutStructure[] = [
  'vertical_editorial',
  'alternating_media',
];

const VALID_ALIGNMENTS: TimelineAlignmentValue[] = ['left_media', 'right_media'];

function validateTokens(tokens: unknown): TimelineTokens {
  if (!tokens || typeof tokens !== 'object') {
    throw new Error('TimelineTokens: must be an object');
  }
  const t = tokens as Record<string, unknown>;

const requiredKeys: (keyof TimelineTokens)[] = [
  'spacing', 'surface', 'text-role', 'background',
  'body-scale', 'action-style', 'heading-scale',
  'section-heading-scale', 'eyebrow-scale', 'label-scale', 'meta-scale',
];

  for (const key of requiredKeys) {
    if (typeof t[key] !== 'string' || !(t[key] as string).trim()) {
      throw new Error(`TimelineTokens: "${key}" is required`);
    }
  }

return {
  spacing:         t['spacing'] as string,
  surface:         t['surface'] as string,
  'text-role':     t['text-role'] as string,
  background:      t['background'] as string,
  'body-scale':    t['body-scale'] as string,
  'action-style':  t['action-style'] as string,
  'heading-scale': t['heading-scale'] as string,
  'section-heading-scale': t['section-heading-scale'] as string,
  'eyebrow-scale': t['eyebrow-scale'] as string,
  'label-scale':   t['label-scale'] as string,
  'meta-scale':    t['meta-scale'] as string,
};
}

function validateVerticalItem(item: unknown, index: number): TimelineVerticalItem {
  const ctx = `timeline_items[${index}]`;
  if (!item || typeof item !== 'object') throw new Error(`${ctx}: must be an object`);
  const i = item as Record<string, unknown>;

  if (typeof i.year !== 'string' || !i.year.trim())
    throw new Error(`${ctx}: year is required`);
  if (typeof i.title !== 'string' || !i.title.trim())
    throw new Error(`${ctx}: title is required`);
  if (typeof i.description !== 'string' || !i.description.trim())
    throw new Error(`${ctx}: description is required`);

  return { year: i.year, title: i.title, description: i.description };
}

function validateAlternatingItem(item: unknown, index: number): TimelineAlternatingItem {
  const ctx = `timeline_items[${index}]`;
  if (!item || typeof item !== 'object') throw new Error(`${ctx}: must be an object`);
  const i = item as Record<string, unknown>;

  if (typeof i.title !== 'string' || !i.title.trim())
    throw new Error(`${ctx}: title is required`);
  if (typeof i.eyebrow !== 'string' || !i.eyebrow.trim())
    throw new Error(`${ctx}: eyebrow is required`);
  if (typeof i.image_alt !== 'string' || !i.image_alt.trim())
    throw new Error(`${ctx}: image_alt is required`);
  if (typeof i.image_url !== 'string' || !i.image_url.trim())
    throw new Error(`${ctx}: image_url is required`);
  if (typeof i.description !== 'string' || !i.description.trim())
    throw new Error(`${ctx}: description is required`);

  if (!VALID_ALIGNMENTS.includes(i.alignment as TimelineAlignmentValue)) {
    throw new Error(
      `${ctx}: alignment "${i.alignment}" is invalid. Must be one of: ${VALID_ALIGNMENTS.join(', ')}`
    );
  }

  return {
    title:       i.title,
    eyebrow:     i.eyebrow,
    alignment:   i.alignment as TimelineAlignmentValue,
    image_alt:   i.image_alt,
    image_url:   i.image_url,
    description: i.description,
  };
}

function validateVerticalEditorialSlot(slot: unknown): TimelineVerticalEditorialSlot {
  if (!slot || typeof slot !== 'object')
    throw new Error('TimelineVerticalEditorialSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.section_label !== 'string' || !s.section_label.trim())
    throw new Error('TimelineVerticalEditorialSlot: section_label is required');
  if (s.timeline_variant !== 'vertical_editorial')
    throw new Error('TimelineVerticalEditorialSlot: timeline_variant must be "vertical_editorial"');
  if (!Array.isArray(s.timeline_items) || s.timeline_items.length === 0)
    throw new Error('TimelineVerticalEditorialSlot: timeline_items must be a non-empty array');

  return {
    section_label:    s.section_label,
    timeline_variant: 'vertical_editorial',
    timeline_items:   s.timeline_items.map((item, i) => validateVerticalItem(item, i)),
  };
}

function validateAlternatingMediaSlot(slot: unknown): TimelineAlternatingMediaSlot {
  if (!slot || typeof slot !== 'object')
    throw new Error('TimelineAlternatingMediaSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (s.timeline_variant !== 'alternating_media')
    throw new Error('TimelineAlternatingMediaSlot: timeline_variant must be "alternating_media"');
  if (!Array.isArray(s.timeline_items) || s.timeline_items.length === 0)
    throw new Error('TimelineAlternatingMediaSlot: timeline_items must be a non-empty array');

  return {
    timeline_variant: 'alternating_media',
    timeline_items:   s.timeline_items.map((item, i) => validateAlternatingItem(item, i)),
  };
}

export function validateTimelineProps(raw: unknown): TimelineProps {
  if (!raw || typeof raw !== 'object')
    throw new Error('TimelineProps: must be an object');
  const r = raw as Record<string, unknown>;

  if (!VALID_LAYOUTS.includes(r.layoutStructure as TimelineLayoutStructure)) {
    throw new Error(
      `TimelineProps: invalid layoutStructure "${r.layoutStructure}". Must be one of: ${VALID_LAYOUTS.join(', ')}`
    );
  }

  const layout = r.layoutStructure as TimelineLayoutStructure;
  const tokens = validateTokens(r.tokens);

  switch (layout) {
    case 'vertical_editorial':
      return { layoutStructure: 'vertical_editorial', tokens, slot: validateVerticalEditorialSlot(r.slot) };
    case 'alternating_media':
      return { layoutStructure: 'alternating_media', tokens, slot: validateAlternatingMediaSlot(r.slot) };
  }
}