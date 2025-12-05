import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCloudUploadAlt, FaArrowRight, FaCheck,
} from 'react-icons/fa';
import { containerVariant, fadeInLeft } from '@/lib/animations/variants.ts';
import Input from '@/components/auth/form/components/Input.tsx';
import SimpleButton from '@/components/demos/buttons/SimpleButton.tsx';
import Heading from '@/components/demos/typography/Heading.tsx';
import SimpleHeader from '@/components/Headers/SimpleHeader/SimpleHeader.tsx';
import { useNavigate } from 'react-router-dom';
import { createProject, getProjectByClientEmail } from '@/lib/requests/ProjectRequest.tsx';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Toast from '@/comman-components/Toast';

// Types
interface OnboardingFormData {
    projectName: string;
    logo: string | null; // logo_url
    logoPreview?: string;
    logo_metadata?: {
        name: string;
        size: number;
        type: string;
        width: number;
        height: number;
        preview_base64?: string;
    } | null;
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
        ? 'border-accent-default bg-accent-subtle/20 text-accent-default'
        : 'border-border-default hover:border-border-focus text-text-secondary'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

const getDropzoneClass = (isDragActive: boolean) =>
    `relative border-2 border-dashed rounded-lg p-lg text-center transition-all ${isDragActive
        ? 'border-accent-default bg-accent-subtle'
        : 'border-border-muted hover:border-border-default'
    }`;

const ScreenHeader = ({ title, subtitle, canSkip, onSkip, buttonState, isLastStep }: any) => (
    <motion.div variants={fadeInLeft} className="mb-lg">
        <div className='flex justify-between items-start'>
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
        <p className="text-para-md text-text-secondary">{subtitle}</p>
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
                    <FaCloudUploadAlt className="mx-auto text-text-tertiary text-icon-2xl mb-sm" />
                    <p className="text-text-secondary text-para-md mb-xs">Drag and drop or click to upload</p>
                    <p className="text-text-tertiary text-para-sm">Upload your logo (optional)</p>
                </label>
            )}
        </div>
    );
};

