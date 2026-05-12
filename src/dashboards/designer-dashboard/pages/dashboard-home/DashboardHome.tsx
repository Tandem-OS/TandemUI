import React, { type ReactNode, useState, useEffect } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { mockDashboardData } from '../../../../mock-data/designer-dash-home.mock.';
import { type AccentColor } from '../../../../types/component.types';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { BsTags } from "react-icons/bs";
import activeProjectChart from "@/assets/images/active-project-chart.svg"
import linkChartIcon from "@/assets/images/link-chart.svg"
import orangeLinkChart from "@/assets/images/orangeLinkChart.svg"
import blueLineChart from "@/assets/images/blueLinkChart.svg"
import ColorPicker from '@/common-components/ColorPicker';
import { getAllProjectsByDesignerEmail } from '@/lib/requests/ProjectRequest';
import { getDesignerStats } from '@/lib/requests/AnalyticsRequest';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

// ─── Pipeline helpers ────────────────────────────────────────────────────────

type StageKey = 'intake' | 'scraping' | 'swiping' | 'embedded' | 'composing' | 'refining' | 'revisions' | 'completed' | 'handoff';
type ProjectStage = 'swiper' | 'scraper' | 'testimonial' | 'finalReview';
type ProjectStatus = 'in-progress' | 'reviewing' | 'final-review' | 'completed';

const PIPELINE_ORDER: StageKey[] = ['intake', 'scraping', 'swiping', 'embedded', 'composing', 'refining', 'revisions', 'completed', 'handoff'];

const STATUS_TO_PROGRESS: Record<string, number> = {
  intake: 10, scraping: 20, swiping: 35, embedded: 45,
  composing: 55, refining: 65, revisions: 75, completed: 90, handoff: 100,
};

const STATUS_TO_STAGE: Record<string, ProjectStage> = {
  intake: 'scraper', scraping: 'scraper', swiping: 'swiper',
  embedded: 'swiper', composing: 'swiper', refining: 'swiper',
  revisions: 'finalReview', completed: 'finalReview', handoff: 'finalReview',
};

const STATUS_TO_UI: Record<string, { status: ProjectStatus; label: string }> = {
  intake: { status: 'in-progress', label: 'In Progress' },
  scraping: { status: 'in-progress', label: 'In Progress' },
  swiping: { status: 'in-progress', label: 'In Progress' },
  embedded: { status: 'reviewing', label: 'Reviewing' },
  composing: { status: 'reviewing', label: 'Reviewing' },
  refining: { status: 'reviewing', label: 'Reviewing' },
  revisions: { status: 'final-review', label: 'Final Review' },
  completed: { status: 'completed', label: 'Completed' },
  handoff: { status: 'completed', label: 'Completed' },
};

const deriveStages = (apiStatus: string): Record<StageKey, { completed: boolean; active: boolean }> => {
  const currentIdx = PIPELINE_ORDER.indexOf(apiStatus as StageKey);
  return Object.fromEntries(
    PIPELINE_ORDER.map((stage, idx) => [
      stage,
      { completed: idx < currentIdx, active: idx === currentIdx }
    ])
  ) as Record<StageKey, { completed: boolean; active: boolean }>;
};

// ─── Trend helper ─────────────────────────────────────────────────────────────
// higher is better: approval_rate, conversion_rate
// lower is better: avg_days

interface TrendResult {
  isUp: boolean;
  color: string;
  icon: React.ReactNode;
  label: string;
}

const getTrend = (value: number, threshold: number, lowerIsBetter = false): TrendResult => {
  const isUp = lowerIsBetter ? value <= threshold : value >= threshold;
  return {
    isUp,
    color: isUp ? 'text-emerald-600' : 'text-red-500',
    icon: isUp
      ? <FaArrowTrendUp className="text-emerald-600" />
      : <FaArrowTrendDown className="text-red-500" />,
    label: isUp ? 'Good' : 'Needs work',
  };
};

// ─── API project shape ───────────────────────────────────────────────────────

interface ApiProject {
  id: string;
  project_name: string;
  status: string;
  client_email: string;
  last_updated: string;
}

