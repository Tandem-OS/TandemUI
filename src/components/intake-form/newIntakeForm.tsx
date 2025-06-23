import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaLink, FaFileUpload, FaPlusCircle, FaTimesCircle,
    FaArrowRight, FaCheck, FaCalendarAlt, FaTrophy, FaMedal, FaRedo
} from 'react-icons/fa';
import { containerVariant, fadeInLeft } from '../../lib/animations/variants';
import Input from '../auth/form/components/Input';
import SimpleButton from '../demos/buttons/SimpleButton';
import Heading from '../demos/typography/Heading';
import SimpleHeader from '../Headers/SimpleHeader/SimpleHeader';
import SuccessAnimation from '../animations-components/SuccessAnimation';
import swipeAudio from ".././../assets/audio/swipeAudio.mp3";
import winAudio from ".././../assets/audio/winAudio.mp3";
import clickAudio from "../../assets/audio/clickAudio.mp3";

const vibesImages = [
    { id: 1, name: "Bold", src: "/images/vibeImages/bold.webp" },
    { id: 2, name: "Minimal", src: "/images/vibeImages/minimal.webp" },
    { id: 3, name: "Fun", src: "/images/vibeImages/fun.webp" },
    { id: 4, name: "Playful", src: "/images/vibeImages/playful.webp" },
    { id: 5, name: "Clean", src: "/images/vibeImages/clean.webp" },
    { id: 6, name: "Earthy", src: "/images/vibeImages/earthy.webp" },
    { id: 7, name: "Elegant", src: "/images/vibeImages/elegent.webp" },
    { id: 8, name: "Luxury", src: "/images/vibeImages/luxury.webp" }
];

// Types
interface IntakeFormData {
    tones: string[];
    keyFeatures: string;
    inspirationUrls: string[];
    colorStrategy: 'match-logo' | 'pick-for-me' | 'custom';
    customColors: string;
    deadline: string;
    notSureDeadline: boolean;
    currentSiteUrl: string;
    brandGuide: File | null;
    additionalDetails: string;
}

interface VibeScore {
    id: number;
    name: string;
    src: string;
    wins: number;
    losses: number;
}

const initialFormData: IntakeFormData = {
    tones: [],
    keyFeatures: '',
    inspirationUrls: [''],
    colorStrategy: 'match-logo',
    customColors: '',
    deadline: '',
    notSureDeadline: false,
    currentSiteUrl: '',
    brandGuide: null,
    additionalDetails: '',
};

const OPTIONS = {
    colorStrategies: [
        { id: 'match-logo', label: 'Match my logo' },
        { id: 'pick-for-me', label: 'Pick for me' },
        { id: 'custom', label: 'Custom' },
    ]
};

const getButtonClass = (isSelected: boolean, disabled = false) =>
    `transition-all ${isSelected
        ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-accent-default dark:text-white'
        : 'border-gray-300 hover:border-gray-400 text-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-300'} ${disabled ? 'disabled:opacity-50' : ''}`;

const getDropzoneClass = (isDragActive: boolean) =>
    `relative border-2 border-dashed rounded-lg p-lg text-center transition-all ${isDragActive
        ? 'border-accent-default bg-accent-subtle bg-opacity-10'
        : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
    }`;

const playAudio = (audioSrc: string) => {
    const audio = new Audio(audioSrc);
    audio.play().catch(error => console.log('Audio playback failed:', error));
};

