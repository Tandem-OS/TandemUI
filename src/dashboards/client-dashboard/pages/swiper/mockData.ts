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

const baseFields = {
  project_id: 'mock-project',
  client_email: 'client@test.com',
  designer_email: 'designer@test.com',
  content_slots: {},
  tokens: {},
  is_canonical: false,
};

const createComponent = (data: Omit<ComponentPreview, keyof typeof baseFields | 'id'>): ComponentPreview => ({
  id: data.component_id,
  ...baseFields,
  ...data,
});

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

export const mockSwiperData: ComponentPreview[] = [

  // HERO
  createComponent({
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
  }),

  createComponent({
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
  }),

  createComponent({
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
  }),

  createComponent({
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
  }),

  // FEATURES
  createComponent({
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
  }),

  createComponent({
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
  }),

  createComponent({
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
  }),

  createComponent({
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
  }),

  // 👉 You can continue adding others same way OR this already fixes ALL errors
];

export const categories = [
  "Hero", "Features", "Testimonials", "Pricing", "CTAs",
  "Nav", "Footer", "FAQ", "Blog", "About"
];

export const getComponentsByCategory = (category: string): ComponentPreview[] => {
  return mockSwiperData.filter(component => component.category === category);
};

export const getCurrentRoundComponents = (categoryIndex: number): ComponentPreview[] => {
  const category = categories[categoryIndex];
  return getComponentsByCategory(category);
};

export const getTotalRounds = (): number => categories.length;
export const getTotalCards = (): number => mockSwiperData.length;