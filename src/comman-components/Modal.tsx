import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
    footer?: React.ReactNode;
    centered?: boolean;
    className?: string;
    overlayClassName?: string;
    contentClassName?: string;
    preventScroll?: boolean;
}

const Modal: React.FC<ModalProps> = ({
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

    useEffect(() => {
        if (preventScroll && isOpen) {
            const originalPaddingRight = document.body.style.paddingRight;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            
            return () => {
                document.body.style.overflow = 'unset';
                document.body.style.paddingRight = originalPaddingRight;
            };
        }
    }, [isOpen, preventScroll]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const getSizeClasses = () => {
        switch (size) {
            case 'sm': return 'max-w-md';
            case 'md': return 'max-w-lg';
            case 'lg': return 'max-w-2xl';
            case 'xl': return 'max-w-4xl';
            case 'full': return 'max-w-full mx-md';
            default: return 'max-w-lg';
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
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
                                className={`relative w-full ${getSizeClasses()} bg-background-primary rounded-xl shadow-2xl border border-border-default transform-gpu will-change-transform ${contentClassName}`}
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
};

export default Modal;