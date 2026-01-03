'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../auth-context';
import type { Income, IncomeFormData, IncomeFilters } from '../types';

export function useIncomes(filters?: IncomeFilters) {
  const { user } = useAuth();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to incomes
  useEffect(() => {
    if (!user) {
      setIncomes([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const incomesRef = collection(db, 'users', user.uid, 'incomes');
    let q = query(incomesRef, orderBy('date', 'desc'));

    // Apply category filter if provided
    if (filters?.category) {
      q = query(incomesRef, where('category', '==', filters.category), orderBy('date', 'desc'));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const incomesData: Income[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: user.uid,
            amount: data.amount,
            source: data.source,
            category: data.category,
            date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
            taxable: data.taxable,
            notes: data.notes,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
            updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(),
          } as Income;
        });

        // Apply additional filters
        let filtered = incomesData;

        if (filters?.dateFrom) {
          filtered = filtered.filter((i) => i.date >= filters.dateFrom!);
        }
        if (filters?.dateTo) {
          filtered = filtered.filter((i) => i.date <= filters.dateTo!);
        }
        if (filters?.searchQuery) {
          const search = filters.searchQuery.toLowerCase();
          filtered = filtered.filter(
            (i) =>
              i.source.toLowerCase().includes(search) ||
              i.notes?.toLowerCase().includes(search)
          );
        }

        // Sort
        if (filters?.sortBy === 'amount') {
          filtered.sort((a, b) =>
            filters.sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
          );
        }

        setIncomes(filtered);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching incomes:', err);
        setError('Failed to load incomes');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, filters?.category, filters?.dateFrom, filters?.dateTo, filters?.searchQuery, filters?.sortBy, filters?.sortOrder]);

  // Add income
  const addIncome = useCallback(
    async (data: IncomeFormData) => {
      if (!user) throw new Error('Not authenticated');

      const incomesRef = collection(db, 'users', user.uid, 'incomes');
      await addDoc(incomesRef, {
        ...data,
        date: Timestamp.fromDate(data.date),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    },
    [user]
  );

  // Update income
  const updateIncome = useCallback(
    async (id: string, data: Partial<IncomeFormData>) => {
      if (!user) throw new Error('Not authenticated');

      const incomeRef = doc(db, 'users', user.uid, 'incomes', id);
      await updateDoc(incomeRef, {
        ...data,
        ...(data.date && { date: Timestamp.fromDate(data.date) }),
        updatedAt: serverTimestamp(),
      });
    },
    [user]
  );

  // Delete income
  const deleteIncome = useCallback(
    async (id: string) => {
      if (!user) throw new Error('Not authenticated');

      const incomeRef = doc(db, 'users', user.uid, 'incomes', id);
      await deleteDoc(incomeRef);
    },
    [user]
  );

  return {
    incomes,
    isLoading,
    error,
    addIncome,
    updateIncome,
    deleteIncome,
  };
}

// Hook for dashboard stats
export function useIncomeStats() {
  const { incomes, isLoading } = useIncomes();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const thisMonthIncomes = incomes.filter((i) => i.date >= startOfMonth);
  const thisYearIncomes = incomes.filter((i) => i.date >= startOfYear);

  const totalThisMonth = thisMonthIncomes.reduce((sum, i) => sum + i.amount, 0);
  const totalThisYear = thisYearIncomes.reduce((sum, i) => sum + i.amount, 0);
  const taxableThisYear = thisYearIncomes
    .filter((i) => i.taxable)
    .reduce((sum, i) => sum + i.amount, 0);

  // Calculate last month for comparison
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  const lastMonthIncomes = incomes.filter(
    (i) => i.date >= startOfLastMonth && i.date <= endOfLastMonth
  );
  const totalLastMonth = lastMonthIncomes.reduce((sum, i) => sum + i.amount, 0);

  const monthlyChange = totalLastMonth > 0
    ? ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100
    : totalThisMonth > 0 ? 100 : 0;

  return {
    isLoading,
    totalThisMonth,
    totalThisYear,
    taxableThisYear,
    monthlyChange,
    incomeCount: incomes.length,
    recentIncomes: incomes.slice(0, 5),
  };
}

export default useIncomes;

