import React from 'react';
import NavRenderer from '@/pages/Renderer/NavRenderer';
import HeroRenderer from '@/pages/Renderer/HeroRenderer';
import FeaturesRenderer from '@/pages/Renderer/FeaturesRenderer';
import PricingRenderer from '@/pages/Renderer/PricingRenderer';
import FAQRenderer from '@/pages/Renderer/FAQRenderer'
import { TestimonialsRenderer } from '@/pages/Renderer/TestimonialsRenderer';
import { CTARenderer } from '@/pages/Renderer/CTARenderer'
import { ContactRenderer } from '@/pages/Renderer/ContactRenderer';
import { TimelineRenderer } from '@/pages/Renderer/TimelineRenderer';


import type {
  ComposeSection,
  NavComposeSection,
  HeroComposeSection,
  FeaturesComposeSection,
  PricingComposeSection,
} from '@/pages/Renderer/CompositionType';

interface SectionPreviewProps {
  section: ComposeSection;
  highlighted?: boolean;
}

const SectionPreview: React.FC<SectionPreviewProps> = ({ section, highlighted = false }) => {
  const renderSection = () => {
    switch (section.category) {
      case 'nav':
        return <NavRenderer sections={[section as NavComposeSection]} />;
      case 'hero':
        return <HeroRenderer sections={[section as HeroComposeSection]} />;
      case 'features':
        return <FeaturesRenderer sections={[section as FeaturesComposeSection]} />;
      case 'pricing':
        return <PricingRenderer sections={[section as PricingComposeSection]} />;
      case 'faq':
        return <FAQRenderer sections={[section]} />
      case 'testimonials':
        return (
          <TestimonialsRenderer
            raw={{
              layout_structure: section.layout_structure,
              tokens: section.tokens,
              content_slots: section.content_slots,
            }}
          />
        );
      case 'cta':
        return (
          <CTARenderer
            raw={{
              layout_structure: section.layout_structure,
              tokens: section.tokens,
              content_slots: section.content_slots,
            }}
          />
        )
      case 'contact':
        return (
          <ContactRenderer
            raw={{
              layout_structure: section.layout_structure,
              tokens: section.tokens,
              content_slots: section.content_slots,
            }}
          />
        );
        case 'timeline':
        return (
          <TimelineRenderer
            raw={{
              layout_structure: section.layout_structure,
              tokens: section.tokens,
              content_slots: section.content_slots,
            }}
          />
        );
      default: {
        const _exhaustive: never = section;
        console.error(`[SectionPreview] Unhandled category: "${(_exhaustive as any).category}"`);
        return null;
      }
    }
  };

  return (
    <div
      className={[
        'relative h-40 sm:h-48 md:h-64 overflow-hidden bg-background-muted',
        highlighted
          ? 'ring-2 ring-accent-default transition-shadow duration-700'
          : '',
      ].join(' ')}
    >
      <div className="absolute inset-0 origin-top-left pointer-events-none"
        style={{ transform: 'scale(0.35)', width: '286%', height: '286%' }}>
        {renderSection()}
      </div>

      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
        <span className="bg-background-dark/90 text-text-light px-sm sm:px-md py-xs sm:py-sm rounded-lg text-para-xs sm:text-para-sm font-medium shadow-lg">
          {section.category}
        </span>
      </div>

      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 hidden sm:block z-10">
        <span className="bg-background-dark/90 text-text-light px-md py-sm rounded-lg text-para-sm shadow-lg">
          {section.layout_structure}
        </span>
      </div>

      {highlighted && (
        <div className="absolute bottom-2 right-2 z-10 animate-fade-out">
          <span className="bg-accent-default text-white px-sm py-xs rounded-md text-para-xs font-medium shadow">
            Updated ✦
          </span>
        </div>
      )}
    </div>
  );
};

export default SectionPreview;