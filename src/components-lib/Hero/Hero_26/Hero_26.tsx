import React, { useMemo, useId, useState, useRef, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import { FaPlay, FaPause } from 'react-icons/fa';
import {
    type Hero_26Props,
    type ColorOverrides,
    type ColorValue,
    type NewsletterColorOverride,
    type VideoColorOverride
} from './Hero_26.types';
import {
    validateHero26Props,
    sanitizeProps,
    formatValidationMessage
} from './Hero_26.validators';
import meta from './Hero_26.meta';

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

        const getNewsletterVars = (
            userNewsletter: NewsletterColorOverride | undefined,
            defaultNewsletter: NewsletterColorOverride
        ) => {
            const newsletter = userNewsletter || defaultNewsletter;
            return {
                '--newsletter-input-bg': getColor(newsletter.input?.background, defaultNewsletter.input.background),
                '--newsletter-input-text': getColor(newsletter.input?.text, defaultNewsletter.input.text),
                '--newsletter-input-border': getColor(newsletter.input?.border, defaultNewsletter.input.border),
                '--newsletter-input-focus-border': getColor(newsletter.input?.focusBorder, defaultNewsletter.input.focusBorder),
                '--newsletter-input-placeholder': getColor(newsletter.input?.placeholder, defaultNewsletter.input.placeholder),
                '--newsletter-btn-bg': getColor(newsletter.button?.background, defaultNewsletter.button.background),
                '--newsletter-btn-text': getColor(newsletter.button?.text, defaultNewsletter.button.text),
                '--newsletter-btn-border': getColor(newsletter.button?.border, defaultNewsletter.button.border),
                '--newsletter-btn-hover-bg': getColor(newsletter.button?.hover?.background, defaultNewsletter.button.hover.background),
                '--newsletter-btn-hover-text': getColor(newsletter.button?.hover?.text, defaultNewsletter.button.hover.text),
                '--newsletter-btn-hover-border': getColor(newsletter.button?.hover?.border, defaultNewsletter.button.hover.border),
                '--newsletter-message-text': getColor(newsletter.message, defaultNewsletter.message),
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
            ...getNewsletterVars(userColors?.newsletter, defaults.newsletter),
            ...getVideoVars(userColors?.video, defaults.video),
        };
    }, [userColors, theme]);
};

// Styled components - ONLY for hover and focus states
const HoverButton = styled.button`
    &:hover:not(:disabled) {
        background-color: var(--newsletter-btn-hover-bg) !important;
        color: var(--newsletter-btn-hover-text) !important;
        border-color: var(--newsletter-btn-hover-border) !important;
    }
`;

const FocusInput = styled.input`
    &:focus {
        border-color: var(--newsletter-input-focus-border) !important;
        outline: none;
    }
    &::placeholder {
        color: var(--newsletter-input-placeholder) !important;
    }
`;

const VideoPlayButton = styled(motion.button)`
    &:hover:not(:disabled) {
        background-color: var(--video-play-bg-hover) !important;
        color: var(--video-play-icon-hover) !important;
    }
`;

// Newsletter component
interface NewsletterProps {
    placeholder: string;
    buttonText: string;
    message: string;
    animated?: boolean;
}

