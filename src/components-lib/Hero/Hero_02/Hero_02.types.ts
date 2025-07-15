// src/components-lib/Hero/Hero_02/Hero_02.types.ts

/**
 * Color configuration for Hero_02, allowing for full theme customization.
 */
export interface Hero_02Colors {
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
 * Hero_02 Component Props
 */
export interface Hero_02Props {
  title?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  imageSrc?: string;
  imageAlt?: string;
  animated?: boolean;
  className?: string;
  colors?: Hero_02Colors;
}

/**
 * Default color configuration for Hero_02.
 */
export const defaultColors: Hero_02Colors = {
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