import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Smooth Confetti particle component
const ConfettiParticle = ({ colors }: { colors?: string[] }) => {
    const defaultColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    const colorPalette = colors || defaultColors;
    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const randomX = (Math.random() - 0.5) * 800;
    const randomY = -100 - Math.random() * 300; // Explode upward and outward
    const randomRotate = Math.random() * 720;
    const randomScale = 0.8 + Math.random() * 0.6; // Slightly bigger particles
    const randomDelay = Math.random() * 0.3;

    return (
        <motion.div
            className="absolute w-3 h-3 rounded-full pointer-events-none"
            style={{
                backgroundColor: randomColor,
                left: '50%',
                top: '20%', // Start from around the icon/text area
                willChange: 'transform, opacity',
                transformOrigin: 'center',
            }}
            initial={{
                x: 0,
                y: 0,
                scale: 0,
                rotate: 0,
                opacity: 0
            }}
            animate={{
                x: randomX,
                y: randomY,
                scale: randomScale,
                rotate: randomRotate,
                opacity: [0, 1, 1, 0] // Smooth fade in and out
            }}
            transition={{
                duration: 2.5,
                delay: randomDelay,
                ease: [0.25, 0.46, 0.45, 0.94], // Smooth custom easing
                opacity: {
                    duration: 2.5,
                    times: [0, 0.15, 0.8, 1], // Quick fade in, long visible, smooth fade out
                    ease: "easeOut"
                }
            }}
        />
    );
};

export interface SuccessAnimationProps {
    // Animation props
    showConfetti?: boolean;
    confettiCount?: number;
    confettiColors?: string[];
    confettiDuration?: number;
    
    // Callback when animation completes
    onAnimationComplete?: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
    showConfetti = true,
    confettiCount = 80,
    confettiColors,
    confettiDuration = 4000,
    onAnimationComplete
}) => {
    const [confettiActive, setConfettiActive] = useState(showConfetti);

    useEffect(() => {
        // Hide confetti after animation completes
        const confettiTimer = setTimeout(() => {
            setConfettiActive(false);
            onAnimationComplete?.();
        }, confettiDuration);

        return () => {
            clearTimeout(confettiTimer);
        };
    }, [confettiDuration, onAnimationComplete]);

    return (
        <div className="absolute inset-0 pointer-events-none z-40">
            {/* Smooth Confetti Container */}
            <AnimatePresence>
                {confettiActive && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            contain: 'layout style',
                            transform: 'translateZ(0)', // Force GPU acceleration
                        }}
                    >
                        {Array.from({ length: confettiCount }).map((_, i) => (
                            <ConfettiParticle key={i} colors={confettiColors} />
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SuccessAnimation;