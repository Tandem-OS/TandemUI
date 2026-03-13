import React, { useEffect, useState } from 'react';
import componentRegistry from '@/registry/componentRegistry';
import { slotsToProps } from '@/registry/slotsToProps';
import { getCompose } from '@/lib/requests/CompositionRequest';
import { useParams } from 'react-router';

// ── Types ────────────────────────────────────────────────────
export interface ComposeSectionTokens {
    background?: string;
    text_color?: string;
    btn_primary_bg?: string;
    btn_primary_color?: string;
    btn_outline_border?: string;
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
    [key: string]: string | string[] | boolean | null | undefined;
}

export interface ComposeSection {
    position: number;
    category: string;
    component_id: string;
    content_slots: ComposeSectionSlots;
    tokens: ComposeSectionTokens;
    thumbnail_url?: string;
}

// ── Helpers ──────────────────────────────────────────────────
function tokensToColors(tokens: ComposeSectionTokens) {
    const primaryBorder = tokens.btn_primary_bg === 'transparent'
        ? tokens.btn_outline_border
        : tokens.btn_primary_bg;

    const primaryHoverBg = tokens.btn_primary_bg === 'transparent' ? tokens.text_color : undefined;
    const primaryHoverText = tokens.btn_primary_bg === 'transparent' ? tokens.background : tokens.text_color;
    const secondaryHoverBg = tokens.btn_outline_border;
    const secondaryHoverText = tokens.background;

    return {
        background: { light: tokens.background, dark: tokens.background },
        title: { light: tokens.text_color, dark: tokens.text_color },
        description: { light: tokens.text_color, dark: tokens.text_color },
        primaryButton: {
            background: { light: tokens.btn_primary_bg, dark: tokens.btn_primary_bg },
            text: { light: tokens.btn_primary_color, dark: tokens.btn_primary_color },
            border: { light: primaryBorder, dark: primaryBorder },
            hover: {
                background: { light: primaryHoverBg, dark: primaryHoverBg },
                text: { light: primaryHoverText, dark: primaryHoverText },
                border: { light: primaryBorder, dark: primaryBorder },
            }
        },
        secondaryButton: {
            background: { light: 'transparent', dark: 'transparent' },
            text: { light: tokens.btn_outline_border, dark: tokens.btn_outline_border },
            border: { light: tokens.btn_outline_border, dark: tokens.btn_outline_border },
            hover: {
                background: { light: secondaryHoverBg, dark: secondaryHoverBg },
                text: { light: secondaryHoverText, dark: secondaryHoverText },
                border: { light: tokens.btn_outline_border, dark: tokens.btn_outline_border },
            }
        }
    };
}

// Add this helper at the top of the file
function isRealImage(url?: string | null): boolean {
    if (!url) return false;
    if (url.includes('placehold.co')) return false;
    if (url.includes('placeholder')) return false;
    return true;
}

// ── HeroRenderer ─────────────────────────────────────────────
const HeroRenderer: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [heroSections, setHeroSections] = useState<ComposeSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getCompose(id);
                const sections: ComposeSection[] = result?.page_schema?.sections ?? [];
                setHeroSections(sections.filter(s => s.category === 'hero'));
            } catch (err) {
                console.error('[HeroRenderer] fetch failed:', err);
                setError('Failed to load composition.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary">
            <div className="w-10 h-10 border-4 border-border-muted border-t-accent-default rounded-full animate-spin" />
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary">
            <p className="text-text-secondary">{error}</p>
        </div>
    );

    if (heroSections.length === 0) return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary">
            <p className="text-text-secondary">No hero sections found in this composition.</p>
        </div>
    );

    return (
        <>
            {heroSections.map((section, i) => {
                // ✅ props and colors are INSIDE the map — section is defined here
                const props = slotsToProps(section.content_slots);
                const colors = tokensToColors(section.tokens);

                const Component = componentRegistry[section.component_id];

                if (!Component) {
                    console.warn(`[HeroRenderer] Unknown component_id: "${section.component_id}"`);
                    return null;
                }

                return (
                    <Component
                        key={section.component_id ?? i}
                        {...props}
                        colors={colors}
                        overlayColor={isRealImage(props.backgroundImage) ? undefined : section.tokens.background}
                    />
                );
            })}
        </>
    );
};

export default HeroRenderer;