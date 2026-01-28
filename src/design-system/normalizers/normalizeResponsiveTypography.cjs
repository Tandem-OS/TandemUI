function normalizeResponsiveTypography(data) {
  const result = {
    mobile: {},
    desktop: {},
    responsive: {}
  };

  Object.entries(data).forEach(([category, variants]) => {
    if (category.startsWith('$')) return;
    if (!variants || typeof variants !== 'object') return;

    Object.entries(variants).forEach(([variantName, config]) => {
      if (variantName.startsWith('$')) return;
      if (!config || typeof config !== 'object') return;

      const mobileConfig = config.mobile;
      const desktopConfig = config.desktop;
      const responsiveConfig = config.responsive;

      // ... (Mobile aur Desktop ka code same rahega) ...
      // Mobile Section (No changes needed here, keep existing code)
      if (mobileConfig && typeof mobileConfig === 'object') {
        const mobileClass = `.text-${category}-${variantName}-mobile`;
        const mobileStyles = {};
        if (mobileConfig.fontSize) mobileStyles.fontSize = mobileConfig.fontSize;
        if (mobileConfig.lineHeight) mobileStyles.lineHeight = mobileConfig.lineHeight;
        if (mobileConfig.fontWeight) mobileStyles.fontWeight = mobileConfig.fontWeight;
        if (mobileConfig.letterSpacing) mobileStyles.letterSpacing = mobileConfig.letterSpacing;
        if (mobileConfig.fontFamily) mobileStyles.fontFamily = mobileConfig.fontFamily;
        if (mobileConfig.transform) mobileStyles.textTransform = mobileConfig.transform;
        if (mobileConfig.textDecoration) mobileStyles.textDecoration = mobileConfig.textDecoration;
        if (mobileConfig.fontStyle) mobileStyles.fontStyle = mobileConfig.fontStyle;
        if (Object.keys(mobileStyles).length > 0) result.mobile[mobileClass] = mobileStyles;
      }

      // Desktop Section (No changes needed here, keep existing code)
      if (desktopConfig && typeof desktopConfig === 'object') {
        const desktopClass = `.text-${category}-${variantName}-desktop`;
        const desktopStyles = {};
        if (desktopConfig.fontSize) desktopStyles.fontSize = desktopConfig.fontSize;
        if (desktopConfig.lineHeight) desktopStyles.lineHeight = desktopConfig.lineHeight;
        if (desktopConfig.fontWeight) desktopStyles.fontWeight = desktopConfig.fontWeight;
        if (desktopConfig.letterSpacing) desktopStyles.letterSpacing = desktopConfig.letterSpacing;
        if (desktopConfig.fontFamily) desktopStyles.fontFamily = desktopConfig.fontFamily;
        if (desktopConfig.transform) desktopStyles.textTransform = desktopConfig.transform;
        if (desktopConfig.textDecoration) desktopStyles.textDecoration = desktopConfig.textDecoration;
        if (desktopConfig.fontStyle) desktopStyles.fontStyle = desktopConfig.fontStyle;
        if (Object.keys(desktopStyles).length > 0) result.desktop[desktopClass] = desktopStyles;
      }

      // --- RESPONSIVE SECTION (UPDATED) ---
      if (responsiveConfig && typeof responsiveConfig === 'object') {
        const responsiveClass = `.text-${category}-${variantName}`;
        const baseStyles = {};

        // Extract base styles from Mobile Config
        if (mobileConfig) {
          if (mobileConfig.fontSize) baseStyles.fontSize = mobileConfig.fontSize;
          if (mobileConfig.lineHeight) baseStyles.lineHeight = mobileConfig.lineHeight;
          if (mobileConfig.fontWeight) baseStyles.fontWeight = mobileConfig.fontWeight;
          if (mobileConfig.letterSpacing) baseStyles.letterSpacing = mobileConfig.letterSpacing;
          if (mobileConfig.fontFamily) baseStyles.fontFamily = mobileConfig.fontFamily;
          if (mobileConfig.transform) baseStyles.textTransform = mobileConfig.transform;
          if (mobileConfig.textDecoration) baseStyles.textDecoration = mobileConfig.textDecoration;
          if (mobileConfig.fontStyle) baseStyles.fontStyle = mobileConfig.fontStyle;
        }

        if (Object.keys(baseStyles).length > 0) {
          result.responsive[responsiveClass] = baseStyles;
          
          // NEW FIX 1: Handle Default Flag (Mobile Base)
          if (responsiveConfig.default === true) {
             const defaultClass = `.text-${category}`; // e.g., .text-body
             result.responsive[defaultClass] = baseStyles;
          }
        }

        if (desktopConfig) {
          // NOTE: Ideally fetch this from primitives/breakpoints.json, but hardcoded is okay for now
          const mediaQuery = '@media (min-width: 1024px)'; 
          
          if (!result.responsive[mediaQuery]) {
            result.responsive[mediaQuery] = {};
          }

          const desktopOverrides = {};
          if (desktopConfig.fontSize) desktopOverrides.fontSize = desktopConfig.fontSize;
          if (desktopConfig.lineHeight) desktopOverrides.lineHeight = desktopConfig.lineHeight;
          if (desktopConfig.fontWeight) desktopOverrides.fontWeight = desktopConfig.fontWeight;
          if (desktopConfig.letterSpacing) desktopOverrides.letterSpacing = desktopConfig.letterSpacing;
          if (desktopConfig.fontFamily) desktopOverrides.fontFamily = desktopConfig.fontFamily;
          if (desktopConfig.transform) desktopOverrides.textTransform = desktopConfig.transform;
          if (desktopConfig.textDecoration) desktopOverrides.textDecoration = desktopConfig.textDecoration;
          if (desktopConfig.fontStyle) desktopOverrides.fontStyle = desktopConfig.fontStyle;

          if (Object.keys(desktopOverrides).length > 0) {
            result.responsive[mediaQuery][responsiveClass] = desktopOverrides;

            // NEW FIX 2: Handle Default Flag (Desktop Overrides)
            if (responsiveConfig.default === true) {
               const defaultClass = `.text-${category}`;
               result.responsive[mediaQuery][defaultClass] = desktopOverrides;
            }
          }
        }
      }
    });
  });

  return result;
}

module.exports = { normalizeResponsiveTypography };