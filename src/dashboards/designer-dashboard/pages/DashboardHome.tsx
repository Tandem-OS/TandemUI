// src/dashboards/designer-dashboard/pages/DashboardHome.tsx
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import Card from '../../../comman-components/Card';
import ProgressCircle from '../../../comman-components/ProgressCircle';

// Reusable Progress Bar Component
interface ProgressBarProps {
  percentage: number;
  bgColor?: string;
  fillColor?: string;
  height?: string;
  width?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  bgColor = "bg-slate-200 dark:bg-slate-700",
  fillColor = "bg-accent-default",
  height = "h-3",
  width = "w-full"
}) => {
  return (
    <div className={`${bgColor} ${height} ${width} rounded-full overflow-hidden`}>
      <motion.div 
        className={`${fillColor} h-full rounded-full`}
        initial={{ width: "0%" }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
};

interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
  clarity: number;
}

const DashboardHome: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      name: 'OrbitRed Website',
      status: 'In Progress',
      progress: 85,
      clarity: 85
    },
    {
      id: '2',
      name: 'AI-Powered Brief',
      status: 'Version 3',
      progress: 40,
      clarity: 75
    },
    {
      id: '3',
      name: 'Evolve UI Redesign',
      status: 'Reviewing',
      progress: 85,
      clarity: 90
    }
  ];

  return (
    <div className="space-y-md lg:space-y-lg">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
          <div className="flex flex-col justify-center h-full space-y-xs">
            <h2 className="text-h2-sm lg:text-h1-md font-bold text-slate-900 dark:text-white">87%</h2>
            <p className="text-para-sm text-slate-600 dark:text-slate-400">satisfied customers</p>
          </div>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
          <div className="flex flex-col justify-center h-full space-y-xs">
            <h2 className="text-h2-sm lg:text-h1-md font-bold text-slate-900 dark:text-white">4.5</h2>
            <p className="text-para-sm text-slate-600 dark:text-slate-400">average days to finish</p>
          </div>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 sm:col-span-2 lg:col-span-1">
          <div className="flex flex-col justify-center h-full space-y-xs">
            <ProgressBar percentage={75} width="w-3/4" />
            <p className="text-para-sm text-slate-600 dark:text-slate-400">conversion metrics</p>
          </div>
        </Card>
      </div>

      {/* Current Projects */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700" padding="lg">
        <div className="flex items-center justify-between mb-lg">
          <h3 className="text-h5-sm lg:text-h4-sm font-semibold text-slate-900 dark:text-white">Current Projects</h3>
          <button className="text-para-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-xs">
            Show more
            <RiArrowRightLine className="text-para-sm" />
          </button>
        </div>

        <div className="space-y-md">
          {projects.map(project => (
            <div key={project.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-md">
              <div className="flex items-center gap-md">
                <ProgressCircle percentage={project.progress} />
                <div>
                  <h4 className="text-para-md font-medium text-slate-900 dark:text-white">{project.name}</h4>
                  <p className="text-para-sm text-slate-600 dark:text-slate-400">{project.status}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-md lg:gap-xl">
                <div className="flex items-center gap-md">
                  <span className="text-para-sm text-slate-600 dark:text-slate-400">Clarity</span>
                  <ProgressBar percentage={project.clarity} width="w-72" />
                </div>

                <span className="text-para-sm text-slate-600 dark:text-slate-400">Feedback Threads</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
        {/* Swipe Signature Overview */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700" padding="lg">
          <h3 className="text-h6-sm lg:text-h5-sm font-semibold text-slate-900 dark:text-white mb-md">Swipe Signature Overview</h3>
          <div className="grid grid-cols-3 gap-sm">
            {[
              { opacity: 'bg-accent-default/20' },
              { opacity: 'bg-accent-default/40' },
              { opacity: 'bg-accent-default/60' },
              { opacity: 'bg-accent-default/30' },
              { opacity: 'bg-accent-default/50' },
              { opacity: 'bg-accent-default/80' }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`aspect-square ${item.opacity} rounded-lg`}
              ></div>
            ))}
          </div>
        </Card>

        {/* Revision Insights */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700" padding="lg">
          <h3 className="text-h6-sm lg:text-h5-sm font-semibold text-slate-900 dark:text-white mb-md">Revision Insights</h3>
          <div className="space-y-sm flex flex-col justify-center items-center h-full">
            <div className="flex items-baseline gap-sm">
              <span className="text-4xl sm:text-5xl lg:text-8xl font-bold text-accent-default dark:text-white">75</span>
              <span className="text-para-md text-slate-600 dark:text-slate-400">revisions</span>
            </div>
            <p className="text-para-sm text-slate-500 dark:text-slate-500">last month</p>
            <p className="text-para-sm text-green-600 dark:text-green-400">+ 15% vs previous month</p>
          </div>
        </Card>

        {/* Taste Trends */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 flex flex-col justify-between" padding="lg">
          <h3 className="text-h6-sm lg:text-h5-sm font-semibold text-slate-900 dark:text-white mb-md">Taste Trends</h3>
          <div className="flex items-end justify-around gap-sm h-40">
            <div className="text-center flex flex-col justify-end">
              <div className="w-16 h-20 lg:w-20 lg:h-28 bg-gradient-to-t from-blue-200/60 to-blue-300/40 dark:from-blue-400/30 dark:to-blue-300/20 rounded-lg mb-2"></div>
              <p className="text-para-xs text-slate-600 dark:text-slate-400">Minimalist</p>
            </div>
            <div className="text-center flex flex-col justify-end">
              <div className="w-16 h-28 lg:w-20 lg:h-40 bg-gradient-to-t from-purple-200/60 to-purple-300/40 dark:from-purple-400/30 dark:to-purple-300/20 rounded-lg mb-2"></div>
              <p className="text-para-xs text-slate-600 dark:text-slate-400">Modernist</p>
            </div>
            <div className="text-center flex flex-col justify-end">
              <div className="w-16 h-16 lg:w-20 lg:h-28 bg-gradient-to-t from-emerald-200/60 to-emerald-300/40 dark:from-emerald-400/30 dark:to-emerald-300/20 rounded-lg mb-2"></div>
              <p className="text-para-xs text-slate-600 dark:text-slate-400">Abstract</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;