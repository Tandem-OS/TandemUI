// src/scraper/components/SuggestionsCarousel.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaThumbsUp, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { mockSuggestions } from '../constants';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../comman-components/Para';

interface Suggestion {
    id: string;
    section_type: string;
    layout_structure: string;
    intent: string;
    tone: string;
    preview: string;
    metadata: {
        insight: string;
    };
}

interface SuggestionsCarouselProps {
    sectionId: string;
    onUseSection: (section: Suggestion) => void;
    onLikeSection: (section: Suggestion) => void;
}

const SuggestionsCarousel = ({ sectionId, onUseSection, onLikeSection }: SuggestionsCarouselProps) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API call with delay
        setIsLoading(true);
        setTimeout(() => {
            const sectionSuggestions = mockSuggestions[sectionId as keyof typeof mockSuggestions] || 
                                     mockSuggestions['hero-1'];
            setSuggestions(sectionSuggestions);
            setIsLoading(false);
        }, 800);
    }, [sectionId]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? suggestions.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === suggestions.length - 1 ? 0 : prev + 1));
    };

    // Calculate how many cards to show based on screen size
    const getCardsToShow = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 1;
            if (window.innerWidth < 1024) return 2;
        }
        return 3;
    };

    const [cardsToShow, setCardsToShow] = useState(1);

    useEffect(() => {
        const updateCardsToShow = () => {
            setCardsToShow(getCardsToShow());
        };

        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => window.removeEventListener('resize', updateCardsToShow);
    }, []);

    if (isLoading) {
        return (
            <div className="mt-md">
                <Para size="sm" color="secondary" className="mb-sm">Finding alternatives...</Para>
                <div className="flex gap-sm sm:gap-md overflow-hidden">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`${i === 1 ? 'w-full' : 'hidden sm:block'} sm:w-64 h-32 sm:h-40 bg-background-muted rounded-xl animate-pulse`} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-md"
        >
            <div className="flex items-center justify-between mb-sm">
                <Para size="sm" color="secondary">Try these alternatives:</Para>
                <div className="flex gap-xs">
                    <button
                        onClick={handlePrevious}
                        className="p-1 hover:bg-background-muted rounded transition-colors"
                        disabled={suggestions.length <= cardsToShow}
                    >
                        <FaChevronLeft className="text-text-tertiary" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="p-1 hover:bg-background-muted rounded transition-colors"
                        disabled={suggestions.length <= cardsToShow}
                    >
                        <FaChevronRight className="text-text-tertiary" />
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="flex gap-sm sm:gap-md"
                    >
                        {suggestions.slice(currentIndex, currentIndex + cardsToShow).map((suggestion, index) => (
                            <motion.div
                                key={suggestion.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="min-w-0 w-full sm:min-w-[280px] bg-background-primary border border-border-default rounded-lg sm:rounded-xl overflow-hidden hover:shadow-md transition-all"
                            >
                                {/* Preview Image */}
                                <div className="h-24 sm:h-32 bg-background-muted relative overflow-hidden">
                                    <img
                                        src={suggestion.preview}
                                        alt={`${suggestion.section_type} alternative`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-background-dark/90 text-text-light px-xs sm:px-sm py-xs rounded text-para-xs">
                                            {suggestion.layout_structure}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-sm sm:p-md">
                                    <Heading level="h6" className="text-base">
                                        {suggestion.section_type}
                                    </Heading>
                                    <div className="flex items-center gap-xs mt-xs mb-sm flex-wrap">
                                        <Para size="xs" color="secondary">
                                            {suggestion.intent}
                                        </Para>
                                        <span className="text-text-tertiary">•</span>
                                        <Para size="xs" color="secondary">
                                            {suggestion.tone}
                                        </Para>
                                    </div>
                                    <Para size="xs" color="secondary" className="line-clamp-2 mb-md">
                                        {suggestion.metadata.insight}
                                    </Para>

                                    {/* Actions */}
                                    <div className="flex gap-xs sm:gap-sm">
                                        <button
                                            onClick={() => onUseSection(suggestion)}
                                            className="flex-1 bg-accent-default text-accent-foreground py-xs sm:py-sm rounded-lg text-para-xs sm:text-para-sm font-medium hover:bg-accent-hover transition-colors flex items-center justify-center gap-xs"
                                        >
                                            <FaCheck className="text-icon-sm" />
                                            Use This
                                        </button>
                                        <button
                                            onClick={() => onLikeSection(suggestion)}
                                            className="p-xs sm:p-sm border border-border-default rounded-lg hover:bg-background-secondary transition-colors"
                                        >
                                            <FaThumbsUp className="text-icon-sm text-text-secondary" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots - Only on mobile */}
            {cardsToShow === 1 && suggestions.length > 1 && (
                <div className="flex justify-center gap-xs mt-md sm:hidden">
                    {suggestions.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                currentIndex === index
                                    ? 'bg-accent-default w-6'
                                    : 'bg-border-muted'
                            }`}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default SuggestionsCarousel;