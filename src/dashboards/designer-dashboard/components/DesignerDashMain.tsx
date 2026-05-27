// src/dashboards/designer-dashboard/components/DesignerDashMain.tsx
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DashboardHome from '../pages/dashboard-home/DashboardHome';
import MyProject from '@/dashboards/client-dashboard/pages/my-project/MyProject';
import ProjectOverview from '@/dashboards/client-dashboard/pages/project-overview/ProjectOverview';
import TestimonialsPage from '../pages/TestimonialsPage';
import ProfileView from '@/components/profile/ProfileView';
import ScraperIntelligencePage from '@/pages/scraper/ScraperIntelligencePage';
import SubscriptionOverviewPage from '../pages/billing/SubscriptionOverviewPage';
import CancellationConfirmedPage from '../pages/billing/CancellationConfirmedPage';
import BillingWarningBanner from '../components/BillingWarningBanner';
import { useBilling } from '../context/BillingContext';
import SubscriptionPage from '../pages/billing/SubscriptionPage';
import PaymentMethodsPage from '../pages/billing/PaymentMethodsPage';
import InvoicesPage from '../pages/billing/InvoicePage';
import BillingHistoryPage from '../pages/billing/BillingHistoryPage';
import SupportPage from '@/pages/scraper/components/SupportPage';

const DesignerDashMain: React.FC = () => {
    const navigate = useNavigate();
    const {
        warningState,
        isCheckoutLoading,
        initiateCheckout,
        dismissWarning,
    } = useBilling();

    return (
        <main className="flex-1 bg-background-secondary-2 overflow-y-auto">
            <div className="p-md lg:p-lg">

                {/* Soft usage warning — visible on all pages when 1 use remains */}
                {warningState && (
                    <BillingWarningBanner
                        warningState={warningState}
                        onUpgrade={() => initiateCheckout('monthly')}
                        onViewDetails={() => navigate('/dashboard/designer/billing/overview')}
                        onDismiss={dismissWarning}
                        isUpgradeLoading={isCheckoutLoading}
                    />
                )}

                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/my-project" element={<MyProject />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/my-project/project-overview/:id" element={<ProjectOverview />} />
                    <Route path="/website-scraper" element={<ScraperIntelligencePage />} />
                    <Route path="/testimonials" element={<TestimonialsPage />} />
                    <Route path="/profile-view" element={<ProfileView />} />
                    {/* ── Billing (designer only) ── */}
                    <Route path="/billing/account" element={<ProfileView />} />
                    <Route path="/billing/overview" element={<SubscriptionOverviewPage />} />
                    <Route path="/billing/cancelled" element={<CancellationConfirmedPage />} />
                    <Route path="/billing/subscription" element={<SubscriptionPage />} />
                    <Route path="/billing/payment-methods" element={<PaymentMethodsPage />} />
                    <Route path="/billing/invoices" element={<InvoicesPage />} />
                    <Route path="/billing/history" element={<BillingHistoryPage />} />
                </Routes>
            </div>
        </main>
    );
};

export default DesignerDashMain;
