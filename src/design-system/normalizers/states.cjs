function normalizeStates(data) {
  const result = {};
  
  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith('$')) return;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = {};
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (subKey === 'usage' || subKey === 'description' || subKey.startsWith('$')) return;
        result[key][subKey] = subValue;
      });
    } else {
      result[key] = value;
    }
  });
  
  return result;
}

module.exports = { normalizeStates };