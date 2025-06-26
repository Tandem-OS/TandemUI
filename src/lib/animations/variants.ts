import { type Variants, type Transition } from 'framer-motion';

const defaultEase: Transition['ease'] = 'easeOut';

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: defaultEase },
    },
};

export const slideIn: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: defaultEase },
    },
};

export const bounceIn: Variants = {
    hidden: { scale: 0 },
    show: {
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: 0.5 },
    },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

// Fixed ease typing here using Transition['ease']
export const greenOverlayVariant: Variants = {
    hidden: { height: '0%' },
    show: {
        height: '30%',
        transition: {
            duration: 1.2,
            ease: 'easeInOut' as Transition['ease'],
        },
    },
};

export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        x: -20,
    },
    in: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 },
    },
    out: {
        opacity: 0,
        x: 20,
        transition: { duration: 0.5 },
    },
};

export const containerVariant: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
        },
    },
};

export const fadeInLeft: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3 },
    },
};

