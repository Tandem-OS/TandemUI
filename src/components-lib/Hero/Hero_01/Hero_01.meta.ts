// src/components-lib/Hero/Hero_01/Hero_01.meta.ts

export const Hero_01_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_01",
  design_system_id: "SplitHeroHeader1",
  section: "hero",
  layout: "two-column",
  structure: "image-right",
  tone: ["minimal", "modern", "tech"],
  intent: "convert",
  industry_fit: ["saas", "b2b", "startup"],

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