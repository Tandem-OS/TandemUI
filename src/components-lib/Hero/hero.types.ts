export type HeroLayoutStructure = 'stacked' | 'immersive' | 'split' | 'centered'

export interface HeroAction {
    label: string
    target: string
    variant?: 'primary' | 'outline' | 'ghost'
    aria_label?: string
}

export interface HeroProps {
    // Family-required
    hero_heading: string

    // Family-optional
    hero_subheading?: string | null
    hero_media?: string | null
    hero_media_slides?: string[] | null
    hero_animated?: boolean | null
    hero_primary_action?: HeroAction | null
    hero_secondary_action?: HeroAction | null
}

export interface HeroStyles {
    background?: string
    heading_color?: string
    subheading_color?: string
    heading_size?: string
    heading_weight?: string
    btn_primary_bg?: string
    btn_primary_color?: string
    btn_outline_border?: string
    btn_radius?: string
    padding?: string
    carousel_dot_active_color?: string
    carousel_dot_inactive_color?: string
    carousel_arrow_color?: string
    carousel_arrow_border_color?: string
    carousel_arrow_hover_bg?: string
}

export interface HeroShellProps {
    props: HeroProps
    styles: HeroStyles
}
