import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    RiArrowLeftLine,
    RiExternalLinkLine,
    RiShieldCheckLine,
    RiBankCardLine,
} from 'react-icons/ri';
import { createPortalSession, getPaymentMethod, type PaymentMethodResponse } from '@/lib/requests/BillingRequest';

const CARD_BRAND_ICONS: Record<string, string> = {
    visa: '💳',
    mastercard: '💳',
    amex: '💳',
    discover: '💳',
};

const formatBrand = (brand: string): string =>
    brand.charAt(0).toUpperCase() + brand.slice(1);

const PaymentMethodsPage: React.FC = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [isPortalLoading, setIsPortalLoading] = useState(false);
    const [portalError, setPortalError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPaymentMethod = async () => {
            try {
                const data = await getPaymentMethod();
                setPaymentMethod(data);
            } catch {
                setFetchError('Unable to load payment method. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPaymentMethod();
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

    const hasCard = paymentMethod?.last4 != null;

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
                        <h1 className="text-h3-sm font-bold text-text-primary">Payment Methods</h1>
                        <p className="text-text-secondary text-para-sm mt-xs">
                            View and manage your saved payment method.
                        </p>
                    </div>

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

                    {/* Loading */}
                    {isLoading && (
                        <div className="space-y-lg">
                            <div className="bg-background-primary-2 border border-border-default rounded-2xl p-xl animate-pulse">
                                <div className="h-5 bg-background-muted rounded w-1/4 mb-lg" />
                                <div className="flex items-center gap-lg">
                                    <div className="w-14 h-10 bg-background-muted rounded-lg" />
                                    <div className="space-y-sm flex-1">
                                        <div className="h-4 bg-background-muted rounded w-1/3" />
                                        <div className="h-3 bg-background-muted rounded w-1/4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main content */}
                    {!isLoading && !fetchError && (
                        <div className="space-y-lg">

                            {/* Card display */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-background-primary-2 border border-border-default rounded-2xl p-xl"
                            >
                                <h3 className="text-para-md font-semibold text-text-primary mb-lg">Saved card</h3>

                                {hasCard ? (
                                    <div className="flex items-center justify-between gap-md flex-wrap">
                                        <div className="flex items-center gap-lg">
                                            {/* Card visual */}
                                            <div className="w-14 h-10 bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                                                <RiBankCardLine className="text-white text-icon-sm" />
                                            </div>

                                            <div>
                                                <p className="text-para-sm font-semibold text-text-primary">
                                                    {formatBrand(paymentMethod!.brand)} •••• {paymentMethod!.last4}
                                                </p>
                                                <p className="text-para-xs text-text-secondary mt-xs">
                                                    Expires {paymentMethod!.exp_month?.toString().padStart(2, '0')} / {paymentMethod!.exp_year}
                                                </p>
                                            </div>
                                        </div>

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
                                                    Update card
                                                    <RiExternalLinkLine className="text-icon-xs" />
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between gap-md flex-wrap">
                                        <div className="flex items-center gap-md">
                                            <div className="w-14 h-10 bg-background-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                                <RiBankCardLine className="text-text-tertiary text-icon-sm" />
                                            </div>
                                            <div>
                                                <p className="text-para-sm text-text-secondary">No payment method on file</p>
                                                <p className="text-para-xs text-text-tertiary mt-xs">Add a card to upgrade to Pro</p>
                                            </div>
                                        </div>

                                        <motion.button
                                            onClick={handleManagePortal}
                                            disabled={isPortalLoading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center gap-xs px-md py-sm rounded-lg bg-[#7C3AED] text-white text-para-sm font-medium hover:bg-[#6D28D9] transition-colors disabled:opacity-60"
                                        >
                                            {isPortalLoading ? (
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Add payment method
                                                    <RiExternalLinkLine className="text-icon-xs" />
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                )}
                            </motion.div>

                            {/* Manage via portal */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="bg-background-primary-2 border border-border-default rounded-2xl p-xl"
                            >
                                <h3 className="text-para-md font-semibold text-text-primary mb-sm">Manage billing</h3>
                                <p className="text-para-sm text-text-secondary mb-lg">
                                    Add, remove, or update payment methods securely through the Stripe Customer Portal.
                                </p>
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
                            </motion.div>

                            {/* Security note */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="bg-background-primary-2 border border-border-default rounded-2xl p-lg flex items-start gap-md"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#F5F3FF] flex items-center justify-center flex-shrink-0">
                                    <RiShieldCheckLine className="text-[#7C3AED] text-icon-sm" />
                                </div>
                                <div>
                                    <p className="text-para-sm font-medium text-text-primary">
                                        Your payment information is secure.
                                    </p>
                                    <p className="text-para-xs text-text-secondary mt-xs">
                                        Card details are stored and managed by Stripe. Tandem never stores your full card number.
                                    </p>
                                </div>
                            </motion.div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PaymentMethodsPage;