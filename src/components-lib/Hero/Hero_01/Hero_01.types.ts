// src/components-lib/Hero/Hero_01/Hero_01.types.ts

/**
 * Color configuration for Hero_01 - All colors are optional for full flexibility
 */
export interface Hero_01Colors {
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
 * Hero_01 Component Props
 */
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
  
  /** Enable framer motion animations */
  animated?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Custom color configuration */
  colors?: Hero_01Colors;
}

/**
 * Default color configuration
 */
export const defaultColors: Hero_01Colors = {
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