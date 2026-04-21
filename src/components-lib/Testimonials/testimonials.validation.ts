import type {
  TestimonialsTokens,
  TestimonialsVideoGridSlot,
  TestimonialsFeaturedStatsSlot,
  TestimonialsNotesSlot,
  TestimonialsCarouselSlot,
  TestimonialsProps,
  TestimonialsLayoutStructure,
  TestimonialsVideoItem,
  TestimonialsStat,
  TestimonialsNoteItem,
} from './testimonials.types';

const VALID_LAYOUTS: TestimonialsLayoutStructure[] = [
  'video-grid',
  'featured-stats',
  'notes',
  'carousel',
];

function validateTokens(tokens: unknown): TestimonialsTokens {
  if (!tokens || typeof tokens !== 'object') {
    throw new Error('TestimonialsTokens: must be an object');
  }
  const t = tokens as Record<string, unknown>;

  const requiredKeys: (keyof TestimonialsTokens)[] = [
    'spacing', 'surface', 'text-role', 'background',
    'body-scale', 'action-style', 'heading-scale',
  ];

  for (const key of requiredKeys) {
    if (typeof t[key] !== 'string' || !(t[key] as string).trim()) {
      throw new Error(`TestimonialsTokens: "${key}" is required`);
    }
  }

  return {
    spacing: t['spacing'] as string,
    surface: t['surface'] as string,
    'text-role': t['text-role'] as string,
    background: t['background'] as string,
    'body-scale': t['body-scale'] as string,
    'action-style': t['action-style'] as string,
    'heading-scale': t['heading-scale'] as string,
  };
}

function validateVideoItem(item: unknown, index: number): TestimonialsVideoItem {
  const ctx = `testimonials[${index}]`;
  if (!item || typeof item !== 'object') throw new Error(`${ctx}: must be an object`);
  const i = item as Record<string, unknown>;

  if (typeof i.title !== 'string' || !i.title.trim()) throw new Error(`${ctx}: title is required`);
  if (!Array.isArray(i.speakers) || i.speakers.length === 0) throw new Error(`${ctx}: speakers must be a non-empty array`);
  if (typeof i.description !== 'string' || !i.description.trim()) throw new Error(`${ctx}: description is required`);
  if (typeof i.speaker_label !== 'string' || !i.speaker_label.trim()) throw new Error(`${ctx}: speaker_label is required`);
  if (typeof i.video_thumbnail_alt !== 'string' || !i.video_thumbnail_alt.trim()) throw new Error(`${ctx}: video_thumbnail_alt is required`);
  if (typeof i.video_thumbnail_url !== 'string' || !i.video_thumbnail_url.trim()) throw new Error(`${ctx}: video_thumbnail_url is required`);

  return {
    title: i.title,
    speakers: i.speakers as string[],
    description: i.description,
    speaker_label: i.speaker_label,
    video_thumbnail_alt: i.video_thumbnail_alt,
    video_thumbnail_url: i.video_thumbnail_url,
  };
}

