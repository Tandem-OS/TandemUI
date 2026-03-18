import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import type { HeroColors, HeroAction } from '@/pages/Renderer/CompositionType';

// ── Props ────────────────────────────────────────────────────────────────────
interface Hero_04Props {
  hero_heading?: string | null;
  hero_subheading?: string | null;
  hero_media?: string | null;
  hero_animated?: boolean | null;
  hero_primary_action?: HeroAction | null;
  hero_secondary_action?: HeroAction | null;
  hero_trust_text?: string | null;
  hero_search_placeholder?: string | null;
  colors: HeroColors;
}

// ── Variant config ───────────────────────────────────────────────────────────
const variantConfig: Record<string, {
  sectionMinHeight: string;
  contentPaddingX: string;
  contentPaddingTop: string;
  contentPaddingBot: string;
  contentMaxWidth: string;
  contentGap: string;
  titleFontSize: string;
  titleFontWeight: string;
  titleLineHeight: string;
  descFontSize: string;
  searchMaxWidth: string;
  searchHeight: string;
  searchPaddingLeft: string;
  searchPaddingRight: string;
  searchBorderRadius: string;
  searchFontSize: string;
  searchBtnHeight: string;
  searchBtnPaddingX: string;
  searchBtnRadius: string;
  searchBtnFontSize: string;
  bottomBarPaddingX: string;
  bottomBarPaddingY: string;
  bottomBarBg: string;
  bottomBarBorder: string;
  bottomBarTextSize: string;
  btnHeight: string;
  btnPaddingX: string;
  btnBorderWidth: string;
  btnBorderStyle: string;
  btnBorderRadius: string;
  overlayOpacity: string;
}> = {
  default: {
    sectionMinHeight: '100vh',
    contentPaddingX: '24px',
    contentPaddingTop: '96px',
    contentPaddingBot: '48px',
    contentMaxWidth: '48rem',
    contentGap: '32px',
    titleFontSize: 'clamp(2.8rem, 6vw, 4rem)',
    titleFontWeight: '800',
    titleLineHeight: '1.15',
    descFontSize: '1.125rem',
    searchMaxWidth: '40rem',
    searchHeight: '3.5rem',
    searchPaddingLeft: '3rem',
    searchPaddingRight: '8rem',
    searchBorderRadius: '0.75rem',
    searchFontSize: '0.875rem',
    searchBtnHeight: '2.5rem',
    searchBtnPaddingX: '1.25rem',
    searchBtnRadius: '0.5rem',
    searchBtnFontSize: '0.875rem',
    bottomBarPaddingX: '40px',
    bottomBarPaddingY: '20px',
    bottomBarBg: 'rgba(0,0,0,0.3)',
    bottomBarBorder: '1px solid rgba(255,255,255,0.1)',
    bottomBarTextSize: '0.875rem',
    btnHeight: '2.75rem',
    btnPaddingX: '2rem',
    btnBorderWidth: '2px',
    btnBorderStyle: 'solid',
    btnBorderRadius: '0.5rem',
    overlayOpacity: '0.88',
  },
};

// ── Action variant styles ────────────────────────────────────────────────────
const actionVariantStyles: Record<string, React.CSSProperties> = {
  primary: { fontWeight: 600 },
  outline: { fontWeight: 600, background: 'transparent' },
  ghost: { fontWeight: 400, textDecoration: 'underline', background: 'transparent', border: 'none' },
};

// ── Animation helper ─────────────────────────────────────────────────────────
const getAnim = (variants: Variants, delay: number, animated: boolean) => {
  if (!animated) return {};
  return {
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: { once: true },
    variants,
    transition: { delay },
  };
};

