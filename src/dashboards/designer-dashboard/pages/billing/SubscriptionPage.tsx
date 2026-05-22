import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RiArrowLeftLine,
    RiCheckLine,
    RiCloseLine,
    RiExternalLinkLine,
    RiErrorWarningLine,
} from 'react-icons/ri';
import { createPortalSession, getSubscription, createCheckoutSession, type SubscriptionResponse } from '@/lib/requests/BillingRequest';

// ─── Tandem-specific plan copy — sourced from PLAN_LIMITS in backend ──────────
// free: refine=5, swiper_session=3, version_restore=3, intake_session=3, scraper_run=3
// free: project_limit=2, client_limit=2 (FREE_TIER_PROJECT_LIMIT)
// pro:  all limits = None (unlimited)

const FREE_FEATURES = [
    { text: '2 active projects', included: true },
    { text: '2 client seats', included: true },
    { text: '3 scraper runs / project', included: true },
    { text: '3 swipe sessions / project', included: true },
    { text: '3 intake sessions / project', included: true },
    { text: '5 refinements / project', included: true },
    { text: '3 version restores / project', included: true },
    { text: 'Basic component library', included: true },
    { text: 'Community support', included: true },
    { text: 'Unlimited usage', included: false },
    { text: 'Priority support', included: false },
];

const PRO_FEATURES = [
    { text: 'Unlimited projects & clients', included: true },
    { text: 'Unlimited scraper runs', included: true },
    { text: 'Unlimited swipe sessions', included: true },
    { text: 'Unlimited intake sessions', included: true },
    { text: 'Unlimited refinements', included: true },
    { text: 'Unlimited version restores', included: true },
    { text: 'Full component library', included: true },
    { text: 'Priority support', included: true },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const formatUnixDate = (ts: number): string =>
    new Date(ts * 1000).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
    });

// ─── Cancel Confirmation Modal ─────────────────────────────────────────────────

interface CancelModalProps {
    cancelDate: string | null;
    isLoading: boolean;
    onConfirm: () => void;
    onDismiss: () => void;
}

