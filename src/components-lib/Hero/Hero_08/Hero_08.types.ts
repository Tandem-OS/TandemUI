// Hero_08.types.ts

// === Base Schema Types ===
export interface MetaV1_1<P = Record<string, unknown>, T = Record<string, unknown>> {
    version: string;
    component_id: string;
    category: string;
    intent: string;
    layout_structure: string;
    tokens: T;
    props: Record<string, PropDefinition>; // Changed from Record<keyof P, PropDefinition>
    defaults: P;
    slots?: SlotDefinition[];
    variants?: Variant[];  // Simplified - no type params
    fluffyTags?: string[];
    layoutContract: LayoutContract;
    accessibility: AccessibilityConfig;
    performance: PerformanceConfig;
    generation: GenerationConfig;
    semanticProfile: SemanticProfile;
    figma: FigmaExportConfig;
    code: CodeTemplateConfig;
    development: DevelopmentConfig;
    tags?: string[];
}

// Slot definition type
export interface SlotDefinition {
    id: string;
    name: string;
    type: string;
    required?: boolean;
}

export type PropType = "text" | "richtext" | "url" | "image" | "select" | "boolean" | "number" | "object" | "color" | "video";

export interface PropDefinition<T = unknown> {
    type: PropType;
    label: string;
    required?: boolean;
    max?: number;
    min?: number;
    default?: T;
    options?: readonly string[];
    placeholder?: string;
    shape?: Record<string, PropDefinition>;
}

export interface RichText {
    html: string;
    text: string;
}

export interface ImageAsset {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
}

export interface VideoAsset {
    src: string;
    thumbnail?: string;
    duration?: number;
    width?: number;
    height?: number;
}

// === Color Types (Combined Newsletter + Video) ===
export interface ColorValue {
    light: string;
    dark: string;
}

export interface NewsletterColorOverride {
    input: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
        focusBorder: ColorValue;
        placeholder: ColorValue;
    };
    button: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
        hover: {
            background: ColorValue;
            text: ColorValue;
            border: ColorValue;
        };
    };
    message: ColorValue;
}

export interface VideoColorOverride {
    overlay: ColorValue;
    playButton: {
        background: ColorValue;
        backgroundHover: ColorValue;
        border: ColorValue;
        icon: ColorValue;
        iconHover: ColorValue;
    };
}

export interface ColorOverrides {
    background?: ColorValue;
    title?: ColorValue;
    description?: ColorValue;
    newsletter?: NewsletterColorOverride;
    video?: VideoColorOverride;
}

// === Deep Partial Helper ===
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface Variant<P = Record<string, unknown>, T = Record<string, unknown>> {
    id: string;
    label: string;
    propsPatch?: Partial<P>;
    tokensPatch?: DeepPartial<T>;
}

export interface LayoutContract {
    grid: string;
    maxWidth: string;
    sectionPaddingY: string;
    containerPaddingX: string;
    supportsBleed: boolean;
    topEdge?: string;
    bottomEdge?: string;
    breakpoints: {
        mobile: string;
        tablet: string;
        desktop: string;
    };
}

export interface AccessibilityConfig {
    landmarks: string[];
    ariaHints: string[];
    colorContrastMin: number;
    focusManagement: string;
    keyboardNavigation: boolean;
    screenReaderHints?: {
        video?: string;
        section?: string;
    };
}

export interface PerformanceConfig {
    lazyImages: boolean;
    bundleKbBudget: number;
    criticalCSS: boolean;
    preloadHints: string[];
}

export interface GenerationConfig {
    aiPromptHints: string[];
    contentConstraints: {
        title: ContentConstraint;
        description: ContentConstraint;
        ctaText: ContentConstraint;
        newsletterText: ContentConstraint;
        videoContent: ContentConstraint;
    };
    brandAdaptation: {
        industry: string;
        personality: string;
        positioning: string;
    };
}

export interface ContentConstraint {
    tone: string[];
    avoid?: string[];
    maxSentences: number;
    readingLevel?: string;
}

export interface SemanticProfile {
    primaryConcepts: string[];
    contentTypes: string[];
    embeddingWeights: {
        visual: number;
        copy: number;
        interaction: number;
    };
    contextualRelevance: string[];
}

export interface FigmaExportConfig {
    autoLayout: boolean;
    figmaComponentName: string;
    componentSets: {
        main: string;
        variants?: string;
    };
    textStyleRefs: Record<string, string>;
    colorStyleRefs?: Record<string, string>;
    effectStyleRefs: Record<string, string>;
    constraints: Record<string, string>;
    spacing: Record<string, string>;
    exportSettings: {
        format: string;
        scale: number;
        includeVariants: boolean;
    };
}

export interface CodeTemplateConfig {
    language: string;
    imports: string[];
    template: string;
}

export interface DevelopmentConfig {
    storybook: {
        title: string;
        category: string;
    };
    testing: {
        testIds: string[];
        accessibilityTests: boolean;
    };
    documentation: {
        designNotes: string;
        usageGuidelines: string;
    };
}

// === Core Props (Newsletter + Video Combined) ===
export interface Hero_08Props {
    // Content
    title?: string;
    description?: string;

    // Newsletter fields
    newsletterPlaceholder?: string;
    newsletterButtonText?: string;
    newsletterMessage?: string;

    // Video
    videoSrc?: string;
    videoThumbnail?: string;
    videoAutoPlay?: boolean;
    videoLoop?: boolean;

    // Customization
    animated?: boolean;
    className?: string;

    // Custom colors (enforced structure)
    colors?: ColorOverrides;
}

