import React from "react";
import { motion } from "framer-motion";
import { RiRefreshLine, RiArrowLeftLine, RiWifiOffLine, RiErrorWarningLine, RiTimeLine } from "react-icons/ri";

export type ErrorVariant =
  | "generic"
  | "network"
  | "not_found"
  | "expired"
  | "scrape_failed"
  | "scrape_empty"
  | "compose_failed"
  | "refine_failed"
  | "restore_failed"
  | "lambda_timeout"
  | "session_expired"
  | "projects_failed";

export interface ErrorStateProps {
  variant?: ErrorVariant;
  /** Override the default title */
  title?: string;
  /** Override the default message */
  message?: string;
  /** Primary recovery action label */
  actionLabel?: string;
  /** Primary recovery action handler */
  onAction?: () => void;
  /** Optional secondary action label (e.g. "Go back") */
  secondaryLabel?: string;
  /** Optional secondary action handler */
  onSecondary?: () => void;
  className?: string;
}

interface ErrorConfig {
  icon: React.ReactNode;
  title: string;
  message: string;
  actionLabel: string;
}

const CONFIGS: Record<ErrorVariant, ErrorConfig> = {
  generic: {
    icon: <RiErrorWarningLine className="text-icon-2xl text-text-error" />,
    title: "Something went wrong",
    message: "An unexpected error occurred. Try again or come back shortly.",
    actionLabel: "Try again",
  },
  network: {
    icon: <RiWifiOffLine className="text-icon-2xl text-text-error" />,
    title: "Connection issue",
    message: "We couldn't reach the server. Check your connection and try again.",
    actionLabel: "Retry",
  },
  not_found: {
    icon: <RiErrorWarningLine className="text-icon-2xl text-text-secondary" />,
    title: "Page not found",
    message: "This page doesn't exist or may have been moved.",
    actionLabel: "Go home",
  },
  expired: {
    icon: <RiTimeLine className="text-icon-2xl text-text-warning" />,
    title: "Link expired",
    message: "This preview link has expired. Ask your designer to send a new one.",
    actionLabel: "Request new link",
  },
  scrape_failed: {
    icon: <RiWifiOffLine className="text-icon-2xl text-text-error" />,
    title: "Couldn't scan that site",
    message: "We weren't able to read the website you entered. Try a different URL or paste the homepage link directly.",
    actionLabel: "Try a different URL",
  },
  scrape_empty: {
    icon: <RiErrorWarningLine className="text-icon-2xl text-text-warning" />,
    title: "Nothing found on that page",
    message: "We scanned the site but couldn't find any usable sections. Try the homepage or a different page.",
    actionLabel: "Try again",
  },
  compose_failed: {
    icon: <RiErrorWarningLine className="text-icon-2xl text-text-error" />,
    title: "Couldn't build your page",
    message: "Something went wrong while generating your layout. Try again — your selections are saved.",
    actionLabel: "Try again",
  },
  refine_failed: {
    icon: <RiErrorWarningLine className="text-icon-2xl text-text-error" />,
    title: "Refinement didn't go through",
    message: "We couldn't apply your changes this time. Your current version is still intact.",
    actionLabel: "Try again",
  },
  restore_failed: {
    icon: <RiErrorWarningLine className="text-icon-2xl text-text-error" />,
    title: "Couldn't restore that version",
    message: "Something went wrong restoring this version. Your current version is unchanged.",
    actionLabel: "Try again",
  },
  lambda_timeout: {
    icon: <RiTimeLine className="text-icon-2xl text-text-warning" />,
    title: "This is taking longer than usual",
    message: "The AI is still working on it. Wait a moment and try again — nothing has been lost.",
    actionLabel: "Try again",
  },
  session_expired: {
    icon: <RiTimeLine className="text-icon-2xl text-text-warning" />,
    title: "Your session expired",
    message: "You've been logged out due to inactivity. Sign in again to continue.",
    actionLabel: "Sign in",
  },
  projects_failed: {
    icon: <RiWifiOffLine className="text-icon-2xl text-text-error" />,
    title: "Couldn't load your projects",
    message: "We had trouble fetching your projects. Check your connection and try again.",
    actionLabel: "Retry",
  },
};

const ErrorState: React.FC<ErrorStateProps> = ({
  variant = "generic",
  title,
  message,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  className,
}) => {
  const config = CONFIGS[variant];
  const resolvedTitle = title ?? config.title;
  const resolvedMessage = message ?? config.message;
  const resolvedActionLabel = actionLabel ?? config.actionLabel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center text-center px-lg py-2xl space-y-md ${className ?? ""}`}
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-background-muted flex items-center justify-center">
        {config.icon}
      </div>

      {/* Copy */}
      <div className="space-y-xs max-w-sm">
        <h3 className="text-h5-sm font-semibold text-text-primary">{resolvedTitle}</h3>
        <p className="text-para-sm text-text-secondary leading-relaxed">{resolvedMessage}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-sm pt-xs">
        {onAction && (
          <motion.button
            onClick={onAction}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-xs px-lg py-sm rounded-lg bg-primary text-white text-para-sm font-medium hover:opacity-90 transition"
          >
            <RiRefreshLine className="shrink-0" />
            {resolvedActionLabel}
          </motion.button>
        )}
        {onSecondary && secondaryLabel && (
          <motion.button
            onClick={onSecondary}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-xs px-lg py-sm rounded-lg border border-border-default text-text-secondary text-para-sm hover:bg-background-muted transition"
          >
            <RiArrowLeftLine className="shrink-0" />
            {secondaryLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorState;
