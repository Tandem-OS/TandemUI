import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '@/components/auth/form/components/Input';
import Heading from '@/components/demos/typography/Heading';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import FormButton from '@/components/auth/form/components/FormButton';
import { resetPassword } from '@/lib/requests/AuthRequest';

const NewPasswordForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ password: '', token: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");

    useEffect(() => {
        if (accessToken) {
            setValues((prevValues) => ({
                ...prevValues,
                token: accessToken,
            }));
        }
    }, [accessToken]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '', general: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        // Password validation
        if (!values.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (values.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleLogin = async () => {
        // Clear any previous errors
        setErrors({});

        // Validate form
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await resetPassword(values)
            if (response?.data?.message === "Password updated successfully.") {
                setSuccessMessage('New Password Set successfully.');
                setTimeout(() => {
                    navigate("/auth");
                }, 3000);
            }
        } catch (err) {
            console.error('Login error:', err);
            setErrors({ general: 'An unexpected error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                handleLogin();
            }}
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl px-xl py-lg space-y-md lg:space-y-lg shadow-xl"
        >
            {/* Back to Home */}
            <div className="flex justify-end">
                <Link
                    to="/auth"
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                    <FaArrowLeft />
                    <span>Back to login</span>
                </Link>

            </div>

            {/* Header */}
            <div>
                <Heading level="h4" color="accent" weight="bold" className="mb-md">
                    Enter New Password
                </Heading>
                <p className="text-gray-700 dark:text-gray-200 text-para-md mb-md"> Enter your new password to get login</p>
            </div>
            {successMessage && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                    {successMessage}
                </div>
            )}
            {/* General Error Message */}
            {errors.general && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {errors.general}
                </div>
            )}

            {/* Inputs */}
            <div className="space-y-sm">

                <div>
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
                        error={errors.password}
                        className="bg-gray-900"
                    />
                </div>
            </div>

            {/* Submit with FormButton */}
            <FormButton
                size="md"
                fullWidth
                variant="solid"
                type="submit"
                isLoading={loading}
                disabled={loading}
            >
                Send Password
            </FormButton>

        </form>
    );
};

export default NewPasswordForm;