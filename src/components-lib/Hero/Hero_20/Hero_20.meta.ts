// Hero_20.meta.ts
import { type Hero_20Meta } from './Hero_20.types';

const meta: Hero_20Meta = {
    version: "1.1",

    // === Identity ===
    component_id: "Hero_20",
    category: "hero",
    intent: "capture-leads",
    layout_structure: "single_column_centered_content_above_image_with_newsletter",

    // === Tokens ===
    tokens: {
        // Layout Structure - Single column with centered content above image
        layout: {
            section: "w-full",
            contentContainer: "container mx-auto",
            contentWrapper: "max-w-2xl mx-auto text-center",
            imageContainer: "w-full"
        },

        // Responsive Spacing - Optimized for centered content layout
        spacing: {
            sectionPadding: "px-lg py-2xl lg:py-4xl",
            contentSpacing: "space-y-md lg:space-y-lg",
            buttonSpacing: "flex items-center justify-center gap-md pt-sm"
        },

        // Typography - Clean and centered
        typography: {
            heading: {
                desktop: "text-h1-md",
                mobile: "text-h2-sm lg:text-h1-md",
                weight: "font-bold",
                complete: "text-h2-sm lg:text-h1-md font-bold break-words"
            },
            body: {
                desktop: "text-para-lg",
                mobile: "text-para-md lg:text-para-lg",
                leading: "leading-relaxed",
                complete: "text-para-md lg:text-para-lg leading-relaxed break-words"
            }
        },

        // Newsletter System - Complete token-based newsletter styling
        newsletter: {
            container: "max-w-xl",
            form: "space-y-md",
            inputGroup: "flex flex-col sm:flex-row gap-sm",
            inputWrapper: "flex-1",
            input: {
                classes: "w-full min-h-[2.75rem] px-md py-sm rounded-lg font-medium placeholder:font-normal focus:outline-none transition-colors duration-200",
                borderWidth: "1px",
                borderStyle: "solid"
            },
            button: {
                classes: "w-full sm:w-auto min-h-[2.75rem] px-lg py-sm rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed leading-none text-center no-underline",
                borderWidth: "2px",
                borderStyle: "solid"
            },
            message: {
                classes: "text-para-xs"
            }
        },

        // Effects & Animations
        effects: {
            transition: "transition-all duration-200",
            hover: "hover:shadow-lg",
            button: "transition-all duration-200"
        },

        // Image System
        image: {
            element: "w-full h-auto object-cover",
            classes: "w-full h-auto object-cover",
            loading: "lazy"
        }
    },

    // === Props Schema ===
    props: {
        title: {
            type: "text",
            label: "Hero Title",
            required: false,
            max: 80,
            placeholder: "Enter your headline",
            default: "Medium length hero heading goes here"
        },
        description: {
            type: "text",
            label: "Description",
            required: false,
            max: 300,
            placeholder: "Supporting description text",
            default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
        },
        newsletterPlaceholder: {
            type: "text",
            label: "Newsletter Placeholder",
            required: false,
            max: 50,
            placeholder: "Email placeholder text",
            default: "Enter your email"
        },
        newsletterButtonText: {
            type: "text",
            label: "Newsletter Button Text",
            required: false,
            max: 24,
            placeholder: "Button text",
            default: "Sign up"
        },
        newsletterMessage: {
            type: "text",
            label: "Newsletter Message",
            required: false,
            max: 150,
            placeholder: "Disclaimer or terms message",
            default: "By clicking Sign Up you're confirming that you agree with our Terms and Conditions."
        },
        image: {
            type: "image",
            label: "Hero Image",
            required: false,
            default: {
                src: "/images/component-lib-images/hero/placeholder-hero-img.png",
                alt: "Hero section image"
            }
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
                newsletter: {
                    type: "object",
                    label: "Newsletter Colors",
                    shape: {
                        input: {
                            type: "object",
                            label: "Input Styling",
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
                                        light: { type: "color", label: "Light", default: "#111827" },
                                        dark: { type: "color", label: "Dark", default: "#f9fafb" }
                                    }
                                },
                                border: {
                                    type: "object",
                                    label: "Border",
                                    shape: {
                                        light: { type: "color", label: "Light", default: "#d1d5db" },
                                        dark: { type: "color", label: "Dark", default: "#374151" }
                                    }
                                },
                                focusBorder: {
                                    type: "object",
                                    label: "Focus Border",
                                    shape: {
                                        light: { type: "color", label: "Light", default: "#3b82f6" },
                                        dark: { type: "color", label: "Dark", default: "#4f46e5" }
                                    }
                                },
                                placeholder: {
                                    type: "object",
                                    label: "Placeholder",
                                    shape: {
                                        light: { type: "color", label: "Light", default: "#6b7280" },
                                        dark: { type: "color", label: "Dark", default: "#9ca3af" }
                                    }
                                }
                            }
                        },
                        button: {
                            type: "object",
                            label: "Button Styling",
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
                        message: {
                            type: "object",
                            label: "Message Color",
                            shape: {
                                light: { type: "color", label: "Light", default: "#6b7280" },
                                dark: { type: "color", label: "Dark", default: "#9ca3af" }
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
        newsletterPlaceholder: "Enter your email",
        newsletterButtonText: "Sign up",
        newsletterMessage: "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
        image: {
            src: "/images/component-lib-images/hero/placeholder-hero-img.png",
            alt: "Hero section image"
        },
        animated: true,
        className: "",

        // Default Colors for Centered Content Hero with Newsletter
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
            newsletter: {
                input: {
                    background: { light: 'transparent', dark: 'transparent' },
                    text: { light: '#111827', dark: '#f9fafb' },
                    border: { light: '#d1d5db', dark: '#374151' },
                    focusBorder: { light: '#3b82f6', dark: '#4f46e5' },
                    placeholder: { light: '#6b7280', dark: '#9ca3af' }
                },
                button: {
                    background: { light: '#4f46e5', dark: '#6366f1' },
                    text: { light: '#ffffff', dark: '#ffffff' },
                    border: { light: '#4f46e5', dark: '#6366f1' },
                    hover: {
                        background: { light: '#3730a3', dark: '#4f46e5' },
                        text: { light: '#ffffff', dark: '#ffffff' },
                        border: { light: '#3730a3', dark: '#4f46e5' }
                    }
                },
                message: { light: '#6b7280', dark: '#9ca3af' }
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
                    sectionPadding: "px-lg py-xl lg:py-2xl",
                    contentSpacing: "space-y-sm lg:space-y-md"
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
        "style:clean",
        "purpose:lead-capture",
        "complexity:simple",
        "industry:saas",
        "responsive:yes",
        "layout:centered",
        "form:newsletter"
    ],

    // === FluffyTags ===
    fluffyTags: [
        "vibe:clean",
        "mood:minimal",
        "industry:saas",
        "tempo:calm",
        "engagement:lead-capture",
        "placement:above-fold",
        "complexity:simple",
        "layout:centered"
    ],

    // === Layout Contract ===
    layoutContract: {
        grid: "single-col-centered-content-above-image-newsletter",
        maxWidth: "container",
        sectionPaddingY: "py-2xl",
        containerPaddingX: "px-lg",
        supportsBleed: false,
        topEdge: "clean",
        bottomEdge: "clean",
        breakpoints: {
            mobile: "stacked",
            tablet: "centered",
            desktop: "centered"
        }
    },

    // === Accessibility ===
    accessibility: {
        landmarks: ["banner", "complementary"],
        ariaHints: ["h1 centered above image", "newsletter form accessible", "descriptive alt text required"],
        colorContrastMin: 4.5,
        focusManagement: "linear",
        keyboardNavigation: true,
        screenReaderHints: {
            section: "Main hero content with centered text and newsletter signup above full-width image",
            image: "decorative hero image below content",
            newsletter: "newsletter signup form"
        }
    },

    // === Performance Config ===
    performance: {
        lazyImages: true,
        bundleKbBudget: 18,
        criticalCSS: true,
        preloadHints: ["hero-image"]
    },

    // === Generation ===
    generation: {
        aiPromptHints: [
            "Clean and minimal hero component with centered content and newsletter signup",
            "Above-the-fold placement with clear value proposition",
            "Professional presentation suitable for SaaS/lead capture",
            "Image should complement and not compete with the content"
        ],
        contentConstraints: {
            title: {
                tone: ["clean", "professional", "direct"],
                avoid: ["overly casual", "buzzwords"],
                maxSentences: 1
            },
            description: {
                tone: ["informative", "clear", "supportive"],
                avoid: ["technical jargon", "too lengthy"],
                maxSentences: 3,
                readingLevel: "8th-grade"
            },
            newsletterText: {
                tone: ["friendly", "action-oriented"],
                avoid: ["pushy", "aggressive"],
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
        primaryConcepts: ["lead-capture", "newsletter-signup", "clean-presentation", "centered-content"],
        contentTypes: ["hero-messaging", "newsletter-copy", "lead-generation"],
        embeddingWeights: { visual: 0.3, copy: 0.4, interaction: 0.3 },
        contextualRelevance: ["landing-page", "lead-generation", "newsletter-signup", "conversion-funnel-top"]
    },

    // === Figma Export ===
    figma: {
        autoLayout: true,
        figmaComponentName: "Hero/20 - Centered Content Above Image with Newsletter",
        componentSets: {
            main: "Hero Components",
            variants: "Newsletter Heroes"
        },
        textStyleRefs: {
            title: "typography/h1-md",
            description: "typography/para-lg",
            newsletterInput: "typography/para-md",
            newsletterButton: "typography/btn-md"
        },
        colorStyleRefs: {
            background: "color/background/primary",
            title: "color/text/primary",
            description: "color/text/secondary"
        },
        effectStyleRefs: {
            shadow: "shadow/newsletter"
        },
        constraints: {
            content: "CENTER",
            image: "LEFT_RIGHT",
            section: "LEFT_RIGHT"
        },
        spacing: {
            internal: "space-lg",
            section: "space-2xl"
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
            "import React, { useMemo, useState, useId } from 'react';",
            "import { motion, type Variants } from 'framer-motion';",
            "import styled from 'styled-components';",
            "import { useTheme } from '../../../contexts/ThemeContext';",
            "import { fadeInUp } from '../../../lib/animations/variants';",
            "import { type Hero_20Props, type ColorOverrides } from './Hero_20.types';",
            "import { validateHero20Props, sanitizeProps, formatValidationMessage } from './Hero_20.validators';",
            "import meta from './Hero_20.meta';"
        ],
        template: `const Hero_20: React.FC<Hero_20Props> = (props = {}) => {
    const { theme } = useTheme();
    const uniqueId = useId();
    
    const validation = validateHero20Props(props);
    const sanitized = sanitizeProps(props);
    
    const styles = useComponentStyles(sanitized.colors, theme);
    
    return (
        <section className={meta.tokens.layout.section}>
            <div className={meta.tokens.layout.contentContainer}>
                <div className={meta.tokens.spacing.sectionPadding}>
                    <div className={meta.tokens.layout.contentWrapper}>
                        <div className={meta.tokens.spacing.contentSpacing}>
                            <h1 className={meta.tokens.typography.heading.complete}>
                                {sanitized.title}
                            </h1>
                            <p className={meta.tokens.typography.body.complete}>
                                {sanitized.description}
                            </p>
                            <div className={meta.tokens.spacing.buttonSpacing}>
                                {/* Newsletter Form with Token Classes */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={meta.tokens.layout.imageContainer}>
                <img
                    className={meta.tokens.image.classes}
                    src={sanitized.image.src}
                    alt={sanitized.image.alt}
                    loading={meta.tokens.image.loading}
                />
            </div>
        </section>
    );
};`
    },

    // === Development Config ===
    development: {
        storybook: {
            title: "Components/Hero/Hero_20",
            category: "Layout"
        },
        testing: {
            testIds: ["hero-section", "hero-content", "hero-title", "hero-description", "hero-newsletter", "hero-image"],
            accessibilityTests: true
        },
        documentation: {
            designNotes: "Clean and minimal hero with centered content, newsletter signup, and full-width image below. All styles tokenized using native HTML elements with complete color override system. Perfect for lead capture and SaaS sites.",
            usageGuidelines: "Use native h1, p, form, input, button elements with complete token classes. Colors are fully customizable via props. Newsletter form integrated directly with proper accessibility."
        }
    }
};

export default meta;