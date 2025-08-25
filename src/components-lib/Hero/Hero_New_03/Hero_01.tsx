// Hero_01.tsx
import React, { useMemo, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../common-components/Para';
import {
    type Hero_01Props,
    type ColorOverrides
} from './Hero_01.types';
import {
    validateHero01Props,
    sanitizeProps,
    formatValidationMessage
} from './Hero_01.validators';
import meta from './Hero_01.meta';

// Add preload hint for image
if (typeof window !== 'undefined' && meta.performance.preloadHints.includes('image')) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = meta.defaults.image;
    document.head.appendChild(link);
}

// Animation helper - respects animated prop
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

// Style hook with complete color handling
const useComponentStyles = (
    userColors: ColorOverrides | undefined,
    theme: 'light' | 'dark'
) => {
    return useMemo(() => {
        const defaults = meta.defaults.colors;

        const getColor = (userValue: any, defaultValue: any): string => {
            const value = userValue || defaultValue;
            return theme === 'dark' ? value.dark : value.light;
        };

        const getButtonStyles = (userButton: any, defaultButton: any) => {
            const button = userButton || defaultButton;
            return {
                background: getColor(button.background, defaultButton.background),
                color: getColor(button.text, defaultButton.text),
                borderColor: getColor(button.border, defaultButton.border),
                borderWidth: '2px',
                borderStyle: 'solid' as const,
            };
        };

        const getButtonHoverStyles = (userButton: any, defaultButton: any) => {
            const button = userButton || defaultButton;
            return {
                background: getColor(button.hover?.background, defaultButton.hover.background),
                color: getColor(button.hover?.text, defaultButton.hover.text),
                borderColor: getColor(button.hover?.border, defaultButton.hover.border),
            };
        };

        return {
            background: {
                backgroundColor: getColor(userColors?.background, defaults.background)
            },
            title: {
                color: getColor(userColors?.title, defaults.title)
            },
            description: {
                color: getColor(userColors?.description, defaults.description)
            },
            primaryButton: getButtonStyles(userColors?.primaryButton, defaults.primaryButton),
            primaryButtonHover: getButtonHoverStyles(userColors?.primaryButton, defaults.primaryButton),
            secondaryButton: getButtonStyles(userColors?.secondaryButton, defaults.secondaryButton),
            secondaryButtonHover: getButtonHoverStyles(userColors?.secondaryButton, defaults.secondaryButton)
        };
    }, [userColors, theme]);
};

// Action Button Component with full token usage
interface ActionButtonProps {
    text: string;
    href: string;
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
    baseStyles: React.CSSProperties;
    hoverStyles: React.CSSProperties;
    animated?: boolean;
    ariaLabel?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
    text,
    href,
    size = 'lg',
    icon,
    baseStyles,
    hoverStyles,
    animated = true,
    ariaLabel
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Wrapper div uses token for responsive width
    return (
        <div className={meta.tokens.responsive.width}>
            <SimpleButton
                variant="basic"
                size={size}
                fullWidth
                className={`${meta.tokens.responsive.width} ${meta.tokens.effects.button} ${meta.tokens.effects.hover}`}
                style={isHovered ? { ...baseStyles, ...hoverStyles } : baseStyles}
                onMouseEnter={() => animated && setIsHovered(true)}
                onMouseLeave={() => animated && setIsHovered(false)}
                linkTo={href}
                icon={icon}
                aria-label={ariaLabel || text}
            >
                {text}
            </SimpleButton>
        </div>
    );
};

