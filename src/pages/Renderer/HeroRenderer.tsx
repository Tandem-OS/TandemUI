import React from 'react';
import componentRegistry from '@/registry/ComponentRegistry';
import { slotsToProps } from '@/registry/slotsToProps';
import type { ComposeSection } from '@/pages/Renderer/CompositionType';
import type { HeroSlots } from '@/registry/slotsToProps';

// Helpers
function tokensToColors(tokens: ComposeSection['tokens']) {
  const primaryBorder = tokens.btn_primary_bg === 'transparent'
    ? tokens.btn_outline_border
    : tokens.btn_primary_bg;

  const primaryHoverBg = tokens.btn_primary_bg === 'transparent' ? tokens.text_color : undefined;
  const primaryHoverText = tokens.btn_primary_bg === 'transparent' ? tokens.background : tokens.text_color;
  const secondaryHoverBg = tokens.btn_outline_border;
  const secondaryHoverText = tokens.background;

  return {
    background: { light: tokens.background, dark: tokens.background },
    title: { light: tokens.text_color, dark: tokens.text_color },
    description: { light: tokens.text_color, dark: tokens.text_color },
    primaryButton: {
      background: { light: tokens.btn_primary_bg, dark: tokens.btn_primary_bg },
      text: { light: tokens.btn_primary_color, dark: tokens.btn_primary_color },
      border: { light: primaryBorder, dark: primaryBorder },
      hover: {
        background: { light: primaryHoverBg, dark: primaryHoverBg },
        text: { light: primaryHoverText, dark: primaryHoverText },
        border: { light: primaryBorder, dark: primaryBorder },
      }
    },
    secondaryButton: {
      background: { light: 'transparent', dark: 'transparent' },
      text: { light: tokens.btn_outline_border, dark: tokens.btn_outline_border },
      border: { light: tokens.btn_outline_border, dark: tokens.btn_outline_border },
      hover: {
        background: { light: secondaryHoverBg, dark: secondaryHoverBg },
        text: { light: secondaryHoverText, dark: secondaryHoverText },
        border: { light: tokens.btn_outline_border, dark: tokens.btn_outline_border },
      }
    }
  };
}

function isRealImage(url?: string | null): boolean {
  if (!url) return false;
  if (url.includes('placehold.co')) return false;
  if (url.includes('placeholder')) return false;
  return true;
}

// ── Props
interface HeroRendererProps {
  sections: ComposeSection[];
}

// ── HeroRenderer (pure
const HeroRenderer: React.FC<HeroRendererProps> = ({ sections }) => {
  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section, i) => {
        const props = slotsToProps(section.content_slots as HeroSlots);
        const colors = tokensToColors(section.tokens);
        const Component = componentRegistry[section.component_id];

        if (!Component) {
          console.warn(`[HeroRenderer] Unknown component_id: "${section.component_id}"`);
          return null;
        }

        return (
          <Component
            key={section.component_id ?? i}
            {...props}
            colors={colors}
            overlayColor={isRealImage(props.backgroundImage) ? undefined : section.tokens.background}
          />
        );
      })}
    </>
  );
};

export default HeroRenderer;
