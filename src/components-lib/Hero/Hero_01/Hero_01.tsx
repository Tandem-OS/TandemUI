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
import {
    validateHero01Props,
    sanitizeProps,
    formatValidationMessage,
} from '../Hero_01/Hero_01.validators';
import meta from './Hero_01.meta';

// ── Slot contract (mirrors backend HERO_RULES_V1_1) ──────────
export interface Hero_01Slots {
    hero_heading: string;
    hero_primary_action: string;
    hero_subheading?: string;
    hero_secondary_action?: string;
    hero_media?: string;
}

export interface Hero_01Props {
    title?: string;
    description?: string;
    primaryCTA?: { text?: string; href?: string; size?: CTASize; variant?: CTAVariant; icon?: React.ReactNode };
    backgroundImage?: string;
    overlayColor?: string;
    animated?: boolean;
    className?: string;
    colors?: ColorOverrides;
    slots?: Hero_01Slots;
}

// ── Slot mapper ──────────────────────────────────────────────
export function slotsToProps(slots: Hero_01Slots): Omit<Hero_01Props, 'slots'> {
    return {
        title: slots.hero_heading,
        description: slots.hero_subheading ?? undefined,
        backgroundImage: slots.hero_media ?? undefined,
        primaryCTA: {
            text: slots.hero_primary_action,
            href: '/signup',
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

const getAnim = (variant: Variants, delay = 0, animated = true) => {
    if (!animated) return {};
    return { initial: 'hidden', whileInView: 'show', viewport: { once: true }, variants: variant, transition: { delay } };
};

// ── Hero_01 ──────────────────────────────────────────────────
const Hero_01: React.FC<Hero_01Props> = (rawProps = {}) => {
    const { slots, ...direct } = rawProps;
    const { theme } = useTheme();
    const uid = useId();

    const resolved = slots ? { ...slotsToProps(slots), ...direct } : direct;

    const validationProps = {
        title: resolved.title,
        description: resolved.description,
        primaryCTA: resolved.primaryCTA,
        animated: resolved.animated,
        className: resolved.className,
        colors: resolved.colors,
    };
    const validation = validateHero01Props(validationProps);
    const sanitized = sanitizeProps(validationProps);

    if (process.env.NODE_ENV === 'development' && (!validation.valid || validation.warnings)) {
        console.group('Hero_01 Validation');
        console.log(formatValidationMessage(validation));
        console.groupEnd();
    }

    const title = sanitized.title;
    const description = sanitized.description;
    const backgroundImage = resolved.backgroundImage;
    const overlayColor = resolved.overlayColor;
    const animated = resolved.animated ?? true;
    const className = resolved.className ?? '';

    const primaryCTA = sanitized.primaryCTA;

    const styles = useStyles(resolved.colors, theme);
    const Wrap = animated ? motion.div : 'div';

    return (
        <section
            id={uid}
            data-testid="hero-section"
            role="banner"
            aria-label={meta.accessibility.screenReaderHints?.section || "Main hero content"}
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
                    style={{ backgroundColor: overlayColor, opacity: 0.85 }}
                    aria-hidden="true"
                />
            )}

            {/* Content */}
            <div
                className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center"
                style={{ paddingTop: '120px', paddingBottom: '80px' }}
            >
                <div className="max-w-3xl flex flex-col items-center gap-8">

                    {title && (
                        <Wrap {...getAnim(fadeInUp, 0, animated)} data-testid="hero-title">
                            <h1
                                className="font-extrabold leading-tight break-words"
                                style={{
                                    color: 'var(--hero-title)',
                                    fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                }}
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

                    {primaryCTA?.text && (
                        <Wrap
                            {...getAnim(fadeInUp, 0.2, animated)}
                            data-testid="hero-buttons"
                            role="group"
                            aria-label="Call to action"
                        >
                            <HLink
                                href={primaryCTA.href || '#'}
                                aria-label={`Primary action: ${primaryCTA.text}`}
                                $t="primary"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-lg font-bold text-base border-2 border-solid transition-colors duration-200 no-underline"
                                style={{
                                    backgroundColor: 'var(--btn-primary-bg)',
                                    color: 'var(--btn-primary-text)',
                                    borderColor: 'var(--btn-primary-border)',
                                }}
                            >
                                {primaryCTA.text}
                            </HLink>
                        </Wrap>
                    )}
                </div>
            </div>
        </section>
    );
};

Hero_01.displayName = 'Hero_01';
export default Hero_01;