// ── Nav
export interface NavLink {
  href: string;
  label: string;
}

export interface NavSlots {
  nav_logo?: string | null;
  nav_links?: NavLink[] | null;
  nav_cta?: string | null;
}

export interface NavTokens {
  background?: string;
  text_color?: string;
  padding?: string;
  link_size?: string;
  btn_radius?: string;
  btn_primary_bg?: string;
  btn_primary_color?: string;
  link_gap?: string;
  logo_height?: string;
  link_weight?: string;
  btn_padding?: string;
  btn_weight?: string;
  container_max_width?: string;
  [key: string]: string | undefined;
}

export interface NavColors {
  background?: string;
  text?: string;
  btnBg?: string;
  btnText?: string;
  btnRadius?: string;
  btnHoverBg?: string;
  btnHoverText?: string;
}

// ── Hero
export interface ComposeSectionTokens {
  background?: string;
  text_color?: string;
  btn_primary_bg?: string;
  btn_primary_color?: string;
  btn_outline_border?: string;
  padding?: string;
  link_size?: string;
  btn_radius?: string;
  [key: string]: string | undefined;
}

export interface ComposeSectionSlots {
  hero_heading?: string | null;
  hero_subheading?: string | null;
  hero_media?: string | null;
  hero_media_slides?: string[] | null;
  hero_cta_primary?: string | null;
  hero_cta_secondary?: string | null;
  hero_primary_action?: string | null;
  hero_primary_href?: string | null;
  hero_primary_variant?: string | null;
  hero_secondary_action?: string | null;
  hero_secondary_href?: string | null;
  hero_secondary_variant?: string | null;
  hero_animated?: boolean | null;
  [key: string]: string | string[] | NavLink[] | boolean | null | undefined;
}

// ── Features
export interface FeaturesTokens {
  background?: string;
  text_color?: string;
  card_bg?: string;
  card_radius?: string;
  padding?: string;
  heading_size?: string;
  heading_weight?: string;
  [key: string]: string | undefined;
}

export interface FeaturesColors {
  background?: string;
  text_color?: string;
  card_bg?: string;
  card_radius?: string;
  padding?: string;
  heading_size?: string;
  heading_weight?: string;
}

export interface FeaturesAction {
  label: string;
  target: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  aria_label?: string;
}

export interface FeaturesItem {
  title: string;
  description?: string;
  image?: string;
}

export interface FeaturesSlots {
  features_heading?: string;
  features_subheading?: string;
  features_variant?: string;
  features_items?: FeaturesItem[];
  features_media?: string;
  features_primary_action?: FeaturesAction;
  features_secondary_action?: FeaturesAction;
}

// ── Discriminated section types
export interface NavComposeSection {
  position: number;
  category: 'nav';
  component_id: string;
  layout_structure?: string;
  tags: string[];
  content_slots: NavSlots;
  tokens: NavTokens;
}

export interface HeroComposeSection {
  position: number;
  category: 'hero';
  component_id: string;
  layout_structure?: string;
  tags: string[];
  content_slots: ComposeSectionSlots;
  tokens: ComposeSectionTokens;
}

export interface FeaturesComposeSection {
  position: number;
  category: 'features';
  component_id: string;
  layout_structure?: string;
  tags: string[];
  content_slots: FeaturesSlots;
  tokens: FeaturesTokens;
}

export type ComposeSection = NavComposeSection | HeroComposeSection | FeaturesComposeSection;