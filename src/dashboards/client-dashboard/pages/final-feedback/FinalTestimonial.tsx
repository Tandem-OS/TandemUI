import { useState, useRef, useEffect, useCallback } from 'react';
import { FaStar, FaCheckCircle, FaArrowRight, FaHeart } from 'react-icons/fa';
import FormButton from '../../../../components/auth/form/components/FormButton';
import { FaPaperPlane } from 'react-icons/fa6';
import SimpleButton from '../../../../components/demos/buttons/SimpleButton';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define types for props to ensure TypeScript friendliness

interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
    hoveredRating: number;
    setHoveredRating: (rating: number) => void;
}

// StarRating Component
const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, hoveredRating, setHoveredRating }) => {
    return (
        <div className="flex gap-1 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`w-8 h-8 lg:w-10 lg:h-10 transition-colors cursor-pointer ${star <= hoveredRating
                            ? 'text-yellow-300'
                            : star <= rating
                                ? 'text-yellow-300'
                                : 'text-border-muted'
                        }`}
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                >
                    <FaStar className="w-full h-full" />
                </button>
            ))}
            <span className="ml-sm text-para-md text-white font-medium">
                {rating}/10
            </span>
        </div>
    );
};

// InfoStep Component for reusability (Intro and Success screens)
interface InfoStepProps {
    icon: React.ReactNode;
    title: string;
    message: string;
    buttonText: string;
    onButtonClick: () => void;
    buttonIcon: React.ReactNode;
}

const InfoStep: React.FC<InfoStepProps> = ({ icon, title, message, buttonText, onButtonClick, buttonIcon }) => {
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
            className="text-center space-y-lg mt-xl lg:mt-2xl"
        >
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="w-24 h-24 mx-auto bg-accent-subtle rounded-full flex items-center justify-center"
            >
                {icon}
            </motion.div>

            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="space-y-md"
            >
                <h1 className="text-h2-md lg:text-h1-sm font-bold text-text-primary">
                    {title}
                </h1>
                <p className="text-para-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                    {message}
                </p>
            </motion.div>

            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
                {/* Using SimpleButton component */}
                <SimpleButton
                    onClick={onButtonClick}
                    className="flex gap-sm items-center" // Ensure flex and gap are applied for icon
                    size="lg"
                >
                    {buttonText}
                    {buttonIcon}
                </SimpleButton>
            </motion.div>
        </motion.div>
    );
};


// ReviewStep Component
interface ReviewStepProps {
    overallRating: number;
    setOverallRating: (rating: number) => void;
    standoutAnswer: string;
    setStandoutAnswer: (answer: string) => void;
    recommendAnswer: string;
    setRecommendAnswer: (answer: string) => void;
    handleSubmit: () => Promise<void>;
    isSubmitting: boolean;
    canSubmit: () => boolean;
    hoveredRating: number;
    setHoveredRating: (rating: number) => void;
    getEmojiForRating: (rating: number) => string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
    overallRating,
    setOverallRating,
    standoutAnswer,
    setStandoutAnswer,
    recommendAnswer,
    setRecommendAnswer,
    handleSubmit,
    isSubmitting,
    canSubmit,
    hoveredRating,
    setHoveredRating,
    getEmojiForRating,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const [emojiKey, setEmojiKey] = useState(0);
    useEffect(() => {
        if (overallRating > 0) {
            setEmojiKey(prev => prev + 1);
        }
    }, [overallRating]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-xl max-w-3xl mx-auto"
        >
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-center space-y-sm"
            >
                <h2 className="text-h3-md lg:text-h2-md font-bold text-text-primary">
                    Share Your Experience
                </h2>
                <p className="text-para-md text-text-secondary">
                    Help us understand your experience and what made it special
                </p>
            </motion.div>

            <div className="space-y-xl">
                {/* Overall Rating */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={variants}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="bg-accent-default rounded-xl p-xl border border-border-default shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div className="space-y-md text-left">
                            <h3 className="text-h4-sm font-medium text-white">
                                How would you rate your overall experience with us?
                            </h3>
                            <StarRating
                                rating={overallRating}
                                onRatingChange={setOverallRating}
                                hoveredRating={hoveredRating}
                                setHoveredRating={setHoveredRating}
                            />
                        </div>
                        <motion.div
                            key={emojiKey}
                            initial={{ rotate: 0 }}
                            animate={{ rotate: overallRating > 0 ? 360 : 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-7xl ml-lg"
                        >
                            {getEmojiForRating(hoveredRating || overallRating)}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Standout Question */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={variants}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="space-y-md"
                >
                    <label htmlFor="standout-textarea" className="block text-para-md font-medium text-text-primary">
                        What stood out most about working with us? (Optional)
                    </label>
                    <textarea
                        id="standout-textarea"
                        value={standoutAnswer}
                        onChange={(e) => setStandoutAnswer(e.target.value)}
                        placeholder="Share what made this experience memorable..."
                        className="w-full h-32 p-lg text-para-md text-text-primary bg-background-secondary border border-border-default rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-accent-default focus:border-transparent transition-all placeholder:text-text-tertiary"
                        maxLength={500}
                    />
                    <div className="flex justify-between text-para-sm">
                        <span className="text-text-tertiary">
                            Optional
                        </span>
                        <span className="text-text-tertiary">
                            {standoutAnswer.length}/500
                        </span>
                    </div>
                </motion.div>

                {/* Recommend Question */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={variants}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                    className="space-y-md"
                >
                    <label htmlFor="recommend-textarea" className="block text-para-md font-medium text-text-primary">
                        Would you recommend Tandem to others? Why? (Optional)
                    </label>
                    <textarea
                        id="recommend-textarea"
                        value={recommendAnswer}
                        onChange={(e) => setRecommendAnswer(e.target.value)}
                        placeholder="Tell us why you'd recommend our services..."
                        className="w-full h-32 p-lg text-para-md text-text-primary bg-background-secondary border border-border-default rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-accent-default focus:border-transparent transition-all placeholder:text-text-tertiary"
                        maxLength={500}
                    />
                    <div className="flex justify-between text-para-sm">
                        <span className="text-text-tertiary">
                            Optional
                        </span>
                        <span className="text-text-tertiary">
                            {recommendAnswer.length}/500
                        </span>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                className="flex justify-center pt-lg"
            >
                <FormButton
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    size="lg"
                    className='w-full'
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
};


const FinalTestimonial: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [overallRating, setOverallRating] = useState<number>(0);
    const [standoutAnswer, setStandoutAnswer] = useState<string>('');
    const [recommendAnswer, setRecommendAnswer] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hoveredRating, setHoveredRating] = useState<number>(0);

    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        setCurrentStep(2);

        setIsSubmitting(true);
        try {
            const submissionData = {
                overallRating,
                standoutAnswer,
                recommendAnswer,
                submittedAt: new Date().toISOString()
            };

            // Axios POST request setup
            // Replace '/api/testimonials' with your actual API endpoint
            const response = await axios.post('/api/testimonials', submissionData);
            console.log('Testimonial submitted:', response.data);

        } catch (error) {
            console.error('Submission error:', error);
            // Optionally, handle error state or show a message to the user
        } finally {
            setIsSubmitting(false);
        }
    }, [overallRating, standoutAnswer, recommendAnswer]);

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

    const steps = [
        <InfoStep
            key="intro"
            icon={<FaHeart className="text-h2-lg text-accent-default" />}
            title="Help Us Improve & Inspire Others"
            message="Your feedback helps us deliver exceptional experiences and shows future clients what it's like to work with Tandem."
            buttonText="Get Started"
            onButtonClick={() => setCurrentStep(1)}
            buttonIcon={<FaArrowRight className="text-icon-sm" />}
        />,
        <ReviewStep
            key="review"
            overallRating={overallRating}
            setOverallRating={setOverallRating}
            standoutAnswer={standoutAnswer}
            setStandoutAnswer={setStandoutAnswer}
            recommendAnswer={recommendAnswer}
            setRecommendAnswer={setRecommendAnswer}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            canSubmit={canSubmit}
            hoveredRating={hoveredRating}
            setHoveredRating={setHoveredRating}
            getEmojiForRating={getEmojiForRating}
        />,
        <InfoStep
            key="success"
            icon={<FaCheckCircle className="text-h2-lg text-accent-default" />}
            title="Thanks for Sharing!"
            message="Your words mean a lot to us. Thanks for helping us grow and for inspiring future clients to work with Tandem."
            buttonText="Back to Dashboard"
            onButtonClick={handleGoToDashboard}
            buttonIcon={<FaArrowRight className="text-icon-sm" />}
        />
    ];

    return (
        <div className="bg-background-secondary-2">
            <div className="max-w-4xl mx-auto px-md py-xl lg:py-2xl">
                {steps[currentStep]}
            </div>
        </div>
    );
};

export default FinalTestimonial;