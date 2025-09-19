import React, { useMemo, useId, useState, useRef, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import { FaPlay, FaPause } from 'react-icons/fa';
import {
    type Hero_25Props,
    type ColorOverrides,
    type ColorValue,
    type VideoColorOverride
} from './Hero_25.types';
import {
    validateHero25Props,
    sanitizeProps,
    formatValidationMessage
} from './Hero_25.validators';
import meta from './Hero_25.meta';

// Animation helper function
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

// Component styles hook
const useComponentStyles = (
    userColors: ColorOverrides | undefined,
    theme: 'light' | 'dark'
): Record<string, string> => {
    return useMemo(() => {
        const defaults = meta.defaults.colors;
        const getColor = (userValue: ColorValue | undefined, defaultValue: ColorValue): string => {
            const value = userValue || defaultValue;
            return theme === 'dark' ? value.dark : value.light;
        };
        const getButtonVars = (
            userButton: any,
            defaultButton: any,
            prefix: string
        ) => {
            const button = userButton || defaultButton;
            return {
                [`--btn-${prefix}-bg`]: getColor(button.background, defaultButton.background),
                [`--btn-${prefix}-text`]: getColor(button.text, defaultButton.text),
                [`--btn-${prefix}-border`]: getColor(button.border, defaultButton.border),
                [`--btn-${prefix}-hover-bg`]: getColor(button.hover?.background, defaultButton.hover.background),
                [`--btn-${prefix}-hover-text`]: getColor(button.hover?.text, defaultButton.hover.text),
                [`--btn-${prefix}-hover-border`]: getColor(button.hover?.border, defaultButton.hover.border),
            };
        };
        const getVideoVars = (
            userVideo: VideoColorOverride | undefined,
            defaultVideo: VideoColorOverride
        ) => {
            const video = userVideo || defaultVideo;
            return {
                '--video-overlay': getColor(video.overlay, defaultVideo.overlay),
                '--video-play-bg': getColor(video.playButton?.background, defaultVideo.playButton.background),
                '--video-play-bg-hover': getColor(video.playButton?.backgroundHover, defaultVideo.playButton.backgroundHover),
                '--video-play-border': getColor(video.playButton?.border, defaultVideo.playButton.border),
                '--video-play-icon': getColor(video.playButton?.icon, defaultVideo.playButton.icon),
                '--video-play-icon-hover': getColor(video.playButton?.iconHover, defaultVideo.playButton.iconHover),
            };
        };
        return {
            '--hero-bg': getColor(userColors?.background, defaults.background),
            '--hero-title': getColor(userColors?.title, defaults.title),
            '--hero-desc': getColor(userColors?.description, defaults.description),
            ...getButtonVars(userColors?.primaryButton, defaults.primaryButton, 'primary'),
            ...getButtonVars(userColors?.secondaryButton, defaults.secondaryButton, 'secondary'),
            ...getVideoVars(userColors?.video, defaults.video),
        };
    }, [userColors, theme]);
};

// Styled components - ONLY for hover and focus states
const HoverButton = styled.button<{ $buttonType: 'primary' | 'secondary' }>`
    &:hover:not(:disabled) {
        background-color: var(--btn-${props => props.$buttonType}-hover-bg) !important;
        color: var(--btn-${props => props.$buttonType}-hover-text) !important;
        border-color: var(--btn-${props => props.$buttonType}-hover-border) !important;
    }
`;

const HoverLink = styled.a<{ $buttonType: 'primary' | 'secondary' }>`
    &:hover:not(:disabled) {
        background-color: var(--btn-${props => props.$buttonType}-hover-bg) !important;
        color: var(--btn-${props => props.$buttonType}-hover-text) !important;
        border-color: var(--btn-${props => props.$buttonType}-hover-border) !important;
    }
`;

const VideoPlayButton = styled(motion.button)`
    &:hover:not(:disabled) {
        background-color: var(--video-play-bg-hover) !important;
        color: var(--video-play-icon-hover) !important;
    }
`;

// ActionButton component
interface ActionButtonProps {
    text: string;
    href: string;
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
    animated?: boolean;
    ariaLabel?: string;
    buttonType: 'primary' | 'secondary';
}

const ActionButton: React.FC<ActionButtonProps> = ({
    text,
    href,
    size = 'lg',
    icon,
    animated = true,
    ariaLabel,
    buttonType
}) => {
    const buttonClasses = [
        meta.tokens.button.base,
        meta.tokens.button.sizes[size],
        meta.tokens.responsive.width,
        animated ? meta.tokens.effects.button : 'transition-none'
    ].join(' ');

    const buttonStyle: React.CSSProperties = {
        backgroundColor: `var(--btn-${buttonType}-bg)`,
        color: `var(--btn-${buttonType}-text)`,
        borderColor: `var(--btn-${buttonType}-border)`,
        borderWidth: meta.tokens.button.borderWidth,
        borderStyle: meta.tokens.button.borderStyle,
    };

    const buttonContent = (
        <>
            {text}
            {icon && <span className={meta.tokens.button.iconSpacing}>{icon}</span>}
        </>
    );

    if (href.startsWith('http') || href.startsWith('/') || href.startsWith('#')) {
        return (
            <HoverLink
                href={href}
                className={buttonClasses}
                style={buttonStyle}
                aria-label={ariaLabel || text}
                $buttonType={buttonType}
            >
                {buttonContent}
            </HoverLink>
        );
    }

    return (
        <HoverButton
            className={buttonClasses}
            style={buttonStyle}
            onClick={() => window.location.href = href}
            aria-label={ariaLabel || text}
            type='button'
            $buttonType={buttonType}
        >
            {buttonContent}
        </HoverButton>
    );
};

// VideoPlayer component
interface VideoPlayerProps {
    videoSrc: string;
    thumbnailSrc: string;
    autoPlay: boolean;
    loop: boolean;
    animated?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    videoSrc,
    thumbnailSrc,
    autoPlay,
    loop,
    animated = true
}) => {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
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

    const playButtonStyle: React.CSSProperties = {
        backgroundColor: 'var(--video-play-bg)',
        borderColor: 'var(--video-play-border)',
        color: 'var(--video-play-icon)',
        borderWidth: meta.tokens.video.playButton.borderWidth,
        borderStyle: meta.tokens.video.playButton.borderStyle,
    };

    return (
        <div className={meta.tokens.video.container}>
            <div
                className={meta.tokens.video.overlay}
                style={{ backgroundColor: 'var(--video-overlay)' }}
            />

            <video
                ref={videoRef}
                className={meta.tokens.video.element}
                poster={thumbnailSrc}
                loop={loop}
                muted
                playsInline
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={meta.tokens.video.controls}>
                <VideoPlayButton
                    className={meta.tokens.video.playButton.classes}
                    style={playButtonStyle}
                    onClick={handlePlayPause}
                    type="button"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    animate={{ 
                        opacity: isPlaying ? 0.3 : 1,
                        scale: animated ? 1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        key={isPlaying ? 'pause' : 'play'}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={meta.tokens.video.playButton.iconContainer}
                    >
                        {isPlaying ? (
                            <FaPause className={meta.tokens.video.playButton.icon} />
                        ) : (
                            <FaPlay className={meta.tokens.video.playButton.icon} />
                        )}
                    </motion.div>
                </VideoPlayButton>
            </div>
        </div>
    );
};

// Main Hero_25 component
const Hero_25: React.FC<Hero_25Props> = (props = {}) => {
    const { theme } = useTheme();
    const uniqueId = useId();

    const validation = validateHero25Props(props);
    const sanitized = sanitizeProps(props);

    if (process.env.NODE_ENV === 'development') {
        if (!validation.valid || validation.warnings) {
            console.group('Hero_25 Validation');
            console.log(formatValidationMessage(validation));
            console.groupEnd();
        }
    }

    const title = sanitized.title || meta.defaults.title;
    const description = sanitized.description || meta.defaults.description;
    const animated = sanitized.animated !== undefined ? sanitized.animated : meta.defaults.animated;
    const className = sanitized.className || meta.defaults.className;

    const primaryCTA = {
        text: sanitized.primaryCTA?.text || meta.defaults.primaryCTA.text,
        href: sanitized.primaryCTA?.href || meta.defaults.primaryCTA.href,
        size: sanitized.primaryCTA?.size || meta.defaults.primaryCTA.size,
        icon: sanitized.primaryCTA?.icon
    };

    const hasSecondaryCTA = sanitized.secondaryCTA !== undefined || !('secondaryCTA' in sanitized);
    const secondaryCTA = hasSecondaryCTA ? {
        text: sanitized.secondaryCTA?.text || meta.defaults.secondaryCTA.text,
        href: sanitized.secondaryCTA?.href || meta.defaults.secondaryCTA.href,
        size: sanitized.secondaryCTA?.size || meta.defaults.secondaryCTA.size,
        icon: sanitized.secondaryCTA?.icon
    } : undefined;

    const videoSrc = sanitized.videoSrc || meta.defaults.videoSrc;
    const videoThumbnail = sanitized.videoThumbnail || meta.defaults.videoThumbnail;
    const videoAutoPlay = sanitized.videoAutoPlay !== undefined ? sanitized.videoAutoPlay : meta.defaults.videoAutoPlay;
    const videoLoop = sanitized.videoLoop !== undefined ? sanitized.videoLoop : meta.defaults.videoLoop;

    const styles = useComponentStyles(sanitized.colors, theme);
    const MotionWrapper = animated ? motion.div : 'div';

    return (
        <section
            style={styles as React.CSSProperties}
            className={`${meta.tokens.layout.section} ${className}`}
            data-testid="hero-section"
            role="banner"
            aria-label={meta.accessibility.screenReaderHints?.section || "Main hero content with left-aligned content above video"}
            id={uniqueId}
        >
            <div className={meta.tokens.layout.wrapper}>
                {/* Content Section - Left Aligned */}
                <div className={meta.tokens.layout.contentContainer}>
                    <div className={`${meta.tokens.spacing.containerX} ${meta.tokens.spacing.containerY}`}>
                        <MotionWrapper
                            className={`${meta.tokens.spacing.contentSpacing}`}
                            {...(animated ? getAnimationProps(fadeInUp, 0, 0.3, true) : {})}
                        >
                            <MotionWrapper
                                {...(animated ? getAnimationProps(fadeInUp, 0, 0, true) : {})}
                                data-testid="hero-title"
                            >
                                <h1
                                    className={meta.tokens.typography.heading.complete}
                                    style={{ color: 'var(--hero-title)' }}
                                >
                                    {title}
                                </h1>
                            </MotionWrapper>

                            <MotionWrapper
                                {...(animated ? getAnimationProps(fadeInUp, 0.1, 0, true) : {})}
                                data-testid="hero-description"
                            >
                                <p
                                    className={meta.tokens.typography.body.complete}
                                    style={{ color: 'var(--hero-desc)' }}
                                >
                                    {description}
                                </p>
                            </MotionWrapper>

                            <MotionWrapper
                                className={`${meta.tokens.responsive.flexDirection} ${meta.tokens.responsive.alignment} ${meta.tokens.spacing.buttonSpacing} ${meta.tokens.spacing.sectionSpacing}`}
                                {...(animated ? getAnimationProps(fadeInUp, 0.2, 0, true) : {})}
                                data-testid="hero-buttons"
                                role="group"
                                aria-label="Call to action buttons"
                            >
                                <ActionButton
                                    text={primaryCTA.text}
                                    href={primaryCTA.href}
                                    size={primaryCTA.size}
                                    icon={primaryCTA.icon}
                                    animated={animated}
                                    ariaLabel={`Primary action: ${primaryCTA.text}`}
                                    buttonType="primary"
                                />
                                {secondaryCTA && (
                                    <ActionButton
                                        text={secondaryCTA.text}
                                        href={secondaryCTA.href}
                                        size={secondaryCTA.size}
                                        icon={secondaryCTA.icon}
                                        animated={animated}
                                        ariaLabel={`Secondary action: ${secondaryCTA.text}`}
                                        buttonType="secondary"
                                    />
                                )}
                            </MotionWrapper>
                        </MotionWrapper>
                    </div>
                </div>

                {/* Video Section - Full Width Below */}
                <MotionWrapper
                    className={meta.tokens.layout.videoContainer}
                    {...(animated ? getAnimationProps(fadeIn, 0.3, 0.3, true) : {})}
                    data-testid="hero-video-container"
                >
                    <div className={meta.tokens.layout.videoWrapper}>
                        <VideoPlayer
                            videoSrc={videoSrc}
                            thumbnailSrc={videoThumbnail}
                            autoPlay={videoAutoPlay}
                            loop={videoLoop}
                            animated={animated}
                        />
                    </div>
                </MotionWrapper>
            </div>
        </section>
    );
};

Hero_25.displayName = 'Hero_25';

export default Hero_25;