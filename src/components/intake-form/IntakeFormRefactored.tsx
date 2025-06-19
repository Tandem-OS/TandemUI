import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaLink, FaFileUpload, FaPlusCircle, FaTimesCircle,
    FaCloudUploadAlt, FaShoppingCart, FaUsers, FaCalendarCheck,
    FaBriefcase, FaPencilAlt, FaArrowRight, FaCheck, FaHandshake,
    FaCalendarAlt
} from 'react-icons/fa';
import { containerVariant, fadeInLeft } from '../../lib/animations/variants';
import Input from '../auth/form/components/Input';
import SimpleButton from '../demos/buttons/SimpleButton';
import Heading from '../demos/typography/Heading';

// Types
interface FormData {
    // Mandatory fields
    projectName: string;
    logo: string | null;
    businessType: string;
    otherBusinessType: string;
    mainGoal: string;
    otherGoal: string;

    // Optional fields
    launchDate: string;
    notSureDate: boolean;
    budget: string;
    needHelpScoping: boolean;
    tones: string[];
    colorStrategy: 'match-logo' | 'pick-for-me' | 'custom';
    customColors: string;
    currentSiteUrl: string;
    brandGuide: File | null;
    inspirationUrls: string[];
    additionalInfo: string;
}

interface Option {
    id: string;
    label: string;
    icon?: React.ReactNode;
    emoji?: string;
}

// Form data structure
const initialFormData: FormData = {
    // Mandatory fields
    projectName: '',
    logo: null,
    businessType: '',
    otherBusinessType: '',
    mainGoal: '',
    otherGoal: '',

    // Optional fields
    launchDate: '',
    notSureDate: false,
    budget: '',
    needHelpScoping: false,
    tones: [],
    colorStrategy: 'match-logo',
    customColors: '',
    currentSiteUrl: '',
    brandGuide: null,
    inspirationUrls: [''],
    additionalInfo: '',
};

// Form options
const goalOptions: Option[] = [
    { id: 'sell', label: 'Sell products', icon: <FaShoppingCart /> },
    { id: 'leads', label: 'Get leads', icon: <FaUsers /> },
    { id: 'appointments', label: 'Book appointments', icon: <FaCalendarCheck /> },
    { id: 'showcase', label: 'Showcase work', icon: <FaBriefcase /> },
    { id: 'community', label: 'Build community', icon: <FaHandshake /> },
    { id: 'other', label: 'Other', icon: <FaPencilAlt /> },
];

const businessTypeOptions: Option[] = [
    { id: 'wellness', label: 'Wellness coach' },
    { id: 'saas', label: 'SaaS tool' },
    { id: 'clothing', label: 'Clothing brand' },
    { id: 'events', label: 'Event planner' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'other', label: 'Other' },
];

const toneOptions: Option[] = [
    { id: 'bold', label: 'Bold', emoji: '💪' },
    { id: 'minimal', label: 'Minimal', emoji: '⚡' },
    { id: 'fun', label: 'Fun', emoji: '🎉' },
    { id: 'elegant', label: 'Elegant', emoji: '✨' },
    { id: 'clean', label: 'Clean', emoji: '🧼' },
    { id: 'playful', label: 'Playful', emoji: '🎨' },
    { id: 'earthy', label: 'Earthy', emoji: '🌿' },
    { id: 'luxury', label: 'Luxury', emoji: '💎' },
];

const budgetOptions: Option[] = [
    { id: 'under1k', label: 'Under $1K' },
    { id: '1k-5k', label: '$1K–$5K' },
    { id: '5k-10k', label: '$5K–$10K' },
    { id: '10k+', label: '$10K+' },
];

