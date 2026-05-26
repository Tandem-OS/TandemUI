import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightLine, RiMailLine, RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UpgradeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Passed from Stripe session / subscription data if available */
  plan?: string;
  amount?: string;
  nextBillingDate?: string;
  paymentMethodBrand?: string;
  paymentMethodLast4?: string;
  userEmail?: string;
}

// ─── Confetti dot ─────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  "#7C3AED", "#A78BFA", "#34D399", "#F59E0B",
  "#EC4899", "#60A5FA", "#10B981", "#F472B6",
];

const ConfettiDots: React.FC = () => (
  <>
    {CONFETTI_COLORS.map((color, i) => {
      const angle = (i / CONFETTI_COLORS.length) * 360;
      const radius = 90 + (i % 3) * 28;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius * 0.6;
      return (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: color,
            top: `calc(50% + ${y}px)`,
            left: `calc(50% + ${x}px)`,
            opacity: 0.7,
            transform: `rotate(${angle * 0.6}deg)`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: "backOut" }}
        />
      );
    })}
  </>
);

// ─── Summary row ──────────────────────────────────────────────────────────────

const SummaryRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex items-center justify-between py-sm border-b border-[#F0EEFF] last:border-0">
    <span className="text-para-sm text-text-secondary">{label}</span>
    <span className="text-para-sm font-medium text-text-primary">{value}</span>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const UpgradeSuccessModal: React.FC<UpgradeSuccessModalProps> = ({
  isOpen,
  onClose,
  plan = "Pro Plan",
  amount = "$49.99 / mo",
  nextBillingDate,
  paymentMethodBrand,
  paymentMethodLast4,
  userEmail,
}) => {
  const navigate = useNavigate();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // Auto-close safety: clean URL even if user closes via backdrop
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const handleGoToDashboard = () => {
    onClose();
    navigate("/dashboard/designer");
  };

  const handleViewSubscription = () => {
    onClose();
    navigate("/dashboard/designer/billing");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="success-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="success-modal"
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[70] flex items-start sm:items-center justify-center px-4 pt-4 sm:pt-0 pb-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-y-auto max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-md right-md z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F3FF] text-[#7C3AED] hover:bg-[#EDE9FE] transition-colors"
              >
                <RiCloseLine className="text-icon-sm" />
              </button>

              {/* Header — logo + Pro badge */}
              <div className="flex items-center gap-sm px-lg pt-lg pb-xs">
                {/* Tandem wordmark */}
                <span className="text-para-lg font-bold text-text-primary tracking-tight">
                  Tandem
                </span>
                <span className="px-sm py-xs bg-[#EDE9FE] text-[#7C3AED] text-para-xs font-semibold rounded-full border border-[#C4B5FD]">
                  Pro
                </span>
              </div>

              {/* Hero — checkmark + confetti */}
              <div className="relative flex items-center justify-center py-xl">
                <ConfettiDots />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
                  className="relative z-10 w-16 h-16 rounded-full bg-[#4F3FE8] flex items-center justify-center shadow-lg"
                >
                  <motion.svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                  >
                    <motion.path
                      d="M6 14l6 6 10-12"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                    />
                  </motion.svg>
                </motion.div>
              </div>

              {/* Title */}
              <div className="px-lg text-center space-y-xs pb-md">
                <h2 className="text-h4-sm font-bold text-text-primary">
                  You're in! 🎉
                </h2>
                <p className="text-para-md font-semibold text-text-primary">
                  Welcome to TandemOS Pro.
                </p>
                <p className="text-para-sm text-text-secondary leading-relaxed">
                  Your subscription is active and your account has been upgraded.
                </p>
              </div>

              {/* Summary table */}
              <div className="mx-lg mb-md rounded-xl border border-[#EDE9FE] bg-[#FAFAFA] px-md py-xs">
                <SummaryRow label="Plan" value={plan} />
                <SummaryRow label="Amount" value={amount} />
                {nextBillingDate && (
                  <SummaryRow label="Next billing date" value={nextBillingDate} />
                )}
                {paymentMethodBrand && paymentMethodLast4 && (
                  <SummaryRow
                    label="Payment method"
                    value={
                      <span className="flex items-center gap-xs">
                        <span className="font-bold text-[#1A1F71]">{paymentMethodBrand.toUpperCase()}</span>
                        <span className="text-text-secondary">···· {paymentMethodLast4}</span>
                      </span>
                    }
                  />
                )}
              </div>

              {/* CTAs */}
              <div className="px-lg pb-md space-y-sm">
                <motion.button
                  onClick={handleGoToDashboard}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-md rounded-xl bg-[#4F3FE8] hover:bg-[#3D2FD6] text-white font-semibold text-para-md transition-colors flex items-center justify-center gap-sm"
                >
                  Go to Dashboard
                  <RiArrowRightLine className="text-icon-sm" />
                </motion.button>
                <button
                  onClick={handleViewSubscription}
                  className="w-full py-md rounded-xl border border-[#C4B5FD] text-[#4F3FE8] font-semibold text-para-md hover:bg-[#F5F3FF] transition-colors"
                >
                  View Subscription
                </button>
              </div>

              {/* Receipt notice */}
              {userEmail && (
                <div className="px-lg pb-lg flex items-center justify-center gap-xs text-text-muted text-para-xs">
                  <RiMailLine className="text-[12px] flex-shrink-0" />
                  <span>A receipt has been sent to {userEmail}</span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UpgradeSuccessModal;
