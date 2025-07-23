// src/components-lib/Hero/Hero_03/Hero_03.tsx

import React, { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../comman-components/Para';
import Newsletter from '../../../comman-components/Newsletter';
import { type Hero_03Props, defaultColors } from './Hero_03.types';

// Types
type ColorValue = { light?: string; dark?: string };

// Centralized hook for all style calculations
const useComponentStyles = (colors: Hero_03Props['colors'], theme: 'light' | 'dark') => {
    return useMemo(() => {
        const getColor = (config: ColorValue | undefined, fallback: string): string => {
            if (!config) return fallback;
            return (theme === 'dark' ? config.dark : config.light) ?? config.light ?? fallback;
        };

        const mergedColors = {
            background: { ...defaultColors.background, ...colors?.background },
            title: { ...defaultColors.title, ...colors?.title },
            description: { ...defaultColors.description, ...colors?.description },
            newsletter: {
                ...(defaultColors.newsletter ?? {}),
                ...(colors?.newsletter ?? {}),
            },
        };

        return {
            background: { background: getColor(mergedColors.background, '#ffffff') },
            title: { color: getColor(mergedColors.title, '#111827') },
            description: { color: getColor(mergedColors.description, '#4b5563') },
            newsletter: mergedColors.newsletter,
            getColor,
        };
    }, [colors, theme]);
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
 * Hero_03 Component
 * Split layout hero section with content and newsletter on left, image on right
 * Features newsletter signup and viewport-triggered animations
 */
const Hero_03: React.FC<Hero_03Props> = ({
    title = "Medium length hero heading goes here",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    newsletterPlaceholder = "Enter your email",
    newsletterButtonText = "Sign up",
    newsletterMessage = "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
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
            <div className="w-full h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">

                    {/* Content Column */}
                    <motion.div
                        className="flex flex-col justify-center px-lg py-2xl lg:px-2xl xl:px-5xl 2xl:px-6xl order-1 lg:order-1 min-h-[50vh] lg:min-h-0"
                        {...getAnimationProps(fadeInUp, 0, 0.3, animated)}
                    >
                        <div className="xl:max-w-lg space-y-md lg:space-y-lg">

                            {/* Main Heading */}
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

                            {/* Newsletter Form */}
                            <motion.div {...getAnimationProps(fadeInUp, 0.2, 0, animated)}>
                                <Newsletter
                                    placeholder={newsletterPlaceholder}
                                    buttonText={newsletterButtonText}
                                    message={newsletterMessage}
                                    colors={styles.newsletter}
                                    theme={theme}
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
            </div>
        </section>
    );
};

export default Hero_03;