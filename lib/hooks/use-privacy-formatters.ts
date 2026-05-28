'use client';

import { useMemo } from 'react';
import { usePrivacy } from '@/lib/privacy-context';
import {
  formatCurrency,
  formatPercentage,
  maskCurrency,
  maskPercentage,
} from '@/lib/utils/formatters';

export function usePrivacyFormatters() {
  const { hideAmounts } = usePrivacy();

  return useMemo(
    () => ({
      hideAmounts,
      formatCurrency: (
        amount: number | undefined | null,
        options?: Parameters<typeof formatCurrency>[1]
      ) => (hideAmounts ? maskCurrency(options?.showSymbol !== false) : formatCurrency(amount, options)),
      formatPercentage: (value: number, decimals?: number) =>
        hideAmounts ? maskPercentage() : formatPercentage(value, decimals),
    }),
    [hideAmounts]
  );
}
