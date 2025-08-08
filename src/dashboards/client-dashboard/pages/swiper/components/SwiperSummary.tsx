import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FiCheckCircle, FiRefreshCw, FiStar,
    FiTrendingUp, FiLayers, FiEye, FiHeart,
    FiZap, FiActivity, FiTarget, FiAward
} from 'react-icons/fi';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from 'recharts';

// Props interface
interface SwiperSummaryProps {
    userChoices?: any[];
    roundsData?: any[];
    totalRounds?: number;
    kingOfHillSessions?: any[];
    onStartOver?: () => void;
    onGenerateLayout?: () => void;
}

// Mock data for demo
const mockData = {
    userChoices: [
        { action: 'like', category: 'Headers', behavioral_signals: { superlike_used: false, is_asked_ai: false, view_duration_ms: 2300, hesitation_ms: 800 } },
        { action: 'super-like', category: 'Headers', behavioral_signals: { superlike_used: true, is_asked_ai: true, view_duration_ms: 4200, hesitation_ms: 1200 } },
        { action: 'dislike', category: 'Cards', behavioral_signals: { superlike_used: false, is_asked_ai: false, view_duration_ms: 1100, hesitation_ms: 400 } },
        { action: 'like', category: 'Buttons', behavioral_signals: { superlike_used: false, is_asked_ai: true, view_duration_ms: 2800, hesitation_ms: 600 } },
        { action: 'like', category: 'Forms', behavioral_signals: { superlike_used: false, is_asked_ai: false, view_duration_ms: 3100, hesitation_ms: 900 } },
        { action: 'super-like', category: 'Navigation', behavioral_signals: { superlike_used: true, is_asked_ai: false, view_duration_ms: 3800, hesitation_ms: 1500 } },
        { action: 'like', category: 'Cards', behavioral_signals: { superlike_used: false, is_asked_ai: false, view_duration_ms: 1800, hesitation_ms: 500 } },
        { action: 'dislike', category: 'Footers', behavioral_signals: { superlike_used: false, is_asked_ai: true, view_duration_ms: 900, hesitation_ms: 300 } }
    ],
    roundsData: [
        { category: 'Headers' },
        { category: 'Cards' },
        { category: 'Buttons' },
        { category: 'Forms' },
        { category: 'Navigation' },
        { category: 'Footers' }
    ],
    totalRounds: 6,
    kingOfHillSessions: []
};

// Counting animation component
const CountingNumber: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 1000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (hasAnimated) return;

        let startTime: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setHasAnimated(true);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration, hasAnimated]);

    return <span>{count}{suffix}</span>;
};

const SwiperSummary: React.FC<SwiperSummaryProps> = ({
    userChoices = mockData.userChoices,
    roundsData = mockData.roundsData,
    onStartOver = () => console.log('Start Over'),
    onGenerateLayout = () => console.log('Generate Layout')
}) => {
    const [showInsights, setShowInsights] = useState(false);

    // Calculate all stats and insights
    const analytics = useMemo(() => {
        const likedCount = userChoices.filter(c => c.action === 'like').length;
        const superLikesCount = userChoices.filter(c => c.behavioral_signals?.superlike_used).length;
        const rejectedCount = userChoices.filter(c => c.action === 'dislike').length;
        const aiAssistedCount = userChoices.filter(c => c.behavioral_signals?.is_asked_ai).length;

        const totalLoved = likedCount + superLikesCount;
        const avgViewTime = userChoices.reduce((sum, c) => sum + (c.behavioral_signals?.view_duration_ms || 0), 0) / userChoices.length;
        const avgHesitation = userChoices.reduce((sum, c) => sum + (c.behavioral_signals?.hesitation_ms || 0), 0) / userChoices.length;

        // Category performance analysis
        const categoryStats = roundsData.map((round) => {
            const roundChoices = userChoices.filter(choice => choice.category === round.category);
            const liked = roundChoices.filter(c => c.action === 'like' || c.action === 'super-like').length;
            const total = roundChoices.length;
            const percentage = total > 0 ? Math.round((liked / total) * 100) : 0;
            return {
                name: round.category,
                liked,
                total,
                percentage,
                superLiked: roundChoices.filter(c => c.behavioral_signals?.superlike_used).length,
                avgViewTime: total > 0 ? roundChoices.reduce((sum, c) => sum + (c.behavioral_signals?.view_duration_ms || 0), 0) / total : 0
            };
        }).filter(cat => cat.total > 0).sort((a, b) => b.percentage - a.percentage);

        // Top 3 design preferences
        const topDesignTags = categoryStats.slice(0, 3);

        // AI-generated design personality
        let designPersonality = '';
        const likeRatio = totalLoved / userChoices.length;
        const speedCategory = avgHesitation < 800 ? 'quick' : avgHesitation < 1500 ? 'thoughtful' : 'deliberate';
        const engagementLevel = avgViewTime > 3000 ? 'detail-oriented' : avgViewTime > 2000 ? 'engaged' : 'decisive';

        if (likeRatio > 0.7) {
            designPersonality = `You're an ${engagementLevel} designer with strong aesthetic appreciation. Your ${speedCategory} decision-making shows confidence in recognizing quality design patterns.`;
        } else if (likeRatio > 0.5) {
            designPersonality = `You have a selective eye for design, being ${speedCategory} to judge and ${engagementLevel} in your evaluation process. Quality over quantity drives your choices.`;
        } else {
            designPersonality = `You're highly selective with discerning taste. Your ${speedCategory}, ${engagementLevel} approach shows you know exactly what works for your vision.`;
        }

        // Add AI assistance insight
        if (aiAssistedCount > 2) {
            designPersonality += ` You leverage AI insights to enhance your design decisions, showing a modern approach to creative problem-solving.`;
        }

        return {
            likedCount,
            superLikesCount,
            rejectedCount,
            aiAssistedCount,
            totalLoved,
            avgViewTime: Math.round(avgViewTime),
            avgHesitation: Math.round(avgHesitation),
            categoryStats,
            topDesignTags,
            designPersonality,
            decisionStyle: speedCategory === 'quick' ? 'Lightning Fast' : speedCategory === 'thoughtful' ? 'Thoughtful' : 'Deliberate',
            confidenceLevel: likeRatio > 0.7 ? 'High Confidence' : likeRatio > 0.5 ? 'Selective' : 'Ultra Selective'
        };
    }, [userChoices, roundsData]);

    useEffect(() => {
        const timer = setTimeout(() => setShowInsights(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Chart data
    const pieData = [
        { name: 'Loved', value: analytics.totalLoved, color: '#6366f1' },
        { name: 'Passed', value: analytics.rejectedCount, color: '#9ca3af' }
    ].filter(item => item.value > 0);

    const radarData = analytics.categoryStats.map(cat => ({
        category: cat.name,
        value: cat.percentage,
        fullMark: 100,
    }));

    

    return (
        <div className="min-h-screen bg-background-secondary">
            <div className="max-w-6xl mx-auto px-md py-lg sm:px-lg sm:py-xl lg:px-xl lg:py-2xl">

                {/* Header Section */}
                <div className="text-center space-y-md sm:space-y-lg mb-xl sm:mb-2xl">
                    <div className="flex justify-center mb-md sm:mb-lg">
                        <div className="relative">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-accent-default rounded-full flex items-center justify-center shadow-xl">
                                <FiZap className="text-icon-xl sm:text-icon-2xl lg:text-[2.5rem] text-white" />
                            </div>
                            <div className="absolute -top-xs -right-xs sm:-top-sm sm:-right-sm">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <FiCheckCircle className="text-icon-xs sm:text-icon-sm text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-sm sm:space-y-md">
                        <h1 className="text-h3-sm sm:text-h2-sm lg:text-h1-md font-bold text-text-primary px-md">
                            Your Design Intelligence Revealed
                        </h1>
                        <p className="text-para-md sm:text-para-lg lg:text-h6-sm text-text-secondary max-w-2xl mx-auto px-md">
                            We analyzed <span className="text-accent-default font-semibold">{userChoices.length}</span> interactions
                            to decode your unique design DNA
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-sm sm:gap-md lg:gap-lg mb-xl sm:mb-2xl">
                    <div className="bg-background-primary rounded-xl sm:rounded-2xl p-md sm:p-lg lg:p-xl text-center border border-border-default">
                        <p className="text-h5-sm sm:text-h4-sm lg:text-h3-sm font-bold text-accent-default">
                            {analytics.decisionStyle}
                        </p>
                        <p className="text-para-xs sm:text-para-sm text-text-secondary mt-xs">Decision Style</p>
                    </div>
                    <div className="bg-background-primary rounded-xl sm:rounded-2xl p-md sm:p-lg lg:p-xl text-center border border-border-default">
                        <p className="text-h5-sm sm:text-h4-sm lg:text-h3-sm font-bold text-accent-default">
                            {analytics.confidenceLevel}
                        </p>
                        <p className="text-para-xs sm:text-para-sm text-text-secondary mt-xs">Confidence</p>
                    </div>
                    <div className="bg-background-primary rounded-xl sm:rounded-2xl p-md sm:p-lg lg:p-xl text-center border border-border-default">
                        <p className="text-h5-sm sm:text-h4-sm lg:text-h3-sm font-bold text-accent-default">
                            <CountingNumber end={analytics.avgViewTime} />ms
                        </p>
                        <p className="text-para-xs sm:text-para-sm text-text-secondary mt-xs">Avg View</p>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-md lg:gap-lg mb-xl sm:mb-2xl">
                    <div className="bg-background-primary rounded-2xl lg:rounded-3xl p-lg lg:p-xl text-center border border-border-default shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-14 h-14 lg:w-18 lg:h-18 bg-accent-default rounded-2xl flex items-center justify-center mx-auto mb-md shadow-lg">
                            <FiHeart className="text-icon-md lg:text-icon-lg text-white" />
                        </div>
                        <p className="text-h3-sm lg:text-h2-sm font-bold text-text-primary mb-xs">
                            <CountingNumber end={analytics.totalLoved} />
                        </p>
                        <p className="text-para-sm lg:text-para-md text-text-secondary font-medium">Total Loved</p>
                        <p className="text-para-xs text-text-tertiary mt-xs">High quality picks</p>
                    </div>

                    <div className="bg-background-primary rounded-2xl lg:rounded-3xl p-lg lg:p-xl text-center border border-border-default shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-14 h-14 lg:w-18 lg:h-18 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-md shadow-lg">
                            <FiStar className="text-icon-md lg:text-icon-lg text-white" />
                        </div>
                        <p className="text-h3-sm lg:text-h2-sm font-bold text-text-primary mb-xs">
                            <CountingNumber end={analytics.superLikesCount} />
                        </p>
                        <p className="text-para-sm lg:text-para-md text-text-secondary font-medium">Super Liked</p>
                        <p className="text-para-xs text-text-tertiary mt-xs">Your favorites</p>
                    </div>

                    <div className="bg-background-primary rounded-2xl lg:rounded-3xl p-lg lg:p-xl text-center border border-border-default shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-14 h-14 lg:w-18 lg:h-18 bg-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-md shadow-lg">
                            <FiTarget className="text-icon-md lg:text-icon-lg text-white" />
                        </div>
                        <p className="text-h3-sm lg:text-h2-sm font-bold text-text-primary mb-xs">
                            <CountingNumber end={analytics.rejectedCount} />
                        </p>
                        <p className="text-para-sm lg:text-para-md text-text-secondary font-medium">Filtered Out</p>
                        <p className="text-para-xs text-text-tertiary mt-xs">Quality focused</p>
                    </div>

                    <div className="bg-background-primary rounded-2xl lg:rounded-3xl p-lg lg:p-xl text-center border border-border-default shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-14 h-14 lg:w-18 lg:h-18 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-md shadow-lg">
                            <FiZap className="text-icon-md lg:text-icon-lg text-white" />
                        </div>
                        <p className="text-h3-sm lg:text-h2-sm font-bold text-text-primary mb-xs">
                            <CountingNumber end={analytics.aiAssistedCount} />
                        </p>
                        <p className="text-para-sm lg:text-para-md text-text-secondary font-medium">AI Assisted</p>
                        <p className="text-para-xs text-text-tertiary mt-xs">Smart choices</p>
                    </div>
                </div>

                {/* Top Design Tags Section */}
                <div className="bg-background-primary rounded-2xl lg:rounded-3xl border border-border-default p-lg lg:p-xl shadow-xl mb-xl sm:mb-2xl">
                    <div className="flex items-center gap-md mb-lg lg:mb-xl">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-accent-subtle rounded-xl lg:rounded-2xl flex items-center justify-center">
                            <FiActivity className="text-icon-md lg:text-icon-lg text-accent-default" />
                        </div>
                        <div>
                            <h2 className="text-h4-sm sm:text-h3-sm lg:text-h2-sm font-bold text-text-primary">Top Tags You Liked Most</h2>
                            <p className="text-para-sm sm:text-para-md text-text-secondary">Your strongest design preferences</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md lg:gap-lg">
                        {analytics.topDesignTags.map((tag, idx) => (
                            <div key={tag.name} className="relative bg-accent-subtle rounded-xl lg:rounded-2xl p-md lg:p-lg border border-accent-default/20">
                                <div className="flex items-center justify-between mb-sm lg:mb-md">
                                    <h3 className="text-h6-sm sm:text-h5-sm lg:text-h4-sm font-bold text-text-primary">{tag.name}</h3>
                                    <div className="flex items-center gap-xs">
                                        <span className="text-h5-sm sm:text-h4-sm lg:text-h3-sm font-bold text-accent-default">
                                            <CountingNumber end={tag.percentage} suffix="%" />
                                        </span>
                                        {idx === 0 && <FiAward className="text-icon-sm text-amber-500" />}
                                    </div>
                                </div>
                                <p className="text-para-xs sm:text-para-sm text-text-secondary mb-sm">{tag.liked} out of {tag.total} loved</p>

                                {/* Progress bar */}
                                <div className="w-full bg-background-muted rounded-full h-2">
                                    <motion.div
                                        className="bg-accent-default h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${tag.percentage}%` }}
                                        transition={{ delay: 0.5 + idx * 0.2, duration: 1.5, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Design Personality Summary */}
                {showInsights && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-accent-subtle to-background-primary rounded-2xl lg:rounded-3xl border border-accent-default/30 p-lg lg:p-xl shadow-xl mb-xl sm:mb-2xl"
                    >
                        <div className="flex items-start gap-md mb-lg max-md:felx-col">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-accent-default rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0">
                                <FiEye className="text-icon-md lg:text-icon-lg text-white" />
                            </div>
                            <div>
                                <h2 className="text-h4-sm sm:text-h3-sm lg:text-h2-sm font-bold text-text-primary mb-sm">Your Unique Design Taste Summary</h2>
                                <p className="text-para-md sm:text-para-lg lg:text-h6-sm text-text-primary leading-relaxed">
                                    {analytics.designPersonality}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg lg:gap-xl mb-xl sm:mb-2xl">
                    {/* Pie Chart */}
                    <div className="bg-background-primary rounded-2xl lg:rounded-3xl border border-border-default p-lg lg:p-xl shadow-xl">
                        <div className="flex items-center gap-md mb-lg">
                            <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center">
                                <FiTrendingUp className="text-icon-md text-accent-default" />
                            </div>
                            <h2 className="text-h5-sm sm:text-h4-sm lg:text-h3-sm font-semibold text-text-primary">Choice Distribution</h2>
                        </div>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="transparent"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgb(var(--background-primary))',
                                        border: '1px solid rgb(var(--border-default))',
                                        borderRadius: '12px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-lg mt-md">
                            {pieData.map((entry, index) => (
                                <div key={index} className="flex items-center gap-sm">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: entry.color }}
                                    />
                                    <span className="text-para-sm text-text-secondary">
                                        {entry.name}: <span className="font-semibold text-text-primary">{entry.value}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Radar Chart */}
                    <div className="bg-background-primary rounded-2xl lg:rounded-3xl border border-border-default p-lg lg:p-xl shadow-xl">
                        <div className="flex items-center gap-md mb-lg">
                            <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center">
                                <FiLayers className="text-icon-md text-accent-default" />
                            </div>
                            <h2 className="text-h5-sm sm:text-h4-sm lg:text-h3-sm font-semibold text-text-primary">Category Preferences</h2>
                        </div>
                        <ResponsiveContainer width="100%" height={280}>
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="rgb(var(--border-muted))" />
                                <PolarAngleAxis
                                    dataKey="category"
                                    tick={{ fill: 'rgb(var(--text-secondary))', fontSize: 12 }}
                                />
                                <PolarRadiusAxis
                                    angle={90}
                                    domain={[0, 100]}
                                    tick={{ fill: 'rgb(var(--text-tertiary))', fontSize: 10 }}
                                />
                                <Radar
                                    name="Like Rate"
                                    dataKey="value"
                                    stroke="#6366f1"
                                    fill="#6366f1"
                                    fillOpacity={0.3}
                                    strokeWidth={2}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgb(var(--background-primary))',
                                        border: '1px solid rgb(var(--border-default))',
                                        borderRadius: '12px'
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center bg-gradient-to-br from-accent-subtle to-background-primary rounded-2xl lg:rounded-3xl p-xl lg:p-2xl border border-accent-default/20 shadow-2xl">
                    <div className="space-y-lg">
                        <div>
                            <h2 className="text-h3-sm sm:text-h2-sm lg:text-h1-sm font-bold text-text-primary mb-md">
                                Ready to See Your Style Come to Life?
                            </h2>
                            <p className="text-para-lg lg:text-h6-sm text-text-secondary max-w-2xl mx-auto">
                                We've decoded your design preferences. Time to transform your unique taste into a personalized website that truly represents you.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-md justify-center max-w-lg mx-auto">
                            <button
                                onClick={onStartOver}
                                className="flex-1 px-xl py-lg bg-background-primary text-text-primary hover:bg-background-muted border-2 border-border-default hover:border-accent-default rounded-xl lg:rounded-2xl font-semibold text-para-md sm:text-para-lg transition-all duration-300 flex items-center justify-center gap-sm shadow-lg hover:shadow-xl"
                            >
                                <FiRefreshCw className="text-icon-md" />
                                <span>Refine My Taste</span>
                            </button>

                            <button
                                onClick={onGenerateLayout}
                                className="flex-1 px-xl py-lg bg-accent-default hover:bg-accent-hover text-white rounded-xl lg:rounded-2xl font-bold text-para-md sm:text-para-lg transition-all duration-300 flex items-center justify-center gap-sm shadow-xl hover:shadow-2xl"
                            >
                                <FiZap className="text-icon-md" />
                                <span>Build My Site</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwiperSummary;