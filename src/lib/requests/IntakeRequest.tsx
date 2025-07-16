import api from "@/lib/requests/Axios";

interface IntakeGetClientEmail {
  client_email: string;
}

export const submitIntakeStep = async (partialData: any) => {
  return await api.post("/intake", partialData);
};

export const getIntakeByClientEmail = async (value: IntakeGetClientEmail) => {
  return await api.post("/intake/client_email", value);
};
