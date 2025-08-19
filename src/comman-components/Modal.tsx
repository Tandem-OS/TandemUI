import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { createPortal } from 'react-dom';

// Scrollbar width ko cache karo
let cachedScrollbarWidth: number | null = null;
const getScrollbarWidth = () => {
    if (cachedScrollbarWidth !== null) return cachedScrollbarWidth;
    
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    
    const inner = document.createElement('div');
    outer.appendChild(inner);
    
    cachedScrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode?.removeChild(outer);
    
    return cachedScrollbarWidth;
};

// Size classes ko constant object mein store karo
const SIZE_CLASSES = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-md'
} as const;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: keyof typeof SIZE_CLASSES;
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
    footer?: React.ReactNode;
    centered?: boolean;
    className?: string;
    overlayClassName?: string;
    contentClassName?: string;
    preventScroll?: boolean;
}

const Modal = React.memo<ModalProps>(({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeOnOverlayClick = true,
    showCloseButton = true,
    footer,
    centered = true,
    className = '',
    overlayClassName = '',
    contentClassName = '',
    preventScroll = true
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Memoize scroll handling
    useEffect(() => {
        if (!preventScroll || !isOpen) return;

        const originalStyles = {
            overflow: document.body.style.overflow,
            paddingRight: document.body.style.paddingRight
        };
        
        const scrollbarWidth = getScrollbarWidth();
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        
        return () => {
            document.body.style.overflow = originalStyles.overflow;
            document.body.style.paddingRight = originalStyles.paddingRight;
        };
    }, [isOpen, preventScroll]);

    // Memoize escape handler
    useEffect(() => {
        if (!isOpen) return;
        
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Memoize overlay click handler
    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    }, [closeOnOverlayClick, onClose]);

    // Memoize size class
    const sizeClass = useMemo(() => SIZE_CLASSES[size], [size]);

    if (!isOpen) return null;

    const modalContent = (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    <motion.div
                        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 ${overlayClassName}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleOverlayClick}
                    />
                    <div
                        className={`fixed inset-0 z-50 overflow-y-auto ${className}`}
                        onClick={handleOverlayClick}
                    >
                        <div className={`min-h-screen px-md py-lg flex ${centered ? 'items-center' : 'items-start pt-20'} justify-center`}>
                            <motion.div
                                ref={modalRef}
                                className={`relative w-full ${sizeClass} bg-background-primary rounded-xl shadow-2xl border border-border-default transform-gpu will-change-transform ${contentClassName}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ ease: "easeInOut", duration: 0.2 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {(title || showCloseButton) && (
                                    <div className="flex items-center justify-between px-lg py-md border-b border-border-default">
                                        {title && (
                                            <h2 className="text-h5-sm sm:text-h4-sm md:text-h4-md font-semibold text-text-primary">
                                                {title}
                                            </h2>
                                        )}
                                        {showCloseButton && (
                                            <button
                                                onClick={onClose}
                                                className="p-sm text-text-tertiary hover:text-text-primary hover:bg-background-muted rounded-lg transition-all duration-200 ml-auto"
                                                aria-label="Close modal"
                                            >
                                                <FiX className="text-icon-md" />
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div className="px-lg py-lg">
                                    {children}
                                </div>

                                {footer && (
                                    <div className="px-lg py-md border-t border-border-default">
                                        {footer}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );

    // Use portal to render at document root
    return createPortal(modalContent, document.body);
});

Modal.displayName = 'Modal';

export default Modal;