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

  const { valid, warnings } = validateHeroPayload(section)

  if (warnings.length > 0) {
    // Validation warnings — section will still render
  }

  if (!valid) {
    return null
  }

  const props = heroSlotToProps(section.content_slots)

  if (!props) {
    return null
  }

  const styles = heroTokensToStyles(section.tokens ?? {})
  const Shell  = resolveHeroLayout(section.layout_structure)

  return <Shell props={props} styles={styles} />
}

HeroBase.displayName = 'HeroBase'
export default HeroBase
