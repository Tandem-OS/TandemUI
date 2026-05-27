import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaHome, FaPaintBrush } from 'react-icons/fa';
import { containerVariant } from '../../lib/animations/variants';
import SimpleButton from '../demos/buttons/SimpleButton';
import { useNavigate } from 'react-router-dom';
import SuccessAnimation from '../animations-components/SuccessAnimation';
import Heading from '../demos/typography/Heading';
import { layoutTokens } from '@/design-system/tokens/layout';

const t = layoutTokens.onboardComplete;

const OnboardComplete: React.FC = () => {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={t.root}>
            <div className={t.inner}>
                <div className={t.centerWrapper}>
                    <motion.div
                        variants={containerVariant}
                        initial="initial"
                        animate="animate"
                        className={t.card}
                    >
                        <div className={t.contentArea}>
                            <SuccessAnimation
                                showConfetti={true}
                                confettiCount={80}
                                confettiDuration={4000}
                            />
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
                                style={t.motionStyle}
                            >
                                <div className={t.iconWrapper}>
                                    <FaRocket className="text-icon-2xl text-accent-default" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                    delay: 0.4
                                }}
                                style={t.motionStyle}
                            >
                                <Heading level="h1">
                                    Let's Build
                                </Heading>
                            </motion.div>

                            <div className={t.contentReserved}>
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
                                            style={t.motionStyle}
                                        >
                                            <p className="text-h3-sm md:text-h1-sm text-text-secondary mb-md font-semibold">
                                                Your Vision starts here.
                                            </p>
                                            <p className="text-para-md text-text-primary max-w-md mx-auto font-light mb-lg">
                                                A seamless, visual journey tailored to your taste.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className={t.buttonsRow}>
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
                                            style={t.motionStyle}
                                        >
                                            <div className={t.buttonsInner}>
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
                                                    style={t.motionStyle}
                                                >
                                                    <SimpleButton
                                                        variant="solid"
                                                        size="lg"
                                                        className="w-full sm:w-auto"
                                                        onClick={() => navigate("/intake")}
                                                    >
                                                        <FaPaintBrush className="mr-sm" />
                                                        Pick Your Style
                                                    </SimpleButton>
                                                </motion.div>

                                                <SimpleButton
                                                    variant="outline"
                                                    size="lg"
                                                    className="w-full sm:w-auto"
                                                    onClick={() => navigate('/dashboard/client')}
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