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
    "enterprise_solutions",
    "ai_platforms", 
    "tech_demos",
    "product_showcases",
    "saas_enterprise",
    "brand_storytelling",
    "video_testimonials"
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
    layout_direction: "video_left_content_right",
    video_controls: "custom_play_button",
    overlay_support: true,
    responsive_video: true
  },

  // --- Comparison with Hero_05 ---
  differences_from_hero_05: {
    video_position: "left_instead_of_right",
    content_position: "right_instead_of_left",
    mobile_order: "video_second_content_first",
    desktop_order: "video_first_content_second"
  }
};