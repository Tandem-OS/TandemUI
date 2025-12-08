// src/comman-components/VideoPlayBtn.tsx

import React, { type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import clsx from 'clsx';

// Color types for VideoPlayBtn
type ColorValue = { light?: string; dark?: string };

interface VideoPlayBtnColors {
  background?: ColorValue;
  backgroundHover?: ColorValue;
  border?: ColorValue;
  icon?: ColorValue;
  iconHover?: ColorValue;
}

interface VideoPlayBtnProps {
  /** Play/Pause state */
  isPlaying: boolean;

  /** Click handler */
  onClick: () => void;

  /** Button size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Component variant */
  variant?: 'default' | 'basic';

  /** Custom colors for button */
  colors?: VideoPlayBtnColors;

  /** Theme for color resolution */
  theme?: 'light' | 'dark';

  /** Additional CSS classes */
  className?: string;
}

const VideoPlayBtn: React.FC<VideoPlayBtnProps> = ({
  isPlaying,
  onClick,
  size = 'lg',
  variant = 'default',
  colors,
  theme = 'light',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-icon-sm',
    md: 'w-16 h-16 text-icon-md',
    lg: 'w-20 h-20 text-icon-lg',
    xl: 'w-24 h-24 text-icon-xl'
  };

  const getColor = (config: ColorValue | undefined, fallback: string): string => {
    if (!config) return fallback;
    return (theme === 'dark' ? config.dark : config.light) ?? config.light ?? fallback;
  };

  // Custom styles for basic variant
  const customStyles: CSSProperties = variant === 'basic' && colors ? {
    backgroundColor: getColor(colors.background, 'rgba(255, 255, 255, 0.8)'),
    borderColor: getColor(colors.border, 'rgba(255, 255, 255, 0.3)'),
    color: getColor(colors.icon, theme === 'dark' ? '#f9fafb' : '#111827'),
  } : {};

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'basic' && colors) {
      const target = e.currentTarget.style;
      target.backgroundColor = getColor(colors.backgroundHover, customStyles.backgroundColor as string);
      target.color = getColor(colors.iconHover, customStyles.color as string);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'basic' && colors) {
      const target = e.currentTarget.style;
      target.backgroundColor = customStyles.backgroundColor as string;
      target.color = customStyles.color as string;
    }
  };

  return (
    <motion.button
      className={clsx(
        'relative flex items-center justify-center rounded-full',
        'border-2 transition-all duration-300',
        'focus:outline-none',
        {
          // Default variant styles
          'bg-background-primary/80 backdrop-blur-sm border-border-default/30 hover:bg-background-primary/90': variant === 'default',
          // Basic variant - no default styles, no shadow
          '': variant === 'basic',
        },
        sizeClasses[size],
        className
      )}
      style={variant === 'basic' ? customStyles : undefined}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isPlaying ? 0.3 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        key={isPlaying ? 'pause' : 'play'}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isPlaying ? (
          <FaPause className={clsx(
            'ml-0',
            variant === 'default' ? 'text-text-primary' : ''
          )} />
        ) : (
          <FaPlay className={clsx(
            'ml-1',
            variant === 'default' ? 'text-text-primary' : ''
          )} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default VideoPlayBtn;