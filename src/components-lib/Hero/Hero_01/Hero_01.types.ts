// src/components-lib/Hero/Hero_01/Hero_01.types.ts

export interface Hero_01Props {
    /** Main headline text */
    title?: string;
    
    /** Supporting description text */
    description?: string;
    
    /** Primary CTA button text */
    primaryCta?: string;
    
    /** Secondary CTA button text */
    secondaryCta?: string;
    
    /** Hero image source */
    imageSrc?: string;
    
    /** Image alt text for accessibility */
    imageAlt?: string;
    
    /** Enable animations */
    animated?: boolean;
    
    /** Optional className for styling overrides */
    className?: string;
}