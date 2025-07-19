// src/constants.ts

// Dummy data using existing vibe images
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

// Simple dummy scraped data
export const dummyScrapedData = {
    url: "stripe.com",
    analyzedAt: new Date(),
    sections: [
        {
            id: "hero-1",
            section_type: "Hero",
            layout_structure: "split-content",
            intent: "convert",
            screenshot_url: vibesImages[1].src,
            editableProps: {
                title: "Online payment processing for internet businesses",
                subtitle: "Accept payments online, in person, or through your platform",
                cta: "Start now"
            },
            feedback: null
        },
        {
            id: "nav-1",
            section_type: "Navigation",
            layout_structure: "horizontal-centered",
            intent: "navigate",
            screenshot_url: vibesImages[4].src,
            editableProps: {
                logo: "Stripe",
                menuItems: ["Products", "Solutions", "Developers", "Resources", "Pricing"]
            },
            feedback: null
        },
        {
            id: "features-1",
            section_type: "Features",
            layout_structure: "three-column-grid",
            intent: "educate",
            screenshot_url: vibesImages[0].src,
            editableProps: {
                title: "A complete commerce toolkit",
                subtitle: "From checkout to global sales tax compliance"
            },
            feedback: null
        },
        {
            id: "pricing-1",
            section_type: "Pricing",
            layout_structure: "card-layout",
            intent: "convert",
            screenshot_url: vibesImages[6].src,
            editableProps: {
                title: "Integrated per-transaction pricing",
                plans: ["Starter", "Professional", "Enterprise"]
            },
            feedback: null
        },
        {
            id: "footer-1",
            section_type: "Footer",
            layout_structure: "multi-column",
            intent: "inform",
            screenshot_url: vibesImages[5].src,
            editableProps: {
                columns: ["Products", "Use Cases", "Resources", "Company"]
            },
            feedback: null
        }
    ]
};

export const quickSuggestions = [
    { name: "Stripe", url: "stripe.com" },
    { name: "Notion", url: "notion.so" },
    { name: "Linear", url: "linear.app" },
    { name: "Vercel", url: "vercel.com" },
    { name: "Figma", url: "figma.com" }
];

export const processingSteps = [
    "Analyzing URL structure...",
    "Capturing full-page screenshot...",
    "Detecting layout sections...",
    "Generating section previews...",
    "Complete! Found 5 sections"
];