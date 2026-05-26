// constants.ts
import { type IntakeFormData } from "./types";


export const TONE_METADATA: Record<string, {
    id: number;
    slug: string;
    name: string;
    src: string;
    description: string;
    tags: string[];
    ragHints: string[];
}> = {
    "clean": {
        id: 1,
        slug: "clean",
        name: "Clean",
        src: "/images/vibeImages/clean.webp",
        description: "Minimal visual noise, generous whitespace, and structured layouts. Communicates clarity, professionalism, and focus.",
        tags: ["whitespace", "structured", "minimal-color", "grid-aligned", "professional"],
        ragHints: ["clean layout", "whitespace heavy", "structured grid", "professional minimal"],
    },
    "minimal": {
        id: 2,
        slug: "minimal",
        name: "Minimal",
        src: "/images/vibeImages/minimal.webp",
        description: "Stripped-back design with only essential elements. Strong typography-led layouts with restrained use of color.",
        tags: ["stripped-back", "typography-led", "restrained-color", "essential-only", "quiet"],
        ragHints: ["minimal design", "typography focus", "restrained palette", "essential elements only"],
    },
    "bold": {
        id: 3,
        slug: "bold",
        name: "Bold",
        src: "/images/vibeImages/bold.webp",
        description: "High contrast, strong typographic presence, and confident color usage. Designed to make an immediate impact.",
        tags: ["high-contrast", "strong-type", "confident-color", "impactful", "statement"],
        ragHints: ["bold typography", "high contrast", "statement design", "confident colors"],
    },
    "editorial": {
        id: 4,
        slug: "editorial",
        name: "Editorial",
        src: "/images/vibeImages/editorial.webp",
        description: "Content-first layouts with split image and text compositions, serif typography, and generous whitespace. Built for storytelling and publication-grade presentation.",
        tags: ["content-first", "serif-type", "split-layout", "storytelling", "publication", "image-text-balance"],
        ragHints: ["editorial layout", "split image text", "serif typography", "content forward", "publication design", "magazine layout"],
    },
    "luxury": {
        id: 5,
        slug: "luxury",
        name: "Luxury",
        src: "/images/vibeImages/luxury.webp",
        description: "Refined and elevated aesthetics with dark tones, gold accents, and premium typography. Communicates exclusivity and high-end positioning.",
        tags: ["refined", "elevated", "dark-tones", "premium-type", "exclusive", "high-end"],
        ragHints: ["luxury design", "premium brand", "dark refined", "elevated aesthetic"],
    },
    "playful": {
        id: 6,
        slug: "playful",
        name: "Playful",
        src: "/images/vibeImages/playful.webp",
        description: "Energetic layouts with vibrant colors, rounded elements, and expressive typography. Communicates approachability and personality.",
        tags: ["vibrant", "rounded", "expressive-type", "energetic", "approachable", "colorful"],
        ragHints: ["playful design", "vibrant colors", "rounded shapes", "energetic layout"],
    },
    "technical-saas": {
        id: 7,
        slug: "technical-saas",
        name: "Technical / SaaS",
        src: "/images/vibeImages/technical-saas.webp",
        description: "Clean light-background layouts with bold centered typography, single clear CTA, and structured product UI previews. Built for software products, SaaS startups, and cloud tools where credibility and clarity drive conversion.",
        tags: ["light-background", "centered-layout", "single-cta", "product-preview", "software", "saas", "cloud", "startup", "credibility", "conversion-focused"],
        ragHints: ["SaaS product landing", "software startup design", "light minimal product", "centered CTA layout", "technical product site", "cloud tool marketing"],
    },
    "warm-trustworthy": {
        id: 8,
        slug: "warm-trustworthy",
        name: "Warm & Trustworthy",
        src: "/images/vibeImages/warm-trustworthy.webp",
        description: "Full-bleed hero imagery with warm earth tones, serif typography, and calm human-centered layouts. Communicates trust, approachability, and emotional connection. Suited for lifestyle, wellness, interior, and service brands.",
        tags: ["full-bleed", "earth-tones", "serif-type", "human-centered", "warm", "calm", "lifestyle", "wellness", "interior", "service", "trustworthy"],
        ragHints: ["warm lifestyle brand", "earth tone design", "full bleed hero", "serif calm layout", "human centered design", "wellness service brand", "trustworthy brand design"],
    },
    "high-conversion": {
        id: 9,
        slug: "high-conversion",
        name: "High-Conversion",
        src: "/images/vibeImages/high-conversion.webp",
        description: "Heavy-weight typography, asymmetric floating UI card layouts, analytics dashboards, and strong action-oriented CTAs. Designed to drive signups, trials, and results. Signals urgency, capability, and momentum.",
        tags: ["heavy-type", "floating-cards", "dashboard-ui", "action-cta", "conversion", "urgency", "signup-focused", "analytics", "growth", "results-driven", "asymmetric-layout"],
        ragHints: ["high conversion landing", "bold CTA design", "floating UI cards", "growth product design", "action oriented layout", "signup driven design", "analytics dashboard hero"],
    },
};


export const vibesImages = Object.values(TONE_METADATA).map(({ id, name, src, slug }) => ({
    id,
    name,
    src,
    slug,
}));

export const LAUNCH_TONE_SLUGS = Object.keys(TONE_METADATA);

export const suggestedPageChips = [
    'Homepage',
    'About Us',
    'Services',
    'Pricing Page',
    'Portfolio',
    'Testimonials',
    'Blog',
    'FAQ',
    'Contact Page',
    'Custom Request',
];

export const initialFormData: IntakeFormData = {
    tones: [],
    toneMetadata: [],
    keyFeatures: '',
    inspirationUrls: [''],
    colorStrategy: 'match-logo',
    customColors: '',
    deadline: '',
    notSureDeadline: false,
    currentSiteUrl: '',
    brandGuide: null,
    additionalDetails: '',
};

export const OPTIONS = {
    colorStrategies: [
        { id: 'match-logo', label: 'Match my logo' },
        { id: 'pick-for-me', label: 'Pick for me' },
        { id: 'custom', label: 'Custom' },
    ]
};
