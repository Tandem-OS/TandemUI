import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
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

    // Use refs for timing to prevent re-renders that interrupt click events.
    const timingRef = useRef({
        cardVisibleTime: null as number | null,
        interactionStartTime: null as number | null,
    });

    const cardStack = useMemo(() => {
        if (!components || components.length === 0) return [];
        const stack = [];
        const stackSize = 3;
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
        return stack.reverse();
    }, [components, currentIndex]);

    // Reset timing information immediately when the top card changes.
    useEffect(() => {
        timingRef.current.cardVisibleTime = Date.now();
        timingRef.current.interactionStartTime = null;
    }, [currentIndex]);

    // Record the start of a user interaction without causing a re-render.
    const handleInteractionStart = useCallback(() => {
        if (!timingRef.current.interactionStartTime) {
            timingRef.current.interactionStartTime = Date.now();
        }
    }, []);

    const handleSwipe = useCallback(async (action: SwipeAction, originalSignalsFromCard: BehavioralSignal) => {
        if (isAnimating || cardStack.length === 0) return;

        onAnimationStart();

        const topCard = cardStack[cardStack.length - 1];
        if (!topCard?.component) {
            onAnimationComplete();
            return;
        }

        const currentTime = Date.now();
        const visibleTime = timingRef.current.cardVisibleTime ?? currentTime;
        
        let accurateHesitation = 0;
        if (originalSignalsFromCard.action_source === 'keyboard') {
            accurateHesitation = Math.max(0, currentTime - visibleTime);
        } else {
            const interactionTime = timingRef.current.interactionStartTime ?? currentTime;
            accurateHesitation = Math.max(0, currentTime - interactionTime);
        }

        const accurateViewDuration = Math.max(0, currentTime - visibleTime);
        
        const finalSignals: BehavioralSignal = {
            ...originalSignalsFromCard,
            view_duration_ms: accurateViewDuration,
            hesitation_ms: accurateHesitation,
        };
        
        setLastAction(action);
        onSwipe(action, topCard.component, finalSignals);
        
        // This intentional pause allows the card's own animation to start, making the experience smoother.
        await new Promise(resolve => setTimeout(resolve, 200));

        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);

        if (nextIndex >= components.length) {
            onComplete();
        }

        // Unlock the UI after the animations have had time to settle.
        setTimeout(() => {
            onAnimationComplete();
            setLastAction(null);
        }, 300);

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
            case 0: return { scale: 1, zIndex: 40, y: 0, opacity: 1 };
            case 1: return { scale: 0.92, zIndex: 30, y: 25, opacity: 1 };
            case 2: return { scale: 0.84, zIndex: 20, y: 50, opacity: 1 };
            default: return { scale: 0.76, zIndex: 10, y: 75, opacity: 0 };
        }
    };

    const getExitAnimation = (action: SwipeAction | null) => {
        switch (action) {
            case 'like': return { x: 500, opacity: 0 };
            case 'dislike': return { x: -500, opacity: 0 };
            case 'super-like': return { y: 500, opacity: 0 };
            default: return { scale: 0.5, opacity: 0 };
        }
    };

    if (components.length === 0) {
        return (
            <div className="relative w-full max-w-4xl 2xl:max-w-6xl mx-auto px-xs sm:px-sm md:px-0">
                <div className="relative" style={{ height: 'clamp(380px, calc(100vh - 180px), 600px)' }}>
                    <EmptyState />
                </div>
            </div>
        );
    }
    
    if (cardStack.length === 0 && currentIndex >= components.length) {
        return null; 
    }

    return (
        <div className="relative w-full max-w-4xl 2xl:max-w-6xl mx-auto px-xs sm:px-sm md:px-0">
            <div className="relative" style={{ height: 'clamp(380px, calc(100vh - 180px), 600px)' }}>
                <AnimatePresence>
                    {cardStack.map((stackCard, index) => {
                        const config = getStackConfig(index, cardStack.length);
                        const isTopCard = index === cardStack.length - 1;

                        return (
                            <motion.div
                                key={stackCard.id}
                                className="absolute inset-0"
                                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                animate={{ ...config, transition: { type: "spring", stiffness: 300, damping: 30 } }}
                                exit={getExitAnimation(isTopCard ? lastAction : null)}
                                style={{
                                    zIndex: config.zIndex,
                                    pointerEvents: isTopCard ? 'auto' : 'none'
                                }}
                                onMouseDown={isTopCard && !isModalOpen ? handleInteractionStart : undefined}
                                onTouchStart={isTopCard && !isModalOpen ? handleInteractionStart : undefined}
                            >
                                <SwipeCard
                                    component={stackCard.component}
                                    onSwipe={handleSwipe}
                                    isActive={isTopCard && !isModalOpen}
                                    isAnimating={isAnimating}
                                    queuePosition={stackCard.absoluteIndex + 1}
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