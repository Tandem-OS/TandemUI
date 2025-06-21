import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaHome, FaPaintBrush } from 'react-icons/fa';
import { containerVariant } from '../../lib/animations/variants';
import SimpleButton from '../demos/buttons/SimpleButton';
import Heading from '../demos/typography/Heading';
import SimpleHeader from '../Headers/SimpleHeader/SimpleHeader';
import { useNavigate } from 'react-router-dom';

// Smooth Confetti particle component
const ConfettiParticle = () => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
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
                top: '20%', // Start from around the rocket/text area
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

const OnboardComplete: React.FC = () => {
    const [showContent, setShowContent] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Show content after initial animation
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 800);

        // Hide confetti after animation completes
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false);
        }, 4000); // Increased time for slower animation

        return () => {
            clearTimeout(timer);
            clearTimeout(confettiTimer);
        };
    }, []);

    return (
        <div className="relative min-h-screen flex bg-slate-100 dark:bg-gray-900 transition-colors overflow-hidden">
            <div className="flex-1 flex flex-col z-10">
                <SimpleHeader />

                <div className="flex-1 flex items-center justify-center px-lg">
                    <motion.div
                        variants={containerVariant}
                        initial="initial"
                        animate="animate"
                        className="w-full max-w-3xl mx-auto relative"
                    >
                        {/* Smooth Confetti Container */}
                        <AnimatePresence>
                            {showConfetti && (
                                <div
                                    className="absolute inset-0 pointer-events-none z-40"
                                    style={{
                                        contain: 'layout style',
                                        transform: 'translateZ(0)', // Force GPU acceleration
                                    }}
                                >
                                    {Array.from({ length: 80 }).map((_, i) => ( // Increased confetti count
                                        <ConfettiParticle key={i} />
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Main Content - Fixed height to prevent layout shift */}
                        <div className="relative z-10 text-center flex flex-col items-center justify-start min-h-[500px]">
                            {/* Rocket Icon with animation */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.2
                                }}
                                className="mb-md"
                                style={{
                                    willChange: 'transform',
                                    transformOrigin: 'center'
                                }}
                            >
                                <div className="w-24 h-24 bg-accent-subtle max-lg:bg-opacity-20 dark:bg-opacity-20 rounded-full flex items-center justify-center">
                                    <FaRocket className="text-5xl text-accent-default" />
                                </div>
                            </motion.div>

                            {/* Hurray Text with bounce animation */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                    delay: 0.4
                                }}
                                className="mb-sm"
                                style={{
                                    willChange: 'transform, opacity',
                                    transformOrigin: 'center'
                                }}
                            >
                                <Heading level="h1" className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                                    Hurray!
                                </Heading>
                            </motion.div>

                            {/* Content wrapper with reserved space */}
                            <div className="h-[100px] flex flex-col justify-start">
                                <AnimatePresence>
                                    {showContent && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                            style={{
                                                willChange: 'transform, opacity',
                                                transformOrigin: 'center'
                                            }}
                                        >
                                            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-md font-semibold">
                                                Your Vision starts here.
                                            </p>
                                            <p className="text-para-md text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                                A seamless, visual journey tailored to your taste.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Buttons with reserved space */}
                            <div className="h-[60px] flex items-center mt-lg lg:mt-none">
                                <AnimatePresence>
                                    {showContent && (
                                        <motion.div
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -30, opacity: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.2,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                            className="flex flex-col sm:flex-row gap-sm justify-center items-center"
                                            style={{
                                                willChange: 'transform, opacity',
                                                transformOrigin: 'center'
                                            }}
                                        >
                                            {/* Primary button with subtle pulse animation */}
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.02, 1],
                                                    opacity: [1, 0.95, 1]
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    delay: 1,
                                                    repeat: Infinity,
                                                    repeatDelay: 1,
                                                    ease: [0.4, 0, 0.6, 1]
                                                }}
                                                style={{
                                                    willChange: 'transform, opacity',
                                                    transformOrigin: 'center'
                                                }}
                                            >
                                                <SimpleButton
                                                    variant="solid"
                                                    size="lg"
                                                    className="w-full sm:w-auto min-w-[200px]"
                                                    onClick={() => navigate("/intake")}
                                                >
                                                    <FaPaintBrush className="mr-sm" />
                                                    Pick Your Style
                                                </SimpleButton>
                                            </motion.div>

                                            <SimpleButton
                                                variant="outline"
                                                size="lg"
                                                className="w-full sm:w-auto min-w-[200px]"
                                                onClick={() => navigate('/intake')}
                                            >
                                                <FaHome className="mr-sm" />
                                                Go to Dashboard
                                            </SimpleButton>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default OnboardComplete;