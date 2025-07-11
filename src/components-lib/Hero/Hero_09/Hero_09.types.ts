/**
 * Hero_09 Component Props
 * Two-column hero with background image - heading left, content right
 */
export interface Hero_09Props {
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
  
  /** Overlay darkness (0-100) */
  overlayOpacity?: number;
  
  /** Additional CSS classes */
  className?: string;
}