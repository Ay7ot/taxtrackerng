'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIncomes } from '@/lib/hooks/useIncomes';
import { useToast } from '@/components/ui/toast';
import type { IncomeCategory, IncomeFormData } from '@/lib/types';

const categoryOptions = [
  { value: 'salary', label: 'Salary', icon: '💼' },
  { value: 'freelance', label: 'Freelance', icon: '💻' },
  { value: 'business', label: 'Business', icon: '🏢' },
  { value: 'gig', label: 'Gig Work', icon: '🚗' },
  { value: 'investment', label: 'Investment', icon: '📈' },
  { value: 'other', label: 'Other', icon: '📦' },
];

export default function AddIncomePage() {
  const router = useRouter();
  const { addIncome } = useIncomes();
  const { success, error: showError } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<IncomeFormData>({
    amount: 0,
    source: '',
    category: 'salary',
    date: new Date(),
    taxable: true,
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof IncomeFormData, string>>>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.source.trim()) {
      newErrors.source = 'Source is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await addIncome(formData);
      success('Income Added', `${formData.source} has been recorded.`);
      router.push('/income');
    } catch (err) {
      console.error('Add income error:', err);
      showError('Failed to Add', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto px-4 pt-safe pb-5">
          <div className="pt-3 flex items-center gap-3">
            <Link
              href="/income"
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-bold">Add Income</h1>
              <p className="text-slate-400 text-xs">Record a new entry</p>
            </div>
          </div>
        </div>
        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </header>

      {/* Form */}
      <main className="max-w-2xl mx-auto px-4 pb-24">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">₦</span>
              <input
                type="text"
                inputMode="numeric"
                value={formData.amount ? formData.amount.toLocaleString('en-NG') : ''}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({ ...formData, amount: parseInt(rawValue, 10) || 0 });
                }}
                placeholder="0"
                className={`
                  w-full h-16 pl-12 pr-4 rounded-xl
                  text-3xl font-bold text-slate-900
                  bg-slate-50 border-2 transition-all
                  placeholder:text-slate-300 number-display
                  focus:outline-none focus:bg-white focus:border-blue-500
                  ${errors.amount ? 'border-red-300 bg-red-50' : 'border-slate-200'}
                `}
              />
            </div>
            {errors.amount && (
              <p className="mt-2 text-xs text-red-600">{errors.amount}</p>
            )}
          </div>

          {/* Source */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Source
            </label>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              placeholder="e.g., Company Name, Client"
              className={`
                w-full h-12 px-4 rounded-xl text-slate-900
                bg-slate-50 border-2 transition-all
                placeholder:text-slate-400
                focus:outline-none focus:bg-white focus:border-blue-500
                ${errors.source ? 'border-red-300 bg-red-50' : 'border-slate-200'}
              `}
            />
            {errors.source && (
              <p className="mt-2 text-xs text-red-600">{errors.source}</p>
            )}
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.value as IncomeCategory })}
                  className={`
                    p-3 rounded-xl text-center transition-all
                    ${formData.category === cat.value
                      ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                      : 'bg-slate-50 border-2 border-transparent text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  <span className="text-xl block mb-1">{cat.icon}</span>
                  <span className="text-[10px] font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Date Received
            </label>
            <input
              type="date"
              value={formData.date.toISOString().split('T')[0]}
              onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
              max={new Date().toISOString().split('T')[0]}
              className="w-full h-12 px-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          {/* Taxable Toggle */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 text-sm">Taxable Income</p>
                <p className="text-xs text-slate-500">Include in tax calculations</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, taxable: !formData.taxable })}
                className={`
                  relative w-12 h-7 rounded-full transition-colors
                  ${formData.taxable ? 'bg-blue-600' : 'bg-slate-300'}
                `}
              >
                <span
                  className={`
                    absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform
                    ${formData.taxable ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional details..."
              rows={3}
              className="w-full p-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full h-14 rounded-xl font-semibold text-white
              bg-blue-600 hover:bg-blue-700
              shadow-lg shadow-blue-600/25
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              active:scale-[0.98]
              flex items-center justify-center gap-2
            "
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Income
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
