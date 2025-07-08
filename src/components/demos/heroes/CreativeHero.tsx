import React from 'react'
import { motion } from 'framer-motion'
import heroBg from '../../../assets/images/creative-hero-bg.webp'
import type { HeroBuilderProps } from '../../../types/component.types'
import {
    fadeInUp,
    slideIn,
    overlayVariant,
    staggerContainer,
} from '../../../lib/animations/variants'
import Heading from '../typography/Heading'
import SimpleButton from '../buttons/SimpleButton'

const MotionHeading = motion(Heading)
const MotionButton = motion(SimpleButton)

const CreativeHero: React.FC<HeroBuilderProps> = ({
    headline = "Let's Dezign Something",
    subheadline = 'DezignRoom is the platform where we make professional design easy, simple, and accessible for everyone.',
    ctaText = 'Get Started',
    layout = 'centered',
    animation = 'fade',
}) => {
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
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-accent-default/10 to-transparent z-1"
                    style={{
                        height: '20%',
                    }}
                    variants={overlayVariant}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                />
            )}

            {/* Animated Content */}
            <motion.div
                className={
                    'relative z-10 container mx-auto px-md sm:px-lg lg:px-xl flex h-full ' +
                    layoutClasses
                }
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
            >
                <MotionHeading
                    level="h1"
                    color="accent"
                    weight="semibold"
                    className={`mb-lg max-w-4xl ${layout === 'split' ? 'text-left' : 'text-center'}`}
                    variants={variant}
                >
                    {headline}
                </MotionHeading>

                <MotionHeading
                    level="h3"
                    color="light"
                    weight="light"
                    className={`max-w-3xl mb-xl ${layout === 'split' ? 'text-left' : 'text-center'}`}

                    variants={variant}
                >
                    {subheadline}
                </MotionHeading>

                <MotionButton
                    variant="solid"
                    size="lg"
                    shape="rounded"
                    className="font-medium shadow-lg hover:shadow-xl transition duration-300"
                    variants={variant}
                >
                    {ctaText}
                </MotionButton>
            </motion.div>
        </section>
    )
}

export default CreativeHero