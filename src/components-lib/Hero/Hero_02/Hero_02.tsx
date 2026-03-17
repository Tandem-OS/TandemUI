import React, { useMemo, useId, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp } from '../../../lib/animations/variants';
import {
    type ColorOverrides,
    type ColorValue,
    type ButtonColorOverride,
    type CTASize,
    type CTAVariant,
} from '../Hero_01/Hero_01.types';

// ── Slot contract ────────────────────────────────────────────
export interface Hero_02Slots {
    hero_heading: string;
    hero_primary_action: string;
    hero_media?: string;
    hero_media_slides?: string[];
}

export interface Hero_02Props {
    title?: string;
    primaryCTA?: { text?: string; href?: string; size?: CTASize; variant?: CTAVariant; icon?: React.ReactNode };
    backgroundImage?: string;
    backgroundSlides?: string[];
    overlayColor?: string;
    animated?: boolean;
    className?: string;
    colors?: ColorOverrides;
    slots?: Hero_02Slots;
}

// ── Slot mapper ──────────────────────────────────────────────
export function slotsToProps(slots: Hero_02Slots): Omit<Hero_02Props, 'slots'> {
    return {
        title: slots.hero_heading,
        backgroundImage: slots.hero_media ?? undefined,
        backgroundSlides: slots.hero_media_slides ?? undefined,
        primaryCTA: {
            text: slots.hero_primary_action,
            href: '/order',
            size: 'lg' as CTASize,
            variant: 'solid' as CTAVariant,
        },
        animated: true,
        className: '',
    };
}

// ── Color styles hook ────────────────────────────────────────
const useStyles = (userColors: ColorOverrides | undefined, theme: 'light' | 'dark') => {
    return useMemo(() => {
        if (!userColors) return {};

        const gc = (u: ColorValue | undefined) =>
            u ? (theme === 'dark' ? u.dark : u.light) : undefined;

        const gbv = (u: ButtonColorOverride | undefined, p: string) => {
            if (!u) return {};
            return {
                [`--btn-${p}-bg`]: gc(u.background),
                [`--btn-${p}-text`]: gc(u.text),
                [`--btn-${p}-border`]: gc(u.border),
                [`--btn-${p}-hover-bg`]: gc(u.hover?.background),
                [`--btn-${p}-hover-text`]: gc(u.hover?.text),
                [`--btn-${p}-hover-border`]: gc(u.hover?.border),
            };
        };

        return {
            '--hero-title': gc(userColors.title),
            ...gbv(userColors.primaryButton, 'primary'),
        };
    }, [userColors, theme]);
};

// ── Styled helpers ───────────────────────────────────────────
const HBtn = styled.button<{ $t: 'primary' | 'secondary' }>`
    &:hover:not(:disabled) {
        background-color: var(--btn-${p => p.$t}-hover-bg)     !important;
        color:            var(--btn-${p => p.$t}-hover-text)   !important;
        border-color:     var(--btn-${p => p.$t}-hover-border) !important;
    }
`;
const HLink = styled.a<{ $t: 'primary' | 'secondary' }>`
    &:hover {
        background-color: var(--btn-${p => p.$t}-hover-bg)     !important;
        color:            var(--btn-${p => p.$t}-hover-text)   !important;
        border-color:     var(--btn-${p => p.$t}-hover-border) !important;
    }
`;

const getAnim = (variant: Variants, delay = 0, animated = true) => {
    if (!animated) return {};
    return { initial: 'hidden', whileInView: 'show', viewport: { once: true }, variants: variant, transition: { delay } };
};

// ── CTA Button ───────────────────────────────────────────────
const CTAButton: React.FC<{
    text: string; href: string; size?: CTASize;
    icon?: React.ReactNode; ariaLabel?: string;
    buttonType: 'primary' | 'secondary';
}> = ({ text, href, size = 'lg', icon, ariaLabel, buttonType }) => {
    const sz = { sm: 'h-9 px-4 text-sm', md: 'h-11 px-5 text-base', lg: 'h-14 px-8 text-base' };
    const base = `inline-flex items-center justify-center font-semibold rounded-md border-2 border-solid
                  transition-colors duration-200 leading-none no-underline cursor-pointer ${sz[size]}`;
    const style: React.CSSProperties = {
        backgroundColor: `var(--btn-${buttonType}-bg)`,
        color: `var(--btn-${buttonType}-text)`,
        borderColor: `var(--btn-${buttonType}-border)`,
    };
    const content = <>{text}{icon && <span className="ml-2">{icon}</span>}</>;
    const isLink = href.startsWith('http') || href.startsWith('/') || href.startsWith('#');
    return isLink
        ? <HLink href={href} className={base} style={style} aria-label={ariaLabel || text} $t={buttonType}>{content}</HLink>
        : <HBtn type="button" className={base} style={style} onClick={() => { window.location.href = href; }} aria-label={ariaLabel || text} $t={buttonType}>{content}</HBtn>;
};

