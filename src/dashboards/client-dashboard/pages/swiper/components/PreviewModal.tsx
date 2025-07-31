// src/components/PreviewModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMaximize2, FiMinimize2, FiSmartphone, FiTablet, FiMonitor, FiArrowRight } from 'react-icons/fi';
import { Navbar, Hero, Features, About, Blog, Pricing, CTA, Footer } from './PreviewComponents';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void;
    roundsCompleted: number;
    userChoices: any[];
}

type ViewportSize = 'mobile' | 'tablet' | 'desktop';

const viewportSizes = {
    mobile: { width: '375px', label: 'Mobile', icon: FiSmartphone },
    tablet: { width: '768px', label: 'Tablet', icon: FiTablet },
    desktop: { width: '100%', label: 'Desktop', icon: FiMonitor }
};

// Map rounds to components for progressive preview
const getRoundComponents = (roundsCompleted: number) => {
    const components = [];

    // Always show navbar
    components.push({ component: Navbar, key: 'navbar' });

    // Add components based on rounds completed
    if (roundsCompleted >= 2) {
        components.push({ component: Hero, key: 'hero' });
        components.push({ component: Features, key: 'features' });
    }

    if (roundsCompleted >= 4) {
        components.push({ component: About, key: 'about' });
        components.push({ component: Blog, key: 'blog' });
    }

    if (roundsCompleted >= 6) {
        components.push({ component: Pricing, key: 'pricing' });
        components.push({ component: CTA, key: 'cta' });
    }

    // Always show footer if we have more than navbar
    if (components.length > 1) {
        components.push({ component: Footer, key: 'footer' });
    }

    return components;
};

const PreviewModal: React.FC<PreviewModalProps> = ({
    isOpen,
    onContinue,
    roundsCompleted,
}) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [viewport, setViewport] = useState<ViewportSize>('desktop');

    const components = getRoundComponents(roundsCompleted);

    // Handle close - always continues swiping
    const handleClose = () => {
        onContinue();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`fixed z-50 flex items-center justify-center ${
                        isFullscreen ? 'inset-0' : 'inset-0 p-md lg:p-xl'
                    }`}
                    style={{ backgroundColor: isFullscreen ? '#fff' : 'rgba(0, 0, 0, 0.5)' }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className={`bg-background-primary flex flex-col ${
                            isFullscreen ? 'w-full h-full' : 'rounded-2xl shadow-2xl w-full h-full max-w-7xl max-h-[90vh]'
                        }`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-md sm:px-lg lg:px-xl py-sm lg:py-md border-b border-border-default bg-background-primary">
                            <div className="flex items-center space-x-sm lg:space-x-lg">
                                <h2 className="text-h6-sm sm:text-h5-md lg:text-h4-md font-bold text-text-primary">
                                    Layout Preview
                                </h2>
                                <span className="hidden sm:inline-flex px-sm py-xs bg-background-secondary text-text-secondary text-para-xs lg:text-para-sm rounded-md border border-border-default">
                                    {roundsCompleted} rounds completed
                                </span>
                            </div>

                            <div className="flex items-center space-x-sm lg:space-x-md">
                                {/* Premium Viewport Switcher */}
                                <div className="hidden sm:flex items-center bg-background-secondary rounded-xl p-xs border border-border-default">
                                    {Object.entries(viewportSizes).map(([key, { icon: Icon, label }]) => (
                                        <button
                                            key={key}
                                            onClick={() => setViewport(key as ViewportSize)}
                                            className={`relative px-sm py-xs lg:px-md lg:py-sm rounded-lg transition-all duration-200 ${
                                                viewport === key
                                                    ? 'bg-background-primary text-text-primary shadow-sm'
                                                    : 'text-text-tertiary hover:text-text-secondary'
                                            }`}
                                            title={label}
                                        >
                                            <Icon className="text-icon-sm lg:text-icon-md" />
                                            {viewport === key && (
                                                <motion.div
                                                    layoutId="viewport-indicator"
                                                    className="absolute inset-0 bg-background-primary rounded-lg shadow-sm -z-10"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Fullscreen Toggle */}
                                <button
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-sm lg:p-sm text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-all duration-200"
                                    title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                >
                                    {isFullscreen ?
                                        <FiMinimize2 className="text-icon-sm lg:text-icon-md" /> :
                                        <FiMaximize2 className="text-icon-sm lg:text-icon-md" />
                                    }
                                </button>

                                {/* Close Button */}
                                <button
                                    onClick={handleClose}
                                    className="p-sm lg:p-sm text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-all duration-200"
                                    title="Close preview"
                                >
                                    <FiX className="text-icon-sm lg:text-icon-md" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Viewport Switcher */}
                        <div className="sm:hidden px-md py-sm border-b border-border-default">
                            <div className="flex items-center justify-center space-x-xs">
                                {Object.entries(viewportSizes).map(([key, { icon: Icon }]) => (
                                    <button
                                        key={key}
                                        onClick={() => setViewport(key as ViewportSize)}
                                        className={`p-sm rounded-lg transition-all ${
                                            viewport === key
                                                ? 'bg-accent-subtle text-accent-default'
                                                : 'text-text-tertiary'
                                        }`}
                                    >
                                        <Icon className="text-icon-sm" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="flex-1 bg-background-muted overflow-hidden">
                            <div className="h-full flex items-start justify-center p-md lg:p-xl overflow-y-auto">
                                <motion.div
                                    className="bg-white rounded-none sm:rounded-xl shadow-xl overflow-hidden transition-all duration-300"
                                    style={{
                                        width: viewportSizes[viewport].width,
                                        maxWidth: '100%',
                                        minHeight: '100%'
                                    }}
                                    animate={{ width: viewportSizes[viewport].width }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <div className="h-full overflow-y-auto custom-scrollbar">
                                        {components.map(({ component: Component, key }, index) => (
                                            <motion.div
                                                key={key}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: index * 0.1,
                                                    duration: 0.5,
                                                    ease: [0.25, 0.46, 0.45, 0.94]
                                                }}
                                            >
                                                {/* Pass viewport prop to each component */}
                                                <Component viewport={viewport} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Footer with Continue Button */}
                        <div className="flex items-center justify-center px-md sm:px-lg lg:px-xl py-sm lg:py-md border-t border-border-default bg-background-primary">
                            <motion.button
                                onClick={handleClose}
                                className="flex items-center justify-center gap-sm px-lg lg:px-xl py-sm lg:py-md bg-accent-default text-accent-foreground hover:bg-accent-hover rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-para-md lg:text-para-lg">Continue Swiping</span>
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