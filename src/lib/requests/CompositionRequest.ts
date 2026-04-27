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
  reasoning?: string;
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

const COMPOSE_ENDPOINT = '/compose'

export const postCompose = async (payload: ComposePayload): Promise<ComposeResponse> => {
  const response = await api.post(`${COMPOSE_ENDPOINT}`, payload);
  return response.data;
};

export const getCompose = async (compositionId: string): Promise<ComposeResponse> => {
  const response = await api.get(`${COMPOSE_ENDPOINT}/${compositionId}`);
  return response.data;
};

export const getAllProjectCompose = async (): Promise<ComposeResponse> => {
  const projectId = store.getState().project.projectId;
  const response = await api.get(`${COMPOSE_ENDPOINT}?project_id${projectId}`);
  return response.data;
};
// ─── Refine ───────────────────────────────────────────────────────────────────

export interface RefinePayload {
  composition_id: string;
  sections: string[];
  user_instruction: string;
}

export const postRefine = async (payload: RefinePayload): Promise<RefineResponse> => {
  const response = await api.patch(`${COMPOSE_ENDPOINT}/refine`, payload);
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
  const response = await api.post(`${COMPOSE_ENDPOINT}`, payload);
  return response.data;
};
export const getVersions = async (projectId: string) => {
  const response = await api.get(`/compose/versions/${projectId}`);
  return response.data;
};

export const getVersionByNumber = async (projectId: string, versionNumber: number) => {
  const response = await api.get(`/compose/versions/${projectId}/${versionNumber}`);
  return response.data;
};

export const postRestoreVersion = async (projectId: string, targetVersion: number) => {
  const response = await api.post('/compose/versions/restore', {
    project_id: projectId,
    target_version: targetVersion,
  });
  return response.data;
};

export const getPublicCompose = async (id: string, token: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/preview/compose/${id}?token=${token}`
  )
  if (res.status === 401) throw Object.assign(new Error(), { response: { status: 401 } })
  if (!res.ok) throw new Error("Failed to load public composition")
  return res.json()
}
