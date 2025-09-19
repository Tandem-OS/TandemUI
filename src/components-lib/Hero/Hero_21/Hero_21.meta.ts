// Hero_21.meta.ts
import { type Hero_21Meta } from './Hero_21.types';

const meta: Hero_21Meta = {
  version: "1.1",

  // === Identity ===
  component_id: "Hero_21",
  category: "hero",
  intent: "convert",
  layout_structure: "left_aligned_content_above_image",

  // === Tokens ===
  tokens: {
    // Layout Structure - Left-aligned content above full-width image
    layout: {
      section: "w-full",
      contentContainer: "container mx-auto",
      contentWrapper: "max-w-3xl text-left",
      imageContainer: "w-full"
    },

    // Responsive Spacing - Optimized for left-aligned content layout
    spacing: {
      sectionPadding: "px-lg py-2xl lg:py-4xl",
      contentSpacing: "space-y-md lg:space-y-lg",
      buttonSpacing: "flex items-center justify-start gap-md pt-sm"
    },

    // Typography - Left-aligned and optimized
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

    // Button System - Complete token-based button styling
    button: {
      base: "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed leading-none text-center no-underline rounded-lg hover:shadow-lg",
      sizes: {
        sm: "h-[2.25rem] px-sm text-btn-sm",
        md: "h-[2.75rem] px-sm text-btn-sm sm:px-md sm:text-btn-md",
        lg: "h-[3.25rem] px-md text-btn-md lg:px-lg lg:text-btn-lg"
      },
      iconSpacing: "ml-2 flex-shrink-0",
      borderWidth: "2px",
      borderStyle: "solid"
    },

    // Image System
    image: {
      container: "w-full",
      element: "w-full h-auto object-cover",
      loading: "lazy"
    },

    // Effects & Animations
    effects: {
      transition: "transition-all duration-200",
      hover: "hover:shadow-lg",
      button: "transition-all duration-200"
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
      default: "Long heading is what you see here in this header section"
    },
    description: {
      type: "text",
      label: "Description",
      required: false,
      max: 300,
      placeholder: "Supporting description text",
      default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
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
          default: "Button"
        },
        href: {
          type: "url",
          label: "Button Link",
          default: "#"
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
        }
      },
      default: {
        text: "Button",
        href: "#",
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
          default: "Button"
        },
        href: {
          type: "url",
          label: "Button Link",
          default: "#"
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
        }
      },
      default: {
        text: "Button",
        href: "#",
        variant: "outline" as const,
        size: "lg" as const
      }
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
    title: "Long heading is what you see here in this header section",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    primaryCTA: {
      text: "Button",
      href: "#",
      variant: "solid",
      size: "lg"
    },
    secondaryCTA: {
      text: "Button",
      href: "#",
      variant: "outline",
      size: "lg"
    },
    image: {
      src: "/images/component-lib-images/hero/placeholder-hero-img.png",
      alt: "Hero section image"
    },
    animated: true,
    className: "",

    // Default Colors for Left-Aligned Content Hero
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
    "purpose:convert",
    "complexity:simple",
    "industry:business",
    "responsive:yes",
    "layout:left-aligned"
  ],

  // === FluffyTags ===
  fluffyTags: [
    "vibe:professional",
    "mood:business",
    "industry:saas",
    "tempo:focused",
    "engagement:convert",
    "placement:above-fold",
    "complexity:simple",
    "layout:left-aligned"
  ],

  // === Layout Contract ===
  layoutContract: {
    grid: "single-col-left-content-above-image",
    maxWidth: "container",
    sectionPaddingY: "py-2xl",
    containerPaddingX: "px-lg",
    supportsBleed: false,
    topEdge: "clean",
    bottomEdge: "clean",
    breakpoints: {
      mobile: "stacked",
      tablet: "left-aligned",
      desktop: "left-aligned"
    }
  },

  // === Accessibility ===
  accessibility: {
    landmarks: ["banner"],
    ariaHints: ["h1 left-aligned above image", "descriptive alt text required"],
    colorContrastMin: 4.5,
    focusManagement: "linear",
    keyboardNavigation: true,
    screenReaderHints: {
      section: "Main hero content with left-aligned text above full-width image",
      image: "decorative hero image below content"
    }
  },

  // === Performance Config ===
  performance: {
    lazyImages: true,
    bundleKbBudget: 15,
    criticalCSS: true,
    preloadHints: ["hero-image"]
  },

  // === Generation ===
  generation: {
    aiPromptHints: [
      "Left-aligned hero component with conversion focus",
      "Above-the-fold placement with clear hierarchy",
      "Business-oriented presentation suitable for SaaS/B2B",
      "Image should support and not compete with the content"
    ],
    contentConstraints: {
      title: {
        tone: ["professional", "direct", "compelling"],
        avoid: ["overly casual", "buzzwords"],
        maxSentences: 1
      },
      description: {
        tone: ["informative", "persuasive", "clear"],
        avoid: ["technical jargon", "too lengthy"],
        maxSentences: 3,
        readingLevel: "8th-grade"
      },
      ctaText: {
        tone: ["action-oriented", "compelling"],
        avoid: ["generic", "vague"],
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
    primaryConcepts: ["conversion", "business-focused", "professional-presentation", "left-aligned-content"],
    contentTypes: ["hero-messaging", "business-content", "conversion-copy"],
    embeddingWeights: { visual: 0.3, copy: 0.5, interaction: 0.2 },
    contextualRelevance: ["landing-page", "saas-site", "business-portfolio", "conversion-focused"]
  },

  // === Figma Export ===
  figma: {
    autoLayout: true,
    figmaComponentName: "Hero/21 - Left-Aligned Content Above Image",
    componentSets: {
      main: "Hero Components",
      variants: "Business Heroes"
    },
    textStyleRefs: {
      title: "typography/h1-md",
      description: "typography/para-lg"
    },
    colorStyleRefs: {
      background: "color/background/primary",
      title: "color/text/primary",
      description: "color/text/secondary"
    },
    effectStyleRefs: {
      shadow: "shadow/button"
    },
    constraints: {
      content: "LEFT",
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
      "import React, { useMemo, useCallback, useId } from 'react';",
      "import { motion, type Variants } from 'framer-motion';",
      "import styled from 'styled-components';",
      "import { useTheme } from '../../../contexts/ThemeContext';",
      "import { fadeInUp } from '../../../lib/animations/variants';",
      "import { type Hero_21Props, type ColorOverrides } from './Hero_21.types';",
      "import { validateHero21Props, sanitizeProps, formatValidationMessage } from './Hero_21.validators';",
      "import meta from './Hero_21.meta';"
    ],
    template: `const Hero_21: React.FC<Hero_21Props> = (props = {}) => {
    const { theme } = useTheme();
    const uniqueId = useId();
    
    const validation = validateHero21Props(props);
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
                                {/* Native Button Elements with Token Classes */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={meta.tokens.layout.imageContainer}>
                <img
                    className={meta.tokens.image.element}
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
      title: "Components/Hero/Hero_21",
      category: "Layout"
    },
    testing: {
      testIds: ["hero-section", "hero-content", "hero-title", "hero-description", "hero-buttons", "hero-image"],
      accessibilityTests: true
    },
    documentation: {
      designNotes: "Left-aligned hero with business focus and conversion intent. All styles tokenized using native HTML elements. Perfect for SaaS and B2B sites.",
      usageGuidelines: "Use native h1, p, button, img elements with complete token classes. Ensure image has proper alt text for accessibility. Colors are fully customizable via props."
    }
  }
};

export default meta;