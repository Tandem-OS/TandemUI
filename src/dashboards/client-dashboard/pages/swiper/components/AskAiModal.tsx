import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiX, FiSend } from 'react-icons/fi';

// Custom hook to detect click outside
const useOnClickOutside = (ref: React.RefObject<HTMLDivElement | null>, handler: (event: MouseEvent | TouchEvent) => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) return;
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

// Typewriter Component for AI messages
const Typewriter = ({ text, onComplete }: { text: string; onComplete: () => void; }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length) {
                setDisplayText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(intervalId);
                onComplete();
            }
        }, 25);
        return () => clearInterval(intervalId);
    }, [text, onComplete]);

    return (
        <>
            {displayText}
            <motion.span
                className="inline-block w-0.5 h-3 sm:h-3.5 md:h-4 bg-accent-default ml-xs align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
            />
        </>
    );
};

interface AskAiModalProps {
    isOpen: boolean;
    description: string;
    onClose: () => void;
}

interface Message {
    id: number;
    text: string;
    sender: 'ai' | 'user';
}

const ModalContent = memo(({ description, onClose }: AskAiModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const { initialAnalysis, followupAnalysis } = useMemo(() => {
        const parts = description.split('|');
        return {
            initialAnalysis: parts[0] || '',
            followupAnalysis: parts[1] || 'That is an excellent question. Let me elaborate...',
        };
    }, [description]);

    const [messages, setMessages] = useState<Message[]>([{ id: 1, text: initialAnalysis, sender: 'ai' }]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    const handleSendMessage = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        const userMessage: Message = { id: Date.now(), text: userInput, sender: 'user' };
        const aiFollowup: Message = { id: Date.now() + 1, text: followupAnalysis, sender: 'ai' };
        setMessages(prev => [...prev, userMessage, aiFollowup]);
        setUserInput('');
        setIsTyping(true);
    }, [userInput, followupAnalysis]);

    const handleTypingComplete = useCallback(() => {
        setIsTyping(false);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView();
    }, [messages]);

    useOnClickOutside(modalRef, onClose);

    return (
        <motion.div
            ref={modalRef}
            className="absolute bottom-full mb-sm -left-[220px] w-[85vw] max-w-[300px] sm:w-72 md:left-0 md:translate-x-0 md:w-80 bg-background-primary text-text-primary rounded-lg md:rounded-xl shadow-2xl border border-border-default z-50 flex flex-col"
            transition={{ opacity: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-sm border-b border-border-default flex-shrink-0">
                <div className="flex items-center gap-sm">
                    <FiCpu className="text-accent-default" />
                    <h4 className="text-para-sm font-medium">AI Analysis</h4>
                </div>
                <button onClick={onClose} className="p-xs text-text-tertiary hover:text-text-primary rounded-full transition-colors" aria-label="Close">
                    <FiX className="text-icon-sm" />
                </button>
            </div>

            {/* Chat Messages */}
            <div className="p-sm md:p-md space-y-md overflow-y-auto h-40 lg:h-56">
                {messages.map((msg, index) => (
                    <div
                        key={msg.id}
                        className={`flex items-start gap-sm ${msg.sender === 'user' ? 'justify-end' : ''}`}
                    >
                        {msg.sender === 'ai' && (
                            <div className="flex-shrink-0 w-6 h-6 bg-accent-subtle text-accent-default rounded-full flex items-center justify-center">
                                <FiCpu className="text-para-xs" />
                            </div>
                        )}
                        <div className={`p-sm rounded-md max-w-[85%] text-para-xs sm:text-para-sm leading-relaxed ${msg.sender === 'ai' ? 'bg-background-secondary text-text-secondary' : 'bg-accent-default text-accent-foreground'
                            }`}>
                            {msg.sender === 'ai' && index === messages.length - 1 && isTyping ? (
                                <Typewriter text={msg.text} onComplete={handleTypingComplete} />
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-sm border-t border-border-default flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center gap-sm">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask a follow-up..."
                        disabled={isTyping}
                        className="w-full bg-background-secondary text-text-primary text-para-sm px-sm py-xs rounded-md border border-border-default focus:border-accent-default focus:ring-1 focus:ring-accent-default transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button type="submit" disabled={!userInput.trim() || isTyping} className="p-sm bg-accent-default text-accent-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
                        <FiSend />
                    </button>
                </form>
            </div>
            <div className="hidden md:block absolute bottom-[-6px] left-lg w-3 h-3 bg-background-primary border-r border-b border-border-default transform rotate-45"></div>
        </motion.div>
    );
});

ModalContent.displayName = 'ModalContent';

export const AskAiModal: React.FC<AskAiModalProps> = ({ isOpen, description, onClose }) => {
    return (
        <AnimatePresence>
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