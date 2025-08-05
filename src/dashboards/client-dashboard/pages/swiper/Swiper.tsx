import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FiX, FiRefreshCw, FiDownload, FiAlertTriangle, FiCheckCircle, FiAward, FiWifi, FiEye } from 'react-icons/fi';
import SwiperStack from './components/SwiperStack';
import SwipeProgress from './components/SwipeProgress';
import KingOfTheHill from './components/KingOfHill';
import Modal from '@/comman-components/Modal';
import PreviewModal from './components/PreviewModal';
import { roundMessages } from './mockData';
import {
    type SwipeAction,
    type ComponentPreview,
    type BehavioralSignal,
    type KingOfHillBehavioralSignal,
    type RoundSummary,
    type KingOfHillSession,
} from './swiper.types';
import { type RootState, type AppDispatch } from '@/store';
import {
    loadDataSuccess,
    loadDataFailure,
    setRetrying,
    addUserChoice,
    completeCurrentRound,
    moveToNextRound,
    setAnimating,
    setShowExitModal,
    setShowPreviewModal,
    setShouldAskForPreview,
    setShowRoundCompletion,
    handlePreviewContinue,
    handleSkipPreview,
    resetSwiper,
    updateRoundStartTime,
    startLoading,
    startKingOfHill,
    recordKingOfHillMatch,
    endKingOfHill,
} from '@/features/swiper/swiperSlice';

// Constants
const TIMINGS = { CELEBRATION: 2000, TRANSITION: 300, INSTRUCTION_DELAY: 1500, LOADING_SIMULATION: 1500 };
const CONTAINER_HEIGHT = 'calc(100vh - 65px)';

// Mock backend check function
const checkRoundWithBackend = async (roundSummary: RoundSummary): Promise<{ useKingOfHill: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { useKingOfHill: roundSummary.round_number % 2 === 0 };
};

// Animation variants
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

// Skeleton Card Component
const SkeletonCard: React.FC = () => (
    <div className="bg-background-secondary rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-border-default overflow-hidden animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:hidden bg-background-muted h-48 sm:h-56" />
            <div className="lg:col-span-4 bg-background-primary-2 p-md sm:p-lg lg:p-xl flex flex-col justify-center">
                <div className="space-y-sm md:space-y-md lg:space-y-lg">
                    <div className="flex items-center justify-between gap-xs">
                        <div className="h-6 bg-background-muted rounded-md w-20" />
                        <div className="h-6 bg-background-muted rounded-md w-16" />
                    </div>
                    <div className="space-y-xs sm:space-y-sm md:space-y-md">
                        <div className="h-8 bg-background-muted rounded-md w-3/4" />
                        <div className="space-y-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-4 bg-background-muted rounded" style={{ width: `${100 - i * 10}%` }} />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-xs sm:gap-xs md:gap-sm">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-6 bg-background-muted rounded w-12" />
                            ))}
                        </div>
                        <div className="h-4 bg-background-muted rounded w-1/2" />
                    </div>
                </div>
            </div>
            <div className="hidden lg:block bg-background-muted lg:col-span-8" />
        </div>
        <div className="px-sm py-sm md:px-md md:py-md">
            <div className="flex justify-center">
                <div className="flex items-center justify-center gap-sm">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`bg-background-muted rounded-lg ${i === 3 ? 'w-16 h-16 rounded-full' : 'w-12 h-16'}`} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Error State Component
const ErrorState: React.FC<{ onRetry: () => void; message: string }> = ({ onRetry, message }) => (
    <motion.div {...animations.page} className="flex flex-col items-center justify-center text-center space-y-md px-lg">
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

// Action Button Component
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
    >
        <Icon className="text-icon-sm sm:text-icon-md" />
        <span className="text-para-sm sm:text-para-md md:text-para-lg font-semibold">{children}</span>
    </motion.button>
);

