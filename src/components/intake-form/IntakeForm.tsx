import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    FaLink, FaFileUpload, FaPlusCircle, FaTimesCircle,
    FaArrowRight, FaCheck, FaCalendarAlt
} from 'react-icons/fa';
import { containerVariant, fadeInLeft } from '@/lib/animations/variants';
import Input from '@/components/auth/form/components/Input';
import SimpleButton from '@/components/demos/buttons/SimpleButton';
import Heading from '@/components/demos/typography/Heading';
import SimpleHeader from '@/components/Headers/SimpleHeader/SimpleHeader';
import { KingOfTheHill } from '@/components/intake-form/KingOfTheHill';
import FiveStarFeedback from '@/common-components/FiveStarFeedback';
import { initialFormData, suggestedPageChips, OPTIONS } from '@/components/intake-form/constants';
import { type IntakeFormData, type ButtonState } from '@/components/intake-form/types';
import { submitIntakeStep, getIntakeByClientEmail } from '@/lib/requests/IntakeRequest';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { layoutTokens } from '@/design-system/tokens/layout';
import BillingGateModal from '@/common-components/BillingGateModal';
import Toast from '@/common-components/Toast';
import { useBillingGate } from '@/hooks/useBillingGate';

const t = layoutTokens.intakeForm;

const getButtonClass = (isSelected: boolean, disabled = false) =>
    `${t.selectionBtnBase} ${isSelected ? t.selectionBtnSelected : t.selectionBtnUnselected} ${disabled ? t.selectionBtnDisabled : ''}`;

const getDropzoneClass = (isDragActive: boolean) =>
    `${t.dropzoneBase} ${isDragActive ? t.dropzoneActive : t.dropzoneInactive}`;

const ScreenHeader = ({ title, subtitle, canSkip, onSkip, buttonState, isLastStep }: any) => (
    <motion.div variants={fadeInLeft} className="mb-lg">
        <div className='flex justify-between items-start gap-sm'>
            <div>
                <Heading level="h3" color="accent" className='mb-sm'>{title}</Heading>
            </div>
            {canSkip && (
                <button
                    onClick={onSkip}
                    disabled={buttonState !== 'default'}
                    className="text-text-tertiary hover:text-text-secondary text-para-sm underline transition-colors disabled:opacity-50 whitespace-nowrap flex-shrink-0"
                >
                    {isLastStep ? 'Skip and Submit' : 'Skip this step'}
                </button>
            )}
        </div>
        <p className="text-para-md text-text-secondary mt-sm">{subtitle}</p>
    </motion.div>
);

const FileUpload = ({ file, onFile }: any) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) onFile(e.dataTransfer.files[0]);
    };

    return (
        <div
            className={getDropzoneClass(dragActive)}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                id="brandguide-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
            />
            {file ? (
                <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-para-sm">{(file as File).name}</span>
                    <label htmlFor="brandguide-upload" className="text-accent-default hover:text-accent-hover cursor-pointer text-para-sm">
                        Change file
                    </label>
                </div>
            ) : (
                <label htmlFor="brandguide-upload" className="cursor-pointer block">
                    <FaFileUpload className="mx-auto text-text-tertiary text-icon-2xl mb-xs" />
                    <p className="text-text-secondary text-para-md mb-xs">Drop brand guide here or click to upload</p>
                </label>
            )}
        </div>
    );
};

