// mockData/aiHelpData.js

export const vibeImages = [
    { id: 1, name: "Bold", src: "/images/vibeImages/bold.webp" },
    { id: 2, name: "Minimal", src: "/images/vibeImages/minimal.webp" },
    { id: 3, name: "Fun", src: "/images/vibeImages/fun.webp" },
    { id: 4, name: "Playful", src: "/images/vibeImages/playful.webp" },
    { id: 5, name: "Clean", src: "/images/vibeImages/clean.webp" },
    { id: 6, name: "Earthy", src: "/images/vibeImages/earthy.webp" },
    { id: 7, name: "Elegant", src: "/images/vibeImages/elegent.webp" },
    { id: 8, name: "Luxury", src: "/images/vibeImages/luxury.webp" }
];

export const mockProjects = [
    {
        id: 1,
        name: "Modern Startup Landing",
        status: "embedded",
        lastUpdate: "2 hours ago",
        components: 24,
        client: "TechStart Inc.",
        designer: "Sarah Johnson"
    },
    {
        id: 2,
        name: "E-commerce Redesign",
        status: "pending",
        lastUpdate: "1 day ago",
        components: 48,
        client: "ShopMax Ltd.",
        designer: "Mike Chen"
    },
    {
        id: 3,
        name: "Portfolio Website",
        status: "embedded",
        lastUpdate: "3 hours ago",
        components: 16,
        client: "Creative Studio",
        designer: "Emma Wilson"
    },
    {
        id: 4,
        name: "SaaS Dashboard",
        status: "pending",
        lastUpdate: "5 hours ago",
        components: 32,
        client: "DataFlow Systems",
        designer: "Alex Rivera"
    }
];

export const mockComponents = [
    {
        id: 1,
        name: "Bold Hero Section",
        type: "Hero",
        vibe: "Bold",
        src: "/images/vibeImages/bold.webp",
        relevance: 95,
        description: "Eye-catching hero with strong typography and vibrant colors"
    },
    {
        id: 2,
        name: "Minimal Navigation",
        type: "Navigation",
        vibe: "Minimal",
        src: "/images/vibeImages/minimal.webp",
        relevance: 89,
        description: "Clean navigation bar with subtle animations"
    },
    {
        id: 3,
        name: "Fun Footer",
        type: "Footer",
        vibe: "Fun",
        src: "/images/vibeImages/fun.webp",
        relevance: 87,
        description: "Playful footer design with interactive elements"
    },
    {
        id: 4,
        name: "Playful CTA",
        type: "CTA",
        vibe: "Playful",
        src: "/images/vibeImages/playful.webp",
        relevance: 85,
        description: "Engaging call-to-action with animated hover effects"
    },
    {
        id: 5,
        name: "Clean Testimonial",
        type: "Testimonial",
        vibe: "Clean",
        src: "/images/vibeImages/clean.webp",
        relevance: 82,
        description: "Minimalist testimonial cards with elegant typography"
    },
    {
        id: 6,
        name: "Earthy About Section",
        type: "About",
        vibe: "Earthy",
        src: "/images/vibeImages/earthy.webp",
        relevance: 78,
        description: "Natural-themed about section with organic shapes"
    },
    {
        id: 7,
        name: "Elegant Gallery",
        type: "Gallery",
        vibe: "Elegant",
        src: "/images/vibeImages/elegent.webp",
        relevance: 75,
        description: "Sophisticated image gallery with smooth transitions"
    },
    {
        id: 8,
        name: "Luxury Pricing",
        type: "Pricing",
        vibe: "Luxury",
        src: "/images/vibeImages/luxury.webp",
        relevance: 72,
        description: "Premium pricing tables with gold accents"
    }
];

export const sampleBriefs = [
    {
        id: 1,
        projectName: "Modern Startup Landing",
        brief: `**Project Overview**
This modern startup landing page aims to establish a strong digital presence with a focus on conversion optimization and brand storytelling.

**Design Direction**
- Style: Clean, minimal aesthetic with bold accent colors
- Typography: Modern sans-serif with strong hierarchy
- Color Palette: Primary blues with energetic accent colors
- Layout: Responsive grid system with ample whitespace

**Key Components**
1. Hero section with compelling CTA
2. Feature showcase with interactive elements
3. Social proof through testimonials
4. Clear pricing structure
5. Contact form with validation

**Target Audience**
Tech-savvy professionals aged 25-40 looking for innovative solutions.

**Success Metrics**
- Conversion rate increase of 25%
- Reduced bounce rate
- Improved user engagement time`
    },
    {
        id: 2,
        projectName: "E-commerce Redesign",
        brief: `**Project Overview**
Complete redesign of existing e-commerce platform to improve user experience and increase sales conversion.

**Design Direction**
- Style: Modern, trustworthy with product-focused layouts
- Typography: Clear, readable fonts optimized for product descriptions
- Color Palette: Neutral base with brand accent colors
- Layout: Card-based design with intuitive navigation

**Key Components**
1. Advanced product filtering system
2. Quick view functionality
3. Streamlined checkout process
4. Customer review integration
5. Wishlist and comparison features

**Target Audience**
Online shoppers aged 18-55 seeking quality products with seamless shopping experience.

**Success Metrics**
- Cart abandonment reduction by 30%
- Average order value increase of 20%
- Mobile conversion improvement`
    }
];

export const searchSuggestions = [
    "minimalist landing page",
    "bold testimonial section",
    "modern navigation bar",
    "elegant pricing table",
    "playful hero banner",
    "clean contact form",
    "luxury product showcase",
    "fun animation effects"
];