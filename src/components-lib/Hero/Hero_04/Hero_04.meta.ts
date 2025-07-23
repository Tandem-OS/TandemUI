// src/components-lib/Hero/Hero_04/Hero_04.meta.ts

export const Hero_04_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_04",
  design_system_id: "SplitHeroHeader4",
  section: "hero",
  layout: "two-column",
  structure: "image-left", // Key difference from Hero_03
  tone: ["modern", "tech", "lead-capture"],
  intent: "capture-leads",
  industry_fit: ["saas", "startup", "fintech", "newsletter", "content"],

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