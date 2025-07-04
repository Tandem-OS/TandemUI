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
        <label className="block mb-xs text-para-sm text-text-secondary">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <div
            className={clsx(
              'absolute left-md top-1/2 transform -translate-y-1/2 transition-colors',
              isFocused ? 'text-accent-default' : 'text-text-tertiary'
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
              'py-sm': true,
            },
            className
          )}
        />

        {type === 'password' && showPasswordToggle && (
          <div
            className="absolute right-md top-1/2 transform -translate-y-1/2 cursor-pointer text-text-tertiary hover:text-text-secondary transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>

      {error && (
        <p className="text-para-sm text-text-error mt-xs">{error}</p>
      )}
    </div>
  );
};

export default Input;
