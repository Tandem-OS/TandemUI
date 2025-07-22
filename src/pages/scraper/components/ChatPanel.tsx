// src/scraper/components/ChatPanel.tsx

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { mockChatResponses, chatPrompts } from '../constants';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../comman-components/Para';

interface ChatMessage {
    id: string;
    type: 'user' | 'assistant';
    message: string;
    timestamp: Date;
}

interface ChatPanelProps {
    context?: any;
}

const ChatPanel = ({ context }: ChatPanelProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            type: 'assistant',
            message: 'Hi! I can help you understand design decisions and suggest improvements. What would you like to know?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Open chat when context changes (from section card)
    useEffect(() => {
        if (context && context.prompt) {
            setIsOpen(true);
            // Send the message after a small delay to ensure chat is open
            setTimeout(() => {
                handleSendMessage(context.prompt);
            }, 300);
        }
    }, [context]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const simulateTyping = async (response: string) => {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        setIsTyping(false);
        return response;
    };

    const handleSendMessage = async (message: string) => {
        if (!message.trim()) return;

        // Add user message
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: 'user',
            message,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Get mock response
        let response = 'I understand your question. ';

        // Check for predefined responses
        Object.keys(mockChatResponses).forEach(key => {
            if (message.toLowerCase().includes(key.toLowerCase())) {
                response = mockChatResponses[key as keyof typeof mockChatResponses];
            }
        });

        // Add context if available
        if (context?.context?.metadata) {
            const metadata = context.context.metadata;
            response = `For this ${metadata.section_type} section with ${metadata.layout_structure} layout: ${response}`;
        }

        // Simulate typing and add response
        const assistantResponse = await simulateTyping(response);
        const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            message: assistantResponse,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-accent-default text-accent-foreground rounded-full shadow-xl flex items-center justify-center hover:bg-accent-hover transition-colors z-50"
                    >
                        <FaComments className="text-icon-md sm:text-icon-lg" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel - Mobile Responsive */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Mobile Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-96 h-[80vh] sm:h-[600px] bg-background-primary rounded-t-2xl sm:rounded-2xl shadow-2xl border border-border-default flex flex-col z-50"
                        >
                            {/* Header */}
                            <div className="p-md border-b border-border-default flex items-center justify-between">
                                <div className="flex items-center gap-sm">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-subtle rounded-full flex items-center justify-center">
                                        <FaComments className="text-accent-default text-icon-sm sm:text-icon-md" />
                                    </div>
                                    <div>
                                        <Heading level="h6" className="text-base sm:text-lg">Design Assistant</Heading>
                                        <Para size="xs" color="secondary">Ask me anything</Para>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
                                >
                                    <FaTimes className="text-text-secondary" />
                                </button>
                            </div>

                            {/* Quick Prompts */}
                            <div className="p-sm border-b border-border-default">
                                <div className="flex gap-xs overflow-x-auto scrollbar-hide">
                                    {chatPrompts.slice(0, 3).map((prompt, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSendMessage(prompt)}
                                            className="flex-shrink-0 text-para-xs px-sm py-xs bg-background-secondary border border-border-default rounded-lg hover:border-accent-default hover:bg-accent-subtle transition-colors whitespace-nowrap"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-sm sm:p-md space-y-sm sm:space-y-md">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] sm:max-w-[80%] p-sm rounded-xl ${message.type === 'user'
                                                    ? 'bg-accent-default text-white'
                                                    : 'bg-background-secondary text-text-primary'
                                                }`}
                                        >
                                            <Para size="sm" className={message.type === 'user' ? '!text-white' : ''}>{message.message}</Para>
                                            <Para size="xs" className={`mt-xs opacity-70 ${message.type === 'user' ? '!text-white' : ''}`}>
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Para>
                                        </div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-background-secondary p-sm rounded-xl">
                                            <div className="flex gap-xs">
                                                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-sm sm:p-md border-t border-border-default">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage(inputValue);
                                    }}
                                    className="flex gap-sm"
                                >
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 px-sm sm:px-md py-sm bg-background-secondary border border-border-default rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-default transition-colors text-para-sm"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputValue.trim()}
                                        className="p-sm bg-accent-default text-accent-foreground rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaPaperPlane className="text-icon-sm" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatPanel;