/**
 * Color configuration for Hero_20 with Newsletter support
 */
export interface Hero_20Colors {
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
}

/**
 * Hero_20 Component Props
 */
export interface Hero_20Props {
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

    /** Hero image source */
    imageSrc?: string;
    
    /** Image alt text for accessibility */
    imageAlt?: string;
    
    /** Enable framer motion animations */
    animated?: boolean;
    
    /** Additional CSS classes */
    className?: string;
    
    /** Custom color configuration */
    colors?: Hero_20Colors;
}

/**
 * Default color configuration for Hero_20
 */
export const defaultColors: Hero_20Colors = {
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
            focusBorder: { light: '#3b82f6', dark: '#4f46e5' },
            placeholder: { light: '#6b7280', dark: '#9ca3af' }
        },
        button: {
            background: { light: '#4f46e5', dark: '#6366f1' },
            text: { light: '#ffffff', dark: '#ffffff' },
            border: { light: '#4f46e5', dark: '#6366f1' },
            hover: {
                background: { light: '#3730a3', dark: '#4f46e5' },
                text: { light: '#ffffff', dark: '#ffffff' },
                border: { light: '#3730a3', dark: '#4f46e5' }
            }
        },
        message: { light: '#6b7280', dark: '#9ca3af' }
    }
};