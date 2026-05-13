import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiShieldCheckLine, RiCalendarLine, RiBankCardLine, RiQuestionLine } from 'react-icons/ri';

interface CancellationSuccessPageProps {
  nextRenewalDate?: string;
  newPlan?: string;
}

const CancellationSuccessPage: React.FC<CancellationSuccessPageProps> = ({
  nextRenewalDate = 'May 12, 2025',
  newPlan = 'Free',
}) => {
  const navigate = useNavigate();

  const details = [
    { icon: RiCalendarLine, label: 'Downgrade date', value: nextRenewalDate },
{ icon: RiBankCardLine, label: 'New plan', value: newPlan },
    { icon: RiQuestionLine, label: 'What happens next', value: 'Limits will reset to Free plan' },
  ];

  // Confetti dots
  const dots = [
    { color: '#7C3AED', top: '15%', left: '20%' },
    { color: '#10B981', top: '20%', left: '35%' },
    { color: '#F59E0B', top: '12%', left: '55%' },
    { color: '#EC4899', top: '25%', left: '70%' },
    { color: '#3B82F6', top: '18%', left: '80%' },
    { color: '#8B5CF6', top: '30%', left: '15%' },
    { color: '#F59E0B', top: '35%', left: '75%' },
    { color: '#10B981', top: '40%', left: '25%' },
  ];

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">

      {/* Header */}
      <header className="border-b border-border-default px-xl py-md flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <span className="text-h5-sm font-bold text-text-primary">TandemOS</span>
          <span className="px-xs py-px bg-[#7C3AED] text-white text-para-xs font-medium rounded-md">Pro</span>
        </div>
        <div className="flex items-center gap-md">
          <button
            onClick={() => window.location.href = 'mailto:support@trytandem.io'}
            className="text-para-sm text-[#7C3AED] hover:underline"
          >
            Contact support
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-md py-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl border border-border-default shadow-lg p-xl relative overflow-hidden"
        >
          {/* Confetti dots */}
          {dots.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-sm"
              style={{ backgroundColor: dot.color, top: dot.top, left: dot.left }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
            />
          ))}

          {/* Check icon */}
          <div className="flex justify-center mb-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14l6 6 10-10" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          {/* Title */}
          <div className="text-center mb-lg">
            <h1 className="text-h4-sm font-bold text-text-primary mb-sm">You've cancelled Pro</h1>
            <p className="text-text-secondary text-para-sm leading-relaxed">
              You'll have access to Pro features until {nextRenewalDate}.
              After that, you'll move to the Free plan.
            </p>
          </div>

          {/* Details */}
          <div className="bg-[#F5F3FF] rounded-xl p-md space-y-sm mb-lg">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between py-xs border-b border-[#EDE9FE] last:border-0">
                <div className="flex items-center gap-sm">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Icon className="text-[#7C3AED] text-icon-xs" />
                  </div>
                  <span className="text-para-sm text-text-secondary">{label}</span>
                </div>
                <span className="text-para-sm font-semibold text-text-primary">{value}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            onClick={() => navigate('/dashboard/designer')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-md rounded-xl border border-[#C4B5FD] text-[#4F3FE8] font-semibold text-para-md hover:bg-[#F5F3FF] transition-colors mb-lg"
          >
            Back to Dashboard
          </motion.button>

          {/* Footer reassurance */}
          <div className="flex flex-col items-center gap-xs">
            <div className="w-8 h-8 rounded-full bg-[#F5F3FF] flex items-center justify-center">
              <RiShieldCheckLine className="text-[#7C3AED] text-icon-sm" />
            </div>
            <p className="text-para-xs font-semibold text-text-primary text-center">
              Your projects and data will always be safe.
            </p>
            <p className="text-para-xs text-text-secondary text-center">
              You can upgrade to Pro anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CancellationSuccessPage;
