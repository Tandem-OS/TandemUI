import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { type Hero_07Props } from './Hero_07.types';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../comman-components/Para';
import Newsletter from '../../../comman-components/Newsletter';
import VideoPlayBtn from '../../../comman-components/VideoPlayBtn';
/**
 * Hero_07 Component
 * Split layout hero section with content and newsletter on left, video on right
 * Features newsletter signup and video player with viewport-triggered animations
 */
const Hero_07: React.FC<Hero_07Props> = ({
    title = "Medium length hero heading goes here",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    newsletterPlaceholder = "Enter your email",
    newsletterButtonText = "Sign up",
    newsletterMessage = "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    videoSrc = "/images/component-lib-images/hero/placeholder-video.mp4",
    videoThumbnailSrc = "/images/component-lib-images/hero/placeholder-video-thumbnail.png",
    animated = true,
    videoAutoPlay = false,
    videoLoop = true,
    onNewsletterSubmit,
    className = ""
}) => {
    const [isPlaying, setIsPlaying] = useState(videoAutoPlay);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className={`relative w-full lg:h-screen bg-background-primary lg:overflow-hidden ${className}`}>
            <div className="w-full h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">

                    {/* Content Column */}
                    <motion.div
                        className="flex flex-col justify-center px-lg py-xl lg:px-2xl xl:px-5xl 2xl:px-6xl bg-background-primary order-1 lg:order-1 min-h-[50vh] lg:min-h-0"
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

                            {/* Newsletter Form */}
                            <motion.div
                                initial={animated ? "hidden" : "show"}
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={animated ? fadeInUp : undefined}
                                transition={{ delay: 0.2 }}
                            >
                                <Newsletter
                                    placeholder={newsletterPlaceholder}
                                    buttonText={newsletterButtonText}
                                    message={newsletterMessage}
                                    variant="outlined"
                                    animated={animated}
                                    onSubmit={onNewsletterSubmit}
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Video Column */}
                    <div className="relative h-96 lg:h-screen order-2 lg:order-2">
                        <motion.div
                            className="relative w-full h-full overflow-hidden"
                            initial={animated ? "hidden" : "show"}
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={animated ? fadeIn : undefined}
                        >
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/30 z-10" />

                            {/* Video element */}
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover object-center"
                                poster={videoThumbnailSrc}
                                loop={videoLoop}
                                muted
                                playsInline
                                onEnded={() => setIsPlaying(false)}
                            >
                                <source src={videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Play/Pause button */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <VideoPlayBtn
                                    isPlaying={isPlaying}
                                    onClick={handlePlayPause}
                                    size="lg"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero_07;