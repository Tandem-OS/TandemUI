import { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import { FaStar, FaCheckCircle, FaArrowRight, FaHeart, FaPaperPlane } from 'react-icons/fa';
import FormButton from '../../../../components/auth/form/components/FormButton';
import SimpleButton from '../../../../components/demos/buttons/SimpleButton';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { mockFeedbackQuestionData } from '../../../../mock-data/testimonial-questions-mock';

// --- TYPE DEFINITIONS ---
interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
    hoveredRating: number;
    setHoveredRating: (rating: number) => void;
}

interface InfoStepProps {
    icon: React.ReactNode;
    title: string;
    message: string;
    buttonText: string;
    onButtonClick: () => void;
    buttonIcon: React.ReactNode;
}

interface FeedbackAnswers {
    [key: string]: string;
}

interface ReviewStepProps {
    data: typeof mockFeedbackQuestionData;
    overallRating: number;
    setOverallRating: (rating: number) => void;
    answers: FeedbackAnswers;
    setAnswers: (answers: FeedbackAnswers) => void;
    handleSubmit: () => Promise<void>;
    isSubmitting: boolean;
    canSubmit: () => boolean;
    hoveredRating: number;
    setHoveredRating: (rating: number) => void;
    getEmojiForRating: (rating: number) => string;
}


// --- REUSABLE COMPONENTS ---

