// Hero_20.types.ts

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

// === Color Types (Following Hero_19 pattern) ===
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
        section?: string;
        image?: string;
        newsletter?: string;
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

// === Core Props ===
export interface Hero_20Props {
    // Content
    title?: string;
    description?: string;

    // Newsletter fields
    newsletterPlaceholder?: string;
    newsletterButtonText?: string;
    newsletterMessage?: string;

    // Image
    image?: ImageAsset;

    // Customization
    animated?: boolean;
    className?: string;

    // Custom colors (following Hero_19 pattern)
    colors?: ColorOverrides;
}

// === Token Structure (Following Hero_19 pattern) ===
export interface Hero_20Tokens {
    // Layout Structure - Single column with centered content above image
    layout: {
        section: string;
        contentContainer: string;
        contentWrapper: string;
        imageContainer: string;
    };

    // Responsive Spacing - Optimized for centered content layout
    spacing: {
        sectionPadding: string;
        contentSpacing: string;
        buttonSpacing: string;
    };

    // Typography - Clean and centered
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

    // Newsletter System - Complete token-based newsletter styling
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

    // Effects & Animations - All tokens used in component
    effects: {
        transition: string;
        hover: string;
        button: string;
    };

    // Image Properties - All tokens used in component
    image: {
        classes: string;
        loading: string;
        element: string;
    };
}

// === Defaults (Following Hero_19 structure) ===
export interface Hero_20Defaults {
    title: string;
    description: string;
    newsletterPlaceholder: string;
    newsletterButtonText: string;
    newsletterMessage: string;
    image: {
        src: string;
        alt: string;
    };
    animated: boolean;
    className: string;

    // Default Colors for Newsletter Hero
    colors: {
        background: ColorValue;
        title: ColorValue;
        description: ColorValue;
        newsletter: NewsletterColorOverride;
    };
}

// === Props Schema ===
export type Hero_20PropsSchema = {
    [K in keyof Required<Hero_20Props>]: PropDefinition<Hero_20Props[K]>;
};

// === Meta ===
export interface Hero_20Meta extends MetaV1_1<Hero_20Defaults, Hero_20Tokens> {
    component_id: "Hero_20";
    category: "hero";
    intent: "capture-leads";
    layout_structure: "single_column_centered_content_above_image_with_newsletter";
    props: Hero_20PropsSchema;
    defaults: Hero_20Defaults;
    tokens: Hero_20Tokens;
    variants: Variant<Partial<Hero_20Props>, DeepPartial<Hero_20Tokens>>[];
}

// === Runtime Type Guards ===
export function isColorValue(obj: unknown): obj is ColorValue {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;
    return typeof o.light === "string" && typeof o.dark === "string";
}

export function isImageAsset(obj: unknown): obj is ImageAsset {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;
    return typeof o.src === "string";
}

export function isHero_20Props(obj: unknown): obj is Hero_20Props {
    if (!obj || typeof obj !== "object") return false;
    const o = obj as Record<string, unknown>;

    const titleOk = o.title === undefined || typeof o.title === "string";
    const descriptionOk = o.description === undefined || typeof o.description === "string";
    const newsletterPlaceholderOk = o.newsletterPlaceholder === undefined || typeof o.newsletterPlaceholder === "string";
    const newsletterButtonTextOk = o.newsletterButtonText === undefined || typeof o.newsletterButtonText === "string";
    const newsletterMessageOk = o.newsletterMessage === undefined || typeof o.newsletterMessage === "string";
    const imageOk = o.image === undefined || isImageAsset(o.image);
    const animatedOk = o.animated === undefined || typeof o.animated === "boolean";
    const classNameOk = o.className === undefined || typeof o.className === "string";
    const colorsOk = o.colors === undefined || (typeof o.colors === "object" && o.colors !== null);

    return Boolean(
        titleOk && descriptionOk && newsletterPlaceholderOk && 
        newsletterButtonTextOk && newsletterMessageOk && imageOk && 
        animatedOk && classNameOk && colorsOk
    );
}

// === Utility Types ===
export type Hero_20PropsKeys = keyof Hero_20Props;
export type Hero_20TokenKeys = keyof Hero_20Tokens;

export type Hero_20PropsPatch = Partial<Hero_20Props>;
export type Hero_20TokensPatch = DeepPartial<Hero_20Tokens>;

export interface ValidationResult<T = Hero_20Props> {
    valid: boolean;
    errors: string[];
    data?: T;
    warnings?: string[];
}

export type SanitizedHero_20Props = Required<Hero_20Props>;

export interface Hero_20BrandContext {
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

export interface Hero_20GenerationContext {
    props: Partial<Hero_20Props>;
    tokens: Partial<Hero_20Tokens>;
    brand: Hero_20BrandContext;
    layout?: "centered" | "left" | "right";
    variant?: string;
    customColors?: ColorOverrides;
}