interface UiProject {
  id: string;
  name: string;
  status: ProjectStatus;
  statusLabel: string;
  progress: number;
  stages: Record<StageKey, { completed: boolean; active: boolean }>;
  feedbackThreads: number;
  currentStage: ProjectStage;
  apiStatus: string;
}

const normaliseProject = (p: ApiProject): UiProject => ({
  id: p.id,
  name: p.project_name,
  status: STATUS_TO_UI[p.status]?.status ?? 'in-progress',
  statusLabel: STATUS_TO_UI[p.status]?.label ?? p.status,
  progress: STATUS_TO_PROGRESS[p.status] ?? 0,
  stages: deriveStages(p.status),
  feedbackThreads: 0,
  currentStage: STATUS_TO_STAGE[p.status] ?? 'scraper',
  apiStatus: p.status,
});

// ─── Shared sub-components ───────────────────────────────────────────────────

type PaddingSize = "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: PaddingSize;
  bgColor?: string;
}

const Card = ({ children, className = "", padding = "md", bgColor = "bg-background-primary-2" }: CardProps) => {
  const paddingClasses = { sm: "p-md", md: "p-lg", lg: "p-xl" };
  return (
    <div className={`${bgColor} rounded-2xl border border-border-default ${paddingClasses[padding]} shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

const ActiveProjectIcon: React.FC<{ className?: string }> = ({ className }) => (
  <img src={activeProjectChart} alt="Active Projects Icon" className={className || "w-[40px] h-[40px]"} />
);

const useAccentColor = () => {
  const [accentColor, setAccentColor] = useState<AccentColor>("blue");
  const colorSystem = {
    blue: { primary: "bg-blue-500", light: "bg-blue-50 dark:bg-blue-950/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-100 dark:border-blue-900/30", hover: "hover:bg-blue-50/50 dark:hover:bg-blue-950/10", hex: "#3B82F6" },
    purple: { primary: "bg-purple-500", light: "bg-purple-50 dark:bg-purple-950/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-100 dark:border-purple-900/30", hover: "hover:bg-purple-50/50 dark:hover:bg-purple-950/10", hex: "#A855F7" },
    emerald: { primary: "bg-emerald-500", light: "bg-emerald-50 dark:bg-emerald-950/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-100 dark:border-emerald-900/30", hover: "hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10", hex: "#10B981" },
    rose: { primary: "bg-rose-500", light: "bg-rose-50 dark:bg-rose-950/10", text: "text-rose-600 dark:text-rose-400", border: "border-rose-100 dark:border-rose-900/30", hover: "hover:bg-rose-50/50 dark:hover:bg-rose-950/10", hex: "#F43F5E" },
    amber: { primary: "bg-amber-500", light: "bg-amber-50 dark:bg-amber-950/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-100 dark:border-amber-900/30", hover: "hover:bg-amber-50/50 dark:hover:bg-amber-950/10", hex: "#F59E0B" },
  };
  return { accentColor, setAccentColor, colors: colorSystem[accentColor] };
};

interface StatusTagProps { status: ProjectStatus; label: string; colors: any; }
const StatusTag: React.FC<StatusTagProps> = ({ status, label, colors }) => {
  const statusStyles: Record<ProjectStatus, string> = {
    'in-progress': `${colors.light} ${colors.text} ${colors.border}`,
    'reviewing': 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/10 dark:text-amber-400 dark:border-amber-900/30',
    'final-review': 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-950/10 dark:text-violet-400 dark:border-violet-900/30',
    'completed': 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/10 dark:text-emerald-400 dark:border-emerald-900/30',
  };
  return (
    <div className="w-full flex justify-center">
      <span className={`w-full px-sm py-xs flex justify-center rounded-full text-para-xs font-medium border ${statusStyles[status]}`}>
        {label}
      </span>
    </div>
  );
};

interface ContinueButtonProps { stage: ProjectStage; colors: any; onClick?: () => void; }
const ContinueButton: React.FC<ContinueButtonProps> = ({ stage, colors, onClick }) => {
  const stageLabels: Record<ProjectStage, string> = { swiper: 'Swiper', scraper: 'Scraper', testimonial: 'Testimonials', finalReview: 'Review' };
  return (
    <button onClick={onClick} className={`w-full px-md py-sm ${colors.primary} text-white rounded-full font-medium text-para-sm transition-all duration-200 flex items-center justify-center gap-sm shadow-sm hover:shadow-lg ${colors.hover}`}>
      {stageLabels[stage]}
      <RiArrowRightLine className="w-4 h-4" />
    </button>
  );
};

interface ProjectTimelineProps {
  stages: Record<StageKey, { completed: boolean; active: boolean }>;
  colors: any;
  apiStatus: string;
}
const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ colors, apiStatus }) => {
  const stageLabels: Record<StageKey, string> = {
    intake: 'Intake', scraping: 'Scraping', swiping: 'Swiping',
    embedded: 'Embedded', composing: 'Composing', refining: 'Refining',
    revisions: 'Revisions', completed: 'Completed', handoff: 'Handoff',
  };

  const currentIdx = PIPELINE_ORDER.indexOf(apiStatus as StageKey);
  const progressWidth = currentIdx >= 0 ? (currentIdx / (PIPELINE_ORDER.length - 1)) * 100 : 0;

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[14px] bg-border-muted rounded-full overflow-hidden">
        <motion.div
          className={`absolute left-0 top-0 h-full ${colors.primary} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${progressWidth}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[14px] flex items-center justify-between">
        {PIPELINE_ORDER.map((stage) => (
          <div key={stage} className="w-[10px] h-[10px] rounded-full z-10 flex-shrink-0 bg-white" />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2">
        {PIPELINE_ORDER.map((stage, idx) => {
          const isActive = idx === currentIdx;
          return (
            <span key={stage} className={`text-[9px] font-medium whitespace-nowrap ${isActive ? `${colors.text} font-bold` : 'text-text-secondary'}`}>
              {stageLabels[stage]}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ─── Designer stats shape ─────────────────────────────────────────────────────

interface DesignerStats {
  approval_rate: number;
  avg_days: number;
  conversion_rate: number;
  total_projects: number;
}

// ─── Main component ───────────────────────────────────────────────────────────

function DashboardHome() {
  const data = mockDashboardData;
  const { accentColor, setAccentColor, colors } = useAccentColor();
  const [projects, setProjects] = useState<UiProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DesignerStats>({ approval_rate: 0, avg_days: 0, conversion_rate: 0, total_projects: 0 });
  const email = useSelector((state: RootState) => state.auth.user.email);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getAllProjectsByDesignerEmail();
        const payload = result.data?.data ?? result.data;
        if (result.status === 200 && Array.isArray(payload)) {
          setProjects(payload.map((p: ApiProject) => normaliseProject(p)));
        }
      } catch (e) {
        console.error('Failed to fetch projects', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!email) return;
    getDesignerStats(email)
      .then((res) => setStats(res.data))
      .catch(() => { });
  }, [email]);

  // ── Trend calculations ────────────────────────────────────────────────────
  // approval_rate: good if >= 70%
  // avg_days: good if <= 7 days (lower is better)
  // conversion_rate: good if >= 60%
  const approvalTrend = getTrend(stats.approval_rate, 70);
  const avgDaysTrend = getTrend(stats.avg_days, 7, true);
  const conversionTrend = getTrend(stats.conversion_rate, 60);

  return (
    <div className="min-h-screen">
      <div className="space-y-xl">

        {/* Top 3 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">

          {/* Card 1 — Approval Rate */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }} transition={{ duration: 0.4, delay: 0.1 }} className="h-full">
            <div className={`relative ${colors.light} rounded-2xl p-6 shadow-md flex flex-col justify-between h-full min-h-[200px]`}>
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-background-secondary-2 p-2 rounded-full flex items-center justify-center text-text-secondary dark:text-lightSecondary"><BsTags /></div>
                <div className={`bg-background-secondary-2 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2 ${approvalTrend.color}`}>
                  {approvalTrend.icon}
                  {approvalTrend.label}
                </div>
              </div>
              <div className="mt-12">
                <h3 className={`text-4xl font-bold ${colors.text}`}>{stats.approval_rate}%</h3>
                <p className="text-para-sm text-text-secondary mt-1">Across all projects</p>
              </div>
              <div className="absolute right-4 bottom-4 w-10 h-10 bg-background-secondary-2 p-2 rounded-full flex items-center justify-center">
                <span className="text-text-secondary inline-block rotate-[-45deg]">→</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Avg Days */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }} className="h-full">
            <div className={`relative ${colors.light} rounded-2xl p-6 shadow-md flex flex-col justify-between h-full min-h-[200px]`}>
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-background-secondary-2 text-gray-600 p-2 rounded-full flex items-center justify-center"><BsTags /></div>
                <div className={`bg-background-secondary-2 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2 ${avgDaysTrend.color}`}>
                  {avgDaysTrend.icon}
                  {stats.avg_days > 0 ? `${stats.avg_days} day avg` : 'No data yet'}
                </div>
              </div>
              <div className="mt-12">
                <h3 className={`text-4xl font-bold ${colors.text}`}>{stats.avg_days} days</h3>
                <p className="text-gray-500 text-sm mt-1">Average Time</p>
              </div>
              <div className="absolute right-4 bottom-4 w-10 h-10 bg-background-secondary-2 p-2 rounded-full flex items-center justify-center">
                <span className="text-gray-500 inline-block rotate-[-45deg]">→</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3 — Conversion Rate */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }} className="h-full">
            <div className="relative bg-card-gradient text-white rounded-2xl p-6 shadow-md flex flex-col justify-between h-full min-h-[200px] bg-[linear-gradient(180deg,_#4D43E4_26.44%,_rgba(132,_125,_236,_0.689189)_99.99%,_rgba(255,_255,_255,_0)_100%)]">
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-background-secondary-2 text-blue-violet p-2 rounded-full flex items-center justify-center"><BsTags /></div>
                <div className={`bg-background-secondary-2 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2 ${conversionTrend.color}`}>
                  {conversionTrend.icon}
                  {stats.total_projects} total projects
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-4xl font-bold">{stats.conversion_rate}%</h3>
                <p className="text-white/80 text-sm mt-1">Conversion Rate</p>
              </div>
              <div className="absolute right-4 bottom-4 w-10 h-10 bg-transparent border p-2 rounded-full flex items-center justify-center">
                <span className="text-white inline-block rotate-[-45deg]">→</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Active Projects */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
          <Card padding="md">
            <div className="flex gap-4 items-center">
              <ActiveProjectIcon />
              <h2 className="text-h4-sm font-bold text-text-primary">Active Projects</h2>
            </div>

            <div className="space-y-md mt-4">
              {isLoading ? (
                <div className="py-xl text-center text-text-secondary text-para-sm">Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="py-xl text-center text-text-secondary text-para-sm">No active projects found.</div>
              ) : (
                projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className={`bg-background-primary-2 rounded-xl p-md border transition-all duration-200 hover:shadow-lg ${colors.border} ${colors.hover}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-md items-start lg:items-center space-y-md lg:space-y-0">
                      <div className="lg:col-span-3 flex gap-lg items-start">
                        <span className={`font-bold text-para-sm lg:text-para-lg mt-1 ${colors.text}`}>{project.progress}%</span>
                        <div>
                          <h4 className="font-semibold text-text-primary mb-[2px]">{project.name}</h4>
                          <StatusTag status={project.status} label={project.statusLabel} colors={colors} />
                        </div>
                      </div>
                      <div className="lg:col-span-5 w-full">
                        <ProjectTimeline stages={project.stages} colors={colors} apiStatus={project.apiStatus} />
                      </div>
                      <div className="lg:col-span-2 flex justify-between items-center w-full lg:justify-center">
                        <span className="text-para-xs font-semibold underline text-text-secondary">
                          {project.feedbackThreads} Feedback
                        </span>
                      </div>
                      <div className="lg:col-span-2 w-full lg:w-auto">
                        <div className="max-w-[140px] lg:max-w-full ml-auto lg:ml-0">
                          <ContinueButton stage={project.currentStage} colors={colors} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="flex justify-center mt-md">
              <motion.a href="#" className={`inline-flex items-center gap-sm rounded-full px-sm py-xs font-medium border transition-all duration-200 ${colors.border} ${colors.text} ${colors.hover}`} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                View All Projects
                <RiArrowRightLine className="w-4 h-4" />
              </motion.a>
            </div>
          </Card>
        </motion.div>

        {/* Customer Satisfaction + Project Overview + Taste Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
              <Card className={`${colors.light} ${colors.border}`}>
                <div className="flex items-center justify-between mb-lg">
                  <div className="flex gap-4 items-center">
                    <ActiveProjectIcon />
                    <h3 className="text-h4-sm font-bold text-text-primary">Customer Satisfaction</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                  {Object.entries(data.customerSatisfaction.byStage).map(([stage, stats], index) => (
                    <motion.div key={stage} className="bg-background-primary-2 rounded-lg p-lg text-center border border-border-default hover:shadow-lg duration-300" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }} transition={{ delay: index * 0.1, duration: 0.3 }}>
                      <p className="text-para-sm font-medium text-text-secondary capitalize mb-sm">After {stage}</p>
                      <div className="text-h3-sm font-bold text-text-primary mb-xs">{stats.rating}/10</div>
                      <p className="text-para-sm text-text-tertiary">{stats.happy}/{stats.total} happy</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <div className="mt-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
                <Card className={`${colors.light} ${colors.border} h-full`}>
                  <div className="flex gap-4 items-center mb-md">
                    <ActiveProjectIcon />
                    <h3 className="text-h4-sm font-bold text-text-primary">Project Overview</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-md">
                    <div className="flex gap-4 items-center">
                      <img src={linkChartIcon} alt="" className="w-[40px] h-[40px]" />
                      <div>
                        <motion.div className={`text-h1-sm font-bold ${colors.text} mb-xs`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.3 }}>
                          {stats.total_projects}
                        </motion.div>
                        <p className="text-para-sm font-medium text-text-primary">Active Projects</p>
                      </div>
                    </div>
                    <div className="border-x border-border-default flex gap-4 items-center">
                      <img src={orangeLinkChart} alt="" className="w-[40px] h-[40px]" />
                      <div>
                        <motion.div className={`text-h1-sm font-bold ${colors.text} mb-xs`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.3 }}>
                          {stats.approval_rate}%
                        </motion.div>
                        <p className="text-para-sm font-medium text-text-primary">Approval Rate</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <img src={blueLineChart} alt="" className="w-[40px] h-[40px]" />
                      <div>
                        <motion.div className={`text-h1-sm font-bold ${colors.text} mb-xs`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.3 }}>
                          {stats.avg_days > 0 ? `${stats.avg_days}` : '—'}
                        </motion.div>
                        <p className="text-para-sm font-medium text-text-primary">Avg Time To Complete</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col h-full">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.7 }} className="h-full">
              <Card className={`${colors.light} ${colors.border} h-full flex flex-col`}>
                <div className="flex gap-4 items-center">
                  <ActiveProjectIcon />
                  <h3 className="text-h4-sm font-bold text-text-primary">Taste Trends</h3>
                </div>
                <div className="flex flex-col justify-center items-center text-center flex-grow">
                  <p className="text-para-md text-text-secondary mb-md">
                    This week, <span className={`font-semibold ${colors.text} text-para-lg`}>{data.tasteTrend.percentage}%</span> of clients chose
                  </p>
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <defs>
                        <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#7F5AF0" />
                          <stop offset="100%" stopColor="#2CBDF9" />
                        </linearGradient>
                      </defs>
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E5E7EB" strokeWidth="3.5" />
                      <motion.circle cx="18" cy="18" r="15.915" fill="none" stroke="url(#gradientStroke)" strokeWidth="3.5" strokeDasharray={`${2 * Math.PI * 15.915}`} strokeDashoffset={2 * Math.PI * 15.915} initial={{ strokeDashoffset: 2 * Math.PI * 15.915 }} animate={{ strokeDashoffset: (1 - data.tasteTrend.percentage / 100) * 2 * Math.PI * 15.915 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }} strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className={`mt-md text-h3-sm font-bold ${colors.text}`}>{data.tasteTrend.trend}</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div className="flex justify-end pt-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.8 }}>
          <motion.a href="/dashboard/designer/my-project" className={`inline-flex items-center gap-sm ${colors.text} font-medium hover:gap-sm transition-all duration-200`} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            View Recent Projects
            <RiArrowRightLine className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>

      <ColorPicker accentColor={accentColor} setAccentColor={setAccentColor} />
    </div>
  );
}

export default DashboardHome;