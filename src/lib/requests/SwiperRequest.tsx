import api from "@/lib/requests/Axios";
import { store } from "@/store";

const clientEmail = store.getState().auth.user.email!;
const designerEmail = store.getState().auth.user.designerEmail;

interface SwiperRoundSummary {
  round_number: number;
  category: string;
  choices: any[];
  saved: any[];
  rejected: any[];
  completion_time: number;
  gesture_vs_button_ratio: number;
  total_hesitation_ms: number;
  save_count: number;
  superlike_count: number;
  average_view_duration_ms: number;
  total_swipes: number;
  liked_count: number;
  saved_count: number;
  rejected_count: number;
}

export const swiperData = async (values: SwiperRoundSummary) => {
  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: '45742298-b7ea-46cd-a5f5-74abce2ca8ef'
  };

  return await api.post("/swiper/event", payload);
};
