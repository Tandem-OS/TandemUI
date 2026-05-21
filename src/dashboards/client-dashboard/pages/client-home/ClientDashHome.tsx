import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import type { RootState } from '@/store';
import { getProjectByClientEmail } from '@/lib/requests/ProjectRequest';
import {
  setProjectId,
  setProjectStatus,
  clearProjectId,
  clearProjectStatus,
} from '@/features/project/projectSlice';
import BrowserMockup from './components/BroserMockup';

// ─── COPY ─────────────────────────────────────────────────────────────────────

const COPY = {
  nav: {
    myProject: 'My Project',
    swiper: 'Swiper',
    support: 'Support',
    swiperLocked: 'LOCKED',
  },
  states: {
    s01: {
      breadcrumb: (project: string, company: string) => `${project} · ${company}`,
      heading: "Let's get your project started.",
      body: 'Complete a short intake so your designer can understand your goals, brand, and direction. About 8 minutes — you can save and come back.',
      primaryCta: 'Start intake',
      secondaryCta: 'Message designer',
      previewPlaceholder: 'Your live preview will appear here.',
      previewSub: "Once your designer starts composing, you'll see your site come together in real time.",
      step1Label: 'We learn your taste',
      step1Body: 'A few swiper rounds calibrate the style we design toward.',
      step2Label: 'We compose your site',
      step2Body: 'Tandem builds your first layout from your taste signals and brief.',
      step3Label: 'You approve & ship',
      step3Body: 'Refine, sign off, and we hand off the final assets and code.',
      designerCard: (name: string) => `Your designer is ${name}.`,
      designerSub: (name: string) => `${name} will guide your project end-to-end. Question about intake or scope?`,
      messageCta: (name: string) => `Message ${name}`,
    },
    s02: {
      heading: 'Your project is moving.',
      body: "Tandem is capturing your existing site to learn the basics. Once that finishes, you'll do a short preferences round — that unlocks generation.",
      primaryCta: 'View intake',
      stageLabel: 'Capturing your site',
      stageStatus: 'WORKING',
      rightNow: 'Tandem is analyzing acmecoffee.com — extracting sections, assets, and visual signals. No action needed from you.',
      upNext: "Preferences round — you'll swipe through hero, nav, features, and pricing variants. About 6 minutes.",
    },
    s03: {
      heading: 'One more preferences round is needed.',
      body: "You're 80% through capture. One short swipe round helps Tandem generate a sharper first layout.",
      primaryCta: 'Continue swiper',
      secondaryCta: 'Skip for now',
      stageLabel: 'Preferences — your turn',
      stageStatus: 'YOUR TURN',
      rightNow: 'You\'ve completed 2 of 3 swiper rounds. One more round (~5 minutes) gives Tandem a sharper read on your taste.',
      upNext: 'Tandem composes your first layout. Usually 18–24 hours from when you finish.',
    },
    s04: {
      heading: 'Your designer is composing your first layout.',
      body: 'Your first draft will land here after your intake, site scrape, and preferences are reviewed. Usually within 24 hours.',
      primaryCta: 'Review draft',
      secondaryCta: 'Message Maya',
      stageLabel: 'Layout — Tandem is composing',
      stageStatus: 'IN PROGRESS',
      rightNow: 'Maya is using your swiper picks and capture data to assemble the hero, features, and menu sections.',
      upNext: "You'll review the first draft and request changes by chatting with Maya, section by section.",
    },
    s05: {
      heading: 'Your first draft is ready to review.',
      body: 'Maya just pushed v1 of your homepage. Take a look — approve sections you love, or leave a note on anything you\'d like changed.',
      primaryCta: 'Review draft',
      secondaryCta: 'Message Maya',
      stageLabel: 'Designer review — your turn',
      stageStatus: 'YOUR TURN',
      rightNow: 'Walk through the live preview. Hover any section to approve or request a change in plain English.',
      upNext: 'Maya refines based on your notes. Usually one round; two if anything is rebuilt from scratch.',
    },
    s06: {
      heading: 'Your project is delivered.',
      body: 'Final assets, source code, and preview are ready. Pick up wherever your team builds next.',
      primaryCta: 'View final handoff',
      secondaryCta: 'Share testimonial',
      deliveredBadge: 'DELIVERED',
      stageLabel: 'Project complete',
      stageSub: '7/7 stages complete',
      rightNow: 'All seven stages closed out. Your final composition is live and your assets are downloadable below.',
      upNext: 'Mind sharing a testimonial? It helps us match the right designer for the next person like you.',
      projectLog: 'Project log',
      projectLogSub: 'Everything that happened',
    },
  },
  checklist: {
    title: 'Project checklist',
    sub: "What's done, what's coming",
    items: [
      { id: 'intake', label: 'Intake submitted' },
      { id: 'scraping', label: 'Site capture' },
      { id: 'swiping', label: 'Preferences complete' },
      { id: 'composing', label: 'First layout generated' },
      { id: 'refining', label: 'Designer review complete' },
      { id: 'revisions', label: 'Feedback applied' },
      { id: 'handoff', label: 'Final handoff ready' },
    ],
  },
  quickActions: {
    title: 'Quick actions',
    sub: 'Available actions for this stage.',
  },
  designer: {
    label: 'Your designer is',
    sub: (name: string) => `Need anything from the team? Drop a message — we usually reply within 4 hours.`,
    messageCta: (name: string) => `Message ${name}`,
  },
  preview: {
    statusPills: {
      coming: '● Preview coming soon',
      waiting: '● Waiting on preferences',
      composing: '● Composing',
      draftReady: '● Draft ready',
      delivered: '● Delivered',
    },
    openLabel: '↗ Open',
  },
} as const;

