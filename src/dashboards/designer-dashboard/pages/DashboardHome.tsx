import React, { type ReactNode } from 'react';
import { RiArrowRightLine, RiLockLine, RiCheckLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { mockDashboardData } from '../../../mock-json-data/mockJsonData';

type PaddingSize = "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: PaddingSize;
}

// Mock Card Component (since we don't have the original)
const Card = ({ children, className = "", padding = "md" }: CardProps) => {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  };

  return (
    <div className={`rounded-xl border ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};


// Define types for better TypeScript support
type ProjectStatus = 'in-progress' | 'reviewing' | 'final-review' | 'completed';
type ProjectStage = 'swiper' | 'scraper' | 'testimonial' | 'finalReview';
type StageKey = 'intake' | 'swiper' | 'scraper' | 'testimonial' | 'finalReview';

// Progress Ring Component
interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-3xl font-bold text-white">
            {percentage}%
          </span>
        </motion.div>
      </div>
    </div>
  );
};

// Status Tag Component
interface StatusTagProps {
  status: ProjectStatus;
  label: string;
}

const StatusTag: React.FC<StatusTagProps> = ({ status, label }) => {
  const statusColors: Record<ProjectStatus, string> = {
    'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'reviewing': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'final-review': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'completed': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {label}
    </span>
  );
};

// Continue Button Component - Full Width on Desktop
interface ContinueButtonProps {
  stage: ProjectStage;
  onClick?: () => void;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ stage, onClick }) => {
  const stageLabels: Record<ProjectStage, string> = {
    'swiper': 'Swiper',
    'scraper': 'Scraper',
    'testimonial': 'Testimonials',
    'finalReview': 'Final Review'
  };

  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 bg-accent-default hover:accent-accent-default-dark text-white rounded-lg font-medium text-sm hover:from-violet-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-purple-500/10"
    >
      {stageLabels[stage]}
      <RiArrowRightLine className="w-4 h-4" />
    </button>
  );
};

// Project Timeline Component - Mobile Optimized
interface ProjectTimelineProps {
  stages: any;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ stages }) => {
  const stageNames: StageKey[] = ['intake', 'swiper', 'scraper', 'testimonial', 'finalReview'];
  const stageLabels: Record<StageKey, string> = {
    intake: 'Intake',
    swiper: 'Swiper',
    scraper: 'Scraper',
    testimonial: 'Testimonial',
    finalReview: 'Review'
  };

  const completedStages = Object.values(stages).filter((s: any) => s.completed).length;
  const progressWidth = (completedStages / stageNames.length) * 100;

  return (
    <div className="relative w-full overflow-x-auto overflow-y-hidden">
      {/* Progress Bar - Now positioned behind the circles */}
      <div className="absolute top-4 sm:top-5 left-6 right-6 h-0.5 bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      <div className="flex items-center justify-between min-w-[300px] px-2 relative z-10">
        {stageNames.map((stage) => {
          const isCompleted = stages[stage].completed;
          const isLocked = stages[stage].locked;

          return (
            <div
              key={stage}
              className="flex flex-col items-center flex-shrink-0"
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-300 relative
                  ${isCompleted
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md shadow-green-500/20'
                    : isLocked
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-2 border-slate-300 dark:border-slate-600'
                  }`}
              >
                {isCompleted ? (
                  <div>
                    <RiCheckLine className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                ) : isLocked ? (
                  <RiLockLine className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full" />
                )}
              </div>
              <span className="text-[10px] sm:text-xs mt-1 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
                {stageLabels[stage]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DashboardHome: React.FC = () => {
  const data = mockDashboardData;

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Top Metrics Row - Same Height Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Progress Ring - Changed to Red with Dark Red Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <Card className="bg-gradient-to-br from-red-500 via-red-600 to-red-500 dark:from-red-500 dark:via-red-600 dark:to-red-500 border-0 shadow-md h-full" padding="lg">
            <div className="flex flex-col items-center justify-center h-full">
              <ProgressRing percentage={data.metrics.progressPercentage} />
              <p className="text-sm font-medium text-white mt-3">Overall Progress</p>
            </div>
          </Card>
        </motion.div>

        {/* Average Time - Electric Blue/Cyan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-full"
        >
          <Card className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 dark:from-blue-600 dark:via-cyan-600 dark:to-teal-600 border-0 shadow-md h-full" padding="lg">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="flex items-baseline gap-2">
                <motion.h2
                  className="text-5xl lg:text-6xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {data.metrics.avgCompletionTime}
                </motion.h2>
                <span className="text-lg font-medium text-white">days</span>
              </div>
              <p className="text-sm font-medium text-white mt-2">Average Completion Time</p>
              <motion.div
                className="mt-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-xs font-semibold text-white">⚡ 23% faster this month</span>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Conversion - Vibrant Green/Lime */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-full"
        >
          <Card className="bg-gradient-to-br from-green-500 via-emerald-500 to-lime-500 dark:from-green-600 dark:via-emerald-600 dark:to-lime-600 border-0 shadow-md h-full" padding="lg">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.div
                className="text-5xl lg:text-6xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {data.metrics.conversionRate.percentage}%
              </motion.div>
              <p className="text-sm font-medium text-white mt-2">Conversion Rate</p>
              <motion.div
                className="mt-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                    />
                  ))}
                </div>
                <span className="text-xs text-white">
                  {data.metrics.conversionRate.clientsOnboarded} converted
                </span>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Current Projects Section - Fixed hover effects and animations */}
      <Card className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 shadow-sm" padding="md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Current Projects</h3>
        </div>

        <div className="space-y-3">
          {data.projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30 border border-slate-300 dark:border-slate-600 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Mobile Layout */}
              <div className="block lg:hidden space-y-3">
                {/* Project Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-accent-default/10 flex items-center justify-center">
                        <span className="text-base font-bold text-accent-default">{project.progress}%</span>
                      </div>
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{project.name}</h4>
                      <StatusTag status={project.status as ProjectStatus} label={project.statusLabel} />
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="w-full -mx-1 px-1">
                  <ProjectTimeline stages={project.stages} />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2">
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="text-xs font-semibold">{project.feedbackThreads}</span>
                    </div>
                    <span>Feedback</span>
                  </a>
                  <div className="flex-1 max-w-[140px]">
                    <ContinueButton stage={project.currentStage as ProjectStage} />
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-accent-default/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-accent-default">{project.progress}%</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{project.name}</h4>
                    <StatusTag status={project.status as ProjectStatus} label={project.statusLabel} />
                  </div>
                </div>

                <div className="col-span-5">
                  <ProjectTimeline stages={project.stages} />
                </div>

                <div className="col-span-2 text-center">
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="text-xs font-semibold">{project.feedbackThreads}</span>
                    </div>
                    <span>Feedback</span>
                  </a>
                </div>

                <div className="col-span-2">
                  <ContinueButton stage={project.currentStage as ProjectStage} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 transition-colors flex items-center gap-2"
          >
            View All Projects
            <RiArrowRightLine className="w-4 h-4" />
          </button>
        </div>
      </Card>

      {/* Customer Satisfaction Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-amber-300/50 dark:border-amber-700/50" padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Customer Satisfaction</h3>
            <div className="flex items-center gap-2">
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                😊
              </motion.span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{data.customerSatisfaction.overall}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(data.customerSatisfaction.byStage).map(([stage, stats], index) => (
              <motion.div
                key={stage}
                className="bg-white/60 dark:bg-slate-900/40 rounded-lg p-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 capitalize mb-1">After {stage}</p>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{stats.rating}/10</div>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  {stats.happy}/{stats.total} happy
                </p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Combined Metrics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10 border-purple-300/50 dark:border-purple-700/50 h-full" padding="md">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Project Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {data.projectStats.totalActive}
                </motion.div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Active Projects</p>
              </div>
              <div className="text-center border-x border-purple-200/50 dark:border-purple-700/30">
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {data.projectStats.approvalRate}%
                </motion.div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Approval Rate</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {data.projectStats.avgProjectTime}d
                </motion.div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Avg Time</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Taste Trend Snapshot */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/10 border-teal-300/50 dark:border-teal-700/50 overflow-hidden h-full" padding="md">
            <div className="flex items-center justify-between h-full">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Taste Trends</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  This week, <span className="font-semibold text-teal-600 dark:text-teal-400">{data.tasteTrend.percentage}%</span> of clients chose
                </p>
                <p className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mt-1">
                  {data.tasteTrend.trend}
                </p>
              </div>
              <div className="relative">
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-teal-200 to-cyan-200 dark:from-teal-800/30 dark:to-cyan-800/30 rounded-2xl"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-4 bg-white/50 dark:bg-slate-900/30 rounded-xl backdrop-blur-sm" />
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recently Completed Projects Button */}
      <div className="flex justify-end">
        <button
          className="text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 transition-colors flex items-center gap-2"
        >
          View Recently Completed Projects
          <RiArrowRightLine className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;