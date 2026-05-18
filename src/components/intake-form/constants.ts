// constants.ts
import { type IntakeFormData } from "./types";

export const vibesImages = [
    { id: 1, name: "Bold", src: "/images/vibeImages/bold.webp" },
    { id: 2, name: "Minimal", src: "/images/vibeImages/minimal.webp" },
    { id: 3, name: "Fun", src: "/images/vibeImages/fun.webp" },
    { id: 4, name: "Playful", src: "/images/vibeImages/playful.webp" },
    { id: 5, name: "Clean", src: "/images/vibeImages/clean.webp" },
    { id: 6, name: "Earthy", src: "/images/vibeImages/earthy.webp" },
    { id: 7, name: "Elegant", src: "/images/vibeImages/elegent.webp" },
    { id: 8, name: "Luxury", src: "/images/vibeImages/luxury.webp" },
    { id: 9, name: "Corporate", src: "/images/vibeImages/corporate.png" }
];

export const suggestedPageChips = [
    'Homepage',
    'About Us',
    'Contact Page',
    'Services',
    'Portfolio',
    'Blog',
    'FAQ',
    'Testimonials',
    'Pricing Page',
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