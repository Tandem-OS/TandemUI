import React, { useMemo, useId } from 'react';
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
export interface Hero_03Slots {
    hero_heading: string;
    hero_primary_action: string;
    hero_subheading?: string;
    hero_secondary_action?: string;
    hero_media?: string;
}

export interface Hero_03Props {
    title?: string;
    description?: string;
    primaryCTA?:   { text?: string; href?: string; size?: CTASize; variant?: CTAVariant; icon?: React.ReactNode };
    secondaryCTA?: { text?: string; href?: string; size?: CTASize; variant?: CTAVariant; icon?: React.ReactNode };
    backgroundImage?: string;
    overlayColor?: string;
    animated?: boolean;
    className?: string;
    colors?: ColorOverrides;
    slots?: Hero_03Slots;
}

// ── Slot mapper ──────────────────────────────────────────────
export function slotsToProps(slots: Hero_03Slots): Omit<Hero_03Props, 'slots'> {
    return {
        title:           slots.hero_heading,
        description:     slots.hero_subheading    ?? undefined,
        backgroundImage: slots.hero_media          ?? undefined,
        primaryCTA: {
            text:    slots.hero_primary_action,
            href:    '/demo',
            size:    'lg' as CTASize,
            variant: 'outline' as CTAVariant,
        },
        secondaryCTA: slots.hero_secondary_action
            ? {
                text:    slots.hero_secondary_action,
                href:    '/work',
                size:    'lg' as CTASize,
                variant: 'outline' as CTAVariant,
              }
            : undefined,
        animated:  true,
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
                [`--btn-${p}-bg`]:           gc(u.background),
                [`--btn-${p}-text`]:         gc(u.text),
                [`--btn-${p}-border`]:       gc(u.border),
                [`--btn-${p}-hover-bg`]:     gc(u.hover?.background),
                [`--btn-${p}-hover-text`]:   gc(u.hover?.text),
                [`--btn-${p}-hover-border`]: gc(u.hover?.border),
            };
        };

        return {
            '--hero-title': gc(userColors.title),
            '--hero-desc':  gc(userColors.description),
            ...gbv(userColors.primaryButton,   'primary'),
            ...gbv(userColors.secondaryButton, 'secondary'),
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

// ── CTAButton ────────────────────────────────────────────────
const CTAButton: React.FC<{
    text: string; href: string; size?: CTASize;
    icon?: React.ReactNode; animated?: boolean;
    ariaLabel?: string; buttonType: 'primary' | 'secondary';
}> = ({ text, href, size = 'lg', icon, ariaLabel, buttonType }) => {
    const sizeClasses = { sm: 'h-9 px-4 text-sm', md: 'h-11 px-5 text-base', lg: 'h-13 px-6 text-base font-semibold' };
    const base = `inline-flex items-center justify-center font-semibold rounded-md border-2 border-solid
                  transition-colors duration-200 leading-none no-underline cursor-pointer ${sizeClasses[size]}`;
    const style: React.CSSProperties = {
        backgroundColor: `var(--btn-${buttonType}-bg)`,
        color:           `var(--btn-${buttonType}-text)`,
        borderColor:     `var(--btn-${buttonType}-border)`,
    };
    const content = <>{text}{icon && <span className="ml-2">{icon}</span>}</>;
    const isLink  = href.startsWith('http') || href.startsWith('/') || href.startsWith('#');
    return isLink
        ? <HLink href={href} className={base} style={style} aria-label={ariaLabel || text} $t={buttonType}>{content}</HLink>
        : <HBtn  type="button" className={base} style={style} onClick={() => { window.location.href = href; }} aria-label={ariaLabel || text} $t={buttonType}>{content}</HBtn>;
};

// ── Hero_03 — Full-bleed, left-anchored overlay ──────────────
const Hero_03: React.FC<Hero_03Props> = (rawProps = {}) => {
    const { slots, ...direct } = rawProps;
    const { theme } = useTheme();
    const uid = useId();

    const resolved = slots ? { ...slotsToProps(slots), ...direct } : direct;

    const title           = resolved.title;
    const description     = resolved.description;
    const backgroundImage = resolved.backgroundImage;
    const overlayColor    = resolved.overlayColor;
    const animated        = resolved.animated ?? true;
    const className       = resolved.className ?? '';
    const primaryCTA      = resolved.primaryCTA;
    const secondaryCTA    = resolved.secondaryCTA;

    const styles = useStyles(resolved.colors, theme);
    const Wrap   = animated ? motion.div : 'div';

    return (
        <section
            id={uid}
            data-testid="hero-section"
            role="banner"
            aria-label="Main hero content"
            className={`relative w-full min-h-screen flex items-end lg:items-center overflow-hidden ${className}`}
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
                    style={{ backgroundColor: overlayColor, opacity: 0.82 }}
                    aria-hidden="true"
                />
            )}

            {/* Left-anchored content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-20 py-24 lg:py-32">
                <div className="max-w-2xl flex flex-col items-start text-left">

                    {title && (
                        <Wrap {...getAnim(fadeInUp, 0, animated)} data-testid="hero-title">
                            <h1
                                className="text-4xl md:text-5xl font-bold leading-tight break-words mb-6"
                                style={{ color: 'var(--hero-title)', fontWeight: 700 }}
                            >
                                {title}
                            </h1>
                        </Wrap>
                    )}

                    {description && (
                        <Wrap {...getAnim(fadeInUp, 0.1, animated)} data-testid="hero-description">
                            <p
                                className="text-base md:text-lg leading-relaxed mb-10"
                                style={{ color: 'var(--hero-desc)' }}
                            >
                                {description}
                            </p>
                        </Wrap>
                    )}

                    {primaryCTA?.text && (
                        <Wrap
                            className="flex flex-col sm:flex-row gap-4"
                            {...getAnim(fadeInUp, 0.2, animated)}
                            data-testid="hero-buttons"
                            role="group"
                            aria-label="Call to action buttons"
                        >
                            <CTAButton
                                text={primaryCTA.text}
                                href={primaryCTA.href || '#'}
                                size={primaryCTA.size}
                                icon={primaryCTA.icon}
                                animated={animated}
                                ariaLabel={`Primary action: ${primaryCTA.text}`}
                                buttonType="primary"
                            />
                            {secondaryCTA?.text && (
                                <CTAButton
                                    text={secondaryCTA.text}
                                    href={secondaryCTA.href || '#'}
                                    size={secondaryCTA.size}
                                    icon={secondaryCTA.icon}
                                    animated={animated}
                                    ariaLabel={`Secondary action: ${secondaryCTA.text}`}
                                    buttonType="secondary"
                                />
                            )}
                        </Wrap>
                    )}
                </div>
            </div>
        </section>
    );
};

Hero_03.displayName = 'Hero_03';
export default Hero_03;