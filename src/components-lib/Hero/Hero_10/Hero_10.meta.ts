/**
 * Hero_10 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Based on IVBackgroundHeroHeader2 from design system
 */
export const Hero_10_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_10",
  design_system_id: "IVBackgroundHeroHeader2",
  section: "hero",
  layout: "two-column",
  structure: "content-left-heading-right",
  tone: ["minimal", "clean", "natural", "personal"],
  intent: "convert",
  industry_fit: ["personal brand", "portfolio", "consulting", "creative"],

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