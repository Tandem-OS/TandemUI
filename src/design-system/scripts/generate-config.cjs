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
const { normalizeMotion } = require('../normalizers/motion.cjs');
// NEW: Import Typography Normalizer
const { normalizeTypography } = require('../normalizers/typography.cjs');

const TOKENS_DIR = path.resolve(__dirname, '../tokens');
const GENERATED_DIR = path.resolve(__dirname, '../generated');
const ROOT_DIR = path.resolve(__dirname, '../../../');

function read(file) {
  const filepath = path.join(TOKENS_DIR, file);
  if (!fs.existsSync(filepath)) return null;
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

function resolveReferences(target, source) {
  const resolved = {};
  function resolve(obj, currentTarget) {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        currentTarget[key] = {};
        resolve(value, currentTarget[key]);
      } else if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
        const path = value.slice(1, -1).split('.');
        let result = source;
        for (const p of path) {
          result = result?.[p];
          if (result === undefined) break;
        }
        currentTarget[key] = result !== undefined ? result : value;
      } else {
        currentTarget[key] = value;
      }
    });
  }
  resolve(target, resolved);
  return resolved;
}

function generateCSS(light, dark, primitiveGradients, lightGradients, darkGradients, lightShadows, darkShadows, spacingPrimitives, semanticSpacing, motionPrimitives) {
  let css = ':root {\n';

  function writeVars(obj, prefix = '') {
    Object.entries(obj).forEach(([key, value]) => {
      const varName = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'object' && value !== null) {
        writeVars(value, varName);
      } else {
        css += `  --${varName}: ${value};\n`;
      }
    });
  }

  writeVars(light);

  if (primitiveGradients) {
    Object.entries(primitiveGradients).forEach(([key, value]) => {
      css += `  --gradient-primitive-${key}: ${value};\n`;
    });
  }

  if (lightGradients) Object.entries(lightGradients).forEach(([k, v]) => css += `  --gradient-${k}: ${v};\n`);
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

  if (spacingPrimitives) {
    Object.entries(spacingPrimitives).forEach(([k, v]) => css += `  --spacing-primitive-${k.replace('.', '_')}: ${v};\n`);
  }
  if (semanticSpacing) {
    Object.entries(semanticSpacing).forEach(([k, v]) => css += `  --spacing-${k}: ${v};\n`);
  }

  if (motionPrimitives) {
    if (motionPrimitives.duration) {
      Object.entries(motionPrimitives.duration).forEach(([k, v]) => css += `  --motion-duration-${k}: ${v};\n`);
    }
    if (motionPrimitives.easing) {
      Object.entries(motionPrimitives.easing).forEach(([k, v]) => css += `  --motion-easing-${k}: ${v};\n`);
    }
  }

  css += '}\n\n.dark {\n';
  writeVars(dark);
  if (darkGradients) Object.entries(darkGradients).forEach(([k, v]) => css += `  --gradient-${k}: ${v};\n`);
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

function generateTailwindColors(theme) {
  const colors = {};
  function extract(obj, prefix = '') {
    Object.entries(obj).forEach(([key, value]) => {
      const name = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'object') extract(value, name);
      else {
        const [category, ...rest] = name.split('-');
        if (!colors[category]) colors[category] = {};
        const prop = rest.join('-') || 'DEFAULT';
        colors[category][prop] = `var(--${name})`;
      }
    });
  }
  extract(theme);
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

