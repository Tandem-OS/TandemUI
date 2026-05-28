import { useState, useEffect } from 'react';
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
import { getAllProjectCompose, downloadCompositionJson } from '@/lib/requests/CompositionRequest';
import { FiDownload, FiExternalLink, FiLayers, FiCode, FiCheckCircle, FiPackage } from 'react-icons/fi';

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
      primaryCta: 'Refine layout',
      secondaryCta: 'Leave feedback',
      stageLabel: 'First layout — in progress',
      stageStatus: 'IN PROGRESS',
      rightNow: (name: string) => `${name} is using your style picks and site data to build the hero, features, and menu sections.`,
      upNext: (name: string) => `You'll review the first draft and request changes by chatting with ${name}, section by section.`,
    },
    s06: {
      heading: 'Your layout is ready to update.',
      body: (name: string) => `${name} has refined the layout based on your earlier notes. Review the updates, refine further, or leave feedback on how the process felt.`,
      primaryCta: 'Update layout',
      secondaryCta: 'Leave feedback',
      stageLabel: 'Your review — ready for you',
      stageStatus: 'YOUR TURN',
      rightNow: 'Walk through the live preview. Refine any section or leave feedback for your designer.',
      upNext: (name: string) => `${name} refines based on your notes. Usually one round; two if anything is rebuilt from scratch.`,
    },
    s08: {
      heading: 'Your designer has reviewed your layout.',
      body: 'Your designer has left feedback on the current version. Share your experience working with your designer, or move on to share your Tandem platform feedback.',
      primaryCta: 'Leave designer feedback',
      secondaryCta: 'Platform feedback',
      stageLabel: 'Designer feedback — your turn',
      stageStatus: 'YOUR TURN',
      rightNow: (name: string) => `${name} has reviewed the layout and left notes. Share your experience to help us improve the next version.`,
      upNext: 'Once you leave designer feedback, you can also share your experience with the Tandem platform.',
    },
    s09: {
      heading: 'Share your experience with Tandem.',
      body: 'The platform has reviewed your layout. Take a moment to share your experience — it helps us improve and match the right designers for projects like yours.',
      primaryCta: 'Share your experience',
      secondaryCta: 'View layout',
      stageLabel: 'Platform feedback — your turn',
      stageStatus: 'YOUR TURN',
      rightNow: 'Tandem has reviewed your layout. Your feedback helps us improve the platform and the designer matching process.',
      upNext: 'After sharing your experience, your layout will continue into the final refinement round.',
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
      s5: 'Refine layout',
      s6: 'Update layout',
      s7: 'View final handoff',
      s8: 'Leave designer feedback',
      s9: 'Share your experience',
    },
    primarySub: {
      s1: 'Tell us about your goals and brand',
      s2: 'Add sites whose design you love',
      s3: 'Swipe through design variants',
      s4: 'One more round to sharpen your layout',
      s5: 'Update sections and refine your layout',
      s6: 'Refine sections in your updated layout',
      s7: (date: string) => `Delivered ${date}`,
      s8: 'Share your thoughts on working with your designer',
      s9: 'Help us improve with your platform feedback',
    },
    secondaryLabel: {
      s1: 'Message designer',
      s2: 'Edit intake',
      s3: 'Edit intake',
      s4: 'Edit intake',
      s5: 'Leave feedback',
      s6: 'Leave feedback',
      s7: 'Download assets',
      s8: 'Platform feedback',
      s9: 'View layout',
    },
    secondarySub: {
      s1: (name: string) => `${name} · replies in ~4h`,
      s2: (_name: string) => '2 free edits remaining',
      s3: (_name: string) => '2 free edits remaining',
      s4: (_name: string) => '2 free edits remaining',
      s5: (_name: string) => 'Rate your designer experience',
      s6: (_name: string) => 'Rate your designer experience',
      s7: (_name: string) => '.zip · 4.2 MB',
      s8: (_name: string) => 'Share your Tandem experience',
      s9: (_name: string) => 'Preview your current layout',
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

// ─── ROUTES ───────────────────────────────────────────────────────────────────

const ROUTES = {
  intake:           '/dashboard/client/intake',
  swiper:           '/dashboard/client/swiper',
  compose:          '/dashboard/client/compose',
  support:          '/dashboard/client/support',
  onboard:          '/dashboard/client/onboard',
  scraper:          '/dashboard/client/scraper',
  testimonial:      '/dashboard/client/designer-testimonial',
  finalTestimonial: '/dashboard/client/final-testimonial',
} as const;

// ─── Pipeline ─────────────────────────────────────────────────────────────────

const PIPELINE = [
  'intake', 'scraping', 'swiping', 'embedded',
  'composing', 'refining', 'designer-feedback', 'platform-feedback',
  'revisions', 'completed', 'handoff',
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
      label: 'Updated layout',
      status: (done('refining') ? 'completed' : active('refining') ? 'ready' : 'not-started') as 'completed' | 'ready' | 'not-started',
      statusLabel: done('refining') ? 'COMPLETED' : active('refining') ? 'READY FOR YOU' : 'NOT STARTED',
      meta: active('refining') ? 'Review and refine your layout' : undefined,
    },
    {
      id: 'designer-feedback',
      label: 'Designer feedback',
      status: (done('designer-feedback') ? 'completed' : active('designer-feedback') ? 'ready' : 'not-started') as 'completed' | 'ready' | 'not-started',
      statusLabel: done('designer-feedback') ? 'COMPLETED' : active('designer-feedback') ? 'READY FOR YOU' : 'NOT STARTED',
    },
    {
      id: 'platform-feedback',
      label: 'Platform feedback',
      status: (done('platform-feedback') ? 'completed' : active('platform-feedback') ? 'ready' : 'not-started') as 'completed' | 'ready' | 'not-started',
      statusLabel: done('platform-feedback') ? 'COMPLETED' : active('platform-feedback') ? 'READY FOR YOU' : 'NOT STARTED',
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

const getDashState = (status: string | null, hasProject: boolean): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 => {
  if (!hasProject) return 0;
  if (!status)     return 1;
  switch (status) {
    case 'intake':            return 2;
    case 'scraping':          return 3;
    case 'swiping':
    case 'embedded':          return 4;
    case 'composing':         return 5;
    case 'refining':          return 6;
    case 'designer-feedback': return 8;
    case 'platform-feedback': return 9;
    case 'revisions':
    case 'completed':
    case 'handoff':           return 7;
    default:                  return 1;
  }
};

// ─── Handoff Screen ───────────────────────────────────────────────────────────

interface HandoffData {
  compositionId: string | null;
  pageSchema: any | null;
  isDownloading: boolean;
  onDownload: () => void;
  onTestimonial: () => void;
  projectId: string | null;
}

const HandoffScreen: React.FC<HandoffData> = ({
  compositionId,
  pageSchema,
  isDownloading,
  onDownload,
  onTestimonial,
  projectId,
}) => {
  const sections = pageSchema?.sections ?? [];

  // Extract brand colors from content_slots across sections
  const brandColors: string[] = [];
  let logoUrl: string | null = null;
  sections.forEach((s: any) => {
    const slots = s.content_slots ?? {};
    if (slots.background_color && slots.background_color.startsWith('#')) {
      if (!brandColors.includes(slots.background_color)) brandColors.push(slots.background_color);
    }
    if (slots.accent_color && slots.accent_color.startsWith('#')) {
      if (!brandColors.includes(slots.accent_color)) brandColors.push(slots.accent_color);
    }
    if (!logoUrl && slots.logo_url) logoUrl = slots.logo_url;
  });

  const SECTION_LABELS: Record<string, string> = {
    nav: 'Navigation', hero: 'Hero', features: 'Features', pricing: 'Pricing',
    faq: 'FAQ', testimonials: 'Testimonials', cta: 'Call to Action',
    contact: 'Contact', timeline: 'Timeline', footer: 'Footer',
  };

  const SECTION_NOTES: Record<string, string> = {
    nav: 'Sticky navigation with logo and CTA button',
    hero: 'Above-the-fold hero with headline, subheading, and primary action',
    features: 'Feature grid highlighting key product capabilities',
    pricing: 'Pricing tiers with comparison and CTA per tier',
    faq: 'Accordion FAQ for common client questions',
    testimonials: 'Social proof section with customer quotes',
    cta: 'Conversion section with email capture or direct CTA',
    contact: 'Contact form with split layout',
    timeline: 'Process or onboarding timeline',
    footer: 'Footer with links, brand, and legal',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

      {/* Delivered Banner */}
      <div
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-lg p-xl rounded-2xl mb-xl"
        style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' }}
      >
        <div className="flex-1">
          <div className="flex items-center gap-sm mb-sm">
            <span className="px-sm py-xs rounded-full bg-white/20 text-white text-para-xs font-bold uppercase tracking-widest">
              {COPY.states.s07.deliveredBadge}
            </span>
            <span className="text-white/60 text-para-xs">·</span>
            <span className="text-white/70 text-para-xs font-medium">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-h2-sm sm:text-h1-sm font-bold text-white mb-sm leading-tight">
            {COPY.states.s07.heading}
          </h1>
          <p className="text-para-md text-white/80 leading-relaxed max-w-xl">
            {COPY.states.s07.body}
          </p>
        </div>
        <div className="flex items-center gap-sm flex-shrink-0">
          <button
            onClick={onTestimonial}
            className="px-lg py-sm rounded-xl border border-white/30 bg-white/10 text-white text-para-sm font-medium hover:bg-white/20 transition-colors"
          >
            {COPY.states.s07.secondaryCta}
          </button>
          <button
            onClick={onDownload}
            disabled={!compositionId || isDownloading}
            className="flex items-center gap-xs px-lg py-sm rounded-xl bg-white text-green-700 text-para-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDownloading
              ? <span className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin" />
              : <FiDownload className="text-icon-sm" />
            }
            {isDownloading ? 'Preparing...' : 'Export JSON'}
          </button>
        </div>
      </div>

      {/* Main handoff grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">

        {/* Live Preview — 2 cols */}
        <div className="lg:col-span-2 bg-background-primary-2 rounded-2xl border border-border-default overflow-hidden">
          <div className="flex items-center justify-between px-lg py-md border-b border-border-default">
            <div className="flex items-center gap-sm">
              <FiExternalLink className="text-accent-default text-icon-sm" />
              <span className="text-para-md font-semibold text-text-primary">Live Preview</span>
            </div>
            {compositionId && (
              <a
                href={`/dashboard/client/compose/${compositionId}`}
                className="text-para-xs text-accent-default hover:underline flex items-center gap-xs"
              >
                Open full preview <FiExternalLink className="text-icon-xs" />
              </a>
            )}
          </div>
          <BrowserMockup projectId={projectId ?? undefined} />
        </div>

        {/* Handoff details — 1 col */}
        <div className="space-y-md">

          {/* Brand tokens */}
          <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg">
            <div className="flex items-center gap-sm mb-md">
              <FiPackage className="text-purple-500 text-icon-sm" />
              <h3 className="text-para-md font-semibold text-text-primary">Brand Tokens</h3>
            </div>
            {logoUrl && (
              <div className="mb-md">
                <p className="text-para-xs text-text-tertiary uppercase tracking-wide mb-xs">Logo</p>
                <img src={logoUrl} alt="Brand logo" className="h-8 w-auto object-contain" />
              </div>
            )}
            {brandColors.length > 0 ? (
              <div>
                <p className="text-para-xs text-text-tertiary uppercase tracking-wide mb-sm">Colors</p>
                <div className="flex flex-wrap gap-sm">
                  {brandColors.slice(0, 6).map((color, i) => (
                    <div key={i} className="flex items-center gap-xs">
                      <div className="w-6 h-6 rounded-md border border-border-default shadow-sm flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-para-xs text-text-secondary font-mono">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-para-xs text-text-tertiary">Tokens embedded in export JSON</p>
            )}
          </div>

          {/* Export */}
          <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg">
            <div className="flex items-center gap-sm mb-md">
              <FiCode className="text-emerald-500 text-icon-sm" />
              <h3 className="text-para-md font-semibold text-text-primary">Export</h3>
            </div>
            <div className="space-y-sm">
              <button
                onClick={onDownload}
                disabled={!compositionId || isDownloading}
                className="w-full flex items-center justify-between px-md py-sm rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-para-sm font-medium"
              >
                <span className="flex items-center gap-xs">
                  <FiDownload className="text-icon-xs" />
                  tandem_export.json
                </span>
                <span className="text-para-xs text-text-tertiary">Layout schema</span>
              </button>
              <div className="px-md py-sm rounded-xl bg-background-secondary border border-border-default">
                <p className="text-para-xs text-text-tertiary leading-relaxed">
                  Includes component IDs, content slots, brand tokens, image references, and section metadata. Import directly into your codebase or Figma plugin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component map */}
      {sections.length > 0 && (
        <div className="bg-background-primary-2 rounded-2xl border border-border-default p-xl mb-lg">
          <div className="flex items-center gap-sm mb-lg">
            <FiLayers className="text-accent-default text-icon-sm" />
            <h3 className="text-para-md font-semibold text-text-primary">Component Map</h3>
            <span className="ml-auto text-para-xs text-text-tertiary">{sections.length} sections</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {sections.map((section: any, i: number) => {
              const category = section.category ?? 'unknown';
              const slots = section.content_slots ?? {};
              const headingText = slots.hero_heading ?? slots.section_heading ?? slots.headline ?? null;
              return (
                <div key={i} className="flex items-start gap-md p-md rounded-xl border border-border-default bg-background-secondary">
                  <div className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center flex-shrink-0 mt-xs">
                    <FiCheckCircle className="text-accent-default text-icon-sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-xs mb-xs">
                      <span className="text-para-sm font-semibold text-text-primary capitalize">
                        {SECTION_LABELS[category] ?? category}
                      </span>
                      <span className="px-xs py-px rounded text-para-xs bg-background-muted text-text-tertiary font-mono">
                        {section.component_id ?? category}
                      </span>
                    </div>
                    {headingText && (
                      <p className="text-para-xs text-accent-default font-medium mb-xs truncate">"{headingText}"</p>
                    )}
                    <p className="text-para-xs text-text-tertiary leading-relaxed">
                      {SECTION_NOTES[category] ?? 'Custom section'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </motion.div>
  );
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

  const [compositionId, setCompositionId] = useState<string | null>(null);
  const [pageSchema, setPageSchema] = useState<any | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [projectName, setProjectName] = useState<string>('');

  const designerName = designerEmail
    ? designerEmail.split('@')[0].charAt(0).toUpperCase() + designerEmail.split('@')[0].slice(1)
    : devWarn('auth.user.designerName', COPY.fallbacks.designerName);

  const projectDomain = projectId
    ? devWarn('project.project_name', COPY.fallbacks.projectName)
    : COPY.fallbacks.projectName;

  const companyName = projectName || COPY.fallbacks.companyName;

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
        setProjectName(result.data.data.project_name ?? '');
      }
    } catch {
      // Fetch failed silently — dashboard shows state 00/01
    }
  };

  useEffect(() => { if (clientEmail) fetchProject(); }, [clientEmail]);

  const hasProject = !!projectId;
  const dashState  = getDashState(projectStatus, hasProject);

  useEffect(() => {
    if (dashState !== 7 || !projectId) return;
    getAllProjectCompose(projectId)
      .then((res) => {
        setCompositionId(res.composition_id);
        setPageSchema(res.page_schema ?? null);
      })
      .catch(() => {});
  }, [dashState, projectId]);

  const handleDownloadJson = async () => {
    if (!compositionId || isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadCompositionJson(compositionId);
    } catch {
      // silent
    } finally {
      setIsDownloading(false);
    }
  };

  const qaKey    = `s${dashState}` as keyof typeof COPY.quickActions.primaryLabel;
  const stageSub = dashState < 7 ? `Stage ${dashState} of 7` : COPY.states.s07.stageSub;

  const stateHeading = [
    '',
    COPY.states.s01.heading,
    COPY.states.s02.heading,
    COPY.states.s03.heading,
    COPY.states.s04.heading,
    COPY.states.s05.heading,
    COPY.states.s06.heading,
    COPY.states.s07.heading,
    COPY.states.s08.heading,
    COPY.states.s09.heading,
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
    COPY.states.s08.body,
    COPY.states.s09.body,
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
    COPY.states.s08.primaryCta,
    COPY.states.s09.primaryCta,
  ];

  const stateSecondaryCta = [
    undefined,
    undefined,
    COPY.states.s02.secondaryCta,
    undefined,
    COPY.states.s04.secondaryCta,
    COPY.states.s05.secondaryCta,
    COPY.states.s06.secondaryCta,
    COPY.states.s07.secondaryCta,
    COPY.states.s08.secondaryCta,
    COPY.states.s09.secondaryCta,
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
    COPY.states.s08.stageLabel,
    COPY.states.s09.stageLabel,
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
    COPY.states.s08.stageStatus,
    COPY.states.s09.stageStatus,
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
    COPY.states.s08.rightNow(designerName),
    COPY.states.s09.rightNow,
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
    COPY.states.s08.upNext,
    COPY.states.s09.upNext,
  ];

  const primaryRoute = [
    ROUTES.onboard,
    ROUTES.intake,
    ROUTES.scraper,
    ROUTES.swiper,
    ROUTES.compose,
    ROUTES.compose,
    ROUTES.compose,
    ROUTES.compose,
    ROUTES.testimonial,
    ROUTES.finalTestimonial,
  ];

  const secondaryRoute = [
    null,
    null,
    ROUTES.intake,
    ROUTES.intake,
    ROUTES.intake,
    ROUTES.testimonial,
    ROUTES.testimonial,
    ROUTES.finalTestimonial,
    ROUTES.finalTestimonial,
    ROUTES.compose,
  ];

  const qaPrimarySub = typeof COPY.quickActions.primarySub[qaKey] === 'function'
    ? (COPY.quickActions.primarySub[qaKey] as (d: string) => string)(estimatedHandoff)
    : COPY.quickActions.primarySub[qaKey] as string;

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
            {/* Breadcrumb — now uses real project_name */}
            <div className="flex items-center gap-xs mb-lg">
              <span className="px-sm py-xs rounded-full border border-border-default bg-background-primary-2 text-para-xs font-semibold text-accent-default uppercase tracking-wide">
                {COPY.brand}
              </span>
              <span className="text-text-tertiary text-para-xs">·</span>
              <span className="text-para-xs text-text-secondary font-medium">{companyName}</span>
            </div>

            {dashState === 7 ? (
              <HandoffScreen
                compositionId={compositionId}
                pageSchema={pageSchema}
                isDownloading={isDownloading}
                onDownload={handleDownloadJson}
                onTestimonial={() => navigate(secondaryRoute[dashState]!)}
                projectId={projectId}
              />
            ) : (
              <DashHero
                heading={stateHeading[dashState]}
                body={stateBody[dashState]}
                primaryCta={statePrimaryCta[dashState]}
                secondaryCta={stateSecondaryCta[dashState]}
                onPrimaryClick={() => navigate(primaryRoute[dashState])}
                onSecondaryClick={secondaryRoute[dashState] ? () => navigate(secondaryRoute[dashState]!) : () => {}}
              />
            )}

            <ProjectProgress
              projectStatus={projectStatus}
              stageLabel={stageLabel[dashState]}
              stageSub={stageSub}
              statusPill={stageStatus[dashState]}
              estHandoff={estimatedHandoff}
              rightNow={rightNow[dashState]}
              upNext={upNext[dashState]}
            />

            {dashState !== 7 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">
                <div className="lg:col-span-2">
                  <BrowserMockup />
                </div>
                <div className="lg:col-span-1">
                  <ProjectChecklist
                    title={COPY.checklist.title}
                    sub={COPY.checklist.sub}
                    items={getChecklistItems(projectStatus, estimatedHandoff)}
                  />
                </div>
              </div>
            )}
            {dashState === 7 && (
              <div className="mb-lg">
                <ProjectChecklist
                  title={COPY.states.s07.projectLog}
                  sub={COPY.states.s07.projectLogSub}
                  items={getChecklistItems(projectStatus, estimatedHandoff)}
                />
              </div>
            )}

            <div className="mb-lg">
              <p className="text-para-md font-bold text-text-primary mb-xs">{COPY.quickActions.title}</p>
              <p className="text-para-xs text-accent-default mb-md">{COPY.quickActions.sub}</p>
              <div className="grid grid-cols-2 gap-md">
                <QuickActionCard
                  icon={<></>}
                  label={COPY.quickActions.primaryLabel[qaKey]}
                  sub={qaPrimarySub}
                  onClick={dashState === 7 ? handleDownloadJson : () => navigate(primaryRoute[dashState])}
                  disabled={dashState === 7 && (!compositionId || isDownloading)}
                />
                <QuickActionCard
                  icon={<></>}
                  label={COPY.quickActions.secondaryLabel[qaKey]}
                  sub={COPY.quickActions.secondarySub[qaKey](designerName)}
                  onClick={secondaryRoute[dashState] ? () => navigate(secondaryRoute[dashState]!) : () => {}}
                  disabled={dashState === 1}
                />
              </div>
            </div>

            <DesignerCard designerName={designerName} />
          </>
        )}

      </div>
    </div>
  );
};

export default ClientDashHome;