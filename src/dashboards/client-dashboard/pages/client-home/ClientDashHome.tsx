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
  brand: 'Tandem',
  nav: {
    myProject: 'My Project',
    swiper: 'Swiper',
    support: 'Support',
    swiperLocked: 'LOCKED',
  },
  fallbacks: {
    designerName: 'your designer',
    projectName: 'your site',
    companyName: 'Your company',
    estHandoff: 'TBD',
    stageFallback: 'Getting started',
  },
  states: {
    s00: {
      welcomePill: 'Welcome',
      heading: "Let's get your project started.",
      body: 'Create your project to kick off the process. Your designer will be notified and you can start your intake right after.',
      primaryCta: 'Start intake',
      secondaryCta: 'Message designer',
      previewPlaceholder: 'Your live preview will appear here.',
      previewSub: "Once your designer starts building, you'll see your site come together in real time.",
      step1Label: 'Share your vision',
      step1Body: 'Tell us about your goals, brand, and timeline through a short intake form.',
      step2Label: 'We compose your site',
      step2Body: 'Tandem builds your first layout from your taste signals and brief.',
      step3Label: 'You approve & ship',
      step3Body: 'Refine, sign off, and we hand off the final assets and code.',
      designerReady: (name: string) => `Ready to start? Create your project and ${name} will be notified right away.`,
      createProjectCta: 'Create project',
    },
    s01: {
      heading: "Let's get your project started.",
      body: 'Complete a short intake so your designer can understand your goals, brand, and direction. About 8 minutes — you can save and come back.',
      primaryCta: 'Start intake',
      secondaryCta: 'Message designer',
      previewPlaceholder: 'Your live preview will appear here.',
      previewSub: "Once your designer starts building, you'll see your site come together in real time.",
    },
    s02: {
      heading: 'Time to capture your favourite sites.',
      body: 'Add a few sites that match the vibe you want. This helps Tandem understand your design direction before building your layout.',
      primaryCta: 'Add inspiration sites',
      secondaryCta: 'Edit intake',
      stageLabel: 'Site capture — your turn',
      stageStatus: 'YOUR TURN',
      rightNow: () => `Add URLs of sites you love. Tandem will extract their design signals to inform your layout.`,
      upNext: "Once you're done, you'll move to the style preferences round — about 5 minutes.",
    },
    s03: {
      heading: 'Your project is moving.',
      body: "Tandem is reading your existing site to learn the basics. Once that finishes, you'll do a short style preferences round — that unlocks your first layout.",
      primaryCta: 'Pick your style',
      stageLabel: 'Reading your site',
      stageStatus: 'WORKING',
      rightNow: (domain: string) => `Tandem is analysing ${domain} — extracting sections, assets, and visual signals. No action needed from you.`,
      upNext: "Style preferences — you'll swipe through hero, nav, features, and pricing variants. About 6 minutes.",
    },
    s04: {
      heading: "One more style round and you're ready.",
      body: "You're nearly through setup. One short round helps Tandem generate a sharper first layout — takes about 5 minutes.",
      primaryCta: 'Pick your style',
      secondaryCta: 'Skip for now',
      stageLabel: 'Style preferences — your turn',
      stageStatus: 'YOUR TURN',
      rightNow: "You've completed 2 of 3 style rounds. One more round (~5 minutes) gives Tandem a sharper read on your taste.",
      upNext: 'Tandem composes your first layout. Usually 18–24 hours from when you finish.',
    },
    s05: {
      heading: 'Your designer is building your first layout.',
      body: 'Your first draft will land here shortly. Usually within 24 hours of your intake and style preferences being reviewed.',
      primaryCta: 'Preview draft',
      secondaryCta: (name: string) => `Message ${name}`,
      stageLabel: 'First layout — in progress',
      stageStatus: 'IN PROGRESS',
      rightNow: (name: string) => `${name} is using your style picks and site data to build the hero, features, and menu sections.`,
      upNext: (name: string) => `You'll review the first draft and request changes by chatting with ${name}, section by section.`,
    },
    s06: {
      heading: 'Your first draft is ready.',
      body: (name: string) => `${name} just pushed v1 of your homepage. Take a look — approve sections you love, or leave a note on anything you'd like changed.`,
      primaryCta: 'Review your draft',
      secondaryCta: (name: string) => `Message ${name}`,
      stageLabel: 'Your review — ready for you',
      stageStatus: 'YOUR TURN',
      rightNow: 'Walk through the live preview. Hover any section to approve or request a change in plain English.',
      upNext: (name: string) => `${name} refines based on your notes. Usually one round; two if anything is rebuilt from scratch.`,
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
      handoffDelivered: (date: string) => `Delivered ${date}`,
    },
  },
  checklist: {
    title: 'Project checklist',
    sub: "What's done, what's coming",
  },
  quickActions: {
    title: 'Quick actions',
    sub: 'Available actions for this stage.',
    primaryLabel: {
      s1: 'Start your intake',
      s2: 'Add inspiration sites',
      s3: 'Pick your style',
      s4: 'Pick your style',
      s5: 'Preview your draft',
      s6: 'Review your draft',
      s7: 'View final handoff',
    },
    primarySub: {
      s1: 'Tell us about your goals and brand',
      s2: 'Add sites whose design you love',
      s3: 'Swipe through design variants',
      s4: 'One more round to sharpen your layout',
      s5: 'v1 ready to preview',
      s6: 'v1 ready for your notes',
      s7: (date: string) => `Delivered ${date}`,
    },
    secondaryLabel: {
      s1: 'Message designer',
      s2: 'Edit intake',
      s3: 'Edit intake',
      s4: 'Edit intake',
      s5: 'Update style picks',
      s6: 'Message designer',
      s7: 'Download assets',
    },
    secondarySub: {
      s1: (name: string) => `${name} · replies in ~4h`,
      s2: (_name: string) => '2 free edits remaining',
      s3: (_name: string) => '2 free edits remaining',
      s4: (_name: string) => '2 free edits remaining',
      s5: (_name: string) => 'Add more design signal',
      s6: (name: string) => `${name} · replies in ~4h`,
      s7: (_name: string) => '.zip · 4.2 MB',
    },
  },
  designer: {
    label: (name: string) => `Your designer is ${name}.`,
    sub: () => 'Need anything from the team? Drop a message — we usually reply within 4 hours.',
    messageCta: (name: string) => `Message ${name}`,
  },
  preview: {
    statusPills: {
      coming: '● Preview coming soon',
      waiting: '● Waiting on style picks',
      composing: '● Building your layout',
      draftReady: '● Draft ready',
      delivered: '● Delivered',
    },
    openLabel: '↗ Open',
  },
} as const;

