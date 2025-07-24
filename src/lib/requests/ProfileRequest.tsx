import api from "@/lib/requests/Axios";
import { store } from "@/store";

// Get user profile by ID
export const getUser = async () => {
  const userId = store.getState().auth?.user?.id;
  const response = await api.get(`/profiles/${userId}`);
  return response.data;
};