function validateVideoGridSlot(slot: unknown): TestimonialsVideoGridSlot {
  if (!slot || typeof slot !== 'object') throw new Error('VideoGridSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.section_heading !== 'string' || !s.section_heading.trim())
    throw new Error('VideoGridSlot: section_heading is required');
  if (!Array.isArray(s.testimonials) || s.testimonials.length === 0)
    throw new Error('VideoGridSlot: testimonials must be a non-empty array');

  return {
    section_heading: s.section_heading,
    testimonials: s.testimonials.map((item, i) => validateVideoItem(item, i)),
  };
}

function validateStat(stat: unknown, index: number): TestimonialsStat {
  const ctx = `stats[${index}]`;
  if (!stat || typeof stat !== 'object') throw new Error(`${ctx}: must be an object`);
  const s = stat as Record<string, unknown>;

  if (typeof s.label !== 'string' || !s.label.trim()) throw new Error(`${ctx}: label is required`);
  if (typeof s.value !== 'string' || !s.value.trim()) throw new Error(`${ctx}: value is required`);

  return { label: s.label, value: s.value };
}

function validateFeaturedStatsSlot(slot: unknown): TestimonialsFeaturedStatsSlot {
  if (!slot || typeof slot !== 'object') throw new Error('FeaturedStatsSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.quote !== 'string' || !s.quote.trim()) throw new Error('FeaturedStatsSlot: quote is required');
  if (typeof s.author_name !== 'string' || !s.author_name.trim()) throw new Error('FeaturedStatsSlot: author_name is required');
  if (typeof s.author_role !== 'string' || !s.author_role.trim()) throw new Error('FeaturedStatsSlot: author_role is required');
  if (typeof s.company_name !== 'string' || !s.company_name.trim()) throw new Error('FeaturedStatsSlot: company_name is required');
  if (typeof s.rating_stars !== 'number' || s.rating_stars < 1 || s.rating_stars > 5) throw new Error('FeaturedStatsSlot: rating_stars must be 1-5');
  if (typeof s.author_avatar_text !== 'string' || !s.author_avatar_text.trim()) throw new Error('FeaturedStatsSlot: author_avatar_text is required');
  if (!Array.isArray(s.stats) || s.stats.length === 0) throw new Error('FeaturedStatsSlot: stats must be a non-empty array');

  return {
    quote: s.quote,
    author_name: s.author_name,
    author_role: s.author_role,
    company_name: s.company_name,
    rating_stars: s.rating_stars,
    author_avatar_text: s.author_avatar_text,
    stats: (s.stats as unknown[]).map((stat, i) => validateStat(stat, i)),
  };
}

function validateNoteItem(item: unknown, index: number): TestimonialsNoteItem {
  const ctx = `testimonial_notes[${index}]`;
  if (!item || typeof item !== 'object') throw new Error(`${ctx}: must be an object`);
  const i = item as Record<string, unknown>;

  if (typeof i.quote !== 'string' || !i.quote.trim()) throw new Error(`${ctx}: quote is required`);
  if (typeof i.author_name !== 'string' || !i.author_name.trim()) throw new Error(`${ctx}: author_name is required`);
  if (typeof i.author_date !== 'string' || !i.author_date.trim()) throw new Error(`${ctx}: author_date is required`);

  return { quote: i.quote, author_name: i.author_name, author_date: i.author_date };
}

function validateNotesSlot(slot: unknown): TestimonialsNotesSlot {
  if (!slot || typeof slot !== 'object') throw new Error('NotesSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.section_heading !== 'string' || !s.section_heading.trim()) throw new Error('NotesSlot: section_heading is required');
  if (typeof s.section_cta !== 'string' || !s.section_cta.trim()) throw new Error('NotesSlot: section_cta is required');
  if (!Array.isArray(s.testimonial_notes) || s.testimonial_notes.length === 0) throw new Error('NotesSlot: testimonial_notes must be a non-empty array');

  return {
    section_heading: s.section_heading,
    section_cta: s.section_cta,
    testimonial_notes: s.testimonial_notes.map((item, i) => validateNoteItem(item, i)),
  };
}

function validateCarouselSlot(slot: unknown): TestimonialsCarouselSlot {
  if (!slot || typeof slot !== 'object') throw new Error('CarouselSlot: must be an object');
  const s = slot as Record<string, unknown>;

  if (typeof s.quote !== 'string' || !s.quote.trim()) throw new Error('CarouselSlot: quote is required');
  if (typeof s.author_name !== 'string' || !s.author_name.trim()) throw new Error('CarouselSlot: author_name is required');
  if (typeof s.author_role !== 'string' || !s.author_role.trim()) throw new Error('CarouselSlot: author_role is required');
  if (typeof s.rating_stars !== 'number' || s.rating_stars < 1 || s.rating_stars > 5) throw new Error('CarouselSlot: rating_stars must be 1-5');
  if (typeof s.author_supporting_text !== 'string' || !s.author_supporting_text.trim()) throw new Error('CarouselSlot: author_supporting_text is required');
  if (!Array.isArray(s.carousel_indicators) || s.carousel_indicators.length === 0) throw new Error('CarouselSlot: carousel_indicators must be a non-empty array');

  const controls = s.carousel_controls as Record<string, unknown>;
  if (!controls || typeof controls.left_control !== 'string' || typeof controls.right_control !== 'string')
    throw new Error('CarouselSlot: carousel_controls must have left_control and right_control');

  return {
    quote: s.quote,
    author_name: s.author_name,
    author_role: s.author_role,
    rating_stars: s.rating_stars,
    author_supporting_text: s.author_supporting_text,
    carousel_controls: {
      left_control: controls.left_control,
      right_control: controls.right_control,
    },
    carousel_indicators: s.carousel_indicators as string[],
  };
}

export function validateTestimonialsProps(raw: unknown): TestimonialsProps {
  if (!raw || typeof raw !== 'object') throw new Error('TestimonialsProps: must be an object');
  const r = raw as Record<string, unknown>;

  if (!VALID_LAYOUTS.includes(r.layoutStructure as TestimonialsLayoutStructure)) {
    throw new Error(
      `TestimonialsProps: invalid layoutStructure "${r.layoutStructure}". Must be one of: ${VALID_LAYOUTS.join(', ')}`
    );
  }

  const layout = r.layoutStructure as TestimonialsLayoutStructure;
  const tokens = validateTokens(r.tokens);

  switch (layout) {
    case 'video-grid':
      return { layoutStructure: 'video-grid', tokens, slot: validateVideoGridSlot(r.slot) };
    case 'featured-stats':
      return { layoutStructure: 'featured-stats', tokens, slot: validateFeaturedStatsSlot(r.slot) };
    case 'notes':
      return { layoutStructure: 'notes', tokens, slot: validateNotesSlot(r.slot) };
    case 'carousel':
      return { layoutStructure: 'carousel', tokens, slot: validateCarouselSlot(r.slot) };
  }
}