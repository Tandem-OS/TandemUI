// ─── Designer Dashboard Home ──────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  RiArrowRightLine,
  RiMoreLine,
  RiCheckLine,
  RiTimeLine,
  RiPriceTag3Line,
} from 'react-icons/ri';

import { getAllProjectsByDesignerEmail } from '@/lib/requests/ProjectRequest';
import { getDesignerStats } from '@/lib/requests/AnalyticsRequest';
import type { RootState } from '@/store';
import ErrorState from '@/common-components/ErrorState';
import { DashboardProjectRowSkeleton } from '../../components/skeletons';
import MagicLinkModal from '../../components/MagicLinkModal';

import {
  PIPELINE_ORDER,
  STATUS_TO_PROGRESS,
  STATUS_TO_STAGE,
  STATUS_TO_UI_STATUS,
  STATUS_LABEL,
  STAGE_LABEL,
  deriveStageStatus,
  type ApiStatus,
  type UiStatus,
  type ProjectStage,
} from '@/lib/config/projectStatus';

// ─── UI Copy ──────────────────────────────────────────────────────────────────

const COPY = {
  stat: {
    activeProjectsLabel: 'Active Projects',
    approvalLabel: 'Approval Quality',
    approvalRateLabel: 'Approval Rate',
    approvalSubtext: 'Approved on first or second review.',
    turnaroundLabel: 'Average Turnaround',
    turnaroundSubtext: 'Cycle from intake to handoff.',
    progressLabel: 'Project Progress',
    progressSubtextMulti: 'Aggregate progress across all in-flight work.',
    noDataYet: 'No data yet',
  },
  emptyHint: {
    activeProjects: 'Start one to begin tracking.',
    turnaround: 'Available after your first handoff.',
    approvalRate: 'Available after your first review.',
  },
  empty: {
    subtitle: "Welcome to Tandem. Let's get your first project moving — start with a website scrape or a fresh brief.",
    bannerBadge: 'Getting started',
    bannerHeading: "Let's launch your first project.",
    bannerBody: 'Tandem turns intake, scraping, swiper feedback, and review into one guided delivery flow.',
    ctaPrimary: '+ Start new project',
    ctaSecondary: 'Scrape existing site',
    howItWorks: [
      { n: '01', title: 'We learn your taste', body: 'Quick swiper rounds calibrate the style we design toward.' },
      { n: '02', title: 'We compose & refine', body: 'You see clean drafts; refine any section with one chat message.' },
      { n: '03', title: 'You approve & ship', body: 'Final assets and code, handed off to wherever you build.' },
    ],
  },
  active: {
    sectionSingle: 'Active project',
    sectionMulti: 'Active projects',
    viewAll: 'View all projects',
    newProject: '+ New project',
    exportReport: 'Export report',
  },
  activePill: { unit: 'active' },
  card: {
    nextLabel: 'Next',
    nextPending: 'Available soon',
    feedbackSuffix: 'feedback open',
    stageOf: 'of',
    stagePrefix: 'Stage',
    dayAvgSuffix: 'day avg',
    pages: 'pages',
    updatedPrefix: 'Updated',
  },
  filterTabs: {
    all: 'All',
    inProgress: 'In progress',
    needsYou: 'Needs you',
    handoff: 'Handoff',
  },
  trend: {
    good: 'Good',
    needsWork: 'Needs work',
  },
  panels: {
    waitingTitle: 'Waiting on you',
    waitingEmpty: 'Nothing waiting on you right now.',
    activityTitle: 'Recent activity',
    activityEmpty: 'No recent activity yet.',
    viewAll: 'View all',
  },
  overview: {
    title: 'Project overview',
    viewRecent: 'View recent projects',
    activeLabel: 'Active Projects',
    activeUnit: 'in flight',
    approvalLabel: 'Approval Rate',
    approvalUnit: 'last 6',
    avgTimeLabel: 'Avg Time to Handoff',
    avgTimeUnit: 'days',
  },
  actionLabel: {
    scraper: 'Open scraper →',
    swiper: 'Open project →',
    testimonial: 'Open testimonials →',
    finalReview: 'Review draft →',
  } as Record<ProjectStage, string>,
  statusBadge: {
    'in-progress': 'In progress',
    'reviewing': 'Needs your review',
    'final-review': 'Needs your review',
    'completed': 'Completed',
  } as Record<UiStatus, string>,
  subtitle: {
    singlePrefix: 'One project active.',
    singleReview: '— review the draft when ready',
    singleMoving: '— keep it moving',
    multiSuffix: 'projects in flight.',
    multiNone: 'None are waiting on your review right now.',
    waitingSingle: 'is waiting on your review.',
    waitingMulti: 'are waiting on your review.',
  },
  time: {
    justNow: 'just now',
    minsAgo: 'm ago',
    hrsAgo: 'h ago',
    daysAgo: 'd ago',
  },
  symbols: {
    dash: '—',
    trendUp: '↑',
    trendDown: '↓',
    zero: '0',
    percent: '%',
    itemPlural: 's',
    nowPill: 'NOW',
    unknownInitial: '?',
    dot: '·',
  },
  fallback: {
    guestName: 'there',
    stageSuffix: 'stage.',
    stageIs: 'is in',
    greetingPrefix: 'Good',
  },
};

