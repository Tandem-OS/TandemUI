import { type FC, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const buttonStyles = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        solid:
          'bg-accent-default hover:bg-accent-hover text-accent-foreground shadow-lg hover:shadow-xl',
        outline:
          'border-2 border-accent-default text-accent-default hover:text-accent-foreground bg-transparent hover:bg-accent-default',
        ghost:
          'bg-transparent text-accent-default hover:bg-accent-subtle',
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
  };

const SimpleButton: FC<SimpleButtonProps> = ({
  variant,
  shape,
  size,
  fullWidth,
  className,
  children,
  ...rest
}) => (
  <button
    className={clsx(
      buttonStyles({ variant, shape, size, fullWidth }),
      className
    )}
    {...rest}
  >
    {children}
  </button>
);

export default SimpleButton;
