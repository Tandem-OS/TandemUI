const fs = require('fs');
const path = require('path');

const { normalizeBorderRadius } = require('../normalizers/borderRadius.cjs');
const { normalizeBorderWidth } = require('../normalizers/borderWidth.cjs');
const { normalizeBreakpoints } = require('../normalizers/breakpoints.cjs');
const { normalizeContainer } = require('../normalizers/container.cjs');
const { normalizeGradients } = require('../normalizers/gradients.cjs');
const { normalizeGrid } = require('../normalizers/grid.cjs');
const { normalizeLayout } = require('../normalizers/layout.cjs');
const { normalizeShadows } = require('../normalizers/shadows.cjs');
const { normalizeFlexbox } = require('../normalizers/flexbox.cjs');
const { normalizeZIndex } = require('../normalizers/zIndex.cjs');
const { normalizeOpacity } = require('../normalizers/opacity.cjs');
const { normalizeSpacing } = require('../normalizers/spacing.cjs');
const { normalizeStates } = require('../normalizers/states.cjs');
const { normalizeTypography } = require('../normalizers/typography.cjs');
const { normalizeParagraphSpacing } = require('../normalizers/paragraphSpacing.cjs');
const { normalizeSemanticTypography } = require('../normalizers/semanticTypography.cjs');
const { normalizeResponsiveTypography } = require('../normalizers/normalizeResponsiveTypography.cjs');
const { normalizeColors } = require('../normalizers/colors.cjs');
const { normalizeMotion, normalizeSemanticMotion } = require('../normalizers/motion.cjs');

const TOKENS_DIR = path.resolve(__dirname, '../tokens');
const GENERATED_DIR = path.resolve(__dirname, '../generated');
const ROOT_DIR = path.resolve(__dirname, '../../../');

function read(file) {
  const filepath = path.join(TOKENS_DIR, file);
  if (!fs.existsSync(filepath)) {
    console.warn(`Warning: File not found: ${file}`);
    return null;
  }
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

function cleanPrimitives(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(cleanPrimitives);

  if ('rem' in obj) return obj.rem;
  if ('value' in obj) return obj.value;

  const result = {};
  Object.keys(obj).forEach(key => {
    if (key.startsWith('$')) return;
    if (['usage', 'description', 'rationale', 'type', 'comment'].includes(key)) return;
    result[key] = cleanPrimitives(obj[key]);
  });
  return result;
}

function flattenTypographyForMaster(nested) {
  if (!nested || typeof nested !== 'object') return nested;

  const flat = {};

  if (nested.desktop) {
    Object.entries(nested.desktop).forEach(([key, val]) => {
      flat[key] = val;
    });
  }

  return {
    ...nested,
    ...flat
  };
}

function resolveReferences(target, source) {
  const resolved = {};

  function getSourceValue(pathStr) {
    let result = source;
    const parts = pathStr.split('.');
    for (const p of parts) {
      result = result?.[p];
      if (result === undefined) return undefined;
    }
    return result;
  }

  function resolve(obj, currentTarget) {
    if (!obj) return;

    Object.entries(obj).forEach(([key, value]) => {
      if (['usage', 'rationale', 'description'].includes(key)) return;
      if (key === 'default' && typeof value === 'boolean') return;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        currentTarget[key] = {};
        resolve(value, currentTarget[key]);
      } else if (typeof value === 'string' && value.includes('{')) {
        let resolvedValue = value;
        resolvedValue = resolvedValue.replace(/\{([^}]+)\}/g, (match, pathStr) => {
          const val = getSourceValue(pathStr);

          if (val === undefined) {
            console.warn(`Could not resolve: ${pathStr} in key: ${key}`);
          }

          if (val !== undefined && typeof val !== 'object') return val;
          return match;
        });

        if (!isNaN(Number(resolvedValue)) && resolvedValue.trim() !== '') {
          currentTarget[key] = Number(resolvedValue);
        } else {
          currentTarget[key] = resolvedValue;
        }
      } else {
        currentTarget[key] = value;
      }
    });
  }
  resolve(target, resolved);
  return resolved;
}

function formatColorValue(value) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    const rawRgbPattern = /^\d{1,3}[\s]+\d{1,3}[\s]+\d{1,3}$/;
    if (rawRgbPattern.test(trimmed)) {
      return `rgb(${trimmed})`;
    }
    const commaRgbPattern = /^\d{1,3}[\s,]+\d{1,3}[\s,]+\d{1,3}$/;
    if (commaRgbPattern.test(trimmed)) {
      return `rgb(${trimmed.replace(/,/g, ' ')})`;
    }
  }
  return value;
}

