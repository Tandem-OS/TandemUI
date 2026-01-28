// Hero_16.test.tsx
import React from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import Hero_16 from './Hero_16';

// --- MOCKS ---

vi.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  type: {
    Variants: {}
  }
}));

// THE DEFINITIVE, CORRECT MOCK for styled-components
vi.mock('styled-components', () => {
    // `styled` is a function that takes a component...
    const styled = (Component: React.ElementType) => {
        // ...and returns ANOTHER function. This new function is what the `...` calls.
        // That function then returns the final component to be rendered.
        return () => Component;
    };

    // We do the same for styled.button. It's a function that returns a function.
    styled.button = () => (props: any) => <button {...props} />;
    styled.a = () => (props: any) => <a {...props} />;

    return {
        __esModule: true,
        default: styled,
    };
});

vi.mock('../../../lib/animations/variants', () => ({
  fadeInUp: {},
}));

// --- TESTS ---

describe('Hero_16 - Token Usage Validation', () => {
  let sourceCode: string;

  beforeAll(() => {
    const componentPath = path.join(__dirname, 'Hero_16.tsx');
    sourceCode = fs.readFileSync(componentPath, 'utf-8');
  });

  // This test checks for any hardcoded Tailwind classes.
  // NOTE: If you have a legitimate reason for a hardcoded class, you may need to adjust this test.
  // For now, it assumes ALL classes come from meta.tokens.
  it('should not contain hardcoded Tailwind classes', () => {
    // Find all instances of className="...", className={'...'}, and className={`...`}
    const classNameMatches = sourceCode.match(/className=(["'{`])(.*?)\1/g) || [];
    const violations: string[] = [];

    classNameMatches.forEach(match => {
        // Ignore classNames that are just a variable like `className={buttonClasses}`
        if (match.match(/className=\{[a-zA-Z0-9_]+\}/)) {
            return;
        }

        // Check if the className value contains patterns that look like hardcoded Tailwind classes
        // but are NOT part of a meta.tokens reference.
        if (!match.includes('meta.tokens') && match.match(/\b(w-|h-|bg-|text-|p-|m-|flex|grid|border|rounded|sm:|md:|lg:)/)) {
            const lineNumber = sourceCode.substring(0, sourceCode.indexOf(match)).split('\n').length;
            violations.push(`Line ${lineNumber}: Found hardcoded-like className: ${match}`);
        }
    });

    if (violations.length > 0) {
      console.log('\n⚠ Potential hardcoded classes found:');
      violations.forEach(v => console.log(v));
    }

    expect(violations).toHaveLength(0);
  });

  it('should use meta.tokens throughout the component', () => {
    const tokenUsage = (sourceCode.match(/meta\.tokens\./g) || []).length;
    expect(tokenUsage).toBeGreaterThanOrEqual(10);
  });

  it('should not import any UI component libraries', () => {
    const uiLibraryPatterns = [
      /import.*from.*['"]@mui.*['"]/,
      /import.*from.*['"]@chakra-ui.*['"]/,
      /import.*from.*['"]antd.*['"]/,
    ];
    const foundImports: string[] = [];
    uiLibraryPatterns.forEach(pattern => {
      const match = sourceCode.match(pattern);
      if (match) foundImports.push(match[0]);
    });
    expect(foundImports).toHaveLength(0);
  });

  it('should render with consistent token-based classes', () => {
    const { container } = render(
      <Hero_16
        title="Test Title"
        description="Test Description"
        primaryCTA={{ text: "Get Started", href: "/start" }}
      />
    );
    expect(container.firstChild).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should only import from local meta file', () => {
    const importStatements = sourceCode.match(/import.*from.*/g) || [];
    const invalidImports = importStatements.filter(imp => 
      imp.includes('tokens/') || imp.includes('design-system/') || (imp.includes('meta') && !imp.includes('./Hero_16.meta'))
    );
    expect(invalidImports).toHaveLength(0);
  });

  it('should only use styled-components for hover states', () => {
    const styledComponents = (sourceCode.match(/styled\.\w+|styled\(\w+\.\w+\)/g) || []).length;
    expect(styledComponents).toBeLessThanOrEqual(3);
  });

  it('should have proper video background hero structure with heading & CTA positioning', () => {
    const { container } = render(
      <Hero_16
        title="Test Title"
        description="Test Description"
        primaryCTA={{ text: "Get Started", href: "/start" }}
        videoSrc="/test-video.mp4"
      />
    );
    expect(container.querySelector('[data-testid="hero-section"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="hero-background"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="hero-overlay"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="hero-video"]')).toBeTruthy();
  });

  it('should have correct layout structure for heading & CTA left bottom, paragraph right top', () => {
    const { container } = render(
      <Hero_16
        title="Test Title"
        description="Test Description"
        primaryCTA={{ text: "Get Started", href: "/start" }}
      />
    );
    
    // Check for left column with heading & CTAs
    expect(container.querySelector('[data-testid="hero-left-column"]')).toBeTruthy();
    // Check for right column with paragraph
    expect(container.querySelector('[data-testid="hero-right-column"]')).toBeTruthy();
    // Check for title, description, and buttons positioning
    expect(container.querySelector('[data-testid="hero-title"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="hero-description"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="hero-buttons"]')).toBeTruthy();
  });
});