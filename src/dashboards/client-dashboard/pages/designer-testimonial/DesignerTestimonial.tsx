import { useState, useRef, useEffect, useCallback, type Dispatch, type SetStateAction, type FC } from 'react';
import { FaStar, FaCheckCircle, FaArrowRight, FaPaperPlane } from 'react-icons/fa';
import FormButton from '../../../../components/auth/form/components/FormButton';
import SimpleButton from '../../../../components/demos/buttons/SimpleButton';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockDesignerFeedbackQuestions } from '../../../../mock-data/testimonial-questions-mock';
import { designerTestimonialSubmission } from '@/lib/requests/TestimonialRequest';

// --- TYPE DEFINITIONS ---
interface RatingBoxProps {
    rating: number;
    setRating: (rating: number) => void;
    question: string;
    emojiMap: Record<number, string>;
    error?: string;
}

interface FeedbackAnswers {
    [key: string]: string;
}

interface ReviewStepProps {
    designer: typeof mockDesignerFeedbackQuestions;
    rating: number;
    setRating: (rating: number) => void;
    answers: FeedbackAnswers;
    setAnswers: Dispatch<SetStateAction<FeedbackAnswers>>;
    handleSubmit: () => Promise<void>;
    isSubmitting: boolean;
    canSubmit: () => boolean;
    ratingError?: string;
    clearRatingError: () => void;
}

// ─── Inline error ─────────────────────────────────────────────────────────────

const FieldError: FC<{ message?: string }> = ({ message }) => {
    if (!message) return null;
    return (
        <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-para-xs text-text-error mt-xs"
        >
            {message}
        </motion.p>
    );
};

// --- REUSABLE SUB-COMPONENTS ---

