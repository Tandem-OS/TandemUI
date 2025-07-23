/**
 * Hero_15 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Two-column hero with video background - content on left bottom, heading on right top
 */
export const Hero_15_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_15",
    design_system_id: "IVVideoBackgroundHeroHeader2",
    section: "hero",
    layout: "two-column",
    structure: "content-left-bottom-heading-right-top",
    tone: ["cinematic", "tech", "modern", "dramatic"],
    intent: "brand_awareness",
    industry_fit: ["media", "entertainment", "tech", "saas", "agency"],

    /**
     * Defines the component's features for quick filtering.
     */
    capabilities: {
        animation: true,
        dark_mode: true,
        video_upload: true,
        video_playback: true,
        background_overlay: true,
        interactive_elements: ["video_playback", "button", "play_pause"],
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
            "videoSrc",
            "videoThumbnailSrc"
        ],
        colors: true,
        settings: [
            "animated",
            "videoAutoPlay",
            "videoLoop",
            "overlayOpacity" // Added for complete support
        ]
    },
};