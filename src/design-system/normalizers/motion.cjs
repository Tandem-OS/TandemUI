function normalizeMotion(data) {
  const result = {};
  
  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith('$')) return;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = normalizeMotion(value);
    } else {
      result[key] = value;
    }
  });
  
  return result;
}

module.exports = { normalizeMotion };