/**
 * Hero_04 Component Props
 * Two-column split hero layout with newsletter form (image on left)
 */
export interface Hero_04Props {
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
  
  /** Newsletter submit handler */
  onNewsletterSubmit?: (email: string) => void;
  
  /** Additional CSS classes */
  className?: string;
}