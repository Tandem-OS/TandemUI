// constants.ts
import { type IntakeFormData } from "./types";

export const vibesImages = [
    { id: 1, name: "Clean", src: "/images/vibeImages/clean.webp" },
    { id: 2, name: "Minimal", src: "/images/vibeImages/minimal.webp" },
    { id: 3, name: "Bold", src: "/images/vibeImages/bold.webp" },
    { id: 4, name: "Editorial", src: "/images/vibeImages/editorial.webp" },
    { id: 5, name: "Luxury", src: "/images/vibeImages/luxury.webp" },
    { id: 6, name: "Playful", src: "/images/vibeImages/playful.webp" },
    { id: 7, name: "Technical / SaaS", src: "/images/vibeImages/corporate.png" },
    { id: 8, name: "Warm Service", src: "/images/vibeImages/warm-service.webp" },
    { id: 9, name: "High-Conversion", src: "/images/vibeImages/high-conversion.webp" },
];

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