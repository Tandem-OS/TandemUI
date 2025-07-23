/**
 * Color configuration for Hero_26 with Newsletter support
 */
export interface Hero_26Colors {
    background?: {
        light?: string;
        dark?: string;
    };
    title?: {
        light?: string;
        dark?: string;
    };
    description?: {
        light?: string;
        dark?: string;
    };
    newsletter?: {
        input?: {
            background?: { light?: string; dark?: string };
            text?: { light?: string; dark?: string };
            border?: { light?: string; dark?: string };
            focusBorder?: { light?: string; dark?: string };
            placeholder?: { light?: string; dark?: string };
        };
        button?: {
            background?: { light?: string; dark?: string };
            text?: { light?: string; dark?: string };
            border?: { light?: string; dark?: string };
            hover?: {
                background?: { light?: string; dark?: string };
                text?: { light?: string; dark?: string };
                border?: { light?: string; dark?: string };
            };
        };
        message?: { light?: string; dark?: string };
    };
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
 * Hero_26 Component Props
 */
export interface Hero_26Props {
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

    /** Additional CSS classes */
    className?: string;

    /** Custom color configuration */
    colors?: Hero_26Colors;
}

/**
 * Default color configuration for Hero_26
 */
export const defaultColors: Hero_26Colors = {
    background: {
        light: '#ffffff',
        dark: '#0f172a'
    },
    title: {
        light: '#111827',
        dark: '#f9fafb'
    },
    description: {
        light: '#4b5563',
        dark: '#d1d5db'
    },
    newsletter: {
        input: {
            background: { light: 'transparent', dark: 'transparent' },
            text: { light: '#111827', dark: '#f9fafb' },
            border: { light: '#d1d5db', dark: '#374151' },
            focusBorder: { light: '#3b82f6', dark: '#4f46e5' }, // blue-500, indigo-500
            placeholder: { light: '#6b7280', dark: '#9ca3af' } // gray-500, gray-400
        },
        button: {
            background: { light: '#4f46e5', dark: '#6366f1' }, // indigo-600, indigo-500
            text: { light: '#ffffff', dark: '#ffffff' },
            border: { light: '#4f46e5', dark: '#6366f1' },
            hover: {
                background: { light: '#3730a3', dark: '#4f46e5' }, // indigo-800, indigo-600
                text: { light: '#ffffff', dark: '#ffffff' },
                border: { light: '#3730a3', dark: '#4f46e5' }
            }
        },
        message: { light: '#6b7280', dark: '#9ca3af' } // gray-500, gray-400
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