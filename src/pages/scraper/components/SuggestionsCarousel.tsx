// src/scraper/components/SuggestionsCarousel.tsx - Enhanced with better header and tooltips

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaChevronLeft, FaChevronRight, FaInfoCircle } from 'react-icons/fa';
import { mockSuggestions } from '../constants';
import Para from '../../../common-components/Para';
import Heading from '../../../components/demos/typography/Heading';

interface Suggestion {
    id: string;
    section_type: string;
    layout_structure: string;
    intent: string;
    tone: string;
    screenshot_url: string;
    metadata: {
        insight: string;
    };
}

interface SuggestionsCarouselProps {
    sectionId: string;
    onUseSection: (section: Suggestion) => void;
}

const SuggestionsCarousel = ({ sectionId, onUseSection }: SuggestionsCarouselProps) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const sectionSuggestions = mockSuggestions[sectionId as keyof typeof mockSuggestions] || 
                                     mockSuggestions['hero-1'];
            setSuggestions(sectionSuggestions);
            setIsLoading(false);
        }, 600);
    }, [sectionId]);

    const handlePrevious = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(suggestions.length - 2, prev + 1));
    };

    const canGoNext = currentIndex < suggestions.length - 2;
    const canGoPrev = currentIndex > 0;

    if (isLoading) {
        return (
            <div className="mt-md">
                <Para size="sm" color="secondary" className="mb-sm">Finding alternatives...</Para>
                <div className="grid grid-cols-2 gap-sm">
                    <div className="h-32 sm:h-40 bg-background-secondary rounded-xl animate-pulse" />
                    <div className="h-32 sm:h-40 bg-background-secondary rounded-xl animate-pulse" />
                </div>
            </div>
        );
    }

    if (suggestions.length === 0) {
        return (
            <div className="mt-md p-md bg-background-secondary rounded-xl text-center">
                <Para size="sm" color="secondary">No alternatives available.</Para>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-md"
        >
            {/* ✅ UPDATED: Enhanced header with better copy */}
            <div className="mb-md">
                <Heading level="h6" className="mb-sm">
                    Didn't love that one? Try these instead.
                </Heading>
                <div className="flex items-center justify-between">
                    <Para size="sm" color="secondary">
                        Matched by layout and style preferences
                    </Para>
                    {suggestions.length > 2 && (
                        <div className="flex gap-xs">
                            <motion.button
                                onClick={handlePrevious}
                                disabled={!canGoPrev}
                                whileHover={canGoPrev ? { scale: 1.1 } : {}}
                                whileTap={canGoPrev ? { scale: 0.9 } : {}}
                                className={`p-2 rounded-lg transition-colors ${
                                    !canGoPrev 
                                        ? 'text-text-tertiary cursor-not-allowed' 
                                        : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
                                }`}
                            >
                                <FaChevronLeft className="text-icon-sm" />
                            </motion.button>
                            <motion.button
                                onClick={handleNext}
                                disabled={!canGoNext}
                                whileHover={canGoNext ? { scale: 1.1 } : {}}
                                whileTap={canGoNext ? { scale: 0.9 } : {}}
                                className={`p-2 rounded-lg transition-colors ${
                                    !canGoNext 
                                        ? 'text-text-tertiary cursor-not-allowed' 
                                        : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
                                }`}
                            >
                                <FaChevronRight className="text-icon-sm" />
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>

            {/* Cards Container */}
            <div className="relative overflow-hidden">
                <motion.div
                    className="grid grid-cols-2 gap-sm"
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    {suggestions.slice(currentIndex, currentIndex + 2).map((suggestion, index) => (
                        <motion.div
                            key={suggestion.id}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredCard(suggestion.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="bg-background-primary border border-border-default rounded-xl overflow-hidden hover:shadow-lg transition-all relative group"
                        >
                            {/* Preview Image */}
                            <div className="h-24 sm:h-32 bg-background-muted relative overflow-hidden">
                                <img
                                    src={suggestion.screenshot_url}
                                    alt={`${suggestion.section_type} preview`}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute top-2 left-2">
                                    <span className="bg-background-dark/90 text-text-light px-xs py-1 rounded text-para-xs">
                                        {suggestion.layout_structure}
                                    </span>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <span className="bg-accent-default text-white px-xs py-1 rounded text-para-xs font-medium">
                                        {suggestion.section_type}
                                    </span>
                                </div>

                                {/* ✅ UPDATED: Tooltip on hover */}
                                {hoveredCard === suggestion.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute bottom-2 left-2 right-2 bg-black/80 text-white p-xs rounded text-para-xs backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-xs">
                                            <FaInfoCircle className="text-xs" />
                                            <span>Matched by layout: {suggestion.layout_structure} · tone: {suggestion.tone}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-sm">
                                <div className="flex flex-wrap gap-xs mb-sm">
                                    <motion.span 
                                        whileHover={{ scale: 1.05 }}
                                        className="px-xs py-1 bg-background-secondary rounded text-para-xs text-text-secondary hover:bg-accent-subtle hover:text-accent-default transition-colors cursor-pointer"
                                    >
                                        {suggestion.intent}
                                    </motion.span>
                                    <motion.span 
                                        whileHover={{ scale: 1.05 }}
                                        className="px-xs py-1 bg-background-secondary rounded text-para-xs text-text-secondary hover:bg-accent-subtle hover:text-accent-default transition-colors cursor-pointer"
                                    >
                                        {suggestion.tone}
                                    </motion.span>
                                </div>
                                
                                <Para size="xs" color="secondary" className="line-clamp-2 mb-sm leading-relaxed">
                                    {suggestion.metadata.insight}
                                </Para>

                                {/* Use Button */}
                                <motion.button
                                    onClick={() => onUseSection(suggestion)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-accent-default text-accent-foreground py-xs sm:py-sm rounded-lg text-para-xs sm:text-para-sm font-medium hover:bg-accent-hover transition-all flex items-center justify-center gap-xs"
                                >
                                    <FaCheck className="text-xs" />
                                    Use This
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Progress Indicators - Only show if more than 2 items */}
            {suggestions.length > 2 && (
                <div className="flex justify-center gap-xs mt-md">
                    {Array.from({ length: Math.ceil(suggestions.length / 2) }).map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentIndex(index * 2)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`h-2 rounded-full transition-all ${
                                Math.floor(currentIndex / 2) === index
                                    ? 'bg-accent-default w-6'
                                    : 'bg-border-muted w-2 hover:bg-border-default'
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* ✅ UPDATED: Additional info section */}
            <div className="mt-md p-sm bg-background-secondary rounded-lg border border-border-default">
                <div className="flex items-center gap-sm">
                    <FaInfoCircle className="text-accent-default text-icon-sm" />
                    <Para size="xs" color="secondary">
                        These alternatives match your layout preferences and maintain similar functionality
                    </Para>
                </div>
            </div>
        </motion.div>
    );
};

export default SuggestionsCarousel;