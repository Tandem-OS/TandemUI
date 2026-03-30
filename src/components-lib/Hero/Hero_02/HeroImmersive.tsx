import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../../lib/animations/variants';
import type { HeroColors, HeroAction } from '@/pages/Renderer/CompositionType';

// ── Props ────────────────────────────────────────────────────────────────────
interface HeroImmersiveProps {
  hero_heading?: string | null;
  hero_media?: string | null;
  hero_media_slides?: string[] | null;
  hero_animated?: boolean | null;
  hero_primary_action?: HeroAction | null;
  hero_secondary_action?: HeroAction | null;
  colors: HeroColors;
}

// ── Variant config ───────────────────────────────────────────────────────────
const variantConfig: Record<string, {
  sectionMinHeight: string;
  contentPaddingX: string;
  contentPaddingBot: string;
  contentPaddingTop: string;
  contentMaxWidth: string;
  titleFontSize: string;
  titleFontWeight: string;
  titleLineHeight: string;
  titleMarginBottom: string;
  actionsGap: string;
  btnHeight: string;
  btnPaddingX: string;
  btnBorderWidth: string;
  btnBorderStyle: string;
  btnBorderRadius: string;
  overlayGradient: string;
  dotActiveWidth: string;
  dotInactiveWidth: string;
  dotHeight: string;
  dotActiveColor: string;
  dotInactiveColor: string;
  arrowSize: string;
  arrowBorderColor: string;
  arrowColor: string;
  arrowHoverBg: string;
  controlsBottom: string;
  controlsRight: string;
  slideDuration: string;
}> = {
  default: {
    sectionMinHeight: '100vh',
    contentPaddingX: '40px',
    contentPaddingBot: '96px',
    contentPaddingTop: '160px',
    contentMaxWidth: '48rem',
    titleFontSize: 'clamp(2.5rem, 6vw, 4rem)',
    titleFontWeight: '800',
    titleLineHeight: '1.05',
    titleMarginBottom: '40px',
    actionsGap: '16px',
    btnHeight: '3.5rem',
    btnPaddingX: '2rem',
    btnBorderWidth: '2px',
    btnBorderStyle: 'solid',
    btnBorderRadius: '0.375rem',
    overlayGradient: 'to top',
    dotActiveWidth: '24px',
    dotInactiveWidth: '8px',
    dotHeight: '8px',
    dotActiveColor: '#ffffff',
    dotInactiveColor: 'rgba(255,255,255,0.4)',
    arrowSize: '40px',
    arrowBorderColor: 'rgba(255,255,255,0.4)',
    arrowColor: '#ffffff',
    arrowHoverBg: 'rgba(255,255,255,0.2)',
    controlsBottom: '40px',
    controlsRight: '40px',
    slideDuration: '700ms',
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

// ── HeroImmersive ──────────────────────────────────────────────────────────────────
const HeroImmersive: React.FC<HeroImmersiveProps> = ({
  hero_heading,
  hero_media,
  hero_media_slides,
  hero_animated,
  hero_primary_action,
  hero_secondary_action,
  colors,
}) => {
  const cfg = variantConfig['default'];

  if (!cfg) {
    console.error('[HeroImmersive] variantConfig["default"] is missing.');
    return (
      <section style={{ padding: colors.padding, backgroundColor: colors.background }}>
        <p style={{ color: 'red' }}>[HeroImmersive] Missing variant config.</p>
      </section>
    );
  }

  const animated = hero_animated ?? false;
  const Wrap = animated ? motion.div : 'div';

  const slides = hero_media_slides?.length
    ? hero_media_slides
    : hero_media
      ? [hero_media]
      : [];

  const [activeSlide, setActiveSlide] = useState(0);
  const prev = () => setActiveSlide(i => (i - 1 + slides.length) % slides.length);
  const next = () => setActiveSlide(i => (i + 1) % slides.length);

  // ── Token layer ────────────────────────────────────────────────────────────
  const sectionStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight: cfg.sectionMinHeight,
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
  };

  const contentWrapStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    paddingLeft: cfg.contentPaddingX,
    paddingRight: cfg.contentPaddingX,
    paddingBottom: cfg.contentPaddingBot,
    paddingTop: cfg.contentPaddingTop,
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

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: cfg.actionsGap,
    flexWrap: 'wrap',
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
      {/* Background slides */}
      {slides.map((src, i) => (
        <div
          key={src}
          aria-hidden="true"
          data-testid={i === 0 ? 'hero-image-container' : undefined}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: i === activeSlide ? 1 : 0,
            transition: `opacity ${cfg.slideDuration}`,
          }}
        />
      ))}

      {/* Gradient overlay — only when no slides */}
      {slides.length === 0 && colors.background && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: colors.background,
            opacity: 0.85,
          }}
        />
      )}

      {/* Content */}
      <div style={contentWrapStyle}>
        <div style={{ maxWidth: cfg.contentMaxWidth }}>

          {hero_heading && (
            <Wrap {...getAnim(0, animated)} data-testid="hero-title">
              <h1 style={titleStyle}>{hero_heading}</h1>
            </Wrap>
          )}

          {(hero_primary_action || hero_secondary_action) && (
            <Wrap
              {...getAnim(0.15, animated)}
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

        {/* Carousel controls */}
        {slides.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: cfg.controlsBottom,
              right: cfg.controlsRight,
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Dot indicators */}
            <div role="tablist" aria-label="Slide indicators" style={{ display: 'flex', gap: '8px' }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeSlide}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActiveSlide(i)}
                  style={{
                    width: i === activeSlide ? cfg.dotActiveWidth : cfg.dotInactiveWidth,
                    height: cfg.dotHeight,
                    borderRadius: '9999px',
                    backgroundColor: i === activeSlide ? cfg.dotActiveColor : cfg.dotInactiveColor,
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'width 300ms, background-color 300ms',
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['prev', 'next'] as const).map(dir => (
                <button
                  key={dir}
                  onClick={dir === 'prev' ? prev : next}
                  aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
                  style={{
                    width: cfg.arrowSize,
                    height: cfg.arrowSize,
                    borderRadius: '9999px',
                    border: `1px solid ${cfg.arrowBorderColor}`,
                    backgroundColor: 'transparent',
                    color: cfg.arrowColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 200ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = cfg.arrowHoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    {dir === 'prev'
                      ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      : <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    }
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

HeroImmersive.displayName = 'HeroImmersive';
export default HeroImmersive;