// ── Hero_04 — stacked with search bar + bottom CTA bar ───────────────────────
const Hero_04: React.FC<Hero_04Props> = ({
  hero_heading,
  hero_subheading,
  hero_media,
  hero_animated,
  hero_primary_action,
  hero_secondary_action,
  hero_trust_text,
  hero_search_placeholder,
  colors,
}) => {
  const cfg = variantConfig['default'];

  if (!cfg) {
    console.error('[Hero_04] variantConfig["default"] is missing.');
    return (
      <section style={{ padding: colors.padding, backgroundColor: colors.background }}>
        <p style={{ color: 'red' }}>[Hero_04] Missing variant config.</p>
      </section>
    );
  }

  const animated = hero_animated ?? false;
  const Wrap = animated ? motion.div : 'div';

  const [query, setQuery] = useState('');

  // ── Token layer ────────────────────────────────────────────────────────────
  const sectionStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight: cfg.sectionMinHeight,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingLeft: cfg.contentPaddingX,
    paddingRight: cfg.contentPaddingX,
    paddingTop: cfg.contentPaddingTop,
    paddingBottom: cfg.contentPaddingBot,
  };

  const innerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: cfg.contentMaxWidth,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: cfg.contentGap,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: cfg.titleFontSize,
    fontWeight: cfg.titleFontWeight,
    lineHeight: cfg.titleLineHeight,
    color: colors.text_color,
    margin: 0,
    wordBreak: 'break-word',
  };

  const descStyle: React.CSSProperties = {
    fontSize: cfg.descFontSize,
    color: colors.text_color,
    opacity: 0.8,
    margin: 0,
  };

  // ── Action renderer ────────────────────────────────────────────────────────
  const renderAction = (action: HeroAction) => {
    const vs = action.variant ? (actionVariantStyles[action.variant] ?? {}) : {};
    const isPrimary = action.variant === 'primary' || !action.variant;
    const isOutline = action.variant === 'outline';

    const btnStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: cfg.btnHeight,
      paddingLeft: cfg.btnPaddingX,
      paddingRight: cfg.btnPaddingX,
      borderRadius: colors.btn_radius ?? cfg.btnBorderRadius,
      borderWidth: cfg.btnBorderWidth,
      borderStyle: cfg.btnBorderStyle,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      transition: 'background-color 200ms, color 200ms, border-color 200ms',
      backgroundColor: isPrimary ? colors.btn_primary_bg
        : isOutline ? (colors.btn_outline_bg ?? 'transparent')
          : 'transparent',
      color: isPrimary ? colors.btn_primary_color
        : isOutline ? colors.btn_outline_color
          : colors.text_color,
      borderColor: isPrimary ? (colors.btn_primary_border ?? colors.btn_primary_bg)
        : isOutline ? (colors.btn_outline_border ?? colors.btn_outline_color)
          : 'transparent',
      ...vs,
    };

    return (
      <a
        key={action.target}
        href={action.target}
        aria-label={action.aria_label ?? action.label}
        style={btnStyle}
      >
        {action.label}
      </a>
    );
  };

  return (
    <section
      data-testid="hero-section"
      role="banner"
      aria-label="Main hero content"
      style={sectionStyle}
    >
      {/* Full-bleed background */}
      {hero_media && (
        <div
          aria-hidden="true"
          data-testid="hero-image-container"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${hero_media})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* Overlay — only when no background image */}
      {!hero_media && colors.background && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: colors.background,
            opacity: cfg.overlayOpacity,
          }}
        />
      )}

      {/* Main content */}
      <div style={contentStyle}>
        <div style={innerStyle}>

          {hero_heading && (
            <Wrap {...getAnim(fadeInUp, 0, animated)} data-testid="hero-title">
              <h1 style={titleStyle}>{hero_heading}</h1>
            </Wrap>
          )}

          {hero_subheading && (
            <Wrap {...getAnim(fadeInUp, 0.1, animated)} data-testid="hero-description">
              <p style={descStyle}>{hero_subheading}</p>
            </Wrap>
          )}

          {/* Search bar */}
          <Wrap
            {...getAnim(fadeInUp, 0.2, animated)}
            data-testid="hero-search"
            style={{ width: '100%', maxWidth: cfg.searchMaxWidth }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div
                aria-hidden="true"
                style={{ position: 'absolute', left: '16px', pointerEvents: 'none' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="7.5" cy="7.5" r="5.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                  <path d="M11.5 11.5L15.5 15.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={hero_search_placeholder ?? undefined}
                aria-label="Search"
                style={{
                  width: '100%',
                  height: cfg.searchHeight,
                  paddingLeft: cfg.searchPaddingLeft,
                  paddingRight: cfg.searchPaddingRight,
                  borderRadius: cfg.searchBorderRadius,
                  fontSize: cfg.searchFontSize,
                  color: colors.text_color,
                  background: 'rgba(255,255,255,0.12)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => console.log('Search:', query)}
                aria-label="Submit search"
                style={{
                  position: 'absolute',
                  right: '8px',
                  height: cfg.searchBtnHeight,
                  paddingLeft: cfg.searchBtnPaddingX,
                  paddingRight: cfg.searchBtnPaddingX,
                  borderRadius: cfg.searchBtnRadius,
                  fontSize: cfg.searchBtnFontSize,
                  fontWeight: 600,
                  color: colors.text_color,
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 200ms',
                }}
              >
                Search
              </button>
            </div>
          </Wrap>

        </div>
      </div>

      {/* Bottom CTA bar */}
      {hero_primary_action && (
        <Wrap
          {...getAnim(fadeIn, 0.3, animated)}
          data-testid="hero-buttons"
          style={{ position: 'relative', zIndex: 10, width: '100%' }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: cfg.bottomBarPaddingX,
              paddingRight: cfg.bottomBarPaddingX,
              paddingTop: cfg.bottomBarPaddingY,
              paddingBottom: cfg.bottomBarPaddingY,
              gap: '16px',
              background: cfg.bottomBarBg,
              borderTop: cfg.bottomBarBorder,
            }}
          >
            {hero_trust_text && (
              <p style={{ fontSize: cfg.bottomBarTextSize, color: colors.text_color, opacity: 0.7, margin: 0 }}>
                {hero_trust_text}
              </p>
            )}
            {renderAction(hero_primary_action)}
            {hero_secondary_action && renderAction(hero_secondary_action)}
          </div>
        </Wrap>
      )}
    </section>
  );
};

Hero_04.displayName = 'Hero_04';
export default Hero_04;