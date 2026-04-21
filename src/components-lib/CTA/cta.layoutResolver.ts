import type { ComponentType } from 'react';
import type { CTALayoutStructure, CTAShellProps } from './cta.types';

import { CTAHeroFooterShell } from './Shells/CTAHeroFooterShell';
import { CTAAnnouncementFAQShell } from './Shells/CTAAnnouncementFAQShell';
import { CTANewsletterCenteredShell } from './Shells/CTANewsletterCenteredShell';
import { CTASearchFooterShell } from './Shells/CTASearchFooterShell';

const LAYOUT_REGISTRY: Record<CTALayoutStructure, ComponentType<CTAShellProps>> = {
  'hero-footer':         CTAHeroFooterShell as ComponentType<CTAShellProps>,
  'announcement-faq':    CTAAnnouncementFAQShell as ComponentType<CTAShellProps>,
  'newsletter-centered': CTANewsletterCenteredShell as ComponentType<CTAShellProps>,
  'search-footer':       CTASearchFooterShell as ComponentType<CTAShellProps>,
};

export function resolveCTALayout(
  layoutStructure: CTALayoutStructure
): ComponentType<CTAShellProps> {
  const Shell = LAYOUT_REGISTRY[layoutStructure];
  if (!Shell) {
    throw new Error(
      `resolveCTALayout: no shell registered for layout "${layoutStructure}"`
    );
  }
  return Shell;
}