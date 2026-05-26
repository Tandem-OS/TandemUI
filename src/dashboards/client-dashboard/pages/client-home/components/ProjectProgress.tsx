import React from 'react';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type NodeState = 'completed' | 'current' | 'pending';

interface ProjectProgressProps {
  projectStatus: string | null;
  stageLabel?: string;
  stageSub?: string;
  statusPill?: string;
  estHandoff?: string;
  rightNow?: string;
  upNext?: string;
}

// ─── COPY ─────────────────────────────────────────────────────────────────────

const COPY = {
  sectionLabel: 'Project progress',
  estHandoffLabel: 'Est. handoff',
  rightNowLabel: 'Right now',
  upNextLabel: 'Up next',
} as const;

// ─── Pipeline & nodes ─────────────────────────────────────────────────────────

const PIPELINE = [
  'intake', 'scraping', 'swiping', 'embedded',
  'composing', 'refining', 'designer-feedback', 'platform-feedback',
  'revisions', 'completed', 'handoff',
] as const;

type PipelineStage = typeof PIPELINE[number];

const STEPPER_NODES = [
  { id: 'intake',             label: 'Intake' },
  { id: 'scraping',           label: 'Site capture' },
  { id: 'swiping',            label: 'Style preferences' },
  { id: 'composing',          label: 'First layout' },
  { id: 'refining',           label: 'Updated layout' },
  { id: 'designer-feedback',  label: 'Designer feedback' },
  { id: 'platform-feedback',  label: 'Platform feedback' },
  { id: 'handoff',            label: 'Handoff' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getNodeState = (nodeId: string, projectStatus: string | null): NodeState => {
  if (!projectStatus) return 'pending';
  const pipelineIdx = PIPELINE.indexOf(projectStatus as PipelineStage);
  const nodeIdx = PIPELINE.indexOf(nodeId as PipelineStage);
  if (nodeIdx < 0) return 'pending';
  if (pipelineIdx > nodeIdx) return 'completed';
  if (pipelineIdx === nodeIdx) return 'current';
  return 'pending';
};

// ─── Component ────────────────────────────────────────────────────────────────

const ProjectProgress: React.FC<ProjectProgressProps> = ({
  projectStatus = null,
  stageLabel,
  stageSub,
  statusPill,
  estHandoff,
  rightNow,
  upNext,
}) => {
  const totalNodes = STEPPER_NODES.length;
  const completedCount = STEPPER_NODES.filter(n => getNodeState(n.id, projectStatus) === 'completed').length;
  const progressPct = totalNodes > 1 ? (completedCount / (totalNodes - 1)) * 100 : 0;

  return (
    <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg sm:p-xl mb-lg">
      {/* Header row */}
      <div className="flex items-start justify-between mb-lg">
        <div>
          <p className="text-para-xs font-semibold text-text-tertiary uppercase tracking-widest mb-xs">
            {COPY.sectionLabel}
          </p>
          <h3 className="text-h5-sm font-bold text-text-primary">
            {stageLabel} <span className="text-para-md font-normal text-text-secondary">{stageSub}</span>
          </h3>
        </div>
        {estHandoff && (
          <div className="text-right flex-shrink-0">
            <p className="text-para-xs text-text-tertiary uppercase tracking-widest mb-xs">
              {COPY.estHandoffLabel}
            </p>
            <p className="text-para-md font-bold text-text-primary">{estHandoff}</p>
          </div>
        )}
      </div>

      {/* Stepper track */}
      <div className="relative mb-xl overflow-x-auto pb-xs">
        <div className="min-w-[560px]">
          {/* Track line */}
          <div className="absolute top-[19px] left-[calc(100%/16)] right-[calc(100%/16)] h-0.5 bg-border-default rounded-full" />
          {/* Progress fill */}
          <motion.div
            className="absolute top-[19px] left-[calc(100%/16)] h-0.5 bg-accent-default rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progressPct / 100 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            style={{ width: `calc(100% - 100%/8)` }}
          />

          {/* Nodes */}
          <div className="relative flex justify-between items-start">
            {STEPPER_NODES.map((node) => {
              const state = getNodeState(node.id, projectStatus);
              return (
                <div key={node.id} className="flex flex-col items-center gap-sm" style={{ width: `${100 / totalNodes}%` }}>
                  {/* Circle */}
                  <div className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 flex-shrink-0
                    ${state === 'completed' ? 'bg-accent-default border-accent-default' : ''}
                    ${state === 'current'   ? 'bg-background-primary border-accent-default' : ''}
                    ${state === 'pending'   ? 'bg-background-primary border-border-default' : ''}
                  `}>
                    {state === 'completed' && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {state === 'current' && (
                      <div className="w-3 h-3 rounded-full bg-accent-default" />
                    )}
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <p className={`text-para-xs font-medium leading-tight ${
                      state === 'current'   ? 'text-accent-default font-semibold' :
                      state === 'completed' ? 'text-text-secondary' :
                      'text-text-tertiary'
                    }`}>
                      {node.label}
                    </p>
                    {state === 'current' && statusPill && (
                      <span className="inline-block mt-xs px-xs py-px text-[10px] font-bold uppercase tracking-wider rounded bg-accent-subtle text-accent-default">
                        {statusPill}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right now / Up next */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg pt-lg border-t border-border-default">
        <div>
          <p className="text-para-xs font-semibold text-text-tertiary uppercase tracking-widest mb-xs">
            {COPY.rightNowLabel}
          </p>
          {rightNow
            ? <p className="text-para-sm text-text-secondary leading-relaxed">{rightNow}</p>
            : <div className="h-4 w-3/4 rounded bg-border-default animate-pulse" />
          }
        </div>
        <div>
          <p className="text-para-xs font-semibold text-text-tertiary uppercase tracking-widest mb-xs">
            {COPY.upNextLabel}
          </p>
          {upNext
            ? <p className="text-para-sm text-text-secondary leading-relaxed">{upNext}</p>
            : <div className="h-4 w-2/3 rounded bg-border-default animate-pulse" />
          }
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;