/**
 * Converts Hex to RGB object
 */
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * Resolves references like {primitives.colors.indigo.500} to actual hex values.
 * Handles hex/opacity syntax (#000000/0.5 -> rgba)
 */
function resolveColorReference(colorString, primitives) {
  if (!colorString || typeof colorString !== 'string') return colorString;

  // Resolve {primitives.colors...}
  let resolved = colorString.replace(/\{primitives\.colors\.([^}]+)\}/g, (match, path) => {
    const parts = path.split('.');
    let value = primitives;
    for (const part of parts) {
      value = value?.[part];
      if (!value) return match;
    }
    return value;
  });

  // Convert Hex/Opacity to RGBA
  resolved = resolved.replace(/(#[0-9a-fA-F]{6})\/([\d.]+)/g, (match, hex, opacity) => {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  });

  return resolved;
}

/**
 * Constructs CSS gradient string from complex primitive object (Linear, Radial, Conic)
 */
function buildGradientFromObject(obj, primitives) {
  // 1. Linear Gradient
  if (obj.type === 'linear-gradient') {
    const angle = obj.angle || 180;
    const stops = obj.stops.map(stop => {
      const color = resolveColorReference(stop.color, primitives);
      // Handle opacity if explicitly defined in stop object
      if (stop.opacity !== undefined) {
        const { r, g, b } = hexToRgb(color);
        return `rgba(${r}, ${g}, ${b}, ${stop.opacity}) ${stop.position}%`;
      }
      return `${color} ${stop.position}%`;
    }).join(', ');
    return `linear-gradient(${angle}deg, ${stops})`;
  }

  // 2. Radial Gradient
  if (obj.type === 'radial-gradient') {
    const shape = obj.shape || 'circle';
    const position = obj.position || 'center';
    const stops = obj.stops.map(stop => {
      const color = resolveColorReference(stop.color, primitives);
      if (stop.opacity !== undefined) {
        const { r, g, b } = hexToRgb(color);
        return `rgba(${r}, ${g}, ${b}, ${stop.opacity}) ${stop.position}%`;
      }
      return `${color} ${stop.position}%`;
    }).join(', ');
    return `radial-gradient(${shape} at ${position}, ${stops})`;
  }

  // 3. Conic Gradient
  if (obj.type === 'conic-gradient') {
    const startAngle = obj.startAngle || 0;
    const position = obj.position || 'center';
    const stops = obj.stops.map(stop => {
      const color = resolveColorReference(stop.color, primitives);
      return `${color} ${stop.position}deg`; // Conic uses degrees usually
    }).join(', ');
    return `conic-gradient(from ${startAngle}deg at ${position}, ${stops})`;
  }

  // 4. Mesh Gradient (Fallback to pre-defined fallback or ignore)
  if (obj.type === 'mesh-gradient') {
    // Mesh gradients are often SVG or CSS approximations. 
    // If a fallback is provided, use it. Otherwise, return null.
    if (obj.fallback) {
      return resolveColorReference(obj.fallback, primitives);
    }
    return null;
  }

  // Fallback if no type matches (or already a string in 'css' key)
  if (obj.css) {
    return resolveColorReference(obj.css, primitives);
  }

  return null;
}

/**
 * Main Normalizer Function
 * Handles both Semantic Strings and Primitives Complex Objects
 */
function normalizeGradients(data, primitives) {
  const result = {};

  function processObject(obj, target, prefix = '') {
    Object.entries(obj).forEach(([key, value]) => {
      if (key.startsWith('$')) return;

      const fullKey = prefix ? `${prefix}-${key}` : key;

      // Case 1: Complex Gradient Object (Primitive) - Has 'type' and 'stops'
      if (value && typeof value === 'object' && value.type && value.stops) {
        const cssString = buildGradientFromObject(value, primitives);
        if (cssString) target[fullKey] = cssString;
      }
      // Case 2: Mesh Gradient Object - Has 'type' and 'fallback'
      else if (value && typeof value === 'object' && value.type === 'mesh-gradient') {
        const cssString = buildGradientFromObject(value, primitives);
        if (cssString) target[fullKey] = cssString;
      }
      // Case 3: Nested Group (Recursion)
      else if (value && typeof value === 'object' && !Array.isArray(value)) {
        processObject(value, target, fullKey);
      }
      // Case 4: Semantic String (Old Logic)
      else if (typeof value === 'string') {
        target[fullKey] = resolveColorReference(value, primitives);
      }
    });
  }

  processObject(data, result);
  return result;
}

module.exports = { normalizeGradients };