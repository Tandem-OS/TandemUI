// Hero_03.types.ts

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

// === Color Types (Tightened) ===
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

export interface ColorOverrides {
    background?: ColorValue;
    title?: ColorValue;
    description?: ColorValue;
    newsletter?: NewsletterColorOverride;
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

// === Core Props (Tightened) ===
export interface Hero_03Props {
    // Content
    title?: string;
    description?: string;

    // Newsletter fields
    newsletterPlaceholder?: string;
    newsletterButtonText?: string;
    newsletterMessage?: string;

    // Media
    image?: ImageAsset | string;

    // Customization
    animated?: boolean;
    className?: string;

    // Custom colors (enforced structure)
    colors?: ColorOverrides;
}

// === Token Structure - Updated with Newsletter Tokens ===
export interface Hero_03Tokens {
    // Layout Structure
    layout: {
        section: string;
        wrapper: string;
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

// === Defaults (with strict types) ===
export interface Hero_03Defaults {
    title: string;
    description: string;
    newsletterPlaceholder: string;
    newsletterButtonText: string;
    newsletterMessage: string;
    image: string;
    imageAlt: string;
    animated: boolean;
    className: string;
    colors: {
        background: ColorValue;
        title: ColorValue;
        description: ColorValue;
        newsletter: NewsletterColorOverride;
    };
}

// === Props Schema ===
export type Hero_03PropsSchema = {
    [K in keyof Required<Hero_03Props>]: PropDefinition<Hero_03Props[K]>;
};

// === Meta ===
export interface Hero_03Meta extends MetaV1_1<Hero_03Defaults, Hero_03Tokens> {
    component_id: "Hero_03";
    category: "hero";
    intent: "capture-leads";
    layout_structure: "split-newsletter";
    props: Hero_03PropsSchema;
    defaults: Hero_03Defaults;
    tokens: Hero_03Tokens;
    variants: Variant<Partial<Hero_03Props>, DeepPartial<Hero_03Tokens>>[];
}

// === Runtime Type Guards (Enhanced) ===
export function isColorValue(obj: unknown): obj is ColorValue {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;
    return typeof o.light === "string" && typeof o.dark === "string";
}

export function isHero_03Props(obj: unknown): obj is Hero_03Props {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;

    // Enhanced validations
    const titleOk = o.title === undefined || typeof o.title === "string";
    const descriptionOk = o.description === undefined || typeof o.description === "string";
    const newsletterPlaceholderOk = o.newsletterPlaceholder === undefined || typeof o.newsletterPlaceholder === "string";
    const newsletterButtonTextOk = o.newsletterButtonText === undefined || typeof o.newsletterButtonText === "string";
    const newsletterMessageOk = o.newsletterMessage === undefined || typeof o.newsletterMessage === "string";

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
        titleOk && descriptionOk && newsletterPlaceholderOk &&
        newsletterButtonTextOk && newsletterMessageOk && imageOk && 
        animatedOk && classNameOk && colorsOk
    );
}

// === Utility Types for Better DX ===
export type Hero_03PropsKeys = keyof Hero_03Props;
export type Hero_03TokenKeys = keyof Hero_03Tokens;

// For variant creation
export type Hero_03PropsPatch = Partial<Hero_03Props>;
export type Hero_03TokensPatch = DeepPartial<Hero_03Tokens>;

// For validation results
export interface ValidationResult<T = Hero_03Props> {
    valid: boolean;
    errors: string[];
    data?: T;
}

// For sanitized props
export type SanitizedHero_03Props = Required<Hero_03Props>;

// Brand context for AI generation
export interface Hero_03BrandContext {
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
export interface Hero_03GenerationContext {
    props: Partial<Hero_03Props>;
    tokens: Partial<Hero_03Tokens>;
    brand: Hero_03BrandContext;
    layout?: "image-right" | "image-left" | "centered";
    variant?: string;
    customColors?: ColorOverrides;
}