const Newsletter: React.FC<NewsletterProps> = ({
    placeholder,
    buttonText,
    message,
    animated = true
}) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsLoading(true);
        try {
            // Default behavior - just log
            console.log('Newsletter subscription:', email);
            setEmail(''); // Clear on success
        } catch (error) {
            console.error('Newsletter submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: 'var(--newsletter-input-bg)',
        color: 'var(--newsletter-input-text)',
        borderColor: 'var(--newsletter-input-border)',
        borderWidth: meta.tokens.newsletter.input.borderWidth,
        borderStyle: meta.tokens.newsletter.input.borderStyle,
    };

    const buttonStyle: React.CSSProperties = {
        backgroundColor: 'var(--newsletter-btn-bg)',
        color: 'var(--newsletter-btn-text)',
        borderColor: 'var(--newsletter-btn-border)',
        borderWidth: meta.tokens.newsletter.button.borderWidth,
        borderStyle: meta.tokens.newsletter.button.borderStyle,
    };

    return (
        <div className={meta.tokens.newsletter.container}>
            <form onSubmit={handleSubmit} className={meta.tokens.newsletter.form}>
                <div className={meta.tokens.newsletter.inputGroup}>
                    <div className={meta.tokens.newsletter.inputWrapper}>
                        <FocusInput
                            type="email"
                            name="newsletter-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={placeholder}
                            className={meta.tokens.newsletter.input.classes}
                            style={inputStyle}
                            required
                            aria-label="Email address for newsletter"
                        />
                    </div>

                    <HoverButton
                        type="submit"
                        className={`${meta.tokens.newsletter.button.classes} ${animated ? meta.tokens.effects.button : 'transition-none'}`}
                        style={buttonStyle}
                        disabled={isLoading}
                        aria-label={`Subscribe to newsletter: ${buttonText}`}
                    >
                        {isLoading ? 'Signing up...' : buttonText}
                    </HoverButton>
                </div>

                {message && (
                    <p
                        className={meta.tokens.newsletter.message.classes}
                        style={{ color: 'var(--newsletter-message-text)' }}
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
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

// Main Hero_26 component
const Hero_26: React.FC<Hero_26Props> = (props = {}) => {
    const { theme } = useTheme();
    const uniqueId = useId();

    const validation = validateHero26Props(props);
    const sanitized = sanitizeProps(props);

    if (process.env.NODE_ENV === 'development') {
        if (!validation.valid || validation.warnings) {
            console.group('Hero_26 Validation');
            console.log(formatValidationMessage(validation));
            console.groupEnd();
        }
    }

    const title = sanitized.title || meta.defaults.title;
    const description = sanitized.description || meta.defaults.description;
    const animated = sanitized.animated !== undefined ? sanitized.animated : meta.defaults.animated;
    const className = sanitized.className || meta.defaults.className;

    const newsletterPlaceholder = sanitized.newsletterPlaceholder || meta.defaults.newsletterPlaceholder;
    const newsletterButtonText = sanitized.newsletterButtonText || meta.defaults.newsletterButtonText;
    const newsletterMessage = sanitized.newsletterMessage || meta.defaults.newsletterMessage;

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
            aria-label={meta.accessibility.screenReaderHints?.section || "Main hero content with left-aligned content and newsletter above video"}
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

                            {/* Description */}
                            <MotionWrapper
                                {...(animated ? getAnimationProps(fadeInUp, 0.05, 0, true) : {})}
                                data-testid="hero-description"
                            >
                                <p
                                    className={meta.tokens.typography.body.complete}
                                    style={{ color: 'var(--hero-desc)' }}
                                >
                                    {description}
                                </p>
                            </MotionWrapper>

                            {/* Newsletter Form */}
                            <MotionWrapper
                                className={meta.tokens.spacing.newsletterSpacing}
                                {...(animated ? getAnimationProps(fadeInUp, 0.1, 0, true) : {})}
                                data-testid="hero-newsletter"
                                role="complementary"
                                aria-label="Newsletter signup form"
                            >
                                <Newsletter
                                    placeholder={newsletterPlaceholder}
                                    buttonText={newsletterButtonText}
                                    message={newsletterMessage}
                                    animated={animated}
                                />
                            </MotionWrapper>
                        </MotionWrapper>
                    </div>
                </div>

                {/* Video Section - Full Width Below */}
                <MotionWrapper
                    className={meta.tokens.layout.videoContainer}
                    {...(animated ? getAnimationProps(fadeIn, 0.2, 0.3, true) : {})}
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

Hero_26.displayName = 'Hero_26';

export default Hero_26;