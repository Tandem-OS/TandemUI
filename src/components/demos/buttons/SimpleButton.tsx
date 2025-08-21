// src/components/demos/buttons/SimpleButton.tsx

import {
  type FC,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useMemo,
  memo
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const buttonStyles = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed leading-none',
  {
    variants: {
      variant: {
        solid:
          'bg-accent-default hover:bg-accent-hover text-accent-foreground shadow-lg hover:shadow-xl',
        outline:
          'border-2 border-accent-default text-accent-default hover:text-accent-foreground bg-transparent hover:bg-accent-default',
        ghost:
          'bg-transparent text-accent-default hover:bg-accent-subtle',
        // 'basic' variant is for structural styling only, colors are controlled externally.
        basic:
          'border-2 transition-all duration-200 cursor-pointer',
      },
      shape: {
        rounded: 'rounded-lg',
        pill: 'rounded-full',
        square: 'rounded-none',
        circular: 'rounded-full aspect-square',
      },
      size: {
        sm: 'h-[2.25rem] px-sm text-btn-sm',
        md: 'h-[2.75rem] px-sm text-btn-sm sm:px-md sm:text-btn-md',
        lg: 'h-[3.25rem] px-md text-btn-md lg:px-lg lg:text-btn-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'solid',
      shape: 'rounded',
      size: 'md',
      fullWidth: false,
    },
  }
);

export type SimpleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    className?: string;
    style?: CSSProperties;
    linkTo?: string;
    icon?: ReactNode;
  };

const SimpleButton: FC<SimpleButtonProps> = ({
  variant,
  shape,
  size,
  fullWidth,
  className,
  style,
  children,
  linkTo,
  icon,
  onClick,
  ...rest
}) => {
  const navigate = useNavigate();

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onClick) {
      onClick(event as React.MouseEvent<HTMLButtonElement>);
    }
    if (linkTo?.startsWith('/')) {
      event.preventDefault();
      navigate(linkTo);
    }
  }, [onClick, linkTo, navigate]);

  const buttonContent = useMemo(() => (
    <>
      {children}
      {icon && <span className="ml-2 flex-shrink-0">{icon}</span>}
    </>
  ), [children, icon]);

  const classes = useMemo(() => clsx(
    buttonStyles({ variant, shape, size, fullWidth }),
    className,
    icon && 'flex items-center justify-center'
  ), [variant, shape, size, fullWidth, className, icon]);

  if (linkTo) {
    const isExternal = !linkTo.startsWith('/');
    return (
      <a
        href={linkTo}
        className={classes}
        style={style}
        onClick={handleClick}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...rest as React.AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      className={classes}
      style={style}
      onClick={handleClick}
      {...rest}
    >
      {buttonContent}
    </button>
  );
};

export default memo(SimpleButton);