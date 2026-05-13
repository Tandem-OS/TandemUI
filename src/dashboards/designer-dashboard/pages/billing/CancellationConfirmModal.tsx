import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiSparklingLine, RiShieldLine, RiCalendarLine } from 'react-icons/ri';

interface CancellationConfirmModalProps {
  isOpen: boolean;
  nextRenewalDate: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onKeep: () => void;
  onClose: () => void;
}

const CancellationConfirmModal: React.FC<CancellationConfirmModalProps> = ({
  isOpen,
  nextRenewalDate,
  isLoading = false,
  onConfirm,
  onKeep,
  onClose,
}) => {
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 pointer-events-none"
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
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-lg right-lg w-8 h-8 flex items-center justify-center rounded-full bg-background-muted text-text-secondary hover:bg-background-secondary transition-colors"
              >
                <RiCloseLine className="text-icon-sm" />
              </button>

              {/* Icon */}
              <div className="flex justify-center pt-xl pb-md">
                <div className="w-16 h-16 rounded-full bg-[#F5F3FF] flex items-center justify-center">
                  <RiCalendarLine className="text-[#7C3AED] text-icon-xl" />
                </div>
              </div>

              {/* Title + body */}
              <div className="px-xl text-center space-y-xs pb-lg">
                <h2 className="text-h5-sm font-bold text-text-primary">Cancel Pro Plan?</h2>
                <p className="text-text-secondary text-para-sm leading-relaxed">
                  You'll keep Pro benefits until {nextRenewalDate}.
                  After that, you'll move to the Free plan.
                </p>
              </div>

              {/* What happens */}
              <div className="mx-lg mb-lg bg-[#F5F3FF] rounded-xl p-md space-y-sm">
                <p className="text-para-sm font-semibold text-[#7C3AED]">After {nextRenewalDate}:</p>
                {[
                  { icon: RiSparklingLine, text: 'AI credits reset to Free limits' },
                  { icon: RiShieldLine, text: 'Access to Pro features will end' },
                  { icon: RiShieldLine, text: 'Your projects & data stay safe' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-sm">
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <Icon className="text-[#7C3AED] text-icon-xs" />
                    </div>
                    <span className="text-para-sm text-text-primary">{text}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="px-lg pb-md space-y-sm">
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="w-full py-md rounded-xl bg-[#4F3FE8] hover:bg-[#3D2FD6] text-white font-semibold text-para-md transition-colors disabled:opacity-60 flex items-center justify-center"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Yes, cancel at end of billing period'
                  )}
                </button>
                <button
                  onClick={onKeep}
                  disabled={isLoading}
                  className="w-full py-md rounded-xl border border-[#C4B5FD] text-[#4F3FE8] font-semibold text-para-md hover:bg-[#F5F3FF] transition-colors disabled:opacity-50"
                >
                  Keep Pro Plan
                </button>
              </div>

              {/* Support link */}
              <div className="pb-lg text-center">
                <span className="text-para-xs text-text-muted">Need help? </span>
                <button
                  onClick={() => window.location.href = 'mailto:support@trytandem.io'}
                  className="text-para-xs text-[#7C3AED] hover:underline"
                >
                  Contact support
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CancellationConfirmModal;
