// ── NavCenteredShell 

import React from 'react'
import NavBase from '../NavBase'
import { resolveNavShellData, type NavShellProps } from '../nav.shellUtils'

const NavCenteredShell: React.FC<NavShellProps> = ({
  section,
  className,
  animated,
}) => {
  const {
    logo,
    links,
    cta,
    tags,
    styles,
    animated: resolvedAnimated,
    className: resolvedClassName,
  } = resolveNavShellData(section, animated, className)

  return (
    <NavBase
      logo={logo}
      links={links}
      cta={cta}
      layout_structure={section.layout_structure}
      tags={tags}
      colors={styles.colors}
      padding={styles.padding}
      linkSize={styles.linkSize}
      linkGap={styles.linkGap}
      logoHeight={styles.logoHeight}
      linkWeight={styles.linkWeight}
      btnPadding={styles.btnPadding}
      btnWeight={styles.btnWeight}
      containerMaxWidth={styles.containerMaxWidth}
      animated={resolvedAnimated}
      className={resolvedClassName}
    />
  )
}

export default NavCenteredShell