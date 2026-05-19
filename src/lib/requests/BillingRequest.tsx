import api from "@/lib/requests/Axios";

export type BillingPlan = "monthly" | "annual";

// ─── Checkout ─────────────────────────────────────────────────────────────────

export const createCheckoutSession = async (
  plan: BillingPlan = "monthly"
): Promise<string> => {
  const response = await api.post<{ url: string }>(
    `/stripe/create-checkout-session?plan=${plan}`
  );
  return response.data.url; // ← extract .url
};

// ─── Portal ───────────────────────────────────────────────────────────────────

export const createPortalSession = async (): Promise<{ url: string }> => {
  const response = await api.post<{ url: string }>(
    "/stripe/create-portal-session"
  );
  return response.data;
};

// ─── Subscription (GET) ───────────────────────────────────────────────────────

export interface SubscriptionResponse {
  plan: string;
  status: string;
  cancel_at_period_end: boolean;
  price: number;
  currency: string;
  billing_cycle: "month" | "year";
  next_renewal_date: number;
  cancel_at: number | null;
  payment_method: {
    brand: string;
    last4: string;
  } | null;
}

export const getSubscription = async (): Promise<SubscriptionResponse> => {
  const response = await api.get<SubscriptionResponse>("/stripe/subscription");
  return response.data;
};

// ─── Cancel ───────────────────────────────────────────────────────────────────

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

// ─── Payment Method (GET) ─────────────────────────────────────────────────────

export interface PaymentMethodResponse {
  brand: string | null;
  last4: string | null;
  exp_month: number | null;
  exp_year: number | null;
}

export const getPaymentMethod = async (): Promise<PaymentMethodResponse> => {
  const response = await api.get<PaymentMethodResponse>(
    "/stripe/payment-method"
  );
  return response.data;
};

// ─── Invoices (GET) ───────────────────────────────────────────────────────────

export interface InvoiceItem {
  id: string;
  date: number;
  description: string;
  amount: number;
  currency: string;
  status: "paid" | "open" | "void" | "uncollectible";
  pdf_url: string | null;
  hosted_invoice_url: string | null;
}

export const getInvoices = async (): Promise<InvoiceItem[]> => {
  const response = await api.get<InvoiceItem[]>("/stripe/invoices");
  return response.data;
};

// ─── Billing History (GET) ────────────────────────────────────────────────────

export interface BillingHistoryItem {
  id: string;
  date: number;
  type: "Subscription" | "Refund";
  amount: number;
  currency: string;
  status: "succeeded" | "failed" | "pending";
}

export const getBillingHistory = async (): Promise<BillingHistoryItem[]> => {
  const response = await api.get<BillingHistoryItem[]>(
    "/stripe/billing-history"
  );
  return response.data;
};