import React, { useState } from "react";
import { RiSparklingLine, RiErrorWarningLine } from "react-icons/ri";
import Modal from "./Modal";
import type { BillingPlan } from "@/lib/requests/BillingRequest";

type BillingUsageType =
  | "swiper_session"
  | "refine"
  | "version_restore"
  | "scraper_run"
  | "intake_update";

interface BillingGateModalProps {
  isOpen: boolean;
  usageType: BillingUsageType;
  currentCount: number;
  limit: number;
  isCheckoutLoading?: boolean;
  checkoutError?: string | null;
  onUpgrade: (plan: BillingPlan) => void;
  onSecondary: () => void;
  onClose: () => void;
}

const PLAN_OPTIONS: { value: BillingPlan; label: string; sublabel: string }[] = [
  { value: "monthly", label: "Monthly", sublabel: "Billed monthly" },
  { value: "annual", label: "Annual", sublabel: "Save 20%" },
];

const BillingGateModal: React.FC<BillingGateModalProps> = ({
  isOpen,
  usageType,
  limit,
  isCheckoutLoading = false,
  checkoutError = null,
  onUpgrade,
  onSecondary,
  onClose,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan>("monthly");

  const getConfig = () => {
    switch (usageType) {
      case "swiper_session":
        return {
          title: "You've reached your swipe limit",
          message: `You've used all ${limit} free swipe sessions. Upgrade to Pro to unlock unlimited swiping and deliver the best result to your client.`,
          primaryLabel: "Upgrade to Pro",
          secondaryLabel: "Continue to Compose",
        };
      case "refine":
        return {
          title: "You've reached your refinement limit",
          message: `You've used all ${limit} free refinements. Upgrade to Pro to keep refining and deliver the best result to your client.`,
          primaryLabel: "Upgrade to Pro",
          secondaryLabel: "View Current Version",
        };
      case "version_restore":
        return {
          title: "You've reached your restore limit",
          message: `You've used all ${limit} free version restores. Upgrade to Pro for unlimited version history.`,
          primaryLabel: "Upgrade to Pro",
          secondaryLabel: "Keep Current Version",
        };
      case "scraper_run":
        return {
          title: "You've reached your scraper limit",
          message: `You've used all ${limit} free scraper runs. Upgrade to Pro for unlimited site scraping.`,
          primaryLabel: "Upgrade to Pro",
          secondaryLabel: "Continue Without Scraping",
        };
      case "intake_update":
        return {
          title: "You've reached your intake edit limit",
          message: `You've used all ${limit} free intake edits. Upgrade to Pro for unlimited intake updates.`,
          primaryLabel: "Upgrade to Pro",
          secondaryLabel: "Keep Current Intake",
        };
      default:
        return {
          title: "Upgrade Required",
          message: "You've reached your usage limit.",
          primaryLabel: "Upgrade to Pro",
          secondaryLabel: "Close",
        };
    }
  };

  const config = getConfig();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={config.title}
      size="md"
      footer={
        <div className="flex flex-col gap-sm w-full">
          {checkoutError && (
            <div className="flex items-center gap-xs text-text-error text-para-sm">
              <RiErrorWarningLine className="shrink-0" />
              <span>{checkoutError}</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-end gap-sm">
            <button
              onClick={onSecondary}
              disabled={isCheckoutLoading}
              className="px-md py-sm rounded-lg border border-border-default text-text-secondary hover:bg-background-muted transition disabled:opacity-50"
            >
              {config.secondaryLabel}
            </button>
            <button
              onClick={() => onUpgrade(selectedPlan)}
              disabled={isCheckoutLoading}
              className="px-md py-sm rounded-lg bg-primary text-white hover:opacity-90 transition disabled:opacity-60 flex items-center gap-xs justify-center min-w-[140px]"
            >
              {isCheckoutLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Redirecting…</span>
                </>
              ) : (
                <>
                  <RiSparklingLine />
                  <span>{config.primaryLabel}</span>
                </>
              )}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-md">
        <p className="text-text-primary text-body-md">{config.message}</p>
        <div>
          <p className="text-para-sm text-text-secondary mb-sm">Choose your plan</p>
          <div className="grid grid-cols-2 gap-sm">
            {PLAN_OPTIONS.map((plan) => (
              <button
                key={plan.value}
                onClick={() => setSelectedPlan(plan.value)}
                className={`flex flex-col items-start px-md py-sm rounded-lg border transition ${
                  selectedPlan === plan.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border-default text-text-secondary hover:border-primary/50"
                }`}
              >
                <span className="text-para-md font-medium">{plan.label}</span>
                <span className="text-para-sm opacity-70">{plan.sublabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BillingGateModal;