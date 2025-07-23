/**
 * Hero_18 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Two-column hero with video background - paragraph on left bottom, heading & CTAs on right center
 */
export const Hero_18_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_18",
    design_system_id: "IVVideoBackgroundHeroHeader5",
    section: "hero",
    layout: "two-column",
    structure: "paragraph-left-bottom-heading-cta-right-center",
    tone: ["professional", "direct", "modern"],
    intent: "conversion",
    industry_fit: ["saas", "tech", "startup", "b2b"],

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