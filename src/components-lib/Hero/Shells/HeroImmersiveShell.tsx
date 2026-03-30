import React, { useState } from 'react'
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

const HeroImmersiveShell: React.FC<HeroShellProps> = ({ props, styles }) => {
  const {
    hero_heading,
    hero_media,
    hero_media_slides,
    hero_animated,
    hero_primary_action,
    hero_secondary_action,
  } = props

  const animated = hero_animated ?? false
  const Wrap     = animated ? motion.div : 'div'

  const slides = hero_media_slides?.length
    ? hero_media_slides
    : hero_media ? [hero_media] : []

  const [activeSlide, setActiveSlide] = useState(0)
  const prev = () => setActiveSlide(i => (i - 1 + slides.length) % slides.length)
  const next = () => setActiveSlide(i => (i + 1) % slides.length)

  const headingStyle: React.CSSProperties = {
    fontSize:    styles.heading_size,
    fontWeight:  styles.heading_weight,
    color:       styles.heading_color,
    marginBottom:'2.5rem',
    marginTop:   0,
    wordBreak:   'break-word',
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
        alignItems:'flex-end',
        overflow:  'hidden',
      }}
    >
      {/* Slideshow background — shell-preferred */}
      {slides.map((src, i) => (
        <div
          key={src}
          aria-hidden="true"
          data-testid={i === 0 ? 'hero-image-container' : undefined}
          style={{
            position:           'absolute',
            inset:              0,
            backgroundImage:    `url(${src})`,
            backgroundSize:     'cover',
            backgroundPosition: 'center',
            backgroundRepeat:   'no-repeat',
            opacity:            i === activeSlide ? 1 : 0,
            transition:         'opacity 700ms',
          }}
        />
      ))}

      {/* Fallback bg color when no media */}
      {slides.length === 0 && styles.background && (
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundColor: styles.background }}
        />
      )}

      {/* Content — anchored bottom-left */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', padding: styles.padding }}>
        <div style={{ maxWidth: '48rem' }}>

          <Wrap {...getAnim(0, animated)} data-testid="hero-title">
            <h1 style={headingStyle}>{hero_heading}</h1>
          </Wrap>

          {(hero_primary_action || hero_secondary_action) && (
            <Wrap
              {...getAnim(0.15, animated)}
              data-testid="hero-buttons"
              role="group"
              aria-label="Call to action"
            >
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {hero_primary_action   && renderAction(hero_primary_action)}
                {hero_secondary_action && renderAction(hero_secondary_action)}
              </div>
            </Wrap>
          )}
        </div>

        {/* Carousel controls — only when multiple slides */}
        {slides.length > 1 && (
          <div style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div role="tablist" aria-label="Slide indicators" style={{ display: 'flex', gap: '8px' }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeSlide}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActiveSlide(i)}
                  style={{
                    width:           i === activeSlide ? '24px' : '8px',
                    height:          '8px',
                    borderRadius:    '9999px',
                    backgroundColor: i === activeSlide ? '#ffffff' : 'rgba(255,255,255,0.4)',
                    border:          'none',
                    padding:         0,
                    cursor:          'pointer',
                    transition:      'width 300ms, background-color 300ms',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['prev', 'next'] as const).map(dir => (
                <button
                  key={dir}
                  onClick={dir === 'prev' ? prev : next}
                  aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
                  style={{
                    width:           '40px',
                    height:          '40px',
                    borderRadius:    '9999px',
                    border:          '1px solid rgba(255,255,255,0.4)',
                    backgroundColor: 'transparent',
                    color:           '#ffffff',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    cursor:          'pointer',
                    transition:      'background-color 200ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    {dir === 'prev'
                      ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      : <path d="M6 3L11 8L6 13"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    }
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

HeroImmersiveShell.displayName = 'HeroImmersiveShell'
export default HeroImmersiveShell
