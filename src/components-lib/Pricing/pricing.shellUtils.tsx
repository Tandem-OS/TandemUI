import React from 'react'
import type { PricingStyles, PricingAction } from '@/components-lib/Pricing/pricing.types'

// ---------------------------------------------------------------------------
// CTA renderer
// ---------------------------------------------------------------------------

const actionVariantStyles: Record<string, React.CSSProperties> = {
  primary: { fontWeight: 600 },
  outline: { fontWeight: 600, background: 'transparent' },
  ghost:   { fontWeight: 400, textDecoration: 'underline', background: 'transparent', border: 'none' },
}

export function renderPricingAction(
  action: PricingAction,
  styles: PricingStyles
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
        width:           '100%',
        padding:         '0.75rem 1.5rem',
        borderRadius:    styles.btn_radius,
        borderWidth:     '2px',
        borderStyle:     'solid',
        textDecoration:  'none',
        whiteSpace:      'nowrap',
        transition:      'background-color 200ms, color 200ms, border-color 200ms',
        backgroundColor: isPrimary ? styles.btn_primary_bg
                       : isOutline ? 'transparent'
                       : 'transparent',
        color:           isPrimary ? styles.btn_primary_color
                       : isOutline ? styles.btn_outline_color
                       : 'inherit',
        borderColor:     isPrimary ? styles.btn_primary_bg
                       : isOutline ? (styles.btn_outline_border ?? styles.btn_outline_color)
                       : 'transparent',
        ...vs,
      }}
    >
      {action.label}
    </a>
  )
}