const IntakeFormRefactored: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [buttonState, setButtonState] = useState<'default' | 'saving' | 'saved'>('default');
    const totalScreens = 6;

    // Validation for each screen
    const isScreenValid = (screen: number): boolean => {
        switch (screen) {
            case 1:
                // Project name is required, logo is optional
                return formData.projectName.trim() !== '';
            case 2:
                // Business type and main goal are required
                const businessTypeValid = formData.businessType !== '' &&
                    (formData.businessType !== 'other' || formData.otherBusinessType.trim() !== '');
                const mainGoalValid = formData.mainGoal !== '' &&
                    (formData.mainGoal !== 'other' || formData.otherGoal.trim() !== '');
                return businessTypeValid && mainGoalValid;
            default:
                // All other screens are optional
                return true;
        }
    };


    // Handle file operations
    const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: 'logo' | 'brandGuide'): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0], type);
        }
    };

    const handleFile = (file: File, type: 'logo' | 'brandGuide'): void => {
        if (type === 'logo' && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({ ...prev, logo: e.target?.result as string }));
            };
            reader.readAsDataURL(file);
        } else if (type === 'brandGuide') {
            setFormData(prev => ({ ...prev, brandGuide: file }));
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'brandGuide'): void => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0], type);
        }
    };

    // Navigation
    const handleNext = async (): Promise<void> => {
        if (currentScreen < totalScreens) {
            setButtonState('saving');
            setTimeout(() => {
                setButtonState('saved');
                setTimeout(() => {
                    setCurrentScreen(currentScreen + 1);
                    setButtonState('default');
                }, 500);
            }, 1000);
        } else {
            handleSubmit();
        }
    };

    const handleBack = (): void => {
        if (currentScreen > 1) {
            setCurrentScreen(currentScreen - 1);
        }
    };

    const handleSkip = async (): Promise<void> => {
        setButtonState('saving');
        setTimeout(() => {
            setButtonState('saved');
            setTimeout(() => {
                if (currentScreen < totalScreens) {
                    setCurrentScreen(currentScreen + 1);
                } else {
                    handleSubmit();
                }
                setButtonState('default');
            }, 500);
        }, 1000);
    };

    const handleSubmit = (): void => {
        console.log('Submitting form data:', formData);
        // Handle submission logic here
        alert('Form submitted successfully!');
    };

    // URL handlers
    const handleUrlChange = (index: number, value: string): void => {
        const newUrls = [...formData.inspirationUrls];
        newUrls[index] = value;
        setFormData(prev => ({ ...prev, inspirationUrls: newUrls }));
    };

    const addUrlField = (): void => {
        if (formData.inspirationUrls.length < 5) {
            setFormData(prev => ({
                ...prev,
                inspirationUrls: [...prev.inspirationUrls, '']
            }));
        }
    };

    const removeUrlField = (index: number): void => {
        const newUrls = formData.inspirationUrls.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            inspirationUrls: newUrls.length === 0 ? [''] : newUrls
        }));
    };

    // Button content
    const getButtonContent = (): React.ReactNode => {
        switch (buttonState) {
            case 'saving':
                return 'Saving...';
            case 'saved':
                return <>Saved <FaCheck className="ml-xs" /></>;
            default:
                return currentScreen === totalScreens
                    ? 'Start My Project'
                    : <>Next <FaArrowRight className="ml-xs" /></>;
        }
    };

    // Check if current screen can be skipped
    const canSkip = currentScreen > 2; // After first 4 mandatory fields (2 screens)

    return (
        <div className="relative min-h-screen flex bg-gray-900">
            <div className="flex-1 flex flex-col p-lg z-10">
                {/* Logo */}
                <div className="mb-lg">
                    <img src="/images/logo.png" alt="Logo" className="w-[150px]" />
                </div>

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentScreen}
                            variants={containerVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl px-xl py-lg shadow-xl"
                        >
                            {/* Screen 1: Project Name + Logo */}
                            {currentScreen === 1 && (
                                <>
                                    <motion.div variants={fadeInLeft} className="mb-lg">
                                        <Heading level="h3" color="accent">
                                            Let's start with the basics
                                        </Heading>
                                        <p className="text-para-md text-gray-300">
                                            Quick snapshot to understand your project
                                        </p>
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-md">
                                        <Input
                                            label="What's the name of your project?"
                                            name="projectName"
                                            type="text"
                                            value={formData.projectName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                                            placeholder="e.g., Luna Rebrand or New Landing Page"
                                            variant="filled"
                                            className="bg-gray-900"
                                        />
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-lg">
                                        <label className="block mb-xs text-para-sm text-gray-200">
                                            Upload Logo (optional)
                                        </label>
                                        <div
                                            className={`relative border-2 border-dashed rounded-lg p-lg text-center transition-all ${dragActive ? 'border-accent-default bg-accent-subtle bg-opacity-10' : 'border-gray-600 hover:border-gray-500'
                                                }`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={(e) => handleDrop(e, 'logo')}
                                        >
                                            <input
                                                type="file"
                                                id="logo-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleFileInput(e, 'logo')}
                                            />
                                            {formData.logo ? (
                                                <div className="space-y-sm">
                                                    <img src={formData.logo} alt="Logo preview" className="mx-auto h-24 object-contain" />
                                                    <label htmlFor="logo-upload" className="text-accent-default hover:text-accent-hover cursor-pointer text-para-sm">
                                                        Change logo
                                                    </label>
                                                </div>
                                            ) : (
                                                <label htmlFor="logo-upload" className="cursor-pointer">
                                                    <FaCloudUploadAlt className="mx-auto text-gray-400 text-5xl mb-sm" />
                                                    <p className="text-gray-300 text-para-md mb-xs">Drag and drop or click to upload</p>
                                                    <p className="text-gray-500 text-para-sm">Used to influence tone, palette, and first impression</p>
                                                </label>
                                            )}
                                        </div>
                                    </motion.div>
                                </>
                            )}

                            {/* Screen 2: Business Type + Main Goal */}
                            {currentScreen === 2 && (
                                <>
                                    <motion.div variants={fadeInLeft} className="mb-lg">
                                        <Heading level="h3" color="accent">
                                            Tell us more about your project
                                        </Heading>
                                        <p className="text-para-md text-gray-300">
                                            This helps us tailor the perfect solution
                                        </p>
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-md">
                                        <label className="block mb-sm text-para-sm text-gray-200">
                                            What are you building?
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-sm">
                                            {businessTypeOptions.map((type) => (
                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, businessType: type.id }))}
                                                    className={`p-md rounded-lg border-2 transition-all text-center ${formData.businessType === type.id
                                                            ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-white'
                                                            : 'border-gray-600 hover:border-gray-500 text-gray-300'
                                                        }`}
                                                >
                                                    <span className="text-para-sm">{type.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {formData.businessType === 'other' && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-sm">
                                                <Input
                                                    label=""
                                                    name="otherBusinessType"
                                                    type="text"
                                                    value={formData.otherBusinessType}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, otherBusinessType: e.target.value }))}
                                                    placeholder="Please specify..."
                                                    variant="filled"
                                                    className="bg-gray-900"
                                                />
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-lg">
                                        <label className="block mb-sm text-para-sm text-gray-200">
                                            Main goal of this project?
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-sm">
                                            {goalOptions.map((goal) => (
                                                <button
                                                    key={goal.id}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, mainGoal: goal.id }))}
                                                    className={`p-md rounded-lg border-2 transition-all flex flex-col items-center gap-xs ${formData.mainGoal === goal.id
                                                            ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-white'
                                                            : 'border-gray-600 hover:border-gray-500 text-gray-300'
                                                        }`}
                                                >
                                                    <span className="text-2xl">{goal.icon}</span>
                                                    <span className="text-para-sm">{goal.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {formData.mainGoal === 'other' && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-sm">
                                                <Input
                                                    label=""
                                                    name="otherGoal"
                                                    type="text"
                                                    value={formData.otherGoal}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, otherGoal: e.target.value }))}
                                                    placeholder="Please specify..."
                                                    variant="filled"
                                                    className="bg-gray-900"
                                                />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </>
                            )}

                            {/* Screen 3: Launch Date + Budget */}
                            {currentScreen === 3 && (
                                <>
                                    <motion.div variants={fadeInLeft} className="mb-lg flex justify-between items-start">
                                        <div>
                                            <Heading level="h3" color="accent">
                                                Timeline & Budget
                                            </Heading>
                                            <p className="text-para-md text-gray-300">
                                                Optional but helps us plan better
                                            </p>
                                        </div>
                                        {canSkip && (
                                            <button
                                                onClick={handleSkip}
                                                disabled={buttonState !== 'default'}
                                                className="text-gray-400 hover:text-gray-200 text-para-sm underline transition-colors disabled:opacity-50"
                                            >
                                                Skip this step
                                            </button>
                                        )}
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-md">
                                        <label className="block mb-sm text-para-sm text-gray-200">
                                            When do you need this delivered?
                                        </label>
                                        <div className="space-y-sm">
                                            {!formData.notSureDate && (
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        value={formData.launchDate}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, launchDate: e.target.value }))}
                                                        className="w-full bg-gray-900 text-white rounded-lg py-sm px-md border border-gray-700 focus:border-accent-default outline-none transition-all"
                                                    />
                                                    <FaCalendarAlt className="absolute right-md top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            )}
                                            <label className="flex items-center gap-sm cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.notSureDate}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        notSureDate: e.target.checked,
                                                        launchDate: e.target.checked ? '' : prev.launchDate
                                                    }))}
                                                    className="w-4 h-4 text-accent-default bg-gray-900 border-gray-600 rounded focus:ring-accent-default"
                                                />
                                                <span className="text-gray-300 text-para-sm">Not sure yet</span>
                                            </label>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-lg">
                                        <label className="block mb-sm text-para-sm text-gray-200">
                                            Do you have a budget or range in mind?
                                        </label>
                                        <div className="grid grid-cols-2 gap-sm mb-sm">
                                            {budgetOptions.map((option) => (
                                                <button
                                                    key={option.id}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, budget: option.id, needHelpScoping: false }))}
                                                    disabled={formData.needHelpScoping}
                                                    className={`p-sm rounded-lg border-2 transition-all ${formData.budget === option.id && !formData.needHelpScoping
                                                            ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-white'
                                                            : 'border-gray-600 hover:border-gray-500 text-gray-300 disabled:opacity-50'
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                        <label className="flex items-center gap-sm cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.needHelpScoping}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    needHelpScoping: e.target.checked,
                                                    budget: e.target.checked ? '' : prev.budget
                                                }))}
                                                className="w-4 h-4 text-accent-default bg-gray-900 border-gray-600 rounded focus:ring-accent-default"
                                            />
                                            <span className="text-gray-300 text-para-sm">Need help scoping</span>
                                        </label>
                                    </motion.div>
                                </>
                            )}

                            {/* Screen 4: Tone/Vibe + Brand Colors */}
                            {currentScreen === 4 && (
                                <>
                                    <motion.div variants={fadeInLeft} className="mb-lg flex justify-between items-start">
                                        <div>
                                            <Heading level="h3" color="accent">
                                                Visual Direction
                                            </Heading>
                                            <p className="text-para-md text-gray-300">
                                                Help us capture your vision
                                            </p>
                                        </div>
                                        {canSkip && (
                                            <button
                                                onClick={handleSkip}
                                                disabled={buttonState !== 'default'}
                                                className="text-gray-400 hover:text-gray-200 text-para-sm underline transition-colors disabled:opacity-50"
                                            >
                                                Skip this step
                                            </button>
                                        )}
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-md">
                                        <label className="block mb-sm text-para-sm text-gray-200">
                                            What tone or vibe are you going for?
                                        </label>
                                        <p className="text-gray-400 text-para-sm mb-sm">Select all that apply</p>
                                        <div className="grid grid-cols-3 md:grid-cols-4 gap-sm">
                                            {toneOptions.map((tone) => (
                                                <button
                                                    key={tone.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            tones: prev.tones.includes(tone.id)
                                                                ? prev.tones.filter(t => t !== tone.id)
                                                                : [...prev.tones, tone.id]
                                                        }));
                                                    }}
                                                    className={`p-sm rounded-lg border-2 transition-all flex flex-col items-center gap-xs ${formData.tones.includes(tone.id)
                                                            ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-white'
                                                            : 'border-gray-600 hover:border-gray-500 text-gray-300'
                                                        }`}
                                                >
                                                    <span className="text-2xl">{tone.emoji}</span>
                                                    <span className="text-para-sm">{tone.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-lg">
                                        <label className="block mb-sm text-para-sm text-gray-200">
                                            Do you have any brand colors or vibes in mind?
                                        </label>
                                        <div className="space-y-sm">
                                            <div className="flex gap-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, colorStrategy: 'match-logo' }))}
                                                    className={`flex-1 p-sm rounded-lg border-2 transition-all ${formData.colorStrategy === 'match-logo'
                                                            ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-white'
                                                            : 'border-gray-600 hover:border-gray-500 text-gray-300'
                                                        }`}
                                                >
                                                    Match my logo
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, colorStrategy: 'pick-for-me' }))}
                                                    className={`flex-1 p-sm rounded-lg border-2 transition-all ${formData.colorStrategy === 'pick-for-me'
                                                            ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-white'
                                                            : 'border-gray-600 hover:border-gray-500 text-gray-300'
                                                        }`}
                                                >
                                                    Pick for me
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, colorStrategy: 'custom' }))}
                                                    className={`flex-1 p-sm rounded-lg border-2 transition-all ${formData.colorStrategy === 'custom'
                                                            ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-white'
                                                            : 'border-gray-600 hover:border-gray-500 text-gray-300'
                                                        }`}
                                                >
                                                    Custom
                                                </button>
                                            </div>
                                            {formData.colorStrategy === 'custom' && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                                    <input
                                                        type="text"
                                                        value={formData.customColors}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, customColors: e.target.value }))}
                                                        placeholder="Enter hex values or color names (e.g., #3B82F6, navy, coral)"
                                                        className="w-full bg-gray-900 text-white rounded-lg py-sm px-md border border-gray-700 focus:border-accent-default outline-none transition-all"
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                </>
                            )}

                            {/* Screen 5: Current Site + Brand Guide */}
                            {currentScreen === 5 && (
                                <>
                                    <motion.div variants={fadeInLeft} className="mb-lg flex justify-between items-start">
                                        <div>
                                            <Heading level="h3" color="accent">
                                                Existing Assets
                                            </Heading>
                                            <p className="text-para-md text-gray-300">
                                                Share what you already have
                                            </p>
                                        </div>
                                        {canSkip && (
                                            <button
                                                onClick={handleSkip}
                                                disabled={buttonState !== 'default'}
                                                className="text-gray-400 hover:text-gray-200 text-para-sm underline transition-colors disabled:opacity-50"
                                            >
                                                Skip this step
                                            </button>
                                        )}
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-md">
                                        <label className="block mb-sm text-para-sm text-gray-200">
                                            Do you have a current site?
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="url"
                                                value={formData.currentSiteUrl}
                                                onChange={(e) => setFormData(prev => ({ ...prev, currentSiteUrl: e.target.value }))}
                                                placeholder="https://your-current-site.com"
                                                className="w-full bg-gray-900 text-white rounded-lg py-sm px-md pl-10 border border-gray-700 focus:border-accent-default outline-none transition-all"
                                            />
                                            <FaLink className="absolute left-md top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-lg">
                                        <label className="block mb-sm text-para-sm text-gray-200">
                                            Upload brand guide (optional)
                                        </label>
                                        <div
                                            className={`relative border-2 border-dashed rounded-lg p-md text-center transition-all ${dragActive ? 'border-accent-default bg-accent-subtle bg-opacity-10' : 'border-gray-600 hover:border-gray-500'
                                                }`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={(e) => handleDrop(e, 'brandGuide')}
                                        >
                                            <input
                                                type="file"
                                                id="brand-guide-upload"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx,.ppt,.pptx"
                                                onChange={(e) => handleFileInput(e, 'brandGuide')}
                                            />
                                            {formData.brandGuide ? (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-300 text-para-sm">{formData.brandGuide.name}</span>
                                                    <label htmlFor="brand-guide-upload" className="text-accent-default hover:text-accent-hover cursor-pointer text-para-sm">
                                                        Change file
                                                    </label>
                                                </div>
                                            ) : (
                                                <label htmlFor="brand-guide-upload" className="cursor-pointer block">
                                                    <FaFileUpload className="mx-auto text-gray-400 text-3xl mb-xs" />
                                                    <p className="text-gray-300 text-para-sm">Drop brand guide here or click to upload</p>
                                                </label>
                                            )}
                                        </div>
                                    </motion.div>
                                </>
                            )}

                            {/* Screen 6: Inspiration URLs + Additional Info */}
                            {currentScreen === 6 && (
                                <>
                                    <motion.div variants={fadeInLeft} className="mb-lg flex justify-between items-start">
                                        <div>
                                            <Heading level="h3" color="accent">
                                                Final Details
                                            </Heading>
                                            <p className="text-para-md text-gray-300">
                                                Anything else to help us nail it?
                                            </p>
                                        </div>
                                        {canSkip && (
                                            <button
                                                onClick={handleSkip}
                                                disabled={buttonState !== 'default'}
                                                className="text-gray-400 hover:text-gray-200 text-para-sm underline transition-colors disabled:opacity-50"
                                            >
                                                Skip & Submit
                                            </button>
                                        )}
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-md">
                                        <label className="block mb-sm text-para-sm text-gray-200">
                                            Any websites or designs you like?
                                        </label>
                                        <p className="text-gray-400 text-para-sm mb-sm">
                                            Drop any links that inspire you
                                        </p>
                                        <div className="space-y-xs">
                                            {formData.inspirationUrls.map((url, index) => (
                                                <div key={index} className="flex gap-xs">
                                                    <div className="relative flex-1">
                                                        <input
                                                            type="url"
                                                            value={url}
                                                            onChange={(e) => handleUrlChange(index, e.target.value)}
                                                            placeholder="https://inspiration-site.com"
                                                            className="w-full bg-gray-900 text-white rounded-lg py-sm px-md pl-10 border border-gray-700 focus:border-accent-default outline-none transition-all"
                                                        />
                                                        <FaLink className="absolute left-md top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    </div>
                                                    {formData.inspirationUrls.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeUrlField(index)}
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
                                                    onClick={addUrlField}
                                                    className="flex items-center gap-xs text-accent-default hover:text-accent-hover text-para-sm transition-colors"
                                                >
                                                    <FaPlusCircle />
                                                    Add another link
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>

                                    <motion.div variants={fadeInLeft} className="mb-lg">
                                        <label className="block mb-sm text-para-sm text-gray-200">
                                            Anything else we should know?
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                value={formData.additionalInfo}
                                                onChange={(e) => {
                                                    if (e.target.value.length <= 300) {
                                                        setFormData(prev => ({ ...prev, additionalInfo: e.target.value }));
                                                    }
                                                }}
                                                placeholder="Special requirements, timeline constraints, or anything else helpful..."
                                                rows={4}
                                                className="w-full bg-gray-900 text-white rounded-lg py-sm px-md border border-gray-700 focus:border-accent-default outline-none transition-all resize-none"
                                            />
                                            <span className={`absolute bottom-sm right-md text-para-sm ${formData.additionalInfo.length > 250 ? 'text-yellow-400' : 'text-gray-500'
                                                }`}>
                                                {formData.additionalInfo.length}/300
                                            </span>
                                        </div>
                                    </motion.div>
                                </>
                            )}

                            {/* Navigation */}
                            <motion.div variants={fadeInLeft} className="flex justify-between">
                                {currentScreen > 1 && (
                                    <SimpleButton
                                        variant="outline"
                                        size="md"
                                        onClick={handleBack}
                                        disabled={buttonState !== 'default'}
                                    >
                                        Back
                                    </SimpleButton>
                                )}
                                <SimpleButton
                                    variant="solid"
                                    size="md"
                                    onClick={handleNext}
                                    disabled={buttonState !== 'default' || !isScreenValid(currentScreen)}
                                    className={`${currentScreen === 1 ? 'ml-auto' : ''} min-w-[150px]`}
                                >
                                    {getButtonContent()}
                                </SimpleButton>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default IntakeFormRefactored;