// StarRating Component (Memoized for better performance)
const StarRating: React.FC<StarRatingProps> = memo(({ rating, onRatingChange, hoveredRating, setHoveredRating }) => {
    const stars = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);

    return (
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-md">
            <div className="flex items-center gap-1">
                {stars.map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 transition-colors cursor-pointer ${star <= hoveredRating || star <= rating
                            ? 'text-yellow-300'
                            : 'text-indigo-200/50'
                            }`}
                        onClick={() => onRatingChange(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                    >
                        <FaStar className="w-full h-full" />
                    </button>
                ))}
            </div>
            <span className="text-para-lg md:text-para-xl text-white font-medium leading-none hidden sm:inline sm:pt-1">
                {rating}/10
            </span>
        </div>
    );
});

StarRating.displayName = 'StarRating';

// InfoStep Component (Memoized)
const InfoStep: React.FC<InfoStepProps> = memo(({ icon, title, message, buttonText, onButtonClick, buttonIcon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center space-y-md lg:space-y-lg mt-lg lg:mt-xl"
        >
            <motion.div
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-accent-subtle rounded-full flex items-center justify-center"
            >
                {icon}
            </motion.div>

            <motion.div
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="space-y-sm md:space-y-md"
            >
                <h1 className="text-h3-sm sm:text-h2-md lg:text-h1-sm font-bold text-text-primary">
                    {title}
                </h1>
                <p className="text-para-md sm:text-para-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                    {message}
                </p>
            </motion.div>

            <motion.div
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className='pt-sm'
            >
                <SimpleButton
                    onClick={onButtonClick}
                    className="flex gap-sm items-center"
                    size="lg"
                >
                    {buttonText}
                    {buttonIcon}
                </SimpleButton>
            </motion.div>
        </motion.div>
    );
});

InfoStep.displayName = 'InfoStep';

// ReviewStep Component (Memoized)
const ReviewStep: React.FC<ReviewStepProps> = memo(({
    data,
    overallRating,
    setOverallRating,
    answers,
    setAnswers,
    handleSubmit,
    isSubmitting,
    canSubmit,
    hoveredRating,
    setHoveredRating,
    getEmojiForRating,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [emojiKey, setEmojiKey] = useState(0);

    const handleAnswerChange = useCallback((questionId: string, value: string) => {
        setAnswers({ ...answers, [questionId]: value });
    }, [answers, setAnswers]);

    useEffect(() => {
        if (overallRating > 0) {
            setEmojiKey(prev => prev + 1);
        }
    }, [overallRating]);

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-lg md:space-y-xl max-w-3xl mx-auto"
        >
            <motion.div
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-center space-y-sm"
            >
                <h2 className="text-h4-md sm:text-h3-md lg:text-h2-md font-bold text-text-primary">
                    {data.title}
                </h2>
                <p className="text-para-sm sm:text-para-md text-text-secondary">
                    {data.subtitle}
                </p>
            </motion.div>

            <div className="space-y-lg md:space-y-xl">
                <motion.div
                    animate={isInView ? "visible" : "hidden"}
                    variants={variants}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="bg-accent-default rounded-xl p-md sm:p-lg lg:p-xl border border-border-default shadow-lg"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-md sm:gap-lg">
                        <motion.div
                            key={emojiKey}
                            initial={{ scale: 0.5, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="text-6xl sm:text-7xl order-1 sm:order-2"
                        >
                            {getEmojiForRating(hoveredRating || overallRating)}
                        </motion.div>

                        <div className="space-y-md text-center sm:text-left order-2 sm:order-1">
                            <h3 className="text-para-lg sm:text-h5-sm lg:text-h4-sm font-medium text-white">
                                {data.ratingQuestion}
                            </h3>
                            <p className="text-para-md lg:text-para-lg text-white/90 font-semibold hidden sm:block">Your rating</p>
                            <StarRating
                                rating={overallRating}
                                onRatingChange={setOverallRating}
                                hoveredRating={hoveredRating}
                                setHoveredRating={setHoveredRating}
                            />
                        </div>
                    </div>
                </motion.div>

                {data.questions.map((q, index) => (
                    <motion.div
                        key={q.id}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={variants}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 + index * 0.1 }}
                        className="space-y-sm"
                    >
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
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                className="flex justify-center pt-md lg:pt-lg"
            >
                <FormButton
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    size="lg"
                    fullWidth
                    disabled={!canSubmit() || isSubmitting}
                >
                    <div className="flex items-center gap-sm">
                        <FaPaperPlane className="text-icon-sm" />
                        <span>Submit Feedback</span>
                    </div>
                </FormButton>
            </motion.div>
        </motion.div>
    );
});

ReviewStep.displayName = 'ReviewStep';


// --- MAIN COMPONENT ---

const FinalTestimonial: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [overallRating, setOverallRating] = useState<number>(0);
    const [answers, setAnswers] = useState<FeedbackAnswers>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hoveredRating, setHoveredRating] = useState<number>(0);

    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        setIsSubmitting(true);
        try {
            const submissionData = {
                overallRating,
                answers,
                submittedAt: new Date().toISOString()
            };

            console.log('Submitting data:', submissionData);
            await axios.post('/api/testimonials', submissionData);

            setCurrentStep(2);

        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [overallRating, answers]);

    const canSubmit = useCallback((): boolean => {
        return overallRating > 0;
    }, [overallRating]);

    const getEmojiForRating = useCallback((rating: number): string => {
        if (rating === 0) return '😊';
        if (rating <= 2) return '😡';
        if (rating <= 4) return '😞';
        if (rating <= 6) return '😐';
        if (rating <= 8) return '😊';
        if (rating <= 10) return '🤩';
        return '😊';
    }, []);

    const handleGoToDashboard = useCallback(() => {
        navigate('/dashboard/client');
    }, [navigate]);

    const steps = useMemo(() => [
        <InfoStep
            key="intro"
            icon={<FaHeart className="text-h3-lg lg:text-h2-lg text-accent-default" />}
            title="Help Us Improve & Inspire Others"
            message="Your feedback helps us deliver exceptional experiences and shows future clients what it's like to work with Tandem."
            buttonText="Get Started"
            onButtonClick={() => setCurrentStep(1)}
            buttonIcon={<FaArrowRight className="text-icon-sm" />}
        />,
        <ReviewStep
            key="review"
            data={mockFeedbackQuestionData}
            overallRating={overallRating}
            setOverallRating={setOverallRating}
            answers={answers}
            setAnswers={setAnswers}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            canSubmit={canSubmit}
            hoveredRating={hoveredRating}
            setHoveredRating={setHoveredRating}
            getEmojiForRating={getEmojiForRating}
        />,
        <InfoStep
            key="success"
            icon={<FaCheckCircle className="text-h3-lg lg:text-h2-lg text-accent-default" />}
            title="Thanks for Sharing!"
            message="Your words mean a lot to us. Thanks for helping us grow and for inspiring future clients to work with Tandem."
            buttonText="Back to Dashboard"
            onButtonClick={handleGoToDashboard}
            buttonIcon={<FaArrowRight className="text-icon-sm" />}
        />
    ], [overallRating, answers, handleSubmit, isSubmitting, canSubmit, hoveredRating, getEmojiForRating, handleGoToDashboard]);

    return (
        <div className="bg-background-secondary-2">
            <div className="max-w-4xl mx-auto px-md py-lg sm:px-lg sm:py-xl lg:py-2xl">
                {steps[currentStep]}
            </div>
        </div>
    );
};

export default FinalTestimonial;