const RatingBox: FC<RatingBoxProps> = ({ rating, setRating, question, emojiMap, error }) => {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [emojiKey, setEmojiKey] = useState(0);

    const getEmoji = (r: number) => emojiMap[r as keyof typeof emojiMap] || '😊';

    useEffect(() => {
        if (rating > 0) setEmojiKey(prev => prev + 1);
    }, [rating]);

    return (
        <div className={`bg-accent-default rounded-xl p-md sm:p-lg lg:p-xl border shadow-lg ${error ? 'border-text-error' : 'border-border-default'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-md sm:gap-lg">
                <motion.div
                    key={emojiKey}
                    initial={{ scale: 0.5, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="text-6xl sm:text-7xl order-1 sm:order-2"
                >
                    {getEmoji(hoveredRating || rating)}
                </motion.div>

                <div className="space-y-md text-center sm:text-left order-2 sm:order-1">
                    <h3 className="text-para-lg sm:text-h5-sm lg:text-h4-sm font-medium text-white">
                        {question}
                    </h3>
                    <p className="text-para-md lg:text-para-lg text-white/90 font-semibold hidden sm:block">Your rating</p>
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`w-8 h-8 md:w-10 md:h-10 transition-colors cursor-pointer ${star <= hoveredRating || star <= rating
                                    ? 'text-yellow-300'
                                    : 'text-indigo-200/50'
                                    }`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                            >
                                <FaStar className="w-full h-full" />
                            </button>
                        ))}
                        <span className="text-para-lg md:text-para-xl text-white font-medium leading-none hidden sm:inline sm:pt-1">
                            {rating}/5
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Step 1: Initial Prompt Screen
const PromptStep = ({ onContinue, onSkip }: { onContinue: () => void; onSkip: () => void }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto"
        >
            <h1 className="text-h3-sm sm:text-h2-md lg:text-h1-sm font-bold text-text-primary">
                Would you also like to leave a testimonial for your designer?
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-md mt-lg">
                <SimpleButton variant="outline" size="lg" onClick={onSkip} fullWidth className="sm:w-auto">
                    Skip for now
                </SimpleButton>
                <SimpleButton variant="solid" size="lg" onClick={onContinue} fullWidth className="sm:w-auto flex items-center gap-sm">
                    <span>Yes, Continue</span>
                    <FaArrowRight />
                </SimpleButton>
            </div>
        </motion.div>
    );
};

// Step 2: The Main Review Form
const ReviewStep: FC<ReviewStepProps> = ({
    designer, rating, setRating, answers, setAnswers,
    handleSubmit, isSubmitting, canSubmit, ratingError, clearRatingError
}) => {
    const handleAnswerChange = (questionId: string, value: string) => {
        if (value.length <= 500) {
            setAnswers(prev => ({ ...prev, [questionId]: value }));
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-lg md:space-y-xl">
            <header className="flex items-center gap-md">
                <img src={designer.logoUrl} alt={`${designer.name} logo`} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-border-muted" />
                <div>
                    <p className="text-para-sm text-text-secondary">Designer</p>
                    <h2 className="text-h4-sm sm:text-h3-sm font-bold text-text-primary">{designer.name}</h2>
                </div>
            </header>

            {designer.enableRating && (
                <div>
                    <RatingBox
                        rating={rating}
                        setRating={(r) => { setRating(r); clearRatingError(); }}
                        question={designer.ratingQuestion}
                        emojiMap={designer.emojiMap}
                        error={ratingError}
                    />
                    <AnimatePresence>
                        {ratingError && <FieldError message={ratingError} />}
                    </AnimatePresence>
                </div>
            )}

            <div className="space-y-lg">
                {designer.questions.map(q => (
                    <div key={q.id} className="space-y-sm">
                        <label htmlFor={`${q.id}-textarea`} className="block text-para-md font-medium text-text-primary">
                            {q.label}
                        </label>
                        <textarea
                            id={`${q.id}-textarea`}
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            placeholder={q.placeholder}
                            className="w-full h-32 p-md lg:p-lg text-para-md text-text-primary bg-background-secondary border border-border-default rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-accent-default focus:border-transparent transition-all placeholder:text-text-tertiary"
                            maxLength={500}
                        />
                        <div className="flex justify-between text-para-sm text-text-tertiary">
                            <span>Optional</span>
                            <span>{(answers[q.id]?.length || 0)}/500</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-md">
                <FormButton
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    size="lg"
                    fullWidth
                    className="flex items-center justify-center gap-sm"
                >
                    <FaPaperPlane />
                    <span>Submit Feedback</span>
                </FormButton>
            </div>
        </div>
    );
};

// Step 3: Success Screen
const SuccessStep = ({ onFinish }: { onFinish: () => void }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto"
        >
            <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-accent-subtle rounded-full flex items-center justify-center mb-md">
                <FaCheckCircle className="text-h3-lg lg:text-h2-lg text-accent-default" />
            </div>
            <h1 className="text-h3-sm sm:text-h2-md lg:text-h1-sm font-bold text-text-primary">
                Thank you for your feedback!
            </h1>
            <p className="text-para-md sm:text-para-lg text-text-secondary mt-sm mb-lg">
                Your words help your designer grow and showcase their unique talents.
            </p>
            <SimpleButton size="lg" onClick={onFinish} className="flex items-center gap-sm">
                <span>Back to Dashboard</span>
                <FaArrowRight />
            </SimpleButton>
        </motion.div>
    );
};

// --- MAIN PAGE COMPONENT ---

const DesignerTestimonial: FC = () => {
    const [step, setStep] = useState(0);
    const [rating, setRating] = useState(0);
    const [answers, setAnswers] = useState<FeedbackAnswers>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ratingError, setRatingError] = useState<string | undefined>();

    const navigate = useNavigate();

    const canSubmit = useCallback(() => rating > 0, [rating]);

    const handleSkip = () => navigate('/dashboard/client');
    const handleContinue = () => setStep(1);
    const handleFinish = () => navigate('/dashboard/client');

    const handleSubmit = useCallback(async () => {
        // ── Inline validation ─────────────────────────────────────────────
        if (!canSubmit()) {
            setRatingError('Please select a rating before submitting');
            return;
        }
        setRatingError(undefined);

        setIsSubmitting(true);
        setStep(2);
        try {
            const submissionData = {
                rating,
                standout: answers.unique,
                recommend: answers.recommend,
                submittedAt: new Date().toISOString()
            };
            designerTestimonialSubmission(submissionData);
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    }, [rating, answers, canSubmit]);

    const renderStep = () => {
        switch (step) {
            case 0: return <PromptStep onContinue={handleContinue} onSkip={handleSkip} />;
            case 1: return (
                <ReviewStep
                    designer={mockDesignerFeedbackQuestions}
                    rating={rating}
                    setRating={setRating}
                    answers={answers}
                    setAnswers={setAnswers}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    canSubmit={canSubmit}
                    ratingError={ratingError}
                    clearRatingError={() => setRatingError(undefined)}
                />
            );
            case 2: return <SuccessStep onFinish={handleFinish} />;
            default: return <PromptStep onContinue={handleContinue} onSkip={handleSkip} />;
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto px-md py-xl sm:px-lg sm:py-2xl">
                {renderStep()}
            </div>
        </div>
    );
};

export default DesignerTestimonial;
