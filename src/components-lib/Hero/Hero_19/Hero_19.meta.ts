/**
 * Hero_19 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Centered content section above a full-width image
 */
export const Hero_19_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_19",
    design_system_id: "CenteredContentAboveImageHero1",
    section: "hero",
    layout: "single-column",
    structure: "content-top-image-bottom",
    tone: ["clean", "minimal", "modern", "corporate"],
    intent: "information",
    industry_fit: ["saas", "agency", "portfolio", "consulting"],

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
            "imageSrc",
            "imageAlt"
        ],
        colors: true,
        settings: [
            "animated"
        ]
    },
};