// ─── Routes ───────────────────────────────────────────────────────────────────

const ROUTES = {
  myProjects: '/dashboard/designer/my-project',
  websiteScraper: '/dashboard/designer/website-scraper',
  testimonials: '/dashboard/designer/testimonials',
  projectOverview: (id: string) => `/dashboard/designer/my-project/project-overview/${id}`,
} as const;

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const BRAND = {
  purple: 'rgb(var(--accent-default))',
  purpleGlow: '0 0 0 2.5px rgb(var(--accent-default))',
  purpleAlpha12: 'rgba(var(--accent-default) / 0.12)',
  black: 'rgb(var(--background-dark))',
  cardBorderAlpha: 'rgba(0,0,0,0.08)',
  gradientActive: 'linear-gradient(180deg, rgb(var(--accent-default)) 26.44%, rgba(132,125,236,0.69) 100%)',
  gradientBanner: 'linear-gradient(135deg, rgb(var(--accent-default)) 0%, rgba(132,125,236,0.85) 100%)',
  bannerBadgeBg: 'rgba(255,255,255,0.15)',
  dotBrand: 'rgb(var(--accent-default))',
  dotAccent: 'rgb(var(--border-warning))',
  dotNeutral: '#94A3B8',
  zeroWidth: '0%',
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = 'all' | 'in-progress' | 'reviewing' | 'completed';

interface ApiProject {
  id: string;
  project_name: string;
  status: string;
  client_email: string;
  last_updated: string;
  page_count?: number;
  project_type?: string;
  next_action?: string;
  feedback_count?: number;
}

interface UiProject {
  id: string;
  name: string;
  initial: string;
  status: UiStatus;
  statusLabel: string;
  actionLabel: string;
  progress: number;
  currentStage: ProjectStage;
  apiStatus: ApiStatus;
  lastUpdated: string;
  feedbackCount: number;
  nextAction: string | null;
  pageCount: number | null;
  projectType: string | null;
}

interface DesignerStats {
  approval_rate: number;
  avg_days: number;
  project_progression: number;
  total_projects: number;
}

interface WaitingItem {
  id: string;
  projectName: string;
  action: string;
  ctaLabel: string;
  projectId: string;
  stage: ProjectStage;
}

interface ActivityItem {
  id: string;
  actor: string;
  description: string;
  timeAgo: string;
  dotColor: 'brand' | 'accent' | 'neutral';
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const normaliseProject = (p: ApiProject): UiProject => ({
  id: p.id,
  name: p.project_name,
  initial: (p.project_name?.[0] ?? COPY.symbols.unknownInitial).toUpperCase(),
  status: STATUS_TO_UI_STATUS[p.status as ApiStatus] ?? 'in-progress',
  statusLabel: STATUS_LABEL[p.status as ApiStatus] ?? p.status ?? 'Starting',
  actionLabel: deriveActionLabel(p.status as ApiStatus),
  progress: STATUS_TO_PROGRESS[p.status as ApiStatus] ?? 0,
  currentStage: STATUS_TO_STAGE[p.status as ApiStatus] ?? 'scraper',
  apiStatus: p.status as ApiStatus,
  lastUpdated: p.last_updated,
  feedbackCount: p.feedback_count ?? 0,
  nextAction: p.next_action ?? null,
  pageCount: p.page_count ?? null,
  projectType: p.project_type ?? null,
});

const deriveActionLabel = (apiStatus: ApiStatus): string => {
  const stage = STATUS_TO_STAGE[apiStatus] ?? 'scraper';
  return COPY.actionLabel[stage];
};

const deriveStatusBadgeLabel = (status: UiStatus): string =>
  COPY.statusBadge[status];

const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
};

const formatDateLine = (): string => {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const month = d.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  return `${weekday} · ${month} ${d.getDate()}, ${d.getFullYear()}`;
};

const relativeTime = (isoString: string): string => {
  if (!isoString) return '';
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return COPY.time.justNow;
  if (mins < 60) return `${mins}${COPY.time.minsAgo}`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}${COPY.time.hrsAgo}`;
  return `${Math.floor(hrs / 24)}${COPY.time.daysAgo}`;
};

const deriveSubtitle = (projects: UiProject[]): string => {
  if (projects.length === 0) return '';
  if (projects.length === 1) {
    const p = projects[0];
    // Guard against null status — falls back to 'starting' so .toLowerCase() never crashes
    const stageText = (STATUS_LABEL[p.apiStatus] ?? p.statusLabel ?? 'starting') as string;
    const hint =
      p.status === 'reviewing' || p.status === 'final-review'
        ? COPY.subtitle.singleReview
        : COPY.subtitle.singleMoving;
    return `${COPY.subtitle.singlePrefix} ${p.name} ${COPY.fallback.stageIs} ${stageText.toLowerCase()} ${hint}`;
  }
  const needsReview = projects.filter(
    (p) => p.status === 'reviewing' || p.status === 'final-review',
  );
  const reviewText =
    needsReview.length === 0
      ? COPY.subtitle.multiNone
      : needsReview.length === 1
        ? `${needsReview[0].name} ${COPY.subtitle.waitingSingle}`
        : `${needsReview.length} ${COPY.subtitle.waitingMulti}`;
  return `${projects.length} ${COPY.subtitle.multiSuffix} ${reviewText}`;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCardEmpty: React.FC<{ label: string; emptyHint: string; showZero?: boolean }> = ({
  label, emptyHint, showZero = false,
}) => (
  <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg flex flex-col gap-sm min-h-[148px] h-full">
    <span className="text-[10px] font-semibold tracking-[0.12em] text-text-secondary uppercase">{label}</span>
    <div className="flex items-baseline gap-[3px] leading-none">
      <span className="text-[3rem] font-bold leading-none tracking-tight text-border-default">
        {showZero ? COPY.symbols.zero : COPY.symbols.dash}
      </span>
    </div>
    <span className="text-para-xs text-text-secondary">{emptyHint}</span>
  </div>
);

interface StatCardActiveProps {
  label: string;
  value: string;
  unit?: string;
  subtext: string;
  badge: React.ReactNode;
  highlight?: boolean;
}

const StatCardActive: React.FC<StatCardActiveProps> = ({
  label, value, unit, subtext, badge, highlight = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-2xl border p-lg flex flex-col gap-sm min-h-[148px] h-full ${highlight ? 'border-transparent text-white' : 'bg-background-primary-2 border-border-default text-text-primary'}`}
    style={highlight ? { background: BRAND.gradientActive } : undefined}
  >
    <div className="flex items-center justify-between">
      <span className={`text-[10px] font-semibold tracking-[0.12em] uppercase ${highlight ? 'text-white/70' : 'text-text-secondary'}`}>
        {label}
      </span>
      {badge}
    </div>
    <div className={`flex items-baseline gap-[3px] leading-none ${highlight ? 'text-white' : 'text-text-primary'}`}>
      <span className="text-[3rem] font-bold leading-none tracking-tight">{value}</span>
      {unit && (
        <span className={`text-xl font-bold ${highlight ? 'text-white/80' : 'text-text-primary'}`}>{unit}</span>
      )}
    </div>
    <span className={`text-para-xs ${highlight ? 'text-white/70' : 'text-text-secondary'}`}>{subtext}</span>
  </motion.div>
);

