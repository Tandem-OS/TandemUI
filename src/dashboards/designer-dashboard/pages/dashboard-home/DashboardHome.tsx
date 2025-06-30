import React, { type ReactNode, useState } from 'react';
import { RiArrowRightLine, RiLockLine, RiCheckLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDashboardData } from '../../../../mock-json-data/mockJsonData';
import ProgressRing from '../../../../comman-components/ProgressRing';
import ColorPicker from '../../../../comman-components/ColorPicker';
import { type AccentColor } from '../../../../types/component.types';

type PaddingSize = "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: PaddingSize;
  bgColor?: string;
}

const Card = ({ children, className = "", padding = "md", bgColor = "bg-white dark:bg-slate-900" }: CardProps) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  return (
    <div className={`${bgColor} rounded-2xl border border-slate-200 dark:border-slate-700 ${paddingClasses[padding]} shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

// Light Color System
const useAccentColor = () => {
  const [accentColor, setAccentColor] = useState<AccentColor>("blue");

  const colorSystem = {
    blue: {
      primary: "bg-blue-500",
      light: "bg-blue-50 dark:bg-blue-950/10",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-900/30",
      hover: "hover:bg-blue-50/50 dark:hover:bg-blue-950/10",
      glow: "shadow-blue-200/30 dark:shadow-blue-900/30",
      hex: "#3B82F6"
    },
    purple: {
      primary: "bg-purple-500",
      light: "bg-purple-50 dark:bg-purple-950/10",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-100 dark:border-purple-900/30",
      hover: "hover:bg-purple-50/50 dark:hover:bg-purple-950/10",
      glow: "shadow-purple-200/30 dark:shadow-purple-900/30",
      hex: "#A855F7"
    },
    emerald: {
      primary: "bg-emerald-500",
      light: "bg-emerald-50 dark:bg-emerald-950/10",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-900/30",
      hover: "hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10",
      glow: "shadow-emerald-200/30 dark:shadow-emerald-900/30",
      hex: "#10B981"
    },
    rose: {
      primary: "bg-rose-500",
      light: "bg-rose-50 dark:bg-rose-950/10",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-100 dark:border-rose-900/30",
      hover: "hover:bg-rose-50/50 dark:hover:bg-rose-950/10",
      glow: "shadow-rose-200/30 dark:shadow-rose-900/30",
      hex: "#F43F5E"
    },
    amber: {
      primary: "bg-amber-500",
      light: "bg-amber-50 dark:bg-amber-950/10",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-100 dark:border-amber-900/30",
      hover: "hover:bg-amber-50/50 dark:hover:bg-amber-950/10",
      glow: "shadow-amber-200/30 dark:shadow-amber-900/30",
      hex: "#F59E0B"
    }
  };

  return { accentColor, setAccentColor, colors: colorSystem[accentColor] };
};

// Types
type ProjectStatus = 'in-progress' | 'reviewing' | 'final-review' | 'completed';
type ProjectStage = 'swiper' | 'scraper' | 'testimonial' | 'finalReview';
type StageKey = 'intake' | 'swiper' | 'scraper' | 'testimonial' | 'finalReview';

// Status Tag
interface StatusTagProps {
  status: ProjectStatus;
  label: string;
  colors: any;
}

const StatusTag: React.FC<StatusTagProps> = ({ status, label, colors }) => {
  const statusStyles: Record<ProjectStatus, string> = {
    'in-progress': `${colors.light} ${colors.text} ${colors.border}`,
    'reviewing': 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/10 dark:text-amber-400 dark:border-amber-900/30',
    'final-review': 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-950/10 dark:text-violet-400 dark:border-violet-900/30',
    'completed': 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/10 dark:text-emerald-400 dark:border-emerald-900/30'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
      {label}
    </span>
  );
};

// Continue Button
interface ContinueButtonProps {
  stage: ProjectStage;
  colors: any;
  onClick?: () => void;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ stage, colors, onClick }) => {
  const stageLabels: Record<ProjectStage, string> = {
    'swiper': 'Swiper',
    'scraper': 'Scraper',
    'testimonial': 'Testimonials',
    'finalReview': 'Review'
  };

  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2.5 ${colors.primary} text-white rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:bg-opacity-80`}
    >
      {stageLabels[stage]}
      <RiArrowRightLine className="w-4 h-4" />
    </button>
  );
};

// Project Timeline
interface ProjectTimelineProps {
  stages: any;
  colors: any;
}

