import api from "./Axios";

export const submitIntakeStep = async (partialData: any) => {
  return await api.post("/intake", partialData);
};
