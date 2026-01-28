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
            "brand": {
                  "primary": {
                        "base": "var(--brand-primary-base)",
                        "light": "var(--brand-primary-light)",
                        "lighter": "var(--brand-primary-lighter)",
                        "lightest": "var(--brand-primary-lightest)",
                        "dark": "var(--brand-primary-dark)",
                        "darker": "var(--brand-primary-darker)",
                        "darkest": "var(--brand-primary-darkest)"
                  },
                  "secondary": {
                        "base": "var(--brand-secondary-base)",
                        "light": "var(--brand-secondary-light)",
                        "lighter": "var(--brand-secondary-lighter)",
                        "lightest": "var(--brand-secondary-lightest)",
                        "dark": "var(--brand-secondary-dark)",
                        "darker": "var(--brand-secondary-darker)",
                        "darkest": "var(--brand-secondary-darkest)"
                  },
                  "tertiary": {
                        "base": "var(--brand-tertiary-base)",
                        "light": "var(--brand-tertiary-light)",
                        "lighter": "var(--brand-tertiary-lighter)",
                        "lightest": "var(--brand-tertiary-lightest)",
                        "dark": "var(--brand-tertiary-dark)",
                        "darker": "var(--brand-tertiary-darker)",
                        "darkest": "var(--brand-tertiary-darkest)"
                  }
            },
            "theme": {
                  "primary": "var(--theme-primary)",
                  "dark": "var(--theme-dark)",
                  "darkAlt": "var(--theme-darkAlt)",
                  "darker": "var(--theme-darker)",
                  "light": "var(--theme-light)",
                  "lighter": "var(--theme-lighter)",
                  "lighterAlt": "var(--theme-lighterAlt)",
                  "lightAlt": "var(--theme-lightAlt)",
                  "lightest": "var(--theme-lightest)"
            },
            "neutral": {
                  "white": "var(--neutral-white)",
                  "grey5": "var(--neutral-grey5)",
                  "grey10": "var(--neutral-grey10)",
                  "grey20": "var(--neutral-grey20)",
                  "grey40": "var(--neutral-grey40)",
                  "grey60": "var(--neutral-grey60)",
                  "grey80": "var(--neutral-grey80)",
                  "grey90": "var(--neutral-grey90)"
            },
            "background": {
                  "base": "var(--background-base)",
                  "subtle": "var(--background-subtle)",
                  "muted": {
                        "DEFAULT": "var(--background-muted)",
                        "low": "var(--background-muted-low)"
                  },
                  "emphasis": "var(--background-emphasis)",
                  "inverse": "var(--background-inverse)",
                  "overlay": "var(--background-overlay)",
                  "gradient": {
                        "primary": "var(--background-gradient-primary)"
                  },
                  "tint": {
                        "primary": "var(--background-tint-primary)",
                        "secondary": "var(--background-tint-secondary)",
                        "tertiary": "var(--background-tint-tertiary)",
                        "success": "var(--background-tint-success)",
                        "warning": "var(--background-tint-warning)",
                        "error": "var(--background-tint-error)",
                        "info": "var(--background-tint-info)"
                  },
                  "primary": {
                        "2": "var(--background-primary-2)",
                        "3": "var(--background-primary-3)",
                        "DEFAULT": "var(--background-primary)"
                  },
                  "secondary": {
                        "2": "var(--background-secondary-2)",
                        "DEFAULT": "var(--background-secondary)"
                  },
                  "accent": "var(--background-accent)",
                  "success": "var(--background-success)",
                  "error": "var(--background-error)",
                  "warning": "var(--background-warning)",
                  "info": "var(--background-info)",
                  "dark": "var(--background-dark)",
                  "pastel": {
                        "green": "var(--background-pastel-green)"
                  },
                  "red": "var(--background-red)"
            },
            "surface": {
                  "base": "var(--surface-base)",
                  "raised": "var(--surface-raised)",
                  "sunken": "var(--surface-sunken)",
                  "overlay": "var(--surface-overlay)",
                  "hover": "var(--surface-hover)",
                  "pressed": "var(--surface-pressed)",
                  "selected": "var(--surface-selected)",
                  "disabled": "var(--surface-disabled)"
            },
            "border": {
                  "base": "var(--border-base)",
                  "subtle": "var(--border-subtle)",
                  "strong": "var(--border-strong)",
                  "emphasis": "var(--border-emphasis)",
                  "hover": "var(--border-hover)",
                  "focus": "var(--border-focus)",
                  "disabled": "var(--border-disabled)",
                  "error": "var(--border-error)",
                  "success": "var(--border-success)",
                  "warning": "var(--border-warning)",
                  "info": "var(--border-info)",
                  "default": "var(--border-default)",
                  "muted": "var(--border-muted)",
                  "dark": "var(--border-dark)"
            },
            "text": {
                  "base": "var(--text-base)",
                  "subtle": "var(--text-subtle)",
                  "muted": "var(--text-muted)",
                  "placeholder": "var(--text-placeholder)",
                  "disabled": "var(--text-disabled)",
                  "inverse": "var(--text-inverse)",
                  "brand": "var(--text-brand)",
                  "emphasis": "var(--text-emphasis)",
                  "link": "var(--text-link)",
                  "linkHover": "var(--text-linkHover)",
                  "linkActive": "var(--text-linkActive)",
                  "linkVisited": "var(--text-linkVisited)",
                  "success": "var(--text-success)",
                  "error": "var(--text-error)",
                  "warning": "var(--text-warning)",
                  "info": "var(--text-info)",
                  "primary": "var(--text-primary)",
                  "secondary": "var(--text-secondary)",
                  "tertiary": "var(--text-tertiary)",
                  "on": {
                        "accent": "var(--text-on-accent)"
                  },
                  "light": "var(--text-light)",
                  "lightSecondary": "var(--text-lightSecondary)"
            },
            "icon": {
                  "base": "var(--icon-base)",
                  "subtle": "var(--icon-subtle)",
                  "muted": "var(--icon-muted)",
                  "disabled": "var(--icon-disabled)",
                  "inverse": "var(--icon-inverse)",
                  "brand": "var(--icon-brand)",
                  "success": "var(--icon-success)",
                  "error": "var(--icon-error)",
                  "warning": "var(--icon-warning)",
                  "info": "var(--icon-info)"
            },
            "interactive": {
                  "base": "var(--interactive-base)",
                  "hover": "var(--interactive-hover)",
                  "active": "var(--interactive-active)",
                  "disabled": "var(--interactive-disabled)",
                  "subtle": "var(--interactive-subtle)",
                  "subtleHover": "var(--interactive-subtleHover)",
                  "focus": "var(--interactive-focus)",
                  "focusRing": "var(--interactive-focusRing)"
            },
            "button": {
                  "primary": {
                        "background": "var(--button-primary-background)",
                        "backgroundHover": "var(--button-primary-backgroundHover)",
                        "backgroundActive": "var(--button-primary-backgroundActive)",
                        "backgroundDisabled": "var(--button-primary-backgroundDisabled)",
                        "backgroundLoading": "var(--button-primary-backgroundLoading)",
                        "text": "var(--button-primary-text)",
                        "textDisabled": "var(--button-primary-textDisabled)",
                        "border": "var(--button-primary-border)",
                        "borderHover": "var(--button-primary-borderHover)",
                        "borderActive": "var(--button-primary-borderActive)",
                        "borderDisabled": "var(--button-primary-borderDisabled)",
                        "shadow": "var(--button-primary-shadow)",
                        "shadowHover": "var(--button-primary-shadowHover)",
                        "shadowActive": "var(--button-primary-shadowActive)",
                        "shadowFocus": "var(--button-primary-shadowFocus)"
                  },
                  "secondary": {
                        "background": "var(--button-secondary-background)",
                        "backgroundHover": "var(--button-secondary-backgroundHover)",
                        "backgroundActive": "var(--button-secondary-backgroundActive)",
                        "backgroundDisabled": "var(--button-secondary-backgroundDisabled)",
                        "text": "var(--button-secondary-text)",
                        "textDisabled": "var(--button-secondary-textDisabled)",
                        "border": "var(--button-secondary-border)",
                        "borderHover": "var(--button-secondary-borderHover)",
                        "borderActive": "var(--button-secondary-borderActive)",
                        "borderDisabled": "var(--button-secondary-borderDisabled)",
                        "shadow": "var(--button-secondary-shadow)",
                        "shadowHover": "var(--button-secondary-shadowHover)",
                        "shadowFocus": "var(--button-secondary-shadowFocus)"
                  },
                  "tertiary": {
                        "background": "var(--button-tertiary-background)",
                        "backgroundHover": "var(--button-tertiary-backgroundHover)",
                        "backgroundActive": "var(--button-tertiary-backgroundActive)",
                        "backgroundDisabled": "var(--button-tertiary-backgroundDisabled)",
                        "text": "var(--button-tertiary-text)",
                        "textDisabled": "var(--button-tertiary-textDisabled)",
                        "border": "var(--button-tertiary-border)",
                        "borderHover": "var(--button-tertiary-borderHover)",
                        "shadow": "var(--button-tertiary-shadow)",
                        "shadowFocus": "var(--button-tertiary-shadowFocus)"
                  },
                  "accent": {
                        "background": "var(--button-accent-background)",
                        "backgroundHover": "var(--button-accent-backgroundHover)",
                        "backgroundActive": "var(--button-accent-backgroundActive)",
                        "backgroundDisabled": "var(--button-accent-backgroundDisabled)",
                        "text": "var(--button-accent-text)",
                        "textDisabled": "var(--button-accent-textDisabled)",
                        "border": "var(--button-accent-border)",
                        "borderHover": "var(--button-accent-borderHover)",
                        "borderActive": "var(--button-accent-borderActive)",
                        "shadow": "var(--button-accent-shadow)",
                        "shadowHover": "var(--button-accent-shadowHover)",
                        "shadowFocus": "var(--button-accent-shadowFocus)"
                  },
                  "success": {
                        "background": "var(--button-success-background)",
                        "backgroundHover": "var(--button-success-backgroundHover)",
                        "backgroundActive": "var(--button-success-backgroundActive)",
                        "backgroundDisabled": "var(--button-success-backgroundDisabled)",
                        "text": "var(--button-success-text)",
                        "textDisabled": "var(--button-success-textDisabled)",
                        "border": "var(--button-success-border)",
                        "borderHover": "var(--button-success-borderHover)",
                        "shadow": "var(--button-success-shadow)",
                        "shadowHover": "var(--button-success-shadowHover)",
                        "shadowFocus": "var(--button-success-shadowFocus)"
                  },
                  "error": {
                        "background": "var(--button-error-background)",
                        "backgroundHover": "var(--button-error-backgroundHover)",
                        "backgroundActive": "var(--button-error-backgroundActive)",
                        "backgroundDisabled": "var(--button-error-backgroundDisabled)",
                        "text": "var(--button-error-text)",
                        "textDisabled": "var(--button-error-textDisabled)",
                        "border": "var(--button-error-border)",
                        "borderHover": "var(--button-error-borderHover)",
                        "shadow": "var(--button-error-shadow)",
                        "shadowHover": "var(--button-error-shadowHover)",
                        "shadowFocus": "var(--button-error-shadowFocus)"
                  },
                  "ghost": {
                        "background": "var(--button-ghost-background)",
                        "backgroundHover": "var(--button-ghost-backgroundHover)",
                        "backgroundActive": "var(--button-ghost-backgroundActive)",
                        "backgroundDisabled": "var(--button-ghost-backgroundDisabled)",
                        "text": "var(--button-ghost-text)",
                        "textHover": "var(--button-ghost-textHover)",
                        "textDisabled": "var(--button-ghost-textDisabled)",
                        "border": "var(--button-ghost-border)",
                        "shadow": "var(--button-ghost-shadow)",
                        "shadowFocus": "var(--button-ghost-shadowFocus)"
                  },
                  "link": {
                        "background": "var(--button-link-background)",
                        "backgroundHover": "var(--button-link-backgroundHover)",
                        "text": "var(--button-link-text)",
                        "textHover": "var(--button-link-textHover)",
                        "textActive": "var(--button-link-textActive)",
                        "textVisited": "var(--button-link-textVisited)",
                        "textDisabled": "var(--button-link-textDisabled)",
                        "textDecoration": "var(--button-link-textDecoration)",
                        "textDecorationHover": "var(--button-link-textDecorationHover)",
                        "shadowFocus": "var(--button-link-shadowFocus)"
                  },
                  "dark": {
                        "background": "var(--button-dark-background)",
                        "backgroundHover": "var(--button-dark-backgroundHover)",
                        "backgroundActive": "var(--button-dark-backgroundActive)",
                        "backgroundDisabled": "var(--button-dark-backgroundDisabled)",
                        "text": "var(--button-dark-text)",
                        "textDisabled": "var(--button-dark-textDisabled)",
                        "border": "var(--button-dark-border)",
                        "borderHover": "var(--button-dark-borderHover)",
                        "shadow": "var(--button-dark-shadow)",
                        "shadowHover": "var(--button-dark-shadowHover)",
                        "shadowFocus": "var(--button-dark-shadowFocus)"
                  }
            },
            "input": {
                  "background": "var(--input-background)",
                  "backgroundHover": "var(--input-backgroundHover)",
                  "backgroundFocus": "var(--input-backgroundFocus)",
                  "backgroundDisabled": "var(--input-backgroundDisabled)",
                  "backgroundReadOnly": "var(--input-backgroundReadOnly)",
                  "border": "var(--input-border)",
                  "borderHover": "var(--input-borderHover)",
                  "borderFocus": "var(--input-borderFocus)",
                  "borderError": "var(--input-borderError)",
                  "borderSuccess": "var(--input-borderSuccess)",
                  "borderWarning": "var(--input-borderWarning)",
                  "borderDisabled": "var(--input-borderDisabled)",
                  "text": "var(--input-text)",
                  "textDisabled": "var(--input-textDisabled)",
                  "placeholder": "var(--input-placeholder)",
                  "label": "var(--input-label)",
                  "labelDisabled": "var(--input-labelDisabled)",
                  "helper": "var(--input-helper)",
                  "helperError": "var(--input-helperError)",
                  "helperSuccess": "var(--input-helperSuccess)",
                  "helperWarning": "var(--input-helperWarning)",
                  "icon": "var(--input-icon)",
                  "iconDisabled": "var(--input-iconDisabled)",
                  "shadowFocus": "var(--input-shadowFocus)",
                  "shadowFocusError": "var(--input-shadowFocusError)"
            },
            "status": {
                  "success": {
                        "background": "var(--status-success-background)",
                        "backgroundSubtle": "var(--status-success-backgroundSubtle)",
                        "backgroundSubtleOpacity": "var(--status-success-backgroundSubtleOpacity)",
                        "border": "var(--status-success-border)",
                        "text": "var(--status-success-text)",
                        "textSubtle": "var(--status-success-textSubtle)",
                        "icon": "var(--status-success-icon)"
                  },
                  "error": {
                        "background": "var(--status-error-background)",
                        "backgroundSubtle": "var(--status-error-backgroundSubtle)",
                        "backgroundSubtleOpacity": "var(--status-error-backgroundSubtleOpacity)",
                        "border": "var(--status-error-border)",
                        "text": "var(--status-error-text)",
                        "textSubtle": "var(--status-error-textSubtle)",
                        "icon": "var(--status-error-icon)"
                  },
                  "warning": {
                        "background": "var(--status-warning-background)",
                        "backgroundSubtle": "var(--status-warning-backgroundSubtle)",
                        "backgroundSubtleOpacity": "var(--status-warning-backgroundSubtleOpacity)",
                        "border": "var(--status-warning-border)",
                        "text": "var(--status-warning-text)",
                        "textSubtle": "var(--status-warning-textSubtle)",
                        "icon": "var(--status-warning-icon)"
                  },
                  "severeWarning": {
                        "background": "var(--status-severeWarning-background)",
                        "backgroundSubtle": "var(--status-severeWarning-backgroundSubtle)",
                        "backgroundSubtleOpacity": "var(--status-severeWarning-backgroundSubtleOpacity)",
                        "border": "var(--status-severeWarning-border)",
                        "text": "var(--status-severeWarning-text)",
                        "textSubtle": "var(--status-severeWarning-textSubtle)",
                        "icon": "var(--status-severeWarning-icon)"
                  },
                  "info": {
                        "background": "var(--status-info-background)",
                        "backgroundSubtle": "var(--status-info-backgroundSubtle)",
                        "border": "var(--status-info-border)",
                        "text": "var(--status-info-text)",
                        "textSubtle": "var(--status-info-textSubtle)",
                        "icon": "var(--status-info-icon)"
                  },
                  "danger": {
                        "background": "var(--status-danger-background)",
                        "backgroundAlt": "var(--status-danger-backgroundAlt)",
                        "backgroundHover": "var(--status-danger-backgroundHover)",
                        "text": "var(--status-danger-text)",
                        "icon": "var(--status-danger-icon)",
                        "border": "var(--status-danger-border)"
                  }
            },
            "badge": {
                  "neutral": {
                        "background": "var(--badge-neutral-background)",
                        "text": "var(--badge-neutral-text)",
                        "border": "var(--badge-neutral-border)"
                  },
                  "primary": {
                        "background": "var(--badge-primary-background)",
                        "text": "var(--badge-primary-text)",
                        "border": "var(--badge-primary-border)"
                  },
                  "success": {
                        "background": "var(--badge-success-background)",
                        "text": "var(--badge-success-text)",
                        "border": "var(--badge-success-border)"
                  },
                  "error": {
                        "background": "var(--badge-error-background)",
                        "text": "var(--badge-error-text)",
                        "border": "var(--badge-error-border)"
                  },
                  "warning": {
                        "background": "var(--badge-warning-background)",
                        "text": "var(--badge-warning-text)",
                        "border": "var(--badge-warning-border)"
                  },
                  "info": {
                        "background": "var(--badge-info-background)",
                        "text": "var(--badge-info-text)",
                        "border": "var(--badge-info-border)"
                  }
            },
            "toggle": {
                  "trackOff": "var(--toggle-trackOff)",
                  "trackOn": "var(--toggle-trackOn)",
                  "trackOnHover": "var(--toggle-trackOnHover)",
                  "trackDisabled": "var(--toggle-trackDisabled)",
                  "knob": "var(--toggle-knob)",
                  "knobShadow": "var(--toggle-knobShadow)",
                  "focusRing": "var(--toggle-focusRing)"
            },
            "slider": {
                  "track": "var(--slider-track)",
                  "trackActive": "var(--slider-trackActive)",
                  "trackDisabled": "var(--slider-trackDisabled)",
                  "thumb": "var(--slider-thumb)",
                  "thumbBorder": "var(--slider-thumbBorder)",
                  "thumbShadow": "var(--slider-thumbShadow)",
                  "thumbHoverShadow": "var(--slider-thumbHoverShadow)",
                  "focusRing": "var(--slider-focusRing)"
            },
            "progress": {
                  "background": "var(--progress-background)",
                  "fill": "var(--progress-fill)",
                  "fillSuccess": "var(--progress-fillSuccess)",
                  "fillWarning": "var(--progress-fillWarning)",
                  "fillError": "var(--progress-fillError)"
            },
            "checkbox": {
                  "background": "var(--checkbox-background)",
                  "backgroundChecked": "var(--checkbox-backgroundChecked)",
                  "backgroundCheckedHover": "var(--checkbox-backgroundCheckedHover)",
                  "backgroundDisabled": "var(--checkbox-backgroundDisabled)",
                  "border": "var(--checkbox-border)",
                  "borderHover": "var(--checkbox-borderHover)",
                  "borderChecked": "var(--checkbox-borderChecked)",
                  "borderDisabled": "var(--checkbox-borderDisabled)",
                  "checkmark": "var(--checkbox-checkmark)",
                  "focusRing": "var(--checkbox-focusRing)"
            },
            "radio": {
                  "background": "var(--radio-background)",
                  "backgroundChecked": "var(--radio-backgroundChecked)",
                  "backgroundDisabled": "var(--radio-backgroundDisabled)",
                  "border": "var(--radio-border)",
                  "borderHover": "var(--radio-borderHover)",
                  "borderChecked": "var(--radio-borderChecked)",
                  "borderDisabled": "var(--radio-borderDisabled)",
                  "dot": "var(--radio-dot)",
                  "focusRing": "var(--radio-focusRing)"
            },
            "dropdown": {
                  "background": "var(--dropdown-background)",
                  "border": "var(--dropdown-border)",
                  "shadow": "var(--dropdown-shadow)"
            },
            "menu": {
                  "item": {
                        "background": "var(--menu-item-background)",
                        "backgroundHover": "var(--menu-item-backgroundHover)",
                        "backgroundSelected": "var(--menu-item-backgroundSelected)",
                        "backgroundActive": "var(--menu-item-backgroundActive)",
                        "text": "var(--menu-item-text)",
                        "textSubtle": "var(--menu-item-textSubtle)",
                        "icon": "var(--menu-item-icon)"
                  },
                  "divider": "var(--menu-divider)"
            },
            "tooltip": {
                  "background": "var(--tooltip-background)",
                  "text": "var(--tooltip-text)",
                  "border": "var(--tooltip-border)",
                  "shadow": "var(--tooltip-shadow)",
                  "arrow": "var(--tooltip-arrow)"
            },
            "code": {
                  "background": "var(--code-background)",
                  "border": "var(--code-border)",
                  "text": "var(--code-text)",
                  "syntax": {
                        "keyword": "var(--code-syntax-keyword)",
                        "string": "var(--code-syntax-string)",
                        "comment": "var(--code-syntax-comment)",
                        "number": "var(--code-syntax-number)",
                        "function": "var(--code-syntax-function)",
                        "operator": "var(--code-syntax-operator)",
                        "variable": "var(--code-syntax-variable)"
                  }
            },
            "avatar": {
                  "background": {
                        "1": "var(--avatar-background-1)",
                        "2": "var(--avatar-background-2)",
                        "3": "var(--avatar-background-3)",
                        "4": "var(--avatar-background-4)",
                        "5": "var(--avatar-background-5)"
                  },
                  "text": {
                        "1": "var(--avatar-text-1)",
                        "2": "var(--avatar-text-2)",
                        "3": "var(--avatar-text-3)",
                        "4": "var(--avatar-text-4)",
                        "5": "var(--avatar-text-5)"
                  },
                  "border": "var(--avatar-border)"
            },
            "card": {
                  "background": "var(--card-background)",
                  "backgroundHover": "var(--card-backgroundHover)",
                  "border": "var(--card-border)",
                  "borderHover": "var(--card-borderHover)",
                  "shadow": "var(--card-shadow)",
                  "shadowHover": "var(--card-shadowHover)",
                  "shadowRaised": "var(--card-shadowRaised)"
            },
            "divider": {
                  "base": "var(--divider-base)",
                  "subtle": "var(--divider-subtle)",
                  "strong": "var(--divider-strong)"
            },
            "chart": {
                  "series1": "var(--chart-series1)",
                  "series2": "var(--chart-series2)",
                  "series3": "var(--chart-series3)",
                  "series4": "var(--chart-series4)",
                  "series5": "var(--chart-series5)",
                  "series6": "var(--chart-series6)",
                  "series7": "var(--chart-series7)",
                  "series8": "var(--chart-series8)",
                  "grid": "var(--chart-grid)",
                  "axis": "var(--chart-axis)",
                  "label": "var(--chart-label)",
                  "tooltip": {
                        "background": "var(--chart-tooltip-background)",
                        "border": "var(--chart-tooltip-border)",
                        "text": "var(--chart-tooltip-text)",
                        "shadow": "var(--chart-tooltip-shadow)"
                  }
            },
            "table": {
                  "header": {
                        "background": "var(--table-header-background)",
                        "text": "var(--table-header-text)",
                        "border": "var(--table-header-border)"
                  },
                  "row": {
                        "background": "var(--table-row-background)",
                        "backgroundHover": "var(--table-row-backgroundHover)",
                        "backgroundSelected": "var(--table-row-backgroundSelected)",
                        "backgroundStriped": "var(--table-row-backgroundStriped)",
                        "text": "var(--table-row-text)",
                        "border": "var(--table-row-border)"
                  },
                  "cell": {
                        "text": "var(--table-cell-text)",
                        "textSubtle": "var(--table-cell-textSubtle)"
                  }
            },
            "tabs": {
                  "background": "var(--tabs-background)",
                  "border": "var(--tabs-border)",
                  "tab": {
                        "text": "var(--tabs-tab-text)",
                        "textHover": "var(--tabs-tab-textHover)",
                        "textActive": "var(--tabs-tab-textActive)",
                        "background": "var(--tabs-tab-background)",
                        "backgroundHover": "var(--tabs-tab-backgroundHover)",
                        "backgroundActive": "var(--tabs-tab-backgroundActive)",
                        "indicator": "var(--tabs-tab-indicator)",
                        "border": "var(--tabs-tab-border)",
                        "borderActive": "var(--tabs-tab-borderActive)"
                  }
            },
            "stepper": {
                  "incomplete": {
                        "background": "var(--stepper-incomplete-background)",
                        "border": "var(--stepper-incomplete-border)",
                        "text": "var(--stepper-incomplete-text)",
                        "icon": "var(--stepper-incomplete-icon)"
                  },
                  "active": {
                        "background": "var(--stepper-active-background)",
                        "border": "var(--stepper-active-border)",
                        "text": "var(--stepper-active-text)",
                        "icon": "var(--stepper-active-icon)"
                  },
                  "complete": {
                        "background": "var(--stepper-complete-background)",
                        "border": "var(--stepper-complete-border)",
                        "text": "var(--stepper-complete-text)",
                        "icon": "var(--stepper-complete-icon)"
                  },
                  "connector": "var(--stepper-connector)",
                  "connectorActive": "var(--stepper-connectorActive)"
            },
            "breadcrumb": {
                  "text": "var(--breadcrumb-text)",
                  "textHover": "var(--breadcrumb-textHover)",
                  "textCurrent": "var(--breadcrumb-textCurrent)",
                  "separator": "var(--breadcrumb-separator)",
                  "link": "var(--breadcrumb-link)",
                  "linkHover": "var(--breadcrumb-linkHover)"
            },
            "pagination": {
                  "button": {
                        "background": "var(--pagination-button-background)",
                        "backgroundHover": "var(--pagination-button-backgroundHover)",
                        "backgroundActive": "var(--pagination-button-backgroundActive)",
                        "backgroundDisabled": "var(--pagination-button-backgroundDisabled)",
                        "text": "var(--pagination-button-text)",
                        "textActive": "var(--pagination-button-textActive)",
                        "textDisabled": "var(--pagination-button-textDisabled)",
                        "border": "var(--pagination-button-border)"
                  }
            },
            "modal": {
                  "background": "var(--modal-background)",
                  "overlay": "var(--modal-overlay)",
                  "border": "var(--modal-border)",
                  "shadow": "var(--modal-shadow)",
                  "header": {
                        "background": "var(--modal-header-background)",
                        "text": "var(--modal-header-text)",
                        "border": "var(--modal-header-border)"
                  },
                  "footer": {
                        "background": "var(--modal-footer-background)",
                        "border": "var(--modal-footer-border)"
                  }
            },
            "toast": {
                  "success": {
                        "background": "var(--toast-success-background)",
                        "text": "var(--toast-success-text)",
                        "icon": "var(--toast-success-icon)",
                        "border": "var(--toast-success-border)"
                  },
                  "error": {
                        "background": "var(--toast-error-background)",
                        "text": "var(--toast-error-text)",
                        "icon": "var(--toast-error-icon)",
                        "border": "var(--toast-error-border)"
                  },
                  "warning": {
                        "background": "var(--toast-warning-background)",
                        "text": "var(--toast-warning-text)",
                        "icon": "var(--toast-warning-icon)",
                        "border": "var(--toast-warning-border)"
                  },
                  "info": {
                        "background": "var(--toast-info-background)",
                        "text": "var(--toast-info-text)",
                        "icon": "var(--toast-info-icon)",
                        "border": "var(--toast-info-border)"
                  }
            },
            "shadow": {
                  "small": "var(--shadow-small)",
                  "medium": "var(--shadow-medium)",
                  "large": "var(--shadow-large)",
                  "xlarge": "var(--shadow-xlarge)",
                  "focus": "var(--shadow-focus)",
                  "focusBrand": "var(--shadow-focusBrand)",
                  "focusError": "var(--shadow-focusError)"
            },
            "overlay": {
                  "light": "var(--overlay-light)",
                  "medium": "var(--overlay-medium)",
                  "dark": "var(--overlay-dark)",
                  "darker": "var(--overlay-darker)"
            },
            "skeleton": {
                  "base": "var(--skeleton-base)",
                  "highlight": "var(--skeleton-highlight)"
            },
            "scrollbar": {
                  "track": "var(--scrollbar-track)",
                  "thumb": "var(--scrollbar-thumb)",
                  "thumbHover": "var(--scrollbar-thumbHover)"
            },
            "accent": {
                  "default": "var(--accent-default)",
                  "hover": "var(--accent-hover)",
                  "subtle": "var(--accent-subtle)",
                  "foreground": "var(--accent-foreground)"
            }
      },
      transitionDuration: {
            "instant": "0ms",
            "immediate": "100ms",
            "swift": "150ms",
            "quick": "200ms",
            "moderate": "300ms",
            "deliberate": "400ms",
            "patient": "500ms",
            "theatrical": "750ms",
            "cinematic": "1000ms"
      },
      transitionTimingFunction: {
            "productive-standard": "cubic-bezier(0.2, 0, 0.38, 0.9)",
            "productive-entrance": "cubic-bezier(0, 0, 0.38, 0.9)",
            "productive-exit": "cubic-bezier(0.2, 0, 1, 0.9)",
            "expressive-standard": "cubic-bezier(0.4, 0.14, 0.3, 1)",
            "expressive-entrance": "cubic-bezier(0, 0, 0.3, 1)",
            "expressive-exit": "cubic-bezier(0.4, 0.14, 1, 1)",
            "utility-linear": "linear",
            "linear": "linear",
            "utility-emphasized": "cubic-bezier(0.4, 0, 0.6, 1)",
            "emphasized": "cubic-bezier(0.4, 0, 0.6, 1)",
            "utility-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      },
      transitionDelay: {
            "none": "0ms",
            "micro": "50ms",
            "brief": "100ms",
            "short": "200ms",
            "medium": "300ms",
            "long": "500ms"
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
      fontSize: {
            "desktop-xs": "0.75rem",
            "desktop-sm": "0.875rem",
            "desktop-base": "1rem",
            "desktop-lg": "1.125rem",
            "desktop-xl": "1.25rem",
            "desktop-2xl": "1.5rem",
            "desktop-3xl": "1.875rem",
            "desktop-4xl": "2.25rem",
            "desktop-5xl": "3rem",
            "desktop-6xl": "3.75rem",
            "desktop-7xl": "4.5rem",
            "desktop-8xl": "6rem",
            "desktop-9xl": "8rem",
            "mobile-xs": "0.6875rem",
            "mobile-sm": "0.8125rem",
            "mobile-base": "1rem",
            "mobile-lg": "1.0625rem",
            "mobile-xl": "1.1875rem",
            "mobile-2xl": "1.375rem",
            "mobile-3xl": "1.625rem",
            "mobile-4xl": "1.875rem",
            "mobile-5xl": "2.25rem",
            "mobile-6xl": "2.625rem",
            "mobile-7xl": "3rem",
            "mobile-8xl": "3.5rem",
            "para-xs": "0.75rem",
            "para-sm": "0.875rem",
            "para-md": "1rem",
            "para-lg": "1.125rem",
            "para-xl": "1.25rem",
            "h1-sm": "2.25rem",
            "h1-md": "3rem",
            "h1-lg": "3.75rem",
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
            "btn-sm": "0.875rem",
            "btn-md": "1rem",
            "btn-lg": "1.125rem",
            "icon-sm": "1rem",
            "icon-md": "1.25rem",
            "icon-lg": "1.5rem",
            "icon-xl": "2.25rem",
            "caption": "0.75rem",
            "overline": "0.75rem"
      },
      lineHeight: {
            "desktop-none": 1,
            "desktop-tight": 1.25,
            "desktop-snug": 1.375,
            "desktop-normal": 1.5,
            "desktop-relaxed": 1.75,
            "desktop-loose": 2,
            "mobile-none": 1,
            "mobile-tight": 1.3,
            "mobile-snug": 1.4,
            "mobile-normal": 1.5,
            "mobile-relaxed": 1.8,
            "mobile-loose": 2.1
      },
      fontWeight: {
            "100": 100,
            "200": 200,
            "300": 300,
            "400": 400,
            "500": 500,
            "600": 600,
            "700": 700,
            "800": 800,
            "900": 900
      },
      fontFamily: {
            "sans": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            "serif": "Georgia, Cambria, 'Times New Roman', Times, serif",
            "mono": "'Fira Code', 'SF Mono', 'Monaco', 'Cascadia Code', 'Courier New', Courier, monospace",
            "display": "Inter, system-ui, sans-serif"
      },
      letterSpacing: {
            "desktop-tightest": "-0.05em",
            "desktop-tighter": "-0.02em",
            "desktop-tight": "-0.01em",
            "desktop-normal": "0",
            "desktop-wide": "0.01em",
            "desktop-wider": "0.02em",
            "desktop-widest": "0.05em",
            "desktop-ultra": "0.1em",
            "mobile-tightest": "-0.03em",
            "mobile-tighter": "-0.015em",
            "mobile-tight": "-0.005em",
            "mobile-normal": "0",
            "mobile-wide": "0.015em",
            "mobile-wider": "0.025em",
            "mobile-widest": "0.06em",
            "mobile-ultra": "0.12em"
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
            "background-primary": "var(--background-gradient-primary)",
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
            "0": "0rem",
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
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "component-xs": "0.25rem",
            "component-sm": "0.5rem",
            "component-md": "1rem",
            "component-lg": "1.5rem",
            "component-xl": "2rem",
            "stack-xs": "0.25rem",
            "stack-sm": "0.5rem",
            "stack-md": "1rem",
            "stack-lg": "1.5rem",
            "stack-xl": "3rem",
            "inline-xs": "0.25rem",
            "inline-sm": "0.5rem",
            "inline-md": "1rem",
            "inline-lg": "1.5rem",
            "inset-xs": "0.25rem",
            "inset-sm": "0.5rem",
            "inset-md": "0.75rem",
            "inset-lg": "1rem",
            "inset-xl": "1.5rem",
            "inset-2xl": "2rem",
            "layout-container-xs": "1rem",
            "layout-container-sm": "1.5rem",
            "layout-container-md": "2rem",
            "layout-container-lg": "3rem",
            "layout-container-xl": "4rem",
            "layout-section-sm": "3rem",
            "layout-section-md": "4rem",
            "layout-section-lg": "6rem",
            "layout-section-xl": "8rem",
            "grid-xs": "0.5rem",
            "grid-sm": "1rem",
            "grid-md": "1.5rem",
            "grid-lg": "2rem",
            "grid-xl": "3rem",
            "paragraph-desktop-none": "0",
            "paragraph-desktop-tight": "0.75em",
            "paragraph-desktop-comfortable": "1em",
            "paragraph-desktop-relaxed": "1.25em",
            "paragraph-desktop-spacious": "1.5em",
            "paragraph-desktop-dramatic": "2em",
            "paragraph-mobile-none": "0",
            "paragraph-mobile-tight": "0.875em",
            "paragraph-mobile-comfortable": "1.125em",
            "paragraph-mobile-relaxed": "1.375em",
            "paragraph-mobile-spacious": "1.625em",
            "paragraph-mobile-dramatic": "2.25em",
            "xs": "0.25rem",
            "sm": "0.5rem",
            "md": "1rem",
            "lg": "1.5rem",
            "xl": "2rem",
            "2xl": "3rem",
            "3xl": "4rem",
            "4xl": "5rem",
            "5xl": "6rem",
            "px": "1px"
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
            "1": "repeat(1, minmax(0, 1fr))",
            "2": "repeat(2, minmax(0, 1fr))",
            "3": "repeat(3, minmax(0, 1fr))",
            "4": "repeat(4, minmax(0, 1fr))",
            "5": "repeat(5, minmax(0, 1fr))",
            "6": "repeat(6, minmax(0, 1fr))",
            "7": "repeat(7, minmax(0, 1fr))",
            "8": "repeat(8, minmax(0, 1fr))",
            "9": "repeat(9, minmax(0, 1fr))",
            "10": "repeat(10, minmax(0, 1fr))",
            "11": "repeat(11, minmax(0, 1fr))",
            "12": "repeat(12, minmax(0, 1fr))",
            "auto": "auto",
            "full": "1fr",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content",
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
          "2xl": "1536px",
          "tablet": "640px",
          "desktop": "1024px",
          "wide": "1280px",
          "ultrawide": "1536px"
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
                  "gridTemplateColumns": "repeat(1, 1fr)",
                  "gap": "32px"
            },
            ".grid-pattern-features": {
                  "display": "grid",
                  "gridTemplateColumns": "repeat(1, 1fr)",
                  "gap": "24px"
            },
            ".grid-pattern-pricing": {
                  "display": "grid",
                  "gridTemplateColumns": "repeat(1, 1fr)",
                  "gap": "32px"
            },
            ".grid-pattern-testimonials": {
                  "display": "grid",
                  "gridTemplateColumns": "repeat(1, 1fr)",
                  "gap": "24px"
            },
            ".grid-pattern-gallery": {
                  "display": "grid",
                  "gridTemplateColumns": "repeat(2, 1fr)",
                  "gap": "8px"
            },
            ".grid-pattern-blog": {
                  "display": "grid",
                  "gridTemplateColumns": "repeat(1, 1fr)",
                  "gap": "32px"
            },
            ".state-success": {
                  "borderColor": "#10B981",
                  "backgroundColor": "#ECFDF5",
                  "color": "#047857"
            },
            ".state-error": {
                  "borderColor": "#F04438",
                  "backgroundColor": "#FEF3F2",
                  "color": "#B91C1C"
            },
            ".state-warning": {
                  "borderColor": "#D97706",
                  "backgroundColor": "#FFFBEB",
                  "color": "#78350F"
            },
            ".state-info": {
                  "borderColor": "#2E90FA",
                  "backgroundColor": "#EFF8FF",
                  "color": "#175CD3"
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
                  "boxShadow": "0 1px 3px 0 rgba(26, 29, 46, 0.1), 0 1px 2px -1px rgba(26, 29, 46, 0.1)",
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
            },
            ".text-heading-h1-sm": {
                  "fontSize": "1.875rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "-0.02em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h1-md": {
                  "fontSize": "2.25rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "-0.02em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h1-lg": {
                  "fontSize": "3rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "-0.02em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h1-xl": {
                  "fontSize": "3.75rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "-0.02em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h2-sm": {
                  "fontSize": "1.5rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "-0.01em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h2-md": {
                  "fontSize": "1.875rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "-0.01em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h2-lg": {
                  "fontSize": "2.25rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "-0.01em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h3-sm": {
                  "fontSize": "1.25rem",
                  "lineHeight": 1.375,
                  "fontWeight": 600,
                  "letterSpacing": "-0.01em"
            },
            ".text-heading-h3-md": {
                  "fontSize": "1.5rem",
                  "lineHeight": 1.375,
                  "fontWeight": 600,
                  "letterSpacing": "-0.01em"
            },
            ".text-heading-h3-lg": {
                  "fontSize": "1.875rem",
                  "lineHeight": 1.375,
                  "fontWeight": 600,
                  "letterSpacing": "-0.01em"
            },
            ".text-heading-h4-sm": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600
            },
            ".text-heading-h4-md": {
                  "fontSize": "1.25rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600
            },
            ".text-heading-h5-sm": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600
            },
            ".text-heading-h5-md": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600
            },
            ".text-heading-h6-sm": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": "0.01em"
            },
            ".text-heading-h6-md": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600
            },
            ".text-body-xs": {
                  "fontSize": "0.6875rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-sm": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-md": {
                  "fontSize": "1rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-lg": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-xl": {
                  "fontSize": "1.1875rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-semibold-sm": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.75,
                  "fontWeight": 600,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-semibold-md": {
                  "fontSize": "1rem",
                  "lineHeight": 1.75,
                  "fontWeight": 600,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-semibold-lg": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1.75,
                  "fontWeight": 600,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-xs": {
                  "fontSize": "0.6875rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-sm": {
                  "fontSize": "0.75rem",
                  "lineHeight": 1.25,
                  "fontWeight": 500,
                  "letterSpacing": "0.01em",
                  "textTransform": "uppercase"
            },
            ".text-label-md": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-lg": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-bold-sm": {
                  "fontSize": "0.75rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "0.01em",
                  "textTransform": "uppercase"
            },
            ".text-label-bold-md": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.5,
                  "fontWeight": 700,
                  "letterSpacing": "0.01em"
            },
            ".text-link-sm": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-md": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-lg": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-standalone-sm": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-standalone-md": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-standalone-lg": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-navigation-sm": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-navigation-md": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline-sm": {
                  "fontSize": "0.6875rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.06em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline-md": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.06em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline-lg": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.06em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline-display": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "0.05em",
                  "fontFamily": "Inter, system-ui, sans-serif",
                  "textTransform": "uppercase"
            },
            ".text-quote-sm": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "fontFamily": "Georgia, Cambria, 'Times New Roman', Times, serif",
                  "fontStyle": "italic"
            },
            ".text-quote-md": {
                  "fontSize": "1.25rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "fontFamily": "Georgia, Cambria, 'Times New Roman', Times, serif",
                  "fontStyle": "italic"
            },
            ".text-quote-lg": {
                  "fontSize": "1.375rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-attribution-sm": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-quote-attribution-md": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-quote-detail-sm": {
                  "fontSize": "0.75rem",
                  "lineHeight": 1.5,
                  "fontWeight": 400,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-quote-detail-md": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.5,
                  "fontWeight": 400,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-button-sm": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-button-md": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-button-lg": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-heading-h1-mobile": {
                  "fontSize": "2.25rem",
                  "lineHeight": 1.3,
                  "fontWeight": 700,
                  "letterSpacing": "-0.015em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h2-mobile": {
                  "fontSize": "1.875rem",
                  "lineHeight": 1.3,
                  "fontWeight": 700,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h3-mobile": {
                  "fontSize": "1.625rem",
                  "lineHeight": 1.4,
                  "fontWeight": 600,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h4-mobile": {
                  "fontSize": "1.375rem",
                  "lineHeight": 1.4,
                  "fontWeight": 600,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h5-mobile": {
                  "fontSize": "1.1875rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h6-mobile": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, sans-serif",
                  "textTransform": "uppercase"
            },
            ".text-body-xs-mobile": {
                  "fontSize": "0.6875rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-sm-mobile": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-sm-alt-mobile": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1.3,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-md-mobile": {
                  "fontSize": "1rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-lg-mobile": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-lg-alt-mobile": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1.5,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-xl-mobile": {
                  "fontSize": "1.1875rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-xs-mobile": {
                  "fontSize": "0.6875rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-sm-alt-mobile": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-md-mobile": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-md-alt-mobile": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-lg-mobile": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-lg-alt-mobile": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-sm-mobile": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-md-mobile": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-lg-mobile": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline-sm-mobile": {
                  "fontSize": "0.6875rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.06em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline-md-mobile": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.06em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline-lg-mobile": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.06em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-quote-body-mobile": {
                  "fontSize": "1.1875rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-lg-mobile": {
                  "fontSize": "1.375rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-xl-mobile": {
                  "fontSize": "1.625rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-2xl-mobile": {
                  "fontSize": "1.875rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-attribution-mobile": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-quote-detail-mobile": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1.5,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-button-sm-mobile": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-button-md-mobile": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-button-lg-mobile": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-heading-h1-desktop": {
                  "fontSize": "3.75rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "-0.02em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h2-desktop": {
                  "fontSize": "3rem",
                  "lineHeight": 1.25,
                  "fontWeight": 700,
                  "letterSpacing": "-0.01em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h3-desktop": {
                  "fontSize": "1.875rem",
                  "lineHeight": 1.375,
                  "fontWeight": 600,
                  "letterSpacing": "-0.01em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h4-desktop": {
                  "fontSize": "1.5rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h5-desktop": {
                  "fontSize": "1.25rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h6-desktop": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": "0.02em",
                  "fontFamily": "Inter, system-ui, sans-serif",
                  "textTransform": "uppercase"
            },
            ".text-body-xs-desktop": {
                  "fontSize": "0.75rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-sm-desktop": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-sm-alt-desktop": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.25,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-md-desktop": {
                  "fontSize": "1rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-lg-desktop": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-lg-alt-desktop": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1.5,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-xl-desktop": {
                  "fontSize": "1.25rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-xs-desktop": {
                  "fontSize": "0.75rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": "0.02em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-sm-alt-desktop": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.02em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-md-desktop": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": "0.02em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-md-alt-desktop": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.02em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-lg-desktop": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": "0.02em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-lg-alt-desktop": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.02em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-sm-desktop": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-md-desktop": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link-lg-desktop": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline-sm-desktop": {
                  "fontSize": "0.75rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.05em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline-md-desktop": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.05em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline-lg-desktop": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.05em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-quote-body-desktop": {
                  "fontSize": "1.5rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "letterSpacing": "-0.01em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-lg-desktop": {
                  "fontSize": "1.875rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "letterSpacing": "-0.01em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-xl-desktop": {
                  "fontSize": "2.25rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "letterSpacing": "-0.01em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-2xl-desktop": {
                  "fontSize": "3rem",
                  "lineHeight": 1.75,
                  "fontWeight": 400,
                  "letterSpacing": "-0.01em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-attribution-desktop": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-quote-detail-desktop": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1.5,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-button-sm-desktop": {
                  "fontSize": "0.875rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-button-md-desktop": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-button-lg-desktop": {
                  "fontSize": "1.125rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-heading-h1": {
                  "fontSize": "2.25rem",
                  "lineHeight": 1.3,
                  "fontWeight": 700,
                  "letterSpacing": "-0.015em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, sans-serif",
                  "textTransform": "uppercase"
            },
            ".text-heading-h2": {
                  "fontSize": "1.875rem",
                  "lineHeight": 1.3,
                  "fontWeight": 700,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h3": {
                  "fontSize": "1.625rem",
                  "lineHeight": 1.4,
                  "fontWeight": 600,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h4": {
                  "fontSize": "1.375rem",
                  "lineHeight": 1.4,
                  "fontWeight": 600,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h5": {
                  "fontSize": "1.1875rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, sans-serif"
            },
            ".text-heading-h6": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, sans-serif",
                  "textTransform": "uppercase"
            },
            ".text-body-sm-alt": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1.3,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body": {
                  "fontSize": "1rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-body-lg-alt": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1.5,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-sm-alt": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-md-alt": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-label-lg-alt": {
                  "fontSize": "1.0625rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.025em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-link": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-overline": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1,
                  "fontWeight": 600,
                  "letterSpacing": "0.06em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-quote-body": {
                  "fontSize": "1.1875rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1.5,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-quote-xl": {
                  "fontSize": "1.625rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-2xl": {
                  "fontSize": "1.875rem",
                  "lineHeight": 1.8,
                  "fontWeight": 400,
                  "letterSpacing": "-0.005em",
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  "fontStyle": "italic"
            },
            ".text-quote-attribution": {
                  "fontSize": "1rem",
                  "lineHeight": 1.5,
                  "fontWeight": 600,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-quote-detail": {
                  "fontSize": "0.8125rem",
                  "lineHeight": 1.5,
                  "fontWeight": 400,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            },
            ".text-button": {
                  "fontSize": "1rem",
                  "lineHeight": 1,
                  "fontWeight": 500,
                  "letterSpacing": 0,
                  "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            }
      })
  }),
  plugin(function({ addComponents }) {
    addComponents({
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
                        "gridTemplateColumns": "repeat(2, 1fr)",
                        "gap": "32px"
                  },
                  ".grid-pattern-pricing": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(2, 1fr)",
                        "gap": "24px"
                  },
                  ".grid-pattern-testimonials": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(2, 1fr)",
                        "gap": "32px"
                  },
                  ".grid-pattern-gallery": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(3, 1fr)",
                        "gap": "16px"
                  },
                  ".grid-pattern-blog": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(2, 1fr)",
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
                        "gridTemplateColumns": "repeat(2, 1fr)",
                        "gap": "48px"
                  },
                  ".grid-pattern-features": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(3, 1fr)",
                        "gap": "40px"
                  },
                  ".grid-pattern-pricing": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(3, 1fr)",
                        "gap": "32px"
                  },
                  ".grid-pattern-testimonials": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(3, 1fr)",
                        "gap": "40px"
                  },
                  ".grid-pattern-gallery": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(4, 1fr)",
                        "gap": "24px"
                  },
                  ".grid-pattern-blog": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(3, 1fr)",
                        "gap": "40px"
                  },
                  ".text-heading-h1": {
                        "fontSize": "3.75rem",
                        "lineHeight": 1.25,
                        "fontWeight": 700,
                        "letterSpacing": "-0.02em",
                        "fontFamily": "Inter, system-ui, sans-serif"
                  },
                  ".text-heading": {
                        "fontSize": "1rem",
                        "lineHeight": 1.5,
                        "fontWeight": 600,
                        "letterSpacing": "0.02em",
                        "fontFamily": "Inter, system-ui, sans-serif",
                        "textTransform": "uppercase"
                  },
                  ".text-heading-h2": {
                        "fontSize": "3rem",
                        "lineHeight": 1.25,
                        "fontWeight": 700,
                        "letterSpacing": "-0.01em",
                        "fontFamily": "Inter, system-ui, sans-serif"
                  },
                  ".text-heading-h3": {
                        "fontSize": "1.875rem",
                        "lineHeight": 1.375,
                        "fontWeight": 600,
                        "letterSpacing": "-0.01em",
                        "fontFamily": "Inter, system-ui, sans-serif"
                  },
                  ".text-heading-h4": {
                        "fontSize": "1.5rem",
                        "lineHeight": 1.5,
                        "fontWeight": 600,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, sans-serif"
                  },
                  ".text-heading-h5": {
                        "fontSize": "1.25rem",
                        "lineHeight": 1.5,
                        "fontWeight": 600,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, sans-serif"
                  },
                  ".text-heading-h6": {
                        "fontSize": "1rem",
                        "lineHeight": 1.5,
                        "fontWeight": 600,
                        "letterSpacing": "0.02em",
                        "fontFamily": "Inter, system-ui, sans-serif",
                        "textTransform": "uppercase"
                  },
                  ".text-body-xs": {
                        "fontSize": "0.75rem",
                        "lineHeight": 1.75,
                        "fontWeight": 400,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-body-sm": {
                        "fontSize": "0.875rem",
                        "lineHeight": 1.75,
                        "fontWeight": 400,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-body-sm-alt": {
                        "fontSize": "0.875rem",
                        "lineHeight": 1.25,
                        "fontWeight": 400,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-body-md": {
                        "fontSize": "1rem",
                        "lineHeight": 1.75,
                        "fontWeight": 400,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-body": {
                        "fontSize": "1rem",
                        "lineHeight": 1.75,
                        "fontWeight": 400,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-body-lg": {
                        "fontSize": "1.125rem",
                        "lineHeight": 1.75,
                        "fontWeight": 400,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-body-lg-alt": {
                        "fontSize": "1.125rem",
                        "lineHeight": 1.5,
                        "fontWeight": 400,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-body-xl": {
                        "fontSize": "1.25rem",
                        "lineHeight": 1.75,
                        "fontWeight": 400,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-label-xs": {
                        "fontSize": "0.75rem",
                        "lineHeight": 1,
                        "fontWeight": 500,
                        "letterSpacing": "0.02em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-label-sm-alt": {
                        "fontSize": "0.875rem",
                        "lineHeight": 1,
                        "fontWeight": 600,
                        "letterSpacing": "0.02em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-label-md": {
                        "fontSize": "1rem",
                        "lineHeight": 1,
                        "fontWeight": 500,
                        "letterSpacing": "0.02em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-label": {
                        "fontSize": "1.125rem",
                        "lineHeight": 1,
                        "fontWeight": 600,
                        "letterSpacing": "0.02em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-label-md-alt": {
                        "fontSize": "1rem",
                        "lineHeight": 1,
                        "fontWeight": 600,
                        "letterSpacing": "0.02em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-label-lg": {
                        "fontSize": "1.125rem",
                        "lineHeight": 1,
                        "fontWeight": 500,
                        "letterSpacing": "0.02em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-label-lg-alt": {
                        "fontSize": "1.125rem",
                        "lineHeight": 1,
                        "fontWeight": 600,
                        "letterSpacing": "0.02em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-link-sm": {
                        "fontSize": "0.875rem",
                        "lineHeight": 1.5,
                        "fontWeight": 500,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-link-md": {
                        "fontSize": "1rem",
                        "lineHeight": 1.5,
                        "fontWeight": 500,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-link": {
                        "fontSize": "1rem",
                        "lineHeight": 1.5,
                        "fontWeight": 500,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-link-lg": {
                        "fontSize": "1.125rem",
                        "lineHeight": 1.5,
                        "fontWeight": 500,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-overline-sm": {
                        "fontSize": "0.75rem",
                        "lineHeight": 1,
                        "fontWeight": 600,
                        "letterSpacing": "0.05em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-overline-md": {
                        "fontSize": "0.875rem",
                        "lineHeight": 1,
                        "fontWeight": 600,
                        "letterSpacing": "0.05em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-overline": {
                        "fontSize": "0.875rem",
                        "lineHeight": 1,
                        "fontWeight": 600,
                        "letterSpacing": "0.05em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-overline-lg": {
                        "fontSize": "1rem",
                        "lineHeight": 1,
                        "fontWeight": 600,
                        "letterSpacing": "0.05em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-quote-body": {
                        "fontSize": "1.5rem",
                        "lineHeight": 1.75,
                        "fontWeight": 400,
                        "letterSpacing": "-0.01em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        "fontStyle": "italic"
                  },
                  ".text-quote": {
                        "fontSize": "0.875rem",
                        "lineHeight": 1.5,
                        "fontWeight": 400,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-quote-lg": {
                        "fontSize": "1.875rem",
                        "lineHeight": 1.75,
                        "fontWeight": 400,
                        "letterSpacing": "-0.01em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        "fontStyle": "italic"
                  },
                  ".text-quote-xl": {
                        "fontSize": "2.25rem",
                        "lineHeight": 1.75,
                        "fontWeight": 400,
                        "letterSpacing": "-0.01em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        "fontStyle": "italic"
                  },
                  ".text-quote-2xl": {
                        "fontSize": "3rem",
                        "lineHeight": 1.75,
                        "fontWeight": 400,
                        "letterSpacing": "-0.01em",
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        "fontStyle": "italic"
                  },
                  ".text-quote-attribution": {
                        "fontSize": "1rem",
                        "lineHeight": 1.5,
                        "fontWeight": 600,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-quote-detail": {
                        "fontSize": "0.875rem",
                        "lineHeight": 1.5,
                        "fontWeight": 400,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-button-sm": {
                        "fontSize": "0.875rem",
                        "lineHeight": 1,
                        "fontWeight": 500,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-button-md": {
                        "fontSize": "1rem",
                        "lineHeight": 1,
                        "fontWeight": 500,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-button": {
                        "fontSize": "1rem",
                        "lineHeight": 1,
                        "fontWeight": 500,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  },
                  ".text-button-lg": {
                        "fontSize": "1.125rem",
                        "lineHeight": 1,
                        "fontWeight": 500,
                        "letterSpacing": 0,
                        "fontFamily": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  }
            }
      })
  }),
  plugin(function({ addComponents }) {
    addComponents({
            ".motion-productive-instant": {
                  "transitionProperty": "all",
                  "transitionDuration": "100ms",
                  "transitionTimingFunction": "cubic-bezier(0.2, 0, 0.38, 0.9)"
            },
            ".motion-productive-quick": {
                  "transitionProperty": "all",
                  "transitionDuration": "150ms",
                  "transitionTimingFunction": "cubic-bezier(0.2, 0, 0.38, 0.9)"
            },
            ".motion-productive-base": {
                  "transitionProperty": "all",
                  "transitionDuration": "200ms",
                  "transitionTimingFunction": "cubic-bezier(0.2, 0, 0.38, 0.9)"
            },
            ".motion-productive-entrance": {
                  "transitionProperty": "all",
                  "transitionDuration": "150ms",
                  "transitionTimingFunction": "cubic-bezier(0, 0, 0.38, 0.9)"
            },
            ".motion-productive-exit": {
                  "transitionProperty": "all",
                  "transitionDuration": "100ms",
                  "transitionTimingFunction": "cubic-bezier(0.2, 0, 1, 0.9)"
            },
            ".motion-expressive-gentle": {
                  "transitionProperty": "all",
                  "transitionDuration": "300ms",
                  "transitionTimingFunction": "cubic-bezier(0.4, 0.14, 0.3, 1)"
            },
            ".motion-expressive-theatrical": {
                  "transitionProperty": "all",
                  "transitionDuration": "400ms",
                  "transitionTimingFunction": "cubic-bezier(0.4, 0.14, 0.3, 1)"
            },
            ".motion-expressive-cinematic": {
                  "transitionProperty": "all",
                  "transitionDuration": "500ms",
                  "transitionTimingFunction": "cubic-bezier(0.4, 0.14, 0.3, 1)"
            },
            ".motion-expressive-entrance": {
                  "transitionProperty": "all",
                  "transitionDuration": "400ms",
                  "transitionTimingFunction": "cubic-bezier(0, 0, 0.3, 1)",
                  "transitionDelay": "200ms"
            },
            ".motion-expressive-exit": {
                  "transitionProperty": "all",
                  "transitionDuration": "300ms",
                  "transitionTimingFunction": "cubic-bezier(0.4, 0.14, 1, 1)"
            },
            ".motion-utility-hover": {
                  "transitionProperty": "all",
                  "transitionDuration": "100ms",
                  "transitionTimingFunction": "cubic-bezier(0.2, 0, 0.38, 0.9)"
            },
            ".motion-utility-focus": {
                  "transitionProperty": "all",
                  "transitionTimingFunction": "linear"
            },
            ".motion-utility-collapse": {
                  "transitionProperty": "all",
                  "transitionDuration": "200ms",
                  "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.6, 1)"
            },
            ".motion-utility-expand": {
                  "transitionProperty": "all",
                  "transitionDuration": "300ms",
                  "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.6, 1)"
            }
      })
  })
]
};