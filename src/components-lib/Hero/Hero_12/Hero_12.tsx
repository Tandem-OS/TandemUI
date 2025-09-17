import React, { useMemo, useId } from 'react';
import { motion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp } from '../../../lib/animations/variants';
import {
    type Hero_12Props,
    type ColorOverrides,
    type ColorValue,
    type ButtonColorOverride
} from './Hero_12.types';
import {
    validateHero12Props,
    sanitizeProps,
    formatValidationMessage
} from './Hero_12.validators';
import meta from './Hero_12.meta';

// Animation helper function
const getAnimationProps = (variant: Variants, delay = 0, amount = 0, animated = true) => {
    if (!animated) return {};
    return {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: amount || undefined },
        variants: variant,
        transition: { delay }
    };
};

// Component styles hook
const useComponentStyles = (
    userColors: ColorOverrides | undefined,
    overlayOpacity: number | undefined,
    theme: 'light' | 'dark'
): Record<string, string> => {
    return useMemo(() => {
        const defaults = meta.defaults.colors;
        const getColor = (userValue: ColorValue | undefined, defaultValue: ColorValue): string => {
            const value = userValue || defaultValue;
            return theme === 'dark' ? value.dark : value.light;
        };

        const getButtonVars = (
            userButton: ButtonColorOverride | undefined,
            defaultButton: ButtonColorOverride,
            prefix: string
        ) => {
            const button = userButton || defaultButton;
            return {
                [`--btn-${prefix}-bg`]: getColor(button.background, defaultButton.background),
                [`--btn-${prefix}-text`]: getColor(button.text, defaultButton.text),
                [`--btn-${prefix}-border`]: getColor(button.border, defaultButton.border),
                [`--btn-${prefix}-hover-bg`]: getColor(button.hover?.background, defaultButton.hover.background),
                [`--btn-${prefix}-hover-text`]: getColor(button.hover?.text, defaultButton.hover.text),
                [`--btn-${prefix}-hover-border`]: getColor(button.hover?.border, defaultButton.hover.border),
            };
        };

        // Handle overlay - prefer colors.overlay over deprecated overlayOpacity
        const overlayColor = userColors?.overlay
            ? getColor(userColors.overlay, defaults.overlay)
            : `rgba(0, 0, 0, ${(overlayOpacity || 50) / 100})`;

        return {
            '--hero-overlay': overlayColor,
            '--hero-title': getColor(userColors?.title, defaults.title),
            '--hero-desc': getColor(userColors?.description, defaults.description),
            ...getButtonVars(userColors?.primaryButton, defaults.primaryButton, 'primary'),
            ...getButtonVars(userColors?.secondaryButton, defaults.secondaryButton, 'secondary'),
        };
    }, [userColors, overlayOpacity, theme]);
};

// Styled components - ONLY for hover states
const HoverButton = styled.button<{ $buttonType: 'primary' | 'secondary' }>`
    &:hover:not(:disabled) {
        background-color: var(--btn-${props => props.$buttonType}-hover-bg) !important;
        color: var(--btn-${props => props.$buttonType}-hover-text) !important;
        border-color: var(--btn-${props => props.$buttonType}-hover-border) !important;
    }
`;

const HoverLink = styled.a<{ $buttonType: 'primary' | 'secondary' }>`
    &:hover:not(:disabled) {
        background-color: var(--btn-${props => props.$buttonType}-hover-bg) !important;
        color: var(--btn-${props => props.$buttonType}-hover-text) !important;
        border-color: var(--btn-${props => props.$buttonType}-hover-border) !important;
    }
`;

// ActionButton component
interface ActionButtonProps {
    text: string;
    href: string;
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
    animated?: boolean;
    ariaLabel?: string;
    buttonType: 'primary' | 'secondary';
}

const ActionButton: React.FC<ActionButtonProps> = ({
    text,
    href,
    size = 'lg',
    icon,
    animated = true,
    ariaLabel,
    buttonType
}) => {
    const buttonClasses = [
        meta.tokens.button.base,
        meta.tokens.button.sizes[size],
        animated ? meta.tokens.effects.button : 'transition-none'
    ].join(' ');

    const buttonStyle: React.CSSProperties = {
        backgroundColor: `var(--btn-${buttonType}-bg)`,
        color: `var(--btn-${buttonType}-text)`,
        borderColor: `var(--btn-${buttonType}-border)`,
        borderWidth: meta.tokens.button.borderWidth,
        borderStyle: meta.tokens.button.borderStyle,
    };

    const buttonContent = (
        <>
            {text}
            {icon && <span className={meta.tokens.button.iconSpacing}>{icon}</span>}
        </>
    );

    if (href.startsWith('http') || href.startsWith('/') || href.startsWith('#')) {
        return (
            <HoverLink
                href={href}
                className={buttonClasses}
                style={buttonStyle}
                aria-label={ariaLabel || text}
                $buttonType={buttonType}
            >
                {buttonContent}
            </HoverLink>
        );
    }

    return (
        <HoverButton
            className={buttonClasses}
            style={buttonStyle}
            onClick={() => window.location.href = href}
            aria-label={ariaLabel || text}
            type='button'
            $buttonType={buttonType}
        >
            {buttonContent}
        </HoverButton>
    );
};

