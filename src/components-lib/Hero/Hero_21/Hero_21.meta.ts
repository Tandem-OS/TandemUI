/**
 * Hero_21 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Left-aligned content section above a full-width image
 */
export const Hero_21_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_21",
    design_system_id: "LeftAlignedContentAboveImageHero1",
    section: "hero",
    layout: "single-column",
    structure: "content-top-image-bottom",
    tone: ["clean", "professional", "modern", "business"],
    intent: "convert",
    industry_fit: ["saas", "agency", "consulting", "b2b"],

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