/**
 * Colors Normalizer
 * Tandem Design System - Color Token Processing
 * Single Source of Truth: primitives_colors.json
 */

function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;
  hex = hex.replace('#', '');
  if (hex.length !== 6) return null;

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function isMetaKey(key) {
  return key.startsWith('$');
}

function isSpecialValue(value) {
  if (typeof value !== 'string') return false;
  const specials = ['none', 'transparent', 'inherit', 'currentColor', 'auto'];
  return specials.includes(value.toLowerCase());
}

function isHexColor(value) {
  if (typeof value !== 'string') return false;
  return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value);
}

function isRgbColor(value) {
  if (typeof value !== 'string') return false;
  return value.startsWith('rgb(') || value.startsWith('rgba(');
}

function isDotNotationReference(value) {
  if (typeof value !== 'string') return false;
  if (isHexColor(value) || isRgbColor(value) || isSpecialValue(value)) return false;
  const withoutOpacity = value.split('/')[0].trim();
  return /^[a-zA-Z]+\.[a-zA-Z0-9]+$/.test(withoutOpacity);
}

function isBracketReference(value) {
  if (typeof value !== 'string') return false;
  return value.includes('{colors.') || value.includes('{primitives.colors.');
}

function isInternalReference(value) {
  if (typeof value !== 'string') return false;
  return value.includes('{this.');
}

/**
 * Enhance primitives with legacy keys at script level
 * HARDCODED values - no external file reading
 */
function enhancePrimitives(primitives) {
  const enhanced = JSON.parse(JSON.stringify(primitives));

  if (!enhanced.white) {
    enhanced.white = enhanced.neutral?.['0'] || '#FFFFFF';
  }
  if (!enhanced.black) {
    enhanced.black = '#000000';
  }
  if (!enhanced.transparent) {
    enhanced.transparent = 'transparent';
  }
  if (!enhanced['pastel-green']) {
    enhanced['pastel-green'] = '#7ce87c';
  }
  if (!enhanced.current) {
    enhanced.current = 'currentColor';
  }

  return enhanced;
}

/**
 * Resolve dot notation: "emerald.500" or "neutral.900/0.24"
 */

function resolveDotNotation(value, primitives) {
  if (!value || typeof value !== 'string') return value;

  let processed = value;

  // Pehle opacity resolve karein (e.g. emerald.500/0.5)
  if (processed.includes('/')) {
    const parts = processed.split('/');
    const colorRef = parts[0].trim();
    let opacity = parseFloat(parts[1]);
    if (opacity > 1) opacity = opacity / 100;

    const refParts = colorRef.split('.');
    if (refParts.length === 2) {
      const [family, shade] = refParts;
      const colorVal = primitives[family]?.[shade];
      if (colorVal && colorVal.startsWith('#')) {
        const rgb = hexToRgb(colorVal);
        if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
      }
    }
  }

  // Phir regex ke zariye string mein maujood tokens resolve karein (Gradients ke liye)
  return processed.replace(/([a-zA-Z]+)\.([0-9]+)/g, (match, family, shade) => {
    const colorFamily = primitives[family];
    if (colorFamily && colorFamily[shade]) {
      return colorFamily[shade];
    }
    return match;
  });
}

/**
 * Resolve bracket references: "{colors.slate.900}"
 */
