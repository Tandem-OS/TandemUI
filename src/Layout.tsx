import { Route, Routes } from "react-router-dom"
import TestPreview from "./pages/TestPreview"
import AuthLayout from "./components/auth/layoouts/AuthLayout"
import IntakeFormContainer from "./components/intake-form/IntakeFormContainer"

const Layout = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<TestPreview />} />
                <Route path="/auth/*" element={<AuthLayout variant="split" />} />
                <Route path="/intake-form" element={<IntakeFormContainer />} />
            </Routes>
        </main>
    )
}

export default Layout