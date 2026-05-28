import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiX, FiMaximize2, FiMinimize2,
    FiSmartphone, FiTablet, FiMonitor, FiArrowRight,
    FiEye, FiHeart, FiThumbsUp
} from 'react-icons/fi';
import Preloader from '@/common-components/Preloader';
import type { UserChoice, RoundData, ComponentPreview } from '../swiper.types';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void;
    roundsCompleted: number;
    userChoices: UserChoice[];
    roundsData: RoundData[];
}

type ViewportSize = 'mobile' | 'tablet' | 'desktop';

interface ViewportConfig {
    width: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

const viewportSizes: Record<ViewportSize, ViewportConfig> = {
    mobile: { width: '375px', label: 'Mobile', icon: FiSmartphone },
    tablet: { width: '768px', label: 'Tablet', icon: FiTablet },
    desktop: { width: '100%', label: 'Desktop', icon: FiMonitor },
};

// ── Liked component card ──────────────────────────────────────────────────────

const LikedCard: React.FC<{
    component: ComponentPreview;
    isSuperlike: boolean;
    index: number;
}> = ({ component, isSuperlike, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.35 }}
        className="relative rounded-xl overflow-hidden border border-border-default bg-background-primary-2 group"
    >
        {isSuperlike && (
            <div className="absolute top-xs right-xs z-10 flex items-center gap-xs px-sm py-xs bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-md text-para-xs font-semibold shadow">
                <FiHeart className="text-icon-xs" />
                <span>Super</span>
            </div>
        )}

        <div className="aspect-video bg-background-muted overflow-hidden">
            {component.thumbnail_url ? (
                <img
                    src={component.thumbnail_url}
                    alt={component.title ?? ''}
                    className="w-full h-full object-contain object-top"
                    style={{ backgroundColor: 'var(--color-background-muted, #f3f4f6)' }}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                    <FiEye className="opacity-30 text-icon-xl" />
                </div>
            )}
        </div>

        <div className="px-sm py-xs flex items-center justify-between gap-xs">
            <span className="text-para-xs font-medium text-text-primary truncate">
                {component.title ?? component.category}
            </span>
            <span className="flex-shrink-0 px-sm py-px bg-accent-default text-accent-foreground text-para-xs rounded-md">
                {component.category}
            </span>
        </div>
    </motion.div>
);

// ── Empty state ───────────────────────────────────────────────────────────────

const EmptyPreview: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full gap-md text-text-tertiary p-xl">
        <FiThumbsUp className="text-icon-2xl opacity-30" />
        <p className="text-para-sm text-center">
            Start liking components and they'll appear here as a preview of your direction.
        </p>
    </div>
);

// ── Main modal ────────────────────────────────────────────────────────────────

