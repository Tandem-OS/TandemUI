export const Hero_01_metadata = {
  // --- High-Level Properties ---
  component_id: "Hero_01",
  design_system_id: "SplitHeroHeader1",
  section: "hero",
  layout: "two-column",
  structure: "image-right",
  tone: ["minimal", "modern", "tech"],
  intent: "convert",
  industry_fit: ["saas", "b2b", "startup"],

  // --- Component Capabilities ---
  capabilities: {
    animation: true,
    dark_mode: true,
    image_upload: true,
    interactive_elements: ["button"],
    icon_support: true,
  },

  // --- Customization Controls ---
  customization: {
    text: ["title", "description"],
    cta: ["primaryCTA", "secondaryCTA"],
    media: ["image"],
    colors: true,
    settings: ["animated"]
  },

  // --- Editable Properties ---
  editableProps: {
    title: { text: "string", maxLength: 60 },
    description: { text: "string", maxLength: 220 },
    primaryCTA: {
      text: "string",
      href: "url",
      variant: "enum:solid|outline",
      size: "enum:sm|md|lg",
      icon: "ReactNode?"
    },
    secondaryCTA: {
      text: "string",
      href: "url",
      variant: "enum:solid|outline",
      size: "enum:sm|md|lg",
      icon: "ReactNode?"
    },
    image: { src: "url", alt: "string" }
  },

  // --- Design Tokens Used (Verified & Corrected) ---
  tokens: {
    font: {
      heading: ["h2-sm", "h1-md"], // Uses h2-sm on mobile, h1-md on desktop
      body: "para-lg",             // Uses para-lg on desktop
    },
    spacing: {
      padding_x: ["lg", "2xl", "5xl", "6xl"], // All horizontal paddings used
      padding_y: "xl",                      // Vertical padding
      gap: "md",                            // Gap between buttons
      stacking: ["md", "lg"]                // Space-y values
    },
    lineHeight: {
        body: "relaxed" // From the 'leading-relaxed' class
    }
  },

  // --- Code Content (Real JSX Implementation) ---
  code: {
    language: "tsx",
    content: `
<Hero_01
    title="Your product. Their success."
    description="An impactful message that describes your value prop clearly and concisely."
    primaryCTA={{
        text: "Get Started",
        href: "/signup",
        variant: "solid",
        size: "lg",
    }}
    secondaryCTA={{
        text: "Learn More",
        href: "/learn",
        variant: "outline",
        size: "lg",
    }}
    image={{
        src: "/images/component-lib-images/hero/placeholder-img.png",
        alt: "Illustration showing app usage"
    }}
    animated={true}
    colors={{
        background: { light: "#ffffff", dark: "#0f172a" },
        title: { light: "#111827", dark: "#f9fafb" },
        description: { light: "#4b5563", dark: "#d1d5db" },
        primaryButton: {
            background: { light: "#4f46e5", dark: "#6366f1" },
            text: { light: "#ffffff", dark: "#ffffff" }
        },
        secondaryButton: {
            text: { light: "#4f46e5", dark: "#6366f1" },
            border: { light: "#4f46e5", dark: "#6366f1" },
            hover: {
                background: { light: "#4f46e5", dark: "#6366f1" },
                text: { light: "#ffffff", dark: "#ffffff" }
            }
        }
    }}
/>
    `
  }
};