import React, { type CSSProperties, useMemo, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../comman-components/Para';
import { type Hero_01Props, defaultColors } from './Hero_01.types';

// Types
type ColorValue = { light?: string; dark?: string };
type ButtonHoverConfig = {
    background?: ColorValue;
    text?: ColorValue;
    border?: ColorValue;
};

// Centralized hook for all style calculations
const useComponentStyles = (colors: Hero_01Props['colors'], theme: 'light' | 'dark') => {
    return useMemo(() => {
        const getColor = (config: ColorValue | undefined, fallback: string): string => {
            if (!config) return fallback;
            return (theme === 'dark' ? config.dark : config.light) ?? config.light ?? fallback;
        };

        const mergedColors = {
            background: { ...defaultColors.background, ...colors?.background },
            title: { ...defaultColors.title, ...colors?.title },
            description: { ...defaultColors.description, ...colors?.description },
            primaryButton: {
                ...(defaultColors.primaryButton ?? {}),
                ...(colors?.primaryButton ?? {}),
                hover: {
                    ...(defaultColors.primaryButton?.hover ?? {}),
                    ...(colors?.primaryButton?.hover ?? {}),
                },
            },
            secondaryButton: {
                ...(defaultColors.secondaryButton ?? {}),
                ...(colors?.secondaryButton ?? {}),
                hover: {
                    ...(defaultColors.secondaryButton?.hover ?? {}),
                    ...(colors?.secondaryButton?.hover ?? {}),
                },
            },
        };

        const createButtonStyles = (config: typeof mergedColors.primaryButton): CSSProperties => ({
            background: getColor(config.background, 'transparent'),
            color: getColor(config.text, '#000000'),
            borderColor: getColor(config.border, '#000000'),
            borderWidth: '2px',
            borderStyle: 'solid',
        });

        return {
            background: { background: getColor(mergedColors.background, '#ffffff') },
            title: { color: getColor(mergedColors.title, '#111827') },
            description: { color: getColor(mergedColors.description, '#4b5563') },
            primaryButton: createButtonStyles(mergedColors.primaryButton),
            secondaryButton: createButtonStyles(mergedColors.secondaryButton),
            primaryButtonHover: mergedColors.primaryButton.hover || {},
            secondaryButtonHover: mergedColors.secondaryButton.hover || {},
            getColor,
        };
    }, [colors, theme]);
};

// Action Button Component with optimized hover handling
const ActionButton: React.FC<{
    cta: string;
    baseStyles: CSSProperties;
    hoverConfig: ButtonHoverConfig;
    getColor: (config: ColorValue | undefined, fallback: string) => string;
}> = ({ cta, baseStyles, hoverConfig, getColor }) => {
    const handleHover = useCallback((e: React.MouseEvent<HTMLButtonElement>, isHovering: boolean) => {
        const target = e.currentTarget.style;

        if (isHovering && hoverConfig) {
            target.background = getColor(hoverConfig.background, baseStyles.background as string);
            target.color = getColor(hoverConfig.text, baseStyles.color as string);
            target.borderColor = getColor(hoverConfig.border, baseStyles.borderColor as string);
        } else {
            target.background = baseStyles.background as string;
            target.color = baseStyles.color as string;
            target.borderColor = baseStyles.borderColor as string;
        }
    }, [baseStyles, hoverConfig, getColor]);

    return (
        <div className="w-full md:w-auto">
            <SimpleButton
                variant="basic"
                size="lg"
                fullWidth
                className="md:w-auto transition-all duration-200 hover:shadow-lg"
                style={baseStyles}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
            >
                {cta}
            </SimpleButton>
        </div>
    );
};

// Animation props helper
const getAnimationProps = (variant: Variants, delay: number = 0, amount: number = 0, animated: boolean = true) => {
    if (!animated) return {};
    return {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: amount || undefined },
        variants: variant,
        transition: { delay }
    };
};

/**
 * Hero_01 Component
 * Split layout hero section with content on left, image on right
 * Features dual CTAs and viewport-triggered animations
 */
const Hero_01: React.FC<Hero_01Props> = ({
    title = "Medium length hero heading goes here",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    primaryCta = "Button",
    secondaryCta = "Button",
    imageSrc = "/images/component-lib-images/hero/placeholder-img.png",
    imageAlt = "Hero section image",
    animated = true,
    className = "",
    colors
}) => {
    const { theme } = useTheme();
    const styles = useComponentStyles(colors, theme);

    return (
        <section
            className={`relative w-full lg:h-screen lg:overflow-hidden ${className}`}
            style={styles.background}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
                {/* Content Column */}
                <motion.div
                    className="flex flex-col justify-center px-lg py-xl lg:px-2xl xl:px-5xl 2xl:px-6xl order-1 lg:order-1 min-h-[50vh] lg:min-h-0"
                    {...getAnimationProps(fadeInUp, 0, 0.3, animated)}
                >
                    <div className="xl:max-w-lg space-y-md lg:space-y-lg">
                        {/* Title */}
                        <motion.div {...getAnimationProps(fadeInUp, 0, 0, animated)}>
                            <Heading
                                level="h1"
                                weight="bold"
                                className="text-h2-sm lg:text-h1-md"
                                style={styles.title}
                            >
                                {title}
                            </Heading>
                        </motion.div>

                        {/* Description */}
                        <motion.div {...getAnimationProps(fadeInUp, 0.1, 0, animated)}>
                            <Para
                                size="md"
                                className="lg:text-para-lg leading-relaxed"
                                style={styles.description}
                            >
                                {description}
                            </Para>
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            className="flex flex-col md:flex-row gap-md"
                            {...getAnimationProps(fadeInUp, 0.2, 0, animated)}
                        >
                            <ActionButton
                                cta={primaryCta}
                                baseStyles={styles.primaryButton}
                                hoverConfig={styles.primaryButtonHover}
                                getColor={styles.getColor}
                            />
                            <ActionButton
                                cta={secondaryCta}
                                baseStyles={styles.secondaryButton}
                                hoverConfig={styles.secondaryButtonHover}
                                getColor={styles.getColor}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Image Column */}
                <div className="relative h-96 lg:h-screen order-2 lg:order-2">
                    <motion.div
                        className="w-full h-full"
                        {...getAnimationProps(fadeIn, 0, 0.3, animated)}
                    >
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="w-full h-full lg:h-screen object-cover object-bottom"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero_01;