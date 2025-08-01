// TypeScript interfaces for Swiper system with Behavioral Signals

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

export type SwipeAction = 'like' | 'dislike' | 'save' | 'super-like' | 'ask-ai';

export type ActionSource = 'gesture' | 'button' | 'keyboard';

// Behavioral Signal Interface
export interface BehavioralSignal {
    hesitation_ms: number;
    gesture_velocity: number;
    swipe_direction: 'left' | 'right' | 'up' | 'down' | 'none';
    view_duration_ms: number;
    queue_position: number;
    action_source: ActionSource;
    is_modal_open: boolean;
    superlike_used: boolean;
}

// Enhanced User Choice with Behavioral Signals
export interface UserChoice {
    component_id: string;
    category: string;
    vibe: string;
    action: SwipeAction;
    timestamp: number;
    round: number;
    behavioral_signals: BehavioralSignal;
}

export interface RoundData {
    roundNumber: number;
    category: string;
    components: ComponentPreview[];
    currentStep: number; // 0-3 for 4 components
    completed: boolean;
}

// Enhanced SwipeCardProps with position tracking
export interface SwipeCardProps {
    component: ComponentPreview;
    onSwipe: (action: SwipeAction, signals: BehavioralSignal) => void;
    isActive?: boolean;
    zIndex?: number;
    scale?: number;
    isAnimating?: boolean;
    queuePosition: number;
    totalCards: number;
    isModalOpen?: boolean;
}

export interface SwiperProgressProps {
    current: number;
    total: number;
    className?: string;
}

// Round Summary for Backend
export interface RoundSummary {
    round_number: number;
    category: string;
    choices: UserChoice[];
    completion_time: number;
    total_hesitation_ms: number;
    average_view_duration_ms: number;
    gesture_vs_button_ratio: number;
    superlike_count: number;
}