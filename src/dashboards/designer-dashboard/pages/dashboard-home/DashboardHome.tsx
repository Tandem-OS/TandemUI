import React, { type ReactNode, useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDashboardData } from '../../../../mock-data/designer-dash-home.mock.';
// import ProgressRing from '../../../../comman-components/ProgressRing';
import { type AccentColor } from '../../../../types/component.types';
import { FaArrowTrendUp } from "react-icons/fa6";
import { BsTags } from "react-icons/bs";
import activeProjectChart from "@/assets/images/active-project-chart.svg"
import linkChartIcon from "@/assets/images/link-chart.svg"
import orangeLinkChart from "@/assets/images/orangeLinkChart.svg"
import blueLineChart from "@/assets/images/blueLinkChart.svg"
import ColorPicker from '@/common-components/ColorPicker';

type PaddingSize = "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: PaddingSize;
  bgColor?: string;
}

const Card = ({ children, className = "", padding = "md", bgColor = "bg-background-primary-2" }: CardProps) => {
  const paddingClasses = {
    sm: "p-md",
    md: "p-lg",
    lg: "p-xl"
  };

  return (
    <div className={`${bgColor} rounded-2xl border border-border-default ${paddingClasses[padding]} shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

const ActiveProjectIcon: React.FC<{ className?: string }> = ({ className }) => (
  <img
    src={activeProjectChart}
    alt="Active Projects Icon"
    className={className || "w-[40px] h-[40px]"}
  />
);

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
    <div className="w-full flex justify-center">
      <span className={`w-full px-sm py-xs flex justify-center rounded-full text-para-xs font-medium border ${statusStyles[status]}`}>
        {label}
      </span>
    </div>
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
      className={`w-full px-md py-sm ${colors.primary} text-white rounded-full font-medium text-para-sm transition-all duration-200 flex items-center justify-center gap-sm shadow-sm hover:shadow-lg ${colors.hover}`}
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
    <div className="relative w-full py-sm">
      {/* Progress Line - Fixed thickness issue */}
      <div className="absolute max-lg:top-[35%] top-[38%] transform -translate-y-1/2 left-6 right-6 h-[12px] bg-border-muted rounded-full">
        <motion.div
          className={`h-full ${colors.primary} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${progressWidth}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ height: '12px' }}
          viewport={{ once: true }}
        />
      </div>

      <div className="flex items-center justify-between lg:px-md relative z-10">
        {stageNames.map((stage) => {
          const isLocked = stages[stage].locked;

          return (
            <div
              key={stage}
              className="flex flex-col items-center relative"
              onMouseEnter={() => setHoveredStage(stage)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-para-xs font-medium transition-all duration-200 cursor-pointer hover:shadow-mdbg-white`}
              >
                <span className={`w-2 h-2 bg-white rounded-full  translate-y-[1.5px]`} />
              </div>

              <span className="text-para-xs mt-xs text-text-secondary font-medium whitespace-nowrap">
                {stageLabels[stage]}
              </span>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredStage === stage && isLocked && (
                  <motion.div
                    className="absolute bottom-full mb-sm px-sm py-sm bg-background-dark text-text-light text-para-xs rounded-lg shadow-xl"
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    {getPreviousStageToComplete(stage)}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-background-dark" />
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
    <div className="min-h-screen">
      <div className="space-y-xl">

        {/* Top 3 Cards - Accent colors with opacity, fixed alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-full"
          >
            <div className={`relative ${colors.light} rounded-2xl p-6 shadow-md flex flex-col justify-between h-full min-h-[200px]`}>
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-background-secondary-2 p-2 rounded-full flex items-center justify-center text-text-secondary dark:text-lightSecondary">
                  <BsTags />
                </div>
                <div className={`bg-background-secondary-2 ${colors.text} text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2`}>
                  <span className={colors.text}><FaArrowTrendUp /></span>
                  4.43%
                </div>
              </div>

              <div className="mt-12">
                <h3 className={`text-4xl font-bold ${colors.text}`}>73%</h3>
                <p className="text-para-sm text-text-secondary mt-1">Across all projects</p>
              </div>

              <div className="absolute right-4 bottom-4 w-10 h-10 bg-background-secondary-2 p-2 rounded-full flex items-center justify-center">
                <span className="text-text-secondary inline-block rotate-[-45deg]">→</span>
              </div>
            </div>

          </motion.div>

          {/* Average Time Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
            className="h-full"
          >
            <div className={`relative ${colors.light} rounded-2xl p-6 shadow-md flex flex-col justify-between h-full min-h-[200px]`}>
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-background-secondary-2 text-gray-600 p-2 rounded-full flex items-center justify-center">
                  <BsTags />
                </div>
                <div className={`bg-background-secondary-2 ${colors.text} text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2`}>
                  <span className={colors.text}><FaArrowTrendUp /></span>
                  23% faster this month
                </div>
              </div>

              <div className="mt-12">
                <h3 className={`text-4xl font-bold ${colors.text}`}>4.2 days</h3>
                <p className="text-gray-500 text-sm mt-1">Average Time</p>
              </div>

              <div className="absolute right-4 bottom-4 w-10 h-10 bg-background-secondary-2 p-2 rounded-full flex items-center justify-center">
                <span className="text-gray-500 inline-block rotate-[-45deg]">→</span>
              </div>
            </div>
          </motion.div>

          {/* Conversion Rate Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
            className="h-full"
          >
            <div className="relative bg-card-gradient text-white rounded-2xl p-6 shadow-md flex flex-col justify-between h-full min-h-[200px] bg-[linear-gradient(180deg,_#4D43E4_26.44%,_rgba(132,_125,_236,_0.689189)_99.99%,_rgba(255,_255,_255,_0)_100%)]">
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-background-secondary-2 text-blue-violet p-2 rounded-full flex items-center justify-center">
                  <BsTags />
                </div>
                <div className="bg-background-secondary-2 text-blue-violet text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
                  <FaArrowTrendUp />
                  23% faster this month
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-4xl font-bold">71%</h3>
                <p className="text-white/80 text-sm mt-1">Conversion Rate</p>
              </div>

              <div className="absolute right-4 bottom-4 w-10 h-10 bg-transparent border p-2 rounded-full flex items-center justify-center">
                <span className="text-white gray-500 inline-block rotate-[-45deg]">→</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Current Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card padding="md">
            <div className="flex gap-4 items-center">
              <ActiveProjectIcon />
              <h2 className="text-h4-sm font-bold text-text-primary">
                Active Projects
              </h2>
            </div>

            <div className="space-y-md mt-4">
              {data.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`bg-background-primary-2 rounded-xl p-md border transition-all duration-200 hover:shadow-lg ${colors.border} ${colors.hover}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex flex-col lg:grid lg:grid-cols-12 gap-md items-start lg:items-center space-y-md lg:space-y-0">
                    {/* Progress + Name + Status */}
                    <div className="lg:col-span-3 flex gap-lg items-start">
                      <span className={`font-bold text-para-sm lg:text-para-lg mt-1 ${colors.text}`}>
                        {project.progress}%
                      </span>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-[2px]">{project.name}</h4>
                        <StatusTag
                          status={project.status as ProjectStatus}
                          label={project.statusLabel}
                          colors={colors}
                        />
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="lg:col-span-5 w-full">
                      <ProjectTimeline stages={project.stages} colors={colors} />
                    </div>

                    {/* Feedback */}
                    <div className="lg:col-span-2 flex justify-between items-center w-full lg:justify-center">
                      <span className="text-para-xs font-semibold underline text-text-secondary">
                        {project.feedbackThreads} Feedback
                      </span>
                    </div>

                    {/* Continue Button */}
                    <div className="lg:col-span-2 w-full lg:w-auto">
                      <div className="max-w-[140px] lg:max-w-full ml-auto lg:ml-0">
                        <ContinueButton stage={project.currentStage as ProjectStage} colors={colors} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Projects Button */}
            <div className="flex justify-center mt-md">
              <motion.a
                href="#"
                className={`inline-flex items-center gap-sm rounded-full px-sm py-xs font-medium border transition-all duration-200 ${colors.border} ${colors.text} ${colors.hover}`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                View All Projects
                <RiArrowRightLine className="w-4 h-4" />
              </motion.a>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            {/* Customer Satisfaction  */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Card className={`${colors.light} ${colors.border}`}>
                  <div className="flex items-center justify-between mb-lg">
                    <div>
                      <div className="flex gap-4 items-center">
                        <ActiveProjectIcon />
                        <h3 className="text-h4-sm font-bold text-text-primary">
                          Customer Satisfaction
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                    {Object.entries(data.customerSatisfaction.byStage).map(([stage, stats], index) => (
                      <motion.div
                        key={stage}
                        className="bg-background-primary-2 rounded-lg p-lg text-center border border-border-default hover:shadow-lg duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                          y: -8,
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <p className="text-para-sm font-medium text-text-secondary capitalize mb-sm">After {stage}</p>
                        <div className="text-h3-sm font-bold text-text-primary mb-xs">{stats.rating}/10</div>
                        <p className="text-para-sm text-text-tertiary">
                          {stats.happy}/{stats.total} happy
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Project Overview */}
              <div className='mt-4'>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}

                >
                  <Card className={`${colors.light} ${colors.border} h-full`}>
                    <div className="flex gap-4 items-center">
                      <ActiveProjectIcon />
                      <h3 className="text-h4-sm font-bold text-text-primary">
                        Project Overview
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-md">
                      <div>

                        <div className='flex gap-4 items-center'>
                          <div>
                            <img
                              src={linkChartIcon}
                              alt="Active Projects Icon"
                              className={"w-[40px] h-[40px]"}
                            />
                          </div>
                          <div>
                            <motion.div
                              className={`text-h1-sm font-bold ${colors.text} mb-xs`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7, duration: 0.3 }}
                            >
                              {data.projectStats.totalActive}
                            </motion.div>
                            <p className="text-para-sm font-medium text-text-primary">Active Projects</p>
                          </div>
                        </div>
                      </div>


                      <div className="border-x border-border-default flex gap-4 items-center">
                        <div>
                          <img
                            src={orangeLinkChart}
                            alt="Active Projects Icon"
                            className={"w-[40px] h-[40px]"}
                          />
                        </div>
                        <div>
                          <motion.div
                            className={`text-h1-sm font-bold ${colors.text} mb-xs`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.3 }}
                          >
                            {data.projectStats.approvalRate}%
                          </motion.div>
                          <p className="text-para-sm font-medium text-text-primary">Approval Rate</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-center">
                        <div>
                          <img
                            src={blueLineChart}
                            alt="Active Projects Icon"
                            className={"w-[40px] h-[40px]"}
                          />
                        </div>
                        <div>
                          <motion.div
                            className={`text-h1-sm font-bold ${colors.text} mb-xs`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9, duration: 0.3 }}
                          >
                            {data.projectStats.avgProjectTime}Days
                          </motion.div>
                          <p className="text-para-sm font-medium text-text-primary">Avg Time To Complete</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Taste Trends */}
          <div className="lg:col-span-1 flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="h-full"
            >
              <Card className={`${colors.light} ${colors.border} h-full flex flex-col`}>
                <div className="flex gap-4 items-center">
                  <ActiveProjectIcon />
                  <h3 className="text-h4-sm font-bold text-text-primary">
                    Taste Trends
                  </h3>
                </div>
                <div className="flex flex-col justify-center items-center text-center flex-grow">
                  <p className="text-para-md text-text-secondary mb-md">
                    This week, <span className={`font-semibold ${colors.text} text-para-lg`}>
                      {data.tasteTrend.percentage}%
                    </span> of clients chose
                  </p>

                  {/* Pie chart */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <defs>
                        <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#7F5AF0" />
                          <stop offset="100%" stopColor="#2CBDF9" />
                        </linearGradient>
                      </defs>

                      {/* Background ring */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3.5"
                      />

                      {/* Animated progress ring */}
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="url(#gradientStroke)"
                        strokeWidth="3.5"
                        strokeDasharray={`${2 * Math.PI * 15.915}`}
                        strokeDashoffset={2 * Math.PI * 15.915}
                        initial={{ strokeDashoffset: 2 * Math.PI * 15.915 }}
                        animate={{
                          strokeDashoffset:
                            (1 - data.tasteTrend.percentage / 100) * 2 * Math.PI * 15.915,
                        }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Label below */}
                  <p className={`mt-md text-h3-sm font-bold ${colors.text}`}>
                    {data.tasteTrend.trend}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* View Recent Projects Link at the end */}
        <motion.div
          className="flex justify-end pt-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <motion.a
            href="#"
            className={`inline-flex items-center gap-sm ${colors.text} font-medium hover:gap-sm transition-all duration-200`}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            View Recent Projects
            <RiArrowRightLine className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div >

      {/* Fixed Color Picker - Top Right Position */}
      < ColorPicker accentColor={accentColor} setAccentColor={setAccentColor} />
    </div >
  );
};

export default DashboardHome;