function flattenForTailwindConfig(obj, prefix = '') {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (['usage', 'rationale', 'description', 'type', 'comment', 'density', 'multiplier', 'personality'].includes(key) || key.startsWith('$')) return;
    if (key === 'default' && typeof value === 'boolean') return;
    if (Array.isArray(value)) return;

    const newKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object' && value !== null) {
      if (value.rem) {
        result[newKey] = value.rem;
      } else if (value.value !== undefined) {
        result[newKey] = value.value;
      } else {
        const nested = flattenForTailwindConfig(value, newKey);
        Object.assign(result, nested);
      }
    } else {
      result[newKey] = value;
    }
  });
  return result;
}

function extractTokenValues(tokens, prefix = '') {
  const result = {};
  if (!tokens) return result;
  Object.entries(tokens).forEach(([key, value]) => {
    const newKey = prefix ? `${prefix}-${key}` : key;
    if (value && typeof value === 'object') {
      // Opacity fix: Agar decimal key hai toh usay lo, warna value ko
      if (value.decimal !== undefined) {
        result[newKey] = value.decimal;
      } else if (value.value !== undefined) {
        result[newKey] = value.value;
      } else {
        const nested = extractTokenValues(value, newKey);
        Object.assign(result, nested);
      }
    } else {
      result[newKey] = value;
    }
  });
  return result;
}

function generateMotionPlugins(semanticMotion) {
  const components = {};
  
  if (!semanticMotion) return components;
  
  Object.entries(semanticMotion).forEach(([mode, modeData]) => {
    if (mode.startsWith('$') || typeof modeData !== 'object') return;
    
    Object.entries(modeData).forEach(([category, categoryData]) => {
      if (category === 'description' || category.startsWith('$')) return;
      if (typeof categoryData !== 'object') return;
      
      // Check if DIRECT pattern (entrance, exit, hover, focus, collapse, expand)
      // These have duration/easing directly on categoryData
      const isDirect = categoryData.duration !== undefined || categoryData.easing !== undefined;
      
      if (isDirect) {
        // DIRECT PATTERN: .motion-productive-entrance, .motion-utility-hover
        const className = `.motion-${mode}-${category}`;
        components[className] = { transitionProperty: 'all' };
        
        if (categoryData.duration) {
          let dur = categoryData.duration;
          if (typeof dur === 'number') dur = `${dur}ms`;
          components[className]['transitionDuration'] = dur;
        }
        if (categoryData.easing) {
          components[className]['transitionTimingFunction'] = categoryData.easing;
        }
        if (categoryData.delay) {
          let del = categoryData.delay;
          if (typeof del === 'number') del = `${del}ms`;
          components[className]['transitionDelay'] = del;
        }
      } else {
        // NESTED PATTERN: .motion-productive-instant, .motion-expressive-gentle
        Object.entries(categoryData).forEach(([name, value]) => {
          if (name.startsWith('$') || typeof value !== 'object') return;
          
          // Skip if no motion properties
          if (!value.duration && !value.easing) return;
          
          const className = `.motion-${mode}-${name}`;
          components[className] = { transitionProperty: 'all' };
          
          if (value.duration) {
            let dur = value.duration;
            if (typeof dur === 'number') dur = `${dur}ms`;
            components[className]['transitionDuration'] = dur;
          }
          if (value.easing) {
            components[className]['transitionTimingFunction'] = value.easing;
          }
          if (value.delay) {
            let del = value.delay;
            if (typeof del === 'number') del = `${del}ms`;
            components[className]['transitionDelay'] = del;
          }
        });
      }
    });
  });
  
  return components;
}

