// Hero_25.meta.ts
import { type Hero_25Meta } from './Hero_25.types';

const meta: Hero_25Meta = {
  version: "1.1",

  // === Identity ===
  component_id: "Hero_25",
  category: "hero",
  intent: "information",
  layout_structure: "content-top-video-bottom-left-aligned", // Key difference: left-aligned content

  // === Tokens ===
  tokens: {
    // Layout Structure - Left Aligned Content Above Video
    layout: {
      section: "relative w-full",
      wrapper: "w-full",
      contentContainer: "container mx-auto text-left", // text-left instead of text-center
      videoContainer: "relative w-full",
      videoWrapper: "relative w-full overflow-hidden"
    },

    // Responsive Spacing - All tokens used in component
    spacing: {
      containerX: "px-lg lg:px-2xl xl:px-5xl 2xl:px-6xl",
      containerY: "py-2xl lg:py-4xl",
      contentSpacing: "space-y-md lg:space-y-lg max-w-3xl", // max-w-3xl instead of max-w-2xl mx-auto
      buttonSpacing: "gap-md",
      sectionSpacing: "pt-sm"
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

    // Video System - Complete token-based video styling
    video: {
      container: "relative w-full h-full",
      element: "w-full h-full object-cover object-center",
      overlay: "absolute inset-0 z-10",
      controls: "absolute inset-0 flex items-center justify-center z-20",
      playButton: {
        classes: "relative flex items-center justify-center rounded-full border-2 transition-all duration-300 focus:outline-none w-20 h-20",
        iconContainer: "flex items-center justify-center",
        icon: "text-icon-lg",
        borderWidth: "2px",
        borderStyle: "solid"
      }
    },

    // Responsive Behavior - All tokens used in component
    responsive: {
      flexDirection: "flex flex-col md:flex-row",
      width: "w-full md:w-auto",
      alignment: "items-center justify-start" // justify-start for left alignment
    },

    // Effects & Animations - All tokens used in component
    effects: {
      transition: "transition-all duration-200",
      hover: "hover:shadow-lg",
      button: "transition-colors duration-200"
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
      default: "Long heading is what you see here in this header section"
    },
    description: {
      type: "text",
      label: "Description",
      required: false,
      max: 220,
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
        text: "Button",
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
          default: "Button"
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
        text: "Button",
        href: "#learn-more",
        variant: "outline" as const,
        size: "lg" as const
      }
    },
    videoSrc: {
      type: "video",
      label: "Video Source",
      required: false,
      default: "/images/component-lib-images/hero/placeholder-video.mp4"
    },
    videoThumbnail: {
      type: "image",
      label: "Video Thumbnail",
      required: false,
      default: "/images/component-lib-images/hero/video-thumnail.png"
    },
    videoAutoPlay: {
      type: "boolean",
      label: "Auto Play Video",
      default: false
    },
    videoLoop: {
      type: "boolean",
      label: "Loop Video",
      default: true
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
        },
        video: {
          type: "object",
          label: "Video Colors",
          shape: {
            overlay: {
              type: "object",
              label: "Video Overlay",
              shape: {
                light: { type: "color", label: "Light", default: "rgba(0, 0, 0, 0.3)" },
                dark: { type: "color", label: "Dark", default: "rgba(0, 0, 0, 0.5)" }
              }
            },
            playButton: {
              type: "object",
              label: "Play Button Styling",
              shape: {
                background: {
                  type: "object",
                  label: "Background",
                  shape: {
                    light: { type: "color", label: "Light", default: "rgba(255, 255, 255, 0.9)" },
                    dark: { type: "color", label: "Dark", default: "rgba(15, 23, 42, 0.9)" }
                  }
                },
                backgroundHover: {
                  type: "object",
                  label: "Hover Background",
                  shape: {
                    light: { type: "color", label: "Light", default: "rgba(255, 255, 255, 0.95)" },
                    dark: { type: "color", label: "Dark", default: "rgba(15, 23, 42, 0.95)" }
                  }
                },
                border: {
                  type: "object",
                  label: "Border",
                  shape: {
                    light: { type: "color", label: "Light", default: "rgba(255, 255, 255, 0.3)" },
                    dark: { type: "color", label: "Dark", default: "rgba(148, 163, 184, 0.3)" }
                  }
                },
                icon: {
                  type: "object",
                  label: "Icon",
                  shape: {
                    light: { type: "color", label: "Light", default: "#111827" },
                    dark: { type: "color", label: "Dark", default: "#f9fafb" }
                  }
                },
                iconHover: {
                  type: "object",
                  label: "Icon Hover",
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
      href: "/signup",
      variant: "solid",
      size: "lg"
    },
    secondaryCTA: {
      text: "Button",
      href: "#learn-more",
      variant: "outline",
      size: "lg"
    },
    videoSrc: "/images/component-lib-images/hero/placeholder-video.mp4",
    videoThumbnail: "/images/component-lib-images/hero/video-thumnail.png",
    videoAutoPlay: false,
    videoLoop: true,
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
      },
      video: {
        overlay: { light: 'rgba(0, 0, 0, 0.3)', dark: 'rgba(0, 0, 0, 0.5)' },
        playButton: {
          background: { light: 'rgba(255, 255, 255, 0.9)', dark: 'rgba(15, 23, 42, 0.9)' },
          backgroundHover: { light: 'rgba(255, 255, 255, 0.95)', dark: 'rgba(15, 23, 42, 0.95)' },
          border: { light: 'rgba(255, 255, 255, 0.3)', dark: 'rgba(148, 163, 184, 0.3)' },
          icon: { light: '#111827', dark: '#f9fafb' },
          iconHover: { light: '#4f46e5', dark: '#6366f1' }
        }
      }
    }
  },

  // === Variants ===
  variants: [
    {
      id: "autoplay",
      label: "Auto Play",
      propsPatch: {
        videoAutoPlay: true
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
      id: "compact",
      label: "Compact",
      tokensPatch: {
        spacing: {
          containerY: "py-xl lg:py-2xl",
          contentSpacing: "max-w-3xl space-y-sm lg:space-y-md",
          buttonSpacing: "gap-sm"
        }
      }
    }
  ],

  // === Slots ===
  slots: [],

  // === Tags ===
  tags: [
    "placement:above-fold",
    "style:modern",
    "purpose:information",
    "complexity:simple",
    "industry:saas",
    "responsive:yes",
    "video:enabled",
    "cinematic:yes",
    "layout:left-aligned"
  ],

  // === FluffyTags ===
  fluffyTags: [
    "vibe:cinematic",
    "mood:informative",
    "industry:tech",
    "tempo:dynamic",
    "conversion:secondary",
    "placement:above-fold",
    "complexity:simple",
    "video:hero-showcase",
    "layout:content-video-left"
  ],

  // === Layout Contract ===
  layoutContract: {
    grid: "single-col-stacked",
    maxWidth: "full",
    sectionPaddingY: "py-2xl",
    containerPaddingX: "px-lg",
    supportsBleed: true,
    topEdge: "none",
    bottomEdge: "none",
    breakpoints: {
      mobile: "stacked",
      tablet: "stacked",
      desktop: "stacked"
    }
  },

  // === Accessibility ===
  accessibility: {
    landmarks: ["banner"],
    ariaHints: ["h1 first", "CTA prominently placed", "Video accessible with controls"],
    colorContrastMin: 4.5,
    focusManagement: "linear",
    keyboardNavigation: true,
    screenReaderHints: {
      video: "promotional video content",
      section: "Main hero content with left-aligned content above video"
    }
  },

  // === Performance Config ===
  performance: {
    lazyImages: true,
    bundleKbBudget: 25,
    criticalCSS: true,
    preloadHints: ["video", "thumbnail"]
  },

  // === Generation ===
  generation: {
    aiPromptHints: [
      "Information-focused component",
      "Above-the-fold placement",
      "Clear messaging required",
      "Mobile-first responsive design",
      "Video showcases content/story",
      "Cinematic presentation",
      "Left-aligned content layout"
    ],
    contentConstraints: {
      title: {
        tone: ["informative", "clear", "engaging"],
        avoid: ["jargon", "passive voice"],
        maxSentences: 1
      },
      description: {
        tone: ["supportive", "informative"],
        avoid: ["technical", "vague"],
        maxSentences: 2,
        readingLevel: "8th-grade"
      },
      ctaText: {
        tone: ["clear", "action-oriented"],
        avoid: ["generic", "passive"],
        maxSentences: 1
      },
      videoContent: {
        tone: ["engaging", "visual"],
        avoid: ["static", "boring"],
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
    primaryConcepts: ["information", "introduction", "storytelling", "trust-building", "video-content"],
    contentTypes: ["hero-messaging", "cta-copy", "brand-positioning", "video-content"],
    embeddingWeights: { visual: 0.5, copy: 0.3, interaction: 0.2 },
    contextualRelevance: ["landing-page-entry", "content-introduction", "information-funnel-top", "video-marketing"]
  },

  // === Figma Export ===
  figma: {
    autoLayout: true,
    figmaComponentName: "Hero/25 - Content Above Video Left Aligned",
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
      video: "SCALE",
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
      "import React, { useMemo, useState, useRef } from 'react';",
      "import { motion, type Variants } from 'framer-motion';",
      "import { useTheme } from '../../../contexts/ThemeContext';",
      "import { fadeInUp, fadeIn } from '../../../lib/animations/variants';",
      "import { FaPlay, FaPause } from 'react-icons/fa';",
      "import { type Hero_25Props, type ColorOverrides } from './Hero_25.types';",
      "import { validateHero25Props, sanitizeProps, formatValidationMessage } from './Hero_25.validators';",
      "import meta from './Hero_25.meta';"
    ],
    template: `const Hero_25: React.FC<Hero_25Props> = (props = {}) => {
    const { theme } = useTheme();
    const validation = validateHero25Props(props);
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
            aria-label="Main hero content with left-aligned content above video"
        >
            <div className={\`\${meta.tokens.layout.contentContainer} \${meta.tokens.spacing.containerX} \${meta.tokens.spacing.containerY}\`}>
                <div className={\`\${meta.tokens.spacing.contentSpacing}\`}>
                    <h1
                        className={meta.tokens.typography.heading.complete}
                        style={styles.title}
                    >
                        {title}
                    </h1>
                    <p
                        className={meta.tokens.typography.body.complete}
                        style={styles.description}
                    >
                        {description}
                    </p>
                    {/* Action Buttons with Token Classes */}
                </div>
            </div>
            <div className={meta.tokens.layout.videoContainer}>
                {/* Video Player with Token Classes */}
            </div>
        </section>
    );
};`
  },

  // === Development Config ===
  development: {
    storybook: {
      title: "Components/Hero/Hero_25",
      category: "Layout"
    },
    testing: {
      testIds: ["hero-section", "hero-title", "hero-description", "hero-buttons", "hero-video-container"],
      accessibilityTests: true
    },
    documentation: {
      designNotes: "Information-focused component for landing pages with left-aligned content above full-width video. All styles are tokenized using native HTML elements. Fully independent with no component dependencies.",
      usageGuidelines: "Use native h1, p, button/a, video elements with complete token classes. Colors are fully customizable via props. Animations can be disabled for accessibility. No external component dependencies. Video player integrated directly."
    }
  }
};

export default meta;