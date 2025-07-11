
/**
 * Hero_07 Component Props
 * Two-column split hero layout with newsletter form and video on right
 */
export interface Hero_07Props {
    /** Main headline text */
    title?: string;

    /** Supporting description text */
    description?: string;

    /** Newsletter email placeholder */
    newsletterPlaceholder?: string;

    /** Newsletter button text */
    newsletterButtonText?: string;

    /** Newsletter disclaimer message */
    newsletterMessage?: string;

    /** Video source URL */
    videoSrc?: string;

    /** Video thumbnail image */
    videoThumbnailSrc?: string;

    /** Enable framer motion animations */
    animated?: boolean;

    /** Auto play video on load */
    videoAutoPlay?: boolean;

    /** Loop video */
    videoLoop?: boolean;

    /** Newsletter submit handler */
    onNewsletterSubmit?: (email: string) => void;

    /** Additional CSS classes */
    className?: string;
}