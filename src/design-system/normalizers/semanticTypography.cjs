function normalizeSemanticTypography(data) {
  const result = {};

  // Loop through categories (heading, body, label, etc.)
  Object.entries(data).forEach(([category, variants]) => {
    // Skip metadata ($schema, $description, etc.)
    if (category.startsWith('$')) return;

    if (typeof variants === 'object' && variants !== null) {
      result[category] = {};
      
      // Loop through variants (h1, h2, sm, md...)
      Object.entries(variants).forEach(([variantName, content]) => {
        if (variantName.startsWith('$')) return;
        
        // Check if 'content' is a direct definition (like body.md) or nested (like heading.h1)
        const isDirect = content.fontSize || content.lineHeight || content.fontWeight || content.tailwind;

        if (isDirect) {
           // Case: body.md (Direct Props)
           const cleanProps = {};
           Object.entries(content).forEach(([key, val]) => {
             if (key === 'usage' || key === 'default') return;
             cleanProps[key] = val;
           });
           result[category][variantName] = cleanProps;
        } else {
           // Case: heading.h1 (Nested Sizes)
           result[category][variantName] = {};
           
           Object.entries(content).forEach(([sizeKey, props]) => {
             if (sizeKey === 'usage' || sizeKey === 'default') return;
             
             if (typeof props === 'object' && props !== null) {
                const cleanProps = {};
                Object.entries(props).forEach(([key, val]) => {
                  if (key === 'usage' || key === 'default') return;
                  cleanProps[key] = val;
                });
                result[category][variantName][sizeKey] = cleanProps;
             }
           });
        }
      });
    }
  });

  return result;
}

module.exports = { normalizeSemanticTypography };