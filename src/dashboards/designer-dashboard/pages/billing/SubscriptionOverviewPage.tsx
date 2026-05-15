import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiArrowLeftLine,
  RiShieldCheckLine,
  RiCalendarLine,
  RiExternalLinkLine,
  RiCheckLine,
} from 'react-icons/ri';
import CancellationConfirmModal from './CancellationConfirmModal';
import { createPortalSession, cancelSubscription } from '@/lib/requests/BillingRequest';

// ─── Types 

interface SubscriptionData {
  plan: string;
  status: 'active' | 'past_due' | 'cancelled';
  price: number;
  billingCycle: 'monthly' | 'annual';
  nextRenewal: string;
  subscriptionId: string;
  paymentMethod: {
    brand: string;
    last4: string;
    expiry: string;
  };
  usage: {
    aiCredits: { used: number; limit: number };
    seats: { used: number; limit: number };
  };
  features: string[];
}

interface SubscriptionOverviewPageProps {
  subscription?: SubscriptionData;
}

// ─── Mock data (replaced by real API) 

const DEFAULT_SUBSCRIPTION: SubscriptionData = {
  plan: 'Pro Plan',
  status: 'active',
  price: 59.50,
  billingCycle: 'monthly',
  nextRenewal: 'May 12, 2025',
  subscriptionId: 'sub_1Qw2eR123456abc',
  paymentMethod: {
    brand: 'Visa',
    last4: '4242',
    expiry: '05/28',
  },
  usage: {
    aiCredits: { used: 68, limit: 200 },
    seats: { used: 3, limit: 3 },
  },
  features: [
    '200 AI credits / month',
    '3 seats included',
    'Full AI Lab Access',
    'AI Playbooks & Task Boards',
    'Unlimited Templates & Collections',
    'Unlimited Template Requests',
    'Early Access to AI Features',
    'Priority support',
  ],
};

// ─── Crown SVG 

const CrownIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#7C3AED" />
    <path d="M6 22l3-10 7 5 7-5 3 10H6z" fill="white" opacity="0.9" />
    <circle cx="6" cy="12" r="2" fill="white" />
    <circle cx="16" cy="9" r="2" fill="white" />
    <circle cx="26" cy="12" r="2" fill="white" />
  </svg>
);

// ─── Usage bar 

