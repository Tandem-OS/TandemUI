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
export const selectIsRefining = (s: RootState) => s.composition.isRefining

export const selectVersions       = (s: RootState) => s.composition.versions.versions
export const selectCurrentVersion = (s: RootState) => s.composition.versions.currentVersion
export const selectVersionsStatus = (s: RootState) => s.composition.versions.status
export const selectRestoreStatus  = (s: RootState) => s.composition.versions.restoreStatus
export const selectLastUpdatedCategories = (s: RootState) => s.composition.lastUpdatedCategories;
