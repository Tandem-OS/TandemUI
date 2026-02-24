import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FiX, FiRefreshCw, FiAlertTriangle, FiCheckCircle, FiWifi, FiEye } from 'react-icons/fi';
import SwiperStack from './components/SwiperStack';
import SwipeProgress from './components/SwipeProgress';
import KingOfTheHill from './components/KingOfHill';
import SwiperSummary from './components/SwiperSummary';
import PreviewModal from './components/PreviewModal';
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
  unlockTransition,
} from '@/features/swiper/swiperSlice';
import SuccessAnimation from '@/components/animations-components/SuccessAnimation';
import { fetchRoundCompleted, fetchRoundCompletedData, saveRoundCompleted, swiperComponentData, swiperData, swiperKingOfHillMatchesData, swiperKingOfHillSessionData, fetchSwiperComponentsGrouped, } from '@/lib/requests/SwiperRequest';
import GlobalSpinner from '@/components/ant-design-spinner/Spinner';
import Modal from '@/common-components/Modal';

// Constants
const TIMINGS = { CELEBRATION: 2000, TRANSITION: 300, INSTRUCTION_DELAY: 1500 };
const CONTAINER_HEIGHT = 'calc(100vh - 65px)';

const getRoundMessage = (category: string) => {
  const c = (category || "").toLowerCase();
  if (c.includes("hero")) return "Choose the hero design that resonates with you.";
  if (c.includes("nav")) return "Choose the navigation that fits your style.";
  if (c.includes("feature")) return "Choose the features layout you prefer.";
  return `Choose the ${category} design that resonates with you.`;
};
const checkRoundWithBackend = async (): Promise<{ useKingOfHill: boolean }> => {
  return { useKingOfHill: false };
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
    {/* Mobile Layout Skeleton */}
    <div className="block lg:!hidden">
      <div className="bg-background-secondary-2 h-48 sm:h-56" />

      <div className="bg-background-primary-2 p-md sm:p-lg">
        <div className="space-y-md">
          <div className="flex justify-between gap-xs">
            <div className="h-6 bg-background-secondary-2 rounded w-20" />
            <div className="h-6 bg-background-secondary-2 rounded w-16" />
          </div>

          <div className="h-8 bg-background-secondary-2 rounded w-3/4" />

          <div className="space-y-2">
            <div className="h-4 bg-background-secondary-2 rounded w-full" />
            <div className="h-4 bg-background-secondary-2 rounded w-4/5" />
            <div className="h-4 bg-background-secondary-2 rounded w-3/5" />
          </div>

          <div className="flex gap-sm">
            <div className="h-6 bg-background-secondary-2 rounded w-12" />
            <div className="h-6 bg-background-secondary-2 rounded w-12" />
            <div className="h-6 bg-background-secondary-2 rounded w-12" />
          </div>

          <div className="h-4 bg-background-secondary-2 rounded w-1/2" />
        </div>
      </div>
    </div>

    {/* Desktop Layout Skeleton */}
    <div className="!hidden lg:!block relative h-[370px] 2xl:h-[470px]">
      <div className="absolute inset-0 bg-background-secondary-2" />

      <div className="absolute top-lg left-lg w-12 h-12 bg-background-primary-2 rounded-full" />

      <div className="absolute bottom-0 left-0 right-0 bg-background-primary-2 px-lg py-md">
        <div className="flex justify-between gap-md">
          <div className="space-y-sm flex-1">
            <div className="h-8 bg-background-secondary-2 rounded w-3/4" />
            <div className="flex gap-sm">
              <div className="h-6 bg-background-secondary-2 rounded-full w-16" />
              <div className="h-6 bg-background-secondary-2 rounded-full w-16" />
              <div className="h-6 bg-background-secondary-2 rounded-full w-16" />
            </div>
          </div>
          <div className="flex gap-sm">
            <div className="h-8 bg-background-secondary-2 rounded w-20" />
            <div className="h-8 bg-background-secondary-2 rounded w-16" />
          </div>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="px-md py-md">
      <div className="flex justify-center gap-md">
        <div className="w-16 h-16 bg-background-secondary-2 rounded-full" />
        <div className="w-12 h-16 bg-background-secondary-2 rounded-lg" />
        <div className="w-12 h-16 bg-background-secondary-2 rounded-lg" />
        <div className="w-12 h-16 bg-background-secondary-2 rounded-lg" />
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

const Swiper: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [kingOfHillSessions, setKingOfHillSessions] = useState<KingOfHillSession[]>([]);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

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
    kingOfHill
  } = useSelector((state: RootState) => state.swiper);

  const currentRoundData = roundsData[currentRound];
  const allRoundsComplete = !currentRoundData || currentRoundData.completed;
  const isLastRound = currentRound === totalRounds - 1;

  // Fix: Calculate percentage based on completed rounds (currentRound starts at 0)
  const completedRounds = currentRound;  // currentRound is already 0-indexed
  const percentage = totalRounds > 0 ? Math.round((completedRounds / totalRounds) * 100) : 0;

  const isAnyModalOpen = showExitModal || showPreviewModal || shouldAskForPreview;

  // Load data on mount
  const loadData = useCallback(async () => {
    try {
      dispatch(startLoading());

      const res = await fetchSwiperComponentsGrouped();

      const grouped = res.data as Record<string, unknown>;

      const flat = Object.entries(grouped ?? {})
        .sort(([a], [b]) => a.localeCompare(b))
        .flatMap(([key, value]) => {
          const arr = Array.isArray(value) ? value : value ? [value] : [];
          return arr.map((item: any) => ({
            ...item,
            category: item?.category ?? key,
          }));
        });

      dispatch(loadDataSuccess(flat));

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

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const prepopulateFromBackend = async () => {
      try {
        const statusResult = await fetchRoundCompleted();
        if (!statusResult.data.round_completed) return;
        setRoundCompleted(true);

        const summaryResult = await fetchRoundCompletedData();
        const data = summaryResult.data.data;
        const { swipes, king_of_hill_sessions, king_of_hill_matches, components } = data;

        const componentsMap = components.reduce((acc: any, c: any) => {
          acc[c.component_id] = c;
          return acc;
        }, {});

        const roundsDataPrepopulated = king_of_hill_sessions.map((session: any, sessionIndex: number) => {
          const sessionMatches = king_of_hill_matches
            .filter((m: any) => m.session_id === session.id)
            .map((m: any, matchIndex: number) => ({
              id: `${session.id}-match-${matchIndex}`,
              challenger_id: m.challenger_id,
              defender_id: m.defender_id,
              winner_id: m.winner_id,
              match_duration_ms: m.match_duration_ms,
              behavioral_signals: { ...m.behavioral_signals, match_number: matchIndex + 1 },
              match_number: matchIndex + 1
            }));

          const sessionComponentIds = Array.from(
            new Set(sessionMatches.flatMap((m: any) => [m.challenger_id, m.defender_id]))
          );

          const sessionComponents = sessionComponentIds
            .map((id: any, compIndex) => ({
              ...componentsMap[id],
              key: `${session.id}-component-${id}-${compIndex}`
            }))
            .filter(Boolean);

          return {
            key: `round-${session.id}-${sessionIndex}`,
            round_number: session.round_number,
            category: session.category,
            components: sessionComponents,
            matches: sessionMatches,
            final_winner_id: sessionMatches.length ? sessionMatches[sessionMatches.length - 1].winner_id : null,
            session_duration_ms: session.completed_at - session.started_at,
            started_at: session.started_at,
            completed_at: session.completed_at
          };
        });

        const swipesWithComponents = swipes.map((s: any, swipeIndex: number) => ({
          ...s,
          key: `swipe-${s.id ?? swipeIndex}`,
          component: componentsMap[s.component_id]
            ? {
              ...componentsMap[s.component_id],
              key: `swipe-${s.id ?? swipeIndex}-${s.component_id}`
            }
            : null
        }));

        swipesWithComponents.forEach((s: any) => {
          s.choices.forEach((choice: any) => {
            dispatch(addUserChoice({
              choice: {
                component_id: choice.component_id,
                category: choice.category,
                vibe: choice.vibe,
                action: choice.action,
                timestamp: Date.now(),
                behavioral_signals: choice.behavioral_signals || {},
              },
              isAnyModalOpen: false
            }));
          });
        });

        setKingOfHillSessions(roundsDataPrepopulated);

      } catch (err) {
        console.error("Failed to prepopulate swiper data:", err);
      }
    };

    prepopulateFromBackend();
  }, [dispatch]);


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
    const rejectedChoices = roundChoices.filter(choice => choice.action === 'dislike');

    const totalHesitation = roundChoices.reduce((sum, choice) =>
      sum + choice.behavioral_signals.hesitation_ms, 0
    );
    const avgViewDuration = roundChoices.length > 0
      ? roundChoices.reduce((sum, choice) => sum + choice.behavioral_signals.view_duration_ms, 0) / roundChoices.length
      : 0;

    const gestureCount = roundChoices.filter(choice =>
      choice.behavioral_signals.action_source === 'gesture'
    ).length;
    const totalInteractions = roundChoices.length;
    const gestureRatio = totalInteractions > 0 ? gestureCount / totalInteractions : 0;

    return {
      round_number: currentRound + 1,
      category: currentRoundData?.category || '',
      choices: likedChoices,
      rejected: rejectedChoices,
      completion_time: Date.now() - roundStartTime,
      total_hesitation_ms: totalHesitation,
      average_view_duration_ms: avgViewDuration,
      gesture_vs_button_ratio: gestureRatio,
      superlike_count: roundChoices.filter(c => c.behavioral_signals.superlike_used).length,
    };
  }, [currentRound, currentRoundData, roundStartTime]);

  const handleRoundComplete = useCallback(() => {
    dispatch(completeCurrentRound());
  }, [dispatch]);

  const handleKingOfHillSelect = useCallback(async (winner: ComponentPreview, loser: ComponentPreview, signals: KingOfHillBehavioralSignal) => {
    dispatch(recordKingOfHillMatch({ winner, loser, signals }));

    if (kingOfHill.remainingComponents.length === 0) {
      // Generate King of the Hill session summary
      const sessionSummary: KingOfHillSession = {
        round_number: currentRound + 1,
        category: currentRoundData?.category || '',
        components: currentRoundData?.components || [],
        matches: [
          ...kingOfHill.matches,
          {
            challenger_id: kingOfHill.currentChallenger?.component_id || '',
            defender_id: kingOfHill.currentDefender?.component_id || '',
            winner_id: winner.component_id,
            match_duration_ms: Date.now() - kingOfHill.matchStartTime,
            behavioral_signals: signals,
            match_number: kingOfHill.currentMatchNumber,
          },
        ],
        final_winner_id: winner.component_id,
        session_duration_ms: Date.now() - kingOfHill.sessionStartTime,
        started_at: kingOfHill.sessionStartTime,
        completed_at: Date.now(),
      };

      console.log('='.repeat(60));
      console.log(`[KING OF THE HILL COMPLETE - Round ${currentRound + 1}]`);
      console.log('🏆 King of the Hill Summary:', JSON.stringify(sessionSummary));

      const payload = {
        round_number: sessionSummary.round_number,
        category: sessionSummary.category,
        final_winner_id: sessionSummary.final_winner_id,
        session_duration_ms: sessionSummary.session_duration_ms,
        started_at: sessionSummary.started_at,
        completed_at: sessionSummary.completed_at
      }

      let saveSuccess = false;

      try {
        setLoading(true);
        const response = await swiperKingOfHillSessionData(payload);
        const sessionId = response.data.id;

        for (const match of sessionSummary.matches) {
          const payload = { ...match, session_id: sessionId };
          await swiperKingOfHillMatchesData(payload);
        }

        // Wait for all component saves to finish
        for (const component of sessionSummary.components) {
          const payload = { ...component, session_id: sessionId };
          await swiperComponentData(payload);
        }
        console.log('✅ All components saved');
        saveSuccess = true;

        console.log('👑 Final Winner:', winner.title);
        console.log('='.repeat(60));
        setLoading(false);
        // Store locally
        setKingOfHillSessions(prev => [...prev, sessionSummary]);
      } catch (error) {
        console.error('❌ Error saving components', error);
        alert("Try again Save unsuccssfull")
        setLoading(false);
        dispatch(endKingOfHill());

        // Explicitly reload the current round’s components
        if (currentRoundData?.components) {
          dispatch(startKingOfHill(currentRoundData.components));
        }
        saveSuccess = false;
        setLoading(false);
      }

      if (saveSuccess) {
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
    }
  }, [dispatch, kingOfHill, currentRound, currentRoundData, isLastRound]);

  // UseEffect to handle round completion logic after state update
  useEffect(() => {
    if (showRoundCompletion && !kingOfHill.isActive) {
      const saveRoundData = async () => {
        try {
          const roundChoices = userChoices.filter(
            choice => choice.round === currentRound + 1
          );

          if (!roundChoices.length) return;

          const roundSummary = generateRoundSummary(roundChoices);

          console.log('='.repeat(60));
          console.log(`[ROUND ${currentRound + 1} COMPLETE - ${currentRoundData?.category}]`);
          console.log('📊 Round Summary:', JSON.stringify(roundSummary));
          console.log('📈 Breakdown:', {
            total_swipes: roundChoices.length,
            liked: roundSummary.choices.length,
            rejected: roundSummary.rejected.length,
            super_liked: roundSummary.superlike_count
          });
          console.log('='.repeat(60));

          const payload = {
            choices: roundSummary.choices || [],
            rejected: roundSummary.rejected || [],
            round_number: roundSummary.round_number,
            category: currentRoundData?.category || "",
            completion_time: roundSummary.completion_time || null,
            gesture_vs_button_ratio: roundSummary.gesture_vs_button_ratio || null,
            total_hesitation_ms: roundSummary.total_hesitation_ms || null,
            superlike_count: roundSummary.superlike_count || 0,
            average_view_duration_ms: roundSummary.average_view_duration_ms || null,
            breakdown: {
              total_swipes: roundChoices.length,
              liked: roundSummary.choices.length,
              rejected: roundSummary.rejected.length,
              super_liked: roundSummary.superlike_count,
            },
          };

          const result = await swiperData(payload);
          if (result.status !== 200) {
            throw new Error("swiperData response not OK");
          }

          const backendResponse = await checkRoundWithBackend();
          if (isLastRound) {
            try {
              console.log("✅ Marking project round as completed...");
              await saveRoundCompleted();
            } catch (err) {
              console.error("❌ Failed to mark round completed:", err);
            }
          }
          if (backendResponse.useKingOfHill && currentRoundData) {
            console.log("🏆 Backend requested King of the Hill for this round!");
            setTimeout(() => {
              dispatch(setShowRoundCompletion(false));
              dispatch(startKingOfHill(currentRoundData.components));
            }, TIMINGS.CELEBRATION);
          } else {
            setTimeout(() => {
              dispatch(setShowRoundCompletion(false));
              const completedRoundNumber = currentRound + 1;
              const shouldShowPreview =
                completedRoundNumber % 2 === 0 && !isLastRound;

              if (shouldShowPreview) {
                dispatch(setShouldAskForPreview(true));
              } else if (!isLastRound) {
                dispatch(moveToNextRound());
                setTimeout(() => {
                  dispatch(unlockTransition());
                }, 1000);
              }
            }, TIMINGS.CELEBRATION);
          }

        } catch (error) {
          console.error("❌ Backend save/check failed:", error);
          alert("Failed to save round. Please try again.");
          await loadData();
          dispatch(setShowRoundCompletion(false));
        }
      };

      saveRoundData();
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
    <motion.div {...animations.completion} className="flex flex-col items-center justify-center text-center px-md">
      <div className="relative">
        <SuccessAnimation
          showConfetti={true}
          confettiCount={80}
          confettiDuration={4000}
        />
        <motion.div {...animations.icon} className="mb-sm sm:mb-md md:mb-lg">
          <FiCheckCircle className="text-icon-2xl sm:text-[2.5rem] md:text-[3rem] text-accent-default" />
        </motion.div>
      </div>

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

  const handleStartOver = useCallback(() => {
    dispatch(resetSwiper());
  }, [dispatch]);

  const handleGenerateLayout = useCallback(() => {
    console.log('Generating layout with selected preferences...');

    // Create detailed session summary
    const sessionSummary = {
      session_id: `session_${Date.now()}`,
      total_rounds: totalRounds,
      completed_at: new Date().toISOString(),
      total_choices: userChoices.length,
      user_choices: userChoices,
      rounds_data: roundsData,
      king_of_hill_sessions: kingOfHillSessions
    };

    // Store session data in localStorage
    localStorage.setItem('design_session', JSON.stringify(sessionSummary));

    // Add your navigation or action logic here
    // For example: navigate('/generate-layout') or dispatch an action
  }, [userChoices, roundsData, totalRounds, kingOfHillSessions]);

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

  // Final completion screen using SwiperSummary component
  if (
    (allRoundsComplete && isLastRound && !showRoundCompletion && !kingOfHill.isActive) ||
    roundCompleted
  ) {
    return (
      <SwiperSummary
        userChoices={userChoices}
        roundsData={roundsData}
        totalRounds={totalRounds}
        kingOfHillSessions={kingOfHillSessions}
        onStartOver={handleStartOver}
        onGenerateLayout={handleGenerateLayout}
      />
    );
  }

  const currentCategory = currentRoundData?.category || 'Design';
  const roundMessage = kingOfHill.isActive
    ? 'Select your favorite. It helps refine your taste.'
    : getRoundMessage(currentCategory);
  return (
    <>
      {loading ? (<GlobalSpinner />) :
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
            <div className="flex items-center justify-center 2xl:p-xl relative z-20 h-[-webkit-fill-available]">
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

          </div>

          {/* Preview Ask Modal */}
          <Modal
            isOpen={shouldAskForPreview}
            onClose={() => {
              dispatch(handleSkipPreview());
              dispatch(moveToNextRound());
              // Unlock after 1 second to prevent rapid clicks
              setTimeout(() => {
                dispatch(unlockTransition());
              }, 1000);
            }}
            title="Preview Your Design?"
            size="sm"
            footer={
              <div className="flex gap-sm justify-end">
                <motion.button
                  onClick={() => {
                    dispatch(handleSkipPreview());
                    dispatch(moveToNextRound());

                    setTimeout(() => {
                      dispatch(unlockTransition());
                    }, 1000);
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

              setTimeout(() => {
                dispatch(unlockTransition());
              }, 1000);
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
      }
    </>
  );
};

export default Swiper;