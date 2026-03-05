import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FiMonitor, FiTablet, FiSmartphone,
  FiCheck, FiEdit2, FiRefreshCw, FiAlertTriangle,
} from 'react-icons/fi';
import { type AppDispatch, type RootState } from '@/store';
import {
  pollForThumbnails,
  clearThumbnailError,
  type Thumbnails,
} from '@/features/composition/compositionSlice';
import {
  selectThumbnailStatus,
  selectThumbnails,
  selectThumbnailError,
  selectCompositionId,
} from '@/features/composition/compositionSelectors';

// ─── Types ────────────────────────────────────────────────────────────────────

type Breakpoint = 'desktop' | 'tablet' | 'mobile';

interface BreakpointConfig {
  key: Breakpoint;
  label: string;
  Icon: React.FC<{ className?: string }>;
  width: string;
  previewClass: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const BREAKPOINTS: BreakpointConfig[] = [
  { key: 'desktop', label: 'Desktop', Icon: ({ className }) => <FiMonitor    className={className} />, width: '1440px', previewClass: 'w-full'  },
  { key: 'tablet',  label: 'Tablet',  Icon: ({ className }) => <FiTablet     className={className} />, width: '768px',  previewClass: 'w-[53%]' },
  { key: 'mobile',  label: 'Mobile',  Icon: ({ className }) => <FiSmartphone className={className} />, width: '375px',  previewClass: 'w-[26%]' },
];

const btn = { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } };

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const Sk: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-background-secondary-2 animate-pulse rounded ${className}`} />
);

const ReasoningSkeleton: React.FC = () => (
  <div className="bg-background-secondary border border-border-default rounded-xl p-lg space-y-md">
    <div className="flex items-center gap-sm mb-sm">
      <Sk className="w-4 h-4" />
      <Sk className="h-3 w-32" />
    </div>
    {[1, 2, 3].map(i => <Sk key={i} className="h-4 w-full" />)}
  </div>
);

const PreviewSkeleton: React.FC = () => (
  <div className="bg-background-secondary border border-border-default rounded-xl p-lg">
    <div className="flex items-center gap-sm mb-lg">
      <div className="w-4 h-4 rounded-full border-2 border-accent-default border-t-transparent animate-spin" />
      <span className="text-text-secondary text-para-sm">Rendering previews...</span>
    </div>
    <div className="space-y-xs">
      <Sk className="h-10 w-full rounded-none" />
      <Sk className="h-52 w-full rounded-none" />
      <div className="p-md space-y-sm">
        <Sk className="h-4 w-3/4" />
        <Sk className="h-4 w-1/2" />
        <Sk className="h-8 w-28 mt-sm" />
      </div>
    </div>
  </div>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

const BreakpointSwitcher: React.FC<{
  active: Breakpoint;
  onChange: (bp: Breakpoint) => void;
}> = ({ active, onChange }) => (
  <div className="flex items-center gap-xs bg-background-secondary border border-border-default rounded-lg p-xs">
    {BREAKPOINTS.map(({ key, label, Icon }) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        title={label}
        className={`p-sm rounded-md transition-all ${
          active === key
            ? 'bg-accent-default text-accent-foreground'
            : 'text-text-secondary hover:text-text-primary hover:bg-background-muted'
        }`}
      >
        <Icon className="text-icon-md" />
      </button>
    ))}
  </div>
);

const ThumbnailPreview: React.FC<{
  thumbnails: Thumbnails;
  active: Breakpoint;
}> = ({ thumbnails, active }) => {
  const cfg = BREAKPOINTS.find(b => b.key === active)!;
  return (
    <div className="flex justify-center w-full">
      <div className={`${cfg.previewClass} transition-all duration-300`}>
        {/* Screenshot only — no iframe in V1 per spec */}
        <img
          src={thumbnails[active]}
          alt={`${cfg.label} preview`}
          className="w-full rounded-lg border border-border-default shadow-lg"
        />
      </div>
    </div>
  );
};

const PageShell: React.FC<{
  title?: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, subtitle, headerRight, children }) => (
  <div className="min-h-screen bg-background-primary">
    {(title || headerRight) && (
      <div className="border-b border-border-default px-xl py-lg flex items-center justify-between">
        <div>
          {title    && <h1 className="text-h4-sm font-bold text-text-primary">{title}</h1>}
          {subtitle && <p className="text-text-secondary text-para-sm mt-xs">{subtitle}</p>}
        </div>
        {headerRight && <div>{headerRight}</div>}
      </div>
    )}
    <div className="max-w-5xl mx-auto px-xl py-xl">
      {children}
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const ComposePage: React.FC = () => {
  const { composition_id } = useParams<{ composition_id: string }>();
  const navigate  = useNavigate();
  const dispatch  = useDispatch<AppDispatch>();

  const status     = useSelector(selectThumbnailStatus);
  const thumbnails = useSelector(selectThumbnails);
  const error      = useSelector(selectThumbnailError);
  const storedId   = useSelector(selectCompositionId);

  const [activeBp, setActiveBp] = useState<Breakpoint>('desktop');

  // Guard: if user hard-refreshes, Redux is empty but we have the ID from the URL.
  // Restart polling via GET only — never re-POST.
  useEffect(() => {
    const id = storedId ?? composition_id;
    if (!id) return;
    if (status === 'idle' || status === 'error') {
      dispatch(pollForThumbnails({ compositionId: id }));
    }
  }, []); // run once on mount only

  const handleRetry = () => {
    const id = storedId ?? composition_id;
    if (!id) return;
    dispatch(clearThumbnailError());
    dispatch(pollForThumbnails({ compositionId: id }));
  };

  // ── composing ──────────────────────────────────────────────────────────────
  if (status === 'composing') {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center py-32 gap-lg">
          <div className="w-16 h-16 rounded-full border-4 border-accent-default border-t-transparent animate-spin" />
          <div className="text-center">
            <p className="text-text-primary font-semibold text-h5-sm">Generating your website...</p>
            <p className="text-text-secondary text-para-md mt-xs">Composing sections from your choices</p>
          </div>
        </div>
      </PageShell>
    );
  }

  // ── generating ─────────────────────────────────────────────────────────────
  if (status === 'generating') {
    return (
      <PageShell title="Your Composition" subtitle="Rendering previews...">
        <div className="space-y-lg">
          <ReasoningSkeleton />
          <PreviewSkeleton />
        </div>
      </PageShell>
    );
  }

  // ── error ──────────────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <PageShell title="Your Composition" subtitle="Something went wrong">
        <div className="flex flex-col items-center justify-center py-32 gap-lg text-center">
          <div className="w-16 h-16 rounded-full bg-background-error border border-border-error flex items-center justify-center">
            <FiAlertTriangle className="text-icon-xl text-text-error" />
          </div>
          <div>
            <p className="text-text-primary font-semibold text-h5-sm">Preview timed out</p>
            <p className="text-text-secondary text-para-md mt-xs max-w-sm">
              {error ?? 'Thumbnails did not arrive within 60 seconds. The renderer may be busy.'}
            </p>
          </div>
          <motion.button onClick={handleRetry} {...btn}
            className="flex items-center gap-sm px-lg py-sm bg-background-secondary hover:bg-background-muted border border-border-default text-text-primary rounded-lg transition-colors text-para-md font-medium"
          >
            <FiRefreshCw className="text-icon-sm" /> Retry
          </motion.button>
        </div>
      </PageShell>
    );
  }

  // ── ready ──────────────────────────────────────────────────────────────────
  return (
    <PageShell
      title="Your Composition"
      subtitle="Your design is ready to review"
      headerRight={<BreakpointSwitcher active={activeBp} onChange={setActiveBp} />}
    >
      <div className="space-y-lg">

        {/* Reasoning — visible above preview per spec */}
        <div className="bg-background-secondary border border-border-default rounded-xl p-lg">
          <p className="text-text-secondary text-para-xs font-medium uppercase tracking-wider mb-md">
            Why we built it this way
          </p>
          <p className="text-text-secondary text-para-sm leading-relaxed">
            Sections were selected based on your swipe velocity, superlike patterns, and
            hesitation signals across all rounds. The layout reflects your strongest preferences.
          </p>
        </div>

        {/* Preview */}
        <div className="bg-background-secondary border border-border-default rounded-xl p-lg">
          <div className="flex items-center justify-between mb-lg">
            <span className="text-text-secondary text-para-xs font-medium uppercase tracking-wider">
              {BREAKPOINTS.find(b => b.key === activeBp)?.label} Preview
              <span className="ml-sm text-text-muted">
                ({BREAKPOINTS.find(b => b.key === activeBp)?.width})
              </span>
            </span>
          </div>
          {thumbnails && <ThumbnailPreview thumbnails={thumbnails} active={activeBp} />}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-md">
          <motion.button {...btn}
            className="flex-1 flex items-center justify-center gap-sm px-lg py-md bg-accent-default hover:bg-accent-hover text-accent-foreground font-medium rounded-lg transition-colors"
          >
            <FiCheck className="text-icon-sm" /> Approve
          </motion.button>
          <motion.button {...btn}
            className="flex-1 flex items-center justify-center gap-sm px-lg py-md bg-background-secondary hover:bg-background-muted border border-border-default text-text-primary font-medium rounded-lg transition-colors"
          >
            <FiEdit2 className="text-icon-sm" /> Refine
          </motion.button>
          <motion.button {...btn}
            onClick={() => navigate('/client/swiper')}
            className="flex-1 flex items-center justify-center gap-sm px-lg py-md bg-background-secondary hover:bg-background-muted border border-border-default text-text-primary font-medium rounded-lg transition-colors"
          >
            <FiRefreshCw className="text-icon-sm" /> Generate another
          </motion.button>
        </div>

      </div>
    </PageShell>
  );
};

export default ComposePage;