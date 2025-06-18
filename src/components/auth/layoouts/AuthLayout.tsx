import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import RegisterForm from '../form/RegisterForm';
import LoginForm from '../form/LoginForm';
import ResetPasswordForm from '../form/ResetPasswordForm';
import FloatingShapesBackground from '../../animations-components/FloatingShapesBackground';
import { pageVariants } from "../../../lib/animations/variants";

export type AuthVariant = 'split' | 'centered';

interface AuthLayoutProps {
    variant?: AuthVariant;
}

// Properly typed transition
const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.3,
};

// Route configuration for DRY code
const routes = [
    { path: '/', element: LoginForm, key: 'login' },
    { path: 'signup', element: RegisterForm, key: 'signup' },
    { path: 'reset-password', element: ResetPasswordForm, key: 'reset' },
];

const AuthLayout: React.FC<AuthLayoutProps> = ({ variant = 'split' }) => {
    const location = useLocation();
    const isCentered = variant === 'centered';

    const backgroundProps = isCentered
        ? {
            bgGradient: 'white',
            shapeColor: 'blue',
        }
        : {
            bgGradient: 'bg-gradient-to-t from-accent-default to-accent-default-dark',
            shapeColor: '#1f2937',
        };

    // Reusable animated routes component
    const AnimatedRoutes = () => (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {routes.map(({ path, element: Component, key }) => (
                    <Route
                        key={key}
                        path={path}
                        element={
                            <motion.div
                                className="w-full flex justify-center items-center"
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <Component />
                            </motion.div>
                        }
                    />
                ))}
            </Routes>
        </AnimatePresence>
    );

    const containerClasses = `relative min-h-screen flex ${isCentered ? '' : 'bg-gray-900'}`;
    const backgroundClasses = `absolute inset-0 ${isCentered ? '' : 'hidden lg:block'}`;

    // Common wrapper for forms
    const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <>
            <FloatingShapesBackground
                {...backgroundProps}
                className={backgroundClasses}
            />
            {children}
        </>
    );

    return (
        <div className={containerClasses}>
            <FormWrapper>
                {isCentered ? (
                    <div className="absolute inset-0 flex justify-center items-center z-20">
                        <div className="w-full h-full flex justify-center items-center p-lg bg-transparent backdrop-blur-sm rounded-lg shadow-lg">
                            <AnimatedRoutes />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col flex-1 p-lg z-10">
                        <div className="mb-lg">
                            <img src="/images/logo.png" alt="Logo" className="w-[150px]" />
                        </div>
                        <div className="flex-1 flex justify-center items-center">
                            <AnimatedRoutes />
                        </div>
                    </div>
                )}
            </FormWrapper>
        </div>
    );
};

export default AuthLayout;