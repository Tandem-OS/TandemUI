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

export const createPortalSession = async (): Promise<{ url: string }> => {
  const response = await api.post<{ url: string }>(
    "/stripe/create-portal-session"
  );
  return response.data;
};

export const cancelSubscription = async (): Promise<{
  success: boolean;
  cancel_at: number;
  current_period_end: number;
}> => {
  const response = await api.post<{
    success: boolean;
    cancel_at: number;
    current_period_end: number;
  }>("/stripe/cancel-subscription");
  return response.data;
};