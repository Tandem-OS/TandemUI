import { useState } from "react";
import { createCheckoutSession } from "@/lib/requests/BillingRequest";
import type { BillingPlan } from "@/lib/requests/BillingRequest";

export type BillingUsageType =
  | "swiper_session"
  | "refine"
  | "version_restore"
  | "scraper_run"
  | "intake_update";

export interface BillingGateState {
  code: "USAGE_LIMIT_REACHED";
  usage_type: BillingUsageType;
  current_count: number;
  limit: number;
  upgrade_required: boolean;
}

export interface BillingWarningState {
  usage_type: BillingUsageType;
  current_count: number;
  limit: number;
  remaining: number;
}

export const useBillingGate = () => {
  const [gateState, setGateState] = useState<BillingGateState | null>(null);
  const [warningState, setWarningState] = useState<BillingWarningState | null>(null);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleBillingError = (error: any): boolean => {
    const responseData = error?.response?.data;

    if (
      error?.response?.status === 403 &&
      responseData?.code === "USAGE_LIMIT_REACHED" &&
      responseData?.upgrade_required === true
    ) {
      setGateState(responseData);
      setWarningState(null);
      return true;
    }

    return false;
  };

  const handleUsageUpdate = (data: {
    usage_type: BillingUsageType;
    current_count: number;
    limit: number;
  }) => {
    const remaining = data.limit - data.current_count;
    if (remaining <= 1 && remaining > 0) {
      setWarningState({ ...data, remaining });
    } else {
      setWarningState(null);
    }
  };

  const initiateCheckout = async (plan: BillingPlan = "monthly") => {
    setIsCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const checkoutUrl = await createCheckoutSession(plan);
      window.location.href = checkoutUrl;
    } catch (err: any) {
      setCheckoutError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setIsCheckoutLoading(false);
    }
  };

  const dismissGate = () => {
    setGateState(null);
    setCheckoutError(null);
  };

  const dismissWarning = () => setWarningState(null);

  return {
    gateState,
    warningState,
    isCheckoutLoading,
    checkoutError,
    handleBillingError,
    handleUsageUpdate,
    initiateCheckout,
    dismissGate,
    dismissWarning,
  };
};