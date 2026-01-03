'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/components/ui/toast';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const { success: showSuccess, error: showError } = useToast();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email);
      setIsSubmitted(true);
      showSuccess('Email Sent', 'Check your inbox for reset instructions.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send reset email';
      showError('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="min-h-screen flex flex-col lg:flex-row">

        {/* Left Panel - Desktop */}
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl">IncomeTracker NG</span>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Forgot Your<br />Password?
            </h1>
            <p className="text-slate-400 mt-4 text-lg max-w-md">
              No worries! Enter your email and we&apos;ll send you reset instructions.
            </p>
          </div>

          <p className="text-slate-500 text-sm">© 2026 IncomeTracker NG. All rights reserved.</p>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <div className="lg:hidden bg-linear-to-br from-slate-900 to-slate-800 text-white px-6 pt-safe pb-10">
            <div className="max-w-md mx-auto pt-4">
              <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to login
              </Link>
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="text-slate-400 mt-1">Enter your email to get started</p>
            </div>
          </div>

          {/* Form Container */}
          <div className="flex-1 flex items-center justify-center px-6 py-8 lg:py-12">
            <div className="w-full max-w-md">
              {/* Desktop Title */}
              <div className="hidden lg:block mb-8">
                <Link href="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to login
                </Link>
                <h1 className="text-2xl font-bold text-slate-900">Reset your password</h1>
                <p className="text-slate-500 mt-1">We&apos;ll send you instructions via email</p>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 lg:shadow-lg">
                {isSubmitted ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mt-4">Check your email</h3>
                    <p className="text-slate-500 mt-2">
                      We&apos;ve sent password reset instructions to <strong>{email}</strong>
                    </p>
                    <Link
                      href="/login"
                      className="inline-block mt-6 px-6 py-3 bg-slate-100 rounded-xl font-medium text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      Back to login
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={isLoading}
                        className={`
                          w-full h-12 px-4 rounded-xl text-slate-900
                          border-2 transition-all duration-200
                          placeholder:text-slate-400
                          focus:outline-none focus:ring-0
                          disabled:opacity-50 disabled:bg-slate-50
                          ${error
                            ? 'border-red-300 bg-red-50 focus:border-red-500'
                            : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white'
                          }
                        `}
                      />
                      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="
                        w-full h-12 rounded-xl font-semibold text-white
                        bg-blue-600 hover:bg-blue-700 
                        shadow-lg shadow-blue-600/25
                        transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        active:scale-[0.98]
                        flex items-center justify-center gap-2
                      "
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : 'Send Reset Link'}
                    </button>
                  </form>
                )}
              </div>

              {!isSubmitted && (
                <p className="text-center text-slate-600 mt-6">
                  Remember your password?{' '}
                  <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                    Sign in
                  </Link>
                </p>
              )}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="lg:hidden py-4 pb-safe text-center">
            <p className="text-xs text-slate-400">Powered by IncomeTracker NG</p>
          </div>
        </div>
      </div>
    </div>
  );
}
