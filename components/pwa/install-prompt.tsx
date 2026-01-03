"use client";

import { useState, useEffect } from 'react';
import { usePWAInstall } from '@/lib/hooks/use-pwa-install';

export function InstallPrompt() {
  const { 
    shouldShowPrompt, 
    isIOS, 
    canPrompt, 
    promptInstall, 
    dismissPrompt 
  } = usePWAInstall();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Delay showing the prompt for better UX (let user explore first)
    if (shouldShowPrompt) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Show after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [shouldShowPrompt]);

  const handleInstall = async () => {
    if (canPrompt) {
      const result = await promptInstall();
      if (result.outcome === 'accepted') {
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimatingOut(false);
      dismissPrompt();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-sm transition-all duration-300 ${
        isAnimatingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
      style={{ animation: isAnimatingOut ? 'none' : 'slideUp 0.3s ease-out' }}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Install TaxTracker</h3>
              <p className="text-blue-100 text-xs">Add to your home screen</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close install prompt"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {isIOS ? (
            // iOS-specific instructions
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                To install this app on your iPhone:
              </p>
              <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">1</span>
                </div>
                <p className="text-sm text-slate-700">
                  Tap the <strong>Share</strong> button 
                  <span className="inline-flex items-center mx-1 px-1.5 py-0.5 bg-slate-200 rounded">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </span>
                  at the bottom
                </p>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">2</span>
                </div>
                <p className="text-sm text-slate-700">
                  Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors text-sm"
              >
                Got it
              </button>
            </div>
          ) : (
            // Android/Desktop with native prompt
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Works offline</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Faster loading</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Full screen experience</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleClose}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors text-sm"
                >
                  Not now
                </button>
                <button
                  onClick={handleInstall}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Install
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

