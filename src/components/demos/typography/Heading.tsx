import React, { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ElementType, HTMLAttributes } from 'react'
import clsx from 'clsx'

const headingStyles = cva(
    'leading-tight text-left',
    {
        variants: {
            level: {
                h1: 'text-h1-md sm:text-h1-lg',
                h2: 'text-h2-md sm:text-h2-lg',
                h3: 'text-h3-md sm:text-h3-lg',
                h4: 'text-h4-md sm:text-h4-lg',
                h5: 'text-h5-md sm:text-h5-lg',
                h6: 'text-h6-md sm:text-h6-lg',
            },
            color: {
                primary: 'text-text-primary',
                secondary: 'text-text-secondary',
                tertiary: 'text-text-tertiary',
                accent: 'text-accent-default',
                light: 'text-text-light',
                lightSecondary: 'text-text-lightSecondary',
                success: 'text-text-success',
                error: 'text-text-error',
                warning: 'text-text-warning',
                info: 'text-text-info',
            },
            align: {
                left: 'text-left',
                center: 'text-center',
                right: 'text-right',
            },
            weight: {
                light: 'font-light',
                normal: 'font-normal',
                medium: 'font-medium',
                semibold: 'font-semibold',
                bold: 'font-bold',
                extrabold: 'font-extrabold',
            },
        },
        defaultVariants: {
            level: 'h1',
            color: 'primary',
            align: 'left',
            weight: 'bold',
        },
    }
);


export type HeadingProps = React.PropsWithChildren<
    VariantProps<typeof headingStyles> &
    HTMLAttributes<HTMLHeadingElement> & {
        className?: string
    }
>

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ level = 'h1', color = 'primary', align = 'left', weight = 'bold', className, children, ...rest }, ref) => {
        const Tag = level as ElementType

        return (
            <Tag
                ref={ref}
                className={clsx(headingStyles({ level, color, align, weight }), className)}
                {...rest}
            >
                {children}
            </Tag>
        )
    }
)

Heading.displayName = 'Heading'
export default Heading