import React, { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FiCheckCircle, FiAward, FiRefreshCw, FiStar, FiZap, FiThumbsUp, FiThumbsDown, FiTrendingUp, FiLayers } from 'react-icons/fi';
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

// Define Props interface
interface SwiperSummaryProps {
    userChoices: any[];
    roundsData: any[];
    totalRounds: number;
    kingOfHillSessions: any[];
    onStartOver: () => void;
    onGenerateLayout: () => void;
}

// Define the structure for our calculated stats
interface CalculatedStats {
    likedCount: number;
    superLikesCount: number;
    rejectedChoicesCount: number;
    aiAssistanceCount: number;
    categoryPerformance: { name: string; liked: number; total: number; percentage: number }[];
}

const SwiperSummary: React.FC<SwiperSummaryProps> = ({
    userChoices,
    roundsData,
    totalRounds,
    kingOfHillSessions,
    onStartOver,
    onGenerateLayout
}) => {
    // Calculate stats with enhanced category performance
    const stats: CalculatedStats = useMemo(() => {
        const likedCount = userChoices.filter(c => c.action === 'like').length;
        const superLikesCount = userChoices.filter(c => c.behavioral_signals?.superlike_used).length;
        const rejectedChoicesCount = userChoices.filter(c => c.action === 'dislike').length;
        const aiAssistanceCount = userChoices.filter(c => c.behavioral_signals?.is_asked_ai).length;

        // Enhanced category performance with percentages
        const categoryPerformance = roundsData.map((round) => {
            const roundChoices = userChoices.filter(choice => choice.category === round.category);
            const liked = roundChoices.filter(c => c.action === 'like' || c.action === 'super-like').length;
            const total = roundChoices.length;
            return {
                name: round.category,
                liked: liked,
                total: total,
                percentage: total > 0 ? Math.round((liked / total) * 100) : 0
            };
        }).filter(cat => cat.total > 0)
          .sort((a, b) => b.percentage - a.percentage);

        return {
            likedCount,
            superLikesCount,
            rejectedChoicesCount,
            aiAssistanceCount,
            categoryPerformance,
        };
    }, [userChoices, roundsData]);

    const handleGenerateLayoutClick = () => {
        const sessionSummary = {
            session_id: `session_${Date.now()}`,
            total_rounds: totalRounds,
            completed_at: new Date().toISOString(),
            total_choices: userChoices.length,
            summary_counts: {
                likes: stats.likedCount,
                super_likes: stats.superLikesCount,
                rejected: stats.rejectedChoicesCount,
                ai_assistance_used: stats.aiAssistanceCount,
            },
            behavioral_insights: {
                overall_average_hesitation_ms: userChoices.reduce((sum, choice) => sum + (choice.behavioral_signals?.hesitation_ms || 0), 0) / userChoices.length,
                overall_average_view_duration_ms: userChoices.reduce((sum, choice) => sum + (choice.behavioral_signals?.view_duration_ms || 0), 0) / userChoices.length,
            },
            user_choices_detailed: userChoices,
            king_of_hill_sessions: kingOfHillSessions
        };

        console.log('='.repeat(80));
        console.log('✅ [SESSION LAYOUT DATA GENERATED]');
        console.log(JSON.stringify(sessionSummary, null, 2));
        console.log('='.repeat(80));

        onGenerateLayout();
    };
    
    // Data for enhanced pie chart - using token colors
    const pieData = [
        { name: 'Liked', value: stats.likedCount, color: 'rgb(var(--accent-default))' },
        { name: 'Super Liked', value: stats.superLikesCount, color: 'rgb(var(--text-warning))' },
        { name: 'Rejected', value: stats.rejectedChoicesCount, color: 'rgb(var(--text-tertiary))' }
    ].filter(item => item.value > 0);

    // Data for radar chart (category preferences)
    const radarData = stats.categoryPerformance.map(cat => ({
        category: cat.name,
        value: cat.percentage,
        fullMark: 100,
    }));

    // Animation Variants
    const containerVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };
    const itemVariants: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    // Stat Card Component
    const StatCard = ({ icon: Icon, label, value, color, delay = 0 }: any) => (
        <motion.div 
            variants={itemVariants} 
            transition={{ delay }} 
            className="bg-background-primary border border-border-default rounded-2xl p-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
            <div className="flex flex-col items-center text-center space-y-md">
                <div className={`w-16 h-16 lg:w-20 lg:h-20 ${color} rounded-2xl flex items-center justify-center shadow-md`}>
                    <Icon className="text-icon-xl lg:text-icon-2xl text-background-primary" />
                </div>
                <div>
                    <p className="text-h2-sm lg:text-h1-sm font-bold text-text-primary">
                        {value}
                    </p>
                    <p className="text-para-sm text-text-secondary font-medium mt-xs">{label}</p>
                </div>
            </div>
        </motion.div>
    );

    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background-primary border border-border-default rounded-lg p-sm shadow-lg">
                    <p className="text-para-sm text-text-primary font-medium">{label}</p>
                    <p className="text-para-xs text-accent-default">{`${payload[0].value}${payload[0].name === 'value' ? '%' : ''}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-background-secondary">
            <div className="max-w-7xl mx-auto px-md py-xl lg:px-xl lg:py-2xl">
                <motion.div 
                    variants={containerVariants} 
                    initial="initial" 
                    animate="animate" 
                    className="space-y-xl lg:space-y-2xl"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="text-center space-y-md">
                        <div className="flex justify-center mb-lg">
                            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-accent-subtle rounded-full flex items-center justify-center shadow-lg">
                                <FiAward className="text-icon-2xl lg:text-[3.5rem] text-accent-default" />
                            </div>
                        </div>
                        <h1 className="text-h2-md lg:text-h1-md font-bold text-text-primary">
                            Design Discovery Complete!
                        </h1>
                        <p className="text-para-lg lg:text-h6-sm text-text-secondary max-w-3xl mx-auto">
                            Excellent job! You've reviewed <span className="text-accent-default font-semibold">{userChoices.length}</span> components and picked your favorites.
                        </p>
                    </motion.div>

                    {/* Stat Cards Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-md lg:gap-lg">
                        <StatCard 
                            icon={FiThumbsUp} 
                            label="Liked" 
                            value={stats.likedCount} 
                            color="bg-accent-default" 
                            delay={0.1} 
                        />
                        <StatCard 
                            icon={FiStar} 
                            label="Super Liked" 
                            value={stats.superLikesCount} 
                            color="bg-text-warning" 
                            delay={0.2} 
                        />
                        <StatCard 
                            icon={FiThumbsDown} 
                            label="Rejected" 
                            value={stats.rejectedChoicesCount} 
                            color="bg-text-tertiary" 
                            delay={0.3} 
                        />
                        <StatCard 
                            icon={FiZap} 
                            label="AI Assisted" 
                            value={stats.aiAssistanceCount} 
                            color="bg-text-info" 
                            delay={0.4} 
                        />
                    </div>

                    {/* Charts Section */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-xl'>
                        {/* Pie Chart */}
                        <motion.div 
                            variants={itemVariants} 
                            className="bg-background-primary rounded-2xl border border-border-default p-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-md mb-lg">
                                <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center">
                                    <FiTrendingUp className="text-icon-md text-accent-default" />
                                </div>
                                <h2 className="text-h4-md lg:text-h3-sm font-semibold text-text-primary">
                                    Choice Distribution
                                </h2>
                            </div>
                            <ResponsiveContainer width="100%" height={320}>
                                <PieChart>
                                    <Pie 
                                        data={pieData} 
                                        cx="50%" 
                                        cy="50%" 
                                        innerRadius={60} 
                                        outerRadius={100} 
                                        paddingAngle={8} 
                                        dataKey="value"
                                        animationBegin={0}
                                        animationDuration={1000}
                                        stroke="transparent"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'rgb(var(--background-primary))', 
                                            border: '1px solid rgb(var(--border-default))', 
                                            borderRadius: '12px',
                                            padding: '12px'
                                        }} 
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex flex-wrap justify-center gap-md mt-lg">
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
                        </motion.div>

                        {/* Radar Chart for Categories */}
                        <motion.div 
                            variants={itemVariants} 
                            className="bg-background-primary rounded-2xl border border-border-default p-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-md mb-lg">
                                <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center">
                                    <FiLayers className="text-icon-md text-accent-default" />
                                </div>
                                <h2 className="text-h4-md lg:text-h3-sm font-semibold text-text-primary">
                                    Category Preferences
                                </h2>
                            </div>
                            <ResponsiveContainer width="100%" height={320}>
                                <RadarChart data={radarData}>
                                    <PolarGrid 
                                        gridType="polygon"
                                        radialLines={false}
                                        stroke="rgb(var(--border-muted) / 0.5)"
                                    />
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
                                        stroke="rgb(var(--accent-default))" 
                                        fill="rgb(var(--accent-default))" 
                                        fillOpacity={0.3}
                                        strokeWidth={2}
                                        animationBegin={0}
                                        animationDuration={1500}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div 
                        variants={itemVariants} 
                        className="flex flex-col sm:flex-row gap-md justify-center pt-xl"
                    >
                        <motion.button 
                            whileHover={{ y: -2 }} 
                            whileTap={{ scale: 0.98 }} 
                            onClick={onStartOver} 
                            className="px-2xl py-lg bg-background-primary text-text-primary hover:bg-background-muted border-2 border-border-default hover:border-accent-default rounded-2xl font-semibold text-para-lg transition-all duration-300 flex items-center justify-center gap-md min-w-[240px] shadow-md hover:shadow-lg"
                        >
                            <FiRefreshCw className="text-icon-md" />
                            Start Over
                        </motion.button>
                        <motion.button 
                            whileHover={{ y: -2 }} 
                            whileTap={{ scale: 0.98 }} 
                            onClick={handleGenerateLayoutClick} 
                            className="px-2xl py-lg bg-accent-default hover:bg-accent-hover text-accent-foreground rounded-2xl font-semibold text-para-lg transition-all duration-300 flex items-center justify-center gap-md min-w-[240px] shadow-lg hover:shadow-xl"
                        >
                            <FiCheckCircle className="text-icon-md" />
                            Generate My Layout
                        </motion.button>
                    </motion.div>
                    
                </motion.div>
            </div>
        </div>
    );
};

export default SwiperSummary;