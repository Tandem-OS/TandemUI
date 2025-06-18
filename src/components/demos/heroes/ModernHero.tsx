import React from 'react'
import { motion } from 'framer-motion'
import type { HeroBuilderProps } from '../../../types/component.types'
import { fadeInUp, slideIn, staggerContainer } from '../../../lib/animations/variants'
import ModernImg from '../../../assets/images/MinimalImg.webp'

const ModernHero: React.FC<HeroBuilderProps> = ({
    headline = "Let's Dezign Something Big",
    subheadline = 'DezignRoom is the platform where we make professional design easy, simple, and accessible for everyone.',
    ctaText = 'Get Started',
    layout = 'split',
    animation = 'none',
    colors = {},
}) => {
    // Merge with default colors
    const defaultColors = {
        primary: '#f97316',
        secondary: '#ea580c',
        text: '#35383d',
    }
    const mergedColors = { ...defaultColors, ...colors }

    const variant = animation === 'fade' ? fadeInUp : animation === 'slide' ? slideIn : undefined
    const initialState = variant ? 'hidden' : 'show'

    let layoutClasses = ''
    if (layout === 'centered') {
        layoutClasses = 'justify-center items-center text-center'
    } else if (layout === 'fullwidth') {
        layoutClasses = 'justify-center items-center text-left w-full'
    } else {
        layoutClasses = 'justify-center items-center text-left'
    }

    return (
        <section className="bg-white transition-colors duration-slow">
            <motion.div
                className={`font-poppins ${layout === 'fullwidth' ? '' : 'container mx-auto'} px-2 sm:px-3 min-h-screen flex flex-col ${layoutClasses}`}
                variants={staggerContainer}
                initial={initialState}
                animate="show"
            >
                <div className={`grid ${layout === 'centered' ? 'grid-cols-1 mt-10' : 'grid-cols-1 lg:grid-cols-2'} gap-5 items-center`}>
                    <div className={`max-lg:p-6 ${layout === 'centered' ? 'order-1 flex flex-col justify-center items-center' : ''}`}>
                        <hr
                            className="border-none h-[10px] mb-8 rounded-xl w-[60px]"
                            style={{ backgroundColor: mergedColors.primary }}
                        />
                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-7xl font-medium leading-tight mb-6"
                            style={{ color: mergedColors.text }}
                            variants={variant}
                        >
                            {headline}
                        </motion.h1>
                        <motion.h2
                            className={`sm:text-lg md:text-2xl font-light max-w-3xl mx-auto mb-8 ${layout !== "centered" ? "ml-0" : ""}`}
                            style={{ color: mergedColors.text }}
                            variants={variant}
                        >
                            {subheadline}
                        </motion.h2>
                        <motion.button
                            className="font-medium py-3 px-6 lg:px-8 rounded-lg shadow-lg hover:shadow-xl duration-300 lg:text-lg"
                            style={{ backgroundColor: mergedColors.primary, color: '#fff' }}
                            variants={variant}
                        >
                            {ctaText}
                        </motion.button>
                    </div>
                    <div className={`p-5 lg:p-10 flex justify-center ${layout === 'centered' ? 'order-2' : ''} ${layout === 'fullwidth' ? 'lg:p-0' : ''}`}>
                        <img
                            src={ModernImg}
                            alt="modern hero illustration"
                            className={`max-w-full shadow-xl rounded-xl ${layout === 'centered' ? 'w-full' : 'xl:w-[85%]'} ${layout === 'fullwidth' ? 'xl:w-full' : ''} p-4 border-8 bg-transparent`}
                            style={{ border: `7px solid ${mergedColors.primary}` }}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default ModernHero
