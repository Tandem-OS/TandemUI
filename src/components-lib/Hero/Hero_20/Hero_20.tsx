import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../comman-components/Para';
import Newsletter from '../../../comman-components/Newsletter';
import { type Hero_20Props, defaultColors } from './Hero_20.types';

// Types
type ColorValue = { light?: string; dark?: string };

// Centralized hook for all style calculations
const useComponentStyles = (colors: Hero_20Props['colors'], theme: 'light' | 'dark') => {
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
 * Hero_20 Component
 */
const Hero_20: React.FC<Hero_20Props> = ({
    title = "Medium length hero heading goes here",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    newsletterPlaceholder = "Enter your email",
    newsletterButtonText = "Sign up",
    newsletterMessage = "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    imageSrc = "/images/component-lib-images/hero/placeholder-hero-img.png",
    imageAlt = "Hero section image",
    animated = true,
    className = "",
    colors
}) => {
    const { theme } = useTheme();
    const styles = useComponentStyles(colors, theme);

    return (
        <section
            className={`w-full ${className}`}
            style={styles.background}
        >
            {/* Content Section */}
            <div className="container mx-auto px-lg py-2xl lg:py-4xl">
                <motion.div
                    className="max-w-2xl mx-auto text-center space-y-md lg:space-y-lg"
                    {...getAnimationProps(0, animated)}
                >
                    <Heading
                        level="h1"
                        weight="bold"
                        className="text-h2-sm lg:text-h1-md"
                        style={styles.title}
                    >
                        {title}
                    </Heading>
                    <Para
                        size="md"
                        className="lg:text-para-lg leading-relaxed"
                        style={styles.description}
                    >
                        {description}
                    </Para>
                    <div className="pt-sm max-w-lg mx-auto">
                        <Newsletter
                            placeholder={newsletterPlaceholder}
                            buttonText={newsletterButtonText}
                            message={newsletterMessage}
                            colors={styles.newsletter}
                            theme={theme}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Image Section */}
            <motion.div
                className="w-full"
                {...getAnimationProps(0.2, animated)}
            >
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                />
            </motion.div>
        </section>
    );
};

export default Hero_20;