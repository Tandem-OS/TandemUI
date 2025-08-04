import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserChoice, type RoundData } from '@/dashboards/client-dashboard/pages/swiper/swiper.types';
import { categories, getCurrentRoundComponents, getTotalRounds } from '@/dashboards/client-dashboard/pages/swiper/mockData';

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
}

const initialState: SwiperState = {
    currentRound: 0,
    roundsData: [],
    totalRounds: getTotalRounds(),
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
};

const swiperSlice = createSlice({
    name: 'swiper',
    initialState,
    reducers: {
        // Data Loading
        loadDataSuccess: (state) => {
            const data = categories.map((category, index) => ({
                roundNumber: index + 1,
                category,
                components: getCurrentRoundComponents(index),
                currentStep: 0,
                completed: false
            }));

            state.roundsData = data;
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
                    is_modal_open: action.payload.choice.behavioral_signals.is_modal_open || action.payload.isAnyModalOpen
                }
            };
            state.userChoices.push(enhancedChoice);
        },

        // Round Management
        completeCurrentRound: (state) => {
            state.roundsData[state.currentRound].completed = true;
            state.showRoundCompletion = true;

            // Check if should show preview after even rounds
            const completedRoundNumber = state.currentRound + 1;
            const shouldShowPreview = completedRoundNumber % 2 === 0 && completedRoundNumber > 0;
            const isLastRound = state.currentRound === state.totalRounds - 1;

            if (shouldShowPreview && !isLastRound) {
                state.shouldAskForPreview = true;
            }
        },

        moveToNextRound: (state) => {
            state.showRoundCompletion = false;
            state.shouldAskForPreview = false;
            state.showPreviewModal = false;
            if (state.currentRound < state.totalRounds - 1) {
                state.currentRound += 1;
                state.roundStartTime = Date.now();
            }
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
            if (state.currentRound < state.totalRounds - 1) {
                state.currentRound += 1;
                state.roundStartTime = Date.now();
            }
        },

        handleSkipPreview: (state) => {
            state.shouldAskForPreview = false;
            if (state.currentRound < state.totalRounds - 1) {
                state.currentRound += 1;
                state.roundStartTime = Date.now();
            }
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
    startLoading
} = swiperSlice.actions;

export default swiperSlice.reducer;