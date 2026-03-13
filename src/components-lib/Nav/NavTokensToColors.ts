import type { NavTokens, NavColors } from '@/pages/Renderer/CompositionType';
export type { NavColors, NavTokens }

export function navTokensToColors(tokens: NavTokens): NavColors {
  const isOutline = tokens.btn_primary_bg === 'transparent';

  return {
    background: tokens.background,
    text: tokens.text_color,
    btnBg: tokens.btn_primary_bg,
    btnText: tokens.btn_primary_color,
    btnRadius: tokens.btn_radius,
    btnHoverBg: isOutline ? tokens.text_color : tokens.btn_primary_bg,
    btnHoverText: isOutline ? tokens.background : tokens.btn_primary_color,
  };
}
