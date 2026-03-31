import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiZap, FiRefreshCw, FiTrendingUp, FiLayers, FiEye, FiHeart,
    FiArrowRight, FiActivity, FiBarChart, FiThumbsUp, FiCheckCircle, FiAward
} from 'react-icons/fi';
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import {
    ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { LuBrain } from 'react-icons/lu';

// Import actual types from your system
import type {
    UserChoice,
    ComponentPreview,
    RoundData
} from '../swiper.types';

interface SwiperSummaryProps {
    userChoices: UserChoice[];
    roundsData: RoundData[];
    totalRounds: number;
    kingOfHillSessions: any[];
    onStartOver: () => void;
    onGenerateLayout: () => void;
}

interface TagAnalysis {
    tag: string;
    count: number;
    percentage: number;
}

interface CategoryStat {
    category: string;
    liked: number;
    total: number;
    percentage: number;
}

// Enhanced Gradient Icon Box Component
interface GradientIconBoxProps {
    icon: React.ReactNode;
    gradientFrom: string;
    gradientTo: string;
    size?: 'sm' | 'md' | 'lg';
}

const GradientIconBox: React.FC<GradientIconBoxProps> = ({
    icon,
    gradientFrom,
    gradientTo,
    size = 'md'
}) => {
    const sizeClasses = {
        sm: 'w-10 h-10',
        md: 'w-12 h-12 lg:w-14 lg:h-14',
        lg: 'w-16 h-16 sm:w-20 sm:h-20'
    };

    return (
        <motion.div
            whileHover={{
                rotate: 360,
                scale: 1.05
            }}
            transition={{
                rotate: { duration: 0.6, ease: "easeInOut" },
                scale: { duration: 0.2, ease: "easeOut" }
            }}
            className={`${sizeClasses[size]} bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
        >
            {icon}
        </motion.div>
    );
};

// Premium Summary Card Component
interface SummaryCardProps {
    component: ComponentPreview;
    userChoice: UserChoice;
    isSuperlike?: boolean;
    index?: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ component, userChoice, isSuperlike = false, index = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.05 * index,
                duration: 0.4,
                ease: "easeOut"
            }}
            whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="relative group bg-background-primary-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-border-default hover:border-accent-default/30"
        >
            {/* Superlike Badge */}
            {isSuperlike && (
                <div className="absolute top-md right-md z-[4] flex items-center gap-xs px-sm py-xs bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg text-para-xs font-semibold shadow-md">
                    <FiHeart className="text-icon-xs" />
                    <span>SUPER</span>
                </div>
            )}

            {/* Card Image */}
            <div className="aspect-video bg-background-muted relative overflow-hidden">
                {component.thumbnail_url ? (
                    <img
                        src={component.thumbnail_url}
                        alt={component.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                        <FiEye className="text-icon-xl opacity-30" />
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-md space-y-sm">
                <div className="flex items-center gap-sm">
                    <span className="px-sm py-xs bg-accent-default text-white text-para-xs font-semibold rounded-md">
                        {component.category}
                    </span>
                    {component.vibe && (
                        <span className="px-sm py-xs bg-background-secondary text-text-secondary text-para-xs font-medium rounded-md">
                            {component.vibe}
                        </span>
                    )}
                </div>

                <div className="space-y-xs">
                    <h3 className="font-semibold text-text-primary text-para-md leading-snug line-clamp-2">
                        {component.title}
                    </h3>
                    <div className="text-para-xs text-text-tertiary">
                        <span>{Math.round((userChoice.behavioral_signals?.view_duration_ms || 0) / 100) / 10}s view</span>
                    </div>
                </div>
            </div>

            {/* Enhanced Hover Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-sm flex items-center justify-center p-md z-[2]"
            >
                <div className="text-center space-y-sm">
                    <h4 className="font-semibold text-white text-para-md">Why You Loved This:</h4>
                    <div className="flex flex-wrap gap-xs justify-center">
                        {component.tags.filter((tag: string) => !!tag).slice(0, 3).map((tag: string, i: number) => (
                            <motion.span
                                key={tag}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.2 }}
                                className={`px-sm py-xs text-white text-para-xs font-medium rounded-md border ${isSuperlike
                                    ? 'bg-gradient-to-r from-rose-500/30 to-pink-600/30 border-rose-400/40'
                                    : 'bg-gradient-to-r from-emerald-500/30 to-green-600/30 border-emerald-400/40'
                                    }`}
                            >
                                {tag.replace(/-/g, ' ')}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const SwiperSummary: React.FC<SwiperSummaryProps> = ({
    userChoices,
    roundsData,
    onStartOver,
    onGenerateLayout,
    totalRounds,
    kingOfHillSessions
}) => {
    const [showRecap, setShowRecap] = useState(true);
    const [showAllRegular, setShowAllRegular] = useState(false);
    const [showAllSuper, setShowAllSuper] = useState(false);
    const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Create component lookup map from roundsData
    const componentMap = useMemo(() => {
        const map = new Map<string, ComponentPreview>();
        roundsData.forEach(round => {
            round.components.forEach(comp => {
                map.set(comp.component_id, comp);
            });
        });
        kingOfHillSessions.forEach(session => {
            (session.components ?? []).forEach((comp: any) => {
                if (comp?.component_id && !map.has(comp.component_id)) {
                    map.set(comp.component_id, comp as ComponentPreview);
                }
            });
        });
        return map;
    }, [roundsData, kingOfHillSessions]);

    // Enhanced analytics with pattern detection
    const intelligence = useMemo(() => {
        const likedChoices = userChoices.filter(c => c.action === 'like' || c.action === 'super-like');
        const superLikedChoices = userChoices.filter(c => c.action === 'super-like');
        const rejectedChoices = userChoices.filter(c => c.action === 'dislike');
        const aiAssistedChoices = userChoices.filter(c => c.behavioral_signals?.is_asked_ai);

        // Get components for liked choices
        const likedComponents = likedChoices.map(choice => componentMap.get(choice.component_id)).filter(Boolean) as ComponentPreview[];

        // Pattern Detection
        const allLikedTags = likedComponents.flatMap(comp => comp.tags || []);
        const tagFrequency = allLikedTags.reduce((acc: Record<string, number>, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {});

        const allVibes = likedComponents.map(comp => comp.vibe).filter(Boolean);
        const vibeFrequency = allVibes.reduce((acc: Record<string, number>, vibe) => {
            acc[vibe] = (acc[vibe] || 0) + 1;
            return acc;
        }, {});

        const allTones = likedComponents.flatMap(comp => comp.tone || []);
        const toneFrequency = allTones.reduce((acc: Record<string, number>, tone) => {
            acc[tone] = (acc[tone] || 0) + 1;
            return acc;
        }, {});

        const combinedFrequency = { ...tagFrequency, ...vibeFrequency, ...toneFrequency };

        const topTags: TagAnalysis[] = Object.entries(combinedFrequency)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 3)
            .map(([tag, count]) => ({
                tag: tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                count: count as number,
                percentage: Math.round(((count as number) / likedChoices.length) * 100)
            }));

        // Behavioral insights
        const avgViewTime = userChoices.reduce((sum, c) => sum + (c.behavioral_signals?.view_duration_ms || 0), 0) / userChoices.length;
        const quickDecisions = userChoices.filter(c => (c.behavioral_signals?.hesitation_ms || 0) < 1000).length;

        const insights = [
            `Through ${userChoices.length} thoughtful decisions, we've decoded your unique design DNA and aesthetic preferences.`,
            topTags.length > 0
                ? `${topTags[0].percentage}% of your choices feature ${topTags[0].tag.toLowerCase()}, revealing a strong pattern in your taste.`
                : `Your design preferences show consistency and refined aesthetic judgment.`,
            `Your ${quickDecisions > userChoices.length / 2 ? 'intuitive' : 'analytical'} decision-making style demonstrates ${likedChoices.length > rejectedChoices.length ? 'confidence' : 'selectivity'} in recognizing quality design.`,
            aiAssistedChoices.length > 0
                ? `You leveraged smart insights on ${aiAssistedChoices.length} choices, showing a modern approach to design decisions.`
                : `Your instinctive choices reveal natural design intuition and aesthetic confidence.`
        ];

        // Category performance with full names
        const categoryStats: CategoryStat[] = roundsData.map(round => {
            const categoryChoices = userChoices.filter(choice => {
                const comp = componentMap.get(choice.component_id);
                return comp && comp.category === round.category;
            });
            const liked = categoryChoices.filter(c => c.action === 'like' || c.action === 'super-like').length;
            const total = categoryChoices.length;
            return {
                category: round.category,
                liked,
                total,
                percentage: total > 0 ? Math.round((liked / total) * 100) : 0
            };
        }).filter(cat => cat.total > 0).sort((a, b) => b.percentage - a.percentage);

        // Pair choices with components for display
        const likedChoicesWithComponents = likedChoices.map(choice => ({
            choice,
            component: componentMap.get(choice.component_id)!
        })).filter(item => item.component);

        const superLikedChoicesWithComponents = superLikedChoices.map(choice => ({
            choice,
            component: componentMap.get(choice.component_id)!
        })).filter(item => item.component);

        return {
            likedChoices,
            superLikedChoices,
            rejectedChoices,
            aiAssistedChoices,
            topTags,
            avgViewTime: Math.round(avgViewTime),
            quickDecisions,
            insights,
            categoryStats,
            likedChoicesWithComponents,
            superLikedChoicesWithComponents
        };
    }, [userChoices, roundsData, componentMap]);

    // Auto-play insights
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setCurrentInsightIndex(prev =>
                prev === intelligence.insights.length - 1 ? 0 : prev + 1
            );
        }, 4500);
        return () => clearInterval(interval);
    }, [isPlaying, intelligence.insights.length]);

    // Chart data for analytics
    const pieData = [
        { name: 'Loved', value: intelligence.likedChoices.length, color: '#4338ca' },
        { name: 'Passed', value: intelligence.rejectedChoices.length, color: '#9ca3af' }
    ].filter(item => item.value > 0);

    const radarData = intelligence.categoryStats.map(cat => ({
        category: cat.category,
        value: cat.percentage,
        fullMark: 100,
    }));

    const behaviorData = [
        { name: 'Quick', value: intelligence.quickDecisions },
        { name: 'Thoughtful', value: userChoices.length - intelligence.quickDecisions },
        { name: 'Super Liked', value: intelligence.superLikedChoices.length }
    ];

    const handleGenerateLayout = () => {
        const sessionSummary = {
            session_id: `session_${Date.now()}`,
            total_rounds: totalRounds,
            completed_at: new Date().toISOString(),
            total_choices: userChoices.length,
            behavioral_insights: {
                overall_average_view_duration_ms: intelligence.avgViewTime,
                top_design_patterns: intelligence.topTags,
                insights_analysis: intelligence.insights
            },
            summary_counts: {
                likes: intelligence.likedChoices.length,
                super_likes: intelligence.superLikedChoices.length,
                rejected: intelligence.rejectedChoices.length,
                ai_assistance_used: intelligence.aiAssistedChoices.length,
            },
            user_choices_detailed: userChoices,
            category_performance: intelligence.categoryStats,
            king_of_hill_sessions: kingOfHillSessions
        };
        console.log('='.repeat(80));
        console.log('🧠 [INTELLIGENT DESIGN ANALYSIS COMPLETE]');
        console.log('✨ Session Summary with Behavioral Intelligence:');
        console.log(JSON.stringify(sessionSummary, null, 2));
        console.log('='.repeat(80));

        onGenerateLayout();
    };
    if (showRecap) {
        return (
            <div className="min-h-screen flex items-center justify-center px-md py-xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full max-w-2xl space-y-2xl"
                >
                    {/* Header */}
                    <div className="text-center space-y-md">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                            className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent-default via-indigo-600 to-purple-600 flex items-center justify-center shadow-xl"
                        >
                            <FiCheckCircle className="text-icon-xl text-white" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-h3-sm font-bold text-text-primary"
                        >
                            Session Complete
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-para-md text-text-secondary"
                        >
                            Here's what you picked across {kingOfHillSessions.length} round{kingOfHillSessions.length !== 1 ? 's' : ''}
                        </motion.p>
                    </div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="grid grid-cols-3 gap-md"
                    >
                        {[
                            { label: 'Swipes', value: userChoices.length },
                            { label: 'Rounds', value: kingOfHillSessions.length },
                            { label: 'Winners', value: kingOfHillSessions.filter(s => s.final_winner_id).length },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-background-primary-2 border border-border-default rounded-xl p-lg text-center">
                                <p className="text-h4-sm font-bold text-accent-default">{stat.value}</p>
                                <p className="text-para-xs text-text-secondary mt-xs">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* KOH winners per category */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="space-y-md"
                    >
                        <h2 className="text-para-lg font-semibold text-text-primary flex items-center gap-sm">
                            <FiAward className="text-accent-default" />
                            Category Winners
                        </h2>
                        <div className="space-y-sm">
                            {kingOfHillSessions.map((session, i) => {
                                const winner = componentMap.get(session.final_winner_id);
                                if (!winner) return (
                                    <div key={`skeleton-${i}`} className="flex items-center gap-md bg-background-primary-2 border border-border-default rounded-xl p-md animate-pulse">
                                        <div className="w-16 h-12 rounded-lg bg-background-muted flex-shrink-0" />
                                        <div className="flex-1 space-y-xs">
                                            <div className="h-3 bg-background-muted rounded w-16" />
                                            <div className="h-4 bg-background-muted rounded w-32" />
                                        </div>
                                    </div>
                                );
                                return (
                                    <motion.div
                                        key={`${session.category}-${i}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.08 }}
                                        className="flex items-center gap-md bg-background-primary-2 border border-border-default rounded-xl p-md"
                                    >
                                        {/* Thumbnail */}
                                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-background-muted flex-shrink-0">
                                            {winner?.thumbnail_url ? (
                                                <img
                                                    src={winner.thumbnail_url}
                                                    alt={winner.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <FiEye className="text-text-tertiary opacity-40" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-para-xs font-medium text-text-secondary uppercase tracking-wide">
                                                {session.category}
                                            </p>
                                            <p className="text-para-sm font-semibold text-text-primary truncate">
                                                {winner?.title ?? '—'}
                                            </p>
                                        </div>

                                        {/* Crown */}
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center">
                                            <FiAward className="text-accent-default text-icon-sm" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-md"
                    >
                        <motion.button
                            onClick={onStartOver}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-lg py-md bg-background-secondary hover:bg-background-muted border border-border-default rounded-lg font-medium text-para-sm text-text-primary transition-all flex items-center justify-center gap-sm"
                        >
                            <FiRefreshCw className="text-icon-sm" />
                            Start Over
                        </motion.button>

                        <motion.button
                            onClick={() => setShowRecap(false)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-lg py-md bg-background-secondary hover:bg-background-muted border border-border-default rounded-lg font-medium text-para-sm text-text-primary transition-all flex items-center justify-center gap-sm"
                        >
                            <FiBarChart className="text-icon-sm" />
                            See Full Analysis
                        </motion.button>

                        <motion.button
                            onClick={handleGenerateLayout}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-lg py-md bg-gradient-to-r from-accent-default to-indigo-600 hover:from-accent-hover hover:to-indigo-700 rounded-lg font-semibold text-para-sm text-white transition-all flex items-center justify-center gap-sm shadow-lg"
                        >
                            Back To Dashboard
                            <FiArrowRight className="text-icon-sm" />
                        </motion.button>Here's what you picked across {kingOfHillSessions.length} round{kingOfHillSessions.length !== 1 ? 's' : ''}

                    </motion.div>
                </motion.div>
            </div>
        );
    }
    // Show logic for both sections
    const regularLikedChoices = intelligence.likedChoicesWithComponents.filter(item => item.choice.action === 'like');
    const visibleRegularChoices = showAllRegular ? regularLikedChoices : regularLikedChoices.slice(0, 6);
    const visibleSuperChoices = showAllSuper ? intelligence.superLikedChoicesWithComponents : intelligence.superLikedChoicesWithComponents.slice(0, 6);

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-md py-xl sm:px-lg sm:py-2xl lg:px-xl">

                {/* Enhanced Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center space-y-lg mb-lg"
                >
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{
                                scale: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 },
                                rotate: { duration: 1.2, ease: "easeOut", delay: 0.4 }
                            }}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-default via-indigo-600 to-purple-600 flex items-center justify-center shadow-xl"
                        >
                            <FiZap className="text-icon-xl text-white" />
                        </motion.div>
                    </div>

                    <div className="space-y-md">
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-h3-sm lg:text-h2-sm font-bold text-text-primary"
                        >
                            Design Intelligence Decoded
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="text-para-md sm:text-para-lg text-text-secondary max-w-2xl mx-auto"
                        >
                            <span className="font-semibold text-accent-default">{userChoices.length}</span> interactions analyzed to reveal your aesthetic preferences
                        </motion.p>
                    </div>
                </motion.div>

                {/* Enhanced Behavioral Intelligence Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mb-3xl"
                >
                    <div className="bg-background-primary-2 rounded-xl lg:rounded-2xl border border-border-default p-xl lg:p-2xl shadow-md relative overflow-hidden">
                        <div className="space-y-xl">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-lg">
                                <div className="flex items-center gap-lg">
                                    <GradientIconBox
                                        icon={<FiActivity className="text-icon-md text-white" />}
                                        gradientFrom="from-cyan-500"
                                        gradientTo="to-blue-600"
                                    />
                                    <div>
                                        <h2 className="text-h5-sm sm:text-h4-sm font-semibold text-text-primary">Behavioral Intelligence</h2>
                                        <p className="text-para-sm text-text-secondary">Live analysis of your design preferences</p>
                                    </div>
                                </div>

                                {/* Enhanced Playback controls */}
                                <div className="flex items-center gap-md">
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-10 h-10 bg-accent-default flex rounded-lg shadow-sm text-white items-center justify-center"
                                    >
                                        {isPlaying ? <FaPause className="text-icon-sm" /> : <FaPlay className="text-icon-sm" />}
                                    </button>
                                    <div className="flex gap-xs">
                                        {intelligence.insights.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentInsightIndex(index)}
                                                className={`h-2 rounded-full transition-all duration-300 ${currentInsightIndex === index
                                                    ? 'bg-accent-default w-6'
                                                    : 'bg-border-muted hover:bg-border-default w-2'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Auto-cycling insights */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentInsightIndex}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="mb-xl"
                                >
                                    <p className="text-para-md sm:text-para-lg text-text-primary leading-relaxed font-medium">
                                        {intelligence.insights[currentInsightIndex]}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Enhanced Top Traits - Pill Shape */}
                            <div className="space-y-md">
                                <h3 className="text-para-lg font-semibold text-text-primary">Top Traits:</h3>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex flex-wrap gap-md"
                                >
                                    {intelligence.topTags.map((tag, index) => (
                                        <motion.div
                                            key={`${tag.tag}-${index}`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: 1 + index * 0.1,
                                                duration: 0.3
                                            }}
                                            className="px-md py-sm bg-gradient-to-r from-accent-default to-indigo-600 text-white rounded-full font-medium text-para-sm shadow-md hover:shadow-lg transition-shadow"
                                        >
                                            {tag.tag} {tag.percentage}%
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Enhanced Component Showcase */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mb-3xl"
                >
                    {/* Super-liked components */}
                    {intelligence.superLikedChoicesWithComponents.length > 0 && (
                        <div className="mb-3xl">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-lg mb-xl">
                                <div className="flex items-center gap-lg">
                                    <GradientIconBox
                                        icon={<FiHeart className="text-icon-md text-white" />}
                                        gradientFrom="from-rose-500"
                                        gradientTo="to-pink-600"
                                    />
                                    <div>
                                        <h2 className="text-h5-sm sm:text-h4-sm font-semibold text-text-primary">Your Absolute Favorites</h2>
                                        <div className="flex items-center gap-sm mt-sm">
                                            <div className="px-md py-xs bg-gradient-to-r from-rose-500 to-pink-600 text-white text-para-xs font-semibold rounded-full">
                                                {intelligence.superLikedChoicesWithComponents.length} SUPER LIKED
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {intelligence.superLikedChoicesWithComponents.length > 6 && (
                                    <button
                                        onClick={() => setShowAllSuper(!showAllSuper)}
                                        className="flex items-center gap-sm px-lg py-md bg-background-secondary hover:bg-background-muted rounded-lg transition-colors border border-border-default"
                                    >
                                        <span className="text-para-sm font-medium text-text-primary">
                                            {showAllSuper ? 'View Less' : `View All ${intelligence.superLikedChoicesWithComponents.length}`}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: showAllSuper ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiArrowRight className="text-icon-sm" />
                                        </motion.div>
                                    </button>
                                )}
                            </div>

                            {/* Desktop Grid */}
                            <div className="hidden sm:block">
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
                                >
                                    <AnimatePresence>
                                        {visibleSuperChoices.map((item, index) => (
                                            <SummaryCard
                                                key={`${item.component.component_id}-super-${index}`}
                                                component={item.component}
                                                userChoice={item.choice}
                                                isSuperlike={true}
                                                index={index}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            {/* Mobile Carousel - No Dots */}
                            <div className="sm:hidden">
                                <Swiper
                                    modules={[Autoplay]}
                                    spaceBetween={16}
                                    slidesPerView={1}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                >
                                    {intelligence.superLikedChoicesWithComponents.map((item, index) => (
                                        <SwiperSlide key={`superLiked-${item.component.component_id}-${index}`}>
                                            <SummaryCard
                                                component={item.component}
                                                userChoice={item.choice}
                                                isSuperlike={true}
                                                index={index}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    )}

                    {/* Regular liked components */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-lg mb-xl">
                            <div className="flex items-center gap-lg">
                                <GradientIconBox
                                    icon={<FiThumbsUp className="text-icon-md text-white" />}
                                    gradientFrom="from-emerald-500"
                                    gradientTo="to-green-600"
                                />
                                <div>
                                    <h2 className="text-h5-sm sm:text-h4-sm font-semibold text-text-primary">Components You Liked</h2>
                                    <div className="flex items-center gap-sm mt-sm">
                                        <div className="px-md py-xs bg-gradient-to-r from-emerald-500 to-green-600 text-white text-para-xs font-semibold rounded-full">
                                            {regularLikedChoices.length} LIKED
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {regularLikedChoices.length > 6 && (
                                <button
                                    onClick={() => setShowAllRegular(!showAllRegular)}
                                    className="flex items-center gap-sm px-lg py-md bg-background-secondary hover:bg-background-muted rounded-lg transition-colors border border-border-default"
                                >
                                    <span className="text-para-sm font-medium text-text-primary">
                                        {showAllRegular ? 'View Less' : `View All ${regularLikedChoices.length}`}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: showAllRegular ? 90 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FiArrowRight className="text-icon-sm" />
                                    </motion.div>
                                </button>
                            )}
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden sm:block">
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
                            >
                                <AnimatePresence>
                                    {visibleRegularChoices.map((item, index) => (
                                        <SummaryCard
                                            key={`${item.component.component_id}-regular-${index}`}
                                            component={item.component}
                                            userChoice={item.choice}
                                            index={index}
                                        />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        {/* Mobile Carousel - No Dots */}
                        <div className="sm:hidden">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={16}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                }}
                            >
                                {regularLikedChoices.map((item, index) => (
                                    <SwiperSlide key={`regular-${item.component.component_id}-${index}`}>
                                        <SummaryCard
                                            component={item.component}
                                            userChoice={item.choice}
                                            index={index}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </motion.div>

                {/* Enhanced Analytics Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mb-3xl"
                >
                    <div className="flex items-center gap-lg mb-xl">
                        <GradientIconBox
                            icon={<FiBarChart className="text-icon-md text-white" />}
                            gradientFrom="from-violet-500"
                            gradientTo="to-purple-600"
                        />
                        <h2 className="text-h5-sm sm:text-h4-sm font-semibold text-text-primary">Behavioral Analytics</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
                        {/* Choice Distribution */}
                        <div className="bg-background-primary-2 rounded-xl border border-border-default p-xl shadow-md">
                            <h3 className="text-para-lg font-semibold text-text-primary mb-lg flex items-center gap-sm">
                                <FiTrendingUp className="text-icon-sm text-accent-default" />
                                Choice Distribution
                            </h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={6}
                                        dataKey="value"
                                        animationBegin={0}
                                        animationDuration={1500}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-lg text-para-xs mt-md">
                                {pieData.map((entry, index) => (
                                    <div key={index} className="flex items-center gap-xs">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                        <span className="text-text-secondary font-medium">{entry.name}: <span className="font-semibold text-text-primary">{entry.value}</span></span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Category Performance */}
                        <div className="bg-background-primary-2 rounded-xl border border-border-default p-xl shadow-md">
                            <h3 className="text-para-lg font-semibold text-text-primary mb-lg flex items-center gap-sm">
                                <FiLayers className="text-icon-sm text-accent-default" />
                                Category Performance
                            </h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke="rgb(var(--border-muted))" />
                                    <PolarAngleAxis
                                        dataKey="category"
                                        tick={{ fontSize: 10, fill: 'rgb(var(--text-secondary))' }}
                                        className="text-para-xs"
                                    />
                                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                                    <Radar
                                        name="Like Rate"
                                        dataKey="value"
                                        stroke="#4338ca"
                                        fill="#4338ca"
                                        fillOpacity={0.2}
                                        animationDuration={2000}
                                    />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Decision Patterns */}
                        <div className="bg-background-primary-2 rounded-xl border border-border-default p-xl shadow-md">
                            <h3 className="text-para-lg font-semibold text-text-primary mb-lg flex items-center gap-sm">
                                <FiActivity className="text-icon-sm text-accent-default" />
                                Decision Patterns
                            </h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={behaviorData}>
                                    <defs>
                                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4338ca" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4338ca" stopOpacity={0.05} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                                    <YAxis tick={{ fontSize: 9 }} />
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4338ca"
                                        fillOpacity={1}
                                        fill="url(#colorGradient)"
                                        animationDuration={2000}
                                    />
                                    <Tooltip />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>

                {/* Enhanced Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 dark:from-background-primary-2 dark:via-accent-subtle dark:to-background-primary-2 rounded-2xl lg:rounded-3xl p-xl lg:p-3xl text-white dark:text-text-primary relative overflow-hidden shadow-2xl border border-slate-700 dark:border-border-default">

                        {/* Enhanced background effects */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-accent-default/5 to-indigo-800/10" />
                        <div className="absolute top-0 left-0 w-24 h-24 bg-accent-default/15 rounded-full blur-2xl" />
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-indigo-600/15 rounded-full blur-2xl" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-default/8 rounded-full blur-3xl" />

                        <div className="relative space-y-xl lg:space-y-2xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.4, type: "spring", stiffness: 150 }}
                                className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-accent-default via-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
                            >
                                <FiCheckCircle className="text-icon-lg lg:text-icon-xl text-white" />
                            </motion.div>

                            <div className="space-y-md">
                                <motion.h2
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.6 }}
                                    className="text-h3-sm sm:text-h2-sm lg:text-h1-sm font-bold leading-tight"
                                >
                                    Analysis Complete!
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.8 }}
                                    className="text-para-md sm:text-para-lg lg:text-h6-sm text-gray-300 dark:text-text-secondary max-w-2xl mx-auto leading-relaxed"
                                >
                                    Your design preferences have been captured and analyzed. Let's create something amazing that matches your vision.
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 }}
                                className="flex flex-col sm:flex-row gap-md sm:gap-lg justify-center max-w-xl mx-auto"
                            >
                                <motion.button
                                    onClick={onStartOver}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-lg py-md sm:px-xl bg-white/10 hover:bg-white/20 border border-white/20 dark:border-border-default rounded-lg font-medium text-para-sm sm:text-para-md transition-all flex items-center justify-center gap-sm backdrop-blur-sm"
                                >
                                    <FiRefreshCw className="text-icon-xs sm:text-icon-sm" />
                                    <span className="hidden sm:inline">Refine Preferences</span>
                                    <span className="sm:hidden">Refine</span>
                                </motion.button>

                                <motion.button
                                    onClick={handleGenerateLayout}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative px-lg py-md sm:px-xl bg-gradient-to-r from-accent-default via-indigo-600 to-accent-default hover:from-accent-hover hover:via-indigo-700 hover:to-accent-hover rounded-lg font-semibold text-para-sm sm:text-para-md transition-all flex items-center justify-center gap-sm shadow-lg hover:shadow-accent-default/25 overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <span className="relative hidden sm:inline">Continue Building</span>
                                    <span className="relative sm:hidden">Continue</span>
                                    <FiArrowRight className="text-icon-sm relative" />
                                </motion.button>
                            </motion.div>

                            <div className="flex items-center justify-center gap-md sm:gap-lg text-gray-400 dark:text-text-tertiary text-para-sm">
                                <div className="flex items-center gap-xs">
                                    <FiCheckCircle className="text-icon-sm text-accent-default" />
                                    <span className="hidden sm:inline">Preferences Locked</span>
                                    <span className="sm:hidden">Locked</span>
                                </div>
                                <div className="flex items-center gap-xs">
                                    <LuBrain className="text-icon-sm text-accent-default" />
                                    <span>Optimized</span>
                                </div>
                                <div className="flex items-center gap-xs">
                                    <FiZap className="text-icon-sm text-accent-default" />
                                    <span>Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SwiperSummary;