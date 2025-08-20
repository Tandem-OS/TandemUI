import React from 'react';
import { FaCheck, FaTimes, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";
import clsx from 'clsx';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success',
  position = 'top-center',
  size,
  className,
  showIcon = true,
  icon
}) => {
  // Type styles
  const typeStyles = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  // Position styles
  const positionStyles = {
    'top-left': 'top-4 sm:top-6 left-4 sm:left-6',
    'top-center': 'top-4 sm:top-6 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 sm:top-6 right-4 sm:right-6',
    'bottom-left': 'bottom-4 sm:bottom-6 left-4 sm:left-6',
    'bottom-center': 'bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 sm:bottom-6 right-4 sm:right-6'
  };

  // Size styles - maintaining backward compatibility
  const getSizeStyles = () => {
    if (!size) {
      // Original default behavior when no size prop
      return 'px-md sm:px-lg py-sm sm:py-md rounded-lg sm:rounded-xl text-para-sm sm:text-para-md';
    }
    
    // New size-based styles
    const sizeMap = {
      sm: 'px-sm sm:px-md py-xs sm:py-sm text-para-xs sm:text-para-sm rounded-md sm:rounded-lg',
      md: 'px-md sm:px-lg py-sm sm:py-md text-para-sm sm:text-para-md rounded-lg sm:rounded-xl',
      lg: 'px-lg sm:px-xl py-md sm:py-lg text-para-md sm:text-para-lg rounded-xl sm:rounded-2xl'
    };
    
    return sizeMap[size];
  };

  // Icon size classes
  const getIconSizeClass = () => {
    if (!size) {
      // Original default behavior
      return 'text-icon-sm sm:text-icon-md';
    }
    
    const iconSizeMap = {
      sm: 'text-icon-sm',
      md: 'text-icon-sm sm:text-icon-md',
      lg: 'text-icon-md sm:text-icon-lg'
    };
    
    return iconSizeMap[size];
  };

  // Default icons with proper sizing
  const icons = {
    success: <FaCheck className={getIconSizeClass()} />,
    error: <FaTimes className={getIconSizeClass()} />,
    warning: <FaExclamationTriangle className={getIconSizeClass()} />,
    info: <FaInfoCircle className={getIconSizeClass()} />
  };

  // Animation variants based on position
  const getAnimationVariants = () => {
    const isTop = position.includes('top');
    const isBottom = position.includes('bottom');
    const isLeft = position.includes('left');
    const isRight = position.includes('right');
    const isCenter = position.includes('center');
    
    // Y offset for vertical animation
    const yOffset = isTop ? -20 : isBottom ? 20 : 0;
    
    // X offset for horizontal animation (only for non-center positions)
    const xOffset = isLeft ? -20 : isRight ? 20 : 0;
    
    if (isCenter) {
      // Center positions need translate-x-1/2
      return {
        initial: { opacity: 0, y: yOffset, x: '-50%' },
        animate: { opacity: 1, y: 0, x: '-50%' },
        exit: { opacity: 0, y: yOffset, x: '-50%' }
      };
    } else {
      // Side positions need horizontal slide
      return {
        initial: { opacity: 0, y: yOffset, x: xOffset },
        animate: { opacity: 1, y: 0, x: 0 },
        exit: { opacity: 0, y: yOffset, x: xOffset }
      };
    }
  };

  const animationVariants = getAnimationVariants();

  return (
    <motion.div
      initial={animationVariants.initial}
      animate={animationVariants.animate}
      exit={animationVariants.exit}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={clsx(
        'fixed shadow-xl flex items-center gap-sm z-50 font-medium',
        typeStyles[type],
        positionStyles[position],
        getSizeStyles(),
        className
      )}
    >
      {showIcon && (icon || icons[type])}
      <span>{message}</span>
    </motion.div>
  );
};

export default Toast;