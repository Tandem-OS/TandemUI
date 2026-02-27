import api from "@/lib/requests/Axios";
import { store } from "@/store";

// ─── Canonical types ──────────────────────────────────────────────────────────
export const TANDEM_CANONICAL_PROJECT_ID = "00000000-0000-0000-0000-000000000000";

export interface CanonicalComponent {
  id: string;
  component_id: string;
  project_id: string;
  client_email: string;
  designer_email: string;
  category: string;
  title: string;
  description: string;
  layout_structure: string | null;
  thumbnail_url: string | null;
  vibe: string | null;
  tone: string[] | null;
  intent: string[] | null;
  tags: string[] | null;
  content_slots: Record<string, any>;
  tokens: Record<string, any>;
  is_canonical: boolean;
  created_at: string;
}

export interface CanonicalComponentsResponse {
  hero: CanonicalComponent[];
  nav: CanonicalComponent[];
  features: CanonicalComponent[];
}
// ─────────────────────────────────────────────────────────────────────────────

interface SwiperRoundSummary {
  choices: any[];
  rejected: any[];
  round_number: number;
  category: string;
  completion_time?: number | null;
  gesture_vs_button_ratio?: number | null;
  total_hesitation_ms?: number | null;
  superlike_count: number;
  average_view_duration_ms?: number | null;
  breakdown: { [key: string]: number };
}

// FIXED: Matches SwiperComponentWithSession Pydantic model exactly
interface SwiperComponent {
  component_id: string;
  project_id: string;
  client_email: string;
  designer_email: string;
  session_id: string;
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  layout_structure?: string | null;
  thumbnail_url?: string | null;
  vibe?: string | null;
  tone?: string[] | null;
  intent?: string[] | null;
  tags?: string[] | null;
  content_slots?: Record<string, any>;
  tokens?: Record<string, any>;
  is_canonical?: boolean;
}

interface KingOfHillSession {
  round_number: number;
  category: string;
  final_winner_id: string;
  session_duration_ms: number;
  started_at: number;
  completed_at: number;
}

interface KingOfMatches {
  session_id: string;
  challenger_id: string;
  defender_id: string;
  winner_id: string;
  match_duration_ms: number;
  match_number: number;
  behavioral_signals: {};
}

// ─── Canonical fetch ──────────────────────────────────────────────────────────
export const getCanonicalComponents = async (): Promise<CanonicalComponentsResponse> => {
  const response = await api.get("/swiper/canonical");
  return response.data;
};
// ─────────────────────────────────────────────────────────────────────────────

export const swiperData = async (values: SwiperRoundSummary) => {
  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId,
  };

  return await api.post("/swiper/event", payload);
};

// Sends FormData — backend POST /swiper/components expects Form(...) fields
// Nested objects (content_slots, tokens) and arrays must be JSON.stringify'd
// thumbnail_url for canonical components is always a URL — append as string directly
export const swiperComponentData = async (values: SwiperComponent) => {
  const projectId = store.getState().project.projectId;
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (value === null || value === undefined) continue;
    if (key === 'thumbnail_url') continue;
    if (key === 'project_id') continue;        // ← always override below, never trust incoming value

    if (typeof value === 'object' && !Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  }

  // Always inject real project_id from Redux — never use canonical component's ID
  formData.append('project_id', projectId ?? '');

  formData.append('is_canonical', 'false');    // ← force false, user swipe records are never canonical

  // Backend expects UploadFile — fetch URL and convert to File blob
  if (values.thumbnail_url) {
    try {
      const res = await fetch(values.thumbnail_url);
      const blob = await res.blob();
      const filename = values.thumbnail_url.split('/').pop()?.split('?')[0] || 'thumbnail.png';
      const file = new File([blob], filename, { type: blob.type || 'image/png' });
      formData.append('thumbnail_url', file);
    } catch {
      const fallback = await fetch('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
      const blob = await fallback.blob();
      formData.append('thumbnail_url', new File([blob], 'thumbnail.png', { type: 'image/png' }));
    }
  }

  return await api.post("/swiper/components", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const swiperKingOfHillSessionData = async (values: KingOfHillSession) => {
  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId,
  };

  return await api.post("/swiper/session", payload);
};

export const swiperKingOfHillMatchesData = async (values: KingOfMatches) => {
  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId,
  };

  return await api.post("/swiper/session/matches", payload);
};

export const saveRoundCompleted = async () => {
  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId,
    round_completed: true,
  };

  return await api.post("/rounds/completed", payload);
};

export const fetchRoundCompleted = async () => {
  const project_id = store.getState().project.projectId;
  return await api.get(`/rounds/completed/${project_id}`);
};

export const fetchRoundCompletedData = async () => {
  const project_id = store.getState().project.projectId;
  return await api.get(`/rounds/completed/summary/${project_id}`);
};