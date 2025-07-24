// src/scraper/constants.ts

// Existing vibe images
export const vibesImages = [
    { id: 1, name: "Bold", src: "/images/vibeImages/bold.webp" },
    { id: 2, name: "Minimal", src: "/images/vibeImages/minimal.webp" },
    { id: 3, name: "Fun", src: "/images/vibeImages/fun.webp" },
    { id: 4, name: "Playful", src: "/images/vibeImages/playful.webp" },
    { id: 5, name: "Clean", src: "/images/vibeImages/clean.webp" },
    { id: 6, name: "Earthy", src: "/images/vibeImages/earthy.webp" },
    { id: 7, name: "Elegant", src: "/images/vibeImages/elegent.webp" },
    { id: 8, name: "Luxury", src: "/images/vibeImages/luxury.webp" }
];

// Enhanced section data with more metadata
export const dummyScrapedData = {
    url: "stripe.com",
    analyzedAt: new Date(),
    sections: [
        {
            id: "hero-1",
            section_type: "Hero",
            layout_structure: "split-content",
            intent: "convert",
            tone: "professional",
            screenshot_url: vibesImages[1].src,
            editableProps: {
                title: "Online payment processing for internet businesses",
                subtitle: "Accept payments online, in person, or through your platform",
                cta: "Start now"
            },
            metadata: {
                insight: "This section uses a split-screen layout to balance visual impact and clear messaging",
                section_type: "Hero",
                layout_structure: "split-content",
                intent: "convert",
                tone: "professional",
                interactive_elements: ["CTA Button", "Video Background"],
                tokens: {
                    font: "Inter",
                    spacing: "spacious",
                    radius: "medium"
                }
            },
            design: {
                editableProps: {
                    title: "Online payment processing for internet businesses",
                    subtitle: "Accept payments online, in person, or through your platform",
                    cta: "Start now"
                },
                interactive_elements: ["Primary CTA", "Secondary CTA", "Demo Video"],
                tokens: {
                    font: "font-sans",
                    spacing: "space-y-lg",
                    radius: "rounded-xl"
                },
                matched_components: [
                    { id: "hero-alt-1", thumbnail: vibesImages[2].src, name: "Minimal Hero" },
                    { id: "hero-alt-2", thumbnail: vibesImages[7].src, name: "Luxury Hero" },
                    { id: "hero-alt-3", thumbnail: vibesImages[3].src, name: "Playful Hero" }
                ]
            },
            feedback: null
        },
        {
            id: "nav-1",
            section_type: "Navigation",
            layout_structure: "horizontal-centered",
            intent: "navigate",
            tone: "minimal",
            screenshot_url: vibesImages[4].src,
            editableProps: {
                logo: "Stripe",
                menuItems: ["Products", "Solutions", "Developers", "Resources", "Pricing"]
            },
            metadata: {
                insight: "This section uses clean navigation with clear hierarchy to help users find information quickly",
                section_type: "Navigation",
                layout_structure: "horizontal-centered",
                intent: "navigate",
                tone: "minimal",
                interactive_elements: ["Dropdown Menus", "Search", "CTA"],
                tokens: {
                    font: "Inter",
                    spacing: "compact",
                    radius: "small"
                }
            },
            design: {
                editableProps: {
                    logo: "Stripe",
                    menuItems: ["Products", "Solutions", "Developers", "Resources", "Pricing"]
                },
                interactive_elements: ["Mega Menu", "Search Bar", "Login"],
                tokens: {
                    font: "font-sans",
                    spacing: "space-x-md",
                    radius: "rounded-lg"
                },
                matched_components: [
                    { id: "nav-alt-1", thumbnail: vibesImages[5].src, name: "Clean Nav" },
                    { id: "nav-alt-2", thumbnail: vibesImages[0].src, name: "Bold Nav" }
                ]
            },
            feedback: null
        },
        {
            id: "features-1",
            section_type: "Features",
            layout_structure: "three-column-grid",
            intent: "educate",
            tone: "informative",
            screenshot_url: vibesImages[0].src,
            editableProps: {
                title: "A complete commerce toolkit",
                subtitle: "From checkout to global sales tax compliance"
            },
            metadata: {
                insight: "This section uses a three-column grid layout to create visual balance and make features easy to scan",
                section_type: "Features",
                layout_structure: "three-column-grid",
                intent: "educate",
                tone: "informative",
                interactive_elements: ["Feature Cards", "Icons", "Learn More Links"],
                tokens: {
                    font: "Inter",
                    spacing: "balanced",
                    radius: "medium"
                }
            },
            design: {
                editableProps: {
                    title: "A complete commerce toolkit",
                    subtitle: "From checkout to global sales tax compliance",
                    features: ["Payment Processing", "Fraud Prevention", "Global Support"]
                },
                interactive_elements: ["Interactive Cards", "Hover Effects", "CTAs"],
                tokens: {
                    font: "font-sans",
                    spacing: "gap-lg",
                    radius: "rounded-xl"
                },
                matched_components: [
                    { id: "features-alt-1", thumbnail: vibesImages[2].src, name: "Minimal Features" },
                    { id: "features-alt-2", thumbnail: vibesImages[3].src, name: "Fun Features" },
                    { id: "features-alt-3", thumbnail: vibesImages[7].src, name: "Elegant Features" }
                ]
            },
            feedback: null
        },
        {
            id: "pricing-1",
            section_type: "Pricing",
            layout_structure: "card-layout",
            intent: "convert",
            tone: "trustworthy",
            screenshot_url: vibesImages[6].src,
            editableProps: {
                title: "Integrated per-transaction pricing",
                plans: ["Starter", "Professional", "Enterprise"]
            },
            metadata: {
                insight: "This section uses a card-based pricing layout to make it easy to compare options at a glance",
                section_type: "Pricing",
                layout_structure: "card-layout",
                intent: "convert",
                tone: "trustworthy",
                interactive_elements: ["Price Cards", "Feature Toggles", "CTAs"],
                tokens: {
                    font: "Inter",
                    spacing: "spacious",
                    radius: "large"
                }
            },
            design: {
                editableProps: {
                    title: "Integrated per-transaction pricing",
                    plans: ["Starter", "Professional", "Enterprise"]
                },
                interactive_elements: ["Plan Selector", "Feature Comparison", "Contact Sales"],
                tokens: {
                    font: "font-sans",
                    spacing: "space-y-xl",
                    radius: "rounded-2xl"
                },
                matched_components: [
                    { id: "pricing-alt-1", thumbnail: vibesImages[5].src, name: "Simple Pricing" },
                    { id: "pricing-alt-2", thumbnail: vibesImages[7].src, name: "Premium Pricing" }
                ]
            },
            feedback: null
        },
        {
            id: "footer-1",
            section_type: "Footer",
            layout_structure: "multi-column",
            intent: "inform",
            tone: "comprehensive",
            screenshot_url: vibesImages[5].src,
            editableProps: {
                columns: ["Products", "Use Cases", "Resources", "Company"]
            },
            metadata: {
                insight: "This section uses a multi-column footer layout to provide comprehensive navigation without overwhelming users",
                section_type: "Footer",
                layout_structure: "multi-column",
                intent: "inform",
                tone: "comprehensive",
                interactive_elements: ["Links", "Newsletter", "Social Icons"],
                tokens: {
                    font: "Inter",
                    spacing: "compact",
                    radius: "none"
                }
            },
            design: {
                editableProps: {
                    columns: ["Products", "Use Cases", "Resources", "Company"],
                    copyright: "© 2024 Stripe, Inc."
                },
                interactive_elements: ["Newsletter Signup", "Social Links", "Language Selector"],
                tokens: {
                    font: "font-sans",
                    spacing: "gap-md",
                    radius: "rounded-none"
                },
                matched_components: [
                    { id: "footer-alt-1", thumbnail: vibesImages[2].src, name: "Minimal Footer" },
                    { id: "footer-alt-2", thumbnail: vibesImages[4].src, name: "Clean Footer" }
                ]
            },
            feedback: null
        }
    ]
};

