/**
 * Hero_22 Metadata
 * Used by Swiper system, AI engine, and RAG for component matching
 * Left-aligned content with newsletter above a full-width image
 */
export const Hero_22_metadata = {
    // --- High-Level Properties (For AI Filtering) ---
    component_id: "Hero_22",
    design_system_id: "LeftAlignedContentWithNewsletterAboveImageHero1",
    section: "hero",
    layout: "single-column",
    structure: "content-top-image-bottom",
    tone: ["clean", "professional", "modern", "lead-capture"],
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
            "imageSrc",
            "imageAlt"
        ],
        colors: true,
        settings: [
            "animated"
        ]
    },

    // --- Editable Properties (What users can customize) ---
    editableProps: {
        title: "string",
        description: "string",
        newsletterPlaceholder: "string",
        newsletterButtonText: "string",
        newsletterMessage: "string",
        imageSrc: "url",
        imageAlt: "string",
        animated: "boolean"
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
<Hero_22
  title="Long heading is what you see here in this header section"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
  newsletterPlaceholder="Enter your email"
  newsletterButtonText="Sign up"
  newsletterMessage="By clicking Sign Up you're confirming that you agree with our Terms and Conditions."
  imageSrc="/images/component-lib-images/hero/newsletter-signup-workspace.png"
  imageAlt="Modern workspace promoting newsletter signup"
  animated={true}
/>
        `
    }
};

export default Hero_22_metadata;