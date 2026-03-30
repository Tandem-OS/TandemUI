import { Route, Routes } from "react-router-dom"
import AuthLayout from "@/components/auth/layouts/AuthLayout"
import OnboardingForm from "@/components/intake-form/OnboardingForm"
import OnboardComplete from "@/components/onboard-completed/OnboardComplete"
import IntakeForm from "@/components/intake-form/IntakeForm"
import { ROUTES } from "@/routes/routes.ts"
import DashboardRoutes from "@/dashboards/DasHboardRoutes"
import ProtectedRoute from "@/routes/ProtectedRoutes"
import ScraperIntelligencePage from "./pages/scraper/ScraperIntelligencePage"
import PreviewComposePage from "@/pages/Preview/PreviewComposePage"


const Layout = () => {
    return (
        <main>
            <Routes>
                <Route path={`${ROUTES.AUTH}/*`} element={<AuthLayout variant="split" />} />
                <Route path={ROUTES.PREVIEW_COMPOSE} element={<PreviewComposePage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path={ROUTES.INTAKE_FORM} element={<IntakeForm />} />
                    <Route path={ROUTES.ONBOARD_COMPLETE} element={<OnboardComplete />} />
                    <Route path={ROUTES.ONBOARDING} element={<OnboardingForm />} />
                    <Route path={ROUTES.SCRAPER} element={<ScraperIntelligencePage />} />
                </Route>
                <Route path={`${ROUTES.DASHBOARD}/*`} element={<DashboardRoutes />} />
            </Routes>
        </main>
    )
}

export default Layout