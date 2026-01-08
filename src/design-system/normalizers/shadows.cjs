function hexToRgb(hex) {
  if (!hex) return { r: 0, g: 0, b: 0 };
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

function resolveShadowString(value, primitives, internalRefs, localContext = null) {
  if (!value || typeof value !== 'string') return value;

  let resolved = value;

  if (localContext) {
    // FIX: Fallback logic added here
    const colorToUse = localContext.color || (localContext.layers && localContext.layers[0] ? localContext.layers[0].color : '');
    const opacityToUse = localContext.opacity !== undefined ? localContext.opacity : (localContext.layers && localContext.layers[0] ? localContext.layers[0].opacity : 1);

    resolved = resolved.replace(/\{color\}/g, colorToUse);
    resolved = resolved.replace(/\{opacity\}/g, opacityToUse);
  }

  // ... (Baaki poora code same rahega) ...
  
  resolved = resolved.replace(/\{primitives\.colors\.([a-zA-Z0-9.]+)\}\/([\d.]+)/g, (match, path, opacity) => {
    const parts = path.split('.');
    let colorVal = primitives;
    
    for (const part of parts) {
      colorVal = colorVal?.[part];
      if (!colorVal) break;
    }
    
    if (!colorVal) {
       let rawColorCheck = primitives.colors || primitives;
       for (const part of parts) {
         rawColorCheck = rawColorCheck?.[part];
       }
       if (rawColorCheck) colorVal = rawColorCheck;
    }

    if (typeof colorVal === 'string' && colorVal.startsWith('#')) {
      const { r, g, b } = hexToRgb(colorVal);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return match;
  });

  resolved = resolved.replace(/\{primitives\.colors\.([a-zA-Z0-9.]+)\}/g, (match, path) => {
    const parts = path.split('.');
    let colorVal = primitives;
    for (const part of parts) {
      colorVal = colorVal?.[part];
      if (!colorVal) break;
    }
    return colorVal || match;
  });

  resolved = resolved.replace(/\{this\.([a-zA-Z0-9.]+)\}/g, (match, path) => {
    const parts = path.split('.');
    let refVal = internalRefs;
    for (const part of parts) {
      refVal = refVal?.[part];
      if (!refVal) break;
    }

    if (refVal && typeof refVal === 'string') {
      if (refVal.includes('{primitives') || refVal.includes('{this.') || refVal.includes('{color}')) {
        return resolveShadowString(refVal, primitives, internalRefs, localContext);
      }
      return refVal;
    }
    return match;
  });

  return resolved;
}

function normalizeShadows(data, primitives) {
  const result = {};
  const flatMap = {};

  function flatten(obj, prefix = '') {
    Object.entries(obj).forEach(([key, val]) => {
      if (key.startsWith('$')) return;
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (val && typeof val === 'object' && val.css) {
        flatMap[fullKey] = val.css;
      } else if (typeof val === 'string') {
        flatMap[fullKey] = val;
      } else if (typeof val === 'object') {
        flatten(val, fullKey);
      }
    });
  }
  flatten(data);

  function process(obj, target) {
    Object.entries(obj).forEach(([key, val]) => {
      if (key.startsWith('$')) return;

      if (val && typeof val === 'object' && val.css) {
        let context = { ...val };
        // FIX: Ensure nested color references in context are resolved too
        const colorProp = context.color || (context.layers && context.layers[0] && context.layers[0].color);
        
        if (colorProp && colorProp.includes('{primitives')) {
           // Temporarily attach resolved color to context so regex can pick it up
           context.color = resolveShadowString(colorProp, primitives, data);
        }
        
        target[key] = resolveShadowString(val.css, primitives, data, context);
      } else if (typeof val === 'string') {
        target[key] = resolveShadowString(val, primitives, data);
      } else if (val && typeof val === 'object') {
        target[key] = {};
        process(val, target[key]);
      } else {
        target[key] = val;
      }
    });
  }

  process(data, result);
  return result;
}

module.exports = { normalizeShadows };