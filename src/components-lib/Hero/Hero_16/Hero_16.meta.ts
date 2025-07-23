/**
 * Hero_16 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Two-column hero with video background - heading & CTAs on left bottom, paragraph on right top
 */
export const Hero_16_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_16",
    design_system_id: "IVVideoBackgroundHeroHeader3",
    section: "hero",
    layout: "two-column",
    structure: "heading-cta-left-bottom-paragraph-right-top",
    tone: ["corporate", "clean", "modern"],
    intent: "information",
    industry_fit: ["consulting", "finance", "b2b", "agency"],

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
            "videoSrc",
            "videoThumbnailSrc"
        ],
        colors: true,
        settings: [
            "animated",
            "videoAutoPlay",
            "videoLoop",
            "overlayOpacity"
        ]
    },

};