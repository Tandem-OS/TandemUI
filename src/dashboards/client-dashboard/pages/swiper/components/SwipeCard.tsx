import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, type PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';
import { FiThumbsUp, FiThumbsDown, FiHelpCircle, FiBookmark, FiHeart } from 'react-icons/fi';
import { type SwipeCardProps } from '../swiper.types';
import { AskAiModal } from './AskAiModal';
import swipeAudio from "@/assets/audio/swipeAudio.mp3";
import clickAudio from "@/assets/audio/clickAudio.mp3";

const SwipeCard: React.FC<SwipeCardProps> = ({
    component,
    onSwipe,
    isActive = true,
    isAnimating = false,
}) => {
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-300, 300], [-25, 25]);
    const opacity = useTransform(x, [-500, -150, 0, 150, 500], [0, 1, 1, 1, 0]);

    const nopeOpacity = useTransform(x, [-300, -80, 0], [1, 0.7, 0]);
    const likeOpacity = useTransform(x, [0, 80, 300], [0, 0.7, 1]);
    const saveOpacity = useTransform(y, [-300, -80, 0], [1, 0.7, 0]);
    const superLikeOpacity = useMotionValue(0);

    // Audio refs
    const swipeAudioRef = useRef<HTMLAudioElement | null>(null);
    const clickAudioRef = useRef<HTMLAudioElement | null>(null);

    // Double tap detection
    const lastTap = useRef<number>(0);
    const tapTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initialize audio
        swipeAudioRef.current = new Audio(swipeAudio);
        swipeAudioRef.current.volume = 0.5;

        clickAudioRef.current = new Audio(clickAudio);
        clickAudioRef.current.volume = 0.3; // Light volume for clicks

        return () => {
            if (tapTimeout.current) {
                clearTimeout(tapTimeout.current);
            }
        };
    }, []);

    const playSwipeSound = () => {
        if (swipeAudioRef.current) {
            swipeAudioRef.current.currentTime = 0;
            swipeAudioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }
    };

    const playClickSound = () => {
        if (clickAudioRef.current) {
            clickAudioRef.current.currentTime = 0;
            clickAudioRef.current.play().catch(err => console.log('Click audio play failed:', err));
        }
    };

    const handleSwipeAction = (action: 'like' | 'dislike' | 'save' | 'super-like' | 'ask-ai') => {
        if (!isActive || isAnimating) return;

        if (isAiModalOpen) {
            setIsAiModalOpen(false);
        }

        const swipePower = 500;
        let targetX = 0;
        let targetY = 0;

        switch (action) {
            case 'like':
                targetX = swipePower;
                break;
            case 'dislike':
                targetX = -swipePower;
                break;
            case 'save':
                targetY = -swipePower;
                break;
            case 'super-like':
                animate(superLikeOpacity, 1, { duration: 0.3 });

                setTimeout(() => {
                    targetX = 0;
                    targetY = swipePower; // Swipe down for super like

                    Promise.all([
                        animate(x, targetX, {
                            type: "spring",
                            stiffness: 500,
                            damping: 50
                        }),
                        animate(y, targetY, {
                            type: "spring",
                            stiffness: 500,
                            damping: 50
                        })
                    ]).then(() => {
                        onSwipe(action);
                    });
                }, 300);

                playSwipeSound();
                return;
        }

        if (action !== 'ask-ai') {
            playSwipeSound();
        }

        Promise.all([
            animate(x, targetX, {
                type: "spring",
                stiffness: 500,
                damping: 50
            }),
            animate(y, targetY, {
                type: "spring",
                stiffness: 500,
                damping: 50
            })
        ]).then(() => {
            onSwipe(action);
        });
    };

    const handleAskAiClick = () => {
        if (!isActive || isAnimating) return;
        // No click sound for Ask AI button
        setIsAiModalOpen(prev => !prev);
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (!isActive || isAnimating) return;

        setIsDragging(false);
        const xThreshold = 120;
        const yThreshold = 100;

        // Check for upward swipe first (save)
        if (info.offset.y < -yThreshold) {
            handleSwipeAction('save');
        } else if (info.offset.x > xThreshold) {
            handleSwipeAction('like');
        } else if (info.offset.x < -xThreshold) {
            handleSwipeAction('dislike');
        } else {
            // Snap back to center
            animate(x, 0, {
                type: "spring",
                stiffness: 500,
                damping: 30
            });
            animate(y, 0, {
                type: "spring",
                stiffness: 500,
                damping: 30
            });
        }
    };

    const handleDragStart = () => {
        if (!isActive || isAnimating) return;
        setIsDragging(true);
        if (isAiModalOpen) {
            setIsAiModalOpen(false);
        }
    };

    // Handle double tap for super like
    const handleCardClick = useCallback(() => {
        if (!isActive || isAnimating) return;

        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (tapTimeout.current) {
            clearTimeout(tapTimeout.current);
            tapTimeout.current = null;
        }

        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
            // Double tap detected
            handleSwipeAction('super-like');
            lastTap.current = 0;
        } else {
            // Single tap - set timeout to reset
            lastTap.current = now;
            tapTimeout.current = setTimeout(() => {
                lastTap.current = 0;
            }, DOUBLE_TAP_DELAY);
        }
    }, [isActive, isAnimating]);

    const canDrag = isActive && !isAnimating && !isAiModalOpen;
    const isDisabled = isDragging || !isActive || isAnimating;

    return (
        <motion.div
            className={`relative w-full mx-auto ${canDrag ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
            style={{
                transformOrigin: 'center bottom',
                x,
                y,
                rotate,
                opacity,
                willChange: 'transform',
            }}
            drag={canDrag}
            dragElastic={0.2}
            dragConstraints={{ left: -300, right: 300, top: -200, bottom: 50 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileDrag={canDrag ? {
                scale: 1.02,
                transition: { duration: 0.2 }
            } : {}}
            onClick={handleCardClick}
        >
            {/* Swipe feedback overlays */}
            {isActive && (
                <>
                    {/* Nope overlay - Mobile: center on image, Desktop: top-right */}
                    <motion.div
                        className="absolute z-10 border-2 px-md py-sm font-bold text-para-sm sm:text-para-md 
                                   rounded-md sm:rounded-lg bg-background-error text-text-error 
                                   border-border-error pointer-events-none
                                   top-[96px] sm:top-[112px] left-1/2 -translate-x-1/2 -translate-y-1/2
                                   lg:top-sm lg:left-auto lg:right-sm lg:translate-x-0 lg:translate-y-0"
                        style={{ opacity: nopeOpacity, willChange: 'opacity' }}
                    >
                        NOPE
                    </motion.div>

                    {/* Like overlay - Mobile: center on image, Desktop: top-right */}
                    <motion.div
                        className="absolute z-10 border-2 px-md py-sm font-bold text-para-sm sm:text-para-md 
                                   rounded-md sm:rounded-lg bg-background-success text-text-success 
                                   border-border-success pointer-events-none
                                   top-[96px] sm:top-[112px] left-1/2 -translate-x-1/2 -translate-y-1/2
                                   lg:top-sm lg:left-auto lg:right-sm lg:translate-x-0 lg:translate-y-0"
                        style={{ opacity: likeOpacity, willChange: 'opacity' }}
                    >
                        LIKE
                    </motion.div>

                    {/* Save overlay - Mobile: center on image, Desktop: top-right */}
                    <motion.div
                        className="absolute z-10 border-2 px-md py-sm font-bold text-para-sm sm:text-para-md 
                                   rounded-md sm:rounded-lg bg-background-warning text-text-warning 
                                   border-border-warning pointer-events-none
                                   top-[96px] sm:top-[112px] left-1/2 -translate-x-1/2 -translate-y-1/2
                                   lg:top-sm lg:left-auto lg:right-sm lg:translate-x-0 lg:translate-y-0"
                        style={{ opacity: saveOpacity, willChange: 'opacity' }}
                    >
                        SAVE
                    </motion.div>

                    {/* Super Like overlay - always center */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                   z-10 border-2 px-lg py-md font-bold text-para-lg sm:text-h6-sm 
                                   rounded-lg sm:rounded-xl bg-gradient-to-br from-red-500 to-pink-600 
                                   text-white border-pink-400 pointer-events-none shadow-2xl"
                        style={{ opacity: superLikeOpacity, willChange: 'opacity' }}
                    >
                        SUPER LIKE!
                    </motion.div>
                </>
            )}

            {/* Main Card */}
            <div className="bg-background-secondary rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-border-default overflow-hidden">
                {/* Mobile: Image on top, Desktop: Side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Mobile: Show image first */}
                    <div
                        className="lg:hidden bg-cover bg-center bg-no-repeat h-48 sm:h-56 select-none"
                        style={{ backgroundImage: `url(${component.thumbnail_url})` }}
                    />

                    {/* Content Section */}
                    <div className="bg-background-primary-2 p-md sm:p-lg lg:p-xl flex flex-col justify-center">
                        <div className="space-y-sm md:space-y-md lg:space-y-lg">
                            <div className="flex items-center justify-between gap-xs">
                                <span className="px-xs py-px sm:px-sm sm:py-xs md:px-md md:py-sm bg-accent-default text-accent-foreground text-para-xs sm:text-para-sm 2xl:text-para-md font-medium rounded-sm sm:rounded-md md:rounded-lg">
                                    {component.category}
                                </span>
                                <span className="px-xs py-px sm:px-sm sm:py-xs md:px-md md:py-sm bg-background-secondary-2 text-text-secondary text-para-xs sm:text-para-sm font-medium rounded-sm sm:rounded-md md:rounded-lg">
                                    {component.vibe}
                                </span>
                            </div>

                            <div className="space-y-xs sm:space-y-sm md:space-y-md">
                                <h2 className="text-h5-sm sm:text-h4-sm md:text-h4-md 2xl:text-h4-lg font-semibold text-text-primary leading-tight">
                                    {component.title}
                                </h2>
                                <p className="text-text-secondary text-para-xs sm:text-para-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                                    {component.description}
                                </p>

                                <div className="flex flex-wrap gap-xs sm:gap-xs md:gap-sm">
                                    {component.tags.slice(0, 3).map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-xs py-px sm:px-sm sm:py-xs md:px-sm md:py-xs bg-background-secondary-2 text-text-tertiary text-para-xs rounded-sm sm:rounded md:rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-text-secondary text-para-xs sm:text-para-sm">
                                    <span className="font-medium">Layout:</span> {component.layout_structure}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Show image on right */}
                    <div
                        className="hidden lg:block bg-cover bg-center bg-no-repeat select-none"
                        style={{ backgroundImage: `url(${component.thumbnail_url})` }}
                    />
                </div>

                {/* Action Buttons */}
                <div className="px-md py-md">
                    <div className="flex justify-center">
                        <div className={`flex items-center justify-center gap-sm ${!isActive ? 'pointer-events-none opacity-60' : ''}`}>

                            {/* Like Button */}
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playClickSound();
                                    handleSwipeAction('like');
                                }}
                                className="flex flex-col items-center gap-1 p-sm rounded-lg bg-background-secondary hover:bg-background-success hover:bg-opacity-20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group min-w-[40px]"
                                whileHover={!isDisabled ? { scale: 1.1, y: -1 } : {}}
                                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                aria-label="Like"
                                disabled={isDisabled}
                            >
                                <FiThumbsUp className="text-icon-sm text-text-success transition-colors" />
                                <span className="text-para-xs font-medium text-text-success transition-colors">Like</span>
                            </motion.button>

                            {/* Dislike Button */}
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playClickSound();
                                    handleSwipeAction('dislike');
                                }}
                                className="flex flex-col items-center gap-1 p-sm rounded-lg bg-background-secondary hover:bg-background-error hover:bg-opacity-20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group min-w-[40px]"
                                whileHover={!isDisabled ? { scale: 1.1, y: -1 } : {}}
                                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                aria-label="Dislike"
                                disabled={isDisabled}
                            >
                                <FiThumbsDown className="text-icon-sm text-text-error transition-colors" />
                                <span className="text-para-xs font-medium text-text-error transition-colors">Nope</span>
                            </motion.button>

                            {/* Super Like Button (Heart) - Center */}
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playClickSound();
                                    handleSwipeAction('super-like');
                                }}
                                className="flex flex-col items-center justify-center gap-1 p-sm rounded-full bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group w-16 h-16 shadow-lg"
                                whileHover={!isDisabled ? { scale: 1.15, y: -2 } : {}}
                                whileTap={!isDisabled ? { scale: 0.9 } : {}}
                                aria-label="Super Like"
                                disabled={isDisabled}
                            >
                                <FiHeart className="text-icon-sm text-white group-hover:scale-110 transition-transform" />
                                <span className="text-para-xs font-bold text-white">Super</span>
                            </motion.button>

                            {/* Ask AI Button */}
                            <div className="relative">
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAskAiClick();
                                    }}
                                    className="flex flex-col items-center gap-1 p-sm rounded-lg bg-background-secondary hover:bg-background-info hover:bg-opacity-20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group min-w-[40px]"
                                    whileHover={!isDisabled ? { scale: 1.1, y: -1 } : {}}
                                    whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                    aria-label="Ask AI"
                                    disabled={isDisabled}
                                >
                                    <FiHelpCircle className="text-icon-sm text-text-info transition-colors" />
                                    <span className="text-para-xs font-medium text-text-info transition-colors">Ask AI</span>
                                </motion.button>

                                {isActive && (
                                    <AskAiModal
                                        isOpen={isAiModalOpen}
                                        description={`This ${component.vibe.toLowerCase()} ${component.category.toLowerCase()} design focuses on ${component.tone.join(', ')} aesthetics with ${component.layout_structure} layout structure to achieve ${component.intent.join(' and ')} goals.`}
                                        onClose={() => setIsAiModalOpen(false)}
                                    />
                                )}
                            </div>

                            {/* Save Button */}
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playClickSound();
                                    handleSwipeAction('save');
                                }}
                                className="flex flex-col items-center gap-1 p-sm rounded-lg bg-background-secondary hover:bg-background-warning hover:bg-opacity-20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group min-w-[40px]"
                                whileHover={!isDisabled ? { scale: 1.1, y: -1 } : {}}
                                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                aria-label="Save"
                                disabled={isDisabled}
                            >
                                <FiBookmark className="text-icon-sm text-text-warning transition-colors" />
                                <span className="text-para-xs font-medium text-text-warning transition-colors">Save</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SwipeCard;