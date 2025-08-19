import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

// Animation variants ko component ke bahar
const BACKDROP_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

const createDrawerVariants = (position: 'left' | 'right'): Variants => ({
  hidden: { x: position === 'left' ? '-100%' : '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
});

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
  width?: string;
}

const Drawer = React.memo<DrawerProps>(({
  isOpen,
  onClose,
  children,
  position = 'left',
  width = 'w-64',
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const drawerVariants = useMemo(
    () => createDrawerVariants(position),
    [position]
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClickOutside]);

  // Portal ke andar content - NO early return!
  const drawerContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={BACKDROP_VARIANTS}
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
              'will-change-transform'
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

            {/* Content */}
            <div className="h-full overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
});

Drawer.displayName = 'Drawer';

export default Drawer;