// Main Component with complete token usage and validation
const Hero_01: React.FC<Hero_01Props> = (props = {}) => {
    const { theme } = useTheme();

    // Validate and sanitize props
    const validation = validateHero01Props(props);
    const sanitized = sanitizeProps(props);

    // Log validation results in development
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            if (!validation.valid || validation.warnings) {
                console.group('Hero_01 Validation');
                console.log(formatValidationMessage(validation));
                console.groupEnd();
            }
        }
    }, [validation]);

    // Use sanitized props with meta defaults as final fallback
    const title = sanitized.title || meta.defaults.title;
    const description = sanitized.description || meta.defaults.description;
    const animated = sanitized.animated !== undefined ? sanitized.animated : meta.defaults.animated;
    const className = sanitized.className || meta.defaults.className;

    // Primary CTA with complete defaults
    const primaryCTA = {
        text: sanitized.primaryCTA?.text || meta.defaults.primaryCTA.text,
        href: sanitized.primaryCTA?.href || meta.defaults.primaryCTA.href,
        size: sanitized.primaryCTA?.size || meta.defaults.primaryCTA.size,
        icon: sanitized.primaryCTA?.icon
    };

    // Secondary CTA with conditional rendering
    const hasSecondaryCTA = sanitized.secondaryCTA !== undefined || !('secondaryCTA' in sanitized);
    const secondaryCTA = hasSecondaryCTA ? {
        text: sanitized.secondaryCTA?.text || meta.defaults.secondaryCTA.text,
        href: sanitized.secondaryCTA?.href || meta.defaults.secondaryCTA.href,
        size: sanitized.secondaryCTA?.size || meta.defaults.secondaryCTA.size,
        icon: sanitized.secondaryCTA?.icon
    } : undefined;

    // Image handling with proper alt text
    const image = sanitized.image || meta.defaults.image;
    const imageSrc = typeof image === 'string' ? image : image.src;
    const imageAlt = typeof image === 'object' ? (image.alt || meta.defaults.imageAlt) : meta.defaults.imageAlt;

    // Get component styles
    const styles = useComponentStyles(sanitized.colors, theme);

    // Motion wrapper component that respects animated prop
    const MotionWrapper = animated ? motion.div : 'div';

    return (
        <section
            className={`${meta.tokens.layout.section} ${className}`}
            style={styles.background}
            data-testid="hero-section"
            role="banner"
            aria-label={meta.accessibility.screenReaderHints?.section || "Main hero content"}
        >
            <div className={meta.tokens.layout.grid}>

                {/* Content Column */}
                <MotionWrapper
                    className={`${meta.tokens.layout.contentColumn} ${meta.tokens.spacing.containerX} ${meta.tokens.spacing.containerY}`}
                    {...(animated ? getAnimationProps(fadeInUp, 0, 0.3, true) : {})}
                >
                    <div className={`${meta.tokens.layout.contentContainer} ${meta.tokens.spacing.contentSpacing}`}>

                        {/* Title */}
                        <MotionWrapper
                            {...(animated ? getAnimationProps(fadeInUp, 0, 0, true) : {})}
                            data-testid="hero-title"
                        >
                            <Heading
                                level="h1"
                                weight="bold"
                                className={meta.tokens.typography.heading.complete}
                                style={styles.title}
                                aria-label={`Hero title: ${title}`}
                            >
                                {title}
                            </Heading>
                        </MotionWrapper>

                        {/* Description */}
                        <MotionWrapper
                            {...(animated ? getAnimationProps(fadeInUp, 0.1, 0, true) : {})}
                            data-testid="hero-description"
                        >
                            <Para
                                size="md"
                                className={meta.tokens.typography.body.complete}
                                style={styles.description}
                                aria-label={`Hero description: ${description}`}
                            >
                                {description}
                            </Para>
                        </MotionWrapper>

                        {/* Buttons */}
                        <MotionWrapper
                            className={`${meta.tokens.responsive.flexDirection} ${meta.tokens.spacing.buttonSpacing}`}
                            {...(animated ? getAnimationProps(fadeInUp, 0.2, 0, true) : {})}
                            data-testid="hero-buttons"
                            role="group"
                            aria-label="Call to action buttons"
                        >
                            <ActionButton
                                text={primaryCTA.text}
                                href={primaryCTA.href}
                                size={primaryCTA.size}
                                icon={primaryCTA.icon}
                                baseStyles={styles.primaryButton}
                                hoverStyles={styles.primaryButtonHover}
                                animated={animated}
                                ariaLabel={`Primary action: ${primaryCTA.text}`}
                            />
                            {secondaryCTA && (
                                <ActionButton
                                    text={secondaryCTA.text}
                                    href={secondaryCTA.href}
                                    size={secondaryCTA.size}
                                    icon={secondaryCTA.icon}
                                    baseStyles={styles.secondaryButton}
                                    hoverStyles={styles.secondaryButtonHover}
                                    animated={animated}
                                    ariaLabel={`Secondary action: ${secondaryCTA.text}`}
                                />
                            )}
                        </MotionWrapper>
                    </div>
                </MotionWrapper>

                {/* Image Column */}
                <div className={meta.tokens.layout.imageColumn}>
                    <MotionWrapper
                        className={meta.tokens.layout.imageContainer}
                        {...(animated ? getAnimationProps(fadeIn, 0, 0.3, true) : {})}
                        data-testid="hero-image-container"
                    >
                        <img
                            src={imageSrc}
                            alt={imageAlt || meta.accessibility.screenReaderHints?.image || "decorative"}
                            className={meta.tokens.image.classes}
                            loading={meta.tokens.image.loading as "lazy" | "eager"}
                            data-testid="hero-image"
                            role="presentation"
                            aria-hidden={!imageAlt}
                        />
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
};

Hero_01.displayName = 'Hero_01';

export default Hero_01;