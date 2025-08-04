import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMaximize2, FiMinimize2, FiSmartphone, FiTablet, FiMonitor, FiArrowRight } from 'react-icons/fi';
import { Navbar, Hero, Features, About, Blog, Pricing, CTA, Footer } from './PreviewComponents';
import PreviewFrame from './PreviewFrame';
import Preloader from '@/comman-components/Preloader';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void;
    roundsCompleted: number;
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
    desktop: { width: '100%', label: 'Desktop', icon: FiMonitor }
};

const getRoundComponents = (roundsCompleted: number) => {
    const components = [];
    components.push({ component: Navbar, key: 'navbar' });
    if (roundsCompleted >= 2) components.push({ component: Hero, key: 'hero' });
    if (roundsCompleted >= 3) components.push({ component: Features, key: 'features' });
    if (roundsCompleted >= 4) components.push({ component: About, key: 'about' });
    if (roundsCompleted >= 5) components.push({ component: Blog, key: 'blog' });
    if (roundsCompleted >= 6) components.push({ component: Pricing, key: 'pricing' });
    if (roundsCompleted >= 7) components.push({ component: CTA, key: 'cta' });
    if (roundsCompleted >= 8 || components.length > 3) components.push({ component: Footer, key: 'footer' });
    return components;
};

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onContinue, roundsCompleted }) => {

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [viewport, setViewport] = useState<ViewportSize>('desktop');
    const [isResizing, setIsResizing] = useState(false);
    const [isPreviewLoading, setIsPreviewLoading] = useState(true);

    const components = getRoundComponents(roundsCompleted);

    useEffect(() => {
        if (isOpen) {
            setIsPreviewLoading(true);
        }
    }, [isOpen, roundsCompleted]);

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isOpen]);

    const handleClose = () => {
        onContinue();
    };

    const handleViewportChange = (key: ViewportSize) => {
        if (key === viewport) {
            return;
        }

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
                    className={`fixed z-50 flex items-center justify-center ${isFullscreen ? 'inset-0' : 'inset-0 p-md lg:p-xl'}`}
                    style={{ backgroundColor: isFullscreen ? 'transparent' : 'rgba(0, 0, 0, 0.5)' }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className={`bg-background-primary-2 flex flex-col ${isFullscreen ? 'w-full h-full' : 'rounded-2xl shadow-2xl w-full h-full max-w-7xl max-h-[90vh]'}`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-md sm:px-lg lg:px-xl py-sm lg:py-md border-b border-border-default bg-background-primary-2">
                            <div className="flex items-center space-x-sm lg:space-x-lg">
                                <h2 className="text-h6-sm sm:text-h5-md lg:text-h4-md font-bold text-text-primary">
                                    Layout Preview
                                </h2>
                                <span className="hidden sm:inline-flex px-sm py-xs bg-background-secondary text-text-secondary text-para-xs lg:text-para-sm rounded-md border border-border-default">
                                    {roundsCompleted} rounds • {components.length} sections
                                </span>
                            </div>

                            <div className="flex items-center space-x-sm lg:space-x-md">
                                <div className="hidden sm:flex items-center bg-background-secondary rounded-xl p-xs border border-border-default">
                                    {(Object.entries(viewportSizes) as [ViewportSize, ViewportConfig][]).map(([key, config]) => (
                                        <button
                                            key={key}
                                            onClick={() => handleViewportChange(key)}
                                            className={`relative px-sm py-xs lg:px-md lg:py-sm rounded-lg transition-all duration-200 ${viewport === key ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'}`}
                                            title={config.label}
                                        >
                                            <config.icon className="text-icon-sm lg:text-icon-md" />
                                            {viewport === key && (
                                                <motion.div
                                                    layoutId="viewport-indicator"
                                                    className="absolute inset-0 bg-background-primary-2 rounded-lg shadow-sm -z-10"
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-sm lg:p-sm text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-all duration-200"
                                    title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                >
                                    {isFullscreen ? <FiMinimize2 className="text-icon-sm lg:text-icon-md" /> : <FiMaximize2 className="text-icon-sm lg:text-icon-md" />}
                                </button>
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
                                {(Object.entries(viewportSizes) as [ViewportSize, ViewportConfig][]).map(([key, config]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleViewportChange(key)}
                                        className={`p-sm rounded-lg transition-all ${viewport === key ? 'bg-accent-subtle text-accent-default' : 'text-text-tertiary'}`}
                                    >
                                        <config.icon className="text-icon-sm" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="flex-1 bg-background-muted overflow-hidden relative">
                            <AnimatePresence>
                                {(isPreviewLoading || isResizing) && <Preloader />}
                            </AnimatePresence>

                            <div className={`h-full w-full transition-opacity duration-300 ${(isPreviewLoading || isResizing) ? 'opacity-0' : 'opacity-100'}`}>
                                <div className="h-full flex items-center justify-center">
                                    <motion.div
                                        className="bg-background-primary-2 rounded-xl shadow-xl overflow-hidden h-full"
                                        style={{ maxWidth: '100%' }}
                                        animate={{ width: viewportSizes[viewport].width }}
                                        transition={{ type: "tween", duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                        onAnimationComplete={() => {
                                            if (isResizing) {
                                                setIsResizing(false);
                                            }
                                        }}
                                    >
                                        <PreviewFrame>
                                            <div className="h-full overflow-y-auto preview-container bg-background-primary-2">
                                                {components.map(({ component: Component, key }, index) => (
                                                    <motion.div
                                                        key={key}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                        onAnimationComplete={() => {
                                                            if (index === components.length - 1) {
                                                                setIsPreviewLoading(false);
                                                            }
                                                        }}
                                                    >
                                                        <Component />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </PreviewFrame>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Footer with Continue Button */}
                        <div className="flex items-center justify-center px-md sm:px-lg lg:px-xl py-sm  border-t border-border-default bg-background-primary-2">
                            <motion.button
                                onClick={handleClose}
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