// Quick suggestions for URL input
export const quickSuggestions = [
    { name: "Stripe", url: "stripe.com" },
    { name: "Notion", url: "notion.so" },
    { name: "Linear", url: "linear.app" },
    { name: "Vercel", url: "vercel.com" },
    { name: "Figma", url: "figma.com" }
];

// ✅ UPDATED: Enhanced processing steps with better copy and completion message
export const processingSteps = [
    "Learning page structure...",
    "Capturing full-page snapshot",
    "Mapping layout sections...", 
    "Generating intelligent previews...",
    "Complete! Found X sections",
];

// Like reason options
export const likeReasons = [
    "Layout",
    "Simplicity",
    "Colors",
    "Typography",
    "CTA",
    "Spacing",
    "Visual Balance",
    "Content Structure"
];

// Dislike reason options
export const dislikeReasons = [
    "Too busy",
    "Off brand",
    "Wrong tone",
    "Poor layout",
    "Confusing",
    "Too complex",
    "Not modern",
    "Bad spacing"
];

// ✅ UPDATED: Enhanced mock chat responses with better copy
export const mockChatResponses = {
    "Why does this layout work?": "Got it — here's a breakdown... This layout works because it follows proven UX patterns. The visual hierarchy guides the eye naturally from the headline to the CTA, while the balanced spacing creates breathing room for better readability.",
    "Make cleaner": "Try this instead: reduce the number of elements, increase whitespace, use a more limited color palette, and ensure consistent alignment throughout.",
    "Refine layout": "Try this instead: reduce the number of elements, increase whitespace, use a more limited color palette, and ensure consistent alignment throughout.",
    "Dark mode?": "For dark mode: use darker backgrounds (#0f172a), lighter text (#f1f5f9), reduce contrast slightly for comfort, and ensure sufficient color contrast ratios for accessibility.",
    "Swap this for something cleaner": "I'd recommend a minimalist approach: single-column layout, more whitespace, simplified navigation, and focus on one primary action per section.",
    "What would this look like in dark mode?": "In dark mode, this would feature deep backgrounds, inverted text colors, subtle shadows using lighter colors, and adjusted accent colors for better visibility."
};

