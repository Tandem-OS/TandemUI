import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiX } from 'react-icons/fi';

// Custom hook to detect click outside
const useOnClickOutside = (ref: React.RefObject<HTMLDivElement | null>, handler: (event: MouseEvent | TouchEvent) => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};

// Optimized typewriter hook with proper cleanup and memoization
const useTypewriter = (text: string, speed = 30, isActive = true) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    useEffect(() => {
        if (!isActive || !text) {
            setDisplayText('');
            setIsTyping(false);
            return;
        }
        
        let i = 0;
        let mounted = true;
        setDisplayText('');
        setIsTyping(true);
        
        const typingInterval = setInterval(() => {
            if (!mounted) return;
            
            if (i < text.length) {
                setDisplayText(prev => prev + text.charAt(i));
                i++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);
            }
        }, speed);
        
        return () => {
            mounted = false;
            clearInterval(typingInterval);
        };
    }, [text, speed, isActive]);
    
    return { displayText, isTyping };
};

interface AskAiModalProps {
    isOpen: boolean;
    description: string;
    onClose: () => void;
}

// Memoize the modal content to prevent unnecessary re-renders
const ModalContent = memo(({ description, onClose, isOpen }: AskAiModalProps) => {
    const { displayText, isTyping } = useTypewriter(description, 25, isOpen);
    const modalRef = useRef<HTMLDivElement>(null);
    
    // Memoize the click outside handler
    const handleClickOutside = useCallback(() => {
        onClose();
    }, [onClose]);
    
    useOnClickOutside(modalRef, handleClickOutside);
    
    return (
        <motion.div
            ref={modalRef}
            className="absolute bottom-full mb-sm
                      -left-[200px] w-[85vw] max-w-[280px]
                      sm:w-64
                      md:left-0 md:translate-x-0 md:w-80
                      bg-background-primary text-text-primary p-md md:p-lg 
                      rounded-lg md:rounded-xl shadow-2xl 
                      border border-border-default z-50"
            layout
            transition={{
                layout: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
                opacity: { duration: 0.2 }
            }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{ willChange: 'transform, opacity' }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-sm right-sm p-xs text-text-tertiary hover:text-text-primary hover:bg-background-muted rounded-full transition-colors duration-200"
                aria-label="Close AI suggestion"
            >
                <FiX className="text-icon-sm" />
            </button>

            <div className="flex items-start gap-sm">
                <div className="flex-shrink-0 mt-1 w-5 h-5 sm:w-6 sm:h-6 bg-accent-subtle text-accent-default rounded-full flex items-center justify-center">
                    <FiCpu className="text-para-xs sm:text-para-sm" />
                </div>
                <div className="flex-1">
                    <h4 className="text-para-sm md:text-para-md font-medium text-text-primary mb-xs">AI Analysis</h4>
                    <p className="text-para-xs sm:text-para-sm leading-relaxed text-text-secondary min-h-[3rem]">
                        {displayText}
                        {isTyping && (
                            <motion.span
                                className="inline-block w-0.5 h-3 sm:h-3.5 md:h-4 bg-accent-default ml-xs"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                style={{ willChange: 'opacity' }}
                            />
                        )}
                    </p>
                </div>
            </div>

            {/* Arrow - Only show on desktop */}
            <div className="hidden md:block absolute bottom-[-6px] left-lg w-3 h-3 
                          bg-background-primary border-r border-b border-border-default 
                          transform rotate-45"></div>
        </motion.div>
    );
});

ModalContent.displayName = 'ModalContent';

export const AskAiModal: React.FC<AskAiModalProps> = ({ isOpen, description, onClose }) => {
    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <ModalContent 
                    isOpen={isOpen} 
                    description={description} 
                    onClose={onClose} 
                />
            )}
        </AnimatePresence>
    );
};