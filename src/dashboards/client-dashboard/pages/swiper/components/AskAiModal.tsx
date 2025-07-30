import React, { useState, useEffect, useRef } from 'react';
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

// Custom hook for typewriter effect
const useTypewriter = (text: string, speed = 30) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        if (text) {
            let i = 0;
            setDisplayText('');
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);
            return () => clearInterval(typingInterval);
        }
    }, [text, speed]);
    return displayText;
};

interface AskAiModalProps {
    isOpen: boolean;
    description: string;
    onClose: () => void;
}

export const AskAiModal: React.FC<AskAiModalProps> = ({ isOpen, description, onClose }) => {
    const displayedText = useTypewriter(isOpen ? description : '', 25);
    const modalRef = useRef<HTMLDivElement>(null);

    // Call the hook to close on outside click
    useOnClickOutside(modalRef, onClose);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={modalRef}
                    className="absolute bottom-full left-0 mb-md w-80 bg-background-primary text-text-primary p-lg rounded-xl shadow-2xl border border-border-default z-50"
                    layout
                    transition={{
                        layout: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
                        opacity: { duration: 0.2 }
                    }}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-sm right-sm p-xs text-text-tertiary hover:text-text-primary hover:bg-background-muted rounded-full transition-colors duration-200"
                        aria-label="Close AI suggestion"
                    >
                        <FiX size={16} />
                    </button>

                    <div className="flex items-start gap-sm pr-lg">
                        <div className="flex-shrink-0 mt-1 w-6 h-6 bg-accent-subtle text-accent-default rounded-full flex items-center justify-center">
                            <FiCpu size={14} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-para-sm font-medium text-text-primary mb-xs">AI Analysis</h4>
                            <p className="text-para-sm leading-relaxed text-text-secondary min-h-[3rem]">
                                {displayedText}
                                {displayedText.length < description.length && (
                                    <motion.span
                                        className="inline-block w-2 h-4 bg-accent-default ml-1"
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                    />
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Arrow pointing to button */}
                    <div className="absolute bottom-[-6px] left-6 w-3 h-3 bg-background-primary border-r border-b border-border-default transform rotate-45"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};