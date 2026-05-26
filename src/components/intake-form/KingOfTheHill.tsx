// KingOfTheHill.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTrophy, FaMedal, FaRedo, FaGripVertical, FaExpand, FaTimes } from 'react-icons/fa';
import SuccessAnimation from '../animations-components/SuccessAnimation';
import { vibesImages, TONE_METADATA } from './constants';
import { type VibeScore } from './types';
import swipeAudio from "../../assets/audio/swipeAudio.mp3";
import winAudio from "../../assets/audio/winAudio.mp3";
import clickAudio from "../../assets/audio/clickAudio.mp3";

const playAudio = (audioSrc: string, volumePercent: number = 100) => {
    const audio = new Audio(audioSrc);
    audio.volume = Math.min(Math.max(volumePercent / 100, 0), 1);
    audio.play().catch(() => { });
};

interface Comparison {
    winnerId: number;
    loserId: number;
}

interface KingOfTheHillProps {
    onComplete: (winners: string[]) => void;
    onRetake?: () => void;
    showResultsInitially?: boolean;
    completedTones?: string[];
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
    src: string;
    name: string;
    slug: string;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, name, slug, onClose }) => {
    const meta = TONE_METADATA[slug];

    // Close on ESC key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="relative bg-background-primary rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-sm right-sm z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                        aria-label="Close preview"
                    >
                        <FaTimes className="text-para-sm" />
                    </button>

                    {/* Full image */}
                    <div className="w-full overflow-hidden" style={{ maxHeight: '55vh' }}>
                        <img
                            src={src}
                            alt={name}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>

                    {/* Metadata panel */}
                    <div className="p-lg flex flex-col gap-sm overflow-y-auto">
                        <h3 className="text-h3-sm font-bold text-text-primary">{name}</h3>

                        {meta?.description && (
                            <p className="text-para-sm text-text-secondary leading-relaxed">
                                {meta.description}
                            </p>
                        )}

                        {meta?.tags && meta.tags.length > 0 && (
                            <div className="flex flex-wrap gap-xs mt-xs">
                                {meta.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-sm py-xs rounded-full bg-background-muted text-text-tertiary text-para-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// ─── Battle card ─────────────────────────────────────────────────────────────

interface BattleCardProps {
    vibe: typeof vibesImages[0];
    opponentId: number;
    selectedCard: number | null;
    isTransitioning: boolean;
    shakeWinner: number | null;
    animateOut?: boolean;
    onSelect: (winnerId: number, loserId: number) => void;
    onExpand: (vibe: typeof vibesImages[0]) => void;
}

const BattleCard: React.FC<BattleCardProps> = ({
    vibe,
    opponentId,
    selectedCard,
    isTransitioning,
    shakeWinner,
    animateOut = false,
    onSelect,
    onExpand,
}) => {
    const meta = TONE_METADATA[vibe.slug ?? ''];
    const isSelected = selectedCard === vibe.id;
    const isShaking = shakeWinner === vibe.id;

    return (
        <div className="relative w-full md:w-auto">
            <motion.button
                onClick={() => onSelect(vibe.id, opponentId)}
                disabled={isTransitioning}
                animate={
                    animateOut && selectedCard === opponentId
                        ? { opacity: 0, y: -50 }
                        : isShaking
                            ? {
                                x: [0, -12, 12, -8, 8, -4, 4, 0],
                                rotate: [0, -8, 8, -6, 6, -3, 3, 0],
                                scale: [1, 1.05, 1, 1.03, 1, 1.01, 1, 1]
                            }
                            : animateOut
                                ? { opacity: 1, y: 0 }
                                : {}
                }
                transition={{
                    duration: animateOut && selectedCard === opponentId
                        ? 0.3
                        : isShaking
                            ? 0.6
                            : 0.3,
                    ease: 'easeInOut',
                    ...(isShaking && { times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] })
                }}
                className={`relative overflow-hidden rounded-xl shadow-lg transition-all w-full md:w-72
                    ${isSelected ? 'ring-4 ring-accent-default ring-opacity-50' : ''}
                    ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                <img
                    src={vibe.src}
                    alt={vibe.name}
                    className="w-full md:w-72 h-80 object-cover"
                />

                {/* Bottom gradient overlay — name + description */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-md">
                    <h3 className="text-white text-para-lg font-semibold leading-tight">
                        {vibe.name}
                    </h3>
                    {meta?.description && (
                        <p className="text-white/70 text-para-xs mt-xs line-clamp-2 leading-snug">
                            {meta.description}
                        </p>
                    )}
                </div>

                {/* Selected overlay */}
                {isSelected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-accent-default/20 flex items-center justify-center"
                    >
                        <FaCheck className="text-white text-icon-2xl" />
                    </motion.div>
                )}
            </motion.button>

            {/* Expand button — top right, outside the main button to avoid event conflict */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onExpand(vibe);
                }}
                className="absolute top-sm right-sm z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                aria-label={`Preview ${vibe.name} in full`}
            >
                <FaExpand className="text-para-xs" />
            </button>
        </div>
    );
};

// ─── Main component ───────────────────────────────────────────────────────────

export const KingOfTheHill: React.FC<KingOfTheHillProps> = ({
    onComplete,
    onRetake,
    showResultsInitially = false,
    completedTones = []
}) => {
    const [currentWinner, setCurrentWinner] = useState<typeof vibesImages[0] | null>(null);
    const [challenger, setChallenger] = useState<typeof vibesImages[0] | null>(null);
    const [remainingOptions, setRemainingOptions] = useState<typeof vibesImages>([]);
    const [scores, setScores] = useState<VibeScore[]>([]);
    const [comparisons, setComparisons] = useState<Comparison[]>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [showResults, setShowResults] = useState(showResultsInitially);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [shakeWinner, setShakeWinner] = useState<number | null>(null);
    const [previousChallengerId, setPreviousChallengerId] = useState<number | null>(null);
    const [sortedWinners, setSortedWinners] = useState<VibeScore[]>([]);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [draggedOverItem, setDraggedOverItem] = useState<number | null>(null);

    // Lightbox state
    const [lightboxVibe, setLightboxVibe] = useState<typeof vibesImages[0] | null>(null);

    const handleExpand = useCallback((vibe: typeof vibesImages[0]) => {
        setLightboxVibe(vibe);
    }, []);

    const handleCloseLightbox = useCallback(() => {
        setLightboxVibe(null);
    }, []);

    // Play swipe audio when challenger changes
    useEffect(() => {
        if (challenger && previousChallengerId !== null && challenger.id !== previousChallengerId && isInitialized) {
            playAudio(swipeAudio);
        }
        if (challenger) {
            setPreviousChallengerId(challenger.id);
        }
    }, [challenger, previousChallengerId, isInitialized]);

    useEffect(() => {
        if (completedTones.length && !isInitialized) {
            const preScored: VibeScore[] = completedTones.map((toneLabel) => {
                const match = vibesImages.find(vibe =>
                    vibe.slug === toneLabel || vibe.name.toLowerCase() === toneLabel.toLowerCase()
                );
                if (match) {
                    return { ...match, wins: 1, losses: 0 };
                }
                return null;
            }).filter(Boolean) as VibeScore[];

            if (preScored.length) {
                setScores(preScored);
                setSortedWinners(preScored);
                setShowResults(true);
                setIsInitialized(true);
                onComplete(preScored.map(v => v.slug ?? v.name.toLowerCase()));
            }
        }
    }, [completedTones, isInitialized]);

    const calculateTournamentRanking = (scores: VibeScore[], comparisons: Comparison[]) => {
        const headToHead = new Map<string, boolean>();
        comparisons.forEach(comp => {
            headToHead.set(`${comp.winnerId}-${comp.loserId}`, true);
            headToHead.set(`${comp.loserId}-${comp.winnerId}`, false);
        });

        const participantIds = new Set<number>();
        comparisons.forEach(comp => {
            participantIds.add(comp.winnerId);
            participantIds.add(comp.loserId);
        });

        const participants = scores.filter(s => participantIds.has(s.id));

        return participants.sort((a, b) => {
            const aBeatsB = headToHead.get(`${a.id}-${b.id}`);
            const bBeatsA = headToHead.get(`${b.id}-${a.id}`);
            if (aBeatsB === true) return -1;
            if (bBeatsA === true) return 1;

            const aWinRate = a.wins / (a.wins + a.losses || 1);
            const bWinRate = b.wins / (b.wins + b.losses || 1);
            if (aWinRate !== bWinRate) return bWinRate - aWinRate;

            return (b.wins + b.losses) - (a.wins + a.losses);
        });
    };

    const initializeGame = () => {
        const initialScores = vibesImages.map(vibe => ({ ...vibe, wins: 0, losses: 0 }));
        setScores(initialScores);
        setComparisons([]);

        const shuffled = [...vibesImages].sort(() => Math.random() - 0.5);
        setCurrentWinner(shuffled[0]);
        setChallenger(shuffled[1]);
        setRemainingOptions(shuffled.slice(2));
        setIsInitialized(true);
    };

    const resetGame = () => {
        setShowResults(false);
        setSelectedCard(null);
        setIsTransitioning(false);
        setShowConfetti(false);
        setSortedWinners([]);
        initializeGame();
        if (onRetake) onRetake();
    };

    useEffect(() => {
        if (!isInitialized) {
            if (showResultsInitially && completedTones.length > 0) {
                const mockScores = vibesImages.map(vibe => ({
                    ...vibe,
                    wins: completedTones.includes(vibe.slug ?? '') || completedTones.includes(vibe.name.toLowerCase()) ? 3 : 1,
                    losses: completedTones.includes(vibe.slug ?? '') || completedTones.includes(vibe.name.toLowerCase()) ? 0 : 2
                }));
                setScores(mockScores);

                const winnersInOrder = completedTones.map(tone =>
                    mockScores.find(s => s.slug === tone || s.name.toLowerCase() === tone)
                ).filter(Boolean) as VibeScore[];
                setSortedWinners(winnersInOrder);
                setShowResults(true);
                window.scrollTo(0, 0);
                setIsInitialized(true);
            } else {
                initializeGame();
            }
        }
    }, []);

    const handleSelection = (winnerId: number, loserId: number) => {
        if (selectedCard !== null || isTransitioning) return;

        playAudio(clickAudio, 40);
        setSelectedCard(winnerId);
        setIsTransitioning(true);

        const newScores = [...scores];
        const winnerIndex = newScores.findIndex(s => s.id === winnerId);
        const loserIndex = newScores.findIndex(s => s.id === loserId);
        if (winnerIndex !== -1) newScores[winnerIndex].wins += 1;
        if (loserIndex !== -1) newScores[loserIndex].losses += 1;
        setScores(newScores);

        const newComparisons = [...comparisons, { winnerId, loserId }];
        setComparisons(newComparisons);

        setShakeWinner(winnerId);
        setTimeout(() => setShakeWinner(null), 600);

        if (remainingOptions.length === 0) {
            setTimeout(() => {
                setShowResults(true);
                setShowConfetti(true);
                playAudio(winAudio);

                const rankedResults = calculateTournamentRanking(newScores, newComparisons);
                const actualWinners = rankedResults.filter(s => s.wins > 0);
                const topVibes = actualWinners.slice(0, Math.min(3, actualWinners.length));
                setSortedWinners(topVibes);

                // Use slug as the stored value so it matches TONE_METADATA keys
                onComplete(topVibes.map(s => s.slug ?? s.name.toLowerCase()));

                setTimeout(() => setShowConfetti(false), 4000);
            }, 800);
        } else {
            setTimeout(() => {
                const winner = winnerId === currentWinner!.id ? currentWinner : challenger;
                const nextChallenger = remainingOptions[0];
                setCurrentWinner(winner);
                setChallenger(nextChallenger);
                setRemainingOptions(remainingOptions.slice(1));
                setSelectedCard(null);
                setIsTransitioning(false);
            }, 800);
        }
    };

    const handleDragStart = (index: number) => setDraggedItem(index);
    const handleDragEnter = (index: number) => setDraggedOverItem(index);

    const handleDragEnd = () => {
        if (draggedItem !== null && draggedOverItem !== null && draggedItem !== draggedOverItem) {
            const newSortedWinners = [...sortedWinners];
            const draggedContent = newSortedWinners[draggedItem];
            newSortedWinners.splice(draggedItem, 1);
            newSortedWinners.splice(draggedOverItem, 0, draggedContent);
            setSortedWinners(newSortedWinners);
            onComplete(newSortedWinners.map(w => w.slug ?? w.name.toLowerCase()));
        }
        setDraggedItem(null);
        setDraggedOverItem(null);
    };

    const getPlacementText = (index: number) => {
        switch (index) {
            case 0: return '1st';
            case 1: return '2nd';
            case 2: return '3rd';
            default: return '';
        }
    };

    if (!showResults && (!currentWinner || !challenger)) return null;

    return (
        <>
            {/* Lightbox */}
            {lightboxVibe && (
                <Lightbox
                    src={lightboxVibe.src}
                    name={lightboxVibe.name}
                    slug={lightboxVibe.slug ?? ''}
                    onClose={handleCloseLightbox}
                />
            )}

            <div className="relative w-full">
                <AnimatePresence mode="wait">
                    {!showResults ? (
                        <div className="space-y-sm">
                            <div className="flex flex-col md:flex-row gap-md justify-center items-center">

                                {/* Current Winner card */}
                                <BattleCard
                                    vibe={currentWinner!}
                                    opponentId={challenger!.id}
                                    selectedCard={selectedCard}
                                    isTransitioning={isTransitioning}
                                    shakeWinner={shakeWinner}
                                    onSelect={handleSelection}
                                    onExpand={handleExpand}
                                />

                                {/* VS */}
                                <div className="text-h2-sm font-bold text-accent-default px-md">VS</div>

                                {/* Challenger card — animates in on change */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={challenger!.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full md:w-auto"
                                    >
                                        <BattleCard
                                            vibe={challenger!}
                                            opponentId={currentWinner!.id}
                                            selectedCard={selectedCard}
                                            isTransitioning={isTransitioning}
                                            shakeWinner={shakeWinner}
                                            animateOut
                                            onSelect={handleSelection}
                                            onExpand={handleExpand}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center space-y-sm relative"
                        >
                            <SuccessAnimation
                                showConfetti={showConfetti}
                                confettiCount={80}
                                confettiDuration={4000}
                            />

                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                                className="mb-md mt-none"
                                style={{ willChange: 'transform', transformOrigin: 'center' }}
                            >
                                <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto">
                                    <FaTrophy className="text-icon-2xl text-yellow-500" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.4 }}
                                style={{ willChange: 'transform, opacity', transformOrigin: 'center' }}
                            >
                                <h3 className="text-h3-sm md:text-h2-sm font-bold text-accent-default mb-lg">
                                    Your Visual Direction {sortedWinners.length === 1 ? 'Winner' : 'Winners'}!
                                </h3>
                                {sortedWinners.length !== 1 && (
                                    <p className="text-para-sm text-text-tertiary mb-md">
                                        Drag to reorder your preferences
                                    </p>
                                )}
                            </motion.div>

                            <div className="flex flex-col md:flex-row justify-center gap-md items-start">
                                {sortedWinners.map((winner, index) => {
                                    const meta = TONE_METADATA[winner.slug ?? ''];
                                    return (
                                        <motion.div
                                            key={winner.id}
                                            initial={{ scale: 0, rotate: -10 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: index * 0.2 + 0.6 }}
                                            className="relative cursor-move"
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragEnter={() => handleDragEnter(index)}
                                            onDragEnd={handleDragEnd}
                                            style={{
                                                opacity: draggedItem === index ? 0.5 : 1,
                                                transform: draggedOverItem === index ? 'scale(1.05)' : 'scale(1)',
                                                transition: 'transform 0.2s'
                                            }}
                                        >
                                            <div className={`rounded-xl overflow-hidden shadow-lg relative ${index === 0 ? 'ring-4 ring-yellow-400' : ''}`}>
                                                <img
                                                    src={winner.src}
                                                    alt={winner.name}
                                                    className={`${index === 0 ? 'w-48 h-48' : 'w-40 h-40'} object-cover`}
                                                />

                                                {/* Expand button on result card */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleExpand(winner);
                                                    }}
                                                    className="absolute top-sm right-sm z-10 w-7 h-7 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                                                    aria-label={`Preview ${winner.name}`}
                                                >
                                                    <FaExpand className="text-para-xs" />
                                                </button>

                                                <div className="absolute top-sm left-sm">
                                                    {index === 0 ? (
                                                        <FaTrophy className="text-yellow-400 text-icon-xl" />
                                                    ) : index === 1 ? (
                                                        <FaMedal className="text-gray-400 text-icon-lg" />
                                                    ) : (
                                                        <FaMedal className="text-orange-600 text-icon-lg" />
                                                    )}
                                                </div>

                                                <div className="absolute bottom-sm left-sm bg-black/50 p-xs rounded">
                                                    <FaGripVertical className="text-white text-para-sm" />
                                                </div>
                                            </div>

                                            <p className="mt-xs text-para-md font-medium text-text-primary">
                                                {winner.name}
                                            </p>
                                            <p className="text-para-sm font-bold text-accent-default">
                                                {getPlacementText(index)}
                                            </p>

                                            {/* Description on result cards */}
                                            {meta?.description && (
                                                <p className="text-para-xs text-text-tertiary mt-xs max-w-[160px] leading-snug line-clamp-2">
                                                    {meta.description}
                                                </p>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="mt-md">
                                <button
                                    onClick={resetGame}
                                    className="flex items-center gap-xs mx-auto text-accent-default hover:text-accent-hover text-para-sm transition-colors"
                                >
                                    <FaRedo /> Retake Visual Direction
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
