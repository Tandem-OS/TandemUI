import React from 'react';

// ─── Props ────────────────────────────────────────────────────────────────────

interface DashHeroProps {
  heading?: string;
  body?: string;
  primaryCta?: string;
  onPrimaryClick?: () => void;
  secondaryCta?: string;
  onSecondaryClick?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const DashHero: React.FC<DashHeroProps> = ({
  heading = 'Welcome to Tandem.',
  body = 'Create your project to kick off the process. Your designer will be notified and you can start your intake right after.',
  primaryCta = 'Create Intake',
  onPrimaryClick,
  secondaryCta,
  onSecondaryClick,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-lg mb-xl">
      {/* Left — heading + body */}
      <div className="flex-1">
        <h1 className="text-h2-sm sm:text-h1-sm font-bold text-text-primary mb-sm leading-tight">
          {heading}
        </h1>
        <p className="text-para-md text-text-secondary leading-relaxed max-w-xl">
          {body}
        </p>
      </div>

      {/* Right — CTAs */}
      <div className="flex items-center gap-sm flex-shrink-0">
        {secondaryCta && (
          <button
            onClick={onSecondaryClick}
            className="px-lg py-sm rounded-xl border border-border-default bg-background-primary text-para-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            {secondaryCta}
          </button>
        )}
        <button
          onClick={onPrimaryClick}
          className="flex items-center gap-xs px-lg py-sm rounded-xl bg-accent-default text-accent-foreground text-para-sm font-semibold hover:bg-accent-hover transition-colors"
        >
          {primaryCta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DashHero;