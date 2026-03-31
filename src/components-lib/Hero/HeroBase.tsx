import React from 'react'
import type { HeroComposeSection } from '@/pages/Renderer/CompositionType'
import { validateHeroPayload } from '@/components-lib/Hero/hero.validation'
import { heroSlotToProps }     from '@/components-lib/Hero/hero.slotToProps'
import { heroTokensToStyles }  from '@/components-lib/Hero/hero.tokensToStyles'
import { resolveHeroLayout }   from '@/components-lib/Hero/hero.layoutResolver'


interface HeroBaseProps {
  section: HeroComposeSection
}

const HeroBase: React.FC<HeroBaseProps> = ({ section }) => {

  const { valid, errors, warnings } = validateHeroPayload(section)

  warnings.forEach(w => console.warn(`[HeroBase] ${w}`))

  if (!valid) {
    errors.forEach(e => console.error(`[HeroBase] ${e}`))
    return null
  }

  const props = heroSlotToProps(section.content_slots)

  if (!props) {
    console.error('[HeroBase] heroSlotToProps returned null after passing validation — skipping render')
    return null
  }

  const styles = heroTokensToStyles(section.tokens ?? {})
  const Shell  = resolveHeroLayout(section.layout_structure)

  return <Shell props={props} styles={styles} />
}

HeroBase.displayName = 'HeroBase'
export default HeroBase