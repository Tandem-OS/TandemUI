import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import {
    updateTaste as updateTasteAction,
    clearTaste as clearTasteAction,
} from '@/features/scraper/scraperSlice';
import type { ScrapedSection } from '@/features/scraper/scraperSlice';

export function useTasteProfile() {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(
        (state: RootState) => state.scraper.tasteProfile ?? {}
    );

    const updateTaste = (action: 'like' | 'dislike', section: ScrapedSection) => {
        const tone = section.tone ?? section.metadata?.tone;
        const layout_structure = section.layout_structure ?? section.metadata?.layout_structure;
        if (!tone || !layout_structure) return;
        dispatch(
            updateTasteAction({
                action,
                tone,
                layout_structure,
            })
        );
    };

    const scoreSections = (sections: ScrapedSection[]): ScrapedSection[] => {
        return sections
            .map((section) => {
                const tone = section.tone ?? section.metadata?.tone;
                const layout_structure = section.layout_structure ?? section.metadata?.layout_structure;
                return {
                    ...section,
                    tasteScore: profile[`${tone}_${layout_structure}`] ?? 0,
                };
            })
            .sort((a, b) => (b.tasteScore ?? 0) - (a.tasteScore ?? 0));
    };

    const clearTaste = () => {
        dispatch(clearTasteAction());
    };

    return { profile, updateTaste, scoreSections, clearTaste };
}