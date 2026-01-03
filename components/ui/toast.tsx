'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import type { Toast, ToastType } from '@/lib/types';

// Toast Context
interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

// Toast Provider
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: Toast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    const duration = toast.duration || 4000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (title: string, message?: string) => {
      addToast({ type: 'success', title, message });
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, message?: string) => {
      addToast({ type: 'error', title, message, duration: 6000 });
    },
    [addToast]
  );

  const warning = useCallback(
    (title: string, message?: string) => {
      addToast({ type: 'warning', title, message });
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, message?: string) => {
      addToast({ type: 'info', title, message });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Toast Container
interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  if (typeof window === 'undefined' || toasts.length === 0) return null;

  return createPortal(
    <div
      className={clsx(
        'fixed top-0 left-0 right-0 z-[var(--z-toast)]',
        'flex flex-col items-center gap-2',
        'p-4 pt-safe pointer-events-none'
      )}
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>,
    document.body
  );
}

// Individual Toast Item
interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const icons: Record<ToastType, ReactNode> = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  const colors: Record<ToastType, string> = {
    success: 'bg-[var(--color-success)]',
    error: 'bg-[var(--color-error)]',
    warning: 'bg-[var(--color-warning)]',
    info: 'bg-[var(--color-info)]',
  };

  return (
    <div
      role="alert"
      className={clsx(
        'w-full max-w-md pointer-events-auto',
        'bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]',
        'flex items-start gap-3 p-4',
        'animate-slideDown'
      )}
      style={{
        animation: 'toastSlideIn 0.3s var(--ease-out)',
      }}
    >
      {/* Icon */}
      <div
        className={clsx(
          'shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white',
          colors[toast.type]
        )}
      >
        {icons[toast.type]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[var(--color-text-primary)]">{toast.title}</p>
        {toast.message && (
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
            {toast.message}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="shrink-0 p-1 rounded-full text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default ToastProvider;

