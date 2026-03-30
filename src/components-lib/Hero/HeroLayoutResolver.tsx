import type { ComponentType } from 'react'
import type { HeroShellProps, HeroLayoutStructure } from '@/components-lib/Hero/HeroTypes'

import HeroStackedShell   from './Shells/HeroStackedShell'
import HeroImmersiveShell from '@/components-lib/Hero/Shells/HeroImmersiveShell'
import HeroSplitShell     from '@/components-lib/Hero/Shells/HeroSplitShell'
import HeroCenteredShell  from '@/components-lib/Hero/Shells/HeroCenteredShell'

const heroShellMap: Record<HeroLayoutStructure, ComponentType<HeroShellProps>> = {
  stacked:   HeroStackedShell,
  immersive: HeroImmersiveShell,
  split:     HeroSplitShell,
  centered:  HeroCenteredShell,
}

export function resolveHeroLayout(
  layout_structure?: string | null
): ComponentType<HeroShellProps> {
  const layout = layout_structure as HeroLayoutStructure

  if (!layout || !heroShellMap[layout]) {
    console.warn(
      `[resolveHeroLayout] Unrecognized layout_structure: "${layout_structure}". ` +
      `Supported: ${Object.keys(heroShellMap).join(', ')}. ` +
      `Falling back to HeroCenteredShell.`
    )
    return HeroCenteredShell
  }

  return heroShellMap[layout]
}
