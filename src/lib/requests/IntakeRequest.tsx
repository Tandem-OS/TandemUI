import api from "@/lib/requests/Axios";
import { store } from "@/store";


interface IntakeGetClientEmail {
  client_email: string;
}

export const submitIntakeStep = async (partialData: any) => {
  const projectId = store.getState().project.projectId;

  const payload = {
    ...partialData,
    project_id: projectId
  };
  return await api.post("/intake", payload);
};

export const getIntakeByClientEmail = async (value: IntakeGetClientEmail) => {
  return await api.post("/intake/client_email", value);
};
