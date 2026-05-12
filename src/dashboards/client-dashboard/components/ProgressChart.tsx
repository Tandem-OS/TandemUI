import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from 'recharts';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { getChartStages, projectStatusToClientProgress } from '@/lib/helpers/projectStatusToClientProgress';
import type { ProjectStatus } from '@/lib/helpers/canPerformAction';

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const isActive = payload[0]?.payload?.isActive;
        const isPast = payload[0]?.payload?.isPast;
        return (
            <div className="bg-background-primary-2 p-md rounded-lg shadow-lg border border-border-default">
                <p className="text-para-sm font-medium text-text-primary mb-xs">
                    {label}
                </p>
                <p className="text-para-sm text-accent-default">
                    {payload[0].value}% complete
                </p>
                {isActive && (
                    <p className="text-para-xs text-text-secondary mt-xs">
                        ← You are here
                    </p>
                )}
                {isPast && (
                    <p className="text-para-xs text-text-success mt-xs">
                        ✓ Completed
                    </p>
                )}
            </div>
        );
    }
    return null;
};

const ProgressChart = () => {
    const projectStatus = useSelector(
        (state: RootState) => state.project.status
    ) as ProjectStatus;

    const stages = getChartStages(projectStatus);
    const currentProgress = projectStatusToClientProgress(projectStatus);

    // Build chart data — show all stages but clip progress line at current stage
    const chartData = stages.map((stage) => ({
        name: stage.name,
        progress: stage.isPast || stage.isActive ? stage.progress : null,
        ghost: stage.progress, // faint dotted line for future stages
        isActive: stage.isActive,
        isPast: stage.isPast,
    }));

    const activeStage = stages.find((s) => s.isActive);

    return (
        <div className="w-full space-y-sm">
            {/* Current status label */}
            <div className="flex items-center justify-between px-xs">
                <span className="text-para-xs text-text-tertiary">Current stage</span>
                <span className="text-para-sm font-medium text-accent-default">
                    {currentProgress.label}
                </span>
            </div>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="progressGradientChart" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4d43e4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4d43e4" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="ghostGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-border-muted"
                        />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#64748b', fontSize: 11 }}
                            interval={0}
                            angle={-30}
                            textAnchor="end"
                            height={50}
                        />
                        <YAxis
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            domain={[0, 100]}
                            ticks={[0, 25, 50, 75, 100]}
                            tickFormatter={(v) => `${v}%`}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        {/* Future stages — faint ghost line */}
                        <Area
                            type="monotone"
                            dataKey="ghost"
                            stroke="#94a3b8"
                            strokeWidth={1}
                            strokeDasharray="4 4"
                            fill="url(#ghostGradient)"
                            dot={false}
                            activeDot={false}
                            connectNulls
                        />

                        {/* Actual progress line */}
                        <Area
                            type="monotone"
                            dataKey="progress"
                            stroke="#4d43e4"
                            strokeWidth={3}
                            fill="url(#progressGradientChart)"
                            dot={{ fill: '#4d43e4', r: 3 }}
                            activeDot={{ r: 6, fill: '#4d43e4' }}
                            connectNulls={false}
                        />

                        {/* Current stage marker */}
                        {activeStage && (
                            <ReferenceLine
                                x={activeStage.name}
                                stroke="#4d43e4"
                                strokeDasharray="4 4"
                                strokeWidth={1.5}
                                label={{
                                    value: '▲',
                                    position: 'top',
                                    fill: '#4d43e4',
                                    fontSize: 10,
                                }}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProgressChart;
