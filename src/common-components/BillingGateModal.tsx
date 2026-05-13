import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiShieldCheckLine, RiLockLine } from "react-icons/ri";
import type { BillingPlan } from "@/lib/requests/BillingRequest";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  /** Designer = Upgrade to Pro CTA. Client = Contact Designer CTA. */
  userRole?: "designer" | "client";
  isCheckoutLoading?: boolean;
  checkoutError?: string | null;
  onUpgrade: (plan: BillingPlan) => void;
  onSecondary: () => void;
  onClose: () => void;
  /** Designer email for mailto link (client variant only) */
  designerEmail?: string | null;
  /** Days until usage resets */
  resetsInDays?: number | null;
}

// ─── Gate config ──────────────────────────────────────────────────────────────

interface GateConfig {
  gateLabel: string;
  illustration: React.ReactNode;
  title: string;
  body: string;
  usageLabel: string;
  bullets: { icon: React.ReactNode; title: string; subtitle: string }[];
  primaryLabel: string;
  secondaryLabel: string;
  // Client-side overrides
  clientTitle: string;
  clientBody: string;
  clientPrimaryLabel: string;
}

// ─── Inline SVG illustrations (purple/lavender, matches Dylan's style) ────────

const SwiperIllustration = () => (
  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="55" height="65" rx="8" fill="#EDE9FE" />
    <rect x="35" y="12" width="55" height="65" rx="8" fill="#DDD6FE" />
    <rect x="50" y="4" width="55" height="65" rx="8" fill="#C4B5FD" />
    <circle cx="77" cy="36" r="12" fill="#7C3AED" opacity="0.9" />
    <path d="M71 36l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="28" cy="12" r="4" fill="#A78BFA" opacity="0.6" />
    <circle cx="100" cy="8" r="3" fill="#C4B5FD" opacity="0.5" />
    <path d="M106 70l6 6M106 76l6-6" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const ScraperIllustration = () => (
  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="65" height="52" rx="8" fill="#EDE9FE" />
    <rect x="15" y="15" width="65" height="14" rx="8" fill="#DDD6FE" />
    <circle cx="24" cy="22" r="3" fill="#A78BFA" />
    <circle cx="33" cy="22" r="3" fill="#C4B5FD" />
    <circle cx="42" cy="22" r="3" fill="#EDE9FE" />
    <rect x="22" y="38" width="40" height="4" rx="2" fill="#DDD6FE" />
    <rect x="22" y="48" width="30" height="4" rx="2" fill="#EDE9FE" />
    <circle cx="85" cy="68" r="20" fill="none" stroke="#C4B5FD" strokeWidth="3" />
    <circle cx="85" cy="68" r="13" fill="#EDE9FE" />
    <circle cx="85" cy="68" r="7" fill="#7C3AED" opacity="0.8" />
    <line x1="99" y1="82" x2="108" y2="91" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" />
    <circle cx="28" cy="8" r="3" fill="#A78BFA" opacity="0.5" />
    <circle cx="105" cy="20" r="4" fill="#C4B5FD" opacity="0.4" />
  </svg>
);

const RefineIllustration = () => (
  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="25" width="55" height="65" rx="8" fill="#EDE9FE" />
    <rect x="35" y="15" width="55" height="65" rx="8" fill="#DDD6FE" />
    <rect x="42" y="22" width="35" height="4" rx="2" fill="#C4B5FD" />
    <rect x="42" y="31" width="28" height="3" rx="1.5" fill="#DDD6FE" />
    <rect x="42" y="39" width="32" height="3" rx="1.5" fill="#DDD6FE" />
    <circle cx="85" cy="28" r="10" fill="#7C3AED" opacity="0.9" />
    <path d="M81 28l2.5 2.5 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="25" cy="10" r="4" fill="#A78BFA" opacity="0.5" />
    <path d="M100 75l5 5M100 80l5-5" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const RestoreIllustration = () => (
  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="22" width="48" height="56" rx="6" fill="#EDE9FE" />
    <rect x="28" y="14" width="48" height="56" rx="6" fill="#DDD6FE" />
    <rect x="38" y="6" width="48" height="56" rx="6" fill="#C4B5FD" />
    <circle cx="62" cy="34" r="14" fill="#7C3AED" opacity="0.9" />
    <path d="M56 34a6 6 0 1 1 6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M56 30v4h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="22" cy="10" r="4" fill="#A78BFA" opacity="0.5" />
    <circle cx="100" cy="14" r="3" fill="#C4B5FD" opacity="0.4" />
    <path d="M104 72l5 5M104 77l5-5" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const IntakeIllustration = () => (
  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="10" width="60" height="75" rx="8" fill="#EDE9FE" />
    <rect x="38" y="22" width="36" height="4" rx="2" fill="#C4B5FD" />
    <rect x="38" y="32" width="28" height="3" rx="1.5" fill="#DDD6FE" />
    <rect x="38" y="40" width="32" height="3" rx="1.5" fill="#DDD6FE" />
    <rect x="38" y="48" width="24" height="3" rx="1.5" fill="#DDD6FE" />
    <rect x="38" y="58" width="36" height="12" rx="4" fill="#DDD6FE" />
    <path d="M80 6l6 6-20 20-8 2 2-8 20-20z" fill="#7C3AED" opacity="0.9" />
    <circle cx="22" cy="8" r="3" fill="#A78BFA" opacity="0.5" />
    <circle cx="104" cy="18" r="4" fill="#C4B5FD" opacity="0.4" />
  </svg>
);

// ─── Icon components for bullets ─────────────────────────────────────────────

const InfinityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 8c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3S2 9.657 2 8zm6 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" stroke="#7C3AED" strokeWidth="1.5" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2L3 4.5v4c0 2.5 2.1 4.8 5 5.5 2.9-.7 5-3 5-5.5v-4L8 2z" stroke="#7C3AED" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v3M8 11v3M2 8h3M11 8h3M4.05 4.05l2.12 2.12M9.83 9.83l2.12 2.12M4.05 11.95l2.12-2.12M9.83 6.17l2.12-2.12" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LayersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2L2 5l6 3 6-3-6-3zM2 8l6 3 6-3M2 11l6 3 6-3" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="9" width="3" height="5" rx="1" fill="#7C3AED" />
    <rect x="6.5" y="6" width="3" height="8" rx="1" fill="#7C3AED" />
    <rect x="11" y="3" width="3" height="11" rx="1" fill="#7C3AED" />
  </svg>
);

const TargetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="#7C3AED" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="3" stroke="#7C3AED" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="1" fill="#7C3AED" />
  </svg>
);

// ─── Gate configs ─────────────────────────────────────────────────────────────

const GATE_CONFIGS: Record<BillingUsageType, GateConfig> = {
  swiper_session: {
    gateLabel: "Swiper Gate",
    illustration: <SwiperIllustration />,
    title: "Unlock more taste training",
    body: "You've reached the free Swiper limit for your plan. Upgrade to keep building your palate.",
    usageLabel: "Swipes used",
    bullets: [
      { icon: <InfinityIcon />, title: "Unlimited swipes", subtitle: "Keep training without interruption." },
      { icon: <TargetIcon />, title: "Sharpen your palate", subtitle: "Smarter feedback and deeper insights." },
      { icon: <ChartIcon />, title: "Track your progress", subtitle: "See how your taste evolves over time." },
    ],
    primaryLabel: "Upgrade plan",
    secondaryLabel: "Continue to compose",
    clientTitle: "You've reached the swipe limit",
    clientBody: "You've used all your swipe rounds for this project. Ask your designer to upgrade to Pro so you can continue training Tandem on your visual preferences.",
    clientPrimaryLabel: "Contact Designer",
  },
  scraper_run: {
    gateLabel: "Scraper Gate",
    illustration: <ScraperIllustration />,
    title: "Unlock more site inspiration",
    body: "You've reached the Scraper gate limit for your plan. Upgrade to keep discovering design intelligence from any site.",
    usageLabel: "Scrapes used",
    bullets: [
      { icon: <InfinityIcon />, title: "Unlock unlimited scraping", subtitle: "Scrape any website for layouts, components, and insights." },
      { icon: <SparkleIcon />, title: "Deeper design intelligence", subtitle: "Extract content, structure, and visual patterns with AI." },
      { icon: <LayersIcon />, title: "Save & organize effortlessly", subtitle: "Keep everything in one place with Collections & Boards." },
    ],
    primaryLabel: "Upgrade plan",
    secondaryLabel: "Continue without scraping",
    clientTitle: "You've reached the scraper limit",
    clientBody: "You've used all scraper runs for this project. Ask your designer to upgrade to Pro to continue discovering design inspiration.",
    clientPrimaryLabel: "Contact Designer",
  },
  refine: {
    gateLabel: "Refine Gate",
    illustration: <RefineIllustration />,
    title: "Keep your refinement going",
    body: "You've reached the Refine gate limit for your plan. Upgrade to continue improving your work without interruption.",
    usageLabel: "Refines used",
    bullets: [
      { icon: <InfinityIcon />, title: "Unlimited refines", subtitle: "Keep iterating until it's exactly right." },
      { icon: <SparkleIcon />, title: "Higher quality outputs", subtitle: "Get more precise, on-brand results." },
      { icon: <LayersIcon />, title: "Priority processing", subtitle: "Faster refinements, even at peak times." },
    ],
    primaryLabel: "Upgrade plan",
    secondaryLabel: "View current version",
    clientTitle: "You've reached the refinement limit",
    clientBody: "You've used all refinements for this project. Ask your designer to upgrade to Pro so you can continue improving your layout.",
    clientPrimaryLabel: "Contact Designer",
  },
  version_restore: {
    gateLabel: "Version Restore",
    illustration: <RestoreIllustration />,
    title: "Restore with confidence",
    body: "You've reached the version restore limit for your plan. Upgrade to unlock more history and restore with ease.",
    usageLabel: "Restores used",
    bullets: [
      { icon: <InfinityIcon />, title: "More version history", subtitle: "Access a longer timeline to find the right version." },
      { icon: <ShieldIcon />, title: "Restore with confidence", subtitle: "Revert safely with preview and change tracking." },
      { icon: <SparkleIcon />, title: "Stay productive", subtitle: "Undo mistakes and keep your work moving forward." },
    ],
    primaryLabel: "Upgrade to Pro",
    secondaryLabel: "Keep current version",
    clientTitle: "You've reached the restore limit",
    clientBody: "You've used all version restores for this project. Ask your designer to upgrade to Pro to continue accessing version history.",
    clientPrimaryLabel: "Contact Designer",
  },
  intake_update: {
    gateLabel: "Intake Update",
    illustration: <IntakeIllustration />,
    title: "Keep your brief evolving",
    body: "You've reached the Intake Update limit for your plan. Upgrade to keep refining your brief and unlock better results.",
    usageLabel: "Updates used",
    bullets: [
      { icon: <InfinityIcon />, title: "Richer, more accurate briefs", subtitle: "Keep details current to get on-point deliverables." },
      { icon: <SparkleIcon />, title: "Faster iterations", subtitle: "Refine with confidence and reduce back-and-forth." },
      { icon: <LayersIcon />, title: "Stronger project outcomes", subtitle: "Clear briefs lead to better results, every time." },
    ],
    primaryLabel: "Upgrade to keep refining",
    secondaryLabel: "Keep my current brief",
    clientTitle: "You've reached the intake update limit",
    clientBody: "You've used all intake updates for this project. Ask your designer to upgrade to Pro to continue refining the project brief.",
    clientPrimaryLabel: "Contact Designer",
  },
};

// ─── Main component ───────────────────────────────────────────────────────────

const BillingGateModal: React.FC<BillingGateModalProps> = ({
  isOpen,
  usageType,
  currentCount,
  limit,
  userRole = "designer",
  isCheckoutLoading = false,
  checkoutError = null,
  onUpgrade,
  onSecondary,
  onClose,
  designerEmail,
  resetsInDays,
}) => {
  const cfg = GATE_CONFIGS[usageType] ?? GATE_CONFIGS.refine;
  const isClient = userRole === "client";

  const title = isClient ? cfg.clientTitle : cfg.title;
  const body = isClient ? cfg.clientBody : cfg.body;
  const primaryLabel = isClient ? cfg.clientPrimaryLabel : cfg.primaryLabel;

  const handlePrimary = () => {
    if (isClient) {
      const mailto = designerEmail
        ? `mailto:${designerEmail}?subject=Please upgrade to Tandem Pro`
        : `mailto:support@trytandem.io`;
      window.location.href = mailto;
    } else {
      onUpgrade("monthly");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-md py-lg pointer-events-none"
          >
            <div
              className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gate label pill + close */}
              <div className="flex items-center justify-between px-lg pt-lg pb-xs">
                <div className="flex items-center gap-xs px-sm py-xs bg-[#F5F3FF] rounded-full border border-[#EDE9FE]">
                  <SparkleIcon />
                  <span className="text-[#7C3AED] text-para-xs font-medium">{cfg.gateLabel}</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F3FF] text-[#7C3AED] hover:bg-[#EDE9FE] transition-colors"
                >
                  <RiCloseLine className="text-icon-sm" />
                </button>
              </div>

              {/* Illustration */}
              <div className="flex justify-center pt-md pb-xs">
                {cfg.illustration}
              </div>

              {/* Title + body */}
              <div className="px-lg text-center space-y-xs pb-md">
                <h2 className="text-h5-sm font-bold text-[#0F0F1A]">{title}</h2>
                <p className="text-text-secondary text-para-sm leading-relaxed">{body}</p>
              </div>

              {/* Usage pill — designer only */}
              {!isClient && (
                <div className="flex justify-center pb-md">
                  <div className="flex items-center gap-sm px-md py-sm rounded-full border border-[#EDE9FE] bg-white">
                    <SparkleIcon />
                    <span className="text-text-secondary text-para-sm">
                      {cfg.usageLabel}
                    </span>
                    <span className="text-[#7C3AED] font-bold text-para-sm">
                      {currentCount} of {limit}
                    </span>
                    {resetsInDays != null && (
                      <>
                        <span className="text-text-muted text-para-sm">·</span>
                        <span className="text-text-secondary text-para-sm">Resets in</span>
                        <span className="text-[#7C3AED] font-bold text-para-sm">{resetsInDays} {resetsInDays === 1 ? "day" : "days"}</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="mx-lg border-t border-[#F0EEFF]" />

              {/* Feature bullets — designer only */}
              {!isClient && (
                <div className="px-lg py-md space-y-md">
                  {cfg.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-md">
                      <div className="w-8 h-8 rounded-full bg-[#F5F3FF] flex items-center justify-center flex-shrink-0">
                        {bullet.icon}
                      </div>
                      <div>
                        <p className="text-para-sm font-semibold text-[#0F0F1A]">{bullet.title}</p>
                        <p className="text-para-xs text-text-secondary">{bullet.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Client bullet — simplified */}
              {isClient && (
                <div className="px-lg py-md">
                  <div className="flex items-start gap-md p-md rounded-xl bg-[#F5F3FF]">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <ShieldIcon />
                    </div>
                    <div>
                      <p className="text-para-sm font-semibold text-[#0F0F1A]">Your work is safe</p>
                      <p className="text-para-xs text-text-secondary">Your current progress and selections are saved. Nothing will be lost.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="px-lg pb-md space-y-sm">
                {checkoutError && (
                  <p className="text-text-error text-para-xs text-center">{checkoutError}</p>
                )}

                {/* Primary */}
                <button
                  onClick={handlePrimary}
                  disabled={isCheckoutLoading}
                  className="w-full py-md rounded-xl bg-[#4F3FE8] hover:bg-[#3D2FD6] text-white font-semibold text-para-md transition-colors disabled:opacity-60 flex items-center justify-center gap-sm"
                >
                  {isCheckoutLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Redirecting…</span>
                    </>
                  ) : (
                    primaryLabel
                  )}
                </button>

                {/* Secondary */}
                <button
                  onClick={onSecondary}
                  disabled={isCheckoutLoading}
                  className="w-full py-md rounded-xl border border-[#C4B5FD] text-[#4F3FE8] font-semibold text-para-md hover:bg-[#F5F3FF] transition-colors disabled:opacity-50"
                >
                  {cfg.secondaryLabel}
                </button>
              </div>

              {/* Footer reassurance */}
              <div className="px-lg pb-lg flex items-center justify-center gap-xs text-text-muted text-para-xs">
                <RiLockLine className="text-[10px]" />
                <span>Secure checkout</span>
                <span>·</span>
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BillingGateModal;