const PreviewModal: React.FC<PreviewModalProps> = ({
    isOpen,
    onClose,
    onContinue,
    roundsCompleted,
    userChoices,
    roundsData,
}) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [viewport, setViewport] = useState<ViewportSize>('desktop');
    const [isResizing, setIsResizing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) return;
        setIsLoading(true);
        // Give images ~400ms to start loading, then reveal.
        // Don't rely on onAnimationComplete — it fires inconsistently.
        const t = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(t);
    }, [isOpen]);

    useEffect(() => {
        const original = window.getComputedStyle(document.body).overflow;
        if (isOpen) document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = original; };
    }, [isOpen]);

    // Build component lookup from roundsData
    const componentMap = useMemo(() => {
        const map = new Map<string, ComponentPreview>();
        roundsData.forEach(round =>
            round.components.forEach(c => map.set(c.component_id, c))
        );
        return map;
    }, [roundsData]);

    // Liked/superliked choices with their component data, newest first
    const likedItems = useMemo(() => {
        return userChoices
            .filter(c => c.action === 'like' || c.action === 'super-like')
            .slice()
            .reverse()
            .map(choice => ({
                choice,
                component: componentMap.get(choice.component_id),
            }))
            .filter(item => item.component) as {
                choice: UserChoice;
                component: ComponentPreview;
            }[];
    }, [userChoices, componentMap]);

    const handleViewportChange = (key: ViewportSize) => {
        if (key === viewport) return;
        setIsResizing(true);
        setViewport(key);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`fixed z-50 flex items-center justify-center ${isFullscreen ? 'inset-0' : 'inset-0 p-md lg:p-xl'
                        }`}
                    style={{ backgroundColor: isFullscreen ? 'transparent' : 'rgba(0,0,0,0.5)' }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className={`bg-background-primary-2 flex flex-col ${isFullscreen
                            ? 'w-full h-full'
                            : 'rounded-2xl shadow-2xl w-full h-full max-w-7xl max-h-[90vh]'
                            }`}
                    >
                        {/* ── Header ── */}
                        <div className="flex items-center justify-between px-md sm:px-lg lg:px-xl py-sm lg:py-md border-b border-border-default bg-background-primary-2 flex-shrink-0">
                            <div className="flex items-center space-x-sm lg:space-x-lg">
                                <h2 className="text-h6-sm sm:text-h5-md lg:text-h4-md font-bold text-text-primary">
                                    Taste Direction
                                </h2>
                                <span className="hidden sm:inline-flex px-sm py-xs bg-background-secondary text-text-secondary text-para-xs lg:text-para-sm rounded-md border border-border-default">
                                    {roundsCompleted} rounds • {likedItems.length} liked
                                </span>
                            </div>

                            <div className="flex items-center space-x-sm lg:space-x-md">
                                {/* Viewport switcher */}
                                <div className="hidden sm:flex items-center bg-background-secondary rounded-xl p-xs border border-border-default">
                                    {(Object.entries(viewportSizes) as [ViewportSize, ViewportConfig][]).map(([key, config]) => (
                                        <button
                                            key={key}
                                            onClick={() => handleViewportChange(key)}
                                            className={`relative px-sm py-xs lg:px-md lg:py-sm rounded-lg transition-all duration-200 ${viewport === key ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'
                                                }`}
                                            title={config.label}
                                        >
                                            <config.icon className="text-icon-sm lg:text-icon-md" />
                                            {viewport === key && (
                                                <motion.div
                                                    layoutId="viewport-indicator"
                                                    className="absolute inset-0 bg-background-primary-2 rounded-lg shadow-sm -z-10"
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-sm text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-all duration-200"
                                    title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                                >
                                    {isFullscreen
                                        ? <FiMinimize2 className="text-icon-sm lg:text-icon-md" />
                                        : <FiMaximize2 className="text-icon-sm lg:text-icon-md" />
                                    }
                                </button>

                                <button
                                    onClick={onClose}
                                    className="p-sm text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-all duration-200"
                                    title="Close preview"
                                >
                                    <FiX className="text-icon-sm lg:text-icon-md" />
                                </button>
                            </div>
                        </div>

                        {/* ── Preview area ── */}
                        <div className="flex-1 bg-background-muted overflow-hidden relative">
                            <AnimatePresence>
                                {(isLoading || isResizing) && <Preloader />}
                            </AnimatePresence>

                            <div
                                className={`h-full w-full transition-opacity duration-300 ${isLoading || isResizing ? 'opacity-0' : 'opacity-100'
                                    }`}
                            >
                                <div className="h-full flex items-center justify-center">
                                    <motion.div
                                        className="bg-background-primary-2 rounded-xl shadow-xl overflow-hidden h-full"
                                        style={{ maxWidth: '100%' }}
                                        animate={{ width: viewportSizes[viewport].width }}
                                        transition={{ type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                        onAnimationComplete={() => {
                                            if (isResizing) setIsResizing(false);
                                        }}
                                    >
                                        <div className="h-full overflow-y-auto p-md">
                                            {likedItems.length === 0 ? (
                                                <EmptyPreview />
                                            ) : (
                                                <motion.div
                                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md"
                                                >
                                                    {likedItems.map(({ choice, component }, index) => (
                                                        <LikedCard
                                                            key={`${choice.component_id}-${index}`}
                                                            component={component}
                                                            isSuperlike={choice.action === 'super-like'}
                                                            index={index}
                                                        />
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* ── Footer ── */}
                        <div className="flex items-center justify-between px-md sm:px-lg lg:px-xl py-sm border-t border-border-default bg-background-primary-2 flex-shrink-0">
                            <p className="text-para-sm text-text-secondary hidden sm:block">
                                {likedItems.length > 0
                                    ? `${likedItems.length} component${likedItems.length !== 1 ? 's' : ''} liked so far`
                                    : 'Like components to build your direction'}
                            </p>
                            <motion.button
                                onClick={onContinue}
                                className="flex items-center justify-center gap-sm px-lg lg:px-xl py-sm bg-accent-default text-accent-foreground hover:bg-accent-hover rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-para-md">Continue Swiping</span>
                                <FiArrowRight className="text-icon-sm lg:text-icon-md" />
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PreviewModal;