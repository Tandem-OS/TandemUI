import React from 'react'
import { motion } from 'framer-motion'
import heroBg from '../../../assets/images/creative-hero-bg.webp'
import type { HeroBuilderProps } from '../../../types/component.types'
import {
    fadeInUp,
    slideIn,
    greenOverlayVariant,
    staggerContainer,
} from '../../../lib/animations/variants'

const CreativeHero: React.FC<HeroBuilderProps> = ({
    headline = "Let's Dezign Something",
    subheadline = 'DezignRoom is the platform where we make professional design easy, simple, and accessible for everyone.',
    ctaText = 'Get Started',
    layout = 'centered',
    animation = 'fade',
    colors = {},
}) => {
    const defaultColors = {
        primary: '#22c55e',
        secondary: '#10b981',
        text: '#ffffff',
    }

    const mergedColors = { ...defaultColors, ...colors }

    const variant = animation === 'fade' ? fadeInUp : animation === 'slide' ? slideIn : undefined

    // Determine layout classes
    let layoutClasses = ''
    if (layout === 'split') {
        layoutClasses = 'flex-col justify-center items-start text-left'
    } else if (layout === 'fullwidth') {
        layoutClasses = 'flex-col justify-center items-center text-center w-full'
    } else {
        layoutClasses = 'flex-col justify-center items-center text-center'
    }

    return (
        <section className="relative w-full min-h-[75vh] md:min-h-screen flex items-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})` }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/80 z-0" />

            {/* Green gradient overlay animation */}
            {animation !== 'none' && (
                <motion.div
                    className="absolute inset-x-0 bottom-0"
                    style={{
                        height: '20%',
                        background: `linear-gradient(to top, ${colors.primary}, transparent)`,
                        zIndex: 1,
                        opacity: "0.1"
                    }}
                    variants={greenOverlayVariant}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                />
            )}

            {/* Animated Content */}
            <motion.div
                className={
                    'relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex h-full ' +
                    layoutClasses
                }
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight mb-6 max-w-4xl"
                    style={{ color: mergedColors.primary }}
                    variants={variant}
                >
                    {headline}
                </motion.h1>

                <motion.h2
                    className="text-lg sm:text-xl md:text-3xl font-light max-w-3xl mb-8"
                    style={{ color: mergedColors.text }}
                    variants={variant}
                >
                    {subheadline}
                </motion.h2>

                <motion.button
                    className="font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-lg"
                    style={{
                        backgroundColor: mergedColors.primary,
                        borderColor: mergedColors.secondary,
                        color: mergedColors.text,
                    }}
                    variants={variant}
                >
                    {ctaText}
                </motion.button>
            </motion.div>
        </section>
    )
}

export default CreativeHero