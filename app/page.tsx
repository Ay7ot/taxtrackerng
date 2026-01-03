'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/dashboard');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking auth
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-secondary)]">
      <div className="flex flex-col items-center gap-4">
        {/* Logo/Brand */}
        <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center shadow-[var(--shadow-primary)]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Loading indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
