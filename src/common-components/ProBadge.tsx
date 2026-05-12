import React from "react";
import { RiSparklingLine } from "react-icons/ri";
import { clsx } from "clsx";

interface ProBadgeProps {
  className?: string;
  /** sm = icon only, md = icon + text (default) */
  size?: "sm" | "md";
}

const ProBadge: React.FC<ProBadgeProps> = ({ className, size = "md" }) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-xs rounded-full font-medium",
        "bg-primary text-white",
        size === "sm"
          ? "px-xs py-xs text-para-xs"
          : "px-sm py-xs text-para-xs",
        className
      )}
      aria-label="Pro plan"
    >
      <RiSparklingLine className="shrink-0 text-para-xs" />
      {size === "md" && <span>Pro</span>}
    </span>
  );
};

export default ProBadge;