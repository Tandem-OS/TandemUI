import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { clsx } from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

// Defines the properties the Drawer component accepts
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

  // Effect to handle closing when clicking outside and to prevent body scroll
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

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Animation variants for the backdrop overlay
  const backdropVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for the drawer panel
  const drawerVariants: Variants = {
    hidden: {
      x: position === 'left' ? '-100%' : '100%',
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            className={clsx(
              'fixed top-0 h-full bg-background-primary z-[999999999] shadow-2xl',
              width,
              position === 'left' ? 'left-0' : 'right-0',
              'will-change-transform' // Animation performance optimization
            )}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-md right-md p-xs rounded-lg hover:bg-background-secondary transition-colors"
              aria-label="Close drawer"
            >
              <RiCloseLine className="text-xl text-text-secondary" />
            </button>

            {/* Content - REVERTED to your original layout */}
            <div className="h-full overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;