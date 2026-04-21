import type { ComponentType } from 'react';
import type { ContactLayoutStructure, ContactShellProps } from './contact.types';

import { ContactSplitFormShell } from './Shells/ContactSplitFormShell';
import { ContactBookingProfileShell } from './Shells/ContactBookingProfileShell';
import { ContactFullPageShell } from './Shells/ContactFullPageShell';
import { ContactFormEditorialShell } from './Shells/ContactFormEditorialShell';

const LAYOUT_REGISTRY: Record<ContactLayoutStructure, ComponentType<ContactShellProps>> = {
  'split_form_grid':       ContactSplitFormShell as ComponentType<ContactShellProps>,
  'booking_profile_split': ContactBookingProfileShell as ComponentType<ContactShellProps>,
  'full_page_split':       ContactFullPageShell as ComponentType<ContactShellProps>,
  'form_editorial_split':  ContactFormEditorialShell as ComponentType<ContactShellProps>,
};

export function resolveContactLayout(
  layoutStructure: ContactLayoutStructure
): ComponentType<ContactShellProps> {
  const Shell = LAYOUT_REGISTRY[layoutStructure];

  if (!Shell) {
    throw new Error(
      `resolveContactLayout: no shell registered for layout "${layoutStructure}"`
    );
  }

  return Shell;
}