// src/common-components/ProgressCircle.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressCircleProps {
    percentage: number;
    size?: 'sm' | 'md' | 'lg';
    strokeWidth?: number;
    primaryColor?: string;
    secondaryColor?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
    percentage,
    size = 'md',
    strokeWidth = 6,
    primaryColor = 'stroke-accent-default',
    secondaryColor = 'stroke-slate-200 dark:stroke-slate-700'
}) => {
    const sizeMap = {
        sm: 40,
        md: 56,
        lg: 72
    };

    const dimension = sizeMap[size];
    const radius = (dimension - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                className="transform -rotate-90"
                width={dimension}
                height={dimension}
            >
                <circle
                    cx={dimension / 2}
                    cy={dimension / 2}
                    r={radius}
                    className={secondaryColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <motion.circle
                    cx={dimension / 2}
                    cy={dimension / 2}
                    r={radius}
                    className={primaryColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-para-sm font-medium text-slate-900 dark:text-white">
                    {percentage}%
                </span>
            </div>
        </div>
    );
};

export default ProgressCircle;