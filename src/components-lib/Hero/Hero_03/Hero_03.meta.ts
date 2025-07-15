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
    lead_capture: true,
    email_collection: true,
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
    actions: [
        "onNewsletterSubmit"
    ]
  },

  // --- Technical Details ---
  dependencies: [
    "framer-motion",
    "react-icons/fa",
    "Input",
    "FormButton", 
    "Newsletter"
  ],

  // --- Usage Context ---
  best_for: [
    "landing_pages",
    "lead_magnets", 
    "newsletter_signup",
    "email_collection",
    "content_marketing"
  ],

  // --- Performance Notes ---
  performance: {
    lazy_loading: true,
    animations: "conditional",
    form_validation: true
  }
};