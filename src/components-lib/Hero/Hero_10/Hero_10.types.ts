/**
 * Hero_10 Component Props
 * Two-column hero with background image - content left, heading right
 */
export interface Hero_10Props {
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