function generateCSS(
  lightColorsFlat,
  darkColorsFlat,
  primitiveGradients,
  lightGradients,
  darkGradients,
  lightShadows,
  darkShadows,
  spacingPrimitives,
  semanticSpacing,
  motionPrimitives,
  paragraphSpacing
) {
  let css = ':root {\n';

  Object.entries(lightColorsFlat).forEach(([key, value]) => {
    const formattedValue = formatColorValue(value);
    css += `  --${key}: ${formattedValue};\n`;
  });

  if (primitiveGradients) {
    Object.entries(primitiveGradients).forEach(([key, value]) => {
      css += `  --gradient-primitive-${key}: ${value};\n`;
    });
  }
  if (lightGradients) {
    Object.entries(lightGradients).forEach(([k, v]) => {
      css += `  --gradient-${k}: ${v};\n`;
    });
  }

  if (lightShadows) {
    const writeShadows = (obj, prefix = 'shadow') => {
      Object.entries(obj).forEach(([k, v]) => {
        const name = prefix ? `${prefix}-${k}` : k;
        if (typeof v === 'object') writeShadows(v, name);
        else css += `  --${name}: ${v};\n`;
      });
    };
    writeShadows(lightShadows);
  }

  function flattenAndWriteSpacing(obj, prefix) {
    Object.entries(obj).forEach(([k, v]) => {
      const varName = prefix ? `${prefix}-${k}` : k;
      if (typeof v === 'object' && v !== null) {
        if (v.value || v.rem) {
          const val = v.rem || v.value;
          const safeName = varName.replace('.', '_');
          css += `  --spacing-${safeName}: ${val};\n`;
        } else {
          flattenAndWriteSpacing(v, varName);
        }
      } else if (typeof v !== 'object') {
        const safeName = varName.replace('.', '_');
        css += `  --spacing-${safeName}: ${v};\n`;
      }
    });
  }

  if (spacingPrimitives) {
    Object.entries(spacingPrimitives).forEach(([k, v]) => {
      if (typeof v !== 'object' && !Array.isArray(v)) {
        css += `  --spacing-primitive-${k.replace('.', '_')}: ${v};\n`;
      }
    });
  }
  if (semanticSpacing) flattenAndWriteSpacing(semanticSpacing, '');
  if (paragraphSpacing) flattenAndWriteSpacing(paragraphSpacing, '');

  if (motionPrimitives) {
    if (motionPrimitives.duration) {
      Object.entries(motionPrimitives.duration).forEach(([k, v]) => {
        css += `  --motion-duration-${k}: ${v};\n`;
      });
    }
    if (motionPrimitives.easing) {
      Object.entries(motionPrimitives.easing).forEach(([k, v]) => {
        css += `  --motion-easing-${k}: ${v};\n`;
      });
    }
  }

  css += '}\n\n.dark {\n';

  Object.entries(darkColorsFlat).forEach(([key, value]) => {
    const formattedValue = formatColorValue(value);
    css += `  --${key}: ${formattedValue};\n`;
  });

  if (darkGradients) {
    Object.entries(darkGradients).forEach(([k, v]) => {
      css += `  --gradient-${k}: ${v};\n`;
    });
  }

  if (darkShadows) {
    const writeShadows = (obj, prefix = 'shadow') => {
      Object.entries(obj).forEach(([k, v]) => {
        const name = prefix ? `${prefix}-${k}` : k;
        if (typeof v === 'object') writeShadows(v, name);
        else css += `  --${name}: ${v};\n`;
      });
    };
    writeShadows(darkShadows);
  }

  css += '}\n';
  return css;
}

function generateTailwindColors(flatColors) {
  const colors = {};

  Object.keys(flatColors).forEach(key => {
    const parts = key.split('-');
    let current = colors;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (isLast) {
        current[part] = `var(--${key})`;
      } else {
        if (!current[part]) {
          current[part] = {};
        }
        if (typeof current[part] === 'string') {
          const tempVal = current[part];
          current[part] = { DEFAULT: tempVal };
        }
        current = current[part];
      }
    }
  });

  return colors;
}

function flattenForTailwind(obj, prefix = 'shadow', varPrefix = 'shadow') {
  const result = {};
  function recurse(current, currentKey) {
    Object.entries(current).forEach(([key, value]) => {
      const newKey = currentKey ? `${currentKey}-${key}` : key;
      if (typeof value === 'object' && value !== null) {
        recurse(value, newKey);
      } else {
        result[newKey] = `var(--${varPrefix}-${newKey})`;
      }
    });
  }
  recurse(obj, '');
  return result;
}

