// src/scraper/components/SectionCard.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaThumbsUp,
    FaThumbsDown,
    FaEye,
    FaCopy,
    FaBullseye,
    FaLayerGroup,
    FaCheck,
    FaPlus,
    FaComments,
    FaPalette,
    FaFont,
    FaRulerCombined,
    FaCode,
    FaChevronDown,
    FaChevronUp,
} from 'react-icons/fa';
import { likeReasons, dislikeReasons } from '../constants';
import SuggestionsCarousel from './SuggestionsCarousel';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../common-components/Para';
import { AiOutlineRadiusUpright } from "react-icons/ai";
import SectionPreview from './SectionPreview';
import { useSelector } from 'react-redux';
import { callDesignAssistant, type DesignAssistantMessage } from '@/lib/requests/SwiperRequest';
import { selectLastUpdatedCategories } from '@/features/composition/compositionSelectors';

interface SectionCardProps {
    section: any;
    isDesignerMode: boolean;
    onFeedback: (feedback: 'like' | 'dislike') => void;
    feedback: 'like' | 'dislike' | null;
    onAddToLayout: (section: any) => void;
    updateTaste: (action: 'like' | 'dislike', section: any) => void;
    openChat: (context: any) => void;
    isJustRefined?: boolean;
}

const SectionCard = ({
    section,
    isDesignerMode,
    onFeedback,
    feedback,
    onAddToLayout,
    updateTaste,
    isJustRefined = false,
}: SectionCardProps) => {
    const [showLikeOptions, setShowLikeOptions] = useState(false);
    const [showDislikeOptions, setShowDislikeOptions] = useState(false);
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
    const [addedToLayout, setAddedToLayout] = useState(false);
    const [showJson, setShowJson] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);
    const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
    const [aiInput, setAiInput] = useState('');
    const [aiLoading, setAiLoading] = useState(false);

    const handleLike = () => {
        onFeedback('like');
        setShowLikeOptions(true);
        setShowDislikeOptions(false);
        updateTaste('like', section);
    };

    const handleDislike = () => {
        onFeedback('dislike');
        setShowDislikeOptions(true);
        setShowLikeOptions(false);
        updateTaste('dislike', section);
    };

    const handleAddToLayout = () => {
        onAddToLayout(section);
        setAddedToLayout(true);
        setTimeout(() => setAddedToLayout(false), 2000);
    };

    const handleReasonSelect = (reason: string) => {
        if (selectedReasons.includes(reason)) {
            setSelectedReasons(selectedReasons.filter(r => r !== reason));
        } else {
            setSelectedReasons([...selectedReasons, reason]);
        }
    };

    const handleUseSection = (alternativeSection: any) => {
        onAddToLayout({
            ...alternativeSection,
            originalId: section.id,
            replacedFrom: section.section_type
        });
    };

    // Build a rich description from all available section fields
    // so GPT always has full context regardless of which fields are populated
    // Build context ONLY from scraper section fields.
    // Scraper sections and compose sections are different shapes:
    //   Scraper: section_type, layout_structure, intent, tone (string), metadata.insight, editableProps, source_url
    //   Compose: category, content_slots, tokens, component_id  ← handled separately via ChatPanel refine
    const buildScraperSectionContext = (userSelectedReasons: string[] = []) => {
        const parts: string[] = [];

        if (section.section_type) parts.push(`Section type: ${section.section_type}`);
        if (section.layout_structure) parts.push(`Layout: ${section.layout_structure}`);
        if (section.intent) parts.push(`Intent: ${section.intent}`);
        if (section.tone) parts.push(`Tone: ${section.tone}`);

        if (section.metadata?.insight) parts.push(`Design insight: ${section.metadata.insight}`);

        // Headline from scraper editableProps only
        const headline = section.editableProps?.title
            ?? section.editableProps?.hero_heading
            ?? section.editableProps?.heading;
        if (headline) parts.push(`Headline: "${headline}"`);

        const subtitle = section.editableProps?.subtitle
            ?? section.editableProps?.hero_subheading;
        if (subtitle) parts.push(`Subheading: "${subtitle}"`);

        // Tags from scraper metadata
        const tags = section.metadata?.tags ?? section.tags;
        if (Array.isArray(tags) && tags.length > 0) {
            parts.push(`Tags: ${tags.slice(0, 5).join(', ')}`);
        }

        // User selected like reasons
        if (userSelectedReasons.length > 0) {
            parts.push(`User highlighted: ${userSelectedReasons.join(', ')}`);
        }

        if (section.source_url) parts.push(`From: ${section.source_url}`);

        return parts.join('. ');
    };

    const callAI = async (
        prompt: string,
        history: DesignAssistantMessage[],
        userSelectedReasons: string[] = []
    ): Promise<string> => {
        const context = buildScraperSectionContext(userSelectedReasons);
        const enrichedMessage = context
            ? `${prompt}\n\nSection context: ${context}`
            : prompt;
        const result = await callDesignAssistant({
            component_category: section.section_type ?? undefined,
            component_layout_structure: section.layout_structure ?? undefined,
            component_description: section.metadata?.insight ?? undefined,
            component_tags: userSelectedReasons.length > 0
                ? userSelectedReasons
                : (section.tone ? [section.tone] : undefined),
            conversation_history: history,
            user_message: enrichedMessage,
        });
        return result.response;
    };

    const handleAskAI = async (initialPrompt?: string) => {
        setShowAiModal(true);
        if (aiMessages.length > 0 && !initialPrompt) return;
        const prompt = initialPrompt ?? 'Why does this layout work?';
        setAiMessages([{ role: 'user', text: prompt }]);
        setAiLoading(true);
        try {
            // Pass currently selected like reasons so AI knows what the user noticed
            const response = await callAI(prompt, [], selectedReasons);
            setAiMessages([
                { role: 'user', text: prompt },
                { role: 'assistant', text: response },
            ]);
        } catch {
            setAiMessages(prev => [...prev, { role: 'assistant', text: 'Could not reach AI assistant.' }]);
        } finally {
            setAiLoading(false);
        }
    };

    const handleAiSend = async () => {
        const text = aiInput.trim();
        if (!text || aiLoading) return;
        setAiInput('');
        const newMessages = [...aiMessages, { role: 'user' as const, text }];
        setAiMessages(newMessages);
        setAiLoading(true);
        try {
            const history: DesignAssistantMessage[] = newMessages.slice(0, -1).map(m => ({
                role: m.role as 'user' | 'assistant',
                content: m.text,
            }));
            const response = await callAI(text, history);
            setAiMessages(prev => [...prev, { role: 'assistant', text: response }]);
        } catch {
            setAiMessages(prev => [...prev, { role: 'assistant', text: 'Could not reach AI assistant.' }]);
        } finally {
            setAiLoading(false);
        }
    };

    const handleMoreLikeThis = () => {
        handleAskAI(`What other ${section.section_type ?? 'section'} styles or approaches with similar intent would complement this ${section.layout_structure ?? ''} layout?`);
    };

    const isComposeSection = 'component_id' in section && 'content_slots' in section;
    const lastUpdatedCategories = useSelector(selectLastUpdatedCategories);


    const handleCloneSection = () => {
        navigator.clipboard.writeText(JSON.stringify({
            section_type: section.section_type,
            layout_structure: section.layout_structure,
            intent: section.intent,
            tone: section.tone,
            tokens: section.design?.tokens || {}
        }, null, 2));
    };

    return (
        <motion.div
            // ✅ FIX: Removed initial={{ opacity: 0, y: 20 }} and animate={{ opacity: 1, y: 0 }}
            // to prevent the "floating" effect on scroll.
            animate={isJustRefined ? {
                boxShadow: ['0 0 0 0px rgba(99,102,241,0)', '0 0 0 3px rgba(99,102,241,0.6)', '0 0 0 3px rgba(99,102,241,0.3)', '0 0 0 0px rgba(99,102,241,0)'],
                transition: { duration: 1.8, ease: 'easeOut' }
            } : {}}
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            className={`bg-background-secondary border rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-300 ${isJustRefined ? 'border-accent-default' : 'border-border-default'}`}
        >
            {/* Section Screenshot */}
            <div className="relative h-40 sm:h-48 md:h-64 bg-background-muted overflow-hidden">
                {(isComposeSection ? (
                    <SectionPreview
                        section={section}
                        highlighted={lastUpdatedCategories.includes(section.category)}
                    />
                ) : (
                    <img
                        src={section.screenshot_url}
                        alt={`${section.section_type} section`}
                        className="w-full h-full object-contain" style={{ backgroundColor: "var(--color-background-muted, #f3f4f6)" }}
                    />
                ))}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className="bg-background-dark/90 text-text-light px-sm sm:px-md py-xs sm:py-sm rounded-lg text-para-xs sm:text-para-sm font-medium shadow-lg">
                        {section.section_type}
                    </span>
                </div>
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 hidden sm:block">
                    <span className="bg-background-dark/90 text-text-light px-md py-sm rounded-lg text-para-sm shadow-lg">
                        {section.layout_structure}
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-md sm:p-lg">
                {/* Section Header */}
                <div className="mb-md">
                    <Heading level="h5" className="mb-sm">
                        {section.section_type}
                    </Heading>
                    <div className="flex flex-wrap items-center gap-xs sm:gap-sm text-para-xs sm:text-para-sm">
                        <span className="flex items-center gap-xs group cursor-pointer">
                            <FaBullseye className="text-icon-sm text-accent-default" />
                            {section.intent && (
                                <Para size="sm" color="secondary" className="group-hover:text-text-primary transition-colors">
                                    {section.intent}
                                </Para>
                            )}
                        </span>
                        <span className="text-text-tertiary hidden sm:inline">•</span>
                        <span className="flex items-center gap-xs group cursor-pointer">
                            <FaLayerGroup className="text-icon-sm text-accent-default" />
                            {section.layout_structure && (
                                <Para size="sm" color="secondary" className="group-hover:text-text-primary transition-colors">
                                    {section.layout_structure}
                                </Para>
                            )}
                        </span>
                        {section.tone && (
                            <>
                                <span className="text-text-tertiary hidden sm:inline">•</span>
                                <span className="flex items-center gap-xs group cursor-pointer">
                                    <FaPalette className="text-icon-sm text-accent-default" />
                                    <Para size="sm" color="secondary" className="group-hover:text-text-primary transition-colors">
                                        {section.tone}
                                    </Para>
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Reveal Mode Content */}
                <AnimatePresence mode="wait">
                    {!isDesignerMode ? (
                        /* Client View */
                        <motion.div
                            key="client"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-md"
                        >
                            {section.metadata?.insight && (
                                <div className="bg-background-muted rounded-xl p-sm sm:p-md">
                                    <Para size="sm" className="leading-relaxed">
                                        {section.metadata.insight}
                                    </Para>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        /* Designer View */
                        <motion.div
                            key="designer"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-md space-y-md"
                        >
                            {/* JSON Toggle */}
                            <button
                                onClick={() => setShowJson(!showJson)}
                                className="w-full bg-background-dark text-text-light rounded-xl p-sm sm:p-md flex items-center justify-between hover:bg-gray-800 transition-colors"
                            >
                                <span className="flex items-center gap-sm">
                                    <FaCode className="text-icon-sm" />
                                    <span className="font-mono text-xs sm:text-sm">View JSON Metadata</span>
                                </span>
                                {showJson ? <FaChevronUp /> : <FaChevronDown />}
                            </button>

                            {/* Technical Metadata */}
                            <AnimatePresence>
                                {showJson && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-background-dark text-text-light rounded-xl p-sm sm:p-md font-mono text-xs overflow-x-auto"
                                    >
                                        <pre className="whitespace-pre-wrap">
                                            {JSON.stringify({
                                                section_type: section.section_type,
                                                layout_structure: section.layout_structure,
                                                intent: section.intent,
                                                tone: section.tone,
                                                editableProps: section.editableProps,
                                                interactive_elements: section.design?.interactive_elements || [],
                                                tokens: section.design?.tokens || {}
                                            }, null, 2)}
                                        </pre>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Design Tokens */}
                            {section.design?.tokens && (
                                <div className="bg-background-muted rounded-xl p-sm sm:p-md">
                                    <Heading level="h6" className="mb-sm">Design Tokens</Heading>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
                                        <div className="flex items-center gap-xs">
                                            <FaFont className="text-icon-sm text-text-secondary" />
                                            <Para size="sm">{section.design.tokens.font}</Para>
                                        </div>
                                        <div className="flex items-center gap-xs">
                                            <FaRulerCombined className="text-icon-sm text-text-secondary" />
                                            <Para size="sm">{section.design.tokens.spacing}</Para>
                                        </div>
                                        <div className="flex items-center gap-xs">
                                            <AiOutlineRadiusUpright className="text-icon-sm text-text-secondary" />
                                            <Para size="sm">{section.design.tokens.radius}</Para>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Action Buttons */}
                {!isDesignerMode ? (
                    /* Client Mode Actions */
                    <div>
                        {/* Initial Feedback Buttons */}
                        {!feedback && (
                            <div className="flex gap-sm">
                                <motion.button
                                    onClick={handleLike}
                                    whileHover={{
                                        y: -2,
                                        boxShadow: "0 4px 12px rgba(52, 211, 153, 0.2)",
                                        borderColor: 'rgb(52, 211, 153)',
                                        color: 'rgb(5, 150, 105)',
                                        backgroundColor: 'rgba(209, 250, 229, 0.5)'
                                    }}
                                    whileTap={{ y: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="flex-1 flex items-center justify-center gap-xs sm:gap-sm px-sm sm:px-md py-sm sm:py-md rounded-xl text-para-sm sm:text-para-md font-medium bg-background-primary border border-border-default text-text-secondary will-change-transform"
                                >
                                    <FaThumbsUp className="text-icon-sm sm:text-icon-md" />
                                    <span className="hidden sm:inline">Works for me</span>
                                    <span className="sm:hidden">Like</span>
                                </motion.button>
                                <motion.button
                                    onClick={handleDislike}
                                    whileHover={{
                                        y: -2,
                                        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
                                        borderColor: 'rgb(248, 113, 113)',
                                        color: 'rgb(220, 38, 38)',
                                        backgroundColor: 'rgba(254, 226, 226, 0.5)'
                                    }}
                                    whileTap={{ y: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="flex-1 flex items-center justify-center gap-xs sm:gap-sm px-sm sm:px-md py-sm sm:py-md rounded-xl text-para-sm sm:text-para-md font-medium bg-background-primary border border-border-default text-text-secondary will-change-transform"
                                >
                                    <FaThumbsDown className="text-icon-sm sm:text-icon-md" />
                                    <span className="hidden sm:inline">Doesn't fit</span>
                                    <span className="sm:hidden">Dislike</span>
                                </motion.button>
                            </div>
                        )}

                        {/* Like Expansion */}
                        <AnimatePresence>
                            {showLikeOptions && feedback === 'like' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-md"
                                >
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-sm sm:p-md border border-emerald-200 dark:border-emerald-800">
                                        <Para size="sm" weight="medium" className="mb-sm">
                                            What do you like about this?
                                        </Para>
                                        <div className="flex flex-wrap gap-xs mb-md">
                                            {likeReasons.map((reason) => (
                                                <motion.button
                                                    key={reason}
                                                    onClick={() => handleReasonSelect(reason)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className={`px-sm py-xs rounded-full text-para-xs font-medium will-change-transform ${selectedReasons.includes(reason)
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-white dark:bg-emerald-800 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                                                        }`}
                                                >
                                                    {reason}
                                                </motion.button>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
                                            <motion.button
                                                onClick={handleAddToLayout}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                                className="bg-accent-default text-accent-foreground py-sm rounded-lg text-para-xs sm:text-para-sm font-medium hover:bg-accent-hover transition-colors flex items-center justify-center gap-xs will-change-transform"
                                            >
                                                {addedToLayout ? (
                                                    <motion.span
                                                        key="added"
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="flex items-center justify-center gap-xs"
                                                    >
                                                        <FaCheck className="text-icon-sm" /> Added!
                                                    </motion.span>
                                                ) : (
                                                    <motion.span
                                                        key="use-this"
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="flex items-center justify-center gap-xs"
                                                    >
                                                        <FaPlus className="text-icon-sm" /> Use this
                                                    </motion.span>
                                                )}
                                            </motion.button>
                                            <motion.button
                                                onClick={handleMoreLikeThis}
                                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(209, 250, 229, 0.5)' }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                                className="bg-white dark:bg-emerald-800 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 py-sm rounded-lg text-para-xs sm:text-para-sm font-medium will-change-transform"
                                            >
                                                More like this
                                            </motion.button>
                                            <motion.button
                                                onClick={() => handleAskAI()}
                                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(209, 250, 229, 0.5)' }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                                className="bg-white dark:bg-emerald-800 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 py-sm rounded-lg text-para-xs sm:text-para-sm font-medium flex items-center justify-center gap-xs will-change-transform"
                                            >
                                                <FaComments className="text-icon-sm" />
                                                Ask AI
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Dislike Expansion */}
                            {showDislikeOptions && feedback === 'dislike' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-md"
                                >
                                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-sm sm:p-md border border-red-200 dark:border-red-800">
                                        <Para size="sm" weight="medium" className="mb-sm">
                                            What didn't work for you?
                                        </Para>
                                        <div className="flex flex-wrap gap-xs mb-md">
                                            {dislikeReasons.map((reason) => (
                                                <motion.button
                                                    key={reason}
                                                    onClick={() => handleReasonSelect(reason)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className={`px-sm py-xs rounded-full text-para-xs font-medium will-change-transform ${selectedReasons.includes(reason)
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-white dark:bg-red-800 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300'
                                                        }`}
                                                >
                                                    {reason}
                                                </motion.button>
                                            ))}
                                        </div>
                                        <div className="bg-white dark:bg-red-800/20 rounded-lg p-sm mb-md border border-red-200 dark:border-red-700">
                                            <Para size="sm" color="secondary" align="center">
                                                Not your style? Swipe for your ideal site.
                                            </Para>
                                        </div>
                                    </div>
                                    <SuggestionsCarousel
                                        sectionId={section.id}
                                        onUseSection={handleUseSection}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    /* Designer Mode Actions */
                    <div className="flex flex-col sm:flex-row gap-sm">
                        <motion.button
                            onClick={() => setShowJson(!showJson)}
                            whileHover={{ scale: 1.02, borderColor: 'var(--accent-default)', color: 'var(--accent-default)' }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 flex items-center justify-center gap-xs sm:gap-sm px-sm sm:px-md py-sm sm:py-md bg-background-primary border border-border-default rounded-xl text-para-xs sm:text-para-sm text-text-secondary will-change-transform"
                        >
                            <FaEye className="text-icon-sm" />
                            Inspect Code
                        </motion.button>
                        <motion.button
                            onClick={handleCloneSection}
                            whileHover={{ scale: 1.02, borderColor: 'var(--accent-default)', color: 'var(--accent-default)' }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 flex items-center justify-center gap-xs sm:gap-sm px-sm sm:px-md py-sm sm:py-md bg-background-primary border border-border-default rounded-xl text-para-xs sm:text-para-sm text-text-secondary will-change-transform"
                        >
                            <FaCopy className="text-icon-sm" />
                            Clone Section
                        </motion.button>
                    </div>
                )}
            </div>

            {/* ── Inline AI Modal ── */}
            <AnimatePresence>
                {showAiModal && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-border-default bg-background-primary"
                    >
                        <div className="p-md space-y-sm">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-xs">
                                    <FaComments className="text-accent-default text-icon-sm" />
                                    <Para size="sm" weight="medium">AI Analysis</Para>
                                </div>
                                <button
                                    onClick={() => setShowAiModal(false)}
                                    className="p-xs text-text-tertiary hover:text-text-primary rounded-full transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="space-y-sm max-h-48 overflow-y-auto">
                                {aiMessages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] px-sm py-xs rounded-lg text-para-xs sm:text-para-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-accent-default text-accent-foreground'
                                                : 'bg-background-secondary text-text-secondary'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {aiLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-background-secondary px-sm py-xs rounded-lg flex gap-xs items-center">
                                            {[0, 1, 2].map(i => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1.5 h-1.5 bg-text-tertiary rounded-full"
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="flex gap-xs">
                                <input
                                    type="text"
                                    value={aiInput}
                                    onChange={e => setAiInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') handleAiSend(); }}
                                    placeholder="Ask a follow-up..."
                                    disabled={aiLoading}
                                    className="flex-1 px-sm py-xs bg-background-secondary border border-border-default rounded-lg text-para-xs sm:text-para-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-default focus:outline-none transition-colors disabled:opacity-50"
                                />
                                <button
                                    onClick={handleAiSend}
                                    disabled={!aiInput.trim() || aiLoading}
                                    className="px-sm py-xs bg-accent-default text-accent-foreground rounded-lg text-para-xs disabled:opacity-50 transition-opacity"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SectionCard;