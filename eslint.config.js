import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Component library strict token enforcement
  {
    files: ['src/components-lib/**/*.{ts,tsx,js,jsx}'],
    rules: {
      // Enforce consistent token imports - CLIENT REQUIREMENT #1
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/tokens/**', '**/design-system/**'],
              message: 'Import tokens only from component meta.ts file, not from design-system directly'
            }
          ]
        }
      ],
      
      // Check import sources for meta consistency
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '..',
              message: 'Use explicit imports from meta.ts only'
            }
          ],
          patterns: [
            {
              group: ['!./**.meta', '../**', '../../**'],
              message: 'Import meta only from local component meta.ts file'
            }
          ]
        }
      ],

      'no-restricted-syntax': [
        'error',
        // Direct string literals
        {
          selector: 'JSXAttribute[name.name="className"][value.type="Literal"]',
          message: 'Direct className strings not allowed. Use meta.tokens only.'
        },
        // String literals in JSX expression containers
        {
          selector: 'JSXAttribute[name.name="className"][value.expression.type="Literal"]',
          message: 'Direct className strings not allowed. Use meta.tokens only.'
        },
        // Template literals - catch any template literal in className
        {
          selector: 'JSXAttribute[name.name="className"] TemplateLiteral',
          message: 'Template literals in className must only contain meta.tokens or variables, no hardcoded strings.'
        },
        // Conditional expressions with literals
        {
          selector: 'JSXAttribute[name.name="className"] ConditionalExpression[consequent.type="Literal"]',
          message: 'Conditional className cannot have hardcoded strings. Use tokens only.'
        },
        {
          selector: 'JSXAttribute[name.name="className"] ConditionalExpression[alternate.type="Literal"]',
          message: 'Conditional className cannot have hardcoded strings. Use tokens only.'
        },
        // Object expressions (for libraries like clsx, classnames)
        {
          selector: 'JSXAttribute[name.name="className"] ObjectExpression',
          message: 'Object-based className not allowed. Use meta.tokens directly.'
        },
        // Array expressions
        {
          selector: 'JSXAttribute[name.name="className"] ArrayExpression',
          message: 'Array-based className not allowed. Use meta.tokens directly.'
        },
        // Logical expressions with literals
        {
          selector: 'JSXAttribute[name.name="className"] LogicalExpression[left.type="Literal"]',
          message: 'Logical expressions cannot have hardcoded strings in className.'
        },
        {
          selector: 'JSXAttribute[name.name="className"] LogicalExpression[right.type="Literal"]',
          message: 'Logical expressions cannot have hardcoded strings in className.'
        },
        // Ban clsx, classnames, cn utilities
        {
          selector: 'CallExpression[callee.name=/^(clsx|classnames|cn|cx)$/]',
          message: 'Class utility functions not allowed. Use meta.tokens directly.'
        },
        // Check for hardcoded Tailwind in variables
        {
          selector: 'VariableDeclarator[id.name=/[Cc]lass/] > .init[value=/\\b(bg-|text-|p-|m-|flex|grid)/]',
          message: 'Variables containing classes must use meta.tokens.'
        },
        // Catch style prop with hardcoded Tailwind
        {
          selector: 'JSXAttribute[name.name="style"] Property[key.name=/^(backgroundColor|color|padding|margin)$/][value.type="Literal"]',
          message: 'Style values should come from tokens or props, not hardcoded.'
        }
      ]
    }
  }
)