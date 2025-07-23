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
import Para from '../../../comman-components/Para';
import { AiOutlineRadiusUpright } from "react-icons/ai";


interface SectionCardProps {
    section: any;
    isDesignerMode: boolean;
    onFeedback: (feedback: 'like' | 'dislike') => void;
    feedback: 'like' | 'dislike' | null;
    onAddToLayout: (section: any) => void;
    updateTaste: (action: 'like' | 'dislike', section: any) => void;
    openChat: (context: any) => void;
}

const SectionCard = ({
    section,
    isDesignerMode,
    onFeedback,
    feedback,
    onAddToLayout,
    updateTaste,
    openChat
}: SectionCardProps) => {
    const [showLikeOptions, setShowLikeOptions] = useState(false);
    const [showDislikeOptions, setShowDislikeOptions] = useState(false);
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
    const [addedToLayout, setAddedToLayout] = useState(false);
    const [showJson, setShowJson] = useState(false);

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

    const handleAskAI = () => {
        openChat({
            prompt: 'Why does this work?',
            context: {
                sectionId: section.id,
                metadata: section.metadata
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background-secondary border border-border-default rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
        >
            {/* Section Screenshot */}
            <div className="relative h-40 sm:h-48 md:h-64 bg-background-muted overflow-hidden">
                <img
                    src={section.screenshot_url}
                    alt={`${section.section_type} section`}
                    className="w-full h-full object-cover"
                />
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
                        <span className="flex items-center gap-xs">
                            <FaBullseye className="text-icon-sm text-accent-default" />
                            <Para size="sm" color="secondary">{section.intent}</Para>
                        </span>
                        <span className="text-text-tertiary hidden sm:inline">•</span>
                        <span className="flex items-center gap-xs">
                            <FaLayerGroup className="text-icon-sm text-accent-default" />
                            <Para size="sm" color="secondary">{section.layout_structure}</Para>
                        </span>
                        {section.tone && (
                            <>
                                <span className="text-text-tertiary hidden sm:inline">•</span>
                                <span className="flex items-center gap-xs">
                                    <FaPalette className="text-icon-sm text-accent-default" />
                                    <Para size="sm" color="secondary">{section.tone}</Para>
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
                            <div className="bg-background-muted rounded-xl p-sm sm:p-md">
                                <Para size="sm" className="leading-relaxed">
                                    {section.metadata?.insight || "This section creates a strong visual impact and guides users towards the main action."}
                                </Para>
                            </div>
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

                            {/* Matched Components */}
                            {section.design?.matched_components && (
                                <div>
                                    <Heading level="h6" className="mb-sm">
                                        Matched Components
                                    </Heading>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-sm">
                                        {section.design.matched_components.map((comp: any) => (
                                            <div key={comp.id} className="relative group cursor-pointer">
                                                <img
                                                    src={comp.thumbnail}
                                                    alt={comp.name}
                                                    className="w-full h-16 sm:h-20 object-cover rounded-lg border border-border-default group-hover:border-accent-default transition-colors"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center p-1">
                                                    <Para size="xs" color="light" weight="medium" align="center">
                                                        {comp.name}
                                                    </Para>
                                                </div>
                                            </div>
                                        ))}
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
                                <button
                                    onClick={handleLike}
                                    className="flex-1 flex items-center justify-center gap-xs sm:gap-sm px-sm sm:px-md py-sm sm:py-md rounded-xl text-para-sm sm:text-para-md font-medium bg-background-primary border border-border-default text-text-secondary hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                                >
                                    <FaThumbsUp className="text-icon-sm sm:text-icon-md" />
                                    <span className="hidden sm:inline">Like</span>
                                </button>
                                <button
                                    onClick={handleDislike}
                                    className="flex-1 flex items-center justify-center gap-xs sm:gap-sm px-sm sm:px-md py-sm sm:py-md rounded-xl text-para-sm sm:text-para-md font-medium bg-background-primary border border-border-default text-text-secondary hover:border-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                >
                                    <FaThumbsDown className="text-icon-sm sm:text-icon-md" />
                                    <span className="hidden sm:inline">Dislike</span>
                                </button>
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
                                                <button
                                                    key={reason}
                                                    onClick={() => handleReasonSelect(reason)}
                                                    className={`px-sm py-xs rounded-full text-para-xs font-medium transition-colors ${
                                                        selectedReasons.includes(reason)
                                                            ? 'bg-emerald-500 text-white'
                                                            : 'bg-white dark:bg-emerald-800 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-700'
                                                    }`}
                                                >
                                                    {reason}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
                                            <button
                                                onClick={handleAddToLayout}
                                                className="bg-accent-default text-accent-foreground py-sm rounded-lg text-para-xs sm:text-para-sm font-medium hover:bg-accent-hover transition-colors flex items-center justify-center gap-xs"
                                            >
                                                {addedToLayout ? (
                                                    <>
                                                        <FaCheck className="text-icon-sm" />
                                                        Added!
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaPlus className="text-icon-sm" />
                                                        Use this
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => console.log('Get more like this')}
                                                className="bg-white dark:bg-emerald-800 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 py-sm rounded-lg text-para-xs sm:text-para-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-700 transition-colors"
                                            >
                                                More like this
                                            </button>
                                            <button
                                                onClick={handleAskAI}
                                                className="bg-white dark:bg-emerald-800 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 py-sm rounded-lg text-para-xs sm:text-para-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-700 transition-colors flex items-center justify-center gap-xs"
                                            >
                                                <FaComments className="text-icon-sm" />
                                                Ask AI
                                            </button>
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
                                            What didn't you like?
                                        </Para>
                                        <div className="flex flex-wrap gap-xs mb-md">
                                            {dislikeReasons.map((reason) => (
                                                <button
                                                    key={reason}
                                                    onClick={() => handleReasonSelect(reason)}
                                                    className={`px-sm py-xs rounded-full text-para-xs font-medium transition-colors ${
                                                        selectedReasons.includes(reason)
                                                            ? 'bg-red-500 text-white'
                                                            : 'bg-white dark:bg-red-800 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-700'
                                                    }`}
                                                >
                                                    {reason}
                                                </button>
                                            ))}
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
                        <button className="flex-1 flex items-center justify-center gap-xs sm:gap-sm px-sm sm:px-md py-sm sm:py-md bg-background-primary border border-border-default rounded-xl text-para-xs sm:text-para-sm text-text-secondary hover:text-accent-default hover:border-accent-default transition-all">
                            <FaEye className="text-icon-sm" />
                            Inspect Code
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-xs sm:gap-sm px-sm sm:px-md py-sm sm:py-md bg-background-primary border border-border-default rounded-xl text-para-xs sm:text-para-sm text-text-secondary hover:text-accent-default hover:border-accent-default transition-all">
                            <FaCopy className="text-icon-sm" />
                            Clone Section
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default SectionCard;