import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import RegisterForm from '../form/RegisterForm';
import LoginForm from '../form/LoginForm';
import ResetPasswordForm from '../form/ResetPasswordForm';
import NewPasswordForm from '../form/NewPasswordForm';
import FloatingShapesBackground from '../../animations-components/FloatingShapesBackground';
import SimpleHeader from '../../Headers/SimpleHeader/SimpleHeader';
import GoogleLogin from '../form/GoogleLogin';
import MagicLinkLogin from '@/components/auth/form/components/MagicLink';
import ContactDesignerMessage from '@/components/auth/form/components/ContactDesignerMessage';
import { layoutTokens } from "@/design-system/tokens/layout";
import { pageVariants, pageTransition } from "@/lib/animations/variants";

export type AuthVariant = 'split' | 'centered';

interface AuthLayoutProps {
    variant?: AuthVariant;
}

const routes = [
    { path: '/', element: LoginForm, key: 'login' },
    { path: 'signup', element: RegisterForm, key: 'signup' },
    { path: 'reset-password', element: ResetPasswordForm, key: 'reset' },
    { path: 'new-password', element: NewPasswordForm, key: 'password' },
    { path: 'google-login', element: GoogleLogin, key: 'google' },
    { path: 'magic-link', element: MagicLinkLogin, key: 'magicLink' },
    { path: 'magic-link-message', element: ContactDesignerMessage, key: 'magicLinkMessage' },
];

const AuthLayout: React.FC<AuthLayoutProps> = ({ variant = layoutTokens.auth.defaultVariant }) => {
    const location = useLocation();
    const isCentered = variant === 'centered';

    const backgroundProps = isCentered
        ? { bgGradient: layoutTokens.auth.bgGradientCentered, shapeColor: layoutTokens.auth.shapeColorCentered }
        : { bgGradient: layoutTokens.auth.bgGradientSplit, shapeColor: layoutTokens.auth.shapeColorSplit };

    const containerClasses = isCentered ? layoutTokens.auth.containerCentered : layoutTokens.auth.containerSplit;
    const backgroundClasses = isCentered ? layoutTokens.auth.backgroundCentered : layoutTokens.auth.backgroundSplit;

    const AnimatedRoutes = () => (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {routes.map(({ path, element: Component, key }) => (
                    <Route
                        key={key}
                        path={path}
                        element={
                            <motion.div
                                className={layoutTokens.auth.animatedRoute}
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
                    <div className={layoutTokens.auth.formWrapperCentered}>
                        <div className={layoutTokens.auth.formInnerCentered}>
                            <AnimatedRoutes />
                        </div>
                    </div>
                ) : (
                    <div className={layoutTokens.auth.formWrapperSplit}>
                        <SimpleHeader />
                        <div className={layoutTokens.auth.formInnerSplit}>
                            <AnimatedRoutes />
                        </div>
                    </div>
                )}
            </FormWrapper>
        </div>
    );
};

export default AuthLayout;