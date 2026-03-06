import api from '@/lib/requests/Axios';
import { store } from "@/store";
import type { Thumbnails } from '@/features/composition/compositionSlice';

export interface ComposePayload {
  winner_ids: string[];
  project_id: string;
}

export interface ComposeResponse {
  composition_id: string;
  project_id: string;
  page_schema: object;
  thumbnails: Thumbnails | null;
  // html_snapshot intentionally omitted — not stored per SMA spec
}

export const postCompose = async (payload: ComposePayload): Promise<ComposeResponse> => {
  const response = await api.post('/compose', payload);
  return response.data;
};

export const getCompose = async (compositionId: string): Promise<ComposeResponse> => {
  const response = await api.get(`/compose/${compositionId}`);
  return response.data;
};

export const getAllProjectCompose = async (): Promise<ComposeResponse> => {
  const projectId = store.getState().project.projectId;
  const response = await api.get(`/compose?project_id${projectId}`);
  return response.data;
};