/**
 * Motion Normalizer
 * Handles BOTH primitives and semantic motion tokens
 */

function normalizeMotion(data) {
  if (!data) return {};

  const result = {
    duration: {},
    easing: {},
    delay: {},
    stagger: {}
  };

  // Process duration - convert numbers to "Xms" format
  if (data.duration) {
    Object.entries(data.duration).forEach(([key, value]) => {
      if (key.startsWith('$')) return;
      if (typeof value === 'number') {
        result.duration[key] = `${value}ms`;
      } else {
        result.duration[key] = value;
      }
    });
  }

  // Process easing - flatten nested structure
  if (data.easing) {
    Object.entries(data.easing).forEach(([category, easings]) => {
      if (category.startsWith('$')) return;
      if (typeof easings === 'object' && easings !== null) {
        Object.entries(easings).forEach(([name, value]) => {
          if (name === 'description' || name.startsWith('$')) return;
          
          const flatKey = `${category}-${name}`;
          result.easing[flatKey] = value;
          
          if (category === 'utility') {
            result.easing[name] = value;
          }
        });
      }
    });
  }

  // Process delay
  if (data.delay) {
    Object.entries(data.delay).forEach(([key, value]) => {
      if (key.startsWith('$')) return;
      if (typeof value === 'number') {
        result.delay[key] = `${value}ms`;
      } else {
        result.delay[key] = value;
      }
    });
  }

  // Process stagger
  if (data.stagger) {
    Object.entries(data.stagger).forEach(([key, value]) => {
      if (key.startsWith('$')) return;
      if (typeof value === 'number') {
        result.stagger[key] = `${value}ms`;
      } else {
        result.stagger[key] = value;
      }
    });
  }

  return result;
}

/**
 * Normalize Semantic Motion
 * Extracts motion patterns from semantic file
 */
function normalizeSemanticMotion(data) {
  if (!data) return {};

  const result = {};

  Object.entries(data).forEach(([mode, modeData]) => {
    // Skip $ keys
    if (mode.startsWith('$')) return;
    if (typeof modeData !== 'object' || modeData === null) return;

    result[mode] = {};

    Object.entries(modeData).forEach(([category, categoryData]) => {
      // Skip description and $ keys
      if (category === 'description' || category.startsWith('$')) return;
      if (typeof categoryData !== 'object' || categoryData === null) return;

      // Check if this is a DIRECT pattern (has duration/easing at this level)
      // Examples: entrance, exit, hover, focus, collapse, expand
      const hasDuration = categoryData.duration !== undefined;
      const hasEasing = categoryData.easing !== undefined;
      const hasDelay = categoryData.delay !== undefined;

      if (hasDuration || hasEasing) {
        // DIRECT PATTERN - entrance, exit, hover, focus, collapse, expand
        result[mode][category] = {};
        if (hasDuration) result[mode][category].duration = categoryData.duration;
        if (hasEasing) result[mode][category].easing = categoryData.easing;
        if (hasDelay) result[mode][category].delay = categoryData.delay;
      } else {
        // NESTED PATTERN - transition.quick, stagger.tight
        result[mode][category] = {};
        
        Object.entries(categoryData).forEach(([name, value]) => {
          if (name.startsWith('$')) return;
          if (typeof value !== 'object' || value === null) return;

          // Only include if has motion properties
          const hasMotionProps = value.duration || value.easing || value.delay || 
                                 value.staggerChildren || value.delayChildren;
          
          if (hasMotionProps) {
            result[mode][category][name] = {};
            if (value.duration) result[mode][category][name].duration = value.duration;
            if (value.easing) result[mode][category][name].easing = value.easing;
            if (value.delay) result[mode][category][name].delay = value.delay;
            if (value.staggerChildren) result[mode][category][name].staggerChildren = value.staggerChildren;
            if (value.delayChildren) result[mode][category][name].delayChildren = value.delayChildren;
          }
        });
      }
    });
  });

  return result;
}

module.exports = { normalizeMotion, normalizeSemanticMotion };