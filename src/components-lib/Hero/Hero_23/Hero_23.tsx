import React, { useState, useRef, useMemo, useCallback, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../comman-components/Para';
import VideoPlayBtn from '../../../comman-components/VideoPlayBtn';
import { type Hero_23Props, defaultColors } from './Hero_23.types';

// Types
type ColorValue = { light?: string; dark?: string };
type ButtonHoverConfig = {
    background?: ColorValue;
    text?: ColorValue;
    border?: ColorValue;
};

// Centralized hook for all style calculations
const useComponentStyles = (colors: Hero_23Props['colors'], theme: 'light' | 'dark') => {
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
            video: {
                ...(defaultColors.video ?? {}),
                ...(colors?.video ?? {}),
                playButton: {
                    ...(defaultColors.video?.playButton ?? {}),
                    ...(colors?.video?.playButton ?? {}),
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
            videoOverlay: { backgroundColor: getColor(mergedColors.video.overlay, 'rgba(0, 0, 0, 0.3)') },
            videoPlayButton: mergedColors.video.playButton,
            getColor,
        };
    }, [colors, theme]);
};

// Action Button Component
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
 * Hero_23 Component - Centered content above full-width video
 */
const Hero_23: React.FC<Hero_23Props> = ({
    title = "Medium length hero heading goes here",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    primaryCta = "Button",
    secondaryCta = "Button",
    videoSrc = "/images/component-lib-images/hero/placeholder-video.mp4",
    videoThumbnailSrc = "/images/component-lib-images/hero/video-thumnail.png",
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
            {/* Content Section - Centered */}
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
                    <div className="flex items-center justify-center gap-md pt-sm">
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

            {/* Video Section */}
            <motion.div
                className="w-full relative"
                {...getAnimationProps(0.2, animated)}
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

export default Hero_23;