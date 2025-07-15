import api from "@/lib/requests/Axios";

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

export const createProject = async (values: ProjectCreationValues) => {
  return await api.post("/projects", values);
};