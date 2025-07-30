import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FiX, FiRefreshCw, FiDownload } from 'react-icons/fi';
import { FaRocket, FaCheckCircle } from 'react-icons/fa';
import SwiperStack from './components/SwiperStack';
import SwipeProgress from './components/SwipeProgress';
import { categories, getCurrentRoundComponents, getTotalRounds, roundMessages } from './mockData';
import { type SwipeAction, type UserChoice, type RoundData, type ComponentPreview } from './swiper.types';

// Constants for cleaner code
const TIMINGS = { CELEBRATION: 2000, TRANSITION: 300, INSTRUCTION_DELAY: 1500 };
const CONTAINER_HEIGHT = 'calc(100vh - 65px)';

// Animation variants - properly typed for framer-motion
const animations: { [key: string]: Variants | any } = {
    page: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    completion: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.4 }
    },
    icon: {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.1 }
    },
    button: { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }
};

const Swiper: React.FC = () => {
    const [currentRound, setCurrentRound] = useState(0);
    const [userChoices, setUserChoices] = useState<UserChoice[]>([]);
    const [roundsData, setRoundsData] = useState<RoundData[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showRoundCompletion, setShowRoundCompletion] = useState(false);

    const totalRounds = getTotalRounds();
    const currentRoundData = roundsData[currentRound];
    const hasNextRound = currentRound < totalRounds - 1;
    const allRoundsComplete = !currentRoundData || currentRoundData.completed;
    const isLastRound = currentRound === totalRounds - 1;
    const percentage = Math.round(((currentRound + 1) / totalRounds) * 100);

    // Initialize rounds data
    useEffect(() => {
        setRoundsData(categories.map((category, index) => ({
            roundNumber: index + 1,
            category,
            components: getCurrentRoundComponents(index),
            currentStep: 0,
            completed: false
        })));
    }, []);

    // Handlers - simplified and DRY
    const handleSwipe = useCallback((action: SwipeAction, component: ComponentPreview) => {
        setUserChoices(prev => [...prev, {
            component_id: component.component_id,
            category: component.category,
            vibe: component.vibe,
            action,
            timestamp: Date.now(),
            round: currentRound + 1
        }]);
    }, [currentRound]);

    const handleRoundComplete = useCallback(() => {
        setRoundsData(prev => prev.map((round, index) =>
            index === currentRound ? { ...round, completed: true } : round
        ));
        setShowRoundCompletion(true);

        setTimeout(() => {
            setShowRoundCompletion(false);
            if (hasNextRound) {
                setTimeout(() => setCurrentRound(prev => prev + 1), TIMINGS.TRANSITION);
            }
        }, TIMINGS.CELEBRATION);
    }, [currentRound, hasNextRound]);

    const handleStartOver = useCallback(() => {
        setIsAnimating(false);
        setCurrentRound(0);
        setUserChoices([]);
        setShowRoundCompletion(false);
        setRoundsData(prev => prev.map(round => ({ ...round, completed: false, currentStep: 0 })));
    }, []);

    const handleExportChoices = useCallback(() => {
        const dataStr = JSON.stringify(userChoices, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const link = document.createElement('a');
        link.setAttribute('href', dataUri);
        link.setAttribute('download', 'design-choices.json');
        link.click();
    }, [userChoices]);

    const handleAnimationStart = useCallback(() => setIsAnimating(true), []);
    const handleAnimationComplete = useCallback(() => setIsAnimating(false), []);

    // Reusable button component
    const ActionButton: React.FC<{
        onClick: () => void;
        children: React.ReactNode;
        variant?: 'primary' | 'secondary';
        icon: React.ComponentType<{ className?: string }>;
    }> = ({ onClick, children, variant = 'primary', icon: Icon }) => (
        <motion.button
            onClick={onClick}
            className={`flex items-center gap-xs sm:gap-sm md:gap-sm px-md py-sm sm:px-lg sm:py-sm md:px-xl md:py-md rounded-lg sm:rounded-xl transition-all duration-300 w-full sm:w-auto ${variant === 'primary'
                    ? 'bg-accent-default text-accent-foreground hover:bg-accent-hover shadow-lg'
                    : 'bg-background-muted text-text-primary hover:bg-background-accent border border-border-default hover:border-border-focus'
                }`}
            {...animations.button}
            // SMOOTHNESS FIX: Added will-change for smoother button animations
            style={{ willChange: 'transform' }}
        >
            <Icon className="text-icon-sm sm:text-icon-md" />
            <span className="text-para-sm sm:text-para-md md:text-para-lg font-semibold">{children}</span>
        </motion.button>
    );

    // Round completion celebration component
    const RoundCompletionCelebration = () => (
        // SMOOTHNESS FIX: Added will-change for the container
        <motion.div {...animations.completion} style={{ willChange: 'transform, opacity' }} className="flex flex-col items-center justify-center text-center mt-md sm:mt-lg md:mt-xl px-md">
            {/* SMOOTHNESS FIX: Added will-change for the icon */}
            <motion.div {...animations.icon} style={{ willChange: 'transform' }} className="mb-sm sm:mb-md md:mb-lg">
                <FaCheckCircle className="text-icon-2xl sm:text-[2.5rem] md:text-[3rem] text-accent-default" />
            </motion.div>
            <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                // SMOOTHNESS FIX: Added will-change for the heading
                style={{ willChange: 'transform, opacity' }}
                className="text-h4-sm sm:text-h3-sm md:text-h3-md lg:text-h3-lg font-bold text-text-primary"
            >
                {isLastRound ? '🎉 All Done!' : `✨ ${currentRoundData?.category} Round Completed`}
            </motion.h2>
        </motion.div>
    );

    // Final completion screen
    if (allRoundsComplete && isLastRound && !showRoundCompletion) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen px-lg" style={{ minHeight: CONTAINER_HEIGHT }}>
                <div className="w-full max-w-5xl mx-auto">
                    {/* SMOOTHNESS FIX: Added will-change for the main container */}
                    <motion.div {...animations.page} style={{ willChange: 'transform, opacity' }} className="text-center space-y-md sm:space-y-lg md:space-y-xl">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring" as const, stiffness: 200, damping: 15, delay: 0.3 }}
                            // SMOOTHNESS FIX: Added will-change for this complex animation
                            style={{ willChange: 'transform' }}
                            className="flex justify-center mb-md sm:mb-lg md:mb-xl"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-background-success rounded-full flex items-center justify-center relative">
                                <FaCheckCircle className="text-icon-2xl sm:text-[3rem] md:text-[4rem] text-text-success" />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    // SMOOTHNESS FIX: Added will-change for the small rocket icon
                                    style={{ willChange: 'transform' }}
                                    className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 md:-top-2 md:-right-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-accent-default rounded-full flex items-center justify-center"
                                >
                                    <FaRocket className="text-accent-foreground text-icon-sm sm:text-icon-md" />
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                            // SMOOTHNESS FIX: Added will-change for the text block
                            style={{ willChange: 'transform, opacity' }}
                            className="space-y-xs sm:space-y-sm md:space-y-md"
                        >
                            <h1 className="text-h2-sm sm:text-h1-sm md:text-h1-md lg:text-h1-lg font-bold text-text-primary">
                                🎉 Design Discovery Complete!
                            </h1>
                            <p className="text-para-md sm:text-h5-sm md:text-h4-sm lg:text-h4-md text-text-secondary font-medium max-w-3xl mx-auto leading-relaxed px-md">
                                Great job! We've captured your design preferences from <span className="text-accent-default font-semibold">{userChoices.length} components</span> across <span className="text-accent-default font-semibold">{totalRounds} categories</span>.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                             // SMOOTHNESS FIX: Added will-change for the button container
                            style={{ willChange: 'transform, opacity' }}
                            className="flex flex-col sm:flex-row gap-sm sm:gap-sm md:gap-md justify-center items-center pt-md sm:pt-lg md:pt-xl"
                        >
                            <ActionButton onClick={handleStartOver} variant="secondary" icon={FiRefreshCw}>
                                Start Over
                            </ActionButton>
                            <ActionButton onClick={handleExportChoices} variant="primary" icon={FiDownload}>
                                Let's Generate Layout
                            </ActionButton>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        );
    }

    const currentCategory = currentRoundData?.category || 'Design';
    const roundMessage = roundMessages[currentCategory] || 'Choose the design that resonates with you.';

    return (
        <div className="w-full overflow-hidden relative flex flex-col max-lg:p-md" style={{ height: CONTAINER_HEIGHT, minHeight: CONTAINER_HEIGHT }}>
            {/* Header Section */}
            <div className="w-full flex-shrink-0 relative z-10">
                <div className="max-w-7xl mx-auto px-sm sm:px-md md:px-xl py-xs sm:py-sm md:py-md">
                    <div className="flex items-center justify-between gap-sm">
                        <div className="flex items-center space-x-sm sm:space-x-sm md:space-x-lg flex-1 min-w-0">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-background-secondary text-text-secondary rounded-md sm:rounded-lg hover:bg-background-muted transition-colors cursor-pointer">
                                <FiX className="text-icon-sm sm:text-icon-md" />
                            </div>

                            <div className="space-y-0 md:space-y-xs min-w-0 flex-1">
                                <div className="flex items-center space-x-xs sm:space-x-sm md:space-x-md flex-wrap">
                                    <h1 className="text-h6-sm sm:text-h5-sm md:text-h4-md 2xl:text-h4-lg font-bold text-text-primary truncate">
                                        {currentCategory} Round
                                    </h1>
                                    <span className="px-xs py-px sm:px-sm sm:py-xs md:px-sm md:py-xs bg-accent-subtle text-text-primary text-para-xs font-medium rounded-sm sm:rounded-md whitespace-nowrap">
                                        Round {currentRound + 1} of {totalRounds}
                                    </span>
                                </div>
                                <p className="text-text-secondary text-para-xs sm:text-para-sm 2xl:text-para-lg max-w-md hidden sm:block truncate">
                                    {roundMessage}
                                </p>
                            </div>
                        </div>

                        <SwipeProgress current={currentRound + 1} total={totalRounds} className="hidden lg:flex" />
                    </div>
                </div>

                {/* Mobile Progress Bar */}
                <div className="lg:hidden px-sm pb-xs mb-sm">
                    <div className="flex items-center justify-between gap-sm">
                        <div className="flex-1 h-2 bg-background-muted rounded-full overflow-hidden">
                            {/* SMOOTHNESS FIX: Replaced 'width' animation with 'transform: scaleX' */}
                            <div
                                className="h-full bg-accent-default rounded-full transition-transform duration-700 ease-out"
                                style={{
                                    transform: `scaleX(${percentage / 100})`,
                                    transformOrigin: 'left',
                                }}
                            />
                        </div>
                        <span className="text-text-secondary text-para-xs font-medium whitespace-nowrap">{percentage}%</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex items-center justify-center px-xs py-xs sm:p-md md:p-xl relative z-20">
                <AnimatePresence mode="wait">
                    {showRoundCompletion ? (
                        <RoundCompletionCelebration />
                    ) : currentRoundData && !currentRoundData.completed ? (
                        // SMOOTHNESS FIX: Added will-change for round transitions
                        <motion.div key={`round-${currentRound}`} {...animations.page} style={{ willChange: 'transform, opacity' }} className="w-full h-full flex items-center justify-center">
                            <SwiperStack
                                key={currentRound}
                                components={currentRoundData.components}
                                onSwipe={handleSwipe}
                                onComplete={handleRoundComplete}
                                isAnimating={isAnimating}
                                onAnimationStart={handleAnimationStart}
                                onAnimationComplete={handleAnimationComplete}
                            />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            {/* Swipe Instructions */}
            {!showRoundCompletion && (
                <motion.div
                    className="absolute bottom-xs sm:bottom-sm md:bottom-0 left-0 right-0 flex justify-center text-text-secondary text-para-xs sm:text-para-sm md:text-para-md text-center pb-xs sm:pb-sm md:pb-md pt-xs sm:pt-sm md:pt-lg z-30 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: TIMINGS.INSTRUCTION_DELAY / 1000, duration: 0.8 }}
                    // SMOOTHNESS FIX: Added will-change even for simple opacity animations
                    style={{ willChange: 'opacity' }}
                >
                    <p className="px-md">← Swipe left to reject • Swipe right to like →</p>
                </motion.div>
            )}
        </div>
    );
};

export default Swiper;