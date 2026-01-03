'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useIncomes } from '@/lib/hooks/useIncomes';
import { formatCurrency, formatDate, getCategoryLabel } from '@/lib/utils/formatters';
import { useToast } from '@/components/ui/toast';
import type { IncomeCategory, Income } from '@/lib/types';

const categoryOptions = [
  { value: '', label: 'All' },
  { value: 'salary', label: 'Salary' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'business', label: 'Business' },
  { value: 'gig', label: 'Gig' },
  { value: 'investment', label: 'Investment' },
  { value: 'other', label: 'Other' },
];

export default function IncomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<IncomeCategory | ''>('');
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { success, error: showError } = useToast();
  const { incomes, isLoading, deleteIncome } = useIncomes({
    category: categoryFilter || undefined,
    searchQuery: searchQuery || undefined,
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

  const handleDelete = async () => {
    if (!selectedIncome) return;
    setIsDeleting(true);
    try {
      await deleteIncome(selectedIncome.id);
      success('Deleted', 'Income entry removed.');
      setShowDeleteModal(false);
      setSelectedIncome(null);
    } catch (err) {
      showError('Error', 'Failed to delete.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto px-4 pt-safe pb-4">
          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium">Income Records</p>
              <h1 className="text-xl font-bold mt-0.5">All Income</h1>
              <p className="text-slate-400 text-xs mt-1">
                {incomes.length} entries • {formatCurrency(totalIncome, { compact: true })}
              </p>
            </div>
            <Link
              href="/income/add"
              className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Link>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search income..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/10 text-white placeholder:text-slate-400 border-none focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            {categoryOptions.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value as IncomeCategory | '')}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors
                  ${categoryFilter === cat.value
                    ? 'bg-white text-slate-900'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-18 bg-white rounded-xl animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : incomes.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
            <div className="w-14 h-14 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                <path d="M21 12V7H5a2 2 0 010-4h14v4" />
                <path d="M3 5v14a2 2 0 002 2h16v-5" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 mt-4">
              {searchQuery || categoryFilter ? 'No results found' : 'No income yet'}
            </h3>
            <p className="text-slate-500 mt-1 text-sm">
              {searchQuery || categoryFilter ? 'Try adjusting your filters' : 'Start tracking your income'}
            </p>
            {!searchQuery && !categoryFilter && (
              <Link
                href="/income/add"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Income
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {incomes.map((income, index) => (
              <IncomeItem
                key={income.id}
                income={income}
                index={index}
                onDelete={() => {
                  setSelectedIncome(income);
                  setShowDeleteModal(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Delete Income?</h3>
            <p className="text-slate-500 mt-2 text-sm">
              Are you sure you want to delete &quot;{selectedIncome?.source}&quot;?
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 h-11 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 h-11 rounded-xl font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function IncomeItem({
  income,
  index,
  onDelete,
}: {
  income: Income;
  index: number;
  onDelete: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const bgColors = ['bg-amber-50', 'bg-emerald-50', 'bg-violet-50', 'bg-blue-50'];
  const iconColors = ['text-amber-600', 'text-emerald-600', 'text-violet-600', 'text-blue-600'];

  return (
    <div className={`relative flex items-center gap-3 p-3 rounded-xl ${bgColors[index % 4]}`}>
      <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${iconColors[index % 4]}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12V7H5a2 2 0 010-4h14v4" />
          <path d="M3 5v14a2 2 0 002 2h16v-5" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 text-sm truncate">{income.source}</p>
        <p className="text-xs text-slate-500">
          {getCategoryLabel(income.category)} • {formatDate(income.date, 'short')}
          {!income.taxable && <span className="ml-1 text-[10px] bg-white/80 px-1 py-0.5 rounded">Non-tax</span>}
        </p>
      </div>
      <p className="font-bold text-slate-800 text-sm shrink-0 number-display">{formatCurrency(income.amount, { compact: true })}</p>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-lg hover:bg-black/5"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
          <div className="absolute right-4 top-12 z-20 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden min-w-[100px]">
            <button
              onClick={() => {
                setShowMenu(false);
                onDelete();
              }}
              className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
