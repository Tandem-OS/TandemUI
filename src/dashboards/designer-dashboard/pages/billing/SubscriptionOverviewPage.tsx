import React, { useState, useEffect } from 'react';
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
import { createPortalSession, cancelSubscription, getSubscription, type SubscriptionResponse } from '@/lib/requests/BillingRequest';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatUnixDate = (ts: number): string =>
  new Date(ts * 1000).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

const formatPrice = (cents: number, currency: string): string =>
  `$${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;

const formatBillingCycle = (cycle: 'month' | 'year'): string =>
  cycle === 'month' ? 'monthly' : 'annual';

// ─── Static Pro features list ─────────────────────────────────────────────────
// Features are plan-level constants, not returned by the subscription endpoint

const PRO_FEATURES = [
  '200 AI credits / month',
  '3 seats included',
  'Full AI Lab Access',
  'AI Playbooks & Task Boards',
  'Unlimited Templates & Collections',
  'Unlimited Template Requests',
  'Early Access to AI Features',
  'Priority support',
];

// ─── Crown SVG ────────────────────────────────────────────────────────────────

const CrownIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#7C3AED" />
    <path d="M6 22l3-10 7 5 7-5 3 10H6z" fill="white" opacity="0.9" />
    <circle cx="6" cy="12" r="2" fill="white" />
    <circle cx="16" cy="9" r="2" fill="white" />
    <circle cx="26" cy="12" r="2" fill="white" />
  </svg>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const SubscriptionOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);

  // Fetch real subscription data on mount
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const data = await getSubscription();
        setSubscription(data);
      } catch {
        setFetchError('Unable to load subscription details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubscription();
  }, []);

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
      const result = await cancelSubscription();
      setShowCancelModal(false);
      // Format the period-end timestamp into a human-readable date
      // current_period_end is a Unix timestamp (seconds)
      const downgradeDate = result.current_period_end
        ? new Date(result.current_period_end * 1000).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : subscription?.next_renewal_date
          ? formatUnixDate(subscription.next_renewal_date)
          : 'your billing period end';
      navigate('/dashboard/designer/billing/cancelled', {
        state: { downgradeDate },
      });
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

          {/* Loading state */}
          {isLoading && (
            <div className="space-y-lg">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-background-primary-2 border border-border-default rounded-2xl p-xl animate-pulse">
                  <div className="h-6 bg-background-muted rounded w-1/3 mb-md" />
                  <div className="h-4 bg-background-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Fetch error */}
          {!isLoading && fetchError && (
            <div className="px-md py-sm bg-red-50 border border-red-200 rounded-xl text-para-sm text-red-700 mb-lg">
              {fetchError}
            </div>
          )}

          {/* Portal error */}
          {portalError && (
            <div className="mb-lg px-md py-sm bg-red-50 border border-red-200 rounded-xl text-para-sm text-red-700">
              {portalError}
            </div>
          )}

          {/* Main content — only render when data is loaded */}
          {!isLoading && subscription && (() => {
            const planName = subscription.plan === 'pro' ? 'Pro Plan' : 'Free Plan';
            const priceDisplay = subscription.price > 0
              ? `${formatPrice(subscription.price, subscription.currency)} / ${subscription.billing_cycle}`
              : 'Free';
            const renewalDate = subscription.next_renewal_date
              ? formatUnixDate(subscription.next_renewal_date)
              : '—';
            const cancelDate = subscription.cancel_at
              ? formatUnixDate(subscription.cancel_at)
              : null;

            return (
              <>
                {/* Cancellation scheduled warning */}
                {subscription.cancel_at_period_end && (
                  <div className="mb-lg px-md py-sm bg-amber-50 border border-amber-200 rounded-xl text-para-sm text-amber-800">
                    Your subscription is scheduled to cancel on {cancelDate ?? renewalDate}. You'll keep Pro access until then.
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
                        <h2 className="text-h4-sm font-bold text-text-primary">{planName}</h2>
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
                      <p className="text-h3-sm font-bold text-text-primary mt-xs">{priceDisplay}</p>
                      <div className="flex items-center gap-xs mt-xs">
                        <RiCalendarLine className="text-icon-xs text-text-secondary" />
                        <p className="text-para-sm text-text-secondary">
                          Next renewal: <span className="font-medium text-text-primary">{renewalDate}</span>
                        </p>
                      </div>
                      <p className="text-para-xs text-text-secondary mt-xs">Your plan renews automatically.</p>
                    </div>
                    <span className={`px-sm py-xs border rounded-full text-para-xs font-medium flex-shrink-0 ${
                      subscription.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </div>

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
                    {!subscription.cancel_at_period_end && (
                      <button
                        onClick={() => setShowCancelModal(true)}
                        className="px-md py-sm rounded-lg border border-border-default text-text-secondary text-para-sm hover:bg-background-muted transition-colors"
                      >
                        Cancel subscription
                      </button>
                    )}
                  </div>

                  <p className="text-para-xs text-text-tertiary mt-md">
                    Cancel anytime. You'll continue to have access until {renewalDate}.
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
                      {PRO_FEATURES.map((feature, i) => (
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

                  {/* Billing summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="bg-background-primary-2 border border-border-default rounded-2xl p-xl"
                  >
                    <h3 className="text-para-md font-semibold text-text-primary mb-md">Billing summary</h3>
                    <div className="space-y-sm">
                      {[
                        { label: 'Plan', value: planName },
                        ...(subscription.plan !== 'free' ? [{
                          label: 'Billing cycle',
                          value: `Billed ${formatBillingCycle(subscription.billing_cycle)}`,
                        }] : []),
                        { label: 'Price', value: priceDisplay },
                        { label: 'Next renewal', value: renewalDate },
                        ...(subscription.payment_method ? [{
                          label: 'Payment method',
                          value: `${subscription.payment_method.brand} ···· ${subscription.payment_method.last4}`,
                        }] : []),
                      ].map(({ label, value }) => (
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

                {/* Cancellation modal */}
                <CancellationConfirmModal
                  isOpen={showCancelModal}
                  nextRenewalDate={renewalDate}
                  isLoading={isCancelling}
                  onConfirm={handleCancel}
                  onKeep={() => setShowCancelModal(false)}
                  onClose={() => setShowCancelModal(false)}
                />
              </>
            );
          })()}

        </div>
      </div>
    </div>
  );
};

export default SubscriptionOverviewPage;
