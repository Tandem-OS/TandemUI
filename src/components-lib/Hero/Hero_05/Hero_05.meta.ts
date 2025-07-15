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
    media_support: true,
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

  // --- Technical Details ---
  dependencies: [
    "framer-motion",
    "react-icons/fa",
    "VideoPlayBtn",
    "SimpleButton"
  ],

  // --- Usage Context ---
  best_for: [
    "product_demos",
    "app_showcases", 
    "video_testimonials",
    "brand_storytelling",
    "saas_landing_pages",
    "cinematic_presentations"
  ],

  // --- Performance Notes ---
  performance: {
    lazy_loading: true,
    video_optimization: true,
    animations: "conditional",
    poster_images: true
  },

  // --- Media Specifications ---
  media_specs: {
    video_formats: ["mp4", "webm", "ogg"],
    recommended_resolution: "1920x1080",
    max_file_size: "50MB",
    autoplay_policy: "muted_only",
    poster_required: true
  },

  // --- Visual Notes ---
  visual_notes: {
    layout_direction: "content_left_video_right",
    video_controls: "custom_play_button",
    overlay_support: true,
    responsive_video: true
  }
};