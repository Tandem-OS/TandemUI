import React from "react";
import { RiSparklingLine } from "react-icons/ri";
import { clsx } from "clsx";
import type { BillingUsageType } from "@/hooks/useBillingGate";

interface UsageCounterProps {
    usageType: BillingUsageType;
    currentCount: number;
    limit: number;
    className?: string;
    /** compact = single line pill, default = shows label + progress bar */
    variant?: "compact" | "default";
}

const USAGE_LABELS: Record<BillingUsageType, string> = {
    swiper_session: "Swipe sessions",
    refine: "Refinements",
    version_restore: "Version restores",
    scraper_run: "Scraper runs",
    intake_update: "Intake edits",
};

const UsageCounter: React.FC<UsageCounterProps> = ({
    usageType,
    currentCount,
    limit,
    className,
    variant = "default",
}) => {
    const remaining = limit - currentCount;
    const isAtLimit = remaining <= 0;
    const isWarning = remaining <= 1 && remaining > 0;
    const percentage = Math.min((currentCount / limit) * 100, 100);

    const colorClass = isAtLimit
        ? "text-text-error"
        : isWarning
            ? "text-text-warning"
            : "text-text-secondary";

    const barColor = isAtLimit
        ? "bg-text-error"
        : isWarning
            ? "bg-text-warning"
            : "bg-primary";

    if (variant === "compact") {
        return (
            <span
                className={clsx(
                    "inline-flex items-center gap-xs px-sm py-xs rounded-full text-para-xs font-medium border",
                    isAtLimit
                        ? "border-text-error/30 bg-background-error text-text-error"
                        : isWarning
                            ? "border-text-warning/30 bg-background-warning text-text-warning"
                            : "border-border-default bg-background-muted text-text-secondary",
                    className
                )}
            >
                <RiSparklingLine className="shrink-0" />
                {isAtLimit
                    ? `${USAGE_LABELS[usageType]} limit reached`
                    : `${remaining} of ${limit} ${USAGE_LABELS[usageType].toLowerCase()} left`}
            </span>
        );
    }

    return (
        <div className={clsx("space-y-xs", className)}>
            <div className="flex items-center justify-between">
                <span className="text-para-xs text-text-tertiary">
                    {USAGE_LABELS[usageType]}
                </span>
                <span className={clsx("text-para-xs font-medium", colorClass)}>
                    {isAtLimit ? "Limit reached" : `${remaining} left`}
                </span>
            </div>
            <div className="h-1 w-full rounded-full bg-background-muted overflow-hidden">
                <div
                    className={clsx("h-full rounded-full transition-all", barColor)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default UsageCounter;