// src/components-lib/Hero/Hero_06/Hero_06.meta.ts

export const Hero_06_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_06",
  design_system_id: "SplitHeroHeader6",
  section: "hero",
  layout: "two-column",
  structure: "video-left", // Key difference from Hero_05
  tone: ["tech", "dark", "bold", "cinematic"],
  intent: "convert",
  industry_fit: ["ai", "saas", "enterprise", "media", "tech"],

  /**
   * Defines the component's features for quick filtering.
   */
  capabilities: {
    animation: true,
    dark_mode: true,
    video_upload: true,
    video_playback: true,
    interactive_elements: ["video_playback", "button", "play_pause"],
    
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
        "videoSrc", 
        "thumbnailSrc" 
    ],
    colors: true,
    settings: [ 
        "animated", 
        "autoPlay", 
        "loop" 
    ]
  },
};