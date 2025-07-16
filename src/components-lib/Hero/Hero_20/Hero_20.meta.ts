/**
 * Hero_20 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Centered content with newsletter above a full-width image
 */
export const Hero_20_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_20",
    design_system_id: "CenteredContentAboveImageHero2",
    section: "hero",
    layout: "single-column",
    structure: "newsletter-content-top-image-bottom",
    tone: ["clean", "minimal", "lead-capture", "modern"],
    intent: "capture-leads",
    industry_fit: ["saas", "agency", "newsletter", "consulting", "b2b"],

    // --- Customization Controls (For AI/Editor to Modify Props) ---
    customization: {
        text: [
            "title",
            "description"
        ],
        form: [
            "newsletterPlaceholder",
            "newsletterButtonText",
            "newsletterMessage"
        ],
        media: [
            "imageSrc",
            "imageAlt"
        ],
        colors: true,
        settings: [
            "animated"
        ]
    },
};