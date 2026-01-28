function normalizeBreakpoints(data) {
  const result = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith('$')) return;

    if (value && typeof value === 'object' && value.value) {
      result[key] = value.value;
    } 
    else if (typeof value !== 'object') {
      result[key] = value;
    }
    else {
      result[key] = value;
    }
  });

  return result;
}

module.exports = { normalizeBreakpoints };