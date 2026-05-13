// src/dashboards/designer-dashboard/components/DesignerDashMain.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardHome from '../pages/dashboard-home/DashboardHome';
import ProjectsPage from '../pages/ProjectsPage';
import BriefsPage from '../pages/BriefsPage';
import AnalyticsOverview from '../pages/AnalyticsOverview';
import AnalyticsPerformance from '../pages/AnalyticsPerformance';
import AnalyticsReports from '../pages/AnalyticsReports';
import SwiperPage from '../pages/SwiperPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import DaconsahPage from '../pages/DaconsahPage';
import MyProject from '@/dashboards/client-dashboard/pages/my-project/MyProject';
import ProjectOverview from '@/dashboards/client-dashboard/pages/project-overview/ProjectOverview';
import ProfileView from '@/components/profile/ProfileView';
import ScraperIntelligencePage from '@/pages/scraper/ScraperIntelligencePage';
import SubscriptionOverviewPage from '../pages/billing/SubscriptionOverviewPage';
import CancellationSuccessPage from '../pages/billing/CancellationSuccessPage';

const DesignerDashMain: React.FC = () => {
    return (
        <main className="flex-1 bg-background-secondary-2 overflow-y-auto">
            <div className="p-md lg:p-lg">
                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/my-project" element={<MyProject />} />
                    <Route path="/my-project/project-overview/:id" element={<ProjectOverview />} />
                    <Route path="/briefs" element={<BriefsPage />} />
                    <Route path="/analytics/overview" element={<AnalyticsOverview />} />
                    <Route path="/analytics/performance" element={<AnalyticsPerformance />} />
                    <Route path="/analytics/reports" element={<AnalyticsReports />} />
                    <Route path="/swiper" element={<SwiperPage />} />
                    <Route path="/website-scraper" element={<ScraperIntelligencePage />} />
                    <Route path="/testimonials" element={<TestimonialsPage />} />
                    <Route path="/daconsah" element={<DaconsahPage />} />
                    <Route path="/profile-view" element={<ProfileView />} />
                    {/* ── Billing (designer only) ── */}
                    <Route path="/billing" element={<SubscriptionOverviewPage />} />
                    <Route path="/billing/cancelled" element={<CancellationSuccessPage />} />
                </Routes>
            </div>
        </main>
    );
};

export default DesignerDashMain;