function generateSemanticPlugins(semanticFlex, semanticLayout, semanticGrid, semanticStates) {
  const components = {};

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
        components[className][cssProp] = val;
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
        components[className][cssProp] = val;
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
          if (prop === 'usage' || prop === 'rationale') return;

          if (layoutPropMap[prop]) {
            layoutPropMap[prop].forEach(cssProp => {
              components[className][cssProp] = val;
            });
          } else {
            components[className][prop] = val;
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
            stylesObj[cssProp] = val;
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

  if (semanticStates) {
    if (semanticStates.validation) {
      Object.entries(semanticStates.validation).forEach(([status, styles]) => {
        const className = `.state-${status}`;
        components[className] = {
          borderColor: styles.borderColor,
          backgroundColor: styles.backgroundColor,
          color: styles.textColor
        };
      });
    }

    if (semanticStates.interactive) {
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
  }

  return JSON.stringify(components, null, 6).replace(/\n/g, '\n      ');
}

function extractTokenValues(tokens, prefix = '') {
  const result = {};
  Object.entries(tokens).forEach(([key, value]) => {
    const newKey = prefix ? `${prefix}-${key}` : key;
    if (value && typeof value === 'object' && value.value !== undefined) {
      result[newKey] = value.value;
    } else if (value && typeof value === 'object') {
      const nested = extractTokenValues(value, newKey);
      Object.assign(result, nested);
    } else {
      result[newKey] = value;
    }
  });
  return result;
}

function generate() {
  console.log('🚀 Generating tokens...\n');

  const colorPrimitivesRaw = read('primitives/colors.json');
  const gradientPrimitivesRaw = read('primitives/primitives_gradients.json');
  const flexPrimitivesRaw = read('primitives/primitives_flexbox.json');
  const zIndexPrimitivesRaw = read('primitives/primitives_zIndex.json');
  const opacityPrimitivesRaw = read('primitives/primitives_opacity.json');
  const spacingPrimitivesRaw = read('primitives/primitives_spacing.json');
  const motionPrimitivesRaw = read('primitives/primitives_motion.json');

  const borderRadiusRaw = read('primitives/primitives_borderRadius.json');
  const borderWidthRaw = read('primitives/primitives_borderWidth.json');
  const breakpointsRaw = read('primitives/primitives_breakpoints.json');
  const containerRaw = read('primitives/primitives_container.json');
  const gridRaw = read('primitives/primitives_grid.json');
  const layoutRaw = read('primitives/primitives_layout.json');
  const shadowsPrimitivesRaw = read('primitives/primitives_shadows.json');
  
  // NEW: Read Typography Files
  const fontSizeRaw = read('primitives/primitives_fontSize.json');
  const lineHeightRaw = read('primitives/primitives_lineHeight.json');
  // FIX: Added FontFamily Read
  const fontFamilyRaw = read('primitives/primitives_fontFamily.json');

  const lightThemeRaw = read('themes/light.json');
  const darkThemeRaw = read('themes/dark.json');

  const semanticFlexRaw = read('semantic/semantic_flexbox.json');
  const semanticLayoutRaw = read('semantic/semantic_layout.json');
  const semanticGridRaw = read('semantic/semantic_grid.json');
  const semanticStatesRaw = read('semantic/semantic_states.json');
  const semanticZIndexRaw = read('semantic/semantic_zIndex.json');
  const semanticOpacityRaw = read('semantic/semantic_opacity.json');
  const semanticSpacingRaw = read('semantic/semantic_spacing.json');
  const semanticBreakpointsRaw = read('semantic/semantic_breakpoints.json');

  const lightGradientsRaw = read('semantic/semantic_light_gradients.json');
  const darkGradientsRaw = read('semantic/semantic_dark_gradients.json');
  const lightShadowsRaw = read('semantic/semantic_light_shadows.json');
  const darkShadowsRaw = read('semantic/semantic_dark_shadows.json');

  const missingFiles = [];
  if (!colorPrimitivesRaw) missingFiles.push('primitives/colors.json');
  if (!breakpointsRaw) missingFiles.push('primitives/primitives_breakpoints.json');

  if (missingFiles.length > 0) {
    console.error('❌ Error: The following required token files are missing:');
    missingFiles.forEach(f => console.error(`   - ${f}`));
    process.exit(1);
  }

  const flex = normalizeFlexbox(flexPrimitivesRaw);
  const zIndex = normalizeZIndex(zIndexPrimitivesRaw);
  const opacity = normalizeOpacity(opacityPrimitivesRaw);
  const spacing = normalizeSpacing(spacingPrimitivesRaw);
  const motion = normalizeMotion(motionPrimitivesRaw);
  const borderRadius = normalizeBorderRadius(borderRadiusRaw);
  const borderWidth = normalizeBorderWidth(borderWidthRaw);
  const breakpoints = normalizeBreakpoints(breakpointsRaw);
  const container = normalizeContainer(containerRaw);
  const grid = normalizeGrid(gridRaw);
  const layout = normalizeLayout(layoutRaw);
  
  // NEW: Normalize Typography using Generic Normalizer
  const fontSize = normalizeTypography(fontSizeRaw || {});
  const lineHeight = normalizeTypography(lineHeightRaw || {});
  // FIX: Normalize FontFamily
  const fontFamily = normalizeTypography(fontFamilyRaw || {});
  
  const shadowsPrimitives = normalizeShadows(shadowsPrimitivesRaw, { colors: colorPrimitivesRaw });
  const gradientPrimitives = normalizeGradients(gradientPrimitivesRaw, colorPrimitivesRaw);

  const semanticLayoutNormalized = normalizeLayout(semanticLayoutRaw);
  const semanticFlexNormalized = normalizeFlexbox(semanticFlexRaw);
  const semanticGridNormalized = normalizeGrid(semanticGridRaw);
  const semanticZIndexNormalized = normalizeZIndex(semanticZIndexRaw);
  const semanticOpacityNormalized = normalizeOpacity(semanticOpacityRaw);
  const semanticSpacingNormalized = normalizeSpacing(semanticSpacingRaw);
  const semanticBreakpointsNormalized = semanticBreakpointsRaw ? normalizeBreakpoints(semanticBreakpointsRaw) : {};

  const masterSource = {
    colors: colorPrimitivesRaw,
    primitives: {
      colors: colorPrimitivesRaw,
      flexbox: flex,
      zIndex: zIndex,
      opacity: opacity,
      spacing: spacing,
      motion: motion,
      layout: layout,
      grid: grid,
      shadows: shadowsPrimitives,
      breakpoints: breakpoints,
      fontSize: fontSize,
      lineHeight: lineHeight,
      fontFamily: fontFamily // Added to master source
    },
    semantic: {
        layout: semanticLayoutNormalized,
        flexbox: semanticFlexNormalized,
        grid: semanticGridNormalized,
        zIndex: semanticZIndexNormalized,
        opacity: semanticOpacityNormalized,
        spacing: semanticSpacingNormalized,
        breakpoints: semanticBreakpointsNormalized
    }
  };

  const light = resolveReferences(lightThemeRaw.colors || lightThemeRaw, { colors: colorPrimitivesRaw });
  const dark = resolveReferences(darkThemeRaw.colors || darkThemeRaw, { colors: colorPrimitivesRaw });

  const semanticFlex = resolveReferences(semanticFlexNormalized, masterSource);
  const semanticLayout = resolveReferences(semanticLayoutNormalized, masterSource);
  const semanticGrid = resolveReferences(semanticGridNormalized, masterSource);
  const semanticStates = resolveReferences(normalizeStates(semanticStatesRaw), masterSource);
  const semanticZIndex = resolveReferences(semanticZIndexNormalized, masterSource);
  const semanticOpacity = resolveReferences(semanticOpacityNormalized, masterSource);
  
  const semanticBreakpoints = resolveReferences(semanticBreakpointsNormalized, masterSource);
  const semanticSpacing = resolveReferences(semanticSpacingNormalized, masterSource);

  const lightGradients = lightGradientsRaw ? normalizeGradients(lightGradientsRaw, colorPrimitivesRaw) : null;
  const darkGradients = darkGradientsRaw ? normalizeGradients(darkGradientsRaw, colorPrimitivesRaw) : null;
  
  const lightShadows = lightShadowsRaw ? normalizeShadows(lightShadowsRaw, { colors: colorPrimitivesRaw }) : null;
  const darkShadows = darkShadowsRaw ? normalizeShadows(darkShadowsRaw, { colors: colorPrimitivesRaw }) : null;

  if (!fs.existsSync(GENERATED_DIR)) fs.mkdirSync(GENERATED_DIR, { recursive: true });

  fs.writeFileSync(
    path.join(GENERATED_DIR, 'theme.css'),
    generateCSS(light, dark, gradientPrimitives, lightGradients, darkGradients, lightShadows, darkShadows, spacing, semanticSpacing, motion)
  );
  console.log('✅ theme.css');

  const colors = generateTailwindColors(light);

  const gradientVars = {};
  if (gradientPrimitives) Object.keys(gradientPrimitives).forEach(k => gradientVars[`primitive-${k}`] = `var(--gradient-primitive-${k})`);
  if (lightGradients) Object.keys(lightGradients).forEach(k => gradientVars[k] = `var(--gradient-${k})`);

  const shadowVars = lightShadows ? flattenForTailwind(lightShadows, '', 'shadow') : {};

  const componentClasses = generateSemanticPlugins(semanticFlex, semanticLayout, semanticGrid, semanticStates);

  const tailwindZIndex = { ...zIndex, ...extractTokenValues(semanticZIndex) };
  const tailwindOpacity = { ...opacity, ...extractTokenValues(semanticOpacity) };
  const tailwindSpacing = { ...spacing, ...extractTokenValues(semanticSpacing) };

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
      colors: ${json(colors)},
      borderRadius: ${json(borderRadius)},
      borderWidth: ${json(borderWidth)},
      // NEW: Added Typography
      fontSize: ${json(fontSize)},
      lineHeight: ${json(lineHeight)},
      fontFamily: ${json(fontFamily)},
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
      transitionDuration: ${json(motion.duration)},
      transitionTimingFunction: ${json(motion.easing)},
      gap: ${json(grid.gap)},
      gridTemplateColumns: ${json(grid.templateColumns)},
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
    screens: ${JSON.stringify(breakpoints, null, 6).replace(/\n/g, '\n    ')}
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents(${componentClasses})
    })
  ]
};`;

  fs.writeFileSync(path.join(ROOT_DIR, 'tailwind.config.js'), tailwindConfig);
  console.log('✅ tailwind.config.js');

  const tokensTS = `export const colors = ${JSON.stringify(colors, null, 2)};
