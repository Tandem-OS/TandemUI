import { useState } from 'react';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa';
import SimpleButton from '../../demos/buttons/SimpleButton';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: typeof errors = {};

        if (!values.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!values.password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (!values.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (values.password !== values.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Register form submitted with values:', values);
    };

    return (
        <form
            onSubmit={handleRegister}
            className="w-full max-w-md bg-gray-800 rounded-2xl px-8 py-6 space-y-6 shadow-xl"
        >
            {/* Back to Home */}
            <Link
                to="/"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
                <FaArrowLeft />
                <span>Back to home</span>
            </Link>

            {/* Heading */}
            <div>
                <Heading level="h4" color="accent" align="left" weight="bold" className="mb-4">
                    Join Tandem
                </Heading>
                <p className="text-gray-200 text-sm">
                    Create Your Account
                </p>
            </div>

            {/* Input Fields */}
            <div className="space-y-3">
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    icon={<FaEnvelope />}
                    variant="filled"
                    primaryColor="#4f46e5"
                    error={errors.email}
                    className="bg-gray-900"
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    icon={<FaLock />}
                    showPasswordToggle
                    variant="filled"
                    primaryColor="#4f46e5"
                    error={errors.password}
                    className="bg-gray-900"
                />

                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    icon={<FaLock />}
                    showPasswordToggle
                    variant="filled"
                    primaryColor="#4f46e5"
                    error={errors.confirmPassword}
                    className="bg-gray-900"
                />
            </div>

            {/* Submit Button */}
            <SimpleButton size="md" fullWidth type="submit" variant="solid">
                Sign up
            </SimpleButton>

            {/* Redirect */}
            <p className="text-center text-gray-200 text-sm">
                Already have an account?{' '}
                <Link to="/auth/" className="underline text-accent-default font-medium">
                    Sign In
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;
