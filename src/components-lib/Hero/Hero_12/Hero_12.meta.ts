// Hero_12.meta.ts
import { type Hero_12Meta } from './Hero_12.types';

const meta: Hero_12Meta = {
  version: "1.1",

  // === Identity ===
  component_id: "Hero_12",
  category: "hero",
  intent: "convert",
  layout_structure: "background_center_bottom",

  // === Tokens ===
  tokens: {
    // Layout Structure - Center-bottom positioning layout
    layout: {
      section: "relative w-full min-h-screen lg:h-screen lg:overflow-hidden",
      backgroundContainer: "absolute inset-0",
      backgroundImage: "w-full h-full object-cover object-center",
      overlay: "absolute inset-0",
      contentContainer: "relative z-10 w-full h-full min-h-screen lg:h-screen",
      grid: "grid grid-cols-1 lg:grid-cols-2 h-[85vh] lg:h-full",
      leftColumn: "order-1 lg:order-1 px-lg pb-xl lg:px-2xl xl:px-3xl 2xl:px-4xl pt-lg lg:pt-xl xl:pt-2xl lg:flex lg:items-center lg:justify-center",
      rightColumn: "order-2 lg:order-2 flex items-end px-lg pb-xl lg:px-2xl xl:px-2xl 2xl:px-4xl lg:pb-xl pt-lg lg:pt-xl",
      headingCtaWrapper: "w-full space-y-md lg:space-y-lg lg:text-left",
      descriptionWrapper: "w-full lg:text-left"
    },

    // Responsive Spacing
    spacing: {
      sectionY: "py-2xl",
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
      placeholder: "Enter your compelling headline",
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

    // Default Colors for Center-Bottom Hero
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
    "complexity:advanced",
    "industry:tech",
    "responsive:center-bottom",
    "background:image"
  ],

  // === FluffyTags ===
  fluffyTags: [
    "vibe:balanced",
    "mood:professional",
    "industry:tech",
    "tempo:instant",
    "conversion:primary",
    "placement:above-fold",
    "complexity:advanced",
    "background:hero",
    "positioning:center-bottom"
  ],

  // === Layout Contract ===
  layoutContract: {
    grid: "2-col-center-bottom",
    maxWidth: "full",
    sectionPaddingY: "py-2xl",
    containerPaddingX: "responsive",
    supportsBleed: true,
    topEdge: "background",
    bottomEdge: "background",
    breakpoints: {
      mobile: "stacked",
      tablet: "center-bottom",
      desktop: "center-bottom"
    }
  },

  // === Accessibility ===
  accessibility: {
    landmarks: ["banner"],
    ariaHints: ["h1 first", "background image decorative", "center-bottom content positioning"],
    colorContrastMin: 4.5,
    focusManagement: "linear",
    keyboardNavigation: true,
    screenReaderHints: {
      image: "decorative background",
      section: "Main hero content with center-bottom positioning layout",
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
      "Center-bottom positioning background hero component",
      "Heading and CTAs centered on left side",
      "Description positioned at bottom right",
      "Tech and modern business focused",
      "Clear contrast needed for text readability"
    ],
    contentConstraints: {
      title: {
        tone: ["balanced", "professional", "modern"],
        avoid: ["overly casual", "jargon"],
        maxSentences: 1
      },
      description: {
        tone: ["engaging", "professional", "clear"],
        avoid: ["overly technical", "verbose"],
        maxSentences: 3,
        readingLevel: "8th-grade"
      },
      ctaText: {
        tone: ["action-oriented", "professional"],
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
    primaryConcepts: ["modern-conversion", "center-bottom-positioning", "tech-messaging", "balanced-layout"],
    contentTypes: ["tech-messaging", "modern-copy", "conversion-focused"],
    embeddingWeights: { visual: 0.4, copy: 0.4, interaction: 0.2 },
    contextualRelevance: ["tech-landing", "modern-business-site", "product-introduction", "conversion-funnel"]
  },

  // === Figma Export ===
  figma: {
    autoLayout: true,
    figmaComponentName: "Hero/12 - Background Center Bottom",
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
      "import { type Hero_12Props, type ColorOverrides } from './Hero_12.types';",
      "import { validateHero12Props, sanitizeProps, formatValidationMessage } from './Hero_12.validators';",
      "import meta from './Hero_12.meta';"
    ],
    template: `const Hero_12: React.FC<Hero_12Props> = (props = {}) => {
    const { theme } = useTheme();
    const uniqueId = useId();
    
    const validation = validateHero12Props(props);
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
                        {/* Left Column - Heading & CTAs (Center) */}
                        <div className={meta.tokens.layout.leftColumn}>
                            <div className={meta.tokens.layout.headingCtaWrapper}>
                                <h1 className={meta.tokens.typography.heading.complete} style={styles.title}>
                                    {title}
                                </h1>
                                <div className={meta.tokens.spacing.buttonSpacing}>
                                    {/* Native Button Elements */}
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Column - Description (Bottom) */}
                        <div className={meta.tokens.layout.rightColumn}>
                            <div className={meta.tokens.layout.descriptionWrapper}>
                                <p className={meta.tokens.typography.body.complete} style={styles.description}>
                                    {description}
                                </p>
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
      title: "Components/Hero/Hero_12",
      category: "Layout"
    },
    testing: {
      testIds: ["hero-section", "hero-background", "hero-overlay", "hero-title", "hero-description", "hero-buttons", "hero-image"],
      accessibilityTests: true
    },
    documentation: {
      designNotes: "Center-bottom positioning background hero component with heading/CTAs centered on left and description at bottom right. All styles are tokenized using native HTML elements. Optimized for tech and modern business use cases.",
      usageGuidelines: "Use native h1, p, button/a elements with complete token classes. Background image should be high-quality. Content positioning creates balanced visual hierarchy. Ensure sufficient contrast for accessibility."
    }
  }
};

export default meta;