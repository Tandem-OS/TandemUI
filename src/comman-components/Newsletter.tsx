import React, { useState, useCallback, useMemo, memo, type CSSProperties } from 'react';
import Input from '../components/auth/form/components/Input';
import FormButton from '../components/auth/form/components/FormButton';

// Color types for Newsletter component
type ColorValue = { light?: string; dark?: string };

interface NewsletterColors {
    input?: {
        background?: ColorValue;
        text?: ColorValue;
        border?: ColorValue;
        focusBorder?: ColorValue;
        placeholder?: ColorValue;
    };
    button?: {
        background?: ColorValue;
        text?: ColorValue;
        border?: ColorValue;
        hover?: {
            background?: ColorValue;
            text?: ColorValue;
            border?: ColorValue;
        };
    };
    message?: ColorValue;
}

interface NewsletterProps {
    /** Placeholder text for email input */
    placeholder?: string;

    /** Button text */
    buttonText?: string;

    /** Newsletter disclaimer/message text */
    message?: string;

    /** Enable animations */
    animated?: boolean;

    /** Callback on form submit */
    onSubmit?: (email: string) => void;

    /** Additional CSS classes */
    className?: string;

    /** Custom colors for newsletter */
    colors?: NewsletterColors;

    /** Theme for color resolution */
    theme?: 'light' | 'dark';
}

const Newsletter: React.FC<NewsletterProps> = memo(({
    placeholder = "Enter your email",
    buttonText = "Sign up",
    message = "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    onSubmit,
    className = '',
    colors,
    theme = 'light'
}) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    // Memoized color getter
    const getColor = useCallback((config: ColorValue | undefined, fallback: string): string => {
        if (!config) return fallback;
        return (theme === 'dark' ? config.dark : config.light) ?? config.light ?? fallback;
    }, [theme]);

    // Memoized styles
    const styles = useMemo(() => {
        // Input styles with focus support
        const inputStyles: CSSProperties = colors ? {
            backgroundColor: getColor(colors.input?.background, theme === 'dark' ? '#1f2937' : '#ffffff'),
            color: getColor(colors.input?.text, theme === 'dark' ? '#f9fafb' : '#111827'),
            borderColor: isFocused
                ? getColor(colors.input?.focusBorder, getColor(colors.input?.border, theme === 'dark' ? '#4f46e5' : '#3b82f6'))
                : getColor(colors.input?.border, theme === 'dark' ? '#374151' : '#d1d5db'),
            borderWidth: '1px',
            borderStyle: 'solid',
        } : {};

        // Button styles - including hover state
        const buttonBaseStyles: CSSProperties = colors ? {
            backgroundColor: getColor(colors.button?.background, '#4f46e5'),
            color: getColor(colors.button?.text, '#ffffff'),
            borderColor: getColor(colors.button?.border, '#4f46e5'),
            borderWidth: '2px',
            borderStyle: 'solid',
        } : {};

        const buttonHoverStyles: CSSProperties = colors?.button?.hover ? {
            backgroundColor: getColor(colors.button.hover.background, buttonBaseStyles.backgroundColor as string),
            color: getColor(colors.button.hover.text, buttonBaseStyles.color as string),
            borderColor: getColor(colors.button.hover.border, buttonBaseStyles.borderColor as string),
            borderWidth: '2px',
            borderStyle: 'solid',
        } : buttonBaseStyles;

        const buttonStyles = isButtonHovered && colors?.button?.hover ? buttonHoverStyles : buttonBaseStyles;

        // Message styles
        const messageStyles: CSSProperties = colors ? {
            color: getColor(colors.message, theme === 'dark' ? '#9ca3af' : '#6b7280'),
        } : {};

        return {
            input: inputStyles,
            button: buttonStyles,
            message: messageStyles
        };
    }, [colors, theme, isFocused, isButtonHovered, getColor]);

    // Memoized callbacks
    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleButtonMouseEnter = useCallback(() => {
        if (colors?.button?.hover) {
            setIsButtonHovered(true);
        }
    }, [colors?.button?.hover]);

    const handleButtonMouseLeave = useCallback(() => {
        if (colors?.button?.hover) {
            setIsButtonHovered(false);
        }
    }, [colors?.button?.hover]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsLoading(true);
        try {
            if (onSubmit) {
                await onSubmit(email);
            } else {
                // Default behavior - just log
                console.log('Newsletter subscription:', email);
            }
            setEmail(''); // Clear on success
        } catch (error) {
            console.error('Newsletter submission error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [email, onSubmit]);

    // Memoized component props
    const inputVariant = useMemo(() => colors ? 'basic' : 'filled', [colors]);
    const buttonVariant = useMemo(() => colors ? 'basic' : 'solid', [colors]);
    const messageClassName = useMemo(() => `text-para-xs ${colors ? '' : 'text-text-tertiary'}`, [colors]);

    return (
        <div className={`w-full ${className}`}>
            <form onSubmit={handleSubmit} className="space-y-md">
                <div className="flex flex-col sm:flex-row gap-sm">
                    <div className="flex-1">
                        <Input
                            type="email"
                            name="newsletter-email"
                            value={email}
                            onChange={handleEmailChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            placeholder={placeholder}
                            variant={inputVariant}
                            className="w-full min-h-[2.75rem]"
                            style={styles.input}
                            required
                        />
                    </div>

                    <FormButton
                        type="submit"
                        variant={buttonVariant}
                        size="md"
                        className="w-full sm:w-auto min-h-[2.75rem]"
                        style={styles.button}
                        isLoading={isLoading}
                        onMouseEnter={handleButtonMouseEnter}
                        onMouseLeave={handleButtonMouseLeave}
                    >
                        {buttonText}
                    </FormButton>
                </div>

                {message && (
                    <p
                        className={messageClassName}
                        style={styles.message}
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
});

Newsletter.displayName = 'Newsletter';

export default Newsletter;