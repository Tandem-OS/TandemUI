// src/components/layouts/AuthLayout.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from '../form/RegisterForm';
import LoginForm from '../form/LoginForm';
import ResetPasswordForm from '../form/ResetPasswordForm';
import FloatingShapesBackground from '../../animations-components/FloatingShapesBackground';

export type AuthVariant = 'split' | 'centered';

interface AuthLayoutProps {
    variant?: AuthVariant;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ variant = 'split' }) => {
    const isCentered = variant === 'centered';

    const authRoutes = (
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="signup" element={<RegisterForm />} />
            <Route path="reset-password" element={<ResetPasswordForm />} />
        </Routes>
    );

    const backgroundProps = isCentered
        ? {
            bgGradient: 'white',
            shapeColor: 'blue',
        }
        : {
            bgGradient: 'bg-gradient-to-t from-accent-default to-accent-default-dark',
            shapeColor: '#1f2937',
        };

    return (
        <div className={`relative min-h-screen flex ${isCentered ? '' : 'bg-gray-900'}`}>
            <FloatingShapesBackground
                {...backgroundProps}
                className={`absolute inset-0 ${isCentered ? "" : "hidden lg:block"}`}
            />

            {isCentered ? (
                <div className="absolute inset-0 flex justify-center items-center z-20">
                    <div className="w-full h-full flex justify-center items-center p-8 bg-transparent backdrop-blur-sm rounded-lg shadow-lg">
                        {authRoutes}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col flex-1 p-6 z-10">
                    <div className="mb-5">
                        <img src="/images/logo.png" alt="Logo" className="w-[150px]" />
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                        {authRoutes}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthLayout;
