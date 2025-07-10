// src/components-lib/Hero/Hero_01/Hero_01.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { type Hero_01Props } from './Hero_01.types';
import { fadeInUp, slideInRight } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../comman-components/Para';

// Import reusable components

const Hero_01: React.FC<Hero_01Props> = ({
    title = "Medium length hero heading goes here",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    primaryCta = "Button",
    secondaryCta = "Button",
    imageSrc = "/images/component-lib-images/hero/placeholder-img.png",
    imageAlt = "Hero section image",
    animated = true,
    className = ""
}) => {
    return (
        <section className={`relative w-full h-screen lg:overflow-hidden bg-background-primary ${className}`}>
            <div className="w-full h-full lg:h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">

                    {/* Left Column - Content */}
                    <motion.div
                        className="flex flex-col justify-center px-lg py-2xl lg:px-2xl xl:px-5xl 2xl:px-6xl bg-background-primary order-1 lg:order-1"
                        initial={animated ? "hidden" : "show"}
                        animate="show"
                        variants={animated ? fadeInUp : undefined}
                    >
                        <div className="xl:max-w-lg space-y-md lg:space-y-lg">
                            {/* Main Heading with Heading Component */}
                            <motion.div
                                initial={animated ? "hidden" : "show"}
                                animate="show"
                                variants={animated ? fadeInUp : undefined}
                            >
                                <Heading 
                                    level="h1"
                                    color="primary"
                                    weight="bold"
                                    className="text-h2-sm lg:text-h1-md"
                                >
                                    {title}
                                </Heading>
                            </motion.div>

                            {/* Description with Para Component */}
                            <motion.div
                                initial={animated ? "hidden" : "show"}
                                animate="show"
                                variants={animated ? fadeInUp : undefined}
                            >
                                <Para
                                    size="md"
                                    color="secondary"
                                    className="lg:text-para-lg leading-relaxed"
                                >
                                    {description}
                                </Para>
                            </motion.div>

                            {/* CTA Buttons with SimpleButton Component */}
                            <motion.div
                                className="flex flex-col md:flex-row gap-md"
                                initial={animated ? "hidden" : "show"}
                                animate="show"
                                variants={animated ? fadeInUp : undefined}
                            >
                                {/* Primary CTA with motion wrapper for animation */}
                                <motion.div
                                    whileHover={animated ? { scale: 1.02 } : undefined}
                                    whileTap={animated ? { scale: 0.98 } : undefined}
                                    className="w-full md:w-auto"
                                >
                                    <SimpleButton
                                        variant="solid"
                                        size="lg"
                                        fullWidth
                                        className="md:w-auto"
                                    >
                                        {primaryCta}
                                    </SimpleButton>
                                </motion.div>

                                {/* Secondary CTA with motion wrapper for animation */}
                                <motion.div
                                    whileHover={animated ? { scale: 1.02 } : undefined}
                                    whileTap={animated ? { scale: 0.98 } : undefined}
                                    className="w-full md:w-auto"
                                >
                                    <SimpleButton
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        className="md:w-auto"
                                    >
                                        {secondaryCta}
                                    </SimpleButton>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        className="relative h-96 lg:h-screen order-2 lg:order-2"
                        initial={animated ? "hidden" : "show"}
                        animate="show"
                        variants={animated ? slideInRight : undefined}
                    >
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="w-full h-full lg:h-screen object-cover object-center"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero_01;