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

// Types
interface IntakeFormData {
    tones: string[];
    keyFeatures: string;
    inspirationUrls: string[];
    colorStrategy: 'match-logo' | 'pick-for-me' | 'custom';
    customColors: string;
    deadline: string;
    notSureDeadline: boolean;
    currentSiteUrl: string;
    brandGuide: File | null;
    additionalDetails: string;
}

interface Option {
    id: string;
    label: string;
    emoji?: string;
}

// Constants
const initialFormData: IntakeFormData = {
    tones: [],
    keyFeatures: '',
    inspirationUrls: [''],
    colorStrategy: 'match-logo',
    customColors: '',
    deadline: '',
    notSureDeadline: false,
    currentSiteUrl: '',
    brandGuide: null,
    additionalDetails: '',
};

const OPTIONS = {
    tones: [
        { id: 'bold', label: 'Bold', emoji: '💪' },
        { id: 'minimal', label: 'Minimal', emoji: '⚡' },
        { id: 'fun', label: 'Fun', emoji: '🎉' },
        { id: 'elegant', label: 'Elegant', emoji: '✨' },
        { id: 'clean', label: 'Clean', emoji: '🧼' },
        { id: 'playful', label: 'Playful', emoji: '🎨' },
        { id: 'earthy', label: 'Earthy', emoji: '🌿' },
        { id: 'luxury', label: 'Luxury', emoji: '💎' },
    ],
    colorStrategies: [
        { id: 'match-logo', label: 'Match my logo' },
        { id: 'pick-for-me', label: 'Pick for me' },
        { id: 'custom', label: 'Custom' },
    ]
};

// Utility functions
const getButtonClass = (isSelected: boolean, disabled = false) =>
    `transition-all ${isSelected
        ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-accent-default dark:text-white'
        : 'border-gray-300 hover:border-gray-400 text-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-300'} ${disabled ? 'disabled:opacity-50' : ''}`;

const getDropzoneClass = (isDragActive: boolean) =>
    `relative border-2 border-dashed rounded-lg p-lg text-center transition-all ${isDragActive
        ? 'border-accent-default bg-accent-subtle bg-opacity-10'
        : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
    }`;


const ScreenHeader = ({ title, subtitle, canSkip, onSkip, buttonState, isLastStep }: any) => (
    <motion.div variants={fadeInLeft} className="mb-lg flex justify-between items-start">
        <div>
            <Heading level="h3" color="accent">{title}</Heading>
            <p className="text-para-md text-gray-700 dark:text-gray-300">{subtitle}</p>
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

const SelectionGrid = ({ options, selected, onSelect, columns = 3, multiSelect = false }: any) => (
    <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-sm`}>
        {options.map((option: Option) => (
            <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id)}
                className={`p-sm rounded-lg border-2 text-center ${getButtonClass(multiSelect ? selected.includes(option.id) : selected === option.id)}`}
            >
                {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                <span className="text-para-sm">{option.label}</span>
            </button>
        ))}
    </div>
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
    const [buttonState, setButtonState] = useState<'default' | 'saving' | 'saved'>('default');

    const totalScreens = 5;
    const canSkip = true; // All screens can be skipped in the intake form

    const updateForm = (updates: Partial<IntakeFormData>) =>
        setFormData(prev => ({ ...prev, ...updates }));

    const handleFile = (file: File) => {
        updateForm({ brandGuide: file });
    };

    const navigate = async (next: boolean) => {
        if (!next) {
            if (currentScreen > 1) {
                setCurrentScreen(currentScreen - 1);
            }
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
            subtitle: "Help us capture your vision",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">What vibe are you going for?</label>
                        <p className="text-gray-500 dark:text-gray-400 text-para-sm mb-sm">Select all that apply</p>
                        <SelectionGrid
                            options={OPTIONS.tones}
                            selected={formData.tones}
                            onSelect={(id: string) => updateForm({
                                tones: formData.tones.includes(id)
                                    ? formData.tones.filter(t => t !== id)
                                    : [...formData.tones, id]
                            })}
                            columns={4}
                            multiSelect
                        />
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
            title: "Key Features & Pages",
            subtitle: "What functionality do you need?",
            content: (
                <motion.div variants={fadeInLeft} className="mb-lg">
                    <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">List the key pages or features you need</label>
                    <textarea
                        value={formData.keyFeatures}
                        onChange={(e) => updateForm({ keyFeatures: e.target.value })}
                        placeholder="E.g., Homepage, About Us, Product catalog, Blog, Contact form, Newsletter signup, User dashboard..."
                        rows={8}
                        className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg py-sm px-md border border-gray-200 dark:border-gray-700 focus:border-accent-default outline-none transition-all resize-none"
                    />
                </motion.div>
            )
        },
        {
            title: "Style References",
            subtitle: "Share websites or designs that inspire you",
            content: (
                <motion.div variants={fadeInLeft} className="mb-lg">
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

    return (
        <div className="relative min-h-screen flex bg-slate-100 dark:bg-gray-900 transition-colors">
            <div className="flex-1 flex flex-col z-10">
                <SimpleHeader />

                <div className="flex-1 flex items-center justify-center p-lg">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentScreen}
                            variants={containerVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl px-xl py-lg shadow-xl transition-colors"
                        >
                            <ScreenHeader
                                title={currentScreenData.title}
                                subtitle={currentScreenData.subtitle}
                                canSkip={canSkip}
                                onSkip={() => navigate(true)}
                                buttonState={buttonState}
                                isLastStep={currentScreen === totalScreens}
                            />

                            {currentScreenData.content}

                            <motion.div variants={fadeInLeft} className="flex justify-between">
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
                                <SimpleButton
                                    variant="solid"
                                    size="md"
                                    onClick={() => navigate(true)}
                                    disabled={buttonState !== 'default'}
                                    className={`${currentScreen === 1 ? 'ml-auto' : ''} min-w-[150px]`}
                                >
                                    {buttonState === 'saving' && currentScreen < totalScreens ? 'Saving...' :
                                        buttonState === 'saved' && currentScreen < totalScreens ? <>Saved <FaCheck className="ml-xs" /></> :
                                            currentScreen === totalScreens ? 'Start My Project' :
                                                <>Next <FaArrowRight className="ml-xs" /></>}
                                </SimpleButton>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default IntakeForm;