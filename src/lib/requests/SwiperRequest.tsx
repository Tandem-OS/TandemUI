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
  session_id: string
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
  const designerEmail = store.getState().auth.user.designerEmail!;
  const projectId = store.getState().project.projectId!;

  const formData = new FormData();

  // Append all fields except thumbnail_url
  for (const [key, value] of Object.entries(values)) {
    if (key !== "thumbnail_url") {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    }
  }

  formData.append("client_email", clientEmail);
  formData.append("designer_email", designerEmail);
  formData.append("project_id", projectId);

  // Convert thumbnail_url to File if it's a local path
  if (values.thumbnail_url.startsWith("/")) {
    const response = await fetch(values.thumbnail_url);
    const blob = await response.blob();
    const filename = values.thumbnail_url.split("/").pop() || "thumbnail.png";
    const file = new File([blob], filename, { type: blob.type });
    formData.append("thumbnail_url", file);
  }

  return await api.post("/swiper/components", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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

export const saveRoundCompleted = async () => {
  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId,
    round_completed: true
  };

  return await api.post("/rounds/completed", payload)
}

export const fetchRoundCompleted = async () => {
  const project_id = store.getState().project.projectId;

  return await api.get(`/rounds/completed/${project_id}`)
}

export const fetchRoundCompletedData = async () => {
  const project_id = store.getState().project.projectId;

  return await api.get(`/rounds/completed/summary/${project_id}`)
}
export const fetchSwiperComponentsGrouped = async () => {
  const project_id = store.getState().project.projectId;

  // backend returns: { hero, nav, features }
  return await api.get("/swiper/components", {
    params: { project_id },
  });
};