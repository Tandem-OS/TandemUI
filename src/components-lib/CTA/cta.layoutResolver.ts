import type { ComponentType } from 'react';
import type { CTALayoutStructure, CTAProps } from './cta.types';

import { CTAHeroFooterShell } from './Shells/CTAHeroFooterShell';
import { CTAAnnouncementFAQShell } from './Shells/CTAAnnouncementFAQShell';
import { CTANewsletterCenteredShell } from './Shells/CTANewsletterCenteredShell';
import { CTASearchFooterShell } from './Shells/CTASearchFooterShell';

const LAYOUT_REGISTRY: Record<CTALayoutStructure, ComponentType<CTAProps>> = {
  'hero-footer': CTAHeroFooterShell as ComponentType<CTAProps>,
  'announcement-faq': CTAAnnouncementFAQShell as ComponentType<CTAProps>,
  'newsletter-centered': CTANewsletterCenteredShell as ComponentType<CTAProps>,
  'search-footer': CTASearchFooterShell as ComponentType<CTAProps>,
};

export function resolveCTALayout(
  layoutStructure: CTALayoutStructure
): ComponentType<CTAProps> {
  const Shell = LAYOUT_REGISTRY[layoutStructure];

  if (!Shell) {
    throw new Error(
      `resolveCTALayout: no shell registered for layout "${layoutStructure}"`
    );
  }

  return Shell;
}