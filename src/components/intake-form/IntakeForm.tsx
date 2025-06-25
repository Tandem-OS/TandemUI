// IntakeForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaLink, FaFileUpload, FaPlusCircle, FaTimesCircle,
    FaArrowRight, FaCheck, FaCalendarAlt
} from 'react-icons/fa';
import { containerVariant, fadeInLeft } from '../../lib/animations/variants';
import Input from '../auth/form/components/Input';
import SimpleButton from '../demos/buttons/SimpleButton';
import Heading from '../demos/typography/Heading';
import SimpleHeader from '../Headers/SimpleHeader/SimpleHeader';
import { KingOfTheHill } from './KingOfTheHill';
import { initialFormData, suggestedPageChips, OPTIONS } from './constants';
import { type IntakeFormData, type ButtonState } from './types';

const getButtonClass = (isSelected: boolean, disabled = false) =>
    `transition-all ${isSelected
        ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-accent-default dark:text-white'
        : 'border-gray-300 hover:border-gray-400 text-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-300'} ${disabled ? 'disabled:opacity-50' : ''}`;

const getDropzoneClass = (isDragActive: boolean) =>
    `relative border-2 border-dashed rounded-lg p-lg text-center transition-all ${isDragActive
        ? 'border-accent-default bg-accent-subtle bg-opacity-10'
        : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
    }`;

// ScreenHeader Component
const ScreenHeader = ({ title, subtitle, canSkip, onSkip, buttonState, isLastStep }: any) => (
    <motion.div variants={fadeInLeft} className="mb-lg flex justify-between items-start">
        <div>
            <Heading level="h3" color="accent">{title}</Heading>
            <p className="text-para-md text-gray-700 dark:text-gray-300 mt-sm">{subtitle}</p>
        </div>
        {canSkip && (
            <button
                onClick={onSkip}
                disabled={buttonState !== 'default'}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-para-sm underline transition-colors disabled:opacity-50"
            >
                {isLastStep ? 'Skip and Submit' : 'Skip this step'}
            </button>
        )}
    </motion.div>
);

// FileUpload Component
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
                    <span className="text-gray-700 dark:text-gray-300 text-para-sm">{(file as File).name}</span>
                    <label htmlFor="brandguide-upload" className="text-accent-default hover:text-accent-hover cursor-pointer text-para-sm">
                        Change file
                    </label>
                </div>
            ) : (
                <label htmlFor="brandguide-upload" className="cursor-pointer block">
                    <FaFileUpload className="mx-auto text-gray-400 dark:text-gray-400 text-3xl mb-xs" />
                    <p className="text-gray-700 dark:text-gray-300 text-para-md mb-xs">Drop brand guide here or click to upload</p>
                </label>
            )}
        </div>
    );
};

