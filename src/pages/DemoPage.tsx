import React from 'react';
import { Hero_01, Hero_02, Hero_03, Hero_04 } from '../components-lib/Hero';

// ── Mock colors (mirrors tokensToColors output from HeroRenderer) ──
const darkNavyColors = {
    background:  { light: '#1a1a2e', dark: '#1a1a2e' },
    title:       { light: '#ffffff', dark: '#ffffff'  },
    description: { light: '#cbd5e1', dark: '#cbd5e1'  },
    primaryButton: {
        background: { light: '#4f46e5', dark: '#4f46e5' },
        text:       { light: '#ffffff',  dark: '#ffffff'  },
        border:     { light: '#4f46e5',  dark: '#4f46e5'  },
        hover: {
            background: { light: '#3730a3', dark: '#3730a3' },
            text:       { light: '#ffffff',  dark: '#ffffff'  },
            border:     { light: '#3730a3',  dark: '#3730a3'  },
        }
    },
    secondaryButton: {
        background: { light: 'transparent', dark: 'transparent' },
        text:       { light: '#ffffff',     dark: '#ffffff'     },
        border:     { light: '#ffffff',     dark: '#ffffff'     },
        hover: {
            background: { light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.15)' },
            text:       { light: '#ffffff', dark: '#ffffff' },
            border:     { light: '#ffffff', dark: '#ffffff' },
        }
    }
};

const deepBlueColors = {
    background:  { light: '#0f3460', dark: '#0f3460' },
    title:       { light: '#ffffff', dark: '#ffffff'  },
    description: { light: '#e2e8f0', dark: '#e2e8f0'  },
    primaryButton: {
        background: { light: 'transparent', dark: 'transparent' },
        text:       { light: '#ffffff',     dark: '#ffffff'     },
        border:     { light: '#ffffff',     dark: '#ffffff'     },
        hover: {
            background: { light: '#ffffff', dark: '#ffffff'  },
            text:       { light: '#0f3460', dark: '#0f3460' },
            border:     { light: '#ffffff', dark: '#ffffff'  },
        }
    },
    secondaryButton: {
        background: { light: 'transparent',           dark: 'transparent'           },
        text:       { light: '#ffffff',               dark: '#ffffff'               },
        border:     { light: '#ffffff',               dark: '#ffffff'               },
        hover: {
            background: { light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.15)' },
            text:       { light: '#ffffff', dark: '#ffffff' },
            border:     { light: '#ffffff', dark: '#ffffff' },
        }
    }
};

const purpleColors = {
    background:  { light: '#533483', dark: '#533483' },
    title:       { light: '#ffffff', dark: '#ffffff'  },
    description: { light: '#e9d8fd', dark: '#e9d8fd'  },
    primaryButton: {
        background: { light: '#4f46e5', dark: '#4f46e5' },
        text:       { light: '#ffffff',  dark: '#ffffff'  },
        border:     { light: '#4f46e5',  dark: '#4f46e5'  },
        hover: {
            background: { light: '#3730a3', dark: '#3730a3' },
            text:       { light: '#ffffff',  dark: '#ffffff'  },
            border:     { light: '#3730a3',  dark: '#3730a3'  },
        }
    },
    secondaryButton: {
        background: { light: 'transparent', dark: 'transparent' },
        text:       { light: '#ffffff',     dark: '#ffffff'     },
        border:     { light: '#ffffff',     dark: '#ffffff'     },
        hover: {
            background: { light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.15)' },
            text:       { light: '#ffffff', dark: '#ffffff' },
            border:     { light: '#ffffff', dark: '#ffffff' },
        }
    }
};

// ── DemoPage ─────────────────────────────────────────────────
const DemoPage: React.FC = () => {
    return (
        <>
            {/* ── Hero_01 — Stacked full-bleed, centered headline, single CTA ── */}
            <Hero_01
                slots={{
                    hero_heading:        'Design AI for coded websites',
                    hero_subheading:     'Generate structured layouts from modular components and behavioral design signals.',
                    hero_primary_action: 'Get started for $5',
                    hero_media:          'https://placehold.co/1600x900/1a1a2e/ffffff?text=Hero+01',
                }}
                colors={darkNavyColors}
                overlayColor="#1a1a2e"
                animated={true}
            />

            {/* ── Hero_02 — Immersive full-bleed with carousel controls ── */}
            <Hero_02
                slots={{
                    hero_heading:        'Freshly Packed. Delivered Daily.',
                    hero_primary_action: 'Order Now',
                    hero_media:          'https://placehold.co/1600x900/16213e/ffffff?text=Hero+02+Slide+1',
                    hero_media_slides: [
                        'https://placehold.co/1600x900/16213e/ffffff?text=Hero+02+Slide+1',
                        'https://placehold.co/1600x900/1a1a2e/ffffff?text=Hero+02+Slide+2',
                        'https://placehold.co/1600x900/0f3460/ffffff?text=Hero+02+Slide+3',
                    ],
                }}
                colors={darkNavyColors}
                overlayColor="#16213e"
                animated={true}
            />

            {/* ── Hero_03 — Full-bleed, left-anchored, dual CTA ── */}
            <Hero_03
                slots={{
                    hero_heading:          'Superior results. Great systems for every team.',
                    hero_subheading:       'Structured layouts, scalable components, and faster alignment for teams building modern digital experiences.',
                    hero_primary_action:   'Book a Demo',
                    hero_secondary_action: 'View Work',
                    hero_media:            'https://placehold.co/1600x900/0f3460/ffffff?text=Hero+03',
                }}
                colors={deepBlueColors}
                overlayColor="#0f3460"
                animated={true}
            />

            {/* ── Hero_04 — Institutional stacked with search + bottom CTA ── */}
            <Hero_04
                slots={{
                    hero_heading:        'University',
                    hero_subheading:     'Discover programs, research, and campus experiences through a structured digital experience built for exploration.',
                    hero_primary_action: 'Explore Tandem',
                    hero_media:          'https://placehold.co/1600x900/533483/ffffff?text=Hero+04',
                }}
                colors={purpleColors}
                overlayColor="#533483"
                searchPlaceholder="Search programs, departments, or research areas..."
                animated={true}
            />
        </>
    );
};

export default DemoPage;