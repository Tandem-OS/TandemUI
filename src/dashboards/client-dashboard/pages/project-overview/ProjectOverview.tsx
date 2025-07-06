import React, { useState } from 'react';
import { FaClock, FaCheckCircle, FaComment, FaPaperPlane, FaEye, FaStar, FaDownload, FaShare, FaPlay, FaLock, FaChartLine, FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Mock project data with new stages
const mockProject = {
    id: '1',
    title: 'E-commerce Platform Redesign',
    category: 'Web Design',
    designer: 'Sarah Johnson',
    designerImage: '/images/avatar.png',
    designerRating: 4.9,
    progress: 60,
    status: 'in-progress' as const,
    currentStage: 'Scraper',
    feedbackCount: 8,
    createdAt: '2024-01-15',
    estimatedCompletion: '2024-02-28',
    tags: ['UI/UX', 'E-commerce', 'Responsive'],
    totalStages: 5,
    completedStages: 2,
    stages: [
        {
            id: 'intake',
            name: 'Intake',
            status: 'completed',
            completedAt: '2024-01-18',
            description: 'Requirements gathering'
        },
        {
            id: 'swiper',
            name: 'Swiper',
            status: 'completed',
            completedAt: '2024-01-25',
            description: 'Design exploration'
        },
        {
            id: 'scraper',
            name: 'Scraper',
            status: 'current',
            startedAt: '2024-01-26',
            description: 'Data collection'
        },
        {
            id: 'testimonials',
            name: 'Testimonials',
            status: 'pending',
            description: 'Client feedback'
        },
        {
            id: 'review',
            name: 'Review',
            status: 'pending',
            description: 'Final approval'
        }
    ],
    feedback: [
        {
            id: '1',
            message: 'Loving the direction! Could we explore bolder typography?',
            timestamp: '2024-01-27T14:30:00Z',
            status: 'pending',
            priority: 'medium'
        },
        {
            id: '2',
            message: 'The mobile experience is fantastic.',
            timestamp: '2024-01-26T09:15:00Z',
            status: 'resolved',
            priority: 'low'
        }
    ]
};

const ProjectOverview: React.FC = () => {
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

    const project = mockProject;

    const handleSubmitFeedback = async () => {
        if (!feedbackText.trim()) return;

        setIsSubmittingFeedback(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Submitting feedback:', feedbackText);
        setFeedbackText('');
        setIsSubmittingFeedback(false);
    };

    const getStageIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle className="text-white" />;
            case 'current':
                return (
                    <div className="relative flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full" />
                        <div className="w-3 h-3 bg-white rounded-full animate-ping absolute" />
                    </div>
                );
            default:
                return <FaLock className="text-white" />;
        }
    };

    const getPriorityBadge = (priority: string) => {
        const colors = {
            high: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
            medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
            low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
        };
        return colors[priority as keyof typeof colors] || colors.low;
    };

    return (
        <div className="min-h-screen bg-background-secondary">
            {/* Refined Hero Section - Vertically Centered */}
            <div className="bg-background-primary border-b border-border-default">
                <div className="container mx-auto px-md py-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl items-center">
                        {/* Project Info */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-sm mb-md">
                                <span className="px-md py-xs bg-accent-subtle text-accent-default rounded-full text-para-sm font-medium">
                                    {project.category}
                                </span>
                                <div className="flex items-center gap-xs text-text-secondary">
                                    <FaClock className="text-icon-sm" />
                                    <span className="text-para-sm">Started {new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <h1 className="text-h2-md font-bold text-text-primary mb-md">
                                {project.title}
                            </h1>

                            <div className="flex flex-wrap gap-sm mb-lg">
                                {project.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-md py-xs bg-background-muted text-text-secondary text-para-sm rounded-lg"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-md">
                                <button className="flex items-center gap-sm px-lg py-sm bg-accent-default hover:bg-accent-hover text-accent-foreground rounded-xl transition-colors text-para-md font-medium">
                                    <FaPlay className="text-icon-sm" />
                                    Preview
                                </button>
                                <button className="flex items-center gap-sm px-lg py-sm bg-background-secondary hover:bg-background-muted text-text-primary rounded-xl transition-colors text-para-md border border-border-default">
                                    <FaDownload className="text-icon-sm" />
                                    Files
                                </button>
                                <button className="flex items-center gap-sm px-lg py-sm text-text-secondary hover:text-text-primary rounded-xl transition-colors text-para-md">
                                    <FaShare className="text-icon-sm" />
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Designer Card - Compact */}
                        <div className="bg-background-secondary rounded-2xl p-lg border border-border-default">
                            <div className="flex items-center gap-md mb-md">
                                <div className="relative">
                                    <img
                                        src={project.designerImage}
                                        alt={project.designer}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-background-primary"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background-primary" />
                                </div>
                                <div>
                                    <h3 className="text-para-lg font-semibold text-text-primary">{project.designer}</h3>
                                    <div className="flex items-center gap-xs">
                                        <FaStar className="text-icon-sm text-amber-500" />
                                        <span className="text-para-sm text-text-secondary">{project.designerRating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between text-center">
                                <div>
                                    <div className="text-h5-sm font-bold text-text-primary">45h</div>
                                    <div className="text-para-xs text-text-tertiary">Hours</div>
                                </div>
                                <div>
                                    <div className="text-h5-sm font-bold text-text-primary">12</div>
                                    <div className="text-para-xs text-text-tertiary">Files</div>
                                </div>
                                <div>
                                    <div className="text-h5-sm font-bold text-text-primary">3</div>
                                    <div className="text-para-xs text-text-tertiary">Revisions</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Circular Timeline Section */}
            <div className="container mx-auto px-md py-xl">
                <div className="bg-background-primary rounded-2xl p-xl border border-border-default mb-xl">
                    {/* Timeline Header with Icon */}
                    <div className="flex items-start gap-md mb-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FaChartLine className="text-icon-md text-white" />
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                            <div>
                                <h2 className="text-h4-md font-bold text-text-primary">Project Timeline</h2>
                                <p className="text-para-md text-text-secondary mt-xs">
                                    Stage {project.completedStages + 1} of {project.totalStages}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-h3-sm font-bold text-accent-default">{project.progress}%</div>
                                <div className="text-para-sm text-text-secondary">Complete</div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-background-muted rounded-full h-2 mb-xl overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-accent-default to-accent-hover rounded-full"
                        />
                    </div>

                    {/* Circular Timeline */}
                    <div className="relative">
                        {/* Connection Line */}
                        <div className="absolute top-6 left-0 right-0 h-0.5 bg-border-default hidden lg:block" />

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-md lg:gap-lg relative">
                            {project.stages.map((stage, index) => (
                                <motion.div
                                    key={stage.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col items-center text-center relative"
                                >
                                    {/* Circle Node */}
                                    <div className={`
                                        w-12 h-12 rounded-full flex items-center justify-center relative z-10 mb-md
                                        ${stage.status === 'completed' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                                            stage.status === 'current' ? 'bg-gradient-to-r from-indigo-500 to-purple-600' :
                                                'bg-gray-400 dark:bg-gray-600'}
                                    `}>
                                        {getStageIcon(stage.status)}
                                    </div>

                                    {/* Stage Info */}
                                    <h3 className={`text-para-md font-semibold mb-xs
                                        ${stage.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' :
                                            stage.status === 'current' ? 'text-accent-default' :
                                                'text-text-tertiary'}`}>
                                        {stage.name}
                                    </h3>
                                    <p className="text-para-xs text-text-tertiary">{stage.description}</p>

                                    {stage.completedAt && (
                                        <p className="text-para-xs text-emerald-600 dark:text-emerald-400 mt-xs">
                                            Completed
                                        </p>
                                    )}
                                    {stage.status === 'current' && (
                                        <p className="text-para-xs text-accent-default mt-xs">
                                            In Progress
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-xl">
                    {/* Preview Section */}
                    <div className="xl:col-span-2 bg-background-primary rounded-2xl p-xl border border-border-default">
                        {/* Preview Header with Icon */}
                        <div className="flex items-start gap-md mb-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaEye className="text-icon-md text-white" />
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                                <h3 className="text-h4-md font-bold text-text-primary">Preview</h3>
                                <button className="text-para-sm text-text-secondary hover:text-text-primary transition-colors">
                                    Full Screen
                                </button>
                            </div>
                        </div>

                        <div className="aspect-video bg-background-muted rounded-xl flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-md">
                                    <FaPlay className="text-icon-lg text-white ml-1" />
                                </div>
                                <p className="text-para-md text-text-secondary">Click to preview</p>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="space-y-lg">
                        {/* Feedback Form */}
                        <div className="bg-background-primary rounded-2xl p-lg border border-border-default">
                            {/* Feedback Header with Icon */}
                            <div className="flex items-start gap-md mb-md">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaComment className="text-icon-sm text-white" />
                                </div>
                                <div className="flex-1 flex items-center justify-between">
                                    <h3 className="text-h5-md font-bold text-text-primary">Feedback</h3>
                                    <span className="text-para-sm text-text-secondary">
                                        {project.feedbackCount} comments
                                    </span>
                                </div>
                            </div>

                            <textarea
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                placeholder="Share your thoughts..."
                                className="w-full p-md bg-background-secondary border border-border-default rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-default focus:border-accent-default transition-all text-para-sm resize-none"
                                rows={3}
                            />

                            <button
                                onClick={handleSubmitFeedback}
                                disabled={!feedbackText.trim() || isSubmittingFeedback}
                                className="w-full mt-md flex items-center justify-center gap-sm px-lg py-sm bg-accent-default hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground rounded-xl transition-colors text-para-sm font-medium"
                            >
                                <FaPaperPlane className="text-icon-sm" />
                                {isSubmittingFeedback ? 'Sending...' : 'Send'}
                            </button>
                        </div>

                        {/* Recent Feedback */}
                        <div className="bg-background-primary rounded-2xl p-lg border border-border-default">
                            {/* Recent Header with Icon */}
                            <div className="flex items-start gap-md mb-md">
                                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaComments className="text-icon-sm text-white" />
                                </div>
                                <h4 className="text-para-lg font-semibold text-text-primary">Recent Comments</h4>
                            </div>

                            <div className="space-y-md max-h-64 overflow-y-auto">
                                {project.feedback.map((feedback) => (
                                    <div key={feedback.id} className="pb-md border-b border-border-default last:border-0">
                                        <div className="flex items-center gap-sm mb-xs">
                                            <span className={`px-sm py-xs rounded-md text-para-xs font-medium border ${getPriorityBadge(feedback.priority)}`}>
                                                {feedback.priority}
                                            </span>
                                            <span className="text-para-xs text-text-tertiary">
                                                {new Date(feedback.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-para-sm text-text-primary">{feedback.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;