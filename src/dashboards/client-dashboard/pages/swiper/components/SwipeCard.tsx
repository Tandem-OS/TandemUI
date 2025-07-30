import React, { useState } from 'react';
import { motion, type PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';
import { FiThumbsUp, FiThumbsDown, FiHelpCircle } from 'react-icons/fi';
import { type SwipeCardProps } from '../swiper.types';
import { AskAiModal } from './AskAiModal';

const SwipeCard: React.FC<SwipeCardProps> = ({
    component,
    onSwipe,
    isActive = true,
    isAnimating = false,
}) => {
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-300, 300], [-25, 25]);
    const opacity = useTransform(x, [-500, -150, 0, 150, 500], [0, 1, 1, 1, 0]);

    const nopeOpacity = useTransform(x, [-300, -80, 0], [1, 0.7, 0]);
    const likeOpacity = useTransform(x, [0, 80, 300], [0, 0.7, 1]);

    const handleSwipeAction = (action: 'like' | 'dislike' | 'save' | 'ask-ai') => {
        if (!isActive || isAnimating) return;

        if (isAiModalOpen) {
            setIsAiModalOpen(false);
        }

        const swipePower = 500;
        const targetX = action === 'like' ? swipePower : -swipePower;

        animate(x, targetX, {
            type: "spring",
            stiffness: 500,
            damping: 50
        }).then(() => {
            onSwipe(action);
        });
    };

    const handleAskAiClick = () => {
        if (!isActive || isAnimating) return;
        setIsAiModalOpen(prev => !prev);
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (!isActive || isAnimating) return;

        setIsDragging(false);
        const threshold = 120;

        if (info.offset.x > threshold) {
            handleSwipeAction('like');
        } else if (info.offset.x < -threshold) {
            handleSwipeAction('dislike');
        } else {
            animate(x, 0, {
                type: "spring",
                stiffness: 500,
                damping: 30
            });
        }
    };

    const handleDragStart = () => {
        if (!isActive || isAnimating) return;
        setIsDragging(true);
    };

    const isDisabled = isDragging || !isActive || isAnimating;

    return (
        <motion.div
            className={`relative w-full mx-auto ${isActive && !isAnimating ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
                }`}
            style={{
                transformOrigin: 'center bottom',
                x,
                rotate,
                opacity,
                // --- YEH LINE ADD KI HAI ---
                willChange: 'transform',
            }}
            drag={isActive && !isAnimating ? "x" : false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileDrag={isActive ? {
                scale: 1.02,
                transition: { duration: 0.2 }
            } : {}}
        >
            {/* Swipe feedback overlays */}
            {isActive && (
                <>
                    <motion.div
                        className="absolute top-sm right-sm z-10 border-2 px-md py-sm font-bold text-para-sm sm:text-para-md rounded-md sm:rounded-lg bg-background-error text-text-error border-border-error"
                        style={{ opacity: nopeOpacity, willChange: 'opacity' }}
                    >
                        NOPE
                    </motion.div>

                    <motion.div
                        className="absolute top-sm right-sm z-10 border-2 px-md py-sm font-bold text-para-sm sm:text-para-md rounded-md sm:rounded-lg bg-background-success text-text-success border-border-success"
                        style={{ opacity: likeOpacity, willChange: 'opacity' }}
                    >
                        LIKE
                    </motion.div>
                </>
            )}

            <div className="bg-background-secondary rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-border-default overflow-hidden">
                {/* Mobile: Image on top, Desktop: Side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Mobile: Show image first */}
                    <div
                        className="lg:hidden bg-cover bg-center bg-no-repeat h-48 sm:h-56 select-none"
                        style={{ backgroundImage: `url(${component.thumbnail_url})` }}
                    />

                    {/* Content Section */}
                    <div className="bg-background-primary-2 p-md sm:p-lg lg:p-xl flex flex-col justify-between">
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

                        <div className={`flex flex-wrap justify-start pt-md items-center gap-sm md:gap-md mt-md ${!isActive ? 'pointer-events-none opacity-60' : ''
                            }`}>
                            <motion.button
                                onClick={() => handleSwipeAction('dislike')}
                                className="flex items-center gap-xs sm:gap-xs md:gap-sm px-md py-sm bg-background-primary rounded-lg shadow-md text-text-error hover:bg-background-secondary-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                aria-label="Nope"
                                disabled={isDisabled}
                            >
                                <FiThumbsDown className="text-icon-sm" />
                                <span className="text-para-xs sm:text-para-sm font-medium leading-none">Nope</span>
                            </motion.button>

                            <motion.button
                                onClick={() => handleSwipeAction('like')}
                                className="flex items-center gap-xs sm:gap-xs md:gap-sm px-md py-sm bg-background-primary rounded-lg shadow-md text-text-success hover:bg-background-secondary-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                aria-label="Like"
                                disabled={isDisabled}
                            >
                                <FiThumbsUp className="text-icon-sm" />
                                <span className="text-para-xs sm:text-para-sm font-medium leading-none">Like</span>
                            </motion.button>

                            <div className="relative">
                                <motion.button
                                    onClick={handleAskAiClick}
                                    className="flex items-center gap-xs sm:gap-xs md:gap-sm px-md py-sm bg-background-primary rounded-lg shadow-md text-text-info hover:bg-background-secondary-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={!isDisabled ? { scale: 1.05 } : {}}
                                    whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                    aria-label="Ask AI"
                                    disabled={isDisabled}
                                >
                                    <FiHelpCircle className="text-icon-sm" />
                                    <span className="text-para-xs sm:text-para-sm font-medium leading-none">Ask AI</span>
                                </motion.button>

                                {isActive && (
                                    <AskAiModal
                                        isOpen={isAiModalOpen}
                                        description={`This ${component.vibe.toLowerCase()} ${component.category.toLowerCase()} design focuses on ${component.tone.join(', ')} aesthetics with ${component.layout_structure} layout structure to achieve ${component.intent.join(' and ')} goals.`}
                                        onClose={() => setIsAiModalOpen(false)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Show image on right */}
                    <div
                        className="hidden lg:block bg-cover bg-center bg-no-repeat select-none"
                        style={{ backgroundImage: `url(${component.thumbnail_url})` }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default SwipeCard;