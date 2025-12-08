import React from 'react';
import { type SwiperProgressProps } from '../swiper.types';

const SwipeProgress: React.FC<SwiperProgressProps> = ({
    current,
    total,
    className = ''
}) => {
    // Fix: Show 0% at start, calculate based on completed rounds (current - 1)
    const completedRounds = Math.max(0, current - 1);
    const percentage = Math.round((completedRounds / total) * 100);

    return (
        <div className={`flex flex-col items-end space-y-xs ${className}`}>

            {/* Progress text - showing rounds */}
            <div className="text-text-secondary text-para-sm font-medium">
                Round {current} of {total}
            </div>

            {/* Progress bar */}
            <div className="w-24 md:w-32 lg:w-40 h-2 bg-background-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-accent-default rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Percentage */}
            <div className="text-text-tertiary text-para-xs">
                {percentage}% complete
            </div>
        </div>
    );
};

export default SwipeProgress;