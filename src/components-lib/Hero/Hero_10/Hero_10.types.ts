// Hero_10.types.ts
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

export interface ColorOverrides {
    overlay?: ColorValue;
    title?: ColorValue;
    description?: ColorValue;
    primaryButton?: ButtonColorOverride;
    secondaryButton?: ButtonColorOverride;
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
        image?: string;
        section?: string;
        overlay?: string;
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
export interface Hero_10Props {
    // Content
    title?: string;
    description?: string;

    // Actions
    primaryCTA?: CTAConfig;
    secondaryCTA?: CTAConfig;

    // Background Media
    backgroundImage?: ImageAsset | string;

    // Customization
    animated?: boolean;
    overlayOpacity?: number; // 0-100, deprecated - use colors.overlay
    className?: string;

    // Custom colors
    colors?: ColorOverrides;
}

// === Token Structure ===
export interface Hero_10Tokens {
    // Layout Structure - Responsive swap layout
    layout: {
        section: string;
        backgroundContainer: string;
        backgroundImage: string;
        overlay: string;
        contentContainer: string;
        grid: string;
        leftColumn: string; // Mobile: heading, Desktop: content
        rightColumn: string; // Mobile: content, Desktop: heading
        mobileHeadingWrapper: string;
        desktopContentWrapper: string;
        mobileContentWrapper: string;
        desktopHeadingWrapper: string;
    };

    // Responsive Spacing
    spacing: {
        sectionY: string;
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

    // Responsive Visibility
    visibility: {
        mobileOnly: string;
        desktopOnly: string;
    };

    // Effects & Animations
    effects: {
        transition: string;
        hover: string;
        button: string;
    };

    // Image Properties
    image: {
        classes: string;
        loading: string;
    };
}

// === Defaults ===
export interface Hero_10Defaults {
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
    backgroundImage: string;
    backgroundImageAlt: string;
    animated: boolean;
    overlayOpacity: number;
    className: string;
    colors: {
        overlay: ColorValue;
        title: ColorValue;
        description: ColorValue;
        primaryButton: ButtonColorOverride;
        secondaryButton: ButtonColorOverride;
    };
}

// === Props Schema ===
export type Hero_10PropsSchema = {
    [K in keyof Required<Hero_10Props>]: PropDefinition<Hero_10Props[K]>;
};

// === Meta ===
export interface Hero_10Meta extends MetaV1_1<Hero_10Defaults, Hero_10Tokens> {
    component_id: "Hero_10";
    category: "hero";
    intent: "convert";
    layout_structure: "background_responsive_swap";
    props: Hero_10PropsSchema;
    defaults: Hero_10Defaults;
    tokens: Hero_10Tokens;
    variants: Variant<Partial<Hero_10Props>, DeepPartial<Hero_10Tokens>>[];
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

export function isHero_10Props(obj: unknown): obj is Hero_10Props {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;

    const titleOk = o.title === undefined || typeof o.title === "string";
    const descriptionOk = o.description === undefined || typeof o.description === "string";
    const primaryCTAOk = o.primaryCTA === undefined || isCTAConfig(o.primaryCTA);
    const secondaryCTAOk = o.secondaryCTA === undefined || isCTAConfig(o.secondaryCTA);

    const backgroundImageOk = o.backgroundImage === undefined || typeof o.backgroundImage === "string" ||
        (typeof o.backgroundImage === "object" && o.backgroundImage !== null &&
            typeof (o.backgroundImage as ImageAsset).src === "string");

    const animatedOk = o.animated === undefined || typeof o.animated === "boolean";
    const overlayOpacityOk = o.overlayOpacity === undefined || typeof o.overlayOpacity === "number";
    const classNameOk = o.className === undefined || typeof o.className === "string";
    const colorsOk = o.colors === undefined || (typeof o.colors === "object" && o.colors !== null);

    return Boolean(
        titleOk && descriptionOk && primaryCTAOk && secondaryCTAOk &&
        backgroundImageOk && animatedOk && overlayOpacityOk && classNameOk && colorsOk
    );
}

// === Utility Types ===
export type Hero_10PropsKeys = keyof Hero_10Props;
export type Hero_10TokenKeys = keyof Hero_10Tokens;

export type Hero_10PropsPatch = Partial<Hero_10Props>;
export type Hero_10TokensPatch = DeepPartial<Hero_10Tokens>;

export interface ValidationResult<T = Hero_10Props> {
    valid: boolean;
    errors: string[];
    data?: T;
}

export type SanitizedHero_10Props = Required<Hero_10Props>;

export interface Hero_10BrandContext {
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

export interface Hero_10GenerationContext {
    props: Partial<Hero_10Props>;
    tokens: Partial<Hero_10Tokens>;
    brand: Hero_10BrandContext;
    layout?: "responsive_swap" | "centered";
    variant?: string;
    customColors?: ColorOverrides;
}