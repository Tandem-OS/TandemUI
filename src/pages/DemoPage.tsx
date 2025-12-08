
import React from 'react';
import { Hero_01 } from '../components-lib/Hero';

/**
 * Demo Page
 * Shows all Hero components with default content
 */
const DemoPage: React.FC = () => {
    return (
        <>

            <Hero_01
                title="Medium length hero heading goes here"
                description="An impactful message that describes your value prop clearly and concisely."
                primaryCTA={{
                    text: "Get Started",
                    href: "/auth",
                    variant: "solid",
                    size: "lg",
                }}
                secondaryCTA={{
                    text: "Learn More",
                    href: "/learn",
                    variant: "outline",
                    size: "lg",
                }}
                image={{
                    src: "/images/component-lib-images/hero/placeholder-img.png",
                    alt: "Illustration showing app usage"
                }}
                animated={true}
                colors={{
                    background: { light: "#ffffff", dark: "#0f172a" },
                    title: { light: "#111827", dark: "#f9fafb" },
                    description: { light: "#4b5563", dark: "#d1d5db" },
                    primaryButton: {
                        background: { light: "#4f46e5", dark: "#6366f1" },
                        text: { light: "#ffffff", dark: "#ffffff" },
                        border: { light: "#4f46e5", dark: "#6366f1" },
                        hover: {
                            background: { light: "#3730a3", dark: "#4f46e5" },
                            text: { light: "#ffffff", dark: "#ffffff" },
                            border: { light: "#3730a3", dark: "#4f46e5" }
                        }
                    },
                    secondaryButton: {
                        background: { light: "transparent", dark: "transparent" },
                        text: { light: "#4f46e5", dark: "#6366f1" },
                        border: { light: "#4f46e5", dark: "#6366f1" },
                        hover: {
                            background: { light: "#4f46e5", dark: "#6366f1" },
                            text: { light: "#ffffff", dark: "#ffffff" },
                            border: { light: "#4f46e5", dark: "#6366f1" }
                        }
                    }
                }}
            />
            {/* <Hero_02
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                animated={true}
            />
            <Hero_03
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                newsletterPlaceholder="Enter your email"
                newsletterButtonText="Sign up"
                newsletterMessage="By clicking Subscribe you're confirming that you agree with our Terms and Conditions."
                animated={true}
            />
            <Hero_04
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                newsletterPlaceholder="Your email address"
                newsletterButtonText="Sign up"
                newsletterMessage="By clicking Subscribe you're confirming that you agree with our Terms and Conditions."
                animated={true}
            />
            <Hero_05
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/placeholer-video-thumbnail.png"
                videoAutoPlay={false}
                videoLoop={true}
                animated={true}
            />
            <Hero_06
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/placeholer-video-thumbnail.png"
                videoAutoPlay={false}
                videoLoop={true}
                animated={true}
            />
            <Hero_07
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                newsletterPlaceholder="Enter your email"
                newsletterButtonText="Sign up"
                newsletterMessage="By clicking Subscribe you're confirming that you agree with our Terms and Conditions."
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/placeholer-video-thumbnail.png"
                videoAutoPlay={false}
                videoLoop={true}
                animated={true}
            />
            <Hero_08
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                newsletterPlaceholder="Enter your email"
                newsletterButtonText="Sign up"
                newsletterMessage="By clicking Subscribe you're confirming that you agree with our Terms and Conditions."
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/placeholer-video-thumbnail.png"
                videoAutoPlay={false}
                videoLoop={true}
                animated={true}
            />
            <Hero_09
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                backgroundSrc="/images/component-lib-images/hero/placeholder-hero-bg.png"
                overlayOpacity={50}
                animated={true}
            />
            <Hero_10
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                backgroundSrc="/images/component-lib-images/hero/placeholder-hero-bg.png"
                overlayOpacity={50}
                animated={true}
            />
            <Hero_11
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                backgroundSrc="/images/component-lib-images/hero/placeholder-hero-bg.png"
                overlayOpacity={50}
                animated={true}
            />
            <Hero_12
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                backgroundSrc="/images/component-lib-images/hero/placeholder-hero-bg.png"
                overlayOpacity={50}
                animated={true}
            />
            <Hero_13
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                backgroundSrc="/images/component-lib-images/hero/placeholder-hero-bg.png"
                overlayOpacity={50}
                animated={true}
            />
            <Hero_14
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/video-bg-thumbnail.png"
                animated={true}
                videoAutoPlay={false}
                videoLoop={true}
                overlayOpacity={50}

            />
            <Hero_15
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/video-bg-thumbnail.png"
                animated={true}
                videoAutoPlay={false}
                videoLoop={true}
                overlayOpacity={50}
            />
            <Hero_16
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/video-bg-thumbnail.png"
                animated={true}
                videoAutoPlay={false}
                videoLoop={true}
                overlayOpacity={50}
            />
            <Hero_17
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/video-bg-thumbnail.png"
                animated={true}
                videoAutoPlay={false}
                videoLoop={true}
                overlayOpacity={50}
            />
            <Hero_18
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/video-bg-thumbnail.png"
                animated={true}
                videoAutoPlay={false}
                videoLoop={true}
                overlayOpacity={50}
            />
            <Hero_19
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                imageSrc="/images/component-lib-images/hero/placeholder-hero-img.png"
                imageAlt="Hero section image"
                animated={true}
            />
            <Hero_20
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                newsletterPlaceholder="Enter your email"
                newsletterButtonText="Sign up"
                newsletterMessage="By clicking Sign Up you're confirming that you agree with our Terms and Conditions."
                imageSrc="/images/component-lib-images/hero/placeholder-hero-img.png"
                imageAlt="Hero section image"
                animated={true}
            />
            <Hero_21
                title="Long heading is what you see here in this header section"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                imageSrc="/images/component-lib-images/hero/placeholder-hero-img.png"
                imageAlt="Hero section image"
                animated={true}
            />
            <Hero_22
                title="Long heading is what you see here in this header section"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                newsletterPlaceholder="Enter your email"
                newsletterButtonText="Sign up"
                newsletterMessage="By clicking Sign Up you're confirming that you agree with our Terms and Conditions."
                imageSrc="/images/component-lib-images/hero/placeholder-hero-img.png"
                imageAlt="Hero section image"
                animated={true}
            />
            <Hero_23
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/video-thumnail.png"
                animated={true}
                videoAutoPlay={false}
                videoLoop={true}
            />
            <Hero_24
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                newsletterPlaceholder="Enter your email"
                newsletterButtonText="Sign up"
                newsletterMessage="By clicking Sign Up you're confirming that you agree with our Terms and Conditions."
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/video-thumnail.png"
                animated={true}
                videoAutoPlay={false}
                videoLoop={true}
            />
            <Hero_25
                title="Long heading is what you see here in this header section"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/video-thumnail.png"
                animated={true}
                videoAutoPlay={false}
                videoLoop={true}
            />
            <Hero_26
                title="Long heading is what you see here in this header section"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                newsletterPlaceholder="Enter your email"
                newsletterButtonText="Sign up"
                newsletterMessage="By clicking Sign Up you're confirming that you agree with our Terms and Conditions."
                videoSrc="/images/component-lib-images/hero/placeholder-video.mp4"
                videoThumbnailSrc="/images/component-lib-images/hero/video-thumnail.png"
                animated={true}
                videoAutoPlay={false}
                videoLoop={true}
            /> */}
        </>
    );
};

export default DemoPage;