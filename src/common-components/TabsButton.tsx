import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsButtonProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  showCount?: boolean;
  animated?: boolean;
}

const TabsButton: React.FC<TabsButtonProps> = ({
  items,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
  showCount = true,
  animated = true
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-md py-xs text-para-sm';
      case 'lg':
        return 'px-xl py-md text-para-lg';
      default:
        return 'px-lg py-sm text-para-md';
    }
  };

  const getVariantClasses = (isActive: boolean, disabled: boolean) => {
    if (disabled) {
      return 'opacity-50 cursor-not-allowed text-text-tertiary';
    }

    if (variant === 'underline') {
      return clsx(
        'bg-transparent border-0 rounded-none pb-md',
        isActive 
          ? 'text-accent-default border-b-2 border-accent-default'
          : 'text-text-secondary hover:text-text-primary border-b-2 border-transparent hover:border-border-muted'
      );
    }

    // Default variant
    return clsx(
      'border rounded-2xl transition-all duration-300',
      isActive
        ? 'bg-accent-default text-accent-foreground border-accent-default shadow-lg'
        : 'bg-background-primary-2 text-text-secondary hover:text-text-primary border-border-default hover:shadow-md hover:border-accent-default/30'
    );
  };

  const getContainerClasses = () => {
    return clsx(
      'flex flex-wrap gap-sm',
      {
        'border-b border-border-default': variant === 'underline',
        'w-full': fullWidth,
      }
    );
  };

  const getButtonClasses = (isActive: boolean, disabled: boolean) => {
    return clsx(
      'font-medium transition-all duration-300',
      getSizeClasses(),
      getVariantClasses(isActive, disabled),
      {
        'flex-1 min-w-0': fullWidth, // min-w-0 prevents flex items from overflowing
      }
    );
  };

  return (
    <div className={clsx(getContainerClasses(), className)}>
      {items.map((item) => {
        const isActive = activeTab === item.id;
        const disabled = item.disabled || false;

        return (
          <motion.button
            key={item.id}
            onClick={() => !disabled && onTabChange(item.id)}
            className={getButtonClasses(isActive, disabled)}
            whileHover={
              animated && !disabled
                ? {
                    y: variant === 'underline' ? 0 : -2,
                    transition: { duration: 0.2, ease: 'easeOut' }
                  }
                : {}
            }
            whileTap={
              animated && !disabled
                ? { scale: 0.98 }
                : {}
            }
            disabled={disabled}
          >
            <div className="flex items-center gap-sm justify-center min-w-0">
              {item.icon && (
                <span className="text-icon-sm flex-shrink-0">
                  {item.icon}
                </span>
              )}
              
              <span className="truncate">{item.label}</span>
              
              {showCount && item.count !== undefined && (
                <span
                  className={clsx(
                    'px-sm py-xs rounded-full text-para-xs transition-all duration-300 flex-shrink-0',
                    isActive && variant !== 'underline'
                      ? 'bg-accent-foreground/20 text-accent-foreground'
                      : 'bg-background-muted text-text-tertiary'
                  )}
                >
                  {item.count}
                </span>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default TabsButton;