// src/pages/DemoPage.tsx

import React from 'react';
import { Hero_01, Hero_02, Hero_03, Hero_04, Hero_05, Hero_06, Hero_07, Hero_08, Hero_09, Hero_10 } from '../components-lib/Hero';

/**
 * Demo Page
 * Shows all Hero components with default content
 */
const DemoPage: React.FC = () => {
    return (
        <>
            <Hero_01
                title="Medium length hero heading goes here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                primaryCta="Button"
                secondaryCta="Button"
                animated={true}
            />
            <Hero_02
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
        </>
    );
};

export default DemoPage;