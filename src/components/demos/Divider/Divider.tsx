import { type FC } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const dividerStyles = cva(
    'border-none',
    {
        variants: {
            thickness: {
                sm: 'h-px',
                md: 'h-[3px]',
                lg: 'h-[5px]',
            },
            width: {
                full: 'w-full',
                md: 'max-w-md',
                lg: 'max-w-lg',
                content: 'w-auto',
                sm: "max-w-[70px]"
            },
            color: {
                primary: 'bg-background-primary',
                secondary: 'bg-background-secondary',
                muted: 'bg-background-muted',
                accent: 'bg-accent-default',
                success: 'bg-success',
                error: 'bg-error',
                warning: 'bg-warning',
                info: 'bg-info',
                dark: "bg-background-dark"
            },
            rounded: {
                true: 'rounded-full',
                false: 'rounded-none',
            },
            shadow: {
                true: 'shadow-[0_4px_20px_rgba(79,70,229,0.5)]',
                false: '',
            },
        },
        defaultVariants: {
            thickness: 'md',
            width: 'md',
            color: 'accent',
            rounded: true,
            shadow: false,
        },
    }
)

export type DividerProps = VariantProps<typeof dividerStyles> & {
    className?: string
}

export const Divider: FC<DividerProps> = ({
    thickness,
    width,
    color,
    rounded,
    shadow,
    className,
}) => (
    <hr
        className={clsx(
            dividerStyles({ thickness, width, color, rounded, shadow }),
            className
        )}
    />
)
