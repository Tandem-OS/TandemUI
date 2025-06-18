const fs = require('fs');
const { inspect } = require('util');

// Load JSON tokens
const primitivesColors = require('../tokens/primitives/colors.json');
const semanticColors = require('../tokens/semantic/colors.json');
const primitiveSpacing = require('../tokens/primitives/spacing.json');
const semanticSpacing = require('../tokens/semantic/spacing.json');
const fontSizes = require('../tokens/semantic/fontSizes.json');
const fontFamily = require('../tokens/primitives/font.json');
const shadows = require('../tokens/primitives/shadows.json');
const borderRadius = require('../tokens/primitives/borderRadius.json');

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
                ...primitivesColors,
                ...semanticColors,
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

// Serialize and write
const output = `module.exports = ${inspect(config, { depth: null, compact: false })}\n`;
fs.writeFileSync('./tailwind.config.js', output, 'utf8');
console.log('✅ Tailwind config generated with all design tokens!');