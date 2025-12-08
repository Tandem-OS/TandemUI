import { type ComponentPreview } from './swiper.types';

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

export const mockSwiperData: ComponentPreview[] = [
    // Hero Section (4 variants)
    {
        component_id: "hero-bold-001",
        thumbnail_url: "/images/vibeImages/bold.webp",
        vibe: "Bold",
        tone: ["bold", "impactful", "strong"],
        layout_structure: "full-width-hero",
        intent: ["conversion", "engagement"],
        tags: ["hero", "bold", "impact"],
        title: "Make a Bold Statement",
        description: "Powerful hero section with strong typography and commanding presence.",
        category: "Hero"
    },
    {
        component_id: "hero-minimal-002",
        thumbnail_url: "/images/vibeImages/minimal.webp",
        vibe: "Minimal",
        tone: ["minimal", "clean", "focused"],
        layout_structure: "centered-hero",
        intent: ["clarity", "focus"],
        tags: ["hero", "minimal", "clean"],
        title: "Less is More",
        description: "Clean and minimal hero design that speaks volumes through simplicity.",
        category: "Hero"
    },
    {
        component_id: "hero-elegant-003",
        thumbnail_url: "/images/vibeImages/elegent.webp",
        vibe: "Elegant",
        tone: ["elegant", "sophisticated", "refined"],
        layout_structure: "split-hero",
        intent: ["brand-building", "premium"],
        tags: ["hero", "elegant", "premium"],
        title: "Sophisticated Excellence",
        description: "Elegant hero section with refined typography and premium feel.",
        category: "Hero"
    },
    {
        component_id: "hero-playful-004",
        thumbnail_url: "/images/vibeImages/playful.webp",
        vibe: "Playful",
        tone: ["playful", "fun", "energetic"],
        layout_structure: "dynamic-hero",
        intent: ["engagement", "delight"],
        tags: ["hero", "playful", "fun"],
        title: "Let's Have Some Fun",
        description: "Playful hero design that brings joy and energy to your brand.",
        category: "Hero"
    },

    // Features Section (4 variants)
    {
        component_id: "features-clean-005",
        thumbnail_url: "/images/vibeImages/clean.webp",
        vibe: "Clean",
        tone: ["clean", "organized", "clear"],
        layout_structure: "grid-features",
        intent: ["education", "showcase"],
        tags: ["features", "clean", "grid"],
        title: "Crystal Clear Features",
        description: "Clean feature showcase with perfect organization and clarity.",
        category: "Features"
    },
    {
        component_id: "features-luxury-006",
        thumbnail_url: "/images/vibeImages/luxury.webp",
        vibe: "Luxury",
        tone: ["luxury", "premium", "exclusive"],
        layout_structure: "premium-features",
        intent: ["premium-showcase", "exclusivity"],
        tags: ["features", "luxury", "premium"],
        title: "Premium Feature Set",
        description: "Luxury feature presentation with premium aesthetics and exclusivity.",
        category: "Features"
    },
    {
        component_id: "features-fun-007",
        thumbnail_url: "/images/vibeImages/fun.webp",
        vibe: "Fun",
        tone: ["fun", "creative", "vibrant"],
        layout_structure: "creative-features",
        intent: ["engagement", "creativity"],
        tags: ["features", "fun", "creative"],
        title: "Features That Wow",
        description: "Fun and creative feature presentation that captivates users.",
        category: "Features"
    },
    {
        component_id: "features-earthy-008",
        thumbnail_url: "/images/vibeImages/earthy.webp",
        vibe: "Earthy",
        tone: ["earthy", "natural", "organic"],
        layout_structure: "organic-features",
        intent: ["trust", "natural"],
        tags: ["features", "earthy", "natural"],
        title: "Natural Feature Flow",
        description: "Earthy feature design with organic flow and natural aesthetics.",
        category: "Features"
    },

    // Testimonials Section (4 variants)
    {
        component_id: "testimonials-minimal-009",
        thumbnail_url: "/images/vibeImages/minimal.webp",
        vibe: "Minimal",
        tone: ["minimal", "authentic", "focused"],
        layout_structure: "simple-testimonials",
        intent: ["trust-building", "authenticity"],
        tags: ["testimonials", "minimal", "trust"],
        title: "Pure Testimonials",
        description: "Minimal testimonial design focusing on authentic customer voices.",
        category: "Testimonials"
    },
    {
        component_id: "testimonials-elegant-010",
        thumbnail_url: "/images/vibeImages/elegent.webp",
        vibe: "Elegant",
        tone: ["elegant", "sophisticated", "trustworthy"],
        layout_structure: "refined-testimonials",
        intent: ["credibility", "premium"],
        tags: ["testimonials", "elegant", "credible"],
        title: "Refined Social Proof",
        description: "Elegant testimonial presentation with sophisticated credibility.",
        category: "Testimonials"
    },
    {
        component_id: "testimonials-bold-011",
        thumbnail_url: "/images/vibeImages/bold.webp",
        vibe: "Bold",
        tone: ["bold", "impactful", "confident"],
        layout_structure: "powerful-testimonials",
        intent: ["impact", "confidence"],
        tags: ["testimonials", "bold", "impact"],
        title: "Powerful Social Proof",
        description: "Bold testimonial design that makes a strong impact statement.",
        category: "Testimonials"
    },
    {
        component_id: "testimonials-playful-012",
        thumbnail_url: "/images/vibeImages/playful.webp",
        vibe: "Playful",
        tone: ["playful", "friendly", "approachable"],
        layout_structure: "friendly-testimonials",
        intent: ["approachability", "friendliness"],
        tags: ["testimonials", "playful", "friendly"],
        title: "Friendly Voices",
        description: "Playful testimonial design with friendly and approachable feel.",
        category: "Testimonials"
    },

    // Pricing Section (4 variants)
    {
        component_id: "pricing-clean-013",
        thumbnail_url: "/images/vibeImages/clean.webp",
        vibe: "Clean",
        tone: ["clean", "transparent", "clear"],
        layout_structure: "clear-pricing",
        intent: ["transparency", "clarity"],
        tags: ["pricing", "clean", "transparent"],
        title: "Transparent Pricing",
        description: "Clean pricing design with crystal clear value proposition.",
        category: "Pricing"
    },
    {
        component_id: "pricing-luxury-014",
        thumbnail_url: "/images/vibeImages/luxury.webp",
        vibe: "Luxury",
        tone: ["luxury", "premium", "exclusive"],
        layout_structure: "premium-pricing",
        intent: ["premium-positioning", "exclusivity"],
        tags: ["pricing", "luxury", "premium"],
        title: "Premium Plans",
        description: "Luxury pricing presentation for premium positioning and exclusivity.",
        category: "Pricing"
    },
    {
        component_id: "pricing-fun-015",
        thumbnail_url: "/images/vibeImages/fun.webp",
        vibe: "Fun",
        tone: ["fun", "engaging", "creative"],
        layout_structure: "creative-pricing",
        intent: ["engagement", "approachability"],
        tags: ["pricing", "fun", "engaging"],
        title: "Pricing Made Fun",
        description: "Fun pricing design that makes choosing plans enjoyable and engaging.",
        category: "Pricing"
    },
    {
        component_id: "pricing-minimal-016",
        thumbnail_url: "/images/vibeImages/minimal.webp",
        vibe: "Minimal",
        tone: ["minimal", "simple", "focused"],
        layout_structure: "simple-pricing",
        intent: ["simplicity", "focus"],
        tags: ["pricing", "minimal", "simple"],
        title: "Simple Pricing",
        description: "Minimal pricing design focusing on simplicity and clear choices.",
        category: "Pricing"
    },

    // CTAs Section (4 variants)
    {
        component_id: "cta-bold-017",
        thumbnail_url: "/images/vibeImages/bold.webp",
        vibe: "Bold",
        tone: ["bold", "action-oriented", "urgent"],
        layout_structure: "powerful-cta",
        intent: ["conversion", "urgency"],
        tags: ["cta", "bold", "conversion"],
        title: "Take Action Now",
        description: "Bold CTA design that demands attention and drives immediate action.",
        category: "CTAs"
    },
    {
        component_id: "cta-elegant-018",
        thumbnail_url: "/images/vibeImages/elegent.webp",
        vibe: "Elegant",
        tone: ["elegant", "sophisticated", "refined"],
        layout_structure: "refined-cta",
        intent: ["premium-conversion", "sophistication"],
        tags: ["cta", "elegant", "premium"],
        title: "Elevate Your Experience",
        description: "Elegant CTA design with sophisticated appeal and premium positioning.",
        category: "CTAs"
    },
    {
        component_id: "cta-playful-019",
        thumbnail_url: "/images/vibeImages/playful.webp",
        vibe: "Playful",
        tone: ["playful", "friendly", "inviting"],
        layout_structure: "friendly-cta",
        intent: ["friendly-conversion", "approachability"],
        tags: ["cta", "playful", "friendly"],
        title: "Join the Fun",
        description: "Playful CTA design that invites users with friendly and fun approach.",
        category: "CTAs"
    },
    {
        component_id: "cta-earthy-020",
        thumbnail_url: "/images/vibeImages/earthy.webp",
        vibe: "Earthy",
        tone: ["earthy", "natural", "authentic"],
        layout_structure: "organic-cta",
        intent: ["authentic-conversion", "trust"],
        tags: ["cta", "earthy", "authentic"],
        title: "Natural Choice",
        description: "Earthy CTA design with authentic appeal and natural conversion flow.",
        category: "CTAs"
    },

    // Navigation Section (4 variants)
    {
        component_id: "nav-minimal-021",
        thumbnail_url: "/images/vibeImages/minimal.webp",
        vibe: "Minimal",
        tone: ["minimal", "clean", "focused"],
        layout_structure: "clean-navigation",
        intent: ["usability", "clarity"],
        tags: ["navigation", "minimal", "clean"],
        title: "Clean Navigation",
        description: "Minimal navigation design with perfect clarity and user focus.",
        category: "Nav"
    },
    {
        component_id: "nav-luxury-022",
        thumbnail_url: "/images/vibeImages/luxury.webp",
        vibe: "Luxury",
        tone: ["luxury", "premium", "sophisticated"],
        layout_structure: "premium-navigation",
        intent: ["premium-experience", "sophistication"],
        tags: ["navigation", "luxury", "premium"],
        title: "Premium Navigation",
        description: "Luxury navigation design with premium aesthetics and sophistication.",
        category: "Nav"
    },
    {
        component_id: "nav-fun-023",
        thumbnail_url: "/images/vibeImages/fun.webp",
        vibe: "Fun",
        tone: ["fun", "creative", "engaging"],
        layout_structure: "creative-navigation",
        intent: ["engagement", "creativity"],
        tags: ["navigation", "fun", "creative"],
        title: "Creative Navigation",
        description: "Fun navigation design that makes site exploration creative and engaging.",
        category: "Nav"
    },
    {
        component_id: "nav-clean-024",
        thumbnail_url: "/images/vibeImages/clean.webp",
        vibe: "Clean",
        tone: ["clean", "organized", "efficient"],
        layout_structure: "organized-navigation",
        intent: ["efficiency", "organization"],
        tags: ["navigation", "clean", "organized"],
        title: "Organized Navigation",
        description: "Clean navigation design with perfect organization and efficiency.",
        category: "Nav"
    },

    // Footer Section (4 variants)
    {
        component_id: "footer-elegant-025",
        thumbnail_url: "/images/vibeImages/elegent.webp",
        vibe: "Elegant",
        tone: ["elegant", "sophisticated", "complete"],
        layout_structure: "refined-footer",
        intent: ["completion", "sophistication"],
        tags: ["footer", "elegant", "complete"],
        title: "Elegant Conclusion",
        description: "Elegant footer design that provides sophisticated site completion.",
        category: "Footer"
    },
    {
        component_id: "footer-earthy-026",
        thumbnail_url: "/images/vibeImages/earthy.webp",
        vibe: "Earthy",
        tone: ["earthy", "natural", "grounded"],
        layout_structure: "organic-footer",
        intent: ["grounding", "natural"],
        tags: ["footer", "earthy", "grounded"],
        title: "Grounded Foundation",
        description: "Earthy footer design with natural grounding and organic completion.",
        category: "Footer"
    },
    {
        component_id: "footer-bold-027",
        thumbnail_url: "/images/vibeImages/bold.webp",
        vibe: "Bold",
        tone: ["bold", "strong", "memorable"],
        layout_structure: "powerful-footer",
        intent: ["memorable-ending", "impact"],
        tags: ["footer", "bold", "memorable"],
        title: "Strong Finish",
        description: "Bold footer design that creates memorable and impactful site ending.",
        category: "Footer"
    },
    {
        component_id: "footer-minimal-028",
        thumbnail_url: "/images/vibeImages/minimal.webp",
        vibe: "Minimal",
        tone: ["minimal", "clean", "simple"],
        layout_structure: "simple-footer",
        intent: ["simplicity", "clean-ending"],
        tags: ["footer", "minimal", "simple"],
        title: "Simple Conclusion",
        description: "Minimal footer design with clean simplicity and perfect completion.",
        category: "Footer"
    },

    // FAQ Section (4 variants)
    {
        component_id: "faq-clean-029",
        thumbnail_url: "/images/vibeImages/clean.webp",
        vibe: "Clean",
        tone: ["clean", "organized", "helpful"],
        layout_structure: "organized-faq",
        intent: ["helpfulness", "clarity"],
        tags: ["faq", "clean", "helpful"],
        title: "Clear Answers",
        description: "Clean FAQ design with organized information and helpful clarity.",
        category: "FAQ"
    },
    {
        component_id: "faq-playful-030",
        thumbnail_url: "/images/vibeImages/playful.webp",
        vibe: "Playful",
        tone: ["playful", "friendly", "approachable"],
        layout_structure: "friendly-faq",
        intent: ["approachability", "friendliness"],
        tags: ["faq", "playful", "friendly"],
        title: "Friendly Help",
        description: "Playful FAQ design that makes getting help friendly and approachable.",
        category: "FAQ"
    },
    {
        component_id: "faq-luxury-031",
        thumbnail_url: "/images/vibeImages/luxury.webp",
        vibe: "Luxury",
        tone: ["luxury", "premium", "exclusive"],
        layout_structure: "premium-faq",
        intent: ["premium-support", "exclusivity"],
        tags: ["faq", "luxury", "premium"],
        title: "Premium Support",
        description: "Luxury FAQ design with premium support aesthetics and exclusivity.",
        category: "FAQ"
    },
    {
        component_id: "faq-elegant-032",
        thumbnail_url: "/images/vibeImages/elegent.webp",
        vibe: "Elegant",
        tone: ["elegant", "sophisticated", "refined"],
        layout_structure: "refined-faq",
        intent: ["sophistication", "refinement"],
        tags: ["faq", "elegant", "refined"],
        title: "Refined Assistance",
        description: "Elegant FAQ design with sophisticated assistance and refined experience.",
        category: "FAQ"
    },

    // Blog Section (4 variants)
    {
        component_id: "blog-minimal-033",
        thumbnail_url: "/images/vibeImages/minimal.webp",
        vibe: "Minimal",
        tone: ["minimal", "focused", "readable"],
        layout_structure: "clean-blog",
        intent: ["readability", "focus"],
        tags: ["blog", "minimal", "readable"],
        title: "Pure Content",
        description: "Minimal blog design focusing on pure content and perfect readability.",
        category: "Blog"
    },
    {
        component_id: "blog-fun-034",
        thumbnail_url: "/images/vibeImages/fun.webp",
        vibe: "Fun",
        tone: ["fun", "engaging", "creative"],
        layout_structure: "creative-blog",
        intent: ["engagement", "creativity"],
        tags: ["blog", "fun", "engaging"],
        title: "Creative Stories",
        description: "Fun blog design that makes content creative, engaging and enjoyable.",
        category: "Blog"
    },
    {
        component_id: "blog-earthy-035",
        thumbnail_url: "/images/vibeImages/earthy.webp",
        vibe: "Earthy",
        tone: ["earthy", "natural", "authentic"],
        layout_structure: "organic-blog",
        intent: ["authenticity", "natural"],
        tags: ["blog", "earthy", "authentic"],
        title: "Authentic Narratives",
        description: "Earthy blog design with authentic storytelling and natural flow.",
        category: "Blog"
    },
    {
        component_id: "blog-bold-036",
        thumbnail_url: "/images/vibeImages/bold.webp",
        vibe: "Bold",
        tone: ["bold", "impactful", "strong"],
        layout_structure: "powerful-blog",
        intent: ["impact", "strength"],
        tags: ["blog", "bold", "impactful"],
        title: "Bold Stories",
        description: "Bold blog design that delivers impactful stories with strong presence.",
        category: "Blog"
    },

    // About Section (4 variants)
    {
        component_id: "about-elegant-037",
        thumbnail_url: "/images/vibeImages/elegent.webp",
        vibe: "Elegant",
        tone: ["elegant", "sophisticated", "trustworthy"],
        layout_structure: "refined-about",
        intent: ["trust-building", "sophistication"],
        tags: ["about", "elegant", "trustworthy"],
        title: "Our Refined Story",
        description: "Elegant about section with sophisticated storytelling and trust building.",
        category: "About"
    },
    {
        component_id: "about-playful-038",
        thumbnail_url: "/images/vibeImages/playful.webp",
        vibe: "Playful",
        tone: ["playful", "friendly", "human"],
        layout_structure: "friendly-about",
        intent: ["humanization", "friendliness"],
        tags: ["about", "playful", "human"],
        title: "Our Fun Journey",
        description: "Playful about section that humanizes the brand with friendly storytelling.",
        category: "About"
    },
    {
        component_id: "about-clean-039",
        thumbnail_url: "/images/vibeImages/clean.webp",
        vibe: "Clean",
        tone: ["clean", "clear", "honest"],
        layout_structure: "clear-about",
        intent: ["clarity", "honesty"],
        tags: ["about", "clean", "honest"],
        title: "Our Clear Vision",
        description: "Clean about section with clear vision and honest brand representation.",
        category: "About"
    },
    {
        component_id: "about-luxury-040",
        thumbnail_url: "/images/vibeImages/luxury.webp",
        vibe: "Luxury",
        tone: ["luxury", "premium", "exclusive"],
        layout_structure: "premium-about",
        intent: ["premium-positioning", "exclusivity"],
        tags: ["about", "luxury", "premium"],
        title: "Our Premium Legacy",
        description: "Luxury about section with premium legacy and exclusive brand positioning.",
        category: "About"
    }
];


export const categories = [
    "Hero", "Features", "Testimonials", "Pricing", "CTAs",
    "Nav", "Footer", "FAQ", "Blog", "About"
];

// Round messages for each category
export const roundMessages: Record<string, string> = {
    'Hero': 'Pick a hero that makes a bold first impression.',
    'Features': 'Show your best. Choose standout features.',
    'Testimonials': 'Select real voices that build trust.',
    'Pricing': 'Choose clear and honest pricing options.',
    'CTAs': 'Pick CTAs that drive users to act fast.',
    'Nav': 'Guide users with clean, simple navigation.',
    'Footer': 'Finish strong with a smart footer.',
    'FAQ': 'Pick an FAQ that clears common doubts.',
    'Blog': 'Choose a blog that draws readers in.',
    'About': 'Tell your story with a human touch.'
};

export const getComponentsByCategory = (category: string): ComponentPreview[] => {
    return mockSwiperData.filter(component => component.category === category);
};

export const getCurrentRoundComponents = (categoryIndex: number): ComponentPreview[] => {
    const category = categories[categoryIndex];
    return getComponentsByCategory(category);
};

export const getTotalRounds = (): number => {
    return categories.length;
};

export const getTotalCards = (): number => {
    return mockSwiperData.length;
};

