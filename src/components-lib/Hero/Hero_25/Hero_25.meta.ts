/**
 * Hero_25 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Left-aligned content section above a full-width video
 */
export const Hero_25_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_25",
    design_system_id: "LeftAlignedContentAboveVideoHero1",
    section: "hero",
    layout: "single-column",
    structure: "content-top-video-bottom",
    tone: ["clean", "minimal", "modern", "cinematic"],
    intent: "information",
    industry_fit: ["saas", "agency", "portfolio", "media", "entertainment"],

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
            "videoThumbnailSrc"
        ],
        colors: true,
        settings: [
            "animated",
            "videoAutoPlay",
            "videoLoop"
        ]
    },

    // --- Editable Properties (What users can customize) ---
    editableProps: {
        title: "string",
        description: "string",
        primaryCta: "string",
        secondaryCta: "string",
        videoSrc: "url",
        videoThumbnailSrc: "url",
        animated: "boolean",
        videoAutoPlay: "boolean",
        videoLoop: "boolean"
    },

    // --- Design Tokens Used ---
    tokens: {
        font: {
            heading: "h1-md",
            body: "para-lg"
        },
        spacing: {
            section: "2xl",
            element: "md"
        },
        radius: "2xl",
        color: {
            background: "background-primary",
            text: "text-primary"
        }
    },

    // --- Code Content (Real JSX Implementation) ---
    code: {
        language: "tsx",
        content: `
<Hero_25
  title="Long heading is what you see here in this header section"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
  primaryCta="Button"
  secondaryCta="Button"
  videoSrc="/images/component-lib-images/hero/demo-video.mp4"
  videoThumbnailSrc="/images/component-lib-images/hero/demo-video-thumbnail.png"
  animated={true}
  videoAutoPlay={false}
  videoLoop={true}
/>
        `
    }
};

export default Hero_25_metadata;