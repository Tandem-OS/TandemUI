import React from 'react'
import type { HeroComposeSection } from '@/pages/Renderer/CompositionType'
import { validateHeroPayload }  from '@/components-lib/Hero/HeroValidation'
import { heroSlotToProps }      from '@/components-lib/Hero/HeroSlotsToProps'
import { heroTokensToStyles }   from '@/components-lib/Hero/HeroTokensToColors'
import { resolveHeroLayout }    from '@/components-lib/Hero/HeroLayoutResolver'
import HeroCenteredShell        from '@/components-lib/Hero/Shells/HeroCenteredShell'

interface HeroBaseProps {
  section: HeroComposeSection
}

const HeroBase: React.FC<HeroBaseProps> = ({ section }) => {

  const { valid, errors, warnings } = validateHeroPayload(section)

  warnings.forEach(w => console.warn(`[HeroBase] ${w}`))

  if (!valid) {
    errors.forEach(e => console.error(`[HeroBase] ${e}`))
    return (
      <section
        role="banner"
        style={{ padding: '2rem', backgroundColor: '#fff1f1' }}
        data-testid="hero-error"
      >
        <p style={{ color: 'red', fontWeight: 600 }}>
          [HeroBase] Payload validation failed:
        </p>
        <ul style={{ color: 'red', marginTop: '0.5rem' }}>
          {errors.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      </section>
    )
  }

  const props = heroSlotToProps(section.content_slots)

  if (!props) {
    console.error('[HeroBase] heroSlotToProps returned null — rendering fallback')
    return (
      <HeroCenteredShell
        props={{ hero_heading: '' }}
        styles={heroTokensToStyles(section.tokens)}
      />
    )
  }

  const styles = heroTokensToStyles(section.tokens)

  const Shell = resolveHeroLayout(section.layout_structure)

  return <Shell props={props} styles={styles} />
}

HeroBase.displayName = 'HeroBase'
export default HeroBase
