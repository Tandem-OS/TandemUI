// Hero_01.tsx
import React, { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../common-components/Para'; // Fixed: "common"
import {
    type Hero_01Props,
    type ColorOverrides
} from './Hero_01.types';
import { validateHero01Props, sanitizeProps } from './Hero_01.validators';
import meta from './Hero_01.meta';

// Animation helper
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

// Style hook
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

// Action Button Component - Fixed: Token Integration
interface ActionButtonProps {
    text: string;
    href: string;
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
    baseStyles: React.CSSProperties;
    hoverStyles: React.CSSProperties;
}

const ActionButton: React.FC<ActionButtonProps> = ({
    text,
    href,
    size = 'lg',
    icon,
    baseStyles,
    hoverStyles
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div className={meta.tokens.responsive.width}> {/* Fixed: Use meta token */}
            <SimpleButton
                variant="basic"
                size={size}
                fullWidth
                className={`md:w-auto ${meta.tokens.effects.button} ${meta.tokens.effects.hover}`}
                style={isHovered ? { ...baseStyles, ...hoverStyles } : baseStyles}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                linkTo={href}
                icon={icon}
            >
                {text}
            </SimpleButton>
        </div>
    );
};

// Main Component - Fixed: Complete Token Integration
const Hero_01: React.FC<Hero_01Props> = (props = {}) => {
    const { theme } = useTheme();

    // Validate and sanitize props
    const validation = validateHero01Props(props);
    const sanitized = sanitizeProps(props);

    // Log errors in development
    if (process.env.NODE_ENV === 'development' && !validation.valid) {
        console.warn('Hero_01 validation errors:', validation.errors);
    }

    // Use sanitized props with defaults
    const title = sanitized.title || meta.defaults.title;
    const description = sanitized.description || meta.defaults.description;
    const animated = sanitized.animated !== undefined ? sanitized.animated : meta.defaults.animated;
    const className = sanitized.className || "";

    // Primary CTA
    const primaryCTA = {
        text: sanitized.primaryCTA?.text || meta.defaults.primaryCTA.text,
        href: sanitized.primaryCTA?.href || meta.defaults.primaryCTA.href,
        size: (sanitized.primaryCTA?.size || meta.defaults.primaryCTA.size) as "sm" | "md" | "lg",
        icon: sanitized.primaryCTA?.icon
    };

    // Secondary CTA - Fixed: Use meta.defaults
    const hasSecondaryCTA = sanitized.secondaryCTA !== undefined || !('secondaryCTA' in sanitized);
    const secondaryCTA = hasSecondaryCTA ? {
        text: sanitized.secondaryCTA?.text || meta.defaults.secondaryCTA.text, // Fixed: Meta default
        href: sanitized.secondaryCTA?.href || meta.defaults.secondaryCTA.href, // Fixed: Meta default
        size: (sanitized.secondaryCTA?.size || meta.defaults.secondaryCTA.size) as "sm" | "md" | "lg", // Fixed: Meta default
        icon: sanitized.secondaryCTA?.icon
    } : undefined;

    // Image - Fixed: Use meta.defaults.imageAlt
    const image = sanitized.image || meta.defaults.image;
    const imageSrc = typeof image === 'string' ? image : image.src;
    const imageAlt = typeof image === 'object' ? (image.alt || meta.defaults.imageAlt) : meta.defaults.imageAlt; // Fixed

    // Get styles
    const styles = useComponentStyles(sanitized.colors, theme);

    return (
        <section
            className={`${meta.tokens.layout.section} ${className}`}
            style={styles.background}
        >
            <div className={meta.tokens.layout.grid}>

                {/* Content Column - Fixed: Complete token integration */}
                <motion.div
                    className={`${meta.tokens.layout.contentColumn} ${meta.tokens.spacing.containerX} ${meta.tokens.spacing.containerY}`}
                    {...getAnimationProps(fadeInUp, 0, 0.3, animated)}
                >
                    <div className={`${meta.tokens.layout.contentContainer} ${meta.tokens.spacing.contentSpacing}`}>

                        {/* Title - Fixed: Use meta typography token */}
                        <motion.div {...getAnimationProps(fadeInUp, 0, 0, animated)}>
                            <Heading
                                level="h1"
                                weight="bold"
                                className={meta.tokens.typography.heading.complete}
                                style={styles.title}
                            >
                                {title}
                            </Heading>
                        </motion.div>

                        {/* Description - Fixed: Use meta typography token */}
                        <motion.div {...getAnimationProps(fadeInUp, 0.1, 0, animated)}>
                            <Para
                                size="md"
                                className={meta.tokens.typography.body.complete}
                                style={styles.description}
                            >
                                {description}
                            </Para>
                        </motion.div>

                        {/* Buttons - Fixed: Use meta responsive and spacing tokens */}
                        <motion.div
                            className={`${meta.tokens.responsive.flexDirection} ${meta.tokens.spacing.buttonSpacing}`}
                            {...getAnimationProps(fadeInUp, 0.2, 0, animated)}
                        >
                            <ActionButton
                                text={primaryCTA.text}
                                href={primaryCTA.href}
                                size={primaryCTA.size}
                                icon={primaryCTA.icon}
                                baseStyles={styles.primaryButton}
                                hoverStyles={styles.primaryButtonHover}
                            />
                            {secondaryCTA && (
                                <ActionButton
                                    text={secondaryCTA.text}
                                    href={secondaryCTA.href}
                                    size={secondaryCTA.size}
                                    icon={secondaryCTA.icon}
                                    baseStyles={styles.secondaryButton}
                                    hoverStyles={styles.secondaryButtonHover}
                                />
                            )}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Image Column - Fixed: Complete token integration */}
                <div className={meta.tokens.layout.imageColumn}>
                    <motion.div
                        className={meta.tokens.layout.imageContainer}
                        {...getAnimationProps(fadeIn, 0, 0.3, animated)}
                    >
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className={meta.tokens.image.classes}
                            loading={meta.tokens.image.loading as "lazy" | "eager"}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

Hero_01.displayName = 'Hero_01';

export default Hero_01;