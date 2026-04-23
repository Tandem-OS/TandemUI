import React, { useState } from 'react'
import type { HeroShellProps } from '@/components-lib/Hero/hero.types'
import { getAnim, resolveWrap, renderHeroAction } from '@/components-lib/Hero/hero.shellUtils'

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
  const Wrap = resolveWrap(animated)

  const slides = hero_media_slides?.length
    ? hero_media_slides
    : hero_media ? [hero_media] : []

  const [activeSlide, setActiveSlide] = useState(0)
  const prev = () => setActiveSlide(i => (i - 1 + slides.length) % slides.length)
  const next = () => setActiveSlide(i => (i + 1) % slides.length)
  const headingStyle: React.CSSProperties = {
    fontSize: `clamp(2rem, 8vw, ${styles.heading_size})`,
    fontWeight: styles.heading_weight,
    color: styles.heading_color,
    marginBottom: '2.5rem',
    marginTop: 0,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'auto',
  }

  return (
    <section
      data-testid="hero-section"
      role="banner"
      aria-label="Main hero content"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {slides.map((src, i) => (
        <div
          key={src}
          aria-hidden="true"
          data-testid={i === 0 ? 'hero-image-container' : undefined}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: i === activeSlide ? 1 : 0,
            transition: 'opacity 700ms',
          }}
        />
      ))}

      {slides.length === 0 && styles.background && (
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundColor: styles.background }}
        />
      )}

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
                {hero_primary_action && renderHeroAction(hero_primary_action, styles)}
                {hero_secondary_action && renderHeroAction(hero_secondary_action, styles)}
              </div>
            </Wrap>
          )}
        </div>

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
                    width: i === activeSlide ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    backgroundColor: i === activeSlide
                      ? styles.carousel_dot_active_color
                      : styles.carousel_dot_inactive_color,
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'width 300ms, background-color 300ms',
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
                    width: '40px',
                    height: '40px',
                    borderRadius: '9999px',
                    border: `1px solid ${styles.carousel_arrow_border_color}`,
                    backgroundColor: 'transparent',
                    color: styles.carousel_arrow_color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 200ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = styles.carousel_arrow_hover_bg ?? 'transparent')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    {dir === 'prev'
                      ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      : <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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