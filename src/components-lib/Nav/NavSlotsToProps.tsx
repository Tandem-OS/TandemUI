import type { NavSlots, NavLink } from './nav.types'
export type { NavLink }

export interface NavProps {
  logo?: string
  links?: NavLink[]
  cta?: string
}

export function navSlotsToProps(slots: NavSlots): NavProps {
  return {
    logo: slots.nav_logo ?? undefined,
    links: (slots.nav_links ?? []) as NavLink[],
    cta: slots.nav_cta ?? undefined,
  }
}