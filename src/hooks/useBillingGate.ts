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

export const useBillingGate = () => {
  const [gateState, setGateState] = useState<BillingGateState | null>(null);

  const handleBillingError = (error: any): boolean => {
    const responseData = error?.response?.data;

    if (
      error?.response?.status === 403 &&
      responseData?.code === "USAGE_LIMIT_REACHED" &&
      responseData?.upgrade_required === true
    ) {
      setGateState(responseData);
      return true;
    }

    return false;
  };

  const dismissGate = () => {
    setGateState(null);
  };

  const isWarning =
    gateState !== null &&
    gateState.current_count === gateState.limit - 1;

  return {
    gateState,
    isWarning,
    handleBillingError,
    dismissGate,
  };
};