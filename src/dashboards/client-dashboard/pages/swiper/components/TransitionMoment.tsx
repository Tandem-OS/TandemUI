import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TransitionMomentProps {
  roundsCompleted: number;
  totalSwipes: number;
  onComplete: () => void;
  duration?: number; // ms before auto-advancing, default 2400
}

const TransitionMoment: React.FC<TransitionMomentProps> = ({
  roundsCompleted,
  totalSwipes,
  onComplete,
  duration = 2400,
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(onComplete, duration);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [duration, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-3 bg-background-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
    >
      {/* Checkmark SVG — circle then tick drawn via pathLength */}
      <div className="mb-2">
        <svg style={{ width: 72, height: 72, overflow: 'visible' }} viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <motion.circle
            cx="26" cy="26" r="24"
            stroke="var(--color-accent-default, #6c63ff)"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          />
          <motion.polyline
            points="14,27 22,35 38,18"
            stroke="var(--color-accent-default, #6c63ff)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.6 }}
          />
        </svg>
      </div>

      {/* Headline */}
      <motion.h2
        className="text-2xl font-bold text-text-primary m-0"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        Picks locked in
      </motion.h2>

      {/* Stats */}
      <motion.p
        className="text-sm text-text-secondary m-0 tracking-wide"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.0 }}
      >
        {roundsCompleted} round{roundsCompleted !== 1 ? 's' : ''} &middot;{' '}
        {totalSwipes} swipe{totalSwipes !== 1 ? 's' : ''}
      </motion.p>

      {/* Progress bar */}
      <motion.div
        className="w-40 h-[3px] rounded-full bg-background-secondary overflow-hidden mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <motion.div
          className="h-full rounded-full bg-accent-default"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: (duration - 1200) / 1000, ease: 'linear', delay: 1.2 }}
        />
      </motion.div>

      {/* Hint */}
      <motion.p
        className="text-xs text-text-secondary m-0"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        Building your layout&hellip;
      </motion.p>
    </motion.div>
  );
};

export default TransitionMoment;