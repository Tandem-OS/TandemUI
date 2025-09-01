// Hero_01.meta.ts
import { type Hero_01Meta } from './Hero_01.types';

const meta: Hero_01Meta = {
    version: "1.1",

    // === Identity ===
    component_id: "hero.split-right-01",
    category: "hero",
    intent: "convert",
    layout_structure: "split",

    // === Tokens ===
    tokens: {
        // Layout Structure - All tokens used in component
        layout: {
            section: "relative w-full lg:h-screen lg:overflow-hidden",
            grid: "grid grid-cols-1 lg:grid-cols-2 lg:h-screen",
            contentColumn: "flex flex-col justify-center order-1 lg:order-1 min-h-[50vh] lg:min-h-0",
            imageColumn: "relative h-96 lg:h-screen order-2 lg:order-2",
            contentContainer: "xl:max-w-lg",
            imageContainer: "w-full h-full"
        },

        // Responsive Spacing - All tokens used in component
        spacing: {
            containerX: "px-lg lg:px-2xl xl:px-5xl 2xl:px-6xl",
            containerY: "py-xl",
            contentSpacing: "space-y-md lg:space-y-lg",
            buttonSpacing: "gap-md"
        },

        // Typography - All tokens used in component
        typography: {
            heading: {
                desktop: "text-h1-md",
                mobile: "text-h2-sm",
                weight: "font-bold",
                complete: "text-h2-sm lg:text-h1-md font-bold break-words"
            },
            body: {
                desktop: "text-para-lg",
                mobile: "text-para-md",
                leading: "leading-relaxed",
                complete: "text-para-md lg:text-para-lg leading-relaxed break-words"
            },
            cta: "text-btn-lg"
        },

        // Button System - Complete token-based button styling
        button: {
            base: "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed leading-none text-center no-underline rounded-lg",
            sizes: {
                sm: "h-[2.25rem] px-sm text-btn-sm",
                md: "h-[2.75rem] px-sm text-btn-sm sm:px-md sm:text-btn-md",
                lg: "h-[3.25rem] px-md text-btn-md lg:px-lg lg:text-btn-lg"
            },
            iconSpacing: "ml-2 flex-shrink-0",
            borderWidth: "2px",
            borderStyle: "solid"
        },

        // Responsive Behavior - All tokens used in component
        responsive: {
            flexDirection: "flex flex-col md:flex-row",
            width: "w-full md:w-auto"
        },

        // Effects & Animations - All tokens used in component
        effects: {
            transition: "transition-all duration-200",
            hover: "hover:shadow-lg",
            button: "transition-colors duration-200"
        },

        // Image Properties - All tokens used in component
        image: {
            classes: "w-full h-full lg:h-screen object-cover object-bottom",
            loading: "lazy"
        },

        // Additional tokens
        radius: "rounded-2xl",
        animation: "subtle",
        colorScheme: "brand",
        elevation: "shadow-none"
    },

    // === Props Schema ===
    props: {
        title: {
            type: "text",
            label: "Hero Title",
            required: false,
            max: 60,
            placeholder: "Enter your main headline",
            default: "Medium length hero heading goes here"
        },
        description: {
            type: "text",
            label: "Description",
            required: false,
            max: 220,
            placeholder: "Supporting description text",
            default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
        },
        primaryCTA: {
            type: "object",
            label: "Primary Button",
            required: false,
            shape: {
                text: {
                    type: "text",
                    label: "Button Text",
                    max: 24,
                    default: "Get Started"
                },
                href: {
                    type: "url",
                    label: "Button Link",
                    default: "/signup"
                },
                variant: {
                    type: "select",
                    label: "Button Variant",
                    options: ["solid", "outline"],
                    default: "solid"
                },
                size: {
                    type: "select",
                    label: "Button Size",
                    options: ["sm", "md", "lg"],
                    default: "lg"
                },
                icon: {
                    type: "text",
                    label: "Icon (optional)",
                    required: false
                }
            },
            default: {
                text: "Get Started",
                href: "/signup",
                variant: "solid" as const,
                size: "lg" as const
            }
        },
        secondaryCTA: {
            type: "object",
            label: "Secondary Button",
            required: false,
            shape: {
                text: {
                    type: "text",
                    label: "Button Text",
                    max: 24,
                    default: "Learn More"
                },
                href: {
                    type: "url",
                    label: "Button Link",
                    default: "#learn-more"
                },
                variant: {
                    type: "select",
                    label: "Button Variant",
                    options: ["solid", "outline"],
                    default: "outline"
                },
                size: {
                    type: "select",
                    label: "Button Size",
                    options: ["sm", "md", "lg"],
                    default: "lg"
                },
                icon: {
                    type: "text",
                    label: "Icon (optional)",
                    required: false
                }
            },
            default: {
                text: "Learn More",
                href: "#learn-more",
                variant: "outline" as const,
                size: "lg" as const
            }
        },
        image: {
            type: "image",
            label: "Hero Image",
            required: false,
            default: "/images/component-lib-images/hero/placeholder-img.png"
        },
        animated: {
            type: "boolean",
            label: "Enable Animations",
            default: true
        },
        className: {
            type: "text",
            label: "Custom CSS Classes",
            required: false,
            default: ""
        },
        colors: {
            type: "object",
            label: "Custom Colors",
            required: false,
            shape: {
                background: {
                    type: "object",
                    label: "Background Color",
                    shape: {
                        light: {
                            type: "color",
                            label: "Light Mode",
                            default: "#ffffff"
                        },
                        dark: {
                            type: "color",
                            label: "Dark Mode",
                            default: "#0f172a"
                        }
                    }
                },
                title: {
                    type: "object",
                    label: "Title Color",
                    shape: {
                        light: {
                            type: "color",
                            label: "Light Mode",
                            default: "#111827"
                        },
                        dark: {
                            type: "color",
                            label: "Dark Mode",
                            default: "#f9fafb"
                        }
                    }
                },
                description: {
                    type: "object",
                    label: "Description Color",
                    shape: {
                        light: {
                            type: "color",
                            label: "Light Mode",
                            default: "#4b5563"
                        },
                        dark: {
                            type: "color",
                            label: "Dark Mode",
                            default: "#d1d5db"
                        }
                    }
                },
                primaryButton: {
                    type: "object",
                    label: "Primary Button Colors",
                    shape: {
                        background: {
                            type: "object",
                            label: "Background",
                            shape: {
                                light: { type: "color", label: "Light", default: "#4f46e5" },
                                dark: { type: "color", label: "Dark", default: "#6366f1" }
                            }
                        },
                        text: {
                            type: "object",
                            label: "Text",
                            shape: {
                                light: { type: "color", label: "Light", default: "#ffffff" },
                                dark: { type: "color", label: "Dark", default: "#ffffff" }
                            }
                        },
                        border: {
                            type: "object",
                            label: "Border",
                            shape: {
                                light: { type: "color", label: "Light", default: "#4f46e5" },
                                dark: { type: "color", label: "Dark", default: "#6366f1" }
                            }
                        },
                        hover: {
                            type: "object",
                            label: "Hover State",
                            shape: {
                                background: {
                                    type: "object",
                                    label: "Background",
                                    shape: {
                                        light: { type: "color", label: "Light", default: "#3730a3" },
                                        dark: { type: "color", label: "Dark", default: "#4f46e5" }
                                    }
                                },
                                text: {
                                    type: "object",
                                    label: "Text",
                                    shape: {
                                        light: { type: "color", label: "Light", default: "#ffffff" },
                                        dark: { type: "color", label: "Dark", default: "#ffffff" }
                                    }
                                },
                                border: {
                                    type: "object",
                                    label: "Border",
                                    shape: {
                                        light: { type: "color", label: "Light", default: "#3730a3" },
                                        dark: { type: "color", label: "Dark", default: "#4f46e5" }
                                    }
                                }
                            }
                        }
                    }
                },
                secondaryButton: {
                    type: "object",
                    label: "Secondary Button Colors",
                    shape: {
                        background: {
                            type: "object",
                            label: "Background",
                            shape: {
                                light: { type: "color", label: "Light", default: "transparent" },
                                dark: { type: "color", label: "Dark", default: "transparent" }
                            }
                        },
                        text: {
                            type: "object",
                            label: "Text",
                            shape: {
                                light: { type: "color", label: "Light", default: "#4f46e5" },
                                dark: { type: "color", label: "Dark", default: "#6366f1" }
                            }
                        },
                        border: {
                            type: "object",
                            label: "Border",
                            shape: {
                                light: { type: "color", label: "Light", default: "#4f46e5" },
                                dark: { type: "color", label: "Dark", default: "#6366f1" }
                            }
                        },
                        hover: {
                            type: "object",
                            label: "Hover State",
                            shape: {
                                background: {
                                    type: "object",
                                    label: "Background",
                                    shape: {
                                        light: { type: "color", label: "Light", default: "#4f46e5" },
                                        dark: { type: "color", label: "Dark", default: "#6366f1" }
                                    }
                                },
                                text: {
                                    type: "object",
                                    label: "Text",
                                    shape: {
                                        light: { type: "color", label: "Light", default: "#ffffff" },
                                        dark: { type: "color", label: "Dark", default: "#ffffff" }
                                    }
                                },
                                border: {
                                    type: "object",
                                    label: "Border",
                                    shape: {
                                        light: { type: "color", label: "Light", default: "#4f46e5" },
                                        dark: { type: "color", label: "Dark", default: "#6366f1" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    // === Defaults ===
    defaults: {
        title: "Medium length hero heading goes here",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        primaryCTA: {
            text: "Get Started",
            href: "/signup",
            variant: "solid",
            size: "lg"
        },
        secondaryCTA: {
            text: "Learn More",
            href: "#learn-more",
            variant: "outline",
            size: "lg"
        },
        image: "/images/component-lib-images/hero/placeholder-img.png",
        imageAlt: "",
        animated: true,
        className: "",

        // Default Colors for AI Customization
        colors: {
            background: {
                light: '#ffffff',
                dark: '#0f172a'
            },
            title: {
                light: '#111827',
                dark: '#f9fafb'
            },
            description: {
                light: '#4b5563',
                dark: '#d1d5db'
            },
            primaryButton: {
                background: { light: '#4f46e5', dark: '#6366f1' },
                text: { light: '#ffffff', dark: '#ffffff' },
                border: { light: '#4f46e5', dark: '#6366f1' },
                hover: {
                    background: { light: '#3730a3', dark: '#4f46e5' },
                    text: { light: '#ffffff', dark: '#ffffff' },
                    border: { light: '#3730a3', dark: '#4f46e5' }
                }
            },
            secondaryButton: {
                background: { light: 'transparent', dark: 'transparent' },
                text: { light: '#4f46e5', dark: '#6366f1' },
                border: { light: '#4f46e5', dark: '#6366f1' },
                hover: {
                    background: { light: '#4f46e5', dark: '#6366f1' },
                    text: { light: '#ffffff', dark: '#ffffff' },
                    border: { light: '#4f46e5', dark: '#6366f1' }
                }
            }
        }
    },

    // === Variants ===
    variants: [
        {
            id: "compact",
            label: "Compact",
            tokensPatch: {
                spacing: {
                    containerY: "py-lg",
                    contentSpacing: "space-y-sm lg:space-y-md",
                    buttonSpacing: "gap-sm"
                }
            }
        },
        {
            id: "no-animation",
            label: "No Animation",
            propsPatch: {
                animated: false
            }
        }
    ],

    // === Slots ===
    slots: [],

    // === Tags ===
    tags: [
        "placement:above-fold",
        "style:modern",
        "purpose:conversion",
        "complexity:simple",
        "industry:saas",
        "responsive:yes"
    ],

    // === FluffyTags ===
    fluffyTags: [
        "vibe:minimal",
        "mood:confident",
        "industry:saas",
        "tempo:instant",
        "conversion:primary",
        "placement:above-fold",
        "complexity:simple"
    ],

    // === Layout Contract ===
    layoutContract: {
        grid: "2-col",
        maxWidth: "full",
        sectionPaddingY: "py-xl",
        containerPaddingX: "px-lg",
        supportsBleed: false,
        topEdge: "none",
        bottomEdge: "none",
        breakpoints: {
            mobile: "single-col",
            tablet: "split",
            desktop: "split"
        }
    },

    // === Accessibility ===
    accessibility: {
        landmarks: ["banner"],
        ariaHints: ["h1 first", "CTA prominently placed"],
        colorContrastMin: 4.5,
        focusManagement: "linear",
        keyboardNavigation: true,
        screenReaderHints: {
            image: "decorative",
            section: "Main hero content"
        }
    },

    // === Performance Config ===
    performance: {
        lazyImages: true,
        bundleKbBudget: 18,
        criticalCSS: true,
        preloadHints: ["image"]
    },

    // === Generation ===
    generation: {
        aiPromptHints: [
            "Primary conversion component",
            "Above-the-fold placement",
            "Clear value proposition required",
            "Mobile-first responsive design"
        ],
        contentConstraints: {
            title: {
                tone: ["confident", "clear", "action-oriented"],
                avoid: ["jargon", "passive voice"],
                maxSentences: 1
            },
            description: {
                tone: ["supportive", "benefit-focused"],
                avoid: ["technical", "vague"],
                maxSentences: 2,
                readingLevel: "8th-grade"
            },
            ctaText: {
                tone: ["urgent", "action-oriented"],
                avoid: ["generic", "passive"],
                maxSentences: 1
            }
        },
        brandAdaptation: {
            industry: "{{BRAND_INDUSTRY}}",
            personality: "{{BRAND_VOICE}}",
            positioning: "{{BRAND_POSITIONING}}"
        }
    },

    // === Semantic Profile ===
    semanticProfile: {
        primaryConcepts: ["conversion", "introduction", "value-proposition", "trust-building"],
        contentTypes: ["hero-messaging", "cta-copy", "brand-positioning"],
        embeddingWeights: { visual: 0.3, copy: 0.5, interaction: 0.2 },
        contextualRelevance: ["landing-page-entry", "product-introduction", "conversion-funnel-top"]
    },

    // === Figma Export ===
    figma: {
        autoLayout: true,
        figmaComponentName: "Hero/01 - Split Image Right",
        componentSets: {
            main: "Hero Components",
            variants: "Hero Variants"
        },
        textStyleRefs: {
            title: "typography/h1-md",
            description: "typography/para-lg",
            ctaText: "typography/btn-lg"
        },
        colorStyleRefs: {
            background: "color/background/primary",
            title: "color/text/primary",
            description: "color/text/secondary"
        },
        effectStyleRefs: {
            radius: "radius/2xl",
            shadow: "shadow/none"
        },
        constraints: {
            image: "SCALE",
            content: "LEFT_RIGHT",
            section: "LEFT_RIGHT"
        },
        spacing: {
            internal: "space-md",
            section: "space-xl"
        },
        exportSettings: {
            format: "SVG",
            scale: 2,
            includeVariants: true
        }
    },

    // === Code Template ===
    code: {
        language: "tsx",
        imports: [
            "import React, { useMemo, useEffect } from 'react';",
            "import { motion, type Variants } from 'framer-motion';",
            "import { useTheme } from '../../../contexts/ThemeContext';",
            "import { fadeInUp, fadeIn } from '../../../lib/animations/variants';",
            "import { type Hero_01Props, type ColorOverrides } from './Hero_01.types';",
            "import { validateHero01Props, sanitizeProps, formatValidationMessage } from './Hero_01.validators';",
            "import meta from './Hero_01.meta';"
        ],
        template: `const Hero_01: React.FC<Hero_01Props> = (props = {}) => {
    const { theme } = useTheme();
    const validation = validateHero01Props(props);
    const sanitized = sanitizeProps(props);
    
    const title = sanitized.title || meta.defaults.title;
    const description = sanitized.description || meta.defaults.description;
    const animated = sanitized.animated !== undefined ? sanitized.animated : meta.defaults.animated;
    
    const styles = useComponentStyles(sanitized.colors, theme);
    
    return (
        <section
            className={\`\${meta.tokens.layout.section} \${sanitized.className || ''}\`}
            style={styles.background}
            role="banner"
            aria-label="Main hero content"
        >
            <div className={meta.tokens.layout.grid}>
                <div className={\`\${meta.tokens.layout.contentColumn} \${meta.tokens.spacing.containerX} \${meta.tokens.spacing.containerY}\`}>
                    <div className={\`\${meta.tokens.layout.contentContainer} \${meta.tokens.spacing.contentSpacing}\`}>
                        <h1
                            className={meta.tokens.typography.heading.complete}
                            style={styles.title}
                            aria-label={\`Hero title: \${title}\`}
                        >
                            {title}
                        </h1>
                        <p
                            className={meta.tokens.typography.body.complete}
                            style={styles.description}
                        >
                            {description}
                        </p>
                        <div className={\`\${meta.tokens.responsive.flexDirection} \${meta.tokens.spacing.buttonSpacing}\`}>
                            {/* Native Button/Anchor Elements with Token Classes */}
                        </div>
                    </div>
                </div>
                <div className={meta.tokens.layout.imageColumn}>
                    <img
                        src={sanitized.image || meta.defaults.image}
                        alt=""
                        className={meta.tokens.image.classes}
                        loading="lazy"
                        role="presentation"
                    />
                </div>
            </div>
        </section>
    );
};`
    },

    // === Development Config ===
    development: {
        storybook: {
            title: "Components/Hero/Hero_01",
            category: "Layout"
        },
        testing: {
            testIds: ["hero-section", "hero-title", "hero-description", "hero-buttons", "hero-image-container", "hero-image"],
            accessibilityTests: true
        },
        documentation: {
            designNotes: "Primary conversion component for landing pages with split layout. All styles are tokenized using native HTML elements. Fully independent with no component dependencies.",
            usageGuidelines: "Use native h1, p, button/a elements with complete token classes. Colors are fully customizable via props. Animations can be disabled for accessibility. No external component dependencies."
        }
    }
};

export default meta;