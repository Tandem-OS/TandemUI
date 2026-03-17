import api from "@/lib/requests/Axios"

export const validateToken = async (compositionId: string, token: string) => {
    const response = await api.get(`/preview/validate?composition_id=${compositionId}&token=${token}`)
    return response.data;
  
};