const CancelModal: React.FC<CancelModalProps> = ({ cancelDate, isLoading, onConfirm, onDismiss }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-md"
        onClick={onDismiss}
    >
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background-primary border border-border-default rounded-2xl p-xl max-w-md w-full shadow-xl"
            onClick={e => e.stopPropagation()}
        >
            <h2 className="text-h5 font-bold text-text-primary mb-sm">Cancel your Pro plan?</h2>
            <p className="text-para-sm text-text-secondary mb-xs">
                {cancelDate
                    ? `Your Pro access remains active until ${cancelDate}.`
                    : 'Your Pro access remains active until the end of your billing period.'}
            </p>
            <p className="text-para-sm text-text-secondary mb-lg">
                After that your account moves to Free. No work is deleted.
            </p>
            <div className="flex gap-sm">
                <button
                    onClick={onDismiss}
                    disabled={isLoading}
                    className="flex-1 px-md py-sm rounded-lg border border-border-default text-text-primary text-para-sm font-medium hover:bg-background-muted transition-colors disabled:opacity-60"
                >
                    Keep Pro
                </button>
                <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex-1 px-md py-sm rounded-lg bg-red-600 text-white text-para-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-xs"
                >
                    {isLoading
                        ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        : 'Cancel Pro'
                    }
                </button>
            </div>
        </motion.div>
    </motion.div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const SubscriptionPage: React.FC = () => {
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [isPortalLoading, setIsPortalLoading] = useState(false);
    const [isUpgradeLoading, setIsUpgradeLoading] = useState(false);
    const [portalError, setPortalError] = useState<string | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

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

    const handleUpgrade = async () => {
        setIsUpgradeLoading(true);
        try {
            const url = await createCheckoutSession('monthly');
            window.location.href = url;
        } catch {
            setPortalError('Unable to start checkout. Please try again.');
        } finally {
            setIsUpgradeLoading(false);
        }
    };

    const handleCancelConfirm = async () => {
        await handleManagePortal();
        setShowCancelModal(false);
    };

    const isPro = subscription?.plan === 'pro';
    const isCancelled = subscription?.cancel_at_period_end;
    const isPastDue = subscription?.status === 'past_due';
    const cancelDate = subscription?.cancel_at
        ? formatUnixDate(subscription.cancel_at)
        : subscription?.next_renewal_date
            ? formatUnixDate(subscription.next_renewal_date)
            : null;

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
                        <h1 className="text-h3-sm font-bold text-text-primary">Subscription</h1>
                        <p className="text-text-secondary text-para-sm mt-xs">
                            Compare plans and manage your Tandem subscription.
                        </p>
                    </div>

                    {/* Loading skeleton */}
                    {isLoading && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
                            {[1, 2].map(i => (
                                <div key={i} className="bg-background-primary-2 border border-border-default rounded-2xl p-xl animate-pulse">
                                    <div className="h-6 bg-background-muted rounded w-1/3 mb-md" />
                                    <div className="h-10 bg-background-muted rounded w-1/2 mb-lg" />
                                    {[1, 2, 3, 4].map(j => (
                                        <div key={j} className="h-4 bg-background-muted rounded w-3/4 mb-sm" />
                                    ))}
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

                    {/* Past due warning */}
                    {!isLoading && isPastDue && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-lg px-md py-sm bg-red-50 border border-red-200 rounded-xl flex items-start gap-sm"
                        >
                            <RiErrorWarningLine className="text-red-600 text-icon-sm flex-shrink-0 mt-[2px]" />
                            <div>
                                <p className="text-para-sm font-medium text-red-700">
                                    Payment failed — your Pro access is at risk.
                                </p>
                                <p className="text-para-xs text-red-600 mt-xs">
                                    Update your payment method to keep Pro access.{' '}
                                    <button
                                        onClick={handleManagePortal}
                                        disabled={isPortalLoading}
                                        className="underline font-medium disabled:opacity-60"
                                    >
                                        Fix payment
                                        <RiExternalLinkLine className="inline ml-xs text-[10px]" />
                                    </button>
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Cancellation warning */}
                    {!isLoading && isCancelled && cancelDate && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-lg px-md py-sm bg-amber-50 border border-amber-200 rounded-xl text-para-sm text-amber-800"
                        >
                            Your Pro access continues until {cancelDate}. After that your account moves to Free.
                        </motion.div>
                    )}

                    {/* Plan cards */}
                    {!isLoading && subscription && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-lg">

                            {/* Free card */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className={`relative bg-background-primary-2 border rounded-2xl p-xl flex flex-col ${
                                    !isPro
                                        ? 'border-[#7C3AED] ring-1 ring-[#7C3AED]/20'
                                        : 'border-border-default'
                                }`}
                            >
                                {!isPro && (
                                    <span className="absolute -top-3 left-xl px-sm py-xs bg-[#7C3AED] text-white text-para-xs font-semibold rounded-full">
                                        Current plan
                                    </span>
                                )}

                                <div className="mb-lg">
                                    <p className="text-para-xs text-text-secondary mb-xs uppercase tracking-wide font-medium">
                                        Free
                                    </p>
                                    <p className="text-h3-sm font-bold text-text-primary">$0</p>
                                    <p className="text-para-xs text-text-secondary mt-xs">Forever free</p>
                                </div>

                                <div className="space-y-sm flex-1">
                                    {FREE_FEATURES.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-sm">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                feature.included ? 'bg-[#7C3AED]' : 'bg-background-muted'
                                            }`}>
                                                {feature.included
                                                    ? <RiCheckLine className="text-white text-[10px]" />
                                                    : <RiCloseLine className="text-text-tertiary text-[10px]" />
                                                }
                                            </div>
                                            <span className={`text-para-sm ${
                                                feature.included ? 'text-text-secondary' : 'text-text-tertiary'
                                            }`}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-lg pt-lg border-t border-border-default">
                                    {isPro ? (
                                        <button
                                            onClick={() => setShowCancelModal(true)}
                                            disabled={isPortalLoading}
                                            className="w-full px-md py-sm rounded-lg border border-border-default text-text-secondary text-para-sm hover:bg-background-muted transition-colors disabled:opacity-60"
                                        >
                                            Cancel Pro
                                        </button>
                                    ) : (
                                        <div className="w-full px-md py-sm rounded-lg bg-background-muted text-text-tertiary text-para-sm text-center font-medium">
                                            Current plan
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Pro card */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className={`relative bg-background-primary-2 border rounded-2xl p-xl flex flex-col ${
                                    isPro
                                        ? 'border-[#7C3AED] ring-1 ring-[#7C3AED]/20'
                                        : 'border-border-default'
                                }`}
                            >
                                {isPro && !isCancelled && (
                                    <span className="absolute -top-3 left-xl px-sm py-xs bg-[#7C3AED] text-white text-para-xs font-semibold rounded-full">
                                        Current plan
                                    </span>
                                )}
                                {isCancelled && (
                                    <span className="absolute -top-3 left-xl px-sm py-xs bg-amber-500 text-white text-para-xs font-semibold rounded-full">
                                        Pro access until {cancelDate}
                                    </span>
                                )}

                                <div className="mb-lg">
                                    <p className="text-para-xs text-text-secondary mb-xs uppercase tracking-wide font-medium">
                                        Pro ⚡
                                    </p>
                                    <p className="text-h3-sm font-bold text-text-primary">
                                        $49.99{' '}
                                        <span className="text-para-sm font-normal text-text-secondary">
                                            USD / month
                                        </span>
                                    </p>
                                    <p className="text-para-xs text-text-secondary mt-xs">
                                        Billed monthly. Cancel anytime.
                                    </p>
                                </div>

                                <div className="space-y-sm flex-1">
                                    {PRO_FEATURES.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-sm">
                                            <div className="w-5 h-5 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                                                <RiCheckLine className="text-white text-[10px]" />
                                            </div>
                                            <span className="text-para-sm text-text-secondary">
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-lg pt-lg border-t border-border-default">
                                    {isPro && !isCancelled && (
                                        <div className="w-full px-md py-sm rounded-lg bg-background-muted text-text-tertiary text-para-sm text-center font-medium">
                                            Current plan
                                        </div>
                                    )}
                                    {isPro && isCancelled && (
                                        <motion.button
                                            onClick={handleManagePortal}
                                            disabled={isPortalLoading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full flex items-center justify-center gap-xs px-md py-sm rounded-lg bg-[#7C3AED] text-white text-para-sm font-medium hover:bg-[#6D28D9] transition-colors disabled:opacity-60"
                                        >
                                            {isPortalLoading
                                                ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                : <>Reactivate Pro <RiExternalLinkLine className="text-icon-xs" /></>
                                            }
                                        </motion.button>
                                    )}
                                    {!isPro && (
                                        <motion.button
                                            onClick={handleUpgrade}
                                            disabled={isUpgradeLoading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full flex items-center justify-center gap-xs px-md py-sm rounded-lg bg-[#7C3AED] text-white text-para-sm font-medium hover:bg-[#6D28D9] transition-colors disabled:opacity-60"
                                        >
                                            {isUpgradeLoading
                                                ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                : 'Upgrade to Pro'
                                            }
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>

                        </div>
                    )}

                    {/* Footer — Pro only. Free users have no Stripe customer so portal is irrelevant. */}
                    {!isLoading && subscription && isPro && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="bg-background-primary-2 border border-border-default rounded-2xl p-lg flex items-center justify-between gap-md"
                        >
                            <p className="text-para-sm text-text-secondary">
                                Need to update billing details, view invoices, or manage your plan?
                            </p>
                            <button
                                onClick={handleManagePortal}
                                disabled={isPortalLoading}
                                className="flex items-center gap-xs text-para-sm text-[#7C3AED] font-medium hover:underline flex-shrink-0 disabled:opacity-60"
                            >
                                {isPortalLoading
                                    ? <span className="w-4 h-4 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
                                    : <>Open Customer Portal <RiExternalLinkLine className="text-icon-xs" /></>
                                }
                            </button>
                        </motion.div>
                    )}

                </div>
            </div>

            {/* Cancel Pro confirmation modal */}
            <AnimatePresence>
                {showCancelModal && (
                    <CancelModal
                        cancelDate={cancelDate}
                        isLoading={isPortalLoading}
                        onConfirm={handleCancelConfirm}
                        onDismiss={() => setShowCancelModal(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default SubscriptionPage;