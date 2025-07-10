import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
    { name: 'Start', progress: 0, tasks: 0 },
    { name: 'Intake', progress: 25, tasks: 1 },
    { name: 'Preferences', progress: 50, tasks: 2 },
    { name: 'Current', progress: 65, tasks: 2 },
    { name: 'Feedback', progress: 80, tasks: 3 },
    { name: 'Complete', progress: 100, tasks: 4 }
];

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 p-md rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <p className="text-para-sm font-poppins text-slate-900 dark:text-white mb-xs">
                    {label}
                </p>
                <p className="text-para-sm text-accent-default">
                    Progress: {payload[0].value}%
                </p>
            </div>
        );
    }
    return null;
};

const ProgressChart = () => {
    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4d43e4" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#4d43e4" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        className="font-poppins"
                    />
                    <YAxis
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        domain={[0, 100]}
                        ticks={[0, 25, 50, 75, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="progress"
                        stroke="#4d43e4"
                        strokeWidth={3}
                        fill="url(#progressGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressChart;