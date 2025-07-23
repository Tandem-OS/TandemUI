export interface ComponentMeta {
    name: string;
    category: 'heroes' | 'buttons' | 'cards' | 'forms' | 'features';
    tags: string[];
    industries: string[];
    styles: Array<'modern' | 'minimal' | 'creative'>;
    description: string;
    dependencies: string[];
    defaultProps: Record<string, any>;
}

// types/component.types.ts
export interface HeroBuilderProps {
    style?: 'minimal' | 'modern' | 'creative';
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    layout?: 'centered' | 'split' | 'fullwidth';
    animation?: 'none' | 'fade' | 'slide';
    colors?: {
        primary?: string;
        secondary?: string;
        text?: string;
    };
}


export type AccentColor = "blue" | "purple" | "emerald" | "rose" | "amber";














// src/types/component.ts

/**
 * Core metadata interface for all components in the Tandem system
 * This drives the AI preference engine and swiper comparison logic
 */
export interface ComponentMetadata {
    /** Unique identifier for the component (e.g., "Hero_01") */
    component_id: string;

    /** Section category for grouping and comparison */
    section: "hero" | "features" | "testimonials" | "pricing" | "cta" | "nav" | "footer" | "faq" | "blog" | "about";

    /** Visual tone characteristics for preference matching */
    tone: ("minimal" | "bold" | "creative" | "luxury" | "playful" | "professional" | "modern" | "classic")[];

    /** Layout structure type */
    layout: "centered" | "two-column" | "split" | "stacked" | "grid" | "asymmetric";

    /** Primary business intent */
    intent: "conversion" | "trust" | "education" | "engagement" | "showcase" | "storytelling";

    /** Visual structure arrangement */
    structure: "text-centered" | "image-left" | "image-right" | "image-top" | "image-bottom" | "text-only";

    /** Target industry fit */
    industryFit: ("B2B" | "SaaS" | "E-commerce" | "Agency" | "Startup" | "Enterprise" | "Creative" | "Healthcare" | "Finance")[];

    /** Visual density and spacing */
    visualDensity: "clean" | "dense" | "spacious" | "compact";

    /** Animation presence */
    animation: boolean;

    /** Call-to-action style */
    ctaType: "button" | "link" | "multiple" | "none";

    /** Trust-building elements level */
    trustLevel: "low" | "medium" | "high";
}

/**
 * Props interface for all hero components
 * Enables dynamic content while maintaining metadata-driven behavior
 */
export interface HeroProps {
    /** Component metadata for AI processing */
    metadata: ComponentMetadata;

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

    /** Optional className for styling overrides */
    className?: string;
}