// src/components-lib/Hero/Hero_02/Hero_02.meta.ts

export const Hero_02_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_02",
  design_system_id: "SplitHeroHeader2",
  section: "hero",
  layout: "two-column",
  structure: "image-left", // Key difference from Hero_01
  tone: ["modern", "tech", "bold"],
  intent: "convert",
  industry_fit: ["saas", "startup", "e-commerce"],

  /**
   * Defines the component's features for quick filtering.
   */
  capabilities: {
    animation: true,
    dark_mode: true,
    image_upload: true,
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
        "imageSrc" 
    ],
    colors: true,
    settings: [ 
        "animated" 
    ]
  }
};