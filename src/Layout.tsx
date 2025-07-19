import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layouts/AuthLayout"
import OnboardingForm from "./components/intake-form/OnboardingForm"
import OnboardComplete from "./components/onboard-completed/OnboardComplete"
import IntakeForm from "./components/intake-form/IntakeForm"
import { ROUTES } from "./routes/routes"
import DashboardRoutes from "./dashboards/DasHboardRoutes"
import DemoPage from "./pages/DemoPage"
import ThemeToggle from "./components/theme-toggle/ThemeToggle"

const Layout = () => {
    return (
        <main>
            <div className="fixed top-5 right-5 z-50">
                <ThemeToggle />
            </div>
            <Routes>
                <Route path={ROUTES.HOME} element={<DemoPage />} />
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