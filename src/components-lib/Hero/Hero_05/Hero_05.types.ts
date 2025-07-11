/**
 * Hero_05 Component Props
 * Two-column split hero layout with video on right
 */
export interface Hero_05Props {
    /** Main headline text */
    title?: string;

    /** Supporting description text */
    description?: string;

    /** Primary CTA button text */
    primaryCta?: string;

    /** Secondary CTA button text */
    secondaryCta?: string;

    /** Video source URL */
    videoSrc?: string;

    /** Video thumbnail image */
    thumbnailSrc?: string;

    /** Enable framer motion animations */
    animated?: boolean;

    /** Auto play video on load */
    autoPlay?: boolean;

    /** Loop video */
    loop?: boolean;

    /** Additional CSS classes */
    className?: string;
}