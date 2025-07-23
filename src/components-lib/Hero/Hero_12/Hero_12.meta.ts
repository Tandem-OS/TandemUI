/**
 * Hero_12 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Two-column hero with background - heading/CTAs on left center, description on right bottom
 */
export const Hero_12_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_12",
  design_system_id: "IVBackgroundHeroHeader4",
  section: "hero",
  layout: "two-column",
  structure: "heading-left-center-content-right-bottom",
  tone: ["balanced", "professional", "modern", "clean"],
  intent: "convert",
  industry_fit: ["business", "corporate", "tech", "saas", "consulting"],

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