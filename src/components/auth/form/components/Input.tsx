import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';

interface InputProps {
    label: string;
    name: string;
    type: 'text' | 'email' | 'password';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    showPasswordToggle?: boolean;
    error?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    variant?: 'default' | 'outlined' | 'filled';
    primaryColor?: string; // HEX
    className?: string;
}

// Helper for inline color (HEX)
const getInlineColor = (color?: string) =>
    color?.startsWith('#') ? color : undefined;

const Input: React.FC<InputProps> = ({
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
    icon,
    showPasswordToggle = false,
    error,
    onFocus,
    onBlur,
    variant = 'default',
    primaryColor = '#6366f1',
    className = '',
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType =
        type === 'password' && showPasswordToggle
            ? showPassword
                ? 'text'
                : 'password'
            : type;

    const inputVariants = cva(
        'w-full rounded-md py-2 px-3 transition-all outline-none border',
        {
            variants: {
                variant: {
                    default: 'bg-white text-gray-800 placeholder-gray-400 border-gray-300',
                    outlined: 'bg-transparent text-gray-100 placeholder-gray-400 border-gray-600',
                    filled: 'bg-gray-900 text-white placeholder-gray-400 border-gray-700',
                },
                error: {
                    true: 'border-red-500',
                    false: '',
                },
            },
            defaultVariants: {
                variant: 'default',
                error: false,
            },
        }
    );

    // Primary color styling (HEX only)
    const inlineBorderColor = getInlineColor(primaryColor);
    const inlineFocusBorder = isFocused && inlineBorderColor
        ? { borderColor: primaryColor }
        : {};

    const inlineIconColor = inlineBorderColor
        ? { color: primaryColor }
        : {};

    return (
        <div className="w-full">
            {label && (
                <label className="block mb-1 text-sm text-gray-200">
                    {label}
                </label>
            )}

            <div className="relative flex items-center">
                {icon && (
                    <div
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                        style={inlineIconColor}
                    >
                        {icon}
                    </div>
                )}

                <input
                    autoCorrect='off'
                    autoComplete='off'
                    autoCapitalize='off'
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => {
                        setIsFocused(true);
                        onFocus?.();
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur?.();
                    }}
                    placeholder={placeholder}
                    className={clsx(
                        inputVariants({ variant, error: !!error }),
                        {
                            'pl-10': icon,
                            'pr-10': type === 'password' && showPasswordToggle,
                        },
                        className
                    )}
                    style={error ? undefined : inlineFocusBorder}
                />

                {type === 'password' && showPasswordToggle && (
                    <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        style={inlineIconColor}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
