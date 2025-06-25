import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';

interface InputProps {
    label?: string;
    name?: string;
    type: 'text' | 'email' | 'password' | 'url';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    showPasswordToggle?: boolean;
    error?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyPress?: () => void;
    variant?: 'default' | 'outlined' | 'filled';
    className?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    type,
    value,
    onChange,
    onKeyPress,
    placeholder,
    icon,
    showPasswordToggle = false,
    error,
    onFocus,
    onBlur,
    variant = 'default',
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
        'w-full rounded-lg py-sm px-md transition-all outline-none border text-para-md',
        {
            variants: {
                variant: {
                    default: [
                        // Light mode
                        'bg-white text-gray-800 placeholder-gray-400 border-gray-300 focus:border-accent-default',
                        // Dark mode
                        'dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:border-gray-700 dark:focus:border-accent-default'
                    ].join(' '),
                    outlined: [
                        // Light mode
                        'bg-transparent text-gray-800 placeholder-gray-400 border-gray-400 focus:border-accent-default',
                        // Dark mode
                        'dark:bg-transparent dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-accent-default'
                    ].join(' '),
                    filled: [
                        // Light mode
                        'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200 focus:border-accent-default',
                        // Dark mode
                        'dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:border-gray-700 dark:focus:border-accent-default'
                    ].join(' '),
                },
                error: {
                    true: 'border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500',
                    false: '',
                },
            },
            defaultVariants: {
                variant: 'default',
                error: false,
            },
        }
    );

    return (
        <div className="w-full">
            {label && (
                <label className="block mb-xs text-para-sm text-gray-700 dark:text-gray-200">
                    {label}
                </label>
            )}

            <div className="relative flex items-center">
                {icon && (
                    <div
                        className={clsx(
                            "absolute left-md top-1/2 transform -translate-y-1/2 transition-colors",
                            isFocused ? "text-accent-default" : "text-gray-400 dark:text-gray-400"
                        )}
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
                    onKeyPress={onKeyPress}
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
                />

                {type === 'password' && showPasswordToggle && (
                    <div
                        className="absolute right-md top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-para-sm text-red-500 mt-xs">{error}</p>
            )}
        </div>
    );
};

export default Input;