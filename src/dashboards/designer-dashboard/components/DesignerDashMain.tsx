// src/dashboards/designer-dashboard/components/DesignerDashMain.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardHome from '../pages/DashboardHome';
import ProjectsPage from '../pages/ProjectsPage';
import BriefsPage from '../pages/BriefsPage';
import AnalyticsOverview from '../pages/AnalyticsOverview';
import AnalyticsPerformance from '../pages/AnalyticsPerformance';
import AnalyticsReports from '../pages/AnalyticsReports';
import SwiperPage from '../pages/SwiperPage';
import WebsiteScraperPage from '../pages/WebsiteScraperPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import DaconsahPage from '../pages/DaconsahPage';

const DesignerDashMain: React.FC = () => {
    return (
        <main className="flex-1 bg-gray-100 dark:bg-slate-950 overflow-y-auto">
            <div className="p-md lg:p-lg">
                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/briefs" element={<BriefsPage />} />
                    <Route path="/analytics/overview" element={<AnalyticsOverview />} />
                    <Route path="/analytics/performance" element={<AnalyticsPerformance />} />
                    <Route path="/analytics/reports" element={<AnalyticsReports />} />
                    <Route path="/swiper" element={<SwiperPage />} />
                    <Route path="/website-scraper" element={<WebsiteScraperPage />} />
                    <Route path="/testimonials" element={<TestimonialsPage />} />
                    <Route path="/daconsah" element={<DaconsahPage />} />
                </Routes>
            </div>
        </main>
    );
};

export default DesignerDashMain;