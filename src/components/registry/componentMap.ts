import type { ComponentMap } from "../../types/registry.types"

export const componentMap: ComponentMap = {
    "minimal-hero-demo": {
        builder: () => import("../builders/heroes/HeroBuilder"),
        defaultProps: { style: "minimal" },
        previewProps: {
            headline: "Simple. Clean. Effective.",
            subheadline: "Minimal Hero puts the message front and center.",
            ctaText: "Explore Now",
            layout: "centered",
            animation: "fade",
            colors: {
                primary: "#9333ea",
                text: "#1f2937",
            },
        },
    },
    "modern-hero-demo": {
        builder: () => import("../builders/heroes/HeroBuilder"),
        defaultProps: { style: "modern" },
        previewProps: {
            headline: "Design Boldly",
            subheadline: "Modern Hero is perfect for bold brands and impact.",
            ctaText: "Join Us",
            layout: "split",
            animation: "slide",
            colors: {
                primary: "#f97316",
                text: "#111827",
            },
        },
    },
    "creative-hero-demo": {
        builder: () => import("../builders/heroes/HeroBuilder"),
        defaultProps: { style: "creative" },
        previewProps: {
            headline: "Unleash Creativity",
            subheadline: "Creative Hero is where ideas shine.",
            ctaText: "Start Designing",
            layout: "fullwidth",
            animation: "fade",
            colors: {
                primary: "#22c55e",
                text: "#ffffff",
            },
        },
    },
}