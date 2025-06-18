import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';
import SimpleButton from '../demos/buttons/SimpleButton';
import { containerVariant, fadeInLeft } from '../../lib/animations/variants';
import Heading from '../demos/typography/Heading';

interface VisualDirectionProps {
    onNext: (data: any) => void;
    onBack: () => void;
    initialData?: any;
}

const toneOptions = [
    { id: 'bold', label: 'Bold', emoji: '💪' },
    { id: 'minimal', label: 'Minimal', emoji: '⚡' },
    { id: 'fun', label: 'Fun', emoji: '🎉' },
    { id: 'elegant', label: 'Elegant', emoji: '✨' },
    { id: 'clean', label: 'Clean', emoji: '🧼' },
    { id: 'playful', label: 'Playful', emoji: '🎨' },
    { id: 'earthy', label: 'Earthy', emoji: '🌿' },
    { id: 'luxury', label: 'Luxury', emoji: '💎' },
];

const budgetOptions = [
    { id: 'under1k', label: 'Under $1K' },
    { id: '1k-5k', label: '$1K–$5K' },
    { id: '5k-10k', label: '$5K–$10K' },
    { id: '10k+', label: '$10K+' },
];

const VisualDirection: React.FC<VisualDirectionProps> = ({ onNext, onBack, initialData = {} }) => {
    const [formData, setFormData] = useState({
        launchDate: initialData.launchDate || '',
        notSureDate: initialData.notSureDate || false,
        budget: initialData.budget || '',
        needHelpScoping: initialData.needHelpScoping || false,
        tones: initialData.tones || [],
        colorStrategy: initialData.colorStrategy || 'match-logo',
        customColors: initialData.customColors || '',
    });

    const handleToneToggle = (toneId: string) => {
        setFormData(prev => ({
            ...prev,
            tones: prev.tones.includes(toneId)
                ? prev.tones.filter((t: string) => t !== toneId)
                : [...prev.tones, toneId]
        }));
    };

    const handleBudgetSelect = (budgetId: string) => {
        setFormData(prev => ({ ...prev, budget: budgetId, needHelpScoping: false }));
    };

    const handleSubmit = () => {
        onNext(formData);
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
                        Visual Direction
                    </Heading>
                    <p className="text-para-md text-gray-300">
                        Optional but helps us nail your vision
                    </p>
                </div>
                <button
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-gray-200 text-para-sm underline transition-colors"
                >
                    Skip this step
                </button>
            </motion.div>

            {/* Launch Timeline */}
            <motion.div variants={fadeInLeft} className="mb-md">
                <label className="block mb-sm text-para-sm text-gray-200">
                    Launch timeline (optional)
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

            {/* Budget */}
            <motion.div variants={fadeInLeft} className="mb-md">
                <label className="block mb-sm text-para-sm text-gray-200">
                    Rough budget (optional)
                </label>
                <div className="grid grid-cols-2 gap-sm mb-sm">
                    {budgetOptions.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => handleBudgetSelect(option.id)}
                            disabled={formData.needHelpScoping}
                            className={`p-sm rounded-lg border-2 transition-all ${formData.budget === option.id && !formData.needHelpScoping
                                ? 'border-accent-default bg-accent-subtle bg-opacity-20 text-white'
                                : 'border-gray-600 hover:border-gray-500 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
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

            {/* Tone/Vibe */}
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
                            onClick={() => handleToneToggle(tone.id)}
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

            {/* Brand Colors */}
            <motion.div variants={fadeInLeft} className="mb-lg">
                <label className="block mb-sm text-para-sm text-gray-200">
                    Brand colors?
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
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
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
                >
                    Continue to Final Details
                </SimpleButton>
            </motion.div>
        </motion.div>
    );
};

export default VisualDirection;