const TrendBadge: React.FC<{ label: string; isPositive: boolean }> = ({ label, isPositive }) => (
  <span className={`inline-flex items-center gap-xs text-[11px] font-semibold px-sm py-xs rounded-full ${isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
    {isPositive ? COPY.symbols.trendUp : COPY.symbols.trendDown} {label}
  </span>
);

const ActivePill: React.FC<{ count: number }> = ({ count }) => (
  <span className="inline-flex items-center text-[11px] font-semibold px-sm py-xs rounded-full bg-white/20 text-white">
    {count} {COPY.activePill.unit}
  </span>
);

const StatusBadge: React.FC<{ status: UiStatus; label: string }> = ({ status, label }) => {
  const styles: Record<UiStatus, string> = {
    'in-progress': 'bg-background-secondary-2 text-text-secondary',
    'reviewing': 'bg-amber-50 text-amber-700',
    'final-review': 'bg-amber-50 text-amber-700',
    'completed': 'bg-emerald-50 text-emerald-700',
  };
  return (
    <span className={`inline-flex items-center px-md py-xs rounded-full text-para-xs font-medium whitespace-nowrap ${styles[status]}`}>
      {label}
    </span>
  );
};

// ─── Filter tabs ──────────────────────────────────────────────────────────────

interface FilterTabsProps {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
  counts: Record<FilterTab, number>;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ active, onChange, counts }) => {
  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: COPY.filterTabs.all },
    { key: 'in-progress', label: COPY.filterTabs.inProgress },
    { key: 'reviewing', label: COPY.filterTabs.needsYou },
    { key: 'completed', label: COPY.filterTabs.handoff },
  ];
  return (
    <div className="flex items-center gap-xs">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-md py-xs rounded-full text-para-xs font-medium transition-colors ${active === key
            ? 'bg-background-dark text-white'
            : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary-2'}`}
        >
          {label}
          {key !== 'all' && counts[key] > 0 && (
            <span className="ml-xs opacity-70">{counts[key]}</span>
          )}
        </button>
      ))}
    </div>
  );
};

