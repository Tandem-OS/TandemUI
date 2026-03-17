import React, { useMemo, useId, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import {
    type ColorOverrides,
    type ColorValue,
    type ButtonColorOverride,
    type CTASize,
    type CTAVariant,
} from '../Hero_01/Hero_01.types';

// ── Slot contract ────────────────────────────────────────────
export interface Hero_04Slots {
    hero_heading: string;
    hero_primary_action: string;
    hero_subheading?: string;
    hero_media?: string;
}

export interface Hero_04Props {
    title?: string;
    description?: string;
    primaryCTA?: { text?: string; href?: string; size?: CTASize; variant?: CTAVariant };
    backgroundImage?: string;
    overlayColor?: string;
    searchPlaceholder?: string;
    animated?: boolean;
    className?: string;
    colors?: ColorOverrides;
    slots?: Hero_04Slots;
}

// ── Slot mapper ──────────────────────────────────────────────
export function slotsToProps(slots: Hero_04Slots): Omit<Hero_04Props, 'slots'> {
    return {
        title: slots.hero_heading,
        description: slots.hero_subheading ?? undefined,
        backgroundImage: slots.hero_media ?? undefined,
        primaryCTA: {
            text: slots.hero_primary_action,
            href: '/explore',
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
            '--hero-desc': gc(userColors.description),
            ...gbv(userColors.primaryButton, 'primary'),
        };
    }, [userColors, theme]);
};

// ── Styled helpers ───────────────────────────────────────────
const HLink = styled.a<{ $t: 'primary' | 'secondary' }>`
    &:hover {
        background-color: var(--btn-${p => p.$t}-hover-bg)     !important;
        color:            var(--btn-${p => p.$t}-hover-text)   !important;
        border-color:     var(--btn-${p => p.$t}-hover-border) !important;
    }
`;

const SearchInput = styled.input`
    &::placeholder { color: rgba(255,255,255,0.5); }
    &:focus { outline: none; border-color: rgba(255,255,255,0.8) !important; }
`;

const getAnim = (variant: Variants, delay = 0, animated = true) => {
    if (!animated) return {};
    return { initial: 'hidden', whileInView: 'show', viewport: { once: true }, variants: variant, transition: { delay } };
};

// ── Search Bar ───────────────────────────────────────────────
const SearchBar: React.FC<{ placeholder?: string; animated: boolean }> = ({ placeholder, animated }) => {
    const [query, setQuery] = useState('');
    const Wrap = animated ? motion.div : 'div';

    return (
        <Wrap {...getAnim(fadeInUp, 0.2, animated)} className="w-full max-w-2xl mx-auto" data-testid="hero-search">
            <div className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="7.5" cy="7.5" r="5.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                        <path d="M11.5 11.5L15.5 15.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <SearchInput
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={placeholder}
                    aria-label="Search"
                    className="w-full h-14 pl-12 pr-32 rounded-xl text-white text-sm"
                    style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1.5px solid rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                    }}
                />
                <button
                    type="button"
                    onClick={() => console.log('Search:', query)}
                    className="absolute right-2 h-10 px-5 rounded-lg text-sm font-semibold text-white transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                    aria-label="Submit search"
                >
                    Search
                </button>
            </div>
        </Wrap>
    );
};

// ── Hero_04 — Stacked institutional with search + bottom CTA ─
const Hero_04: React.FC<Hero_04Props> = (rawProps = {}) => {
    const { slots, ...direct } = rawProps;
    const { theme } = useTheme();
    const uid = useId();

    const resolved = slots ? { ...slotsToProps(slots), ...direct } : direct;

    const title = resolved.title;
    const description = resolved.description;
    const backgroundImage = resolved.backgroundImage;
    const overlayColor = resolved.overlayColor;
    const searchPlaceholder = resolved.searchPlaceholder;
    const animated = resolved.animated ?? true;
    const className = resolved.className ?? '';
    const primaryCTA = resolved.primaryCTA;

    const styles = useStyles(resolved.colors, theme);
    const Wrap = animated ? motion.div : 'div';

    return (
        <section
            id={uid}
            data-testid="hero-section"
            role="banner"
            aria-label="Main hero content"
            className={`relative w-full min-h-screen flex flex-col overflow-hidden ${className}`}
            style={styles as React.CSSProperties}
        >
            {/* Full-bleed background */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                    aria-hidden="true"
                    data-testid="hero-image-container"
                />
            )}

            {/* Overlay */}
            {overlayColor && (
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: overlayColor, opacity: 0.88 }}
                    aria-hidden="true"
                />
            )}

            {/* Main content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
                <div className="w-full max-w-3xl flex flex-col items-center gap-8">

                    {title && (
                        <Wrap {...getAnim(fadeInUp, 0, animated)} data-testid="hero-title">
                            <h1
                                className="font-extrabold leading-tight break-words"
                                style={{ color: 'var(--hero-title)', fontSize: 'clamp(2.8rem, 6vw, 4rem)', fontWeight: 800 }}
                            >
                                {title}
                            </h1>
                        </Wrap>
                    )}

                    {description && (
                        <Wrap {...getAnim(fadeInUp, 0.1, animated)} data-testid="hero-description">
                            <p
                                className="text-base md:text-lg leading-relaxed max-w-xl"
                                style={{ color: 'var(--hero-desc)' }}
                            >
                                {description}
                            </p>
                        </Wrap>
                    )}

                    <SearchBar placeholder={searchPlaceholder} animated={animated} />
                </div>
            </div>

            {/* Bottom CTA bar — only rendered if primaryCTA exists */}
            {primaryCTA?.text && (
                <Wrap
                    className="relative z-10 w-full"
                    {...getAnim(fadeIn, 0.3, animated)}
                    data-testid="hero-buttons"
                >
                    <div
                        className="w-full flex items-center justify-between px-10 lg:px-20 py-5 gap-4"
                        style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        <p className="text-sm text-white text-opacity-70 hidden md:block">
                            Trusted by teams building modern digital experiences
                        </p>
                        <HLink
                            href={primaryCTA.href || '#'}
                            aria-label={`Primary action: ${primaryCTA.text}`}
                            $t="primary"
                            className="inline-flex items-center justify-center h-11 px-8 rounded-lg font-semibold text-sm border-2 border-solid transition-colors duration-200 whitespace-nowrap"
                            style={{
                                backgroundColor: 'var(--btn-primary-bg)',
                                color: 'var(--btn-primary-text)',
                                borderColor: 'var(--btn-primary-border)',
                            }}
                        >
                            {primaryCTA.text}
                        </HLink>
                    </div>
                </Wrap>
            )}
        </section>
    );
};

Hero_04.displayName = 'Hero_04';
export default Hero_04;