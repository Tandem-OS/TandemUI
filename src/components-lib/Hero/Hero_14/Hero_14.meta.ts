/**
 * Hero_14 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Two-column hero with video background - heading on left top, content on right bottom
 */
export const Hero_14_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_14",
  design_system_id: "IVVideoBackgroundHeroHeader1",
  section: "hero",
  layout: "two-column",
  structure: "heading-left-top-content-right-bottom",
  tone: ["cinematic", "tech", "modern", "dramatic"],
  intent: "convert",
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
      "videoLoop"
    ]
  },
};