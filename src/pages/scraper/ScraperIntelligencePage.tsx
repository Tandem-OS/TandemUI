import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGlobe,
    FaLightbulb,
    FaArrowRight,
    FaCode,
    FaUser,
    FaPalette,
    FaCheck,
    FaCircle
} from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";

// Import components
import ChatPanel from './components/ChatPanel';
import LayoutPlan from './components/LayoutPlan';
import StartFromIdea from './components/StartFromIdea';
import SectionCard from './components/SectionCard';
import Heading from '../../components/demos/typography/Heading';
import Para from '../../comman-components/Para';
// Import constants
import { dummyScrapedData, quickSuggestions, processingSteps } from './constants';
import Toast from '@/comman-components/Toast';

// Custom hook for taste profile
const useTasteProfile = () => {
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('tasteProfile');
        return saved ? JSON.parse(saved) : {};
    });

    const updateTaste = (action: 'like' | 'dislike', section: any) => {
        const key = `${section.tone}_${section.layout_structure}`;
        setProfile((prev: any) => {
            const updated = {
                ...prev,
                [key]: (prev[key] || 0) + (action === 'like' ? 1 : -1)
            };
            localStorage.setItem('tasteProfile', JSON.stringify(updated));
            return updated;
        });
    };

    const scoreSections = (sections: any[]) => {
        return sections.map(section => ({
            ...section,
            tasteScore: profile[`${section.tone}_${section.layout_structure}`] || 0
        })).sort((a, b) => b.tasteScore - a.tasteScore);
    };

    const clearTaste = () => {
        setProfile({});
        localStorage.removeItem('tasteProfile');
    };

    return { profile, updateTaste, scoreSections, clearTaste };
};