const UsageBar: React.FC<{ label: string; used: number; limit: number }> = ({ label, used, limit }) => {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  const isHigh = pct >= 80;
  return (
    <div className="space-y-xs">
      <div className="flex items-center justify-between">
        <span className="text-para-sm text-text-secondary">{label}</span>
        <span className="text-para-sm font-medium text-text-primary">{used} / {limit}</span>
      </div>
      <div className="h-2 bg-background-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isHigh ? 'bg-amber-500' : 'bg-[#7C3AED]'}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  );
};

// ─── Main 

const SubscriptionOverviewPage: React.FC<SubscriptionOverviewPageProps> = ({
  subscription = DEFAULT_SUBSCRIPTION,
}) => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const handleManagePortal = async () => {
    setIsPortalLoading(true);
    setPortalError(null);
    try {
      const { url } = await createPortalSession();
      window.location.href = url;
    } catch {
      setPortalError('Unable to open the customer portal. Please try again.');
    } finally {
      setIsPortalLoading(false);
    }
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    setCancelError(null);
    try {
      await cancelSubscription();
      setShowCancelModal(false);
      navigate('/dashboard/designer/billing/cancelled');
    } catch {
      setCancelError('Unable to cancel your subscription. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-xl py-xl">

          {/* Back */}
          <button
            onClick={() => navigate('/dashboard/designer')}
            className="flex items-center gap-xs text-para-sm text-text-secondary hover:text-text-primary transition-colors mb-xl"
          >
            <RiArrowLeftLine className="text-icon-sm" />
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="mb-xl">
            <h1 className="text-h3-sm font-bold text-text-primary">Subscription Overview</h1>
            <p className="text-text-secondary text-para-sm mt-xs">
              Manage your TandemOS Pro subscription, billing, and plan details.
            </p>
          </div>

          {/* Portal error */}
          {portalError && (
            <div className="mb-lg px-md py-sm bg-red-50 border border-red-200 rounded-xl text-para-sm text-red-700">
              {portalError}
            </div>
          )}

          {/* Subscription card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-background-primary-2 border border-border-default rounded-2xl p-xl mb-lg"
          >
            <div className="flex items-start justify-between mb-lg">
              <div>
                <p className="text-para-xs text-text-secondary mb-xs">Current plan</p>
                <div className="flex items-center gap-md">
                  <h2 className="text-h4-sm font-bold text-text-primary">{subscription.plan}</h2>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    {['#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#3B82F6'].map((color, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: color,
                          top: `${20 + Math.sin(i * 1.2) * 20}px`,
                          left: `${20 + Math.cos(i * 1.2) * 20}px`,
                          opacity: 0.6,
                        }}
                      />
                    ))}
                    <CrownIcon />
                  </div>
                </div>
                <p className="text-h3-sm font-bold text-text-primary mt-xs">
                  ${subscription.price.toFixed(2)}
                  <span className="text-para-sm font-normal text-text-secondary"> / month</span>
                </p>
                <div className="flex items-center gap-xs mt-xs">
                  <RiCalendarLine className="text-icon-xs text-text-secondary" />
                  <p className="text-para-sm text-text-secondary">
                    Next renewal: <span className="font-medium text-text-primary">{subscription.nextRenewal}</span>
                  </p>
                </div>
                <p className="text-para-xs text-text-secondary mt-xs">Your plan renews automatically.</p>
              </div>
              <span className="px-sm py-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-para-xs font-medium flex-shrink-0">
                Active
              </span>
            </div>

            {/* FIX 1 — flex-wrap so both buttons stack on 375px instead of overflowing */}
            <div className="flex flex-wrap items-center gap-sm">
              <motion.button
                onClick={handleManagePortal}
                disabled={isPortalLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-xs px-md py-sm rounded-lg border border-[#C4B5FD] text-[#7C3AED] text-para-sm font-medium hover:bg-[#F5F3FF] transition-colors disabled:opacity-60"
              >
                {isPortalLoading ? (
                  <span className="w-4 h-4 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Manage in Customer Portal
                    <RiExternalLinkLine className="text-icon-xs" />
                  </>
                )}
              </motion.button>
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-md py-sm rounded-lg border border-border-default text-text-secondary text-para-sm hover:bg-background-muted transition-colors"
              >
                Cancel subscription
              </button>
            </div>

            <p className="text-para-xs text-text-tertiary mt-md">
              Cancel anytime. You'll continue to have access until {subscription.nextRenewal}.
            </p>
          </motion.div>

          {/* Features + Billing summary grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-lg">

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-background-primary-2 border border-border-default rounded-2xl p-xl"
            >
              <h3 className="text-para-md font-semibold text-text-primary mb-md">Includes</h3>
              <div className="space-y-sm">
                {subscription.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-sm">
                    <div className="w-5 h-5 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                      <RiCheckLine className="text-white text-[10px]" />
                    </div>
                    <span className="text-para-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleManagePortal}
                disabled={isPortalLoading}
                className="mt-md text-para-sm text-[#7C3AED] hover:underline disabled:opacity-60"
              >
                View all features
              </button>
            </motion.div>

            {/* Billing summary + usage */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="space-y-lg"
            >
              {/* Billing summary */}
              <div className="bg-background-primary-2 border border-border-default rounded-2xl p-xl">
                <h3 className="text-para-md font-semibold text-text-primary mb-md">Billing summary</h3>
                <div className="space-y-sm">
                  {[
                    { label: 'Plan', value: subscription.plan },
                    { label: 'Billing cycle', value: `Billed ${subscription.billingCycle}` },
                    { label: 'Price', value: `$${subscription.price.toFixed(2)} / month` },
                    { label: 'Next renewal', value: subscription.nextRenewal },
                    {
                      label: 'Payment method',
                      value: `${subscription.paymentMethod.brand} ···· ${subscription.paymentMethod.last4}`,
                    },
                  ].map(({ label, value }) => (
                    // FIX 2 — min-w-0 + text-right on value so long strings don't push layout
                    <div key={label} className="flex items-center justify-between gap-sm">
                      <span className="text-para-sm text-text-secondary flex-shrink-0">{label}</span>
                      <span className="text-para-sm text-text-primary font-medium text-right min-w-0 break-words">{value}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleManagePortal}
                  disabled={isPortalLoading}
                  className="mt-md text-para-sm text-[#7C3AED] hover:underline disabled:opacity-60"
                >
                  Manage payment methods
                </button>
              </div>

              {/* Usage */}
              <div className="bg-background-primary-2 border border-border-default rounded-2xl p-xl">
                <h3 className="text-para-md font-semibold text-text-primary mb-md">Usage this month</h3>
                <div className="space-y-md">
                  <UsageBar
                    label="AI credits"
                    used={subscription.usage.aiCredits.used}
                    limit={subscription.usage.aiCredits.limit}
                  />
                  <UsageBar
                    label="Seats"
                    used={subscription.usage.seats.used}
                    limit={subscription.usage.seats.limit}
                  />
                </div>
                <button
                  onClick={handleManagePortal}
                  disabled={isPortalLoading}
                  className="mt-md text-para-sm text-[#7C3AED] hover:underline disabled:opacity-60"
                >
                  View usage details
                </button>
              </div>
            </motion.div>
          </div>

          {/* Footer reassurance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-background-primary-2 border border-border-default rounded-2xl p-lg flex items-start gap-md"
          >
            <div className="w-8 h-8 rounded-full bg-[#F5F3FF] flex items-center justify-center flex-shrink-0">
              <RiShieldCheckLine className="text-[#7C3AED] text-icon-sm" />
            </div>
            <div>
              <p className="text-para-sm font-medium text-text-primary">
                Your subscription is secure and managed by our trusted billing partner.
              </p>
              <p className="text-para-xs text-text-secondary mt-xs">
                Need to make changes to your plan, update billing details, or view more options?{' '}
                <button
                  onClick={handleManagePortal}
                  disabled={isPortalLoading}
                  className="text-[#7C3AED] hover:underline disabled:opacity-60"
                >
                  Open Customer Portal
                  <RiExternalLinkLine className="inline ml-xs text-[10px]" />
                </button>
              </p>
            </div>
          </motion.div>

          {/* Cancel error */}
          {cancelError && (
            <div className="mt-lg px-md py-sm bg-red-50 border border-red-200 rounded-xl text-para-sm text-red-700">
              {cancelError}
            </div>
          )}

        </div>
      </div>

      {/* Cancellation modal */}
      <CancellationConfirmModal
        isOpen={showCancelModal}
        nextRenewalDate={subscription.nextRenewal}
        isLoading={isCancelling}
        onConfirm={handleCancel}
        onKeep={() => setShowCancelModal(false)}
        onClose={() => setShowCancelModal(false)}
      />
    </div>
  );
};

export default SubscriptionOverviewPage;
