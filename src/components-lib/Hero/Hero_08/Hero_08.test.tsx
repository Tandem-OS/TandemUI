// Hero_08.test.tsx
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import Hero_08 from './Hero_08';

// Mock dependencies
vi.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>
  },
}));

vi.mock('../../../lib/animations/variants', () => ({
  fadeInUp: {},
  fadeIn: {},
}));

describe('Hero_08 - Token Usage Validation', () => {
  let sourceCode: string;

  beforeAll(() => {
    const componentPath = path.join(__dirname, 'Hero_08.tsx');
    sourceCode = fs.readFileSync(componentPath, 'utf-8');
  });

  it('should ONLY use meta.tokens for all classNames', () => {
    const violations: string[] = [];

    // Enhanced patterns per client requirements

    // Pattern 1: Direct hardcoded strings className="hardcoded"
    const directStringPattern = /className="([^"]+)"/g;
    let match;

    while ((match = directStringPattern.exec(sourceCode)) !== null) {
      const classValue = match[1];
      const lineNumber = sourceCode.substring(0, match.index).split('\n').length;

      // Check if this is actually referencing meta.tokens
      if (!classValue.includes('$') && !sourceCode.includes(`meta.tokens.`) && classValue !== '') {
        violations.push(`Line ${lineNumber}: Direct hardcoded className="${classValue}"`);
      }
    }

    // Pattern 2: Quoted strings in JSX
    const quotedJSXPattern = /className=\{["']([^"']+)["']\}/g;
    while ((match = quotedJSXPattern.exec(sourceCode)) !== null) {
      const classValue = match[1];
      const lineNumber = sourceCode.substring(0, match.index).split('\n').length;
      violations.push(`Line ${lineNumber}: Hardcoded className={'${classValue}'}`);
    }

    // Pattern 3: Template literals with comprehensive checks
    const templateLiteralPattern = /className=\{`([^`]+)`\}/g;
    while ((match = templateLiteralPattern.exec(sourceCode)) !== null) {
      const fullValue = match[1];
      const lineNumber = sourceCode.substring(0, match.index).split('\n').length;

      // Split by ${...} to get static parts
      const parts = fullValue.split(/\$\{[^}]+\}/);

      parts.forEach(part => {
        const trimmed = part.trim();
        if (trimmed && trimmed !== '') {
          // Enhanced patterns - CLIENT REQUIREMENT: Check responsive + flex/grid
          const tailwindPatterns = [
            // Basic utilities
            /\b(bg-|text-|p-|m-|px-|py-|mx-|my-|mt-|mb-|ml-|mr-|pt-|pb-|pl-|pr-)\S+/,
            // Width/Height
            /\b(w-|h-|min-w-|min-h-|max-w-|max-h-)\S+/,
            // Flexbox/Grid - CLIENT REQUIREMENT #2
            /\b(flex|flex-row|flex-col|flex-wrap|flex-nowrap|items-|justify-|self-|place-)\S+/,
            /\b(grid|grid-cols-|grid-rows-|col-span-|row-span-|gap-|space-)\S+/,
            // Display
            /\b(block|inline|inline-block|hidden|table|flow-root)\b/,
            // Positioning
            /\b(static|fixed|absolute|relative|sticky|inset-|top-|right-|bottom-|left-)\S+/,
            // Borders/Radius
            /\b(border|border-|rounded|rounded-)\S+/,
            // Effects
            /\b(shadow|opacity-|transition|duration-|ease-)\S+/,
            // Responsive variants - CLIENT REQUIREMENT #1
            /\b(sm:|md:|lg:|xl:|2xl:)\S+/,
            // Pseudo states
            /\b(hover:|focus:|active:|disabled:|group-hover:|peer-)\S+/,
            // Arbitrary values
            /\[[^\]]+\]/
          ];

          const hasHardcodedClass = tailwindPatterns.some(pattern => pattern.test(trimmed));
          if (hasHardcodedClass) {
            violations.push(`Line ${lineNumber}: Hardcoded class "${trimmed}" in template literal`);
          }
        }
      });
    }

    // Pattern 4: Variables with hardcoded classes
    const variablePattern = /(const|let|var)\s+(\w+)\s*=\s*["'`]([^"'`]+)["'`]/g;
    while ((match = variablePattern.exec(sourceCode)) !== null) {
      const varName = match[2];
      const value = match[3];
      const lineNumber = sourceCode.substring(0, match.index).split('\n').length;

      // Enhanced check including responsive and flex/grid
      const comprehensiveTailwindPattern = /\b(bg-|text-|p-|m-|px-|py-|mx-|my-|w-|h-|flex|flex-|grid|grid-|items-|justify-|border-|rounded-|shadow-|hover:|focus:|active:|sm:|md:|lg:|xl:|2xl:)\S+/;

      if (comprehensiveTailwindPattern.test(value)) {
        violations.push(`Line ${lineNumber}: Variable '${varName}' contains hardcoded Tailwind classes: "${value}"`);
      }
    }

    // Pattern 5: Check array/object constructions
    const arrayPattern = /className=\{?\[([^\]]+)\]/g;
    while ((match = arrayPattern.exec(sourceCode)) !== null) {
      const lineNumber = sourceCode.substring(0, match.index).split('\n').length;
      violations.push(`Line ${lineNumber}: Array-based className construction not allowed`);
    }

    if (violations.length > 0) {
      console.log('\n❌ Hardcoded classes found:');
      violations.forEach(v => console.log(v));
    }

    expect(violations).toHaveLength(0);
  });

  // CLIENT REQUIREMENT: Verify ALL classNames use tokens
  it('should verify ALL className values reference meta.tokens', () => {
    // Extract all className assignments
    const classNameAssignments: Array<{ line: number, value: string }> = [];

    // Find all className patterns
    const patterns = [
      /className=\{([^}]+)\}/g,
      /className="([^"]+)"/g,
      /className=\{`([^`]+)`\}/g
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(sourceCode)) !== null) {
        const lineNumber = sourceCode.substring(0, match.index).split('\n').length;
        classNameAssignments.push({ line: lineNumber, value: match[1] });
      }
    });

    // Check each className references meta.tokens
    const nonTokenClasses = classNameAssignments.filter(({ value }) => {
      // Allow variables that are likely using tokens
      const isVariable = /^[a-zA-Z_]\w*$/.test(value.trim());
      if (isVariable) {
        // Check if this variable is defined with meta.tokens
        const varPattern = new RegExp(`(const|let|var)\\s+${value}\\s*=\\s*[^;]+meta\\.tokens`, 's');
        if (sourceCode.match(varPattern)) {
          return false; // This is valid - variable uses meta.tokens
        }
      }

      // Allow template literals containing meta.tokens
      if (value.includes('meta.tokens')) {
        return false;
      }

      // Allow className prop pass-through
      if (value.includes('className')) {
        return false;
      }

      // Empty or placeholder values
      if (value.trim() === '' || value === '{}') {
        return false;
      }

      return true; // This needs to be checked
    });

    if (nonTokenClasses.length > 0) {
      console.log('\n❌ ClassNames not using meta.tokens:');
      nonTokenClasses.forEach(({ line, value }) => {
        console.log(`Line ${line}: "${value}"`);
      });
    }

    expect(nonTokenClasses).toHaveLength(0);
  });

  it('should use meta.tokens throughout the component', () => {
    const tokenUsage = (sourceCode.match(/meta\.tokens\./g) || []).length;
    expect(tokenUsage).toBeGreaterThanOrEqual(10);
  });

  it('should not import any UI component libraries', () => {
    const uiLibraryPatterns = [
      /import.*from.*['"].*ui.*['"]/,
      /import.*Button.*from.*['"].*components.*['"]/,
      /import.*Card.*from.*['"].*components.*['"]/,
      /import.*Input.*from.*['"].*components.*['"]/,
      /import.*from.*['"]@mui.*['"]/,
      /import.*from.*['"]@chakra-ui.*['"]/,
      /import.*from.*['"]antd.*['"]/,
      /import.*from.*['"]@headlessui.*['"]/,
      /import.*from.*['"]@radix-ui.*['"]/,
      /import.*from.*['"]react-aria.*['"]/
    ];

    const foundImports: string[] = [];
    uiLibraryPatterns.forEach(pattern => {
      const match = sourceCode.match(pattern);
      if (match) foundImports.push(match[0]);
    });

    expect(foundImports).toHaveLength(0);
  });

  // CLIENT REQUIREMENT: Snapshot test
  it('should render with consistent token-based classes', () => {
    const { container } = render(
      <Hero_08
        title="Test Title"
        description="Test Description"
        newsletterPlaceholder="Enter email"
        newsletterButtonText="Subscribe"
        videoSrc="/test-video.mp4"
        videoThumbnail="/test-thumbnail.jpg"
      />
    );

    // Verify rendered output uses token classes
    const element = container.firstChild as HTMLElement;
    expect(element).toBeTruthy();

    // Snapshot for consistency
    expect(container).toMatchSnapshot();
  });

  // Additional test: Verify meta import pattern
  it('should only import from local meta file', () => {
    const importStatements = sourceCode.match(/import.*from.*/g) || [];

    const invalidImports = importStatements.filter(imp => {
      return imp.includes('tokens/') ||
        imp.includes('design-system/') ||
        (imp.includes('meta') && !imp.includes('./Hero_08.meta'));
    });

    expect(invalidImports).toHaveLength(0);
  });
});