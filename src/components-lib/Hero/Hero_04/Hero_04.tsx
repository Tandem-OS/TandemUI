import React, { useMemo, useId, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import {
    type Hero_04Props,
    type ColorOverrides,
    type ColorValue,
    type NewsletterColorOverride
} from './Hero_04.types';
import {
    validateHero04Props,
    sanitizeProps,
    formatValidationMessage
} from './Hero_04.validators';
import meta from './Hero_04.meta';

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
        return {
            '--hero-bg': getColor(userColors?.background, defaults.background),
            '--hero-title': getColor(userColors?.title, defaults.title),
            '--hero-desc': getColor(userColors?.description, defaults.description),
            ...getNewsletterVars(userColors?.newsletter, defaults.newsletter),
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

// Main Hero_04 component
const Hero_04: React.FC<Hero_04Props> = (props = {}) => {
    const { theme } = useTheme();
    const uniqueId = useId();

    const validation = validateHero04Props(props);
    const sanitized = sanitizeProps(props);

    if (process.env.NODE_ENV === 'development') {
        if (!validation.valid || validation.warnings) {
            console.group('Hero_04 Validation');
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

    const image = sanitized.image || meta.defaults.image;
    const imageSrc = typeof image === 'string' ? image : image.src;
    const imageAlt = typeof image === 'object' ? (image.alt || meta.defaults.imageAlt) : meta.defaults.imageAlt;

    const styles = useComponentStyles(sanitized.colors, theme);
    const MotionWrapper = animated ? motion.div : 'div';

    return (
        <section
            style={styles as React.CSSProperties}
            className={`${meta.tokens.layout.section} ${className}`}
            data-testid="hero-section"
            role="banner"
            aria-label={meta.accessibility.screenReaderHints?.section || "Main hero content with newsletter signup"}
            id={uniqueId}
        >
            <div className={meta.tokens.layout.wrapper}>
                <div
                    className={meta.tokens.layout.grid}
                    style={{ backgroundColor: 'var(--hero-bg)' }}
                >
                    {/* Image Column - LEFT SIDE */}
                    <div className={meta.tokens.layout.imageColumn}>
                        <MotionWrapper
                            className={meta.tokens.layout.imageContainer}
                            {...(animated ? getAnimationProps(fadeIn, 0, 0.3, true) : {})}
                            data-testid="hero-image-container"
                        >
                            <img
                                src={imageSrc}
                                alt={imageAlt || meta.accessibility.screenReaderHints?.image || "decorative"}
                                className={meta.tokens.image.classes}
                                loading={meta.tokens.image.loading as "lazy" | "eager"}
                                data-testid="hero-image"
                                role="presentation"
                                aria-hidden={!imageAlt}
                            />
                        </MotionWrapper>
                    </div>

                    {/* Content Column - RIGHT SIDE */}
                    <MotionWrapper
                        className={`${meta.tokens.layout.contentColumn} ${meta.tokens.spacing.containerX} ${meta.tokens.spacing.containerY}`}
                        {...(animated ? getAnimationProps(fadeInUp, 0, 0.3, true) : {})}
                    >
                        <div className={`${meta.tokens.layout.contentContainer} ${meta.tokens.spacing.contentSpacing}`}>
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
                                {...(animated ? getAnimationProps(fadeInUp, 0.2, 0, true) : {})}
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
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
};

Hero_04.displayName = 'Hero_04';

export default Hero_04;