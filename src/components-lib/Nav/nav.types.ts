//  Nav Types 
export interface NavLink {
  href: string
  label: string
}

export interface NavSlots {
  nav_logo?: string | null
  nav_links?: NavLink[] | null
  nav_cta?: string | null
}

export interface NavTokens {
  background?: string
  text_color?: string
  padding?: string
  link_size?: string
  btn_radius?: string
  btn_primary_bg?: string
  btn_primary_color?: string
  link_gap?: string
  logo_height?: string
  link_weight?: string
  btn_padding?: string
  btn_weight?: string
  container_max_width?: string
  [key: string]: string | undefined
}

export interface NavColors {
  background?: string
  text?: string
  btnBg?: string
  btnText?: string
  btnRadius?: string
  btnHoverBg?: string
  btnHoverText?: string
}

//  Resolved styles passed into NavBase 
export interface NavStyles {
  colors: NavColors
  padding?: string
  linkSize?: string
  linkGap?: string
  logoHeight?: string
  linkWeight?: string
  btnPadding?: string
  btnWeight?: string
  containerMaxWidth?: string
}

//  DB section shape 
export interface NavComposeSection {
  position: number
  category: 'nav'
  component_id: string
  layout_structure?: string
  tags: string[]
  content_slots: NavSlots
  tokens: NavTokens
}