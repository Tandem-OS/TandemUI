import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaHome, FaPaintBrush } from 'react-icons/fa';
import { containerVariant } from '../../lib/animations/variants';
import SimpleButton from '../demos/buttons/SimpleButton';
import SimpleHeader from '../Headers/SimpleHeader/SimpleHeader';
import { useNavigate } from 'react-router-dom';
import SuccessAnimation from '../animations-components/SuccessAnimation';

const OnboardComplete: React.FC = () => {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);

    // Show content after initial animation
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 800);

        return () => clearTimeout(timer);
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
                        <div className="relative min-h-[500px] z-10 text-center flex flex-col items-center justify-start">
                            {/* Confetti Animation */}
                            <SuccessAnimation
                                showConfetti={true}
                                confettiCount={80}
                                confettiDuration={4000}
                            />
                            {/* Icon with animation */}
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
                                <div className="w-24 h-24 bg-accent-subtle dark:bg-opacity-20 rounded-full flex items-center justify-center">
                                    <FaRocket className="text-5xl text-accent-default" />
                                </div>
                            </motion.div>

                            {/* Title with bounce animation */}
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

                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                                    Let's Build
                                </h1>
                            </motion.div>

                            {/* Content wrapper with reserved space */}
                            <div className="min-h-[100px] flex flex-col justify-start">
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

                            {/* Buttons */}
                            <div className="min-h-[60px] flex items-center mt-lg lg:mt-none">
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
                                            style={{
                                                willChange: 'transform, opacity',
                                                transformOrigin: 'center'
                                            }}
                                        >
                                            <div className="flex flex-col sm:flex-row gap-sm justify-center items-center">
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
                                                    onClick={() => navigate('/dashboard/designer')}
                                                >
                                                    <FaHome className="mr-sm" />
                                                    Go to Dashboard
                                                </SimpleButton>
                                            </div>
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