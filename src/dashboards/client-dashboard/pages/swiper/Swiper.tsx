import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FiX, FiAlertTriangle, FiCheckCircle, FiEye } from 'react-icons/fi'; import SwiperStack from './components/SwiperStack';
import SwipeProgress from './components/SwipeProgress';
import KingOfTheHill from './components/KingOfHill';
import SwiperSummary from './components/SwiperSummary';
import PreviewModal from './components/PreviewModal';
import { roundMessages } from './mockData';
import BillingGateModal from '@/common-components/BillingGateModal';
import { LOADING_COPY } from '@/lib/config/loadingCopy';
import SharedErrorState from '@/common-components/ErrorState';

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
import {
  fetchRoundCompleted,
  saveRoundCompleted,
  swiperComponentData,
  swiperData,
  swiperKingOfHillMatchesData,
  swiperKingOfHillSessionData,
  getCanonicalComponents,
  type CanonicalComponent,
} from '@/lib/requests/SwiperRequest';
import GlobalSpinner from '@/components/ant-design-spinner/Spinner';
import Modal from '@/common-components/Modal';
import { useNavigate } from 'react-router-dom';
import TransitionMoment from './components/TransitionMoment';
import { useBillingGate } from '@/hooks/useBillingGate';
import Toast from '@/common-components/Toast';

// Constants
const TIMINGS = { CELEBRATION: 2000, TRANSITION: 300, INSTRUCTION_DELAY: 1500, LOADING_SIMULATION: 1500 };
// FIX 1 — use 100dvh so mobile browser chrome is excluded from the height calculation
const CONTAINER_HEIGHT = 'calc(100dvh - 65px)';
const KOH_SNAP_KEY = 'tandem_koh_snap';


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

const mapCanonicalToPreview = (component: CanonicalComponent): ComponentPreview => ({
  id: component.id,
  component_id: component.component_id,
  client_email: component.client_email,
  designer_email: component.designer_email,
  thumbnail_url: component.thumbnail_url ?? "",
  vibe: component.vibe ?? null,
  tone: Array.isArray(component.tone) ? component.tone : [],
  intent: Array.isArray(component.intent) ? component.intent : [],
  tags: Array.isArray(component.tags) ? component.tags : [],
  title: component.title ?? null,
  description: component.description ?? null,
  layout_structure: component.layout_structure,
  category: component.category.toLowerCase(),
  project_id: component.project_id,
  is_canonical: component.is_canonical,
  content_slots: typeof component.content_slots === 'string'
    ? JSON.parse(component.content_slots)
    : component.content_slots ?? {},
  tokens: typeof component.tokens === 'string'
    ? JSON.parse(component.tokens)
    : component.tokens ?? {},
});

const normalizeLayout = (category: string, layout: string): string => {
  const fallbacks: Record<string, string> = {
    hero: 'stacked',
    nav: 'split_nav',
    features: 'grid',
    pricing: 'grid',
    faq: 'accordion',
    testimonials: 'video-grid',
    cta: 'hero-footer',
    contact: 'split_form_grid',
    timeline: 'vertical_editorial',
    footer: 'inline_minimal',
  };
  const known: Record<string, string[]> = {
    hero: ['stacked', 'centered', 'split', 'immersive', 'minimal', 'video_bg'],
    nav: ['split_nav', 'centered', 'minimal', 'wide', 'sidebar', 'mega_menu'],
    features: ['grid', 'list', 'split'],
    pricing: ['three-column', 'stacked', 'grid'],
    faq: ['accordion', 'contained', 'centered-support', 'minimal'],
    testimonials: ['video-grid', 'featured-stats', 'notes', 'carousel'],
    cta: ['hero-footer', 'announcement-faq', 'newsletter-centered', 'search-footer'],
    contact: ['split_form_grid', 'booking_profile_split', 'full_page_split', 'form_editorial_split'],
    timeline: ['vertical_editorial', 'alternating_media'],
    footer: ['inline_minimal', 'split_expanded', 'multi_column', 'info_links_bar'],
  };
  const cat = category.toLowerCase();
  const knownLayouts = known[cat] ?? [];
  const result = knownLayouts.includes(layout) ? layout : (fallbacks[cat] ?? 'default');
  return result;
};

