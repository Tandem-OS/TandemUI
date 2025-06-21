import { Route, Routes } from "react-router-dom"
import TestPreview from "./pages/TestPreview"
import AuthLayout from "./components/auth/layoouts/AuthLayout"
import IntakeFormContainer from "./components/intake-form/IntakeFormContainer"
import IntakeFormRefactored from "./components/intake-form/IntakeFormRefactored"
import OnboardingForm from "./components/intake-form/OnboardingForm"
import IntakeForm from "./components/intake-form/IntakeForm"
import OnboardComplete from "./components/onboard-completed/OnboardComplete"
import Dashboard from "./dashboard/Dashboard"

const Layout = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<TestPreview />} />
                <Route path="/auth/*" element={<AuthLayout variant="split" />} />
                <Route path="/intake-form" element={<IntakeFormContainer />} />
                <Route path="/intake-form-new" element={<IntakeFormRefactored />} />
                <Route path="/first" element={<OnboardingForm />} />
                <Route path="/onboardcomplete" element={<OnboardComplete />} />
                <Route path="/intake" element={<IntakeForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </main>
    )
}

export default Layout