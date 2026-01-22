function normalizeTypography(data) {
  const result = {};

  // Helper to extract value (rem > value)
  const getValue = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      return obj.rem || obj.value || obj;
    }
    return obj;
  };

  // 1. Process New Structure (Mobile/Desktop)
  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith('$')) return;

    if (key === 'desktop' || key === 'mobile') {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subKey.startsWith('$')) return;
          result[`${key}-${subKey}`] = getValue(subValue);
        });
      }
    } else {
      result[key] = getValue(value);
    }
  });

  // 2. 🛡️ LEGACY SUPPORT (Auto-Map Old Keys)
  // Agar ye Font Size file hai (check via 'desktop-base'), to purane keys inject karo
  if (result['desktop-base'] || result['mobile-base']) {
    const getVal = (k) => result[`desktop-${k}`] || result[`mobile-${k}`];

    const legacyMappings = {
      "para-xs": getVal('xs'), "para-sm": getVal('sm'), "para-md": getVal('base'),
      "para-lg": getVal('lg'), "para-xl": getVal('xl'),
      "h1-sm": getVal('4xl'), "h1-md": getVal('5xl'), "h1-lg": getVal('6xl'),
      "h2-sm": getVal('3xl'), "h2-md": getVal('4xl'), "h2-lg": getVal('5xl'),
      "h3-sm": getVal('2xl'), "h3-md": getVal('3xl'), "h3-lg": getVal('4xl'),
      "h4-sm": getVal('xl'), "h4-md": getVal('2xl'), "h4-lg": getVal('3xl'),
      "h5-sm": getVal('lg'), "h5-md": getVal('xl'), "h5-lg": getVal('2xl'),
      "h6-sm": getVal('base'), "h6-md": getVal('lg'), "h6-lg": getVal('xl'),
      "btn-sm": getVal('sm'), "btn-md": getVal('base'), "btn-lg": getVal('lg'),
      "icon-sm": getVal('base'), "icon-md": getVal('xl'), "icon-lg": getVal('2xl'), "icon-xl": getVal('4xl'),
      "caption": getVal('xs'), "overline": getVal('xs')
    };

    Object.entries(legacyMappings).forEach(([alias, val]) => {
      if (val) result[alias] = val;
    });
  }

  return result;
}

module.exports = { normalizeTypography };