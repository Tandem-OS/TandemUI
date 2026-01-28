function normalizeSpacing(data) {
  const result = {};
  
  // Metadata keys to strictly ignore
  const ignoredKeys = [
    'usage', 'description', 'rationale', 'multiplier', 
    'personality', 'default', 'density', 'comment', 'type'
  ];

  Object.entries(data).forEach(([key, value]) => {
    // 1. Filter Keys
    if (key.startsWith('$') || ignoredKeys.includes(key)) return;

    if (typeof value === 'object' && value !== null) {
      // 2. Ignore Arrays completely (Fixes the "0": "landing-pages" issue)
      if (Array.isArray(value)) return;

      // 3. Extract Token Value (rem > value)
      if (value.rem) {
        result[key] = value.rem;
      } else if (value.value) {
        result[key] = value.value;
      } 
      // 4. Recurse for Nested Groups
      else {
        const nested = normalizeSpacing(value);
        if (Object.keys(nested).length > 0) {
          result[key] = nested;
        }
      }
    } else {
      // 5. Direct Value
      result[key] = value;
    }
  });

  return result;
}

module.exports = { normalizeSpacing };