import React from 'react'
import { motion } from 'framer-motion'
import type { NavLink } from '@/components-lib/Nav/NavSlotsToProps'
import type { NavColors } from '@/components-lib/Nav/NavTokensToColors'

export interface NavBaseProps {
  // Slots — all come from API content_slots
  logo?: string
  links?: NavLink[]        // ← optional, can be undefined
  cta?: string

  // Layout — derived directly from API response fields
  layout_structure: string
  tags: string[]

  // Tokens → colors — no hardcoded defaults
  colors: NavColors
  padding?: string
  linkSize?: string

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
  className = '',
  animated = true,
}) => {
  // const [menuOpen, setMenuOpen] = useState(false)

  // ── Derive behavior from DB tags — no hardcoding ──────────
  const isPill = tags.includes('pill_links')
  const isCenteredLogo = tags.includes('centered_logo')
  const layoutVariant = isCenteredLogo ? 'centered-logo' : layout_structure

  // ── Safe links — rendering concern only, not data ─────────
  const safeLinks = links ?? []

  // ── Styles — all from tokens, no fallbacks ────────────────
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
    fontWeight: 500,
    transition: 'opacity 0.2s',
  }

  const ctaStyle: React.CSSProperties = {
    backgroundColor: colors.btnBg,
    color: colors.btnText,
    borderRadius: colors.btnRadius,
    padding: '8px 20px',
    fontSize: linkSize,
    fontWeight: 600,
    border: colors.btnBg === 'transparent'
      ? `1.5px solid ${colors.text}`
      : 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    display: 'inline-block',
    whiteSpace: 'nowrap' as const,
  }

  // ── Logo
  const LogoEl = logo ? (
    <img
      src={logo}
      alt="Logo"
      style={{ height: 32, width: 'auto', objectFit: 'contain' }}
      data-slot="nav_logo"
      data-testid="nav-logo"
    />
  ) : null

  // ── Links — pill style derived from tags
  const LinksEl = (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
      {safeLinks.map((link, i) => (
        <a
          key={i}
          href={link.href}
          style={{
            ...linkStyle,
            ...(isPill ? {
              backgroundColor: 'rgba(0,0,0,0.06)',
              padding: '5px 14px',
              borderRadius: 999,
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

  // ── CTA — only render if slot has value
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

  // ── Layout: split
  const SplitLayout = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 1440,
      margin: '0 auto',
      width: '100%',
    }}>
      {LogoEl}
      {LinksEl}
      {CtaEl}
    </div>
  )

  // ── Layout: centered
  const CenteredLayout = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      maxWidth: 1440,
      margin: '0 auto',
      width: '100%',
    }}>
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

  // ── Layout: centered-logo (symmetric links around logo)
  const halfLinks = Math.ceil(safeLinks.length / 2)
  const leftLinks = safeLinks.slice(0, halfLinks)
  const rightLinks = safeLinks.slice(halfLinks)

  const CenteredLogoLayout = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 1440,
      margin: '0 auto',
      width: '100%',
    }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {leftLinks.map((link, i) => (
          <a key={i} href={link.href} style={linkStyle}
            data-testid={`nav-link-left-${i}`}>
            {link.label}
          </a>
        ))}
      </nav>
      {LogoEl}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {rightLinks.map((link, i) => (
          <a key={i} href={link.href} style={linkStyle}
            data-testid={`nav-link-right-${i}`}>
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )

  // ── Layout map — derived from DB, not hardcoded
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