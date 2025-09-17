// Hero_09.meta.ts
import { type Hero_09Meta } from './Hero_09.types';

const meta: Hero_09Meta = {
  version: "1.1",

  // === Identity ===
  component_id: "Hero_09",
  category: "hero",
  intent: "convert",
  layout_structure: "background_two_column",

  // === Tokens ===
  tokens: {
    // Layout Structure - Background hero with two columns
    layout: {
      section: "relative w-full min-h-screen lg:h-screen lg:overflow-hidden",
      backgroundContainer: "absolute inset-0",
      backgroundImage: "w-full h-full object-cover object-center",
      overlay: "absolute inset-0",
      contentContainer: "relative z-10 w-full h-full min-h-screen lg:h-screen",
      grid: "grid grid-cols-1 lg:grid-cols-2 h-[85vh] lg:h-full",
      leftColumn: "",
      rightColumn: "flex items-end",
      rightContent: "w-full space-y-md lg:space-y-lg"
    },

    // Responsive Spacing - Optimized for background layout
    spacing: {
      sectionY: "py-2xl",
      leftPadding: "px-lg pb-xl lg:px-2xl xl:px-3xl 2xl:px-4xl pt-lg lg:pt-xl xl:pt-2xl",
      rightPadding: "px-lg pb-xl lg:px-2xl xl:px-2xl 2xl:px-4xl",
      contentSpacing: "space-y-md lg:space-y-lg",
      buttonSpacing: "flex gap-md"
    },

    // Typography - Optimized for dramatic background hero
    typography: {
      heading: {
        desktop: "text-h1-md xl:text-h1-md",
        mobile: "text-h2-sm lg:text-h1-md",
        weight: "font-bold",
        complete: "text-h2-sm lg:text-h1-md xl:text-h1-md font-bold break-words"
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

    // Effects & Animations
    effects: {
      transition: "transition-all duration-200",
      hover: "hover:shadow-lg",
      button: "transition-all duration-200"
    },

    // Image Properties
    image: {
      classes: "w-full h-full object-cover object-center",
      loading: "eager"
    }
  },

  // === Props Schema ===
  props: {
    title: {
      type: "text",
      label: "Hero Title",
      required: false,
      max: 80,
      placeholder: "Enter your dramatic headline",
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
        },
        icon: {
          type: "text",
          label: "Icon (optional)",
          required: false
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
        },
        icon: {
          type: "text",
          label: "Icon (optional)",
          required: false
        }
      },
      default: {
        text: "Button",
        href: "#",
        variant: "outline" as const,
        size: "lg" as const
      }
    },
    backgroundImage: {
      type: "image",
      label: "Background Image",
      required: false,
      default: "/images/component-lib-images/hero/placeholder-hero-bg.png"
    },
    animated: {
      type: "boolean",
      label: "Enable Animations",
      default: true
    },
    overlayOpacity: {
      type: "number",
      label: "Overlay Opacity (deprecated - use colors.overlay)",
      min: 0,
      max: 100,
      default: 50
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
        overlay: {
          type: "object",
          label: "Overlay Color",
          shape: {
            light: {
              type: "color",
              label: "Light Mode",
              default: "rgba(0, 0, 0, 0.5)"
            },
            dark: {
              type: "color",
              label: "Dark Mode",
              default: "rgba(0, 0, 0, 0.6)"
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
              default: "#ffffff"
            },
            dark: {
              type: "color",
              label: "Dark Mode",
              default: "#ffffff"
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
              default: "rgba(255, 255, 255, 0.9)"
            },
            dark: {
              type: "color",
              label: "Dark Mode",
              default: "rgba(255, 255, 255, 0.9)"
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
    backgroundImage: "/images/component-lib-images/hero/placeholder-hero-bg.png",
    backgroundImageAlt: "Hero background",
    animated: true,
    overlayOpacity: 50,
    className: "",

    // Default Colors for Background Hero
    colors: {
      overlay: {
        light: 'rgba(0, 0, 0, 0.5)',
        dark: 'rgba(0, 0, 0, 0.6)'
      },
      title: {
        light: '#ffffff',
        dark: '#ffffff'
      },
      description: {
        light: 'rgba(255, 255, 255, 0.9)',
        dark: 'rgba(255, 255, 255, 0.9)'
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
          sectionY: "py-lg",
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
    },
    {
      id: "light-overlay",
      label: "Light Overlay",
      propsPatch: {
        colors: {
          overlay: {
            light: 'rgba(0, 0, 0, 0.3)',
            dark: 'rgba(0, 0, 0, 0.4)'
          }
        }
      }
    },
    {
      id: "dark-overlay",
      label: "Dark Overlay",
      propsPatch: {
        colors: {
          overlay: {
            light: 'rgba(0, 0, 0, 0.7)',
            dark: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    }
  ],

  // === Slots ===
  slots: [],

  // === Tags ===
  tags: [
    "placement:above-fold",
    "style:dramatic",
    "purpose:conversion",
    "complexity:simple",
    "industry:creative",
    "responsive:yes",
    "background:image"
  ],

  // === FluffyTags ===
  fluffyTags: [
    "vibe:dramatic",
    "mood:inspiring",
    "industry:creative",
    "tempo:instant",
    "conversion:primary",
    "placement:above-fold",
    "complexity:simple",
    "background:hero"
  ],

  // === Layout Contract ===
  layoutContract: {
    grid: "2-col-bg",
    maxWidth: "full",
    sectionPaddingY: "py-2xl",
    containerPaddingX: "responsive",
    supportsBleed: true,
    topEdge: "background",
    bottomEdge: "background",
    breakpoints: {
      mobile: "stacked",
      tablet: "split",
      desktop: "split"
    }
  },

  // === Accessibility ===
  accessibility: {
    landmarks: ["banner"],
    ariaHints: ["h1 first", "background image decorative", "overlay for readability"],
    colorContrastMin: 4.5,
    focusManagement: "linear",
    keyboardNavigation: true,
    screenReaderHints: {
      image: "decorative background",
      section: "Main hero content with background",
      overlay: "dark overlay for text readability"
    }
  },

  // === Performance Config ===
  performance: {
    lazyImages: false, // Background image should load eagerly
    bundleKbBudget: 20,
    criticalCSS: true,
    preloadHints: ["background-image"]
  },

  // === Generation ===
  generation: {
    aiPromptHints: [
      "Dramatic background hero component",
      "Above-the-fold placement with visual impact",
      "Clear contrast needed for text readability",
      "Mobile-first responsive design with background handling"
    ],
    contentConstraints: {
      title: {
        tone: ["dramatic", "inspiring", "bold"],
        avoid: ["passive voice", "weak words"],
        maxSentences: 1
      },
      description: {
        tone: ["supportive", "engaging", "clear"],
        avoid: ["technical jargon", "too long"],
        maxSentences: 3,
        readingLevel: "8th-grade"
      },
      ctaText: {
        tone: ["action-oriented", "compelling"],
        avoid: ["generic", "weak"],
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
    primaryConcepts: ["conversion", "dramatic-presentation", "visual-impact", "brand-introduction"],
    contentTypes: ["hero-messaging", "cta-copy", "background-content"],
    embeddingWeights: { visual: 0.4, copy: 0.4, interaction: 0.2 },
    contextualRelevance: ["landing-page-entry", "product-showcase", "brand-presentation"]
  },

  // === Figma Export ===
  figma: {
    autoLayout: true,
    figmaComponentName: "Hero/09 - Background Two Column",
    componentSets: {
      main: "Hero Components",
      variants: "Background Heroes"
    },
    textStyleRefs: {
      title: "typography/h1-md",
      description: "typography/para-lg"
    },
    colorStyleRefs: {
      overlay: "color/overlay/dark",
      title: "color/text/on-dark",
      description: "color/text/on-dark-secondary"
    },
    effectStyleRefs: {
      shadow: "shadow/overlay"
    },
    constraints: {
      background: "SCALE",
      content: "LEFT_RIGHT",
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
      "import React, { useMemo, useId } from 'react';",
      "import { motion, type Variants } from 'framer-motion';",
      "import styled from 'styled-components';",
      "import { useTheme } from '../../../contexts/ThemeContext';",
      "import { fadeInUp } from '../../../lib/animations/variants';",
      "import { type Hero_09Props, type ColorOverrides } from './Hero_09.types';",
      "import { validateHero09Props, sanitizeProps, formatValidationMessage } from './Hero_09.validators';",
      "import meta from './Hero_09.meta';"
    ],
    template: `const Hero_09: React.FC<Hero_09Props> = (props = {}) => {
    const { theme } = useTheme();
    const uniqueId = useId();
    
    const validation = validateHero09Props(props);
    const sanitized = sanitizeProps(props);
    
    const title = sanitized.title || meta.defaults.title;
    const description = sanitized.description || meta.defaults.description;
    const animated = sanitized.animated !== undefined ? sanitized.animated : meta.defaults.animated;
    
    const styles = useComponentStyles(sanitized.colors, theme);
    
    return (
        <section className={meta.tokens.layout.section}>
            <div className={meta.tokens.layout.backgroundContainer}>
                <img
                    src={sanitized.backgroundImage || meta.defaults.backgroundImage}
                    alt=""
                    className={meta.tokens.image.classes}
                    loading={meta.tokens.image.loading}
                    role="presentation"
                />
                <div className={meta.tokens.layout.overlay} style={styles.overlay} />
            </div>
            
            <div className={meta.tokens.layout.contentContainer}>
                <div className={meta.tokens.spacing.sectionY}>
                    <div className={meta.tokens.layout.grid}>
                        {/* Left Column - Title */}
                        <div className={\`\${meta.tokens.layout.leftColumn} \${meta.tokens.spacing.leftPadding}\`}>
                            <h1
                                className={meta.tokens.typography.heading.complete}
                                style={styles.title}
                            >
                                {title}
                            </h1>
                        </div>
                        
                        {/* Right Column - Content */}
                        <div className={\`\${meta.tokens.layout.rightColumn} \${meta.tokens.spacing.rightPadding}\`}>
                            <div className={meta.tokens.layout.rightContent}>
                                <p
                                    className={meta.tokens.typography.body.complete}
                                    style={styles.description}
                                >
                                    {description}
                                </p>
                                <div className={meta.tokens.spacing.buttonSpacing}>
                                    {/* Native Button Elements with Token Classes */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};`
  },

  // === Development Config ===
  development: {
    storybook: {
      title: "Components/Hero/Hero_09",
      category: "Layout"
    },
    testing: {
      testIds: ["hero-section", "hero-background", "hero-overlay", "hero-title", "hero-description", "hero-buttons", "hero-left-column", "hero-right-column"],
      accessibilityTests: true
    },
    documentation: {
      designNotes: "Dramatic background hero component with two-column layout. All styles are tokenized using native HTML elements. Features background image with customizable overlay for text readability.",
      usageGuidelines: "Use native h1, p, button/a elements with complete token classes. Background image should be high-quality and work well with overlay. Colors are fully customizable via props. Ensure sufficient contrast for accessibility."
    }
  }
};

export default meta;