// Mock suggestions based on section type
export const mockSuggestions = {
    'hero-1': [
        {
            id: 'hero-alt-1',
            section_type: 'Hero',
            layout_structure: 'centered-content',
            intent: 'convert',
            tone: 'minimal',
            screenshot_url: vibesImages[2].src,
            metadata: {
                insight: "Centered hero focuses attention on a single message"
            }
        },
        {
            id: 'hero-alt-2',
            section_type: 'Hero',
            layout_structure: 'full-width-image',
            intent: 'inspire',
            tone: 'bold',
            screenshot_url: vibesImages[0].src,
            metadata: {
                insight: "Full-width imagery creates immediate visual impact"
            }
        },
        {
            id: 'hero-alt-3',
            section_type: 'Hero',
            layout_structure: 'asymmetric',
            intent: 'engage',
            tone: 'playful',
            screenshot_url: vibesImages[3].src,
            metadata: {
                insight: "Asymmetric layouts add visual interest and modernity"
            }
        }
    ],
    'features-1': [
        {
            id: 'features-alt-1',
            section_type: 'Features',
            layout_structure: 'two-column-alternating',
            intent: 'educate',
            tone: 'clean',
            screenshot_url: vibesImages[4].src,
            metadata: {
                insight: "Alternating layout creates visual rhythm"
            }
        },
        {
            id: 'features-alt-2',
            section_type: 'Features',
            layout_structure: 'single-column-cards',
            intent: 'inform',
            tone: 'minimal',
            screenshot_url: vibesImages[2].src,
            metadata: {
                insight: "Single column improves mobile experience"
            }
        }
    ]
};

// Layout generation templates based on ideas
export const layoutGenerationTemplates = {
    'finance': {
        sections: [
            {
                id: 'fin-hero-1',
                section_type: 'Hero',
                layout_structure: 'split-content',
                intent: 'build-trust',
                tone: 'professional',
                screenshot_url: vibesImages[7].src,
                metadata: {
                    insight: "Financial services need trust-building hero sections"
                }
            },
            {
                id: 'fin-features-1',
                section_type: 'Features',
                layout_structure: 'icon-grid',
                intent: 'educate',
                tone: 'trustworthy',
                screenshot_url: vibesImages[5].src,
                metadata: {
                    insight: "Icon grids help explain complex financial features"
                }
            },
            {
                id: 'fin-testimonials-1',
                section_type: 'Testimonials',
                layout_structure: 'carousel',
                intent: 'build-trust',
                tone: 'authentic',
                screenshot_url: vibesImages[6].src,
                metadata: {
                    insight: "Social proof is crucial for financial services"
                }
            }
        ]
    },
    'saas': {
        sections: [
            {
                id: 'saas-hero-1',
                section_type: 'Hero',
                layout_structure: 'centered-with-demo',
                intent: 'convert',
                tone: 'modern',
                screenshot_url: vibesImages[1].src,
                metadata: {
                    insight: "SaaS products benefit from showing the product early"
                }
            },
            {
                id: 'saas-features-1',
                section_type: 'Features',
                layout_structure: 'three-column-benefits',
                intent: 'educate',
                tone: 'innovative',
                screenshot_url: vibesImages[0].src,
                metadata: {
                    insight: "Highlight key benefits in digestible chunks"
                }
            }
        ]
    },
    'default': {
        sections: [
            {
                id: 'default-hero-1',
                section_type: 'Hero',
                layout_structure: 'classic',
                intent: 'engage',
                tone: 'welcoming',
                screenshot_url: vibesImages[4].src,
                metadata: {
                    insight: "Classic hero layout works for most businesses"
                }
            },
            {
                id: 'default-about-1',
                section_type: 'About',
                layout_structure: 'side-by-side',
                intent: 'inform',
                tone: 'friendly',
                screenshot_url: vibesImages[3].src,
                metadata: {
                    insight: "Tell your story with visuals and text"
                }
            }
        ]
    }
};

// ✅ UPDATED: Enhanced pre-filled chat prompts
export const chatPrompts = [
    "Why does this layout work?",
    "Refine layout", // ✅ Changed from "Make cleaner"
    "Dark mode?",
    "Make it more modern",
    "Add more whitespace",
    "How can I improve the CTA?"
];