import api from "@/lib/requests/Axios";
const AI_PREFIX = 'ai'

interface EnsureValies {
  project_id: string;
}

export const ensureEmbeddings = async (values: EnsureValies) => {
  return await api.post(`/${AI_PREFIX}/embeddings/ensure`, values);
};
