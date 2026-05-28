'use client';

import { usePrivacy } from '@/lib/privacy-context';

type HideAmountsToggleProps = {
  variant?: 'light' | 'dark';
  className?: string;
};

export function HideAmountsToggle({ variant = 'dark', className = '' }: HideAmountsToggleProps) {
  const { hideAmounts, toggleHideAmounts } = usePrivacy();

  const styles =
    variant === 'dark'
      ? 'bg-white/10 text-white hover:bg-white/20'
      : 'bg-slate-100 text-slate-600 hover:bg-slate-200';

  return (
    <button
      type="button"
      onClick={toggleHideAmounts}
      aria-label={hideAmounts ? 'Show amounts' : 'Hide amounts'}
      aria-pressed={hideAmounts}
      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${styles} ${className}`}
    >
      {hideAmounts ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}
