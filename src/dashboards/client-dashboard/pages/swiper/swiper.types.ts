// TypeScript interfaces for Swiper system with Behavioral Signals

export interface ComponentPreview {
    id: string;
    component_id: string;
    client_email: string;
    designer_email: string;
    thumbnail_url: string;
    vibe: string;
    tone: string[];
    layout_structure: string;
    intent: string[];
    tags: string[];
    title: string;
    description: string;
    category: string;
    project_id: string;
    is_canonical: boolean;
    content_slots: Record<string, any>;
    tokens: Record<string, any>;
}

export type SwipeAction = 'like' | 'dislike' | 'super-like' | 'ask-ai';

export type ActionSource = 'gesture' | 'button' | 'keyboard';

// Behavioral Signal Interface for regular swiper
export interface BehavioralSignal {
    hesitation_ms: number;
    gesture_velocity: number;
    swipe_direction: 'left' | 'right' | 'up' | 'down' | 'none';
    view_duration_ms: number;
    queue_position: number;
    action_source: ActionSource;
    is_asked_ai: boolean;
    superlike_used: boolean;
}

// Simplified Behavioral Signal for King of the Hill
export interface KingOfHillBehavioralSignal {
    hesitation_ms: number;
    view_duration_ms: number;
    match_number: number;
    action_source: 'button'; // Only button clicks in King of the Hill
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
    choices: UserChoice[];        // liked + super-liked choices
    rejected: UserChoice[];       // disliked choices
    completion_time: number;
    total_hesitation_ms: number;
    average_view_duration_ms: number;
    gesture_vs_button_ratio: number;
    superlike_count: number;
}

// King of the Hill Types
export interface KingOfHillMatch {
    challenger_id: string;
    defender_id: string;
    winner_id: string;
    match_duration_ms: number;
    behavioral_signals: KingOfHillBehavioralSignal; // Using simplified version
    match_number: number;
}

export interface KingOfHillSession {
    round_number: number;
    category: string;
    components: ComponentPreview[];
    matches: KingOfHillMatch[];
    final_winner_id: string;
    session_duration_ms: number;
    started_at: number;
    completed_at: number;
}

export interface KingOfHillState {
    isActive: boolean;
    currentDefender: ComponentPreview | null;
    currentChallenger: ComponentPreview | null;
    remainingComponents: ComponentPreview[];
    matches: KingOfHillMatch[];
    sessionStartTime: number;
    matchStartTime: number;
    currentMatchNumber: number;
}

// Backend Response Mock
export interface RoundBackendResponse {
    useKingOfHill: boolean;
    message?: string;
}