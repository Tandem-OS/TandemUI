import { useState, useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { mockChatResponses, chatPrompts } from '../constants';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../common-components/Para';
import {
    refineComposition,
    fetchVersions,
    fetchVersionByNumber,
    restoreVersion,
    setPageSchema,
    setPreviewSchema,
    clearPreview,
} from '@/features/composition/compositionSlice';
import {
    selectIsRefining,
    selectVersions,
    selectCurrentVersion,
    selectVersionsStatus,
    selectRestoreStatus,
    selectIsPreviewingHistory,
} from '@/features/composition/compositionSelectors';
import type { AppDispatch, RootState } from '@/store';

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
    reasoning?: string;
    timestamp: Date;
}

interface ChatPanelProps {
    context?: any;
    compositionId?: string | null;
    projectId?: string | null;
    sections?: string[];
    onRefineComplete?: (refinedSections: string[]) => void;
    onRestoreComplete?: (newCompositionId: string) => void;
}

// ─── Reasoning Toggle ─────────────────────────────────────────────────────────

interface ReasoningToggleProps {
    reasoning: string;
}

const ReasoningToggle = ({ reasoning }: ReasoningToggleProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-xs border-t border-border-default pt-xs">
            <motion.button
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center gap-xs text-para-xs text-text-secondary hover:text-text-primary transition-colors"
                whileTap={{ scale: 0.97 }}
            >
                <span>💡 View reasoning</span>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex ml-xs"
                >
                    ›
                </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="reasoning"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <Para
                            size="xs"
                            color="secondary"
                            className="mt-xs leading-relaxed border-l-2 border-accent-default pl-xs italic"
                        >
                            {reasoning}
                        </Para>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── Version Navigator ────────────────────────────────────────────────────────

interface VersionNavigatorProps {
    projectId: string;
    versions: import('@/features/composition/compositionSlice').VersionEntry[];
    currentVersion: number | null;
    restoreStatus: 'idle' | 'loading' | 'error';
    isPreviewingHistory: boolean;
    onRestore: (targetVersion: number) => void;
    onVersionChange: (msgs: ChatMessage[]) => void;
    onPageSchemaChange: (schema: any) => void;
}

const VersionNavigator = ({
    projectId,
    versions,
    currentVersion,
    restoreStatus,
    isPreviewingHistory,
    onRestore,
    onVersionChange,
    onPageSchemaChange,
}: VersionNavigatorProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [viewingVersion, setViewingVersion] = useState<number | null>(currentVersion);
    const [isFetching, setIsFetching] = useState(false);
    const [refinePrompt, setRefinePrompt] = useState<string | null>(null);
    const [isCurrent, setIsCurrent] = useState(true);
    useEffect(() => {
        if (!isPreviewingHistory) {
            setIsCurrent(true);
        }
    }, [isPreviewingHistory]);
    const allVersionNumbers = versions.map(v => v.version_number);
    const minVersion = Math.min(...allVersionNumbers);
    const maxVersion = currentVersion ?? Math.max(...allVersionNumbers);
    const totalVersions = versions.length;

    const canGoBack = viewingVersion !== null && viewingVersion > minVersion && !isFetching;
    const canGoForward = viewingVersion !== null && viewingVersion < maxVersion && !isFetching;

    const navigate = async (targetVersion: number) => {
        if (!projectId || isFetching) return;
        setIsFetching(true);
        try {
            const result = await dispatch(
                fetchVersionByNumber({ projectId, versionNumber: targetVersion })
            ).unwrap();

            setViewingVersion(targetVersion);
            setRefinePrompt(result.refinePrompt);
            setIsCurrent(result.isCurrent);
            onPageSchemaChange(result.pageSchema);

            onVersionChange([
                {
                    id: `v-${targetVersion}-prompt`,
                    type: 'user',
                    message: result.refinePrompt,
                    timestamp: new Date(),
                },
                {
                    id: `v-${targetVersion}-response`,
                    type: 'assistant',
                    message: result.chatResponse,
                    reasoning: result.reasoning ?? undefined, // ← reasoning attached here
                    timestamp: new Date(),
                },
            ]);
        } catch {
            // fetch failed — viewingVersion stays unchanged
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <div className="px-sm py-xs border-b border-border-default bg-background-secondary flex-shrink-0 space-y-xs">
            {/* Navigation row */}
            <div className="flex items-center justify-between gap-xs">
                <motion.button
                    onClick={() => viewingVersion !== null && navigate(viewingVersion - 1)}
                    disabled={!canGoBack}
                    whileTap={canGoBack ? { scale: 0.9 } : {}}
                    className="flex items-center gap-xs px-sm py-xs rounded-lg border border-border-default text-text-secondary hover:border-accent-default hover:text-accent-default transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-para-xs font-medium"
                >
                    ← Older
                </motion.button>

                <div className="flex flex-col items-center gap-xs">
                    <div className="flex items-center gap-xs">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isPreviewingHistory
                            ? 'bg-amber-500'
                            : 'bg-green-500 animate-pulse'
                            }`} />
                        <Para size="xs" color="secondary" className="text-center tabular-nums font-medium">
                            {isFetching
                                ? 'Loading...'
                                : (() => {
                                    const idx = versions.findIndex(v => v.version_number === (viewingVersion ?? maxVersion));
                                    const pos = idx !== -1 ? idx + 1 : totalVersions;
                                    const label = `v${viewingVersion ?? maxVersion}  ·  ${pos} of ${totalVersions}`;
                                    return isPreviewingHistory
                                        ? `${label}  ·  preview`
                                        : `${label}  ·  live`;
                                })()}
                        </Para>
                    </div>
                </div>

                <motion.button
                    onClick={() => viewingVersion !== null && navigate(viewingVersion + 1)}
                    disabled={!canGoForward}
                    whileTap={canGoForward ? { scale: 0.9 } : {}}
                    className="flex items-center gap-xs px-sm py-xs rounded-lg border border-border-default text-text-secondary hover:border-accent-default hover:text-accent-default transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-para-xs font-medium"
                >
                    Newer →
                </motion.button>
            </div>

            {/* Refine prompt label */}
            {refinePrompt && (
                <Para size="xs" color="secondary" className="truncate text-center italic">
                    "{refinePrompt}"
                </Para>
            )}

            {/* Restore button — only when not viewing current */}
            {!isCurrent && viewingVersion !== null && (
                <motion.button
                    onClick={() => onRestore(viewingVersion)}
                    disabled={restoreStatus === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full text-para-xs py-xs rounded-lg border border-accent-default text-accent-default hover:bg-accent-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {restoreStatus === 'loading' ? 'Restoring...' : 'Restore this version'}
                </motion.button>
            )}

            {/* Restore error */}
            {restoreStatus === 'error' && (
                <Para size="xs" className="text-center !text-red-500">
                    Restore failed. Please try again.
                </Para>
            )}
        </div>
    );
};

// ─── Chat Panel ───────────────────────────────────────────────────────────────

const ChatPanel = ({
    context,
    compositionId,
    projectId,
    sections = [],
    onRefineComplete,
    onRestoreComplete,
}: ChatPanelProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            type: 'assistant',
            message: "Ask me anything about this layout. I'll explain or improve it.",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set());

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const processedContextRef = useRef<Set<string>>(new Set());

    const dispatch = useDispatch<AppDispatch>();
    const isRefining = useSelector(selectIsRefining);
    const versions = useSelector(selectVersions);
    const currentVersion = useSelector(selectCurrentVersion);
    const restoreStatus = useSelector(selectRestoreStatus);
    const isPreviewingHistory = useSelector(selectIsPreviewingHistory);
    const reduxProjectId = useSelector((state: RootState) => state.project.projectId);
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const resolvedProjectId = reduxProjectId ?? projectId;

    useEffect(() => {
        setSelectedSections(new Set());
    }, [sections.join(',')]);

    useEffect(() => {
        if (compositionId && resolvedProjectId) {
            dispatch(fetchVersions(resolvedProjectId));
        }
    }, [compositionId, resolvedProjectId]);

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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const simulateTyping = async (response: string) => {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        setIsTyping(false);
        return response;
    };

    const toggleSection = (sectionType: string) => {
        setSelectedSections(prev => {
            const next = new Set(prev);
            next.has(sectionType) ? next.delete(sectionType) : next.add(sectionType);
            return next;
        });
    };

    const handleRestore = async (targetVersion: number) => {
        if (!resolvedProjectId) return;
        try {
            const result = await dispatch(restoreVersion({
                projectId: resolvedProjectId,
                targetVersion,
            })).unwrap();
            dispatch(clearPreview());
            onRestoreComplete?.(result.newCompositionId);
        } catch {
            // restoreStatus in Redux will be 'error' — UI reads from there
        }
    };

    const handleSendMessage = async (message: string) => {
        if (!message.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: 'user',
            message,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        if (compositionId && selectedSections.size > 0) {
            setIsTyping(true);
            try {
                const result = await dispatch(refineComposition({
                    compositionId,
                    sections: Array.from(selectedSections),
                    userInstruction: message.trim(),
                })).unwrap();

                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    type: 'assistant',
                    message: result.chatResponse ?? `Done! Updated ${Array.from(selectedSections).join(', ')}.`,
                    reasoning: result.reasoning ?? undefined, // ← ADD this line
                    timestamp: new Date(),
                }]);

                onRefineComplete?.(Array.from(selectedSections));
                setSelectedSections(new Set());

                if (resolvedProjectId) dispatch(fetchVersions(resolvedProjectId));
            } catch (err: any) {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    type: 'assistant',
                    message: err ?? 'Something went wrong. Please try again.',
                    timestamp: new Date(),
                }]);
            } finally {
                setIsTyping(false);
            }
            return;
        }

        if (compositionId && selectedSections.size === 0) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                message: 'Select at least one section above before sending an instruction.',
                timestamp: new Date(),
            }]);
            return;
        }

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
            const { section_type, layout_structure } = context.context.metadata;
            response = `For this ${section_type} section with ${layout_structure} layout: ${response}`;
        }
        const assistantResponse = await simulateTyping(response);
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            message: assistantResponse,
            timestamp: new Date(),
        }]);
    };

    const canSubmit = compositionId
        ? inputValue.trim().length > 0 && selectedSections.size > 0 && !isRefining && !isPreviewingHistory
        : inputValue.trim().length > 0 && !isRefining && !isPreviewingHistory;

    const ChatInterface = (
        <div className="h-full w-full bg-background-primary-2 rounded-2xl max-md:rounded-b-none shadow-md border border-border-default flex flex-col">
            {/* Header */}
            <div className="p-md border-b border-border-default flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-sm">
                    <motion.div
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-subtle rounded-full flex items-center justify-center will-change-transform"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
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

            {/* Version Navigator */}
            {compositionId && versions.length > 0 && resolvedProjectId && (
                <VersionNavigator
                    projectId={resolvedProjectId}
                    versions={versions}
                    currentVersion={currentVersion}
                    restoreStatus={restoreStatus}
                    isPreviewingHistory={isPreviewingHistory}
                    onRestore={handleRestore}
                    onVersionChange={(msgs) => setMessages(prev => [...prev, ...msgs])}
                    onPageSchemaChange={(schema) => dispatch(setPreviewSchema(schema))} />
            )}
            {/* Preview Mode Banner */}
            {isPreviewingHistory && (
                <div className="flex items-center justify-between gap-xs px-sm py-xs bg-amber-500/10 border-b border-amber-500/30 flex-shrink-0">
                    <div className="flex items-center gap-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <Para size="xs" className="!text-amber-600 dark:!text-amber-400 font-medium">
                            Browsing history — canvas shows a past version
                        </Para>
                    </div>
                    <motion.button
                        onClick={() => dispatch(clearPreview())}
                        whileTap={{ scale: 0.95 }}
                        className="text-para-xs text-amber-600 dark:text-amber-400 hover:underline flex-shrink-0"
                    >
                        Back to live
                    </motion.button>
                </div>
            )}

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
                            <Para size="sm" className={message.type === 'user' ? '!text-white' : ''}>
                                {message.message}
                            </Para>
                            <Para size="xs" className={`mt-xs opacity-70 ${message.type === 'user' ? '!text-white' : ''}`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Para>
                            {/* Reasoning toggle — only on assistant messages with reasoning */}
                            {message.type === 'assistant' && message.reasoning && (
                                <ReasoningToggle reasoning={message.reasoning} />
                            )}
                        </motion.div>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-background-secondary p-sm rounded-xl">
                            <div className="flex gap-xs">
                                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Section selector (refine mode) / quick prompts (mock mode) */}
            <div className="p-sm border-t border-border-default">
                {compositionId && sections.length > 0 ? (
                    <div className="space-y-xs">
                        {selectedSections.size === 0 ? (
                            <Para size="xs" color="secondary">Select sections to refine:</Para>
                        ) : (
                            <div className="flex items-center gap-xs px-sm py-xs rounded-full bg-accent-subtle border border-accent-default w-fit">
                                <FaCheck className="text-accent-default text-[10px]" />
                                <Para size="xs" color="accent" weight="medium">
                                    {selectedSections.size === 1 ? `1 section selected` : `${selectedSections.size} sections selected`}
                                </Para>
                            </div>
                        )}
                        <div className="flex gap-xs flex-wrap">
                            {sections.map((sectionType) => {
                                const isSelected = selectedSections.has(sectionType);
                                return (
                                    <motion.button
                                        key={sectionType}
                                        onClick={() => toggleSection(sectionType)}
                                        whileHover={{ scale: isRefining ? 1 : 1.04 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={isRefining || isPreviewingHistory}
                                        className={`flex-shrink-0 flex items-center gap-xs text-para-xs px-sm py-xs rounded-lg border transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${isSelected ? 'bg-accent-default text-accent-foreground border-accent-default shadow-sm'
                                            : 'bg-background-secondary border-border-default text-text-secondary hover:border-accent-default hover:text-text-primary hover:bg-accent-subtle'
                                            }`}
                                    >
                                        {isSelected && <FaCheck className="text-[10px]" />}
                                        {sectionType}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-xs overflow-x-auto scrollbar-hide">
                        {chatPrompts.slice(0, 3).map((prompt, index) => (
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
                )}
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
                        placeholder={
                            isPreviewingHistory
                                ? 'Restore this version to make changes...'
                                : isRefining
                                    ? 'Refining your design...'
                                    : compositionId && selectedSections.size === 0
                                        ? 'Select sections above first...'
                                        : 'Type your instruction...'
                        }
                        disabled={isRefining || isPreviewingHistory}
                        className="flex-1 px-sm sm:px-md py-sm bg-background-secondary border border-border-default rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-default transition-colors text-para-sm disabled:opacity-50"
                        autoFocus
                    />
                    <motion.button
                        type="submit"
                        disabled={!canSubmit}
                        whileHover={canSubmit ? { scale: 1.05, backgroundColor: 'var(--accent-hover)' } : {}}
                        whileTap={canSubmit ? { scale: 0.95 } : {}}
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