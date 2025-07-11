// VideoPlayBtn.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import clsx from 'clsx';

interface VideoPlayBtnProps {
    /** Play/Pause state */
    isPlaying: boolean;

    /** Click handler */
    onClick: () => void;

    /** Button size variant */
    size?: 'sm' | 'md' | 'lg' | 'xl';

    /** Additional CSS classes */
    className?: string;
}

const VideoPlayBtn: React.FC<VideoPlayBtnProps> = ({
    isPlaying,
    onClick,
    size = 'lg',
    className = ''
}) => {
    const sizeClasses = {
        sm: 'w-12 h-12 text-icon-sm',
        md: 'w-16 h-16 text-icon-md',
        lg: 'w-20 h-20 text-icon-lg',
        xl: 'w-24 h-24 text-icon-xl'
    };

    return (
        <motion.button
            className={clsx(
                'relative flex items-center justify-center rounded-full',
                'bg-background-primary/80 backdrop-blur-sm',
                'border-2 border-border-default/30',
                'transition-all duration-300',
                'hover:bg-background-primary/90 hover:scale-105',
                'focus:outline-none focus:ring-4 focus:ring-accent-default/30',
                sizeClasses[size],
                className
            )}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: isPlaying ? 0.3 : 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                key={isPlaying ? 'pause' : 'play'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
            >
                {isPlaying ? (
                    <FaPause className="text-text-primary ml-0" />
                ) : (
                    <FaPlay className="text-text-primary ml-1" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default VideoPlayBtn;