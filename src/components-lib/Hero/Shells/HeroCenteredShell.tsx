import React from 'react'
import type { HeroShellProps } from '@/components-lib/Hero/hero.types'
import { getAnim, resolveWrap, renderHeroAction } from '@/components-lib/Hero/hero.shellUtils'

const HeroCenteredShell: React.FC<HeroShellProps> = ({ props, styles }) => {
  const {
    hero_heading,
    hero_subheading,
    hero_media,
    hero_animated,
    hero_primary_action,
    hero_secondary_action,
  } = props

  const animated = hero_animated ?? false
  const Wrap     = resolveWrap(animated)

  const headingStyle: React.CSSProperties = {
    fontSize:     `clamp(2rem, 8vw, ${styles.heading_size})`,
    fontWeight:   styles.heading_weight,
    color:        styles.heading_color,
    margin:       0,
    wordBreak:    'break-word',
    overflowWrap: 'break-word',
    hyphens:      'auto',
  }

  const subheadingStyle: React.CSSProperties = {
    color:  styles.subheading_color,
    margin: 0,
  }

  return (
    <section
      data-testid="hero-section"
      role="banner"
      aria-label="Main hero content"
      style={{
        position:        'relative',
        width:           '100%',
        minHeight:       '100vh',
        display:         'flex',
        flexDirection:   'column',
        overflow:        'hidden',
        backgroundColor: styles.background,
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

      <div style={{
        position:       'relative',
        zIndex:         10,
        flex:           1,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        textAlign:      'center',
        padding:        styles.padding,
      }}>
        <div style={{
          maxWidth:      '48rem',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '2rem',
        }}>

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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
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

HeroCenteredShell.displayName = 'HeroCenteredShell'
export default HeroCenteredShell