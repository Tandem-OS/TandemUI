// Hero_22.types.ts

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
export interface Hero_22Props {
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

    // Custom colors
    colors?: ColorOverrides;
}

// === Token Structure ===
export interface Hero_22Tokens {
    // Layout Structure - Left-aligned content above full-width image
    layout: {
        section: string;
        contentContainer: string;
        contentWrapper: string;
        imageContainer: string;
    };

    // Responsive Spacing
    spacing: {
        sectionPadding: string;
        contentSpacing: string;
        newsletterSpacing: string;
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

    // Newsletter System
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

    // Image System
    image: {
        container: string;
        element: string;
        loading: string;
    };

    // Effects & Animations
    effects: {
        transition: string;
        hover: string;
        button: string;
    };
}

// === Defaults ===
export interface Hero_22Defaults {
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
    colors: {
        background: ColorValue;
        title: ColorValue;
        description: ColorValue;
        newsletter: NewsletterColorOverride;
    };
}

// === Props Schema ===
export type Hero_22PropsSchema = {
    [K in keyof Required<Hero_22Props>]: PropDefinition<Hero_22Props[K]>;
};

// === Meta ===
export interface Hero_22Meta extends MetaV1_1<Hero_22Defaults, Hero_22Tokens> {
    component_id: "Hero_22";
    category: "hero";
    intent: "capture-leads";
    layout_structure: "left_aligned_content_above_image_with_newsletter";
    props: Hero_22PropsSchema;
    defaults: Hero_22Defaults;
    tokens: Hero_22Tokens;
    variants: Variant<Partial<Hero_22Props>, DeepPartial<Hero_22Tokens>>[];
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

export function isHero_22Props(obj: unknown): obj is Hero_22Props {
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
        titleOk && descriptionOk && newsletterPlaceholderOk && newsletterButtonTextOk &&
        newsletterMessageOk && imageOk && animatedOk && classNameOk && colorsOk
    );
}

// === Utility Types ===
export type Hero_22PropsKeys = keyof Hero_22Props;
export type Hero_22TokenKeys = keyof Hero_22Tokens;

export type Hero_22PropsPatch = Partial<Hero_22Props>;
export type Hero_22TokensPatch = DeepPartial<Hero_22Tokens>;

export interface ValidationResult<T = Hero_22Props> {
    valid: boolean;
    errors: string[];
    data?: T;
    warnings?: string[];
}

export type SanitizedHero_22Props = Required<Hero_22Props>;

export interface Hero_22BrandContext {
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

export interface Hero_22GenerationContext {
    props: Partial<Hero_22Props>;
    tokens: Partial<Hero_22Tokens>;
    brand: Hero_22BrandContext;
    layout?: "left" | "center" | "right";
    variant?: string;
    customColors?: ColorOverrides;
}