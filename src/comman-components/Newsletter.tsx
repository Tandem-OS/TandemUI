// Newsletter.tsx
import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import Input from '../components/auth/form/components/Input';
import FormButton from '../components/auth/form/components/FormButton';

interface NewsletterProps {
    /** Placeholder text for email input */
    placeholder?: string;

    /** Button text */
    buttonText?: string;

    /** Newsletter disclaimer/message text */
    message?: string;

    /** Newsletter variant */
    variant?: 'default' | 'outlined' | 'filled';

    /** Enable animations */
    animated?: boolean;

    /** Callback on form submit */
    onSubmit?: (email: string) => void;

    /** Additional CSS classes */
    className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({
    placeholder = "Enter your email",
    buttonText = "Sign up",
    message = "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    variant = 'filled',
    className = ''
}) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Sirf UI demo ke liye - no actual submission
        console.log('you hae subscribed Thanks' + email);
    };

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
                            placeholder={placeholder}
                            icon={<FaEnvelope />}
                            variant={variant}
                            className="w-full md:py-2.5 border-border-dark"
                        />
                    </div>

                    <FormButton
                        type="submit"
                        variant="solid"
                        size="md"
                        className="w-full sm:w-auto"
                    >
                        {buttonText}
                    </FormButton>
                </div>

                {message && (
                    <p className="text-para-xs text-text-tertiary">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Newsletter;