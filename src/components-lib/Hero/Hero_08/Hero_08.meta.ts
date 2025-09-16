// Hero_08.meta.ts
import { type Hero_08Meta } from './Hero_08.types';

const meta: Hero_08Meta = {
  version: "1.1",

  // === Identity ===
  component_id: "Hero_08",
  category: "hero",
  intent: "capture-leads",
  layout_structure: "split-video-newsletter", // Key difference: video left, newsletter right

  // === Tokens ===
  tokens: {
    // Layout Structure - Video Left, Newsletter+Content Right
    layout: {
      section: "relative w-full lg:h-screen lg:overflow-hidden",
      wrapper: "w-full h-full",
      grid: "grid grid-cols-1 lg:grid-cols-2 lg:h-screen",
      videoColumn: "relative h-96 lg:h-screen order-2 lg:order-1", // Video on left
      contentColumn: "flex flex-col justify-center order-1 lg:order-2 min-h-[50vh] lg:min-h-0", // Newsletter+Content on right
      videoContainer: "relative w-full h-full overflow-hidden",
      contentContainer: "xl:max-w-lg"
    },

    // Responsive Spacing - All tokens used in component
    spacing: {
      containerX: "px-lg lg:px-2xl xl:px-5xl 2xl:px-6xl",
      containerY: "py-xl",
      contentSpacing: "space-y-md lg:space-y-lg"
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
      }
    },

    // Newsletter System - Complete token-based newsletter styling
    newsletter: {
      container: "w-full",
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
      default: "Medium length hero heading goes here"
    },
    description: {
      type: "text",
      label: "Description",
      required: false,
      max: 220,
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
      default: "/images/component-lib-images/hero/placeholer-video-thumbnail.png"
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
    title: "Medium length hero heading goes here",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    newsletterPlaceholder: "Enter your email",
    newsletterButtonText: "Sign up",
    newsletterMessage: "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    videoSrc: "/images/component-lib-images/hero/placeholder-video.mp4",
    videoThumbnail: "/images/component-lib-images/hero/placeholer-video-thumbnail.png",
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
          containerY: "py-lg",
          contentSpacing: "space-y-sm lg:space-y-md"
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
    "purpose:lead-capture",
    "complexity:simple",
    "industry:saas",
    "responsive:yes",
    "video:enabled",
    "form:newsletter",
    "layout:video-left"
  ],

  // === FluffyTags ===
  fluffyTags: [
    "vibe:engaging",
    "mood:confident",
    "industry:saas",
    "tempo:dynamic",
    "conversion:lead-capture",
    "placement:above-fold",
    "complexity:simple",
    "video:hero-showcase",
    "form:newsletter-signup",
    "layout:reversed"
  ],

  // === Layout Contract ===
  layoutContract: {
    grid: "2-col-video-newsletter",
    maxWidth: "full",
    sectionPaddingY: "py-xl",
    containerPaddingX: "px-lg",
    supportsBleed: false,
    topEdge: "none",
    bottomEdge: "none",
    breakpoints: {
      mobile: "single-col",
      tablet: "split-video-newsletter",
      desktop: "split-video-newsletter"
    }
  },

  // === Accessibility ===
  accessibility: {
    landmarks: ["banner", "complementary"],
    ariaHints: ["h1 first", "Newsletter form accessible", "Video accessible with controls"],
    colorContrastMin: 4.5,
    focusManagement: "linear",
    keyboardNavigation: true,
    screenReaderHints: {
      video: "promotional video content",
      section: "Main hero content with video on left and newsletter signup"
    }
  },

  // === Performance Config ===
  performance: {
    lazyImages: true,
    bundleKbBudget: 25, // Higher for video
    criticalCSS: true,
    preloadHints: ["video", "thumbnail"]
  },

  // === Generation ===
  generation: {
    aiPromptHints: [
      "Lead capture component",
      "Above-the-fold placement",
      "Clear value proposition required",
      "Mobile-first responsive design",
      "Newsletter signup integration",
      "Video showcases product/service",
      "Video positioned on left"
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
      },
      newsletterText: {
        tone: ["friendly", "non-intrusive"],
        avoid: ["pushy", "aggressive"],
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
    primaryConcepts: ["lead-capture", "newsletter-signup", "value-proposition", "trust-building", "video-storytelling"],
    contentTypes: ["hero-messaging", "newsletter-copy", "brand-positioning", "video-content"],
    embeddingWeights: { visual: 0.4, copy: 0.3, interaction: 0.3 }, // Balanced for newsletter + video
    contextualRelevance: ["landing-page-entry", "lead-generation", "newsletter-signup", "conversion-funnel-top", "video-marketing"]
  },

  // === Figma Export ===
  figma: {
    autoLayout: true,
    figmaComponentName: "Hero/08 - Split with Video Left and Newsletter",
    componentSets: {
      main: "Hero Components",
      variants: "Hero Variants"
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
      "import { type Hero_08Props, type ColorOverrides } from './Hero_08.types';",
      "import { validateHero08Props, sanitizeProps, formatValidationMessage } from './Hero_08.validators';",
      "import meta from './Hero_08.meta';"
    ],
    template: `const Hero_08: React.FC<Hero_08Props> = (props = {}) => {
    const { theme } = useTheme();
    const validation = validateHero08Props(props);
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
            aria-label="Main hero content with video on left and newsletter signup"
        >
            <div className={meta.tokens.layout.wrapper}>
                <div className={meta.tokens.layout.grid}>
                    <div className={meta.tokens.layout.videoColumn}>
                        {/* Video Player with Token Classes */}
                    </div>
                    <div className={\`\${meta.tokens.layout.contentColumn} \${meta.tokens.spacing.containerX} \${meta.tokens.spacing.containerY}\`}>
                        <div className={\`\${meta.tokens.layout.contentContainer} \${meta.tokens.spacing.contentSpacing}\`}>
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
                            {/* Newsletter Form with Token Classes */}
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
      title: "Components/Hero/Hero_08",
      category: "Layout"
    },
    testing: {
      testIds: ["hero-section", "hero-title", "hero-description", "hero-newsletter", "hero-video-container"],
      accessibilityTests: true
    },
    documentation: {
      designNotes: "Lead capture component for landing pages with integrated video player on left and newsletter signup. All styles are tokenized using native HTML elements. Fully independent with no component dependencies.",
      usageGuidelines: "Use native h1, p, form, input, button, video elements with complete token classes. Colors are fully customizable via props. Animations can be disabled for accessibility. No external component dependencies. Video player and newsletter form integrated directly."
    }
  }
};

export default meta;