// ─── DEV GUARD ────────────────────────────────────────────────────────────────

const devWarn = (field: string, fallback: string) => {
  if (import.meta.env.MODE === 'development') {
    console.warn(`[TandemUI] Missing field: "${field}" — rendering fallback "${fallback}". Wire real data before launch.`);
  }
  return fallback;
};

// ─── BRAND ────────────────────────────────────────────────────────────────────

const BRAND = {
  accent:        'rgb(var(--accent-default))',
  accentHover:   'rgb(var(--accent-hover))',
  accentFg:      'rgb(var(--accent-foreground))',
  accentSubtle:  'rgb(var(--accent-subtle))',
  textPrimary:   'rgb(var(--text-primary))',
  textSecondary: 'rgb(var(--text-secondary))',
  textTertiary:  'rgb(var(--text-tertiary))',
  bgPrimary:     'rgb(var(--background-primary))',
  bgPrimary2:    'rgb(var(--background-primary-2))',
  bgSecondary:   'rgb(var(--background-secondary))',
  bgMuted:       'rgb(var(--background-muted))',
  borderDefault: 'rgb(var(--border-default))',
  borderMuted:   'rgb(var(--border-muted))',
  success:       'rgb(var(--text-success))',
  bgSuccess:     'rgb(var(--background-success))',
  error:         'rgb(var(--text-error))',
} as const;

// ─── ROUTES ───────────────────────────────────────────────────────────────────

const ROUTES = {
  intake:      '/dashboard/client/intake',
  swiper:      '/dashboard/client/swiper',
  compose:     '/dashboard/client/compose',
  support:     '/dashboard/client/support',
  onboard:     '/dashboard/client/onboard',
  scraper:     '/dashboard/client/scraper',
  testimonial: '/dashboard/client/final-testimonial',
} as const;

