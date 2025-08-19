import React, { useEffect, useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pre-calc utility for randomness
const getRandomProps = (colors?: string[]) => {
  const defaultColors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];
  const colorPalette = colors || defaultColors;

  return {
    color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
    x: (Math.random() - 0.5) * 800,
    y: -100 - Math.random() * 300,
    rotate: Math.random() * 720,
    scale: 0.8 + Math.random() * 0.6,
    delay: Math.random() * 0.3,
  };
};

// Confetti Particle (memoized for performance)
const ConfettiParticle = memo(
  ({ particle }: { particle: ReturnType<typeof getRandomProps> }) => {
    return (
      <motion.div
        className="absolute w-3 h-3 rounded-full pointer-events-none"
        style={{
          backgroundColor: particle.color,
          left: "50%",
          top: "20%",
          willChange: "transform, opacity",
          transformOrigin: "center",
        }}
        initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 }}
        animate={{
          x: particle.x,
          y: particle.y,
          scale: particle.scale,
          rotate: particle.rotate,
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.5,
          delay: particle.delay,
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: {
            duration: 2.5,
            times: [0, 0.15, 0.8, 1],
            ease: "easeOut",
          },
        }}
      />
    );
  }
);

ConfettiParticle.displayName = "ConfettiParticle";

export interface SuccessAnimationProps {
  showConfetti?: boolean;
  confettiCount?: number;
  confettiColors?: string[];
  confettiDuration?: number;
  onAnimationComplete?: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  showConfetti = true,
  confettiCount = 80,
  confettiColors,
  confettiDuration = 4000,
  onAnimationComplete,
}) => {
  const [confettiActive, setConfettiActive] = useState(showConfetti);

  // Pre-generate particles once for performance
  const particles = useMemo(
    () => Array.from({ length: confettiCount }, () => getRandomProps(confettiColors)),
    [confettiCount, confettiColors]
  );

  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setConfettiActive(false);
      onAnimationComplete?.();
    }, confettiDuration);

    return () => clearTimeout(confettiTimer);
  }, [confettiDuration, onAnimationComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {confettiActive && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              contain: "layout style",
              transform: "translate3d(0,0,0)", // Force GPU acceleration
            }}
          >
            {particles.map((particle, i) => (
              <ConfettiParticle key={i} particle={particle} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuccessAnimation;
