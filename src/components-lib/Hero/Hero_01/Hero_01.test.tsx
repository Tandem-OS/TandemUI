// Hero_01.test.tsx
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import Hero_01 from './Hero_01';
import type { HeroColors } from '@/pages/Renderer/CompositionType';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock('../../../lib/animations/variants', () => ({
  fadeInUp: {},
}));

// ── Minimal valid colors fixture ──────────────────────────────
const testColors: HeroColors = {
  background:        '#ffffff',
  text_color:        '#111827',
  btn_primary_bg:    '#4f46e5',
  btn_primary_color: '#ffffff',
  btn_primary_border:'#4f46e5',
  btn_outline_color: '#4f46e5',
  btn_outline_border:'#4f46e5',
  btn_radius:        '0.5rem',
  padding:           '0px',
};

describe('Hero_01 - Token Coverage Validation', () => {
  let sourceCode: string;

  beforeAll(() => {
    sourceCode = fs.readFileSync(path.join(__dirname, 'Hero_01.tsx'), 'utf-8');
  });

  it('should not import styled-components', () => {
    expect(sourceCode).not.toContain("from 'styled-components'");
  });

  it('should not import useTheme', () => {
    expect(sourceCode).not.toContain('useTheme');
  });

  it('should not import useId', () => {
    expect(sourceCode).not.toContain('useId');
  });

  it('should not call validateHero01Props or sanitizeProps', () => {
    expect(sourceCode).not.toContain('validateHero01Props');
    expect(sourceCode).not.toContain('sanitizeProps');
  });

  it('should not contain slotsToProps', () => {
    expect(sourceCode).not.toContain('slotsToProps');
  });

  it('should define variantConfig', () => {
    expect(sourceCode).toContain('variantConfig');
  });

  it('should define renderAction', () => {
    expect(sourceCode).toContain('renderAction');
  });

  it('should not import any UI component libraries', () => {
    const uiLibraryPatterns = [
      /import.*from.*['"]@mui.*/,
      /import.*from.*['"]@chakra-ui.*/,
      /import.*from.*['"]antd.*/,
      /import.*from.*['"]@headlessui.*/,
      /import.*from.*['"]@radix-ui.*/,
    ];
    uiLibraryPatterns.forEach(pattern => {
      expect(sourceCode).not.toMatch(pattern);
    });
  });

  it('should render with valid colors prop', () => {
    const { getByTestId } = render(
      <Hero_01
        hero_heading="Test Heading"
        hero_subheading="Test subheading"
        colors={testColors}
      />
    );
    expect(getByTestId('hero-section')).toBeTruthy();
    expect(getByTestId('hero-title')).toBeTruthy();
    expect(getByTestId('hero-description')).toBeTruthy();
  });

  it('should render primary action when provided', () => {
    const { getByTestId } = render(
      <Hero_01
        hero_heading="Test"
        hero_primary_action={{ label: 'Get Started', target: '/start', variant: 'primary' }}
        colors={testColors}
      />
    );
    expect(getByTestId('hero-buttons')).toBeTruthy();
  });

  it('should not render buttons when no actions provided', () => {
    const { queryByTestId } = render(
      <Hero_01
        hero_heading="Test"
        colors={testColors}
      />
    );
    expect(queryByTestId('hero-buttons')).toBeNull();
  });

  it('should not render title when hero_heading is null', () => {
    const { queryByTestId } = render(
      <Hero_01
        hero_heading={null}
        colors={testColors}
      />
    );
    expect(queryByTestId('hero-title')).toBeNull();
  });

  it('should render background image container when hero_media provided', () => {
    const { getByTestId } = render(
      <Hero_01
        hero_heading="Test"
        hero_media="/images/test.jpg"
        colors={testColors}
      />
    );
    expect(getByTestId('hero-image-container')).toBeTruthy();
  });

  it('should match snapshot', () => {
    const { container } = render(
      <Hero_01
        hero_heading="Snapshot Title"
        hero_subheading="Snapshot description"
        hero_primary_action={{ label: 'Get Started', target: '/start', variant: 'primary' }}
        colors={testColors}
      />
    );
    expect(container).toMatchSnapshot();
  });
});