// ─── Pipeline ─────────────────────────────────────────────────────────────────

const PIPELINE = [
  'intake', 'scraping', 'swiping', 'embedded',
  'composing', 'refining', 'revisions', 'completed', 'handoff',
] as const;
type PipelineStage = typeof PIPELINE[number];

// ─── Checklist items ──────────────────────────────────────────────────────────

const getChecklistItems = (projectStatus: string | null, estimatedHandoff: string) => {
  const idx = projectStatus ? PIPELINE.indexOf(projectStatus as PipelineStage) : -1;
  const stageIdx = (s: string) => PIPELINE.indexOf(s as PipelineStage);
  const done   = (s: string) => idx > stageIdx(s);
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
      label: 'Style preferences',
      status: (done('swiping') || done('embedded') ? 'completed' : active('swiping') || active('embedded') ? 'ready' : 'not-started') as 'completed' | 'ready' | 'not-started',
      statusLabel: done('swiping') || done('embedded') ? 'COMPLETED' : active('swiping') || active('embedded') ? 'READY FOR YOU' : 'NOT STARTED',
      meta: active('swiping') ? 'Round 3 of 3 · ~5 min' : undefined,
    },
    {
      id: 'composing',
      label: 'First layout generated',
      status: (done('composing') ? 'completed' : active('composing') ? 'in-progress' : 'not-started') as 'completed' | 'in-progress' | 'not-started',
      statusLabel: done('composing') ? 'COMPLETED' : active('composing') ? 'WITH YOUR DESIGNER' : 'NOT STARTED',
    },
    {
      id: 'refining',
      label: 'Updated Layout',
      status: (done('refining') ? 'completed' : active('refining') ? 'ready' : 'not-started') as 'completed' | 'ready' | 'not-started',
      statusLabel: done('refining') ? 'COMPLETED' : active('refining') ? 'READY FOR YOU' : 'NOT STARTED',
      meta: active('refining') ? 'Review v1 and leave notes' : undefined,
    },
    {
      id: 'revisions',
      label: 'Feedback applied',
      status: (done('revisions') ? 'completed' : active('revisions') ? 'in-progress' : 'not-started') as 'completed' | 'in-progress' | 'not-started',
      statusLabel: done('revisions') ? 'COMPLETED' : active('revisions') ? 'IN PROGRESS' : 'NOT STARTED',
    },
    {
      id: 'handoff',
      label: 'Final handoff ready',
      status: (done('handoff') || active('handoff') ? 'completed' : 'not-started') as 'completed' | 'not-started',
      statusLabel: done('handoff') || active('handoff') ? 'COMPLETED' : 'NOT STARTED',
      meta: active('handoff') && estimatedHandoff ? `Delivered ${estimatedHandoff}` : undefined,
    },
  ];
};

// ─── getDashState ─────────────────────────────────────────────────────────────

const getDashState = (status: string | null, hasProject: boolean): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 => {
  if (!hasProject) return 0;  // no project
  if (!status)     return 1;  // project exists, intake not started
  switch (status) {
    case 'intake':   return 2;  // intake done → start scraping
    case 'scraping': return 3;  // scraping running → start swiping next
    case 'swiping':
    case 'embedded': return 4;  // swiping → start composing next
    case 'composing':return 5;  // composing → preview draft
    case 'refining': return 6;  // draft ready → review draft
    case 'revisions':
    case 'completed':
    case 'handoff':  return 7;  // delivered
    default:         return 1;
  }
};

// ─── Designer card ────────────────────────────────────────────────────────────

const DesignerCard: React.FC<{ designerName: string }> = ({ designerName }) => (
  <div className="flex items-center justify-between gap-md p-lg rounded-2xl border border-border-default bg-background-primary-2 mt-lg">
    <div className="flex items-center gap-md">
      <div className="flex -space-x-2">
        <div className="w-10 h-10 rounded-full bg-accent-default flex items-center justify-center text-white font-bold text-para-sm border-2 border-background-primary">
          {designerName.charAt(0).toUpperCase()}
        </div>
      </div>
      <div>
        <p className="text-para-sm font-semibold text-text-primary">
          {COPY.designer.label(designerName)}
        </p>
        <p className="text-para-xs text-text-secondary">{COPY.designer.sub()}</p>
      </div>
    </div>
    <button className="flex-shrink-0 flex items-center gap-xs px-md py-sm rounded-xl border border-border-default bg-background-primary text-para-sm text-text-secondary hover:text-text-primary transition-colors">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
        <path d="M1 1h12v9H1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M4 13l3-3h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {COPY.designer.messageCta(designerName)}
    </button>
  </div>
);

