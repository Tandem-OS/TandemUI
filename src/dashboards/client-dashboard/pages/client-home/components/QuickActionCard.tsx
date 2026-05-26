import React from 'react';

// ─── Props ────────────────────────────────────────────────────────────────────

interface QuickActionCardProps {
  icon: React.ReactNode;
  label: string;
  sub: string;
  onClick?: () => void;
  disabled?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  label,
  sub,
  onClick,
  disabled = false,
}) => (
  <button
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    className={`flex items-center gap-md p-md rounded-xl border text-left transition-all duration-200 w-full ${
      disabled
        ? 'border-border-muted bg-background-muted opacity-50 cursor-not-allowed'
        : 'border-border-default bg-background-primary-2 hover:border-accent-default hover:shadow-sm cursor-pointer'
    }`}
  >
    <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
      disabled ? 'bg-background-muted' : 'bg-accent-subtle'
    }`}>
      <span className={disabled ? 'text-text-tertiary' : 'text-accent-default'}>
        {icon}
      </span>
    </div>
    <div className="min-w-0">
      <p className="text-para-sm font-semibold text-text-primary leading-tight">{label}</p>
      <p className="text-para-xs text-text-tertiary mt-px leading-tight">{sub}</p>
    </div>
  </button>
);

export default QuickActionCard;