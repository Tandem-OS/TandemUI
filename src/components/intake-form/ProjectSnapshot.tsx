import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaShoppingCart, FaUsers, FaCalendarCheck, FaBriefcase, FaPencilAlt } from 'react-icons/fa';
import Input from '../auth/form/components/Input';
import SimpleButton from '../demos/buttons/SimpleButton';
import Heading from '../demos/typography/Heading';
import { containerVariant, fadeInLeft } from '../../lib/animations/variants';


interface ProjectSnapshotProps {
    onNext: (data: any) => void;
    initialData?: any;
}

const goalOptions = [
    { id: 'sell', label: 'Sell products', icon: <FaShoppingCart /> },
    { id: 'leads', label: 'Get leads', icon: <FaUsers /> },
    { id: 'appointments', label: 'Book appointments', icon: <FaCalendarCheck /> },
    { id: 'showcase', label: 'Showcase work', icon: <FaBriefcase /> },
    { id: 'other', label: 'Other', icon: <FaPencilAlt /> },
];

const businessTypes = [
    'Wellness coach',
    'SaaS tool',
    'Clothing brand',
    'Event planner',
    'Restaurant',
    'Real estate',
    'Photography',
    'Consulting',
    'E-commerce',
    'Non-profit',
    'Healthcare',
    'Education',
];

const ProjectSnapshot: React.FC<ProjectSnapshotProps> = ({ onNext, initialData = {} }) => {
    const [formData, setFormData] = useState({
        projectName: initialData.projectName || '',
        logo: initialData.logo || null,
        businessType: initialData.businessType || '',
        mainGoal: initialData.mainGoal || '',
        otherGoal: initialData.otherGoal || '',
    });

    const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
    const [filteredBusinessTypes, setFilteredBusinessTypes] = useState(businessTypes);
    const [dragActive, setDragActive] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'businessType') {
            const filtered = businessTypes.filter(type =>
                type.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredBusinessTypes(filtered);
            setShowBusinessDropdown(true);
        }
    };

    const handleGoalSelect = (goalId: string) => {
        setFormData(prev => ({ ...prev, mainGoal: goalId }));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({ ...prev, logo: e.target?.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        // Auto-save happens on each change, but validate before proceeding
        if (formData.projectName && formData.businessType && formData.mainGoal) {
            onNext(formData);
        }
    };

    return (
        <motion.div
            variants={containerVariant}
            initial="initial"
            animate="animate"
            className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl px-xl py-lg shadow-xl"
        >
            {/* Header */}
            <motion.div variants={fadeInLeft} className="mb-lg">
                <Heading level="h3" color="accent" className='text-'>
                    Let's start with the basics
                </Heading>
                <p className="text-para-md text-gray-300">
                    Quick snapshot to understand your project
                </p>
            </motion.div>

            {/* Project Name */}
            <motion.div variants={fadeInLeft} className="mb-md">
                <Input
                    label="Project Name"
                    name="projectName"
                    type="text"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    placeholder="e.g., Luna Rebrand or New Landing Page"
                    variant="filled"
                    className="bg-gray-900"
                />
            </motion.div>

            {/* Logo Upload */}
            <motion.div variants={fadeInLeft} className="mb-md">
                <label className="block mb-xs text-para-sm text-gray-200">
                    Upload Logo (optional)
                </label>
                <div
                    className={`relative border-2 border-dashed rounded-lg p-lg text-center transition-all ${dragActive
                        ? 'border-accent-default bg-accent-subtle bg-opacity-10'
                        : 'border-gray-600 hover:border-gray-500'
                        }`}
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
                        onChange={handleFileInput}
                    />

                    {formData.logo ? (
                        <div className="space-y-sm">
                            <img
                                src={formData.logo}
                                alt="Logo preview"
                                className="mx-auto h-24 object-contain"
                            />
                            <label
                                htmlFor="logo-upload"
                                className="text-accent-default hover:text-accent-hover cursor-pointer text-para-sm"
                            >
                                Change logo
                            </label>
                        </div>
                    ) : (
                        <label htmlFor="logo-upload" className="cursor-pointer">
                            <FaCloudUploadAlt className="mx-auto text-gray-400 text-5xl mb-sm" />
                            <p className="text-gray-300 text-para-md mb-xs">
                                Drag and drop or click to upload
                            </p>
                            <p className="text-gray-500 text-para-sm">
                                Used to influence tone, palette, and first impression
                            </p>
                        </label>
                    )}
                </div>
            </motion.div>

            {/* Business Type */}
            <motion.div variants={fadeInLeft} className="mb-md relative">
                <Input
                    label="What type of business is this for?"
                    name="businessType"
                    type="text"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    onFocus={() => setShowBusinessDropdown(true)}
                    onBlur={() => setTimeout(() => setShowBusinessDropdown(false), 200)}
                    placeholder="e.g., wellness coach, SaaS tool, clothing brand"
                    variant="filled"
                    className="bg-gray-900"
                />

                {showBusinessDropdown && filteredBusinessTypes.length > 0 && (
                    <div className="absolute z-10 w-full mt-xs bg-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredBusinessTypes.map((type) => (
                            <div
                                key={type}
                                className="px-md py-sm hover:bg-gray-600 cursor-pointer text-gray-200 text-para-sm"
                                onMouseDown={() => {
                                    setFormData(prev => ({ ...prev, businessType: type }));
                                    setShowBusinessDropdown(false);
                                }}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Main Goal */}
            <motion.div variants={fadeInLeft} className="mb-lg">
                <label className="block mb-sm text-para-sm text-gray-200">
                    Main goal of this project?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-sm">
                    {goalOptions.map((goal) => (
                        <button
                            key={goal.id}
                            type="button"
                            onClick={() => handleGoalSelect(goal.id)}
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
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-sm"
                    >
                        <Input
                            label=""
                            name="otherGoal"
                            type="text"
                            value={formData.otherGoal}
                            onChange={handleInputChange}
                            placeholder="Please specify..."
                            variant="filled"
                            className="bg-gray-900"
                        />
                    </motion.div>
                )}
            </motion.div>

            {/* Continue Button */}
            <motion.div variants={fadeInLeft} className="flex justify-end">
                <SimpleButton
                    variant="solid"
                    size="md"
                    onClick={handleSubmit}
                    disabled={!formData.projectName || !formData.businessType || !formData.mainGoal}
                >
                    Continue to Visual Direction
                </SimpleButton>
            </motion.div>
        </motion.div>
    );
};

export default ProjectSnapshot;