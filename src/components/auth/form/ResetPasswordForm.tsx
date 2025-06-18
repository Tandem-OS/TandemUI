import { useState } from 'react';
import { FaArrowLeft, FaEnvelope, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import SimpleButton from '../../demos/buttons/SimpleButton';

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        setError(null);
        console.log('Sending reset email to:', email);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-gray-800 rounded-2xl px-xl py-lg space-y-md lg:space-y-lg shadow-xl"
        >
            <div className="flex justify-end">
                <Link
                    to="/"
                    className="flex items-center gap-sm text-para-sm text-gray-300 hover:text-white transition-colors"
                >
                    <FaArrowLeft />
                    <span>Back to home</span>
                </Link>
            </div>
            {/* Heading */}
            <div>
                <Heading level="h4" color="accent" align="left" weight="bold" className="mb-md">
                    Reset Password
                </Heading>
                <p className="text-gray-200 text-para-md mb-md">
                    Enter your email to reset your password
                </p>
            </div>

            {/* Input */}
            <Input
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                icon={<FaEnvelope />}
                variant="filled"
                error={error || undefined}
                className="bg-gray-900"
            />

            {/* Submit */}
            <SimpleButton size="md" fullWidth type="submit" variant="solid">
                Send Reset Email
            </SimpleButton>

            {/* Divider */}
            <div className="flex items-center gap-md text-gray-400 text-para-sm py-md">
                <div className="flex-1 h-hairline bg-gray-600" />
                <span className="text-h7-sm uppercase">or</span>
                <div className="flex-1 h-hairline bg-gray-600" />
            </div>

            {/* Guest Button */}
            <SimpleButton
                type="button"
                variant="outline"
                fullWidth
                className="flex items-center justify-center gap-sm text-white bg-gray-700 hover:bg-gray-600"
            >
                <FaUser className="text-para-lg" />
                Continue as Guest
            </SimpleButton>

            {/* Back to Sign In */}
            <p className="text-center text-accent-default font-medium text-para-sm">
                <Link to="/auth" className="hover:underline">
                    Back to Sign In
                </Link>
            </p>
        </form>
    );
};

export default ResetPasswordForm;