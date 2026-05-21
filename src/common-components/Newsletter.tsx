// src/comman-components/Newsletter.tsx

import React, { useState, type CSSProperties } from 'react';
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

const Newsletter: React.FC<NewsletterProps> = ({
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

    const getColor = (config: ColorValue | undefined, fallback: string): string => {
        if (!config) return fallback;
        return (theme === 'dark' ? config.dark : config.light) ?? config.light ?? fallback;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsLoading(true);
        try {
            if (onSubmit) {
                await onSubmit(email);
            }
            setEmail(''); // Clear on success
        } catch {
            // Submission error — handle silently
        } finally {
            setIsLoading(false);
        }
    };

    const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, isHovering: boolean) => {
        if (!colors?.button?.hover) return;

        const target = e.currentTarget.style;

        if (isHovering) {
            target.backgroundColor = getColor(colors.button.hover.background, target.backgroundColor);
            target.color = getColor(colors.button.hover.text, target.color);
            target.borderColor = getColor(colors.button.hover.border, target.borderColor);
        } else {
            target.backgroundColor = getColor(colors.button?.background, '#4f46e5');
            target.color = getColor(colors.button?.text, '#ffffff');
            target.borderColor = getColor(colors.button?.border, '#4f46e5');
        }
    };

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

    // Button styles
    const buttonStyles: CSSProperties = colors ? {
        backgroundColor: getColor(colors.button?.background, '#4f46e5'),
        color: getColor(colors.button?.text, '#ffffff'),
        borderColor: getColor(colors.button?.border, '#4f46e5'),
        borderWidth: '2px',
        borderStyle: 'solid',
    } : {};

    // Message styles
    const messageStyles: CSSProperties = colors ? {
        color: getColor(colors.message, theme === 'dark' ? '#9ca3af' : '#6b7280'),
    } : {};

    return (
        <div className={`w-full ${className}`}>
            <form onSubmit={handleSubmit} className="space-y-md">
                <div className="flex flex-col sm:flex-row gap-sm">
                    <div className="flex-1">
                        <Input
                            type="email"
                            name="newsletter-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder={placeholder}
                            variant={colors ? 'basic' : 'filled'}
                            className="w-full min-h-[2.75rem]"
                            style={inputStyles}
                            required
                        />
                    </div>

                    <FormButton
                        type="submit"
                        variant={colors ? 'basic' : 'solid'}
                        size="md"
                        className="w-full sm:w-auto min-h-[2.75rem]"
                        style={buttonStyles}
                        isLoading={isLoading}
                        onMouseEnter={colors ? (e) => handleButtonHover(e, true) : undefined}
                        onMouseLeave={colors ? (e) => handleButtonHover(e, false) : undefined}
                    >
                        {buttonText}
                    </FormButton>
                </div>

                {message && (
                    <p
                        className={`text-para-xs ${colors ? '' : 'text-text-tertiary'}`}
                        style={messageStyles}
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Newsletter;
