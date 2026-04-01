import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../../lib/animations/variants';
import type { HeroColors, HeroAction } from '@/pages/Renderer/CompositionType';

// ── Props ────────────────────────────────────────────────────────────────────
interface HeroSplitProps {
  hero_heading?: string | null;
  hero_subheading?: string | null;
  hero_media?: string | null;
  hero_animated?: boolean | null;
  hero_primary_action?: HeroAction | null;
  hero_secondary_action?: HeroAction | null;
  colors: HeroColors;
}

// ── Variant config ───────────────────────────────────────────────────────────
const variantConfig: Record<string, {
  sectionMinHeight: string;
  contentPaddingX: string;
  contentPaddingY: string;
  contentMaxWidth: string;
  titleFontSize: string;
  titleFontWeight: string;
  titleLineHeight: string;
  titleMarginBottom: string;
  descFontSize: string;
  descMarginBottom: string;
  actionsGap: string;
  actionsDirection: string;
  btnHeight: string;
  btnPaddingX: string;
  btnBorderWidth: string;
  btnBorderStyle: string;
  btnBorderRadius: string;
  overlayOpacity: string;
}> = {
  default: {
    sectionMinHeight: '100vh',
    contentPaddingX: '32px',
    contentPaddingY: '96px',
    contentMaxWidth: '40rem',
    titleFontSize: 'clamp(2rem, 5vw, 3rem)',
    titleFontWeight: '700',
    titleLineHeight: '1.2',
    titleMarginBottom: '24px',
    descFontSize: '1.125rem',
    descMarginBottom: '40px',
    actionsGap: '16px',
    actionsDirection: 'row',
    btnHeight: '3.25rem',
    btnPaddingX: '1.5rem',
    btnBorderWidth: '2px',
    btnBorderStyle: 'solid',
    btnBorderRadius: '0.375rem',
    overlayOpacity: '0.82',
  },
};

// ── Action variant styles ────────────────────────────────────────────────────
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

// ── HeroSplit — full-bleed, left-anchored overlay ──────────────────────────────
const HeroSplit: React.FC<HeroSplitProps> = ({
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
    console.error('[HeroSplit] variantConfig["default"] is missing.');
    return (
      <section style={{ padding: colors.padding, backgroundColor: colors.background }}>
        <p style={{ color: 'red' }}>[HeroSplit] Missing variant config.</p>
      </section>
    );
  }

  const animated = hero_animated ?? false;
  const Wrap = animated ? motion.div : 'div';

  // ── Token layer ────────────────────────────────────────────────────────────
  const sectionStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight: cfg.sectionMinHeight,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const contentWrapStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    paddingLeft: cfg.contentPaddingX,
    paddingRight: cfg.contentPaddingX,
    paddingTop: cfg.contentPaddingY,
    paddingBottom: cfg.contentPaddingY,
  };

  const innerStyle: React.CSSProperties = {
    maxWidth: cfg.contentMaxWidth,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: cfg.titleFontSize,
    fontWeight: cfg.titleFontWeight,
    lineHeight: cfg.titleLineHeight,
    color: colors.heading_color,
    marginBottom: cfg.titleMarginBottom,
    marginTop: 0,
    wordBreak: 'break-word',
  };

  const descStyle: React.CSSProperties = {
    fontSize: cfg.descFontSize,
    color: colors.subheading_color,
    opacity: 0.8,
    marginBottom: cfg.descMarginBottom,
    marginTop: 0,
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: cfg.actionsDirection as React.CSSProperties['flexDirection'],
    flexWrap: 'wrap',
    gap: cfg.actionsGap,
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

      {/* Content */}
      <div style={contentWrapStyle}>
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

HeroSplit.displayName = 'HeroSplit';
export default HeroSplit;