function generateSemanticPlugins(semanticFlex, semanticLayout, semanticGrid, semanticStates, semanticTypography, responsiveTypography) {
  const components = {};

  const getVal = (v) => {
    if (typeof v === 'object' && v?.value) return v.value;
    if (typeof v === 'object' && v?.rem) return v.rem;

    if (typeof v === 'string' && v.includes('{')) {
      console.error(`ERROR: Unresolved reference in plugin: ${v}`);
      return v;
    }

    return v;
  };

  const flexPropMap = {
    direction: 'flexDirection',
    justify: 'justifyContent',
    align: 'alignItems',
    wrap: 'flexWrap',
    gap: 'gap',
    minHeight: 'minHeight'
  };

  if (semanticFlex && semanticFlex.layouts) {
    Object.entries(semanticFlex.layouts).forEach(([key, value]) => {
      if (key.startsWith('$')) return;
      const className = `.layout-${key}`;
      components[className] = { display: 'flex' };
      Object.entries(value).forEach(([prop, val]) => {
        if (prop === 'usage') return;
        const cssProp = flexPropMap[prop] || prop;
        components[className][cssProp] = getVal(val);
      });
    });
  }

  if (semanticFlex && semanticFlex.componentPatterns) {
    Object.entries(semanticFlex.componentPatterns).forEach(([key, value]) => {
      if (key.startsWith('$')) return;
      const className = `.${key}`;
      components[className] = { display: 'flex' };
      Object.entries(value).forEach(([prop, val]) => {
        if (prop === 'usage') return;
        const cssProp = flexPropMap[prop] || prop;
        components[className][cssProp] = getVal(val);
      });
    });
  }

  const layoutPropMap = {
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom']
  };

  if (semanticLayout) {
    Object.entries(semanticLayout).forEach(([category, patterns]) => {
      if (category === 'spacing' || category.startsWith('$')) return;

      Object.entries(patterns).forEach(([name, styles]) => {
        if (name.startsWith('$')) return;
        const className = `.${category}-${name}`;
        components[className] = {};

        Object.entries(styles).forEach(([prop, val]) => {
          if (prop === 'usage' || prop === 'rationale' || prop === 'breakpoint') return;

          if (layoutPropMap[prop]) {
            layoutPropMap[prop].forEach(cssProp => {
              components[className][cssProp] = getVal(val);
            });
          } else {
            components[className][prop] = getVal(val);
          }
        });

        if (category === 'container' && styles.maxWidth) {
          components[className]['marginLeft'] = 'auto';
          components[className]['marginRight'] = 'auto';
          components[className]['width'] = '100%';
        }
      });
    });
  }

  const gridPropMap = {
    columns: 'gridTemplateColumns',
    rows: 'gridTemplateRows',
    gap: 'gap',
    autoFlow: 'gridAutoFlow'
  };

  if (semanticGrid) {
    const processGridPatterns = (patterns, prefix) => {
      Object.entries(patterns).forEach(([name, breakpoints]) => {
        if (name.startsWith('$')) return;
        const className = `.${prefix}-${name}`;

        Object.entries(breakpoints).forEach(([bp, styles]) => {
          if (bp === 'usage') return;

          const stylesObj = { display: 'grid' };

          Object.entries(styles).forEach(([prop, val]) => {
            if (prop === 'usage') return;
            const cssProp = gridPropMap[prop] || prop;
            if (cssProp === 'gridTemplateColumns' && typeof val === 'number') {
              stylesObj[cssProp] = `repeat(${val}, 1fr)`;
            } else {
              stylesObj[cssProp] = getVal(val);
            }
          });

          if (bp === 'mobile') {
            components[className] = { ...components[className], ...stylesObj };
          } else {
            const mediaQuery = `@media (min-width: ${bp === 'tablet' ? '768px' : '1024px'})`;
            components[mediaQuery] = components[mediaQuery] || {};
            components[mediaQuery][className] = stylesObj;
          }
        });
      });
    };

    if (semanticGrid.layouts) processGridPatterns(semanticGrid.layouts, 'grid');
    if (semanticGrid.componentPatterns) processGridPatterns(semanticGrid.componentPatterns, 'grid-pattern');
  }

  if (semanticStates && semanticStates.validation) {
    Object.entries(semanticStates.validation).forEach(([status, styles]) => {
      const className = `.state-${status}`;
      components[className] = {
        borderColor: styles.borderColor,
        backgroundColor: styles.backgroundColor,
        color: styles.textColor
      };
    });
  }

  if (semanticStates && semanticStates.interactive) {
    const interactive = semanticStates.interactive;
    const className = '.interactive';

    components[className] = {
      transitionProperty: 'all',
      transitionDuration: '150ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: interactive.default?.opacity || '1',
      transform: `scale(${interactive.default?.scale || 1})`
    };

    if (interactive.hover) {
      components[`${className}:hover`] = {
        transform: `scale(${interactive.hover.scale})`,
        boxShadow: interactive.hover.shadow,
        opacity: interactive.hover.opacity,
        filter: `brightness(1.05)`
      };
    }

    if (interactive.active) {
      components[`${className}:active`] = {
        transform: `scale(${interactive.active.scale})`,
        boxShadow: interactive.active.shadow,
        opacity: interactive.active.opacity,
        filter: `brightness(0.95)`
      };
    }

    if (interactive.disabled) {
      components[`${className}:disabled`] = {
        opacity: interactive.disabled.opacity,
        cursor: interactive.disabled.cursor,
        pointerEvents: interactive.disabled.pointerEvents
      };
      components['.state-disabled'] = {
        opacity: interactive.disabled.opacity,
        cursor: interactive.disabled.cursor,
        pointerEvents: interactive.disabled.pointerEvents
      };
    }
  }

  if (semanticTypography) {
    Object.entries(semanticTypography).forEach(([category, variants]) => {
      if (category.startsWith('$')) return;

      Object.entries(variants).forEach(([variant, sizes]) => {
        if (variant.startsWith('$')) return;

        const isLeaf = sizes.fontSize || sizes.lineHeight || sizes.tailwind || sizes.fontWeight;

        if (isLeaf) {
          const className = `.text-${category}-${variant}`;

          const styles = {};
          if (sizes.fontSize) styles.fontSize = getVal(sizes.fontSize);
          if (sizes.lineHeight) styles.lineHeight = getVal(sizes.lineHeight);
          if (sizes.fontWeight) styles.fontWeight = getVal(sizes.fontWeight);
          if (sizes.letterSpacing) styles.letterSpacing = getVal(sizes.letterSpacing);
          if (sizes.fontFamily) styles.fontFamily = getVal(sizes.fontFamily);
          if (sizes.transform) styles.textTransform = getVal(sizes.transform);
          if (sizes.textDecoration) styles.textDecoration = getVal(sizes.textDecoration);
          if (sizes.fontStyle) styles.fontStyle = getVal(sizes.fontStyle);

          if (Object.keys(styles).length > 0) {
            components[className] = styles;
          }
        } else {
          Object.entries(sizes).forEach(([sizeKey, props]) => {
            if (['usage', 'default'].includes(sizeKey)) return;

            const className = `.text-${category}-${variant}-${sizeKey}`;

            const styles = {};
            if (props.fontSize) styles.fontSize = getVal(props.fontSize);
            if (props.lineHeight) styles.lineHeight = getVal(props.lineHeight);
            if (props.fontWeight) styles.fontWeight = getVal(props.fontWeight);
            if (props.letterSpacing) styles.letterSpacing = getVal(props.letterSpacing);
            if (props.fontFamily) styles.fontFamily = getVal(props.fontFamily);
            if (props.transform) styles.textTransform = getVal(props.transform);
            if (props.textDecoration) styles.textDecoration = getVal(props.textDecoration);
            if (props.fontStyle) styles.fontStyle = getVal(props.fontStyle);

            if (Object.keys(styles).length > 0) {
              components[className] = styles;
            }
          });
        }
      });
    });
  }

  if (responsiveTypography) {
    if (responsiveTypography.mobile) {
      Object.entries(responsiveTypography.mobile).forEach(([className, styles]) => {
        components[className] = styles;
      });
    }

    if (responsiveTypography.desktop) {
      Object.entries(responsiveTypography.desktop).forEach(([className, styles]) => {
        components[className] = styles;
      });
    }

    if (responsiveTypography.responsive) {
      Object.entries(responsiveTypography.responsive).forEach(([key, value]) => {
        if (key.startsWith('@media')) {
          if (!components[key]) {
            components[key] = {};
          }
          Object.entries(value).forEach(([cls, styles]) => {
            components[key][cls] = styles;
          });
        } else {
          components[key] = value;
        }
      });
    }
  }

  return components;
}

