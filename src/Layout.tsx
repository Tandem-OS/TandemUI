import { Route, Routes } from "react-router-dom"
import AuthLayout from "@/components/auth/layouts/AuthLayout"
import OnboardingForm from "@/components/intake-form/OnboardingForm"
import OnboardComplete from "@/components/onboard-completed/OnboardComplete"
import IntakeForm from "@/components/intake-form/IntakeForm"
import { ROUTES } from "@/routes/routes.ts"
import DashboardRoutes from "@/dashboards/DasHboardRoutes"
import ProtectedRoute from "@/routes/ProtectedRoutes"
import DemoPage from "./pages/DemoPage"
import ScraperIntelligencePage from "./pages/scraper/ScraperIntelligencePage"

const Layout = () => {
    return (
        <main>
            <Routes>
                <Route path={ROUTES.HOME} element={<DemoPage />} />
                <Route path={`${ROUTES.AUTH}/*`} element={<AuthLayout variant="split" />} />
                <Route element={<ProtectedRoute />}>
                </Route>
                <Route path={ROUTES.INTAKE_FORM} element={<IntakeForm />} />
                <Route path={ROUTES.ONBOARD_COMPLETE} element={<OnboardComplete />} />
                <Route path={ROUTES.ONBOARDING} element={<OnboardingForm />} />
                <Route path={ROUTES.SCRAPER} element={<ScraperIntelligencePage />} />
                <Route path={`${ROUTES.DASHBOARD}/*`} element={<DashboardRoutes />} />
            </Routes>
        </main>
    )
}

export default Layout