// Hero_01.types.ts
import { type ReactNode } from 'react';

// === Base Schema Types ===
export interface MetaV1_1<P = any, T = any> {
    version: string;
    component_id: string;
    category: string;
    intent: string;
    layout_structure: string;
    tokens: T;
    props: any;
    defaults: P;
    slots?: any[];
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

export interface PropDefinition<T = any> {
    type: "text" | "richtext" | "url" | "image" | "select" | "boolean" | "number" | "object" | "color";
    label: string;
    required?: boolean;
    max?: number;
    min?: number;
    default?: T;
    options?: readonly string[];
    placeholder?: string;
    shape?: Record<string, PropDefinition>;  // This already exists, good!
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
    background?: ColorValue;
    title?: ColorValue;
    description?: ColorValue;
    primaryButton?: ButtonColorOverride;
    secondaryButton?: ButtonColorOverride;
}

// === Deep Partial Helper ===
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface Variant<P = any, T = any> {
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

// === Core Props ===
export interface Hero_01Props {
    // Content
    title?: string;
    description?: string;

    // Actions
    primaryCTA?: {
        text?: string;
        href?: string;
        variant?: "solid" | "outline";
        size?: "sm" | "md" | "lg";
        icon?: ReactNode;
    };

    secondaryCTA?: {
        text?: string;
        href?: string;
        variant?: "solid" | "outline";
        size?: "sm" | "md" | "lg";
        icon?: ReactNode;
    };

    // Media
    image?: ImageAsset | string;

    // Customization
    animated?: boolean;
    className?: string;

    // Custom colors (overrides defaults)
    colors?: ColorOverrides;
}

// === Token Structure ===
export interface Hero_01Tokens {
    // Layout Structure
    layout: {
        section: string;
        grid: string;
        contentColumn: string;
        imageColumn: string;
        contentContainer: string;
        imageContainer: string;
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

    // Image Properties
    image: {
        classes: string;
        loading: string;
    };

    // Additional tokens
    radius: string;
    animation: string;
    colorScheme: string;
    elevation: string;
}

// === Defaults ===
export interface Hero_01Defaults {
    title: string;
    description: string;
    primaryCTA: {
        text: string;
        href: string;
        variant: "solid" | "outline";
        size: "sm" | "md" | "lg";
    };
    secondaryCTA: {
        text: string;
        href: string;
        variant: "solid" | "outline";
        size: "sm" | "md" | "lg";
    };
    image: string;
    imageAlt: string;
    animated: boolean;
    colors: {
        background: ColorValue;
        title: ColorValue;
        description: ColorValue;
        primaryButton: ButtonColorOverride;
        secondaryButton: ButtonColorOverride;
    };
}

// === Props Schema ===
export type Hero_01PropsSchema = {
    [K in keyof Required<Hero_01Props>]: PropDefinition<Hero_01Props[K]>;
};

// === Meta ===
export interface Hero_01Meta extends MetaV1_1<Hero_01Defaults, Hero_01Tokens> {
    component_id: "hero.split-right-01";
    category: "hero";
    intent: "convert";
    layout_structure: "split";
    props: Hero_01PropsSchema;
    defaults: Hero_01Defaults;
    tokens: Hero_01Tokens;
    variants: Variant<Partial<Hero_01Props>, DeepPartial<Hero_01Tokens>>[];
}

// === Runtime Type Guard ===
export function isHero_01Props(obj: unknown): obj is Hero_01Props {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;

    // Enhanced validations
    const titleOk = o.title === undefined || typeof o.title === "string";
    const descriptionOk = o.description === undefined || typeof o.description === "string";

    // Enhanced CTA validation
    const primaryCTAOk = o.primaryCTA === undefined || (
        typeof o.primaryCTA === "object" && o.primaryCTA !== null &&
        (o.primaryCTA as any).text === undefined || typeof (o.primaryCTA as any).text === "string" &&
        (o.primaryCTA as any).href === undefined || typeof (o.primaryCTA as any).href === "string"
    );

    const secondaryCTAOk = o.secondaryCTA === undefined || (
        typeof o.secondaryCTA === "object" && o.secondaryCTA !== null &&
        (o.secondaryCTA as any).text === undefined || typeof (o.secondaryCTA as any).text === "string" &&
        (o.secondaryCTA as any).href === undefined || typeof (o.secondaryCTA as any).href === "string"
    );

    // Enhanced image validation
    const imageOk = o.image === undefined || typeof o.image === "string" ||
        (typeof o.image === "object" && o.image !== null &&
            typeof (o.image as ImageAsset).src === "string");

    const animatedOk = o.animated === undefined || typeof o.animated === "boolean";
    const classNameOk = o.className === undefined || typeof o.className === "string";

    // Enhanced colors validation
    const colorsOk = o.colors === undefined || (
        typeof o.colors === "object" && o.colors !== null
    );

    return Boolean(
        titleOk && descriptionOk && primaryCTAOk &&
        secondaryCTAOk && imageOk && animatedOk && classNameOk && colorsOk
    );
}

// === Utility Types for Better DX ===
export type Hero_01PropsKeys = keyof Hero_01Props;
export type Hero_01TokenKeys = keyof Hero_01Tokens;

// For variant creation
export type Hero_01PropsPatch = Partial<Hero_01Props>;
export type Hero_01TokensPatch = DeepPartial<Hero_01Tokens>;

// For validation results
export interface ValidationResult<T = any> {
    valid: boolean;
    errors: string[];
    data?: T;
}

// For sanitized props
export type SanitizedHero_01Props = Required<Hero_01Props>;

// Brand context for AI generation
export interface Hero_01BrandContext {
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
export interface Hero_01GenerationContext {
    props: Partial<Hero_01Props>;
    tokens: Partial<Hero_01Tokens>;
    brand: Hero_01BrandContext;
    layout?: "image-right" | "image-left" | "centered";
    variant?: string;
    customColors?: ColorOverrides;
}