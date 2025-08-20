import React, { type CSSProperties, useMemo, useCallback, memo } from 'react';
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

// Static size map
const SIZE_CLASSES = {
  sm: 'w-12 h-12 text-icon-sm',
  md: 'w-16 h-16 text-icon-md',
  lg: 'w-20 h-20 text-icon-lg',
  xl: 'w-24 h-24 text-icon-xl'
} as const;

const VideoPlayBtn: React.FC<VideoPlayBtnProps> = memo(({
  isPlaying,
  onClick,
  size = 'lg',
  variant = 'default',
  colors,
  theme = 'light',
  className = ''
}) => {
  // Memoized color getter
  const getColor = useCallback((config: ColorValue | undefined, fallback: string): string => {
    if (!config) return fallback;
    return (theme === 'dark' ? config.dark : config.light) ?? config.light ?? fallback;
  }, [theme]);

  // Memoized custom styles
  const customStyles = useMemo<CSSProperties>(() => {
    if (variant !== 'basic' || !colors) return {};

    return {
      backgroundColor: getColor(colors.background, 'rgba(255, 255, 255, 0.8)'),
      borderColor: getColor(colors.border, 'rgba(255, 255, 255, 0.3)'),
      color: getColor(colors.icon, theme === 'dark' ? '#f9fafb' : '#111827'),
    };
  }, [variant, colors, theme, getColor]);

  // Memoized hover styles
  const hoverStyles = useMemo(() => {
    if (variant !== 'basic' || !colors) return null;

    return {
      backgroundColor: getColor(colors.backgroundHover, customStyles.backgroundColor as string),
      color: getColor(colors.iconHover, customStyles.color as string)
    };
  }, [variant, colors, customStyles, getColor]);

  // Memoized event handlers
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (hoverStyles) {
      const target = e.currentTarget.style;
      target.backgroundColor = hoverStyles.backgroundColor;
      target.color = hoverStyles.color;
    }
  }, [hoverStyles]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (customStyles.backgroundColor) {
      const target = e.currentTarget.style;
      target.backgroundColor = customStyles.backgroundColor as string;
      target.color = customStyles.color as string;
    }
  }, [customStyles]);

  // Memoized class names
  const buttonClasses = useMemo(() => {
    return clsx(
      'relative flex items-center justify-center rounded-full',
      'border-2 transition-all duration-300',
      'focus:outline-none',
      {
        'bg-background-primary/80 backdrop-blur-sm border-border-default/30 hover:bg-background-primary/90': variant === 'default',
        '': variant === 'basic',
      },
      SIZE_CLASSES[size],
      className
    );
  }, [variant, size, className]);

  // Memoized icon classes
  const iconClasses = useMemo(() => {
    return clsx(
      isPlaying ? 'ml-0' : 'ml-1',
      variant === 'default' ? 'text-text-primary' : ''
    );
  }, [isPlaying, variant]);

  // Memoized animation props
  const buttonAnimateProps = useMemo(() => ({
    opacity: isPlaying ? 0.3 : 1
  }), [isPlaying]);

  const iconAnimationProps = useMemo(() => ({
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.2 }
  }), []);

  return (
    <motion.button
      className={buttonClasses}
      style={variant === 'basic' ? customStyles : undefined}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 1 }}
      animate={buttonAnimateProps}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        key={isPlaying ? 'pause' : 'play'}
        {...iconAnimationProps}
        className="flex items-center justify-center"
      >
        {isPlaying ? (
          <FaPause className={iconClasses} />
        ) : (
          <FaPlay className={iconClasses} />
        )}
      </motion.div>
    </motion.button>
  );
});

VideoPlayBtn.displayName = 'VideoPlayBtn';

export default VideoPlayBtn;