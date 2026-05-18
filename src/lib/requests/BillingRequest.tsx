import api from "@/lib/requests/Axios";

export type BillingPlan = "monthly" | "annual";

// ─── Checkout ─────────────────────────────────────────────────────────────────

export const createCheckoutSession = async (
  plan: BillingPlan = "monthly"
): Promise<string> => {
  const response = await api.post<string>(
    `/stripe/create-checkout-session?plan=${plan}`
  );
  return response.data;
};

// ─── Portal 

export const createPortalSession = async (): Promise<{ url: string }> => {
  const response = await api.post<{ url: string }>(
    "/stripe/create-portal-session"
  );
  return response.data;
};

// ─── Subscription (GET) 

export interface SubscriptionResponse {
  plan: string;
  status: string;
  cancel_at_period_end: boolean;
  price: number;           // in cents — divide by 100 for display
  currency: string;
  billing_cycle: 'month' | 'year';
  next_renewal_date: number;   // Unix timestamp
  cancel_at: number | null;    // Unix timestamp, set if cancellation scheduled
  payment_method: {
    brand: string;
    last4: string;
  } | null;
}

export const getSubscription = async (): Promise<SubscriptionResponse> => {
  const response = await api.get<SubscriptionResponse>("/stripe/subscription");
  return response.data;
};

// ─── Cancel 

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