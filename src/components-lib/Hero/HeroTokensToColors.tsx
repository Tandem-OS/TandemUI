import type { ComposeSectionTokens } from '@/pages/Renderer/CompositionType'

type ColorMode = { light?: string; dark?: string }

export interface HeroColors {
  background?: ColorMode
  title?: ColorMode
  description?: ColorMode
  primaryButton?: {
    background?: ColorMode
    text?: ColorMode
    border?: ColorMode
    hover?: {
      background?: ColorMode
      text?: ColorMode
      border?: ColorMode
    }
  }
  secondaryButton?: {
    background?: ColorMode
    text?: ColorMode
    border?: ColorMode
    hover?: {
      background?: ColorMode
      text?: ColorMode
      border?: ColorMode
    }
  }
}

export function heroTokensToColors(tokens: ComposeSectionTokens): HeroColors {
  const isOutline = tokens.btn_primary_bg === 'transparent'
  const primaryBorder = isOutline ? tokens.btn_outline_border : tokens.btn_primary_bg
  const primaryHoverBg = isOutline ? tokens.text_color : undefined
  const primaryHoverText = isOutline ? tokens.background : tokens.text_color

  const mode = (val?: string): ColorMode => ({ light: val, dark: val })

  return {
    background: mode(tokens.background),
    title: mode(tokens.text_color),
    description: mode(tokens.text_color),
    primaryButton: {
      background: mode(tokens.btn_primary_bg),
      text: mode(tokens.btn_primary_color),
      border: mode(primaryBorder),
      hover: {
        background: mode(primaryHoverBg),
        text: mode(primaryHoverText),
        border: mode(primaryBorder),
      }
    },
    secondaryButton: {
      background: mode('transparent'),
      text: mode(tokens.btn_outline_border),
      border: mode(tokens.btn_outline_border),
      hover: {
        background: mode(tokens.btn_outline_border),
        text: mode(tokens.background),
        border: mode(tokens.btn_outline_border),
      }
    }
  }
}