// ─── Timeline stepper ─────────────────────────────────────────────────────────

const ProjectTimeline: React.FC<{ apiStatus: ApiStatus }> = ({ apiStatus }) => {
  const currentIdx = PIPELINE_ORDER.indexOf(apiStatus);
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between w-full h-[20px]">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-border-default rounded-full" />
        <motion.div
          className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 rounded-full"
          style={{ background: BRAND.purple }}
          initial={{ width: 0 }}
          animate={{
            width: currentIdx <= 0 ? BRAND.zeroWidth : `${(currentIdx / (PIPELINE_ORDER.length - 1)) * 100}%`,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {PIPELINE_ORDER.map((stage) => {
          const dotStatus = deriveStageStatus(stage, apiStatus);
          return (
            <div key={stage} className="relative z-10 flex items-center justify-center">
              {dotStatus === 'completed' && (
                <div className="w-[10px] h-[10px] rounded-full" style={{ background: BRAND.purple }} />
              )}
              {dotStatus === 'current' && (
                <div
                  className="w-[16px] h-[16px] rounded-full border-[2.5px] border-white flex items-center justify-center"
                  style={{ background: BRAND.purple, boxShadow: BRAND.purpleGlow }}
                />
              )}
              {dotStatus === 'pending' && (
                <div className="w-[10px] h-[10px] rounded-full border-2 border-border-default bg-background-primary-2" />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-start justify-between w-full mt-xs">
        {PIPELINE_ORDER.map((stage, idx) => {
          const isCurrent = idx === currentIdx;
          return (
            <div key={stage} className="flex flex-col items-center gap-[3px] min-w-0">
              <span
                className={`text-[9px] font-medium leading-tight truncate max-w-[60px] text-center ${isCurrent ? 'font-bold' : 'text-text-secondary'}`}
                style={isCurrent ? { color: BRAND.purple } : undefined}
              >
                {STAGE_LABEL[stage]}
              </span>
              {isCurrent && (
                <span
                  className="text-[8px] font-bold px-[5px] py-[1px] rounded-full text-white leading-none"
                  style={{ background: BRAND.purple }}
                >
                  {COPY.symbols.nowPill}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Project card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: UiProject;
  onOpen: (project: UiProject) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen }) => {
  const subtitleParts: string[] = [];
  if (project.projectType) subtitleParts.push(project.projectType);
  if (project.pageCount) subtitleParts.push(`${project.pageCount} ${COPY.card.pages}`);
  subtitleParts.push(`${COPY.card.updatedPrefix} ${relativeTime(project.lastUpdated)}`);
  const subtitle = subtitleParts.join(` ${COPY.symbols.dot} `);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-primary-2 rounded-2xl border border-border-default p-lg flex flex-col gap-lg overflow-hidden"
      style={{ borderColor: BRAND.cardBorderAlpha }}
    >
      {/* Header row — flex-wrap ensures action buttons don't overflow narrow columns */}
      <div className="flex items-start justify-between gap-md flex-wrap">
        <div className="flex items-center gap-md min-w-0 flex-1">
          <div
            className="w-[40px] h-[40px] rounded-xl flex items-center justify-center flex-shrink-0 text-para-sm font-bold"
            style={{ background: BRAND.purpleAlpha12, color: BRAND.purple }}
          >
            {project.initial}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-text-primary text-para-lg truncate">{project.name}</h3>
            <p className="text-para-xs text-text-secondary mt-[2px]">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-sm flex-shrink-0 flex-wrap">
          <StatusBadge status={project.status} label={deriveStatusBadgeLabel(project.status)} />
          <motion.button
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-xs px-md py-sm rounded-full text-para-xs font-semibold text-white whitespace-nowrap"
            style={{ background: BRAND.black }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {project.actionLabel}
          </motion.button>
          <button className="w-[32px] h-[32px] rounded-full border border-border-default flex items-center justify-center text-text-secondary hover:bg-background-secondary-2 transition-colors">
            <RiMoreLine className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ProjectTimeline apiStatus={project.apiStatus} />

      <div className="flex items-center justify-between text-para-xs text-text-secondary pt-sm border-t border-border-default">
        <div className="flex items-center gap-sm">
          <span className="font-bold text-text-secondary uppercase tracking-[0.1em] text-[10px]">
            {COPY.card.nextLabel}
          </span>
          <span className="text-text-secondary">
            {project.nextAction ?? COPY.card.nextPending}
          </span>
        </div>
        <div className="flex items-center gap-lg">
          <span>{project.feedbackCount} {COPY.card.feedbackSuffix}</span>
          <span>{COPY.card.stagePrefix} {PIPELINE_ORDER.indexOf(project.apiStatus) + 1} {COPY.card.stageOf} {PIPELINE_ORDER.length}</span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Waiting on you panel ─────────────────────────────────────────────────────

interface WaitingPanelProps {
  items: WaitingItem[];
  onAction: (item: WaitingItem) => void;
}

const WaitingOnYouPanel: React.FC<WaitingPanelProps> = ({ items, onAction }) => (
  <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg flex flex-col gap-md">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-sm">
        <span className="w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ background: BRAND.purple }} />
        <h4 className="font-semibold text-text-primary text-para-sm">{COPY.panels.waitingTitle}</h4>
      </div>
      {items.length > 0 && (
        <span className="text-para-xs text-text-secondary">
          {items.length} item{items.length !== 1 ? COPY.symbols.itemPlural : ''}
        </span>
      )}
    </div>
    {items.length === 0 ? (
      <p className="text-para-xs text-text-secondary italic">{COPY.panels.waitingEmpty}</p>
    ) : (
      <div className="flex flex-col gap-sm">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-md">
            <div className="min-w-0">
              <p className="text-para-xs font-semibold text-text-primary truncate">{item.projectName}</p>
              <p className="text-para-xs text-text-secondary mt-[2px]">{item.action}</p>
            </div>
            <button
              onClick={() => onAction(item)}
              className="flex-shrink-0 px-md py-xs rounded-full border border-border-default text-para-xs font-medium text-text-primary hover:bg-background-secondary-2 transition-colors whitespace-nowrap"
            >
              {item.ctaLabel}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ─── Recent activity panel ────────────────────────────────────────────────────

interface ActivityPanelProps {
  items: ActivityItem[];
  onViewAll?: () => void;
}

const DOT_COLOR_MAP: Record<ActivityItem['dotColor'], string> = {
  brand: BRAND.dotBrand,
  accent: BRAND.dotAccent,
  neutral: BRAND.dotNeutral,
};

const RecentActivityPanel: React.FC<ActivityPanelProps> = ({ items, onViewAll }) => (
  <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg flex flex-col gap-md">
    <div className="flex items-center justify-between">
      <h4 className="font-semibold text-text-primary text-para-sm">{COPY.panels.activityTitle}</h4>
      {items.length > 0 && onViewAll && (
        <button
          onClick={onViewAll}
          className="text-para-xs text-text-secondary underline hover:text-text-primary transition-colors"
        >
          {COPY.panels.viewAll}
        </button>
      )}
    </div>
    {items.length === 0 ? (
      <p className="text-para-xs text-text-secondary italic">{COPY.panels.activityEmpty}</p>
    ) : (
      <div className="flex flex-col gap-md">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-sm">
            <span
              className="w-[8px] h-[8px] rounded-full mt-[4px] flex-shrink-0"
              style={{ background: DOT_COLOR_MAP[item.dotColor] }}
            />
            <div className="min-w-0">
              <p className="text-para-xs text-text-primary">
                <span className="font-semibold">{item.actor}</span>{' '}{item.description}
              </p>
              <p className="text-[11px] text-text-secondary mt-[2px]">{item.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ─── Project overview strip ───────────────────────────────────────────────────

interface ProjectOverviewStripProps {
  stats: DesignerStats;
  activeCount: number;
  onViewRecent: () => void;
}

const ProjectOverviewStrip: React.FC<ProjectOverviewStripProps> = ({
  stats, activeCount, onViewRecent,
}) => (
  <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg">
    <div className="flex items-center justify-between mb-md">
      <h3 className="font-semibold text-text-primary text-para-lg">{COPY.overview.title}</h3>
      <button
        onClick={onViewRecent}
        className="text-para-xs text-text-secondary underline hover:text-text-primary transition-colors flex items-center gap-xs"
      >
        {COPY.overview.viewRecent}
        <RiArrowRightLine className="w-3 h-3" />
      </button>
    </div>
    <div className="grid grid-cols-3 divide-x divide-border-default">
      <div className="flex items-center gap-md pr-lg">
        <div className="w-[36px] h-[36px] rounded-xl border border-border-default flex items-center justify-center text-text-secondary flex-shrink-0">
          <RiPriceTag3Line className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-text-secondary uppercase">{COPY.overview.activeLabel}</p>
          <p className="text-h4-sm font-bold text-text-primary leading-tight">
            {activeCount}
            <span className="text-para-xs font-normal text-text-secondary ml-xs">{COPY.overview.activeUnit}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-md px-lg">
        <div className="w-[36px] h-[36px] rounded-xl border border-border-default flex items-center justify-center text-text-secondary flex-shrink-0">
          <RiCheckLine className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-text-secondary uppercase">{COPY.overview.approvalLabel}</p>
          <p className="text-h4-sm font-bold text-text-primary leading-tight">
            {stats.approval_rate}{COPY.symbols.percent}
            <span className="text-para-xs font-normal text-text-secondary ml-xs">{COPY.overview.approvalUnit}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-md pl-lg">
        <div className="w-[36px] h-[36px] rounded-xl border border-border-default flex items-center justify-center text-text-secondary flex-shrink-0">
          <RiTimeLine className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-text-secondary uppercase">{COPY.overview.avgTimeLabel}</p>
          <p className="text-h4-sm font-bold text-text-primary leading-tight">
            {stats.avg_days > 0 ? stats.avg_days : COPY.symbols.dash}
            {stats.avg_days > 0 && (
              <span className="text-para-xs font-normal text-text-secondary ml-xs">{COPY.overview.avgTimeUnit}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

function DashboardHome() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<UiProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [stats, setStats] = useState<DesignerStats>({
    approval_rate: 0,
    avg_days: 0,
    project_progression: 0,
    total_projects: 0,
  });

  const email = useSelector((state: RootState) => state.auth.user.email);
  const firstName = useSelector(
    (state: RootState) => state.auth.user?.name?.split(' ')[0] ?? COPY.fallback.guestName,
  );

  const waitingItems: WaitingItem[] = [];
  const activityItems: ActivityItem[] = [];

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const result = await getAllProjectsByDesignerEmail();
      const payload = result.data?.data ?? result.data;
      if (result.status === 200 && Array.isArray(payload)) {
        setProjects(payload.map((p: ApiProject) => normaliseProject(p)));
      }
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setProjects([]);
      } else {
        setFetchError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  useEffect(() => {
    if (!email) return;
    getDesignerStats(email)
      .then((res) => setStats(res.data))
      .catch(() => { });
  }, [email]);

  const greeting = `${COPY.fallback.greetingPrefix} ${getTimeOfDay()}, ${firstName}.`;
  const dateLine = formatDateLine();
  const subtitle = deriveSubtitle(projects);

  const filterCounts: Record<FilterTab, number> = {
    all: projects.length,
    'in-progress': projects.filter(p => p.status === 'in-progress').length,
    reviewing: projects.filter(p => p.status === 'reviewing' || p.status === 'final-review').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : activeFilter === 'reviewing'
      ? projects.filter(p => p.status === 'reviewing' || p.status === 'final-review')
      : projects.filter(p => p.status === activeFilter);

  const handleOpenProject = (project: UiProject) => {
    const stageRouteMap: Record<ProjectStage, string> = {
      scraper: ROUTES.websiteScraper,
      swiper: ROUTES.projectOverview(project.id),
      testimonial: ROUTES.testimonials,
      finalReview: ROUTES.projectOverview(project.id),
    };
    navigate(stageRouteMap[project.currentStage]);
  };

  const handleWaitingAction = (item: WaitingItem) => {
    const stageRouteMap: Record<ProjectStage, string> = {
      scraper: ROUTES.websiteScraper,
      swiper: ROUTES.projectOverview(item.projectId),
      testimonial: ROUTES.testimonials,
      finalReview: ROUTES.projectOverview(item.projectId),
    };
    navigate(stageRouteMap[item.stage]);
  };

  const approvalIsGood = stats.approval_rate >= 70;
  const avgDaysIsGood = stats.avg_days > 0 && stats.avg_days <= 7;
  const avgDaysLabel = stats.avg_days > 0 ? `${stats.avg_days} ${COPY.card.dayAvgSuffix}` : COPY.stat.noDataYet;

  // ── Shared header — + New project always opens modal on all states ──────────
  const Header = (showNewProject: boolean, showExportReport = false) => (
    <div className="flex items-start justify-between gap-lg mb-xl">
      <div>
        <p className="text-[11px] font-medium tracking-[0.12em] text-text-secondary mb-xs">{dateLine}</p>
        <h1 className="text-[2.75rem] font-bold text-text-primary leading-[1.1] tracking-tight">{greeting}</h1>
        {subtitle && (
          <p className="text-para-sm text-text-secondary mt-xs max-w-[580px]">{subtitle}</p>
        )}
      </div>
      {showNewProject && (
        <div className="flex items-center gap-sm flex-shrink-0 pt-xs">
          {showExportReport && (
            <motion.button
              className="inline-flex items-center gap-xs px-lg py-sm rounded-full text-para-sm font-semibold text-text-primary border border-border-default hover:bg-background-secondary-2 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {COPY.active.exportReport}
            </motion.button>
          )}
          {/* + New project — opens MagicLinkModal on all three states */}
          <motion.button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-xs px-lg py-sm rounded-full text-para-sm font-semibold text-white"
            style={{ background: BRAND.black }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {COPY.active.newProject}
          </motion.button>
        </div>
      )}
    </div>
  );

  // ── Shared stat cards ───────────────────────────────────────────────────────
  const StatCards = (isEmpty: boolean) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg mb-xl" style={{ gridAutoRows: '1fr' }}>
      {isEmpty ? (
        <>
          <StatCardEmpty label={COPY.stat.activeProjectsLabel} emptyHint={COPY.emptyHint.activeProjects} showZero />
          <StatCardEmpty label={COPY.stat.turnaroundLabel} emptyHint={COPY.emptyHint.turnaround} />
          <StatCardEmpty label={COPY.stat.approvalRateLabel} emptyHint={COPY.emptyHint.approvalRate} />
        </>
      ) : (
        <>
          <StatCardActive
            label={COPY.stat.approvalLabel}
            value={`${stats.approval_rate}`}
            unit={COPY.symbols.percent}
            subtext={COPY.stat.approvalSubtext}
            badge={<TrendBadge label={approvalIsGood ? COPY.trend.good : COPY.trend.needsWork} isPositive={approvalIsGood} />}
          />
          <StatCardActive
            label={COPY.stat.turnaroundLabel}
            value={stats.avg_days > 0 ? `${stats.avg_days}` : COPY.symbols.dash}
            unit={stats.avg_days > 0 ? COPY.overview.avgTimeUnit : undefined}
            subtext={COPY.stat.turnaroundSubtext}
            badge={
              stats.avg_days > 0
                ? <TrendBadge label={avgDaysLabel} isPositive={avgDaysIsGood} />
                : <span className="text-[11px] text-text-secondary">{COPY.stat.noDataYet}</span>
            }
          />
          <StatCardActive
            label={COPY.stat.progressLabel}
            value={`${stats.project_progression}`}
            unit={COPY.symbols.percent}
            subtext={
              projects.length === 1
                ? `${projects[0].name} — ${STATUS_LABEL[projects[0].apiStatus]?.toLowerCase() ?? ''} ${COPY.fallback.stageSuffix}`
                : COPY.stat.progressSubtextMulti
            }
            badge={<ActivePill count={projects.length} />}
            highlight
          />
        </>
      )}
    </div>
  );

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="mb-xl">
          <p className="text-[11px] font-medium tracking-[0.12em] text-text-secondary mb-xs">{dateLine}</p>
          <h1 className="text-[2.75rem] font-bold text-text-primary leading-[1.1] tracking-tight">{greeting}</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg mb-xl">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-background-primary-2 rounded-2xl border border-border-default p-lg min-h-[148px] animate-pulse" />
          ))}
        </div>
        <div className="flex flex-col gap-md">
          {[0, 1, 2].map((i) => <DashboardProjectRowSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="min-h-screen">
        {Header(false)}
        <ErrorState
          variant="projects_failed"
          onAction={() => { setFetchError(false); fetchProjects(); }}
        />
      </div>
    );
  }

  // ── STATE 1: Empty / Welcome ────────────────────────────────────────────────
  if (projects.length === 0) {
    return (
      <>
        <AnimatePresence mode="wait">
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
            <div className="flex items-start justify-between gap-lg mb-xl">
              <div>
                <p className="text-[11px] font-medium tracking-[0.12em] text-text-secondary mb-xs">{dateLine}</p>
                <h1 className="text-[2.75rem] font-bold text-text-primary leading-[1.1] tracking-tight">{greeting}</h1>
                <p className="text-para-sm text-text-secondary mt-xs max-w-[540px]">{COPY.empty.subtitle}</p>
              </div>
            </div>

            {StatCards(true)}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-xl mb-xl relative overflow-hidden"
              style={{ background: BRAND.gradientBanner }}
            >
              <span
                className="inline-flex items-center px-md py-xs rounded-full text-[10px] font-bold tracking-widest text-white uppercase mb-md"
                style={{ background: BRAND.bannerBadgeBg }}
              >
                {COPY.empty.bannerBadge}
              </span>
              <h2 className="text-h4-sm font-bold text-white mb-sm max-w-[480px]">{COPY.empty.bannerHeading}</h2>
              <p className="text-para-sm text-white/80 mb-lg max-w-[440px]">{COPY.empty.bannerBody}</p>
              <div className="flex items-center gap-md">
                <motion.button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-xs px-lg py-sm rounded-full text-para-sm font-semibold bg-white text-text-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {COPY.empty.ctaPrimary}
                </motion.button>
                <motion.button
                  onClick={() => navigate(ROUTES.websiteScraper)}
                  className="inline-flex items-center gap-xs px-lg py-sm rounded-full text-para-sm font-semibold text-white border border-white/40 hover:border-white/70 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {COPY.empty.ctaSecondary}
                </motion.button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg">
              {COPY.empty.howItWorks.map(({ n, title, body }, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="bg-background-primary-2 rounded-2xl border border-border-default p-lg"
                >
                  <p className="text-[11px] font-bold tracking-widest mb-sm" style={{ color: BRAND.purple }}>{n}</p>
                  <h4 className="font-semibold text-text-primary text-para-lg mb-xs">{title}</h4>
                  <p className="text-para-sm text-text-secondary">{body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Modal lives outside AnimatePresence so it renders on top cleanly */}
        <MagicLinkModal isOpen={modalOpen} setIsOpen={setModalOpen} />
      </>
    );
  }

  // ── STATE 2: Single project ─────────────────────────────────────────────────
  if (projects.length === 1) {
    const project = projects[0];
    return (
      <>
        <AnimatePresence mode="wait">
          <motion.div key="single" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
            {Header(true)}
            {StatCards(false)}

            <div className="mb-xl">
              <div className="flex items-center gap-sm mb-md">
                <h2 className="font-bold text-text-primary text-para-lg">{COPY.active.sectionSingle}</h2>
                <span
                  className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full text-[11px] font-bold text-white"
                  style={{ background: BRAND.purple }}
                >
                  1
                </span>
              </div>
              <ProjectCard project={project} onOpen={handleOpenProject} />
            </div>

            <ProjectOverviewStrip stats={stats} activeCount={1} onViewRecent={() => navigate(ROUTES.myProjects)} />
          </motion.div>
        </AnimatePresence>

        <MagicLinkModal isOpen={modalOpen} setIsOpen={setModalOpen} />
      </>
    );
  }

  // ── STATE 3: Multi-project ──────────────────────────────────────────────────
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key="multi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
          {Header(true, true)}
          {StatCards(false)}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-lg mb-xl items-start">
            <div>
              <div className="flex items-center justify-between gap-sm mb-md">
                <div className="flex items-center gap-sm">
                  <h2 className="font-bold text-text-primary text-para-lg">{COPY.active.sectionMulti}</h2>
                  <span
                    className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full text-[11px] font-bold text-white"
                    style={{ background: BRAND.purple }}
                  >
                    {projects.length}
                  </span>
                </div>
                <FilterTabs active={activeFilter} onChange={setActiveFilter} counts={filterCounts} />
              </div>

              <div className="flex flex-col gap-md">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <ProjectCard project={project} onOpen={handleOpenProject} />
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex justify-center mt-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => navigate(ROUTES.myProjects)}
                  className="inline-flex items-center gap-sm px-lg py-sm rounded-full border border-border-default text-para-sm font-medium text-text-primary hover:bg-background-secondary-2 transition-colors"
                >
                  {COPY.active.viewAll} ({stats.total_projects})
                  <RiArrowRightLine className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

            <div className="flex flex-col gap-lg">
              <WaitingOnYouPanel items={waitingItems} onAction={handleWaitingAction} />
              <RecentActivityPanel items={activityItems} onViewAll={() => navigate(ROUTES.myProjects)} />
            </div>
          </div>

          <ProjectOverviewStrip stats={stats} activeCount={projects.length} onViewRecent={() => navigate(ROUTES.myProjects)} />
        </motion.div>
      </AnimatePresence>

      <MagicLinkModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </>
  );
}

export default DashboardHome;