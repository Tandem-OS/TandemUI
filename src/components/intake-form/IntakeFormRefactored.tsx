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
    projectName: string;
    logo: string | null;
    businessType: string;
    otherBusinessType: string;
    mainGoal: string;
    otherGoal: string;
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

// Constants
const initialFormData: FormData = {
    projectName: '',
    logo: null,
    businessType: '',
    otherBusinessType: '',
    mainGoal: '',
    otherGoal: '',
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

const OPTIONS = {
    goals: [
        { id: 'sell', label: 'Sell products', icon: <FaShoppingCart /> },
        { id: 'leads', label: 'Get leads', icon: <FaUsers /> },
        { id: 'appointments', label: 'Book appointments', icon: <FaCalendarCheck /> },
        { id: 'showcase', label: 'Showcase work', icon: <FaBriefcase /> },
        { id: 'community', label: 'Build community', icon: <FaHandshake /> },
        { id: 'other', label: 'Other', icon: <FaPencilAlt /> },
    ],
    businessTypes: [
        { id: 'wellness', label: 'Health Coach' },
        { id: 'saas', label: 'SaaS tool' },
        { id: 'clothing', label: 'Clothing brand' },
        { id: 'events', label: 'Event planner' },
        { id: 'restaurant', label: 'Restaurant' },
        { id: 'other', label: 'Other' },
    ],
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
    budgets: [
        { id: 'under1k', label: 'Under $1K' },
        { id: '1k-5k', label: '$1K–$5K' },
        { id: '5k-10k', label: '$5K–$10K' },
        { id: '10k+', label: '$10K+' },
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
        ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-white'
        : 'border-gray-600 hover:border-gray-500 text-gray-300'} ${disabled ? 'disabled:opacity-50' : ''}`;

const getDropzoneClass = (isDragActive: boolean) =>
    `relative border-2 border-dashed rounded-lg p-lg text-center transition-all ${isDragActive ? 'border-accent-default bg-accent-subtle bg-opacity-10' : 'border-gray-600 hover:border-gray-500'
    }`;

// Components
const ScreenHeader = ({ title, subtitle, canSkip, onSkip, buttonState }: any) => (
    <motion.div variants={fadeInLeft} className="mb-lg flex justify-between items-start">
        <div>
            <Heading level="h3" color="accent">{title}</Heading>
            <p className="text-para-md text-gray-300">{subtitle}</p>
        </div>
        {canSkip && (
            <button
                onClick={onSkip}
                disabled={buttonState !== 'default'}
                className="text-gray-400 hover:text-gray-200 text-para-sm underline transition-colors disabled:opacity-50"
            >
                {title === 'Final Details' ? 'Skip & Submit' : 'Skip this step'}
            </button>
        )}
    </motion.div>
);

const SelectionGrid = ({ options, selected, onSelect, columns = 3, multiSelect = false, showIcons = false }: any) => (
    <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-sm`}>
        {options.map((option: Option) => (
            <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id)}
                className={`p-${showIcons ? 'md' : 'sm'} rounded-lg border-2 ${showIcons ? 'flex flex-col items-center gap-xs' : 'text-center'} ${getButtonClass(multiSelect ? selected.includes(option.id) : selected === option.id)
                    }`}
            >
                {showIcons && option.icon && <span className="text-2xl">{option.icon}</span>}
                {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                <span className="text-para-sm">{option.label}</span>
            </button>
        ))}
    </div>
);

const OtherInput = ({ show, value, onChange, placeholder }: any) =>
    show && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-sm">
            <Input
                label=""
                name="other"
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                variant="filled"
                className="bg-gray-900"
            />
        </motion.div>
    );

