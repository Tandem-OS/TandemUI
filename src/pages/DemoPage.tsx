// src/pages/DemoPage.tsx

import React from 'react';
import { Hero_01 } from '../components-lib/Hero';

/**
 * Demo Page
 * Shows Hero_01 component with default content
 */
const DemoPage: React.FC = () => {
    return (
        <Hero_01
            title="Medium length hero heading goes here"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
            primaryCta="Button"
            secondaryCta="Button"
            animated={true}
        />
    );
};

export default DemoPage;