/**
 * Hero_01 Component Props
 * Two-column split hero layout with image on right
 */
export interface Hero_02Props {
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
}
