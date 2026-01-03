'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      interactive = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: `
        bg-white
        shadow-[var(--shadow-md)]
      `,
      elevated: `
        bg-white
        shadow-[var(--shadow-lg)]
      `,
      outlined: `
        bg-white
        border border-[var(--color-border-light)]
      `,
      dark: `
        bg-[var(--color-bg-dark)]
        text-white
      `,
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-5',
      lg: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-[var(--radius-lg)]',
          variants[variant],
          paddings[padding],
          interactive && 'card-interactive cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action, className, ...props }: CardHeaderProps) {
  return (
    <div className={clsx('flex items-start justify-between gap-4', className)} {...props}>
      <div>
        <h3 className="text-section-header text-[var(--color-text-primary)]">{title}</h3>
        {subtitle && (
          <p className="text-body-secondary mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// Card Content Component
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={clsx('mt-4', className)} {...props}>
      {children}
    </div>
  );
}

// Card Footer Component
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={clsx(
        'mt-4 pt-4 border-t border-[var(--color-border-light)]',
        'flex items-center justify-end gap-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Stat Card Component (for dashboard stats)
export interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export function StatCard({
  label,
  value,
  subValue,
  icon,
  trend,
  color = 'default',
}: StatCardProps) {
  const colors = {
    default: 'bg-white',
    primary: 'bg-[var(--color-primary)]/5',
    success: 'bg-[var(--color-success)]/10',
    warning: 'bg-[var(--color-warning)]/10',
    error: 'bg-[var(--color-error)]/10',
  };

  const iconColors = {
    default: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]',
    primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
    success: 'bg-[var(--color-success)]/20 text-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]/20 text-[var(--color-error)]',
  };

  return (
    <Card className={colors[color]}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-small uppercase tracking-wider">{label}</p>
          <p className="text-page-header mt-1">{value}</p>
          {subValue && (
            <p className="text-body-secondary mt-0.5">{subValue}</p>
          )}
          {trend && (
            <div
              className={clsx(
                'inline-flex items-center gap-1 mt-2 text-sm font-medium',
                trend.isPositive ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
              )}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-[var(--color-text-tertiary)] font-normal">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={clsx('p-3 rounded-xl', iconColors[color])}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

// List Item Card (for history items)
export interface ListItemCardProps {
  title: string;
  subtitle?: string;
  value?: string;
  icon?: ReactNode;
  status?: 'submitted' | 'reviewed' | 'approved';
  accentColor?: 'yellow' | 'green' | 'purple' | 'peach';
  onClick?: () => void;
}

export function ListItemCard({
  title,
  subtitle,
  value,
  icon,
  status,
  accentColor,
  onClick,
}: ListItemCardProps) {
  const accents = {
    yellow: 'bg-[var(--color-accent-yellow)]',
    green: 'bg-[var(--color-accent-green)]',
    purple: 'bg-[var(--color-accent-purple)]',
    peach: 'bg-[var(--color-accent-peach)]',
  };

  const statusColors = {
    submitted: { dot: 'bg-[var(--color-warning)]', text: 'Submitted' },
    reviewed: { dot: 'bg-[var(--color-info)]', text: 'Reviewed' },
    approved: { dot: 'bg-[var(--color-success)]', text: 'Approved' },
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-4 p-4 rounded-[var(--radius-lg)]',
        accentColor ? accents[accentColor] : 'bg-white shadow-[var(--shadow-sm)]',
        onClick && 'cursor-pointer card-interactive'
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && (
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[var(--shadow-sm)]">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[var(--color-text-primary)] truncate">{title}</p>
        {subtitle && (
          <p className="text-sm text-[var(--color-text-secondary)] truncate">{subtitle}</p>
        )}
        {status && (
          <div className="flex items-center gap-2 mt-1">
            <span className={clsx('w-2 h-2 rounded-full', statusColors[status].dot)} />
            <span className="text-sm text-[var(--color-text-secondary)]">
              {statusColors[status].text}
            </span>
          </div>
        )}
      </div>
      {value && (
        <div className="text-right shrink-0">
          <p className="font-semibold text-[var(--color-text-primary)]">{value}</p>
        </div>
      )}
    </div>
  );
}

export default Card;