function resolveBracketReference(value, primitives) {
  if (!value || typeof value !== 'string') return value;

  let resolved = value;

  resolved = resolved.replace(
    /\{primitives\.colors\.([a-zA-Z0-9.]+)\}(?:\/([\d.]+))?/g,
    (match, path, opacity) => {
      const parts = path.split('.');
      let colorVal = primitives;

      for (const part of parts) {
        colorVal = colorVal?.[part];
        if (!colorVal) break;
      }

      if (typeof colorVal === 'string') {
        if (opacity) {
          const op = parseFloat(opacity) > 1 ? parseFloat(opacity) / 100 : parseFloat(opacity);
          const rgb = hexToRgb(colorVal);
          if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${op})`;
        }
        return colorVal;
      }
      return match;
    }
  );

  resolved = resolved.replace(
    /\{colors\.([a-zA-Z0-9.-]+)\}/g,
    (match, path) => {
      const parts = path.split('.');
      let colorVal = primitives;

      for (const part of parts) {
        colorVal = colorVal?.[part];
        if (!colorVal) break;
      }

      if (typeof colorVal === 'string') {
        return colorVal;
      }
      return match;
    }
  );

  return resolved;
}

/**
 * Build internal references map
 */
function buildInternalRefsMap(obj) {
  const refs = {};

  function traverse(current, currentPath) {
    if (!current || typeof current !== 'object') return;

    for (const [key, value] of Object.entries(current)) {
      if (isMetaKey(key)) continue;

      const path = currentPath ? `${currentPath}.${key}` : key;

      if (typeof value === 'string') {
        refs[path] = value;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        traverse(value, path);
      }
    }
  }

  traverse(obj, '');
  return refs;
}

/**
 * Resolve internal references: "{this.brand.primary.base}"
 */
function resolveInternalReference(value, internalRefs, primitives, visited = new Set()) {
  if (!value || typeof value !== 'string') return value;
  if (!value.includes('{this.')) return value;

  let resolved = value;

  resolved = resolved.replace(/\{this\.([^}]+)\}/g, (match, refPath) => {
    if (visited.has(refPath)) {
      console.warn(`Circular reference detected: ${refPath}`);
      return match;
    }

    visited.add(refPath);
    let refValue = internalRefs[refPath];

    if (!refValue) return match;

    if (isInternalReference(refValue)) {
      refValue = resolveInternalReference(refValue, internalRefs, primitives, new Set(visited));
    }

    if (isDotNotationReference(refValue)) {
      refValue = resolveDotNotation(refValue, primitives);
    }

    if (isBracketReference(refValue)) {
      refValue = resolveBracketReference(refValue, primitives);
    }

    return refValue;
  });

  return resolved;
}

/**
 * Process a single value
 */
function processValue(value, primitives, internalRefs) {
  if (value === null || value === undefined) return value;

  if (typeof value === 'string') {
    if (isSpecialValue(value)) return value;
    if (isHexColor(value)) return value;
    if (isRgbColor(value)) return value;

    let resolved = value;

    if (isInternalReference(resolved)) {
      resolved = resolveInternalReference(resolved, internalRefs, primitives);
    }

    if (isBracketReference(resolved)) {
      resolved = resolveBracketReference(resolved, primitives);
    }

    if (isDotNotationReference(resolved)) {
      resolved = resolveDotNotation(resolved, primitives);
    }

    return resolved;
  }

  if (Array.isArray(value)) {
    return value.map(item => processValue(item, primitives, internalRefs));
  }

  if (typeof value === 'object') {
    const processed = {};
    for (const [key, val] of Object.entries(value)) {
      if (isMetaKey(key)) continue;
      processed[key] = processValue(val, primitives, internalRefs);
    }
    return processed;
  }

  return value;
}

/**
 * Normalize semantic colors
 */
function normalizeSemanticColors(semanticData, primitives) {
  if (!semanticData) return {};

  const internalRefs = buildInternalRefsMap(semanticData);
  const result = {};

  for (const [key, value] of Object.entries(semanticData)) {
    if (isMetaKey(key)) continue;
    result[key] = processValue(value, primitives, internalRefs);
  }

  return result;
}

/**
 * Flatten nested object
 */
function flattenColors(obj, prefix = '') {
  const result = {};

  if (!obj || typeof obj !== 'object') return result;

  for (const [key, value] of Object.entries(obj)) {
    if (isMetaKey(key)) continue;

    const newKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nested = flattenColors(value, newKey);
      Object.assign(result, nested);
    } else if (typeof value === 'string' || typeof value === 'number') {
      result[newKey] = value;
    }
  }

  return result;
}

/**
 * Generate Tailwind color config
 */
function generateTailwindColorConfig(flatColors) {
  const config = {};

  for (const key of Object.keys(flatColors)) {
    const parts = key.split('-');
    let current = config;

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
  }

  return config;
}

/**
 * MAIN FUNCTION - Normalize and Merge all colors
 * Single Source of Truth: primitives_colors.json
 * 
 * @param {Object} primitivesRaw - primitives_colors.json (Tandem) - SINGLE SOURCE
 * @param {Object} newLightSemantic - semantic_theme_light.json (Tandem)
 * @param {Object} newDarkSemantic - semantic_theme_dark.json (Tandem)
 * @param {Object} oldLightSemantic - light.json (Legacy classes)
 * @param {Object} oldDarkSemantic - dark.json (Legacy classes)
 */
function normalizeColors(primitivesRaw, newLightSemantic, newDarkSemantic, oldLightSemantic, oldDarkSemantic) {
  const primitives = enhancePrimitives(primitivesRaw);

  const oldLightNormalized = normalizeSemanticColors(oldLightSemantic?.colors || oldLightSemantic, primitives);
  const oldDarkNormalized = normalizeSemanticColors(oldDarkSemantic?.colors || oldDarkSemantic, primitives);
  const newLightNormalized = normalizeSemanticColors(newLightSemantic, primitives);
  const newDarkNormalized = normalizeSemanticColors(newDarkSemantic, primitives);

  // Manual Deep Merge logic taake koi data miss na ho
  const deepMerge = (target, source) => {
    const merged = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && target[key]) {
        merged[key] = deepMerge(target[key], source[key]);
      } else {
        merged[key] = source[key];
      }
    }
    return merged;
  };

  const lightMerged = deepMerge(newLightNormalized, oldLightNormalized);
  const darkMerged = deepMerge(newDarkNormalized, oldDarkNormalized);

  const lightFlat = flattenColors(lightMerged);
  const darkFlat = flattenColors(darkMerged);
  const tailwindColors = generateTailwindColorConfig(lightFlat);

  return { primitives, light: lightMerged, dark: darkMerged, lightFlat, darkFlat, tailwindColors };
}

/**
 * Generate CSS for theme variables
 */
function generateColorCSS(lightFlat, darkFlat) {
  let css = ':root {\n';

  for (const [key, value] of Object.entries(lightFlat)) {
    css += `  --${key}: ${value};\n`;
  }

  css += '}\n\n.dark {\n';

  for (const [key, value] of Object.entries(darkFlat)) {
    css += `  --${key}: ${value};\n`;
  }

  css += '}\n';

  return css;
}

module.exports = {
  normalizeColors,
  normalizeSemanticColors,
  enhancePrimitives,
  flattenColors,
  generateTailwindColorConfig,
  generateColorCSS,
  resolveDotNotation,
  resolveBracketReference,
  hexToRgb
};