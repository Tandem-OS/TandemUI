import { useState, useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { mockChatResponses, chatPrompts } from '../constants';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../common-components/Para';
import { refineComposition } from '@/features/composition/compositionSlice';
import { selectIsRefining } from '@/features/composition/compositionSelectors';
import type { AppDispatch } from '@/store';

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);
    return matches;
};

interface ChatMessage {
    id: string;
    type: 'user' | 'assistant';
    message: string;
    timestamp: Date;
}

interface ChatPanelProps {
    context?: any;
    compositionId?: string | null;
    sections?: string[];
}

const ChatPanel = ({ context, compositionId, sections = [] }: ChatPanelProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            type: 'assistant',
            message: "Ask me anything about this layout. I'll explain or improve it.",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const processedContextRef = useRef<Set<string>>(new Set());

    const dispatch = useDispatch<AppDispatch>();
    const isRefining = useSelector(selectIsRefining);

    const isDesktop = useMediaQuery('(min-width: 1024px)');

    useEffect(() => {
        if (context && context.prompt) {
            const contextKey = `${context.prompt}_${JSON.stringify(context.context || {})}`;
            if (processedContextRef.current.has(contextKey)) return;
            processedContextRef.current.add(contextKey);
            if (!isDesktop) setIsOpen(true);
            setTimeout(() => { handleSendMessage(context.prompt); }, 300);
        }
    }, [context]);

    useEffect(() => {
        return () => { processedContextRef.current.clear(); };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const simulateTyping = async (response: string) => {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        setIsTyping(false);
        return response;
    };

    const handleSendMessage = async (message: string) => {
        if (!message.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: 'user',
            message,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // ── Real refine call when compositionId is available ──
        if (compositionId && sections.length) {
            setIsTyping(true);
            try {
                await dispatch(refineComposition({
                    compositionId,
                    sections,
                    userInstruction: message.trim(),
                })).unwrap();
                const assistantMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    type: 'assistant',
                    message: 'Done! Your composition has been updated. New previews are generating.',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, assistantMessage]);
            } catch (err: any) {
                const errorMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    type: 'assistant',
                    message: err ?? 'Something went wrong. Please try again.',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsTyping(false);
            }
            return;
        }

        // ── Fallback mock responses when no compositionId ──
        let response = "Got it — here's a breakdown...";
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('why') && lowerMessage.includes('work')) {
            response = mockChatResponses["Why does this layout work?"];
        } else if (lowerMessage.includes('clean') || lowerMessage.includes('refine')) {
            response = "Try this instead: reduce the number of elements, increase whitespace, use a more limited color palette, and ensure consistent alignment throughout.";
        } else if (lowerMessage.includes('dark mode')) {
            response = "For dark mode: use darker backgrounds (#0f172a), lighter text (#f1f5f9), reduce contrast slightly for comfort, and ensure sufficient color contrast ratios for accessibility.";
        } else {
            Object.keys(mockChatResponses).forEach(key => {
                if (lowerMessage.includes(key.toLowerCase().split(' ')[0])) {
                    response = mockChatResponses[key as keyof typeof mockChatResponses];
                }
            });
        }
        if (context?.context?.metadata) {
            const metadata = context.context.metadata;
            response = `For this ${metadata.section_type} section with ${metadata.layout_structure} layout: ${response}`;
        }
        const assistantResponse = await simulateTyping(response);
        const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            message: assistantResponse,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
    };

    const ChatInterface = (
        <div className="h-full w-full bg-background-primary-2 rounded-2xl max-md:rounded-b-none shadow-md border border-border-default flex flex-col">
            {/* Header */}
            <div className="p-md border-b border-border-default flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-sm">
                    <motion.div
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-subtle rounded-full flex items-center justify-center will-change-transform"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <FaComments className="text-accent-default text-icon-sm sm:text-icon-md" />
                    </motion.div>
                    <div>
                        <Heading level="h6" className="text-base sm:text-lg">Design Assistant</Heading>
                        <Para size="xs" color="secondary">Ask me anything</Para>
                    </div>
                </div>
                {!isDesktop && (
                    <motion.button
                        onClick={() => setIsOpen(false)}
                        whileHover={{ scale: 1.1, backgroundColor: 'var(--background-secondary)' }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="p-2 rounded-lg will-change-transform"
                    >
                        <FaTimes className="text-text-secondary" />
                    </motion.button>
                )}
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
                        <motion.div
                            transition={{ duration: 0.2 }}
                            className={`max-w-[85%] sm:max-w-[80%] p-sm rounded-xl will-change-transform ${message.type === 'user'
                                ? 'bg-accent-default text-white'
                                : 'bg-background-secondary-2 text-text-primary'
                                }`}
                        >
                            <Para size="sm" className={message.type === 'user' ? '!text-white' : ''}>{message.message}</Para>
                            <Para size="xs" className={`mt-xs opacity-70 ${message.type === 'user' ? '!text-white' : ''}`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Para>
                        </motion.div>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
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

            {/* Quick Prompts */}
            <div className="p-sm border-t border-border-default">
                <div className="flex gap-xs overflow-x-auto scrollbar-hide">
            {(sections.length ? sections : chatPrompts.slice(0, 3)).map((prompt, index) => (
                        <motion.button
                            key={index}
                            onClick={() => handleSendMessage(prompt)}
                            whileTap={{ scale: 0.95 }}
                            disabled={isRefining}
                            className="flex-shrink-0 text-para-xs px-sm py-xs bg-background-secondary border border-border-default rounded-lg hover:border-accent-default hover:bg-accent-subtle transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {prompt}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Input */}
            <div className="p-sm sm:p-md border-t border-border-default flex-shrink-0">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                    className="flex gap-sm"
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={isRefining ? "Refining your design..." : "Type your message..."}
                        disabled={isRefining}
                        className="flex-1 px-sm sm:px-md py-sm bg-background-secondary border border-border-default rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-default transition-colors text-para-sm disabled:opacity-50"
                        autoFocus
                    />
                    <motion.button
                        type="submit"
                        disabled={!inputValue.trim() || isRefining}
                        whileHover={inputValue.trim() && !isRefining ? { scale: 1.05, backgroundColor: 'var(--accent-hover)' } : {}}
                        whileTap={inputValue.trim() && !isRefining ? { scale: 0.95 } : {}}
                        transition={{ duration: 0.2 }}
                        className="p-sm bg-accent-default text-accent-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed will-change-transform"
                    >
                        <FaPaperPlane className="text-icon-sm" />
                    </motion.button>
                </form>
            </div>
        </div>
    );

    if (isDesktop) return ChatInterface;

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-hover)' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-accent-default text-accent-foreground rounded-full shadow-xl flex items-center justify-center z-[100] will-change-transform"
                    >
                        <FaComments className="text-icon-md sm:text-icon-lg" />
                    </motion.button>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpen && (
                    <>
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
                            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-96 h-[80vh] sm:h-[600px] z-50"
                        >
                            {ChatInterface}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(ChatPanel);