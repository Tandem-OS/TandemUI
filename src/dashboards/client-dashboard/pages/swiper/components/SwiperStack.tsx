import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInbox, FiRefreshCw } from 'react-icons/fi';
import SwipeCard from './SwipeCard';
import { type ComponentPreview, type SwipeAction, type BehavioralSignal } from '../swiper.types';

interface SwiperStackProps {
    components: ComponentPreview[];
    onSwipe: (action: SwipeAction, component: ComponentPreview, signals: BehavioralSignal) => void;
    onComplete: () => void;
    isAnimating: boolean;
    onAnimationStart: () => void;
    onAnimationComplete: () => void;
    isModalOpen?: boolean;
}

// Empty State Component
const EmptyState: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
    <motion.div
        className="flex flex-col items-center justify-center text-center space-y-md px-lg py-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="w-20 h-20 bg-background-muted rounded-full flex items-center justify-center">
            <FiInbox className="text-icon-2xl text-text-tertiary" />
        </div>
        
        <div className="space-y-sm">
            <h3 className="text-h4-sm font-semibold text-text-primary">No components available</h3>
            <p className="text-text-secondary text-para-md max-w-md">
                It looks like there are no design components to show right now.
            </p>
        </div>

        {onRetry && (
            <motion.button
                onClick={onRetry}
                className="flex items-center gap-sm px-lg py-md bg-accent-subtle text-accent-default hover:bg-accent-default hover:text-accent-foreground rounded-lg border border-border-default hover:border-accent-default transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <FiRefreshCw className="text-icon-sm" />
                <span className="text-para-md font-medium">Try Again</span>
            </motion.button>
        )}
    </motion.div>
);

const SwiperStack: React.FC<SwiperStackProps> = ({
    components,
    onSwipe,
    onComplete,
    isAnimating,
    onAnimationStart,
    onAnimationComplete,
    isModalOpen = false
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastAction, setLastAction] = useState<SwipeAction | null>(null);

    const cardStack = useMemo(() => {
        // Return empty if no components
        if (!components || components.length === 0) {
            return [];
        }

        const stack = [];
        const stackSize = 5;
        for (let i = 0; i < stackSize; i++) {
            const componentIndex = currentIndex + i;
            if (componentIndex < components.length) {
                stack.push({
                    component: components[componentIndex],
                    id: `${components[componentIndex].component_id}-${componentIndex}`,
                    stackIndex: i,
                    absoluteIndex: componentIndex
                });
            }
        }
        return stack.reverse(); // Reverse to render from back to front
    }, [components, currentIndex]);

    const handleSwipe = useCallback(async (action: SwipeAction, signals: BehavioralSignal) => {
        if (isAnimating || cardStack.length === 0) return;

        onAnimationStart(); // Lock the UI

        const topCard = cardStack[cardStack.length - 1];
        if (!topCard?.component) {
            onAnimationComplete(); // Unlock if something is wrong
            return;
        }

        // Store the action for exit animation
        setLastAction(action);

        // Inform parent about the swipe action with behavioral signals
        onSwipe(action, topCard.component, signals);

        // Wait a bit for the swipe animation to feel natural before updating index
        await new Promise(resolve => setTimeout(resolve, 200));

        const nextIndex = currentIndex + 1;

        // Always update the index to animate the top card away
        setCurrentIndex(nextIndex);

        // If that was the last card, trigger the round completion
        if (nextIndex >= components.length) {
            onComplete();
        }

        // Wait for animations to settle before unlocking
        setTimeout(() => {
            onAnimationComplete();
            setLastAction(null);
        }, 300); // A safe duration for animations to finish

    }, [
        isAnimating,
        cardStack,
        onAnimationStart,
        onAnimationComplete,
        onSwipe,
        currentIndex,
        components.length,
        onComplete
    ]);

    const getStackConfig = (stackIndex: number, totalInStack: number) => {
        const relativeIndex = totalInStack - 1 - stackIndex;

        switch (relativeIndex) {
            case 0: // Front card
                return { scale: 1, zIndex: 40, y: 0, opacity: 1 };
            case 1: // Second card
                return {
                    scale: 0.92,
                    zIndex: 30,
                    y: 25,
                    opacity: 1
                };
            case 2: // Third card
                return {
                    scale: 0.84,
                    zIndex: 20,
                    y: 50,
                    opacity: 1
                };
            default: // Cards further back
                return { scale: 0.76, zIndex: 10, y: 75, opacity: 0 };
        }
    };

    const getExitAnimation = (action: SwipeAction | null) => {
        switch (action) {
            case 'like':
                return { x: 500, y: 0, opacity: 0, scale: 0.9 };
            case 'dislike':
                return { x: -500, y: 0, opacity: 0, scale: 0.9 };
            case 'save':
                return { x: 0, y: -500, opacity: 0, scale: 0.9 };
            case 'super-like':
                return { x: 0, y: 500, opacity: 0, scale: 1.1, rotate: 0 };
            default:
                return { x: 0, y: 0, opacity: 0, scale: 0.8 };
        }
    };

    // Handle empty components array
    if (!components || components.length === 0) {
        return (
            <div className="relative w-full max-w-4xl 2xl:max-w-6xl mx-auto px-xs sm:px-sm md:px-0">
                <div className="relative" style={{
                    height: 'clamp(380px, calc(100vh - 180px), 600px)'
                }}>
                    <EmptyState />
                </div>
            </div>
        );
    }

    // Handle case where all cards have been swiped
    if (cardStack.length === 0 && currentIndex >= components.length) {
        return null; // This will trigger the round completion
    }

    return (
        <div className="relative w-full max-w-4xl 2xl:max-w-6xl mx-auto px-xs sm:px-sm md:px-0">
            <div className="relative" style={{
                height: 'clamp(380px, calc(100vh - 180px), 600px)'
            }}>
                <AnimatePresence>
                    {cardStack.map((stackCard, index) => {
                        const config = getStackConfig(index, cardStack.length);
                        const isTopCard = index === cardStack.length - 1;

                        return (
                            <motion.div
                                key={stackCard.id}
                                className="absolute inset-0"
                                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                animate={{
                                    ...config,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }
                                }}
                                exit={getExitAnimation(isTopCard ? lastAction : null)}
                                style={{
                                    zIndex: config.zIndex,
                                    pointerEvents: isTopCard ? 'auto' : 'none'
                                }}
                            >
                                <SwipeCard
                                    component={stackCard.component}
                                    onSwipe={handleSwipe}
                                    isActive={isTopCard}
                                    isAnimating={isAnimating}
                                    queuePosition={stackCard.absoluteIndex + 1} // 1-based position
                                    totalCards={components.length}
                                    isModalOpen={isModalOpen}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SwiperStack;