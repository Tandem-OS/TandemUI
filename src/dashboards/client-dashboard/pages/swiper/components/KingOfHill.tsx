import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { type ComponentPreview, type KingOfHillBehavioralSignal } from '../swiper.types';

// Audio files
const swipeAudio = "@/assets/audio/swipeAudio.mp3";
const clickAudio = "@/assets/audio/clickAudio.mp3";

// Audio player helper
const playAudio = (audioSrc: string, volumePercent: number = 100) => {
    try {
        const audio = new Audio(audioSrc);
        audio.volume = Math.min(Math.max(volumePercent / 100, 0), 1);
        audio.play().catch(error => console.log('Audio playback failed:', error));
    } catch (error) {
        console.log('Audio not available:', error);
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
    const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [shakeWinner, setShakeWinner] = useState<string | null>(null);
    const [previousChallengerId, setPreviousChallengerId] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
   
    // Track when component renders
    const componentRenderTime = useRef<number>(Date.now());

    // Play swipe audio when challenger changes
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

        // Play click audio
        playAudio(clickAudio, 40);

        const selectionTime = Date.now();
        onAnimationStart();
        setSelectedCard(winnerId);
        setIsTransitioning(true);

        // Add shake animation to winner
        setShakeWinner(winnerId);

        // Remove shake after animation duration
        setTimeout(() => {
            setShakeWinner(null);
        }, 600);

        const winnerComponent = winnerId === defender.component_id ? defender : challenger;
        const loserComponent = loserId === defender.component_id ? defender : challenger;

        // Behavioral signals for King of the Hill
        const signals: KingOfHillBehavioralSignal = {
            hesitation_ms: selectionTime - componentRenderTime.current,
            view_duration_ms: selectionTime - selectionStartTime,
            match_number: matchNumber,
            action_source: 'button'
        };

        // Log behavioral signal for debugging
        console.log(`[KING OF THE HILL - Match ${matchNumber}] Selection:`, {
            winner: winnerComponent.title,
            loser: loserComponent.title,
            hesitation: `${(signals.hesitation_ms / 1000).toFixed(2)}s`,
            view_duration: `${(signals.view_duration_ms / 1000).toFixed(2)}s`
        });

        // Delay before transitioning to next match
        setTimeout(() => {
            onSelect(winnerComponent, loserComponent, signals);
            setSelectedCard(null);
            setIsTransitioning(false);
            onAnimationComplete();
        }, 800);
    }, [defender, challenger, onSelect, selectionStartTime, matchNumber, isTransitioning, selectedCard, onAnimationStart, onAnimationComplete]);

    return (
        <div className="w-full h-full flex items-center justify-center px-sm lg:px-lg">
            <div className="w-full max-w-7xl mx-auto h-full flex items-center">
                {/* Desktop Layout - Side by Side */}
                <div className="hidden lg:flex w-full gap-lg items-center justify-center">
                    {/* Defender Card */}
                    <div className="flex-1 max-w-lg h-full max-h-[550px]">
                        <motion.button
                            onClick={() => handleSelection(defender.component_id, challenger.component_id)}
                            disabled={isTransitioning}
                            animate={shakeWinner === defender.component_id ? {
                                x: [0, -12, 12, -8, 8, -4, 4, 0],
                                rotate: [0, -8, 8, -6, 6, -3, 3, 0],
                                scale: [1, 1.05, 1, 1.03, 1, 1.01, 1, 1]
                            } : {
                                x: 0,
                                rotate: 0,
                                scale: 1
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                                times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
                            }}
                            className={`relative overflow-hidden rounded-xl shadow-lg transition-all w-full h-full ${
                                selectedCard === defender.component_id
                                    ? 'ring-4 ring-accent-default ring-opacity-50'
                                    : ''
                            } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onMouseEnter={() => !isTransitioning && setHoveredSide('left')}
                            onMouseLeave={() => setHoveredSide(null)}
                        >
                            <img
                                src={defender.thumbnail_url}
                                alt={defender.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-md">
                                <h3 className="text-white text-para-lg font-medium">
                                    {defender.title}
                                </h3>
                                <p className="text-white/80 text-para-sm">
                                    {defender.vibe}
                                </p>
                            </div>
                            {selectedCard === defender.component_id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 bg-accent-default/20 flex items-center justify-center"
                                >
                                    <FaCheck className="text-white text-icon-2xl" />
                                </motion.div>
                            )}
                            {hoveredSide === 'left' && !selectedCard && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-black/20 flex items-center justify-center"
                                >
                                    <div className="bg-background-primary/90 text-text-primary rounded-lg px-md py-sm font-semibold text-para-md shadow-xl">
                                        Select This Design
                                    </div>
                                </motion.div>
                            )}
                        </motion.button>
                    </div>

                    {/* VS Badge */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent-default/20 to-accent-hover/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border-2 border-accent-default/30">
                            <span className="text-h5-sm font-bold text-accent-default">VS</span>
                        </div>
                    </div>

                    {/* Challenger Card with AnimatePresence */}
                    <div className="flex-1 max-w-lg h-full max-h-[550px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={challenger.component_id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full"
                            >
                                <motion.button
                                    onClick={() => handleSelection(challenger.component_id, defender.component_id)}
                                    disabled={isTransitioning}
                                    animate={
                                        selectedCard === defender.component_id
                                            ? { opacity: 0, y: -50 }
                                            : shakeWinner === challenger.component_id
                                                ? {
                                                    x: [0, -12, 12, -8, 8, -4, 4, 0],
                                                    rotate: [0, -8, 8, -6, 6, -3, 3, 0],
                                                    scale: [1, 1.05, 1, 1.03, 1, 1.01, 1, 1]
                                                }
                                                : { 
                                                    opacity: 1, 
                                                    y: 0,
                                                    x: 0,
                                                    rotate: 0,
                                                    scale: 1
                                                }
                                    }
                                    transition={{
                                        duration: selectedCard === defender.component_id ? 0.3 : shakeWinner === challenger.component_id ? 0.6 : 0.3,
                                        ease: "easeInOut",
                                        ...(shakeWinner === challenger.component_id && {
                                            times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
                                        })
                                    }}
                                    className={`relative overflow-hidden rounded-xl shadow-lg transition-all w-full h-full ${
                                        selectedCard === challenger.component_id
                                            ? 'ring-4 ring-accent-default ring-opacity-50'
                                            : ''
                                    } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    onMouseEnter={() => !isTransitioning && setHoveredSide('right')}
                                    onMouseLeave={() => setHoveredSide(null)}
                                >
                                    <img
                                        src={challenger.thumbnail_url}
                                        alt={challenger.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-md">
                                        <h3 className="text-white text-para-lg font-medium">
                                            {challenger.title}
                                        </h3>
                                        <p className="text-white/80 text-para-sm">
                                            {challenger.vibe}
                                        </p>
                                    </div>
                                    {selectedCard === challenger.component_id && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute inset-0 bg-accent-default/20 flex items-center justify-center"
                                        >
                                            <FaCheck className="text-white text-icon-2xl" />
                                        </motion.div>
                                    )}
                                    {hoveredSide === 'right' && !selectedCard && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 bg-black/20 flex items-center justify-center"
                                        >
                                            <div className="bg-background-primary/90 text-text-primary rounded-lg px-md py-sm font-semibold text-para-md shadow-xl">
                                                Select This Design
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Layout - Stacked */}
                <div className="lg:hidden flex flex-col w-full h-full gap-sm" style={{ maxHeight: 'calc(100vh - 160px)' }}>
                    {/* Top Card - Defender */}
                    <div className="flex-1 min-h-0" style={{ maxHeight: '40%' }}>
                        <motion.button
                            onClick={() => handleSelection(defender.component_id, challenger.component_id)}
                            disabled={isTransitioning}
                            animate={shakeWinner === defender.component_id ? {
                                x: [0, -8, 8, -4, 4, 0],
                                rotate: [0, -4, 4, -2, 2, 0],
                                scale: [1, 1.03, 1, 1.02, 1, 1]
                            } : {
                                x: 0,
                                rotate: 0,
                                scale: 1
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                            }}
                            className={`relative overflow-hidden rounded-xl shadow-lg transition-all w-full h-full ${
                                selectedCard === defender.component_id
                                    ? 'ring-4 ring-accent-default ring-opacity-50'
                                    : ''
                            } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <img
                                src={defender.thumbnail_url}
                                alt={defender.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-md">
                                <h3 className="text-white text-para-lg font-medium">
                                    {defender.title}
                                </h3>
                                <p className="text-white/80 text-para-sm">
                                    {defender.vibe}
                                </p>
                            </div>
                            {selectedCard === defender.component_id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 bg-accent-default/20 flex items-center justify-center"
                                >
                                    <FaCheck className="text-white text-icon-2xl" />
                                </motion.div>
                            )}
                        </motion.button>
                    </div>

                    {/* VS Divider */}
                    <div className="flex items-center justify-center py-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-accent-default/20 to-accent-hover/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-accent-default/30">
                            <span className="text-para-xs font-bold text-accent-default">VS</span>
                        </div>
                    </div>

                    {/* Bottom Card - Challenger with AnimatePresence */}
                    <div className="flex-1 min-h-0" style={{ maxHeight: '40%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={challenger.component_id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full"
                            >
                                <motion.button
                                    onClick={() => handleSelection(challenger.component_id, defender.component_id)}
                                    disabled={isTransitioning}
                                    animate={
                                        selectedCard === defender.component_id
                                            ? { opacity: 0, y: -50 }
                                            : shakeWinner === challenger.component_id
                                                ? {
                                                    x: [0, -8, 8, -4, 4, 0],
                                                    rotate: [0, -4, 4, -2, 2, 0],
                                                    scale: [1, 1.03, 1, 1.02, 1, 1]
                                                }
                                                : {
                                                    x: 0,
                                                    rotate: 0,
                                                    scale: 1
                                                }
                                    }
                                    transition={{
                                        duration: selectedCard === defender.component_id ? 0.3 : shakeWinner === challenger.component_id ? 0.6 : 0.3,
                                        ease: "easeInOut",
                                        ...(shakeWinner === challenger.component_id && {
                                            times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                                        })
                                    }}
                                    className={`relative overflow-hidden rounded-xl shadow-lg transition-all w-full h-full ${
                                        selectedCard === challenger.component_id
                                            ? 'ring-4 ring-accent-default ring-opacity-50'
                                            : ''
                                    } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <img
                                        src={challenger.thumbnail_url}
                                        alt={challenger.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-md">
                                        <h3 className="text-white text-para-lg font-medium">
                                            {challenger.title}
                                        </h3>
                                        <p className="text-white/80 text-para-sm">
                                            {challenger.vibe}
                                        </p>
                                    </div>
                                    {selectedCard === challenger.component_id && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute inset-0 bg-accent-default/20 flex items-center justify-center"
                                        >
                                            <FaCheck className="text-white text-icon-2xl" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KingOfTheHill;