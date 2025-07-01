import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { type Variants } from 'framer-motion';

import {
    RiCheckLine,
    RiEditLine,
    RiArrowRightLine,
    RiSparklingLine,
    RiFileTextLine,
    RiPaletteLine,
    RiMessage3Line,
    RiCheckDoubleLine,
    RiWindowLine,
    RiMore2Fill,
    RiStarLine,
    RiThunderstormsLine,
    RiRocketLine,
    RiShieldCheckLine
} from 'react-icons/ri';
import { clsx } from 'clsx';
import Card from '../../../../comman-components/Card';
import ProgressChart from '../../components/ProgressChart';

interface StatusCardProps {
    title: string;
    status: 'completed' | 'pending' | 'in-progress';
    icon: React.ReactNode;
    action?: string;
    onClick?: () => void;
    delay?: number;
}

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
            bg: 'bg-gradient-to-br from-emerald-50/80 to-teal-50/40 dark:from-emerald-950/20 dark:to-teal-950/10',
            border: 'border-emerald-200/60 dark:border-emerald-800/40',
            text: 'text-emerald-700 dark:text-emerald-400',
            badge: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25',
        },
        pending: {
            bg: 'bg-gradient-to-br from-amber-50/80 to-orange-50/40 dark:from-amber-950/20 dark:to-orange-950/10',
            border: 'border-amber-200/60 dark:border-amber-800/40',
            text: 'text-amber-700 dark:text-amber-400',
            badge: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25',
        },
        'in-progress': {
            bg: 'bg-gradient-to-br from-sky-50/80 to-blue-50/40 dark:from-sky-950/20 dark:to-blue-950/10',
            border: 'border-sky-200/60 dark:border-sky-800/40',
            text: 'text-sky-700 dark:text-sky-400',
            badge: 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg shadow-sky-500/25',
        }
    };

    const config = statusConfig[status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                delay,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className={clsx(
                'relative overflow-hidden rounded-2xl border backdrop-blur-sm cursor-pointer group',
                config.bg,
                config.border
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5"></div>

            <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                    <motion.div
                        className={clsx('p-3 rounded-xl', config.badge)}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <span className="text-lg">{icon}</span>
                    </motion.div>

                    <AnimatePresence>
                        {status === 'completed' && (
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="bg-emerald-500 p-2 rounded-full shadow-lg"
                            >
                                <RiCheckLine className="text-white text-sm" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                    {title}
                </h3>

                <div className="flex items-center justify-between">
                    <motion.span
                        className={clsx('text-sm font-medium', config.text)}
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {status === 'completed' ? 'Completed' :
                            status === 'pending' ? 'Pending' : 'In Progress'}
                    </motion.span>

                    {action && (
                        <motion.button
                            onClick={onClick}
                            className={clsx(
                                'text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-200',
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
                    'absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-10 dark:opacity-5',
                    status === 'completed' ? 'bg-emerald-500' :
                        status === 'pending' ? 'bg-amber-500' : 'bg-sky-500'
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

const BrowserMockup: React.FC = () => {
    return (
        <motion.div
            className="h-full flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
        >
            {/* Browser Chrome */}
            <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-t-2xl p-4 flex items-center gap-3 border-b border-slate-200 dark:border-slate-600">
                <div className="flex gap-2">
                    {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map((color) => (
                        <motion.div
                            key={color}
                            className={`w-3 h-3 rounded-full ${color} shadow-sm`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>
                <div className="flex-1 mx-4">
                    <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-2 flex items-center gap-3 shadow-inner">
                        <RiWindowLine className="text-slate-500 dark:text-slate-400 text-sm" />
                        <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                            tandem.design/preview
                        </span>
                        <motion.div
                            className="w-2 h-2 bg-green-500 rounded-full ml-auto"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </div>
                <RiMore2Fill className="text-slate-500 dark:text-slate-400" />
            </div>

            {/* Browser Content */}
            <div className="flex-1 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 rounded-b-2xl p-8 flex items-center justify-center relative overflow-hidden">
                <motion.div
                    className="absolute top-4 left-4 w-8 h-8 bg-blue-500/20 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-4 right-4 w-6 h-6 bg-purple-500/20 rounded-full"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />

                <div className="text-center relative z-10">
                    <motion.div
                        className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-2xl shadow-lg relative overflow-hidden"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    <motion.h3
                        className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-3"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Live Preview Loading...
                    </motion.h3>

                    <motion.p
                        className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Your website design will appear here as our team builds it
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

const ClientDashHome: React.FC = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(65), 800);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const quickActions = [
        { icon: RiEditLine, label: 'Edit Intake Form', color: 'from-blue-500 to-cyan-500' },
        { icon: RiPaletteLine, label: 'Update Preferences', color: 'from-purple-500 to-pink-500' },
        { icon: RiMessage3Line, label: 'Submit Feedback', color: 'from-emerald-500 to-teal-500' },
        { icon: RiStarLine, label: 'Testimonial', color: 'from-amber-500 to-orange-500', disabled: true }
    ];

    const statusItems = [
        { title: "Intake Submitted", status: "completed" as const, icon: <RiFileTextLine />, action: "View", route: '/client-dashboard/intake', delay: 0 },
        { title: "Preferences Swiped", status: "completed" as const, icon: <RiPaletteLine />, action: "View", route: '/client-dashboard/preferences', delay: 0.1 },
        { title: "Feedback Pending", status: "pending" as const, icon: <RiMessage3Line />, action: "Submit", route: '/client-dashboard/feedback', delay: 0.2 },
        { title: "Design Approval", status: "pending" as const, icon: <RiCheckDoubleLine />, action: "Review", route: '/client-dashboard/approval', delay: 0.3 }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <motion.div
                className="container mx-auto px-6 py-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Welcome Section - Reduced spacing */}
                <motion.div
                    className="mb-8"
                    variants={itemVariants}
                >
                    <motion.h1
                        className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent mb-3"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Welcome back, John!
                        <motion.span
                            className="ml-3 inline-block text-3xl"
                            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                            style={{ color: '#FFD700' }} // Force emoji color
                        >
                            🤗
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        You're making incredible progress on your project. Let's continue building something
                        <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold"> amazing </span>
                        together!
                    </motion.p>
                </motion.div>

                {/* Main Grid */}
                <motion.div
                    className="grid lg:grid-cols-3 gap-8 mb-8"
                    variants={itemVariants}
                >
                    {/* Progress Section - Removed hover scale */}
                    <div className="lg:col-span-1">
                        <Card className="h-full flex flex-col bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-0 shadow-xl shadow-slate-200/50 dark:shadow-slate-800/50">
                            <div className="flex-1 p-6 pt-0">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <motion.div
                                        className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    >
                                        <RiRocketLine className="text-white text-lg" />
                                    </motion.div>
                                    Project Progress
                                </h2>

                                {/* Smaller Progress Ring */}
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <svg className="w-full h-full transform -rotate-90">
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
                                            strokeWidth="6"
                                            fill="none"
                                            className="text-slate-200/50 dark:text-slate-800/50"
                                        />
                                        <motion.circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="url(#progressGradient)"
                                            strokeWidth="6"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 56}`}
                                            strokeLinecap="round"
                                            initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                                            animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - progress / 100) }}
                                            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <motion.span
                                            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8, delay: 1 }}
                                        >
                                            {progress}%
                                        </motion.span>
                                        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                            completed
                                        </span>
                                    </div>
                                </div>

                                <motion.p
                                    className="text-center text-slate-600 dark:text-slate-400 mb-sm leading-relaxed"
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
                                onClick={() => navigate('/client-dashboard/design-swiper')}
                                className="mx-6 mb-6 py-4 px-6 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <RiSparklingLine className="text-xl relative z-10" />
                                <span className="relative z-10">Continue Project</span>
                                <motion.div
                                    className="relative z-10"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <RiArrowRightLine className="text-xl" />
                                </motion.div>
                            </motion.button>
                        </Card>
                    </div>

                    {/* Live Preview - Removed hover scale */}
                    <div className="lg:col-span-2">
                        <Card className="h-full overflow-hidden bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-0 shadow-xl shadow-slate-200/50 dark:shadow-slate-800/50 p-0">
                            <BrowserMockup />
                        </Card>
                    </div>
                </motion.div>

                {/* Status Cards */}
                <motion.div className="mb-8" variants={itemVariants}>
                    <motion.h2
                        className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <RiShieldCheckLine className="text-white text-lg" />
                        </motion.div>
                        Project Status
                    </motion.h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statusItems.map((item) => (
                            <StatusCard
                                key={item.title}
                                title={item.title}
                                status={item.status}
                                icon={item.icon}
                                action={item.action}
                                onClick={() => navigate(item.route)}
                                delay={item.delay}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions - Added same scaling animation as status cards */}
                <motion.div variants={itemVariants}>
                    <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-0 shadow-xl shadow-slate-200/50 dark:shadow-slate-800/50 p-8">
                        <motion.h3
                            className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <RiThunderstormsLine className="text-white text-lg" />
                            </motion.div>
                            Quick Actions
                        </motion.h3>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {quickActions.map((action, index) => (
                                <motion.button
                                    key={action.label}
                                    disabled={action.disabled}
                                    className={clsx(
                                        'p-6 rounded-2xl transition-all duration-300 group relative overflow-hidden',
                                        'flex flex-col items-center justify-center gap-3',
                                        action.disabled
                                            ? 'bg-slate-100 dark:bg-slate-800 opacity-50 cursor-not-allowed'
                                            : 'bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50'
                                    )}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }}
                                    whileHover={!action.disabled ? {
                                        y: -8,
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    } : {}}
                                    whileTap={!action.disabled ? { scale: 0.98 } : {}}
                                >
                                    {!action.disabled && (
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                        />
                                    )}

                                    <motion.div
                                        className={clsx(
                                            'p-3 rounded-xl relative z-10',
                                            action.disabled
                                                ? 'bg-slate-200 dark:bg-slate-700'
                                                : `bg-gradient-to-r ${action.color} shadow-lg`
                                        )}
                                        whileHover={!action.disabled ? { rotate: 10, scale: 1.1 } : {}}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <action.icon className={clsx(
                                            'text-2xl',
                                            action.disabled ? 'text-slate-400' : 'text-white'
                                        )} />
                                    </motion.div>

                                    <p className={clsx(
                                        'text-sm font-semibold text-center relative z-10',
                                        action.disabled
                                            ? 'text-slate-500 dark:text-slate-400'
                                            : 'text-slate-700 dark:text-slate-200'
                                    )}>
                                        {action.label}
                                    </p>

                                    {action.disabled && (
                                        <motion.span
                                            className="absolute top-3 right-3 text-xs bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full font-medium"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            Locked
                                        </motion.span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                {/* Progress Timeline */}
                <motion.div className="mt-8" variants={itemVariants}>
                    <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-0 shadow-xl shadow-slate-200/50 dark:shadow-slate-800/50 p-8">
                        <motion.h3
                            className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <RiSparklingLine className="text-white text-lg" />
                            </motion.div>
                            Project Timeline
                        </motion.h3>

                        <motion.p
                            className="text-slate-600 dark:text-slate-400 mb-6 text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Track your journey from start to finish
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <ProgressChart />
                        </motion.div>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ClientDashHome;