const IntakeForm: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [formData, setFormData] = useState<IntakeFormData>(initialFormData);
    const [buttonState, setButtonState] = useState<ButtonState>('default');
    const [vibeSelectionComplete, setVibeSelectionComplete] = useState(false);
    const [showVibeResults, setShowVibeResults] = useState(false);

    const totalScreens = 5;
    const canSkip = currentScreen > 1; // First screen cannot be skipped

    const updateForm = (updates: Partial<IntakeFormData>) =>
        setFormData(prev => ({ ...prev, ...updates }));

    const handleFile = (file: File) => {
        updateForm({ brandGuide: file });
    };

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

    const navigate = async (next: boolean) => {
        if (!next) {
            if (currentScreen > 1) {
                setCurrentScreen(currentScreen - 1);
            }
            return;
        }

        // Check if first screen is complete
        if (currentScreen === 1 && !vibeSelectionComplete) {
            return;
        }

        // Final submission - direct alert, no animation
        if (currentScreen === totalScreens) {
            alert('Intake form submitted successfully!');
            console.log('Intake data:', formData);
            return;
        }

        // Forward navigation
        setButtonState('saving');
        setTimeout(() => {
            setButtonState('saved');
            setTimeout(() => {
                if (currentScreen < totalScreens) {
                    setCurrentScreen(currentScreen + 1);
                }
                setButtonState('default');
            }, 500);
        }, 1000);
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
                        <p className="text-para-sm text-gray-600 dark:text-gray-400 mb-md">
                            Quickly select common options or type your own below.
                        </p>

                        {/* Suggested Chips */}
                        <div className="mb-md">
                            <div className="flex flex-wrap gap-sm">
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
                                                    // Remove the feature
                                                    const updatedFeatures = featuresArray.filter(f =>
                                                        !f.toLowerCase().includes(feature.toLowerCase())
                                                    );
                                                    updateForm({ keyFeatures: updatedFeatures.join('\n') });
                                                } else {
                                                    // Add the feature
                                                    featuresArray.push(feature);
                                                    updateForm({ keyFeatures: featuresArray.join('\n') });
                                                }
                                            }}
                                            className={`px-sm py-xs rounded-full text-para-xs transition-all ${isSelected
                                                ? 'bg-accent-default text-white hover:bg-accent-hover'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                }`}
                                        >
                                            {feature}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Visual Separator */}
                        <div className="relative my-md">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-para-sm">
                                <span className="px-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                    or add custom features
                                </span>
                            </div>
                        </div>

                        {/* Textarea */}
                        <div>
                            <label className="block mb-xs text-para-sm text-gray-700 dark:text-gray-200">
                                Your selected features and custom additions
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-sm">
                                You can add multiple pages or features, one per line.
                            </p>
                            <textarea
                                value={formData.keyFeatures}
                                onChange={(e) => updateForm({ keyFeatures: e.target.value })}
                                placeholder="e.g. Homepage, Blog, Booking System"
                                rows={6}
                                className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg py-sm px-md border border-gray-200 dark:border-gray-700 focus:border-accent-default outline-none transition-all resize-none"
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
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Any websites or designs you like?</label>
                        <p className="text-gray-500 dark:text-gray-400 text-para-sm mb-sm">Drop any links that inspire you</p>
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
                                            className="pl-10"
                                            variant='filled'
                                        />
                                        <FaLink className="absolute left-md top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                    {formData.inspirationUrls.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => updateForm({
                                                inspirationUrls: formData.inspirationUrls.filter((_, i) => i !== index)
                                            })}
                                            className="text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <FaTimesCircle className="text-xl" />
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
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Do you have any brand colors in mind?</label>
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
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Do you have a current site?</label>
                        <div className="relative">
                            <Input
                                type="url"
                                value={formData.currentSiteUrl}
                                onChange={(e) => updateForm({ currentSiteUrl: e.target.value })}
                                placeholder="https://your-current-site.com"
                                className="pl-10"
                                variant='filled'
                            />
                            <FaLink className="absolute left-md top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Upload brand guide (optional)</label>
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
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">When do you need this delivered?</label>
                        <div className="space-y-sm">
                            {!formData.notSureDeadline && (
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) => updateForm({ deadline: e.target.value })}
                                        className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg py-sm px-md border border-gray-200 dark:border-gray-700 focus:border-accent-default outline-none transition-all"
                                    />
                                    <FaCalendarAlt className="absolute right-md top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            )}
                            <label className="flex items-center gap-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.notSureDeadline}
                                    onChange={(e) => updateForm({ notSureDeadline: e.target.checked, deadline: e.target.checked ? '' : formData.deadline })}
                                    className="w-4 h-4 text-accent-default bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded focus:ring-accent-default"
                                />
                                <span className="text-gray-700 dark:text-gray-300 text-para-sm">Flexible timeline</span>
                            </label>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Any remaining details?</label>
                        <div className="relative">
                            <textarea
                                value={formData.additionalDetails}
                                onChange={(e) => e.target.value.length <= 500 && updateForm({ additionalDetails: e.target.value })}
                                placeholder="Special requirements, specific functionality needs, or anything else we should know..."
                                rows={5}
                                className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg py-sm px-md border border-gray-200 dark:border-gray-700 focus:border-accent-default outline-none transition-all resize-none"
                            />
                            <span className={`absolute bottom-sm right-md text-para-sm ${formData.additionalDetails.length > 450 ? 'text-yellow-400' : 'text-gray-500'
                                }`}>
                                {formData.additionalDetails.length}/500
                            </span>
                        </div>
                    </motion.div>
                </>
            )
        }
    ];

    const currentScreenData = screens[currentScreen - 1];

    // Check if we should hide the header (first screen with results showing)
    const shouldHideHeader = currentScreen === 1 && showVibeResults;

    return (
        <div className="relative min-h-screen flex bg-slate-100 dark:bg-gray-900 transition-colors">
            <div className="flex-1 flex flex-col z-10">
                <SimpleHeader />

                <div className="flex-1 flex items-center justify-center px-lg">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentScreen}
                            variants={containerVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl px-xl py-lg shadow-xl transition-colors"
                        >
                            {!shouldHideHeader && (
                                <ScreenHeader
                                    title={currentScreenData.title}
                                    subtitle={currentScreenData.subtitle}
                                    canSkip={canSkip}
                                    onSkip={() => navigate(true)}
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
                                        onClick={() => navigate(false)}
                                        disabled={buttonState !== 'default'}
                                    >
                                        Back
                                    </SimpleButton>
                                )}
                                {(currentScreen > 1 || vibeSelectionComplete) && (
                                    <SimpleButton
                                        variant="solid"
                                        size="md"
                                        onClick={() => navigate(true)}
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
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default IntakeForm;