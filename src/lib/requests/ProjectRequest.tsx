import api from "@/lib/requests/Axios";
import { store } from "@/store";
interface ProjectCreationValues {
  designer_email: string;
  client_email: string;
  project_name: string;
  logo: string;
  project_type: string;
  business_description: string;
  budget: string;
  not_ready_to_share: boolean;
  notes: string;
}

interface ProjectGetClientEmail {
  client_email: string;
}

export const createProject = async (values: ProjectCreationValues) => {
  return await api.post("/projects", values);
};

export const getProjectByClientEmail = async (value: ProjectGetClientEmail) => {
  return await api.post("/projects/client_email", value);
};

export const getAllProjectsByDesignerEmail = async () => {
  const designer_email = store.getState().auth.user.email!;
  return await api.post("/projects/designer_email", { designer_email });
};
