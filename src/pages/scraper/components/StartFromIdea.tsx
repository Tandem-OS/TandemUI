// src/scraper/components/StartFromIdea.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaTimes, FaMagic } from 'react-icons/fa';
import { layoutGenerationTemplates } from '../constants';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../comman-components/Para';

interface StartFromIdeaProps {
    onGenerateLayout: (sections: any[]) => void;
}

const StartFromIdea = ({ onGenerateLayout }: StartFromIdeaProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [idea, setIdea] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const ideaExamples = [
        "I want to build a personal finance coaching site",
        "Create a modern SaaS landing page",
        "Design an e-commerce store for handmade products",
        "Build a portfolio site for a photographer",
        "Make a landing page for a mobile app"
    ];

    const generateLayout = async () => {
        if (!idea.trim()) return;

        setIsGenerating(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Determine which template to use based on keywords
        let template = layoutGenerationTemplates.default;

        if (idea.toLowerCase().includes('finance') || idea.toLowerCase().includes('money')) {
            template = layoutGenerationTemplates.finance;
        } else if (idea.toLowerCase().includes('saas') || idea.toLowerCase().includes('software')) {
            template = layoutGenerationTemplates.saas;
        }

        // Add timestamp and customize based on idea
        const generatedSections = template.sections.map((section, index) => ({
            ...section,
            id: `${section.id}-${Date.now()}-${index}`,
            metadata: {
                ...section.metadata,
                generatedFrom: idea
            }
        }));

        setIsGenerating(false);
        setIsOpen(false);
        setIdea('');
        onGenerateLayout(generatedSections);
    };

    return (
        <>
            {/* Trigger Button - Mobile Responsive */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-md sm:px-lg py-sm sm:py-md rounded-lg sm:rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-xs sm:gap-sm text-para-sm sm:text-para-md"
            >
                <FaMagic className="text-icon-sm sm:text-icon-md" />
                <span>Start with an idea</span>
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isGenerating && setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center sm:p-md"
                        >
                            {/* Modal Content - Mobile Responsive */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-background-primary rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden"
                            >
                                {/* Header */}
                                <div className="p-md sm:p-lg border-b border-border-default flex items-center justify-between">
                                    <div className="flex items-center gap-sm">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                                            <FaLightbulb className="text-white text-icon-md sm:text-icon-lg" />
                                        </div>
                                        <div className='text-left'>
                                            <Heading level="h5" className="text-lg sm:text-xl">
                                                Turn Your Idea Into a Layout
                                            </Heading>
                                            <Para size="sm" color="secondary">
                                                Describe what you want to build
                                            </Para>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => !isGenerating && setIsOpen(false)}
                                        disabled={isGenerating}
                                        className="p-2 hover:bg-background-secondary rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        <FaTimes className="text-text-secondary text-icon-sm sm:text-icon-md" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-md sm:p-lg overflow-y-auto max-h-[60vh]">
                                    {!isGenerating ? (
                                        <>
                                            {/* Textarea */}
                                            <div className="mb-md">
                                                <label className="block mb-sm text-left">
                                                    <Para size="sm" weight="medium">
                                                        What do you want to build?
                                                    </Para>
                                                </label>
                                                <textarea
                                                    value={idea}
                                                    onChange={(e) => setIdea(e.target.value)}
                                                    placeholder="Describe your website idea in detail..."
                                                    className="w-full h-24 sm:h-32 px-sm sm:px-md py-sm bg-background-secondary border border-border-default rounded-lg sm:rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-default transition-colors resize-none text-para-sm"
                                                    autoFocus
                                                />
                                            </div>

                                            {/* Examples */}
                                            <div className="mb-md sm:mb-lg text-left">
                                                <Para size="sm" color="secondary" className="mb-sm">
                                                    Need inspiration? Try one of these:
                                                </Para>
                                                <div className="flex flex-wrap gap-xs sm:gap-sm">
                                                    {ideaExamples.map((example, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setIdea(example)}
                                                            className="text-para-xs px-sm py-xs bg-background-secondary border border-border-default rounded-lg hover:border-accent-default hover:bg-accent-subtle transition-colors"
                                                        >
                                                            {example}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col sm:flex-row gap-sm">
                                                <button
                                                    onClick={generateLayout}
                                                    disabled={!idea.trim()}
                                                    className="flex-1 bg-accent-default text-accent-foreground py-sm sm:py-md rounded-xl font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-sm"
                                                >
                                                    <FaMagic className="text-icon-sm" />
                                                    Generate Layout
                                                </button>
                                                <button
                                                    onClick={() => setIsOpen(false)}
                                                    className="px-lg py-sm sm:py-md bg-background-secondary text-text-secondary rounded-xl font-medium hover:bg-background-muted transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        /* Generating State */
                                        <div className="text-center py-lg sm:py-xl">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-border-muted border-t-accent-default rounded-full animate-spin mx-auto mb-md"></div>
                                            <Heading level="h5" className="mb-sm">
                                                Generating Your Layout
                                            </Heading>
                                            <Para color="secondary">
                                                Analyzing your idea and creating the perfect structure...
                                            </Para>
                                            <div className="mt-lg space-y-sm max-w-md mx-auto">
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.5 }}
                                                    className="flex items-center gap-sm text-left"
                                                >
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                    <Para size="sm" color="secondary">Understanding your requirements</Para>
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 1 }}
                                                    className="flex items-center gap-sm text-left"
                                                >
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                    <Para size="sm" color="secondary">Selecting optimal layout patterns</Para>
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 1.5 }}
                                                    className="flex items-center gap-sm text-left"
                                                >
                                                    <div className="w-2 h-2 bg-accent-default rounded-full animate-pulse"></div>
                                                    <Para size="sm" color="secondary">Building your custom layout</Para>
                                                </motion.div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default StartFromIdea;