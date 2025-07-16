import React, { type CSSProperties, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../comman-components/Para';
import { type Hero_10Props, defaultColors } from './Hero_10.types';

// Types
type ColorValue = { light?: string; dark?: string };
type ButtonHoverConfig = {
    background?: ColorValue;
    text?: ColorValue;
    border?: ColorValue;
};

// Centralized hook for all style calculations
const useComponentStyles = (colors: Hero_10Props['colors'], theme: 'light' | 'dark') => {
    return useMemo(() => {
        const getColor = (config: ColorValue | undefined, fallback: string): string => {
            if (!config) return fallback;
            return (theme === 'dark' ? config.dark : config.light) ?? config.light ?? fallback;
        };

        const mergedColors = {
            overlay: { ...defaultColors.overlay, ...colors?.overlay },
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
            color: getColor(config.text, '#ffffff'),
            borderColor: getColor(config.border, '#ffffff'),
            borderWidth: '2px',
            borderStyle: 'solid',
        });

        return {
            overlay: { backgroundColor: getColor(mergedColors.overlay, 'rgba(0, 0, 0, 0.5)') },
            title: { color: getColor(mergedColors.title, '#ffffff') },
            description: { color: getColor(mergedColors.description, 'rgba(255, 255, 255, 0.9)') },
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
        <SimpleButton
            variant="basic"
            size="lg"
            className="transition-all duration-200 hover:shadow-lg"
            style={baseStyles}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
        >
            {cta}
        </SimpleButton>
    );
};

// Animation props helper
const getAnimationProps = (delay: number = 0, animated: boolean = true) => {
    if (!animated) return {};
    return {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.3 },
        variants: fadeInUp,
        transition: { delay }
    };
};

/**
 * Hero_10 Component
 * Two-column hero with background - content/CTAs on left bottom, heading on right top
 * Mobile maintains same layout as Hero_09 (heading top, content bottom)
 * Features dual CTAs and viewport-triggered animations
 */
const Hero_10: React.FC<Hero_10Props> = ({
    title = "Medium length hero heading goes here",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    primaryCta = "Button",
    secondaryCta = "Button",
    backgroundSrc = "/images/component-lib-images/hero/placeholder-hero-bg.png",
    backgroundAlt = "Hero background",
    animated = true,
    overlayOpacity = 50,
    className = "",
    colors
}) => {
    const { theme } = useTheme();
    const styles = useComponentStyles(colors, theme);

    // Fallback for deprecated overlayOpacity prop
    const overlayStyle = colors?.overlay
        ? styles.overlay
        : { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` };

    return (
        <section className={`relative w-full min-h-screen lg:h-screen overflow-hidden ${className}`}>
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={backgroundSrc}
                    alt={backgroundAlt}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                />
                {/* Overlay */}
                <div
                    className="absolute inset-0"
                    style={overlayStyle}
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full min-h-screen lg:h-screen py-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-[85vh] lg:h-full">
                    {/* Mobile: Heading Top / Desktop: Content Bottom (Left Column) */}
                    <div className="order-1 lg:order-1 px-lg pb-xl lg:px-2xl xl:px-3xl 2xl:px-4xl pt-lg lg:pt-xl xl:pt-2xl lg:flex lg:items-end lg:pb-xl">
                        {/* Mobile Heading (visible on mobile only) */}
                        <motion.div
                            className="w-full lg:hidden"
                            {...getAnimationProps(0, animated)}
                        >
                            <Heading
                                level="h1"
                                weight="bold"
                                className="text-h2-sm lg:text-h1-md xl:text-h1-md"
                                style={styles.title}
                            >
                                {title}
                            </Heading>
                        </motion.div>

                        {/* Desktop Content (visible on desktop only) */}
                        <motion.div
                            className="hidden lg:block w-full space-y-md lg:space-y-lg"
                            {...getAnimationProps(0.1, animated)}
                        >
                            {/* Description */}
                            <Para
                                size="md"
                                className="lg:text-para-lg leading-relaxed"
                                style={styles.description}
                            >
                                {description}
                            </Para>

                            {/* CTA Buttons */}
                            <div className="flex gap-md">
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
                            </div>
                        </motion.div>
                    </div>

                    {/* Mobile: Content Bottom / Desktop: Heading Top (Right Column) */}
                    <div className="order-2 lg:order-2 flex items-end lg:items-start px-lg pb-xl lg:px-2xl xl:px-2xl 2xl:px-4xl lg:pt-xl xl:pt-2xl">
                        {/* Mobile Content (visible on mobile only) */}
                        <motion.div
                            className="w-full space-y-md lg:space-y-lg lg:hidden"
                            {...getAnimationProps(0.1, animated)}
                        >
                            {/* Description */}
                            <Para
                                size="md"
                                className="lg:text-para-lg leading-relaxed"
                                style={styles.description}
                            >
                                {description}
                            </Para>

                            {/* CTA Buttons */}
                            <div className="flex gap-md">
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
                            </div>
                        </motion.div>

                        {/* Desktop Heading (visible on desktop only) */}
                        <motion.div
                            className="hidden lg:block w-full"
                            {...getAnimationProps(0, animated)}
                        >
                            <Heading
                                level="h1"
                                weight="bold"
                                className="text-h2-sm lg:text-h1-md xl:text-h1-md"
                                style={styles.title}
                            >
                                {title}
                            </Heading>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero_10;