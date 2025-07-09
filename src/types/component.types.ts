export interface ComponentMeta {
    name: string;
    category: 'heroes' | 'buttons' | 'cards' | 'forms' | 'features';
    tags: string[];
    industries: string[];
    styles: Array<'modern' | 'minimal' | 'creative'>;
    description: string;
    dependencies: string[];
    defaultProps: Record<string, any>;
}

// types/component.types.ts
export interface HeroBuilderProps {
    style?: 'minimal' | 'modern' | 'creative';
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    layout?: 'centered' | 'split' | 'fullwidth';
    animation?: 'none' | 'fade' | 'slide';
    colors?: {
        primary?: string;
        secondary?: string;
        text?: string;
    };
}


export type AccentColor = "blue" | "purple" | "emerald" | "rose" | "amber";