export const borderRadius = ${JSON.stringify(borderRadius, null, 2)};
export const borderWidth = ${JSON.stringify(borderWidth, null, 2)};
// NEW: Typography Exports
export const fontSize = ${JSON.stringify(fontSize, null, 2)};
export const lineHeight = ${JSON.stringify(lineHeight, null, 2)};
export const fontFamily = ${JSON.stringify(fontFamily, null, 2)};
export const breakpoints = {
  primitives: ${JSON.stringify(breakpoints, null, 2)},
  semantic: ${JSON.stringify(semanticBreakpoints, null, 2)}
};
export const container = ${JSON.stringify(container, null, 2)};
export const gradients = ${JSON.stringify(gradientVars, null, 2)};
export const shadows = ${JSON.stringify(shadowVars, null, 2)};
export const grid = ${JSON.stringify(grid, null, 2)};
export const layout = ${JSON.stringify(layout, null, 2)};
export const zIndex = {
  primitives: ${JSON.stringify(zIndex, null, 2)},
  semantic: ${JSON.stringify(semanticZIndex, null, 2)}
};
export const opacity = {
  primitives: ${JSON.stringify(opacity, null, 2)},
  semantic: ${JSON.stringify(semanticOpacity, null, 2)}
};
export const spacing = {
  primitives: ${JSON.stringify(spacing, null, 2)},
  semantic: ${JSON.stringify(semanticSpacing, null, 2)}
};
export const motion = ${JSON.stringify(motion, null, 2)};
export const flex = {
  primitives: ${JSON.stringify(flex, null, 2)},
  semantic: ${JSON.stringify(semanticFlex, null, 2)}
};
export default { colors, borderRadius, borderWidth, fontSize, lineHeight, fontFamily, breakpoints, container, gradients, shadows, grid, layout, zIndex, opacity, spacing, motion, flex };`;

  fs.writeFileSync(path.join(GENERATED_DIR, 'tokens.ts'), tokensTS);
  console.log('✅ tokens.ts');
  console.log('🎉 Done!\n');
}

generate();