import React, { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
  width?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'left',
  width = 'w-64',
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={clsx(
          'fixed top-0 h-full bg-background-primary z-50 transition-transform duration-300 lg:hidden',
          width,
          position === 'left' ? 'left-0' : 'right-0',
          isOpen
            ? 'translate-x-0'
            : position === 'left'
            ? '-translate-x-full'
            : 'translate-x-full'
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-md right-md p-xs rounded-lg hover:bg-background-secondary transition-colors"
        >
          <RiCloseLine className="text-xl text-text-secondary" />
        </button>

        {/* Content */}
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
