import React from 'react'
import type { HeroShellProps } from '@/components-lib/Hero/hero.types'
import { getAnim, resolveWrap, renderHeroAction } from '@/components-lib/Hero/hero.shellUtils'

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
  const Wrap = resolveWrap(animated)

  const headingStyle: React.CSSProperties = {
    fontSize:     styles.heading_size,
    fontWeight:   styles.heading_weight,
    color:        styles.heading_color,
    marginBottom: '1.5rem', // structural chrome — fixed rhythm, not a token (confirmed by Syed)
    marginTop:    0,
    wordBreak:    'break-word',
  }

  const subheadingStyle: React.CSSProperties = {
    color:        styles.subheading_color,
    marginBottom: '2.5rem', // structural chrome — fixed rhythm, not a token (confirmed by Syed)
    marginTop:    0,
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
        alignItems: 'center',
        overflow:  'hidden',
      }}
    >
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

      {!hero_media && styles.background && (
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundColor: styles.background }}
        />
      )}

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
                {hero_primary_action   && renderHeroAction(hero_primary_action,   styles)}
                {hero_secondary_action && renderHeroAction(hero_secondary_action, styles)}
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