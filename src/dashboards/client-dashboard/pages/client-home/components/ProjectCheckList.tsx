import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ChecklistStatus = 'completed' | 'in-progress' | 'not-started' | 'ready';

export interface ChecklistItem {
  id: string;
  label: string;
  status: ChecklistStatus;
  meta?: string;
  statusLabel?: string;
}

interface ProjectChecklistProps {
  title?: string;
  sub?: string;
  items?: ChecklistItem[];
}

// ─── Default mock items ───────────────────────────────────────────────────────

const DEFAULT_ITEMS: ChecklistItem[] = [
  {
    id: 'intake',
    label: 'Intake submitted',
    status: 'completed',
    meta: 'May 19 · 4:12 PM',
    statusLabel: 'COMPLETED',
  },
  {
    id: 'scraping',
    label: 'Site capture',
    status: 'in-progress',
    meta: 'acmecoffee.com · ~3 min remaining',
    statusLabel: 'IN PROGRESS',
  },
  {
    id: 'swiping',
    label: 'Preferences complete',
    status: 'not-started',
    statusLabel: 'NOT STARTED',
  },
  {
    id: 'composing',
    label: 'First layout generated',
    status: 'not-started',
    statusLabel: 'NOT STARTED',
  },
  {
    id: 'refining',
    label: 'Designer review complete',
    status: 'not-started',
    statusLabel: 'NOT STARTED',
  },
  {
    id: 'revisions',
    label: 'Feedback applied',
    status: 'not-started',
    statusLabel: 'NOT STARTED',
  },
  {
    id: 'handoff',
    label: 'Final handoff ready',
    status: 'not-started',
    statusLabel: 'NOT STARTED',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const ProjectChecklist: React.FC<ProjectChecklistProps> = ({
  title = 'Project checklist',
  sub = "What's done, what's coming",
  items = DEFAULT_ITEMS,
}) => {
  const completedCount = items.filter(i => i.status === 'completed').length;

  return (
    <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-md">
        <div>
          <p className="text-para-sm font-bold text-text-primary">{title}</p>
          <p className="text-para-xs text-text-tertiary mt-xs">{sub}</p>
        </div>
        <span className="text-para-xs text-text-tertiary font-medium">
          {completedCount}/{items.length}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-sm">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-sm">
            {/* Left — indicator + label + meta */}
            <div className="flex items-start gap-sm min-w-0">
              {/* Status indicator */}
              <div className="flex-shrink-0 mt-0.5">
                {item.status === 'completed' && (
                  <div className="w-5 h-5 rounded-full bg-accent-default flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5L4.5 7.5L8.5 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                {(item.status === 'in-progress' || item.status === 'ready') && (
                  <div className="w-5 h-5 rounded-full border-2 border-accent-default flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent-default" />
                  </div>
                )}
                {item.status === 'not-started' && (
                  <div className="w-5 h-5 rounded-full border-2 border-border-default" />
                )}
              </div>

              {/* Label + meta */}
              <div className="min-w-0">
                <p className={`text-para-xs font-medium leading-tight ${
                  item.status === 'completed'   ? 'text-text-primary' :
                  item.status === 'in-progress' ? 'text-text-primary font-semibold' :
                  item.status === 'ready'       ? 'text-text-primary font-semibold' :
                                                  'text-text-tertiary'
                }`}>
                  {item.label}
                </p>
                {item.meta && (
                  <p className="text-[10px] text-text-tertiary mt-px leading-tight">
                    {item.meta}
                  </p>
                )}
              </div>
            </div>

            {/* Right — status label */}
            {item.statusLabel && (
              <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wide ${
                item.statusLabel === 'COMPLETED'          ? 'text-text-secondary' :
                item.statusLabel === 'IN PROGRESS'        ? 'text-accent-default' :
                item.statusLabel === 'READY FOR YOU'      ? 'text-accent-default' :
                item.statusLabel === 'WAITING ON DESIGNER'? 'text-text-secondary' :
                                                            'text-text-tertiary'
              }`}>
                {item.statusLabel}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectChecklist;