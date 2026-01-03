'use client';

import { useEffect, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { IconButton } from './button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) {
  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-full mx-4',
  };

  const content = (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 modal-overlay animate-fadeIn"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        className={clsx(
          'relative w-full bg-white',
          'rounded-[var(--radius-2xl)]',
          'shadow-[var(--shadow-xl)]',
          'max-h-[85vh] overflow-y-auto',
          'animate-scaleIn',
          sizes[size]
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="sticky top-0 bg-white p-5 pb-0 flex items-start justify-between gap-4">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="text-page-header text-[var(--color-text-primary)]"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="text-body-secondary mt-1"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <IconButton
                icon={<X size={20} />}
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Close modal"
              />
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );

  // Use portal to render modal at document body
  if (typeof window !== 'undefined') {
    return createPortal(content, document.body);
  }

  return null;
}

// Confirmation Modal
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center">
        {/* Icon */}
        <div
          className={clsx(
            'w-16 h-16 mx-auto rounded-full flex items-center justify-center',
            variant === 'danger' ? 'bg-[var(--color-error-light)]' : 'bg-[var(--color-primary)]/10'
          )}
        >
          {variant === 'danger' ? (
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-error)"
              strokeWidth="2"
            >
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          )}
        </div>

        {/* Text */}
        <h3 className="text-section-header mt-4">{title}</h3>
        <p className="text-body-secondary mt-2">{message}</p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className={clsx(
              'flex-1 h-12 px-6 rounded-full font-semibold',
              'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]',
              'transition-colors hover:bg-[var(--color-border-light)]',
              'disabled:opacity-50'
            )}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={clsx(
              'flex-1 h-12 px-6 rounded-full font-semibold text-white',
              'transition-colors',
              variant === 'danger'
                ? 'bg-[var(--color-error)] hover:bg-[#DC2626]'
                : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]',
              'disabled:opacity-50'
            )}
          >
            {isLoading ? 'Loading...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Bottom Sheet Modal (for mobile)
export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function BottomSheet({ isOpen, onClose, children, title }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[var(--z-modal)]">
      {/* Overlay */}
      <div
        className="absolute inset-0 modal-overlay animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className={clsx(
          'absolute bottom-0 left-0 right-0',
          'bg-white rounded-t-[var(--radius-2xl)]',
          'max-h-[85vh] overflow-y-auto',
          'animate-slideUp',
          'pb-safe'
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-[var(--color-border-medium)]" />
        </div>

        {/* Title */}
        {title && (
          <div className="px-5 pb-4 border-b border-[var(--color-border-light)]">
            <h3 className="text-section-header text-center">{title}</h3>
          </div>
        )}

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(content, document.body);
  }

  return null;
}

export default Modal;