// ── Carousel arrow ───────────────────────────────────────────
const ArrowBtn = styled.button`
    &:hover { background: rgba(255,255,255,0.2); }
`;

// ── Hero_02 ──────────────────────────────────────────────────
const Hero_02: React.FC<Hero_02Props> = (rawProps = {}) => {
    const { slots, ...direct } = rawProps;
    const { theme } = useTheme();
    const uid = useId();

    const resolved = slots ? { ...slotsToProps(slots), ...direct } : direct;

    const title = resolved.title;
    const overlayColor = resolved.overlayColor;
    const animated = resolved.animated ?? true;
    const className = resolved.className ?? '';

    const slides = resolved.backgroundSlides?.length
        ? resolved.backgroundSlides
        : resolved.backgroundImage
            ? [resolved.backgroundImage]
            : [];

    const [activeSlide, setActiveSlide] = useState(0);
    const prev = () => setActiveSlide(i => (i - 1 + slides.length) % slides.length);
    const next = () => setActiveSlide(i => (i + 1) % slides.length);

    const primaryCTA = resolved.primaryCTA;

    const styles = useStyles(resolved.colors, theme);
    const Wrap = animated ? motion.div : 'div';

    return (
        <section
            id={uid}
            data-testid="hero-section"
            role="banner"
            aria-label="Main hero content"
            className={`relative w-full min-h-screen flex items-end overflow-hidden ${className}`}
            style={styles as React.CSSProperties}
        >
            {/* Background slides */}
            {slides.map((src, i) => (
                <div
                    key={src}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
                    style={{ backgroundImage: `url(${src})`, opacity: i === activeSlide ? 1 : 0 }}
                    aria-hidden="true"
                    data-testid={i === 0 ? 'hero-image-container' : undefined}
                />
            ))}

            {/* Gradient overlay */}
            {overlayColor && (
                <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${overlayColor}ee 0%, ${overlayColor}99 40%, ${overlayColor}33 100%)` }}
                    aria-hidden="true"
                />
            )}

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-10 lg:px-20 pb-24 lg:pb-32 pt-40 lg:pt-48">
                <div className="max-w-3xl">

                    {title && (
                        <Wrap {...getAnim(fadeInUp, 0, animated)} data-testid="hero-title">
                            <h1
                                className="font-extrabold leading-none break-words mb-10"
                                style={{ color: 'var(--hero-title)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.05 }}
                            >
                                {title}
                            </h1>
                        </Wrap>
                    )}

                    {primaryCTA?.text && (
                        <Wrap {...getAnim(fadeInUp, 0.15, animated)} data-testid="hero-buttons">
                            <CTAButton
                                text={primaryCTA.text}
                                href={primaryCTA.href || '#'}
                                size={primaryCTA.size}
                                icon={primaryCTA.icon}
                                ariaLabel={`Primary action: ${primaryCTA.text}`}
                                buttonType="primary"
                            />
                        </Wrap>
                    )}
                </div>

                {/* Carousel controls — only shown if more than 1 slide */}
                {slides.length > 1 && (
                    <div className="absolute bottom-10 right-10 lg:bottom-12 lg:right-20 flex items-center gap-4">
                        <div className="flex gap-2" role="tablist" aria-label="Slide indicators">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    role="tab"
                                    aria-selected={i === activeSlide}
                                    aria-label={`Go to slide ${i + 1}`}
                                    onClick={() => setActiveSlide(i)}
                                    className="rounded-full transition-all duration-300 focus:outline-none"
                                    style={{
                                        width: i === activeSlide ? '24px' : '8px',
                                        height: '8px',
                                        backgroundColor: i === activeSlide ? '#ffffff' : 'rgba(255,255,255,0.4)',
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <ArrowBtn onClick={prev} aria-label="Previous slide" className="w-10 h-10 rounded-full border border-white border-opacity-40 flex items-center justify-center transition-colors duration-200 focus:outline-none" style={{ color: '#ffffff' }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </ArrowBtn>
                            <ArrowBtn onClick={next} aria-label="Next slide" className="w-10 h-10 rounded-full border border-white border-opacity-40 flex items-center justify-center transition-colors duration-200 focus:outline-none" style={{ color: '#ffffff' }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </ArrowBtn>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

Hero_02.displayName = 'Hero_02';
export default Hero_02;