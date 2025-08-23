import React, { useState, useRef, useMemo, useCallback, type CSSProperties } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../common-components/Para';
import VideoPlayBtn from '../../../common-components/VideoPlayBtn';
import { type Hero_05Props, defaultColors } from './Hero_05.types';

// Types
type ColorValue = { light?: string; dark?: string };
type ButtonHoverConfig = {
    background?: ColorValue;
    text?: ColorValue;
    border?: ColorValue;
};

// Centralized hook for all style calculations
const useComponentStyles = (colors: Hero_05Props['colors'], theme: 'light' | 'dark') => {
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
 * Hero_05 Component
 * Split layout hero section with content on left, video on right
 * Features video player with play/pause controls and viewport-triggered animations
 */
const Hero_05: React.FC<Hero_05Props> = ({
    title = "Medium length hero heading goes here",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    primaryCta = "Button",
    secondaryCta = "Button",
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
            className={`relative w-full lg:h-screen lg:overflow-hidden ${className}`}
            style={styles.background}
        >
            <div className="w-full h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">

                    {/* Content Column */}
                    <motion.div
                        className="flex flex-col justify-center px-lg py-xl lg:px-2xl xl:px-5xl 2xl:px-6xl order-1 lg:order-1 min-h-[50vh] lg:min-h-0"
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

                            {/* CTA Buttons */}
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

                    {/* Video Column */}
                    <div className="relative h-96 lg:h-screen order-2 lg:order-2">
                        <motion.div
                            className="relative w-full h-full overflow-hidden"
                            {...getAnimationProps(fadeIn, 0, 0.3, animated)}
                        >
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
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero_05;