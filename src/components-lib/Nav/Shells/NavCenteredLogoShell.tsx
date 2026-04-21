// ── NavCenteredLogoShell 


import React from 'react'
import NavBase from '../NavBase'
import { resolveNavShellData, type NavShellProps } from '../nav.shellUtils'

const NavCenteredLogoShell: React.FC<NavShellProps> = ({
  section,
  className,
  animated,
}) => {
  const {
    logo,
    links,
    cta,
    layout,
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
      layout_structure={layout}
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

export default NavCenteredLogoShell