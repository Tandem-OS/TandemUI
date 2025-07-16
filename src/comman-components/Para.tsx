// src/components/reusable/Para.tsx

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const paraStyles = cva(
  'leading-relaxed', 
  {
    variants: {
      size: {
        xs: 'text-para-xs',
        sm: 'text-para-sm', 
        md: 'text-para-md',
        lg: 'text-para-lg',
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
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'secondary',
      weight: 'normal',
    },
  }
);

export type ParaProps = React.PropsWithChildren<
  VariantProps<typeof paraStyles> &
  React.HTMLAttributes<HTMLParagraphElement> & {
    className?: string;
  }
>;

const Para = forwardRef<HTMLParagraphElement, ParaProps>(
  ({ size, color, align, weight, className, children, ...rest }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx(paraStyles({ size, color, align, weight }), className)}
        {...rest}
      >
        {children}
      </p>
    );
  }
);

Para.displayName = 'Para';
export default Para;