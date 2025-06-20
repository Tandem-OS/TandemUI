import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCloudUploadAlt, FaArrowRight, FaCheck,
} from 'react-icons/fa';
import { containerVariant, fadeInLeft } from '../../lib/animations/variants';
import Input from '../auth/form/components/Input';
import SimpleButton from '../demos/buttons/SimpleButton';
import Heading from '../demos/typography/Heading';
import SimpleHeader from '../Headers/SimpleHeader/SimpleHeader';

// Types
interface OnboardingFormData {
    projectName: string;
    logo: string | null;
    projectType: string;
    businessDescription: string;
    budget: string;
    notReadyToShare: boolean;
    notes: string;
}

interface Option {
    id: string;
    label: string;
}

// Constants
const initialFormData: OnboardingFormData = {
    projectName: '',
    logo: null,
    projectType: '',
    businessDescription: '',
    budget: '',
    notReadyToShare: false,
    notes: '',
};

const OPTIONS = {
    projectTypes: [
        { id: 'website', label: 'Website' },
        { id: 'landing-page', label: 'Landing Page' },
        { id: 'web-app', label: 'Web App' },
        { id: 'ecommerce', label: 'E-commerce' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'other', label: 'Other' },
    ],
    budgets: [
        { id: '500-1k', label: '$500–$1,000' },
        { id: '2k-5k', label: '$2,000–$5,000' },
        { id: '5k-10k', label: '$5,000–$10,000' },
        { id: '10k+', label: '$10,000+' },
    ]
};

