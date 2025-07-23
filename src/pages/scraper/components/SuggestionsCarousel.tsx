// src/scraper/components/SuggestionsCarousel.tsx - FIXED for images

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { mockSuggestions } from '../constants';
import Para from '../../../comman-components/Para';

interface Suggestion {
    id: string;
    section_type: string;
    layout_structure: string;
    intent: string;
    tone: string;
    screenshot_url: string; // ✅ Fixed: was 'preview'
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
            {/* Header with Navigation */}
            <div className="flex items-center justify-between mb-sm">
                <Para size="sm" color="secondary">
                    Try these alternatives:
                </Para>
                {suggestions.length > 2 && (
                    <div className="flex gap-xs">
                        <button
                            onClick={handlePrevious}
                            disabled={!canGoPrev}
                            className={`p-2 rounded-lg transition-colors ${
                                !canGoPrev 
                                    ? 'text-text-tertiary cursor-not-allowed' 
                                    : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
                            }`}
                        >
                            <FaChevronLeft className="text-icon-sm" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!canGoNext}
                            className={`p-2 rounded-lg transition-colors ${
                                !canGoNext 
                                    ? 'text-text-tertiary cursor-not-allowed' 
                                    : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
                            }`}
                        >
                            <FaChevronRight className="text-icon-sm" />
                        </button>
                    </div>
                )}
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
                            className="bg-background-primary border border-border-default rounded-xl overflow-hidden hover:shadow-lg transition-all"
                        >
                            {/* Preview Image - FIXED */}
                            <div className="h-24 sm:h-32 bg-background-muted relative overflow-hidden">
                                <img
                                    src={suggestion.screenshot_url} // ✅ Fixed: was suggestion.preview
                                    alt={`${suggestion.section_type} preview`}
                                    className="w-full h-full object-cover"
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
                            </div>

                            {/* Content */}
                            <div className="p-sm">
                                <div className="flex flex-wrap gap-xs mb-sm">
                                    <span className="px-xs py-1 bg-background-secondary rounded text-para-xs text-text-secondary">
                                        {suggestion.intent}
                                    </span>
                                    <span className="px-xs py-1 bg-background-secondary rounded text-para-xs text-text-secondary">
                                        {suggestion.tone}
                                    </span>
                                </div>
                                
                                <Para size="xs" color="secondary" className="line-clamp-2 mb-sm leading-relaxed">
                                    {suggestion.metadata.insight}
                                </Para>

                                {/* Use Button */}
                                <button
                                    onClick={() => onUseSection(suggestion)}
                                    className="w-full bg-accent-default text-accent-foreground py-xs sm:py-sm rounded-lg text-para-xs sm:text-para-sm font-medium hover:bg-accent-hover transition-all flex items-center justify-center gap-xs"
                                >
                                    <FaCheck className="text-xs" />
                                    Use This
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Progress Indicators - Only show if more than 2 items */}
            {suggestions.length > 2 && (
                <div className="flex justify-center gap-xs mt-md">
                    {Array.from({ length: Math.ceil(suggestions.length / 2) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all ${
                                Math.floor(currentIndex / 2) === index
                                    ? 'bg-accent-default w-6'
                                    : 'bg-border-muted w-2 hover:bg-border-default'
                            }`}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default SuggestionsCarousel;