import type { RootState } from '@/store';

export const selectCompositionId   = (s: RootState) => s.composition.compositionId;
export const selectThumbnails      = (s: RootState) => s.composition.thumbnails;
export const selectThumbnailStatus = (s: RootState) => s.composition.thumbnailStatus;
export const selectThumbnailError  = (s: RootState) => s.composition.thumbnailError;

// Derived — use these in JSX for clean conditional renders
export const selectIsComposing     = (s: RootState) => s.composition.thumbnailStatus === 'composing';
export const selectIsGenerating    = (s: RootState) => s.composition.thumbnailStatus === 'generating';
export const selectThumbnailsReady = (s: RootState) => s.composition.thumbnailStatus === 'ready';
export const selectThumbnailFailed = (s: RootState) => s.composition.thumbnailStatus === 'error';
export const selectPageSchema      = (s: RootState) => s.composition.pageSchema;
export const selectIsRefining      = (s: RootState) => s.composition.thumbnailStatus === 'refining';