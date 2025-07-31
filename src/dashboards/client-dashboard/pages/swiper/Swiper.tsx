// Updated Swiper.tsx with Preview Modal Integration

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FiX, FiRefreshCw, FiDownload, FiAlertTriangle, FiCheckCircle, FiAward, FiWifi, FiEye } from 'react-icons/fi';
import SwiperStack from './components/SwiperStack';
import SwipeProgress from './components/SwipeProgress';
import Modal from '@/comman-components/Modal';
import PreviewModal from './components/PreviewModal';
import { categories, getCurrentRoundComponents, getTotalRounds, roundMessages } from './mockData';
import { type SwipeAction, type UserChoice, type RoundData, type ComponentPreview } from './swiper.types';

// Constants for cleaner code
const TIMINGS = { CELEBRATION: 2000, TRANSITION: 300, INSTRUCTION_DELAY: 1500, LOADING_SIMULATION: 1500 };
const CONTAINER_HEIGHT = 'calc(100vh - 65px)';
const PREVIEW_ROUNDS = [2, 4, 6]; // Show preview after these rounds

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

// [Keep all the existing components: SkeletonCard, ErrorState, etc. - same as before]
// Skeleton Card Component
const SkeletonCard: React.FC = () => (
    <div className="bg-background-secondary rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-border-default overflow-hidden animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Mobile Image Skeleton */}
            <div className="lg:hidden bg-background-muted-low h-48 sm:h-56" />

            {/* Content Skeleton */}
            <div className="bg-background-primary-2 p-md sm:p-lg lg:p-xl flex flex-col justify-center">
                <div className="space-y-sm md:space-y-md lg:space-y-lg">
                    <div className="flex items-center justify-between gap-xs">
                        <div className="h-6 bg-background-muted-low rounded-md w-20" />
                        <div className="h-6 bg-background-muted-low rounded-md w-16" />
                    </div>

                    <div className="space-y-xs sm:space-y-sm md:space-y-md">
                        <div className="h-8 bg-background-muted-low rounded-md w-3/4" />
                        <div className="space-y-2">
                            <div className="h-4 bg-background-muted-low rounded w-full" />
                            <div className="h-4 bg-background-muted-low rounded w-5/6" />
                            <div className="h-4 bg-background-muted-low rounded w-4/6" />
                        </div>

                        <div className="flex flex-wrap gap-xs sm:gap-xs md:gap-sm">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-6 bg-background-muted-low rounded w-12" />
                            ))}
                        </div>

                        <div className="h-4 bg-background-muted-low rounded w-1/2" />
                    </div>
                </div>
            </div>

            {/* Desktop Image Skeleton */}
            <div className="hidden lg:block bg-background-muted-low" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="px-sm py-sm md:px-md md:py-md">
            <div className="flex justify-center">
                <div className="flex items-center justify-center gap-sm">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`bg-background-muted-low rounded-lg ${i === 3 ? 'w-16 h-16 rounded-full' : 'w-12 h-16'}`} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Error State Component
const ErrorState: React.FC<{ onRetry: () => void; message: string }> = ({ onRetry, message }) => (
    <motion.div 
        {...animations.page} 
        className="flex flex-col items-center justify-center text-center space-y-md px-lg"
    >
        <div className="w-20 h-20 bg-background-error rounded-full flex items-center justify-center">
            <FiWifi className="text-icon-2xl text-text-error" />
        </div>
        <div className="space-y-sm">
            <h3 className="text-h4-sm font-semibold text-text-primary">Oops! Something went wrong</h3>
            <p className="text-text-secondary text-para-md max-w-md">{message}</p>
        </div>
        <motion.button
            onClick={onRetry}
            className="flex items-center gap-sm px-lg py-md bg-accent-subtle text-accent-default hover:bg-accent-default hover:text-accent-foreground rounded-lg border border-border-default hover:border-accent-default transition-all"
            {...animations.button}
        >
            <FiRefreshCw className="text-icon-sm" />
            <span className="text-para-md font-medium">Try Again</span>
        </motion.button>
    </motion.div>
);

