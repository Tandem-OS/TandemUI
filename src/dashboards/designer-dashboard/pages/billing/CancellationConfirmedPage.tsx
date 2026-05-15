import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { RiCalendarLine, RiPriceTag3Line, RiQuestionLine, RiShieldCheckLine, RiArrowRightLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updatePlan } from "@/features/authentication/authSlice";

// ─── Confetti dots (same amber palette as Dylan's design) ─────────────────────

const CONFETTI = [
  { color: "#A78BFA", x: -110, y: -55 },
  { color: "#7C3AED", x: -70, y: -90 },
  { color: "#34D399", x: 20,  y: -100 },
  { color: "#F59E0B", x: 90,  y: -70 },
  { color: "#60A5FA", x: 120, y: -20 },
  { color: "#EC4899", x: 100, y: 40 },
  { color: "#A78BFA", x: -90, y: 30 },
  { color: "#F59E0B", x: -30, y: 80 },
];

const ConfettiDots: React.FC = () => (
  <>
    {CONFETTI.map(({ color, x, y }, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-sm"
        style={{
          backgroundColor: color,
          top: `calc(50% + ${y}px)`,
          left: `calc(50% + ${x}px)`,
          opacity: 0.55,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.55 }}
        transition={{ delay: 0.2 + i * 0.05, duration: 0.35, ease: "backOut" }}
      />
    ))}
  </>
);

// ─── Summary row ──────────────────────────────────────────────────────────────

const SummaryRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between py-md border-b border-[#F0EEFF] last:border-0">
    <div className="flex items-center gap-sm">
      <div className="w-8 h-8 rounded-full bg-[#F5F3FF] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-para-sm text-text-secondary">{label}</span>
    </div>
    <span className="text-para-sm font-semibold text-text-primary">{value}</span>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const CancellationConfirmedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Update plan state immediately so Pro badge reverts
  useEffect(() => {
    dispatch(updatePlan('free'));
  }, [dispatch]);

  // Accept downgrade date from navigation state (passed from SubscriptionOverviewPage)
  // or fall back to a formatted period-end from the cancel API response
  const downgradeDate: string =
    (location.state as { downgradeDate?: string })?.downgradeDate ?? "your next billing date";

  return (
    <div className="min-h-screen bg-background-primary flex items-start sm:items-center justify-center px-4 py-xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[480px]"
      >
        {/* Back link */}
        <button
          onClick={() => navigate("/dashboard/designer")}
          className="flex items-center gap-xs text-para-sm text-text-secondary hover:text-text-primary transition-colors mb-lg"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl border border-border-default shadow-sm overflow-hidden">
          {/* Hero — amber checkmark + confetti */}
          <div className="relative flex items-center justify-center py-2xl bg-white">
            <ConfettiDots />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
              className="relative z-10 w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <motion.path
                  d="M6 14l6 6 10-12"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                />
              </svg>
            </motion.div>
          </div>

          {/* Text */}
          <div className="px-xl text-center space-y-sm pb-lg">
            <h1 className="text-h4-sm font-bold text-text-primary">
              You've cancelled Pro
            </h1>
            <p className="text-para-sm text-text-secondary leading-relaxed">
              You'll have access to Pro features until{" "}
              <span className="font-semibold text-text-primary">{downgradeDate}</span>.
              <br />
              After that, you'll move to the Free plan.
            </p>
          </div>

          {/* Summary table */}
          <div className="mx-xl mb-lg rounded-xl border border-[#EDE9FE] bg-[#FAFAFA] px-md">
            <SummaryRow
              icon={<RiCalendarLine className="text-[#7C3AED] text-icon-xs" />}
              label="Downgrade date"
              value={downgradeDate}
            />
            <SummaryRow
              icon={<RiPriceTag3Line className="text-[#7C3AED] text-icon-xs" />}
              label="New plan"
              value="Free"
            />
            <SummaryRow
              icon={<RiQuestionLine className="text-[#7C3AED] text-icon-xs" />}
              label="What happens next"
              value="Limits will reset to Free plan"
            />
          </div>

          {/* CTA */}
          <div className="px-xl pb-lg">
            <motion.button
              onClick={() => navigate("/dashboard/designer")}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-md rounded-xl border-2 border-[#4F3FE8] text-[#4F3FE8] font-semibold text-para-md hover:bg-[#F5F3FF] transition-colors flex items-center justify-center gap-sm"
            >
              Back to Dashboard
              <RiArrowRightLine className="text-icon-sm" />
            </motion.button>
          </div>

          {/* Footer reassurance */}
          <div className="px-xl pb-xl flex flex-col items-center gap-xs text-center">
            <div className="w-8 h-8 rounded-full bg-[#F5F3FF] flex items-center justify-center">
              <RiShieldCheckLine className="text-[#7C3AED] text-icon-sm" />
            </div>
            <p className="text-para-sm font-semibold text-text-primary">
              Your projects and data will always be safe.
            </p>
            <p className="text-para-xs text-text-secondary">
              You can upgrade to Pro anytime.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CancellationConfirmedPage;
