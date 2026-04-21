import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import { type RootState, type AppDispatch } from '@/store';
import {
  pollForThumbnails,
} from '@/features/composition/compositionSlice';
import {
  selectActiveOrPreviewSchema,
  selectIsPreviewingHistory,
  selectCompositionId,
  selectLastUpdatedCategories,
} from '@/features/composition/compositionSelectors';
import SectionPreview from '@/pages/scraper/components/SectionPreview';
import ChatPanel from '@/pages/scraper/components/ChatPanel';
import type { ComposeSection } from '@/pages/Renderer/CompositionType';

// ── Spinner 

const Spinner: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background-primary gap-lg">
    <div className="w-12 h-12 border-4 border-border-muted border-t-accent-default rounded-full animate-spin" />
    <div className="text-center space-y-sm">
      <p className="text-text-primary font-semibold text-para-lg">Building your design...</p>
      <p className="text-text-secondary text-para-sm">This usually takes 20–30 seconds</p>
    </div>
  </div>
);

const RefineCanvas: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const storedId = useSelector(selectCompositionId);
 
  const lastUpdatedCategories = useSelector(selectLastUpdatedCategories);
  const projectId = useSelector((state: RootState) => state.project.projectId);

  const compositionId = storedId ?? id ?? null;
const activeSchema = useSelector(selectActiveOrPreviewSchema);
const isPreviewingHistory = useSelector(selectIsPreviewingHistory);
  useEffect(() => {
    if (!activeSchema && compositionId) {
      dispatch(pollForThumbnails({ compositionId }));
    }
  }, []);

  if (!activeSchema) return <Spinner />;

  const ordered: ComposeSection[] = [...(activeSchema.sections ?? [])]
    .sort((a, b) => a.position - b.position);

  if (!ordered.length) return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary">
      <p className="text-text-secondary">No sections found in this composition.</p>
    </div>
  );

  const sectionCategories = ordered.map(s => s.category);

  return (
    <div className="min-h-screen bg-background-primary flex flex-col lg:flex-row">

      <div className="flex-1 flex flex-col min-w-0">

        <div className="border-b border-border-default px-xl py-md flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-md">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-xs text-text-secondary hover:text-text-primary transition-colors text-para-sm"
            >
              <FiArrowLeft className="text-icon-sm" />
              Back
            </motion.button>
            <div className="w-px h-4 bg-border-default" />
            <h1 className="text-h5-sm font-semibold text-text-primary">Refine</h1>
            {isPreviewingHistory && (
              <span className="px-sm py-xs bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-para-xs rounded-md font-medium">
                Viewing history
              </span>
            )}
          </div>
          {compositionId && (
            <motion.button
              onClick={() => navigate(`/dashboard/client/swiper/compose/${compositionId}`)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-xs text-para-sm text-text-secondary hover:text-text-primary border border-border-default hover:border-accent-default px-md py-xs rounded-lg transition-colors"
            >
              <FiExternalLink className="text-icon-sm" />
              Full preview
            </motion.button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-xl space-y-md">
          {ordered.map((section) => {
            const isHighlighted = lastUpdatedCategories.includes(section.category);
            return (
              <div key={section.component_id} className="rounded-xl overflow-hidden border border-border-default">
                <SectionPreview
                  section={section}
                  highlighted={isHighlighted}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden lg:flex flex-col w-96 border-l border-border-default flex-shrink-0 h-screen sticky top-0">
        <ChatPanel
          compositionId={compositionId}
          projectId={projectId}
          sections={sectionCategories}
        />
      </div>

      <div className="lg:hidden">
        <ChatPanel
          compositionId={compositionId}
          projectId={projectId}
          sections={sectionCategories}
        />
      </div>
    </div>
  );
};

export default RefineCanvas;