// Utility functions
const getButtonClass = (isSelected: boolean, disabled = false) =>
    `transition-all ${isSelected
        ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-accent-default dark:text-white'
        : 'border-gray-300 hover:border-gray-400 text-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

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

const SelectionGrid = ({ options, selected, onSelect, columns = 3, disabled = false }: any) => (
    <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-sm`}>
        {options.map((option: Option) => (
            <button
                key={option.id}
                type="button"
                onClick={() => !disabled && onSelect(option.id)}
                disabled={disabled}
                className={`p-sm rounded-lg border-2 text-center ${getButtonClass(selected === option.id, disabled)}`}
            >
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
                id="logo-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
            />
            {file ? (
                <div className="space-y-sm">
                    <img src={file} alt="Logo preview" className="mx-auto h-24 object-contain" />
                    <label htmlFor="logo-upload" className="text-accent-default hover:text-accent-hover cursor-pointer text-para-sm">
                        Change logo
                    </label>
                </div>
            ) : (
                <label htmlFor="logo-upload" className="cursor-pointer block">
                    <FaCloudUploadAlt className="mx-auto text-gray-400 dark:text-gray-400 text-5xl mb-sm" />
                    <p className="text-gray-700 dark:text-gray-300 text-para-md mb-xs">Drag and drop or click to upload</p>
                    <p className="text-gray-500 dark:text-gray-500 text-para-sm">Upload your logo (optional)</p>
                </label>
            )}
        </div>
    );
};

const OnboardingForm: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
    const [buttonState, setButtonState] = useState<'default' | 'saving' | 'saved'>('default');

    const totalScreens = 4;

    const updateForm = (updates: Partial<OnboardingFormData>) =>
        setFormData(prev => ({ ...prev, ...updates }));

    const handleFile = (file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => updateForm({ logo: e.target?.result as string });
            reader.readAsDataURL(file);
        }
    };

    const isScreenValid = (screen: number): boolean => {
        switch (screen) {
            case 1: return formData.projectName.trim() !== '';
            case 2: return formData.projectType !== '';
            case 3: return formData.businessDescription.trim() !== '';
            case 4: return formData.notReadyToShare || formData.budget !== '';
            default: return true;
        }
    };

    const navigate = async (next: boolean) => {
        if (!next) {
            if (currentScreen > 1) {
                setCurrentScreen(currentScreen - 1);
            }
            return;
        }

        // Final submission - direct alert, no animation for last screen
        if (currentScreen === totalScreens) {
            alert('Onboarding completed! You can now proceed to the detailed intake form.');
            console.log('Onboarding data:', formData);
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
            title: "Let's get started with your project",
            subtitle: "First, tell us about your project basics",
            canSkip: false,
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <Input
                            label="What's the name of your project?"
                            name="projectName"
                            value={formData.projectName}
                            onChange={(e) => updateForm({ projectName: e.target.value })}
                            placeholder="e.g., Luna Rebrand or New Landing Page"
                            variant="filled"
                            type="text"
                        />
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <FileUpload
                            file={formData.logo}
                            onFile={handleFile}
                        />
                    </motion.div>
                </>
            )
        },
        {
            title: "What type of project is this?",
            subtitle: "Choose the option that best describes your needs",
            canSkip: false,
            content: (
                <motion.div variants={fadeInLeft} className="mb-lg">
                    <SelectionGrid
                        options={OPTIONS.projectTypes}
                        selected={formData.projectType}
                        onSelect={(id: string) => updateForm({ projectType: id })}
                    />
                </motion.div>
            )
        },
        {
            title: "Tell us about your business",
            subtitle: "Help us understand what you do",
            canSkip: true,
            content: (
                <motion.div variants={fadeInLeft} className="mb-lg">
                    <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Describe your business or brand</label>
                    <textarea
                        value={formData.businessDescription}
                        onChange={(e) => updateForm({ businessDescription: e.target.value })}
                        placeholder="Tell us about your business, what you do, your target audience, and what makes you unique..."
                        rows={6}
                        className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg py-sm px-md border border-gray-200 dark:border-gray-700 focus:border-accent-default outline-none transition-all resize-none"
                    />
                </motion.div>
            )
        },
        {
            title: "Budget & Additional Notes",
            subtitle: "This helps us tailor the right solution for you",
            canSkip: true,
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Do you already have a budget range in mind?</label>
                        <SelectionGrid
                            options={OPTIONS.budgets}
                            selected={formData.budget}
                            onSelect={(id: string) => updateForm({ budget: id })}
                            columns={2}
                            disabled={formData.notReadyToShare}
                        />
                        <label className="flex items-center gap-sm cursor-pointer mt-sm">
                            <input
                                type="checkbox"
                                checked={formData.notReadyToShare}
                                onChange={(e) => updateForm({
                                    notReadyToShare: e.target.checked,
                                    budget: e.target.checked ? '' : formData.budget
                                })}
                                className="w-4 h-4 text-accent-default bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded focus:ring-accent-default"
                            />
                            <span className="text-gray-700 dark:text-gray-300 text-para-sm">Not ready to share</span>
                        </label>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-gray-700 dark:text-gray-200">Any additional notes? (optional)</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => updateForm({ notes: e.target.value })}
                            placeholder="Anything else you'd like us to know before we get started..."
                            rows={4}
                            className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg py-sm px-md border border-gray-200 dark:border-gray-700 focus:border-accent-default outline-none transition-all resize-none"
                        />
                    </motion.div>
                </>
            )
        }
    ];

    const currentScreenData = screens[currentScreen - 1];

    return (
        <div className="relative min-h-screen flex bg-slate-100 dark:bg-gray-900 transition-colors">
            <div className="flex-1 flex flex-col p-lg z-10">

                <SimpleHeader />

                <div className="flex-1 flex items-center justify-center">
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
                                canSkip={currentScreenData.canSkip}
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
                                    disabled={buttonState !== 'default' || !isScreenValid(currentScreen)}
                                    className={`${currentScreen === 1 ? 'ml-auto' : ''} min-w-[150px]`}
                                >
                                    {buttonState === 'saving' ? 'Saving...' :
                                        buttonState === 'saved' ? <>Saved <FaCheck className="ml-xs" /></> :
                                            currentScreen === totalScreens ? 'Submit Now' :
                                                <>Next <FaArrowRight className="ml-xs" /></>}
                                </SimpleButton>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div >
    );
};

export default OnboardingForm;