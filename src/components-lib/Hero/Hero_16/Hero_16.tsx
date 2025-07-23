import React, { useState, useRef, useMemo, useCallback, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../comman-components/Para';
import VideoPlayBtn from '../../../comman-components/VideoPlayBtn';
import { type Hero_16Props, defaultColors } from './Hero_16.types';

// Types
type ColorValue = { light?: string; dark?: string };
type ButtonHoverConfig = {
    background?: ColorValue;
    text?: ColorValue;
    border?: ColorValue;
};

// Centralized hook for all style calculations
const useComponentStyles = (colors: Hero_16Props['colors'], theme: 'light' | 'dark') => {
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
 * Hero_16 Component
 */
const Hero_16: React.FC<Hero_16Props> = ({
    title = "Medium length hero heading goes here",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    primaryCta = "Button",
    secondaryCta = "Button",
    videoSrc = "/images/component-lib-images/hero/placeholder-video.mp4",
    videoThumbnailSrc = "/images/component-lib-images/hero/video-bg-thumbnail.png",
    animated = true,
    videoAutoPlay = false,
    videoLoop = true,
    overlayOpacity = 50,
    className = "",
    colors
}) => {
    const { theme } = useTheme();
    const styles = useComponentStyles(colors, theme);
    const [isPlaying, setIsPlaying] = useState(videoAutoPlay);
    const videoRef = useRef<HTMLVideoElement>(null);

    const overlayStyle = colors?.overlay
        ? styles.overlay
        : { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` };

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
        <section className={`relative w-full min-h-screen lg:h-screen overflow-hidden ${className}`}>
            <div className="absolute inset-0">
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
                <div
                    className="absolute inset-0"
                    style={overlayStyle}
                />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <VideoPlayBtn
                    isPlaying={isPlaying}
                    onClick={handlePlayPause}
                    size="lg"
                    variant={colors ? 'basic' : 'default'}
                    colors={colors ? styles.videoPlayButton : undefined}
                    theme={theme}
                />
            </div>
            <div className="relative z-10 w-full h-full min-h-screen lg:h-screen py-md lg:py-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-[95vh] lg:h-full">

                    {/* Left Column - Heading & CTAs (Desktop: Bottom, Mobile: Top) */}
                    <div className="order-1 lg:order-1 flex items-start lg:items-end px-lg pb-sm lg:pb-xl lg:px-2xl xl:px-2xl 2xl:px-4xl pt-sm lg:pt-xl">
                        <motion.div
                            className="w-full space-y-md lg:space-y-lg"
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

                    {/* Right Column - Paragraph (Desktop: Top, Mobile: Bottom) */}
                    <div className="order-2 lg:order-2 px-lg pb-sm lg:pb-xl lg:px-2xl xl:px-3xl 2xl:px-4xl pt-sm lg:pt-xl flex items-end lg:items-start">
                        <motion.div
                            className="w-full"
                            {...getAnimationProps(0.1, animated)}
                        >
                            <Para
                                size="md"
                                className="lg:text-para-lg leading-relaxed"
                                style={styles.description}
                            >
                                {description}
                            </Para>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero_16;