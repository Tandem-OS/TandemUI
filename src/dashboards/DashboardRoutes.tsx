import { Route, Routes } from "react-router-dom";
import DesignerDashboardLayout from "./designer-dashboard/DesignerDashboardLayout";
import ClientDashboardLayout from "./client-dashboard/ClientDashboardLayout";

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/designer/*" element={<DesignerDashboardLayout />} />
            <Route path="/client/*" element={<ClientDashboardLayout />} />
        </Routes>
    );
};

export default DashboardRoutes;