function generate() {
  console.log('Generating tokens with merged color system...\n');

  const fontSizeRaw = read('primitives/primitives_fontSize.json');
  const lineHeightRaw = read('primitives/primitives_lineHeight.json');
  const fontWeightRaw = read('primitives/primitives_fontWeight.json');
  const fontFamilyRaw = read('primitives/primitives_fontFamilies.json');
  const letterSpacingRaw = read('primitives/primitives_letterSpacing.json');
  const paragraphSpacingRaw = read('primitives/primitives_paragraphSpacing.json');
  const spacingPrimitivesRaw = read('primitives/spacing_primitives.json');
  const gradientPrimitivesRaw = read('primitives/primitives_gradients.json');
  const flexPrimitivesRaw = read('primitives/primitives_flexbox.json');
  const zIndexPrimitivesRaw = read('primitives/primitives_zIndex.json');
  const opacityPrimitivesRaw = read('primitives/primitives_opacity.json');
  const borderRadiusRaw = read('primitives/primitives_borderRadius.json');
  const borderWidthRaw = read('primitives/primitives_borderWidth.json');
  const breakpointsRaw = read('primitives/primitives_breakpoints.json');
  const containerRaw = read('primitives/primitives_container.json');
  const gridRaw = read('primitives/primitives_grid.json');
  const layoutRaw = read('primitives/primitives_layout.json');
  const shadowsPrimitivesRaw = read('primitives/primitives_shadows.json');

  const colorPrimitivesRaw = read('primitives/primitives.colors.json');

  const newLightThemeRaw = read('themes/semantic_theme_light.json');
  const newDarkThemeRaw = read('themes/semantic_theme_dark.json');

  const oldLightThemeRaw = read('themes/light.json');
  const oldDarkThemeRaw = read('themes/dark.json');

  const semanticSpacingRaw = read('semantic/spacing_semantic.json');
  const semanticFlexRaw = read('semantic/semantic_flexbox.json');
  const semanticLayoutRaw = read('semantic/semantic_layout.json');
  const semanticGridRaw = read('semantic/semantic_grid.json');
  const semanticStatesRaw = read('semantic/semantic_states.json');
  const semanticTypographyRaw = read('semantic/font_complete_semantic.json');
  const responsiveTypographyRaw = read('semantic/semantic_typography_mobile_desktop.json');
  const semanticBreakpointsRaw = read('semantic/semantic_breakpoints.json');

  const lightGradientsRaw = read('semantic/semantic_light_gradients.json');
  const darkGradientsRaw = read('semantic/semantic_dark_gradients.json');
  const lightShadowsRaw = read('semantic/semantic_light_shadows.json');
  const darkShadowsRaw = read('semantic/semantic_dark_shadows.json');

  const motionPrimitivesRaw = read('primitives/primitives.motion.json');
  const semanticMotionRaw = read('semantic/semantic.motion.json');

  if (!spacingPrimitivesRaw || !semanticSpacingRaw) {
    console.error('Error: Spacing files are missing!');
    process.exit(1);
  }

  const colorResult = normalizeColors(
    colorPrimitivesRaw,
    newLightThemeRaw,
    newDarkThemeRaw,
    oldLightThemeRaw,
    oldDarkThemeRaw
  );

  const colorPrimitives = colorResult.primitives;
  const lightColorsFlat = colorResult.lightFlat;
  const darkColorsFlat = colorResult.darkFlat;
  const tailwindColors = colorResult.tailwindColors;

  console.log('Colors merged successfully:');
  console.log(`  - Light theme: ${Object.keys(lightColorsFlat).length} variables`);
  console.log(`  - Dark theme: ${Object.keys(darkColorsFlat).length} variables`);

  const cleanFontSize = cleanPrimitives(fontSizeRaw);
  const cleanLineHeight = cleanPrimitives(lineHeightRaw);
  const cleanFontWeight = cleanPrimitives(fontWeightRaw);
  const cleanFontFamily = cleanPrimitives(fontFamilyRaw);
  const cleanLetterSpacing = cleanPrimitives(letterSpacingRaw);
  const cleanParagraphSpacing = cleanPrimitives(paragraphSpacingRaw);
  const cleanSpacing = cleanPrimitives(spacingPrimitivesRaw);

  const masterSource = {
    primitives: {
      spacing: cleanSpacing,
      colors: colorPrimitives,
      flexbox: cleanPrimitives(flexPrimitivesRaw),
      zIndex: cleanPrimitives(zIndexPrimitivesRaw),
      opacity: cleanPrimitives(opacityPrimitivesRaw),
      shadows: normalizeShadows(shadowsPrimitivesRaw, { colors: colorPrimitives }),
      layout: cleanPrimitives(layoutRaw),
      grid: cleanPrimitives(gridRaw),
      breakpoints: cleanPrimitives(breakpointsRaw),
      container: normalizeContainer(containerRaw),
      motion: motionPrimitivesRaw,
      fontSize: flattenTypographyForMaster(cleanFontSize),
      lineHeight: flattenTypographyForMaster(cleanLineHeight),
      fontWeight: cleanFontWeight,
      fontFamilies: cleanFontFamily,
      letterSpacing: flattenTypographyForMaster(cleanLetterSpacing),
      paragraphSpacing: cleanParagraphSpacing
    }
  };

  const fontSize = flattenForTailwindConfig(normalizeTypography(fontSizeRaw || {}));
  const lineHeight = flattenForTailwindConfig(normalizeTypography(lineHeightRaw || {}));
  const fontWeight = flattenForTailwindConfig(normalizeTypography(fontWeightRaw || {}));
  const fontFamily = cleanPrimitives(fontFamilyRaw || {});
  const letterSpacing = flattenForTailwindConfig(normalizeTypography(letterSpacingRaw || {}));

  const zIndexPrimitives = flattenForTailwindConfig(normalizeZIndex(zIndexPrimitivesRaw));
  const semanticZIndexRawData = read('semantic/semantic_zIndex.json');
  const semanticZIndexNormalized = normalizeZIndex(semanticZIndexRawData || {});
  const semanticZIndexResolved = resolveReferences(semanticZIndexNormalized, masterSource);
  const semanticZIndexValues = extractTokenValues(semanticZIndexResolved);

  const tailwindZIndex = {
    ...zIndexPrimitives,
    ...semanticZIndexValues
  };
  // Primitives opacity (0, 5, 10...)
  const opacityPrimitives = flattenForTailwindConfig(normalizeOpacity(opacityPrimitivesRaw));

  // Semantic opacity (overlay-light, disabled, subtle...)
  const semanticOpacityRawData = read('semantic/semantic_opacity.json');
  const semanticOpacityNormalized = normalizeOpacity(semanticOpacityRawData || {});
  const semanticOpacityResolved = resolveReferences(semanticOpacityNormalized, masterSource);
  const semanticOpacityValues = extractTokenValues(semanticOpacityResolved);

  // Final Tailwind Opacity (Dono ko merge karein)
  const tailwindOpacity = {
    ...opacityPrimitives,
    ...semanticOpacityValues
  };


  const spacing = normalizeSpacing(spacingPrimitivesRaw);
  const semanticSpacingNormalized = normalizeSpacing(semanticSpacingRaw);
  const paragraphSpacingNormalized = normalizeParagraphSpacing(paragraphSpacingRaw || {});
  const semanticSpacing = resolveReferences(semanticSpacingNormalized, masterSource);

  const standardAliases = {
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
  };

  const tailwindSpacing = {
    ...flattenForTailwindConfig({ ...spacing, ...semanticSpacing, ...paragraphSpacingNormalized }),
    ...standardAliases
  };

  const borderRadius = normalizeBorderRadius(borderRadiusRaw);
  // Primitives normalize
  const motion = normalizeMotion(motionPrimitivesRaw);

  // Semantic normalize + resolve references
  const semanticMotionNormalized = normalizeSemanticMotion(semanticMotionRaw);
  const semanticMotion = resolveReferences(semanticMotionNormalized, masterSource); const borderWidth = normalizeBorderWidth(borderWidthRaw);

  const breakpoints = normalizeBreakpoints(breakpointsRaw);
  const semanticScreens = {};
  if (semanticBreakpointsRaw) {
    Object.entries(semanticBreakpointsRaw).forEach(([key, val]) => {
      if (key.startsWith('$')) return;
      let breakpointValue = null;

      const resolveVal = (v) => {
        if (!v) return null;
        if (v.includes('{')) {
          const match = v.match(/\.([a-z0-9]+)\}/);
          if (match && breakpoints[match[1]]) return breakpoints[match[1]];
        }
        return v;
      };

      if (val.min) {
        breakpointValue = resolveVal(val.min);
      } else if (val.range) {
        const start = val.range.split('-')[0].trim();
        if (start && start !== '0' && start !== '0px') breakpointValue = start;
      }

      if (breakpointValue) {
        semanticScreens[key] = breakpointValue;
      }
    });
  }
  const finalScreens = { ...breakpoints, ...semanticScreens };

  const layout = normalizeLayout(layoutRaw);
  const grid = normalizeGrid(gridRaw);

  const validGridColumns = {};
  if (grid.columns) {
    Object.entries(grid.columns).forEach(([key, value]) => {
      if (typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)))) {
        validGridColumns[key] = `repeat(${value}, minmax(0, 1fr))`;
      } else {
        validGridColumns[key] = value;
      }
    });
  }

  const mergedGridTemplateColumns = {
    ...validGridColumns,
    ...grid.templateColumns
  };

  const flex = normalizeFlexbox(flexPrimitivesRaw);

  const semanticFlex = resolveReferences(normalizeFlexbox(semanticFlexRaw), masterSource);
  const semanticLayout = resolveReferences(normalizeLayout(semanticLayoutRaw), masterSource);
  const semanticGrid = resolveReferences(normalizeGrid(semanticGridRaw), masterSource);
  const semanticStates = resolveReferences(normalizeStates(semanticStatesRaw), masterSource);

  const rawSemantic = normalizeSemanticTypography(semanticTypographyRaw || {});
  const semanticTypography = resolveReferences(rawSemantic, masterSource);

  const rawResponsive = normalizeResponsiveTypography(responsiveTypographyRaw || {});
  const responsiveTypography = resolveReferences(rawResponsive, masterSource);

  const lightShadows = lightShadowsRaw ? normalizeShadows(lightShadowsRaw, { colors: colorPrimitives }) : null;
  const darkShadows = darkShadowsRaw ? normalizeShadows(darkShadowsRaw, { colors: colorPrimitives }) : null;
  const shadowVars = lightShadows ? flattenForTailwind(lightShadows, '', 'shadow') : {};

  const gradientPrimitives = normalizeGradients(gradientPrimitivesRaw, colorPrimitives);
  const lightGradients = lightGradientsRaw ? normalizeGradients(lightGradientsRaw, colorPrimitives) : null;
  const darkGradients = darkGradientsRaw ? normalizeGradients(darkGradientsRaw, colorPrimitives) : null;

  const gradientVars = {};

  Object.entries(lightColorsFlat).forEach(([key, value]) => {
    if (typeof value === 'string' && (value.includes('gradient') || key.includes('gradient'))) {
      const cleanKey = key.replace('gradient-', '');
      gradientVars[cleanKey] = `var(--${key})`;
    }
  });

  if (gradientPrimitives) {
    Object.keys(gradientPrimitives).forEach(k => {
      gradientVars[`primitive-${k}`] = `var(--gradient-primitive-${k})`;
    });
  }

  if (lightGradients) {
    Object.keys(lightGradients).forEach(k => {
      if (!gradientVars[k]) {
        gradientVars[k] = `var(--gradient-${k})`;
      }
    });
  }

  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }

  fs.writeFileSync(
    path.join(GENERATED_DIR, 'theme.css'),
    generateCSS(
      lightColorsFlat,
      darkColorsFlat,
      gradientPrimitives,
      lightGradients,
      darkGradients,
      lightShadows,
      darkShadows,
      spacing,
      semanticSpacing,
      normalizeMotion(motionPrimitivesRaw),
      paragraphSpacingNormalized
    )
  );
  console.log('theme.css generated');

  const allComponents = generateSemanticPlugins(
    semanticFlex,
    semanticLayout,
    semanticGrid,
    semanticStates,
    semanticTypography,
    responsiveTypography
  );

  // Generate motion plugin classes
  const motionComponents = generateMotionPlugins(semanticMotion);

  const mediaQueryComponents = {};
  const baseComponents = {};

  Object.entries(allComponents).forEach(([key, value]) => {
    if (key.startsWith('@media')) {
      mediaQueryComponents[key] = value;
    } else {
      baseComponents[key] = value;
    }
  });

  const json = (obj) => JSON.stringify(obj || {}, null, 6).replace(/\n/g, '\n      ');

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: ${json(tailwindColors)},
      transitionDuration: ${json(motion.duration)},
      transitionTimingFunction: ${json(motion.easing)},
      transitionDelay: ${json(motion.delay)},
      borderRadius: ${json(borderRadius)},
      borderWidth: ${json(borderWidth)},
      fontSize: ${json(fontSize)},
      lineHeight: ${json(lineHeight)},
      fontWeight: ${json(fontWeight)},
      fontFamily: ${json(fontFamily)},
      letterSpacing: ${json(letterSpacing)},
      maxWidth: ${json(layout.maxWidth)},
      minWidth: ${json(layout.minWidth)},
      width: ${json(layout.width)},
      maxHeight: ${json(layout.maxHeight)},
      minHeight: ${json(layout.minHeight)},
      height: ${json(layout.height)},
      aspectRatio: ${json(layout.aspectRatio)},
      inset: ${json(layout.inset)},
      objectFit: ${json(layout.objectFit)},
      objectPosition: ${json(layout.objectPosition)},
      overflow: ${json(layout.overflow)},
      backgroundImage: ${json(gradientVars)},
      boxShadow: ${json(shadowVars)},
      zIndex: ${json(tailwindZIndex)},
      opacity: ${json(tailwindOpacity)},
      spacing: ${json(tailwindSpacing)},
      gap: ${json(grid.gap)},
      gridTemplateColumns: ${json(mergedGridTemplateColumns)},
      gridTemplateRows: ${json(grid.templateRows)},
      gridColumn: ${json(grid.columnSpan)},
      gridColumnStart: ${json(grid.columnStart)},
      gridColumnEnd: ${json(grid.columnEnd)},
      gridRow: ${json(grid.rowSpan)},
      gridRowStart: ${json(grid.rowStart)},
      gridRowEnd: ${json(grid.rowEnd)},
      gridAutoFlow: ${json(grid.autoFlow)},
      flex: ${json(flex.flex)},
      flexBasis: ${json(flex.flexBasis)},
      flexDirection: ${json(flex.flexDirection)},
      flexGrow: ${json(flex.flexGrow)},
      flexShrink: ${json(flex.flexShrink)},
      flexWrap: ${json(flex.flexWrap)},
      order: ${json(flex.order)},
      justifyContent: ${json(flex.justifyContent)},
      justifyItems: ${json(flex.justifyItems)},
      justifySelf: ${json(flex.justifySelf)},
      alignContent: ${json(flex.alignContent)},
      alignItems: ${json(flex.alignItems)},
      alignSelf: ${json(flex.alignSelf)},
      placeContent: ${json(flex.placeContent)},
      placeItems: ${json(flex.placeItems)},
      placeSelf: ${json(flex.placeSelf)}
    },
    screens: ${JSON.stringify(finalScreens, null, 6).replace(/\n/g, '\n    ')}
  },
plugins: [
  plugin(function({ addComponents }) {
    addComponents(${json(baseComponents)})
  }),
  plugin(function({ addComponents }) {
    addComponents(${json(mediaQueryComponents)})
  }),
  plugin(function({ addComponents }) {
    addComponents(${json(motionComponents)})
  })
]
};`;

  fs.writeFileSync(path.join(ROOT_DIR, 'tailwind.config.js'), tailwindConfig);

  console.log('tailwind.config.js generated');
  console.log('\nColor System:');
  console.log('  OLD Classes: bg-background-primary, text-text-primary, border-border-default');
  console.log('  NEW Classes: bg-brand-primary-base, bg-button-primary-background');
  console.log('\nTypography:');
  console.log('  Old: .text-heading-h1-sm, .text-body-md');
  console.log('  Responsive: .text-heading-h1 (auto)');
  console.log('\nDone!');
}

generate();