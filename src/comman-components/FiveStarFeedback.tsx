import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaPaperPlane } from 'react-icons/fa';
import FormButton from '../components/auth/form/components/FormButton';

interface FiveStarFeedbackProps {
    question: string;
    onSubmit: (rating: number, message: string) => void;
    onSkip: () => void;
    autoSkipSeconds?: number;
    className?: string;
}

// Memoized timer component to prevent parent re-renders
const TimerDisplay = memo(({ 
    timeLeft, 
    autoSkipSeconds, 
    hasInteracted 
}: { 
    timeLeft: number; 
    autoSkipSeconds: number; 
    hasInteracted: boolean;
}) => {
    if (hasInteracted) return null;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-sm text-text-tertiary"
        >
            <div className="w-6 h-6 relative">
                <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="opacity-20"
                    />
                    <motion.circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        strokeLinecap="round"
                        initial={{ pathLength: 1 }}
                        animate={{ pathLength: timeLeft / autoSkipSeconds }}
                        transition={{ duration: 1, ease: "linear" }}
                        className="text-accent-default"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-para-xs font-bold text-text-primary">
                        {timeLeft}
                    </span>
                </div>
            </div>
            <span className="text-para-xs">Auto-skip in {timeLeft}s</span>
        </motion.div>
    );
});

TimerDisplay.displayName = 'TimerDisplay';

// Memoized star button component
const StarButton = memo(({ 
    star, 
    isActive, 
    onClick, 
    onMouseEnter, 
    onMouseLeave 
}: {
    star: number;
    isActive: boolean;
    onClick: (star: number) => void;
    onMouseEnter: (star: number) => void;
    onMouseLeave: () => void;
}) => {
    const handleClick = useCallback(() => onClick(star), [onClick, star]);
    const handleMouseEnter = useCallback(() => onMouseEnter(star), [onMouseEnter, star]);
    
    return (
        <motion.button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onMouseLeave}
            className="relative p-xs transition-all duration-200 outline-none focus:outline-none border-none"
            style={{ outline: 'none' }}
        >
            <FaStar
                className={`text-icon-xl transition-all duration-200 ${
                    isActive ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'
                }`}
            />
        </motion.button>
    );
});

StarButton.displayName = 'StarButton';

const FiveStarFeedback: React.FC<FiveStarFeedbackProps> = memo(({
    question,
    onSubmit,
    onSkip,
    autoSkipSeconds = 10,
    className = ""
}) => {
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const [hasInteracted, setHasInteracted] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(autoSkipSeconds);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Memoized emoji logic
    const emojiData = useMemo(() => {
        const emojiMap: { [key: number]: { emoji: string; scale: number } } = {
            0: { emoji: '😊', scale: 1 },
            1: { emoji: '😡', scale: 1.1 },
            2: { emoji: '😞', scale: 0.95 },
            3: { emoji: '😐', scale: 1 },
            4: { emoji: '😊', scale: 1.05 },
            5: { emoji: '🤩', scale: 1.15 }
        };
        
        const currentRating = hoveredRating || rating;
        return emojiMap[currentRating] || emojiMap[0];
    }, [hoveredRating, rating]);

    // Memoized callbacks
    const markInteraction = useCallback(() => {
        setHasInteracted(true);
    }, []);

    const handleRatingClick = useCallback((selectedRating: number) => {
        markInteraction();
        setRating(selectedRating);
    }, [markInteraction]);

    const handleRatingHover = useCallback((hoveredStar: number) => {
        markInteraction();
        setHoveredRating(hoveredStar);
    }, [markInteraction]);

    const handleRatingLeave = useCallback(() => {
        setHoveredRating(0);
    }, []);

    const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        markInteraction();
        setMessage(e.target.value);
    }, [markInteraction]);

    const handleTextareaFocus = useCallback(() => {
        markInteraction();
    }, [markInteraction]);

    const handleSubmit = useCallback(async () => {
        if (rating === 0) return;

        markInteraction();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        onSubmit(rating, message.trim());
    }, [rating, message, onSubmit, markInteraction]);

    const handleSkip = useCallback(() => {
        markInteraction();
        onSkip();
    }, [onSkip, markInteraction]);

    // Optimized timer effect
    useEffect(() => {
        if (hasInteracted || timeLeft <= 0) {
            if (!hasInteracted && timeLeft <= 0) {
                onSkip();
            }
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, hasInteracted, onSkip]);

    // Memoized star active state calculation
    const isStarActive = useCallback((star: number) => {
        return star <= (hoveredRating || rating);
    }, [hoveredRating, rating]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`bg-background-primary rounded-2xl p-lg lg:p-xl border border-border-default shadow-sm ${className}`}
        >
            {/* Skip Button at Top Right */}
            <div className={`flex ${!hasInteracted ? 'justify-between' : 'justify-end'} mb-md h-6`}>
                <TimerDisplay 
                    timeLeft={timeLeft} 
                    autoSkipSeconds={autoSkipSeconds} 
                    hasInteracted={hasInteracted} 
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSkip}
                    className="text-text-secondary hover:text-text-primary transition-all duration-200 text-para-sm font-medium"
                >
                    Skip
                </motion.button>
            </div>

            {/* Big Emoji with Fixed Height Container */}
            <div className="text-center mb-md">
                <div className="h-20 flex items-center justify-center mb-sm">
                    <motion.div
                        key={emojiData.emoji}
                        initial={{ scale: 0.5, rotate: -10 }}
                        animate={{
                            scale: emojiData.scale,
                            rotate: 0
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }}
                        className="text-7xl"
                    >
                        {emojiData.emoji}
                    </motion.div>
                </div>
            </div>

            {/* Header */}
            <div className="text-center mb-md">
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    className="mb-md"
                >
                    <h3 className="text-h6-sm md:text-h5-md font-bold text-text-primary">
                        {question}
                    </h3>
                </motion.div>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center gap-sm mb-md">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarButton
                        key={star}
                        star={star}
                        isActive={isStarActive(star)}
                        onClick={handleRatingClick}
                        onMouseEnter={handleRatingHover}
                        onMouseLeave={handleRatingLeave}
                    />
                ))}
            </div>

            {/* Always Visible Textarea */}
            <div className="mb-md">
                <textarea
                    value={message}
                    onChange={handleMessageChange}
                    onFocus={handleTextareaFocus}
                    placeholder="Tell us what went well or what could be improved..."
                    rows={4}
                    className="w-full p-md bg-background-secondary border border-border-default rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-default focus:border-accent-default transition-all text-para-sm resize-none"
                />
            </div>

            {/* Action Buttons */}
            <div className="space-y-md">
                {/* Submit Button - Full Width */}
                <FormButton
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    size="lg"
                    className='w-full'
                    disabled={rating === 0}
                >
                    <div className="flex items-center gap-sm">
                        <FaPaperPlane className="text-icon-sm" />
                        <span>Submit Feedback</span>
                    </div>
                </FormButton>
            </div>
        </motion.div>
    );
});

FiveStarFeedback.displayName = 'FiveStarFeedback';

export default FiveStarFeedback;