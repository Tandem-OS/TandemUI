import React, { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../comman-components/Para';
import Newsletter from '../../../comman-components/Newsletter';
import { type Hero_22Props, defaultColors } from './Hero_22.types';

// Types
type ColorValue = { light?: string; dark?: string };

// Centralized hook for all style calculations
const useComponentStyles = (colors: Hero_22Props['colors'], theme: 'light' | 'dark') => {
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
 * Hero_22 Component - Left aligned content with newsletter above full-width image
 **/
const Hero_22: React.FC<Hero_22Props> = ({
    title = "Long heading is what you see here in this header section",
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
            {/* Content Section - Left Aligned */}
            <div className="container mx-auto px-lg py-2xl lg:py-4xl">
                <motion.div
                    className="max-w-3xl text-left space-y-md lg:space-y-lg"
                    {...getAnimationProps(fadeInUp, 0, 0.3, animated)}
                >
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
                    <motion.div {...getAnimationProps(fadeInUp, 0.2, 0, animated)} className='max-w-lg'>
                        <Newsletter
                            placeholder={newsletterPlaceholder}
                            buttonText={newsletterButtonText}
                            message={newsletterMessage}
                            colors={styles.newsletter}
                            theme={theme}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Image Section */}
            <motion.div
                className="w-full"
                {...getAnimationProps(fadeIn, 0.2, 0.3, animated)}
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

export default Hero_22;