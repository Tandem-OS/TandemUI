//  Nav Slots → Props 


import type { NavSlots, NavLink, NavTokens } from './nav.types'
export type { NavLink }

export interface NavProps {
  logo?: string
  links?: NavLink[]
  cta?: string
  layout_structure?: string
  tags?: string[]
  // ── Token layer 
  padding?: string
  linkSize?: string
  linkGap?: string
  logoHeight?: string
  linkWeight?: string
  btnPadding?: string
  btnWeight?: string
  containerMaxWidth?: string
}

export function navSlotsToProps(
  slots: NavSlots,
  layout_structure?: string,
  tags?: string[],
  tokens?: NavTokens,
): NavProps {
  return {
    // Slots
    logo: slots.nav_logo ?? undefined,
    links: (slots.nav_links ?? []) as NavLink[],
    cta: slots.nav_cta ?? undefined,

    // Layout
    layout_structure: layout_structure ?? undefined,
    tags: tags ?? [],

    // Token layer — all fields, no omissions
    padding: tokens?.padding,
    linkSize: tokens?.link_size,
    linkGap: tokens?.link_gap,
    logoHeight: tokens?.logo_height,
    linkWeight: tokens?.link_weight,
    btnPadding: tokens?.btn_padding,
    btnWeight: tokens?.btn_weight,
    containerMaxWidth: tokens?.container_max_width,
  }
}