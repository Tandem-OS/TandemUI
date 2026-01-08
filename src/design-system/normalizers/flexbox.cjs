function normalizeFlexbox(data) {
  const result = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith('$')) return;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = {};
      Object.entries(value).forEach(([subKey, subValue]) => {
        result[key][subKey] = subValue;
      });
    } else {
      result[key] = value;
    }
  });

  return result;
}

module.exports = { normalizeFlexbox };