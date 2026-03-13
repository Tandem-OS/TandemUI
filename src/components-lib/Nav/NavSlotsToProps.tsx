import type { NavSlots, NavLink } from '@/pages/Renderer/CompositionType';
export type { NavLink }

export interface NavProps {
  logo?: string | null
  links?: NavLink[]
  cta?: string | null
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
    logo: slots.nav_logo ?? null,
    links: (slots.nav_links ?? []) as NavLink[],
    cta: slots.nav_cta ?? null,
    layout_structure: layout_structure ?? 'split',
    tags: tags ?? [],
    padding,
    linkSize,
  }
}