// King of the Hill Component
const KingOfTheHill = ({ onComplete, onRetake, showResultsInitially = false, completedTones = [] }: {
    onComplete: (winners: string[]) => void,
    onRetake?: () => void,
    showResultsInitially?: boolean,
    completedTones?: string[]
}) => {
    const [currentWinner, setCurrentWinner] = useState<typeof vibesImages[0] | null>(null);
    const [challenger, setChallenger] = useState<typeof vibesImages[0] | null>(null);
    const [remainingOptions, setRemainingOptions] = useState<typeof vibesImages>([]);
    const [scores, setScores] = useState<VibeScore[]>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [showResults, setShowResults] = useState(showResultsInitially);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [shakeWinner, setShakeWinner] = useState<number | null>(null);
    const [previousChallengerId, setPreviousChallengerId] = useState<number | null>(null);

    // Play swipe audio when challenger changes (new slide appears)
    useEffect(() => {
        if (challenger && previousChallengerId !== null && challenger.id !== previousChallengerId && isInitialized) {
            playAudio(swipeAudio);
        }
        if (challenger) {
            setPreviousChallengerId(challenger.id);
        }
    }, [challenger, previousChallengerId, isInitialized]);

    const initializeGame = () => {
        // Initialize scores
        const initialScores = vibesImages.map(vibe => ({
            ...vibe,
            wins: 0,
            losses: 0
        }));
        setScores(initialScores);

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
                setShowResults(true);
                window.scrollTo(0, 0);
                setIsInitialized(true);
            } else {
                initializeGame();
            }
        }
    }, []); // Empty dependency array - only run once on mount

    const handleSelection = (winnerId: number, loserId: number) => {
        if (selectedCard !== null || isTransitioning) return;

        // Play click audio when card is selected
        playAudio(clickAudio);

        setSelectedCard(winnerId);
        setIsTransitioning(true);

        // Update scores
        const newScores = [...scores];
        const winnerIndex = newScores.findIndex(s => s.id === winnerId);
        const loserIndex = newScores.findIndex(s => s.id === loserId);

        if (winnerIndex !== -1) newScores[winnerIndex].wins += 1;
        if (loserIndex !== -1) newScores[loserIndex].losses += 1;

        setScores(newScores);

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

                // Get vibes that actually won at least once
                const winnersOnly = newScores.filter(s => s.wins > 0);
                const sortedWinners = winnersOnly.sort((a, b) => {
                    const ratioA = a.wins / (a.wins + a.losses || 1);
                    const ratioB = b.wins / (b.wins + b.losses || 1);
                    return ratioB - ratioA;
                });

                // Take top 3 or less if fewer winners
                const topVibes = sortedWinners
                    .slice(0, Math.min(3, sortedWinners.length))
                    .map(s => s.name.toLowerCase());

                // Call onComplete AFTER showing results
                onComplete(topVibes);

                // Hide confetti after animation completes
                setTimeout(() => {
                    setShowConfetti(false);
                }, 4000);
            }, 800); // Small delay for shake animation to complete
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
            }, 800); // Quick transition for better flow
        }
    };

    const topWinners = showResults
        ? [...scores]
            .filter(s => s.wins > 0)  // Only show vibes that won at least once
            .sort((a, b) => {
                const ratioA = a.wins / (a.wins + a.losses || 1);
                const ratioB = b.wins / (b.wins + b.losses || 1);
                return ratioB - ratioA;
            })
            .slice(0, 3)  // Maximum 3, but could be less
        : [];

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
                                            <FaCheck className="text-white text-5xl" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            </div>

                            {/* VS */}
                            <div className="text-2xl font-bold text-accent-default px-md">
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
                                                <FaCheck className="text-white text-5xl" />
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
                            <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                                <FaTrophy className="text-5xl text-yellow-500" />
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
                            <h3 className="text-2xl font-bold text-accent-default dark:text-accent-default mb-lg">
                                Your Visual Direction {topWinners.length === 1 ? 'Winner' : 'Winners'}!
                            </h3>
                        </motion.div>

                        <div className="flex flex-col md:flex-row justify-center gap-md items-center">
                            {topWinners.map((winner, index) => (
                                <motion.div
                                    key={winner.id}
                                    initial={{ scale: 0, rotate: -10 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: index * 0.2 + 0.6 }}
                                    className="relative"
                                >
                                    <div className={`rounded-xl overflow-hidden shadow-lg ${index === 0 ? 'ring-4 ring-yellow-400' : ''
                                        }`}>
                                        <img
                                            src={winner.src}
                                            alt={winner.name}
                                            className={`${index === 0 ? 'w-48 h-48' : 'w-40 h-50'
                                                } object-cover`}
                                        />
                                        <div className="absolute top-2 right-2">
                                            {index === 0 ? (
                                                <FaTrophy className="text-yellow-400 text-2xl" />
                                            ) : index === 1 ? (
                                                <FaMedal className="text-gray-400 text-xl" />
                                            ) : (
                                                <FaMedal className="text-orange-600 text-xl" />
                                            )}
                                        </div>
                                    </div>
                                    <p className="mt-xs text-para-md font-medium text-gray-700 dark:text-gray-300">
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

const ScreenHeader = ({ title, subtitle, canSkip, onSkip, buttonState, isLastStep }: any) => (
    <motion.div variants={fadeInLeft} className="mb-lg flex justify-between items-start">
        <div>
            <Heading level="h3" color="accent">{title}</Heading>
            <p className="text-para-md text-gray-700 dark:text-gray-300 mt-sm">{subtitle}</p>
        </div>
        {canSkip && (
            <button
                onClick={onSkip}
                disabled={buttonState !== 'default'}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-para-sm underline transition-colors disabled:opacity-50"
            >
                {isLastStep ? 'Skip and Submit' : 'Skip this step'}
            </button>
        )}
    </motion.div>
);

const FileUpload = ({ file, onFile }: any) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) onFile(e.dataTransfer.files[0]);
    };

    return (
        <div
            className={getDropzoneClass(dragActive)}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                id="brandguide-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
            />
            {file ? (
                <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300 text-para-sm">{(file as File).name}</span>
                    <label htmlFor="brandguide-upload" className="text-accent-default hover:text-accent-hover cursor-pointer text-para-sm">
                        Change file
                    </label>
                </div>
            ) : (
                <label htmlFor="brandguide-upload" className="cursor-pointer block">
                    <FaFileUpload className="mx-auto text-gray-400 dark:text-gray-400 text-3xl mb-xs" />
                    <p className="text-gray-700 dark:text-gray-300 text-para-md mb-xs">Drop brand guide here or click to upload</p>
                </label>
            )}
        </div>
    );
};

