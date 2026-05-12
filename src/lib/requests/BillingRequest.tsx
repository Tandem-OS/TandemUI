import api from "@/lib/requests/Axios";

export type BillingPlan = "monthly" | "annual";

export const createCheckoutSession = async (
  plan: BillingPlan = "monthly"
): Promise<string> => {
  const response = await api.post<string>(
    `/stripe/create-checkout-session?plan=${plan}`
  );
  return response.data;
};