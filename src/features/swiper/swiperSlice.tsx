import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    type UserChoice,
    type RoundData,
    type KingOfHillState,
    type KingOfHillMatch,
    type ComponentPreview
} from '@/dashboards/client-dashboard/pages/swiper/swiper.types';

interface SwiperState {
    // Round Management
    currentRound: number;
    roundsData: RoundData[];
    totalRounds: number;

    // User Choices & Analytics
    userChoices: UserChoice[];
    roundStartTime: number;

    // UI States
    isAnimating: boolean;
    showRoundCompletion: boolean;
    showExitModal: boolean;
    showPreviewModal: boolean;
    shouldAskForPreview: boolean;

    // Loading States
    isInitialLoading: boolean;
    loadingError: string | null;
    isRetrying: boolean;

    // King of the Hill
    kingOfHill: KingOfHillState;
    isTransitioning: boolean;
}

const initialKingOfHillState: KingOfHillState = {
    isActive: false,
    currentDefender: null,
    currentChallenger: null,
    remainingComponents: [],
    matches: [],
    sessionStartTime: 0,
    matchStartTime: 0,
    currentMatchNumber: 0,
};

const initialState: SwiperState = {
    currentRound: 0,
    roundsData: [],
    totalRounds: 0,
    userChoices: [],
    roundStartTime: Date.now(),
    isAnimating: false,
    showRoundCompletion: false,
    showExitModal: false,
    showPreviewModal: false,
    shouldAskForPreview: false,
    isInitialLoading: true,
    loadingError: null,
    isRetrying: false,
    kingOfHill: initialKingOfHillState,
    isTransitioning: false,
};

