import React, { memo, useMemo, useCallback } from 'react';
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

// Memoized Tab Button Component
const TabButton = memo(({
  item,
  isActive,
  variant,
  size,
  fullWidth,
  showCount,
  animated,
  onTabChange
}: {
  item: TabItem;
  isActive: boolean;
  variant: 'default' | 'underline';
  size: 'sm' | 'md' | 'lg';
  fullWidth: boolean;
  showCount: boolean;
  animated: boolean;
  onTabChange: (tabId: string) => void;
}) => {
  const disabled = item.disabled || false;

  const handleClick = useCallback(() => {
    if (!disabled) {
      onTabChange(item.id);
    }
  }, [disabled, item.id, onTabChange]);

  const buttonClasses = useMemo(() => {
    const sizeClasses = {
      'sm': 'px-md py-xs text-para-sm',
      'md': 'px-lg py-sm text-para-md',
      'lg': 'px-xl py-md text-para-lg'
    }[size];

    const variantClasses = disabled
      ? 'opacity-50 cursor-not-allowed text-text-tertiary'
      : variant === 'underline'
        ? clsx(
            'bg-transparent border-0 rounded-none pb-md',
            isActive 
              ? 'text-accent-default border-b-2 border-accent-default'
              : 'text-text-secondary hover:text-text-primary border-b-2 border-transparent hover:border-border-muted'
          )
        : clsx(
            'border rounded-2xl transition-all duration-300',
            isActive
              ? 'bg-accent-default text-accent-foreground border-accent-default shadow-lg'
              : 'bg-background-primary-2 text-text-secondary hover:text-text-primary border-border-default hover:shadow-md hover:border-accent-default/30'
          );

    return clsx(
      'font-medium transition-all duration-300',
      sizeClasses,
      variantClasses,
      fullWidth && 'flex-1 min-w-0'
    );
  }, [size, variant, isActive, disabled, fullWidth]);

  const countBadgeClasses = useMemo(() => {
    return clsx(
      'px-sm py-xs rounded-full text-para-xs transition-all duration-300 flex-shrink-0',
      isActive && variant !== 'underline'
        ? 'bg-accent-foreground/20 text-accent-foreground'
        : 'bg-background-muted text-text-tertiary'
    );
  }, [isActive, variant]);

  return (
    <motion.button
      onClick={handleClick}
      className={buttonClasses}
      disabled={disabled}
      whileHover={
        animated && !disabled
          ? {
              y: variant === 'underline' ? 0 : -2,
              transition: { duration: 0.2, ease: 'easeOut' as const }
            }
          : undefined
      }
      whileTap={
        animated && !disabled
          ? { scale: 0.98 }
          : undefined
      }
    >
      <div className="flex items-center gap-sm justify-center min-w-0">
        {item.icon && (
          <span className="text-icon-sm flex-shrink-0">
            {item.icon}
          </span>
        )}
        
        <span className="truncate">{item.label}</span>
        
        {showCount && item.count !== undefined && (
          <span className={countBadgeClasses}>
            {item.count}
          </span>
        )}
      </div>
    </motion.button>
  );
});

TabButton.displayName = 'TabButton';

const TabsButton: React.FC<TabsButtonProps> = memo(({
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
  const containerClasses = useMemo(() => {
    return clsx(
      'flex flex-wrap gap-sm',
      variant === 'underline' && 'border-b border-border-default',
      fullWidth && 'w-full',
      className
    );
  }, [variant, fullWidth, className]);

  return (
    <div className={containerClasses}>
      {items.map((item) => (
        <TabButton
          key={item.id}
          item={item}
          isActive={activeTab === item.id}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          showCount={showCount}
          animated={animated}
          onTabChange={onTabChange}
        />
      ))}
    </div>
  );
});

TabsButton.displayName = 'TabsButton';

export default TabsButton;