const FileUpload = ({ type, file, onFile, accept, icon: Icon, text, subtext }: any) => {
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
        if (e.dataTransfer.files?.[0]) onFile(e.dataTransfer.files[0], type);
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
                id={`${type}-upload`}
                className="hidden"
                accept={accept}
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0], type)}
            />
            {file ? (
                type === 'logo' ? (
                    <div className="space-y-sm">
                        <img src={file} alt="Logo preview" className="mx-auto h-24 object-contain" />
                        <label htmlFor={`${type}-upload`} className="text-accent-default hover:text-accent-hover cursor-pointer text-para-sm">
                            Change logo
                        </label>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-para-sm">{(file as File).name}</span>
                        <label htmlFor={`${type}-upload`} className="text-accent-default hover:text-accent-hover cursor-pointer text-para-sm">
                            Change file
                        </label>
                    </div>
                )
            ) : (
                <label htmlFor={`${type}-upload`} className="cursor-pointer block">
                    <Icon className={`mx-auto text-gray-400 ${type === 'logo' ? 'text-5xl mb-sm' : 'text-3xl mb-xs'}`} />
                    <p className="text-gray-300 text-para-md mb-xs">{text}</p>
                    {subtext && <p className="text-gray-500 text-para-sm">{subtext}</p>}
                </label>
            )}
        </div>
    );
};

