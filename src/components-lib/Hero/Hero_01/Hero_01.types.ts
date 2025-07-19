import { type ReactNode } from 'react';

/**
 * Button variants for styling
 */
export type CustomButtonVariant = "solid" | "outline";

/**
 * Button sizes
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * CTA Button Props
 * All properties are now optional to allow for partial overrides.
 * The component's internal logic will merge these with default values.
 */
export interface ButtonProps {
  text?: string;
  href?: string;
  variant?: CustomButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

/**
 * Image Props
 * Making these optional as well for consistency.
 */
export interface ImageProps {
  src?: string;
  alt?: string;
}

/**
 * Color configuration for Hero_01
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
  /** Primary CTA button props */
  primaryCTA?: ButtonProps;
  /** Secondary CTA button props */
  secondaryCTA?: ButtonProps;
  /** Hero image props */
  image?: ImageProps;
  /** Enable framer motion animations */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom color configuration */
  colors?: Hero_01Colors;
}

/**
 * Text length limits from metadata
 */
export const TEXT_LIMITS = {
  title: 60,
  description: 220,
} as const;

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
  primaryButton: { // Default for "solid" variant
    background: { light: '#4f46e5', dark: '#6366f1' },
    text: { light: '#ffffff', dark: '#ffffff' },
    border: { light: '#4f46e5', dark: '#6366f1' },
    hover: {
      background: { light: '#3730a3', dark: '#4f46e5' },
      text: { light: '#ffffff', dark: '#ffffff' },
      border: { light: '#3730a3', dark: '#4f46e5' }
    }
  },
  secondaryButton: { // Default for "outline" variant
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