// Project Timeline with Fixed Tooltip
const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ stages, colors }) => {
  const stageNames: StageKey[] = ['intake', 'swiper', 'scraper', 'testimonial', 'finalReview'];
  const stageLabels: Record<StageKey, string> = {
    intake: 'Intake',
    swiper: 'Swiper',
    scraper: 'Scraper',
    testimonial: 'Testimonials',
    finalReview: 'Review'
  };

  const [hoveredStage, setHoveredStage] = useState<StageKey | null>(null);
  const completedStages = Object.values(stages).filter((s: any) => s.completed).length;
  const progressWidth = (completedStages / stageNames.length) * 100;

  // Function to get the previous stage that needs to be completed
  const getPreviousStageToComplete = (currentStage: StageKey): string => {
    const currentIndex = stageNames.indexOf(currentStage);
    if (currentIndex > 0) {
      const previousStage = stageNames[currentIndex - 1];
      return `Complete ${stageLabels[previousStage]} to unlock ${stageLabels[currentStage]}`;
    }
    return 'Complete previous stages to unlock';
  };

  return (
    <div className="relative w-full py-3">
      {/* Progress Line - Fixed thickness issue */}
      <div className="absolute max-lg:top-[35%] top-[38%] transform -translate-y-1/2 left-6 right-6 h-[2px] bg-slate-200 dark:bg-slate-700 rounded-full">
        <motion.div
          className={`h-full ${colors.primary} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${progressWidth}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ height: '2px' }}
          viewport={{ once: true }}
        />
      </div>

      <div className="flex items-center justify-between lg:px-4 relative z-10">
        {stageNames.map((stage) => {
          const isCompleted = stages[stage].completed;
          const isLocked = stages[stage].locked;

          return (
            <div
              key={stage}
              className="flex flex-col items-center relative"
              onMouseEnter={() => setHoveredStage(stage)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 cursor-pointer hover:shadow-md
                  ${isCompleted
                    ? 'bg-background-pastel-green text-black shadow-sm'
                    : isLocked
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-500'
                      : `bg-white dark:bg-slate-800 ${colors.text} border ${colors.border} shadow-sm`
                  }`}
              >
                {isCompleted ? (
                  <RiCheckLine className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : isLocked ? (
                  <RiLockLine className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <span className={`w-2 h-2 ${colors.primary} rounded-full`} />
                )}
              </div>

              <span className="text-para-xs mt-1.5 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
                {stageLabels[stage]}
              </span>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredStage === stage && isLocked && (
                  <motion.div
                    className="absolute bottom-full mb-2 px-2 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-para-xs rounded-lg shadow-xl"
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    {getPreviousStageToComplete(stage)}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-100" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const DashboardHome: React.FC = () => {
  const data = mockDashboardData;
  const { accentColor, setAccentColor, colors } = useAccentColor();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="space-y-8">
        {/* Welcome Header - Left Aligned, Minimal Spacing */}
        <motion.div
          className="text-left pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
            Welcome back, John ✨
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Your creative projects are progressing beautifully
          </p>
        </motion.div>

        {/* Top 3 Cards - Accent colors with opacity, fixed alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-full"
          >
            <Card
              bgColor={colors.light}
              className={`${colors.border} h-full flex flex-col items-center justify-between p-4`}
            >
              {/* Metric in Center */}
              <div className="flex-1 flex items-end justify-center">
                <ProgressRing
                  percentage={data.metrics.progressPercentage}
                  color={colors.hex}
                />
              </div>

              {/* Bottom Text */}
              <div className="w-full text-center py-4">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Overall Progress
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Across all projects
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Average Time Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="h-full"
          >
            <Card
              bgColor={colors.light}
              className={`${colors.border} h-full flex flex-col items-center justify-between p-4`}
            >
              {/* Metric in Center */}
              <div className="flex-1 flex items-end justify-center">
                <motion.div
                  className={`text-5xl font-bold ${colors.text}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {data.metrics.avgCompletionTime}
                  <span className="text-xl font-medium text-slate-600 dark:text-slate-400 ml-1">
                    days
                  </span>
                </motion.div>
              </div>

              {/* Bottom Text */}
              <div className="w-full text-center py-4">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Average Time
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  23% faster this month
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Conversion Rate Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="h-full"
          >
            <Card
              bgColor={colors.light}
              className={`${colors.border} h-full flex flex-col items-center justify-between p-4`}
            >
              {/* Metric in Center */}
              <div className="flex-1 flex items-end justify-center">
                <motion.div
                  className={`text-5xl font-bold ${colors.text}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {data.metrics.conversionRate.percentage}%
                </motion.div>
              </div>

              {/* Bottom Text */}
              <div className="w-full text-center py-4">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Conversion Rate
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {data.metrics.conversionRate.clientsOnboarded} clients converted
                </p>
              </div>
            </Card>
          </motion.div>
        </div>


        {/* Current Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Active Projects</h2>
          <Card className={`${colors.light} ${colors.border} p-4`}>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Mobile Layout */}
                  <div className="block lg:hidden space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-xl ${colors.light} flex items-center justify-center`}>
                            <span className={`text-sm font-bold ${colors.text}`}>{project.progress}%</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-background-pastel-green rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">{project.name}</h4>
                          <StatusTag status={project.status as ProjectStatus} label={project.statusLabel} colors={colors} />
                        </div>
                      </div>
                    </div>

                    <ProjectTimeline stages={project.stages} colors={colors} />

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className={`w-8 h-8 rounded-lg ${colors.light} flex items-center justify-center`}>
                          <span className="text-xs font-semibold">{project.feedbackThreads}</span>
                        </div>
                        <span>Feedback</span>
                      </div>
                      <div className="flex-1 max-w-[140px]">
                        <ContinueButton stage={project.currentStage as ProjectStage} colors={colors} />
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-xl ${colors.light} flex items-center justify-center`}>
                          <span className={`text-lg font-bold ${colors.text}`}>{project.progress}%</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background-pastel-green rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{project.name}</h4>
                        <StatusTag status={project.status as ProjectStatus} label={project.statusLabel} colors={colors} />
                      </div>
                    </div>

                    <div className="col-span-5">
                      <ProjectTimeline stages={project.stages} colors={colors} />
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className={`w-8 h-8 rounded-lg ${colors.light} flex items-center justify-center`}>
                          <span className="text-xs font-semibold">{project.feedbackThreads}</span>
                        </div>
                        <span>Feedback</span>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <ContinueButton stage={project.currentStage as ProjectStage} colors={colors} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Projects Link */}
            <div className="flex justify-end mt-4">
              <motion.a
                href="#"
                className={`inline-flex items-center gap-2 ${colors.text} font-medium hover:gap-3 transition-all duration-200`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                View All Projects
                <RiArrowRightLine className="w-4 h-4" />
              </motion.a>
            </div>
          </Card>
        </motion.div>

        {/* Customer Satisfaction - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className={`${colors.light} ${colors.border}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Customer Satisfaction</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Overall happiness rating</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">😊</span>
                <span className="text-2xl font-bold text-slate-800 dark:text-white">{data.customerSatisfaction.overall}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(data.customerSatisfaction.byStage).map(([stage, stats], index) => (
                <motion.div
                  key={stage}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700 hover:shadow-lg duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                >
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 capitalize mb-2">After {stage}</p>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{stats.rating}/10</div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    {stats.happy}/{stats.total} happy
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Project Overview & Taste Trends - Same Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card className={`${colors.light} ${colors.border} h-full`}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Project Overview</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <motion.div
                    className={`text-3xl font-bold ${colors.text} mb-1`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    {data.projectStats.totalActive}
                  </motion.div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Active</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Projects</p>
                </div>
                <div className="text-center border-x border-slate-200 dark:border-slate-700">
                  <motion.div
                    className={`text-3xl font-bold ${colors.text} mb-1`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  >
                    {data.projectStats.approvalRate}%
                  </motion.div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Approval</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Rate</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className={`text-3xl font-bold ${colors.text} mb-1`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    {data.projectStats.avgProjectTime}d
                  </motion.div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Avg Time</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">To Complete</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Taste Trends */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Card className={`${colors.light} ${colors.border} h-full`}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Taste Trends</h3>
              <div className="space-y-3">
                <p className="text-base text-slate-600 dark:text-slate-400">
                  This week, <span className={`font-semibold ${colors.text} text-lg`}>{data.tasteTrend.percentage}%</span> of clients chose
                </p>
                <p className={`text-2xl font-bold ${colors.text}`}>
                  {data.tasteTrend.trend}
                </p>
                <div className="pt-2">
                  <motion.div
                    className={`w-full h-2 ${colors.light} rounded-full overflow-hidden`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <motion.div
                      className={`h-full ${colors.primary} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${data.tasteTrend.percentage}%` }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* View Recent Projects Link at the end */}
        <motion.div
          className="flex justify-end pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <motion.a
            href="#"
            className={`inline-flex items-center gap-2 ${colors.text} font-medium hover:gap-3 transition-all duration-200`}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            View Recent Projects
            <RiArrowRightLine className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Fixed Color Picker - Top Right Position */}
      <ColorPicker accentColor={accentColor} setAccentColor={setAccentColor} />
    </div>
  );
};

export default DashboardHome;