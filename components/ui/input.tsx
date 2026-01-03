'use client';

import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
  useState,
} from 'react';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

// Base Input Props
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      type,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={clsx('flex flex-col gap-2', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={isPassword && showPassword ? 'text' : type}
            className={clsx(
              'w-full h-12 px-4 rounded-[var(--radius-md)]',
              'bg-white border border-[var(--color-border-light)]',
              'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]',
              'transition-all duration-150',
              'focus:outline-none focus:border-[var(--color-primary)]',
              'focus:ring-2 focus:ring-[var(--color-primary)]/20',
              'disabled:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed',
              error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/10',
              leftIcon && 'pl-12',
              (rightIcon || isPassword) && 'pr-12',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          {rightIcon && !isPassword && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-[var(--color-error)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-sm text-[var(--color-text-tertiary)]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Currency Input with Naira formatting
export interface CurrencyInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  value: number;
  onChange: (value: number) => void;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(
      value ? value.toLocaleString('en-NG') : ''
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/[^0-9]/g, '');
      const numValue = parseInt(rawValue, 10) || 0;
      setDisplayValue(numValue ? numValue.toLocaleString('en-NG') : '');
      onChange(numValue);
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        leftIcon={<span className="font-medium text-[var(--color-text-secondary)]">₦</span>}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

// Textarea
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, fullWidth = true, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={clsx('flex flex-col gap-2', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full min-h-[120px] p-4 rounded-[var(--radius-md)]',
            'bg-white border border-[var(--color-border-light)]',
            'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]',
            'transition-all duration-150 resize-y',
            'focus:outline-none focus:border-[var(--color-primary)]',
            'focus:ring-2 focus:ring-[var(--color-primary)]/20',
            'disabled:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed',
            error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/10',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-[var(--color-error)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-sm text-[var(--color-text-tertiary)]">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Select
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, hint, options, placeholder, fullWidth = true, className, id, ...props },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={clsx('flex flex-col gap-2', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full h-12 px-4 pr-10 rounded-[var(--radius-md)]',
              'bg-white border border-[var(--color-border-light)]',
              'text-[var(--color-text-primary)]',
              'transition-all duration-150 appearance-none cursor-pointer',
              'focus:outline-none focus:border-[var(--color-primary)]',
              'focus:ring-2 focus:ring-[var(--color-primary)]/20',
              'disabled:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed',
              error && 'border-[var(--color-error)]',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-sm text-[var(--color-error)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-sm text-[var(--color-text-tertiary)]">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Date Input
export interface DateInputProps extends Omit<InputProps, 'type'> {}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>((props, ref) => {
  return (
    <Input
      ref={ref}
      type="date"
      className="appearance-none [&::-webkit-calendar-picker-indicator]:opacity-60"
      {...props}
    />
  );
});

DateInput.displayName = 'DateInput';

// Toggle / Switch
export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}: ToggleProps) {
  return (
    <label
      className={clsx(
        'flex items-center justify-between gap-4 cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <span className="font-medium text-[var(--color-text-primary)]">{label}</span>
          )}
          {description && (
            <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
          )}
        </div>
      )}
      <div className="relative shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={clsx(
            'w-12 h-7 rounded-full transition-colors duration-200',
            'bg-[var(--color-border-medium)]',
            'peer-checked:bg-[var(--color-primary)]',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary)] peer-focus-visible:ring-offset-2'
          )}
        />
        <div
          className={clsx(
            'absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md',
            'transition-transform duration-200',
            'peer-checked:translate-x-5'
          )}
        />
      </div>
    </label>
  );
}

export default Input;

