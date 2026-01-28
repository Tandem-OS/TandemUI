// Hero_15.meta.ts
import { type Hero_15Meta } from './Hero_15.types';

const meta: Hero_15Meta = {
  version: "1.1",

  // === Identity ===
  component_id: "Hero_15",
  category: "hero",
  intent: "brand_awareness",
  layout_structure: "video_background_content_left_bottom_title_right_top",

  // === Tokens ===
  tokens: {
    // Layout Structure - Video background hero with content left bottom, title right top
    layout: {
      section: "relative w-full min-h-screen lg:h-screen lg:overflow-hidden",
      backgroundContainer: "absolute inset-0",
      backgroundVideo: "w-full h-full object-cover object-center",
      overlay: "absolute inset-0",
      videoPlayButton: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
      contentContainer: "relative z-10 w-full h-full min-h-screen lg:h-screen",
      grid: "grid grid-cols-1 lg:grid-cols-2 h-[95vh] lg:h-full",
      leftColumn: "order-2 lg:order-1 flex items-end", // Left column has content at bottom
      rightColumn: "order-1 lg:order-2 px-lg pb-sm lg:pb-xl lg:px-2xl xl:px-3xl 2xl:px-4xl pt-sm lg:pt-xl lg:flex lg:items-start", // Right column has title at top
      leftContent: "w-full space-y-md lg:space-y-lg", // Content styling for left column
      rightContent: "w-full" // Title styling for right column
    },

    // Responsive Spacing - Optimized for video background with content positioning
    spacing: {
      sectionY: "py-md lg:py-2xl",
      leftPadding: "px-lg pb-sm lg:pb-xl lg:px-2xl xl:px-2xl 2xl:px-4xl pt-sm lg:pt-xl",
      rightPadding: "px-lg pb-sm lg:pb-xl lg:px-2xl xl:px-3xl 2xl:px-4xl pt-sm lg:pt-xl",
      contentSpacing: "space-y-md lg:space-y-lg",
      buttonSpacing: "flex gap-md"
    },

    // Typography - Optimized for video hero
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

    // Video Play Button System
    videoPlayButton: {
      base: "relative flex items-center justify-center rounded-full border-2 transition-all duration-300 focus:outline-none",
      sizes: {
        sm: "w-12 h-12 text-icon-sm",
        md: "w-16 h-16 text-icon-md", 
        lg: "w-20 h-20 text-icon-lg",
        xl: "w-24 h-24 text-icon-xl"
      },
      variants: {
        default: "backdrop-blur-sm",
        basic: ""
      },
      icon: {
        base: "transition-all duration-200",
        play: "ml-1",
        pause: "ml-0"
      },
      animations: {
        hover: "hover:scale-105",
        tap: "active:scale-95",
        container: "transition-all duration-300",
        iconContainer: "flex items-center justify-center"
      }
    },

    // Effects & Animations
    effects: {
      transition: "transition-all duration-200",
      hover: "hover:shadow-lg",
      button: "transition-all duration-200",
      videoTransition: "transition-all duration-300"
    },

    // Video Properties
    video: {
      classes: "w-full h-full object-cover object-center",
      attributes: {
        muted: true,
        playsInline: true,
        loading: "eager"
      }
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
    videoSrc: {
      type: "text",
      label: "Video Source URL",
      required: false,
      default: "/images/component-lib-images/hero/placeholder-video.mp4"
    },
    videoThumbnail: {
      type: "image",
      label: "Video Thumbnail",
      required: false,
      default: "/images/component-lib-images/hero/video-bg-thumbnail.png"
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
        },
        videoPlayButton: {
          type: "object",
          label: "Video Play Button",
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
              label: "Background Hover",
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
    videoSrc: "/images/component-lib-images/hero/placeholder-video.mp4",
    videoThumbnail: "/images/component-lib-images/hero/video-bg-thumbnail.png",
    videoAutoPlay: false,
    videoLoop: true,
    animated: true,
    overlayOpacity: 50,
    className: "",

    // Default Colors for Video Background Hero (Content Left Bottom, Title Right Top)
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
      },
      videoPlayButton: {
        background: { light: 'rgba(255, 255, 255, 0.9)', dark: 'rgba(15, 23, 42, 0.9)' },
        backgroundHover: { light: 'rgba(255, 255, 255, 0.95)', dark: 'rgba(15, 23, 42, 0.95)' },
        border: { light: 'rgba(255, 255, 255, 0.3)', dark: 'rgba(148, 163, 184, 0.3)' },
        icon: { light: '#111827', dark: '#f9fafb' },
        iconHover: { light: '#4f46e5', dark: '#6366f1' }
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
      id: "autoplay",
      label: "Auto Play Video",
      propsPatch: {
        videoAutoPlay: true
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
    "style:cinematic",
    "purpose:brand-awareness",
    "complexity:medium",
    "industry:media",
    "responsive:yes",
    "background:video",
    "interactive:video-controls"
  ],

  // === FluffyTags ===
  fluffyTags: [
    "vibe:cinematic",
    "mood:dramatic",
    "industry:media",
    "tempo:engaging",
    "branding:primary",
    "placement:above-fold",
    "complexity:medium",
    "background:video"
  ],

  // === Layout Contract ===
  layoutContract: {
    grid: "2-col-video-bg-content-left-title-right",
    maxWidth: "full",
    sectionPaddingY: "py-2xl",
    containerPaddingX: "responsive",
    supportsBleed: true,
    topEdge: "video-background",
    bottomEdge: "video-background",
    breakpoints: {
      mobile: "stacked",
      tablet: "split",
      desktop: "split"
    }
  },

  // === Accessibility ===
  accessibility: {
    landmarks: ["banner"],
    ariaHints: ["h1 positioned top right", "video background decorative", "video controls accessible", "overlay for readability"],
    colorContrastMin: 4.5,
    focusManagement: "linear",
    keyboardNavigation: true,
    screenReaderHints: {
      video: "decorative background video",
      section: "Main hero content with video background, title positioned top right",
      overlay: "dark overlay for text readability",
      playButton: "play or pause background video"
    }
  },

  // === Performance Config ===
  performance: {
    lazyImages: false, // Background video should load eagerly
    bundleKbBudget: 30,
    criticalCSS: true,
    preloadHints: ["background-video", "video-thumbnail"]
  },

  // === Generation ===
  generation: {
    aiPromptHints: [
      "Cinematic video background hero component with content positioning",
      "Above-the-fold placement with video impact",
      "Clear contrast needed for text readability over video",
      "Video controls should be accessible and intuitive",
      "Content positioned at bottom left, title at top right"
    ],
    contentConstraints: {
      title: {
        tone: ["cinematic", "dramatic", "bold"],
        avoid: ["passive voice", "weak words"],
        maxSentences: 1
      },
      description: {
        tone: ["engaging", "supportive", "clear"],
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
    primaryConcepts: ["brand-awareness", "video-presentation", "cinematic-impact", "brand-storytelling"],
    contentTypes: ["hero-messaging", "video-content", "cta-copy"],
    embeddingWeights: { visual: 0.5, copy: 0.3, interaction: 0.2 },
    contextualRelevance: ["landing-page-video", "product-showcase", "brand-presentation", "media-rich"]
  },

  // === Figma Export ===
  figma: {
    autoLayout: true,
    figmaComponentName: "Hero/15 - Video Background Content Left Title Right",
    componentSets: {
      main: "Hero Components",
      variants: "Video Heroes"
    },
    textStyleRefs: {
      title: "typography/h1-md",
      description: "typography/para-lg"
    },
    colorStyleRefs: {
      overlay: "color/overlay/video",
      title: "color/text/on-dark",
      description: "color/text/on-dark-secondary"
    },
    effectStyleRefs: {
      shadow: "shadow/video-overlay"
    },
    constraints: {
      video: "SCALE",
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
      "import React, { useState, useRef, useMemo, useCallback, useId } from 'react';",
      "import { motion, type Variants } from 'framer-motion';",
      "import styled from 'styled-components';",
      "import { useTheme } from '../../../contexts/ThemeContext';",
      "import { fadeInUp } from '../../../lib/animations/variants';",
      "import { type Hero_15Props, type ColorOverrides } from './Hero_15.types';",
      "import { validateHero15Props, sanitizeProps, formatValidationMessage } from './Hero_15.validators';",
      "import meta from './Hero_15.meta';"
    ],
    template: `const Hero_15: React.FC<Hero_15Props> = (props = {}) => {
    const { theme } = useTheme();
    const uniqueId = useId();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const validation = validateHero15Props(props);
    const sanitized = sanitizeProps(props);
    
    const styles = useComponentStyles(sanitized.colors, theme);
    
    const handlePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);
    
    return (
        <section className={meta.tokens.layout.section}>
            <div className={meta.tokens.layout.backgroundContainer}>
                <video
                    ref={videoRef}
                    className={meta.tokens.video.classes}
                    poster={sanitized.videoThumbnail}
                    loop={sanitized.videoLoop}
                    muted={meta.tokens.video.attributes.muted}
                    playsInline={meta.tokens.video.attributes.playsInline}
                    onEnded={() => setIsPlaying(false)}
                >
                    <source src={sanitized.videoSrc} type="video/mp4" />
                </video>
                <div className={meta.tokens.layout.overlay} style={styles.overlay} />
            </div>
            
            <div className={meta.tokens.layout.videoPlayButton}>
                <button
                    onClick={handlePlayPause}
                    className={meta.tokens.videoPlayButton.container}
                    style={styles.playButton}
                >
                    {/* Play/Pause Icon */}
                </button>
            </div>
            
            <div className={meta.tokens.layout.contentContainer}>
                <div className={meta.tokens.spacing.sectionY}>
                    <div className={meta.tokens.layout.grid}>
                        {/* Left Column - Content at Bottom */}
                        <div className={\`\${meta.tokens.layout.leftColumn} \${meta.tokens.spacing.leftPadding}\`}>
                            <div className={meta.tokens.layout.leftContent}>
                                <p
                                    className={meta.tokens.typography.body.complete}
                                    style={styles.description}
                                >
                                    {sanitized.description}
                                </p>
                                <div className={meta.tokens.spacing.buttonSpacing}>
                                    {/* Native Button Elements with Token Classes */}
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Column - Title at Top */}
                        <div className={meta.tokens.layout.rightColumn}>
                            <div className={meta.tokens.layout.rightContent}>
                                <h1
                                    className={meta.tokens.typography.heading.complete}
                                    style={styles.title}
                                >
                                    {sanitized.title}
                                </h1>
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
      title: "Components/Hero/Hero_15",
      category: "Layout"
    },
    testing: {
      testIds: ["hero-section", "hero-video", "hero-overlay", "hero-play-button", "hero-title", "hero-description", "hero-buttons", "hero-left-column", "hero-right-column"],
      accessibilityTests: true
    },
    documentation: {
      designNotes: "Cinematic video background hero with content positioned at left bottom, title at right top. All styles tokenized using native HTML elements. Features video player with play/pause controls and customizable overlay.",
      usageGuidelines: "Use native video, h1, p, button elements with complete token classes. Video should be optimized for web and work well with overlay. Colors are fully customizable via props. Ensure video controls are accessible."
    }
  }
};

export default meta;