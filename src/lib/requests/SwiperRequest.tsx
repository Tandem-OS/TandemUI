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

export const swiperData = async (values: SwiperRoundSummary) => {

  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;

  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: '5ff031cc-9cab-42d3-afe4-b97d3c1a33cd'
  };

  return await api.post("/swiper/event", payload);
};

export const swiperComponentData = async (values: SwiperComponent) => {

  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;

  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: '5ff031cc-9cab-42d3-afe4-b97d3c1a33cd'
  };

  return await api.post("/swiper/components", payload);
}
