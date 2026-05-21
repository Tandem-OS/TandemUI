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
import ProjectProgress from './components/ProjectProgress';
import ProjectChecklist from './components/ProjectCheckList';
import DashHero from './components/DashHero';
import QuickActionCard from './components/QuickActionCard';

// ─── COPY ─────────────────────────────────────────────────────────────────────

const COPY = {
  nav: {
    myProject: 'My Project',
    swiper: 'Swiper',
    support: 'Support',
    swiperLocked: 'LOCKED',
  },
  states: {
    s00: {
      breadcrumb: (project: string, company: string) => `${project} · ${company}`,
      heading: "Let's get your project started.",
      body: 'Create your project to kick off the process. Your designer will be notified and you can start your intake right after.',
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
      breadcrumb: (project: string, company: string) => `${project} · ${company}`,
      heading: 'Time to capture your favourite sites.',
      body: 'Scrape a few sites that match the vibe you want. This helps Tandem understand your design direction before composing your layout.',
      primaryCta: 'Start scraping',
      secondaryCta: 'View intake',
      previewPlaceholder: 'Your live preview will appear here.',
      previewSub: "Once your designer starts composing, you'll see your site come together in real time.",
      step1Label: 'Capture inspiration',
      step1Body: 'Add URLs of sites whose design you love. Tandem extracts their visual signals.',
      step2Label: 'We analyse the signals',
      step2Body: 'Tandem reads layout, spacing, type, and colour patterns from your chosen sites.',
      step3Label: 'Your layout gets sharper',
      step3Body: 'The more you capture, the more precisely Tandem can compose your first draft.',
      stageLabel: 'Site scrape — your turn',
      stageStatus: 'YOUR TURN',
      rightNow: 'Add URLs of sites you love. Tandem will extract their design signals to inform your layout.',
      upNext: "Once you're done scraping, you'll move to the preferences round — about 5 minutes.",
      designerCard: (name: string) => `Your designer is ${name}.`,
      designerSub: (name: string) => `${name} will guide your project end-to-end. Question about intake or scope?`,
      messageCta: (name: string) => `Message ${name}`,
    },
    s03: {
      heading: 'Your project is moving.',
      body: "Tandem is capturing your existing site to learn the basics. Once that finishes, you'll do a short preferences round — that unlocks generation.",
      primaryCta: 'View intake',
      stageLabel: 'Capturing your site',
      stageStatus: 'WORKING',
      rightNow: 'Tandem is analyzing acmecoffee.com — extracting sections, assets, and visual signals. No action needed from you.',
      upNext: "Preferences round — you'll swipe through hero, nav, features, and pricing variants. About 6 minutes.",
    },
    s04: {
      heading: 'One more preferences round is needed.',
      body: "You're 80% through capture. One short swipe round helps Tandem generate a sharper first layout.",
      primaryCta: 'Continue swiper',
      secondaryCta: 'Skip for now',
      stageLabel: 'Preferences — your turn',
      stageStatus: 'YOUR TURN',
      rightNow: 'You\'ve completed 2 of 3 swiper rounds. One more round (~5 minutes) gives Tandem a sharper read on your taste.',
      upNext: 'Tandem composes your first layout. Usually 18–24 hours from when you finish.',
    },
    s05: {
      heading: 'Your designer is composing your first layout.',
      body: 'Your first draft will land here after your intake, site scrape, and preferences are reviewed. Usually within 24 hours.',
      primaryCta: 'Review draft',
      secondaryCta: 'Message Maya',
      stageLabel: 'Layout — Tandem is composing',
      stageStatus: 'IN PROGRESS',
      rightNow: 'Maya is using your swiper picks and capture data to assemble the hero, features, and menu sections.',
      upNext: "You'll review the first draft and request changes by chatting with Maya, section by section.",
    },
    s06: {
      heading: 'Your first draft is ready to review.',
      body: 'Maya just pushed v1 of your homepage. Take a look — approve sections you love, or leave a note on anything you\'d like changed.',
      primaryCta: 'Review draft',
      secondaryCta: 'Message Maya',
      stageLabel: 'Designer review — your turn',
      stageStatus: 'YOUR TURN',
      rightNow: 'Walk through the live preview. Hover any section to approve or request a change in plain English.',
      upNext: 'Maya refines based on your notes. Usually one round; two if anything is rebuilt from scratch.',
    },
    s07: {
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

const getChecklistItems = (projectStatus: string | null) => {
  const idx = projectStatus ? PIPELINE.indexOf(projectStatus as PipelineStage) : -1;
  const stageIdx = (s: string) => PIPELINE.indexOf(s as PipelineStage);
  const done = (s: string) => idx > stageIdx(s);
  const active = (s: string) => idx === stageIdx(s);

  return [
    {
      id: 'intake',
      label: 'Intake submitted',
      status: (done('intake') || active('intake') ? 'completed' : 'not-started') as 'completed' | 'not-started',
      statusLabel: done('intake') || active('intake') ? 'COMPLETED' : undefined,
    },
    {
      id: 'scraping',
      label: 'Site capture',
      status: (done('scraping') ? 'completed' : active('scraping') ? 'in-progress' : 'not-started') as 'completed' | 'in-progress' | 'not-started',
      statusLabel: done('scraping') ? 'COMPLETED' : active('scraping') ? 'IN PROGRESS' : 'NOT STARTED',
      meta: active('scraping') ? '~3 min remaining' : undefined,
    },
    {
      id: 'swiping',
      label: 'Preferences complete',
      status: (done('swiping') || done('embedded') ? 'completed' : active('swiping') || active('embedded') ? 'ready' : 'not-started') as 'completed' | 'ready' | 'not-started',
      statusLabel: done('swiping') || done('embedded') ? 'COMPLETED' : active('swiping') || active('embedded') ? 'READY FOR YOU' : 'NOT STARTED',
      meta: active('swiping') ? 'Round 3 of 3 · ~5 min' : done('swiping') ? '3 rounds · 240 swipes' : undefined,
    },
    {
      id: 'composing',
      label: 'First layout generated',
      status: (done('composing') ? 'completed' : active('composing') ? 'in-progress' : 'not-started') as 'completed' | 'in-progress' | 'not-started',
      statusLabel: done('composing') ? 'COMPLETED' : active('composing') ? 'WAITING ON DESIGNER' : 'NOT STARTED',
      meta: done('composing') ? 'v1 · 8 sections' : active('composing') ? 'Composing · 2h in' : undefined,
    },
    {
      id: 'refining',
      label: 'Designer review complete',
      status: (done('refining') ? 'completed' : active('refining') ? 'ready' : 'not-started') as 'completed' | 'ready' | 'not-started',
      statusLabel: done('refining') ? 'COMPLETED' : active('refining') ? 'READY FOR YOU' : 'NOT STARTED',
      meta: active('refining') ? 'Review v1 and leave notes' : done('refining') ? '1 refinement round' : undefined,
    },
    {
      id: 'revisions',
      label: 'Feedback applied',
      status: (done('revisions') ? 'completed' : active('revisions') ? 'in-progress' : 'not-started') as 'completed' | 'in-progress' | 'not-started',
      statusLabel: done('revisions') ? 'COMPLETED' : active('revisions') ? 'IN PROGRESS' : 'NOT STARTED',
      meta: done('revisions') ? 'Hero + menu copy updated' : undefined,
    },
    {
      id: 'handoff',
      label: 'Final handoff ready',
      status: (done('handoff') || active('handoff') ? 'completed' : 'not-started') as 'completed' | 'not-started',
      statusLabel: done('handoff') || active('handoff') ? 'COMPLETED' : 'NOT STARTED',
      meta: active('handoff') ? 'Delivered May 21' : undefined,
    },
  ];
};

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


const getDashState = (status: string | null, hasProject: boolean): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 => {
  if (!hasProject) return 0;
  if (!status) return 1;  // project exists, no status yet
  switch (status) {
    case 'intake': return 2;  // intake done → show start scraping
    case 'scraping': return 3;  // scraping running → show preferences next
    case 'swiping':
    case 'embedded': return 4;  // preferences → show composing next
    case 'composing': return 5;  // composing → show review draft next
    case 'refining': return 6;  // draft ready → show review draft
    case 'revisions':
    case 'completed':
    case 'handoff': return 7;  // delivered
    default: return 1;
  }
};


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

const State00: React.FC<{ designerName: string; onCreateProject: () => void }> = ({
  designerName, onCreateProject,
}) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    {/* Welcome pill */}
    <div className="flex items-center gap-xs mb-lg">
      <span className="px-sm py-xs rounded-full border border-border-default bg-background-primary-2 text-para-xs font-semibold text-accent-default uppercase tracking-wide">Tandem</span>
      <span className="text-text-tertiary text-para-xs">·</span>
      <span className="text-para-xs text-text-secondary font-medium">Welcome</span>
    </div>

    {/* Hero */}


    {/* Preview placeholder */}
    <div className="bg-background-primary-2 rounded-2xl border border-dashed border-border-default p-xl mb-lg flex items-center gap-md">
      <div className="w-10 h-10 rounded-xl border border-border-default bg-background-muted flex items-center justify-center flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" className="text-text-tertiary" />
          <path d="M1 5h16" stroke="currentColor" strokeWidth="1.2" className="text-text-tertiary" />
        </svg>
      </div>
      <div>
        <p className="text-para-sm font-semibold text-text-primary">Your live preview will appear here.</p>
        <p className="text-para-xs text-text-secondary mt-xs">Once your designer starts composing, you'll see your site come together in real time.</p>
      </div>
    </div>

    {/* 3-step cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-md mb-lg">
      {[
        { num: '01', label: 'Share your vision', body: 'Tell us about your goals, brand, and timeline through a short intake form.' },
        { num: '02', label: 'We compose your site', body: 'Tandem builds your first layout from your taste signals and brief.' },
        { num: '03', label: 'You approve & ship', body: 'Refine, sign off, and we hand off the final assets and code.' },
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
          <div className="w-10 h-10 rounded-full bg-background-muted flex items-center justify-center text-text-secondary font-bold text-para-sm border-2 border-background-primary">S</div>
        </div>
        <div>
          <p className="text-para-sm font-semibold text-text-primary">Your designer is {designerName}.</p>
          <p className="text-para-xs text-text-secondary">Ready to start? Create your project and {designerName} will be notified right away.</p>
        </div>
      </div>
      <button
        onClick={onCreateProject}
        className="flex-shrink-0 flex items-center gap-xs px-md py-sm rounded-xl bg-accent-default text-accent-foreground text-para-sm font-semibold hover:bg-accent-hover transition-colors"
      >
        Create Project
      </button>
    </div>
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
        {dashState === 0 && (
          <State00
            designerName={designerName}
            onCreateProject={() => navigate(ROUTES.onboard)}
          />
        )}

        {dashState !== 0 && (
          <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-xs mb-lg">
              <span className="px-sm py-xs rounded-full border border-border-default bg-background-primary-2 text-para-xs font-semibold text-accent-default uppercase tracking-wide">
                Tandem
              </span>
              <span className="text-text-tertiary text-para-xs">·</span>
              <span className="text-para-xs text-text-secondary font-medium">Acme Coffee Co.</span>
            </div>

            {/* Hero */}
            <DashHero
              heading={
                dashState === 1 ? COPY.states.s01.heading :
                  dashState === 2 ? COPY.states.s02.heading :
                    dashState === 3 ? COPY.states.s03.heading :
                      dashState === 4 ? COPY.states.s04.heading :
                        dashState === 5 ? COPY.states.s05.heading :
                          dashState === 6 ? COPY.states.s06.heading :
                            COPY.states.s07.heading
              }
              body={
                dashState === 1 ? COPY.states.s01.body :
                  dashState === 2 ? COPY.states.s02.body :
                    dashState === 3 ? COPY.states.s03.body :
                      dashState === 4 ? COPY.states.s04.body :
                        dashState === 5 ? COPY.states.s05.body :
                          dashState === 6 ? COPY.states.s06.body :
                            COPY.states.s07.body
              }
              primaryCta={
                dashState === 1 ? COPY.states.s01.primaryCta :
                  dashState === 2 ? COPY.states.s02.primaryCta :
                    dashState === 3 ? COPY.states.s03.primaryCta :
                      dashState === 4 ? COPY.states.s04.primaryCta :
                        dashState === 5 ? COPY.states.s05.primaryCta :
                          dashState === 6 ? COPY.states.s06.primaryCta :
                            COPY.states.s07.primaryCta
              }
              secondaryCta={
                dashState === 1 ? undefined :
                  dashState === 2 ? COPY.states.s02.secondaryCta :
                    dashState === 3 ? COPY.states.s02.secondaryCta :
                      dashState === 4 ? COPY.states.s04.secondaryCta :
                        dashState === 5 ? COPY.states.s05.secondaryCta :
                          dashState === 6 ? COPY.states.s06.secondaryCta :
                            COPY.states.s07.secondaryCta
              }
              onPrimaryClick={
                dashState === 1 ? () => navigate(ROUTES.intake) :
                  dashState === 2 ? () => navigate(ROUTES.scraper) :
                    dashState === 3 ? () => navigate(ROUTES.swiper) :
                      dashState === 4 ? () => navigate(ROUTES.swiper) :
                        dashState === 5 ? () => navigate(ROUTES.compose) :
                          dashState === 6 ? () => navigate(ROUTES.compose) :
                            () => navigate(ROUTES.compose)
              }
              onSecondaryClick={
                dashState === 1 ? () => { } :
                  dashState === 2 ? () => navigate(ROUTES.intake) :
                    dashState === 3 ? () => navigate(ROUTES.intake) :
                      dashState === 4 ? () => { } :
                        dashState === 5 ? () => { } :
                          dashState === 6 ? () => { } :
                            () => navigate(ROUTES.testimonial)
              }
            />

            {/* Stepper */}
            <ProjectProgress
              projectStatus={projectStatus}
              stageLabel={
                dashState === 2 ? COPY.states.s02.stageLabel :
                  dashState === 3 ? COPY.states.s03.stageLabel :
                    dashState === 4 ? COPY.states.s04.stageLabel :
                      dashState === 5 ? COPY.states.s05.stageLabel :
                        dashState === 6 ? COPY.states.s06.stageLabel :
                          dashState === 7 ? COPY.states.s07.stageLabel :
                            'Getting started'
              }
              stageSub={
                dashState === 1 ? 'Stage 1 of 7' :
                  dashState === 2 ? 'Stage 2 of 7' :
                    dashState === 3 ? 'Stage 3 of 7' :
                      dashState === 4 ? 'Stage 4 of 7' :
                        dashState === 5 ? 'Stage 5 of 7' :
                          dashState === 6 ? 'Stage 6 of 7' :
                            COPY.states.s07.stageSub
              }
              statusPill={
                dashState === 2 ? COPY.states.s02.stageStatus :
                  dashState === 3 ? COPY.states.s03.stageStatus :
                    dashState === 4 ? COPY.states.s04.stageStatus :
                      dashState === 5 ? COPY.states.s05.stageStatus :
                        dashState === 6 ? COPY.states.s06.stageStatus :
                          ''
              }
              estHandoff="Fri, May 22"
              rightNow={
                dashState === 2 ? COPY.states.s02.rightNow :
                  dashState === 3 ? COPY.states.s03.rightNow :
                    dashState === 4 ? COPY.states.s04.rightNow :
                      dashState === 5 ? COPY.states.s05.rightNow :
                        dashState === 6 ? COPY.states.s06.rightNow :
                          dashState === 7 ? COPY.states.s07.rightNow :
                            ''
              }
              upNext={
                dashState === 2 ? COPY.states.s02.upNext :
                  dashState === 3 ? COPY.states.s03.upNext :
                    dashState === 4 ? COPY.states.s04.upNext :
                      dashState === 5 ? COPY.states.s05.upNext :
                        dashState === 6 ? COPY.states.s06.upNext :
                          dashState === 7 ? COPY.states.s07.upNext :
                            ''
              }
            />

            {/* Preview + Checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">
              <div className="lg:col-span-2">
                <BrowserMockup />
              </div>
              <div className="lg:col-span-1">
                <ProjectChecklist
                  title={dashState === 7 ? COPY.states.s07.projectLog : 'Project checklist'}
                  sub={dashState === 7 ? COPY.states.s07.projectLogSub : "What's done, what's coming"}
                  items={getChecklistItems(projectStatus)}
                />
              </div>
            </div>

            {/* Quick actions */}
            <div className="mb-lg">
              <p className="text-para-md font-bold text-text-primary mb-xs">Quick actions</p>
              <p className="text-para-xs text-accent-default mb-md">Available actions for this stage.</p>
              <div className="grid grid-cols-2 gap-md">
                {/* Primary action — advance pipeline */}
                <QuickActionCard
                  icon={<></>}
                  label={
                    dashState === 1 ? 'Start intake' :
                      dashState === 2 ? 'Start scraping' :
                        dashState === 3 ? 'Start preferences' :
                          dashState === 4 ? 'Start composing' :
                            dashState === 5 ? 'Review draft' :
                              dashState === 6 ? 'Review draft' :
                                'View final handoff'
                  }
                  sub={
                    dashState === 1 ? 'Fill in your project brief' :
                      dashState === 2 ? 'Capture your existing site' :
                        dashState === 3 ? 'Swipe through design variants' :
                          dashState === 4 ? 'Generate your first layout' :
                            dashState === 5 ? 'v1 · 8 sections' :
                              dashState === 6 ? 'v1 · 8 sections' :
                                'Delivered May 21'
                  }
                  onClick={
                    dashState === 1 ? () => navigate(ROUTES.intake) :
                      dashState === 2 ? () => navigate(ROUTES.scraper) :
                        dashState === 3 ? () => navigate(ROUTES.swiper) :
                          dashState === 4 ? () => navigate(ROUTES.swiper) :
                            dashState === 5 ? () => navigate(ROUTES.compose) :
                              dashState === 6 ? () => navigate(ROUTES.compose) :
                                () => navigate(ROUTES.compose)
                  }
                />
                {/* Secondary action — view current/previous stage */}
                <QuickActionCard
                  icon={<></>}
                  label={
                    dashState === 1 ? 'Message designer' :
                      dashState === 2 ? 'View intake' :
                        dashState === 3 ? 'View intake' :
                          dashState === 4 ? 'View intake' :
                            dashState === 5 ? 'Update preferences' :
                              dashState === 6 ? 'Message designer' :
                                'Download assets'
                  }
                  sub={
                    dashState === 1 ? `${designerName} · replies in ~4h` :
                      dashState === 2 ? '2 free edits remaining' :
                        dashState === 3 ? '2 free edits remaining' :
                          dashState === 4 ? '2 free edits remaining' :
                            dashState === 5 ? 'Add more signal' :
                              dashState === 6 ? `${designerName} · replies in ~4h` :
                                '.zip · 4.2 MB'
                  }
                  onClick={
                    dashState === 1 ? () => { } :
                      dashState === 2 ? () => navigate(ROUTES.intake) :
                        dashState === 3 ? () => navigate(ROUTES.intake) :
                          dashState === 4 ? () => navigate(ROUTES.intake) :
                            dashState === 5 ? () => navigate(ROUTES.swiper) :
                              dashState === 6 ? () => { } :
                                () => { }
                  }
                  disabled={dashState === 1 || dashState === 6}
                />
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ClientDashHome;
