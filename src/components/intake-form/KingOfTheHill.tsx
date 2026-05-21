// KingOfTheHill.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTrophy, FaMedal, FaRedo, FaGripVertical } from 'react-icons/fa';
import SuccessAnimation from '../animations-components/SuccessAnimation';
import { vibesImages } from './constants';
import { type VibeScore } from './types';
import swipeAudio from "../../assets/audio/swipeAudio.mp3";
import winAudio from "../../assets/audio/winAudio.mp3";
import clickAudio from "../../assets/audio/clickAudio.mp3";

const playAudio = (audioSrc: string, volumePercent: number = 100) => {
    const audio = new Audio(audioSrc);
    audio.volume = Math.min(Math.max(volumePercent / 100, 0), 1);
    audio.play().catch(() => { });
};

// New interface for tracking head-to-head comparisons
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
    const [comparisons, setComparisons] = useState<Comparison[]>([]); // New state for tracking comparisons
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

    // Play swipe audio when challenger changes (new slide appears)
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
                const match = vibesImages.find(vibe => vibe.name.toLowerCase() === toneLabel.toLowerCase());
                if (match) {
                    return {
                        ...match,
                        wins: 1,
                        losses: 0,
                        score: 1,
                    };
                }
                return null;
            }).filter(Boolean) as VibeScore[];

            if (preScored.length) {
                setScores(preScored);
                setSortedWinners(preScored);
                setShowResults(true);
                setIsInitialized(true);
                onComplete(preScored.map(v => v.name));
            }
        }
    }, [completedTones, isInitialized]);

    // Tournament ranking algorithm
    const calculateTournamentRanking = (scores: VibeScore[], comparisons: Comparison[]) => {
        // Create a map of head-to-head results
        const headToHead = new Map<string, boolean>();

        comparisons.forEach(comp => {
            headToHead.set(`${comp.winnerId}-${comp.loserId}`, true);
            headToHead.set(`${comp.loserId}-${comp.winnerId}`, false);
        });

        // Get only participants who actually appeared in comparisons (actually played)
        const participantIds = new Set<number>();
        comparisons.forEach(comp => {
            participantIds.add(comp.winnerId);
            participantIds.add(comp.loserId);
        });

        const participants = scores.filter(s => participantIds.has(s.id));

        // Sort using tournament logic
        const sorted = participants.sort((a, b) => {
            // First check head-to-head if they played against each other
            const aBeatsB = headToHead.get(`${a.id}-${b.id}`);
            const bBeatsA = headToHead.get(`${b.id}-${a.id}`);

            if (aBeatsB === true) return -1; // a wins
            if (bBeatsA === true) return 1;  // b wins

            // If no direct comparison, use win percentage
            const aWinRate = a.wins / (a.wins + a.losses || 1);
            const bWinRate = b.wins / (b.wins + b.losses || 1);

            if (aWinRate !== bWinRate) {
                return bWinRate - aWinRate; // Higher win rate first
            }

            // If same win rate, prefer more total games (more proven)
            const aTotalGames = a.wins + a.losses;
            const bTotalGames = b.wins + b.losses;
            return bTotalGames - aTotalGames;
        });

        return sorted;
    };

    const initializeGame = () => {
        // Initialize scores
        const initialScores = vibesImages.map(vibe => ({
            ...vibe,
            wins: 0,
            losses: 0
        }));
        setScores(initialScores);
        setComparisons([]); // Reset comparisons

        // Set initial match
        const shuffled = [...vibesImages].sort(() => Math.random() - 0.5);
        setCurrentWinner(shuffled[0]);
        setChallenger(shuffled[1]);
        setRemainingOptions(shuffled.slice(2));
        setIsInitialized(true);
    };

    const resetGame = () => {
        // Reset all game state
        setShowResults(false);
        setSelectedCard(null);
        setIsTransitioning(false);
        setShowConfetti(false);
        setSortedWinners([]);

        initializeGame();

        // Call onRetake callback if provided
        if (onRetake) {
            onRetake();
        }
    };

    useEffect(() => {
        if (!isInitialized) {
            if (showResultsInitially && completedTones.length > 0) {
                // Create mock scores based on completed tones
                const mockScores = vibesImages.map(vibe => ({
                    ...vibe,
                    wins: completedTones.includes(vibe.name.toLowerCase()) ? 3 : 1,
                    losses: completedTones.includes(vibe.name.toLowerCase()) ? 0 : 2
                }));
                setScores(mockScores);

                // Set sorted winners based on completed tones order
                const winnersInOrder = completedTones.map(tone =>
                    mockScores.find(s => s.name.toLowerCase() === tone)
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

        // Play click audio when card is selected
        playAudio(clickAudio, 40);

        setSelectedCard(winnerId);
        setIsTransitioning(true);

        // Update scores
        const newScores = [...scores];
        const winnerIndex = newScores.findIndex(s => s.id === winnerId);
        const loserIndex = newScores.findIndex(s => s.id === loserId);

        if (winnerIndex !== -1) newScores[winnerIndex].wins += 1;
        if (loserIndex !== -1) newScores[loserIndex].losses += 1;

        setScores(newScores);

        // Record the comparison
        const newComparisons = [...comparisons, { winnerId, loserId }];
        setComparisons(newComparisons);

        // Add shake animation to winner
        setShakeWinner(winnerId);

        // Remove shake after animation duration
        setTimeout(() => {
            setShakeWinner(null);
        }, 600);

        // Check if we should continue
        if (remainingOptions.length === 0) {
            // Show results immediately
            setTimeout(() => {
                setShowResults(true);
                setShowConfetti(true);

                // Play win audio when showing results
                playAudio(winAudio);

                // Use tournament ranking instead of simple win/loss ratio
                const rankedResults = calculateTournamentRanking(newScores, newComparisons);

                // Only show actual winners (those with wins > 0), not all participants
                const actualWinners = rankedResults.filter(s => s.wins > 0);

                // Take top 3 or less if fewer winners
                const topVibes = actualWinners.slice(0, Math.min(3, actualWinners.length));
                setSortedWinners(topVibes);

                // Call onComplete with the sorted names
                const topVibeNames = topVibes.map(s => s.name.toLowerCase());
                onComplete(topVibeNames);

                // Hide confetti after animation completes
                setTimeout(() => {
                    setShowConfetti(false);
                }, 4000);
            }, 800);
        } else {
            // Continue with next challenger - update immediately
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

    // Drag and drop handlers
    const handleDragStart = (index: number) => {
        setDraggedItem(index);
    };

    const handleDragEnter = (index: number) => {
        setDraggedOverItem(index);
    };

    const handleDragEnd = () => {
        if (draggedItem !== null && draggedOverItem !== null && draggedItem !== draggedOverItem) {
            const newSortedWinners = [...sortedWinners];
            const draggedContent = newSortedWinners[draggedItem];

            // Remove the dragged item
            newSortedWinners.splice(draggedItem, 1);

            // Insert it at the new position
            newSortedWinners.splice(draggedOverItem, 0, draggedContent);

            setSortedWinners(newSortedWinners);

            // Update the form data with new order
            const newToneOrder = newSortedWinners.map(w => w.name.toLowerCase());
            onComplete(newToneOrder);
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
        <div className="relative w-full">
            <AnimatePresence mode="wait">
                {!showResults ? (
                    <div className="space-y-sm">
                        {/* Battle Cards */}
                        <div className="flex flex-col md:flex-row gap-md justify-center items-center">
                            {/* Current Winner */}
                            <div className="relative w-full md:w-auto">
                                <motion.button
                                    onClick={() => handleSelection(currentWinner!.id, challenger!.id)}
                                    disabled={isTransitioning}
                                    animate={shakeWinner === currentWinner!.id ? {
                                        x: [0, -12, 12, -8, 8, -4, 4, 0],
                                        rotate: [0, -8, 8, -6, 6, -3, 3, 0],
                                        scale: [1, 1.05, 1, 1.03, 1, 1.01, 1, 1]
                                    } : {}}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeInOut",
                                        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
                                    }}
                                    className={`relative overflow-hidden rounded-xl shadow-lg transition-all w-full md:w-72 ${selectedCard === currentWinner!.id
                                        ? 'ring-4 ring-accent-default ring-opacity-50'
                                        : ''
                                        } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <img
                                        src={currentWinner!.src}
                                        alt={currentWinner!.name}
                                        className="w-full md:w-72 h-80 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-md">
                                        <h3 className="text-white text-para-lg font-medium">
                                            {currentWinner!.name}
                                        </h3>
                                    </div>
                                    {selectedCard === currentWinner!.id && (
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

                            {/* VS */}
                            <div className="text-h2-sm font-bold text-accent-default px-md">
                                VS
                            </div>

                            {/* Challenger */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={challenger!.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full md:w-auto"
                                >
                                    <motion.button
                                        onClick={() => handleSelection(challenger!.id, currentWinner!.id)}
                                        disabled={isTransitioning}
                                        animate={
                                            selectedCard === currentWinner!.id
                                                ? { opacity: 0, y: -50 }
                                                : shakeWinner === challenger!.id
                                                    ? {
                                                        x: [0, -12, 12, -8, 8, -4, 4, 0],
                                                        rotate: [0, -8, 8, -6, 6, -3, 3, 0],
                                                        scale: [1, 1.05, 1, 1.03, 1, 1.01, 1, 1]
                                                    }
                                                    : { opacity: 1, y: 0 }
                                        }
                                        transition={{
                                            duration: selectedCard === currentWinner!.id ? 0.3 : shakeWinner === challenger!.id ? 0.6 : 0.3,
                                            ease: "easeInOut",
                                            ...(shakeWinner === challenger!.id && {
                                                times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]
                                            })
                                        }}
                                        className={`relative overflow-hidden rounded-xl shadow-lg transition-all w-full md:w-72 ${selectedCard === challenger!.id
                                            ? 'ring-4 ring-accent-default ring-opacity-50'
                                            : ''
                                            } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <img
                                            src={challenger!.src}
                                            alt={challenger!.name}
                                            className="w-full md:w-72 h-80 object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-md">
                                            <h3 className="text-white text-para-lg font-medium">
                                                {challenger!.name}
                                            </h3>
                                        </div>
                                        {selectedCard === challenger!.id && (
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
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-sm relative"
                    >
                        {/* Confetti Animation */}
                        <SuccessAnimation
                            showConfetti={showConfetti}
                            confettiCount={80}
                            confettiDuration={4000}
                        />

                        {/* Big Trophy with smooth animation */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2
                            }}
                            className="mb-md mt-none"
                            style={{
                                willChange: 'transform',
                                transformOrigin: 'center'
                            }}
                        >
                            <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto">
                                <FaTrophy className="text-icon-2xl text-yellow-500" />
                            </div>
                        </motion.div>

                        {/* Smaller, bold heading */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                                delay: 0.4
                            }}
                            style={{
                                willChange: 'transform, opacity',
                                transformOrigin: 'center'
                            }}
                        >
                            <h3 className="text-h3-sm md:text-h2-sm font-bold text-accent-default mb-lg">
                                Your Visual Direction {sortedWinners.length === 1 ? 'Winner' : 'Winners'}!
                            </h3>
                            {sortedWinners.length !== 1 &&
                                <p className="text-para-sm text-text-tertiary mb-md">
                                    Drag to reorder your preferences
                                </p>
                            }

                        </motion.div>

                        <div className="flex flex-col md:flex-row justify-center gap-md items-center">
                            {sortedWinners.map((winner, index) => (
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
                                    <div className={`rounded-xl overflow-hidden shadow-lg ${index === 0 ? 'ring-4 ring-yellow-400' : ''
                                        }`}>
                                        <img
                                            src={winner.src}
                                            alt={winner.name}
                                            className={`${index === 0 ? 'w-48 h-48' : 'w-40 h-50'
                                                } object-cover`}
                                        />
                                        <div className="absolute top-sm right-sm">
                                            {index === 0 ? (
                                                <FaTrophy className="text-yellow-400 text-icon-xl" />
                                            ) : index === 1 ? (
                                                <FaMedal className="text-gray-400 text-icon-lg" />
                                            ) : (
                                                <FaMedal className="text-orange-600 text-icon-lg" />
                                            )}
                                        </div>
                                        <div className="absolute top-sm left-sm bg-black/50 p-xs rounded">
                                            <FaGripVertical className="text-white text-para-sm" />
                                        </div>
                                    </div>
                                    <p className="mt-xs text-para-md font-medium text-text-primary">
                                        {winner.name}
                                    </p>
                                    <p className="text-para-sm font-bold text-accent-default">
                                        {getPlacementText(index)}
                                    </p>
                                </motion.div>
                            ))}
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
    );
};