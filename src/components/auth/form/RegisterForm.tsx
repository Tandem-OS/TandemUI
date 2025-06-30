import { useState } from 'react';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa';
import SimpleButton from '../../demos/buttons/SimpleButton';
import { Link, useNavigate} from 'react-router-dom';
import { FaUser, FaUserTag } from 'react-icons/fa'; 
import { signup } from '../../../api/auth';            // Connect to your backend signup API


const RegisterForm = () => {
    const [values, setValues] = useState({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'Client', // Default role
})
    const [errors, setErrors] = useState<{
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}>({});

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setValues((prev) => ({ ...prev, [name]: value }));

  if (errors[name as keyof typeof errors]) {
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }
};
    const navigate = useNavigate(); // just inside the component

const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const newErrors: typeof errors = {};

  if (!values.fullName.trim()) {
    newErrors.fullName = 'Full name is required';
  }
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
  if (!values.role) {
    newErrors.role = 'Role is required';
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

 try {
  const res = await signup(values.email, values.password, values.fullName, values.role);

  if (res?.user || res?.email || res?.id) {
    alert("A confirmation link has been sent to your email.");
    navigate('/auth'); // redirect after successful registration
  } else if (res?.error?.message?.includes('User already registered')) {
    setErrors({ email: 'This email is already registered. Please log in or reset your password.' });
  } else {
    setErrors({ email: 'Signup failed. Please try again.' });
  }
} catch (error: any) {
  console.error('Signup error:', error);
  if (error?.message?.includes('User already registered')) {
    setErrors({ email: 'This email is already registered. Please log in or reset your password.' });
  } else {
    setErrors({ email: 'Something went wrong. Try again later.' });
  }
}
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
            label="Full Name"
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            icon={<FaUser />}
            variant="filled"
            primaryColor="#4f46e5"
            error={errors.fullName}
            className="bg-gray-900"
          />

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

          {/* Role Selection */}
            <label htmlFor="role" className="text-sm font-medium flex items-center gap-2 text-white">
              <FaUserTag className="text-gray-400" />
              <span>Select Role</span>
            </label>
            <select
              id="role"
              name="role"
              value={values.role}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
            >
              <option value="Client">Client</option>
              <option value="Designer">Designer</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        
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
