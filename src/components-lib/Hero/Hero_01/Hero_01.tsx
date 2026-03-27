import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../../lib/animations/variants';
import type { HeroColors, HeroAction } from '@/pages/Renderer/CompositionType';

// ── Props ────────────────────────────────────────────────────────────────────
interface Hero_01Props {
  hero_heading?: string | null;
  hero_subheading?: string | null;
  hero_media?: string | null;
  hero_animated?: boolean | null;
  hero_primary_action?: HeroAction | null;
  hero_secondary_action?: HeroAction | null;
  colors: HeroColors;
}

// ── Variant config — structural defaults per layout variant ──────────────────
const variantConfig: Record<string, {
  sectionMinHeight: string;
  contentPaddingTop: string;
  contentPaddingBot: string;
  contentPaddingX: string;
  contentMaxWidth: string;
  contentGap: string;
  titleFontSize: string;
  titleFontWeight: string;
  titleLineHeight: string;
  descFontSize: string;
  actionsGap: string;
  btnHeight: string;
  btnPaddingX: string;
  btnBorderWidth: string;
  btnBorderStyle: string;
  btnBorderRadius: string;
  overlayOpacity: string;
}> = {
  default: {
    sectionMinHeight: '100vh',
    contentPaddingTop: '120px',
    contentPaddingBot: '80px',
    contentPaddingX: '24px',
    contentMaxWidth: '48rem',
    contentGap: '32px',
    titleFontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
    titleFontWeight: '800',
    titleLineHeight: '1.1',
    descFontSize: '1.125rem',
    actionsGap: '16px',
    btnHeight: '3.5rem',
    btnPaddingX: '2.5rem',
    btnBorderWidth: '2px',
    btnBorderStyle: 'solid',
    btnBorderRadius: '0.5rem',
    overlayOpacity: '0.85',
  },
  compact: {
    sectionMinHeight: '70vh',
    contentPaddingTop: '80px',
    contentPaddingBot: '48px',
    contentPaddingX: '24px',
    contentMaxWidth: '40rem',
    contentGap: '24px',
    titleFontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    titleFontWeight: '700',
    titleLineHeight: '1.15',
    descFontSize: '1rem',
    actionsGap: '12px',
    btnHeight: '2.75rem',
    btnPaddingX: '1.75rem',
    btnBorderWidth: '2px',
    btnBorderStyle: 'solid',
    btnBorderRadius: '0.5rem',
    overlayOpacity: '0.85',
  },
};

// ── Action variant styles — driven by HeroAction.variant ────────────────────
const actionVariantStyles: Record<string, React.CSSProperties> = {
  primary: { fontWeight: 600 },
  outline: { fontWeight: 600, background: 'transparent' },
  ghost: { fontWeight: 400, textDecoration: 'underline', background: 'transparent', border: 'none' },
};

// ── Animation helper ─────────────────────────────────────────────────────────
const getAnim = (delay: number, animated: boolean) => {
  if (!animated) return {};
  return {
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: { once: true },
    variants: fadeInUp,
    transition: { delay },
  };
};

// ── Hero_01 ──────────────────────────────────────────────────────────────────
const Hero_01: React.FC<Hero_01Props> = ({
  hero_heading,
  hero_subheading,
  hero_media,
  hero_animated,
  hero_primary_action,
  hero_secondary_action,
  colors,
}) => {
  const cfg = variantConfig['default'];

  if (!cfg) {
    console.error('[Hero_01] variantConfig["default"] is missing.');
    return (
      <section style={{ padding: colors.padding, backgroundColor: colors.background }}>
        <p style={{ color: 'red' }}>[Hero_01] Missing variant config.</p>
      </section>
    );
  }

  const animated = hero_animated ?? false;
  const Wrap = animated ? motion.div : 'div';

  // ── Token layer — all visual values from colors + cfg ──────────────────────
  const sectionStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight: cfg.sectionMinHeight,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: colors.background,
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
    paddingTop: cfg.contentPaddingTop,
    paddingBottom: cfg.contentPaddingBot,
    paddingLeft: cfg.contentPaddingX,
    paddingRight: cfg.contentPaddingX,
  };

  const innerStyle: React.CSSProperties = {
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
    color: colors.heading_color,
    margin: 0,
    wordBreak: 'break-word',
  };

  const descStyle: React.CSSProperties = {
    fontSize: cfg.descFontSize,
    color: colors.subheading_color,
    opacity: 0.8,
    margin: 0,
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: cfg.actionsGap,
    justifyContent: 'center',
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
      transition: 'background-color 200ms, color 200ms, border-color 200ms',
      backgroundColor: isPrimary ? colors.btn_primary_bg
        : isOutline ? (colors.btn_outline_bg ?? 'transparent')
          : 'transparent',
      color: isPrimary ? colors.btn_primary_color
        : isOutline ? colors.btn_outline_color
          : colors.heading_color,
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
      {/* Full-bleed background image */}
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
      {/* Content */}
      <div style={contentStyle}>
        <div style={innerStyle}>

          {hero_heading && (
            <Wrap {...getAnim(0, animated)} data-testid="hero-title">
              <h1 style={titleStyle}>{hero_heading}</h1>
            </Wrap>
          )}

          {hero_subheading && (
            <Wrap {...getAnim(0.1, animated)} data-testid="hero-description">
              <p style={descStyle}>{hero_subheading}</p>
            </Wrap>
          )}

          {(hero_primary_action || hero_secondary_action) && (
            <Wrap
              {...getAnim(0.2, animated)}
              data-testid="hero-buttons"
              role="group"
              aria-label="Call to action"
            >
              <div style={actionsStyle}>
                {hero_primary_action && renderAction(hero_primary_action)}
                {hero_secondary_action && renderAction(hero_secondary_action)}
              </div>
            </Wrap>
          )}

        </div>
      </div>
    </section>
  );
};

Hero_01.displayName = 'Hero_01';
export default Hero_01;