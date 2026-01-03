"use client";

import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallState {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isStandalone: boolean;
  hasPromptBeenShown: boolean;
}

const PROMPT_DISMISSED_KEY = 'pwa-install-dismissed';
const PROMPT_DISMISSED_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [state, setState] = useState<PWAInstallState>({
    isInstallable: false,
    isInstalled: false,
    isIOS: false,
    isStandalone: false,
    hasPromptBeenShown: false,
  });

  // Check if running in standalone mode (already installed)
  const checkStandalone = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://')
    );
  }, []);

  // Check if iOS device
  const checkIOS = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
  }, []);

  // Check if prompt was recently dismissed
  const wasPromptDismissed = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    const dismissedAt = localStorage.getItem(PROMPT_DISMISSED_KEY);
    if (!dismissedAt) return false;
    
    const dismissedTime = parseInt(dismissedAt, 10);
    const now = Date.now();
    
    // If dismissed more than 7 days ago, allow showing again
    if (now - dismissedTime > PROMPT_DISMISSED_EXPIRY) {
      localStorage.removeItem(PROMPT_DISMISSED_KEY);
      return false;
    }
    
    return true;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isStandalone = checkStandalone();
    const isIOS = checkIOS();
    const hasPromptBeenShown = wasPromptDismissed();

    setState(prev => ({
      ...prev,
      isStandalone,
      isInstalled: isStandalone,
      isIOS,
      hasPromptBeenShown,
    }));

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      setState(prev => ({
        ...prev,
        isInstallable: true,
      }));
    };

    // Handle app installed event
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setState(prev => ({
        ...prev,
        isInstallable: false,
        isInstalled: true,
      }));
      
      // Clear any dismissed state
      localStorage.removeItem(PROMPT_DISMISSED_KEY);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [checkStandalone, checkIOS, wasPromptDismissed]);

  // Trigger the install prompt
  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) {
      return { outcome: 'dismissed' as const, error: 'No prompt available' };
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
        setState(prev => ({
          ...prev,
          isInstallable: false,
          isInstalled: true,
        }));
      }
      
      return { outcome: choiceResult.outcome };
    } catch (error) {
      console.error('Error prompting install:', error);
      return { outcome: 'dismissed' as const, error: String(error) };
    }
  }, [deferredPrompt]);

  // Dismiss the prompt (user doesn't want to install now)
  const dismissPrompt = useCallback(() => {
    localStorage.setItem(PROMPT_DISMISSED_KEY, Date.now().toString());
    setState(prev => ({
      ...prev,
      hasPromptBeenShown: true,
    }));
  }, []);

  // Should we show the install prompt?
  const shouldShowPrompt = !state.isInstalled && 
                          !state.isStandalone && 
                          !state.hasPromptBeenShown && 
                          (state.isInstallable || state.isIOS);

  return {
    ...state,
    promptInstall,
    dismissPrompt,
    shouldShowPrompt,
    canPrompt: !!deferredPrompt,
  };
}

