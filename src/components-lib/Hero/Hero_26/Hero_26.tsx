import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../comman-components/Para';
import VideoPlayBtn from '../../../comman-components/VideoPlayBtn';
import Newsletter from '../../../comman-components/Newsletter';
import { type Hero_26Props, defaultColors } from './Hero_26.types';

// Types
type ColorValue = { light?: string; dark?: string };

// Centralized hook for all style calculations
const useComponentStyles = (colors: Hero_26Props['colors'], theme: 'light' | 'dark') => {
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
            video: {
                ...(defaultColors.video ?? {}),
                ...(colors?.video ?? {}),
                playButton: {
                    ...(defaultColors.video?.playButton ?? {}),
                    ...(colors?.video?.playButton ?? {}),
                },
            },
        };

        return {
            background: { background: getColor(mergedColors.background, '#ffffff') },
            title: { color: getColor(mergedColors.title, '#111827') },
            description: { color: getColor(mergedColors.description, '#4b5563') },
            newsletter: mergedColors.newsletter,
            videoOverlay: { backgroundColor: getColor(mergedColors.video.overlay, 'rgba(0, 0, 0, 0.3)') },
            videoPlayButton: mergedColors.video.playButton,
            getColor,
        };
    }, [colors, theme]);
};

// Animation props helper
const getAnimationProps = (variant: Variants, delay: number = 0, amount: number = 0.3, animated: boolean = true) => {
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
 * Hero_26 Component - Left-aligned content with newsletter above full-width video
 */
const Hero_26: React.FC<Hero_26Props> = ({
    title = "Long heading is what you see here in this header section",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    newsletterPlaceholder = "Enter your email",
    newsletterButtonText = "Sign up",
    newsletterMessage = "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    videoSrc = "/images/component-lib-images/hero/placeholder-video.mp4",
    videoThumbnailSrc = "/images/component-lib-images/hero/placeholder-video-thumbnail.png",
    animated = true,
    videoAutoPlay = false,
    videoLoop = true,
    className = "",
    colors
}) => {
    const { theme } = useTheme();
    const styles = useComponentStyles(colors, theme);
    const [isPlaying, setIsPlaying] = useState(videoAutoPlay);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

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
                    {/* Newsletter Form - Replaces CTA buttons */}
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

            {/* Video Section */}
            <motion.div
                className="w-full relative"
                {...getAnimationProps(fadeIn, 0.2, 0.3, animated)}
            >
                <div className="relative w-full  overflow-hidden">
                    {/* Video overlay */}
                    <div
                        className="absolute inset-0 z-10"
                        style={styles.videoOverlay}
                    />

                    {/* Video element */}
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover object-center"
                        poster={videoThumbnailSrc}
                        loop={videoLoop}
                        muted
                        playsInline
                        onEnded={() => setIsPlaying(false)}
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Play/Pause button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <VideoPlayBtn
                            isPlaying={isPlaying}
                            onClick={handlePlayPause}
                            size="lg"
                            variant={colors ? 'basic' : 'default'}
                            colors={colors ? styles.videoPlayButton : undefined}
                            theme={theme}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero_26;