import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, type PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';
import { FiThumbsUp, FiThumbsDown, FiHelpCircle, FiHeart, FiImage, FiInfo } from 'react-icons/fi';
import { type SwipeCardProps, type BehavioralSignal, type ActionSource } from '../swiper.types';
import { AskAiModal } from './AskAiModal';
import swipeAudio from "@/assets/audio/swipeAudio.mp3";
import clickAudio from "@/assets/audio/clickAudio.mp3";
import Drawer from '@/comman-components/Drawer';

// Constants
const SWIPE_POWER = 500;
const X_THRESHOLD = 120;
const DOUBLE_TAP_DELAY = 300;
const IMAGE_TIMEOUT = 10000; // 10 seconds timeout for image loading
const SWIPE_COOLDOWN = 800; // Prevent multiple swipes for 800ms

// Action configurations
const ACTIONS = {
    like: { x: SWIPE_POWER, y: 0, key: 'ArrowRight' },
    dislike: { x: -SWIPE_POWER, y: 0, key: 'ArrowLeft' },
    'super-like': { x: 0, y: SWIPE_POWER, key: ' ' }
} as const;

// Button configurations
const BUTTON_CONFIG = {
    like: { icon: FiThumbsUp, color: 'success', label: 'Like' },
    dislike: { icon: FiThumbsDown, color: 'error', label: 'Nope' },
    'ask-ai': { icon: FiHelpCircle, color: 'info', label: 'Ask AI' }
};

// Custom hook for audio
const useAudio = () => {
    const swipeRef = useRef<HTMLAudioElement | null>(null);
    const clickRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        swipeRef.current = new Audio(swipeAudio);
        swipeRef.current.volume = 0.5;
        clickRef.current = new Audio(clickAudio);
        clickRef.current.volume = 0.3;
    }, []);

    const playSwipe = () => swipeRef.current?.play().catch(() => { });
    const playClick = () => clickRef.current?.play().catch(() => { });

    return { playSwipe, playClick };
};

// Custom hook for image loading
const useImageLoading = (src: string) => {
    const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!src) {
            setImageState('error');
            return;
        }

        setImageState('loading');
        const img = new Image();

        timeoutRef.current = setTimeout(() => setImageState('error'), IMAGE_TIMEOUT);

        img.onload = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setImageState('loaded');
        };

        img.onerror = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setImageState('error');
        };

        img.src = src;

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [src]);

    return imageState;
};

// Image component with loading states
const CardImage: React.FC<{ src: string; className: string }> = ({ src, className }) => {
    const imageState = useImageLoading(src);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Loading skeleton */}
            {imageState === 'loading' && (
                <div className="absolute inset-0 bg-background-muted animate-pulse flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-border-default border-t-accent-default rounded-full"
                    />
                </div>
            )}

            {/* Error fallback */}
            {imageState === 'error' && (
                <div className="absolute inset-0 bg-background-muted flex flex-col items-center justify-center text-text-tertiary">
                    <FiImage className="text-icon-2xl mb-sm opacity-50" />
                    <span className="text-para-xs opacity-75">Image unavailable</span>
                </div>
            )}

            {/* Actual image with blur-to-clear transition */}
            <motion.div
                className="w-full h-full bg-cover bg-center bg-no-repeat select-none"
                style={{ backgroundImage: `url(${src})` }}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{
                    opacity: imageState === 'loaded' ? 1 : 0,
                    filter: imageState === 'loaded' ? 'blur(0px)' : 'blur(10px)'
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            />
        </div>
    );
};