// Main Hero_12 component
const Hero_12: React.FC<Hero_12Props> = (props = {}) => {
    const { theme } = useTheme();
    const uniqueId = useId();

    const validation = validateHero12Props(props);
    const sanitized = sanitizeProps(props);

    if (process.env.NODE_ENV === 'development') {
        if (!validation.valid || validation.warnings) {
            console.group('Hero_12 Validation');
            console.log(formatValidationMessage(validation));
            console.groupEnd();
        }
    }

    const title = sanitized.title || meta.defaults.title;
    const description = sanitized.description || meta.defaults.description;
    const animated = sanitized.animated !== undefined ? sanitized.animated : meta.defaults.animated;
    const className = sanitized.className || meta.defaults.className;
    const overlayOpacity = sanitized.overlayOpacity !== undefined ? sanitized.overlayOpacity : meta.defaults.overlayOpacity;

    const primaryCTA = {
        text: sanitized.primaryCTA?.text || meta.defaults.primaryCTA.text,
        href: sanitized.primaryCTA?.href || meta.defaults.primaryCTA.href,
        size: sanitized.primaryCTA?.size || meta.defaults.primaryCTA.size,
        icon: sanitized.primaryCTA?.icon
    };

    const hasSecondaryCTA = sanitized.secondaryCTA !== undefined || !('secondaryCTA' in sanitized);
    const secondaryCTA = hasSecondaryCTA ? {
        text: sanitized.secondaryCTA?.text || meta.defaults.secondaryCTA.text,
        href: sanitized.secondaryCTA?.href || meta.defaults.secondaryCTA.href,
        size: sanitized.secondaryCTA?.size || meta.defaults.secondaryCTA.size,
        icon: sanitized.secondaryCTA?.icon
    } : undefined;

    const backgroundImage = sanitized.backgroundImage || meta.defaults.backgroundImage;
    const backgroundImageSrc = typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.src;
    const backgroundImageAlt = typeof backgroundImage === 'object' ?
        (backgroundImage.alt || meta.defaults.backgroundImageAlt) : meta.defaults.backgroundImageAlt;

    const styles = useComponentStyles(sanitized.colors, overlayOpacity, theme);
    const MotionWrapper = animated ? motion.div : 'div';

    return (
        <section
            style={styles as React.CSSProperties}
            className={`${meta.tokens.layout.section} ${className}`}
            data-testid="hero-section"
            role="banner"
            aria-label={meta.accessibility.screenReaderHints?.section || "Main hero content with center-bottom positioning layout"}
            id={uniqueId}
        >
            {/* Background Image */}
            <div
                className={meta.tokens.layout.backgroundContainer}
                data-testid="hero-background"
            >
                <img
                    src={backgroundImageSrc}
                    alt={backgroundImageAlt || meta.accessibility.screenReaderHints?.image || "decorative"}
                    className={meta.tokens.image.classes}
                    loading={meta.tokens.image.loading as "lazy" | "eager"}
                    data-testid="hero-image"
                    role="presentation"
                    aria-hidden={!backgroundImageAlt}
                />
                {/* Overlay */}
                <div
                    className={meta.tokens.layout.overlay}
                    style={{ backgroundColor: 'var(--hero-overlay)' }}
                    data-testid="hero-overlay"
                    role="presentation"
                    aria-hidden="true"
                />
            </div>

            {/* Content Container */}
            <div className={`${meta.tokens.layout.contentContainer} ${meta.tokens.spacing.sectionY}`}>
                <div className={meta.tokens.layout.grid}>
                    {/* Left Column - Heading & CTAs (Center) */}
                    <div className={meta.tokens.layout.leftColumn}>
                        <MotionWrapper
                            className={meta.tokens.layout.headingCtaWrapper}
                            {...(animated ? getAnimationProps(fadeInUp, 0, 0.3, true) : {})}
                        >
                            {/* Heading */}
                            <h1
                                className={meta.tokens.typography.heading.complete}
                                style={{ color: 'var(--hero-title)' }}
                                data-testid="hero-title"
                            >
                                {title}
                            </h1>

                            {/* CTA Buttons */}
                            <div
                                className={meta.tokens.spacing.buttonSpacing}
                                data-testid="hero-buttons"
                                role="group"
                                aria-label="Call to action buttons"
                            >
                                <ActionButton
                                    text={primaryCTA.text}
                                    href={primaryCTA.href}
                                    size={primaryCTA.size}
                                    icon={primaryCTA.icon}
                                    animated={animated}
                                    ariaLabel={`Primary action: ${primaryCTA.text}`}
                                    buttonType="primary"
                                />
                                {secondaryCTA && (
                                    <ActionButton
                                        text={secondaryCTA.text}
                                        href={secondaryCTA.href}
                                        size={secondaryCTA.size}
                                        icon={secondaryCTA.icon}
                                        animated={animated}
                                        ariaLabel={`Secondary action: ${secondaryCTA.text}`}
                                        buttonType="secondary"
                                    />
                                )}
                            </div>
                        </MotionWrapper>
                    </div>

                    {/* Right Column - Description (Bottom) */}
                    <div className={meta.tokens.layout.rightColumn}>
                        <MotionWrapper
                            className={meta.tokens.layout.descriptionWrapper}
                            {...(animated ? getAnimationProps(fadeInUp, 0.1, 0, true) : {})}
                        >
                            {/* Description */}
                            <p
                                className={meta.tokens.typography.body.complete}
                                style={{ color: 'var(--hero-desc)' }}
                                data-testid="hero-description"
                            >
                                {description}
                            </p>
                        </MotionWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
};

Hero_12.displayName = 'Hero_12';

export default Hero_12;