'use client';

import { useState } from 'react';
import { useIncomes } from '@/lib/hooks/useIncomes';
import { calculateTax } from '@/lib/utils/tax-calculator';
import { formatCurrency, formatDate, getCategoryLabel } from '@/lib/utils/formatters';

export default function HistoryPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];

  const { incomes, isLoading } = useIncomes({ sortBy: 'date', sortOrder: 'desc' });

  // Filter by selected year
  const yearIncomes = incomes.filter(
    (i) => new Date(i.date).getFullYear() === selectedYear
  );

  // Group by month
  const monthlyData = groupByMonth(yearIncomes);

  // Calculate yearly totals
  const yearlyTotal = yearIncomes.reduce((sum, i) => sum + i.amount, 0);
  const taxableTotal = yearIncomes.filter((i) => i.taxable).reduce((sum, i) => sum + i.amount, 0);
  const taxResult = calculateTax(taxableTotal);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto px-4 pt-safe pb-5">
          <div className="pt-3">
            <p className="text-slate-400 text-xs font-medium">Tax Records</p>
            <h1 className="text-xl font-bold mt-0.5">History</h1>
          </div>

          {/* Year Tabs */}
          <div className="mt-4 flex gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedYear === year
                    ? 'bg-white text-slate-900'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }
                `}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24">
        {/* Year Summary */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">{selectedYear} Total Income</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 number-display">{formatCurrency(yearlyTotal)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Taxable Income</p>
              <p className="text-base font-bold text-slate-800 number-display">{formatCurrency(taxableTotal, { compact: true })}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Estimated Tax</p>
              <p className="text-base font-bold text-amber-600 number-display">{formatCurrency(taxResult.totalTax, { compact: true })}</p>
            </div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="mt-6">
          <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Monthly Breakdown</h2>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-white rounded-xl animate-pulse border border-slate-100" />
              ))}
            </div>
          ) : monthlyData.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
              <div className="w-14 h-14 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium mt-4">No records for {selectedYear}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {monthlyData.map((month) => (
                <MonthCard key={month.month} data={month} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface MonthData {
  month: string;
  monthNum: number;
  total: number;
  count: number;
  incomes: Array<{
    id: string;
    source: string;
    amount: number;
    category: string;
    date: Date;
  }>;
}

function groupByMonth(incomes: Array<{ id: string; source: string; amount: number; category: string; date: Date; taxable: boolean }>): MonthData[] {
  const months: Record<string, MonthData> = {};
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  incomes.forEach((income) => {
    const date = new Date(income.date);
    const monthNum = date.getMonth();
    const monthKey = `${monthNum}`;

    if (!months[monthKey]) {
      months[monthKey] = {
        month: monthNames[monthNum],
        monthNum,
        total: 0,
        count: 0,
        incomes: [],
      };
    }

    months[monthKey].total += income.amount;
    months[monthKey].count += 1;
    months[monthKey].incomes.push(income);
  });

  return Object.values(months).sort((a, b) => b.monthNum - a.monthNum);
}

function MonthCard({ data }: { data: MonthData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-semibold text-slate-800 text-sm">{data.month}</p>
            <p className="text-xs text-slate-500">{data.count} {data.count === 1 ? 'entry' : 'entries'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 text-sm number-display">{formatCurrency(data.total, { compact: true })}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-slate-100 px-4 py-3 space-y-2 bg-slate-50">
          {data.incomes.map((income) => (
            <div key={income.id} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg">
              <div>
                <p className="text-xs font-medium text-slate-800">{income.source}</p>
                <p className="text-[10px] text-slate-500">
                  {getCategoryLabel(income.category)} • {formatDate(income.date, 'short')}
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 number-display">{formatCurrency(income.amount, { compact: true })}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
