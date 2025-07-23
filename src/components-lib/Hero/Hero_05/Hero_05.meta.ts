// src/components-lib/Hero/Hero_05/Hero_05.meta.ts

export const Hero_05_metadata = {
  // --- High-Level Properties (For AI Filtering) ---
  component_id: "Hero_05",
  design_system_id: "SplitHeroHeader5",
  section: "hero",
  layout: "two-column",
  structure: "video-right",
  tone: ["tech", "dark", "modern", "cinematic"],
  intent: "convert",
  industry_fit: ["saas", "ai", "fintech", "media", "entertainment"],

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