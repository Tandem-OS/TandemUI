// src/components-lib/Hero/Hero_06/Hero_06.types.ts

/**
 * Color configuration for Hero_06 with Video support
 */
export interface Hero_06Colors {
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
 * Hero_06 Component Props
 */
export interface Hero_06Props {
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
  
  /** Custom color configuration */
  colors?: Hero_06Colors;
}

/**
 * Default color configuration for Hero_06
 */
export const defaultColors: Hero_06Colors = {
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