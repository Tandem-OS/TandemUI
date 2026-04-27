import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations/variants'
import type { HeroStyles, HeroAction } from '@/components-lib/Hero/hero.types'

export type AnimatedWrapper = typeof motion.div | 'div'

export function getAnim(delay: number, animated: boolean) {
  if (!animated) return {}
  return {
    initial:     'hidden' as const,
    whileInView: 'show'   as const,
    viewport:    { once: true },
    variants:    fadeInUp,
    transition:  { delay },
  }
}

export function resolveWrap(animated: boolean): AnimatedWrapper {
  return animated ? motion.div : 'div'
}

const actionVariantStyles: Record<string, React.CSSProperties> = {
  primary: { fontWeight: 600 },
  outline: { fontWeight: 600, background: 'transparent' },
  ghost:   { fontWeight: 400, textDecoration: 'underline', background: 'transparent', border: 'none' },
}

export function renderHeroAction(
  action: HeroAction,
  styles: HeroStyles
): React.ReactElement {
  const vs        = action.variant ? (actionVariantStyles[action.variant] ?? {}) : {}
  const isPrimary = action.variant === 'primary' || !action.variant
  const isOutline = action.variant === 'outline'

  return (
    <a
      href={action.target}
      aria-label={action.aria_label ?? action.label}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '0 2rem',
        borderRadius:    styles.btn_radius,
        borderWidth:     '2px',
        borderStyle:     'solid',
        textDecoration:  'none',
        whiteSpace:      'nowrap',
        transition:      'background-color 200ms, color 200ms, border-color 200ms',
        backgroundColor: isPrimary ? styles.btn_primary_bg
                       : 'transparent',
        color:           isPrimary ? styles.btn_primary_color
                       : styles.heading_color,
        borderColor:     isPrimary ? styles.btn_primary_bg
                       : isOutline ? styles.btn_outline_border
                       : 'transparent',
        ...vs,
      }}
    >
      {action.label}
    </a>
  )
}