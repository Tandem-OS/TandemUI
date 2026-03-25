import api from '@/lib/requests/Axios';
import { store } from "@/store";
import type { Thumbnails } from '@/features/composition/compositionSlice';

import type { ComposeSection } from '@/pages/Renderer/CompositionType';

export interface PageSchema {
  sections: ComposeSection[];
}
export interface ComposePayload {
  winner_ids: string[];
  project_id: string;
}

export interface ComposeResponse {
  composition_id: string;
  project_id: string;
  page_schema: PageSchema;
  thumbnails: Thumbnails | null;
}

export interface RefineResponse {
  composition_id: string;
  project_id: string;
  updated_sections: PageSchema['sections'];
  current_version: number;
  chat_response: string;
}

export interface CallAiComposePipeline {
  user_input: string | null;
}

export interface CompositionThumbnails {
  desktop: string;
  tablet: string;
  mobile: string;
}

export interface AiComposePipelineResponse {
  composition_id: string;
  project_id: string;
  page_schema: Record<string, unknown>;
  html_snapshot: string;
  thumbnails: CompositionThumbnails | null;
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
// ─── Refine ───────────────────────────────────────────────────────────────────

export interface RefinePayload {
  composition_id: string;
  sections: string[];
  user_instruction: string;
}

export const postRefine = async (payload: RefinePayload): Promise<RefineResponse> => {
  const response = await api.patch('/ai/refine', payload);
  return response.data;
};

export const callAiComposePipeline = async (
  values: CallAiComposePipeline
): Promise<AiComposePipelineResponse> => {
  const projectId = store.getState().project.projectId;

  const payload = {
    ...values,
    project_id: projectId,
  };
  const response = await api.post('/ai/compose', payload);
  return response.data;
};
