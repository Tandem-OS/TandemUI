import React from 'react'
import { motion } from 'framer-motion'
import type { NavLink } from '@/components-lib/Nav/NavSlotsToProps'
import type { NavColors } from '@/components-lib/Nav/ResolveNavStyles.ts'

// ── Variant config — structural defaults per nav pattern ──────────────────
// These are not global tokens — they define layout geometry for pill style
// Only applied when isPill is true, derived from tags
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
  // Slots — all come from API content_slots
  logo?: string
  links?: NavLink[]
  cta?: string

  // Layout — derived directly from API response fields
layout_structure?: string
  tags: string[]

  // Token layer — themeable per project
  colors: NavColors
  padding?: string
  linkSize?: string
  linkGap?: string           // token: gap between nav links
  logoHeight?: string        // token: logo height
  linkWeight?: string        // token: link font weight
  btnPadding?: string        // token: CTA button padding
  btnWeight?: string         // token: CTA button font weight
  containerMaxWidth?: string // token: max width of nav container

  // Variant config layer — structural defaults per nav pattern
  variantConfig?: Partial<NavVariantConfig>

  // Optional
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
  // Merge variant config with defaults
  const vc: NavVariantConfig = {
    ...DEFAULT_VARIANT_CONFIG,
    ...variantConfig,
  }

  // ── Derive behavior from DB tags — no hardcoding 
  const isPill = tags.includes('pill_links')
  const isCenteredLogo = tags.includes('centered_logo')
const layoutVariant = isCenteredLogo ? 'centered-logo' : (layout_structure ?? '')

  // ── Safe links 
  const safeLinks = links ?? []

  // ── Styles — all from tokens, no fallbacks 
  const containerStyle: React.CSSProperties = {
    backgroundColor: colors.background,
    padding: padding,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
  }

  const linkStyle: React.CSSProperties = {
    color: colors.text,
    fontSize: linkSize,
    textDecoration: 'none',
    fontWeight: linkWeight,
    transition: 'opacity 0.2s',
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
    display: 'inline-block',
    whiteSpace: 'nowrap' as const,
  }

  const innerContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: containerMaxWidth,
    margin: '0 auto',
    width: '100%',
  }

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: linkGap,
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

  // ── Links — pill style derived from tags + variant config
  const LinksEl = (
    <nav style={navLinksStyle}>
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

  // ── CTA
  const CtaEl = cta ? (
    <a
      href="#cta"
      style={ctaStyle}
      data-slot="nav_cta"
      data-testid="nav-cta"
    >
      {cta}
    </a>
  ) : null

  // ── Layouts 
  const SplitLayout = (
    <div style={innerContainerStyle}>
      {LogoEl}
      {LinksEl}
      {CtaEl}
    </div>
  )

  const CenteredLayout = (
    <div style={{ ...innerContainerStyle, position: 'relative' }}>
      {LogoEl}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        {LinksEl}
      </div>
      {CtaEl}
    </div>
  )

  const halfLinks = Math.ceil(safeLinks.length / 2)
  const leftLinks = safeLinks.slice(0, halfLinks)
  const rightLinks = safeLinks.slice(halfLinks)

  const CenteredLogoLayout = (
    <div style={innerContainerStyle}>
      <nav style={navLinksStyle}>
        {leftLinks.map((link, i) => (
          <a key={i} href={link.href} style={linkStyle}
            data-testid={`nav-link-left-${i}`}>
            {link.label}
          </a>
        ))}
      </nav>
      {LogoEl}
      <nav style={navLinksStyle}>
        {rightLinks.map((link, i) => (
          <a key={i} href={link.href} style={linkStyle}
            data-testid={`nav-link-right-${i}`}>
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )

  const layoutMap: Record<string, React.ReactNode> = {
    'split': SplitLayout,
    'centered': CenteredLayout,
    'centered-logo': CenteredLogoLayout,
  }

  const Wrapper = animated ? motion.header : 'header'
  const wrapperProps = animated ? {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  } : {}

  return (
    <Wrapper
      style={containerStyle}
      className={className}
      aria-label="Site navigation"
      data-testid="nav-base"
      {...(wrapperProps as any)}
    >
      {layoutMap[layoutVariant] ?? SplitLayout}
    </Wrapper>
  )
}

export default NavBase