const IntakeForm: React.FC = () => {
    const navigateHook = useNavigate();
    const [currentScreen, setCurrentScreen] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<IntakeFormData>(initialFormData);
    const [buttonState, setButtonState] = useState<ButtonState>('default');
    const [vibeSelectionComplete, setVibeSelectionComplete] = useState(false);
    const [showVibeResults, setShowVibeResults] = useState(false);
    const [showFeedback] = useState(false);
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
    } = useBillingGate(); const [toastMessage, setToastMessage] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    const fetchForm = async (clientEmail: string) => {
        setLoading(true);
        try {
            const response = await getIntakeByClientEmail({ client_email: clientEmail });
            const data = response?.data?.data;
            if (data) {
                const transformed = {
                    tones: data.tones || [],
                    keyFeatures: (data.key_features || []).join(', '),
                    inspirationUrls: data.inspiration_urls || [''],
                    colorStrategy: data.color_strategy || 'match-logo',
                    customColors: (data.custom_colors || []).join(', '),
                    deadline: data.deadline || '',
                    notSureDeadline: data.not_sure_deadline || false,
                    currentSiteUrl: data.current_site_url || '',
                    brandGuide: data.brand_guide_metadata || null,
                    additionalDetails: data.additional_details || '',
                };
                setFormData(transformed);
                setLoading(false);
            } else {
                setFormData(initialFormData);
                setLoading(false);
            }
        } catch (err) {
            console.error("Error loading form data:", err);
            setFormData(initialFormData);
            setLoading(false);
        }
        setLoading(false);
    };

    const clientEmail = useSelector((state: RootState) => state.auth.user.email)!;
    const designerEmail = useSelector((state: RootState) => state.auth.user.designerEmail);

    useEffect(() => {
        if (clientEmail) fetchForm(clientEmail);
    }, [clientEmail]);

    const totalScreens = 5;
    const canSkip = currentScreen > 1;
    const showToast = (
        message: string,
        type: 'success' | 'error' = 'success'
    ) => {
        setToastMessage({ message, type });

        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    const updateForm = (updates: Partial<IntakeFormData>) =>
        setFormData(prev => ({ ...prev, ...updates }));

    const handleFile = (file: File) => updateForm({ brandGuide: file });

    const handleVibeComplete = (winners: string[]) => {
        updateForm({ tones: winners });
        setVibeSelectionComplete(true);
        setShowVibeResults(true);
    };

    const handleVibeRetake = () => {
        setShowVibeResults(false);
        setVibeSelectionComplete(false);
        updateForm({ tones: [] });
    };

    const handleFeedbackSubmit = (rating: number, message: string) => {
        console.log('Feedback submitted:', { rating, message, stageName: 'Intake Form', projectId: 1 });
        navigateHook('/dashboard/client');
    };

    const handleFeedbackSkip = () => {
        console.log('Feedback skipped for Intake Form');
        navigateHook('/dashboard/client');
    };
    const navigateScreen = async (next: boolean) => {
        if (!next) {
            if (currentScreen > 1) setCurrentScreen(currentScreen - 1);
            return;
        }

        if (currentScreen === 1 && !vibeSelectionComplete) return;

        if (currentScreen === totalScreens) {
            try {
                const payload = {
                    designer_email: designerEmail,
                    client_email: clientEmail,
                    key_features: formData.keyFeatures,
                    inspiration_urls: formData.inspirationUrls,
                    color_strategy: formData.colorStrategy,
                    custom_colors: formData.customColors,
                    current_site_url: formData.currentSiteUrl,
                    additional_details: formData.additionalDetails,
                    dead_line: formData.deadline,
                    not_sure_deadline: formData.notSureDeadline,
                    is_last_stage: true
                };

                const result = await submitIntakeStep(payload);
                if (result?.data?.usage) {
                    handleUsageUpdate({
                        usage_type: 'intake_update',
                        current_count: result.data.usage.current_count,
                        limit: result.data.usage.limit,
                    });
                }
                showToast('Intake form submitted successfully!', 'success');

                setTimeout(() => {
                    navigateHook("/dashboard/client");
                }, 1200);
            } catch (error: any) {
                if (handleBillingError(error)) {
                    return;
                }

                console.error('Error submitting intake form:', error);
                showToast('Submission failed. Please try again.', 'error');
            }
            return;
        }

        setButtonState('saving');

        try {
            const {
                tones, keyFeatures, inspirationUrls, colorStrategy,
                customColors, currentSiteUrl, additionalDetails,
                deadline, notSureDeadline, brandGuide
            } = formData;

            const payload = {
                designer_email: designerEmail,
                client_email: clientEmail,
                tones,
                key_features: keyFeatures,
                inspiration_urls: inspirationUrls,
                color_strategy: colorStrategy,
                custom_colors: customColors,
                current_site_url: currentSiteUrl,
                additional_details: additionalDetails,
                deadline,
                not_sure_deadline: notSureDeadline,
                brand_guide_metadata: brandGuide
                    ? {
                        name: brandGuide.name,
                        type: brandGuide.type,
                        size: brandGuide.size,
                        lastModified: brandGuide.lastModified,
                    }
                    : null,
                is_last_stage: false
            };

            const stepResult = await submitIntakeStep(payload);
            if (stepResult?.data?.usage) {
                handleUsageUpdate({
                    usage_type: 'intake_update',
                    current_count: stepResult.data.usage.current_count,
                    limit: stepResult.data.usage.limit,
                });
            }

            setButtonState('saved');
            setTimeout(() => {
                setCurrentScreen(currentScreen + 1);
                setButtonState('default');
            }, 500);
        } catch (err: any) {
            if (handleBillingError(err)) {
                setButtonState('default');
                return;
            }

            console.error("Intake submission failed", err);
            showToast(
                "Something went wrong while saving this step. Please try again.",
                'error'
            );
            setButtonState('default');
        }
    };

    const screens = [
        {
            title: "Visual Direction",
            subtitle: "Choose your preferred style in head-to-head battles",
            content: (
                <motion.div variants={fadeInLeft}>
                    <KingOfTheHill
                        onComplete={handleVibeComplete}
                        onRetake={handleVibeRetake}
                        showResultsInitially={vibeSelectionComplete && showVibeResults}
                        completedTones={formData.tones}
                    />
                </motion.div>
            )
        },
        {
            title: "Key Features & Pages",
            subtitle: "What pages or functionality do you need for your project?",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <p className="text-para-sm text-text-tertiary mb-md">
                            Quickly select common options or type your own below.
                        </p>
                        <div className="mb-md">
                            <div className="flex flex-wrap gap-xs">
                                {suggestedPageChips.map((feature) => {
                                    const isSelected = formData.keyFeatures.toLowerCase().includes(feature.toLowerCase());
                                    return (
                                        <button
                                            key={feature}
                                            type="button"
                                            onClick={() => {
                                                const currentFeatures = formData.keyFeatures.trim();
                                                const featuresArray = currentFeatures ? currentFeatures.split('\n').filter(f => f.trim()) : [];
                                                if (isSelected) {
                                                    const updatedFeatures = featuresArray.filter(f =>
                                                        !f.toLowerCase().includes(feature.toLowerCase())
                                                    );
                                                    updateForm({ keyFeatures: updatedFeatures.join('\n') });
                                                } else {
                                                    featuresArray.push(feature);
                                                    updateForm({ keyFeatures: featuresArray.join('\n') });
                                                }
                                            }}
                                            className={`px-sm py-xs rounded-full text-para-xs transition-all ${isSelected
                                                ? 'bg-accent-default text-accent-foreground hover:bg-accent-hover'
                                                : 'bg-background-muted text-text-secondary hover:bg-background-secondary'
                                                }`}
                                        >
                                            {feature}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="relative my-md">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border-muted"></div>
                            </div>
                            <div className="relative flex justify-center text-para-sm">
                                <span className="px-sm bg-background-primary text-text-tertiary">
                                    or add custom features
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-xs text-para-sm text-text-secondary">
                                Your selected features and custom additions
                            </label>
                            <p className="text-para-xs text-text-tertiary mb-sm">
                                You can add multiple pages or features, one per line.
                            </p>
                            <textarea
                                value={formData.keyFeatures}
                                onChange={(e) => updateForm({ keyFeatures: e.target.value })}
                                placeholder="e.g. Homepage, Blog, Booking System"
                                rows={6}
                                className="w-full bg-background-primary text-text-primary rounded-lg py-sm px-md border border-border-default focus:border-border-focus outline-none transition-all resize-none"
                            />
                        </div>
                    </motion.div>
                </>
            )
        },
        {
            title: "Style References & Colors",
            subtitle: "Share websites that inspire you and your color preferences",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-text-secondary">Any websites or designs you like?</label>
                        <p className="text-text-tertiary text-para-sm mb-sm">Drop any links that inspire you</p>
                        <div className="space-y-xs">
                            {formData.inspirationUrls.map((url, index) => (
                                <div key={index} className="flex gap-xs">
                                    <div className="relative flex-1">
                                        <Input
                                            type="url"
                                            value={url}
                                            onChange={(e) => {
                                                const newUrls = [...formData.inspirationUrls];
                                                newUrls[index] = e.target.value;
                                                updateForm({ inspirationUrls: newUrls });
                                            }}
                                            placeholder="https://inspiration-site.com"
                                            variant='filled'
                                            icon={<FaLink />}
                                        />
                                    </div>
                                    {formData.inspirationUrls.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => updateForm({
                                                inspirationUrls: formData.inspirationUrls.filter((_, i) => i !== index)
                                            })}
                                            className="text-text-tertiary hover:text-text-error transition-colors"
                                        >
                                            <FaTimesCircle className="text-icon-lg" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {formData.inspirationUrls.length < 5 && (
                                <button
                                    type="button"
                                    onClick={() => updateForm({
                                        inspirationUrls: [...formData.inspirationUrls, '']
                                    })}
                                    className="flex items-center gap-xs text-accent-default hover:text-accent-hover text-para-sm transition-colors"
                                >
                                    <FaPlusCircle /> Add another link
                                </button>
                            )}
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-text-secondary">Do you have any brand colors in mind?</label>
                        <div className="space-y-sm">
                            <div className="flex gap-sm">
                                {OPTIONS.colorStrategies.map(strategy => (
                                    <button
                                        key={strategy.id}
                                        type="button"
                                        onClick={() => updateForm({ colorStrategy: strategy.id as any })}
                                        className={`flex-1 p-sm rounded-lg border-2 ${getButtonClass(formData.colorStrategy === strategy.id)}`}
                                    >
                                        {strategy.label}
                                    </button>
                                ))}
                            </div>
                            {formData.colorStrategy === 'custom' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                    <Input
                                        type="text"
                                        value={formData.customColors}
                                        onChange={(e) => updateForm({ customColors: e.target.value })}
                                        placeholder="Enter hex values or color names (e.g., #3B82F6, navy, coral)"
                                        variant='filled'
                                    />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )
        },
        {
            title: "Existing Assets",
            subtitle: "Share what you already have",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-text-secondary">Do you have a current site?</label>
                        <div className="relative">
                            <Input
                                type="url"
                                value={formData.currentSiteUrl}
                                onChange={(e) => updateForm({ currentSiteUrl: e.target.value })}
                                placeholder="https://your-current-site.com"
                                variant='filled'
                                icon={<FaLink />}
                            />
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-text-secondary">Upload brand guide (optional)</label>
                        <FileUpload
                            file={formData.brandGuide}
                            onFile={handleFile}
                        />
                    </motion.div>
                </>
            )
        },
        {
            title: "Timeline & Final Details",
            subtitle: "Last few things to nail down",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-text-secondary">When do you need this delivered?</label>
                        <div className="space-y-sm">
                            {!formData.notSureDeadline && (
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) => updateForm({ deadline: e.target.value })}
                                        className="w-full bg-background-primary text-text-primary rounded-lg py-sm px-md border border-border-default focus:border-border-focus outline-none transition-all"
                                    />
                                    <FaCalendarAlt className="absolute right-md top-1/2 transform -translate-y-1/2 text-text-tertiary pointer-events-none" />
                                </div>
                            )}
                            <label className="flex items-center gap-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.notSureDeadline}
                                    onChange={(e) => updateForm({ notSureDeadline: e.target.checked, deadline: e.target.checked ? '' : formData.deadline })}
                                    className="w-md h-md text-accent-default bg-background-primary border-border-default rounded focus:ring-accent-default"
                                />
                                <span className="text-text-secondary text-para-sm">Flexible timeline</span>
                            </label>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-text-secondary">Any remaining details?</label>
                        <div className="relative">
                            <textarea
                                value={formData.additionalDetails}
                                onChange={(e) => e.target.value.length <= 500 && updateForm({ additionalDetails: e.target.value })}
                                placeholder="Special requirements, specific functionality needs, or anything else we should know..."
                                rows={5}
                                className="w-full bg-background-primary text-text-primary rounded-lg py-sm px-md border border-border-default focus:border-border-focus outline-none transition-all resize-none"
                            />
                            <span className={`absolute bottom-sm right-md text-para-sm ${formData.additionalDetails.length > 450 ? 'text-text-warning' : 'text-text-tertiary'}`}>
                                {formData.additionalDetails.length}/500
                            </span>
                        </div>
                    </motion.div>
                </>
            )
        }
    ];

    const currentScreenData = screens[currentScreen - 1];
    const shouldHideHeader = (currentScreen === 1 && showVibeResults) || showFeedback;

    return (
        <>
            <AnimatePresence>
                {toastMessage && (
                    <Toast
                        message={toastMessage.message}
                        type={toastMessage.type}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {warningState && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-sm px-md py-sm rounded-lg bg-amber-50 border border-amber-200 text-amber-800 shadow-md text-para-sm"
                    >
                        <span>⚠️ {warningState.remaining} intake {warningState.remaining === 1 ? 'edit' : 'edits'} left on your free plan.</span>
                        <button
                            onClick={dismissWarning}
                            className="ml-sm text-amber-600 hover:text-amber-900 font-medium underline"
                        >
                            Dismiss
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading ? (
                <div className={t.loadingWrapper}>
                    Loading
                </div>
            ) : (
                <div className={t.root}>
                    <div className={t.inner}>
                        <SimpleHeader />
                        <div className={t.centerWrapper}>
                            <AnimatePresence mode="wait">
                                {showFeedback ? (
                                    <motion.div
                                        key="feedback"
                                        variants={containerVariant}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className={t.feedbackWrapper}
                                    >
                                        <FiveStarFeedback
                                            question="How was the intake process?"
                                            onSubmit={handleFeedbackSubmit}
                                            onSkip={handleFeedbackSkip}
                                            autoSkipSeconds={10}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={currentScreen}
                                        variants={containerVariant}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className={t.card}
                                    >
                                        {!shouldHideHeader && (
                                            <ScreenHeader
                                                title={currentScreenData.title}
                                                subtitle={currentScreenData.subtitle}
                                                canSkip={canSkip}
                                                onSkip={() => navigateScreen(true)}
                                                buttonState={buttonState}
                                                isLastStep={currentScreen === totalScreens}
                                            />
                                        )}

                                        {currentScreenData.content}

                                        <motion.div variants={fadeInLeft} className="flex justify-between mt-md">
                                            {currentScreen > 1 && (
                                                <SimpleButton
                                                    variant="outline"
                                                    size="md"
                                                    onClick={() => navigateScreen(false)}
                                                    disabled={buttonState !== 'default'}
                                                >
                                                    Back
                                                </SimpleButton>
                                            )}

                                            {(currentScreen > 1 || vibeSelectionComplete) && (
                                                <SimpleButton
                                                    variant="solid"
                                                    size="md"
                                                    onClick={() => navigateScreen(true)}
                                                    disabled={buttonState !== 'default' || (currentScreen === 1 && !vibeSelectionComplete)}
                                                    className={`${currentScreen === 1 ? 'ml-auto' : ''} min-w-[150px]`}
                                                >
                                                    {buttonState === 'saving' && currentScreen < totalScreens ? 'Saving...' :
                                                        buttonState === 'saved' && currentScreen < totalScreens ? <>Saved <FaCheck className="ml-xs" /></> :
                                                            currentScreen === totalScreens ? 'Start My Project' :
                                                                <>Next <FaArrowRight className="ml-xs" /></>}
                                                </SimpleButton>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            )}

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
        </>
    );
};

export default IntakeForm;