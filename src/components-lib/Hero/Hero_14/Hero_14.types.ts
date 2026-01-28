// Hero_14.types.ts
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
export interface Hero_14Props {
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
export interface Hero_14Tokens {
    // Layout Structure
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
        rightContent: string;
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
export interface Hero_14Defaults {
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
export type Hero_14PropsSchema = {
    [K in keyof Required<Hero_14Props>]: PropDefinition<Hero_14Props[K]>;
};

// === Meta ===
export interface Hero_14Meta extends MetaV1_1<Hero_14Defaults, Hero_14Tokens> {
    component_id: "Hero_14";
    category: "hero";
    intent: "convert";
    layout_structure: "video_background_two_column";
    props: Hero_14PropsSchema;
    defaults: Hero_14Defaults;
    tokens: Hero_14Tokens;
    variants: Variant<Partial<Hero_14Props>, DeepPartial<Hero_14Tokens>>[];
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

export function isHero_14Props(obj: unknown): obj is Hero_14Props {
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
export type Hero_14PropsKeys = keyof Hero_14Props;
export type Hero_14TokenKeys = keyof Hero_14Tokens;

export type Hero_14PropsPatch = Partial<Hero_14Props>;
export type Hero_14TokensPatch = DeepPartial<Hero_14Tokens>;

export interface ValidationResult<T = Hero_14Props> {
    valid: boolean;
    errors: string[];
    data?: T;
    warnings?: string[];
}

export type SanitizedHero_14Props = Required<Hero_14Props>;

export interface Hero_14BrandContext {
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

export interface Hero_14GenerationContext {
    props: Partial<Hero_14Props>;
    tokens: Partial<Hero_14Tokens>;
    brand: Hero_14BrandContext;
    layout?: "left_right" | "centered";
    variant?: string;
    customColors?: ColorOverrides;
}