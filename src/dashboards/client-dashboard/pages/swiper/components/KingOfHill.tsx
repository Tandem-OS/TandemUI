import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaCrown, FaFire } from 'react-icons/fa';
import { type ComponentPreview, type KingOfHillBehavioralSignal } from '../swiper.types';

import swipeAudio from "@/assets/audio/swipeAudio.mp3";
import clickAudio from "@/assets/audio/clickAudio.mp3";

const playAudio = (audioSrc: string, volumePercent: number = 100) => {
    try {
        const audio = new Audio(audioSrc);
        audio.volume = Math.min(Math.max(volumePercent / 100, 0), 1);
        audio.play().catch(() => {});
    } catch {
        // Audio not available
    }
};

interface KingOfTheHillProps {
    defender: ComponentPreview;
    challenger: ComponentPreview;
    onSelect: (winner: ComponentPreview, loser: ComponentPreview, signals: KingOfHillBehavioralSignal) => void;
    matchNumber: number;
    isAnimating: boolean;
    onAnimationStart: () => void;
    onAnimationComplete: () => void;
}

const KingOfTheHill: React.FC<KingOfTheHillProps> = ({
    defender,
    challenger,
    onSelect,
    matchNumber,
    isAnimating,
    onAnimationStart,
    onAnimationComplete,
}) => {
    const [selectionStartTime] = useState<number>(Date.now());
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [shakeWinner, setShakeWinner] = useState<string | null>(null);
    const [previousChallengerId, setPreviousChallengerId] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const componentRenderTime = useRef<number>(Date.now());

    useEffect(() => {
        if (challenger && previousChallengerId !== null && challenger.component_id !== previousChallengerId && isInitialized) {
            playAudio(swipeAudio, 70);
        }
        if (challenger) {
            setPreviousChallengerId(challenger.component_id);
        }
    }, [challenger, previousChallengerId, isInitialized]);

    useEffect(() => {
        setIsInitialized(true);
    }, []);

    const handleSelection = useCallback((winnerId: string, loserId: string) => {
        if (isAnimating || isTransitioning || selectedCard !== null) return;

        playAudio(clickAudio, 40);

        const selectionTime = Date.now();
        onAnimationStart();
        setSelectedCard(winnerId);
        setIsTransitioning(true);
        setShakeWinner(winnerId);

        setTimeout(() => {
            setShakeWinner(null);
        }, 400);

        const winnerComponent = winnerId === defender.component_id ? defender : challenger;
        const loserComponent = loserId === defender.component_id ? defender : challenger;

        const signals: KingOfHillBehavioralSignal = {
            hesitation_ms: selectionTime - componentRenderTime.current,
            view_duration_ms: selectionTime - selectionStartTime,
            match_number: matchNumber,
            action_source: 'button'
        };

        setTimeout(() => {
            onSelect(winnerComponent, loserComponent, signals);
            setSelectedCard(null);
            setIsTransitioning(false);
            onAnimationComplete();
        }, 1000);
    }, [defender, challenger, onSelect, selectionStartTime, matchNumber, isTransitioning, selectedCard, onAnimationStart, onAnimationComplete]);

    const BattleCard = ({
        component,
        isDefender,
        isMobile = false
    }: {
        component: ComponentPreview;
        side: 'left' | 'right';
        isDefender: boolean;
        isMobile?: boolean;
    }) => {
        const [isCardHovered, setIsCardHovered] = useState(false);
        const isWinner = selectedCard === component.component_id;
        const isShaking = shakeWinner === component.component_id;

        return (
            <motion.button
                onClick={() => handleSelection(
                    component.component_id,
                    component.component_id === defender.component_id ? challenger.component_id : defender.component_id
                )}
                disabled={isTransitioning}
                animate={
                    isShaking
                        ? {
                            x: isMobile ? [0, -8, 8, -4, 4, 0] : [0, -12, 12, -8, 8, -4, 4, 0],
                            rotate: isMobile ? [0, -4, 4, -2, 2, 0] : [0, -8, 8, -6, 6, -3, 3, 0],
                            scale: isMobile ? [1, 1.03, 1, 1.02, 1, 1] : [1, 1.05, 1, 1.03, 1, 1.01, 1, 1]
                        }
                        : undefined
                }
                transition={
                    isShaking
                        ? {
                            duration: 0.4,
                            ease: "easeInOut",
                            times: isMobile ? [0, 0.2, 0.4, 0.6, 0.8, 1] : [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
                        }
                        : undefined
                }
                className={`
                    relative overflow-hidden rounded-xl shadow-lg transition-all w-full h-full
                    ${isWinner ? 'ring-4 ring-accent-default shadow-2xl' : ''}
                    ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}
                    ${isMobile ? 'touch-manipulation' : ''}
                `}
                onMouseEnter={() => !isTransitioning && !isMobile && setIsCardHovered(true)}
                onMouseLeave={() => !isMobile && setIsCardHovered(false)}
            >
                {isDefender && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="absolute top-sm left-sm z-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-sm py-xs rounded-lg flex items-center gap-xs shadow-lg"
                    >
                        <FaCrown className="text-icon-xs" />
                        <span className="text-para-xs font-bold">Defender</span>
                    </motion.div>
                )}

                {!isDefender && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="absolute top-sm right-sm z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-sm py-xs rounded-lg flex items-center gap-xs shadow-lg"
                    >
                        <FaFire className="text-icon-xs" />
                        <span className="text-para-xs font-bold">Challenger</span>
                    </motion.div>
                )}


                <div className="w-full h-full overflow-hidden">
                    <motion.img
                        src={component.thumbnail_url}
                        alt={component.title ?? undefined}
                        className="w-full h-full object-cover"
                        animate={isCardHovered && !isMobile && !isShaking ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className={`
                    absolute bottom-0 left-0 right-0 
                    bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                    p-md ${isMobile ? 'pb-sm' : ''}
                `}>
                    <div>
                        <h3 className={`text-white ${isMobile ? 'text-para-md' : 'text-para-lg'} font-semibold mb-xs`}>
                            {component.title ??''}
                        </h3>
                        <p className={`text-white/90 ${isMobile ? 'text-para-xs' : 'text-para-sm'}`}>
                            {component.vibe}
                        </p>
                    </div>
                </div>

                <AnimatePresence>
                    {isWinner && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-accent-default/15 flex items-center justify-center"
                        >
                            {isShaking && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                    className="bg-white rounded-full p-md shadow-xl"
                                >
                                    <FaCheck className="text-accent-default text-icon-xl" />
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isCardHovered && !selectedCard && !isMobile && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-black/20 flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 10 }}
                                animate={{ scale: 1, y: 0 }}
                                className="bg-background-primary/95 text-text-primary rounded-xl px-lg py-md font-semibold text-para-md shadow-xl"
                            >
                                Select This Design
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        );
    };

    return (
        <div className="w-full h-full flex items-center justify-center px-sm lg:px-lg">
            <div className="w-full max-w-7xl mx-auto h-full flex items-center">
                {/* Desktop Layout */}
                <div className="hidden lg:flex w-full gap-lg items-start justify-center">
                    {/* Defender Card */}
                    <div className="flex-1 max-w-2xl aspect-[4/3] rounded-xl" style={{ isolation: 'isolate', overflow: 'clip' }}>
                        <BattleCard
                            component={defender}
                            side="left"
                            isDefender={true}
                        />
                    </div>

                    {/* VS Badge */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center self-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                            className="w-16 h-16 bg-gradient-to-br from-accent-default to-accent-hover rounded-full flex items-center justify-center shadow-xl"
                        >
                            <span className="text-h5-sm font-bold text-white">VS</span>
                        </motion.div>
                    </div>

                    {/* Challenger Card */}
                    <div className="flex-1 max-w-2xl aspect-[4/3] overflow-hidden rounded-xl" style={{ isolation: 'isolate' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={challenger.component_id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full"
                            >
                                <BattleCard
                                    component={challenger}
                                    side="right"
                                    isDefender={false}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden flex flex-col w-full h-full gap-sm" style={{ maxHeight: 'calc(100vh - 140px)' }}>
                    <div className="flex-1 min-h-0" style={{ maxHeight: '42%' }}>
                        <BattleCard
                            component={defender}
                            side="left"
                            isDefender={true}
                            isMobile={true}
                        />
                    </div>

                    <div className="flex items-center justify-center py-xs">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                            className="w-10 h-10 bg-gradient-to-br from-accent-default to-accent-hover rounded-full flex items-center justify-center shadow-lg"
                        >
                            <span className="text-para-xs font-bold text-white">VS</span>
                        </motion.div>
                    </div>

                    <div className="flex-1 min-h-0" style={{ maxHeight: '42%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={challenger.component_id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full"
                            >
                                <BattleCard
                                    component={challenger}
                                    side="right"
                                    isDefender={false}
                                    isMobile={true}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KingOfTheHill;
