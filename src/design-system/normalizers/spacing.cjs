function normalizeSpacing(data) {
  const result = {};
  Object.entries(data).forEach(([key, value]) => {
    if (key.startsWith('$')) return;
    result[key] = value;
  });
  return result;
}

module.exports = { normalizeSpacing };