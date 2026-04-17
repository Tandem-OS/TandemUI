import type { ComposeSectionTokens } from '@/pages/Renderer/CompositionType'
import type { HeroStyles } from '@/components-lib/Hero/hero.types'

export function heroTokensToStyles(tokens: ComposeSectionTokens): HeroStyles {
  return {
    background: tokens.background,
    heading_color: tokens.heading_color,
    subheading_color: tokens.subheading_color,
    heading_size: tokens.heading_size,
    heading_weight: tokens.heading_weight,
    btn_primary_bg: tokens.btn_primary_bg,
    btn_primary_color: tokens.btn_primary_color,
    btn_outline_border: tokens.btn_outline_border,
    btn_radius: tokens.btn_radius,
    padding: tokens.padding,
    carousel_dot_active_color: tokens.carousel_dot_active_color,
    carousel_dot_inactive_color: tokens.carousel_dot_inactive_color,
    carousel_arrow_color: tokens.carousel_arrow_color,
    carousel_arrow_border_color: tokens.carousel_arrow_border_color,
    carousel_arrow_hover_bg: tokens.carousel_arrow_hover_bg,
  }
}