// src/dashboards/DashboardRoutes.tsx
import { Route, Routes, Navigate, useSearchParams } from "react-router-dom"
import DesignerDashboardLayout from "./designer-dashboard/DesignerDashboardLayout"
import ClientDashboardLayout from "./client-dashboard/ClientDashboardLayout"

// ─── Redirect handler for Stripe callbacks ────────────────────────────────────
// Stripe redirects to /dashboard?upgrade=success or /dashboard?upgrade=cancelled
// This component catches that and forwards to the designer dashboard with the param intact

const UpgradeRedirect = () => {
    const [searchParams] = useSearchParams();
    const upgrade = searchParams.get('upgrade');
    if (upgrade) {
        return <Navigate to={`/dashboard/designer?upgrade=${upgrade}`} replace />;
    }
    // Default: redirect to designer dashboard
    return <Navigate to="/dashboard/designer" replace />;
};

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/designer/*" element={<DesignerDashboardLayout />} />
            <Route path="/client/*" element={<ClientDashboardLayout />} />
            {/* Catch /dashboard and /dashboard?upgrade=success|cancelled from Stripe */}
            <Route path="/" element={<UpgradeRedirect />} />
            <Route path="*" element={<UpgradeRedirect />} />
        </Routes>
    )
}

export default DashboardRoutes
