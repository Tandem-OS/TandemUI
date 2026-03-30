import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations/variants'
import type { HeroShellProps, HeroAction } from '@/components-lib/Hero/HeroTypes'

const getAnim = (delay: number, animated: boolean) => {
  if (!animated) return {}
  return {
    initial:     'hidden' as const,
    whileInView: 'show'   as const,
    viewport:    { once: true },
    variants:    fadeInUp,
    transition:  { delay },
  }
}

const actionVariantStyles: Record<string, React.CSSProperties> = {
  primary: { fontWeight: 600 },
  outline: { fontWeight: 600, background: 'transparent' },
  ghost:   { fontWeight: 400, textDecoration: 'underline', background: 'transparent', border: 'none' },
}

const HeroSplitShell: React.FC<HeroShellProps> = ({ props, styles }) => {
  const {
    hero_heading,
    hero_subheading,
    hero_media,
    hero_animated,
    hero_primary_action,
    hero_secondary_action,
  } = props

  const animated = hero_animated ?? false
  const Wrap     = animated ? motion.div : 'div'

  const headingStyle: React.CSSProperties = {
    fontSize:    styles.heading_size,
    fontWeight:  styles.heading_weight,
    color:       styles.heading_color,
    marginBottom:'1.5rem',
    marginTop:   0,
    wordBreak:   'break-word',
  }

  const subheadingStyle: React.CSSProperties = {
    color:        styles.subheading_color,
    opacity:      0.8,
    marginBottom: '2.5rem',
    marginTop:    0,
  }

  const renderAction = (action: HeroAction) => {
    const vs        = action.variant ? (actionVariantStyles[action.variant] ?? {}) : {}
    const isPrimary = action.variant === 'primary' || !action.variant
    const isOutline = action.variant === 'outline'

    return (
      <a
        key={action.target}
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
                         : isOutline ? 'transparent'
                         : 'transparent',
          color:           isPrimary ? styles.btn_primary_color
                         : isOutline ? styles.btn_outline_color
                         : styles.heading_color,
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

  return (
    <section
      data-testid="hero-section"
      role="banner"
      aria-label="Main hero content"
      style={{
        position:  'relative',
        width:     '100%',
        minHeight: '100vh',
        display:   'flex',
        alignItems:'center',
        overflow:  'hidden',
      }}
    >
      {/* Background image — shell-preferred */}
      {hero_media && (
        <div
          aria-hidden="true"
          data-testid="hero-image-container"
          style={{
            position:           'absolute',
            inset:              0,
            backgroundImage:    `url(${hero_media})`,
            backgroundSize:     'cover',
            backgroundPosition: 'center',
            backgroundRepeat:   'no-repeat',
          }}
        />
      )}

      {/* Fallback bg color when no media */}
      {!hero_media && styles.background && (
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundColor: styles.background }}
        />
      )}

      {/* Content — left-anchored */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', padding: styles.padding }}>
        <div style={{ maxWidth: '40rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>

          <Wrap {...getAnim(0, animated)} data-testid="hero-title">
            <h1 style={headingStyle}>{hero_heading}</h1>
          </Wrap>

          {hero_subheading && (
            <Wrap {...getAnim(0.1, animated)} data-testid="hero-description">
              <p style={subheadingStyle}>{hero_subheading}</p>
            </Wrap>
          )}

          {(hero_primary_action || hero_secondary_action) && (
            <Wrap
              {...getAnim(0.2, animated)}
              data-testid="hero-buttons"
              role="group"
              aria-label="Call to action"
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {hero_primary_action   && renderAction(hero_primary_action)}
                {hero_secondary_action && renderAction(hero_secondary_action)}
              </div>
            </Wrap>
          )}

        </div>
      </div>
    </section>
  )
}

HeroSplitShell.displayName = 'HeroSplitShell'
export default HeroSplitShell
