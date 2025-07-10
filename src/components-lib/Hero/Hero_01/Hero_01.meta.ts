// src/components-lib/Hero/Hero_01/Hero_01.meta.ts

/**
 * Metadata interface for Hero_01 component
 * This is self-contained - no external dependencies
 */
export interface Hero_01Metadata {
    /** Unique identifier for the component */
    component_id: string;
    
    /** Section category */
    section: "hero";
    
    /** Visual tone characteristics */
    tone: ("minimal" | "professional")[];
    
    /** Layout structure type */
    layout: "split";
    
    /** Primary business intent */
    intent: "conversion";
    
    /** Visual structure arrangement */
    structure: "image-right";
    
    /** Target industry fit */
    industryFit: ("B2B" | "SaaS" | "Startup")[];
    
    /** Visual density and spacing */
    visualDensity: "clean";
    
    /** Animation presence */
    animation: boolean;
    
    /** Call-to-action style */
    ctaType: "multiple";
    
    /** Trust-building elements level */
    trustLevel: "medium";
}

/**
 * Hero_01 component metadata
 * Used by AI engine, Swiper, and RAG system
 */
export const Hero_01_Meta: Hero_01Metadata = {
    component_id: "Hero_01",
    section: "hero",
    tone: ["minimal", "professional"],
    layout: "split",
    intent: "conversion",
    structure: "image-right",
    industryFit: ["B2B", "SaaS", "Startup"],
    visualDensity: "clean",
    animation: true,
    ctaType: "multiple",
    trustLevel: "medium"
};