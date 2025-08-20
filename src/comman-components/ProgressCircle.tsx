import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';

interface ProgressCircleProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

// Static size map outside component to prevent recreation
const SIZE_MAP = {
  sm: 40,
  md: 56,
  lg: 72
} as const;

const ProgressCircle: React.FC<ProgressCircleProps> = memo(({
  percentage,
  size = 'md',
  strokeWidth = 6,
  primaryColor = 'stroke-accent-default',
  secondaryColor = 'stroke-border-muted'
}) => {
  // Memoized calculations
  const dimension = useMemo(() => SIZE_MAP[size], [size]);
  const radius = useMemo(() => (dimension - strokeWidth * 2) / 2, [dimension, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  
  // Memoized stroke dash offset
  const targetStrokeDashoffset = useMemo(() => {
    return circumference - (percentage / 100) * circumference;
  }, [circumference, percentage]);

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
          animate={{ strokeDashoffset: targetStrokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-text-primary">{percentage}%</span>
      </div>
    </div>
  );
});

ProgressCircle.displayName = 'ProgressCircle';

export default ProgressCircle;