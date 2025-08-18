// Hero_01.meta.ts
import { type Hero_01Meta } from './Hero_01.types';

const meta: Hero_01Meta = {
    version: "1.1",

    // === Identity ===
    component_id: "hero.01",
    category: "hero",
    intent: "convert",
    layout_structure: "split",

    // === Simplified Tokens ===
    tokens: {
        // Layout Structure
        layout: {
            section: "relative w-full lg:h-screen lg:overflow-hidden",
            grid: "grid grid-cols-1 lg:grid-cols-2 lg:h-screen",
            contentColumn: "flex flex-col justify-center order-1 lg:order-1 min-h-[50vh] lg:min-h-0",
            imageColumn: "relative h-96 lg:h-screen order-2 lg:order-2",
            contentContainer: "xl:max-w-lg",
            imageContainer: "w-full h-full"
        },

        // Responsive Spacing - Using semantic tokens
        spacing: {
            containerX: "px-lg lg:px-2xl xl:px-5xl 2xl:px-6xl",
            containerY: "py-xl",
            contentSpacing: "space-y-md lg:space-y-lg",
            buttonSpacing: "gap-md",
            x: "lg",
            y: "xl",
            internal: "md"
        },

        // Typography - Complete details
        typography: {
            heading: {
                desktop: "text-h1-md",
                mobile: "text-h2-sm",
                weight: "font-bold",
                complete: "text-h2-sm lg:text-h1-md font-bold"
            },
            body: {
                desktop: "text-para-lg",
                mobile: "text-para-md",
                leading: "leading-relaxed",
                complete: "text-para-md lg:text-para-lg leading-relaxed"
            },
            cta: "text-btn-lg"
        },

        // Responsive Behavior
        responsive: {
            flexDirection: "flex flex-col md:flex-row",
            width: "w-full md:w-auto"
        },

        // Effects & Animations
        effects: {
            transition: "transition-all duration-200",
            hover: "hover:shadow-lg"
        },

        // Image Properties
        image: {
            sizing: "w-full h-full lg:h-screen",
            objectFit: "object-cover object-bottom",
            loading: "lazy"
        },

        // Additional tokens
        radius: "2xl",
        animation: "subtle",
        colorScheme: "brand",
        elevation: "none"
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
            type: "text",
            label: "Primary Button",
            required: false,
            default: {
                text: "Get Started",
                href: "/signup",
                variant: "solid",
                size: "lg"
            }
        },
        secondaryCTA: {
            type: "text",
            label: "Secondary Button",
            required: false
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
            required: false
        },
        colors: {
            type: "text",
            label: "Custom Colors",
            required: false
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
        image: "/images/component-lib-images/hero/placeholder-img.png",
        animated: true,

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

    // === Style-only Variants ===
    variants: [
        {
            id: "compact",
            label: "Compact",
            tokensPatch: {
                spacing: {
                    y: "lg",
                    internal: "sm"
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
    // === Code Template ===
    code: {
        language: "tsx",
        imports: [
            "import React, { useMemo } from 'react';",
            "import { motion, type Variants } from 'framer-motion';",
            "import { useTheme } from '../../../contexts/ThemeContext';",
            "import { fadeInUp, fadeIn } from '../../../lib/animations/variants';",
            "import Heading from '../../../components/demos/typography/Heading';",
            "import SimpleButton from '../../../components/demos/buttons/SimpleButton';",
            "import Para from '../../../comman-components/Para';",
            "import { type Hero_01Props, type ColorOverrides } from './Hero_01.types';",
            "import { validateHero01Props, sanitizeProps } from './Hero_01.validators';",
            "import meta from './Hero_01.meta';"
        ],
        template: `
const getAnimationProps = (variant: Variants, delay = 0, amount = 0, animated = true) => {
  if (!animated) return {};
  return {
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: amount || undefined },
    variants: variant,
    transition: { delay }
  };
};

const useComponentStyles = (userColors: ColorOverrides | undefined, theme: 'light' | 'dark') => {
  return useMemo(() => {
    const defaults = meta.defaults.colors;
    
    const getColor = (userValue: any, defaultValue: any): string => {
      const value = userValue || defaultValue;
      return theme === 'dark' ? value.dark : value.light;
    };
    
    const getButtonStyles = (userButton: any, defaultButton: any) => {
      const button = userButton || defaultButton;
      return {
        background: getColor(button.background, defaultButton.background),
        color: getColor(button.text, defaultButton.text),
        borderColor: getColor(button.border, defaultButton.border),
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
    };
    
    const getButtonHoverStyles = (userButton: any, defaultButton: any) => {
      const button = userButton || defaultButton;
      return {
        background: getColor(button.hover?.background, defaultButton.hover.background),
        color: getColor(button.hover?.text, defaultButton.hover.text),
        borderColor: getColor(button.hover?.border, defaultButton.hover.border),
      };
    };

    return {
      background: { backgroundColor: getColor(userColors?.background, defaults.background) },
      title: { color: getColor(userColors?.title, defaults.title) },
      description: { color: getColor(userColors?.description, defaults.description) },
      primaryButton: getButtonStyles(userColors?.primaryButton, defaults.primaryButton),
      primaryButtonHover: getButtonHoverStyles(userColors?.primaryButton, defaults.primaryButton),
      secondaryButton: getButtonStyles(userColors?.secondaryButton, defaults.secondaryButton),
      secondaryButtonHover: getButtonHoverStyles(userColors?.secondaryButton, defaults.secondaryButton)
    };
  }, [userColors, theme]);
};

interface ActionButtonProps {
  text: string;
  href: string;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  baseStyles: React.CSSProperties;
  hoverStyles: React.CSSProperties;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, href, size = 'lg', icon, baseStyles, hoverStyles }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div className="{{tokens.responsive.width}}">
      <SimpleButton
        variant="basic"
        size={size}
        fullWidth
        className="md:w-auto {{tokens.effects.button}}"
        style={isHovered ? { ...baseStyles, ...hoverStyles } : baseStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        linkTo={href}
        icon={icon}
      >
        {text}
      </SimpleButton>
    </div>
  );
};

const {{component_id}}: React.FC<Hero_01Props> = (props = {}) => {
  const { theme } = useTheme();
  
  const validation = validateHero01Props(props);
  const sanitized = sanitizeProps(props);
  
  if (process.env.NODE_ENV === 'development' && !validation.valid) {
    console.warn('{{component_id}} validation errors:', validation.errors);
  }
  
  const title = sanitized.title || meta.defaults.title;
  const description = sanitized.description || meta.defaults.description;
  const animated = sanitized.animated !== undefined ? sanitized.animated : meta.defaults.animated;
  const className = sanitized.className || "";
  
  const primaryCTA = {
    text: sanitized.primaryCTA?.text || meta.defaults.primaryCTA.text,
    href: sanitized.primaryCTA?.href || meta.defaults.primaryCTA.href,
    size: (sanitized.primaryCTA?.size || meta.defaults.primaryCTA.size) as "sm" | "md" | "lg",
    icon: sanitized.primaryCTA?.icon
  };
  
  const hasSecondaryCTA = sanitized.secondaryCTA !== undefined || !('secondaryCTA' in sanitized);
  const secondaryCTA = hasSecondaryCTA ? {
    text: sanitized.secondaryCTA?.text || "{{defaults.secondaryCTA.text}}",
    href: sanitized.secondaryCTA?.href || "{{defaults.secondaryCTA.href}}",
    size: (sanitized.secondaryCTA?.size || "lg") as "sm" | "md" | "lg",
    icon: sanitized.secondaryCTA?.icon
  } : undefined;
  
  const image = sanitized.image || meta.defaults.image;
  const imageSrc = typeof image === 'string' ? image : image.src;
  const imageAlt = typeof image === 'object' ? (image.alt || "{{defaults.imageAlt}}") : "{{defaults.imageAlt}}";
  
  const styles = useComponentStyles(sanitized.colors, theme);

  return (
    <section className={\`{{tokens.layout.section}} \${className}\`} style={styles.background}>
      <div className="{{tokens.layout.grid}}">
        <motion.div
          className="{{tokens.layout.contentColumn}} {{tokens.spacing.containerX}} {{tokens.spacing.containerY}}"
          {...getAnimationProps(fadeInUp, 0, 0.3, animated)}
        >
          <div className="{{tokens.layout.contentContainer}} {{tokens.spacing.contentSpacing}}">
            <motion.div {...getAnimationProps(fadeInUp, 0, 0, animated)}>
              <Heading level="h1" weight="bold" className="{{tokens.typography.heading}}" style={styles.title}>
                {title}
              </Heading>
            </motion.div>
            
            <motion.div {...getAnimationProps(fadeInUp, 0.1, 0, animated)}>
              <Para size="md" className="{{tokens.typography.body}}" style={styles.description}>
                {description}
              </Para>
            </motion.div>
            
            <motion.div className="{{tokens.responsive.flexDirection}} {{tokens.spacing.buttonSpacing}}" {...getAnimationProps(fadeInUp, 0.2, 0, animated)}>
              <ActionButton
                text={primaryCTA.text}
                href={primaryCTA.href}
                size={primaryCTA.size}
                icon={primaryCTA.icon}
                baseStyles={styles.primaryButton}
                hoverStyles={styles.primaryButtonHover}
              />
              {secondaryCTA && (
                <ActionButton
                  text={secondaryCTA.text}
                  href={secondaryCTA.href}
                  size={secondaryCTA.size}
                  icon={secondaryCTA.icon}
                  baseStyles={styles.secondaryButton}
                  hoverStyles={styles.secondaryButtonHover}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
        
        <div className="{{tokens.layout.imageColumn}}">
          <motion.div className="{{tokens.layout.imageContainer}}" {...getAnimationProps(fadeIn, 0, 0.3, animated)}>
            <img
              src={imageSrc}
              alt={imageAlt}
              className="{{tokens.image.classes}}"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

{{component_id}}.displayName = '{{component_id}}';
export default {{component_id}};`
    },

    // === Development Config ===
    development: {
        storybook: {
            title: "Components/Hero/Hero_01",
            category: "Layout"
        },
        testing: {
            testIds: ["hero-title", "hero-cta-primary", "hero-cta-secondary", "hero-image"],
            accessibilityTests: true
        },
        documentation: {
            designNotes: "Primary conversion component for landing pages with split layout",
            usageGuidelines: "Use for product introductions and value propositions. Colors are fully customizable via props."
        }
    }
};

export default meta;