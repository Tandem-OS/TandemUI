import { Route, Routes } from "react-router-dom"
import TestPreview from "./pages/TestPreview"
import AuthLayout from "./components/auth/layoouts/AuthLayout"


const Layout = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<TestPreview />} />
                <Route path="/auth/*" element={<AuthLayout variant="split"/>} />
            </Routes>
        </main>
    )
}

export default Layout