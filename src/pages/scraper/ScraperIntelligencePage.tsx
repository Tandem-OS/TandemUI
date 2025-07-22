// src/scraper/ScraperIntelligencePage.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGlobe,
    FaLightbulb,
    FaImage,
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


// Toast Component
const Toast = ({ message, type = 'success' }: { message: string; type?: 'success' | 'error' }) => (
    <motion.div
        initial={{ opacity: 0, y: -20, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: -20, x: '-50%' }}
        className={`fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 px-md sm:px-lg py-sm sm:py-md rounded-lg sm:rounded-xl shadow-xl flex items-center gap-sm z-50 ${type === 'success'
            ? 'bg-emerald-500 text-white'
            : 'bg-red-500 text-white'
            }`}
    >
        <FaCheck className="text-icon-sm sm:text-icon-md" />
        <span className="font-medium text-para-sm sm:text-para-md">{message}</span>
    </motion.div>
);

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
        showToast('Added to Layout Draft');
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
        showToast('🎨 Layout generated successfully!');
    };

    const openChat = (context: any) => {
        setChatContext(context);
    };

    const isFeedbackComplete = scrapedData && Object.keys(userFeedback).length === scrapedData.sections.length;

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
                        <div className="text-center max-w-3xl space-y-lg sm:space-y-xl w-full">
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
                                className="flex flex-col items-center gap-md"
                            >
                                <StartFromIdea onGenerateLayout={handleGenerateLayout} />

                                <div className="flex items-center gap-md w-full max-w-md">
                                    <div className="flex-1 h-px bg-border-default"></div>
                                    <Para size="sm" color="tertiary">or</Para>
                                    <div className="flex-1 h-px bg-border-default"></div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm sm:gap-md w-full max-w-2xl px-sm sm:px-0">
                                    <button
                                        onClick={() => setCurrentStep('input')}
                                        className="group bg-background-secondary border-2 border-border-default rounded-lg sm:rounded-xl p-md sm:p-lg hover:border-accent-default transition-all duration-200 hover:shadow-xl"
                                    >
                                        <FaImage className="text-2xl sm:text-3xl text-accent-default mx-auto mb-sm sm:mb-md transition-transform" />
                                        <Heading level="h6" className="mb-xs sm:mb-sm font-medium">
                                            Analyze a Website
                                        </Heading>
                                        <Para size="sm" color="secondary">
                                            Paste URL to extract its design patterns
                                        </Para>
                                    </button>

                                    <button
                                        onClick={() => setCurrentStep('input')}
                                        className="group bg-background-secondary border-2 border-border-default rounded-lg sm:rounded-xl p-md sm:p-lg hover:border-accent-default transition-all duration-200 hover:shadow-xl"
                                    >
                                        <FaGlobe className="text-2xl sm:text-3xl text-accent-default mx-auto mb-sm sm:mb-md transition-transform" />
                                        <Heading level="h6" className="mb-xs sm:mb-sm font-medium">
                                            Browse Examples
                                        </Heading>
                                        <Para size="sm" color="secondary">
                                            Explore pre-analyzed popular websites
                                        </Para>
                                    </button>
                                </div>
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

                                    {/* Mode Toggle */}
                                    <div className="flex items-center justify-center">
                                        <div className="bg-background-secondary rounded-full p-1 flex">
                                            <button
                                                onClick={() => setIsDesignerMode(false)}
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
                                                onClick={() => setIsDesignerMode(true)}
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

                                    {/* URL Input */}
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
                                            />
                                            {inputValue.trim() && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleStartScraping(inputValue)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-default text-accent-foreground p-2 sm:p-3 rounded-lg hover:bg-accent-hover transition-colors"
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
                                                    whileTap={{ scale: 0.95 }}
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
                            <div className="bg-background-secondary p-md sm:p-lg flex items-center justify-center min-h-[50vh] lg:min-h-full">
                                <div className="text-center space-y-md sm:space-y-lg max-w-lg">
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
                                    <div className="space-y-sm">
                                        <Heading level="h4" align="center">
                                            {isDesignerMode ? 'Designer Mode Active' : 'Client Mode Active'}
                                        </Heading>
                                        <Para align="center" color="secondary">
                                            {isDesignerMode
                                                ? 'See technical implementation details, component structure, and design tokens for each section.'
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
                                </div>
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
                            className="bg-background-primary/90 backdrop-blur-lg border-2 border-border-default rounded-2xl sm:rounded-3xl p-lg sm:p-xl shadow-2xl max-w-lg w-full"
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

                                {/* Progress Steps */}
                                <div className="space-y-sm sm:space-y-md">
                                    {processingSteps.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-sm sm:gap-md"
                                        >
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
                                                    {step}
                                                </Para>
                                            </motion.div>
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
                        className="min-h-screen"
                    >
                        {/* Header */}
                        <div className="bg-background-primary border-b border-border-default sticky top-0 z-30">
                            <div className="container mx-auto px-sm sm:px-md lg:px-lg py-sm sm:py-md">
                                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-sm">
                                    <div className="flex items-center gap-sm sm:gap-lg">
                                        <button
                                            onClick={() => setCurrentStep('input')}
                                            className="text-text-secondary flex gap-2 items-center leading-none hover:text-text-primary transition-colors text-para-sm"
                                        >
                                            <FaArrowLeftLong /> Back
                                        </button>
                                        <div>
                                            <Heading level="h5">
                                                Layout Analysis Complete
                                            </Heading>
                                            <Para size="sm" color="secondary">
                                                {scrapedData.sections.length} sections extracted from {scrapedData.url}
                                            </Para>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-xs sm:gap-sm">
                                        <StartFromIdea onGenerateLayout={handleGenerateLayout} />
                                        <div className="bg-background-secondary rounded-full p-0.5 sm:p-1 flex">
                                            <button
                                                onClick={() => setIsDesignerMode(false)}
                                                className={`px-sm sm:px-md py-xs sm:py-sm rounded-full text-para-xs sm:text-para-sm font-medium transition-all ${!isDesignerMode
                                                    ? 'bg-accent-default text-accent-foreground'
                                                    : 'text-text-secondary hover:text-text-primary'
                                                    }`}
                                            >
                                                <FaUser className="inline mr-xs text-icon-sm" />
                                                <span className="hidden sm:inline">Client</span>
                                            </button>
                                            <button
                                                onClick={() => setIsDesignerMode(true)}
                                                className={`px-sm sm:px-md py-xs sm:py-sm rounded-full text-para-xs sm:text-para-sm font-medium transition-all ${isDesignerMode
                                                    ? 'bg-accent-default text-accent-foreground'
                                                    : 'text-text-secondary hover:text-text-primary'
                                                    }`}
                                            >
                                                <FaPalette className="inline mr-xs text-icon-sm" />
                                                <span className="hidden sm:inline">Designer</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="container mx-auto px-sm sm:px-md lg:px-lg py-md sm:py-xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-md sm:gap-lg lg:gap-xl">
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
                            </div>

                            {/* Completion CTA */}
                            {isFeedbackComplete && !isDesignerMode && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-lg sm:mt-xl text-center"
                                >
                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl p-lg sm:p-xl text-white max-w-2xl mx-auto">
                                        <Heading level="h3" color="light" align="center" className="mb-sm sm:mb-md">
                                            Your taste profile is building!
                                        </Heading>
                                        <Para size="lg" color="light" align="center" className="mb-md sm:mb-lg opacity-90">
                                            We've learned what you like. Ready to see more personalized suggestions?
                                        </Para>
                                        <button className="bg-white text-indigo-600 px-lg sm:px-xl py-sm sm:py-md rounded-lg sm:rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                                            Explore Component Library
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Fixed Components */}
                        <LayoutPlan
                            sections={layoutPlan}
                            onUpdateSections={handleUpdateLayoutPlan}
                        />
                        <ChatPanel context={chatContext} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScraperIntelligencePage;