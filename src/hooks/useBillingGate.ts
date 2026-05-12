import { useState } from "react";

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

  const handleBillingError = (error: any): boolean => {
    const responseData = error?.response?.data;

    if (
      error?.response?.status === 403 &&
      responseData?.code === "USAGE_LIMIT_REACHED" &&
      responseData?.upgrade_required === true
    ) {
      setGateState(responseData);
      setWarningState(null); // clear warning when hard gate hits
      return true;
    }

    return false;
  };

  // Call this after every successful API response that includes usage data
  const handleUsageUpdate = (data: {
    usage_type: BillingUsageType;
    current_count: number;
    limit: number;
  }) => {
    const remaining = data.limit - data.current_count;
    if (remaining <= 2 && remaining > 0) {
      setWarningState({ ...data, remaining });
    } else {
      setWarningState(null);
    }
  };

  const dismissGate = () => setGateState(null);
  const dismissWarning = () => setWarningState(null);

  return {
    gateState,
    warningState,
    handleBillingError,
    handleUsageUpdate,
    dismissGate,
    dismissWarning,
  };
};