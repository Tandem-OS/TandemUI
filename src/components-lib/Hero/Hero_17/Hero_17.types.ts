/**
 * Color configuration for Hero_17 with Video background support
 */
export interface Hero_17Colors {
    /** Background overlay color and opacity */
    overlay?: {
        light?: string;
        dark?: string;
    };
    /** Title text color */
    title?: {
        light?: string;
        dark?: string;
    };
    /** Description text color */
    description?: {
        light?: string;
        dark?: string;
    };
    /** Primary button styling */
    primaryButton?: {
        background?: { light?: string; dark?: string };
        text?: { light?: string; dark?: string };
        border?: { light?: string; dark?: string };
        hover?: {
            background?: { light?: string; dark?: string };
            text?: { light?: string; dark?: string };
            border?: { light?: string; dark?: string };
        };
    };
    /** Secondary button styling */
    secondaryButton?: {
        background?: { light?: string; dark?: string };
        text?: { light?: string; dark?: string };
        border?: { light?: string; dark?: string };
        hover?: {
            background?: { light?: string; dark?: string };
            text?: { light?: string; dark?: string };
            border?: { light?: string; dark?: string };
        };
    };
    /** Video play button styling */
    video?: {
        overlay?: { light?: string; dark?: string };
        playButton?: {
            background?: { light?: string; dark?: string };
            backgroundHover?: { light?: string; dark?: string };
            border?: { light?: string; dark?: string };
            icon?: { light?: string; dark?: string };
            iconHover?: { light?: string; dark?: string };
        };
    };
}

/**
 * Hero_17 Component Props
 */
export interface Hero_17Props {
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
    videoThumbnailSrc?: string;

    /** Enable framer motion animations */
    animated?: boolean;

    /** Auto play video on load */
    videoAutoPlay?: boolean;

    /** Overlay darkness (0-100) - deprecated, use colors.overlay instead */
    overlayOpacity?: number;

    /** Loop video */
    videoLoop?: boolean;

    /** Additional CSS classes */
    className?: string;

    /** Custom color configuration */
    colors?: Hero_17Colors;
}

/**
 * Default color configuration for Hero_17
 */
export const defaultColors: Hero_17Colors = {
    overlay: {
        light: 'rgba(0, 0, 0, 0.5)',
        dark: 'rgba(0, 0, 0, 0.6)'
    },
    title: {
        light: '#ffffff',
        dark: '#ffffff'
    },
    description: {
        light: 'rgba(255, 255, 255, 0.9)',
        dark: 'rgba(255, 255, 255, 0.9)'
    },
    primaryButton: {
        background: { light: '#4f46e5', dark: '#6366f1' },
        text: { light: '#ffffff', dark: '#ffffff' },
        border: { light: '#4f46e5', dark: '#6366f1' },
        hover: {
            background: { light: '#3730a3', dark: '#4f46e5' },
            text: { light: '#ffffff', dark: '#ffffff' },
            border: { light: '#3730a3', dark: '#4f46e5' }
        }
    },
    secondaryButton: {
        background: { light: 'transparent', dark: 'transparent' },
        text: { light: '#4f46e5', dark: '#6366f1' },
        border: { light: '#4f46e5', dark: '#6366f1' },
        hover: {
            background: { light: '#4f46e5', dark: '#6366f1' },
            text: { light: '#ffffff', dark: '#ffffff' },
            border: { light: '#4f46e5', dark: '#6366f1' }
        }
    },
    video: {
        overlay: { light: 'rgba(0, 0, 0, 0.3)', dark: 'rgba(0, 0, 0, 0.5)' },
        playButton: {
            background: { light: 'rgba(255, 255, 255, 0.9)', dark: 'rgba(15, 23, 42, 0.9)' },
            backgroundHover: { light: 'rgba(255, 255, 255, 0.95)', dark: 'rgba(15, 23, 42, 0.95)' },
            border: { light: 'rgba(255, 255, 255, 0.3)', dark: 'rgba(148, 163, 184, 0.3)' },
            icon: { light: '#111827', dark: '#f9fafb' },
            iconHover: { light: '#4f46e5', dark: '#6366f1' }
        }
    }
};