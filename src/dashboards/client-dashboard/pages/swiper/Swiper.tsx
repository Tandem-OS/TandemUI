import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiRefreshCw, FiDownload } from 'react-icons/fi';
import { FaRocket, FaCheckCircle } from 'react-icons/fa';
// import { FaRocket, FaPalette, FaCheckCircle } from 'react-icons/fa';
import SwiperStack from './components/SwiperStack';
import SwipeProgress from './components/SwipeProgress';
import { categories, getCurrentRoundComponents, getTotalRounds, roundMessages } from './mockData';
import { type SwipeAction, type UserChoice, type RoundData, type ComponentPreview } from './swiper.types';

const Swiper: React.FC = () => {
    const [currentRound, setCurrentRound] = useState(0);
    const [userChoices, setUserChoices] = useState<UserChoice[]>([]);
    const [roundsData, setRoundsData] = useState<RoundData[]>([]);
    const [isAnimating, setIsAnimating] = useState(false); // Global lock state
    const [showRoundCompletion, setShowRoundCompletion] = useState(false); // New state for round completion
    const totalRounds = getTotalRounds();

    // Initialize rounds data
    useEffect(() => {
        const initialRounds: RoundData[] = categories.map((category, index) => ({
            roundNumber: index + 1,
            category,
            components: getCurrentRoundComponents(index),
            currentStep: 0,
            completed: false
        }));
        setRoundsData(initialRounds);
    }, []);

    const currentRoundData = roundsData[currentRound];
    const hasNextRound = currentRound < totalRounds - 1;

    // Handle swipe data recording
    const handleSwipe = useCallback((action: SwipeAction, component: ComponentPreview) => {
        const choice: UserChoice = {
            component_id: component.component_id,
            category: component.category,
            vibe: component.vibe,
            action,
            timestamp: Date.now(),
            round: currentRound + 1
        };

        setUserChoices(prev => [...prev, choice]);
    }, [currentRound]);

    // Handle round completion with celebration animation
    const handleRoundComplete = useCallback(() => {
        // Mark round as completed
        setRoundsData(prev => prev.map((round, index) =>
            index === currentRound
                ? { ...round, completed: true }
                : round
        ));

        // Show completion celebration
        setShowRoundCompletion(true);

        // Hide celebration and move to next round after 2 seconds
        setTimeout(() => {
            setShowRoundCompletion(false);

            if (hasNextRound) {
                setTimeout(() => {
                    setCurrentRound(prev => prev + 1);
                }, 300); // Small delay for smooth transition
            }
        }, 2000);
    }, [currentRound, hasNextRound]);

    const handleAnimationStart = useCallback(() => {
        setIsAnimating(true);
    }, []);

    const handleAnimationComplete = useCallback(() => {
        setIsAnimating(false);
    }, []);

    const handleStartOver = () => {
        setIsAnimating(false);
        setCurrentRound(0);
        setUserChoices([]);
        setShowRoundCompletion(false);
        setRoundsData(prev => prev.map(round => ({ ...round, completed: false, currentStep: 0 })));
    };

    const handleExportChoices = () => {
        // const dataStr = JSON.stringify(userChoices, null, 2);
        // const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        // const exportFileDefaultName = 'design-choices.json';

        // const linkElement = document.createElement('a');
        // linkElement.setAttribute('href', dataUri);
        // linkElement.setAttribute('download', exportFileDefaultName);
        // linkElement.click();
    };

    const allRoundsComplete = !roundsData[currentRound] || roundsData[currentRound]?.completed;

    // Simple Round Completion Component
    const RoundCompletionCelebration = () => {
        const completedCategory = currentRoundData?.category || 'Round';
        const isLastRound = currentRound === totalRounds - 1;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center mt-xl"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: 0.1
                    }}
                    className="mb-lg"
                >
                    <FaCheckCircle className="text-5xl text-accent-default" />
                </motion.div>

                <motion.h2
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-h3-sm md:text-h3-md font-bold text-text-primary"
                >
                    {isLastRound ? '🎉 All Done!' : `✨ ${completedCategory} Round Completed`}
                </motion.h2>
            </motion.div>
        );
    };

    if (allRoundsComplete && currentRound === totalRounds - 1 && !showRoundCompletion) {
        // Completion Screen
        // const likedChoices = userChoices.filter(choice => choice.action === 'like');
        // const dislikedChoices = userChoices.filter(choice => choice.action === 'dislike');

        // const preferredVibes = likedChoices.reduce((acc, choice) => {
        //     acc[choice.vibe] = (acc[choice.vibe] || 0) + 1;
        //     return acc;
        // }, {} as Record<string, number>);

        // const topVibe = Object.entries(preferredVibes)
        //     .sort(([, a], [, b]) => b - a)[0]?.[0] || 'Clean';

        // const likeRate = userChoices.length > 0 ? Math.round((likedChoices.length / userChoices.length) * 100) : 0;
        const totalComponents = userChoices.length;

        return (
            <div className="w-full bg-background-primary flex items-center justify-center"
                style={{ height: 'calc(100vh - 65px)' }}>

                <div className="w-full max-w-5xl mx-auto px-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-center space-y-xl"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.3
                            }}
                            className="flex justify-center mb-lg"
                        >
                            <div className="w-32 h-32 bg-background-success rounded-full flex items-center justify-center relative">
                                <FaCheckCircle className="text-6xl text-text-success" />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="absolute -top-2 -right-2 w-10 h-10 bg-accent-default rounded-full flex items-center justify-center"
                                >
                                    <FaRocket className="text-accent-foreground text-lg" />
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                            className="space-y-md"
                        >
                            <h1 className="text-h1-sm md:text-h1-md font-bold text-text-primary">
                                🎉 Design Discovery Complete!
                            </h1>
                            <p className="text-h4-sm md:text-h4-md text-text-secondary font-medium max-w-3xl mx-auto leading-relaxed">
                                Great job! We've captured your design preferences from <span className="text-accent-default font-semibold">{totalComponents} components</span> across <span className="text-accent-default font-semibold">{totalRounds} categories</span>.
                            </p>
                        </motion.div>

                        {/* <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="grid grid-cols-1 md:grid-cols-4 gap-md max-w-4xl mx-auto"
                        >
                            <div className="bg-background-secondary rounded-xl p-lg text-center border border-border-default hover:border-border-focus transition-colors">
                                <div className="text-h2-sm font-bold text-text-success mb-xs">{likedChoices.length}</div>
                                <div className="text-para-sm text-text-secondary">Liked</div>
                            </div>

                            <div className="bg-background-secondary rounded-xl p-lg text-center border border-border-default hover:border-border-focus transition-colors">
                                <div className="text-h2-sm font-bold text-text-error mb-xs">{dislikedChoices.length}</div>
                                <div className="text-para-sm text-text-secondary">Passed</div>
                            </div>

                            <div className="bg-background-secondary rounded-xl p-lg text-center border border-border-default hover:border-border-focus transition-colors">
                                <div className="text-h2-sm font-bold text-accent-default mb-xs">{likeRate}%</div>
                                <div className="text-para-sm text-text-secondary">Approval Rate</div>
                            </div>

                            <div className="bg-background-secondary rounded-xl p-lg text-center border border-border-default hover:border-border-focus transition-colors">
                                <div className="text-h4-sm font-bold text-accent-default mb-xs truncate">{topVibe}</div>
                                <div className="text-para-sm text-text-secondary">Top Style</div>
                            </div>
                        </motion.div> */}

                        {/* <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="bg-background-secondary rounded-2xl p-xl max-w-3xl mx-auto border border-border-default"
                        >
                            <div className="flex items-center justify-center gap-sm mb-lg">
                                <FaPalette className="text-accent-default text-xl" />
                                <h2 className="text-h3-sm font-bold text-text-primary">Your Design DNA Analysis</h2>
                            </div>

                            <div className="space-y-md text-left">
                                <p className="text-para-md text-text-secondary leading-relaxed">
                                    Based on your choices, you have a strong preference for <span className="text-accent-default font-semibold">{topVibe.toLowerCase()}</span> design aesthetics.
                                    With a <span className="text-text-success font-semibold">{likeRate}% approval rate</span>, your taste shows
                                    {likeRate > 70 ? ' excellent design sensibility and clear preferences.' :
                                        likeRate > 50 ? ' selective taste with specific design requirements.' :
                                            ' very unique and distinctive preferences.'}
                                </p>

                                <div className="bg-background-accent rounded-lg p-md">
                                    <p className="text-para-sm text-text-primary font-medium">
                                        💡 <strong>Next Steps:</strong> Your preferences will help us curate designs that match your style perfectly.
                                        Export your choices to save this analysis for future reference.
                                    </p>
                                </div>
                            </div>
                        </motion.div> */}

                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-md justify-center items-center pt-lg"
                        >
                            <motion.button
                                onClick={handleStartOver}
                                className="flex items-center gap-sm px-xl py-md bg-background-muted text-text-primary hover:bg-background-accent rounded-xl transition-all duration-300 border border-border-default hover:border-border-focus"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FiRefreshCw size={20} />
                                <span className="text-para-md font-semibold">Start Over</span>
                            </motion.button>

                            <motion.button
                                onClick={handleExportChoices}
                                className="flex items-center gap-sm px-xl py-md bg-accent-default text-accent-foreground hover:bg-accent-hover rounded-xl transition-all duration-300 shadow-lg"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FiDownload size={20} />
                                <span className="text-para-md font-semibold">Let's Generate Layout</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        );
    }

    const currentCategory = currentRoundData?.category || 'Design';
    const roundMessage = roundMessages[currentCategory] || 'Choose the design that resonates with you.';

    return (
        <div
            className="w-full overflow-hidden relative"
            style={{ height: 'calc(100vh - 65px)' }}
        >

            {/* Header Section */}
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-xl py-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-lg">
                            <div
                                className="flex items-center justify-center w-10 h-10 bg-background-secondary text-text-secondary rounded-lg hover:bg-background-muted transition-colors cursor-pointer"
                                aria-label="Close"
                            >
                                <FiX size={18} />
                            </div>

                            <div className="space-y-xs">
                                <div className="flex items-center space-x-md">
                                    <h1 className="text-h4-md 2xl:text-h4-lg font-bold text-text-primary">
                                        {currentCategory} Round
                                    </h1>
                                    <span className="px-sm py-xs bg-accent-subtle text-text-primary text-para-xs font-medium rounded-md">
                                        Round {currentRound + 1} of {totalRounds}
                                    </span>
                                </div>
                                <p className="text-text-secondary text-para-sm 2xl:text-para-md max-w-md">
                                    {roundMessage}
                                </p>
                            </div>
                        </div>

                        <SwipeProgress
                            current={currentRound + 1}
                            total={totalRounds}
                            className="hidden md:flex"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Progress */}
            <div className="md:hidden px-xl py-sm bg-background-secondary">
                <SwipeProgress
                    current={currentRound + 1}
                    total={totalRounds}
                    className="flex justify-center"
                />
            </div>

            {/* Main Content Area - Swiper Stack */}
            <div className="flex-1 flex items-center justify-center p-xl">
                <AnimatePresence mode="wait">
                    {showRoundCompletion ? (
                        <RoundCompletionCelebration />
                    ) : currentRoundData && !currentRoundData.completed ? (
                        <motion.div
                            key={`round-${currentRound}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="w-full"
                        >
                            <SwiperStack
                                key={currentRound} // Add key to reset stack state on round change
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
                    className="absolute bottom-0 left-0 right-0 flex justify-center text-text-secondary text-para-md text-center pb-md pt-lg z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <p>← Swipe left to reject • Swipe right to like →</p>
                </motion.div>
            )}
        </div>
    );
};

export default Swiper;