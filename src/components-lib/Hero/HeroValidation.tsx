import type { HeroComposeSection } from '@/pages/Renderer/CompositionType'
import type { HeroLayoutStructure } from '@/components-lib/Hero/HeroTypes'

const ALLOWED_LAYOUTS:        HeroLayoutStructure[] = ['stacked', 'immersive', 'split', 'centered']
const REQUIRED_SLOTS:         string[]              = ['hero_heading']
const OPTIONAL_SLOTS:         string[]              = ['hero_subheading', 'hero_secondary_action', 'hero_media']
const ALLOWED_SLOTS:          Set<string>           = new Set([...REQUIRED_SLOTS, ...OPTIONAL_SLOTS])
const ALLOWED_TOKEN_KEYS:     Set<string>           = new Set([
  'background', 'heading_color', 'subheading_color', 'heading_size',
  'heading_weight', 'btn_primary_bg', 'btn_primary_color',
  'btn_outline_border', 'btn_radius', 'padding',
])

export interface HeroValidationResult {
  valid:    boolean
  errors:   string[]
  warnings: string[]
}

export function validateHeroPayload(
  section: HeroComposeSection
): HeroValidationResult {
  const errors:   string[] = []
  const warnings: string[] = []

  const slots  = section.content_slots ?? {}
  const tokens = section.tokens        ?? {}

  if (!section.layout_structure) {
    warnings.push('layout_structure is missing — will fall back to HeroCenteredShell')
  } else if (!ALLOWED_LAYOUTS.includes(section.layout_structure as HeroLayoutStructure)) {
    warnings.push(
      `layout_structure "${section.layout_structure}" is not recognized. ` +
      `Supported: ${ALLOWED_LAYOUTS.join(', ')}. Will fall back to HeroCenteredShell.`
    )
  }

  for (const slot of REQUIRED_SLOTS) {
    const value = slots[slot as keyof typeof slots]
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors.push(`Missing or empty family-required slot: "${slot}"`)
    }
  }

  for (const key of Object.keys(slots)) {
    if (!ALLOWED_SLOTS.has(key) && slots[key as keyof typeof slots] !== null) {
      warnings.push(`Unrecognized slot: "${key}" — will be ignored by adapter`)
    }
  }

  for (const key of Object.keys(tokens)) {
    if (!ALLOWED_TOKEN_KEYS.has(key)) {
      warnings.push(`Unrecognized token key: "${key}" — will be ignored by adapter`)
    }
  }

  const layout = section.layout_structure
  if (layout === 'immersive' && !slots.hero_media) {
    warnings.push('HeroImmersiveShell strongly prefers hero_media — rendering may degrade without it')
  }
  if (layout === 'split' && !slots.hero_media) {
    warnings.push('HeroSplitShell strongly prefers hero_media — rendering may degrade without it')
  }

  return {
    valid:    errors.length === 0,
    errors,
    warnings,
  }
}
