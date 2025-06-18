import { type FC, type ButtonHTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const buttonStyles = cva(
    'inline-flex items-center justify-center font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                solid: 'bg-accent-default hover:bg-accent-default-dark text-white shadow-lg hover:shadow-xl',
                outline: 'border-2 border-accent-default text-accent-default hover:text-white bg-transparent hover:bg-accent-default',
                ghost: 'bg-transparent text-accent-default hover:bg-accent-subtle',
            },
            shape: {
                rounded: 'rounded-lg',
                pill: 'rounded-full',
                square: 'rounded-none',
                circular: 'rounded-full aspect-square',
            },
            size: {
                sm: 'py-xs px-sm text-btn-sm min-h-[36px]',
                md: 'py-sm px-md text-btn-md min-h-[44px]',
                lg: 'py-md px-lg text-btn-lg min-h-[52px]',
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
)

export type SimpleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonStyles> & {
        className?: string
    }

const SimpleButton: FC<SimpleButtonProps> = ({
    variant = 'solid',
    shape = 'rounded',
    size = 'md',
    fullWidth = false,
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
)

export default SimpleButton