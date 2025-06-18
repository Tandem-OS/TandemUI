import React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ElementType } from 'react'
import clsx from 'clsx'

const headingStyles = cva(
    'leading-tight text-left',
    {
        variants: {
            level: {
                h1: 'text-h1-sm sm:text-h1-md md:text-h1-lg',
                h2: 'text-h2-sm sm:text-h2-md md:text-h2-lg',
                h3: 'text-h3-sm sm:text-h3-md md:text-h3-lg',
                h4: 'text-h4-sm sm:text-h4-md md:text-h4-lg',
                h5: 'text-h5-sm sm:text-h5-md md:text-h5-lg',
                h6: 'text-h6-sm sm:text-h6-md md:text-h6-lg',
            },
            color: {
                primary: 'text-text-primary',
                secondary: 'text-text-secondary',
                tertiary: 'text-text-tertiary',
                accent: 'text-accent-default',
            },
            align: {
                left: 'text-left',
                center: 'text-center',
                right: 'text-right',
            },
            weight: {
                light: 'font-light',
                normal: 'font-normal',
                bold: 'font-bold',
                extrabold: 'font-extrabold',
                semiBold: "font-semibold"
            },
        },
        defaultVariants: {
            level: 'h1',
            color: 'primary',
            align: 'left',
            weight: 'bold',
        },
    }
)

export type HeadingProps = React.PropsWithChildren<
    VariantProps<typeof headingStyles> & {
        className?: string
    }
>

const Heading: React.FC<HeadingProps> = ({
    level = 'h1',
    color = 'primary',
    align = 'left',
    weight = 'bold',
    className,
    children,
}) => {
    const Tag = level as ElementType

    return (
        <Tag
            className={clsx(
                headingStyles({ level, color, align, weight }),
                className
            )}
        >
            {children}
        </Tag>
    )
}

export default Heading