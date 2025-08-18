import React from 'react';
import { FaMagic } from 'react-icons/fa';
import { FiArrowRight, FiHeart, FiX } from 'react-icons/fi';
import { FaRegThumbsUp } from "react-icons/fa";

interface SwiperIntroProps {
    onStart: () => void;
}

const SwiperIntro: React.FC<SwiperIntroProps> = ({ onStart }) => {
    // Explicit button click handler with event stopping
    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onStart();
    };

    // Card click handler to prevent any bubbling
    const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-md relative max-lg:mt-4xl">
            <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
                {/* Main card - added click handler to stop propagation */}
                <div
                    className="relative w-full rounded-3xl p-lg shadow-2xl shadow-slate-900/20 overflow-hidden bg-background-primary"
                    onClick={handleCardClick}
                >
                    <div className="relative z-10 space-y-md">
                        {/* Hero icon */}
                        <div>
                            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gradient-to-br from-accent-default to-accent-default/80 rounded-3xl shadow-lg shadow-accent-default/30 transform hover:scale-105 hover:rotate-3 transition-all duration-300 border border-accent-default/20">
                                <FaMagic className="text-icon-xl text-accent-foreground drop-shadow-lg transform hover:-translate-y-1 transition-transform duration-300" />
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-sm">
                            <h1 className="md:text-h2-sm font-bold text-text-primary">
                                Find Your Perfect Style
                            </h1>
                            <p className="text-para-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
                                Discover designs that resonate with you through our intuitive swipe experience. Every swipe brings you closer to your ideal aesthetic.
                            </p>
                        </div>

                        {/* Instructions */}
                        <div className="pt-sm">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-md w-full max-w-lg mx-auto">
                                <InstructionCard
                                    icon={<FiX />}
                                    action="Swipe Left"
                                    description="Not your style"
                                    color="error"
                                />
                                <InstructionCard
                                    icon={<FiHeart />}
                                    action="Double Tap"
                                    description="Absolutely perfect"
                                    color="warning"
                                />
                                <InstructionCard
                                    icon={<FaRegThumbsUp />}
                                    action="Swipe Right"
                                    description="Love this look"
                                    color="success"
                                    isCenter={true}
                                />

                            </div>
                        </div>

                        {/* CTA button - explicit click handler */}
                        <div className="pt-md">
                            <button
                                onClick={handleButtonClick}
                                type="button"
                                className="group inline-flex items-center gap-sm px-lg py-md bg-gradient-to-r from-accent-default to-accent-hover rounded-2xl font-bold text-btn-md text-accent-foreground shadow-lg shadow-accent-default/30 overflow-hidden hover:shadow-xl transition-shadow duration-200"
                            >
                                {/* Button glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <span className="relative z-10">Start Your Journey</span>
                                <FiArrowRight className="text-icon-sm relative z-10" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Enhanced instruction card component
const InstructionCard: React.FC<{
    icon: React.ReactNode;
    action: string;
    description: string;
    color: 'error' | 'success' | 'warning';
    isCenter?: boolean;
}> = ({ icon, action, description, color, }) => {
    // Prevent card clicks from bubbling up
    const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const colorClasses = {
        error: 'from-red-500/20 to-rose-500/20 border-red-500/30 text-red-500',
        success: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-500',
        warning: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-500'
    };

    return (
        <div
            className={`relative p-md rounded-xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm transition-all duration-300`}
            onClick={handleCardClick}
        >
            <div className="flex flex-col items-center gap-sm text-center">
                <div className={`text-icon-lg ${colorClasses[color].split(' ')[3]}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-para-sm font-bold text-text-primary">{action}</p>
                    <p className="text-para-xs text-text-secondary mt-0.5">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default SwiperIntro;