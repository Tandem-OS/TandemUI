import React from 'react';
import { motion } from 'framer-motion';
import { type Hero_02Props } from './Hero_02.types';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../comman-components/Para';

/**
 * Hero_02 Component
 * Split layout hero section with content on right, image on left
 * Features dual CTAs and viewport-triggered animations
 */
const Hero_02: React.FC<Hero_02Props> = ({
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
        <section className={`relative w-full lg:h-screen bg-background-primary ${className}`}>
            <div className="w-full h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
                    {/* Image Column */}
                    <div className="relative h-96 lg:h-screen order-2 lg:order-1">
                        <motion.div
                            className="w-full h-full"
                            initial={animated ? "hidden" : "show"}
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={animated ? fadeIn : undefined}
                        >
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="w-full h-full lg:h-screen object-cover object-bottom"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                    {/* Content Column */}
                    <motion.div
                        className="flex flex-col justify-center px-lg py-2xl lg:px-2xl xl:px-5xl 2xl:px-6xl bg-background-primary order-1 lg:order-2 min-h-[50vh] lg:min-h-0"
                        initial={animated ? "hidden" : "show"}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={animated ? fadeInUp : undefined}
                    >
                        <div className="xl:max-w-lg space-y-md lg:space-y-lg">

                            {/* Main Heading */}
                            <motion.div
                                initial={animated ? "hidden" : "show"}
                                whileInView="show"
                                viewport={{ once: true }}
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

                            {/* Description */}
                            <motion.div
                                initial={animated ? "hidden" : "show"}
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={animated ? fadeInUp : undefined}
                                transition={{ delay: 0.1 }}
                            >
                                <Para
                                    size="md"
                                    color="secondary"
                                    className="lg:text-para-lg leading-relaxed"
                                >
                                    {description}
                                </Para>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-col md:flex-row gap-md"
                                initial={animated ? "hidden" : "show"}
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={animated ? fadeInUp : undefined}
                                transition={{ delay: 0.2 }}
                            >
                                {/* Primary CTA */}
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

                                {/* Secondary CTA */}
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
                </div>
            </div>
        </section>
    );
};

export default Hero_02;
