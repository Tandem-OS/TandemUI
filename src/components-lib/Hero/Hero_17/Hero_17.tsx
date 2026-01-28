import React, { useState, useRef, useMemo, useCallback, useId } from 'react';
import { motion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp } from '../../../lib/animations/variants';
import {
    type Hero_17Props,
    type ColorOverrides,
    type ColorValue,
    type ButtonColorOverride,
    type VideoPlayButtonColors
} from './Hero_17.types';
import {
    validateHero17Props,
    sanitizeProps,
    formatValidationMessage
} from './Hero_17.validators';
import meta from './Hero_17.meta';

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
    overlayOpacity: number | undefined,
    theme: 'light' | 'dark'
): Record<string, string> => {
    return useMemo(() => {
        const defaults = meta.defaults.colors;
        const getColor = (userValue: ColorValue | undefined, defaultValue: ColorValue): string => {
            const value = userValue || defaultValue;
            return theme === 'dark' ? value.dark : value.light;
        };

        const getButtonVars = (
            userButton: ButtonColorOverride | undefined,
            defaultButton: ButtonColorOverride,
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

        const getVideoPlayButtonVars = (
            userPlayButton: VideoPlayButtonColors | undefined,
            defaultPlayButton: VideoPlayButtonColors
        ) => {
            const playButton = userPlayButton || defaultPlayButton;
            return {
                '--video-play-bg': getColor(playButton.background, defaultPlayButton.background),
                '--video-play-bg-hover': getColor(playButton.backgroundHover, defaultPlayButton.backgroundHover),
                '--video-play-border': getColor(playButton.border, defaultPlayButton.border),
                '--video-play-icon': getColor(playButton.icon, defaultPlayButton.icon),
                '--video-play-icon-hover': getColor(playButton.iconHover, defaultPlayButton.iconHover),
            };
        };

        // Handle overlay - prefer colors.overlay over deprecated overlayOpacity
        const overlayColor = userColors?.overlay
            ? getColor(userColors.overlay, defaults.overlay)
            : `rgba(0, 0, 0, ${(overlayOpacity || 50) / 100})`;

        return {
            '--hero-overlay': overlayColor,
            '--hero-title': getColor(userColors?.title, defaults.title),
            '--hero-desc': getColor(userColors?.description, defaults.description),
            ...getButtonVars(userColors?.primaryButton, defaults.primaryButton, 'primary'),
            ...getButtonVars(userColors?.secondaryButton, defaults.secondaryButton, 'secondary'),
            ...getVideoPlayButtonVars(userColors?.videoPlayButton, defaults.videoPlayButton),
        };
    }, [userColors, overlayOpacity, theme]);
};

// Styled components - ONLY for hover states
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

const HoverVideoButton = styled(motion.button)`
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

// Video Play Button component
interface VideoPlayButtonProps {
    isPlaying: boolean;
    onClick: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'basic';
    animated?: boolean;
}

const VideoPlayButton: React.FC<VideoPlayButtonProps> = ({
    isPlaying,
    onClick,
    size = 'lg',
    variant = 'basic',
    animated = true
}) => {
    const baseClasses = meta.tokens.videoPlayButton.base;
    const sizeClasses = meta.tokens.videoPlayButton.sizes[size];
    const variantClasses = meta.tokens.videoPlayButton.variants[variant];
    const playIconClasses = meta.tokens.videoPlayButton.icon.play;
    const pauseIconClasses = meta.tokens.videoPlayButton.icon.pause;
    const iconContainerClasses = meta.tokens.videoPlayButton.animations.iconContainer;

    const buttonStyle: React.CSSProperties = {
        backgroundColor: 'var(--video-play-bg)',
        borderColor: 'var(--video-play-border)',
        color: 'var(--video-play-icon)',
    };

    // Animation props - conditional based on animated flag
    const buttonAnimationProps = animated ? {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        initial: { opacity: 1 },
        animate: { opacity: isPlaying ? 0.3 : 1 },
        transition: { duration: 0.3 }
    } : {};

    const iconAnimationProps = animated ? {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
        transition: { duration: 0.2 }
    } : {};

    return (
        <HoverVideoButton
            className={`${baseClasses} ${sizeClasses} ${variantClasses}`}
            style={buttonStyle}
            onClick={onClick}
            {...buttonAnimationProps}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            type="button"
        >
            <motion.div
                key={isPlaying ? 'pause' : 'play'}
                {...iconAnimationProps}
                className={iconContainerClasses}
            >
                {isPlaying ? (
                    <FaPause className={pauseIconClasses} />
                ) : (
                    <FaPlay className={playIconClasses} />
                )}
            </motion.div>
        </HoverVideoButton>
    );
};

// Main Hero_17 component
const Hero_17: React.FC<Hero_17Props> = (props = {}) => {
    const { theme } = useTheme();
    const uniqueId = useId();
    const videoRef = useRef<HTMLVideoElement>(null);

    const validation = validateHero17Props(props);
    const sanitized = sanitizeProps(props);

    if (process.env.NODE_ENV === 'development') {
        if (!validation.valid || validation.warnings) {
            console.group('Hero_17 Validation');
            console.log(formatValidationMessage(validation));
            console.groupEnd();
        }
    }

    const title = sanitized.title || meta.defaults.title;
    const description = sanitized.description || meta.defaults.description;
    const animated = sanitized.animated !== undefined ? sanitized.animated : meta.defaults.animated;
    const className = sanitized.className || meta.defaults.className;
    const overlayOpacity = sanitized.overlayOpacity !== undefined ? sanitized.overlayOpacity : meta.defaults.overlayOpacity;
    const videoAutoPlay = sanitized.videoAutoPlay !== undefined ? sanitized.videoAutoPlay : meta.defaults.videoAutoPlay;
    const videoLoop = sanitized.videoLoop !== undefined ? sanitized.videoLoop : meta.defaults.videoLoop;

    const [isPlaying, setIsPlaying] = useState(videoAutoPlay);

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
    const videoThumbnailSrc = typeof videoThumbnail === 'string' ? videoThumbnail : videoThumbnail.src;

    const styles = useComponentStyles(sanitized.colors, overlayOpacity, theme);
    const MotionWrapper = animated ? motion.div : 'div';

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

    // Auto play video on mount if enabled
    React.useEffect(() => {
        if (videoAutoPlay && videoRef.current) {
            videoRef.current.play().catch(() => {
                setIsPlaying(false);
            });
        }
    }, [videoAutoPlay]);

    return (
        <section
            style={styles as React.CSSProperties}
            className={`${meta.tokens.layout.section} ${className}`}
            data-testid="hero-section"
            role="banner"
            aria-label={meta.accessibility.screenReaderHints?.section || "Main hero content with video background, heading and actions positioned left center"}
            id={uniqueId}
        >
            {/* Background Video */}
            <div
                className={meta.tokens.layout.backgroundContainer}
                data-testid="hero-background"
            >
                <video
                    ref={videoRef}
                    className={meta.tokens.video.classes}
                    poster={videoThumbnailSrc}
                    loop={videoLoop}
                    muted={meta.tokens.video.attributes.muted}
                    playsInline={meta.tokens.video.attributes.playsInline}
                    onEnded={() => setIsPlaying(false)}
                    data-testid="hero-video"
                    role="presentation"
                    aria-hidden="true"
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Overlay */}
                <div
                    className={meta.tokens.layout.overlay}
                    style={{ backgroundColor: 'var(--hero-overlay)' }}
                    data-testid="hero-overlay"
                    role="presentation"
                    aria-hidden="true"
                />
            </div>

            {/* Video Play Button */}
            <div
                className={meta.tokens.layout.videoPlayButton}
                data-testid="hero-play-button"
            >
                <VideoPlayButton
                    isPlaying={isPlaying}
                    onClick={handlePlayPause}
                    size="lg"
                    variant="basic"
                    animated={animated}
                />
            </div>

            {/* Content Container */}
            <div className={`${meta.tokens.layout.contentContainer} ${meta.tokens.spacing.sectionY}`}>
                <div className={meta.tokens.layout.grid}>
                    {/* Left Column - Heading & CTAs at Center */}
                    <MotionWrapper
                        className={`${meta.tokens.layout.leftColumn} ${meta.tokens.spacing.leftPadding}`}
                        {...(animated ? getAnimationProps(fadeInUp, 0, 0.3, true) : {})}
                        data-testid="hero-left-column"
                    >
                        <MotionWrapper
                            className={meta.tokens.layout.leftContent}
                            {...(animated ? getAnimationProps(fadeInUp, 0, 0, true) : {})}
                        >
                            {/* Title */}
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

                            {/* CTA Buttons */}
                            <MotionWrapper
                                className={meta.tokens.spacing.buttonSpacing}
                                {...(animated ? getAnimationProps(fadeInUp, 0.1, 0, true) : {})}
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
                    </MotionWrapper>

                    {/* Right Column - Paragraph at Bottom */}
                    <div
                        className={meta.tokens.layout.rightColumn}
                        data-testid="hero-right-column"
                    >
                        <MotionWrapper
                            className={meta.tokens.layout.rightContent}
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
                    </div>
                </div>
            </div>
        </section>
    );
};

Hero_17.displayName = 'Hero_17';

export default Hero_17;