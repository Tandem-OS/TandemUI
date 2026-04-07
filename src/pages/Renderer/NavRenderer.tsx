import React from 'react'
import NavBase from '@/components-lib/Nav/NavBase'
import { navSlotsToProps } from '@/components-lib/Nav/NavSlotsToProps'
import { resolveNavStyles } from '@/components-lib/Nav/ResolveNavStyles'
import type { NavComposeSection } from '@/pages/Renderer/CompositionType'

// ── Props ─────────────────────────────────────────────────────
interface NavRendererProps {
  sections: NavComposeSection[]
}

// ── NavRenderer (pure) ────────────────────────────────────────
const NavRenderer: React.FC<NavRendererProps> = ({ sections }) => {
  if (!sections.length) return null

  const section = sections[0]
  const props  = navSlotsToProps(section.content_slots)
  const styles = resolveNavStyles(section.tokens)

  return (
    <NavBase
      {...props}
      colors={styles.colors}
      padding={styles.padding}
      linkSize={styles.linkSize}
      linkGap={styles.linkGap}
      logoHeight={styles.logoHeight}
      linkWeight={styles.linkWeight}
      btnPadding={styles.btnPadding}
      btnWeight={styles.btnWeight}
      containerMaxWidth={styles.containerMaxWidth}
      layout_structure={section.layout_structure ?? 'split'}
      tags={section.tags ?? []}
    />
  )
}

export default NavRenderer