'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'hide-amounts';

type PrivacyContextType = {
  hideAmounts: boolean;
  toggleHideAmounts: () => void;
  setHideAmounts: (value: boolean) => void;
};

const PrivacyContext = createContext<PrivacyContextType | null>(null);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [hideAmounts, setHideAmountsState] = useState(false);

  useEffect(() => {
    setHideAmountsState(localStorage.getItem(STORAGE_KEY) === 'true');
  }, []);

  const setHideAmounts = useCallback((value: boolean) => {
    setHideAmountsState(value);
    localStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  const toggleHideAmounts = useCallback(() => {
    setHideAmountsState((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return (
    <PrivacyContext.Provider value={{ hideAmounts, toggleHideAmounts, setHideAmounts }}>
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within PrivacyProvider');
  }
  return context;
}
