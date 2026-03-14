// Nav
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

// Hero
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

// Shared
export interface ComposeSection {
    position: number;
    category: string;
    component_id: string;
    layout_structure?: string;
    tags: string[];
    content_slots: ComposeSectionSlots | NavSlots;
    tokens: ComposeSectionTokens | NavTokens;
}
