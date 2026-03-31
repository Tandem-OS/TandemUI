import type React from 'react'
import type { PricingShellProps } from '@/components-lib/Pricing/pricing.types'
import PricingThreeColumnShell from '@/components-lib/Pricing/Shells/PricingThreeColumnShell'

type PricingShellComponent = React.FC<PricingShellProps>

const layoutMap: Record<string, PricingShellComponent> = {
  'three-column': PricingThreeColumnShell,
}

const DEFAULT_SHELL = PricingThreeColumnShell

export function resolvePricingLayout(
  layout_structure?: string
): PricingShellComponent {
  if (!layout_structure) return DEFAULT_SHELL
  return layoutMap[layout_structure] ?? DEFAULT_SHELL
}