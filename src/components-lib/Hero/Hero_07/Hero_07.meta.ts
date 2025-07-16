// src/components-lib/Hero/Hero_07/Hero_07.meta.ts

export const Hero_07_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_07",
  design_system_id: "SplitHeroHeader7",
  section: "hero",
  layout: "two-column",
  structure: "newsletter-left-video-right",
  tone: ["tech", "dark", "modern", "lead-capture"],
  intent: "capture-leads",
  industry_fit: ["ai", "saas", "startup", "newsletter", "content"],

  /**
   * Defines the component's features for quick filtering.
   */
  capabilities: {
    animation: true,
    dark_mode: true,
    video_upload: true,
    video_playback: true,
    interactive_elements: ["video_playback", "form_input", "button", "newsletter"],
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
      "videoSrc",
      "videoThumbnailSrc"
    ],
    colors: true,
    settings: [
      "animated",
      "videoAutoPlay",
      "videoLoop"
    ],
  },
};