// ─── BRAND ────────────────────────────────────────────────────────────────────

const BRAND = {
  accent: 'rgb(var(--accent-default))',
  accentHover: 'rgb(var(--accent-hover))',
  accentFg: 'rgb(var(--accent-foreground))',
  accentSubtle: 'rgb(var(--accent-subtle))',
  textPrimary: 'rgb(var(--text-primary))',
  textSecondary: 'rgb(var(--text-secondary))',
  textTertiary: 'rgb(var(--text-tertiary))',
  bgPrimary: 'rgb(var(--background-primary))',
  bgPrimary2: 'rgb(var(--background-primary-2))',
  bgSecondary: 'rgb(var(--background-secondary))',
  bgMuted: 'rgb(var(--background-muted))',
  borderDefault: 'rgb(var(--border-default))',
  borderMuted: 'rgb(var(--border-muted))',
  success: 'rgb(var(--text-success))',
  bgSuccess: 'rgb(var(--background-success))',
  error: 'rgb(var(--text-error))',
} as const;

// ─── ROUTES ───────────────────────────────────────────────────────────────────

const ROUTES = {
  intake: '/dashboard/client/intake',
  swiper: '/dashboard/client/swiper',
  compose: '/dashboard/client/compose',
  support: '/dashboard/client/support',
  onboard: '/dashboard/client/onboard',
  scraper: '/dashboard/client/scraper',
  testimonial: '/dashboard/client/final-testimonial',
} as const;

// ─── Pipeline config ──────────────────────────────────────────────────────────

const PIPELINE = ['intake', 'scraping', 'swiping', 'embedded', 'composing', 'refining', 'revisions', 'completed', 'handoff'] as const;
type PipelineStage = typeof PIPELINE[number];

const STAGE_LABELS: Record<string, string> = {
  intake: 'Intake',
  scraping: 'Site scrape',
  swiping: 'Preferences',
  embedded: 'Preferences',
  composing: 'Layout',
  refining: 'Designer review',
  revisions: 'Your feedback',
  completed: 'Your feedback',
  handoff: 'Handoff',
};

// Stepper nodes shown in the design (7 visible nodes)
const STEPPER_NODES = [
  { id: 'intake', label: 'Intake' },
  { id: 'scraping', label: 'Site scrape' },
  { id: 'swiping', label: 'Preferences' },
  { id: 'composing', label: 'Layout' },
  { id: 'refining', label: 'Designer review' },
  { id: 'revisions', label: 'Your feedback' },
  { id: 'handoff', label: 'Handoff' },
];

// Checklist items with meta per status
type ChecklistStatus = 'completed' | 'in-progress' | 'not-started' | 'ready';

interface ChecklistItem {
  id: string;
  label: string;
  status: ChecklistStatus;
  meta?: string;
  statusLabel?: string;
}

const getChecklistItems = (projectStatus: string | null): ChecklistItem[] => {
  const idx = projectStatus ? PIPELINE.indexOf(projectStatus as PipelineStage) : -1;

  const stageIdx = (s: string) => PIPELINE.indexOf(s as PipelineStage);
  const done = (s: string) => idx > stageIdx(s);
  const active = (s: string) => idx === stageIdx(s);

  return [
    {
      id: 'intake',
      label: 'Intake submitted',
      status: done('intake') || active('intake') ? 'completed' : 'not-started',
      statusLabel: done('intake') || active('intake') ? 'COMPLETED' : undefined,
    },
    {
      id: 'scraping',
      label: 'Site capture',
      status: done('scraping') ? 'completed' : active('scraping') ? 'in-progress' : 'not-started',
      statusLabel: done('scraping') ? 'COMPLETED' : active('scraping') ? 'IN PROGRESS' : 'NOT STARTED',
      meta: active('scraping') ? '~3 min remaining' : undefined,
    },
    {
      id: 'swiping',
      label: 'Preferences complete',
      status: done('swiping') || done('embedded') ? 'completed'
        : active('swiping') || active('embedded') ? 'ready'
          : 'not-started',
      statusLabel: done('swiping') || done('embedded') ? 'COMPLETED'
        : active('swiping') || active('embedded') ? 'READY FOR YOU'
          : 'NOT STARTED',
      meta: active('swiping') ? 'Round 3 of 3 · ~5 min' : done('swiping') ? '3 rounds · 240 swipes' : undefined,
    },
    {
      id: 'composing',
      label: 'First layout generated',
      status: done('composing') ? 'completed' : active('composing') ? 'in-progress' : 'not-started',
      statusLabel: done('composing') ? 'COMPLETED'
        : active('composing') ? 'WAITING ON DESIGNER'
          : 'NOT STARTED',
      meta: done('composing') ? 'v1 · 8 sections' : active('composing') ? 'Composing · 2h in' : undefined,
    },
    {
      id: 'refining',
      label: 'Designer review complete',
      status: done('refining') ? 'completed' : active('refining') ? 'ready' : 'not-started',
      statusLabel: done('refining') ? 'COMPLETED' : active('refining') ? 'READY FOR YOU' : 'NOT STARTED',
      meta: active('refining') ? 'Review v1 and leave notes' : done('refining') ? '1 refinement round' : undefined,
    },
    {
      id: 'revisions',
      label: 'Feedback applied',
      status: done('revisions') ? 'completed' : active('revisions') ? 'in-progress' : 'not-started',
      statusLabel: done('revisions') ? 'COMPLETED' : active('revisions') ? 'IN PROGRESS' : 'NOT STARTED',
      meta: done('revisions') ? 'Hero + menu copy updated' : undefined,
    },
    {
      id: 'handoff',
      label: 'Final handoff ready',
      status: done('handoff') || active('handoff') ? 'completed' : 'not-started',
      statusLabel: done('handoff') || active('handoff') ? 'COMPLETED' : 'NOT STARTED',
      meta: active('handoff') ? 'Delivered May 21' : undefined,
    },
  ];
};