// ─── State 00 — No project ────────────────────────────────────────────────────

const State00: React.FC<{ designerName: string; onCreateProject: () => void }> = ({
  designerName, onCreateProject,
}) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <div className="flex items-center gap-xs mb-lg">
      <span className="px-sm py-xs rounded-full border border-border-default bg-background-primary-2 text-para-xs font-semibold text-accent-default uppercase tracking-wide">
        {COPY.brand}
      </span>
      <span className="text-text-tertiary text-para-xs">·</span>
      <span className="text-para-xs text-text-secondary font-medium">{COPY.states.s00.welcomePill}</span>
    </div>

    <DashHero
      heading={COPY.states.s00.heading}
      body={COPY.states.s00.body}
      primaryCta={COPY.states.s00.createProjectCta}
      onPrimaryClick={onCreateProject}
    />

    <div className="bg-background-primary-2 rounded-2xl border border-dashed border-border-default p-xl mb-lg flex items-center gap-md">
      <div className="w-10 h-10 rounded-xl border border-border-default bg-background-muted flex items-center justify-center flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" className="text-text-tertiary" />
          <path d="M1 5h16" stroke="currentColor" strokeWidth="1.2" className="text-text-tertiary" />
        </svg>
      </div>
      <div>
        <p className="text-para-sm font-semibold text-text-primary">{COPY.states.s00.previewPlaceholder}</p>
        <p className="text-para-xs text-text-secondary mt-xs">{COPY.states.s00.previewSub}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-md mb-lg">
      {[
        { num: '01', label: COPY.states.s00.step1Label, body: COPY.states.s00.step1Body },
        { num: '02', label: COPY.states.s00.step2Label, body: COPY.states.s00.step2Body },
        { num: '03', label: COPY.states.s00.step3Label, body: COPY.states.s00.step3Body },
      ].map((step) => (
        <div key={step.num} className="bg-background-primary-2 rounded-xl border border-border-default p-lg">
          <p className="text-para-xs font-bold text-accent-default mb-sm">{step.num}</p>
          <h3 className="text-para-md font-bold text-text-primary mb-xs">{step.label}</h3>
          <p className="text-para-sm text-text-secondary leading-relaxed">{step.body}</p>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between gap-md p-lg rounded-2xl border border-border-default bg-background-primary-2">
      <div className="flex items-center gap-md">
        <div className="w-10 h-10 rounded-full bg-accent-default flex items-center justify-center text-white font-bold text-para-sm border-2 border-background-primary">
          {designerName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-para-sm font-semibold text-text-primary">{COPY.designer.label(designerName)}</p>
          <p className="text-para-xs text-text-secondary">{COPY.states.s00.designerReady(designerName)}</p>
        </div>
      </div>
      <button
        onClick={onCreateProject}
        className="flex-shrink-0 flex items-center gap-xs px-md py-sm rounded-xl bg-accent-default text-accent-foreground text-para-sm font-semibold hover:bg-accent-hover transition-colors"
      >
        {COPY.states.s00.createProjectCta}
      </button>
    </div>
  </motion.div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const ClientDashHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectStatus = useSelector((state: RootState) => state.project.status);
  const projectId     = useSelector((state: RootState) => state.project.projectId);
  const clientEmail   = useSelector((state: RootState) => state.auth.user?.email) ?? '';
  const designerEmail = useSelector((state: RootState) => state.auth.user?.designerEmail) ?? '';

  // Syed to replace with auth.user.designerName when available
  const designerName = designerEmail
    ? designerEmail.split('@')[0].charAt(0).toUpperCase() + designerEmail.split('@')[0].slice(1)
    : devWarn('auth.user.designerName', COPY.fallbacks.designerName);

  // Syed to replace with project.project_name when available
  const projectDomain = projectId
    ? devWarn('project.project_name', COPY.fallbacks.projectName)
    : COPY.fallbacks.projectName;

  // Syed to replace with project.company_name when available
  const companyName = projectId
    ? devWarn('project.company_name', COPY.fallbacks.companyName)
    : COPY.fallbacks.companyName;

  // Syed to replace with project.estimated_handoff when available
  const estimatedHandoff = projectId
    ? devWarn('project.estimated_handoff', COPY.fallbacks.estHandoff)
    : COPY.fallbacks.estHandoff;

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
      // Fetch failed silently — dashboard shows state 00/01
    }
  };

  useEffect(() => { if (clientEmail) fetchProject(); }, [clientEmail]);

  const hasProject = !!projectId;
  const dashState  = getDashState(projectStatus, hasProject);
  const qaKey      = `s${dashState}` as keyof typeof COPY.quickActions.primaryLabel;
  const stageSub   = dashState < 7 ? `Stage ${dashState} of 7` : COPY.states.s07.stageSub;

  // ─── Arrays indexed by dashState (0–7) ──────────────────────────────────────

  const stateHeading = [
    '',
    COPY.states.s01.heading,
    COPY.states.s02.heading,
    COPY.states.s03.heading,
    COPY.states.s04.heading,
    COPY.states.s05.heading,
    COPY.states.s06.heading,
    COPY.states.s07.heading,
  ];

  const stateBody = [
    '',
    COPY.states.s01.body,
    COPY.states.s02.body,
    COPY.states.s03.body,
    COPY.states.s04.body,
    COPY.states.s05.body,
    COPY.states.s06.body(designerName),
    COPY.states.s07.body,
  ];

  const statePrimaryCta = [
    '',
    COPY.states.s01.primaryCta,
    COPY.states.s02.primaryCta,
    COPY.states.s03.primaryCta,
    COPY.states.s04.primaryCta,
    COPY.states.s05.primaryCta,
    COPY.states.s06.primaryCta,
    COPY.states.s07.primaryCta,
  ];

  const stateSecondaryCta = [
    undefined,
    undefined,
    COPY.states.s02.secondaryCta,
    undefined,
    COPY.states.s04.secondaryCta,
    COPY.states.s05.secondaryCta(designerName),
    COPY.states.s06.secondaryCta(designerName),
    COPY.states.s07.secondaryCta,
  ];

  const stageLabel = [
    '',
    COPY.fallbacks.stageFallback,
    COPY.states.s02.stageLabel,
    COPY.states.s03.stageLabel,
    COPY.states.s04.stageLabel,
    COPY.states.s05.stageLabel,
    COPY.states.s06.stageLabel,
    COPY.states.s07.stageLabel,
  ];

  const stageStatus = [
    '',
    '',
    COPY.states.s02.stageStatus,
    COPY.states.s03.stageStatus,
    COPY.states.s04.stageStatus,
    COPY.states.s05.stageStatus,
    COPY.states.s06.stageStatus,
    '',
  ];

  const rightNow = [
    '',
    '',
    COPY.states.s02.rightNow(),
    COPY.states.s03.rightNow(projectDomain),
    COPY.states.s04.rightNow,
    COPY.states.s05.rightNow(designerName),
    COPY.states.s06.rightNow,
    COPY.states.s07.rightNow,
  ];

  const upNext = [
    '',
    '',
    COPY.states.s02.upNext,
    COPY.states.s03.upNext,
    COPY.states.s04.upNext,
    COPY.states.s05.upNext(designerName),
    COPY.states.s06.upNext(designerName),
    COPY.states.s07.upNext,
  ];

  // ─── Pipeline routes — indexed by dashState ──────────────────────────────────
  // 0 → onboard   (create project)
  // 1 → intake    (start intake)
  // 2 → scraper   (intake done → start scraping)
  // 3 → swiper    (scraping done → start swiping)
  // 4 → compose   (swiping done → start composing)
  // 5 → compose   (composing → preview draft)
  // 6 → compose   (draft ready → review draft)
  // 7 → compose   (delivered → view handoff)

  const primaryRoute = [
    ROUTES.onboard,  // 0
    ROUTES.intake,   // 1
    ROUTES.scraper,  // 2 — intake done → scrape
    ROUTES.swiper,   // 3 — scraping done → swipe
    ROUTES.compose,  // 4 — swiping done → compose
    ROUTES.compose,  // 5 — composing → preview
    ROUTES.compose,  // 6 — draft ready → review
    ROUTES.compose,  // 7 — delivered → handoff
  ];

  const secondaryRoute = [
    null,                // 0
    null,                // 1 — no secondary
    ROUTES.intake,       // 2 — edit intake
    ROUTES.intake,       // 3 — edit intake
    ROUTES.intake,       // 4 — edit intake
    ROUTES.swiper,       // 5 — update style picks
    null,                // 6 — message designer (not wired)
    ROUTES.testimonial,  // 7 — share testimonial
  ];

  const qaPrimarySub = typeof COPY.quickActions.primarySub[qaKey] === 'function'
    ? (COPY.quickActions.primarySub[qaKey] as (d: string) => string)(estimatedHandoff)
    : COPY.quickActions.primarySub[qaKey] as string;

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="container mx-auto px-md sm:px-lg lg:px-xl py-lg sm:py-xl lg:py-2xl max-w-6xl">

        {/* ── State 0 — No project ── */}
        {dashState === 0 && (
          <State00
            designerName={designerName}
            onCreateProject={() => navigate(ROUTES.onboard)}
          />
        )}

        {/* ── States 1–7 — Active project ── */}
        {dashState !== 0 && (
          <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-xs mb-lg">
              <span className="px-sm py-xs rounded-full border border-border-default bg-background-primary-2 text-para-xs font-semibold text-accent-default uppercase tracking-wide">
                {COPY.brand}
              </span>
              <span className="text-text-tertiary text-para-xs">·</span>
              <span className="text-para-xs text-text-secondary font-medium">{companyName}</span>
            </div>

            {/* Hero */}
            <DashHero
              heading={stateHeading[dashState]}
              body={stateBody[dashState]}
              primaryCta={statePrimaryCta[dashState]}
              secondaryCta={stateSecondaryCta[dashState]}
              onPrimaryClick={() => navigate(primaryRoute[dashState])}
              onSecondaryClick={secondaryRoute[dashState] ? () => navigate(secondaryRoute[dashState]!) : () => {}}
            />

            {/* Stepper */}
            <ProjectProgress
              projectStatus={projectStatus}
              stageLabel={stageLabel[dashState]}
              stageSub={stageSub}
              statusPill={stageStatus[dashState]}
              estHandoff={estimatedHandoff}
              rightNow={rightNow[dashState]}
              upNext={upNext[dashState]}
            />

            {/* Preview + Checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">
            <div className="lg:col-span-2">
                <BrowserMockup />
              </div>
              <div className="lg:col-span-1">
                <ProjectChecklist
                  title={dashState === 7 ? COPY.states.s07.projectLog : COPY.checklist.title}
                  sub={dashState === 7 ? COPY.states.s07.projectLogSub : COPY.checklist.sub}
                  items={getChecklistItems(projectStatus, estimatedHandoff)}
                />
              </div>
            </div>

            {/* Quick actions */}
            <div className="mb-lg">
              <p className="text-para-md font-bold text-text-primary mb-xs">{COPY.quickActions.title}</p>
              <p className="text-para-xs text-accent-default mb-md">{COPY.quickActions.sub}</p>
              <div className="grid grid-cols-2 gap-md">
                <QuickActionCard
                  icon={<></>}
                  label={COPY.quickActions.primaryLabel[qaKey]}
                  sub={qaPrimarySub}
                  onClick={() => navigate(primaryRoute[dashState])}
                />
                <QuickActionCard
                  icon={<></>}
                  label={COPY.quickActions.secondaryLabel[qaKey]}
                  sub={COPY.quickActions.secondarySub[qaKey](designerName)}
                  onClick={secondaryRoute[dashState] ? () => navigate(secondaryRoute[dashState]!) : () => {}}
                  disabled={dashState === 1 || dashState === 6}
                />
              </div>
            </div>

            {/* Designer card */}
            <DesignerCard designerName={designerName} />
          </>
        )}

      </div>
    </div>
  );
};

export default ClientDashHome;