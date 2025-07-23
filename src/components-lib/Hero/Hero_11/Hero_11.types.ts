/**
 * Color configuration for Hero_11 - Background hero with overlay
 */
export interface Hero_11Colors {
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
}

/**
 * Hero_11 Component Props
 * Two-column hero with background - heading/CTAs on left bottom, description on right top
 */
export interface Hero_11Props {
    /** Main headline text */
    title?: string;

    /** Supporting description text */
    description?: string;

    /** Primary CTA button text */
    primaryCta?: string;

    /** Secondary CTA button text */
    secondaryCta?: string;

    /** Background image source */
    backgroundSrc?: string;

    /** Background image alt text */
    backgroundAlt?: string;

    /** Enable framer motion animations */
    animated?: boolean;

    /** Overlay darkness (0-100) - deprecated, use colors.overlay instead */
    overlayOpacity?: number;

    /** Additional CSS classes */
    className?: string;

    /** Custom color configuration */
    colors?: Hero_11Colors;
}

/**
 * Default color configuration for Hero_11
 */
export const defaultColors: Hero_11Colors = {
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
    }
};