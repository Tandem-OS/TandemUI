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
    FaCircle,
    FaEye
} from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";

import ChatPanel from './components/ChatPanel';
import LayoutPlan from './components/LayoutPlan';
import StartFromIdea from './components/StartFromIdea';
import SectionCard from './components/SectionCard';
import Heading from '../../components/demos/typography/Heading';
import Para from '../../common-components/Para';

import { quickSuggestions, processingSteps } from './constants';
import BillingGateModal from '@/common-components/BillingGateModal';

import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { pollForThumbnails } from '@/features/composition/compositionSlice';

import { useNavigate } from 'react-router-dom';
import Toast from '@/common-components/Toast';
import { selectActiveOrPreviewSchema } from '@/features/composition/compositionSelectors';

import { useTasteProfile } from '@/hooks/useTasteProfile';
import { useBillingGate } from '@/hooks/useBillingGate';

import { layoutTokens } from '@/design-system/tokens/layout';

import {
    scrapeUrl,
    setScrapedDataFromIdea,
    addToLayoutPlan,
    updateLayoutPlan,
    resetScraper,
} from '@/features/scraper/scraperSlice';

const t = layoutTokens.scraper;

interface Props {
    mode?: 'scraper' | 'compose';
}

const ScraperIntelligencePage = ({ mode }: Props) => {
    const disableAnalyze = mode === 'compose';
    const disableIdea = mode === 'scraper';

    // ── Pure UI state ─────────────────────────────────────────────────────────
    const [currentStep, setCurrentStep] = useState('welcome');
    const [inputValue, setInputValue] = useState('');
    const [isDesignerMode, setIsDesignerMode] = useState(false);
    const [processingStep, setProcessingStep] = useState(0);
    const [userFeedback, setUserFeedback] = useState<{ [key: string]: 'like' | 'dislike' }>({});
    const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [chatContext, setChatContext] = useState<any>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [compositionId, setCompositionId] = useState<string | null>(null);
    const [refinedSections, setRefinedSections] = useState<Set<string>>(new Set());

    const handleRefineComplete = (sections: string[]) => {
        setRefinedSections(new Set(sections));
        setTimeout(() => setRefinedSections(new Set()), 2500);
    };

    // ── Slice state ───────────────────────────────────────────────────────────
    const scrapedData = useSelector((state: RootState) => state.scraper.scrapedData);
    const scraperStatus = useSelector((state: RootState) => state.scraper.status);
    const scraperError = useSelector((state: RootState) => state.scraper.error);
    const layoutPlan = useSelector((state: RootState) => state.scraper.layoutPlan ?? []);

    // ── Auth / project selectors ──────────────────────────────────────────────
    const email = useSelector((state: RootState) => state.auth.user.email);
    const userRole = useSelector((state: RootState) => state.auth.user.role);
    const designerEmail = useSelector((state: RootState) => state.auth.user.designerEmail);
    const projectId = useSelector((state: RootState) => state.project.projectId);

    // ── Hooks ─────────────────────────────────────────────────────────────────
    const { profile, updateTaste, scoreSections, clearTaste } = useTasteProfile();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {
        gateState,
        warningState,
        handleBillingError,
        handleUsageUpdate,
        dismissGate,
        dismissWarning,
        isCheckoutLoading,
        checkoutError,
        initiateCheckout,
    } = useBillingGate();
    // ── Composition schema 
    const pageSchema = useSelector(selectActiveOrPreviewSchema);
    const activeSections = compositionId && pageSchema?.sections
        ? pageSchema.sections
        : (scrapedData?.sections ?? []);

    // ── Sync scraper status → currentStep 
    useEffect(() => {
        if (scraperStatus === 'success' && currentStep === 'processing') {
            setCurrentStep('results');
        }
        if (scraperStatus === 'error' && currentStep === 'processing') {
            if (scraperError) {
                showToast(scraperError, 'error');
            }
            setCurrentStep('error');
            setTimeout(() => navigate(-1), 3000);
        }
    }, [scraperStatus, scraperError]);

    useEffect(() => {
        if (userRole === 'Designer') {
            handleModeToggle(true);
        } else {
            handleModeToggle(false);
        }
    }, [userRole]);

    // ── Reset scraper on mount 
    useEffect(() => {
        dispatch(resetScraper());
    }, []);

    // ── Helpers 
    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToastMessage({ message, type });
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleStartScraping = async (url: string) => {
        const payload =
            userRole === 'Designer' && email
                ? { designer_email: email, client_email: null, project_id: projectId ?? null, role: 'designer', url }
                : userRole === 'Client' && designerEmail && projectId
                    ? { designer_email: designerEmail, role: 'client', project_id: projectId, client_email: email!, url }
                    : null;

        if (!payload) return;

        setCurrentStep('processing');
        setProcessingStep(0);

        const processingAnimation = (async () => {
            for (let i = 0; i < processingSteps.length; i++) {
                setProcessingStep(i);
                await new Promise((resolve) => setTimeout(resolve, 800));
            }
        })();

        try {
            const [scrapeResult] = await Promise.all([
                dispatch(scrapeUrl(payload)).unwrap(),
                processingAnimation,
            ]);

            if (scrapeResult?.usage) {
                handleUsageUpdate({
                    usage_type: 'scraper_run',
                    current_count: scrapeResult.usage.current_count,
                    limit: scrapeResult.usage.limit,
                });
            }
        } catch (err: any) {
            const isBillingError =
                (err?.status === 403 || err?.response?.status === 403) &&
                (err?.code === "USAGE_LIMIT_REACHED" || err?.response?.data?.code === "USAGE_LIMIT_REACHED");

            if (isBillingError) {
                const gateData = err?.code ? err : err?.response?.data;
                handleBillingError({ response: { status: 403, data: gateData } });
                setCurrentStep('input');
                return;
            }
            console.error("❌ Scraper failed:", err);
        }
    };

    const handleSectionFeedback = (sectionId: string, feedback: 'like' | 'dislike') => {
        setUserFeedback(prev => ({ ...prev, [sectionId]: feedback }));
    };

    const handleAddToLayout = (section: any) => {
        dispatch(addToLayoutPlan(section));
        showToast('Section added to layout plan!');
    };

    const handleUpdateLayoutPlan = (sections: any[]) => {
        dispatch(updateLayoutPlan(sections));
    };

    const handleGenerateLayout = (sections: any[], newCompositionId: string) => {
        setCompositionId(newCompositionId);
        dispatch(setScrapedDataFromIdea({
            url: 'Generated from idea',
            analyzedAt: new Date().toISOString(),
            sections: scoreSections(sections),
        }));
        setCurrentStep('results');
        showToast('Layout generated successfully!');
    };

    const openChat = (context: any) => {
        setChatContext(context);
    };

    const handleModeToggle = async (mode: boolean) => {
        setIsTransitioning(true);
        await new Promise(resolve => setTimeout(resolve, 150));
        setIsDesignerMode(mode);
        setIsTransitioning(false);
    };

    const sectionCount = scrapedData?.sections.length ?? null;
    const isFeedbackComplete = scrapedData && Object.keys(userFeedback).length === scrapedData.sections.length;
    const likeCount = Object.values(userFeedback).filter(f => f === 'like').length;

    return (
        <div className={t.root}>
            <AnimatePresence>
                {warningState && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-sm px-md py-sm rounded-lg bg-amber-50 border border-amber-200 text-amber-800 shadow-md text-para-sm"
                    >
                        <span>⚠️ {warningState.remaining} scraper {warningState.remaining === 1 ? 'run' : 'runs'} left on your free plan.</span>
                        <button
                            onClick={dismissWarning}
                            className="ml-sm text-amber-600 hover:text-amber-900 font-medium underline"
                        >
                            Dismiss
                        </button>
                    </motion.div>
                )}
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
                        className={t.welcomeScreen}
                    >
                        <div className={t.welcomeInner}>
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className={t.welcomeIconWrapper}
                            >
                                <div className={t.welcomeIcon}>
                                    <FaLightbulb className="text-accent-foreground text-3xl sm:text-4xl animate-pulse" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className={t.welcomeTextBlock}
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
                                className={t.welcomeActions}
                            >
                                {/* Analyze a Website — disabled when mode is compose */}
                                <motion.button
                                    onClick={() => !disableAnalyze && setCurrentStep('input')}
                                    whileHover={!disableAnalyze ? { scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" } : {}}
                                    whileTap={!disableAnalyze ? { scale: 0.95 } : {}}
                                    disabled={disableAnalyze}
                                    className={`${t.welcomePrimaryBtn} ${disableAnalyze ? 'opacity-40 cursor-not-allowed' : ''}`}
                                >
                                    <motion.div
                                        whileHover={!disableAnalyze ? { rotate: 15 } : {}}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <FaGlobe className="text-icon-md" />
                                    </motion.div>
                                    <span>Analyze a Website</span>
                                </motion.button>

                                {/* Generate with Idea — disabled when mode is scraper */}
                                <StartFromIdea
                                    onGenerateLayout={handleGenerateLayout}
                                    disabled={disableIdea}
                                />
                            </motion.div>

                            {Object.keys(profile).length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={t.welcomeTasteRow}
                                >
                                    <Para size="sm" color="secondary">Taste profile active</Para>
                                    <button
                                        onClick={() => {
                                            clearTaste();
                                            showToast('Taste profile cleared');
                                        }}
                                        className={t.welcomeClearBtn}
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
                        className={t.inputScreen}
                    >
                        <div className={t.inputGrid}>
                            <div className={t.inputLeft}>
                                <div className={t.inputLeftInner}>
                                    <button
                                        onClick={() => setCurrentStep('welcome')}
                                        className={t.inputBackBtn}
                                    >
                                        <FaArrowLeftLong /> Back to home
                                    </button>

                                    <div className={t.inputToggleWrapper}>
                                        <div className={t.inputToggleInner}>
                                            <button className={!isDesignerMode ? t.inputToggleBtnActive : t.inputToggleBtnInactive}>
                                                <FaUser className="text-icon-sm" />
                                                <span className="hidden sm:inline">Client View</span>
                                                <span className="sm:hidden">Client</span>
                                            </button>
                                            <button className={isDesignerMode ? t.inputToggleBtnActive : t.inputToggleBtnInactive}>
                                                <FaPalette className="text-icon-sm" />
                                                <span className="hidden sm:inline">Designer View</span>
                                                <span className="sm:hidden">Designer</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className={t.inputTextBlock}>
                                        <Heading level="h3" align="center">
                                            Enter a website to analyze
                                        </Heading>
                                        <Para size="lg" color="secondary" align="center">
                                            We'll break it down into reusable design patterns
                                        </Para>
                                    </div>

                                    <div className={t.inputFieldWrapper}>
                                        <div className={t.inputFieldInner}>
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder="Enter website URL (e.g., stripe.com)"
                                                className={t.inputField}
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
                                                    className={t.inputSubmitBtn}
                                                >
                                                    <FaArrowRight className="text-icon-sm" />
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>

                                    <div className={t.inputSuggestionsWrapper}>
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
                                                    className={t.inputSuggestionBtn}
                                                >
                                                    {suggestion.name}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={t.inputRight}>
                                <motion.div
                                    animate={{ rotate: isDesignerMode ? 180 : 0 }}
                                    transition={{ duration: 0.5 }}
                                    className={t.inputRightIcon}
                                >
                                    {isDesignerMode ? (
                                        <FaCode className={t.inputRightIconInner} />
                                    ) : (
                                        <FaUser className={t.inputRightIconInner} />
                                    )}
                                </motion.div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={isDesignerMode ? 'designer' : 'client'}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className={t.inputRightContent}
                                    >
                                        <div className={t.inputRightTextBlock}>
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
                                        <div className={t.inputRightGrid}>
                                            <div className={t.inputRightCard}>
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
                                            <div className={t.inputRightCard}>
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
                        className={t.processingScreen}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={t.processingCard}
                        >
                            <div className={t.processingCardInner}>
                                <div className={t.processingSpinnerWrapper}>
                                    <div className={t.processingSpinner}></div>
                                    <div className={t.processingSpinnerIcon}>
                                        <FaGlobe className="text-accent-default text-2xl sm:text-3xl animate-pulse" />
                                    </div>
                                </div>

                                <div className={t.processingTextBlock}>
                                    <Heading level="h3" align="center">
                                        Analyzing Website
                                    </Heading>
                                    <Para size="lg" color="secondary" align="center" className="mt-sm">
                                        Extracting design patterns and layout intelligence
                                    </Para>
                                </div>

                                <div className="space-y-sm">
                                    {processingSteps.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={t.processingStepRow}
                                        >
                                            <motion.div animate={{ scale: index === processingStep ? 1.02 : 1 }}>
                                                <Para
                                                    size="sm"
                                                    color={index === processingStep ? 'primary' : index < processingStep ? 'secondary' : 'tertiary'}
                                                    weight={index === processingStep ? 'medium' : 'normal'}
                                                    className="text-left"
                                                >
                                                    {index === processingSteps.length - 1 && index === processingStep
                                                        ? sectionCount !== null
                                                            ? `Complete! Found ${sectionCount} sections`
                                                            : 'Complete! Sections ready'
                                                        : step
                                                    }
                                                </Para>
                                            </motion.div>
                                            <div className={t.processingStepIconWrapper}>
                                                {index < processingStep ? (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className={t.processingStepDone}
                                                    >
                                                        <FaCheck className={t.processingStepDoneIcon} />
                                                    </motion.div>
                                                ) : index === processingStep ? (
                                                    <div className={t.processingStepActive}></div>
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
                        className={t.resultsScreen}
                    >
                        <header className={t.resultsHeader}>
                            <div className={t.resultsHeaderInner}>
                                <div className={t.resultsHeaderRow}>
                                    <div className={t.resultsHeaderLeft}>
                                        <button onClick={() => setCurrentStep('input')} className={t.resultsBackBtn}>
                                            <FaArrowLeftLong /> Back
                                        </button>
                                        <div>
                                            <Heading level="h5">Layout Analysis</Heading>
                                            <Para size="sm" color="secondary">{scrapedData.sections.length} sections found on {scrapedData.url}</Para>
                                        </div>
                                    </div>
                                    <div className={t.resultsHeaderRight}>
                                        {/* Generate with Idea — disabled when mode is scraper */}
                                        <StartFromIdea
                                            onGenerateLayout={handleGenerateLayout}
                                            disabled={disableIdea}
                                        />

                                        {compositionId && (
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => {
                                                    dispatch(pollForThumbnails({ compositionId: compositionId! }));
                                                    navigate(`/dashboard/client/compose/${compositionId}`);
                                                }}
                                                className={t.resultsPreviewBtn}
                                            >
                                                <FaEye className="text-icon-sm" />
                                                <span className="hidden sm:inline">Preview Hero</span>
                                                <span className="sm:hidden">Preview</span>
                                            </motion.button>
                                        )}

                                        <div className={t.resultsToggleWrapper}>
                                            <button className={!isDesignerMode ? t.resultsToggleBtnActive : t.resultsToggleBtnInactive}>
                                                <FaUser className="inline mr-xs text-icon-sm" />
                                                <span className="hidden sm:inline">Client</span>
                                            </button>
                                            <button className={isDesignerMode ? t.resultsToggleBtnActive : t.resultsToggleBtnInactive}>
                                                <FaPalette className="inline mr-xs text-icon-sm" />
                                                <span className="hidden sm:inline">Designer</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <main className={t.resultsMain}>
                            <div className={t.resultsGrid}>
                                <aside className={t.resultsAside}>
                                    <div className={t.resultsAsideInner}>
                                        {Object.keys(profile).length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={t.resultsTasteCard}
                                            >
                                                <div className={t.resultsTasteCardHeader}>
                                                    <div className={t.resultsTasteCardHeaderLeft}>
                                                        <motion.div
                                                            className={t.resultsTasteIconWrapper}
                                                            animate={likeCount >= 3 ? {
                                                                boxShadow: [
                                                                    "0 0 0 0px rgba(99, 102, 241, 0.4)",
                                                                    "0 0 0 10px rgba(99, 102, 241, 0)"
                                                                ]
                                                            } : {}}
                                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                        >
                                                            <FaLightbulb className={t.resultsTasteIconInner} />
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
                                                        className={t.resultsTasteClearBtn}
                                                    >
                                                        Reset
                                                    </button>
                                                </div>

                                                <div className={t.resultsTasteBody}>
                                                    <Para size="xs" color="secondary">
                                                        {Object.values(profile).filter((v: any) => v > 0).length} likes • {Object.values(profile).filter((v: any) => v < 0).length} dislikes
                                                    </Para>
                                                    <div className="flex flex-wrap gap-xs">
                                                        {Object.entries(profile)
                                                            .filter(([_, value]: [string, any]) => value > 0)
                                                            .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
                                                            .slice(0, 2)
                                                            .map(([key, value]: [string, any]) => (
                                                                <div key={key} className={t.resultsTasteTag}>
                                                                    {key.replace('_', ' ')} +{value}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div className={t.resultsChatWrapper}>
                                            <ChatPanel
                                                context={chatContext}
                                                compositionId={compositionId}
                                                sections={activeSections.map((s: any) => s.category ?? s.section_type).filter(Boolean)}
                                                onRefineComplete={handleRefineComplete}
                                            />
                                        </div>
                                    </div>
                                </aside>

                                <div className={t.resultsSectionsCol}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isTransitioning ? 'transitioning' : isDesignerMode ? 'designer' : 'client'}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className={t.resultsSectionsInner}
                                        >
                                            {(activeSections as any[]).map((section) => (
                                                <SectionCard
                                                    key={section.id}
                                                    section={section}
                                                    isDesignerMode={isDesignerMode}
                                                    onFeedback={(feedback) => handleSectionFeedback(section.id, feedback)}
                                                    feedback={userFeedback[section.id] || null}
                                                    onAddToLayout={handleAddToLayout}
                                                    updateTaste={updateTaste}
                                                    openChat={openChat}
                                                    isJustRefined={refinedSections.has(section.category ?? section.section_type)}
                                                />
                                            ))}
                                            {isFeedbackComplete && !isDesignerMode && (
                                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={t.resultsFeedbackComplete}>
                                                    <div className={t.resultsFeedbackCard}>
                                                        <Heading level="h3" color="light" align="center" className="mb-sm sm:mb-md">Your taste profile is building!</Heading>
                                                        <Para size="lg" color="light" align="center" className="mb-md sm:mb-lg opacity-90">We've learned what you like. Ready to see more personalized suggestions?</Para>
                                                        <button className={t.resultsFeedbackBtn}>Explore Component Library</button>
                                                    </div>
                                                </motion.div>
                                            )}
                                            <div className={t.resultsMobileChatWrapper}>
                                                <ChatPanel
                                                    context={chatContext}
                                                    compositionId={compositionId}
                                                    sections={activeSections.map((s: any) => s.category ?? s.section_type).filter(Boolean)}
                                                    onRefineComplete={handleRefineComplete}
                                                />
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

            {gateState && (
                <BillingGateModal
                    isOpen={true}
                    usageType={gateState.usage_type}
                    currentCount={gateState.current_count}
                    limit={gateState.limit}
                    isCheckoutLoading={isCheckoutLoading}
                    checkoutError={checkoutError}
                    onUpgrade={(plan) => initiateCheckout(plan)}
                    onSecondary={dismissGate}
                    onClose={dismissGate}
                />
            )}
        </div>
    );
};

export default ScraperIntelligencePage;