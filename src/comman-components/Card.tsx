import React, { type ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
    children: ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'md',
}) => {
    const paddingClasses = {
        none: '',
        sm: 'p-sm',
        md: 'p-md',
        lg: 'p-lg',
        xl: 'p-xl',
    };

    return (
        <div
            className={clsx(
                'bg-background-primary rounded-2xl shadow-sm border border-border-default',
                paddingClasses[padding],
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;
