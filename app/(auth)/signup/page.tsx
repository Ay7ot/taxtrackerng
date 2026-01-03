'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/components/ui/toast';
import Input from '@/components/ui/input';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isAuthenticated, isLoading: authLoading } = useAuth();
  const { success: showSuccess, error: showError } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signUp(email, password, name.trim());
      showSuccess('Account Created', 'Welcome to IncomeTracker NG!');
      router.push('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create account';
      showError('Sign Up Failed', message);
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-dvh flex flex-col bg-gray-50 max-w-4xl mx-auto pb-safe">
      {/* Header */}
      <div className="bg-linear-to-br from-slate-900 to-slate-800 text-white px-6 pt-safe pb-16 rounded-b-[40px] shadow-xl">
        <div className="max-w-md mx-auto pt-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
          <p className="text-gray-300 mt-2">Start tracking your income today</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex-1 px-6 -mt-8">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="name"
              label="Full Name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Enter your full name"
              error={errors.name}
              autoComplete="name"
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
              disabled={isLoading}
              className="h-14 rounded-xl"
            />

            <Input
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter your email"
              error={errors.email}
              autoComplete="email"
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6L12 13L2 6" />
                </svg>
              }
              disabled={isLoading}
              className="h-14 rounded-xl"
            />

            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Create a password"
              error={errors.password}
              autoComplete="new-password"
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              }
              disabled={isLoading}
              className="h-14 rounded-xl"
            />

            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              autoComplete="new-password"
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              }
              disabled={isLoading}
              className="h-14 rounded-xl"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full h-14 rounded-xl mt-2
                bg-blue-600 text-white font-semibold
                shadow-lg shadow-blue-600/30
                hover:bg-blue-700 active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                transition-all duration-200
                flex items-center justify-center gap-2
              "
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Creating Account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-xs text-gray-400">By signing up, you agree to our Terms & Privacy Policy</p>
      </div>
    </div>
  );
}
