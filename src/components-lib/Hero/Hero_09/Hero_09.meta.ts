/**
 * Hero_09 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Based on IVBackgroundHeroHeader1 from design system
 */
export const Hero_09_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_09",
    design_system_id: "IVBackgroundHeroHeader1",
    section: "hero",
    layout: "two-column",
    structure: "heading-left-content-right",
    tone: ["clean", "modern", "natural", "dramatic"],
    intent: "convert",
    industry_fit: ["agency", "saas", "consulting", "creative"],

    /**
     * Defines the component's features for quick filtering.
     */
    capabilities: {
        animation: true,
        dark_mode: true,
        image_upload: true,
        background_overlay: true,
        interactive_elements: ["button"],
    },

    // --- Customization Controls (For AI/Editor to Modify Props) ---
    customization: {
        text: [
            "title",
            "description"
        ],
        cta: [
            "primaryCta",
            "secondaryCta"
        ],
        media: [
            "backgroundSrc"
        ],
        colors: true,
        settings: [
            "animated",
            "overlayOpacity"
        ]
    },
};