// ─── Map project status → dashboard state (1–6) ───────────────────────────────

const getDashState = (status: string | null, hasProject: boolean): 1 | 2 | 3 | 4 | 5 | 6 => {
  if (!hasProject || !status) return 1;
  switch (status) {
    case 'intake':
    case 'scraping':
      return 2;
    case 'swiping':
    case 'embedded':
      return 3;
    case 'composing':
      return 4;
    case 'refining':
      return 5;
    case 'revisions':
    case 'completed':
    case 'handoff':
      return 6;
    default:
      return 1;
  }
};

// ─── Get stepper node state ────────────────────────────────────────────────────

type NodeState = 'completed' | 'current' | 'pending';

const getNodeState = (nodeId: string, projectStatus: string | null): NodeState => {
  if (!projectStatus) return 'pending';
  const pipelineIdx = PIPELINE.indexOf(projectStatus as PipelineStage);
  const nodeIdx = PIPELINE.indexOf(nodeId as PipelineStage);
  if (nodeIdx < 0) return 'pending';
  if (pipelineIdx > nodeIdx) return 'completed';
  if (pipelineIdx === nodeIdx) return 'current';
  return 'pending';
};

// ─── Get est. handoff date (mock — Syed to wire) ──────────────────────────────
const EST_HANDOFF = 'Fri, May 22';

// ─── Sub-components ───────────────────────────────────────────────────────────

// Breadcrumb pill
const BreadcrumbPill: React.FC<{ projectName: string; projectType: string; stageLabel?: string; timestamp?: string }> = ({
  projectName, projectType, stageLabel, timestamp,
}) => (
  <div className="flex items-center gap-sm flex-wrap mb-lg">
    <div className="flex items-center gap-xs px-sm py-xs rounded-full border border-border-default bg-background-primary-2 text-para-xs font-medium text-text-secondary uppercase tracking-wide">
      <span className="text-accent-default font-semibold">{projectName}</span>
      <span className="text-text-tertiary">·</span>
      <span className="text-accent-default font-semibold">{projectType}</span>
    </div>
    {stageLabel && (
      <span className="text-para-xs text-text-tertiary">{stageLabel}</span>
    )}
    {timestamp && (
      <span className="text-para-xs text-text-tertiary">· {timestamp}</span>
    )}
  </div>
);

