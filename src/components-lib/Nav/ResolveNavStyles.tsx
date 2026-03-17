// Renamed from NavTokensToColors → resolveNavStyles
// Handles spacing, sizing, and layout — not just colors
// NavBase reads from this output — zero inline literals

import type { NavTokens, NavColors } from '@/pages/Renderer/CompositionType'
export type { NavColors, NavTokens }

export interface NavStyles {
  // Color tokens
  colors: NavColors

  // Layout tokens — themeable per project
  padding?: string
  linkSize?: string
  linkGap?: string
  logoHeight?: string
  linkWeight?: string
  btnPadding?: string
  btnWeight?: string
  containerMaxWidth?: string
}

export function resolveNavStyles(tokens: NavTokens): NavStyles {
  const isOutline = tokens.btn_primary_bg === 'transparent'

  return {
    colors: {
      background: tokens.background,
      text: tokens.text_color,
      btnBg: tokens.btn_primary_bg,
      btnText: tokens.btn_primary_color,
      btnRadius: tokens.btn_radius,
      btnHoverBg: isOutline ? tokens.text_color : tokens.btn_primary_bg,
      btnHoverText: isOutline ? tokens.background : tokens.btn_primary_color,
    },

    // Layout tokens — all from DB, none hardcoded
    padding: tokens.padding,
    linkSize: tokens.link_size,
    linkGap: tokens.link_gap,
    logoHeight: tokens.logo_height,
    linkWeight: tokens.link_weight,
    btnPadding: tokens.btn_padding,
    btnWeight: tokens.btn_weight,
    containerMaxWidth: tokens.container_max_width,
  }
}