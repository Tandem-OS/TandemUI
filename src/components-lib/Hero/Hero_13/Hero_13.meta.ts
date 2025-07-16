/**
 * Hero_13 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Two-column hero with background - description on left bottom, heading/CTAs on right center
 */
export const Hero_13_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_13",
  design_system_id: "IVBackgroundHeroHeader5",
  section: "hero",
  layout: "two-column",
  structure: "content-left-bottom-heading-right-center",
  tone: ["balanced", "professional", "modern", "content-focused"],
  intent: "convert",
  industry_fit: ["content", "media", "publishing", "blog", "news"],

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