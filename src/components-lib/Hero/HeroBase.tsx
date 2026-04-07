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

  const trace = {
    componentId:    section.component_id,
    layout:         section.layout_structure ?? '(no layout)',
    slotKeys:       Object.keys(section.content_slots ?? {}),
    hasTokens:      Boolean(section.tokens && Object.keys(section.tokens).length),
  }


  const { valid, errors, warnings } = validateHeroPayload(section)

  if (warnings.length > 0) {
    console.warn('[HeroBase] Validation warnings — section will still render', {
      ...trace,
      warnings,
    })
  }
  if (!valid) {
    console.error('[HeroBase] Validation failed — section will not render', {
      ...trace,
      errors,
      contentSlots: section.content_slots ?? null,
      tokens:       section.tokens        ?? null,
    })
    return null
  }
  const props = heroSlotToProps(section.content_slots)

  if (!props) {
    console.error('[HeroBase] heroSlotToProps returned null after passing validation — contract gap suspected', {
      ...trace,
      contentSlots: section.content_slots ?? null,
    })
    return null
  }

  const styles = heroTokensToStyles(section.tokens ?? {})
  const Shell  = resolveHeroLayout(section.layout_structure)

  return <Shell props={props} styles={styles} />
}

HeroBase.displayName = 'HeroBase'
export default HeroBase