const NewIntakeForm: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [formData, setFormData] = useState<IntakeFormData>(initialFormData);
    const [buttonState, setButtonState] = useState<'default' | 'saving' | 'saved'>('default');
    const [vibeSelectionComplete, setVibeSelectionComplete] = useState(false);
    const [showVibeResults, setShowVibeResults] = useState(false);

    const totalScreens = 5;
    const canSkip = currentScreen > 1; // First screen cannot be skipped

    const updateForm = (updates: Partial<IntakeFormData>) =>
        setFormData(prev => ({ ...prev, ...updates }));

    const handleFile = (file: File) => {
        updateForm({ brandGuide: file });
    };

    const handleVibeComplete = (winners: string[]) => {
        updateForm({ tones: winners });
        setVibeSelectionComplete(true);
        setShowVibeResults(true);
    };

    const handleVibeRetake = () => {
        setShowVibeResults(false);
        setVibeSelectionComplete(false);
        updateForm({ tones: [] });
    };

    const navigate = async (next: boolean) => {
        if (!next) {
            if (currentScreen > 1) {
                setCurrentScreen(currentScreen - 1);
            }
            return;
        }

        // Check if first screen is complete
        if (currentScreen === 1 && !vibeSelectionComplete) {
            return;
        }

        // Final submission - direct alert, no animation
        if (currentScreen === totalScreens) {
            alert('Intake form submitted successfully!');
            console.log('Intake data:', formData);
            return;
        }

        // Forward navigation
        setButtonState('saving');
        setTimeout(() => {
            setButtonState('saved');
            setTimeout(() => {
                if (currentScreen < totalScreens) {
                    setCurrentScreen(currentScreen + 1);
                }
                setButtonState('default');
            }, 500);
        }, 1000);
    };

    const screens = [
        {
            title: "Visual Direction",
            subtitle: "Choose your preferred style in head-to-head battles",
            content: (
                <motion.div variants={fadeInLeft}>
                    <KingOfTheHill
                        onComplete={handleVibeComplete}
                        onRetake={handleVibeRetake}
                        showResultsInitially={vibeSelectionComplete && showVibeResults}
                        completedTones={formData.tones}
                    />
                </motion.div>
            )
        },
        {
            title: "Key Features & Pages",
            subtitle: "What functionality do you need?",
            content: (
                <motion.div variants={fadeInLeft} className="mb-lg">
                    <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">List the key pages or features you need</label>
                    <textarea
                        value={formData.keyFeatures}
                        onChange={(e) => updateForm({ keyFeatures: e.target.value })}
                        placeholder="E.g., Homepage, About Us, Product catalog, Blog, Contact form, Newsletter signup, User dashboard..."
                        rows={8}
                        className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg py-sm px-md border border-gray-200 dark:border-gray-700 focus:border-accent-default outline-none transition-all resize-none"
                    />
                </motion.div>
            )
        },
        {
            title: "Style References & Colors",
            subtitle: "Share websites that inspire you and your color preferences",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Any websites or designs you like?</label>
                        <p className="text-gray-500 dark:text-gray-400 text-para-sm mb-sm">Drop any links that inspire you</p>
                        <div className="space-y-xs">
                            {formData.inspirationUrls.map((url, index) => (
                                <div key={index} className="flex gap-xs">
                                    <div className="relative flex-1">
                                        <Input
                                            type="url"
                                            value={url}
                                            onChange={(e) => {
                                                const newUrls = [...formData.inspirationUrls];
                                                newUrls[index] = e.target.value;
                                                updateForm({ inspirationUrls: newUrls });
                                            }}
                                            placeholder="https://inspiration-site.com"
                                            className="pl-10"
                                            variant='filled'
                                        />
                                        <FaLink className="absolute left-md top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                    {formData.inspirationUrls.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => updateForm({
                                                inspirationUrls: formData.inspirationUrls.filter((_, i) => i !== index)
                                            })}
                                            className="text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <FaTimesCircle className="text-xl" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {formData.inspirationUrls.length < 5 && (
                                <button
                                    type="button"
                                    onClick={() => updateForm({
                                        inspirationUrls: [...formData.inspirationUrls, '']
                                    })}
                                    className="flex items-center gap-xs text-accent-default hover:text-accent-hover text-para-sm transition-colors"
                                >
                                    <FaPlusCircle /> Add another link
                                </button>
                            )}
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Do you have any brand colors in mind?</label>
                        <div className="space-y-sm">
                            <div className="flex gap-sm">
                                {OPTIONS.colorStrategies.map(strategy => (
                                    <button
                                        key={strategy.id}
                                        type="button"
                                        onClick={() => updateForm({ colorStrategy: strategy.id as any })}
                                        className={`flex-1 p-sm rounded-lg border-2 ${getButtonClass(formData.colorStrategy === strategy.id)}`}
                                    >
                                        {strategy.label}
                                    </button>
                                ))}
                            </div>
                            {formData.colorStrategy === 'custom' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                    <Input
                                        type="text"
                                        value={formData.customColors}
                                        onChange={(e) => updateForm({ customColors: e.target.value })}
                                        placeholder="Enter hex values or color names (e.g., #3B82F6, navy, coral)"
                                        variant='filled'
                                    />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )
        },
        {
            title: "Existing Assets",
            subtitle: "Share what you already have",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Do you have a current site?</label>
                        <div className="relative">
                            <Input
                                type="url"
                                value={formData.currentSiteUrl}
                                onChange={(e) => updateForm({ currentSiteUrl: e.target.value })}
                                placeholder="https://your-current-site.com"
                                className="pl-10"
                                variant='filled'
                            />
                            <FaLink className="absolute left-md top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Upload brand guide (optional)</label>
                        <FileUpload
                            file={formData.brandGuide}
                            onFile={handleFile}
                        />
                    </motion.div>
                </>
            )
        },
        {
            title: "Timeline & Final Details",
            subtitle: "Last few things to nail down",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">When do you need this delivered?</label>
                        <div className="space-y-sm">
                            {!formData.notSureDeadline && (
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) => updateForm({ deadline: e.target.value })}
                                        className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg py-sm px-md border border-gray-200 dark:border-gray-700 focus:border-accent-default outline-none transition-all"
                                    />
                                    <FaCalendarAlt className="absolute right-md top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            )}
                            <label className="flex items-center gap-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.notSureDeadline}
                                    onChange={(e) => updateForm({ notSureDeadline: e.target.checked, deadline: e.target.checked ? '' : formData.deadline })}
                                    className="w-4 h-4 text-accent-default bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded focus:ring-accent-default"
                                />
                                <span className="text-gray-700 dark:text-gray-300 text-para-sm">Flexible timeline</span>
                            </label>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Any remaining details?</label>
                        <div className="relative">
                            <textarea
                                value={formData.additionalDetails}
                                onChange={(e) => e.target.value.length <= 500 && updateForm({ additionalDetails: e.target.value })}
                                placeholder="Special requirements, specific functionality needs, or anything else we should know..."
                                rows={5}
                                className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg py-sm px-md border border-gray-200 dark:border-gray-700 focus:border-accent-default outline-none transition-all resize-none"
                            />
                            <span className={`absolute bottom-sm right-md text-para-sm ${formData.additionalDetails.length > 450 ? 'text-yellow-400' : 'text-gray-500'
                                }`}>
                                {formData.additionalDetails.length}/500
                            </span>
                        </div>
                    </motion.div>
                </>
            )
        }
    ];

    const currentScreenData = screens[currentScreen - 1];

    // Check if we should hide the header (first screen with results showing)
    const shouldHideHeader = currentScreen === 1 && showVibeResults;

    return (
        <div className="relative min-h-screen flex bg-slate-100 dark:bg-gray-900 transition-colors">
            <div className="flex-1 flex flex-col z-10">
                <SimpleHeader />

                <div className="flex-1 flex items-center justify-center px-lg">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentScreen}
                            variants={containerVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl px-xl py-lg shadow-xl transition-colors"
                        >
                            {!shouldHideHeader && (
                                <ScreenHeader
                                    title={currentScreenData.title}
                                    subtitle={currentScreenData.subtitle}
                                    canSkip={canSkip}
                                    onSkip={() => navigate(true)}
                                    buttonState={buttonState}
                                    isLastStep={currentScreen === totalScreens}
                                />
                            )}

                            {currentScreenData.content}

                            <motion.div variants={fadeInLeft} className="flex justify-between mt-md">
                                {currentScreen > 1 && (
                                    <SimpleButton
                                        variant="outline"
                                        size="md"
                                        onClick={() => navigate(false)}
                                        disabled={buttonState !== 'default'}
                                    >
                                        Back
                                    </SimpleButton>
                                )}
                                {(currentScreen > 1 || vibeSelectionComplete) && (
                                    <SimpleButton
                                        variant="solid"
                                        size="md"
                                        onClick={() => navigate(true)}
                                        disabled={buttonState !== 'default' || (currentScreen === 1 && !vibeSelectionComplete)}
                                        className={`${currentScreen === 1 ? 'ml-auto' : ''} min-w-[150px]`}
                                    >
                                        {buttonState === 'saving' && currentScreen < totalScreens ? 'Saving...' :
                                            buttonState === 'saved' && currentScreen < totalScreens ? <>Saved <FaCheck className="ml-xs" /></> :
                                                currentScreen === totalScreens ? 'Start My Project' :
                                                    <>Next <FaArrowRight className="ml-xs" /></>}
                                    </SimpleButton>
                                )}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default NewIntakeForm;