const swiperSlice = createSlice({
    name: 'swiper',
    initialState,
    reducers: {
        // Data Loading
        loadDataSuccess: (state, action: PayloadAction<ComponentPreview[]>) => {
            const components = Array.isArray(action.payload) ? action.payload : [];

            const normCategory = (c: ComponentPreview) =>
                String((c as any).category ?? "uncategorized").trim().toLowerCase() || "uncategorized";

            // Deterministic category list
            const categories = Array.from(new Set(components.map(normCategory))).sort((a, b) =>
                a.localeCompare(b)
            );

            // Build rounds dynamically from categories
            const rounds: RoundData[] = categories.map((cat, idx) => {
                const comps = components
                    .filter(c => normCategory(c) === cat)
                    .slice()
                    .sort((a, b) => String(a.component_id).localeCompare(String(b.component_id)));

                return {
                    roundNumber: idx + 1,
                    category: cat,       // keep normalized value; or change to Title Case if you want
                    components: comps as any, // if RoundData.components expects ComponentPreview[], remove `as any`
                    currentStep: 0,
                    completed: false,
                };
            });

            state.roundsData = rounds;
            state.totalRounds = rounds.length;
            state.currentRound = 0;
            state.isInitialLoading = false;
            state.loadingError = null;
        },

        loadDataFailure: (state, action: PayloadAction<string>) => {
            state.loadingError = action.payload;
            state.isInitialLoading = false;
        },

        setRetrying: (state, action: PayloadAction<boolean>) => {
            state.isRetrying = action.payload;
            if (action.payload) {
                state.isInitialLoading = true;
            }
        },

        // Swipe Actions
        addUserChoice: (state, action: PayloadAction<{
            choice: Omit<UserChoice, 'round'>;
            isAnyModalOpen: boolean;
        }>) => {
            const enhancedChoice: UserChoice = {
                ...action.payload.choice,
                round: state.currentRound + 1,
                behavioral_signals: {
                    ...action.payload.choice.behavioral_signals,
                    is_asked_ai: action.payload.choice.behavioral_signals.is_asked_ai
                }
            };
            state.userChoices.push(enhancedChoice);
        },

        // Round Management
        completeCurrentRound: (state) => {
            if (state.roundsData[state.currentRound]) {
                state.roundsData[state.currentRound].completed = true;
            }
            state.showRoundCompletion = true;
        },

        moveToNextRound: (state) => {
            // Check for transition lock
            if (state.isAnimating || state.showRoundCompletion || state.isTransitioning) return;

            state.isTransitioning = true; // Lock transitions
            state.showRoundCompletion = false;
            state.shouldAskForPreview = false;
            state.showPreviewModal = false;

            if (state.currentRound < state.totalRounds - 1) {
                state.currentRound += 1;
                state.roundStartTime = Date.now();
            }
        },

        // Add new reducer to unlock transitions
        unlockTransition: (state) => {
            state.isTransitioning = false;
        },

        // Animation States
        setAnimating: (state, action: PayloadAction<boolean>) => {
            state.isAnimating = action.payload;
        },

        // Modal States
        setShowExitModal: (state, action: PayloadAction<boolean>) => {
            state.showExitModal = action.payload;
        },

        setShowPreviewModal: (state, action: PayloadAction<boolean>) => {
            state.showPreviewModal = action.payload;
        },

        setShouldAskForPreview: (state, action: PayloadAction<boolean>) => {
            state.shouldAskForPreview = action.payload;
        },

        setShowRoundCompletion: (state, action: PayloadAction<boolean>) => {
            state.showRoundCompletion = action.payload;
        },

        // Preview Actions
        handlePreviewContinue: (state) => {
            state.showPreviewModal = false;
            state.shouldAskForPreview = false;
        },

        handleSkipPreview: (state) => {
            state.shouldAskForPreview = false;
        },

        // King of the Hill Actions
        startKingOfHill: (state, action: PayloadAction<ComponentPreview[]>) => {
            const components = [...action.payload];
            const defender = components.shift();
            const challenger = components.shift();

            state.kingOfHill = {
                isActive: true,
                currentDefender: defender || null,
                currentChallenger: challenger || null,
                remainingComponents: components,
                matches: [],
                sessionStartTime: Date.now(),
                matchStartTime: Date.now(),
                currentMatchNumber: 1,
            };
        },

        recordKingOfHillMatch: (state, action: PayloadAction<{
            winner: ComponentPreview;
            loser: ComponentPreview;
            signals: any;
        }>) => {
            const match: KingOfHillMatch = {
                challenger_id: state.kingOfHill.currentChallenger?.component_id || '',
                defender_id: state.kingOfHill.currentDefender?.component_id || '',
                winner_id: action.payload.winner.component_id,
                match_duration_ms: Date.now() - state.kingOfHill.matchStartTime,
                behavioral_signals: action.payload.signals,
                match_number: state.kingOfHill.currentMatchNumber,
            };

            state.kingOfHill.matches.push(match);

            // Setup next match
            if (state.kingOfHill.remainingComponents.length > 0) {
                const nextChallenger = state.kingOfHill.remainingComponents.shift();
                state.kingOfHill.currentDefender = action.payload.winner;
                state.kingOfHill.currentChallenger = nextChallenger || null;
                state.kingOfHill.matchStartTime = Date.now();
                state.kingOfHill.currentMatchNumber += 1;
            } else {
                // King of the Hill complete
                state.kingOfHill.isActive = false;
            }
        },

        endKingOfHill: (state) => {
            state.kingOfHill = initialKingOfHillState;
        },

        // Reset Action
        resetSwiper: (state) => {
            state.isAnimating = false;
            state.currentRound = 0;
            state.userChoices = [];
            state.showRoundCompletion = false;
            state.shouldAskForPreview = false;
            state.showPreviewModal = false;
            state.roundsData = state.roundsData.map(round => ({
                ...round,
                completed: false,
                currentStep: 0
            }));
            state.roundStartTime = Date.now();
            state.kingOfHill = initialKingOfHillState;
        },

        // Update round start time
        updateRoundStartTime: (state) => {
            state.roundStartTime = Date.now();
        },

        startLoading: (state) => {
            state.isInitialLoading = true;
            state.loadingError = null;
        },
    },
});

export const {
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
} = swiperSlice.actions;

export default swiperSlice.reducer;