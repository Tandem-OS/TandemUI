// src/lib/variants.ts

import { type Variants, type Transition } from 'framer-motion';

const defaultEase: Transition['ease'] = 'easeOut';

/**
 * Standard fade in with upward movement
 * Perfect for text content and CTAs
 */
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: defaultEase },
    },
};

/**
 * Slide in from left
 * Great for hero content and feature blocks
 */
export const slideIn: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: defaultEase },
    },
};

/**
 * Slide in from right
 * Perfect for images and secondary content
 */
export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: defaultEase },
    },
};

/**
 * Bounce in with spring animation
 * Great for interactive elements and CTAs
 */
export const bounceIn: Variants = {
    hidden: { scale: 0 },
    show: {
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
};

/**
 * Simple fade in
 * Subtle animation for backgrounds and containers
 */
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: 0.5 },
    },
};

/**
 * Stagger container for multiple children
 * Creates cascading animation effect
 */
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

/**
 * Hero stagger container
 * Optimized timing for hero sections
 */
export const heroStagger: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

/**
 * Scale in with fade
 * Perfect for images and media content
 */
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: defaultEase },
    },
};

/**
 * Overlay reveal animation
 * For background overlays and modals
 */
export const overlayVariant: Variants = {
    hidden: { height: '0%' },
    show: {
        height: '30%',
        transition: {
            duration: 1.2,
            ease: 'easeInOut' as Transition['ease'],
        },
    },
};

/**
 * Page transition variants
 * For route-based animations
 */
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

/**
 * Container animation with stagger
 * For content blocks and sections
 */
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

/**
 * Fade in from left
 * Alternative to slideIn with shorter distance
 */
export const fadeInLeft: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3 },
    },
};

/**
 * Button hover animation
 * For interactive elements
 */
export const buttonHover: Variants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { duration: 0.2, ease: 'easeInOut' },
    },
    tap: {
        scale: 0.95,
        transition: { duration: 0.1 },
    },
};

/**
 * Image parallax effect
 * For hero images and backgrounds
 */
export const imageParallax: Variants = {
    hidden: { opacity: 0, y: 20, scale: 1.1 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: defaultEase },
    },
};

// Simple smooth animation variants - TypeScript friendly
export const smoothExpand: Variants = {
    initial: {
        opacity: 0,
        scaleY: 0,
        transformOrigin: 'top'
    },
    animate: {
        opacity: 1,
        scaleY: 1,
        transformOrigin: 'top'
    },
    exit: {
        opacity: 0,
        scaleY: 0,
        transformOrigin: 'top'
    }
    
};
/**
 * Page transition config
 * Used with pageVariants for route-based animations
 */
export const pageTransition: Transition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3,
};