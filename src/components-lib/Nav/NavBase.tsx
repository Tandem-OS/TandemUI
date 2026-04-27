import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavLink } from '@/components-lib/Nav/NavSlotsToProps'
import type { NavColors } from '@/components-lib/Nav/ResolveNavStyles.ts'

interface NavVariantConfig {
  pillPadding: string
  pillRadius: number
  pillBorderWidth: string
}

const DEFAULT_VARIANT_CONFIG: NavVariantConfig = {
  pillPadding: '5px 14px',
  pillRadius: 999,
  pillBorderWidth: '1.5px',
}

export interface NavBaseProps {
  logo?: string
  links?: NavLink[]
  cta?: string
  layout_structure?: string
  tags: string[]
  colors: NavColors
  padding?: string
  linkSize?: string
  linkGap?: string
  logoHeight?: string
  linkWeight?: string
  btnPadding?: string
  btnWeight?: string
  containerMaxWidth?: string
  variantConfig?: Partial<NavVariantConfig>
  className?: string
  animated?: boolean
}

const NavBase: React.FC<NavBaseProps> = ({
  logo,
  links,
  cta,
  layout_structure,
  tags,
  colors,
  padding,
  linkSize,
  linkGap,
  logoHeight,
  linkWeight,
  btnPadding,
  btnWeight,
  containerMaxWidth,
  variantConfig,
  className = '',
  animated = true,
}) => {
  const vc: NavVariantConfig = { ...DEFAULT_VARIANT_CONFIG, ...variantConfig }
  const [menuOpen, setMenuOpen] = useState(false)

  const isPill = tags.includes('pill_links')
  const isCenteredLogo = tags.includes('centered_logo')
  const layoutVariant = isCenteredLogo ? 'centered-logo' : (layout_structure ?? '')
  const safeLinks = links ?? []

  // ── Token-driven styles only
  const linkStyle: React.CSSProperties = {
    color: colors.text,
    fontSize: linkSize,
    textDecoration: 'none',
    fontWeight: linkWeight,
    transition: 'opacity 0.2s',
    whiteSpace: 'nowrap',
  }

  const ctaStyle: React.CSSProperties = {
    backgroundColor: colors.btnBg,
    color: colors.btnText,
    borderRadius: colors.btnRadius,
    padding: btnPadding,
    fontSize: linkSize,
    fontWeight: btnWeight,
    border: colors.btnBg === 'transparent'
      ? `${vc.pillBorderWidth} solid ${colors.text}`
      : 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  }

  // ── Logo
  const LogoEl = logo ? (
    <img
      src={logo}
      alt="Logo"
      style={{ height: logoHeight, width: 'auto', objectFit: 'contain' }}
      data-slot="nav_logo"
      data-testid="nav-logo"
    />
  ) : null

  // ── Hamburger
  const HamburgerEl = (
    <button
      onClick={() => setMenuOpen(o => !o)}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpen}
      data-testid="nav-hamburger"
      className="flex flex-col justify-center gap-[5px] p-1 md:hidden"
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: colors.text, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
      <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: colors.text, transition: 'opacity 0.2s', opacity: menuOpen ? 0 : 1 }} />
      <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: colors.text, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
    </button>
  )

  // ── Mobile drawer
  const MobileDrawer = (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          data-testid="nav-mobile-drawer"
          className="flex flex-col md:hidden"
          style={{
            backgroundColor: colors.background,
            padding: padding,
            borderTop: `1px solid ${colors.text}20`,
          }}
        >
          {safeLinks.map((link, i) => (
<a
              key={i}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2"
              style={linkStyle}
              data-testid={`nav-mobile-link-${i}`}
              aria-label={link.label}
            >
              {link.label}
            </a>
          ))}
          {cta && (
            <a
              href="#cta"
              onClick={() => setMenuOpen(false)}
              className="mt-2 text-center"
              style={ctaStyle}
              data-testid="nav-mobile-cta"
            >
              {cta}
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )

  // ── Desktop links
  const LinksEl = (
    <nav className="hidden md:flex items-center" style={{ gap: linkGap }}>
      {safeLinks.map((link, i) => (
<a
          key={i}
          href={link.href}
          style={{
            ...linkStyle,
            ...(isPill ? {
              backgroundColor: colors.pillBg,
              padding: vc.pillPadding,
              borderRadius: vc.pillRadius,
            } : {}),
          }}
          data-testid={`nav-link-${i}`}
          aria-label={link.label}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )

  const CtaEl = cta ? (
    <a
      href="#cta"
      className="hidden md:inline-block"
      style={ctaStyle}
      data-slot="nav_cta"
      data-testid="nav-cta"
    >
      {cta}
    </a>
  ) : null

  // ── Mobile top bar — logo + hamburger
  const MobileBar = (
    <div className="flex md:hidden items-center justify-between w-full">
      {LogoEl}
      {HamburgerEl}
    </div>
  )

  // ── Desktop layouts
  const SplitLayout = (
    <div className="hidden md:flex items-center justify-between w-full" style={{ maxWidth: containerMaxWidth, margin: '0 auto' }}>
      {LogoEl}
      {LinksEl}
      {CtaEl}
    </div>
  )

  const CenteredLayout = (
    <div className="hidden md:flex items-center justify-between w-full relative" style={{ maxWidth: containerMaxWidth, margin: '0 auto' }}>
      {LogoEl}
      <div className="absolute left-1/2 -translate-x-1/2">
        {LinksEl}
      </div>
      {CtaEl}
    </div>
  )

  const halfLinks = Math.ceil(safeLinks.length / 2)
  const leftLinks = safeLinks.slice(0, halfLinks)
  const rightLinks = safeLinks.slice(halfLinks)

  const CenteredLogoLayout = (
    <div className="hidden md:flex items-center justify-between w-full" style={{ maxWidth: containerMaxWidth, margin: '0 auto' }}>
      <nav className="flex items-center" style={{ gap: linkGap }}>
        {leftLinks.map((link, i) => (
          <a key={i} href={link.href} style={linkStyle} data-testid={`nav-link-left-${i}`}>
            {link.label}
          </a>
        ))}
      </nav>
      {LogoEl}
      <nav className="flex items-center" style={{ gap: linkGap }}>
        {rightLinks.map((link, i) => (
          <a key={i} href={link.href} style={linkStyle} data-testid={`nav-link-right-${i}`}>
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )

  const layoutMap: Record<string, React.ReactNode> = {
    'split':         SplitLayout,
    'centered':      CenteredLayout,
    'centered-logo': CenteredLogoLayout,
  }

  const Wrapper = animated ? motion.header : 'header'
  const wrapperProps = animated ? {
    initial:    { opacity: 0, y: -12 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  } : {}

  return (
    <Wrapper
      style={{ backgroundColor: colors.background, padding, position: 'sticky', top: 0, zIndex: 100, width: '100%' }}
      className={`overflow-hidden ${className}`}
      aria-label="Site navigation"
      data-testid="nav-base"
      {...(wrapperProps as any)}
    >
      {MobileBar}
      {layoutMap[layoutVariant] ?? SplitLayout}
      {MobileDrawer}
    </Wrapper>
  )
}

export default NavBase