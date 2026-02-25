import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { ComponentPreview, RoundData } from "@/dashboards/client-dashboard/pages/swiper/swiper.types";

// --- your existing builder ---
const buildRoundsFromComponents = (components: ComponentPreview[]): RoundData[] => {
  const normCategory = (c: ComponentPreview) =>
    String((c as any).category ?? "uncategorized").trim().toLowerCase() || "uncategorized";

  const categories = Array.from(new Set(components.map(normCategory))).sort((a, b) =>
    a.localeCompare(b)
  );

  return categories.map((cat, idx) => {
    const comps = components
      .filter((c) => normCategory(c) === cat)
      .slice()
      .sort((a, b) => String(a.component_id).localeCompare(String(b.component_id)));

    return {
      roundNumber: idx + 1,
      category: cat,
      components: comps as any,
      currentStep: 0,
      completed: false,
    };
  });
};

export const selectSwiperSlice = (state: RootState) => state.swiper;
export const selectSwiperData = (state: RootState) => state.swiper.data;

export const selectDerivedRounds = createSelector([selectSwiperData], (data) => {
  if (!data) return [];
  return buildRoundsFromComponents(data);
});

// make a view selector that includes roundsData
export const selectSwiperView = createSelector(
  [selectSwiperSlice, selectDerivedRounds],
  (swiper, roundsData) => {
    const currentRound = swiper.currentRound ?? 0;
    const totalRounds = roundsData.length;
    const currentRoundData = roundsData[currentRound] ?? null;

    const isLastRound = totalRounds > 0 ? currentRound === totalRounds - 1 : false;

    // If your slice already has allRoundsComplete, keep it; otherwise derive it safely.
    const allRoundsComplete =
      typeof (swiper as any).allRoundsComplete === "boolean"
        ? (swiper as any).allRoundsComplete
        : totalRounds > 0
          ? roundsData.every((r) => r.completed)
          : false;

    return {
      ...swiper,
      roundsData,        
      totalRounds,       
      currentRoundData,  
      isLastRound,
      allRoundsComplete,
    };
  }
);