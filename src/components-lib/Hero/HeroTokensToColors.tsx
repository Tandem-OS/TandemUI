import type { ComposeSectionTokens, HeroColors } from '@/pages/Renderer/CompositionType'

export function heroTokensToColors(tokens: ComposeSectionTokens): HeroColors {
  return {
    background:              tokens.background,
    text_color:              tokens.text_color,
    btn_primary_bg:          tokens.btn_primary_bg,
    btn_primary_color:       tokens.btn_primary_color,
    btn_primary_border:      tokens.btn_primary_bg,
    btn_outline_bg:          'transparent',
    btn_outline_color:       tokens.btn_outline_border,
    btn_outline_border:      tokens.btn_outline_border,
    btn_radius:              tokens.btn_radius,
    padding:                 tokens.padding,
  }
}