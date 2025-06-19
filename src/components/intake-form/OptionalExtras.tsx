import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLink, FaFileUpload, FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import SimpleButton from '../demos/buttons/SimpleButton';
import { containerVariant, fadeInLeft } from '../../lib/animations/variants';
import Heading from '../demos/typography/Heading';

interface OptionalExtrasProps {
    onNext: (data: any) => void;
    onBack: () => void;
    initialData?: any;
}

const OptionalExtras: React.FC<OptionalExtrasProps> = ({ onNext, onBack, initialData = {} }) => {
    const [formData, setFormData] = useState({
        currentSiteUrl: initialData.currentSiteUrl || '',
        brandGuide: initialData.brandGuide || null,
        inspirationUrls: initialData.inspirationUrls || [''],
        additionalInfo: initialData.additionalInfo || '',
    });

    const [dragActive, setDragActive] = useState(false);
    const charCount = formData.additionalInfo.length;

    const handleUrlChange = (index: number, value: string) => {
        const newUrls = [...formData.inspirationUrls];
        newUrls[index] = value;
        setFormData(prev => ({ ...prev, inspirationUrls: newUrls }));
    };

    const addUrlField = () => {
        if (formData.inspirationUrls.length < 5) {
            setFormData(prev => ({
                ...prev,
                inspirationUrls: [...prev.inspirationUrls, '']
            }));
        }
    };

    const removeUrlField = (index: number) => {
        const newUrls = formData.inspirationUrls.filter((_: any, i: any) => i !== index);
        setFormData(prev => ({
            ...prev,
            inspirationUrls: newUrls.length === 0 ? [''] : newUrls
        }));
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
        setFormData(prev => ({ ...prev, brandGuide: file }));
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        // Filter out empty inspiration URLs
        const cleanedData = {
            ...formData,
            inspirationUrls: formData.inspirationUrls.filter((url: any) => url.trim() !== '')
        };
        onNext(cleanedData);
    };

    const handleSkip = () => {
        onNext({});
    };


    return (
        <motion.div
            variants={containerVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl px-xl py-lg shadow-xl"
        >
            {/* Header with Skip */}
            <motion.div variants={fadeInLeft} className="mb-lg flex justify-between items-start">
                <div>
                    <Heading level="h3" color="accent" className='text-'>
                        Almost Done!
                    </Heading>
                    <p className="text-para-md text-gray-300">
                        No pressure, just bonus alignment
                    </p>
                </div>
                <button
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-gray-200 text-para-sm underline transition-colors"
                >
                    Skip & Submit
                </button>
            </motion.div>

            {/* Current Site URL */}
            <motion.div variants={fadeInLeft} className="mb-md">
                <label className="block mb-sm text-para-sm text-gray-200">
                    Do you have a current site or brand guide?
                </label>
                <div className="space-y-sm">
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

                    {/* Brand Guide Upload */}
                    <div
                        className={`relative border-2 border-dashed rounded-lg p-md text-center transition-all ${dragActive
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
                            id="brand-guide-upload"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                            onChange={handleFileInput}
                        />

                        {formData.brandGuide ? (
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300 text-para-sm">
                                    {(formData.brandGuide as File).name}
                                </span>
                                <label
                                    htmlFor="brand-guide-upload"
                                    className="text-accent-default hover:text-accent-hover cursor-pointer text-para-sm"
                                >
                                    Change file
                                </label>
                            </div>
                        ) : (
                            <label htmlFor="brand-guide-upload" className="cursor-pointer block">
                                <FaFileUpload className="mx-auto text-gray-400 text-3xl mb-xs" />
                                <p className="text-gray-300 text-para-sm">
                                    Drop brand guide here or click to upload
                                </p>
                            </label>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Inspiration URLs */}
            <motion.div variants={fadeInLeft} className="mb-md">
                <label className="block mb-sm text-para-sm text-gray-200">
                    Any websites or designs you like?
                </label>
                <p className="text-gray-400 text-para-sm mb-sm">
                    Drop any links that inspire you — Dribbble, Behance, or websites you like.
                </p>
                <div className="space-y-xs">
                    {formData.inspirationUrls.map((url: any, index: any) => (
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

            {/* Additional Info */}
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
                    <span className={`absolute bottom-sm right-md text-para-sm ${charCount > 250 ? 'text-yellow-400' : 'text-gray-500'
                        }`}>
                        {charCount}/300
                    </span>
                </div>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div variants={fadeInLeft} className="flex justify-between">
                <SimpleButton
                    variant="outline"
                    size="md"
                    onClick={onBack}
                >
                    Back
                </SimpleButton>
                <SimpleButton
                    variant="solid"
                    size="md"
                    onClick={handleSubmit}
                    className="min-w-[150px]"
                >
                    Start My Project
                </SimpleButton>
            </motion.div>
        </motion.div>
    );
};

export default OptionalExtras;