const SwipeCard: React.FC<SwipeCardProps> = ({
    component,
    onSwipe,
    isActive = true,
    isAnimating = false,
    queuePosition,
}) => {
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false);
    const [hasAskedAI, setHasAskedAI] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isSwipeInProgress, setIsSwipeInProgress] = useState(false);
    const { playSwipe, playClick } = useAudio();

    // Behavioral tracking refs
    const cardRenderTime = useRef<number>(Date.now());
    const pointerDownTime = useRef<number | null>(null);
    const dragStartTime = useRef<number | null>(null);
    const gestureVelocity = useRef<number>(0);
    const lastPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const lastVelocityUpdate = useRef<number>(Date.now());
    const velocityHistory = useRef<number[]>([]);
    const swipeCooldownTimer = useRef<NodeJS.Timeout | null>(null);

    // Motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-300, 300], [-25, 25]);
    const opacity = useTransform(x, [-500, -150, 0, 150, 500], [0, 1, 1, 1, 0]);

    // Overlay opacities
    const overlayOpacities = {
        nope: useTransform(x, [-300, -80, 0], [1, 0.7, 0]),
        like: useTransform(x, [0, 80, 300], [0, 0.7, 1]),
    };

    // Double tap detection
    const lastTap = useRef<number>(0);
    const tapTimeout = useRef<NodeJS.Timeout | null>(null);

    // Reset states when component changes
    useEffect(() => {
        cardRenderTime.current = Date.now();
        setHasAskedAI(false);
        setIsSwipeInProgress(false);
        setIsInfoDrawerOpen(false);

        if (swipeCooldownTimer.current) {
            clearTimeout(swipeCooldownTimer.current);
            swipeCooldownTimer.current = null;
        }
    }, [component.component_id]);

    // Enhanced velocity tracking during drag
    useEffect(() => {
        const unsubscribeX = x.on('change', (latest) => {
            const now = Date.now();
            const timeDelta = now - lastVelocityUpdate.current;
            if (timeDelta > 16) { // Update every ~16ms (60fps)
                const xDelta = Math.abs(latest - lastPosition.current.x);
                const velocity = xDelta / timeDelta * 1000; // pixels per second

                velocityHistory.current.push(velocity);
                if (velocityHistory.current.length > 10) {
                    velocityHistory.current.shift(); // Keep last 10 readings
                }

                const avgVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;
                gestureVelocity.current = avgVelocity;

                lastPosition.current.x = latest;
                lastVelocityUpdate.current = now;
            }
        });

        const unsubscribeY = y.on('change', (latest) => {
            const now = Date.now();
            const timeDelta = now - lastVelocityUpdate.current;
            if (timeDelta > 16) {
                const yDelta = Math.abs(latest - lastPosition.current.y);
                const velocity = yDelta / timeDelta * 1000;

                gestureVelocity.current = Math.max(gestureVelocity.current, velocity);
                lastPosition.current.y = latest;
            }
        });

        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [x, y]);

    const calculateSwipeDirection = (action: keyof typeof ACTIONS | 'ask-ai'): 'left' | 'right' | 'up' | 'down' | 'none' => {
        switch (action) {
            case 'like': return 'right';
            case 'dislike': return 'left';
            case 'super-like': return 'down';
            default: return 'none';
        }
    };

    const createBehavioralSignal = (
        action: keyof typeof ACTIONS | 'ask-ai',
        source: ActionSource
    ): BehavioralSignal => {
        const now = Date.now();
        const viewDuration = now - cardRenderTime.current;

        let hesitation = 0;
        if (source === 'gesture' && dragStartTime.current) {
            hesitation = now - dragStartTime.current;
        } else if (source === 'button' && pointerDownTime.current) {
            hesitation = pointerDownTime.current - cardRenderTime.current;
        } else if (source === 'keyboard') {
            hesitation = now - cardRenderTime.current;
        }

        return {
            hesitation_ms: Math.max(0, hesitation),
            gesture_velocity: source === 'gesture' ? Math.round(gestureVelocity.current) : 0,
            swipe_direction: calculateSwipeDirection(action),
            view_duration_ms: Math.max(0, viewDuration),
            queue_position: queuePosition,
            action_source: source,
            is_asked_ai: hasAskedAI,
            superlike_used: action === 'super-like'
        };
    };

    const handleSwipeAction = useCallback((action: keyof typeof ACTIONS | 'ask-ai', source: ActionSource) => {
        if (!isActive || isAnimating || isSwipeInProgress) return;

        if (isAiModalOpen) setIsAiModalOpen(false);
        if (isInfoDrawerOpen) setIsInfoDrawerOpen(false);

        if (action === 'ask-ai') return;

        setIsSwipeInProgress(true);

        const config = ACTIONS[action];
        const behavioralSignal = createBehavioralSignal(action, source);

        Promise.all([
            animate(x, config.x, { type: "spring", stiffness: 500, damping: 50 }),
            animate(y, config.y, { type: "spring", stiffness: 500, damping: 50 })
        ]).then(() => {
            onSwipe(action, behavioralSignal);
            setIsSwipeInProgress(false);
        });

        playSwipe();

        if (swipeCooldownTimer.current) clearTimeout(swipeCooldownTimer.current);
        swipeCooldownTimer.current = setTimeout(() => setIsSwipeInProgress(false), SWIPE_COOLDOWN);

        // Reset tracking
        pointerDownTime.current = null;
        dragStartTime.current = null;
        gestureVelocity.current = 0;
        velocityHistory.current = [];
    }, [isActive, isAnimating, isSwipeInProgress, isAiModalOpen, isInfoDrawerOpen, onSwipe, playSwipe, x, y, component, hasAskedAI, queuePosition]);

    // Keyboard support
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isActive || isAnimating || isAiModalOpen || isSwipeInProgress || isInfoDrawerOpen) return;

            const action = Object.entries(ACTIONS).find(([_, config]) => config.key === e.key)?.[0];
            if (action) {
                e.preventDefault();
                handleSwipeAction(action as keyof typeof ACTIONS, 'keyboard');
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isActive, isAnimating, isAiModalOpen, isSwipeInProgress, isInfoDrawerOpen, handleSwipeAction]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (!isActive || isAnimating || isSwipeInProgress) return;
        setIsDragging(false);

        let action: keyof typeof ACTIONS | null = null;
        if (info.offset.x > X_THRESHOLD) action = 'like';
        else if (info.offset.x < -X_THRESHOLD) action = 'dislike';

        if (action) {
            handleSwipeAction(action, 'gesture');
        } else {
            animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
            animate(y, 0, { type: "spring", stiffness: 500, damping: 30 });
            pointerDownTime.current = null;
            dragStartTime.current = null;
            gestureVelocity.current = 0;
            velocityHistory.current = [];
        }
    };

    const handleCardClick = useCallback(() => {
        if (!isActive || isAnimating || isSwipeInProgress) return;

        const now = Date.now();
        if (tapTimeout.current) {
            clearTimeout(tapTimeout.current);
            tapTimeout.current = null;
        }

        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
            pointerDownTime.current = lastTap.current;
            handleSwipeAction('super-like', 'gesture');
            lastTap.current = 0;
        } else {
            lastTap.current = now;
            tapTimeout.current = setTimeout(() => { lastTap.current = 0; }, DOUBLE_TAP_DELAY);
        }
    }, [isActive, isAnimating, isSwipeInProgress, handleSwipeAction]);

    const handlePointerDown = () => {
        if (!isActive || isAnimating || isSwipeInProgress) return;
        pointerDownTime.current = Date.now();
    };

    const handleDragStart = () => {
        if (isSwipeInProgress) return;
        setIsDragging(true);
        dragStartTime.current = Date.now();
        if (isAiModalOpen) setIsAiModalOpen(false);
        if (isInfoDrawerOpen) setIsInfoDrawerOpen(false);
    };

    const handleAskAI = () => {
        if (isSwipeInProgress) return;
        setIsAiModalOpen(prev => !prev);
        if (!isAiModalOpen) setHasAskedAI(true);
    };

    const canDrag = isActive && !isAnimating && !isAiModalOpen && !isSwipeInProgress && !isInfoDrawerOpen;
    const isDisabled = isDragging || !isActive || isAnimating || isSwipeInProgress;

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (swipeCooldownTimer.current) {
                clearTimeout(swipeCooldownTimer.current);
            }
        };
    }, []);

    // Overlay component
    const Overlay = ({ type, label }: { type: 'nope' | 'like', label: string }) => (
        <motion.div
            className={`absolute z-10 border-2 px-md py-sm font-bold text-para-sm sm:text-para-md 
                 rounded-md sm:rounded-lg pointer-events-none
                 top-[96px] sm:top-[112px] left-1/2 -translate-x-1/2 -translate-y-1/2
                 lg:top-sm lg:left-auto lg:right-sm lg:translate-x-0 lg:translate-y-0
                 ${type === 'nope' ? 'bg-background-error text-text-error border-border-error' :
                    'bg-background-success text-text-success border-border-success'}`}
            style={{ opacity: overlayOpacities[type], willChange: 'opacity' }}
        >
            {label}
        </motion.div>
    );

    // Action button component
    const ActionButton = ({ action, onClick, special = false }: {
        action: keyof typeof BUTTON_CONFIG,
        onClick: () => void,
        special?: boolean,
    }) => {
        const config = BUTTON_CONFIG[action];
        const Icon = config.icon;

        return (
            <motion.button
                onClick={(e) => {
                    e.stopPropagation();
                    pointerDownTime.current = Date.now();
                    onClick();
                }}
                onPointerDown={() => {
                    if (!pointerDownTime.current) {
                        pointerDownTime.current = Date.now();
                    }
                }}
                className={`flex flex-col items-center gap-1 p-sm duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed group min-w-[40px]
                   ${special ? 'rounded-full bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 w-16 h-16 shadow-lg justify-center' :
                        `rounded-lg bg-background-secondary hover:bg-background-${config.color} hover:bg-opacity-20`}`}
                whileHover={!isDisabled ? { scale: special ? 1.15 : 1.1, y: special ? -2 : -1 } : {}}
                whileTap={!isDisabled ? { scale: special ? 0.9 : 0.95 } : {}}
                aria-label={config.label}
                disabled={isDisabled}
            >
                <Icon className={`text-icon-sm lg:text-icon-md ${special ? 'text-white' : `text-text-${config.color}`} transition-colors`} />
                <span className={`text-para-xs lg:text-para-sm ${special ? 'font-bold text-white' : `font-medium text-text-${config.color}`} transition-colors`}>
                    {special ? 'Super' : config.label}
                </span>
            </motion.button>
        );
    };

    return (
        <>
            <motion.div
                className={`relative w-full mx-auto ${canDrag ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                style={{ transformOrigin: 'center bottom', x, y, rotate, opacity, willChange: 'transform' }}
                drag={canDrag}
                dragElastic={0.2}
                dragConstraints={{ left: -300, right: 300, top: -200, bottom: 50 }}
                onPointerDown={handlePointerDown}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                whileDrag={canDrag ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
                onClick={handleCardClick}
            >
                {/* Swipe feedback overlays */}
                {isActive && (
                    <>
                        <Overlay type="nope" label="NOPE" />
                        <Overlay type="like" label="LIKE" />
                    </>
                )}

                {/* Main Card */}
                <div className="bg-background-secondary rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-border-default overflow-hidden">
                    {/* Mobile Layout - Force hide on desktop */}
                    <div className="block lg:!hidden">
                        <div className="grid grid-cols-1">
                            <CardImage src={component.thumbnail_url} className="h-48 sm:h-56" />

                            <div className="relative bg-background-primary-2 p-md sm:p-lg flex flex-col justify-center">
                                <div className="absolute inset-0 z-10 pointer-events-auto" />

                                <div className="space-y-sm md:space-y-md">
                                    <div className="flex items-center justify-between gap-xs">
                                        <span className="px-xs py-px sm:px-sm sm:py-xs md:px-md md:py-sm bg-accent-default text-accent-foreground text-para-xs sm:text-para-sm 2xl:text-para-md font-medium rounded-sm sm:rounded-md md:rounded-lg">
                                            {component.category}
                                        </span>
                                        <span className="px-xs py-px sm:px-sm sm:py-xs md:px-md md:py-sm bg-background-secondary-2 text-text-secondary text-para-xs sm:text-para-sm font-medium rounded-sm sm:rounded-md md:rounded-lg">
                                            {component.vibe}
                                        </span>
                                    </div>

                                    <div className="space-y-xs sm:space-y-sm md:space-y-md pr-md">
                                        <h2 className="text-h5-sm sm:text-h4-sm md:text-h4-md font-semibold text-text-primary leading-tight">
                                            {component.title}
                                        </h2>
                                        <p className="text-text-secondary text-para-xs sm:text-para-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                                            {component.description}
                                        </p>

                                        <div className="flex flex-wrap gap-xs sm:gap-xs md:gap-sm">
                                            {component.tags.slice(0, 3).map((tag, i) => (
                                                <span key={i} className="px-xs py-px sm:px-sm sm:py-xs md:px-sm md:py-xs bg-background-secondary-2 text-text-tertiary text-para-xs rounded-sm sm:rounded md:rounded-md">
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
                        </div>
                    </div>

                    {/* Desktop Layout - Force show on desktop */}
                    <div className="!hidden lg:!block relative h-[370px] 2xl:h-[470px]">
                        <CardImage src={component.thumbnail_url} className="absolute inset-0 w-full h-full" />

                        {/* Info Button */}
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                playClick();
                                setIsInfoDrawerOpen(true);
                            }}
                            className="absolute top-lg left-lg z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center group hover:bg-white"
                        >
                            <FiInfo className="text-icon-md text-gray-700 group-hover:text-accent-default" />
                        </motion.button>

                        {/* Bottom Overlay with Title and Tags */}
                        <div className="absolute bottom-0 left-0 right-0 z-10">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                            <div className="relative px-lg py-md space-y-md">
                                <div className="flex items-end justify-between gap-md">
                                    <div className="flex-1 space-y-sm">
                                        <h2 className="text-h3-md font-semibold text-white leading-tight">
                                            {component.title}
                                        </h2>
                                        <div className="flex flex-wrap gap-sm">
                                            {component.tags.slice(0, 4).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-md py-xs bg-white/20 backdrop-blur-sm text-white text-para-sm rounded-full border border-white/20"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                            {component.tags.length > 4 && (
                                                <span className="px-md py-sm bg-white/10 backdrop-blur-sm text-white/70 text-para-sm rounded-full">
                                                    +{component.tags.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-sm">
                                        <span className="px-md py-sm bg-accent-default text-accent-foreground text-para-sm font-medium rounded-lg">
                                            {component.category}
                                        </span>
                                        <span className="px-md py-sm bg-white/20 backdrop-blur-sm text-white text-para-sm font-medium rounded-lg border border-white/20">
                                            {component.vibe}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-sm py-sm md:px-md md:py-md">
                        <div className="flex justify-center">
                            <div className={`flex items-center justify-center gap-md ${!isActive ? 'pointer-events-none opacity-60' : ''}`}>
                                {/* Super Like Button with Heart Icon */}
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        pointerDownTime.current = Date.now();
                                        playClick();
                                        handleSwipeAction('super-like', 'button');
                                    }}
                                    onPointerDown={() => {
                                        if (!pointerDownTime.current) {
                                            pointerDownTime.current = Date.now();
                                        }
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
                                <ActionButton action="like" onClick={() => { playClick(); handleSwipeAction('like', 'button'); }} />
                                <ActionButton action="dislike" onClick={() => { playClick(); handleSwipeAction('dislike', 'button'); }} />
                                {/* Ask AI Button */}
                                <div className="relative">
                                    <ActionButton action="ask-ai" onClick={handleAskAI} />
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
                    </div>
                </div>
            </motion.div>

            {/* Info Drawer using your existing Drawer component */}
            <Drawer
                isOpen={isInfoDrawerOpen}
                onClose={() => setIsInfoDrawerOpen(false)}
                position="left"
                width="w-[400px]"
            >
                <div className="p-md space-y-lg mt-lg bg-background-primary rounded-xl">
                    {/* Header */}
                    <h3 className="text-h4-md font-semibold text-text-primary">Component Details</h3>

                    {/* Category & Vibe (Bade Chips) */}
                    <div className="flex flex-wrap gap-sm">
                        <span className="px-lg py-sm bg-accent-default text-accent-foreground text-para-sm font-medium rounded-full shadow-sm">
                            {component.category}
                        </span>
                        <span className="px-lg py-sm bg-background-secondary text-text-secondary text-para-sm font-medium rounded-full border border-border-muted">
                            {component.vibe}
                        </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-sm">
                        <h4 className="text-h4-sm font-semibold text-text-primary">
                            {component.title}
                        </h4>
                        <p className="text-text-secondary text-para-md leading-relaxed p-md bg-background-muted/50 rounded-lg border border-border-default/50">
                            {component.description}
                        </p>
                    </div>

                    {/* Layout Structure */}
                    <div className="space-y-sm">
                        <h5 className="text-h6-sm font-medium text-text-primary border-l-4 border-accent-default pl-sm">Layout Structure</h5>
                        <p className="text-text-secondary text-para-sm bg-background-secondary rounded-lg p-md shadow-sm">
                            {component.layout_structure}
                        </p>
                    </div>

                    {/* Intent (Chote Chips, Bada Font) */}
                    <div className="space-y-sm">
                        <h5 className="text-h6-sm font-medium text-text-primary border-l-4 border-emerald-500 pl-sm">Design Intent</h5>
                        <div className="flex flex-wrap gap-sm">
                            {component.intent.map((intent: string, i: number) => (
                                <span key={i} className="px-md py-xs bg-emerald-500 text-white text-para-sm font-medium rounded-full">
                                    {intent}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tone (Chote Chips, Bada Font) */}
                    <div className="space-y-sm">
                        <h5 className="text-h6-sm font-medium text-text-primary border-l-4 border-purple-500 pl-sm">Design Tone</h5>
                        <div className="flex flex-wrap gap-sm">
                            {component.tone.map((tone: string, i: number) => (
                                <span key={i} className="px-md py-xs bg-purple-500 text-white text-para-sm font-medium rounded-full hover:bg-purple-600 transition-colors cursor-default">
                                    {tone}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* All Tags (Chote Chips, Bada Font) */}
                    <div className="space-y-sm">
                        <h5 className="text-h6-sm font-medium text-text-primary border-l-4 border-border-muted pl-sm">Tags</h5>
                        <div className="flex flex-wrap gap-sm">
                            {component.tags.map((tag: string, i: number) => (
                                <span key={i} className="px-md py-xs bg-background-secondary/60 text-text-tertiary text-para-sm rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default SwipeCard;