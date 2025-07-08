import React, { useState, useEffect, useCallback } from 'react';
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

const FiveStarFeedback: React.FC<FiveStarFeedbackProps> = ({
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

    // Emoji mapping based on rating
    const getEmoji = (currentRating: number) => {
        if (currentRating === 0) return '😊'; // Default happy face
        if (currentRating === 1) return '😡'; // Angry
        if (currentRating === 2) return '😞'; // Sad
        if (currentRating === 3) return '😐'; // Neutral
        if (currentRating === 4) return '😊'; // Happy
        if (currentRating === 5) return '🤩'; // Star-struck
        return '😊';
    };

    // Get emoji color based on rating
    const getEmojiScale = (currentRating: number) => {
        if (currentRating === 0) return 1;
        if (currentRating === 1) return 1.1; // Slightly bigger for angry
        if (currentRating === 2) return 0.95; // Slightly smaller for sad
        if (currentRating === 3) return 1;
        if (currentRating === 4) return 1.05;
        if (currentRating === 5) return 1.15; // Biggest for star-struck
        return 1;
    };

    // Mark user interaction and stop timer
    const markInteraction = useCallback(() => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    }, [hasInteracted]);

    // Handle rating selection
    const handleRatingClick = (selectedRating: number) => {
        markInteraction();
        setRating(selectedRating);
    };

    // Handle rating hover
    const handleRatingHover = (hoveredStar: number) => {
        markInteraction();
        setHoveredRating(hoveredStar);
    };

    // Handle message change
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        markInteraction();
        setMessage(e.target.value);
    };

    // Handle textarea focus
    const handleTextareaFocus = () => {
        markInteraction();
    };

    // Handle submit
    const handleSubmit = async () => {
        if (rating === 0) return;

        markInteraction();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        onSubmit(rating, message.trim());
    };

    // Handle skip
    const handleSkip = () => {
        markInteraction();
        onSkip();
    };

    // Auto-skip timer effect
    useEffect(() => {
        if (hasInteracted) return; // Stop timer if user has interacted

        if (timeLeft <= 0) {
            onSkip();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, hasInteracted, onSkip]);

    const currentEmoji = getEmoji(hoveredRating || rating);
    const currentScale = getEmojiScale(hoveredRating || rating);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`bg-background-primary rounded-2xl px-xl py-xl border border-border-default shadow-sm ${className}`}
        >
            {/* Skip Button at Top Right */}
            <div className={`flex ${!hasInteracted ? 'justify-between' : 'justify-end'} mb-md h-6`}>
                {!hasInteracted && (
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
                )}
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
                        key={currentEmoji}
                        initial={{ scale: 0.5, rotate: -10 }}
                        animate={{
                            scale: currentScale,
                            rotate: 0
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }}
                        className="text-7xl"
                    >
                        {currentEmoji}
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
                    <motion.button
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => handleRatingHover(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="relative p-xs transition-all duration-200 outline-none focus:outline-none border-none"
                        style={{ outline: 'none' }}
                    >
                        <FaStar
                            className={`text-icon-xl transition-all duration-200 ${star <= (hoveredRating || rating)
                                ? 'text-amber-400'
                                : 'text-gray-300 dark:text-gray-600'
                                }`}
                        />
                    </motion.button>
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

                >

                    <div className="flex items-center gap-sm">
                        <FaPaperPlane className="text-icon-sm" />
                        <span>Submit Feedback</span>
                    </div>
                </FormButton>
            </div>
        </motion.div>
    );
};

export default FiveStarFeedback;