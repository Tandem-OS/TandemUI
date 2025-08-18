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
    type: "text" | "richtext" | "url" | "image" | "select" | "boolean" | "number";
    label: string;
    required?: boolean;
    max?: number;
    min?: number;
    default?: T;
    options?: readonly string[];
    placeholder?: string;
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

// === Color Override Types ===
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

// === Token Structure (Simplified) ===
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
        x: string;
        y: string;
        internal: string;
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

    // Effects
    effects: {
        transition: string;
        hover: string;
    };

    // Image Properties
    image: {
        sizing: string;
        objectFit: string;
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
    image: string;
    animated: boolean;
    colors: {
        background: ColorValue;
        title: ColorValue;
        description: ColorValue;
        primaryButton: ButtonColorOverride;
        secondaryButton: ButtonColorOverride;
    };
}

// === Prop Schema ===
export type Hero_01PropsSchema = {
    [K in keyof Hero_01Props]: PropDefinition<Hero_01Props[K]>;
};

// === Meta ===
export interface Hero_01Meta extends MetaV1_1<Hero_01Defaults, Hero_01Tokens> {
    component_id: "hero.01";
    category: "hero";
    intent: "convert";
    layout_structure: "split";
    props: Hero_01PropsSchema;
    defaults: Hero_01Defaults;
    tokens: Hero_01Tokens;
    variants: Variant<Partial<Hero_01Props>, DeepPartial<Hero_01Tokens>>[];
}

// === Runtime Helpers ===
export function isHero_01Props(obj: unknown): obj is Hero_01Props {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;

    const titleOk = o.title === undefined || typeof o.title === "string";
    const descriptionOk = o.description === undefined || typeof o.description === "string";
    const primaryCTAOk = o.primaryCTA === undefined || typeof o.primaryCTA === "object";
    const secondaryCTAOk = o.secondaryCTA === undefined || typeof o.secondaryCTA === "object";
    const imageOk = o.image === undefined || typeof o.image === "string" ||
        (typeof o.image === "object" && o.image !== null && typeof (o.image as ImageAsset).src === "string");
    const animatedOk = o.animated === undefined || typeof o.animated === "boolean";
    const classNameOk = o.className === undefined || typeof o.className === "string";
    const colorsOk = o.colors === undefined || typeof o.colors === "object";

    return Boolean(
        titleOk && descriptionOk && primaryCTAOk &&
        secondaryCTAOk && imageOk && animatedOk && classNameOk && colorsOk
    );
}

// === Generation Context ===
export interface Hero_01BrandContext {
    industry: string;
    personality: string;
    positioning: string;
    targetAudience?: string;
}

export interface Hero_01GenerationContext {
    props: Partial<Hero_01Props>;
    tokens: Partial<Hero_01Tokens>;
    brand: Hero_01BrandContext;
    layout?: "image-right" | "image-left" | "centered";
}