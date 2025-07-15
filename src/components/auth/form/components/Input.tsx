// src/components/auth/form/components/Input.tsx

import React, { useState, type CSSProperties } from 'react';
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
  variant?: 'default' | 'outlined' | 'filled' | 'basic';
  className?: string;
  style?: CSSProperties;
  required?: boolean;
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
  style,
  required,
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
    'w-full rounded-lg text-para-md transition-all outline-none border px-md',
    {
      variants: {
        variant: {
          default:
            'bg-background-primary text-text-primary border-border-default focus:border-border-focus placeholder:text-text-secondary',
          outlined:
            'bg-transparent text-text-primary border-border-default focus:border-border-focus placeholder:text-text-secondary',
          filled:
            'bg-background-muted text-text-primary border-border-muted focus:border-border-focus placeholder:text-text-secondary',
          basic:
            'border transition-all outline-none', // No theme colors, just structure
        },
        error: {
          true: 'border-border-error focus:border-border-error',
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
        <label
          className={clsx(
            'block mb-xs text-para-sm',
            variant === 'basic' ? '' : 'text-text-secondary'
          )}
          style={variant === 'basic' ? style : undefined}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && variant !== 'basic' && (
          <div
            className={clsx(
              'absolute left-md top-1/2 transform -translate-y-1/2 transition-colors',
              isFocused
                ? 'text-accent-default'
                : 'text-text-tertiary'
            )}
          >
            {icon}
          </div>
        )}

        <input
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          type={inputType}
          name={name}
          value={value}
          required={required}
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
            inputVariants({ variant, error: !!error && variant !== 'basic' }),
            {
              'pl-10': icon && variant !== 'basic',
              'pr-10': type === 'password' && showPasswordToggle,
              'py-sm': true,
            },
            className
          )}
          style={variant === 'basic' ? style : undefined}
        />

        {type === 'password' && showPasswordToggle && (
          <div
            className={clsx(
              'absolute right-md top-1/2 transform -translate-y-1/2 cursor-pointer transition-colors',
              variant === 'basic'
                ? 'text-current opacity-60 hover:opacity-80'
                : 'text-text-tertiary hover:text-text-secondary'
            )}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>

      {error && variant !== 'basic' && (
        <p className="text-para-sm text-text-error mt-xs">{error}</p>
      )}
    </div>
  );
};

export default Input;