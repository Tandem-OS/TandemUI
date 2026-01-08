/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
            "background": {
                  "primary": "var(--background-primary)",
                  "primary-2": "var(--background-primary-2)",
                  "secondary": "var(--background-secondary)",
                  "secondary-2": "var(--background-secondary-2)",
                  "primary-3": "var(--background-primary-3)",
                  "muted": "var(--background-muted)",
                  "muted-low": "var(--background-muted-low)",
                  "accent": "var(--background-accent)",
                  "success": "var(--background-success)",
                  "error": "var(--background-error)",
                  "warning": "var(--background-warning)",
                  "info": "var(--background-info)",
                  "dark": "var(--background-dark)",
                  "pastel-green": "var(--background-pastel-green)",
                  "red": "var(--background-red)"
            },
            "text": {
                  "primary": "var(--text-primary)",
                  "secondary": "var(--text-secondary)",
                  "tertiary": "var(--text-tertiary)",
                  "on-accent": "var(--text-on-accent)",
                  "success": "var(--text-success)",
                  "error": "var(--text-error)",
                  "warning": "var(--text-warning)",
                  "info": "var(--text-info)",
                  "light": "var(--text-light)",
                  "lightSecondary": "var(--text-lightSecondary)"
            },
            "border": {
                  "default": "var(--border-default)",
                  "focus": "var(--border-focus)",
                  "muted": "var(--border-muted)",
                  "dark": "var(--border-dark)",
                  "success": "var(--border-success)",
                  "error": "var(--border-error)",
                  "warning": "var(--border-warning)",
                  "info": "var(--border-info)"
            },
            "accent": {
                  "default": "var(--accent-default)",
                  "hover": "var(--accent-hover)",
                  "subtle": "var(--accent-subtle)",
                  "foreground": "var(--accent-foreground)"
            }
      },
      borderRadius: {
            "none": "0px",
            "2xs": "2px",
            "xs": "3px",
            "sm": "4px",
            "sm-md": "6px",
            "md": "8px",
            "md-lg": "10px",
            "lg": "12px",
            "lg-xl": "14px",
            "xl": "16px",
            "xl-2xl": "20px",
            "2xl": "24px",
            "2xl-3xl": "28px",
            "3xl": "32px",
            "4xl": "40px",
            "5xl": "48px",
            "full": "9999px"
      },
      borderWidth: {
            "0": "0px",
            "hairline": "1px",
            "sm": "2px",
            "md": "4px",
            "lg": "8px",
            "xl": "12px"
      },
      // NEW: Added Typography
      fontSize: {
            "para-xs": "0.675rem",
            "para-sm": "0.875rem",
            "para-md": "1rem",
            "para-lg": "1.125rem",
            "para-xl": "1.25rem",
            "h1-sm": "2.25rem",
            "h1-md": "3rem",
            "h1-lg": "4rem",
            "h2-sm": "1.875rem",
            "h2-md": "2.25rem",
            "h2-lg": "3rem",
            "h3-sm": "1.5rem",
            "h3-md": "1.875rem",
            "h3-lg": "2.25rem",
            "h4-sm": "1.25rem",
            "h4-md": "1.5rem",
            "h4-lg": "1.875rem",
            "h5-sm": "1.125rem",
            "h5-md": "1.25rem",
            "h5-lg": "1.5rem",
            "h6-sm": "1rem",
            "h6-md": "1.125rem",
            "h6-lg": "1.25rem",
            "h7-sm": "0.875rem",
            "h7-md": "1rem",
            "h7-lg": "1.125rem",
            "btn-sm": "1rem",
            "btn-md": "1.125rem",
            "btn-lg": "1.25rem",
            "icon-sm": "1rem",
            "icon-md": "1.25rem",
            "icon-lg": "1.5rem",
            "icon-xl": "2rem",
            "icon-2xl": "3rem"
      },
      lineHeight: {
            "none": "1",
            "tight": "1.25",
            "snug": "1.375",
            "normal": "1.5",
            "relaxed": "1.625",
            "loose": "2"
      },
      fontFamily: {
            "sans": "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            "serif": "Georgia, Cambria, 'Times New Roman', Times, serif",
            "mono": "'Roboto Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
      },
      maxWidth: {
            "0": "0px",
            "none": "none",
            "xs": "320px",
            "sm": "384px",
            "md": "448px",
            "lg": "512px",
            "xl": "576px",
            "2xl": "672px",
            "3xl": "768px",
            "4xl": "896px",
            "5xl": "1024px",
            "6xl": "1152px",
            "7xl": "1280px",
            "8xl": "1408px",
            "full": "100%",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content",
            "prose": "65ch",
            "screen-sm": "640px",
            "screen-md": "768px",
            "screen-lg": "1024px",
            "screen-xl": "1280px",
            "screen-2xl": "1536px"
      },
      minWidth: {
            "0": "0px",
            "full": "100%",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
      },
      width: {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "auto": "auto",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "1/5": "20%",
            "2/5": "40%",
            "3/5": "60%",
            "4/5": "80%",
            "1/6": "16.666667%",
            "2/6": "33.333333%",
            "3/6": "50%",
            "4/6": "66.666667%",
            "5/6": "83.333333%",
            "1/12": "8.333333%",
            "2/12": "16.666667%",
            "3/12": "25%",
            "4/12": "33.333333%",
            "5/12": "41.666667%",
            "6/12": "50%",
            "7/12": "58.333333%",
            "8/12": "66.666667%",
            "9/12": "75%",
            "10/12": "83.333333%",
            "11/12": "91.666667%",
            "full": "100%",
            "screen": "100vw",
            "svw": "100svw",
            "lvw": "100lvw",
            "dvw": "100dvw",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
      },
      maxHeight: {
            "0": "0px",
            "full": "100%",
            "screen": "100vh",
            "svh": "100svh",
            "lvh": "100lvh",
            "dvh": "100dvh",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
      },
      minHeight: {
            "0": "0px",
            "full": "100%",
            "screen": "100vh",
            "svh": "100svh",
            "lvh": "100lvh",
            "dvh": "100dvh",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
      },
      height: {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "auto": "auto",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "1/5": "20%",
            "2/5": "40%",
            "3/5": "60%",
            "4/5": "80%",
            "1/6": "16.666667%",
            "2/6": "33.333333%",
            "3/6": "50%",
            "4/6": "66.666667%",
            "5/6": "83.333333%",
            "full": "100%",
            "screen": "100vh",
            "svh": "100svh",
            "lvh": "100lvh",
            "dvh": "100dvh",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
      },
      aspectRatio: {
            "auto": "auto",
            "square": "1 / 1",
            "video": "16 / 9",
            "cinema": "21 / 9",
            "ultrawide": "32 / 9",
            "portrait": "3 / 4",
            "landscape": "4 / 3",
            "photo": "3 / 2",
            "widescreen": "16 / 10",
            "golden": "1.618 / 1",
            "poster": "2 / 3",
            "instagram": "4 / 5",
            "card": "5 / 7",
            "a4": "1 / 1.414"
      },
      inset: {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "auto": "auto",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "full": "100%"
      },
      objectFit: {
            "contain": "contain",
            "cover": "cover",
            "fill": "fill",
            "none": "none",
            "scaleDown": "scale-down"
      },
      objectPosition: {
            "bottom": "bottom",
            "center": "center",
            "left": "left",
            "leftBottom": "left bottom",
            "leftTop": "left top",
            "right": "right",
            "rightBottom": "right bottom",
            "rightTop": "right top",
            "top": "top"
      },
      overflow: {
            "auto": "auto",
            "hidden": "hidden",
            "clip": "clip",
            "visible": "visible",
            "scroll": "scroll"
      },
      backgroundImage: {
            "primitive-linear-primary": "var(--gradient-primitive-linear-primary)",
            "primitive-linear-primaryToSecondary": "var(--gradient-primitive-linear-primaryToSecondary)",
            "primitive-linear-primaryToTertiary": "var(--gradient-primitive-linear-primaryToTertiary)",
            "primitive-linear-secondaryToTertiary": "var(--gradient-primitive-linear-secondaryToTertiary)",
            "primitive-linear-rainbow": "var(--gradient-primitive-linear-rainbow)",
            "primitive-linear-neutral": "var(--gradient-primitive-linear-neutral)",
            "primitive-linear-shine": "var(--gradient-primitive-linear-shine)",
            "primitive-linear-glass": "var(--gradient-primitive-linear-glass)",
            "primitive-radial-primary": "var(--gradient-primitive-radial-primary)",
            "primitive-radial-spotlight": "var(--gradient-primitive-radial-spotlight)",
            "primitive-radial-glow": "var(--gradient-primitive-radial-glow)",
            "primitive-conic-rainbow": "var(--gradient-primitive-conic-rainbow)",
            "primitive-mesh-hero": "var(--gradient-primitive-mesh-hero)",
            "primitive-mesh-subtle": "var(--gradient-primitive-mesh-subtle)",
            "hero-primary": "var(--gradient-hero-primary)",
            "hero-primaryAccent": "var(--gradient-hero-primaryAccent)",
            "hero-primaryTertiary": "var(--gradient-hero-primaryTertiary)",
            "hero-secondaryTertiary": "var(--gradient-hero-secondaryTertiary)",
            "hero-rainbow": "var(--gradient-hero-rainbow)",
            "hero-mesh": "var(--gradient-hero-mesh)",
            "background-subtle": "var(--gradient-background-subtle)",
            "background-neutral": "var(--gradient-background-neutral)",
            "background-primaryTint": "var(--gradient-background-primaryTint)",
            "background-secondaryTint": "var(--gradient-background-secondaryTint)",
            "background-tertiaryTint": "var(--gradient-background-tertiaryTint)",
            "background-mesh": "var(--gradient-background-mesh)",
            "card-glass": "var(--gradient-card-glass)",
            "card-glassBorder": "var(--gradient-card-glassBorder)",
            "card-hover": "var(--gradient-card-hover)",
            "card-active": "var(--gradient-card-active)",
            "card-selected": "var(--gradient-card-selected)",
            "button-primary": "var(--gradient-button-primary)",
            "button-primaryHover": "var(--gradient-button-primaryHover)",
            "button-primaryActive": "var(--gradient-button-primaryActive)",
            "button-secondary": "var(--gradient-button-secondary)",
            "button-secondaryHover": "var(--gradient-button-secondaryHover)",
            "button-secondaryActive": "var(--gradient-button-secondaryActive)",
            "button-accent": "var(--gradient-button-accent)",
            "button-accentHover": "var(--gradient-button-accentHover)",
            "button-accentActive": "var(--gradient-button-accentActive)",
            "button-ghost": "var(--gradient-button-ghost)",
            "button-ghostHover": "var(--gradient-button-ghostHover)",
            "button-shine": "var(--gradient-button-shine)",
            "text-gradient": "var(--gradient-text-gradient)",
            "text-gradientAlt": "var(--gradient-text-gradientAlt)",
            "text-gradientAccent": "var(--gradient-text-gradientAccent)",
            "text-brand": "var(--gradient-text-brand)",
            "overlay-scrim": "var(--gradient-overlay-scrim)",
            "overlay-scrimTop": "var(--gradient-overlay-scrimTop)",
            "overlay-scrimBottom": "var(--gradient-overlay-scrimBottom)",
            "overlay-scrimLeft": "var(--gradient-overlay-scrimLeft)",
            "overlay-scrimRight": "var(--gradient-overlay-scrimRight)",
            "overlay-vignette": "var(--gradient-overlay-vignette)",
            "overlay-spotlight": "var(--gradient-overlay-spotlight)",
            "overlay-fade": "var(--gradient-overlay-fade)",
            "status-success": "var(--gradient-status-success)",
            "status-successSubtle": "var(--gradient-status-successSubtle)",
            "status-error": "var(--gradient-status-error)",
            "status-errorSubtle": "var(--gradient-status-errorSubtle)",
            "status-warning": "var(--gradient-status-warning)",
            "status-warningSubtle": "var(--gradient-status-warningSubtle)",
            "status-info": "var(--gradient-status-info)",
            "status-infoSubtle": "var(--gradient-status-infoSubtle)",
            "decorative-glow-primary": "var(--gradient-decorative-glow-primary)",
            "decorative-glow-secondary": "var(--gradient-decorative-glow-secondary)",
            "decorative-glow-tertiary": "var(--gradient-decorative-glow-tertiary)",
            "decorative-glow-success": "var(--gradient-decorative-glow-success)",
            "decorative-glow-error": "var(--gradient-decorative-glow-error)",
            "decorative-glow-warning": "var(--gradient-decorative-glow-warning)",
            "decorative-glow-info": "var(--gradient-decorative-glow-info)",
            "decorative-shimmer": "var(--gradient-decorative-shimmer)",
            "decorative-shine": "var(--gradient-decorative-shine)",
            "decorative-noise": "var(--gradient-decorative-noise)",
            "decorative-aurora": "var(--gradient-decorative-aurora)",
            "navigation-header": "var(--gradient-navigation-header)",
            "navigation-headerGlass": "var(--gradient-navigation-headerGlass)",
            "navigation-sidebar": "var(--gradient-navigation-sidebar)",
            "navigation-footer": "var(--gradient-navigation-footer)",
            "input-default": "var(--gradient-input-default)",
            "input-focus": "var(--gradient-input-focus)",
            "input-error": "var(--gradient-input-error)",
            "input-success": "var(--gradient-input-success)",
            "chart-area": "var(--gradient-chart-area)",
            "chart-line": "var(--gradient-chart-line)",
            "chart-bar": "var(--gradient-chart-bar)",
            "chart-pie": "var(--gradient-chart-pie)"
      },
      boxShadow: {
            "elevation-none": "var(--shadow-elevation-none)",
            "elevation-xs": "var(--shadow-elevation-xs)",
            "elevation-sm": "var(--shadow-elevation-sm)",
            "elevation-md": "var(--shadow-elevation-md)",
            "elevation-lg": "var(--shadow-elevation-lg)",
            "elevation-xl": "var(--shadow-elevation-xl)",
            "elevation-2xl": "var(--shadow-elevation-2xl)",
            "card-default": "var(--shadow-card-default)",
            "card-hover": "var(--shadow-card-hover)",
            "card-active": "var(--shadow-card-active)",
            "card-selected": "var(--shadow-card-selected)",
            "card-disabled": "var(--shadow-card-disabled)",
            "button-default": "var(--shadow-button-default)",
            "button-hover": "var(--shadow-button-hover)",
            "button-active": "var(--shadow-button-active)",
            "button-disabled": "var(--shadow-button-disabled)",
            "input-default": "var(--shadow-input-default)",
            "input-hover": "var(--shadow-input-hover)",
            "input-focus": "var(--shadow-input-focus)",
            "input-error": "var(--shadow-input-error)",
            "input-disabled": "var(--shadow-input-disabled)",
            "dropdown-default": "var(--shadow-dropdown-default)",
            "dropdown-hover": "var(--shadow-dropdown-hover)",
            "modal-backdrop": "var(--shadow-modal-backdrop)",
            "modal-content": "var(--shadow-modal-content)",
            "popover-default": "var(--shadow-popover-default)",
            "tooltip-default": "var(--shadow-tooltip-default)",
            "navigation-sticky": "var(--shadow-navigation-sticky)",
            "navigation-fixed": "var(--shadow-navigation-fixed)",
            "navigation-floating": "var(--shadow-navigation-floating)",
            "focus-default": "var(--shadow-focus-default)",
            "focus-error": "var(--shadow-focus-error)",
            "focus-success": "var(--shadow-focus-success)",
            "focus-warning": "var(--shadow-focus-warning)",
            "focus-info": "var(--shadow-focus-info)",
            "glow-primary": "var(--shadow-glow-primary)",
            "glow-secondary": "var(--shadow-glow-secondary)",
            "glow-tertiary": "var(--shadow-glow-tertiary)",
            "glow-success": "var(--shadow-glow-success)",
            "glow-error": "var(--shadow-glow-error)",
            "glow-warning": "var(--shadow-glow-warning)",
            "glow-info": "var(--shadow-glow-info)",
            "colored-primary-sm": "var(--shadow-colored-primary-sm)",
            "colored-primary-md": "var(--shadow-colored-primary-md)",
            "colored-primary-lg": "var(--shadow-colored-primary-lg)",
            "colored-secondary-sm": "var(--shadow-colored-secondary-sm)",
            "colored-secondary-md": "var(--shadow-colored-secondary-md)",
            "colored-secondary-lg": "var(--shadow-colored-secondary-lg)",
            "colored-tertiary-sm": "var(--shadow-colored-tertiary-sm)",
            "colored-tertiary-md": "var(--shadow-colored-tertiary-md)",
            "colored-tertiary-lg": "var(--shadow-colored-tertiary-lg)",
            "colored-success-sm": "var(--shadow-colored-success-sm)",
            "colored-success-md": "var(--shadow-colored-success-md)",
            "colored-success-lg": "var(--shadow-colored-success-lg)",
            "colored-error-sm": "var(--shadow-colored-error-sm)",
            "colored-error-md": "var(--shadow-colored-error-md)",
            "colored-error-lg": "var(--shadow-colored-error-lg)",
            "colored-warning-sm": "var(--shadow-colored-warning-sm)",
            "colored-warning-md": "var(--shadow-colored-warning-md)",
            "colored-warning-lg": "var(--shadow-colored-warning-lg)",
            "inner-default": "var(--shadow-inner-default)",
            "inner-subtle": "var(--shadow-inner-subtle)"
      },
      zIndex: {
            "base": 0,
            "dropdown": 50,
            "sticky": 100,
            "header": 200,
            "overlay": 300,
            "modal": 400,
            "popover": 500,
            "toast": 600,
            "tooltip": 700,
            "content": 0
      },
      opacity: {
            "0": 0,
            "5": 0.05,
            "10": 0.1,
            "20": 0.2,
            "30": 0.3,
            "40": 0.4,
            "50": 0.5,
            "60": 0.6,
            "70": 0.7,
            "80": 0.8,
            "90": 0.9,
            "100": 1,
            "disabled": 0.4,
            "muted": 0.6,
            "subtle": 0.8,
            "overlay-light": 0.5,
            "overlay-medium": 0.7,
            "overlay-heavy": 0.9,
            "hover": 0.1,
            "skeleton": 0.2
      },
      spacing: {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "none": "0",
            "hairline": "1px",
            "xs": "0.25rem",
            "sm": "0.5rem",
            "md": "1rem",
            "lg": "1.5rem",
            "xl": "2rem",
            "2xl": "3rem",
            "3xl": "4rem",
            "4xl": "5rem",
            "5xl": "6rem"
      },
      transitionDuration: {
            "0": "0ms",
            "50": "50ms",
            "75": "75ms",
            "100": "100ms",
            "150": "150ms",
            "200": "200ms",
            "300": "300ms",
            "400": "400ms",
            "500": "500ms",
            "700": "700ms",
            "1000": "1000ms"
      },
      transitionTimingFunction: {
            "linear": "linear",
            "in": "cubic-bezier(0.4, 0, 1, 1)",
            "out": "cubic-bezier(0, 0, 0.2, 1)",
            "inOut": "cubic-bezier(0.4, 0, 0.2, 1)",
            "standard": "cubic-bezier(0.4, 0.0, 0.2, 1)",
            "emphasized": "cubic-bezier(0.2, 0.0, 0.0, 1.0)",
            "decelerate": "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
            "accelerate": "cubic-bezier(0.4, 0.0, 1.0, 1.0)"
      },
      gap: {
            "0": "0px",
            "1": "4px",
            "2": "8px",
            "3": "12px",
            "4": "16px",
            "5": "20px",
            "6": "24px",
            "8": "32px",
            "10": "40px",
            "12": "48px",
            "16": "64px",
            "20": "80px",
            "24": "96px",
            "32": "128px"
      },
      gridTemplateColumns: {
            "none": "none",
            "subgrid": "subgrid",
            "1fr": "1fr",
            "2fr": "repeat(2, 1fr)",
            "3fr": "repeat(3, 1fr)",
            "4fr": "repeat(4, 1fr)",
            "5fr": "repeat(5, 1fr)",
            "6fr": "repeat(6, 1fr)",
            "7fr": "repeat(7, 1fr)",
            "8fr": "repeat(8, 1fr)",
            "9fr": "repeat(9, 1fr)",
            "10fr": "repeat(10, 1fr)",
            "11fr": "repeat(11, 1fr)",
            "12fr": "repeat(12, 1fr)",
            "sidebar": "250px 1fr",
            "sidebarReverse": "1fr 250px",
            "twoColumn": "1fr 1fr",
            "threeColumn": "1fr 1fr 1fr",
            "fourColumn": "1fr 1fr 1fr 1fr",
            "goldenRatio": "1.618fr 1fr",
            "60-40": "3fr 2fr",
            "70-30": "7fr 3fr",
            "2-1": "2fr 1fr",
            "1-2": "1fr 2fr",
            "autoFit200": "repeat(auto-fit, minmax(200px, 1fr))",
            "autoFit250": "repeat(auto-fit, minmax(250px, 1fr))",
            "autoFit300": "repeat(auto-fit, minmax(300px, 1fr))",
            "autoFill200": "repeat(auto-fill, minmax(200px, 1fr))",
            "autoFill250": "repeat(auto-fill, minmax(250px, 1fr))",
            "autoFill300": "repeat(auto-fill, minmax(300px, 1fr))"
      },
      gridTemplateRows: {
            "none": "none",
            "subgrid": "subgrid",
            "1fr": "1fr",
            "2fr": "repeat(2, 1fr)",
            "3fr": "repeat(3, 1fr)",
            "4fr": "repeat(4, 1fr)",
            "5fr": "repeat(5, 1fr)",
            "6fr": "repeat(6, 1fr)",
            "header-content-footer": "auto 1fr auto",
            "nav-content": "auto 1fr",
            "hero-content": "minmax(500px, 1fr) auto"
      },
      gridColumn: {
            "1": "span 1 / span 1",
            "2": "span 2 / span 2",
            "3": "span 3 / span 3",
            "4": "span 4 / span 4",
            "5": "span 5 / span 5",
            "6": "span 6 / span 6",
            "7": "span 7 / span 7",
            "8": "span 8 / span 8",
            "9": "span 9 / span 9",
            "10": "span 10 / span 10",
            "11": "span 11 / span 11",
            "12": "span 12 / span 12",
            "auto": "auto",
            "full": "1 / -1"
      },
      gridColumnStart: {
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "10": 10,
            "11": 11,
            "12": 12,
            "13": 13,
            "auto": "auto"
      },
      gridColumnEnd: {
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "10": 10,
            "11": 11,
            "12": 12,
            "13": 13,
            "auto": "auto"
      },
      gridRow: {
            "1": "span 1 / span 1",
            "2": "span 2 / span 2",
            "3": "span 3 / span 3",
            "4": "span 4 / span 4",
            "5": "span 5 / span 5",
            "6": "span 6 / span 6",
            "auto": "auto",
            "full": "1 / -1"
      },
      gridRowStart: {
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "auto": "auto"
      },
      gridRowEnd: {
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "auto": "auto"
      },
      gridAutoFlow: {
            "row": "row",
            "col": "column",
            "rowDense": "row dense",
            "colDense": "column dense"
      },
      flex: {
            "1": "1 1 0%",
            "auto": "1 1 auto",
            "initial": "0 1 auto",
            "none": "none"
      },
      flexBasis: {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "8": "2rem",
            "10": "2.5rem",
            "12": "3rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "32": "8rem",
            "40": "10rem",
            "48": "12rem",
            "56": "14rem",
            "64": "16rem",
            "auto": "auto",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "1/5": "20%",
            "2/5": "40%",
            "3/5": "60%",
            "4/5": "80%",
            "1/6": "16.666667%",
            "2/6": "33.333333%",
            "3/6": "50%",
            "4/6": "66.666667%",
            "5/6": "83.333333%",
            "1/12": "8.333333%",
            "2/12": "16.666667%",
            "3/12": "25%",
            "4/12": "33.333333%",
            "5/12": "41.666667%",
            "6/12": "50%",
            "7/12": "58.333333%",
            "8/12": "66.666667%",
            "9/12": "75%",
            "10/12": "83.333333%",
            "11/12": "91.666667%",
            "full": "100%"
      },
      flexDirection: {
            "row": "row",
            "rowReverse": "row-reverse",
            "col": "column",
            "colReverse": "column-reverse"
      },
      flexGrow: {
            "0": 0,
            "1": 1
      },
      flexShrink: {
            "0": 0,
            "1": 1
      },
      flexWrap: {
            "wrap": "wrap",
            "wrapReverse": "wrap-reverse",
            "nowrap": "nowrap"
      },
      order: {
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "10": 10,
            "11": 11,
            "12": 12,
            "first": -9999,
            "last": 9999,
            "none": 0
      },
      justifyContent: {
            "normal": "normal",
            "start": "flex-start",
            "end": "flex-end",
            "center": "center",
            "between": "space-between",
            "around": "space-around",
            "evenly": "space-evenly",
            "stretch": "stretch"
      },
      justifyItems: {
            "start": "start",
            "end": "end",
            "center": "center",
            "stretch": "stretch"
      },
      justifySelf: {
            "auto": "auto",
            "start": "start",
            "end": "end",
            "center": "center",
            "stretch": "stretch"
      },
      alignContent: {
            "normal": "normal",
            "start": "flex-start",
            "end": "flex-end",
            "center": "center",
            "between": "space-between",
            "around": "space-around",
            "evenly": "space-evenly",
            "baseline": "baseline",
            "stretch": "stretch"
      },
      alignItems: {
            "start": "flex-start",
            "end": "flex-end",
            "center": "center",
            "baseline": "baseline",
            "stretch": "stretch"
      },
      alignSelf: {
            "auto": "auto",
            "start": "flex-start",
            "end": "flex-end",
            "center": "center",
            "stretch": "stretch",
            "baseline": "baseline"
      },
      placeContent: {
            "center": "center",
            "start": "start",
            "end": "end",
            "between": "space-between",
            "around": "space-around",
            "evenly": "space-evenly",
            "baseline": "baseline",
            "stretch": "stretch"
      },
      placeItems: {
            "start": "start",
            "end": "end",
            "center": "center",
            "baseline": "baseline",
            "stretch": "stretch"
      },
      placeSelf: {
            "auto": "auto",
            "start": "start",
            "end": "end",
            "center": "center",
            "stretch": "stretch"
      }
    },
    screens: {
          "sm": "640px",
          "md": "768px",
          "lg": "1024px",
          "xl": "1280px",
          "2xl": "1536px"
    }
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
            ".layout-row": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "flex-start",
                  "flexWrap": "nowrap"
            },
            ".layout-rowReverse": {
                  "display": "flex",
                  "flexDirection": "row-reverse",
                  "alignItems": "center",
                  "justifyContent": "flex-start",
                  "flexWrap": "nowrap"
            },
            ".layout-column": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "stretch",
                  "justifyContent": "flex-start",
                  "flexWrap": "nowrap"
            },
            ".layout-columnReverse": {
                  "display": "flex",
                  "flexDirection": "column-reverse",
                  "alignItems": "stretch",
                  "justifyContent": "flex-start",
                  "flexWrap": "nowrap"
            },
            ".layout-center": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "center"
            },
            ".layout-centerColumn": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "center",
                  "justifyContent": "center"
            },
            ".layout-spaceBetween": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "space-between"
            },
            ".layout-spaceBetweenColumn": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "stretch",
                  "justifyContent": "space-between"
            },
            ".layout-spaceAround": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "space-around"
            },
            ".layout-spaceEvenly": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "space-evenly"
            },
            ".layout-wrap": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "flex-start",
                  "justifyContent": "flex-start",
                  "flexWrap": "wrap"
            },
            ".layout-wrapCenter": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "center",
                  "flexWrap": "wrap"
            },
            ".layout-baseline": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "baseline",
                  "justifyContent": "flex-start"
            },
            ".layout-stretch": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "stretch",
                  "justifyContent": "flex-start"
            },
            ".navbar": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "space-between",
                  "flexWrap": "nowrap"
            },
            ".navMenu": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "flex-start",
                  "flexWrap": "wrap",
                  "gap": "1rem"
            },
            ".buttonGroup": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "flex-start",
                  "flexWrap": "wrap",
                  "gap": "0.5rem"
            },
            ".cardHeader": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "space-between"
            },
            ".cardContent": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "stretch",
                  "justifyContent": "flex-start",
                  "gap": "1rem"
            },
            ".cardFooter": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "flex-end",
                  "gap": "0.5rem"
            },
            ".form": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "stretch",
                  "justifyContent": "flex-start",
                  "gap": "1.5rem"
            },
            ".formRow": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "flex-end",
                  "justifyContent": "flex-start",
                  "flexWrap": "wrap",
                  "gap": "1rem"
            },
            ".inputGroup": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "stretch",
                  "justifyContent": "flex-start",
                  "gap": "0.5rem"
            },
            ".modal": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "center",
                  "justifyContent": "center"
            },
            ".modalContent": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "stretch",
                  "justifyContent": "space-between"
            },
            ".toast": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "flex-start",
                  "justifyContent": "flex-start",
                  "gap": "0.75rem"
            },
            ".avatar": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "flex-start",
                  "gap": "0.75rem"
            },
            ".badge": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "center",
                  "gap": "0.25rem"
            },
            ".dropdown": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "stretch",
                  "justifyContent": "flex-start"
            },
            ".breadcrumbs": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "flex-start",
                  "flexWrap": "wrap",
                  "gap": "0.5rem"
            },
            ".tabs": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "flex-start",
                  "flexWrap": "nowrap",
                  "gap": "0"
            },
            ".statCard": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "flex-start",
                  "justifyContent": "space-between",
                  "gap": "0.5rem"
            },
            ".hero": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "center",
                  "justifyContent": "center",
                  "gap": "2rem"
            },
            ".heroSplit": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center",
                  "justifyContent": "space-between",
                  "flexWrap": "wrap",
                  "gap": "3rem"
            },
            ".footer": {
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "flex-start",
                  "justifyContent": "space-between",
                  "flexWrap": "wrap",
                  "gap": "2rem"
            },
            ".stickyFooter": {
                  "display": "flex",
                  "flexDirection": "column",
                  "alignItems": "stretch",
                  "justifyContent": "space-between",
                  "minHeight": "100vh"
            },
            ".container-page": {
                  "maxWidth": "1280px",
                  "paddingLeft": "1rem",
                  "paddingRight": "1rem",
                  "marginLeft": "auto",
                  "marginRight": "auto",
                  "width": "100%"
            },
            ".container-content": {
                  "maxWidth": "1024px",
                  "paddingLeft": "1rem",
                  "paddingRight": "1rem",
                  "marginLeft": "auto",
                  "marginRight": "auto",
                  "width": "100%"
            },
            ".container-prose": {
                  "maxWidth": "65ch",
                  "paddingLeft": "1.5rem",
                  "paddingRight": "1.5rem",
                  "marginLeft": "auto",
                  "marginRight": "auto",
                  "width": "100%"
            },
            ".container-narrow": {
                  "maxWidth": "672px",
                  "paddingLeft": "1rem",
                  "paddingRight": "1rem",
                  "marginLeft": "auto",
                  "marginRight": "auto",
                  "width": "100%"
            },
            ".container-wide": {
                  "maxWidth": "1536px",
                  "paddingLeft": "2rem",
                  "paddingRight": "2rem",
                  "marginLeft": "auto",
                  "marginRight": "auto",
                  "width": "100%"
            },
            ".container-full": {
                  "maxWidth": "100%",
                  "paddingLeft": "0",
                  "paddingRight": "0",
                  "marginLeft": "auto",
                  "marginRight": "auto",
                  "width": "100%"
            },
            ".container-fluid": {
                  "maxWidth": "100%",
                  "paddingLeft": "clamp(1rem, 5vw, 3rem)",
                  "paddingRight": "clamp(1rem, 5vw, 3rem)",
                  "marginLeft": "auto",
                  "marginRight": "auto",
                  "width": "100%"
            },
            ".section-hero": {
                  "minHeight": "100vh",
                  "paddingTop": "4rem",
                  "paddingBottom": "4rem"
            },
            ".section-standard": {
                  "paddingTop": "clamp(3rem, 8vw, 6rem)",
                  "paddingBottom": "clamp(3rem, 8vw, 6rem)"
            },
            ".section-compact": {
                  "paddingTop": "2rem",
                  "paddingBottom": "2rem"
            },
            ".section-spacious": {
                  "paddingTop": "clamp(6rem, 12vw, 10rem)",
                  "paddingBottom": "clamp(6rem, 12vw, 10rem)"
            },
            ".card-compact": {
                  "padding": "1rem",
                  "aspectRatio": "1 / 1"
            },
            ".card-standard": {
                  "padding": "1.5rem",
                  "aspectRatio": "5 / 7"
            },
            ".card-spacious": {
                  "padding": "2rem",
                  "aspectRatio": "4 / 3"
            },
            ".image-hero": {
                  "aspectRatio": "16 / 9",
                  "objectFit": "cover",
                  "objectPosition": "center"
            },
            ".image-thumbnail": {
                  "aspectRatio": "1 / 1",
                  "objectFit": "cover",
                  "objectPosition": "center"
            },
            ".image-coverPhoto": {
                  "aspectRatio": "4 / 3",
                  "objectFit": "cover",
                  "objectPosition": "center"
            },
            ".image-portrait": {
                  "aspectRatio": "3 / 4",
                  "objectFit": "cover",
                  "objectPosition": "top"
            },
            ".image-cinema": {
                  "aspectRatio": "21 / 9",
                  "objectFit": "cover",
                  "objectPosition": "center"
            },
            ".image-product": {
                  "aspectRatio": "1 / 1",
                  "objectFit": "contain",
                  "objectPosition": "center"
            },
            ".modal-small": {
                  "maxWidth": "448px",
                  "maxHeight": "90vh"
            },
            ".modal-medium": {
                  "maxWidth": "672px",
                  "maxHeight": "90vh"
            },
            ".modal-large": {
                  "maxWidth": "1024px",
                  "maxHeight": "90vh"
            },
            ".modal-fullscreen": {
                  "maxWidth": "100%",
                  "maxHeight": "100vh"
            },
            ".sidebar-narrow": {
                  "width": "250px",
                  "minWidth": "250px"
            },
            ".sidebar-standard": {
                  "width": "280px",
                  "minWidth": "280px"
            },
            ".sidebar-wide": {
                  "width": "320px",
                  "minWidth": "320px"
            },
            ".header-compact": {
                  "height": "56px",
                  "minHeight": "56px"
            },
            ".header-standard": {
                  "height": "64px",
                  "minHeight": "64px"
            },
            ".header-tall": {
                  "height": "80px",
                  "minHeight": "80px"
            },
            ".footer-compact": {
                  "paddingTop": "2rem",
                  "paddingBottom": "2rem"
            },
            ".footer-standard": {
                  "paddingTop": "4rem",
                  "paddingBottom": "4rem"
            },
            ".footer-expanded": {
                  "paddingTop": "6rem",
                  "paddingBottom": "6rem"
            },
            ".grid-singleColumn": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "24px"
            },
            "@media (min-width: 768px)": {
                  ".grid-singleColumn": {
                        "display": "grid",
                        "gridTemplateColumns": "1fr",
                        "gap": "32px"
                  },
                  ".grid-twoColumn": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(2, 1fr)",
                        "gap": "24px"
                  },
                  ".grid-threeColumn": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(2, 1fr)",
                        "gap": "24px"
                  },
                  ".grid-fourColumn": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(2, 1fr)",
                        "gap": "24px"
                  },
                  ".grid-autoFit": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(auto-fit, minmax(250px, 1fr))",
                        "gap": "24px"
                  },
                  ".grid-dashboard": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(6, 1fr)",
                        "gap": "16px"
                  },
                  ".grid-masonry": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(2, 1fr)",
                        "gap": "16px",
                        "gridAutoFlow": "row dense"
                  },
                  ".grid-pattern-features": {
                        "display": "grid",
                        "gridTemplateColumns": 2,
                        "gap": "32px"
                  },
                  ".grid-pattern-pricing": {
                        "display": "grid",
                        "gridTemplateColumns": 2,
                        "gap": "24px"
                  },
                  ".grid-pattern-testimonials": {
                        "display": "grid",
                        "gridTemplateColumns": 2,
                        "gap": "32px"
                  },
                  ".grid-pattern-gallery": {
                        "display": "grid",
                        "gridTemplateColumns": 3,
                        "gap": "16px"
                  },
                  ".grid-pattern-blog": {
                        "display": "grid",
                        "gridTemplateColumns": 2,
                        "gap": "32px"
                  }
            },
            "@media (min-width: 1024px)": {
                  ".grid-singleColumn": {
                        "display": "grid",
                        "gridTemplateColumns": "1fr",
                        "gap": "48px"
                  },
                  ".grid-twoColumn": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(2, 1fr)",
                        "gap": "48px"
                  },
                  ".grid-threeColumn": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(3, 1fr)",
                        "gap": "32px"
                  },
                  ".grid-fourColumn": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(4, 1fr)",
                        "gap": "32px"
                  },
                  ".grid-autoFit": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(auto-fit, minmax(300px, 1fr))",
                        "gap": "32px"
                  },
                  ".grid-sidebar": {
                        "display": "grid",
                        "gridTemplateColumns": "250px 1fr",
                        "gap": "32px"
                  },
                  ".grid-sidebarReverse": {
                        "display": "grid",
                        "gridTemplateColumns": "1fr 250px",
                        "gap": "32px"
                  },
                  ".grid-dashboard": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(12, 1fr)",
                        "gap": "24px"
                  },
                  ".grid-asymmetric60-40": {
                        "display": "grid",
                        "gridTemplateColumns": "3fr 2fr",
                        "gap": "48px"
                  },
                  ".grid-asymmetric70-30": {
                        "display": "grid",
                        "gridTemplateColumns": "7fr 3fr",
                        "gap": "32px"
                  },
                  ".grid-goldenRatio": {
                        "display": "grid",
                        "gridTemplateColumns": "1.618fr 1fr",
                        "gap": "48px"
                  },
                  ".grid-masonry": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(3, 1fr)",
                        "gap": "24px",
                        "gridAutoFlow": "row dense"
                  },
                  ".grid-holyGrail": {
                        "display": "grid",
                        "gridTemplateRows": "auto 1fr auto",
                        "gridTemplateColumns": "auto 1fr auto",
                        "gap": "0px"
                  },
                  ".grid-pattern-hero": {
                        "display": "grid",
                        "gridTemplateColumns": 2,
                        "gap": "48px"
                  },
                  ".grid-pattern-features": {
                        "display": "grid",
                        "gridTemplateColumns": 3,
                        "gap": "40px"
                  },
                  ".grid-pattern-pricing": {
                        "display": "grid",
                        "gridTemplateColumns": 3,
                        "gap": "32px"
                  },
                  ".grid-pattern-testimonials": {
                        "display": "grid",
                        "gridTemplateColumns": 3,
                        "gap": "40px"
                  },
                  ".grid-pattern-gallery": {
                        "display": "grid",
                        "gridTemplateColumns": 4,
                        "gap": "24px"
                  },
                  ".grid-pattern-blog": {
                        "display": "grid",
                        "gridTemplateColumns": 3,
                        "gap": "40px"
                  }
            },
            ".grid-twoColumn": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "16px"
            },
            ".grid-threeColumn": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "16px"
            },
            ".grid-fourColumn": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "16px"
            },
            ".grid-autoFit": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "16px"
            },
            ".grid-sidebar": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "24px"
            },
            ".grid-sidebarReverse": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "24px"
            },
            ".grid-dashboard": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "16px"
            },
            ".grid-asymmetric60-40": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "24px"
            },
            ".grid-asymmetric70-30": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "24px"
            },
            ".grid-goldenRatio": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "24px"
            },
            ".grid-masonry": {
                  "display": "grid",
                  "gridTemplateColumns": "1fr",
                  "gap": "16px",
                  "gridAutoFlow": "row dense"
            },
            ".grid-holyGrail": {
                  "display": "grid",
                  "gridTemplateRows": "auto 1fr auto",
                  "gridTemplateColumns": "1fr",
                  "gap": "0px"
            },
            ".grid-pattern-hero": {
                  "display": "grid",
                  "gridTemplateColumns": 1,
                  "gap": "32px"
            },
            ".grid-pattern-features": {
                  "display": "grid",
                  "gridTemplateColumns": 1,
                  "gap": "24px"
            },
            ".grid-pattern-pricing": {
                  "display": "grid",
                  "gridTemplateColumns": 1,
                  "gap": "32px"
            },
            ".grid-pattern-testimonials": {
                  "display": "grid",
                  "gridTemplateColumns": 1,
                  "gap": "24px"
            },
            ".grid-pattern-gallery": {
                  "display": "grid",
                  "gridTemplateColumns": 2,
                  "gap": "8px"
            },
            ".grid-pattern-blog": {
                  "display": "grid",
                  "gridTemplateColumns": 1,
                  "gap": "32px"
            },
            ".state-success": {
                  "borderColor": "#22c55e",
                  "backgroundColor": "#f0fdf4",
                  "color": "#15803d"
            },
            ".state-error": {
                  "borderColor": "#ef4444",
                  "backgroundColor": "#fef2f2",
                  "color": "#b91c1c"
            },
            ".state-warning": {
                  "borderColor": "#d97706",
                  "backgroundColor": "#fffbeb",
                  "color": "#78350f"
            },
            ".state-info": {
                  "borderColor": "#0ea5e9",
                  "backgroundColor": "#f0f9ff",
                  "color": "#0369a1"
            },
            ".interactive": {
                  "transitionProperty": "all",
                  "transitionDuration": "150ms",
                  "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)",
                  "opacity": 1,
                  "transform": "scale(1)"
            },
            ".interactive:hover": {
                  "transform": "scale(1.02)",
                  "boxShadow": "0 1px 3px 0 rgba(17, 24, 39, 0.1), 0 1px 2px -1px rgba(17, 24, 39, 0.1)",
                  "opacity": 1,
                  "filter": "brightness(1.05)"
            },
            ".interactive:active": {
                  "transform": "scale(0.98)",
                  "boxShadow": "none",
                  "opacity": 1,
                  "filter": "brightness(0.95)"
            },
            ".interactive:disabled": {
                  "opacity": 0.4,
                  "cursor": "not-allowed",
                  "pointerEvents": "none"
            },
            ".state-disabled": {
                  "opacity": 0.4,
                  "cursor": "not-allowed",
                  "pointerEvents": "none"
            }
      })
    })
  ]
};