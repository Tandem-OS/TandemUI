import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectSnapshot from './ProjectSnapshot';
import OptionalExtras from './OptionalExtras';
import VisualDirection from './VisualDirection';

const IntakeFormContainer: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        step1: {},
        step2: {},
        step3: {},
    });

    // Auto-save to localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('intakeFormData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    const saveProgress = (step: string, data: any) => {
        const newFormData = { ...formData, [step]: data };
        setFormData(newFormData);
        localStorage.setItem('intakeFormData', JSON.stringify(newFormData));
    };

    const handleNext = (step: number, data: any) => {
        saveProgress(`step${step}`, data);
        if (step < 3) {
            setCurrentStep(step + 1);
        } else {
            // Submit the form
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        console.log('Submitting form data:', formData);
        // Clear saved data after successful submission
        localStorage.removeItem('intakeFormData');
        // Handle submission logic here
    };

    const progressPercentage = (currentStep / 3) * 100;

    const steps = [
        { number: 1, title: 'Project Snapshot' },
        { number: 2, title: 'Visual Direction' },
        { number: 3, title: 'Final Details' },
    ];

    return (
        <div className="relative min-h-screen flex bg-gray-900 overflow-x-hidden">

            {/* Main Container */}
            <div className="flex-1 flex flex-col p-lg z-10">
                {/* Logo */}
                <div className="mb-lg">
                    <img src="/images/logo.png" alt="Logo" className="w-[150px]" />
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-3xl mx-auto mb-lg">
                    <div className="flex justify-between mb-sm">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className={`flex items-center gap-sm ${step.number <= currentStep
                                    ? 'text-white'
                                    : 'text-gray-500'
                                    }`}
                            >
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-para-sm font-medium transition-all ${step.number < currentStep
                                        ? 'bg-accent-default text-white'
                                        : step.number === currentStep
                                            ? 'bg-accent-default text-white ring-2 ring-accent-subtle'
                                            : 'bg-gray-700 text-gray-400'
                                        }`}
                                >
                                    {step.number < currentStep ? '✓' : step.number}
                                </div>
                                <span className="hidden md:block text-para-md">
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden mt-md">
                        <motion.div
                            className="h-full bg-gradient-to-r from-accent-default to-accent-default-dark"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* Form Steps */}
                <div className="flex-1 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <ProjectSnapshot
                                    onNext={(data) => handleNext(1, data)}
                                    initialData={formData.step1}
                                />
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <VisualDirection
                                    onNext={(data) => handleNext(2, data)}
                                    onBack={handleBack}
                                    initialData={formData.step2}
                                />
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <OptionalExtras
                                    onNext={(data) => handleNext(3, data)}
                                    onBack={handleBack}
                                    initialData={formData.step3}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default IntakeFormContainer;