// Horizontal stepper
const Stepper: React.FC<{ projectStatus: string | null; stageLabel: string; stageSub: string; statusPill: string; estHandoff?: string; rightNow: string; upNext: string }> = ({
  projectStatus, stageLabel, stageSub, statusPill, estHandoff, rightNow, upNext,
}) => {
  const totalNodes = STEPPER_NODES.length;
  const currentIdx = STEPPER_NODES.findIndex(n => getNodeState(n.id, projectStatus) === 'current');
  const completedCount = STEPPER_NODES.filter(n => getNodeState(n.id, projectStatus) === 'completed').length;
  const progressPct = totalNodes > 1 ? (completedCount / (totalNodes - 1)) * 100 : 0;

  return (
    <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg sm:p-xl mb-lg">
      {/* Header row */}
      <div className="flex items-start justify-between mb-lg">
        <div>
          <p className="text-para-xs font-semibold text-text-tertiary uppercase tracking-widest mb-xs">Project Progress</p>
          <h3 className="text-h5-sm font-bold text-text-primary">
            {stageLabel} <span className="text-para-md font-normal text-text-secondary">{stageSub}</span>
          </h3>
        </div>
        {estHandoff && (
          <div className="text-right flex-shrink-0">
            <p className="text-para-xs text-text-tertiary uppercase tracking-widest mb-xs">Est. Handoff</p>
            <p className="text-para-md font-bold text-text-primary">{estHandoff}</p>
          </div>
        )}
      </div>

      {/* Stepper track */}
      <div className="relative mb-xl overflow-x-auto pb-xs">
        <div className="min-w-[560px]">
          {/* Track line */}
          <div className="absolute top-[19px] left-[calc(100%/14)] right-[calc(100%/14)] h-0.5 bg-border-default rounded-full" />
          {/* Progress fill */}
          <motion.div
            className="absolute top-[19px] left-[calc(100%/14)] h-0.5 bg-accent-default rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progressPct / 100 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            style={{ width: `calc(100% - 100%/7)` }}
          />

          {/* Nodes */}
          <div className="relative flex justify-between items-start">
            {STEPPER_NODES.map((node, i) => {
              const state = getNodeState(node.id, projectStatus);
              return (
                <div key={node.id} className="flex flex-col items-center gap-sm" style={{ width: `${100 / totalNodes}%` }}>
                  {/* Circle */}
                  <div className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 flex-shrink-0
                    ${state === 'completed' ? 'bg-accent-default border-accent-default' : ''}
                    ${state === 'current' ? 'bg-background-primary border-accent-default' : ''}
                    ${state === 'pending' ? 'bg-background-primary border-border-default' : ''}
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
                    <p className={`text-para-xs font-medium leading-tight ${state === 'current' ? 'text-accent-default font-semibold' :
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
          <p className="text-para-xs font-semibold text-text-tertiary uppercase tracking-widest mb-xs">Right now</p>
          <p className="text-para-sm text-text-secondary leading-relaxed">{rightNow}</p>
        </div>
        <div>
          <p className="text-para-xs font-semibold text-text-tertiary uppercase tracking-widest mb-xs">Up next</p>
          <p className="text-para-sm text-text-secondary leading-relaxed">{upNext}</p>
        </div>
      </div>
    </div>
  );
};

// Preview + Checklist two-col
const PreviewAndChecklist: React.FC<{
  projectStatus: string | null;
  previewStatusPill: string;
  showOpen?: boolean;
  projectId?: string | null;
}> = ({ projectStatus, previewStatusPill, showOpen, projectId }) => {
  const items = getChecklistItems(projectStatus);
  const completedCount = items.filter(i => i.status === 'completed').length;
  const isDelivered = projectStatus === 'handoff' || projectStatus === 'completed';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">
      {/* Browser mockup */}
      <div className="lg:col-span-2 bg-background-primary-2 rounded-2xl border border-border-default overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center justify-between px-md py-sm border-b border-border-default bg-background-primary">
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-sm flex items-center gap-xs bg-background-muted rounded-md px-sm py-xs">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-text-tertiary flex-shrink-0">
                <rect x="1" y="1" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <span className="text-para-xs text-text-tertiary truncate max-w-[140px]">tandem.design/acme-coffee/preview</span>
            </div>
          </div>
          <div className="flex items-center gap-sm">
            <span className={`flex items-center gap-xs text-para-xs font-medium px-sm py-xs rounded-full ${isDelivered ? 'bg-bgSuccess text-success border border-success/20' :
                previewStatusPill.includes('coming') ? 'bg-background-muted text-text-tertiary' :
                  'bg-accent-subtle text-accent-default'
              }`}>
              {previewStatusPill}
            </span>
            {showOpen && (
              <button className="text-para-xs text-text-secondary hover:text-text-primary flex items-center gap-xs border border-border-default rounded px-sm py-xs transition-colors">
                ↗ Open
              </button>
            )}
          </div>
        </div>

        {/* Preview content */}
        <div className="h-[340px] sm:h-[380px] overflow-hidden">
          <BrowserMockup />
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg">
        <div className="flex items-start justify-between mb-md">
          <div>
            <p className="text-para-sm font-bold text-text-primary">
              {isDelivered ? COPY.states.s06.projectLog : COPY.checklist.title}
            </p>
            <p className="text-para-xs text-text-tertiary mt-xs">
              {isDelivered ? COPY.states.s06.projectLogSub : COPY.checklist.sub}
            </p>
          </div>
          <span className="text-para-xs text-text-tertiary font-medium">{completedCount}/7</span>
        </div>

        <div className="space-y-sm">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-sm">
              <div className="flex items-start gap-sm min-w-0">
                {/* Status indicator */}
                <div className="flex-shrink-0 mt-0.5">
                  {item.status === 'completed' && (
                    <div className="w-5 h-5 rounded-full bg-accent-default flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4.5 7.5L8.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  {item.status === 'in-progress' && (
                    <div className="w-5 h-5 rounded-full border-2 border-accent-default flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent-default" />
                    </div>
                  )}
                  {item.status === 'ready' && (
                    <div className="w-5 h-5 rounded-full border-2 border-accent-default flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent-default" />
                    </div>
                  )}
                  {item.status === 'not-started' && (
                    <div className="w-5 h-5 rounded-full border-2 border-border-default" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className={`text-para-xs font-medium leading-tight ${item.status === 'completed' ? 'text-text-primary' :
                      item.status === 'in-progress' || item.status === 'ready' ? 'text-text-primary font-semibold' :
                        'text-text-tertiary'
                    }`}>
                    {item.label}
                  </p>
                  {item.meta && (
                    <p className="text-[10px] text-text-tertiary mt-px leading-tight">{item.meta}</p>
                  )}
                </div>
              </div>
              {item.statusLabel && (
                <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wide ${item.statusLabel === 'COMPLETED' ? 'text-text-secondary' :
                    item.statusLabel === 'IN PROGRESS' ? 'text-accent-default' :
                      item.statusLabel === 'READY FOR YOU' ? 'text-accent-default' :
                        item.statusLabel === 'WAITING ON DESIGNER' ? 'text-text-secondary' :
                          'text-text-tertiary'
                  }`}>
                  {item.statusLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Quick action card
const QuickActionCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  sub: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ icon, label, sub, onClick, disabled }) => (
  <button
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    className={`flex items-center gap-md p-md rounded-xl border text-left transition-all duration-200 w-full ${disabled
        ? 'border-border-muted bg-background-muted opacity-50 cursor-not-allowed'
        : 'border-border-default bg-background-primary-2 hover:border-accent-default hover:shadow-sm cursor-pointer'
      }`}
  >
    <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${disabled ? 'bg-background-muted' : 'bg-accent-subtle'
      }`}>
      <span className={disabled ? 'text-text-tertiary' : 'text-accent-default'}>{icon}</span>
    </div>
    <div className="min-w-0">
      <p className="text-para-sm font-semibold text-text-primary leading-tight">{label}</p>
      <p className="text-para-xs text-text-tertiary mt-px leading-tight">{sub}</p>
    </div>
  </button>
);

// Designer card at bottom
const DesignerCard: React.FC<{ designerName: string }> = ({ designerName }) => (
  <div className="flex items-center justify-between gap-md p-lg rounded-2xl border border-border-default bg-background-primary-2 mt-lg">
    <div className="flex items-center gap-md">
      {/* Avatar stack */}
      <div className="flex -space-x-2">
        <div className="w-10 h-10 rounded-full bg-accent-default flex items-center justify-center text-white font-bold text-para-sm border-2 border-background-primary">
          {designerName.charAt(0).toUpperCase()}
        </div>
        <div className="w-10 h-10 rounded-full bg-background-muted flex items-center justify-center text-text-secondary font-bold text-para-sm border-2 border-background-primary">
          S
        </div>
      </div>
      <div>
        <p className="text-para-sm font-semibold text-text-primary">
          {COPY.designer.label} {designerName}.
        </p>
        <p className="text-para-xs text-text-secondary">{COPY.designer.sub(designerName)}</p>
      </div>
    </div>
    {/* Message button — not wired per Dylan's note */}
    <button className="flex-shrink-0 flex items-center gap-xs px-md py-sm rounded-xl border border-border-default bg-background-primary text-para-sm text-text-secondary hover:text-text-primary hover:border-border-default transition-colors">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
        <path d="M1 1h12v9H1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M4 13l3-3h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {COPY.designer.messageCta(designerName)}
    </button>
  </div>
);

// ─── State 01 — Invite opened / intake not started ────────────────────────────

const State01: React.FC<{ clientName: string; designerName: string; onStartIntake: () => void }> = ({
  clientName, designerName, onStartIntake,
}) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    {/* Breadcrumb */}
    <div className="flex items-center gap-xs mb-lg">
      <span className="px-sm py-xs rounded-full border border-border-default bg-background-primary-2 text-para-xs font-semibold text-accent-default uppercase tracking-wide">Tandem</span>
      <span className="text-text-tertiary text-para-xs">·</span>
      <span className="text-para-xs text-text-secondary font-medium">Acme Coffee Co.</span>
    </div>

    {/* Hero */}
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-lg mb-xl">
      <div className="flex-1">
        <h1 className="text-h2-sm sm:text-h1-sm font-bold text-text-primary mb-sm leading-tight">
          {COPY.states.s01.heading}
        </h1>
        <p className="text-para-md text-text-secondary leading-relaxed max-w-xl">
          {COPY.states.s01.body}
        </p>
      </div>
      <div className="flex items-center gap-sm flex-shrink-0">
        {/* Message designer — not wired per Dylan */}
        <button className="flex items-center gap-xs px-lg py-sm rounded-xl border border-border-default bg-background-primary text-para-sm text-text-secondary hover:text-text-primary transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1h12v9H1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M4 13l3-3h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {COPY.states.s01.secondaryCta}
        </button>
        <button
          onClick={onStartIntake}
          className="flex items-center gap-xs px-lg py-sm rounded-xl bg-accent-default text-accent-foreground text-para-sm font-semibold hover:bg-accent-hover transition-colors"
        >
          {COPY.states.s01.primaryCta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    {/* Preview placeholder */}
    <div className="bg-background-primary-2 rounded-2xl border border-dashed border-border-default p-xl mb-lg flex items-center gap-md">
      <div className="w-10 h-10 rounded-xl border border-border-default bg-background-muted flex items-center justify-center flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" className="text-text-tertiary" />
          <path d="M1 5h16" stroke="currentColor" strokeWidth="1.2" className="text-text-tertiary" />
        </svg>
      </div>
      <div>
        <p className="text-para-sm font-semibold text-text-primary">{COPY.states.s01.previewPlaceholder}</p>
        <p className="text-para-xs text-text-secondary mt-xs">{COPY.states.s01.previewSub}</p>
      </div>
    </div>

    {/* 3-step cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-md mb-lg">
      {[
        { num: '01', label: COPY.states.s01.step1Label, body: COPY.states.s01.step1Body },
        { num: '02', label: COPY.states.s01.step2Label, body: COPY.states.s01.step2Body },
        { num: '03', label: COPY.states.s01.step3Label, body: COPY.states.s01.step3Body },
      ].map((step) => (
        <div key={step.num} className="bg-background-primary-2 rounded-xl border border-border-default p-lg">
          <p className="text-para-xs font-bold text-accent-default mb-sm">{step.num}</p>
          <h3 className="text-para-md font-bold text-text-primary mb-xs">{step.label}</h3>
          <p className="text-para-sm text-text-secondary leading-relaxed">{step.body}</p>
        </div>
      ))}
    </div>

    {/* Designer card */}
    <div className="flex items-center justify-between gap-md p-lg rounded-2xl border border-border-default bg-background-primary-2">
      <div className="flex items-center gap-md">
        <div className="flex -space-x-2">
          <div className="w-10 h-10 rounded-full bg-accent-default flex items-center justify-center text-white font-bold text-para-sm border-2 border-background-primary">
            {designerName.charAt(0).toUpperCase()}
          </div>
          <div className="w-10 h-10 rounded-full bg-background-muted flex items-center justify-center text-text-secondary font-bold text-para-sm border-2 border-background-primary">
            S
          </div>
        </div>
        <div>
          <p className="text-para-sm font-semibold text-text-primary">{COPY.states.s01.designerCard(designerName)}</p>
          <p className="text-para-xs text-text-secondary">{COPY.states.s01.designerSub(designerName)}</p>
        </div>
      </div>
      {/* Not wired */}
      <button className="flex-shrink-0 flex items-center gap-xs px-md py-sm rounded-xl border border-border-default bg-background-primary text-para-sm text-text-secondary hover:text-text-primary transition-colors">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1h12v9H1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M4 13l3-3h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {COPY.states.s01.messageCta(designerName)}
      </button>
    </div>
  </motion.div>
);

// ─── State 02 — Kickoff / scrape running ──────────────────────────────────────

const State02: React.FC<{ projectStatus: string | null; projectId: string | null; designerName: string; onViewIntake: () => void }> = ({
  projectStatus, projectId, designerName, onViewIntake,
}) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <BreadcrumbPill projectName="Acme Coffee Co." projectType="Brand Site" stageLabel="Stage 2 of 7" timestamp="Updated 12m ago" />
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-lg mb-xl">
      <div className="flex-1">
        <h1 className="text-h2-sm sm:text-h1-sm font-bold text-text-primary mb-sm leading-tight">{COPY.states.s02.heading}</h1>
        <p className="text-para-md text-text-secondary leading-relaxed max-w-xl">{COPY.states.s02.body}</p>
      </div>
      <button onClick={onViewIntake} className="flex-shrink-0 flex items-center gap-xs px-lg py-sm rounded-xl bg-accent-default text-accent-foreground text-para-sm font-semibold hover:bg-accent-hover transition-colors">
        {COPY.states.s02.primaryCta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
    <Stepper
      projectStatus={projectStatus}
      stageLabel={COPY.states.s02.stageLabel}
      stageSub="Stage 2 of 7"
      statusPill={COPY.states.s02.stageStatus}
      estHandoff={EST_HANDOFF}
      rightNow={COPY.states.s02.rightNow}
      upNext={COPY.states.s02.upNext}
    />
    <PreviewAndChecklist projectStatus={projectStatus} previewStatusPill={COPY.preview.statusPills.coming} projectId={projectId} />
    {/* Quick actions */}
    <div className="mb-lg">
      <p className="text-para-md font-bold text-text-primary mb-xs">{COPY.quickActions.title}</p>
      <p className="text-para-xs text-text-secondary mb-md">{COPY.quickActions.sub}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2h12v12H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>} label="View intake" sub="2 free edits remaining" onClick={onViewIntake} />
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1h14v11H1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5 15l3-3h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="Message designer" sub={`${designerName} · replies in ~4h`} disabled />
      </div>
    </div>
    <DesignerCard designerName={designerName} />
  </motion.div>
);

// ─── State 03 — Waiting on you / preferences needed ───────────────────────────

const State03: React.FC<{ projectStatus: string | null; projectId: string | null; designerName: string; onContinueSwiper: () => void; onSkip: () => void; onViewIntake: () => void }> = ({
  projectStatus, projectId, designerName, onContinueSwiper, onSkip, onViewIntake,
}) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <BreadcrumbPill projectName="Acme Coffee Co." projectType="Brand Site" stageLabel="Stage 3 of 7" timestamp="Updated 1d ago" />
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-lg mb-xl">
      <div className="flex-1">
        <h1 className="text-h2-sm sm:text-h1-sm font-bold text-text-primary mb-sm leading-tight">{COPY.states.s03.heading}</h1>
        <p className="text-para-md text-text-secondary leading-relaxed max-w-xl">{COPY.states.s03.body}</p>
      </div>
      <div className="flex items-center gap-sm flex-shrink-0">
        <button onClick={onSkip} className="px-lg py-sm rounded-xl border border-border-default bg-background-primary text-para-sm text-text-secondary hover:text-text-primary transition-colors">
          {COPY.states.s03.secondaryCta}
        </button>
        <button onClick={onContinueSwiper} className="flex items-center gap-xs px-lg py-sm rounded-xl bg-accent-default text-accent-foreground text-para-sm font-semibold hover:bg-accent-hover transition-colors">
          {COPY.states.s03.primaryCta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
    <Stepper
      projectStatus={projectStatus}
      stageLabel={COPY.states.s03.stageLabel}
      stageSub="Stage 3 of 7"
      statusPill={COPY.states.s03.stageStatus}
      estHandoff="Mon, May 25"
      rightNow={COPY.states.s03.rightNow}
      upNext={COPY.states.s03.upNext}
    />
    <PreviewAndChecklist projectStatus={projectStatus} previewStatusPill={COPY.preview.statusPills.waiting} projectId={projectId} />
    <div className="mb-lg">
      <p className="text-para-md font-bold text-text-primary mb-xs">{COPY.quickActions.title}</p>
      <p className="text-para-xs text-text-secondary mb-md">{COPY.quickActions.sub}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>} label="Continue swiper" sub="Round 3 of 3" onClick={onContinueSwiper} />
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2h12v12H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>} label="View intake" sub="2 free edits remaining" onClick={onViewIntake} />
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1h14v11H1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5 15l3-3h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="Message designer" sub={`${designerName} · replies in ~4h`} disabled />
      </div>
    </div>
    <DesignerCard designerName={designerName} />
  </motion.div>
);

// ─── State 04 — Designer composing ────────────────────────────────────────────

const State04: React.FC<{ projectStatus: string | null; projectId: string | null; designerName: string; onViewIntake: () => void; onUpdatePreferences: () => void }> = ({
  projectStatus, projectId, designerName, onViewIntake, onUpdatePreferences,
}) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <BreadcrumbPill projectName="Acme Coffee Co." projectType="Brand Site" stageLabel="Stage 4 of 7" timestamp="Started 2h ago" />
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-lg mb-xl">
      <div className="flex-1">
        <h1 className="text-h2-sm sm:text-h1-sm font-bold text-text-primary mb-sm leading-tight">{COPY.states.s04.heading}</h1>
        <p className="text-para-md text-text-secondary leading-relaxed max-w-xl">{COPY.states.s04.body}</p>
      </div>
      <div className="flex items-center gap-sm flex-shrink-0">
        <button disabled className="flex items-center gap-xs px-lg py-sm rounded-xl border border-border-default bg-background-primary text-para-sm text-text-secondary opacity-50 cursor-not-allowed">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1h12v9H1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path d="M4 13l3-3h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {COPY.states.s04.secondaryCta}
        </button>
        <button disabled className="flex items-center gap-xs px-lg py-sm rounded-xl bg-accent-default text-accent-foreground text-para-sm font-semibold opacity-50 cursor-not-allowed">
          {COPY.states.s04.primaryCta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
    <Stepper
      projectStatus={projectStatus}
      stageLabel={COPY.states.s04.stageLabel}
      stageSub="Stage 4 of 7"
      statusPill={COPY.states.s04.stageStatus}
      estHandoff="Thu, May 21"
      rightNow={COPY.states.s04.rightNow}
      upNext={COPY.states.s04.upNext}
    />
    <PreviewAndChecklist projectStatus={projectStatus} previewStatusPill={COPY.preview.statusPills.composing} projectId={projectId} />
    <div className="mb-lg">
      <p className="text-para-md font-bold text-text-primary mb-xs">{COPY.quickActions.title}</p>
      <p className="text-para-xs text-text-secondary mb-md">{COPY.quickActions.sub}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2h12v12H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>} label="View intake" sub="2 free edits remaining" onClick={onViewIntake} />
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>} label="Update preferences" sub="Add more signal" onClick={onUpdatePreferences} />
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1h14v11H1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5 15l3-3h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="Message designer" sub={`${designerName} · replies in ~4h`} disabled />
      </div>
    </div>
    <DesignerCard designerName={designerName} />
  </motion.div>
);

// ─── State 05 — Draft ready / review ──────────────────────────────────────────

const State05: React.FC<{ projectStatus: string | null; projectId: string | null; designerName: string; onReviewDraft: () => void }> = ({
  projectStatus, projectId, designerName, onReviewDraft,
}) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <BreadcrumbPill projectName="Acme Coffee Co." projectType="Brand Site" stageLabel="Stage 5 of 7" timestamp="Pushed 4m ago" />
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-lg mb-xl">
      <div className="flex-1">
        <h1 className="text-h2-sm sm:text-h1-sm font-bold text-text-primary mb-sm leading-tight">{COPY.states.s05.heading}</h1>
        <p className="text-para-md text-text-secondary leading-relaxed max-w-xl">{COPY.states.s05.body}</p>
      </div>
      <div className="flex items-center gap-sm flex-shrink-0">
        <button disabled className="flex items-center gap-xs px-lg py-sm rounded-xl border border-border-default bg-background-primary text-para-sm text-text-secondary opacity-50 cursor-not-allowed">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1h12v9H1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path d="M4 13l3-3h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {COPY.states.s05.secondaryCta}
        </button>
        <button onClick={onReviewDraft} className="flex items-center gap-xs px-lg py-sm rounded-xl bg-accent-default text-accent-foreground text-para-sm font-semibold hover:bg-accent-hover transition-colors">
          {COPY.states.s05.primaryCta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
    <Stepper
      projectStatus={projectStatus}
      stageLabel={COPY.states.s05.stageLabel}
      stageSub="Stage 5 of 7"
      statusPill={COPY.states.s05.stageStatus}
      estHandoff="Thu, May 21"
      rightNow={COPY.states.s05.rightNow}
      upNext={COPY.states.s05.upNext}
    />
    <PreviewAndChecklist projectStatus={projectStatus} previewStatusPill={COPY.preview.statusPills.draftReady} showOpen projectId={projectId} />
    <div className="mb-lg">
      <p className="text-para-md font-bold text-text-primary mb-xs">{COPY.quickActions.title}</p>
      <p className="text-para-xs text-text-secondary mb-md">{COPY.quickActions.sub}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v10H3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M10 1v2M13 4h2M14 8v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>} label="Review draft" sub="v1 · 8 sections" onClick={onReviewDraft} />
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1h14v11H1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5 15l3-3h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="Leave feedback" sub="Per-section notes" disabled />
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1h14v11H1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5 15l3-3h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="Message designer" sub={`${designerName} · replies in ~4h`} disabled />
      </div>
    </div>
    <DesignerCard designerName={designerName} />
  </motion.div>
);

// ─── State 06 — Delivered / final handoff ─────────────────────────────────────

const State06: React.FC<{ projectStatus: string | null; projectId: string | null; designerName: string; onViewHandoff: () => void; onShareTestimonial: () => void }> = ({
  projectStatus, projectId, designerName, onViewHandoff, onShareTestimonial,
}) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    {/* Green delivered hero banner */}
    <div className="rounded-2xl bg-background-success border border-[rgb(var(--text-success)/0.2)] p-xl mb-lg">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-lg">
        <div>
          <div className="flex items-center gap-sm mb-sm">
            <span className="px-sm py-xs rounded-full bg-[rgb(var(--text-success)/0.15)] text-para-xs font-bold text-text-success uppercase tracking-wider">
              {COPY.states.s06.deliveredBadge}
            </span>
            <span className="text-para-xs text-text-success font-medium">· May 21</span>
          </div>
          <h1 className="text-h2-sm sm:text-h1-sm font-bold text-text-primary mb-sm leading-tight">{COPY.states.s06.heading}</h1>
          <p className="text-para-md text-text-secondary leading-relaxed max-w-xl">{COPY.states.s06.body}</p>
        </div>
        <div className="flex items-center gap-sm flex-shrink-0">
          <button onClick={onShareTestimonial} className="flex items-center gap-xs px-lg py-sm rounded-xl border border-[rgb(var(--text-success)/0.4)] bg-transparent text-para-sm text-text-success font-semibold hover:bg-[rgb(var(--text-success)/0.1)] transition-colors">
            {COPY.states.s06.secondaryCta}
          </button>
          <button onClick={onViewHandoff} className="flex items-center gap-xs px-lg py-sm rounded-xl bg-text-success text-white text-para-sm font-semibold hover:opacity-90 transition-opacity">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v9M3 7l4 4 4-4M1 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {COPY.states.s06.primaryCta}
          </button>
        </div>
      </div>
    </div>

    {/* Stepper — all complete */}
    <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg sm:p-xl mb-lg">
      <div className="mb-lg">
        <p className="text-para-xs font-semibold text-text-tertiary uppercase tracking-widest mb-xs">Project Progress</p>
        <h3 className="text-h5-sm font-bold text-text-primary">
          {COPY.states.s06.stageLabel} <span className="text-para-md font-normal text-text-secondary ml-sm">{COPY.states.s06.stageSub}</span>
        </h3>
      </div>

      <div className="relative overflow-x-auto pb-xs">
        <div className="min-w-[560px]">
          <div className="absolute top-[19px] left-[calc(100%/14)] right-[calc(100%/14)] h-0.5 bg-accent-default rounded-full" />
          <div className="relative flex justify-between items-start">
            {STEPPER_NODES.map((node) => (
              <div key={node.id} className="flex flex-col items-center gap-sm" style={{ width: `${100 / STEPPER_NODES.length}%` }}>
                <div className="w-10 h-10 rounded-full bg-accent-default border-2 border-accent-default flex items-center justify-center z-10">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-para-xs text-text-secondary font-medium text-center leading-tight">{node.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg pt-lg border-t border-border-default mt-lg">
        <div>
          <p className="text-para-xs font-semibold text-text-tertiary uppercase tracking-widest mb-xs">Right now</p>
          <p className="text-para-sm text-text-secondary leading-relaxed">{COPY.states.s06.rightNow}</p>
        </div>
        <div>
          <p className="text-para-xs font-semibold text-text-tertiary uppercase tracking-widest mb-xs">Up next</p>
          <p className="text-para-sm text-text-secondary leading-relaxed">{COPY.states.s06.upNext}</p>
        </div>
      </div>
    </div>

    {/* Preview + Project log */}
    <PreviewAndChecklist projectStatus={projectStatus} previewStatusPill={COPY.preview.statusPills.delivered} showOpen projectId={projectId} />

    {/* Quick actions */}
    <div className="mb-lg">
      <p className="text-para-md font-bold text-text-primary mb-xs">{COPY.quickActions.title}</p>
      <p className="text-para-xs text-text-secondary mb-md">{COPY.quickActions.sub}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v10H3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M10 1v2M13 4h2M14 8v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>} label="View final handoff" sub="Delivered May 21" onClick={onViewHandoff} />
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v10M4 7l4 5 4-5M1 15h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="Download assets" sub=".zip · 4.2 MB" onClick={() => { }} />
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l2 4 5 .5-3.5 3.5.8 5L8 12l-4.3 2.5.8-5L1 6l5-.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>} label="Share testimonial" sub="Help future clients" onClick={onShareTestimonial} />
        <QuickActionCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 1h14v11H1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5 15l3-3h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="Message designer" sub={`${designerName} · replies in ~4h`} disabled />
      </div>
    </div>

    <DesignerCard designerName={designerName} />
  </motion.div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const ClientDashHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectStatus = useSelector((state: RootState) => state.project.status);
  const projectId = useSelector((state: RootState) => state.project.projectId);
  const clientEmail = useSelector((state: RootState) => state.auth.user?.email) ?? '';
  const designerEmail = useSelector((state: RootState) => state.auth.user?.designerEmail) ?? '';

  // Derive designer first name from email (e.g. "maya@..." → "Maya")
  // Syed to replace with real name field when available on user object
  const designerName = designerEmail
    ? designerEmail.split('@')[0].charAt(0).toUpperCase() + designerEmail.split('@')[0].slice(1)
    : 'Maya';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchProject = async () => {
    dispatch(clearProjectStatus());
    dispatch(clearProjectId());
    try {
      const result = await getProjectByClientEmail({ client_email: clientEmail });
      if (result.status === 200 && result.data?.data?.id) {
        dispatch(setProjectId(result.data.data.id));
        dispatch(setProjectStatus(result.data.data.status ?? null));
      }
    } catch {
      // Fetch failed silently — dashboard shows state 01
    }
  };

  useEffect(() => {
    if (clientEmail) fetchProject();
  }, [clientEmail]);

  const hasProject = !!projectId;
  const dashState = getDashState(projectStatus, hasProject);

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="container mx-auto px-md sm:px-lg lg:px-xl py-lg sm:py-xl lg:py-2xl max-w-6xl">
        {dashState === 1 && (
          <State01
            clientName=""
            designerName={designerName}
            onStartIntake={() => navigate(ROUTES.onboard)}
          />
        )}
        {dashState === 2 && (
          <State02
            projectStatus={projectStatus}
            projectId={projectId}
            designerName={designerName}
            onViewIntake={() => navigate(ROUTES.intake)}
          />
        )}
        {dashState === 3 && (
          <State03
            projectStatus={projectStatus}
            projectId={projectId}
            designerName={designerName}
            onContinueSwiper={() => navigate(ROUTES.swiper)}
            onSkip={() => { }}
            onViewIntake={() => navigate(ROUTES.intake)}
          />
        )}
        {dashState === 4 && (
          <State04
            projectStatus={projectStatus}
            projectId={projectId}
            designerName={designerName}
            onViewIntake={() => navigate(ROUTES.intake)}
            onUpdatePreferences={() => navigate(ROUTES.swiper)}
          />
        )}
        {dashState === 5 && (
          <State05
            projectStatus={projectStatus}
            projectId={projectId}
            designerName={designerName}
            onReviewDraft={() => navigate(ROUTES.compose)}
          />
        )}
        {dashState === 6 && (
          <State06
            projectStatus={projectStatus}
            projectId={projectId}
            designerName={designerName}
            onViewHandoff={() => navigate(ROUTES.compose)}
            onShareTestimonial={() => navigate(ROUTES.testimonial)}
          />
        )}
      </div>
    </div>
  );
};

export default ClientDashHome;
