// Hero_17.types.ts
import { type ReactNode } from 'react';

// === Base Schema Types ===
export interface MetaV1_1<P = Record<string, unknown>, T = Record<string, unknown>> {
    version: string;
    component_id: string;
    category: string;
    intent: string;
    layout_structure: string;
    tokens: T;
    props: Record<string, PropDefinition>;
    defaults: P;
    slots?: SlotDefinition[];
    variants?: Variant[];
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

export interface SlotDefinition {
    id: string;
    name: string;
    type: string;
    required?: boolean;
}

export type PropType = "text" | "richtext" | "url" | "image" | "select" | "boolean" | "number" | "object" | "color";

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

// === Color Types ===
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

export interface VideoPlayButtonColors {
    background: ColorValue;
    backgroundHover: ColorValue;
    border: ColorValue;
    icon: ColorValue;
    iconHover: ColorValue;
}

export interface ColorOverrides {
    overlay?: ColorValue;
    title?: ColorValue;
    description?: ColorValue;
    primaryButton?: ButtonColorOverride;
    secondaryButton?: ButtonColorOverride;
    videoPlayButton?: VideoPlayButtonColors;
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
        overlay?: string;
        playButton?: string;
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

// === Core Props ===
export interface Hero_17Props {
    // Content
    title?: string;
    description?: string;

    // Actions
    primaryCTA?: CTAConfig;
    secondaryCTA?: CTAConfig;

    // Video Media
    videoSrc?: string;
    videoThumbnail?: ImageAsset | string;

    // Video Settings
    videoAutoPlay?: boolean;
    videoLoop?: boolean;

    // Customization
    animated?: boolean;
    overlayOpacity?: number; // 0-100, deprecated - use colors.overlay
    className?: string;

    // Custom colors
    colors?: ColorOverrides;
}

// === Token Structure ===
export interface Hero_17Tokens {
    // Layout Structure - Heading & CTAs left center, paragraph right bottom
    layout: {
        section: string;
        backgroundContainer: string;
        backgroundVideo: string;
        overlay: string;
        videoPlayButton: string;
        contentContainer: string;
        grid: string;
        leftColumn: string;
        rightColumn: string;
        leftContent: string; // Heading & CTAs styling for left column
        rightContent: string; // Paragraph styling for right column
    };

    // Responsive Spacing
    spacing: {
        sectionY: string;
        leftPadding: string;
        rightPadding: string;
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
    };

    // Button System
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

    // Video Play Button System
    videoPlayButton: {
        base: string;
        sizes: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        variants: {
            default: string;
            basic: string;
        };
        icon: {
            base: string;
            play: string;
            pause: string;
        };
        animations: {
            hover: string;
            tap: string;
            container: string;
            iconContainer: string;
        };
    };

    // Effects & Animations
    effects: {
        transition: string;
        hover: string;
        button: string;
        videoTransition: string;
    };

    // Video Properties
    video: {
        classes: string;
        attributes: {
            muted: boolean;
            playsInline: boolean;
            loading: string;
        };
    };
}

// === Defaults ===
export interface Hero_17Defaults {
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
    overlayOpacity: number;
    className: string;
    colors: {
        overlay: ColorValue;
        title: ColorValue;
        description: ColorValue;
        primaryButton: ButtonColorOverride;
        secondaryButton: ButtonColorOverride;
        videoPlayButton: VideoPlayButtonColors;
    };
}

// === Props Schema ===
export type Hero_17PropsSchema = {
    [K in keyof Required<Hero_17Props>]: PropDefinition<Hero_17Props[K]>;
};

// === Meta ===
export interface Hero_17Meta extends MetaV1_1<Hero_17Defaults, Hero_17Tokens> {
    component_id: "Hero_17";
    category: "hero";
    intent: "engagement";
    layout_structure: "video_background_heading_cta_left_center_paragraph_right_bottom";
    props: Hero_17PropsSchema;
    defaults: Hero_17Defaults;
    tokens: Hero_17Tokens;
    variants: Variant<Partial<Hero_17Props>, DeepPartial<Hero_17Tokens>>[];
}

// === Runtime Type Guards ===
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

export function isHero_17Props(obj: unknown): obj is Hero_17Props {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;

    const titleOk = o.title === undefined || typeof o.title === "string";
    const descriptionOk = o.description === undefined || typeof o.description === "string";
    const primaryCTAOk = o.primaryCTA === undefined || isCTAConfig(o.primaryCTA);
    const secondaryCTAOk = o.secondaryCTA === undefined || isCTAConfig(o.secondaryCTA);

    const videoSrcOk = o.videoSrc === undefined || typeof o.videoSrc === "string";
    const videoThumbnailOk = o.videoThumbnail === undefined || typeof o.videoThumbnail === "string" ||
        (typeof o.videoThumbnail === "object" && o.videoThumbnail !== null &&
            typeof (o.videoThumbnail as ImageAsset).src === "string");

    const videoAutoPlayOk = o.videoAutoPlay === undefined || typeof o.videoAutoPlay === "boolean";
    const videoLoopOk = o.videoLoop === undefined || typeof o.videoLoop === "boolean";
    const animatedOk = o.animated === undefined || typeof o.animated === "boolean";
    const overlayOpacityOk = o.overlayOpacity === undefined || typeof o.overlayOpacity === "number";
    const classNameOk = o.className === undefined || typeof o.className === "string";
    const colorsOk = o.colors === undefined || (typeof o.colors === "object" && o.colors !== null);

    return Boolean(
        titleOk && descriptionOk && primaryCTAOk && secondaryCTAOk &&
        videoSrcOk && videoThumbnailOk && videoAutoPlayOk && videoLoopOk &&
        animatedOk && overlayOpacityOk && classNameOk && colorsOk
    );
}

// === Utility Types ===
export type Hero_17PropsKeys = keyof Hero_17Props;
export type Hero_17TokenKeys = keyof Hero_17Tokens;

export type Hero_17PropsPatch = Partial<Hero_17Props>;
export type Hero_17TokensPatch = DeepPartial<Hero_17Tokens>;

export interface ValidationResult<T = Hero_17Props> {
    valid: boolean;
    errors: string[];
    data?: T;
    warnings?: string[];
}

export type SanitizedHero_17Props = Required<Hero_17Props>;

export interface Hero_17BrandContext {
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

export interface Hero_17GenerationContext {
    props: Partial<Hero_17Props>;
    tokens: Partial<Hero_17Tokens>;
    brand: Hero_17BrandContext;
    layout?: "heading_cta_left_center_paragraph_right_bottom" | "centered";
    variant?: string;
    customColors?: ColorOverrides;
}