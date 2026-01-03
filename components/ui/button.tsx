'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-semibold tracking-wide
      rounded-full
      transition-all duration-150 ease-out
      btn-press
      disabled:opacity-50 disabled:cursor-not-allowed
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    `;

    const variants = {
      primary: `
        bg-[var(--color-primary)] text-white
        shadow-[var(--shadow-primary)]
        hover:bg-[var(--color-primary-dark)] hover:shadow-[var(--shadow-primary-hover)]
        focus-visible:ring-[var(--color-primary)]
      `,
      secondary: `
        bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]
        border border-[var(--color-border-light)]
        hover:bg-[var(--color-border-light)]
        focus-visible:ring-[var(--color-primary)]
      `,
      outline: `
        bg-transparent text-[var(--color-primary)]
        border-2 border-[var(--color-primary)]
        hover:bg-[var(--color-primary)] hover:text-white
        focus-visible:ring-[var(--color-primary)]
      `,
      ghost: `
        bg-transparent text-[var(--color-primary)]
        hover:bg-[var(--color-primary)]/10
        focus-visible:ring-[var(--color-primary)]
      `,
      danger: `
        bg-[var(--color-error)] text-white
        hover:bg-[#DC2626]
        focus-visible:ring-[var(--color-error)]
      `,
    };

    const sizes = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-12 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Circular Icon Button
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', variant = 'primary', className, ...props }, ref) => {
    const sizes = {
      sm: 'w-10 h-10',
      md: 'w-12 h-12',
      lg: 'w-14 h-14',
    };

    const variants = {
      primary: `
        bg-[var(--color-primary)] text-white
        shadow-[var(--shadow-primary)]
        hover:bg-[var(--color-primary-dark)]
      `,
      secondary: `
        bg-white text-[var(--color-text-primary)]
        shadow-[var(--shadow-md)]
        hover:shadow-[var(--shadow-lg)]
      `,
      ghost: `
        bg-transparent text-[var(--color-text-secondary)]
        hover:bg-[var(--color-bg-secondary)]
      `,
    };

    return (
      <button
        ref={ref}
        className={clsx(
          'flex items-center justify-center rounded-full',
          'transition-all duration-150 ease-out btn-press',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

// Text Button / Link Style
export interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  underline?: boolean;
}

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ children, underline = false, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'text-[var(--color-primary)] font-semibold',
          'transition-opacity duration-150',
          'hover:opacity-80',
          'focus-visible:outline-none focus-visible:underline',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          underline && 'underline',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TextButton.displayName = 'TextButton';

export default Button;