// Skeleton Card Component
const SkeletonCard: React.FC = () => (
  <div className="bg-background-secondary rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-border-default overflow-hidden animate-pulse">
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

const Swiper: React.FC = () => {
  const [isSummaryReady, setIsSummaryReady] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [kingOfHillSessions, setKingOfHillSessions] = useState<KingOfHillSession[]>([]);
  const [roundCompleted] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);
  const designerEmail = useSelector((state: RootState) => state.auth.user.designerEmail);
  const {
    gateState,
    warningState,
    handleBillingError,
    handleUsageUpdate,
    dismissGate,
    dismissWarning,
    isCheckoutLoading,
    checkoutError,
    initiateCheckout,
  } = useBillingGate();
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
    kingOfHill,
  } = useSelector((state: RootState) => state.swiper);

  const currentRoundData = roundsData[currentRound];
  const allRoundsComplete = !currentRoundData || currentRoundData.completed;
  const isLastRound = currentRound === totalRounds - 1;
  const percentage = totalRounds > 0
    ? Math.min(100, Math.round((roundsData.filter(r => r.completed).length / totalRounds) * 100))
    : 0;
  const isAnyModalOpen = showExitModal || showPreviewModal || shouldAskForPreview;

  const loadData = useCallback(async () => {
    try {
      dispatch(startLoading());
      setKingOfHillSessions([]);

      const data = await getCanonicalComponents();
      const componentsMap = data ?? {};
      const flatComponents: ComponentPreview[] = [
        ...(componentsMap['hero'] ?? []),
        ...(componentsMap['nav'] ?? []),
        ...(componentsMap['features'] ?? []),
        ...(componentsMap['pricing'] ?? []),
        ...(componentsMap['faq'] ?? []),
        ...(componentsMap['testimonials'] ?? []),
        ...(componentsMap['cta'] ?? []),
        ...(componentsMap['contact'] ?? []),
        ...(componentsMap['timeline'] ?? []),
        ...(componentsMap['footer'] ?? []),
      ].map(c => mapCanonicalToPreview(c as CanonicalComponent));

      if (!flatComponents.length) {
        dispatch(loadDataFailure('no_components'));
        return;
      }

      dispatch(loadDataSuccess(flatComponents));
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
        navigate('/dashboard/client/compose');
      } catch {
        // fetchRoundCompleted failed — user stays on swiper, not a blocking error
      }
    };
    prepopulateFromBackend();
  }, [dispatch]);

  useEffect(() => {
    if (isInitialLoading) return;
    const raw = sessionStorage.getItem(KOH_SNAP_KEY);
    if (!raw) return;
    try {
      const snap = JSON.parse(raw);
      if (Array.isArray(snap?.components) && snap.components.length >= 2) {
        dispatch(startKingOfHill(snap.components));
      }
    } catch {
      sessionStorage.removeItem(KOH_SNAP_KEY);
    }
  }, [isInitialLoading]);

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
      const kohSnap = (() => {
        try { return JSON.parse(sessionStorage.getItem(KOH_SNAP_KEY) ?? 'null'); }
        catch { return null; }
      })();
      const snapRound = kohSnap?.currentRound ?? currentRound;
      const snapCategory = kohSnap?.category || currentRoundData?.category || '';
      const snapComponents = kohSnap?.components || currentRoundData?.components || [];
      const snapIsLastRound = kohSnap?.isLastRound ?? isLastRound;
      const sessionSummary: KingOfHillSession = {
        round_number: snapRound + 1,
        category: snapCategory,
        components: snapComponents,
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

      const payload = {
        round_number: sessionSummary.round_number,
        category: sessionSummary.category,
        final_winner_id: sessionSummary.final_winner_id,
        session_duration_ms: sessionSummary.session_duration_ms,
        started_at: sessionSummary.started_at,
        completed_at: sessionSummary.completed_at
      };

      let saveSuccess = false;

      try {
        setLoading(true);
        const response = await swiperKingOfHillSessionData(payload);
        const sessionId = response.data.id;

        for (const match of sessionSummary.matches) {
          const matchPayload = { ...match, session_id: sessionId };
          await swiperKingOfHillMatchesData(matchPayload);
        }

        for (const component of sessionSummary.components) {
          const componentPayload = {
            component_id: component.component_id,
            project_id: component.project_id,
            client_email: component.client_email,
            designer_email: component.designer_email,
            session_id: sessionId,
            thumbnail_url: component.thumbnail_url || null,
            id: component.id,
            title: component.title ?? undefined,
            description: component.description ?? undefined,
            category: component.category?.toLowerCase(),
            layout_structure: normalizeLayout(
              component.category ?? '',
              component.layout_structure ?? ''
            ),
            content_slots: component.content_slots,
            tokens: component.tokens,
            tone: component.tone,
            intent: component.intent,
            tags: component.tags,
            vibe: component.vibe,
            is_canonical: component.is_canonical ?? false,
          };
          await swiperComponentData(componentPayload);
        }

        saveSuccess = true;
        sessionStorage.removeItem(KOH_SNAP_KEY);
        setLoading(false);
        setKingOfHillSessions(prev => [...prev, sessionSummary]);
      } catch {
        showToast('Failed to save. Please try again.');
        setLoading(false);
        dispatch(endKingOfHill());
        if (currentRoundData?.components) {
          dispatch(startKingOfHill(currentRoundData.components));
        }
        saveSuccess = false;
      }

      if (saveSuccess) {
        setTimeout(() => {
          dispatch(endKingOfHill());
          const shouldShowPreview = (snapRound + 1) % 2 === 0 && !snapIsLastRound;
          if (shouldShowPreview) {
            dispatch(setShouldAskForPreview(true));
          } else if (!isLastRound) {
            dispatch(moveToNextRound());
            setTimeout(() => dispatch(unlockTransition()), 1000);
          } else {
            setIsSummaryReady(true);
          }
        }, 1000);
      }
    }
  }, [dispatch, kingOfHill, currentRound, currentRoundData, isLastRound]);

  useEffect(() => {
    if (showRoundCompletion && !kingOfHill.isActive) {
      const saveRoundData = async () => {
        try {
          const roundChoices = userChoices.filter(
            choice => choice.round === currentRound + 1
          );

          if (!roundChoices.length) return;

          const roundSummary = generateRoundSummary(roundChoices);

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

          if (result.data?.usage) {
            handleUsageUpdate({
              usage_type: 'swiper_session',
              current_count: result.data.usage.current_count,
              limit: result.data.usage.limit,
            });
          }

          // Mark round complete (backend)
          if (isLastRound) {
            try { await saveRoundCompleted(); }
            catch {
              // saveRoundCompleted failed — round data already saved, non-blocking
            }
          }

          const likedComponentIds = new Set(
            roundChoices
              .filter(c => c.action === "like" || c.action === "super-like")
              .map(c => c.component_id)
          );

          const likedComponents = (currentRoundData?.components ?? []).filter(
            c => likedComponentIds.has(c.component_id)
          );

          setTimeout(async () => {
            dispatch(setShowRoundCompletion(false));

            if (likedComponents.length >= 2) {
              sessionStorage.setItem(KOH_SNAP_KEY, JSON.stringify({
                components: likedComponents,
                currentRound,
                category: currentRoundData?.category ?? '',
                isLastRound,
              }));
              dispatch(startKingOfHill(likedComponents));

            } else if (likedComponents.length === 1) {
              const winner = likedComponents[0];
              try {
                const sessionRes = await swiperKingOfHillSessionData({
                  round_number: currentRound + 1,
                  category: currentRoundData?.category ?? "",
                  final_winner_id: winner.component_id,
                  session_duration_ms: 0,
                  started_at: Date.now(),
                  completed_at: Date.now(),
                });

                const sessionId = sessionRes.data.id;

                await swiperComponentData({
                  component_id: winner.component_id,
                  project_id: winner.project_id,
                  client_email: winner.client_email,
                  designer_email: winner.designer_email,
                  session_id: sessionId,
                  category: winner.category?.toLowerCase(),
                  layout_structure: normalizeLayout(
                    winner.category ?? "",
                    winner.layout_structure ?? ""
                  ),
                  thumbnail_url: winner.thumbnail_url || null,
                  content_slots: winner.content_slots,
                  tokens: winner.tokens,
                  is_canonical: winner.is_canonical ?? false,
                  title: winner.title ?? undefined,
                  description: winner.description ?? undefined,
                  tone: winner.tone,
                  intent: winner.intent,
                  tags: winner.tags,
                  vibe: winner.vibe,
                });
              } catch {
                showToast('Could not save your pick. Your progress continues, but this selection may be lost.');
              }

              const autoSession: KingOfHillSession = {
                round_number: currentRound + 1,
                category: currentRoundData?.category ?? '',
                components: [winner],
                matches: [],
                final_winner_id: winner.component_id,
                session_duration_ms: 0,
                started_at: Date.now(),
                completed_at: Date.now(),
              };

              setKingOfHillSessions(prev => [...prev, autoSession]);

              if (!isLastRound) {
                dispatch(moveToNextRound());
                setTimeout(() => dispatch(unlockTransition()), 1000);
              } else {
                setIsSummaryReady(true);
              }

            } else {
              if (!isLastRound) {
                dispatch(moveToNextRound());
                setTimeout(() => dispatch(unlockTransition()), 1000);
              } else {
                setIsSummaryReady(true);
              }
            }

          }, TIMINGS.CELEBRATION);

        } catch (error: any) {
          // 🔥 Billing Gate Intercept
          if (handleBillingError(error)) {
            dispatch(setShowRoundCompletion(false));
            return;
          }

          showToast('Failed to save round. Please try again.');
          await loadData();
          dispatch(setShowRoundCompletion(false));
        }
      };

      saveRoundData();
    }
  }, [
    showRoundCompletion,
    userChoices,
    currentRound,
    generateRoundSummary,
    currentRoundData,
    kingOfHill.isActive,
    dispatch,
    isLastRound,
    totalRounds
  ]);
  useEffect(() => {
    return () => {
      setKingOfHillSessions([]);
    };
  }, []);

  const handleAnimationStart = useCallback(() => dispatch(setAnimating(true)), [dispatch]);
  const handleAnimationComplete = useCallback(() => dispatch(setAnimating(false)), [dispatch]);
  const handleExit = useCallback(() => {
    dispatch(setShowExitModal(false));
    navigate('/dashboard/client');
  }, [dispatch, navigate]);

  const RoundCompletionCelebration = () => (
    <motion.div {...animations.completion} className="flex flex-col items-center justify-center text-center px-md">
      <div className="relative">
        <SuccessAnimation showConfetti={true} confettiCount={80} confettiDuration={4000} />
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
        {isLastRound ? 'All Done!' : `${currentRoundData?.category.charAt(0).toUpperCase() + currentRoundData?.category.slice(1)} Round Completed`}
      </motion.h2>
    </motion.div>
  );

  const handleStartOver = useCallback(() => {
    sessionStorage.removeItem(KOH_SNAP_KEY);
    dispatch(resetSwiper());
  }, [dispatch]);

  const handleGenerateLayout = useCallback(async () => {
    // FIX: /dashboard/client/swiper/compose does not exist as a route.
    // /dashboard/client/compose is ScraperIntelligencePage mode="compose"
    // which checks for existing composition and shows StartFromIdea if none.
    navigate('/dashboard/client/compose');
  }, [navigate]);

  const handleTransitionComplete = useCallback(() => {
    setShowTransition(false);
    handleGenerateLayout();
  }, [handleGenerateLayout]);

  const handleRequestGenerate = useCallback(() => {
    setShowTransition(true);
  }, []);

  if (isInitialLoading) {
    return (
      // FIX 1 also applied here — dvh in skeleton loading state
      <div className="w-full overflow-hidden relative flex flex-col" style={{ height: CONTAINER_HEIGHT, minHeight: CONTAINER_HEIGHT }}>
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
            <div className="relative" style={{ height: 'clamp(380px, calc(100dvh - 180px), 600px)' }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{ zIndex: 30 - i * 10, scale: 1 - i * 0.08, y: i * 25, opacity: 1 - i * 0.3 }}
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

  if (loadingError) {
    return (
      <div className="w-full flex items-center justify-center px-lg" style={{ minHeight: CONTAINER_HEIGHT }}>
        {loadingError === 'no_components' ? (
          <SharedErrorState
            variant="scrape_empty"
            title="No components available"
            message="There's nothing to swipe on yet. Your designer may still be setting things up."
            onSecondary={() => navigate('/dashboard/client')}
            secondaryLabel="Back to dashboard"
          />
        ) : (
          <SharedErrorState
            variant="network"
            title="Couldn't load components"
            message={loadingError}
            onAction={handleRetry}
          />
        )}
      </div>
    );
  }

  if (
    ((allRoundsComplete && isLastRound && !showRoundCompletion) || roundCompleted)
    && !kingOfHill.isActive
  ) {
    return (
      <>
        {showTransition && (
          <TransitionMoment
            roundsCompleted={kingOfHillSessions.length}
            totalSwipes={kingOfHillSessions.reduce((sum, s) => sum + s.matches.length, 0)}
            onComplete={handleTransitionComplete}
          />
        )}
        {isSummaryReady ? (
          <SwiperSummary
            userChoices={userChoices}
            roundsData={roundsData}
            totalRounds={totalRounds}
            kingOfHillSessions={kingOfHillSessions}
            onStartOver={handleStartOver}
            onGenerateLayout={handleRequestGenerate}
          />
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <p>Preparing session summary...</p>
          </div>
        )}
      </>
    );
  }

  const currentCategory = currentRoundData?.category
    ? currentRoundData.category.charAt(0).toUpperCase() + currentRoundData.category.slice(1)
    : 'Design';
  const roundMessage = kingOfHill.isActive
    ? 'Select your favorite. It helps refine your taste.'
    : roundMessages[currentCategory] || 'Choose the design that resonates with you.';

  return (
    <>
      {toastMessage && (
        <Toast message={toastMessage.message} type={toastMessage.type} />
      )}
      {/* FIX 2 — warning toast constrained so it never bleeds off-screen on 375px */}
      <AnimatePresence>
        {warningState && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-sm px-md py-sm rounded-lg bg-amber-50 border border-amber-200 text-amber-800 shadow-md text-para-sm w-[calc(100vw-2rem)] max-w-md"
          >
            <span>⚠️ {warningState.remaining} swiper {warningState.remaining === 1 ? 'session' : 'sessions'} left on your free plan.</span>
            <button
              onClick={dismissWarning}
              className="ml-sm text-amber-600 hover:text-amber-900 font-medium underline flex-shrink-0"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {loading ? (<GlobalSpinner {...LOADING_COPY.savingRound} />) :
        <>
          {/* FIX 3 — removed max-lg:p-md which double-padded on mobile alongside children's own px-sm */}
          <div className="w-full overflow-hidden relative flex flex-col" style={{ height: CONTAINER_HEIGHT, minHeight: CONTAINER_HEIGHT }}>
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
                  <SwipeProgress
                    current={currentRound + 1}
                    total={totalRounds}
                    completedCount={roundsData.filter(r => r.completed).length}
                    className="hidden lg:flex"
                  />
                </div>
              </div>
              <div className="lg:hidden px-sm pb-xs mb-sm">
                <div className="flex items-center justify-between gap-sm">
                  <div className="flex-1 h-2 bg-background-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-default rounded-full transition-transform duration-700 ease-out"
                      style={{ transform: `scaleX(${percentage / 100})`, transformOrigin: 'left' }}
                    />
                  </div>
                  <span className="text-text-secondary text-para-xs font-medium whitespace-nowrap">{percentage}%</span>
                </div>
              </div>
            </div>
            {/* FIX 4 — replaced h-[-webkit-fill-available] (non-standard, won't compile) with flex-1 min-h-0 */}
            <div className="flex items-center justify-center 2xl:p-xl relative z-20 flex-1 min-h-0">
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

          {/* FIX 5 — added flex-wrap to modal footers so buttons don't overflow at 375px */}
          <Modal
            isOpen={shouldAskForPreview}
            onClose={() => {
              dispatch(handleSkipPreview());
              dispatch(moveToNextRound());
              setTimeout(() => { dispatch(unlockTransition()); }, 1000);
            }}
            title="Preview Your Design?"
            size="sm"
            footer={
              <div className="flex flex-wrap gap-sm justify-end">
                <motion.button
                  onClick={() => {
                    dispatch(handleSkipPreview());
                    dispatch(moveToNextRound());
                    setTimeout(() => { dispatch(unlockTransition()); }, 1000);
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

          <PreviewModal
            isOpen={showPreviewModal}
            onClose={() => dispatch(setShowPreviewModal(false))}
            onContinue={() => {
              dispatch(handlePreviewContinue());
              dispatch(moveToNextRound());
              setTimeout(() => { dispatch(unlockTransition()); }, 1000);
            }}
            roundsCompleted={currentRound + 1}
            userChoices={userChoices}
            roundsData={roundsData}
          />
          {gateState && (
            <BillingGateModal
              isOpen={true}
              usageType={gateState.usage_type}
              currentCount={gateState.current_count}
              limit={gateState.limit}
              userRole="client"
              designerEmail={designerEmail}
              isCheckoutLoading={isCheckoutLoading}
              checkoutError={checkoutError}
              onUpgrade={(plan) => initiateCheckout(plan)}
              onSecondary={() => {
                dismissGate();
                navigate("/dashboard/client/compose");
              }}
              onClose={dismissGate}
            />
          )}
          <Modal
            isOpen={showExitModal}
            onClose={() => dispatch(setShowExitModal(false))}
            title="Exit Design Discovery?"
            size="sm"
            footer={
              <div className="flex flex-wrap gap-sm justify-end">
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