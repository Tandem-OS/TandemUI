// src/components-lib/Hero/Hero_08/Hero_08.meta.ts

export const Hero_08_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_08",
    design_system_id: "SplitHeroHeader8",
    section: "hero",
    layout: "two-column",
    structure: "video-left-newsletter-right", // Key difference from Hero_07
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
        lead_capture: true,
        email_collection: true,
        media_support: true,
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
        actions: [
            "onNewsletterSubmit"
        ]
    },

    // --- Technical Details ---
    dependencies: [
        "framer-motion",
        "react-icons/fa",
        "Newsletter",
        "VideoPlayBtn",
        "Input",
        "FormButton"
    ],

    // --- Usage Context ---
    best_for: [
        "lead_generation",
        "newsletter_signup",
        "video_marketing",
        "product_demos",
        "content_marketing",
        "saas_landing_pages",
        "startup_launches"
    ],

    // --- Performance Notes ---
    performance: {
        lazy_loading: true,
        video_optimization: true,
        animations: "conditional",
        form_validation: true,
        poster_images: true
    },

    // --- Media + Form Specifications ---
    media_specs: {
        video_formats: ["mp4", "webm", "ogg"],
        recommended_resolution: "1920x1080",
        max_file_size: "50MB",
        autoplay_policy: "muted_only",
        poster_required: true
    },

    form_specs: {
        validation: "email_required",
        submit_handling: "async_callback",
        error_handling: "built_in",
        success_feedback: "clear_form"
    },

    // --- Visual Notes ---
    visual_notes: {
        layout_direction: "video_left_newsletter_right",
        form_placement: "right_column",
        video_placement: "left_column",
        video_controls: "custom_play_button",
        overlay_support: true,
        responsive_video: true,
        responsive_form: true
    },

};