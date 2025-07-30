// TypeScript interfaces for Swiper system

export interface ComponentPreview {
    component_id: string;
    thumbnail_url: string;
    vibe: string;
    tone: string[];
    layout_structure: string;
    intent: string[];
    tags: string[];
    title: string;
    description: string;
    category: string;
}

export type SwipeAction = 'like' | 'dislike' | 'save' | 'ask-ai';

export interface UserChoice {
    component_id: string;
    category: string;
    vibe: string;
    action: SwipeAction;
    timestamp: number;
    round: number;
}

export interface RoundData {
    roundNumber: number;
    category: string;
    components: ComponentPreview[];
    currentStep: number; // 0-3 for 4 components
    completed: boolean;
}

export interface SwipeCardProps {
    component: ComponentPreview;
    onSwipe: (action: SwipeAction) => void;
    isActive?: boolean;
    zIndex?: number;
    scale?: number;
    isAnimating?: boolean;
}

export interface SwiperProgressProps {
    current: number;
    total: number;
    className?: string;
}