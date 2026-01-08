function normalizeContainer(data) {
  const result = {};
  
  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith('$')) return;
    result[key] = value.value || value;
  });
  
  return result;
}

module.exports = { normalizeContainer };