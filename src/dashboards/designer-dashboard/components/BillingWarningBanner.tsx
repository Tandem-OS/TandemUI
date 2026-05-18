import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiArrowRightLine } from 'react-icons/ri';
import { type BillingWarningState, type BillingUsageType } from '@/hooks/useBillingGate';

// ─── Label map 

const USAGE_LABELS: Record<BillingUsageType, { action: string; singular: string; noun: string }> = {
  swiper_session: { action: 'swipes',      singular: 'swipe',       noun: 'Swipes'      },
  refine:         { action: 'refinements', singular: 'refinement',  noun: 'Refinements' },
  version_restore:{ action: 'restores',    singular: 'restore',     noun: 'Restores'    },
  scraper_run:    { action: 'scrapes',     singular: 'scrape',      noun: 'Scrapes'     },
  intake_update:  { action: 'updates',     singular: 'update',      noun: 'Updates'     },
};

// ─── Props 

interface BillingWarningBannerProps {
  warningState: BillingWarningState;
  onUpgrade: () => void;
  onViewDetails?: () => void;
  onDismiss: () => void;
  isUpgradeLoading?: boolean;
}

// ─── Warning icon 

const WarningIcon: React.FC = () => (
  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 1.5L16.5 15H1.5L9 1.5Z"
        stroke="#D97706"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="#FEF3C7"
      />
      <path d="M9 7V10" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="12.5" r="0.75" fill="#D97706" />
    </svg>
  </div>
);

// ─── Progress bar 

const UsageProgressBar: React.FC<{
  used: number;
  limit: number;
  noun: string;
  remaining: number;
}> = ({ used, limit, noun, remaining }) => {
  const pct = Math.min(100, Math.round((used / limit) * 100));

  return (
    <div className="flex items-center gap-sm mt-sm flex-wrap">
      <span className="text-para-xs text-amber-700 font-medium whitespace-nowrap">
        {noun} used
      </span>

      {/* Track */}
      <div className="flex-1 min-w-[80px] h-1.5 bg-amber-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-amber-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* used / limit pill */}
      <span className="px-xs py-[2px] rounded-full bg-amber-100 text-amber-700 text-para-xs font-semibold whitespace-nowrap">
        {used} of {limit}
      </span>

      {/* remaining badge */}
      <span className="px-xs py-[2px] rounded-full bg-amber-500 text-white text-para-xs font-semibold whitespace-nowrap">
        {remaining} left
      </span>
    </div>
  );
};

// ─── Banner 

const BillingWarningBanner: React.FC<BillingWarningBannerProps> = ({
  warningState,
  onUpgrade,
  onViewDetails,
  onDismiss,
  isUpgradeLoading = false,
}) => {
  const { usage_type, current_count, limit, remaining } = warningState;
  const { action, singular, noun } = USAGE_LABELS[usage_type] ?? {
    action: 'uses',
    singular: 'use',
    noun: 'Usage',
  };

  const countWord = remaining === 1 ? singular : action;

  return (
    <AnimatePresence>
      <motion.div
        key="billing-warning-banner"
        initial={{ opacity: 0, y: -8, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -8, height: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="overflow-hidden mb-lg"
      >
        <div className="relative rounded-xl border border-amber-300 bg-amber-50 px-lg py-md flex items-start gap-md">

          <WarningIcon />

          {/* Body */}
          <div className="flex-1 min-w-0">
            <p className="text-para-sm font-semibold text-amber-900 leading-snug">
              You're almost out of {action}
            </p>
            <p className="text-para-xs text-amber-700 mt-[2px]">
              You have {remaining} {countWord} left. Upgrade to keep your workflow uninterrupted.
            </p>

            <UsageProgressBar
              used={current_count}
              limit={limit}
              noun={noun}
              remaining={remaining}
            />
          </div>

          {/* CTAs */}
          <div className="flex-shrink-0 flex flex-col items-end gap-xs ml-md">
            <button
              onClick={onUpgrade}
              disabled={isUpgradeLoading}
              className="px-md py-xs rounded-lg border border-amber-500 text-amber-700 text-para-xs font-semibold hover:bg-amber-100 transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {isUpgradeLoading ? (
                <span className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin inline-block" />
              ) : (
                'Upgrade plan'
              )}
            </button>
            {onViewDetails && (
              <button
                onClick={onViewDetails}
                className="flex items-center gap-[3px] text-para-xs text-amber-600 hover:text-amber-800 transition-colors whitespace-nowrap"
              >
                View plan details
                <RiArrowRightLine className="text-[11px]" />
              </button>
            )}
          </div>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            className="absolute top-sm right-sm w-6 h-6 flex items-center justify-center rounded-full text-amber-500 hover:bg-amber-100 transition-colors"
          >
            <RiCloseLine className="text-[14px]" />
          </button>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BillingWarningBanner;
