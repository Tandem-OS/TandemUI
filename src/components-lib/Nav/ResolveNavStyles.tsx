// ── Resolve Nav Styles 

import type { NavTokens, NavColors, NavStyles } from './nav.types'
export type { NavColors, NavTokens, NavStyles }

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

    // Layout tokens 
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