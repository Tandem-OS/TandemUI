import Hero_01 from '@/components-lib/Hero/Hero_new_02/Hero_01';
import React from 'react';

const DemoPage: React.FC = () => {
    // Example 1: SaaS Platform
    const correctedColors = {
        background: { light: '#f3f4f6', dark: '#1f2937' },
        title: { light: '#000000', dark: '#ffffff' },
        primaryButton: {
            background: { light: 'purple', dark: '#86efac' }, // 'base' changed to 'background'
            text: { light: '#ffffff', dark: '#000000' },
            border: { light: '#16a34a', dark: '#bbf7d0' },
            hover: { // Added the required nested 'hover' object
                background: { light: '#16a34a', dark: '#4ade80' }, // Darker green for hover
                text: { light: '#ffffff', dark: '#000000' },
                border: { light: '#15803d', dark: '#86efac' }
            }
        }
    };


    return (
        <Hero_01 colors={correctedColors} title='this is really amazing bro we can not affect this one do you knwo why i am saying that it will be great' />
    );
};

export default DemoPage;