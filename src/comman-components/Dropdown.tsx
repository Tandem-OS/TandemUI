import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  width?: string;
}

// Animation styles ko constant mein store karo
const DROPDOWN_STYLES = {
  visible: {
    visibility: 'visible' as const,
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 150ms, transform 150ms, visibility 150ms'
  },
  hidden: {
    visibility: 'hidden' as const,
    opacity: 0,
    transform: 'translateY(-0.5rem)',
    transition: 'opacity 150ms, transform 150ms, visibility 150ms'
  }
};

const Dropdown = React.memo<DropdownProps>(({
  trigger,
  items,
  align = 'right',
  width = 'w-48'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Memoize click outside handler
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current && 
      !dropdownRef.current.contains(event.target as Node) &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  // Memoize escape handler
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  // Memoize toggle function
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Update position when dropdown opens
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: align === 'left' ? rect.left + window.scrollX : rect.right + window.scrollX
      });
    }
  }, [isOpen, align]);

  // Event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, handleClickOutside, handleEscape]);

  // Memoize dropdown styles
  const dropdownStyles = useMemo(
    () => isOpen ? DROPDOWN_STYLES.visible : DROPDOWN_STYLES.hidden,
    [isOpen]
  );

  // Memoize item click handler
  const handleItemClick = useCallback((item: DropdownItem) => {
    item.onClick?.();
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Render items with memoization
  const renderedItems = useMemo(() => (
    items.map((item, index) => (
      <React.Fragment key={item.id}>
        {item.divider && index > 0 && (
          <div className="h-px bg-border-muted my-xs mx-sm" />
        )}
        <button
          onClick={() => handleItemClick(item)}
          className="w-full px-md py-sm text-left hover:bg-background-secondary transition-colors flex items-center gap-sm focus:outline-none focus:bg-background-secondary"
          type="button"
          role="menuitem"
        >
          {item.icon && (
            <span className="text-base text-text-tertiary">
              {item.icon}
            </span>
          )}
          <span className="text-sm text-text-primary">
            {item.label}
          </span>
        </button>
      </React.Fragment>
    ))
  ), [items, handleItemClick]);

  return (
    <>
      <div ref={dropdownRef} className="relative inline-block">
        <button
          ref={triggerRef}
          onClick={toggleDropdown}
          className="block"
          type="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {trigger}
        </button>
      </div>

      {createPortal(
        <div
          ref={menuRef}
          style={{
            ...dropdownStyles,
            position: 'absolute',
            top: `${dropdownPosition.top}px`,
            left: align === 'left' 
              ? `${dropdownPosition.left}px` 
              : `${dropdownPosition.left - parseInt(width.replace('w-', '')) * 4}px`,
            marginTop: '0.5rem'
          }}
          className={clsx(
            'bg-background-primary rounded-lg shadow-lg border border-border-default py-sm z-50',
            width
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {isOpen && renderedItems}
        </div>,
        document.body
      )}
    </>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;