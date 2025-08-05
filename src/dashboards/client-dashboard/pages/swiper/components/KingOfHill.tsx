import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type ComponentPreview, type KingOfHillBehavioralSignal } from '../swiper.types';

interface KingOfHillProps {
    defender: ComponentPreview;
    challenger: ComponentPreview;
    onSelect: (winner: ComponentPreview, loser: ComponentPreview, signals: KingOfHillBehavioralSignal) => void;
    matchNumber: number;
    isAnimating: boolean;
    onAnimationStart: () => void;
    onAnimationComplete: () => void;
}

const KingOfTheHill: React.FC<KingOfHillProps> = ({
    defender,
    challenger,
    onSelect,
    matchNumber,
    isAnimating,
    onAnimationStart,
    onAnimationComplete,
}) => {
    const [selectionStartTime] = useState(Date.now());
    const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
    const [selectedWinner, setSelectedWinner] = useState<'defender' | 'challenger' | null>(null);
    const isMobile = window.innerWidth < 1024;
    
    // Track when component renders
    const componentRenderTime = useRef<number>(Date.now());

    const handleSelection = useCallback((winner: 'defender' | 'challenger') => {
        if (isAnimating || selectedWinner) return;

        const selectionTime = Date.now();
        onAnimationStart();
        setSelectedWinner(winner);

        const winnerComponent = winner === 'defender' ? defender : challenger;
        const loserComponent = winner === 'defender' ? challenger : defender;

        // Simplified behavioral signals for King of the Hill
        const signals: KingOfHillBehavioralSignal = {
            hesitation_ms: selectionTime - componentRenderTime.current,
            view_duration_ms: selectionTime - selectionStartTime,
            match_number: matchNumber,
            action_source: 'button'
        };

        // Log behavioral signal for debugging
        console.log(`[KING OF THE HILL - Match ${matchNumber}] Selection:`, {
            winner: winnerComponent.title,
            loser: loserComponent.title,
            hesitation: `${(signals.hesitation_ms / 1000).toFixed(2)}s`,
            view_duration: `${(signals.view_duration_ms / 1000).toFixed(2)}s`
        });

        setTimeout(() => {
            onSelect(winnerComponent, loserComponent, signals);
            setSelectedWinner(null);
            onAnimationComplete();
        }, 800);
    }, [defender, challenger, onSelect, selectionStartTime, matchNumber, isAnimating, selectedWinner, onAnimationStart, onAnimationComplete]);

    const ComponentCard = ({ component, side, isWinner }: {
        component: ComponentPreview;
        side: 'left' | 'right';
        isWinner: boolean;
    }) => {
        const isLoser = selectedWinner && !isWinner;

        return (
            <motion.div
                className="relative w-full h-full cursor-pointer overflow-hidden rounded-lg lg:rounded-xl shadow-lg"
                onHoverStart={() => !isMobile && setHoveredSide(side)}
                onHoverEnd={() => !isMobile && setHoveredSide(null)}
                onClick={() => handleSelection(side === 'left' ? 'defender' : 'challenger')}
                animate={isLoser ? {
                    x: side === 'left' ? '-120%' : '120%',
                    opacity: 0,
                    scale: 0.8,
                    rotate: side === 'left' ? -15 : 15,
                } : isWinner && selectedWinner ? {
                    scale: 1.02,
                } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <img
                    src={component.thumbnail_url}
                    alt={component.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 h-20 lg:h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-sm lg:p-md">
                    <h3 className="text-h6-sm lg:text-h5-sm font-bold text-white mb-1">
                        {component.title}
                    </h3>
                    <p className="text-para-xs lg:text-para-sm text-white/80">
                        {component.vibe}
                    </p>
                </div>

                <AnimatePresence>
                    {(hoveredSide === side || (isMobile && !selectedWinner)) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-accent-default/10 flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="bg-background-primary/90 text-text-primary rounded-lg px-md py-sm font-semibold text-para-md shadow-xl"
                            >
                                Select This Design
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <div className="w-full h-full flex items-center justify-center px-sm lg:px-lg">
            <div className="w-full max-w-7xl mx-auto h-full flex items-center">
                {/* Desktop Layout - Side by Side */}
                <div className="hidden lg:flex w-full gap-lg items-center justify-center">
                    <div className="flex-1 max-w-lg h-full max-h-[550px]">
                        <ComponentCard
                            component={defender}
                            side="left"
                            isWinner={selectedWinner === 'defender'}
                        />
                    </div>

                    <div className="flex-shrink-0 flex flex-col items-center justify-center">
                        <div className="w-14 h-14 bg-background-muted rounded-full flex items-center justify-center">
                            <span className="text-h6-sm font-bold text-text-secondary">VS</span>
                        </div>
                    </div>

                    <div className="flex-1 max-w-lg h-full max-h-[550px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={challenger.component_id}
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="h-full"
                            >
                                <ComponentCard
                                    component={challenger}
                                    side="right"
                                    isWinner={selectedWinner === 'challenger'}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Layout - Stacked */}
                <div className="lg:hidden flex flex-col w-full h-full" style={{ maxHeight: 'calc(100vh - 160px)' }}>
                    <div className="flex-1 min-h-0" style={{ maxHeight: '44%' }}>
                        <AnimatePresence mode="wait">
                            {selectedWinner === 'challenger' ? (
                                <motion.div
                                    key={challenger.component_id}
                                    initial={{ y: '100%', opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: '-100%', opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="h-full"
                                >
                                    <ComponentCard
                                        component={challenger}
                                        side="left"
                                        isWinner={true}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={defender.component_id}
                                    animate={selectedWinner === 'defender' ? {} : {}}
                                    className="h-full"
                                >
                                    <ComponentCard
                                        component={defender}
                                        side="left"
                                        isWinner={selectedWinner === 'defender'}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-center" style={{ height: '32px' }}>
                        <div className="w-8 h-8 bg-background-muted rounded-full flex items-center justify-center">
                            <span className="text-para-xs font-bold text-text-secondary">VS</span>
                        </div>
                    </div>

                    <div className="flex-1 min-h-0" style={{ maxHeight: '44%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={challenger.component_id}
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 100, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="h-full"
                            >
                                <ComponentCard
                                    component={challenger}
                                    side="right"
                                    isWinner={selectedWinner === 'challenger'}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KingOfTheHill;