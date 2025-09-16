// Hero_05.types.ts
import { type ReactNode } from 'react';

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

// === Color Types (Tightened) ===
export interface ColorValue {
    light: string;
    dark: string;
}

export interface ButtonColorOverride {
    background: ColorValue;
    text: ColorValue;
    border: ColorValue;
    hover: {
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
    };
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
    primaryButton?: ButtonColorOverride;
    secondaryButton?: ButtonColorOverride;
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

// === Strict CTA Types ===
export type CTAVariant = "solid" | "outline";
export type CTASize = "sm" | "md" | "lg";

export interface CTAConfig {
    text?: string;
    href?: string;
    variant?: CTAVariant;
    size?: CTASize;
    icon?: ReactNode;
}

// === Core Props (Tightened) ===
export interface Hero_05Props {
    // Content
    title?: string;
    description?: string;

    // Actions (using strict types)
    primaryCTA?: CTAConfig;
    secondaryCTA?: CTAConfig;

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

// === Token Structure - Updated with Video Tokens ===
export interface Hero_05Tokens {
    // Layout Structure - Content Left, Video Right
    layout: {
        section: string;
        wrapper: string;
        grid: string;
        contentColumn: string;
        videoColumn: string;
        contentContainer: string;
        videoContainer: string;
    };

    // Responsive Spacing
    spacing: {
        containerX: string;
        containerY: string;
        contentSpacing: string;
        buttonSpacing: string;
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
        cta: string;
    };

    // Button System - Added for native button elements
    button: {
        base: string;
        sizes: {
            sm: string;
            md: string;
            lg: string;
        };
        iconSpacing: string;
        borderWidth: string;
        borderStyle: string;
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

    // Responsive Behavior
    responsive: {
        flexDirection: string;
        width: string;
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
export interface Hero_05Defaults {
    title: string;
    description: string;
    primaryCTA: {
        text: string;
        href: string;
        variant: CTAVariant;
        size: CTASize;
    };
    secondaryCTA: {
        text: string;
        href: string;
        variant: CTAVariant;
        size: CTASize;
    };
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
        primaryButton: ButtonColorOverride;
        secondaryButton: ButtonColorOverride;
        video: VideoColorOverride;
    };
}

// === Props Schema ===
export type Hero_05PropsSchema = {
    [K in keyof Required<Hero_05Props>]: PropDefinition<Hero_05Props[K]>;
};

// === Meta ===
export interface Hero_05Meta extends MetaV1_1<Hero_05Defaults, Hero_05Tokens> {
    component_id: "Hero_05";
    category: "hero";
    intent: "convert";
    layout_structure: "split-video";
    props: Hero_05PropsSchema;
    defaults: Hero_05Defaults;
    tokens: Hero_05Tokens;
    variants: Variant<Partial<Hero_05Props>, DeepPartial<Hero_05Tokens>>[];
}

// === Runtime Type Guards (Enhanced) ===
export function isColorValue(obj: unknown): obj is ColorValue {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;
    return typeof o.light === "string" && typeof o.dark === "string";
}

export function isCTAConfig(obj: unknown): obj is CTAConfig {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;

    const textOk = o.text === undefined || typeof o.text === "string";
    const hrefOk = o.href === undefined || typeof o.href === "string";
    const variantOk = o.variant === undefined || ["solid", "outline"].includes(o.variant as string);
    const sizeOk = o.size === undefined || ["sm", "md", "lg"].includes(o.size as string);

    return textOk && hrefOk && variantOk && sizeOk;
}

export function isHero_05Props(obj: unknown): obj is Hero_05Props {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;

    // Enhanced validations
    const titleOk = o.title === undefined || typeof o.title === "string";
    const descriptionOk = o.description === undefined || typeof o.description === "string";
    const primaryCTAOk = o.primaryCTA === undefined || isCTAConfig(o.primaryCTA);
    const secondaryCTAOk = o.secondaryCTA === undefined || isCTAConfig(o.secondaryCTA);

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
        titleOk && descriptionOk && primaryCTAOk &&
        secondaryCTAOk && videoSrcOk && videoThumbnailOk &&
        videoAutoPlayOk && videoLoopOk && animatedOk && classNameOk && colorsOk
    );
}

// === Utility Types for Better DX ===
export type Hero_05PropsKeys = keyof Hero_05Props;
export type Hero_05TokenKeys = keyof Hero_05Tokens;

// For variant creation
export type Hero_05PropsPatch = Partial<Hero_05Props>;
export type Hero_05TokensPatch = DeepPartial<Hero_05Tokens>;

// For validation results
export interface ValidationResult<T = Hero_05Props> {
    valid: boolean;
    errors: string[];
    data?: T;
}

// For sanitized props
export type SanitizedHero_05Props = Required<Hero_05Props>;

// Brand context for AI generation
export interface Hero_05BrandContext {
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
export interface Hero_05GenerationContext {
    props: Partial<Hero_05Props>;
    tokens: Partial<Hero_05Tokens>;
    brand: Hero_05BrandContext;
    layout?: "video-right" | "video-left" | "centered";
    variant?: string;
    customColors?: ColorOverrides;
}