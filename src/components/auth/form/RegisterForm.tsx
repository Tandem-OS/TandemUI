import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import FormButton from './components/FormButton';

interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterForm: React.FC = () => {
  const [values, setValues] = useState<RegisterValues>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof RegisterErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const newErrors: RegisterErrors = {};

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

    setLoading(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 3000));
      console.log('Registered with values:', values);
      navigate('/onboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="w-full max-w-md bg-background-primary rounded-2xl px-xl py-lg space-y-md lg:space-y-lg shadow-xl border border-border-default"
    >
      <div className="flex justify-end leading-none">
        <Link
          to="/"
          className="flex items-center gap-sm text-para-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <FaArrowLeft />
          <span>Back to home</span>
        </Link>
      </div>

      <div>
        <Heading level="h4" color="accent" weight="bold" className="mb-md">
          Join Tandem
        </Heading>
        <p className="text-text-secondary text-para-md mb-md">
          Create Your Account
        </p>
      </div>

      <div className="space-y-sm">
        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter your email"
          icon={<FaEnvelope />}
          variant="filled"
          error={errors.email}
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
          error={errors.password}
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
          error={errors.confirmPassword}
        />
      </div>

      <FormButton
        size="md"
        fullWidth
        variant="solid"
        type="submit"
        isLoading={loading}
      >
        Sign up
      </FormButton>

      <p className="text-center text-text-secondary text-para-sm">
        Already have an account?{' '}
        <Link
          to="/auth/"
          className="underline text-accent-default hover:text-accent-hover font-medium transition-colors"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
