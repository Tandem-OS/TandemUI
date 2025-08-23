import React, { useState, useRef, useEffect } from 'react';
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

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  width = 'w-48'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="block"
        type="button"
      >
        {trigger}
      </button>

      <div
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-0.5rem)',
          transition: 'opacity 150ms, transform 150ms, visibility 150ms'
        }}
        className={clsx(
          'absolute top-full mt-sm bg-background-primary rounded-lg shadow-lg border border-border-default py-sm z-50',
          width,
          align === 'left' ? 'left-0' : 'right-0'
        )}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {item.divider && index > 0 && (
              <div className="h-px bg-border-muted my-xs mx-sm" />
            )}
            <button
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className="w-full px-md py-sm text-left hover:bg-background-secondary transition-colors flex items-center gap-sm"
              type="button"
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
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
