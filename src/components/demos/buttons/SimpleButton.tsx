import { type FC, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const buttonStyles = cva(
    'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                solid: 'bg-accent-default hover:bg-accent-hover text-accent-foreground shadow-lg hover:shadow-xl',
                outline: 'border-2 border-accent-default text-accent-default hover:text-accent-foreground bg-transparent hover:bg-accent-default',
                ghost: 'bg-transparent text-accent-default hover:bg-accent-subtle',
            },
            shape: {
                rounded: 'rounded-lg',
                pill: 'rounded-full',
                square: 'rounded-none',
                circular: 'rounded-full aspect-square',
            },
            size: {
                // ✅ Each size is now inherently responsive.
                
                // Small size: Always stays small to be explicit.
                sm: 'py-xs px-sm text-btn-sm min-h-[2.25rem]',
                
                // Medium size: Starts small on mobile, becomes medium on tablets and up.
                md: 'py-xs px-sm text-btn-sm min-h-[2.25rem] sm:py-sm sm:px-md sm:text-btn-md sm:min-h-[2.75rem]',
                
                // Large size: Starts as medium on mobile/tablets, becomes large on desktops and up.
                lg: 'py-sm px-md text-btn-md min-h-[2.75rem] lg:py-md lg:px-lg lg:text-btn-lg lg:min-h-[3.25rem]',
            },
            fullWidth: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'solid',
            shape: 'rounded',
            size: 'md', // The default button is now responsive out-of-the-box
            fullWidth: false,
        },
    }
);

export type SimpleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonStyles> & {
        className?: string
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