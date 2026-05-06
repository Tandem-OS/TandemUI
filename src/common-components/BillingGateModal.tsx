import React from "react";
import Modal from "./Modal";

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
    onUpgrade: () => void;
    onSecondary: () => void;
    onClose: () => void;
}

const BillingGateModal: React.FC<BillingGateModalProps> = ({
    isOpen,
    usageType,
    limit,
    onUpgrade,
    onSecondary,
    onClose,
}) => {
    const getConfig = () => {
        switch (usageType) {
            case "swiper_session":
                return {
                    title: "Upgrade Required",
                    message:
                        `You've used all ${limit} free swipe sessions. Upgrade to Pro to unlock unlimited swiping and deliver the best result to your client.`,
                    primaryLabel: "Upgrade to Pro",
                    secondaryLabel: "Continue to Compose",
                };

            case "refine":
                return {
                    title: "Upgrade Required",
                    message:
                        `You've used all ${limit} free refinements. Upgrade to Pro to keep refining and deliver the best result to your client.`,
                    primaryLabel: "Upgrade to Pro",
                    secondaryLabel: "View Current Version",
                };

            case "version_restore":
                return {
                    title: "Upgrade Required",
                    message:
                        `You've used all ${limit} free version restores. Upgrade to Pro for unlimited version history.`,
                    primaryLabel: "Upgrade to Pro",
                    secondaryLabel: "Keep Current Version",
                };

            case "scraper_run":
                return {
                    title: "Upgrade Required",
                    message:
                        `You've used all ${limit} free scraper runs. Upgrade to Pro for unlimited site scraping.`,
                    primaryLabel: "Upgrade to Pro",
                    secondaryLabel: "Continue Without Scraping",
                };

            case "intake_update":
                return {
                    title: "Upgrade Required",
                    message:
                        `You've used all ${limit} free intake edits. Upgrade to Pro for unlimited intake updates.`,
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
                <div className="flex flex-col sm:flex-row justify-end gap-sm">
                    <button
                        onClick={onSecondary}
                        className="px-md py-sm rounded-lg border border-border-default text-text-secondary hover:bg-background-muted transition"
                    >
                        {config.secondaryLabel}
                    </button>

                    <button
                        onClick={onUpgrade}
                        className="px-md py-sm rounded-lg bg-primary text-white hover:opacity-90 transition"
                    >
                        {config.primaryLabel}
                    </button>
                </div>
            }
        >
            <div className="text-text-primary text-body-md">
                {config.message}
            </div>
        </Modal>
    );
};

export default BillingGateModal;