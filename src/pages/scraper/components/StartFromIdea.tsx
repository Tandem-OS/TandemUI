import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaTimes, FaMagic } from 'react-icons/fa';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../common-components/Para';
import { callAiComposePipeline } from '@/lib/requests/CompositionRequest';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { setPageSchema } from '@/features/composition/compositionSlice';

interface StartFromIdeaProps {
    onGenerateLayout: (sections: any[], compositionId: string) => void;
}

const STAGES = [
    "Resolving project & checking embeddings...",
    "Generating brief & finding components...",
    "Composing your layout...",
];

const StartFromIdea = ({ onGenerateLayout }: StartFromIdeaProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [idea, setIdea] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeStage, setActiveStage] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();

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
        setActiveStage(0);
        setError(null);

        // Fake progress timers
        const t1 = setTimeout(() => setActiveStage(1), 3000);
        const t2 = setTimeout(() => setActiveStage(2), 7000);

        try {
            const result = await callAiComposePipeline({ user_input: idea });
            setIsOpen(false);
            setIdea('');
            dispatch(setPageSchema(result.page_schema as any));
            onGenerateLayout(result.page_schema.sections as any[], result.composition_id);
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('[StartFromIdea] compose failed:', err);
        } finally {
            clearTimeout(t1);
            clearTimeout(t2);
            setIsGenerating(false);
        }
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 4px 15px -3px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="bg-background-secondary border border-border-default text-text-primary px-md sm:px-lg py-sm sm:py-md rounded-lg sm:rounded-xl font-medium hover:border-accent-default hover:bg-accent-subtle flex items-center gap-xs sm:gap-sm text-para-sm sm:text-para-md shadow-sm hover:shadow-md will-change-transform"
            >
                <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 400 }}>
                    <FaMagic className="text-icon-sm sm:text-icon-md text-accent-default" />
                </motion.div>
                <span>Generate with Idea</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !isGenerating && setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center sm:p-md h-screen"
                    >
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
                                    <motion.div
                                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center"
                                        whileHover={{ rotate: 15, scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <FaLightbulb className="text-white text-icon-md sm:text-icon-lg" />
                                    </motion.div>
                                    <div className="text-left">
                                        <Heading level="h5" className="text-lg sm:text-xl">Turn Your Idea Into a Layout</Heading>
                                        <Para size="sm" color="secondary">Describe what you want to build</Para>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={() => !isGenerating && setIsOpen(false)}
                                    disabled={isGenerating}
                                    whileHover={!isGenerating ? { scale: 1.1, backgroundColor: 'var(--background-secondary)' } : {}}
                                    whileTap={!isGenerating ? { scale: 0.9 } : {}}
                                    className="p-2 rounded-lg disabled:opacity-50 will-change-transform"
                                >
                                    <FaTimes className="text-text-secondary text-icon-sm sm:text-icon-md" />
                                </motion.button>
                            </div>

                            {/* Content */}
                            <div className="p-md sm:p-lg overflow-y-auto max-h-[60vh]">
                                {!isGenerating ? (
                                    <>
                                        <div className="mb-md">
                                            <label className="block mb-sm text-left">
                                                <Para size="sm" weight="medium">What do you want to build?</Para>
                                            </label>
                                            <textarea
                                                value={idea}
                                                onChange={(e) => setIdea(e.target.value)}
                                                placeholder="Describe your website idea in detail..."
                                                className="w-full h-24 sm:h-32 px-sm sm:px-md py-sm bg-background-secondary border border-border-default rounded-lg sm:rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-default transition-colors resize-none text-para-sm"
                                                autoFocus
                                            />
                                            {error && (
                                                <Para size="sm" color="error" className="mt-xs">{error}</Para>
                                            )}
                                        </div>
                                        <div className="mb-md sm:mb-lg text-left">
                                            <Para size="sm" color="secondary" className="mb-sm">Need inspiration? Try one of these:</Para>
                                            <div className="flex flex-wrap gap-xs sm:gap-sm">
                                                {ideaExamples.map((example, i) => (
                                                    <motion.button
                                                        key={i}
                                                        onClick={() => setIdea(example)}
                                                        whileHover={{ scale: 1.02, borderColor: 'var(--accent-default)', backgroundColor: 'var(--accent-subtle)' }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="text-para-xs px-sm py-xs bg-background-secondary border border-border-default rounded-lg will-change-transform"
                                                    >
                                                        {example}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-sm">
                                            <motion.button
                                                onClick={generateLayout}
                                                disabled={!idea.trim()}
                                                whileHover={idea.trim() ? { scale: 1.02 } : {}}
                                                whileTap={idea.trim() ? { scale: 0.98 } : {}}
                                                className="flex-1 bg-accent-default text-accent-foreground py-sm sm:py-md rounded-xl font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-sm will-change-transform"
                                            >
                                                <FaMagic className="text-icon-sm" />
                                                Generate Layout
                                            </motion.button>
                                            <motion.button
                                                onClick={() => setIsOpen(false)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="px-lg py-sm sm:py-md bg-background-secondary text-text-secondary rounded-xl font-medium hover:bg-background-muted transition-colors will-change-transform"
                                            >
                                                Cancel
                                            </motion.button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-lg sm:py-xl">
                                        <motion.div
                                            className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-border-muted border-t-accent-default rounded-full mx-auto mb-md"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        <Heading level="h5" className="mb-sm">Generating Your Layout</Heading>
                                        <Para color="secondary">{STAGES[activeStage]}</Para>
                                        <div className="mt-lg space-y-sm max-w-md mx-auto">
                                            {STAGES.map((label, i) => {
                                                const done = i < activeStage;
                                                const active = i === activeStage;
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.3 }}
                                                        className="flex items-center gap-sm text-left"
                                                    >
                                                        <motion.div
                                                            className={`w-2 h-2 rounded-full ${done ? 'bg-emerald-500' : active ? 'bg-accent-default' : 'bg-border-muted'}`}
                                                            animate={active ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                                                            transition={{ duration: 0.8, repeat: active ? Infinity : 0 }}
                                                        />
                                                        <Para size="sm" color={done || active ? 'secondary' : 'tertiary'}>{label}</Para>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default StartFromIdea;