const Swiper: React.FC = () => {
    const [currentRound, setCurrentRound] = useState(0);
    const [userChoices, setUserChoices] = useState<UserChoice[]>([]);
    const [roundsData, setRoundsData] = useState<RoundData[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showRoundCompletion, setShowRoundCompletion] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);
    
    // Preview Modal States
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [shouldAskForPreview, setShouldAskForPreview] = useState(false);
    
    // Loading States
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [loadingError, setLoadingError] = useState<string | null>(null);
    const [isRetrying, setIsRetrying] = useState(false);

    const totalRounds = getTotalRounds();
    const currentRoundData = roundsData[currentRound];
    const hasNextRound = currentRound < totalRounds - 1;
    const allRoundsComplete = !currentRoundData || currentRoundData.completed;
    const isLastRound = currentRound === totalRounds - 1;
    const percentage = Math.round(((currentRound + 1) / totalRounds) * 100);

    // Simulate data loading with potential errors
    const loadData = useCallback(async () => {
        try {
            setLoadingError(null);
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, TIMINGS.LOADING_SIMULATION));
            
            // Load data
            const data = categories.map((category, index) => ({
                roundNumber: index + 1,
                category,
                components: getCurrentRoundComponents(index),
                currentStep: 0,
                completed: false
            }));

            // Check if data is empty
            if (data.length === 0) {
                throw new Error('No design components available at the moment.');
            }

            setRoundsData(data);
            setIsInitialLoading(false);
        } catch (error) {
            setLoadingError(error instanceof Error ? error.message : 'Failed to load content');
            setIsInitialLoading(false);
        }
    }, []);

    // Initialize data on mount
    useEffect(() => {
        loadData();
    }, [loadData]);

    // Retry handler
    const handleRetry = useCallback(async () => {
        setIsRetrying(true);
        setIsInitialLoading(true);
        await loadData();
        setIsRetrying(false);
    }, [loadData]);

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

        // Check if we should show preview after this round
        const completedRound = currentRound + 1;
        const shouldShowPreview = PREVIEW_ROUNDS.includes(completedRound);

        setTimeout(() => {
            setShowRoundCompletion(false);
            
            if (shouldShowPreview) {
                // Show preview ask modal
                setShouldAskForPreview(true);
            } else if (hasNextRound) {
                // Continue to next round
                setTimeout(() => setCurrentRound(prev => prev + 1), TIMINGS.TRANSITION);
            }
        }, TIMINGS.CELEBRATION);
    }, [currentRound, hasNextRound]);

    const handlePreviewContinue = useCallback(() => {
        setShowPreviewModal(false);
        setShouldAskForPreview(false);
        if (hasNextRound) {
            setCurrentRound(prev => prev + 1);
        }
    }, [hasNextRound]);

    const handleSkipPreview = useCallback(() => {
        setShouldAskForPreview(false);
        if (hasNextRound) {
            setCurrentRound(prev => prev + 1);
        }
    }, [hasNextRound]);

    const handleStartOver = useCallback(() => {
        setIsAnimating(false);
        setCurrentRound(0);
        setUserChoices([]);
        setShowRoundCompletion(false);
        setShouldAskForPreview(false);
        setShowPreviewModal(false);
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

    const handleExit = useCallback(() => {
        setShowExitModal(false);
        // Add your navigation logic here
        // For example: navigate('/dashboard') or window.location.href = '/dashboard'
        console.log('Exiting swiper...');
    }, []);

    // Reusable button component
    const ActionButton: React.FC<{
        onClick: () => void;
        children: React.ReactNode;
        variant?: 'primary' | 'secondary';
        icon: React.ComponentType<{ className?: string }>;
        disabled?: boolean;
    }> = ({ onClick, children, variant = 'primary', icon: Icon, disabled = false }) => (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-xs sm:gap-sm md:gap-sm px-md py-sm sm:px-lg sm:py-sm md:px-xl md:py-md rounded-lg sm:rounded-xl transition-all duration-300 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ${variant === 'primary'
                ? 'bg-accent-default text-accent-foreground hover:bg-accent-hover shadow-lg'
                : 'bg-background-muted text-text-primary hover:bg-background-accent border border-border-default hover:border-border-focus'
                }`}
            {...animations.button}
            style={{ willChange: 'transform' }}
        >
            <Icon className="text-icon-sm sm:text-icon-md" />
            <span className="text-para-sm sm:text-para-md md:text-para-lg font-semibold">{children}</span>
        </motion.button>
    );

    // Round completion celebration component
    const RoundCompletionCelebration = () => (
        <motion.div {...animations.completion} style={{ willChange: 'transform, opacity' }} className="flex flex-col items-center justify-center text-center mt-md sm:mt-lg md:mt-xl px-md">
            <motion.div {...animations.icon} style={{ willChange: 'transform' }} className="mb-sm sm:mb-md md:mb-lg">
                <FiCheckCircle className="text-icon-2xl sm:text-[2.5rem] md:text-[3rem] text-accent-default" />
            </motion.div>
            <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                style={{ willChange: 'transform, opacity' }}
                className="text-h4-sm sm:text-h3-sm md:text-h3-md lg:text-h3-lg font-bold text-text-primary"
            >
                {isLastRound ? 'All Done!' : `${currentRoundData?.category} Round Completed`}
            </motion.h2>
        </motion.div>
    );

    // Show loading skeleton during initial load
    if (isInitialLoading) {
        return (
            <div className="w-full overflow-hidden relative flex flex-col max-lg:p-md" style={{ height: CONTAINER_HEIGHT, minHeight: CONTAINER_HEIGHT }}>
                {/* [Keep existing loading skeleton code] */}
                {/* Header Skeleton */}
                <div className="w-full flex-shrink-0 relative z-10">
                    <div className="max-w-7xl mx-auto px-sm sm:px-md md:px-xl py-xs sm:py-sm md:py-md">
                        <div className="flex items-center justify-between gap-sm">
                            <div className="flex items-center space-x-sm sm:space-x-sm md:space-x-lg flex-1 min-w-0">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-background-muted rounded-md sm:rounded-lg animate-pulse" />
                                <div className="space-y-xs min-w-0 flex-1">
                                    <div className="h-6 bg-background-muted rounded w-32 animate-pulse" />
                                    <div className="h-4 bg-background-muted rounded w-48 hidden sm:block animate-pulse" />
                                </div>
                            </div>
                            <div className="hidden lg:flex items-center gap-sm">
                                <div className="h-2 bg-background-muted rounded-full w-32 animate-pulse" />
                                <div className="h-4 bg-background-muted rounded w-12 animate-pulse" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile Progress Skeleton */}
                    <div className="lg:hidden px-sm pb-xs mb-sm">
                        <div className="flex items-center justify-between gap-sm">
                            <div className="flex-1 h-2 bg-background-muted rounded-full animate-pulse" />
                            <div className="h-4 bg-background-muted rounded w-8 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="flex items-center justify-center px-xs py-xs sm:p-md md:p-xl relative z-20">
                    <div className="relative w-full max-w-4xl 2xl:max-w-6xl mx-auto px-xs sm:px-sm md:px-0">
                        <div className="relative" style={{ height: 'clamp(380px, calc(100vh - 180px), 600px)' }}>
                            {/* Stack of skeleton cards */}
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0"
                                    style={{
                                        zIndex: 30 - i * 10,
                                        scale: 1 - i * 0.08,
                                        y: i * 25,
                                        opacity: 1 - i * 0.3
                                    }}
                                >
                                    <SkeletonCard />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Loading indicator */}
                <motion.div
                    className="absolute bottom-xs sm:bottom-sm md:bottom-0 left-0 right-0 flex justify-center text-text-secondary text-para-sm text-center pb-xs sm:pb-sm md:pb-md pt-xs sm:pt-sm md:pt-lg z-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ willChange: 'opacity' }}
                >
                    <div className="flex items-center gap-sm px-md">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <FiRefreshCw className="text-icon-sm" />
                        </motion.div>
                        <p>Loading amazing designs...</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Show error state if loading failed
    if (loadingError) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen px-lg" style={{ minHeight: CONTAINER_HEIGHT }}>
                <ErrorState 
                    onRetry={handleRetry} 
                    message={loadingError}
                />
            </div>
        );
    }

    // Final completion screen
    if (allRoundsComplete && isLastRound && !showRoundCompletion) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen px-lg" style={{ minHeight: CONTAINER_HEIGHT }}>
                <div className="w-full max-w-5xl mx-auto">
                    <motion.div {...animations.page} style={{ willChange: 'transform, opacity' }} className="text-center space-y-md sm:space-y-lg md:space-y-xl">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring" as const, stiffness: 200, damping: 15, delay: 0.3 }}
                            style={{ willChange: 'transform' }}
                            className="flex justify-center mb-md sm:mb-lg md:mb-xl"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-background-success rounded-full flex items-center justify-center relative">
                                <FiCheckCircle className="text-icon-xl sm:text-icon-2xl md:text-[3rem] text-text-success" />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    style={{ willChange: 'transform' }}
                                    className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 md:-top-2 md:-right-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-accent-default rounded-full flex items-center justify-center"
                                >
                                    <FiAward className="text-accent-foreground text-icon-sm sm:text-icon-md" />
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                            style={{ willChange: 'transform, opacity' }}
                            className="space-y-xs sm:space-y-sm md:space-y-sm"
                        >
                            <h1 className="text-h3-sm sm:text-h2-sm md:text-h2-md font-bold text-text-primary">
                                Design Discovery Complete!
                            </h1>
                            <p className="text-para-sm sm:text-para-md md:text-para-lg text-text-secondary font-medium max-w-3xl mx-auto leading-relaxed px-md">
                                Great job! We've captured your design preferences from <span className="text-accent-default font-semibold">{userChoices.length} components</span> across <span className="text-accent-default font-semibold">{totalRounds} categories</span>.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                            style={{ willChange: 'transform, opacity' }}
                            className="flex flex-col sm:flex-row gap-sm sm:gap-sm md:gap-md justify-center items-center pt-md sm:pt-lg md:pt-xl"
                        >
                            <ActionButton onClick={handleStartOver} variant="secondary" icon={FiRefreshCw} disabled={isRetrying}>
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
        <>
            <div className="w-full overflow-hidden relative flex flex-col max-lg:p-md" style={{ height: CONTAINER_HEIGHT, minHeight: CONTAINER_HEIGHT }}>
                {/* Header Section */}
                <div className="w-full flex-shrink-0 relative z-10">
                    <div className="max-w-7xl mx-auto px-sm sm:px-md md:px-xl py-xs sm:py-sm md:py-md">
                        <div className="flex items-center justify-between gap-sm">
                            <div className="flex items-center space-x-sm sm:space-x-sm md:space-x-lg flex-1 min-w-0">
                                <button
                                    onClick={() => setShowExitModal(true)}
                                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-background-secondary text-text-secondary rounded-md sm:rounded-lg hover:bg-background-muted hover:text-text-primary transition-colors cursor-pointer"
                                >
                                    <FiX className="text-icon-sm sm:text-icon-md" />
                                </button>

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
                        className="absolute bottom-xs sm:bottom-sm md:bottom-0 left-0 right-0 flex justify-center text-text-secondary text-para-xs sm:text-para-sm md:text-para-md text-center pb-xs sm:pb-sm md:pb-md pt-xs sm:pt-sm md:pt-lg z-10 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: TIMINGS.INSTRUCTION_DELAY / 1000, duration: 0.8 }}
                        style={{ willChange: 'opacity' }}
                    >
                        <p className="px-md">Swipe or use buttons • Double tap to super like</p>
                    </motion.div>
                )}
            </div>

            {/* Preview Ask Modal */}
            <Modal
                isOpen={shouldAskForPreview}
                onClose={handleSkipPreview}
                title="Preview Your Design?"
                size="sm"
                footer={
                    <div className="flex gap-sm justify-end">
                        <motion.button
                            onClick={handleSkipPreview}
                            className="px-lg py-sm text-text-primary bg-background-secondary hover:bg-background-muted rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Continue Swiping
                        </motion.button>
                        <motion.button
                            onClick={() => {
                                setShouldAskForPreview(false);
                                setShowPreviewModal(true);
                            }}
                            className="px-lg py-sm text-accent-foreground bg-accent-default hover:bg-accent-hover rounded-lg transition-colors flex items-center gap-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiEye className="text-icon-sm" />
                            Show Preview
                        </motion.button>
                    </div>
                }
            >
                <div className="space-y-lg">
                    <div className="flex items-center justify-center">
                        <div className="w-20 h-20 bg-accent-subtle rounded-full flex items-center justify-center">
                            <FiEye className="text-icon-2xl text-accent-default" />
                        </div>
                    </div>
                    <div className="text-center space-y-sm">
                        <p className="text-text-primary text-para-lg font-medium">
                            Great progress! You've completed {currentRound + 1} rounds.
                        </p>
                        <p className="text-text-secondary text-para-md">
                            Would you like to see how your design is shaping up based on your choices?
                        </p>
                    </div>
                </div>
            </Modal>

            {/* Preview Modal */}
            <PreviewModal
                isOpen={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                onContinue={handlePreviewContinue}
                roundsCompleted={currentRound + 1}
                userChoices={userChoices}
            />

            {/* Exit Modal */}
            <Modal
                isOpen={showExitModal}
                onClose={() => setShowExitModal(false)}
                title="Exit Design Discovery?"
                size="sm"
                footer={
                    <div className="flex gap-sm justify-end">
                        <motion.button
                            onClick={() => setShowExitModal(false)}
                            className="px-lg py-sm text-text-primary bg-background-secondary hover:bg-background-muted rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Continue
                        </motion.button>
                        <motion.button
                            onClick={handleExit}
                            className="px-lg py-sm text-accent-foreground bg-accent-default hover:bg-accent-hover rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Exit
                        </motion.button>
                    </div>
                }
            >
                <div className="space-y-lg">
                    <div className="flex items-center justify-center">
                        <div className="w-20 h-20 bg-background-warning rounded-full flex items-center justify-center">
                            <FiAlertTriangle className="text-icon-2xl text-text-warning" />
                        </div>
                    </div>
                    <p className="text-text-primary text-para-lg text-center font-medium">
                        Are you sure you want to exit? Your progress will be saved.
                    </p>
                </div>
            </Modal>
        </>
    );
};

export default Swiper;