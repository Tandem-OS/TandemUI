const fs = require('fs');
const path = require('path');

// Helper function to ensure directory exists
function ensureDirectoryExists(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Helper function to convert hex color to RGB string
function hexToRgbString(hex) {
    const rgb = hexToRgb(hex);
    return rgb ? `${rgb.r} ${rgb.g} ${rgb.b}` : hex;
}

// Load JSON tokens
const primitiveColors = require('../tokens/primitives/colors.json');
const primitiveSpacing = require('../tokens/primitives/spacing.json');
const semanticSpacing = require('../tokens/semantic/spacing.json');
const fontSizes = require('../tokens/semantic/fontSizes.json');
const fontFamily = require('../tokens/primitives/font.json');
const shadows = require('../tokens/primitives/shadows.json');
const borderRadius = require('../tokens/primitives/borderRadius.json');

// Load theme files
const lightTheme = require('../tokens/themes/light.json');
const darkTheme = require('../tokens/themes/dark.json');

// Validation function to ensure all colors exist in both themes
function validateThemes(light, dark) {
    const errors = [];

    function compareKeys(lightObj, darkObj, path = '') {
        const allKeys = new Set([...Object.keys(lightObj), ...Object.keys(darkObj)]);

        for (const key of allKeys) {
            const currentPath = path ? `${path}.${key}` : key;

            if (!(key in lightObj)) {
                errors.push(`❌ Missing in light theme: ${currentPath}`);
            }
            if (!(key in darkObj)) {
                errors.push(`❌ Missing in dark theme: ${currentPath}`);
            }

            if (key in lightObj && key in darkObj) {
                if (typeof lightObj[key] === 'object' && typeof darkObj[key] === 'object' &&
                    !Array.isArray(lightObj[key]) && !Array.isArray(darkObj[key])) {
                    compareKeys(lightObj[key], darkObj[key], currentPath);
                }
            }
        }
    }

    compareKeys(light.colors, dark.colors, 'colors');

    if (errors.length > 0) {
        console.error('\n🚨 Theme Validation Errors:');
        errors.forEach(error => console.error(error));
        throw new Error('Theme validation failed! All colors must be defined in both light and dark themes.');
    }

    console.log('✅ Theme validation passed! All colors are defined in both themes.');
}

// Function to resolve color references
function resolveColorReference(value, primitiveColors) {
    if (typeof value !== 'string' || !value.startsWith('{colors.')) {
        return value;
    }

    const path = value.slice(8, -1).split('.');
    let resolved = primitiveColors;

    for (const key of path) {
        resolved = resolved[key];
        if (resolved === undefined) {
            throw new Error(`Color reference not found: ${value}`);
        }
    }

    return resolved;
}

// Function to generate CSS variables from theme (with RGB values for opacity support)
function generateCSSVariables(theme, primitiveColors, prefix = '') {
    let cssVars = {};

    function processObject(obj, currentPrefix = '') {
        for (const [key, value] of Object.entries(obj)) {
            const varName = currentPrefix ? `${currentPrefix}-${key}` : key;

            if (typeof value === 'object' && !Array.isArray(value)) {
                processObject(value, varName);
            } else {
                const resolvedValue = resolveColorReference(value, primitiveColors);
                // Convert hex colors to RGB for opacity support
                if (resolvedValue && resolvedValue.startsWith('#')) {
                    cssVars[`--${varName}`] = hexToRgbString(resolvedValue);
                } else {
                    cssVars[`--${varName}`] = resolvedValue;
                }
            }
        }
    }

    processObject(theme.colors, prefix);
    return cssVars;
}

// Generate CSS variables for both themes
const lightCSSVars = generateCSSVariables(lightTheme, primitiveColors);
const darkCSSVars = generateCSSVariables(darkTheme, primitiveColors);

// Create a mapping of semantic colors to CSS variables with opacity support
function createSemanticColorMapping(theme) {
    const mapping = {};

    function processColors(obj, prefix = '') {
        for (const [key, value] of Object.entries(obj)) {
            const path = prefix ? `${prefix}-${key}` : key;

            if (typeof value === 'object' && !Array.isArray(value)) {
                if (!mapping[prefix]) mapping[prefix] = {};
                processColors(value, path);
            } else {
                if (!mapping[prefix]) mapping[prefix] = {};
                // Use RGB format for opacity support
                mapping[prefix][key] = `rgb(var(--${path}) / <alpha-value>)`;
            }
        }
    }

    processColors(theme.colors);
    return mapping;
}

// Function to dynamically generate TypeScript interface from theme structure
function generateTypeScriptInterface(theme) {
    let interfaceStr = '// Auto-generated TypeScript definitions for design tokens\n';
    interfaceStr += '// DO NOT EDIT THIS FILE MANUALLY\n\n';
    interfaceStr += 'export interface DesignTokens {\n';
    interfaceStr += '  colors: {\n';

    // Process each color category
    Object.entries(theme.colors).forEach(([category, values]) => {
        interfaceStr += `    ${category}: {\n`;
        Object.keys(values).forEach(key => {
            // Handle keys with special characters
            const keyStr = key.includes('-') ? `'${key}'` : key;
            interfaceStr += `      ${keyStr}: string;\n`;
        });
        interfaceStr += '    };\n';
    });

    interfaceStr += '  };\n';
    interfaceStr += '}\n';

    return interfaceStr;
}

// Validate themes before proceeding
validateThemes(lightTheme, darkTheme);

// Create semantic color mapping
const semanticColors = createSemanticColorMapping(lightTheme);

// Build the Tailwind config object
const config = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                ...primitiveColors,
                ...semanticColors
            },
            spacing: {
                ...primitiveSpacing,
                ...semanticSpacing,
            },
            fontSize: {
                ...fontSizes
            },
            fontFamily: {
                ...fontFamily.fontFamily
            },
            boxShadow: {
                ...shadows
            },
            borderRadius: {
                ...borderRadius
            }
        }
    },
    plugins: [],
};

// Generate CSS file with custom properties (RGB values)
const cssContent = `/* Generated Design System CSS Variables */
/* DO NOT EDIT THIS FILE MANUALLY */

:root {
${Object.entries(lightCSSVars).map(([key, value]) => `  ${key}: ${value};`).join('\n')}
}

.dark {
${Object.entries(darkCSSVars).map(([key, value]) => `  ${key}: ${value};`).join('\n')}
}
`;

// Write CSS file
const cssPath = './src/design-system/generated/theme.css';
ensureDirectoryExists(cssPath);
fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('✅ Theme CSS variables generated with opacity support!');

// Generate TypeScript types dynamically
const typeDefinitions = generateTypeScriptInterface(lightTheme) + '\n' +
    `export const tokens = ${JSON.stringify(semanticColors, null, 2)} as const;\n`;

const typesPath = './src/design-system/generated/tokens.ts';
ensureDirectoryExists(typesPath);
fs.writeFileSync(typesPath, typeDefinitions, 'utf8');
console.log('✅ TypeScript definitions generated dynamically!');

// Serialize and write Tailwind config
const configContent = `// This file is auto-generated. Do not edit manually.
// Run 'npm run generate-tokens' to regenerate.

module.exports = ${JSON.stringify(config, null, 2)}
`;

fs.writeFileSync('./tailwind.config.js', configContent, 'utf8');
console.log('✅ Tailwind config generated with all design tokens!');
