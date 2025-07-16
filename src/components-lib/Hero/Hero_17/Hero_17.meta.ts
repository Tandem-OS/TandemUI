/**
 * Hero_17 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Two-column hero with video background - heading & CTAs on left center, paragraph on right bottom
 */
export const Hero_17_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_17",
    design_system_id: "IVVideoBackgroundHeroHeader4",
    section: "hero",
    layout: "two-column",
    structure: "heading-cta-left-center-paragraph-right-bottom",
    tone: ["bold", "creative", "modern"],
    intent: "engagement",
    industry_fit: ["design", "agency", "startup", "portfolio"],

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