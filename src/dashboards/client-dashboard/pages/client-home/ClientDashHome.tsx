import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { getProjectByClientEmail } from '@/lib/requests/ProjectRequest';
import { setProjectId, setProjectStatus, clearProjectId, clearProjectStatus } from '@/features/project/projectSlice';

import {
  RiCheckLine,
  RiEditLine,
  RiArrowRightLine,
  RiSparklingLine,
  RiFileTextLine,
  RiPaletteLine,
  RiMessage3Line,
  RiCheckDoubleLine,
  RiStarLine,
  RiThunderstormsLine,
  RiRocketLine,
  RiShieldCheckLine,
  RiLinkM
} from 'react-icons/ri';
import { clsx } from 'clsx';
import Card from '../../../../common-components/Card';
import ProgressChart from '../../components/ProgressChart';
import BrowserMockup from './components/BroserMockup';
import { useDispatch } from 'react-redux';

interface StatusCardProps {
  title: string;
  status: 'completed' | 'pending' | 'in-progress';
  icon: React.ReactNode;
  action?: string;
  onClick?: () => void;
  delay?: number;
}
const STATUS_PROGRESS: Record<string, number> = {
  intake: 10,
  scraping: 20,
  swiping: 35,
  embedded: 45,
  composing: 55,
  refining: 65,
  revisions: 75,
  completed: 90,
  handoff: 100,
};
const PIPELINE_ORDER = ['intake', 'scraping', 'swiping', 'embedded', 'composing', 'refining', 'revisions', 'completed', 'handoff'];
const StatusCard: React.FC<StatusCardProps> = ({
  title,
  status,
  icon,
  action,
  onClick,
  delay = 0
}) => {
  const statusConfig = {
    completed: {
      bg: "bg-gradient-to-br from-emerald-50/80 to-teal-50/40 dark:from-emerald-950/20 dark:to-teal-950/10",
      border: "border-emerald-200/60 dark:border-emerald-800/40",
      text: "text-emerald-700 dark:text-emerald-400",
      badge: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
    },
    pending: {
      bg: "bg-gradient-to-br from-amber-50/80 to-orange-50/40 dark:from-amber-950/20 dark:to-orange-950/10",
      border: "border-amber-200/60 dark:border-amber-800/40",
      text: "text-amber-700 dark:text-amber-400",
      badge: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25"
    },
    "in-progress": {
      bg: "bg-gradient-to-br from-sky-50/80 to-blue-50/40 dark:from-sky-950/20 dark:to-blue-950/10",
      border: "border-sky-200/60 dark:border-sky-800/40",
      text: "text-sky-700 dark:text-sky-400",
      badge: "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg shadow-sky-500/25"
    }
  };

  const config = statusConfig[status];

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut"
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={clsx(
        "relative overflow-hidden rounded-xl sm:rounded-2xl border backdrop-blur-sm cursor-pointer group outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400",
        config.bg,
        config.border
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5"></div>

      <div className="relative p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <motion.div
            className={clsx(
              "p-2 sm:p-3 rounded-lg sm:rounded-xl",
              config.badge
            )}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-base sm:text-lg">{icon}</span>
          </motion.div>

          <AnimatePresence>
            {status === "completed" && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="bg-emerald-500 p-1.5 sm:p-2 rounded-full shadow-lg"
              >
                <RiCheckLine className="text-white text-xs sm:text-sm" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-text-primary mb-2 sm:mb-3 group-hover:text-text-secondary transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <motion.span
            className={clsx("text-xs sm:text-sm font-medium", config.text)}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {status === "completed"
              ? "Completed"
              : status === "pending"
                ? "Pending"
                : "In Progress"}
          </motion.span>

          {action && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              className={clsx(
                "text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 hover:gap-2 sm:hover:gap-3 transition-all duration-200",
                config.text
              )}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              {action}
              <RiArrowRightLine className="text-xs" />
            </motion.button>
          )}
        </div>
      </div>

      <motion.div
        className={clsx(
          "absolute -right-4 -bottom-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full opacity-10 dark:opacity-5",
          status === "completed"
            ? "bg-emerald-500"
            : status === "pending"
              ? "bg-amber-500"
              : "bg-sky-500"
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

const ClientDashHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  // Prevent scroll issues on mount
  useEffect(() => {
    // Force scroll to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Enable content after DOM settles
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
      });
    });

    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);
  const projectStatus = useSelector((state: RootState) => state.project.status);
const stageIndex = PIPELINE_ORDER.indexOf(projectStatus ?? '');
const isAtOrBeyond = (stage: string) => stageIndex >= PIPELINE_ORDER.indexOf(stage);
 const quickActions = [
  { icon: RiEditLine, label: 'Edit Intake Form', color: 'from-blue-500 to-cyan-500', href: 'intake', disabled: projectStatus !== 'intake' },
  { icon: RiPaletteLine, label: 'Update Preferences', color: 'from-purple-500 to-pink-500', disabled: !isAtOrBeyond('swiping') },
  { icon: RiMessage3Line, label: 'Submit Feedback', color: 'from-emerald-500 to-teal-500', disabled: !isAtOrBeyond('refining') },
  { icon: RiStarLine, label: 'Testimonial', color: 'from-amber-500 to-orange-500', disabled: !isAtOrBeyond('completed') }
];

 const statusItems = [
  { title: "Intake Submitted", status: (isAtOrBeyond('intake') ? "completed" : "pending") as 'completed' | 'pending', icon: <RiFileTextLine />, action: "View", route: '/client-dashboard/intake', delay: 0, disabled: !isAtOrBeyond('intake') },
  { title: "Preferences Swiped", status: (isAtOrBeyond('swiping') ? "completed" : "pending") as 'completed' | 'pending', icon: <RiPaletteLine />, action: "View", route: 'swiper', delay: 0.1, disabled: !isAtOrBeyond('swiping') },
  { title: "Feedback Pending", status: (isAtOrBeyond('refining') ? "completed" : "pending") as 'completed' | 'pending', icon: <RiMessage3Line />, action: "Submit", route: '/client-dashboard/feedback', delay: 0.2, disabled: !isAtOrBeyond('refining') },
  { title: "Design Approval", status: (isAtOrBeyond('revisions') ? "completed" : "pending") as 'completed' | 'pending', icon: <RiCheckDoubleLine />, action: "Review", route: '/client-dashboard/approval', delay: 0.3, disabled: !isAtOrBeyond('revisions') }
];
  const scrapperButton = [
    { icon: RiLinkM, label: 'Capture & Create', color: 'from-blue-500 to-cyan-500', href: 'scraper', disabled: false },
  ];


  const clientName = useSelector((state: RootState) => state.auth.user.name)!;
  const client_email = useSelector((state: RootState) => state.auth.user.email)!;

const fetchProject = async () => {
  dispatch(clearProjectStatus());
  setProgress(0);
  const result = await getProjectByClientEmail({ client_email });
  if (result.status === 200 && result.data.data?.id) {
    dispatch(setProjectId(result.data.data.id));
    const status = result.data.data.status;
    if (status) {
      dispatch(setProjectStatus(status));
    }
  } else {
    dispatch(clearProjectId());
    dispatch(clearProjectStatus());
  }
};
  useEffect(() => {
    if (projectStatus) {
      const pct = STATUS_PROGRESS[projectStatus] ?? 0;
      const timer = setTimeout(() => setProgress(pct), 800);
      return () => clearTimeout(timer);
    }
  }, [projectStatus]);
  useEffect(() => {
    fetchProject()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Welcome Section */}
        <motion.div
          className="mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Text Content */}
          <div className="flex-1">
            <motion.h1
              className="text-h1-sm md:text-h1-md xl:text-h1-lg font-bold bg-gradient-to-r from-text-primary via-text-secondary to-text-primary bg-clip-text text-transparent mb-2 sm:mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome back, {clientName}
              <motion.span
                className="ml-2 inline-block text-2l sm:text-4xl"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                style={{ color: '#FFD700' }}
              >
                🤗
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary max-w-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              You're making incredible progress on your project. Let's continue building something
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold"> amazing </span>
              together!
            </motion.p>
          </div>

          {/* Scraper Button */}
          <div className="flex-shrink-0">
            {scrapperButton.map((action, index) => {
              const button = (
                <motion.button
                  key={action.label}
                  disabled={action.disabled}
                  className={clsx(
                    'p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 group relative overflow-hidden',
                    'flex flex-col items-center justify-center gap-2 sm:gap-3',
                    action.disabled
                      ? 'bg-background-muted opacity-50 cursor-not-allowed'
                      : 'bg-gradient-to-br from-background-muted to-background-primary hover:shadow-lg'
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                  whileHover={!action.disabled ? {
                    y: -8,
                    transition: { duration: 0.2 }
                  } : {}}
                >
                  {!action.disabled && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                  )}

                  <motion.div
                    className={clsx(
                      'p-2 sm:p-3 rounded-lg sm:rounded-xl relative z-10',
                      action.disabled
                        ? 'bg-background-secondary'
                        : `bg-gradient-to-r ${action.color} shadow-lg`
                    )}
                    whileHover={!action.disabled ? { rotate: 10, scale: 1.1 } : {}}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <action.icon className={clsx(
                      'text-xl sm:text-2xl',
                      action.disabled ? 'text-text-tertiary' : 'text-white'
                    )} />
                  </motion.div>

                  <p className={clsx(
                    'text-xs sm:text-sm font-semibold text-center relative z-10',
                    action.disabled
                      ? 'text-text-tertiary'
                      : 'text-text-secondary'
                  )}>
                    {action.label}
                  </p>

                  {action.disabled && (
                    <motion.span
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 text-xs bg-background-secondary text-text-tertiary px-2 py-0.5 rounded-full font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Locked
                    </motion.span>
                  )}
                </motion.button>
              );

              return !action.disabled && action.href ? (
                <Link to={action.href} key={action.label} className="contents">
                  {button}
                </Link>
              ) : (
                button
              );
            })}
          </div>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Progress Section */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col bg-background-primary-2 border-0 shadow-xl">
              <div className="flex-1 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <motion.div
                    className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg sm:rounded-xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <RiRocketLine className="text-white text-sm sm:text-base lg:text-lg" />
                  </motion.div>
                  Project Progress
                </h2>

                {/* Progress Ring */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 128 128"
                  >
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-border-muted"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={351.86}
                      initial={{ strokeDashoffset: 351.86 }}
                      animate={{ strokeDashoffset: 351.86 * (1 - progress / 100) }}
                      transition={{
                        duration: 2,
                        delay: 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      className="text-h2-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      {progress}%
                    </motion.span>
                    <span className="text-para-sm text-text-tertiary font-medium">
                      done
                    </span>
                  </div>
                </div>

                <motion.p
                  className="text-center text-xs sm:text-sm text-text-secondary mb-2 sm:mb-3 leading-relaxed px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text font-semibold">
                    Almost there!
                  </span>
                  <br />
                  Just one more swipe to complete your design preferences.
                </motion.p>
              </div>

              <motion.button
                onClick={() => navigate('onboard')}
                className="mx-4 sm:mx-6 mb-4 sm:mb-6 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <RiSparklingLine className="text-lg sm:text-xl relative z-10" />
                <span className="relative z-10">Continue Project</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <RiArrowRightLine className="text-lg sm:text-xl" />
                </motion.div>
              </motion.button>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-2">
            <Card className="h-full overflow-hidden bg-background-primary-2 border-0 shadow-xl p-none">
              <BrowserMockup />
            </Card>
          </div>
        </motion.div>

        {/* Status Cards */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <motion.div
              className="p-2 sm:p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <RiShieldCheckLine className="text-white text-sm sm:text-base lg:text-lg" />
            </motion.div>
            Project Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {statusItems.map((item) => (
  <StatusCard
    key={item.title}
    title={item.title}
    status={item.status}
    icon={item.icon}
    action={item.disabled ? undefined : item.action}
    onClick={item.disabled ? undefined : () => navigate(item.route)}
    delay={item.delay}
  />
))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="bg-background-primary-2 border-0 shadow-xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <motion.div
                className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg sm:rounded-xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <RiThunderstormsLine className="text-white text-sm sm:text-base lg:text-lg" />
              </motion.div>
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {quickActions.map((action, index) => {
                const button = (
                  <motion.button
                    key={action.label}
                    disabled={action.disabled}
                    className={clsx(
                      'p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 group relative overflow-hidden',
                      'flex flex-col items-center justify-center gap-2 sm:gap-3',
                      action.disabled
                        ? 'bg-background-muted opacity-50 cursor-not-allowed'
                        : 'bg-gradient-to-br from-background-muted to-background-primary hover:shadow-lg'
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    whileHover={!action.disabled ? {
                      y: -8,
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    {!action.disabled && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />
                    )}

                    <motion.div
                      className={clsx(
                        'p-2 sm:p-3 rounded-lg sm:rounded-xl relative z-10',
                        action.disabled
                          ? 'bg-background-secondary'
                          : `bg-gradient-to-r ${action.color} shadow-lg`
                      )}
                      whileHover={!action.disabled ? { rotate: 10, scale: 1.1 } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <action.icon className={clsx(
                        'text-xl sm:text-2xl',
                        action.disabled ? 'text-text-tertiary' : 'text-white'
                      )} />
                    </motion.div>

                    <p className={clsx(
                      'text-xs sm:text-sm font-semibold text-center relative z-10',
                      action.disabled
                        ? 'text-text-tertiary'
                        : 'text-text-secondary'
                    )}>
                      {action.label}
                    </p>

                    {action.disabled && (
                      <motion.span
                        className="absolute top-1 right-1 sm:top-2 sm:right-2 text-xs bg-background-secondary text-text-tertiary px-2 py-0.5 rounded-full font-medium"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Locked
                      </motion.span>
                    )}
                  </motion.button>
                );

                // Wrap with Link if not disabled and has href
                return !action.disabled && action.href ? (
                  <Link to={action.href} key={action.label} className="contents">
                    {button}
                  </Link>
                ) : (
                  button
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Progress Timeline */}
        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-background-primary-2 border-0 shadow-xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <motion.div
                className="p-2 sm:p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <RiSparklingLine className="text-white text-sm sm:text-base lg:text-lg" />
              </motion.div>
              Project Timeline
            </h3>

            <p className="text-text-secondary mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
              Track your journey from start to finish
            </p>

            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
              <ProgressChart />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientDashHome;