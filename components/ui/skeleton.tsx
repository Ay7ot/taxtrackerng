'use client';

import clsx from 'clsx';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'shimmer' | 'none';
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'shimmer',
}: SkeletonProps) {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-[var(--radius-md)]',
  };

  const animations = {
    pulse: 'animate-pulse',
    shimmer: 'skeleton',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  // Default heights for text variant
  if (variant === 'text' && !height) {
    style.height = '1em';
  }

  return (
    <div
      className={clsx(
        'bg-[var(--color-border-light)]',
        variants[variant],
        animations[animation],
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
}

// Skeleton Text Block
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={clsx('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '75%' : '100%'}
          height={16}
        />
      ))}
    </div>
  );
}

// Skeleton Avatar
export function SkeletonAvatar({
  size = 48,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Skeleton Card
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-md)]',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <SkeletonAvatar />
        <div className="flex-1">
          <Skeleton variant="text" width="60%" height={18} />
          <Skeleton variant="text" width="40%" height={14} className="mt-2" />
        </div>
        <Skeleton variant="rounded" width={80} height={24} />
      </div>
      <div className="mt-4">
        <SkeletonText lines={2} />
      </div>
    </div>
  );
}

// Skeleton List Item
export function SkeletonListItem({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'flex items-center gap-4 p-4 bg-white rounded-[var(--radius-lg)]',
        className
      )}
    >
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1">
        <Skeleton variant="text" width="70%" height={16} />
        <Skeleton variant="text" width="50%" height={14} className="mt-2" />
      </div>
      <Skeleton variant="rounded" width={60} height={20} />
    </div>
  );
}

// Skeleton Stat Card
export function SkeletonStatCard({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-md)]',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <Skeleton variant="text" width={80} height={12} />
          <Skeleton variant="text" width={120} height={28} className="mt-2" />
          <Skeleton variant="text" width={100} height={14} className="mt-2" />
        </div>
        <Skeleton variant="rounded" width={48} height={48} />
      </div>
    </div>
  );
}

// Skeleton Chart
export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-md)]',
        className
      )}
    >
      <Skeleton variant="text" width="40%" height={20} />
      <div className="mt-4 flex items-end gap-2 h-40">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            className="flex-1"
            height={`${Math.random() * 60 + 40}%`}
          />
        ))}
      </div>
    </div>
  );
}

// Full Page Skeleton (Dashboard)
export function DashboardSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton variant="text" width={120} height={14} />
          <Skeleton variant="text" width={180} height={28} className="mt-1" />
        </div>
        <SkeletonAvatar size={44} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>

      {/* Chart */}
      <SkeletonChart />

      {/* Recent Activity */}
      <div>
        <Skeleton variant="text" width={140} height={18} className="mb-3" />
        <div className="space-y-3">
          <SkeletonListItem />
          <SkeletonListItem />
          <SkeletonListItem />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;

