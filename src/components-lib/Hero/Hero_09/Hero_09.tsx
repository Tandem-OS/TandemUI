import React from 'react';
import { motion } from 'framer-motion';
import { type Hero_09Props } from './Hero_09.types';
import { fadeInUp } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../comman-components/Para';

/**
 * Hero_09 Component
 * Two-column hero with background - heading on left, content on right bottom
 * Features dual CTAs and viewport-triggered animations
 */
const Hero_09: React.FC<Hero_09Props> = ({
    title = "Medium length hero heading goes here",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    primaryCta = "Button",
    secondaryCta = "Button",
    backgroundSrc = "/images/component-lib-images/hero/placeholder-hero-bg.png",
    backgroundAlt = "Hero background",
    animated = true,
    overlayOpacity = 50,
    className = ""
}) => {
    return (
        <section className={`relative w-full min-h-screen lg:h-screen overflow-hidden ${className}`}>
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={backgroundSrc}
                    alt={backgroundAlt}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                />
                {/* Dark Overlay */}
                <div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: overlayOpacity / 100 }}
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full min-h-screen lg:h-screen py-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-[85vh] lg:h-full">
                    {/* Left Column - Heading */}
                    <motion.div
                        className="px-lg pb-xl lg:px-2xl xl:px-3xl 2xl:px-4xl pt-lg lg:pt-xl xl:pt-2xl"
                        initial={animated ? "hidden" : "show"}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={animated ? fadeInUp : undefined}
                    >
                        <div className="w-full">
                            <Heading
                                level="h1"
                                color="light"
                                weight="bold"
                                className="text-h2-sm lg:text-h1-md xl:text-h1-md !text-white"
                            >
                                {title}
                            </Heading>
                        </div>
                    </motion.div>

                    {/* Right Column - Content at Bottom */}
                    <div className="flex items-end px-lg pb-xl lg:px-2xl xl:px-2xl 2xl:px-4xl">
                        <motion.div
                            className="w-full space-y-md lg:space-y-lg"
                            initial={animated ? "hidden" : "show"}
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={animated ? fadeInUp : undefined}
                            transition={{ delay: 0.1 }}
                        >
                            {/* Description */}
                            <Para
                                size="md"
                                color="light"
                                className="lg:text-para-lg leading-relaxed !text-white/90"
                            >
                                {description}
                            </Para>

                            {/* CTA Buttons */}
                            <div className="flex gap-md">
                                {/* Primary CTA */}

                                <SimpleButton
                                    variant="solid"
                                    size="lg"
                                >
                                    {primaryCta}
                                </SimpleButton>

                                {/* Secondary CTA */}
                                <SimpleButton
                                    variant="outline"
                                    size="lg"
                                >
                                    {secondaryCta}
                                </SimpleButton>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero_09;