const IntakeFormRefactored: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [buttonState, setButtonState] = useState<'default' | 'saving' | 'saved'>('default');

    const totalScreens = 6;
    const canSkip = currentScreen > 2;

    const updateForm = (updates: Partial<FormData>) =>
        setFormData(prev => ({ ...prev, ...updates }));

    const handleFile = (file: File, type: 'logo' | 'brandGuide') => {
        if (type === 'logo' && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => updateForm({ logo: e.target?.result as string });
            reader.readAsDataURL(file);
        } else if (type === 'brandGuide') {
            updateForm({ brandGuide: file });
        }
    };

    const isScreenValid = (screen: number): boolean => {
        switch (screen) {
            case 1: return formData.projectName.trim() !== '';
            case 2:
                const businessValid = formData.businessType !== '' &&
                    (formData.businessType !== 'other' || formData.otherBusinessType.trim() !== '');
                const goalValid = formData.mainGoal !== '' &&
                    (formData.mainGoal !== 'other' || formData.otherGoal.trim() !== '');
                return businessValid && goalValid;
            default: return true;
        }
    };

    const navigate = async (next: boolean, skip = false) => {
        // Back navigation - instant, no animation
        if (!next) {
            if (currentScreen > 1) {
                setCurrentScreen(currentScreen - 1);
            }
            return;
        }

        // Final submission - direct alert, no animation
        if (currentScreen === totalScreens && !skip) {
            alert('Form submitted successfully!');
            console.log('Submitting:', formData);
            return;
        }

        // Forward navigation with animation (except final submission)
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
            title: "Let's start with the basics",
            subtitle: "Quick snapshot to understand your project",
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
                            className="bg-gray-900"
                            type="text"
                        />
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-xs text-para-sm text-gray-200">Upload Logo (optional)</label>
                        <FileUpload
                            type="logo"
                            file={formData.logo}
                            onFile={handleFile}
                            accept="image/*"
                            icon={FaCloudUploadAlt}
                            text="Drag and drop or click to upload"
                            subtext="Used to influence tone, palette, and first impression"
                        />
                    </motion.div>
                </>
            )
        },
        {
            title: "Tell us more about your project",
            subtitle: "This helps us tailor the perfect solution",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-gray-200">What are you building?</label>
                        <SelectionGrid
                            options={OPTIONS.businessTypes}
                            selected={formData.businessType}
                            onSelect={(id: string) => updateForm({ businessType: id })}
                        />
                        <OtherInput
                            show={formData.businessType === 'other'}
                            value={formData.otherBusinessType}
                            onChange={(e: any) => updateForm({ otherBusinessType: e.target.value })}
                            placeholder="Please specify..."
                        />
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-gray-200">Main goal of this project?</label>
                        <SelectionGrid
                            options={OPTIONS.goals}
                            selected={formData.mainGoal}
                            onSelect={(id: string) => updateForm({ mainGoal: id })}
                            showIcons
                        />
                        <OtherInput
                            show={formData.mainGoal === 'other'}
                            value={formData.otherGoal}
                            onChange={(e: any) => updateForm({ otherGoal: e.target.value })}
                            placeholder="Please specify..."
                        />
                    </motion.div>
                </>
            )
        },
        {
            title: "Timeline & Budget",
            subtitle: "Optional but helps us plan better",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-gray-200">When do you need this delivered?</label>
                        <div className="space-y-sm">
                            {!formData.notSureDate && (
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={formData.launchDate}
                                        onChange={(e) => updateForm({ launchDate: e.target.value })}
                                        className="w-full bg-gray-900 text-white rounded-lg py-sm px-md border border-gray-700 focus:border-accent-default outline-none transition-all"
                                    />
                                    <FaCalendarAlt className="absolute right-md top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            )}
                            <label className="flex items-center gap-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.notSureDate}
                                    onChange={(e) => updateForm({ notSureDate: e.target.checked, launchDate: e.target.checked ? '' : formData.launchDate })}
                                    className="w-4 h-4 text-accent-default bg-gray-900 border-gray-600 rounded focus:ring-accent-default"
                                />
                                <span className="text-gray-300 text-para-sm">Not sure yet</span>
                            </label>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-gray-200">Do you have a budget or range in mind?</label>
                        <SelectionGrid
                            options={OPTIONS.budgets}
                            selected={formData.budget}
                            onSelect={(id: string) => updateForm({ budget: id, needHelpScoping: false })}
                            columns={2}
                        />
                        <label className="flex items-center gap-sm cursor-pointer mt-sm">
                            <input
                                type="checkbox"
                                checked={formData.needHelpScoping}
                                onChange={(e) => updateForm({ needHelpScoping: e.target.checked, budget: e.target.checked ? '' : formData.budget })}
                                className="w-4 h-4 text-accent-default bg-gray-900 border-gray-600 rounded focus:ring-accent-default"
                            />
                            <span className="text-gray-300 text-para-sm">Need help scoping</span>
                        </label>
                    </motion.div>
                </>
            )
        },
        {
            title: "Visual Direction",
            subtitle: "Help us capture your vision",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-gray-200">What tone or vibe are you going for?</label>
                        <p className="text-gray-400 text-para-sm mb-sm">Select all that apply</p>
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
                        <label className="block mb-sm text-para-sm text-gray-200">Do you have any brand colors or vibes in mind?</label>
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
                                        className='bg-gray-900'
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
                        <label className="block mb-sm text-para-sm text-gray-200">Do you have a current site?</label>
                        <div className="relative">
                            <Input
                                type="url"
                                value={formData.currentSiteUrl}
                                onChange={(e) => updateForm({ currentSiteUrl: e.target.value })}
                                placeholder="https://your-current-site.com"
                                className="bg-gray-900 pl-10"
                                variant='filled'
                            />
                            <FaLink className="absolute left-md top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-gray-200">Upload brand guide (optional)</label>
                        <FileUpload
                            type="brandGuide"
                            file={formData.brandGuide}
                            onFile={handleFile}
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                            icon={FaFileUpload}
                            text="Drop brand guide here or click to upload"
                        />
                    </motion.div>
                </>
            )
        },
        {
            title: "Final Details",
            subtitle: "Anything else to help us nail it?",
            content: (
                <>
                    <motion.div variants={fadeInLeft} className="mb-md">
                        <label className="block mb-sm text-para-sm text-gray-200">Any websites or designs you like?</label>
                        <p className="text-gray-400 text-para-sm mb-sm">Drop any links that inspire you</p>
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
                                            className="bg-gray-900 pl-10"
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
                        <label className="block mb-sm text-para-sm text-gray-200">Anything else we should know?</label>
                        <div className="relative">
                            <textarea
                                value={formData.additionalInfo}
                                onChange={(e) => e.target.value.length <= 300 && updateForm({ additionalInfo: e.target.value })}
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
            )
        }
    ];

    const currentScreenData = screens[currentScreen - 1];

    return (
        <div className="relative min-h-screen flex bg-gray-900">
            <div className="flex-1 flex flex-col p-lg z-10">
                <div className="mb-5 lg:mb-0">
                    <img src="/images/logo.png" alt="Logo" className="w-[150px]" />
                </div>

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
                            <ScreenHeader
                                title={currentScreenData.title}
                                subtitle={currentScreenData.subtitle}
                                canSkip={canSkip}
                                onSkip={() => navigate(true, true)}
                                buttonState={buttonState}
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

export default IntakeFormRefactored;