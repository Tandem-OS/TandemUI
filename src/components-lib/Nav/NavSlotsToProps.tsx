import type { NavSlots, NavLink } from '@/pages/Renderer/CompositionType';
export type { NavLink }

export interface NavProps {
  logo?: string
  links?: NavLink[]
  cta?: string
  layout_structure?: string
  tags?: string[]
  padding?: string
  linkSize?: string
}

export function navSlotsToProps(
  slots: NavSlots,
  layout_structure?: string,
  tags?: string[],
  padding?: string,
  linkSize?: string,
): NavProps {
  return {
    logo: slots.nav_logo ?? undefined,
    links: (slots.nav_links ?? []) as NavLink[],
    cta: slots.nav_cta ?? undefined,
    layout_structure: layout_structure ?? 'split',
    tags: tags ?? [],
    padding,
    linkSize,
  }
}
