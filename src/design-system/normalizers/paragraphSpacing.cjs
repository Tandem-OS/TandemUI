function normalizeParagraphSpacing(data) {
  const result = {};
  
  // Helper to extract value safely
  const getValue = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      return obj.value || obj;
    }
    return obj;
  };

  Object.entries(data).forEach(([context, values]) => {
    // Skip metadata keys starting with $ or distinct metadata fields
    if (context.startsWith('$') || ['usage', 'description'].includes(context)) return;

    // Handle 'desktop', 'mobile' categories
    if (typeof values === 'object' && values !== null) {
      Object.entries(values).forEach(([name, token]) => {
        if (name.startsWith('$')) return;
        
        const val = getValue(token);
        if (typeof val === 'string' || typeof val === 'number') {
          // Creates keys like: 'paragraph-desktop-comfortable', 'paragraph-mobile-tight'
          result[`paragraph-${context}-${name}`] = val;
        }
      });
    }
  });

  return result;
}

module.exports = { normalizeParagraphSpacing };