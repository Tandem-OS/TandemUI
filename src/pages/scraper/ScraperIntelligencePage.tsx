// ScraperIntelligencePage.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGlobe,
    FaLightbulb,
    FaImage,
    FaThumbsUp,
    FaThumbsDown,
    FaHeart,
    FaArrowRight,
    FaCode,
    FaUser,
    FaPalette,
    FaEye,
    FaCopy,
    FaBullseye,
    FaLayerGroup,
    FaCheck,
    FaCircle
} from 'react-icons/fa';

// Data objects ko yahan constants file se import kiya gaya hai
import { dummyScrapedData, quickSuggestions, processingSteps } from './constants';


const ScraperIntelligencePage = () => {
    const [currentStep, setCurrentStep] = useState('welcome');
    const [inputValue, setInputValue] = useState('');
    const [isDesignerMode, setIsDesignerMode] = useState(false);
    const [scrapedData, setScrapedData] = useState<typeof dummyScrapedData | null>(null);
    const [processingStep, setProcessingStep] = useState(0);
    const [userFeedback, setUserFeedback] = useState<{ [key: string]: 'like' | 'dislike' }>({});

    const handleStartScraping = async (url: string) => {
        setCurrentStep('processing');
        setProcessingStep(0);
        for (let i = 0; i < processingSteps.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
            setProcessingStep(i);
        }
        setTimeout(() => {
            setScrapedData({ ...dummyScrapedData, url });
            setCurrentStep('results');
        }, 1000);
    };

    const handleSectionFeedback = (sectionId: string, feedback: 'like' | 'dislike') => {
        setUserFeedback(prev => ({ ...prev, [sectionId]: feedback }));
    };

    const isFeedbackComplete = scrapedData && Object.keys(userFeedback).length === scrapedData.sections.length;

    return (
        <div className="h-screen lg:h-screen bg-background-primary text-text-primary overflow-hidden relative">
            <AnimatePresence mode="wait">

                {/* Welcome Screen */}
                {currentStep === 'welcome' && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center h-screen lg:h-full p-md"
                    >
                        <div className="text-center max-w-2xl space-y-lg w-full">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-center"
                            >
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-default rounded-full flex items-center justify-center shadow-lg">
                                    <FaLightbulb className="text-accent-foreground text-2xl sm:text-3xl animate-pulse" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h1 className="text-h2-md sm:text-h1-lg font-bold text-text-primary">Hello!</h1>
                                <p className="text-h6-md sm:text-h4-md text-text-secondary mt-sm">How can I assist you today?</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md mt-xl"
                            >
                                <button
                                    onClick={() => setCurrentStep('input')}
                                    className="group bg-background-secondary border border-border-default rounded-xl p-md sm:p-lg hover:border-accent-default transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                                >
                                    <div className="text-center space-y-sm">
                                        <FaImage className="text-xl sm:text-2xl text-accent-default mx-auto group-hover:scale-110 transition-transform" />
                                        <h3 className="text-h6-md font-medium text-text-primary">Start from inspiration</h3>
                                        <p className="text-para-sm text-text-secondary">Paste a URL to analyze</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setCurrentStep('input')}
                                    className="group bg-background-secondary border border-border-default rounded-xl p-md sm:p-lg hover:border-accent-default transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                                >
                                    <div className="text-center space-y-sm">
                                        <FaGlobe className="text-xl sm:text-2xl text-accent-default mx-auto group-hover:scale-110 transition-transform" />
                                        <h3 className="text-h6-md font-medium text-text-primary">Generate from URL</h3>
                                        <p className="text-para-sm text-text-secondary">Create layout blueprint</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setCurrentStep('input')}
                                    className="group bg-background-secondary border border-border-default rounded-xl p-md sm:p-lg hover:border-accent-default transition-all duration-200 hover:shadow-md hover:-translate-y-1 sm:col-span-2 lg:col-span-1"
                                >
                                    <div className="text-center space-y-sm">
                                        <FaLightbulb className="text-xl sm:text-2xl text-accent-default mx-auto group-hover:scale-110 transition-transform" />
                                        <h3 className="text-h6-md font-medium text-text-primary">Turn idea into layout</h3>
                                        <p className="text-para-sm text-text-secondary">Describe your vision</p>
                                    </div>
                                </button>
                            </motion.div>
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
                        className="h-screen lg:h-full"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                            {/* Left: Input Area */}
                            <div className="bg-background-primary lg:border-r border-border-default p-md sm:p-lg flex flex-col justify-center order-2 lg:order-1">
                                <div className="max-w-lg mx-auto w-full space-y-lg">

                                    {/* Mode Toggle */}
                                    <div className="flex items-center justify-center mb-lg lg:mb-xl">
                                        <div className="bg-background-secondary rounded-full p-1 flex w-full sm:w-auto">
                                            <button
                                                onClick={() => setIsDesignerMode(false)}
                                                className={`flex items-center justify-center gap-xs px-sm sm:px-md py-sm rounded-full text-para-sm font-medium transition-all flex-1 sm:flex-none ${!isDesignerMode
                                                        ? 'bg-accent-default text-accent-foreground'
                                                        : 'text-text-secondary hover:text-text-primary'
                                                    }`}
                                            >
                                                <FaUser className="text-icon-sm" />
                                                <span className="hidden sm:inline">Client View</span>
                                                <span className="sm:hidden">Client</span>
                                            </button>
                                            <button
                                                onClick={() => setIsDesignerMode(true)}
                                                className={`flex items-center justify-center gap-xs px-sm sm:px-md py-sm rounded-full text-para-sm font-medium transition-all flex-1 sm:flex-none ${isDesignerMode
                                                        ? 'bg-accent-default text-accent-foreground'
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
                                    <div className="text-center space-y-md">
                                        <h2 className="text-h4-md sm:text-h3-md font-bold text-text-primary">
                                            What kind of site inspires you?
                                        </h2>
                                        <p className="text-para-md sm:text-para-lg text-text-secondary">
                                            Paste any URL. Tandem Reveal breaks it down into clean, structured layout intelligence.
                                        </p>
                                    </div>

                                    {/* URL Input */}
                                    <div className="space-y-sm">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder="Enter website URL or describe your idea..."
                                                className="w-full px-md sm:px-lg py-sm sm:py-md bg-background-secondary border border-border-default rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-default transition-colors pr-12"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && inputValue.trim()) {
                                                        handleStartScraping(inputValue);
                                                    }
                                                }}
                                            />
                                            {inputValue.trim() && (
                                                <button
                                                    onClick={() => handleStartScraping(inputValue)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-default text-accent-foreground p-2 rounded-lg hover:bg-accent-hover transition-colors"
                                                >
                                                    <FaArrowRight className="text-icon-sm" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quick Suggestions */}
                                    <div className="space-y-sm">
                                        <p className="text-para-sm text-text-secondary text-center">
                                            Not sure where to start?
                                        </p>
                                        <div className="flex flex-wrap gap-sm justify-center">
                                            {quickSuggestions.map((suggestion) => (
                                                <button
                                                    key={suggestion.name}
                                                    onClick={() => handleStartScraping(suggestion.url)}
                                                    className="px-sm sm:px-md py-xs sm:py-sm bg-background-secondary border border-border-default rounded-lg text-para-sm text-text-primary hover:border-accent-default hover:bg-accent-subtle transition-colors"
                                                >
                                                    {suggestion.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Preview/Info */}
                            <div className="bg-background-secondary p-md sm:p-lg flex items-center justify-center order-1 lg:order-2 min-h-48 lg:h-full">
                                <div className="text-center space-y-md max-w-md">
                                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-accent-subtle rounded-full flex items-center justify-center mx-auto">
                                        {isDesignerMode ? (
                                            <FaCode className="text-accent-default text-2xl sm:text-3xl" />
                                        ) : (
                                            <FaHeart className="text-accent-default text-2xl sm:text-3xl" />
                                        )}
                                    </div>
                                    <h3 className="text-h5-md sm:text-h4-md font-medium text-text-primary">
                                        {isDesignerMode ? 'Designer Mode' : 'Client Mode'}
                                    </h3>
                                    <p className="text-para-sm sm:text-para-md text-text-secondary">
                                        {isDesignerMode
                                            ? 'Analyze websites for layout patterns, component structure, and development insights.'
                                            : 'Find inspiration from websites you love and provide feedback to help designers understand your taste.'
                                        }
                                    </p>
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
                        className="h-screen lg:h-full"
                    >
                        {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-default/5 via-transparent to-accent-default/5 animate-pulse"></div>

                        <div className="flex items-center justify-center h-full p-md">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-background-primary/80 backdrop-blur-sm border border-border-default rounded-2xl p-lg sm:p-xl shadow-2xl max-w-lg w-full"
                            >
                                <div className="text-center space-y-lg">

                                    {/* Main Status */}
                                    <div className="space-y-md">
                                        <div className="relative">
                                            <div className="w-16 h-16 border-4 border-border-muted border-t-accent-default rounded-full animate-spin mx-auto"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <FaGlobe className="text-accent-default text-xl animate-pulse" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-h4-md font-bold text-text-primary">Analyzing Website</h3>
                                            <p className="text-para-md text-text-secondary">Breaking down the design into actionable sections</p>
                                        </div>
                                    </div>

                                    {/* Live Progress Timeline */}
                                    <div className="space-y-md">
                                        <div className="flex items-center gap-sm justify-center">
                                            <div className="h-px bg-border-default flex-1"></div>
                                            <span className="text-para-sm text-text-tertiary">Progress</span>
                                            <div className="h-px bg-border-default flex-1"></div>
                                        </div>

                                        <div className="space-y-sm">
                                            {processingSteps.map((step, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-center gap-sm"
                                                >
                                                    {/* Status Icon */}
                                                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                                        {index < processingStep ? (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                                                            >
                                                                <FaCheck className="text-white text-xs" />
                                                            </motion.div>
                                                        ) : index === processingStep ? (
                                                            <div className="w-4 h-4 bg-accent-default rounded-full animate-pulse"></div>
                                                        ) : (
                                                            <FaCircle className="text-border-muted text-xs" />
                                                        )}
                                                    </div>

                                                    {/* Step Text */}
                                                    <motion.p
                                                        className={`text-para-sm text-left ${index === processingStep
                                                                ? 'text-text-primary font-medium'
                                                                : index < processingStep
                                                                    ? 'text-text-secondary'
                                                                    : 'text-text-tertiary'
                                                            }`}
                                                        animate={{
                                                            scale: index === processingStep ? 1.02 : 1
                                                        }}
                                                    >
                                                        {step}
                                                    </motion.p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* Results Screen */}
                {currentStep === 'results' && scrapedData && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-screen overflow-hidden"
                    >
                        <div className="h-full flex flex-col lg:grid lg:grid-cols-2">

                            {/* Left: Section Cards */}
                            <div className="bg-background-primary lg:border-r border-border-default order-1 flex-1 flex flex-col min-h-0">
                                {/* Header - Fixed */}
                                <div className="p-md sm:p-lg border-b border-border-default bg-background-primary flex-shrink-0">
                                    <div className="text-center">
                                        <h2 className="text-h5-md sm:text-h4-md font-bold text-text-primary">
                                            Extracted Layout Sections
                                        </h2>
                                        <p className="text-para-sm sm:text-para-md text-text-secondary mt-xs">
                                            From {scrapedData.url}
                                        </p>
                                    </div>
                                </div>

                                {/* Scrollable Sections */}
                                <div className="p-md sm:p-lg space-y-md flex-1 overflow-y-auto">
                                    {scrapedData.sections.map((section, index) => (
                                        <motion.div
                                            key={section.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-background-secondary border border-border-default rounded-xl overflow-hidden hover:border-border-muted hover:shadow-sm transition-all duration-200"
                                        >
                                            {/* Section Screenshot */}
                                            <div className="relative">
                                                <img
                                                    src={section.screenshot_url}
                                                    alt={`${section.section_type} section`}
                                                    className="w-full h-24 sm:h-32 object-cover"
                                                />
                                                <div className="absolute top-2 left-2">
                                                    <span className="bg-background-dark/90 text-text-light px-xs sm:px-sm py-xs rounded text-para-xs sm:text-para-sm font-medium">
                                                        {section.section_type}
                                                    </span>
                                                </div>
                                                <div className="absolute top-2 right-2 hidden sm:block">
                                                    <span className="bg-background-dark/90 text-text-light px-sm py-xs rounded text-para-sm">
                                                        {section.layout_structure}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Section Details */}
                                            <div className="p-sm sm:p-md space-y-sm">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="text-h6-md font-medium text-text-primary">
                                                            {section.section_type}
                                                        </h4>
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-xs sm:gap-sm mt-xs">
                                                            <span className="flex items-center gap-xs text-para-xs sm:text-para-sm text-text-secondary">
                                                                <FaBullseye className="text-icon-sm" />
                                                                {section.intent}
                                                            </span>
                                                            <span className="text-text-tertiary hidden sm:inline">•</span>
                                                            <span className="flex items-center gap-xs text-para-xs sm:text-para-sm text-text-secondary">
                                                                <FaLayerGroup className="text-icon-sm" />
                                                                <span className="truncate">{section.layout_structure}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Content Preview */}
                                                {section.editableProps && (
                                                    <div className="bg-background-muted rounded-lg p-xs sm:p-sm space-y-xs">
                                                        <p className="text-para-xs sm:text-para-sm font-medium text-text-primary">Content:</p>
                                                        <div className="text-para-xs sm:text-para-sm text-text-secondary space-y-xs">
                                                            {section.editableProps.title && (
                                                                <p className="truncate">Title: "{section.editableProps.title}"</p>
                                                            )}
                                                            {section.editableProps.subtitle && (
                                                                <p className="truncate">Subtitle: "{section.editableProps.subtitle}"</p>
                                                            )}
                                                            {section.editableProps.cta && (
                                                                <p>CTA: "{section.editableProps.cta}"</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Client Mode: Feedback Buttons */}
                                                {!isDesignerMode && !isFeedbackComplete && (
                                                    <div className="flex gap-xs sm:gap-sm pt-sm">
                                                        <button
                                                            onClick={() => handleSectionFeedback(section.id, 'like')}
                                                            className={`flex-1 flex items-center justify-center gap-xs px-sm py-xs sm:py-sm rounded-lg text-para-xs sm:text-para-sm font-medium transition-all ${userFeedback[section.id] === 'like'
                                                                    ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30'
                                                                    : 'bg-background-primary border border-border-default text-text-secondary hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                                                                }`}
                                                        >
                                                            <FaThumbsUp className="text-icon-sm" />
                                                            <span className="hidden sm:inline">Like</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleSectionFeedback(section.id, 'dislike')}
                                                            className={`flex-1 flex items-center justify-center gap-xs px-sm py-xs sm:py-sm rounded-lg text-para-xs sm:text-para-sm font-medium transition-all ${userFeedback[section.id] === 'dislike'
                                                                    ? 'bg-red-500/20 text-red-600 border border-red-500/30'
                                                                    : 'bg-background-primary border border-border-default text-text-secondary hover:border-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                                                                }`}
                                                        >
                                                            <FaThumbsDown className="text-icon-sm" />
                                                            <span className="hidden sm:inline">Dislike</span>
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Designer Mode: Action Buttons */}
                                                {isDesignerMode && (
                                                    <div className="flex gap-xs sm:gap-sm pt-sm">
                                                        <button className="flex items-center gap-xs px-xs sm:px-sm py-xs bg-background-primary border border-border-default rounded text-para-xs sm:text-para-sm text-text-secondary hover:text-accent-default transition-colors">
                                                            <FaEye className="text-icon-sm" />
                                                            <span className="hidden sm:inline">Inspect</span>
                                                        </button>
                                                        <button className="flex items-center gap-xs px-xs sm:px-sm py-xs bg-background-primary border border-border-default rounded text-para-xs sm:text-para-sm text-text-secondary hover:text-accent-default transition-colors">
                                                            <FaCopy className="text-icon-sm" />
                                                            <span className="hidden sm:inline">Clone</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Final CTA */}
                                    {isFeedbackComplete && !isDesignerMode && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-lg"
                                        >
                                            <button
                                                onClick={() => console.log('Navigate to swiper')}
                                                className="w-full bg-accent-default text-accent-foreground py-sm sm:py-md rounded-xl font-medium hover:bg-accent-hover transition-colors text-btn-md sm:text-btn-lg flex items-center justify-center gap-sm"
                                            >
                                                <FaHeart className="text-icon-md" />
                                                <span className="text-center">Want to swipe through components like these?</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Right: Details Panel */}
                            <div className="bg-background-secondary flex flex-col order-2 flex-1 lg:max-w-none min-h-0">
                                {/* Header - Fixed */}
                                <div className="p-md sm:p-lg border-b border-border-default flex-shrink-0">
                                    <h3 className="text-h6-md sm:text-h5-md font-medium text-text-primary">
                                        {isDesignerMode ? 'Component Analysis' : 'Feedback Summary'}
                                    </h3>
                                </div>

                                {/* Content - Scrollable */}
                                <div className="p-md sm:p-lg space-y-md flex-1 overflow-y-auto">

                                    {/* Feedback Summary */}
                                    <div className="bg-background-primary rounded-xl p-md border border-border-default">
                                        <h4 className="text-h6-md font-medium text-text-primary mb-md">
                                            {isDesignerMode ? 'Sections Overview' : 'Your Preferences'}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-md">
                                            <div className="text-center">
                                                <div className="text-h5-md sm:text-h4-md font-bold text-emerald-600">
                                                    {isDesignerMode ? scrapedData.sections.length : Object.values(userFeedback).filter(f => f === 'like').length}
                                                </div>
                                                <p className="text-para-xs sm:text-para-sm text-text-secondary">
                                                    {isDesignerMode ? 'Total' : 'Liked'}
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-h5-md sm:text-h4-md font-bold text-blue-600">
                                                    {isDesignerMode ? Object.keys(scrapedData.sections.reduce((acc, section) => ({ ...acc, [section.layout_structure]: true }), {})).length : Object.values(userFeedback).filter(f => f === 'dislike').length}
                                                </div>
                                                <p className="text-para-xs sm:text-para-sm text-text-secondary">
                                                    {isDesignerMode ? 'Patterns' : 'Disliked'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Liked Sections (Client Mode) */}
                                        {!isDesignerMode && Object.values(userFeedback).filter(f => f === 'like').length > 0 && (
                                            <div className="mt-md pt-md border-t border-border-default">
                                                <p className="text-para-xs sm:text-para-sm font-medium text-text-primary mb-sm">You liked:</p>
                                                <div className="flex flex-wrap gap-xs">
                                                    {scrapedData.sections
                                                        .filter(section => userFeedback[section.id] === 'like')
                                                        .map(section => (
                                                            <span key={section.id} className="px-xs sm:px-sm py-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 rounded text-para-xs">
                                                                {section.section_type}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* JSON Structure */}
                                    <div className="bg-background-primary rounded-xl border border-border-default">
                                        <div className="p-md border-b border-border-default">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-h6-md font-medium text-text-primary">
                                                    API Response Structure
                                                </h4>
                                                <button className="flex items-center gap-xs text-para-xs sm:text-para-sm text-accent-default hover:text-accent-hover">
                                                    <FaCopy className="text-icon-sm" />
                                                    <span className="hidden sm:inline">Copy</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-md">
                                            <pre className="text-para-xs text-text-secondary overflow-auto bg-background-muted rounded p-sm h-64 sm:h-80">
                                                {JSON.stringify({
                                                    url: scrapedData.url,
                                                    analyzedAt: scrapedData.analyzedAt,
                                                    sections: scrapedData.sections.map(section => ({
                                                        id: section.id,
                                                        section_type: section.section_type,
                                                        layout_structure: section.layout_structure,
                                                        intent: section.intent,
                                                        screenshot_url: section.screenshot_url,
                                                        editableProps: section.editableProps,
                                                        feedback: userFeedback[section.id] || null
                                                    })),
                                                    userFeedback: {
                                                        liked: Object.values(userFeedback).filter(f => f === 'like').length,
                                                        disliked: Object.values(userFeedback).filter(f => f === 'dislike').length,
                                                        total: Object.keys(userFeedback).length
                                                    }
                                                }, null, 2)}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScraperIntelligencePage;