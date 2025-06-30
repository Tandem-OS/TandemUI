import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    RiMore2Fill
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
}

const StatusCard: React.FC<StatusCardProps> = ({ title, status, icon, action, onClick }) => {
    const statusConfig = {
        completed: {
            bg: 'bg-emerald-50/50 dark:bg-emerald-950/10',
            border: 'border-emerald-200/50 dark:border-emerald-800/30',
            text: 'text-emerald-700 dark:text-emerald-400',
            icon: 'text-emerald-600 dark:text-emerald-500',
            badge: 'bg-emerald-100/70 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
        },
        pending: {
            bg: 'bg-amber-50/40 dark:bg-amber-950/10',
            border: 'border-amber-200/40 dark:border-amber-800/30',
            text: 'text-amber-700 dark:text-amber-400',
            icon: 'text-amber-600 dark:text-amber-500',
            badge: 'bg-amber-100/60 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
        },
        'in-progress': {
            bg: 'bg-sky-50/40 dark:bg-sky-950/10',
            border: 'border-sky-200/40 dark:border-sky-800/30',
            text: 'text-sky-700 dark:text-sky-400',
            icon: 'text-sky-600 dark:text-sky-500',
            badge: 'bg-sky-100/60 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400'
        }
    };

    const config = statusConfig[status];

    return (
        <div className={clsx(
            'relative overflow-hidden rounded-lg border transition-all duration-300',
            'hover:shadow-md hover:-translate-y-0.5',
            config.bg,
            config.border
        )}>
            <div className="p-md">
                <div className="flex items-start justify-between mb-sm">
                    <div className={clsx('p-2 rounded-md', config.badge)}>
                        <span className="text-h5-sm">{icon}</span>
                    </div>
                    {status === 'completed' && (
                        <RiCheckLine className={clsx('text-h6-sm', config.icon)} />
                    )}
                </div>

                <h3 className="text-para-md font-poppins text-slate-900 dark:text-white mb-xs">
                    {title}
                </h3>

                <div className="flex items-center justify-between">
                    <span className={clsx('text-para-sm font-poppins opacity-80', config.text)}>
                        {status === 'completed' ? 'Completed' : status === 'pending' ? 'Pending' : 'In Progress'}
                    </span>

                    {action && (
                        <button
                            onClick={onClick}
                            className={clsx(
                                'text-para-sm font-poppins flex items-center gap-xs',
                                'hover:gap-sm transition-all duration-200',
                                config.text
                            )}
                        >
                            {action}
                            <RiArrowRightLine className="text-para-xs" />
                        </button>
                    )}
                </div>
            </div>

            {/* Subtle decorative element */}
            <div className={clsx(
                'absolute -right-6 -bottom-6 w-16 h-16 rounded-full opacity-5',
                status === 'completed' ? 'bg-emerald-600' :
                    status === 'pending' ? 'bg-amber-600' : 'bg-sky-600'
            )} />
        </div>
    );
};

// Browser Window Mockup Component
const BrowserMockup = () => {
    return (
        <div className="h-full flex flex-col">
            {/* Browser Chrome */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-t-lg p-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 mx-3">
                    <div className="bg-slate-200 dark:bg-slate-700 rounded-md px-3 py-1.5 flex items-center gap-2">
                        <RiWindowLine className="text-slate-500 dark:text-slate-400 text-sm" />
                        <span className="text-xs text-slate-600 dark:text-slate-300">tandem.design/preview</span>
                    </div>
                </div>
                <RiMore2Fill className="text-slate-500 dark:text-slate-400" />
            </div>
            
            {/* Browser Content */}
            <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-b-lg p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-slate-300 dark:bg-slate-600 rounded-lg animate-pulse"></div>
                    <h3 className="text-h5-md font-poppins text-slate-700 dark:text-slate-200 mb-2">
                        Live Preview Loading...
                    </h3>
                    <p className="text-para-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                        Your website design will appear here as our team builds it
                    </p>
                </div>
            </div>
        </div>
    );
};

const ClientDashHome = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress on mount
        const timer = setTimeout(() => setProgress(65), 500);
        return () => clearTimeout(timer);
    }, []);

    const nextStep = () => {
        navigate('/client-dashboard/design-swiper');
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 py-lg">
            <div className="container mx-auto px-md">
                {/* Welcome Section */}
                <div className="mb-xl">
                    <h1 className="text-h2-md lg:text-h1-sm font-poppins text-slate-900 dark:text-white mb-sm">
                        Welcome back, John!
                        <span className="ml-sm inline-block animate-pulse">👋</span>
                    </h1>
                    <p className="text-para-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        You're making great progress on your project. Let's continue building something amazing together!
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-3 gap-lg mb-xl">
                    {/* Progress Section */}
                    <div className="lg:col-span-1">
                        <Card className="h-full flex flex-col dark:bg-slate-950">
                            <div className="flex-1">
                                <h2 className="text-h4-md font-poppins text-slate-900 dark:text-white mb-md">
                                    Project Progress
                                </h2>

                                {/* Scaled down Progress Ring */}
                                <div className="relative w-32 h-32 mx-auto mb-md">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="currentColor"
                                            strokeWidth="6"
                                            fill="none"
                                            className="text-slate-200 dark:text-slate-800"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="currentColor"
                                            strokeWidth="6"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 56}`}
                                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                                            className="text-accent-default transition-all duration-1000 ease-out"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-h3-md font-poppins text-slate-900 dark:text-white">
                                            {progress}%
                                        </span>
                                        <span className="text-para-xs text-slate-600 dark:text-slate-400">
                                            done
                                        </span>
                                    </div>
                                </div>

                                <p className="text-para-md text-center text-slate-600 dark:text-slate-400 mb-lg">
                                    <span className="text-accent-default font-poppins">Almost there!</span> Just one more swipe to complete your design preferences.
                                </p>
                            </div>

                            <button
                                onClick={nextStep}
                                className={clsx(
                                    'w-full py-sm px-lg rounded-lg font-poppins text-btn-md',
                                    'bg-accent-default hover:bg-accent-default-dark',
                                    'text-white shadow-sm hover:shadow-md',
                                    'transform hover:-translate-y-0.5 transition-all duration-200',
                                    'flex items-center justify-center gap-sm group'
                                )}
                            >
                                <RiSparklingLine className="text-h6-sm" />
                                Continue Project
                                <RiArrowRightLine className="text-h6-sm group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Card>
                    </div>

                    {/* Live Preview with Browser Mockup */}
                    <div className="lg:col-span-2">
                        <Card className="h-full overflow-hidden group cursor-pointer dark:bg-slate-950 p-0">
                            <BrowserMockup />
                        </Card>
                    </div>
                </div>

                {/* Status Cards */}
                <div className="mb-xl">
                    <h2 className="text-h3-md font-poppins text-slate-900 dark:text-white mb-md">
                        Project Status
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-sm">
                        <StatusCard
                            title="Intake Submitted"
                            status="completed"
                            icon={<RiFileTextLine />}
                            action="View"
                            onClick={() => navigate('/client-dashboard/intake')}
                        />
                        <StatusCard
                            title="Preferences Swiped"
                            status="completed"
                            icon={<RiPaletteLine />}
                            action="View"
                            onClick={() => navigate('/client-dashboard/preferences')}
                        />
                        <StatusCard
                            title="Feedback Pending"
                            status="pending"
                            icon={<RiMessage3Line />}
                            action="Submit"
                            onClick={() => navigate('/client-dashboard/feedback')}
                        />
                        <StatusCard
                            title="Design Approval"
                            status="pending"
                            icon={<RiCheckDoubleLine />}
                            action="Review"
                            onClick={() => navigate('/client-dashboard/approval')}
                        />
                    </div>
                </div>

                {/* Quick Actions */}
                <Card className='dark:bg-slate-950'>
                    <h3 className="text-h4-md font-poppins text-slate-900 dark:text-white mb-md">
                        Quick Actions
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-sm">
                        <button className="p-md rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group flex justify-center flex-col items-center">
                            <RiEditLine className="text-2xl text-accent-default mb-sm" />
                            <p className="text-para-sm font-poppins text-slate-700 dark:text-slate-200">
                                Edit Intake Form
                            </p>
                        </button>
                        <button className="p-md rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group flex justify-center flex-col items-center">
                            <RiPaletteLine className="text-2xl text-purple-500 mb-sm" />
                            <p className="text-para-sm font-poppins text-slate-700 dark:text-slate-200">
                                Update Preferences
                            </p>
                        </button>
                        <button className="p-md rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group flex justify-center flex-col items-center">
                            <RiMessage3Line className="text-2xl text-sky-500 mb-sm" />
                            <p className="text-para-sm font-poppins text-slate-700 dark:text-slate-200">
                                Submit Feedback
                            </p>
                        </button>
                        <button
                            disabled
                            className="p-md rounded-lg bg-slate-100 dark:bg-slate-800 opacity-50 cursor-not-allowed relative overflow-hidden flex justify-center flex-col items-center"
                        >
                            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 opacity-50" />
                            <RiSparklingLine className="text-2xl text-slate-400 mb-sm relative z-10" />
                            <p className="text-para-sm font-poppins text-slate-500 dark:text-slate-400 relative z-10">
                                Testimonial
                            </p>
                            <span className="absolute top-2 right-2 text-para-xs bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
                                Locked
                            </span>
                        </button>
                    </div>
                </Card>

                {/* Progress Timeline */}
                <Card className="mt-xl dark:bg-slate-950">
                    <h3 className="text-h4-md font-poppins text-slate-900 dark:text-white mb-md">
                        Project Timeline
                    </h3>
                    <p className="text-para-md text-slate-600 dark:text-slate-400 mb-lg">
                        Track your journey from start to finish
                    </p>
                    <ProgressChart />
                </Card>
            </div>
        </div>
    );
};

export default ClientDashHome;