const ScraperIntelligencePage = () => {
    const [currentStep, setCurrentStep] = useState('welcome');
    const [inputValue, setInputValue] = useState('');
    const [isDesignerMode, setIsDesignerMode] = useState(false);
    const [scrapedData, setScrapedData] = useState<typeof dummyScrapedData | null>(null);
    const [processingStep, setProcessingStep] = useState(0);
    const [userFeedback, setUserFeedback] = useState<{ [key: string]: 'like' | 'dislike' }>({});
    const [layoutPlan, setLayoutPlan] = useState<any[]>(() => {
        const saved = localStorage.getItem('layoutPlan');
        return saved ? JSON.parse(saved) : [];
    });
    const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [chatContext, setChatContext] = useState<any>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const { profile, updateTaste, scoreSections, clearTaste } = useTasteProfile();

    // Save layout plan to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('layoutPlan', JSON.stringify(layoutPlan));
    }, [layoutPlan]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToastMessage({ message, type });
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleStartScraping = async (url: string) => {
        setCurrentStep('processing');
        setProcessingStep(0);

        for (let i = 0; i < processingSteps.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
            setProcessingStep(i);
        }

        setTimeout(() => {
            const data = { ...dummyScrapedData, url };
            // Apply taste scoring to sections
            const scoredSections = scoreSections(data.sections);
            setScrapedData({ ...data, sections: scoredSections });
            setCurrentStep('results');
        }, 1000);
    };

    const handleSectionFeedback = (sectionId: string, feedback: 'like' | 'dislike') => {
        setUserFeedback(prev => ({ ...prev, [sectionId]: feedback }));
    };

    const handleAddToLayout = (section: any) => {
        setLayoutPlan(prev => [...prev, section]);
        showToast('Section added to layout plan!');
    };

    const handleUpdateLayoutPlan = (sections: any[]) => {
        setLayoutPlan(sections);
    };

    const handleGenerateLayout = (sections: any[]) => {
        setScrapedData({
            url: 'Generated from idea',
            analyzedAt: new Date(),
            sections: scoreSections(sections)
        });
        setCurrentStep('results');
        showToast('Layout generated successfully!');
    };

    const openChat = (context: any) => {
        setChatContext(context);
    };

    // ✅ UPDATED: Handle mode toggle with fade transition
    const handleModeToggle = async (mode: boolean) => {
        setIsTransitioning(true);
        await new Promise(resolve => setTimeout(resolve, 150));
        setIsDesignerMode(mode);
        setIsTransitioning(false);
    };

    const isFeedbackComplete = scrapedData && Object.keys(userFeedback).length === scrapedData.sections.length;
    const likeCount = Object.values(userFeedback).filter(f => f === 'like').length;

    return (
        <div className="min-h-screen bg-background-primary text-text-primary">
            <AnimatePresence>
                {toastMessage && (
                    <Toast message={toastMessage.message} type={toastMessage.type} />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {/* Welcome Screen */}
                {currentStep === 'welcome' && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen flex items-center justify-center p-sm sm:p-md"
                    >
                        <div className="text-center max-w-2xl space-y-lg sm:space-y-xl w-full">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-center"
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent-default to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl">
                                    <FaLightbulb className="text-accent-foreground text-3xl sm:text-4xl animate-pulse" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-sm"
                            >
                                <Heading level="h2" align="center">
                                    Tandem Reveal
                                </Heading>
                                <Para size="lg" align="center" color="secondary" className="px-sm">
                                    Transform any website into intelligent layout patterns
                                </Para>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-md justify-center"
                            >
                                {/* ✅ UPDATED: Enhanced buttons with hover/press feedback */}
                                <motion.button
                                    onClick={() => setCurrentStep('input')}
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-lg py-md rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl flex items-center gap-sm text-para-lg will-change-transform"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 15 }}
                                        transition={{ type: "spring", stiffness: 400 }}

                                    >
                                        <FaGlobe className="text-icon-md" />
                                    </motion.div>
                                    <span>Analyze a Website</span>
                                </motion.button>

                                <StartFromIdea onGenerateLayout={handleGenerateLayout} />
                            </motion.div>

                            {/* Taste Profile Indicator */}
                            {Object.keys(profile).length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-center gap-sm"
                                >
                                    <Para size="sm" color="secondary">Taste profile active</Para>
                                    <button
                                        onClick={() => {
                                            clearTaste();
                                            showToast('Taste profile cleared');
                                        }}
                                        className="text-accent-default hover:text-accent-hover underline text-para-sm"
                                    >
                                        Clear preferences
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Input Screen */}
                {currentStep === 'input' && (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                            {/* Left: Input Area */}
                            <div className="bg-background-primary lg:border-r border-border-default p-md sm:p-lg flex flex-col justify-center">
                                <div className="max-w-xl mx-auto w-full space-y-lg sm:space-y-xl">
                                    {/* Back Button */}
                                    <button
                                        onClick={() => setCurrentStep('welcome')}
                                        className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-sm text-para-sm"
                                    >
                                        <FaArrowLeftLong /> Back to home
                                    </button>

                                    {/* ✅ UPDATED: Mode Toggle with fade transition */}
                                    <div className="flex items-center justify-center">
                                        <div className="bg-background-secondary rounded-full p-1 flex">
                                            <button
                                                onClick={() => handleModeToggle(false)}
                                                className={`flex items-center justify-center gap-xs sm:gap-sm px-md sm:px-lg py-xs sm:py-sm rounded-full text-para-sm sm:text-para-md font-medium transition-all ${!isDesignerMode
                                                    ? 'bg-accent-default text-accent-foreground shadow-lg'
                                                    : 'text-text-secondary hover:text-text-primary'
                                                    }`}
                                            >
                                                <FaUser className="text-icon-sm" />
                                                <span className="hidden sm:inline">Client View</span>
                                                <span className="sm:hidden">Client</span>
                                            </button>
                                            <button
                                                onClick={() => handleModeToggle(true)}
                                                className={`flex items-center justify-center gap-xs sm:gap-sm px-md sm:px-lg py-xs sm:py-sm rounded-full text-para-sm sm:text-para-md font-medium transition-all ${isDesignerMode
                                                    ? 'bg-accent-default text-accent-foreground shadow-lg'
                                                    : 'text-text-secondary hover:text-text-primary'
                                                    }`}
                                            >
                                                <FaPalette className="text-icon-sm" />
                                                <span className="hidden sm:inline">Designer View</span>
                                                <span className="sm:hidden">Designer</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Main Input */}
                                    <div className="text-center space-y-sm sm:space-y-md">
                                        <Heading level="h3" align="center">
                                            Enter a website to analyze
                                        </Heading>
                                        <Para size="lg" color="secondary" align="center">
                                            We'll break it down into reusable design patterns
                                        </Para>
                                    </div>

                                    {/* ✅ UPDATED: URL Input with autoFocus */}
                                    <div className="space-y-sm">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder="Enter website URL (e.g., stripe.com)"
                                                className="w-full px-md sm:px-lg py-sm sm:py-md bg-background-secondary border-2 border-border-default rounded-lg sm:rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-default transition-all text-base sm:text-lg pr-12 sm:pr-14"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && inputValue.trim()) {
                                                        handleStartScraping(inputValue);
                                                    }
                                                }}
                                                autoFocus
                                            />
                                            {inputValue.trim() && (
                                                <motion.button
                                                    onClick={() => handleStartScraping(inputValue)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-default text-accent-foreground p-2 sm:p-3 rounded-lg hover:bg-accent-hover hover:shadow-lg transition-all"
                                                >
                                                    <FaArrowRight className="text-icon-sm" />
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quick Suggestions */}
                                    <div className="space-y-sm">
                                        <Para size="sm" color="secondary" align="center">
                                            Popular examples:
                                        </Para>
                                        <div className="flex flex-wrap gap-xs sm:gap-sm justify-center">
                                            {quickSuggestions.map((suggestion) => (
                                                <motion.button
                                                    key={suggestion.name}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleStartScraping(suggestion.url)}
                                                    className="px-sm sm:px-md py-xs sm:py-sm bg-background-secondary border border-border-default rounded-lg text-para-xs sm:text-para-sm text-text-primary hover:border-accent-default hover:bg-accent-subtle transition-all"
                                                >
                                                    {suggestion.name}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Preview/Info */}
                            <div className="bg-background-secondary flex-col gap-lg p-md sm:p-lg flex items-center justify-center min-h-[50vh] lg:min-h-full">
                                <motion.div
                                    animate={{ rotate: isDesignerMode ? 180 : 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-accent-default to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                                >
                                    {isDesignerMode ? (
                                        <FaCode className="text-white text-4xl sm:text-5xl" />
                                    ) : (
                                        <FaUser className="text-white text-4xl sm:text-5xl" />
                                    )}
                                </motion.div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={isDesignerMode ? 'designer' : 'client'}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-center space-y-md sm:space-y-lg max-w-lg"
                                    >

                                        <div className="space-y-sm">
                                            <Heading level="h4" align="center">
                                                {isDesignerMode ? 'Designer Mode Active' : 'Client Mode Active'}
                                            </Heading>
                                            <Para align="center" color="secondary" size="lg">
                                                {isDesignerMode
                                                    ? 'Explore component structure, logic, and design tokens for each section.'
                                                    : 'Focus on visual design and user experience. Provide feedback to build your taste profile.'
                                                }
                                            </Para>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm sm:gap-md text-left">
                                            <div className="bg-background-primary rounded-lg sm:rounded-xl p-sm sm:p-md">
                                                <Heading level="h6" className="mb-xs">
                                                    {isDesignerMode ? 'Technical View' : 'Visual Focus'}
                                                </Heading>
                                                <Para size="xs" color="secondary">
                                                    {isDesignerMode
                                                        ? 'JSON metadata, and code structure'
                                                        : 'Clean insights and visual patterns'
                                                    }
                                                </Para>
                                            </div>
                                            <div className="bg-background-primary rounded-lg sm:rounded-xl p-sm sm:p-md">
                                                <Heading level="h6" className="mb-xs">
                                                    {isDesignerMode ? 'Dev Tools' : 'Feedback'}
                                                </Heading>
                                                <Para size="xs" color="secondary">
                                                    {isDesignerMode
                                                        ? 'Inspect and clone components'
                                                        : 'Like/dislike to train AI'
                                                    }
                                                </Para>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Processing Screen */}
                {currentStep === 'processing' && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen flex items-center justify-center p-sm sm:p-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-background-primary-2 backdrop-blur-lg border-2 border-border-default rounded-2xl sm:rounded-3xl p-lg sm:p-xl shadow-md max-w-lg w-full"
                        >
                            <div className="text-center space-y-lg sm:space-y-xl">
                                {/* Animated Logo */}
                                <div className="relative">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-border-muted border-t-accent-default rounded-full animate-spin mx-auto"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FaGlobe className="text-accent-default text-2xl sm:text-3xl animate-pulse" />
                                    </div>
                                </div>

                                {/* Status Text */}
                                <div>
                                    <Heading level="h3" align="center">
                                        Analyzing Website
                                    </Heading>
                                    <Para size="lg" color="secondary" align="center" className="mt-sm">
                                        Extracting design patterns and layout intelligence
                                    </Para>
                                </div>

                                {/* ✅ UPDATED: Progress Steps with final completion message */}
                                <div className="space-y-sm ">
                                    {processingSteps.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-sm sm:gap-md justify-between border-b border-border-default"
                                        >
                                            <motion.div
                                                animate={{
                                                    scale: index === processingStep ? 1.02 : 1
                                                }}
                                            >
                                                <Para
                                                    size="sm"
                                                    color={index === processingStep ? 'primary' : index < processingStep ? 'secondary' : 'tertiary'}
                                                    weight={index === processingStep ? 'medium' : 'normal'}
                                                    className="text-left"
                                                >
                                                    {index === processingSteps.length - 1 && index === processingStep
                                                        ? `Complete! Found ${dummyScrapedData.sections.length} sections`
                                                        : step
                                                    }
                                                </Para>
                                            </motion.div>
                                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                                                {index < processingStep ? (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                                                    >
                                                        <FaCheck className="text-white text-xs" />
                                                    </motion.div>
                                                ) : index === processingStep ? (
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent-default rounded-full animate-pulse"></div>
                                                ) : (
                                                    <FaCircle className="text-border-muted text-xs sm:text-sm" />
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}


                {/* Results Screen */}
                {currentStep === 'results' && scrapedData && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-screen flex flex-col"
                    >
                        {/* Header */}
                        <header className="bg-background-primary/80 backdrop-blur-md border-b border-border-default sticky top-0 z-30 flex-shrink-0">
                            <div className="max-w-screen-xl mx-auto px-sm sm:px-md lg:px-lg py-sm sm:py-md">
                                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-sm">
                                    <div className="flex items-center gap-sm sm:gap-lg">
                                        <button onClick={() => setCurrentStep('input')} className="text-text-secondary flex gap-2 items-center leading-none hover:text-text-primary transition-colors text-para-sm">
                                            <FaArrowLeftLong /> Back
                                        </button>
                                        <div>
                                            <Heading level="h5">Layout Analysis</Heading>
                                            <Para size="sm" color="secondary">{scrapedData.sections.length} sections found on {scrapedData.url}</Para>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-xs sm:gap-sm">
                                        <StartFromIdea onGenerateLayout={handleGenerateLayout} />
                                        <div className="bg-background-secondary rounded-full p-0.5 sm:p-1 flex">
                                            <button
                                                onClick={() => handleModeToggle(false)}
                                                className={`px-sm sm:px-md py-xs sm:py-sm rounded-full text-para-xs sm:text-para-sm font-medium transition-all ${!isDesignerMode ? 'bg-accent-default text-accent-foreground' : 'text-text-secondary hover:text-text-primary'}`}
                                            >
                                                <FaUser className="inline mr-xs text-icon-sm" />
                                                <span className="hidden sm:inline">Client</span>
                                            </button>
                                            <button
                                                onClick={() => handleModeToggle(true)}
                                                className={`px-sm sm:px-md py-xs sm:py-sm rounded-full text-para-xs sm:text-para-sm font-medium transition-all ${isDesignerMode ? 'bg-accent-default text-accent-foreground' : 'text-text-secondary hover:text-text-primary'}`}
                                            >
                                                <FaPalette className="inline mr-xs text-icon-sm" />
                                                <span className="hidden sm:inline">Designer</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Main Content Area */}
                        <main className="max-w-screen-xl mx-auto px-sm sm:px-md lg:px-lg w-full flex-grow overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-lg h-full">

                                {/* Left Sticky Column for Chat */}
                                <aside className="hidden lg:block lg:col-span-2 h-full py-lg">
                                    <div className="sticky top-24 h-[calc(100vh-8rem)] flex flex-col gap-md">

                                        {/* ✅ UPDATED: Enhanced Taste Memory Box */}
                                        {Object.keys(profile).length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-background-secondary border border-border-default rounded-xl p-md"
                                            >
                                                <div className="flex items-center justify-between mb-sm">
                                                    <div className="flex items-center gap-sm">
                                                        <motion.div
                                                            className="w-6 h-6 bg-accent-default rounded-full flex items-center justify-center"
                                                            animate={likeCount >= 3 ? {
                                                                boxShadow: [
                                                                    "0 0 0 0px rgba(99, 102, 241, 0.4)",
                                                                    "0 0 0 10px rgba(99, 102, 241, 0)"
                                                                ]
                                                            } : {}}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                ease: "easeInOut"
                                                            }}
                                                        >
                                                            <FaLightbulb className="text-white text-xs" />
                                                        </motion.div>
                                                        <Heading level="h6" className="text-accent-default">
                                                            {likeCount >= 3 ? 'Your taste profile is evolving' : 'Learning your taste...'}
                                                        </Heading>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            clearTaste();
                                                            showToast('Taste profile cleared');
                                                        }}
                                                        className="text-para-xs text-text-tertiary hover:text-accent-default transition-colors"
                                                    >
                                                        Reset
                                                    </button>
                                                </div>

                                                <div className="space-y-xs">
                                                    <Para size="xs" color="secondary">
                                                        {Object.values(profile).filter((v: any) => v > 0).length} likes • {Object.values(profile).filter((v: any) => v < 0).length} dislikes
                                                    </Para>

                                                    {/* Top 2 preferences */}
                                                    <div className="flex flex-wrap gap-xs">
                                                        {Object.entries(profile)
                                                            .filter(([_, value]: [string, any]) => value > 0)
                                                            .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
                                                            .slice(0, 2)
                                                            .map(([key, value]: [string, any]) => (
                                                                <div key={key} className="px-xs py-1 bg-accent-subtle dark:bg-transparent text-accent-default rounded text-para-xs">
                                                                    {key.replace('_', ' ')} +{value}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Chat Panel - Takes remaining space */}
                                        <div className="flex-1 min-h-0">
                                            <ChatPanel context={chatContext} />
                                        </div>
                                    </div>
                                </aside>

                                {/* Right Scrollable Column for Sections */}
                                <div className="lg:col-span-3 h-full overflow-y-auto custom-scrollbar py-lg">
                                    {/* ✅ UPDATED: Apply fade transition when switching modes */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isTransitioning ? 'transitioning' : isDesignerMode ? 'designer' : 'client'}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex flex-col gap-lg"
                                        >
                                            {scrapedData.sections.map((section) => (
                                                <SectionCard
                                                    key={section.id}
                                                    section={section}
                                                    isDesignerMode={isDesignerMode}
                                                    onFeedback={(feedback) => handleSectionFeedback(section.id, feedback)}
                                                    feedback={userFeedback[section.id] || null}
                                                    onAddToLayout={handleAddToLayout}
                                                    updateTaste={updateTaste}
                                                    openChat={openChat}
                                                />
                                            ))}
                                            {isFeedbackComplete && !isDesignerMode && (
                                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-lg text-center">
                                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl p-lg sm:p-xl text-white max-w-2xl mx-auto">
                                                        <Heading level="h3" color="light" align="center" className="mb-sm sm:mb-md">Your taste profile is building!</Heading>
                                                        <Para size="lg" color="light" align="center" className="mb-md sm:mb-lg opacity-90">We've learned what you like. Ready to see more personalized suggestions?</Para>
                                                        <button className="bg-white text-indigo-600 px-lg sm:px-xl py-sm sm:py-md rounded-lg sm:rounded-xl font-semibold hover:bg-gray-100 transition-colors">Explore Component Library</button>
                                                    </div>
                                                </motion.div>
                                            )}
                                            {/* ChatPanel for Mobile View - Appears as a regular component in the flow */}
                                            <div className="lg:hidden">
                                                <ChatPanel context={chatContext} />
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </main>

                        <LayoutPlan sections={layoutPlan} onUpdateSections={handleUpdateLayoutPlan} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScraperIntelligencePage;