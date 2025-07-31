import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, type PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';
import { FiThumbsUp, FiThumbsDown, FiHelpCircle, FiBookmark, FiHeart, FiImage } from 'react-icons/fi';
import { type SwipeCardProps } from '../swiper.types';
import { AskAiModal } from './AskAiModal';
import swipeAudio from "@/assets/audio/swipeAudio.mp3";
import clickAudio from "@/assets/audio/clickAudio.mp3";

// Constants
const SWIPE_POWER = 500;
const X_THRESHOLD = 120;
const Y_THRESHOLD = 100;
const DOUBLE_TAP_DELAY = 300;
const IMAGE_TIMEOUT = 10000; // 10 seconds timeout for image loading

// Action configurations
const ACTIONS = {
    like: { x: SWIPE_POWER, y: 0, key: 'ArrowRight' },
    dislike: { x: -SWIPE_POWER, y: 0, key: 'ArrowLeft' },
    save: { x: 0, y: -SWIPE_POWER, key: 'ArrowUp' },
    'super-like': { x: 0, y: SWIPE_POWER, key: ' ' }
} as const;

// Button configurations
const BUTTON_CONFIG = {
    like: { icon: FiThumbsUp, color: 'success', label: 'Like' },
    dislike: { icon: FiThumbsDown, color: 'error', label: 'Nope' },
    save: { icon: FiBookmark, color: 'warning', label: 'Save' },
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
        
        // Set up timeout
        timeoutRef.current = setTimeout(() => {
            setImageState('error');
        }, IMAGE_TIMEOUT);

        img.onload = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setImageState('loaded');
        };

        img.onerror = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setImageState('error');
        };

        img.src = src;

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [src]);

    return imageState;
};

// Image component with loading states
const CardImage: React.FC<{ 
    src: string; 
    className: string;
}> = ({ src, className }) => {
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
}) => {
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const { playSwipe, playClick } = useAudio();

    // Motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-300, 300], [-25, 25]);
    const opacity = useTransform(x, [-500, -150, 0, 150, 500], [0, 1, 1, 1, 0]);
    const superLikeOpacity = useMotionValue(0);

    // Overlay opacities
    const overlayOpacities = {
        nope: useTransform(x, [-300, -80, 0], [1, 0.7, 0]),
        like: useTransform(x, [0, 80, 300], [0, 0.7, 1]),
        save: useTransform(y, [-300, -80, 0], [1, 0.7, 0])
    };

    // Double tap detection
    const lastTap = useRef<number>(0);
    const tapTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleSwipeAction = useCallback((action: keyof typeof ACTIONS | 'ask-ai') => {
        if (!isActive || isAnimating) return;

        if (isAiModalOpen) setIsAiModalOpen(false);

        if (action === 'ask-ai') return;

        const config = ACTIONS[action];

        if (action === 'super-like') {
            animate(superLikeOpacity, 1, { duration: 0.3 });
            setTimeout(() => {
                Promise.all([
                    animate(x, config.x, { type: "spring", stiffness: 500, damping: 50 }),
                    animate(y, config.y, { type: "spring", stiffness: 500, damping: 50 })
                ]).then(() => onSwipe(action));
            }, 300);
        } else {
            Promise.all([
                animate(x, config.x, { type: "spring", stiffness: 500, damping: 50 }),
                animate(y, config.y, { type: "spring", stiffness: 500, damping: 50 })
            ]).then(() => onSwipe(action));
        }

        playSwipe();
    }, [isActive, isAnimating, isAiModalOpen, onSwipe, playSwipe, superLikeOpacity, x, y]);

    // Keyboard support
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isActive || isAnimating || isAiModalOpen) return;

            const action = Object.entries(ACTIONS).find(([_, config]) => config.key === e.key)?.[0];
            if (action) {
                e.preventDefault();
                handleSwipeAction(action as keyof typeof ACTIONS);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isActive, isAnimating, isAiModalOpen, handleSwipeAction]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (!isActive || isAnimating) return;
        setIsDragging(false);

        if (info.offset.y < -Y_THRESHOLD) handleSwipeAction('save');
        else if (info.offset.x > X_THRESHOLD) handleSwipeAction('like');
        else if (info.offset.x < -X_THRESHOLD) handleSwipeAction('dislike');
        else {
            animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
            animate(y, 0, { type: "spring", stiffness: 500, damping: 30 });
        }
    };

    const handleCardClick = useCallback(() => {
        if (!isActive || isAnimating) return;

        const now = Date.now();
        if (tapTimeout.current) {
            clearTimeout(tapTimeout.current);
            tapTimeout.current = null;
        }

        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
            handleSwipeAction('super-like');
            lastTap.current = 0;
        } else {
            lastTap.current = now;
            tapTimeout.current = setTimeout(() => { lastTap.current = 0; }, DOUBLE_TAP_DELAY);
        }
    }, [isActive, isAnimating, handleSwipeAction]);

    const canDrag = isActive && !isAnimating && !isAiModalOpen;
    const isDisabled = isDragging || !isActive || isAnimating;

    // Overlay component
    const Overlay = ({ type, label }: { type: 'nope' | 'like' | 'save', label: string }) => (
        <motion.div
            className={`absolute z-10 border-2 px-md py-sm font-bold text-para-sm sm:text-para-md 
                 rounded-md sm:rounded-lg pointer-events-none
                 top-[96px] sm:top-[112px] left-1/2 -translate-x-1/2 -translate-y-1/2
                 lg:top-sm lg:left-auto lg:right-sm lg:translate-x-0 lg:translate-y-0
                 ${type === 'nope' ? 'bg-background-error text-text-error border-border-error' :
                    type === 'like' ? 'bg-background-success text-text-success border-border-success' :
                        'bg-background-warning text-text-warning border-border-warning'}`}
            style={{ opacity: overlayOpacities[type], willChange: 'opacity' }}
        >
            {label}
        </motion.div>
    );

    // Action button component
    const ActionButton = ({ action, onClick, special = false }: {
        action: keyof typeof BUTTON_CONFIG,
        onClick: () => void,
        special?: boolean
    }) => {
        const config = BUTTON_CONFIG[action];
        const Icon = config.icon;

        return (
            <motion.button
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                className={`flex flex-col items-center gap-1 p-sm transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed group min-w-[40px]
                   ${special ? 'rounded-full bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 w-16 h-16 shadow-lg justify-center' :
                        `rounded-lg bg-background-secondary hover:bg-background-${config.color} hover:bg-opacity-20`}`}
                whileHover={!isDisabled ? { scale: special ? 1.15 : 1.1, y: special ? -2 : -1 } : {}}
                whileTap={!isDisabled ? { scale: special ? 0.9 : 0.95 } : {}}
                aria-label={config.label}
                disabled={isDisabled}
            >
                <Icon className={`text-icon-sm ${special ? 'text-white' : `text-text-${config.color}`} transition-colors`} />
                <span className={`text-para-xs ${special ? 'font-bold text-white' : `font-medium text-text-${config.color}`} transition-colors`}>
                    {special ? 'Super' : config.label}
                </span>
            </motion.button>
        );
    };

    return (
        <motion.div
            className={`relative w-full mx-auto ${canDrag ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
            style={{ transformOrigin: 'center bottom', x, y, rotate, opacity, willChange: 'transform' }}
            drag={canDrag}
            dragElastic={0.2}
            dragConstraints={{ left: -300, right: 300, top: -200, bottom: 50 }}
            onDragStart={() => { setIsDragging(true); if (isAiModalOpen) setIsAiModalOpen(false); }}
            onDragEnd={handleDragEnd}
            whileDrag={canDrag ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
            onClick={handleCardClick}
        >
            {/* Swipe feedback overlays */}
            {isActive && (
                <>
                    <Overlay type="nope" label="NOPE" />
                    <Overlay type="like" label="LIKE" />
                    <Overlay type="save" label="SAVE" />

                    {/* Super Like overlay */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 border-2 px-lg py-md font-bold text-para-lg sm:text-h6-sm rounded-lg sm:rounded-xl bg-gradient-to-br from-red-500 to-pink-600 text-white border-pink-400 pointer-events-none shadow-2xl"
                        style={{ opacity: superLikeOpacity, willChange: 'opacity' }}
                    >
                        SUPER LIKE!
                    </motion.div>
                </>
            )}

            {/* Main Card */}
            <div className="bg-background-secondary rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-border-default overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Mobile Image with loading states */}
                    <CardImage
                        src={component.thumbnail_url}
                        className="lg:hidden h-48 sm:h-56"
                    />

                    {/* Content */}
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

                    {/* Desktop Image with loading states */}
                    <CardImage
                        src={component.thumbnail_url}
                        className="hidden lg:block"
                    />
                </div>

                {/* Action Buttons */}
                <div className="px-sm py-sm md:px-md md:py-md">
                    <div className="flex justify-center">
                        <div className={`flex items-center justify-center gap-sm ${!isActive ? 'pointer-events-none opacity-60' : ''}`}>
                            <ActionButton action="like" onClick={() => { playClick(); handleSwipeAction('like'); }} />
                            <ActionButton action="dislike" onClick={() => { playClick(); handleSwipeAction('dislike'); }} />

                            {/* Super Like Button with Heart Icon */}
                            <motion.button
                                onClick={(e) => { e.stopPropagation(); playClick(); handleSwipeAction('super-like'); }}
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
                                <ActionButton action="ask-ai" onClick={() => setIsAiModalOpen(prev => !prev)} />
                                {isActive && (
                                    <AskAiModal
                                        isOpen={isAiModalOpen}
                                        description={`This ${component.vibe.toLowerCase()} ${component.category.toLowerCase()} design focuses on ${component.tone.join(', ')} aesthetics with ${component.layout_structure} layout structure to achieve ${component.intent.join(' and ')} goals.`}
                                        onClose={() => setIsAiModalOpen(false)}
                                    />
                                )}
                            </div>

                            <ActionButton action="save" onClick={() => { playClick(); handleSwipeAction('save'); }} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SwipeCard;