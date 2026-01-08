export const colors = {
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
};
export const borderRadius = {
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
};
export const borderWidth = {
  "0": "0px",
  "hairline": "1px",
  "sm": "2px",
  "md": "4px",
  "lg": "8px",
  "xl": "12px"
};
// NEW: Typography Exports
export const fontSize = {
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
};
export const lineHeight = {
  "none": "1",
  "tight": "1.25",
  "snug": "1.375",
  "normal": "1.5",
  "relaxed": "1.625",
  "loose": "2"
};
export const fontFamily = {
  "sans": "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  "serif": "Georgia, Cambria, 'Times New Roman', Times, serif",
  "mono": "'Roboto Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
};
export const breakpoints = {
  primitives: {
  "sm": "640px",
  "md": "768px",
  "lg": "1024px",
  "xl": "1280px",
  "2xl": "1536px"
},
  semantic: {
  "mobile": {
    "max": "640px",
    "range": "0-640px",
    "usage": [
      "phone-portrait",
      "small-devices"
    ],
    "strategy": "Stack vertically, minimize spacing, full-width buttons"
  },
  "tablet": {
    "min": "640px",
    "max": "1024px",
    "range": "640px-1024px",
    "usage": [
      "tablet",
      "large-phones"
    ],
    "strategy": "2-column layouts, comfortable spacing"
  },
  "desktop": {
    "min": "1024px",
    "range": "1024px+",
    "usage": [
      "laptop",
      "desktop"
    ],
    "strategy": "Multi-column layouts, generous spacing, hover states",
    "default": true
  },
  "wide": {
    "min": "1280px",
    "range": "1280px+",
    "usage": [
      "large-desktop",
      "wide-screens"
    ],
    "strategy": "Container max-width, centered content"
  },
  "ultrawide": {
    "min": "1536px",
    "range": "1536px+",
    "usage": [
      "4K-monitors",
      "ultra-wide"
    ],
    "strategy": "Limit content width, add more whitespace"
  }
}
};
export const container = {
  "sm": "640px",
  "md": "768px",
  "lg": "1024px",
  "xl": "1280px",
  "2xl": "1536px",
  "full": "100%"
};
export const gradients = {
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
};
export const shadows = {
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
};
export const grid = {
  "columns": {
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
    "auto": "auto",
    "full": "1fr",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  },
  "rows": {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "auto": "auto",
    "full": "1fr",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  },
  "gap": {
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
  "gapX": {
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
  "gapY": {
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
  "autoFlow": {
    "row": "row",
    "col": "column",
    "rowDense": "row dense",
    "colDense": "column dense"
  },
  "templateColumns": {
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
  "templateRows": {
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
  "columnSpan": {
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
  "rowSpan": {
    "1": "span 1 / span 1",
    "2": "span 2 / span 2",
    "3": "span 3 / span 3",
    "4": "span 4 / span 4",
    "5": "span 5 / span 5",
    "6": "span 6 / span 6",
    "auto": "auto",
    "full": "1 / -1"
  },
  "columnStart": {
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
  "columnEnd": {
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
  "rowStart": {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "auto": "auto"
  },
  "rowEnd": {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "auto": "auto"
  }
};
export const layout = {
  "maxWidth": {
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
  "minWidth": {
    "0": "0px",
    "full": "100%",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  },
  "width": {
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
  "maxHeight": {
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
  "minHeight": {
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
  "height": {
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
  "aspectRatio": {
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
  "position": {
    "static": "static",
    "fixed": "fixed",
    "absolute": "absolute",
    "relative": "relative",
    "sticky": "sticky"
  },
  "inset": {
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
  "objectFit": {
    "contain": "contain",
    "cover": "cover",
    "fill": "fill",
    "none": "none",
    "scaleDown": "scale-down"
  },
  "objectPosition": {
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
  "overflow": {
    "auto": "auto",
    "hidden": "hidden",
    "clip": "clip",
    "visible": "visible",
    "scroll": "scroll"
  }
};
export const zIndex = {
  primitives: {
  "base": 0,
  "dropdown": 50,
  "sticky": 100,
  "header": 200,
  "overlay": 300,
  "modal": 400,
  "popover": 500,
  "toast": 600,
  "tooltip": 700
},
  semantic: {
  "content": {
    "value": 0,
    "level": 0,
    "usage": [
      "default-content",
      "page-elements"
    ],
    "rationale": "Base layer - everything starts here"
  },
  "dropdown": {
    "value": 50,
    "level": 50,
    "usage": [
      "dropdowns",
      "select-menus",
      "autocomplete"
    ],
    "rationale": "Above content but below major UI"
  },
  "sticky": {
    "value": 100,
    "level": 100,
    "usage": [
      "sticky-headers",
      "floating-action-buttons"
    ],
    "rationale": "Stays visible while scrolling"
  },
  "header": {
    "value": 200,
    "level": 200,
    "usage": [
      "site-header",
      "navigation",
      "fixed-nav"
    ],
    "rationale": "Header should be above sticky elements"
  },
  "overlay": {
    "value": 300,
    "level": 300,
    "usage": [
      "modal-backdrop",
      "drawer-overlay"
    ],
    "rationale": "Dims content below modals"
  },
  "modal": {
    "value": 400,
    "level": 400,
    "usage": [
      "modals",
      "dialogs",
      "lightboxes"
    ],
    "rationale": "Above overlay, below popover"
  },
  "popover": {
    "value": 500,
    "level": 500,
    "usage": [
      "popovers",
      "tooltips",
      "context-menus"
    ],
    "rationale": "Can appear over modals"
  },
  "toast": {
    "value": 600,
    "level": 600,
    "usage": [
      "notifications",
      "alerts",
      "snackbars"
    ],
    "rationale": "Above everything except tooltips"
  },
  "tooltip": {
    "value": 700,
    "level": 700,
    "usage": [
      "tooltips",
      "hints"
    ],
    "rationale": "Highest priority - always visible"
  }
}
};
export const opacity = {
  primitives: {
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
  "100": 1
},
  semantic: {
  "disabled": {
    "value": 0.4,
    "decimal": 0.4,
    "usage": [
      "disabled-buttons",
      "inactive-elements",
      "non-interactive"
    ],
    "rationale": "40% opacity signals non-interactive state"
  },
  "muted": {
    "value": 0.6,
    "decimal": 0.6,
    "usage": [
      "secondary-text",
      "placeholder-text",
      "helper-text"
    ],
    "rationale": "Visible but de-emphasized"
  },
  "subtle": {
    "value": 0.8,
    "decimal": 0.8,
    "usage": [
      "hover-overlays",
      "light-backgrounds"
    ],
    "rationale": "Subtle transparency"
  },
  "overlay": {
    "light": {
      "value": 0.5,
      "decimal": 0.5,
      "usage": [
        "modal-backdrop-light",
        "loading-overlay"
      ],
      "rationale": "Half-transparent - balances visibility and dimming"
    },
    "medium": {
      "value": 0.7,
      "decimal": 0.7,
      "usage": [
        "modal-backdrop",
        "drawer-overlay"
      ],
      "rationale": "Standard overlay - clearly dims content"
    },
    "heavy": {
      "value": 0.9,
      "decimal": 0.9,
      "usage": [
        "fullscreen-overlay",
        "focus-mode"
      ],
      "rationale": "Almost opaque - strong dimming"
    }
  },
  "hover": {
    "value": 0.1,
    "decimal": 0.1,
    "usage": [
      "hover-overlay",
      "button-hover-tint"
    ],
    "rationale": "Subtle overlay for hover states"
  },
  "skeleton": {
    "value": 0.2,
    "decimal": 0.2,
    "usage": [
      "skeleton-loading",
      "placeholder-shimmer"
    ],
    "rationale": "Light enough to show shimmer animation"
  }
}
};
export const spacing = {
  primitives: {
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
  "3.5": "0.875rem"
},
  semantic: {
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
}
};
export const motion = {
  "duration": {
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
  "easing": {
    "linear": "linear",
    "in": "cubic-bezier(0.4, 0, 1, 1)",
    "out": "cubic-bezier(0, 0, 0.2, 1)",
    "inOut": "cubic-bezier(0.4, 0, 0.2, 1)",
    "standard": "cubic-bezier(0.4, 0.0, 0.2, 1)",
    "emphasized": "cubic-bezier(0.2, 0.0, 0.0, 1.0)",
    "decelerate": "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
    "accelerate": "cubic-bezier(0.4, 0.0, 1.0, 1.0)"
  }
};
export const flex = {
  primitives: {
  "flexDirection": {
    "row": "row",
    "rowReverse": "row-reverse",
    "col": "column",
    "colReverse": "column-reverse"
  },
  "flexWrap": {
    "wrap": "wrap",
    "wrapReverse": "wrap-reverse",
    "nowrap": "nowrap"
  },
  "flex": {
    "1": "1 1 0%",
    "auto": "1 1 auto",
    "initial": "0 1 auto",
    "none": "none"
  },
  "flexGrow": {
    "0": 0,
    "1": 1
  },
  "flexShrink": {
    "0": 0,
    "1": 1
  },
  "flexBasis": {
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
  "justifyContent": {
    "normal": "normal",
    "start": "flex-start",
    "end": "flex-end",
    "center": "center",
    "between": "space-between",
    "around": "space-around",
    "evenly": "space-evenly",
    "stretch": "stretch"
  },
  "justifyItems": {
    "start": "start",
    "end": "end",
    "center": "center",
    "stretch": "stretch"
  },
  "justifySelf": {
    "auto": "auto",
    "start": "start",
    "end": "end",
    "center": "center",
    "stretch": "stretch"
  },
  "alignContent": {
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
  "alignItems": {
    "start": "flex-start",
    "end": "flex-end",
    "center": "center",
    "baseline": "baseline",
    "stretch": "stretch"
  },
  "alignSelf": {
    "auto": "auto",
    "start": "flex-start",
    "end": "flex-end",
    "center": "center",
    "stretch": "stretch",
    "baseline": "baseline"
  },
  "placeContent": {
    "center": "center",
    "start": "start",
    "end": "end",
    "between": "space-between",
    "around": "space-around",
    "evenly": "space-evenly",
    "baseline": "baseline",
    "stretch": "stretch"
  },
  "placeItems": {
    "start": "start",
    "end": "end",
    "center": "center",
    "baseline": "baseline",
    "stretch": "stretch"
  },
  "placeSelf": {
    "auto": "auto",
    "start": "start",
    "end": "end",
    "center": "center",
    "stretch": "stretch"
  },
  "order": {
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
  }
},
  semantic: {
  "layouts": {
    "row": {
      "direction": "row",
      "align": "center",
      "justify": "flex-start",
      "wrap": "nowrap",
      "usage": [
        "horizontal-navigation",
        "button-groups",
        "inline-elements"
      ]
    },
    "rowReverse": {
      "direction": "row-reverse",
      "align": "center",
      "justify": "flex-start",
      "wrap": "nowrap",
      "usage": [
        "rtl-layouts",
        "reversed-order"
      ]
    },
    "column": {
      "direction": "column",
      "align": "stretch",
      "justify": "flex-start",
      "wrap": "nowrap",
      "usage": [
        "vertical-stacking",
        "forms",
        "card-content"
      ]
    },
    "columnReverse": {
      "direction": "column-reverse",
      "align": "stretch",
      "justify": "flex-start",
      "wrap": "nowrap",
      "usage": [
        "footer-first-mobile",
        "inverted-order"
      ]
    },
    "center": {
      "direction": "row",
      "align": "center",
      "justify": "center",
      "usage": [
        "centered-content",
        "modals",
        "hero-text",
        "loading-states"
      ]
    },
    "centerColumn": {
      "direction": "column",
      "align": "center",
      "justify": "center",
      "usage": [
        "vertical-center",
        "empty-states",
        "404-pages"
      ]
    },
    "spaceBetween": {
      "direction": "row",
      "align": "center",
      "justify": "space-between",
      "usage": [
        "headers",
        "split-buttons",
        "card-headers"
      ]
    },
    "spaceBetweenColumn": {
      "direction": "column",
      "align": "stretch",
      "justify": "space-between",
      "usage": [
        "full-height-cards",
        "sticky-footer"
      ]
    },
    "spaceAround": {
      "direction": "row",
      "align": "center",
      "justify": "space-around",
      "usage": [
        "evenly-distributed",
        "icon-bars"
      ]
    },
    "spaceEvenly": {
      "direction": "row",
      "align": "center",
      "justify": "space-evenly",
      "usage": [
        "perfectly-distributed",
        "navigation-items"
      ]
    },
    "wrap": {
      "direction": "row",
      "align": "flex-start",
      "justify": "flex-start",
      "wrap": "wrap",
      "usage": [
        "tags",
        "chips",
        "responsive-buttons",
        "filter-pills"
      ]
    },
    "wrapCenter": {
      "direction": "row",
      "align": "center",
      "justify": "center",
      "wrap": "wrap",
      "usage": [
        "centered-tags",
        "logo-clouds"
      ]
    },
    "baseline": {
      "direction": "row",
      "align": "baseline",
      "justify": "flex-start",
      "usage": [
        "text-alignment",
        "mixed-font-sizes",
        "pricing"
      ]
    },
    "stretch": {
      "direction": "row",
      "align": "stretch",
      "justify": "flex-start",
      "usage": [
        "equal-height-children",
        "cards",
        "panels"
      ]
    }
  },
  "componentPatterns": {
    "navbar": {
      "direction": "row",
      "align": "center",
      "justify": "space-between",
      "wrap": "nowrap",
      "usage": [
        "header-navigation"
      ]
    },
    "navMenu": {
      "direction": "row",
      "align": "center",
      "justify": "flex-start",
      "wrap": "wrap",
      "gap": "1rem",
      "usage": [
        "navigation-links"
      ]
    },
    "buttonGroup": {
      "direction": "row",
      "align": "center",
      "justify": "flex-start",
      "wrap": "wrap",
      "gap": "0.5rem",
      "usage": [
        "action-buttons",
        "cta-groups"
      ]
    },
    "cardHeader": {
      "direction": "row",
      "align": "center",
      "justify": "space-between",
      "usage": [
        "card-title-actions"
      ]
    },
    "cardContent": {
      "direction": "column",
      "align": "stretch",
      "justify": "flex-start",
      "gap": "1rem",
      "usage": [
        "card-body"
      ]
    },
    "cardFooter": {
      "direction": "row",
      "align": "center",
      "justify": "flex-end",
      "gap": "0.5rem",
      "usage": [
        "card-actions"
      ]
    },
    "form": {
      "direction": "column",
      "align": "stretch",
      "justify": "flex-start",
      "gap": "1.5rem",
      "usage": [
        "form-layout"
      ]
    },
    "formRow": {
      "direction": "row",
      "align": "flex-end",
      "justify": "flex-start",
      "wrap": "wrap",
      "gap": "1rem",
      "usage": [
        "inline-form-fields"
      ]
    },
    "inputGroup": {
      "direction": "column",
      "align": "stretch",
      "justify": "flex-start",
      "gap": "0.5rem",
      "usage": [
        "label-input-error"
      ]
    },
    "modal": {
      "direction": "column",
      "align": "center",
      "justify": "center",
      "usage": [
        "modal-overlay-centering"
      ]
    },
    "modalContent": {
      "direction": "column",
      "align": "stretch",
      "justify": "space-between",
      "usage": [
        "modal-header-body-footer"
      ]
    },
    "toast": {
      "direction": "row",
      "align": "flex-start",
      "justify": "flex-start",
      "gap": "0.75rem",
      "usage": [
        "notification-layout"
      ]
    },
    "avatar": {
      "direction": "row",
      "align": "center",
      "justify": "flex-start",
      "gap": "0.75rem",
      "usage": [
        "user-profile-inline"
      ]
    },
    "badge": {
      "direction": "row",
      "align": "center",
      "justify": "center",
      "gap": "0.25rem",
      "usage": [
        "status-badges"
      ]
    },
    "dropdown": {
      "direction": "column",
      "align": "stretch",
      "justify": "flex-start",
      "usage": [
        "menu-items"
      ]
    },
    "breadcrumbs": {
      "direction": "row",
      "align": "center",
      "justify": "flex-start",
      "wrap": "wrap",
      "gap": "0.5rem",
      "usage": [
        "navigation-breadcrumbs"
      ]
    },
    "tabs": {
      "direction": "row",
      "align": "center",
      "justify": "flex-start",
      "wrap": "nowrap",
      "gap": "0",
      "usage": [
        "tab-navigation"
      ]
    },
    "statCard": {
      "direction": "column",
      "align": "flex-start",
      "justify": "space-between",
      "gap": "0.5rem",
      "usage": [
        "dashboard-metrics"
      ]
    },
    "hero": {
      "direction": "column",
      "align": "center",
      "justify": "center",
      "gap": "2rem",
      "usage": [
        "hero-section-centered"
      ]
    },
    "heroSplit": {
      "direction": "row",
      "align": "center",
      "justify": "space-between",
      "wrap": "wrap",
      "gap": "3rem",
      "usage": [
        "hero-text-image-split"
      ]
    },
    "footer": {
      "direction": "row",
      "align": "flex-start",
      "justify": "space-between",
      "wrap": "wrap",
      "gap": "2rem",
      "usage": [
        "footer-columns"
      ]
    },
    "stickyFooter": {
      "direction": "column",
      "align": "stretch",
      "justify": "space-between",
      "minHeight": "100vh",
      "usage": [
        "page-layout-with-sticky-footer"
      ]
    }
  }
}
};
export default { colors, borderRadius, borderWidth, fontSize, lineHeight, fontFamily, breakpoints, container, gradients, shadows, grid, layout, zIndex, opacity, spacing, motion, flex };