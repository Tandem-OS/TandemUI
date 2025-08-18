import api from "@/lib/requests/Axios";
import { store } from "@/store";


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

interface SwiperComponent {
  component_id: string;
  layout_structure: string;
  tone: string[];
  intent: string[];
  tags: string[];
  title: string;
  description: string;
  category: string;
  thumbnail_url: string;
  vibe: string;
}

interface KingOfHillSession {
  round_number: number
  category: string
  final_winner_id: string
  session_duration_ms: number
  started_at: number
  completed_at: number
}

interface KingOfMatches {
  session_id: string
  challenger_id: string
  defender_id: string
  winner_id: string
  match_duration_ms: number
  match_number: number
  behavioral_signals: {}
}

export const swiperData = async (values: SwiperRoundSummary) => {

  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId
  };

  return await api.post("/swiper/event", payload);
};

export const swiperComponentData = async (values: SwiperComponent) => {

  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId
  };

  return await api.post("/swiper/components", payload);
}

export const swiperKingOfHillSessionData = async (values: KingOfHillSession) => {
  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId
  };

  return await api.post("/swiper/session", payload)
}

export const swiperKingOfHillMatchesData = async (values: KingOfMatches) => {
  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId
  };

  return await api.post("/swiper/session/matches", payload)
}
