// src/components-lib/Hero/Hero_03/Hero_03.meta.ts

export const Hero_03_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_03",
  design_system_id: "SplitHeroHeader3",
  section: "hero",
  layout: "two-column",
  structure: "image-right",
  tone: ["minimal", "modern", "lead-capture"],
  intent: "capture-leads",
  industry_fit: ["saas", "startup", "b2b", "newsletter", "content"],

  /**
   * Defines the component's features for quick filtering.
   */
  capabilities: {
    animation: true,
    dark_mode: true,
    image_upload: true,
    interactive_elements: ["form_input", "button", "newsletter"],
  },

  // --- Customization Controls (For AI/Editor to Modify Props) ---
  customization: {
    text: [
      "title",
      "description"
    ],
    form: [
      "newsletterPlaceholder",
      "newsletterButtonText",
      "newsletterMessage"
    ],
    media: [
      "imageSrc"
    ],
    colors: true,
    settings: [
      "animated"
    ],
  },
};