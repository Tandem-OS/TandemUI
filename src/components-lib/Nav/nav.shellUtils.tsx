//  Nav Shell Utils 

import type { NavComposeSection, NavStyles } from './nav.types'
import { navSlotsToProps } from './NavSlotsToProps'
import { resolveNavStyles } from './ResolveNavStyles'
import { resolveNavLayout, type NavLayoutKey } from './nav.layoutResolver'
import { validateNavSection } from './nav.validation'

//  Assembled props ready for NavBase 
export interface NavShellProps {
  section: NavComposeSection
  className?: string
  animated?: boolean
}

export interface ResolvedNavShellData {
  logo?: string
  links: import('./nav.types').NavLink[]
  cta?: string
  layout: NavLayoutKey
  tags: string[]
  styles: NavStyles
  animated: boolean
  className: string
}

export function resolveNavShellData(
  section: NavComposeSection,
  animated = true,
  className = '',
): ResolvedNavShellData | never {
  if (import.meta.env.DEV) {
    validateNavSection(section)
  }

  const slotProps = navSlotsToProps(section.content_slots)

  const styles = resolveNavStyles(section.tokens)

  const layout = resolveNavLayout(section.layout_structure, section.tags)
  if (!layout) {
    throw new Error(`[NavShell] Unresolvable layout for component: ${section.component_id}`)
  }

  return {
    logo: slotProps.logo,
    links: slotProps.links ?? [],
    cta: slotProps.cta,
    layout,
    tags: section.tags,
    styles,
    animated,
    className,
  }
}
