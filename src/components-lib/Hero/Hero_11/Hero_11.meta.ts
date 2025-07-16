/**
 * Hero_11 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Two-column hero with background - heading/CTAs on left bottom, description on right top
 */
export const Hero_11_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_11",
  design_system_id: "IVBackgroundHeroHeader3",
  section: "hero",
  layout: "two-column",
  structure: "heading-left-content-right",
  tone: ["minimal", "clean", "natural", "professional"],
  intent: "convert",
  industry_fit: ["business", "corporate", "saas", "consulting", "agency"],

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