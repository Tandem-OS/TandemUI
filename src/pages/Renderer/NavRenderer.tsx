import React from 'react'
import NavSplitShell from '@/components-lib/Nav/Shells/NavSplitShell'
import NavCenteredShell from '@/components-lib/Nav/Shells/NavCenteredShell'
import NavCenteredLogoShell from '@/components-lib/Nav/Shells/NavCenteredLogoShell'
import { resolveNavLayout } from '@/components-lib/Nav/nav.layoutResolver'
import type { NavComposeSection } from '@/components-lib/Nav/nav.types'

// ── Props ─────────────────────────────────────────────────────
interface NavRendererProps {
  sections: NavComposeSection[]
}

const shellMap = {
  'split':          NavSplitShell,
  'centered':       NavCenteredShell,
  'centered-logo':  NavCenteredLogoShell,
} as const

// ── NavRenderer ───────────────────────────────────────────────
const NavRenderer: React.FC<NavRendererProps> = ({ sections }) => {
  if (!sections.length) return null

  const section = sections[0]
  const layout = resolveNavLayout(section.layout_structure, section.tags ?? [])
  const Shell = shellMap[layout]

  return <Shell section={section} />
}

export default NavRenderer