const Swiper: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [kingOfHillSessions, setKingOfHillSessions] = useState<KingOfHillSession[]>([]);

    const {
        currentRound,
        roundsData,
        totalRounds,
        userChoices,
        roundStartTime,
        isAnimating,
        showRoundCompletion,
        showExitModal,
        showPreviewModal,
        shouldAskForPreview,
        isInitialLoading,
        loadingError,
        isRetrying,
        kingOfHill
    } = useSelector((state: RootState) => state.swiper);

    const currentRoundData = roundsData[currentRound];
    const allRoundsComplete = !currentRoundData || currentRoundData.completed;
    const isLastRound = currentRound === totalRounds - 1;
    const percentage = Math.round((currentRound / totalRounds) * 100);
    const isAnyModalOpen = showExitModal || showPreviewModal || shouldAskForPreview;

    // Load data on mount
    const loadData = useCallback(async () => {
        try {
            dispatch(startLoading());
            await new Promise(resolve => setTimeout(resolve, TIMINGS.LOADING_SIMULATION));
            dispatch(loadDataSuccess());
        } catch (error) {
            dispatch(loadDataFailure(error instanceof Error ? error.message : 'Failed to load content'));
        }
    }, [dispatch]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        dispatch(updateRoundStartTime());
    }, [currentRound, dispatch]);

    const handleRetry = useCallback(async () => {
        dispatch(setRetrying(true));
        await loadData();
        dispatch(setRetrying(false));
    }, [dispatch, loadData]);

    const handleSwipe = useCallback((action: SwipeAction, component: ComponentPreview, signals: BehavioralSignal) => {
        dispatch(addUserChoice({
            choice: {
                component_id: component.component_id,
                category: component.category,
                vibe: component.vibe,
                action,
                timestamp: Date.now(),
                behavioral_signals: signals
            },
            isAnyModalOpen
        }));
    }, [dispatch, isAnyModalOpen]);

    const generateRoundSummary = useCallback((roundChoices: any[]): RoundSummary => {
        const likedChoices = roundChoices.filter(choice =>
            choice.action === 'like' || choice.action === 'super-like'
        );
        const savedChoices = roundChoices.filter(choice => choice.action === 'save');
        const rejectedChoices = roundChoices.filter(choice => choice.action === 'dislike');

        const totalHesitation = roundChoices.reduce((sum, choice) =>
            sum + choice.behavioral_signals.hesitation_ms, 0
        );
        const avgViewDuration = roundChoices.reduce((sum, choice) =>
            sum + choice.behavioral_signals.view_duration_ms, 0
        ) / roundChoices.length;

        const gestureCount = roundChoices.filter(choice =>
            choice.behavioral_signals.action_source === 'gesture'
        ).length;
        const totalInteractions = roundChoices.length;
        const gestureRatio = totalInteractions > 0 ? gestureCount / totalInteractions : 0;

        return {
            round_number: currentRound + 1,
            category: currentRoundData?.category || '',
            choices: likedChoices,
            saved: savedChoices,
            rejected: rejectedChoices,
            completion_time: Date.now() - roundStartTime,
            total_hesitation_ms: totalHesitation,
            average_view_duration_ms: avgViewDuration,
            gesture_vs_button_ratio: gestureRatio,
            superlike_count: roundChoices.filter(c => c.behavioral_signals.superlike_used).length,
            save_count: savedChoices.length
        };
    }, [currentRound, currentRoundData, roundStartTime]);

    const handleRoundComplete = useCallback(() => {
        dispatch(completeCurrentRound());
        // Don't log here as state might not be updated yet
    }, [dispatch]);

    const handleKingOfHillSelect = useCallback((winner: ComponentPreview, loser: ComponentPreview, signals: KingOfHillBehavioralSignal) => {
        dispatch(recordKingOfHillMatch({ winner, loser, signals }));

        if (kingOfHill.remainingComponents.length === 0) {
            // Generate King of the Hill session summary
            const sessionSummary: KingOfHillSession = {
                round_number: currentRound + 1,
                category: currentRoundData?.category || '',
                components: currentRoundData?.components || [],
                matches: [...kingOfHill.matches, {
                    challenger_id: kingOfHill.currentChallenger?.component_id || '',
                    defender_id: kingOfHill.currentDefender?.component_id || '',
                    winner_id: winner.component_id,
                    match_duration_ms: Date.now() - kingOfHill.matchStartTime,
                    behavioral_signals: signals,
                    match_number: kingOfHill.currentMatchNumber,
                }],
                final_winner_id: winner.component_id,
                session_duration_ms: Date.now() - kingOfHill.sessionStartTime,
                started_at: kingOfHill.sessionStartTime,
                completed_at: Date.now(),
            };

            console.log('='.repeat(60));
            console.log(`[KING OF THE HILL COMPLETE - Round ${currentRound + 1}]`);
            console.log('🏆 King of the Hill Summary:', sessionSummary);
            console.log('👑 Final Winner:', winner.title);
            console.log('='.repeat(60));

            // Store the session
            setKingOfHillSessions(prev => [...prev, sessionSummary]);

            setTimeout(() => {
                dispatch(endKingOfHill());
                const completedRoundNumber = currentRound + 1;
                const shouldShowPreview = completedRoundNumber % 2 === 0 && !isLastRound;

                if (shouldShowPreview) {
                    dispatch(setShouldAskForPreview(true));
                } else if (!isLastRound) {
                    dispatch(moveToNextRound());
                }
            }, 1000);
        }
    }, [dispatch, kingOfHill, currentRound, currentRoundData, isLastRound]);

    const handleExportChoices = useCallback(() => {
        const sessionData = {
            session_id: `session_${Date.now()}`,
            total_rounds: totalRounds,
            completed_at: new Date().toISOString(),
            total_choices: userChoices.length,
            choices_by_round: userChoices,
            king_of_hill_sessions: kingOfHillSessions,
            total_king_of_hill_sessions: kingOfHillSessions.length
        };

        const dataStr = JSON.stringify(sessionData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const link = document.createElement('a');
        link.setAttribute('href', dataUri);
        link.setAttribute('download', 'design-choices-complete.json');
        link.click();
    }, [userChoices, totalRounds, kingOfHillSessions]);

    // UseEffect to handle round completion logic after state update
    useEffect(() => {
        if (showRoundCompletion && !kingOfHill.isActive) {
            const roundChoices = userChoices.filter(choice => choice.round === currentRound + 1);

            if (roundChoices.length > 0) {
                const roundSummary = generateRoundSummary(roundChoices);

                // Log round completion with all choices properly counted
                console.log('='.repeat(60));
                console.log(`[ROUND ${currentRound + 1} COMPLETE - ${currentRoundData?.category}]`);
                console.log('📊 Round Summary:', roundSummary);
                console.log('📈 Breakdown:', {
                    total_swipes: roundChoices.length,
                    liked: roundSummary.choices.length,
                    saved: roundSummary.saved.length,
                    rejected: roundSummary.rejected.length,
                    super_liked: roundSummary.superlike_count
                });
                console.log('='.repeat(60));

                // Check with backend
                checkRoundWithBackend(roundSummary).then(backendResponse => {
                    if (backendResponse.useKingOfHill && currentRoundData) {
                        console.log('🏆 Backend requested King of the Hill for this round!');

                        setTimeout(() => {
                            dispatch(setShowRoundCompletion(false));
                            dispatch(startKingOfHill(currentRoundData.components));
                        }, TIMINGS.CELEBRATION);
                    } else {
                        setTimeout(() => {
                            dispatch(setShowRoundCompletion(false));
                            const completedRoundNumber = currentRound + 1;
                            const shouldShowPreview = completedRoundNumber % 2 === 0 && !isLastRound;

                            if (shouldShowPreview) {
                                dispatch(setShouldAskForPreview(true));
                            } else if (!isLastRound) {
                                dispatch(moveToNextRound());
                            }
                        }, TIMINGS.CELEBRATION);
                    }
                }).catch(error => {
                    console.error('Backend check failed:', error);
                    setTimeout(() => {
                        dispatch(setShowRoundCompletion(false));
                        if (currentRound < totalRounds - 1) {
                            dispatch(moveToNextRound());
                        }
                    }, TIMINGS.CELEBRATION);
                });
            }
        }
    }, [showRoundCompletion, userChoices, currentRound, generateRoundSummary, currentRoundData, kingOfHill.isActive, dispatch, isLastRound, totalRounds]);

    // Reset kingOfHillSessions when component unmounts or resets
    useEffect(() => {
        return () => {
            setKingOfHillSessions([]);
        };
    }, []);

    const handleAnimationStart = useCallback(() => dispatch(setAnimating(true)), [dispatch]);
    const handleAnimationComplete = useCallback(() => dispatch(setAnimating(false)), [dispatch]);
    const handleExit = useCallback(() => {
        dispatch(setShowExitModal(false));
        console.log('Exiting swiper...');
    }, [dispatch]);

    const RoundCompletionCelebration = () => (
        <motion.div {...animations.completion} className="flex flex-col items-center justify-center text-center mt-md sm:mt-lg md:mt-xl px-md">
            <motion.div {...animations.icon} className="mb-sm sm:mb-md md:mb-lg">
                <FiCheckCircle className="text-icon-2xl sm:text-[2.5rem] md:text-[3rem] text-accent-default" />
            </motion.div>
            <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-h4-sm sm:text-h3-sm md:text-h3-md lg:text-h3-lg font-bold text-text-primary"
            >
                {isLastRound ? 'All Done!' : `${currentRoundData?.category} Round Completed`}
            </motion.h2>
        </motion.div>
    );

    // Loading state
    if (isInitialLoading) {
        return (
            <div className="w-full overflow-hidden relative flex flex-col max-lg:p-md" style={{ height: CONTAINER_HEIGHT, minHeight: CONTAINER_HEIGHT }}>
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
                    <div className="lg:hidden px-sm pb-xs mb-sm">
                        <div className="flex items-center justify-between gap-sm">
                            <div className="flex-1 h-2 bg-background-muted rounded-full animate-pulse" />
                            <div className="h-4 bg-background-muted rounded w-8 animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center px-xs py-xs sm:p-md md:p-xl relative z-20">
                    <div className="relative w-full max-w-4xl 2xl:max-w-6xl mx-auto px-xs sm:px-sm md:px-0">
                        <div className="relative" style={{ height: 'clamp(380px, calc(100vh - 180px), 600px)' }}>
                            {[0, 1, 2].map(i => (
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
                <motion.div
                    className="absolute bottom-xs sm:bottom-sm md:bottom-0 left-0 right-0 flex justify-center text-text-secondary text-para-sm text-center pb-xs sm:pb-sm md:pb-md pt-xs sm:pt-sm md:pt-lg z-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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

    // Error state
    if (loadingError) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen px-lg" style={{ minHeight: CONTAINER_HEIGHT }}>
                <ErrorState onRetry={handleRetry} message={loadingError} />
            </div>
        );
    }

    // Final completion screen
    if (allRoundsComplete && isLastRound && !showRoundCompletion && !kingOfHill.isActive) {
        const positiveChoicesCount = userChoices.filter(choice =>
            choice.action === 'like' || choice.action === 'super-like'
        ).length;
        const savedChoicesCount = userChoices.filter(choice =>
            choice.action === 'save'
        ).length;
        const rejectedChoicesCount = userChoices.filter(choice =>
            choice.action === 'dislike'
        ).length;

        // Create detailed session summary with King of the Hill data
        const sessionSummary = {
            session_id: `session_${Date.now()}`,
            total_rounds: totalRounds,
            completed_at: new Date().toISOString(),
            total_choices: userChoices.length,

            summary_counts: {
                positive_choices: positiveChoicesCount,
                saved_choices: savedChoicesCount,
                rejected_choices: rejectedChoicesCount,
                super_likes: userChoices.filter(choice =>
                    choice.behavioral_signals.superlike_used
                ).length,
                ai_assistance_used: userChoices.filter(choice =>
                    choice.behavioral_signals.is_asked_ai
                ).length
            },

            behavioral_insights: {
                average_hesitation_ms: userChoices.reduce((sum, choice) =>
                    sum + choice.behavioral_signals.hesitation_ms, 0
                ) / userChoices.length,
                average_view_duration_ms: userChoices.reduce((sum, choice) =>
                    sum + choice.behavioral_signals.view_duration_ms, 0
                ) / userChoices.length,
                gesture_actions: userChoices.filter(choice =>
                    choice.behavioral_signals.action_source === 'gesture'
                ).length,
                button_actions: userChoices.filter(choice =>
                    choice.behavioral_signals.action_source === 'button'
                ).length,
                keyboard_actions: userChoices.filter(choice =>
                    choice.behavioral_signals.action_source === 'keyboard'
                ).length
            },

            rounds_data: roundsData.map((round, index) => {
                const roundNumber = index + 1;
                const roundChoices = userChoices.filter(choice => choice.round === roundNumber);

                const likedChoices = roundChoices.filter(choice =>
                    choice.action === 'like' || choice.action === 'super-like'
                );
                const savedChoices = roundChoices.filter(choice =>
                    choice.action === 'save'
                );
                const rejectedChoices = roundChoices.filter(choice =>
                    choice.action === 'dislike'
                );

                return {
                    round_number: roundNumber,
                    category: round.category,
                    choices: likedChoices,
                    saved: savedChoices,
                    rejected: rejectedChoices,
                    total_swipes: roundChoices.length,
                    breakdown: {
                        likes: likedChoices.length,
                        saves: savedChoices.length,
                        rejects: rejectedChoices.length,
                        super_likes: roundChoices.filter(choice =>
                            choice.behavioral_signals.superlike_used
                        ).length,
                        ai_assistance: roundChoices.filter(choice =>
                            choice.behavioral_signals.is_asked_ai
                        ).length
                    }
                };
            }),

            king_of_hill_sessions: kingOfHillSessions.map(session => ({
                round_number: session.round_number,
                category: session.category,
                final_winner: {
                    id: session.final_winner_id,
                    title: session.components.find(c => c.component_id === session.final_winner_id)?.title || 'Unknown'
                },
                total_matches: session.matches.length,
                session_duration_ms: session.session_duration_ms,
                matches_detail: session.matches.map(match => {
                    const defender = session.components.find(c => c.component_id === match.defender_id);
                    const challenger = session.components.find(c => c.component_id === match.challenger_id);
                    const winner = session.components.find(c => c.component_id === match.winner_id);

                    return {
                        match_number: match.match_number,
                        defender: defender?.title || 'Unknown',
                        challenger: challenger?.title || 'Unknown',
                        winner: winner?.title || 'Unknown',
                        match_duration_ms: match.match_duration_ms,
                        behavioral_signals: {
                            hesitation_ms: match.behavioral_signals.hesitation_ms,
                            view_duration_ms: match.behavioral_signals.view_duration_ms,
                            hesitation_readable: `${(match.behavioral_signals.hesitation_ms / 1000).toFixed(2)}s`,
                            view_duration_readable: `${(match.behavioral_signals.view_duration_ms / 1000).toFixed(2)}s`
                        }
                    };
                })
            })),

            total_king_of_hill_sessions: kingOfHillSessions.length,
            king_of_hill_winners: kingOfHillSessions.map(session => ({
                round: session.round_number,
                category: session.category,
                winner: session.components.find(c => c.component_id === session.final_winner_id)?.title || 'Unknown',
                winner_id: session.final_winner_id
            }))
        };

        console.log('='.repeat(80));
        console.log('[SESSION COMPLETE - FULL DATA WITH KING OF THE HILL DETAILS]');
        console.log(sessionSummary, null, 2);
        console.log('='.repeat(80));

        return (
            <div className="w-full flex items-center justify-center min-h-screen px-lg" style={{ minHeight: CONTAINER_HEIGHT }}>
                <div className="w-full max-w-5xl mx-auto">
                    <motion.div {...animations.page} className="text-center space-y-md sm:space-y-lg md:space-y-xl">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                            className="flex justify-center mb-md sm:mb-lg md:mb-xl"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-background-success rounded-full flex items-center justify-center relative">
                                <FiCheckCircle className="text-icon-xl sm:text-icon-2xl md:text-[3rem] text-text-success" />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
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
                            className="space-y-xs sm:space-y-sm md:space-y-sm"
                        >
                            <h1 className="text-h3-sm sm:text-h2-sm md:text-h2-md font-bold text-text-primary">
                                Design Discovery Complete!
                            </h1>
                            <p className="text-para-sm sm:text-para-md md:text-para-lg text-text-secondary font-medium max-w-3xl mx-auto leading-relaxed px-md">
                                Great job! We've captured your design preferences from <span className="text-accent-default font-semibold">{positiveChoicesCount} components</span> across <span className="text-accent-default font-semibold">{totalRounds} categories</span>.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-sm sm:gap-sm md:gap-md justify-center items-center pt-md sm:pt-lg md:pt-xl"
                        >
                            <ActionButton onClick={() => dispatch(resetSwiper())} variant="secondary" icon={FiRefreshCw} disabled={isRetrying}>
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
    const roundMessage = kingOfHill.isActive
        ? 'Choose the design that speaks to you more.'
        : roundMessages[currentCategory] || 'Choose the design that resonates with you.';

    return (
        <>
            <div className="w-full overflow-hidden relative flex flex-col max-lg:p-md" style={{ height: CONTAINER_HEIGHT, minHeight: CONTAINER_HEIGHT }}>
                <div className="w-full flex-shrink-0 relative z-10">
                    <div className="max-w-7xl mx-auto px-sm sm:px-md md:px-xl py-xs sm:py-sm md:py-md">
                        <div className="flex items-center justify-between gap-sm">
                            <div className="flex items-center space-x-sm sm:space-x-sm md:space-x-lg flex-1 min-w-0">
                                <button
                                    onClick={() => dispatch(setShowExitModal(true))}
                                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-background-secondary text-text-secondary rounded-md sm:rounded-lg hover:bg-background-muted hover:text-text-primary transition-colors cursor-pointer"
                                >
                                    <FiX className="text-icon-sm sm:text-icon-md" />
                                </button>
                                <div className="space-y-0 md:space-y-xs min-w-0 flex-1">
                                    <div className="flex items-center space-x-xs sm:space-x-sm md:space-x-md flex-wrap">
                                        <h1 className="text-h6-sm sm:text-h5-sm md:text-h4-md 2xl:text-h4-lg font-bold text-text-primary truncate">
                                            {kingOfHill.isActive ? 'King of the Hill' : `${currentCategory} Round`}
                                        </h1>
                                        <span className="px-xs py-px sm:px-sm sm:py-xs md:px-sm md:py-xs bg-accent-subtle text-text-primary text-para-xs font-medium rounded-sm sm:rounded-md whitespace-nowrap">
                                            {kingOfHill.isActive
                                                ? `Match ${kingOfHill.currentMatchNumber} of ${kingOfHill.matches.length + kingOfHill.remainingComponents.length + 1}`
                                                : `Round ${currentRound + 1} of ${totalRounds}`
                                            }
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
                <div className="flex items-center justify-center 2xl:p-xl relative z-20">
                    <AnimatePresence mode="wait">
                        {showRoundCompletion ? (
                            <RoundCompletionCelebration />
                        ) : kingOfHill.isActive && kingOfHill.currentDefender && kingOfHill.currentChallenger ? (
                            <motion.div key="king-of-hill" {...animations.page} className="w-full h-full">
                                <KingOfTheHill
                                    defender={kingOfHill.currentDefender}
                                    challenger={kingOfHill.currentChallenger}
                                    onSelect={handleKingOfHillSelect}
                                    matchNumber={kingOfHill.currentMatchNumber}
                                    isAnimating={isAnimating}
                                    onAnimationStart={handleAnimationStart}
                                    onAnimationComplete={handleAnimationComplete}
                                />
                            </motion.div>
                        ) : currentRoundData && !currentRoundData.completed ? (
                            <motion.div key={`round-${currentRound}`} {...animations.page} className="w-full h-full flex items-center justify-center">
                                <SwiperStack
                                    key={currentRound}
                                    components={currentRoundData.components}
                                    onSwipe={handleSwipe}
                                    onComplete={handleRoundComplete}
                                    isAnimating={isAnimating}
                                    onAnimationStart={handleAnimationStart}
                                    onAnimationComplete={handleAnimationComplete}
                                    isModalOpen={isAnyModalOpen}
                                />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
                {!showRoundCompletion && !kingOfHill.isActive && (
                    <motion.div
                        className="absolute bottom-xs sm:bottom-sm md:bottom-0 left-0 right-0 flex justify-center text-text-secondary text-para-xs sm:text-para-sm md:text-para-md text-center pb-xs sm:pb-sm md:pb-md pt-xs sm:pt-sm md:pt-lg z-10 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: TIMINGS.INSTRUCTION_DELAY / 1000, duration: 0.8 }}
                    >
                        <p className="px-md">Swipe or use buttons • Double tap to super like</p>
                    </motion.div>
                )}
            </div>

            {/* Preview Ask Modal */}
            <Modal
                isOpen={shouldAskForPreview}
                onClose={() => {
                    dispatch(handleSkipPreview());
                    dispatch(moveToNextRound());
                }}
                title="Preview Your Design?"
                size="sm"
                footer={
                    <div className="flex gap-sm justify-end">
                        <motion.button
                            onClick={() => {
                                dispatch(handleSkipPreview());
                                dispatch(moveToNextRound());
                            }}
                            className="px-lg py-sm text-text-primary bg-background-secondary hover:bg-background-muted rounded-lg transition-colors"
                            {...animations.button}
                        >
                            <span className='inline lg:hidden'>Continue</span>
                            <span className='hidden lg:inline'>Continue Swiping</span>
                        </motion.button>
                        <motion.button
                            onClick={() => {
                                dispatch(setShouldAskForPreview(false));
                                dispatch(setShowPreviewModal(true));
                            }}
                            className="px-lg py-sm text-accent-foreground bg-accent-default hover:bg-accent-hover rounded-lg transition-colors flex items-center gap-sm"
                            {...animations.button}
                        >
                            <FiEye className="text-icon-sm" />
                            <span className='inline lg:hidden'>Preview</span>
                            <span className='hidden lg:inline'>Show Preview</span>
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
                onClose={() => dispatch(setShowPreviewModal(false))}
                onContinue={() => {
                    dispatch(handlePreviewContinue());
                    dispatch(moveToNextRound());
                }}
                roundsCompleted={currentRound + 1}
            />

            {/* Exit Modal */}
            <Modal
                isOpen={showExitModal}
                onClose={() => dispatch(setShowExitModal(false))}
                title="Exit Design Discovery?"
                size="sm"
                footer={
                    <div className="flex gap-sm justify-end">
                        <motion.button
                            onClick={() => dispatch(setShowExitModal(false))}
                            className="px-lg py-sm text-text-primary bg-background-secondary hover:bg-background-muted rounded-lg transition-colors"
                            {...animations.button}
                        >
                            Continue
                        </motion.button>
                        <motion.button
                            onClick={handleExit}
                            className="px-lg py-sm text-accent-foreground bg-accent-default hover:bg-accent-hover rounded-lg transition-colors"
                            {...animations.button}
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