const OnboardingForm: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
    const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [loading, setLoading] = useState(false);
    const [buttonState, setButtonState] = useState<'default' | 'saving' | 'saved'>('default');
    const navigate = useNavigate();

    const client_email = useSelector((state: RootState) => state.auth.user.email)!;
    const designer_email = useSelector((state: RootState) => state.auth.user.designerEmail);

    const fetchForm = async (client_email: string) => {
    setLoading(true);
    try {
        const response = await getProjectByClientEmail({ client_email });
        const data = response?.data?.data;

        let logoValue: string | null = null;

        if (data?.source_url) {
            // Use source_url as "logo" for preview in FileUpload
            logoValue = data.source_url;
        } else if (data?.logo_metadata?.preview_base64) {
            // fallback for old projects
            logoValue = data.logo_metadata.preview_base64;
        }

        const transformed = {
            projectName: data?.project_name || '',
            logo: logoValue,               // either URL or Base64
            logo_metadata: data?.logo_metadata || null,
            projectType: data?.project_type || '',
            businessDescription: data?.business_description || '',
            budget: data?.budget || '',
            notReadyToShare: data?.not_ready_to_share || false,
            notes: data?.notes || '',
        };

        setFormData(transformed);
    } catch (err) {
        console.error("Error loading form data:", err);
        setFormData(initialFormData);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        if (client_email) {
            fetchForm(client_email);
        }
    }, [client_email]);

    useEffect(() => {
        if (!toastMessage) return;

        const timer = setTimeout(() => {
            setToastMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [toastMessage]);

    const totalScreens = 4;

    const updateForm = (updates: Partial<OnboardingFormData>) =>
        setFormData(prev => ({ ...prev, ...updates }));

    const handleFile = (file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = new Image();
                image.onload = () => {
                    updateForm({
                        logo: e.target?.result as string,
                        logo_metadata: {
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            width: image.width,
                            height: image.height,
                            preview_base64: e.target?.result as string,
                        }
                    });
                };
                image.src = e.target?.result as string;
            };
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

    const navigater = async (next: boolean) => {
        if (!next) {
            if (currentScreen > 1) {
                setCurrentScreen(currentScreen - 1);
            }
            return;
        }

        // Final submission - direct alert, no animation for last screen
        if (currentScreen === totalScreens) {
            console.log("Onboarding data:", formData);

            const { projectName, logo, projectType, businessDescription, budget, notReadyToShare, notes } = formData;

            const payload = {
                designer_email: designer_email ?? "",
                client_email,
                project_name: projectName,
                logo: logo || "",
                project_type: projectType,
                business_description: businessDescription,
                budget,
                not_ready_to_share: notReadyToShare,
                notes: notes || "",
            };

            try {
                console.log(payload)
                const result = await createProject(payload);
                if (result.status === 200) {
                    navigate("onboard-compelete");
                }
            } catch (error) {
                console.error("Project creation failed:", error);
            }

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
                            file={formData.logo}                  // File object for new uploads
                            previewUrl={formData.logoPreview}     // Pass Supabase URL here
                            onFile={(file: File) => {
                                const MAX_LOGO_SIZE = 25 * 1024 * 1024; // 25 MB
                                if (file.size > MAX_LOGO_SIZE) {
                                    setToastMessage({
                                        message: "Logo exceeds 25 MB limit. Please choose a smaller file.",
                                        type: "error",
                                    });
                                    return;
                                }
                                handleFile(file); // Make sure handleFile also updates formData.logoPreview
                            }}
                        />

                        <p className="text-para-sm text-gray-500 mt-2">
                            Recommended: PNG or JPG, size ≤ 25MB. Ideal dimensions: 1024x1024 or 512x512 pixels.
                        </p>
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
                    <label className="block mb-sm text-para-sm text-text-secondary">Describe your business or brand</label>
                    <textarea
                        value={formData.businessDescription}
                        onChange={(e) => updateForm({ businessDescription: e.target.value })}
                        placeholder="Tell us about your business, what you do, your target audience, and what makes you unique..."
                        rows={6}
                        className="w-full bg-background-primary text-text-primary rounded-lg py-sm px-md border border-border-default focus:border-border-focus outline-none transition-all resize-none"
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
                        <label className="block mb-sm text-para-sm text-text-secondary">Do you already have a budget range in mind?</label>
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
                                className="w-md h-md text-accent-default bg-background-primary border-border-default rounded focus:ring-accent-default"
                            />
                            <span className="text-text-secondary text-para-sm">Not ready to share</span>
                        </label>
                    </motion.div>
                    <motion.div variants={fadeInLeft} className="mb-lg">
                        <label className="block mb-sm text-para-sm text-text-secondary">Any additional notes? (optional)</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => updateForm({ notes: e.target.value })}
                            placeholder="Anything else you'd like us to know before we get started..."
                            rows={4}
                            className="w-full bg-background-primary text-text-primary rounded-lg py-sm px-md border border-border-default focus:border-border-focus outline-none transition-all resize-none"
                        />
                    </motion.div>
                </>
            )
        }
    ];

    const currentScreenData = screens[currentScreen - 1];

    return (

        <>
            <AnimatePresence>
                {toastMessage && (
                    <Toast message={toastMessage.message} type={toastMessage.type} />
                )}
            </AnimatePresence>

            {loading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    Loading
                </div>
            ) :
                <div className="relative min-h-screen flex bg-background-secondary transition-colors">
                    <div className="flex-1 flex flex-col px-lg z-10">

                        <SimpleHeader />

                        <div className="flex-1 flex items-center justify-center max-md:mb-md">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentScreen}
                                    variants={containerVariant}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="w-full max-w-3xl mx-auto bg-background-primary rounded-2xl px-lg md:px-xl py-lg shadow-xl transition-colors border border-border-default"
                                >
                                    <ScreenHeader
                                        title={currentScreenData.title}
                                        subtitle={currentScreenData.subtitle}
                                        canSkip={currentScreenData.canSkip}
                                        onSkip={() => navigater(true)}
                                        buttonState={buttonState}
                                        isLastStep={currentScreen === totalScreens}
                                    />

                                    {currentScreenData.content}

                                    <motion.div variants={fadeInLeft} className="flex justify-between">
                                        {currentScreen > 1 && (
                                            <SimpleButton
                                                variant="outline"
                                                size="md"
                                                onClick={() => navigater(false)}
                                                disabled={buttonState !== 'default'}
                                            >
                                                Back
                                            </SimpleButton>
                                        )}
                                        <SimpleButton
                                            variant="solid"
                                            size="md"
                                            onClick={() => navigater(true)}
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
            }
        </>
    );
};

export default OnboardingForm;