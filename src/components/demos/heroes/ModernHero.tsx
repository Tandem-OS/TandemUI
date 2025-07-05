import React from 'react'
import { motion } from 'framer-motion'
import type { HeroBuilderProps } from '../../../types/component.types'
import { fadeInUp, slideIn, staggerContainer } from '../../../lib/animations/variants'
import ModernImg from '../../../assets/images/MinimalImg.webp'
import Heading from '../typography/Heading'
import SimpleButton from '../buttons/SimpleButton'

const MotionHeading = motion(Heading)
const MotionButton = motion(SimpleButton)

const ModernHero: React.FC<HeroBuilderProps> = ({
    headline = "Let's Dezign Something Big",
    subheadline = 'DezignRoom is the platform where we make professional design easy, simple, and accessible for everyone.',
    ctaText = 'Get Started',
    layout = 'split',
    animation = 'none',
}) => {
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
        <section className="bg-background-primary transition-colors duration-slow">
            <motion.div
                className={`font-poppins ${layout === 'fullwidth' ? '' : 'container mx-auto'} px-sm sm:px-md min-h-screen flex flex-col ${layoutClasses}`}
                variants={staggerContainer}
                initial={initialState}
                animate="show"
            >
                <div className={`grid ${layout === 'centered' ? 'grid-cols-1 mt-xl' : 'grid-cols-1 lg:grid-cols-2'} gap-md items-center`}>
                    <div className={`max-lg:p-lg ${layout === 'centered' ? 'order-1 flex flex-col justify-center items-center' : ''}`}>
                        <hr className="border-none h-[10px] mb-xl rounded-xl w-[60px] bg-accent-default" />
                        
                        <MotionHeading
                            level="h1"
                            color="primary"
                            weight="medium"
                            align={layout === 'centered' ? 'center' : 'left'}
                            className="mb-lg"
                            variants={variant}
                        >
                            {headline}
                        </MotionHeading>
                        
                        <MotionHeading
                            level="h3"
                            color="primary"
                            weight="light"
                            align={layout === 'centered' ? 'center' : 'left'}
                            className={`max-w-3xl mb-xl ${layout !== "centered" ? "mx-none" : "mx-auto"}`}
                            variants={variant}
                        >
                            {subheadline}
                        </MotionHeading>
                        
                        <MotionButton
                            variant="solid"
                            size="md"
                            shape="rounded"
                            className="font-medium shadow-lg hover:shadow-xl duration-300"
                            variants={variant}
                        >
                            {ctaText}
                        </MotionButton>
                    </div>
                    <div className={`p-md lg:p-xl flex justify-center ${layout === 'centered' ? 'order-2' : ''} ${layout === 'fullwidth' ? 'lg:p-none' : ''}`}>
                        <img
                            src={ModernImg}
                            alt="modern hero illustration"
                            className={`max-w-full shadow-xl rounded-xl ${layout === 'centered' ? 'w-full' : 'xl:w-[85%]'} ${layout === 'fullwidth' ? 'xl:w-full' : ''} p-md border-8 bg-transparent border-accent-default`}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default ModernHero