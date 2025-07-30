import React, { useState } from 'react';
import { motion, type PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';
import { FiThumbsUp, FiThumbsDown, FiHelpCircle } from 'react-icons/fi';
import { type SwipeCardProps } from '../swiper.types';
import { AskAiModal } from './AskAiModal';

const SwipeCard: React.FC<SwipeCardProps> = ({
    component,
    onSwipe,
    isActive = true,
    isAnimating = false, // Receive global animation lock state
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

        // Animate out and then call onSwipe
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
                        className="absolute top-md right-md z-10 px-lg py-md bg-background-error text-text-error font-bold text-h5-md rounded-xl border-2 border-border-error"
                        style={{ opacity: nopeOpacity }}
                    >
                        NOPE
                    </motion.div>
                    <motion.div
                        className="absolute top-md right-md z-10 px-lg py-md bg-background-success text-text-success font-bold text-h5-md rounded-xl border-2 border-border-success"
                        style={{ opacity: likeOpacity }}
                    >
                        LIKE
                    </motion.div>
                </>
            )}

            <div className="bg-background-secondary rounded-2xl shadow-lg border border-border-default overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="bg-background-primary-2 p-xl flex flex-col justify-between min-h-96 2xl:min-h-[32rem]">
                        <div className="space-y-lg">
                            <div className="flex items-center justify-between">
                                <span className="px-md py-sm bg-accent-default text-accent-foreground text-para-sm 2xl:text-para-md font-medium rounded-lg">
                                    {component.category}
                                </span>
                                <span className="px-md py-sm bg-background-secondary-2 text-text-secondary text-para-xs 2xl:text-para-sm font-medium rounded-lg">
                                    {component.vibe}
                                </span>
                            </div>

                            <div className="space-y-md">
                                <h2 className="text-h4-md 2xl:text-h4-lg font-semibold text-text-primary leading-tight">
                                    {component.title}
                                </h2>
                                <p className="text-text-secondary text-para-sm 2xl:text-para-md leading-relaxed">
                                    {component.description}
                                </p>

                                <div className="flex flex-wrap gap-xs">
                                    {component.tags.slice(0, 3).map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-sm py-xs bg-background-secondary-2 text-text-tertiary text-para-xs 2xl:text-para-sm rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-text-secondary text-para-sm 2xl:text-para-md">
                                    <span className="font-medium">Layout:</span> {component.layout_structure}
                                </div>
                            </div>
                        </div>

                        <div className={`flex justify-start items-center gap-md ${!isActive ? 'pointer-events-none opacity-60' : ''
                            }`}>
                            <motion.button
                                onClick={() => handleSwipeAction('dislike')}
                                className="flex items-center gap-sm px-md py-sm bg-background-primary rounded-lg shadow-md text-text-error hover:bg-background-secondary-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                aria-label="Nope"
                                disabled={isDisabled}
                            >
                                <FiThumbsDown size={18} />
                                <span className="text-para-sm 2xl:text-para-md font-medium leading-none">Nope</span>
                            </motion.button>

                            <motion.button
                                onClick={() => handleSwipeAction('like')}
                                className="flex items-center gap-sm px-md py-sm bg-background-primary rounded-lg shadow-md text-text-success hover:bg-background-secondary-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                aria-label="Like"
                                disabled={isDisabled}
                            >
                                <FiThumbsUp size={18} />
                                <span className="text-para-sm 2xl:text-para-md font-medium leading-none">Like</span>
                            </motion.button>

                            <div className="relative">
                                <motion.button
                                    onClick={handleAskAiClick}
                                    className="flex items-center gap-sm px-md py-sm bg-background-primary rounded-lg shadow-md text-text-info hover:bg-background-secondary-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={!isDisabled ? { scale: 1.05 } : {}}
                                    whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                    aria-label="Ask AI"
                                    disabled={isDisabled}
                                >
                                    <FiHelpCircle size={18} />
                                    <span className="text-para-sm 2xl:text-para-md font-medium leading-none">Ask AI</span>
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

                    <div
                        className="bg-cover bg-center bg-no-repeat min-h-96 2xl:min-h-[32rem] select-none"
                        style={{ backgroundImage: `url(${component.thumbnail_url})` }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default SwipeCard;