// === Token Structure - Newsletter + Video Combined (Video Left) ===
export interface Hero_08Tokens {
    // Layout Structure - Video Left, Newsletter+Content Right
    layout: {
        section: string;
        wrapper: string;
        grid: string;
        videoColumn: string; // Video on left side
        contentColumn: string; // Newsletter+Content on right side
        videoContainer: string;
        contentContainer: string;
    };

    // Responsive Spacing
    spacing: {
        containerX: string;
        containerY: string;
        contentSpacing: string;
    };

    // Typography
    typography: {
        heading: {
            desktop: string;
            mobile: string;
            weight: string;
            complete: string;
        };
        body: {
            desktop: string;
            mobile: string;
            leading: string;
            complete: string;
        };
    };

    // Newsletter System - Complete token structure
    newsletter: {
        container: string;
        form: string;
        inputGroup: string;
        inputWrapper: string;
        input: {
            classes: string;
            borderWidth: string;
            borderStyle: string;
        };
        button: {
            classes: string;
            borderWidth: string;
            borderStyle: string;
        };
        message: {
            classes: string;
        };
    };

    // Video System - Complete token structure
    video: {
        container: string;
        element: string;
        overlay: string;
        controls: string;
        playButton: {
            classes: string;
            iconContainer: string;
            icon: string;
            borderWidth: string;
            borderStyle: string;
        };
    };

    // Effects & Animations
    effects: {
        transition: string;
        hover: string;
        button: string;
    };

    // Additional tokens
    radius: string;
    animation: string;
    colorScheme: string;
    elevation: string;
}

// === Defaults (with strict types) ===
export interface Hero_08Defaults {
    title: string;
    description: string;
    newsletterPlaceholder: string;
    newsletterButtonText: string;
    newsletterMessage: string;
    videoSrc: string;
    videoThumbnail: string;
    videoAutoPlay: boolean;
    videoLoop: boolean;
    animated: boolean;
    className: string;
    colors: {
        background: ColorValue;
        title: ColorValue;
        description: ColorValue;
        newsletter: NewsletterColorOverride;
        video: VideoColorOverride;
    };
}

// === Props Schema ===
export type Hero_08PropsSchema = {
    [K in keyof Required<Hero_08Props>]: PropDefinition<Hero_08Props[K]>;
};

// === Meta ===
export interface Hero_08Meta extends MetaV1_1<Hero_08Defaults, Hero_08Tokens> {
    component_id: "Hero_08";
    category: "hero";
    intent: "capture-leads";
    layout_structure: "split-video-newsletter";
    props: Hero_08PropsSchema;
    defaults: Hero_08Defaults;
    tokens: Hero_08Tokens;
    variants: Variant<Partial<Hero_08Props>, DeepPartial<Hero_08Tokens>>[];
}

// === Runtime Type Guards (Enhanced) ===
export function isColorValue(obj: unknown): obj is ColorValue {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;
    return typeof o.light === "string" && typeof o.dark === "string";
}

export function isHero_08Props(obj: unknown): obj is Hero_08Props {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;

    // Enhanced validations
    const titleOk = o.title === undefined || typeof o.title === "string";
    const descriptionOk = o.description === undefined || typeof o.description === "string";
    
    // Newsletter field validation
    const newsletterPlaceholderOk = o.newsletterPlaceholder === undefined || typeof o.newsletterPlaceholder === "string";
    const newsletterButtonTextOk = o.newsletterButtonText === undefined || typeof o.newsletterButtonText === "string";
    const newsletterMessageOk = o.newsletterMessage === undefined || typeof o.newsletterMessage === "string";

    // Video validation
    const videoSrcOk = o.videoSrc === undefined || typeof o.videoSrc === "string";
    const videoThumbnailOk = o.videoThumbnail === undefined || typeof o.videoThumbnail === "string";
    const videoAutoPlayOk = o.videoAutoPlay === undefined || typeof o.videoAutoPlay === "boolean";
    const videoLoopOk = o.videoLoop === undefined || typeof o.videoLoop === "boolean";

    const animatedOk = o.animated === undefined || typeof o.animated === "boolean";
    const classNameOk = o.className === undefined || typeof o.className === "string";

    // Enhanced colors validation
    const colorsOk = o.colors === undefined || (
        typeof o.colors === "object" && o.colors !== null
    );

    return Boolean(
        titleOk && descriptionOk && newsletterPlaceholderOk &&
        newsletterButtonTextOk && newsletterMessageOk && 
        videoSrcOk && videoThumbnailOk && videoAutoPlayOk && videoLoopOk &&
        animatedOk && classNameOk && colorsOk
    );
}

// === Utility Types for Better DX ===
export type Hero_08PropsKeys = keyof Hero_08Props;
export type Hero_08TokenKeys = keyof Hero_08Tokens;

// For variant creation
export type Hero_08PropsPatch = Partial<Hero_08Props>;
export type Hero_08TokensPatch = DeepPartial<Hero_08Tokens>;

// For validation results
export interface ValidationResult<T = Hero_08Props> {
    valid: boolean;
    errors: string[];
    data?: T;
}

// For sanitized props
export type SanitizedHero_08Props = Required<Hero_08Props>;

// Brand context for AI generation
export interface Hero_08BrandContext {
    industry: string;
    personality: string;
    positioning: string;
    targetAudience?: string;
    colorPalette?: {
        primary: string;
        secondary: string;
        accent?: string;
    };
}

// Generation context (enhanced)
export interface Hero_08GenerationContext {
    props: Partial<Hero_08Props>;
    tokens: Partial<Hero_08Tokens>;
    brand: Hero_08BrandContext;
    layout?: "video-left-newsletter-right" | "newsletter-left-video-right" | "centered";
    variant?: string;
    customColors?: ColorOverrides;
}