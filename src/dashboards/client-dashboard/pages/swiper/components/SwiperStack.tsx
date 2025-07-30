import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';
import { type ComponentPreview, type SwipeAction } from '../swiper.types';

interface SwiperStackProps {
    components: ComponentPreview[];
    onSwipe: (action: SwipeAction, component: ComponentPreview) => void;
    onComplete: () => void;
    isAnimating: boolean;
    onAnimationStart: () => void;
    onAnimationComplete: () => void;
}

const SwiperStack: React.FC<SwiperStackProps> = ({
    components,
    onSwipe,
    onComplete,
    isAnimating,
    onAnimationStart,
    onAnimationComplete
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const cardStack = useMemo(() => {
        const stack = [];
        const stackSize = 5;
        for (let i = 0; i < stackSize; i++) {
            const componentIndex = currentIndex + i;
            if (componentIndex < components.length) {
                stack.push({
                    component: components[componentIndex],
                    id: `${components[componentIndex].component_id}-${componentIndex}`,
                    stackIndex: i
                });
            }
        }
        return stack.reverse(); // Reverse to render from back to front
    }, [components, currentIndex]);

    const handleSwipe = useCallback(async (action: SwipeAction) => {
        if (isAnimating || cardStack.length === 0) return;

        onAnimationStart(); // Lock the UI

        const topCard = cardStack[cardStack.length - 1];
        if (!topCard?.component) {
            onAnimationComplete(); // Unlock if something is wrong
            return;
        }

        // Inform parent about the swipe action for data collection
        onSwipe(action, topCard.component);

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

    if (cardStack.length === 0) {
        return null;
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
                                exit={{
                                    x: stackCard.component.vibe === 'like' ? 500 : -500, // Example exit based on action
                                    opacity: 0,
                                    scale: 0.9,
                                    transition: { duration: 0.3 }
                                }}
                                style={{
                                    zIndex: config.zIndex,
                                    pointerEvents: isTopCard ? 'auto' : 'none'
                                }}
                            >
                                <SwipeCard
                                    component={stackCard.component}
                                    onSwipe={handleSwipe}
                                    isActive={isTopCard}
                                    isAnimating={isAnimating} // Pass lock state to card
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