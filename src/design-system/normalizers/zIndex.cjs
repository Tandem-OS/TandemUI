function normalizeZIndex(data) {
  const result = {};
  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith('$')) return;
    
    
    if (typeof value === 'number' || typeof value === 'string') {
      result[key] = value;
    } 
    
    else {
      result[key] = value;
    }
  });
  return result;
}

module.exports = { normalizeZIndex };