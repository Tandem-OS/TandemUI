import { Route, Routes } from "react-router-dom"
import TestPreview from "./pages/TestPreview"
import AuthLayout from "./components/auth/layouts/AuthLayout"
import OnboardingForm from "./components/intake-form/OnboardingForm"
import OnboardComplete from "./components/onboard-completed/OnboardComplete"
import IntakeForm from "./components/intake-form/IntakeForm"
import { ROUTES } from "./routes/routes"
import DashboardRoutes from "./dashboards/DashboardRoutes"

const Layout = () => {
    return (
        <main>
            <Routes>
                <Route path={ROUTES.HOME} element={<TestPreview />} />
                <Route path={`${ROUTES.AUTH}/*`} element={<AuthLayout variant="split" />} />
                <Route path={ROUTES.INTAKE_FORM} element={<IntakeForm />} />
                <Route path={ROUTES.ONBOARD_COMPLETE} element={<OnboardComplete />} />
                <Route path={ROUTES.ONBOARDING} element={<OnboardingForm />} />
                <Route path={`${ROUTES.DASHBOARD}/*`} element={<DashboardRoutes />} />
            </Routes>
        </main>
    )
}

export default Layout