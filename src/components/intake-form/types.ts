// types.ts

export interface IntakeFormData {
    tones: string[];
    toneMetadata: ToneMetadataEntry[];
    keyFeatures: string;
    inspirationUrls: string[];
    colorStrategy: 'match-logo' | 'pick-for-me' | 'custom';
    customColors: string;
    deadline: string;
    notSureDeadline: boolean;
    currentSiteUrl: string;
    brandGuide: File | null;
    additionalDetails: string;
}
export interface ToneMetadataEntry {
    slug: string;
    name: string;
    description: string;
    tags: string[];
    ragHints: string[];
}

export interface VibeScore {
    id: number;
    slug: string;
    name: string;
    src: string;
    wins: number;
    losses: number;
}

export type ButtonState = 'default' | 'saving' | 'saved';