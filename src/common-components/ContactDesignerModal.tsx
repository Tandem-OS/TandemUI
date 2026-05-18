import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiLockLine, RiSendPlaneLine, RiCheckLine, RiErrorWarningLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactDesignerModalProps {
  isOpen: boolean;
  onClose: () => void;
  designerEmail?: string | null;
  /** Gate context so the message can be pre-populated meaningfully */
  gateContext?: string;
}

type ModalState = "compose" | "sending" | "success" | "error";

const RATE_LIMIT_SECONDS = 60;
const STORAGE_KEY = "tandem_contact_designer_last_sent";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getRemainingCooldown(): number {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return 0;
  const elapsed = Math.floor((Date.now() - parseInt(raw, 10)) / 1000);
  return Math.max(0, RATE_LIMIT_SECONDS - elapsed);
}

// ─── Component ────────────────────────────────────────────────────────────────

const ContactDesignerModal: React.FC<ContactDesignerModalProps> = ({
  isOpen,
  onClose,
  designerEmail,
  gateContext = "",
}) => {
  const projectId = useSelector((state: RootState) => state.project.projectId);

  const [modalState, setModalState] = useState<ModalState>("compose");
  const [message, setMessage] = useState(gateContext);
  const [cooldown, setCooldown] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Initialise cooldown on open ──────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const remaining = getRemainingCooldown();
      setCooldown(remaining);
      setModalState("compose");
      setErrorMsg(null);
      // Focus textarea after entrance animation
      setTimeout(() => textareaRef.current?.focus(), 280);
    }
  }, [isOpen]);

  // ── Cooldown ticker ──────────────────────────────────────────────────────
  useEffect(() => {
    if (cooldown <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cooldown]);

  // ── Sync gateContext into message when modal opens ───────────────────────
  useEffect(() => {
    if (isOpen) setMessage(gateContext);
  }, [isOpen, gateContext]);

  // ── Send ─────────────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!message.trim() || cooldown > 0 || modalState === "sending") return;

    setModalState("sending");
    setErrorMsg(null);

    try {
      const res = await fetch("/notifications/contact-designer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          designer_email: designerEmail,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? `Request failed (${res.status})`);
      }

      // Start rate-limit clock
      sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
      setCooldown(RATE_LIMIT_SECONDS);
      setModalState("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(msg);
      setModalState("error");
    }
  };

  const handleClose = () => {
    onClose();
    // Reset compose state after exit animation
    setTimeout(() => {
      setModalState("compose");
      setErrorMsg(null);
    }, 300);
  };

  const isSendDisabled =
    !message.trim() || cooldown > 0 || modalState === "sending";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="cd-modal"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center px-4 sm:px-md pt-4 sm:pt-0 pb-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-y-auto max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-lg pt-lg pb-xs">
                <div className="flex items-center gap-xs px-sm py-xs bg-[#F5F3FF] rounded-full border border-[#EDE9FE]">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2v3M8 11v3M2 8h3M11 8h3M4.05 4.05l2.12 2.12M9.83 9.83l2.12 2.12M4.05 11.95l2.12-2.12M9.83 6.17l2.12-2.12"
                      stroke="#7C3AED"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-[#7C3AED] text-para-xs font-medium">
                    Contact Designer
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F3FF] text-[#7C3AED] hover:bg-[#EDE9FE] transition-colors"
                >
                  <RiCloseLine className="text-icon-sm" />
                </button>
              </div>

              {/* ── Body — switches between compose / success / error ── */}
              <AnimatePresence mode="wait">
                {/* ── SUCCESS ── */}
                {modalState === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="px-lg pt-md pb-lg flex flex-col items-center text-center gap-md"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 340, damping: 22, delay: 0.05 }}
                      className="w-16 h-16 rounded-full bg-[#F5F3FF] flex items-center justify-center"
                    >
                      <RiCheckLine className="text-[#7C3AED] text-2xl" />
                    </motion.div>

                    <div className="space-y-xs">
                      <h2 className="text-h5-sm font-bold text-[#0F0F1A]">
                        Message sent
                      </h2>
                      <p className="text-text-secondary text-para-sm leading-relaxed">
                        Your designer has been notified. They'll be in touch
                        {designerEmail ? (
                          <>
                            {" "}at{" "}
                            <span className="text-[#7C3AED] font-medium">
                              {designerEmail}
                            </span>
                          </>
                        ) : (
                          " shortly"
                        )}
                        .
                      </p>
                    </div>

                    {/* Rate limit notice */}
                    <div className="w-full flex items-center justify-center gap-xs px-md py-sm rounded-xl bg-[#F5F3FF] border border-[#EDE9FE]">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="#7C3AED" strokeWidth="1.5" />
                        <path d="M8 5v3.5l2 2" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-para-xs text-[#7C3AED]">
                        You can send another message in{" "}
                        <span className="font-semibold">{cooldown}s</span>
                      </span>
                    </div>

                    <button
                      onClick={handleClose}
                      className="w-full py-md rounded-xl bg-[#4F3FE8] hover:bg-[#3D2FD6] text-white font-semibold text-para-md transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                )}

                {/* ── COMPOSE / ERROR ── */}
                {(modalState === "compose" ||
                  modalState === "sending" ||
                  modalState === "error") && (
                  <motion.div
                    key="compose"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="px-lg pt-md pb-lg space-y-md"
                  >
                    {/* Intro */}
                    <div className="text-center space-y-xs">
                      <h2 className="text-h5-sm font-bold text-[#0F0F1A]">
                        Message your designer
                      </h2>
                      <p className="text-text-secondary text-para-sm leading-relaxed">
                        {designerEmail ? (
                          <>
                            Your message will be sent to{" "}
                            <span className="text-[#7C3AED] font-medium">
                              {designerEmail}
                            </span>
                            .
                          </>
                        ) : (
                          "Let your designer know you've hit a usage limit."
                        )}
                      </p>
                    </div>

                    {/* Textarea */}
                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Hi! I've hit the usage limit and need you to upgrade the plan so we can continue…"
                        rows={4}
                        maxLength={500}
                        disabled={modalState === "sending"}
                        className="w-full resize-none rounded-xl border border-[#EDE9FE] bg-[#FAFAFA] px-md py-md text-para-sm text-[#0F0F1A] placeholder:text-text-muted focus:outline-none focus:border-[#C4B5FD] focus:ring-2 focus:ring-[#EDE9FE] transition-colors disabled:opacity-50"
                      />
                      <span className="absolute bottom-3 right-3 text-para-xs text-text-muted">
                        {message.length}/500
                      </span>
                    </div>

                    {/* Error banner */}
                    <AnimatePresence>
                      {modalState === "error" && errorMsg && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-sm px-md py-sm rounded-xl bg-red-50 border border-red-200"
                        >
                          <RiErrorWarningLine className="text-red-500 flex-shrink-0" />
                          <span className="text-para-xs text-red-600">{errorMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* CTAs */}
                    <div className="space-y-sm">
                      {/* Primary — Send */}
                      <button
                        onClick={handleSend}
                        disabled={isSendDisabled}
                        className="w-full py-md rounded-xl bg-[#4F3FE8] hover:bg-[#3D2FD6] text-white font-semibold text-para-md transition-colors disabled:opacity-50 flex items-center justify-center gap-sm"
                      >
                        {modalState === "sending" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending…</span>
                          </>
                        ) : cooldown > 0 ? (
                          <span>Try again in {cooldown}s</span>
                        ) : (
                          <>
                            <RiSendPlaneLine />
                            <span>Send message</span>
                          </>
                        )}
                      </button>

                      {/* Secondary — Cancel */}
                      <button
                        onClick={handleClose}
                        disabled={modalState === "sending"}
                        className="w-full py-md rounded-xl border border-[#C4B5FD] text-[#4F3FE8] font-semibold text-para-md hover:bg-[#F5F3FF] transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-center gap-xs text-text-muted text-para-xs">
                      <RiLockLine className="text-[10px]" />
                      <span>Your current progress stays saved</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactDesignerModal;
