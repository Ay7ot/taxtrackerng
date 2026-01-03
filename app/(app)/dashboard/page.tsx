'use client';

import { useAuth } from '@/lib/auth-context';
import { useIncomeStats } from '@/lib/hooks/useIncomes';
import { calculateTax } from '@/lib/utils/tax-calculator';
import { formatCurrency, formatDate, getGreeting, getCategoryLabel } from '@/lib/utils/formatters';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const {
    isLoading,
    totalThisMonth,
    totalThisYear,
    taxableThisYear,
    monthlyChange,
    recentIncomes
  } = useIncomeStats();

  const taxResult = calculateTax(taxableThisYear);
  const displayName = userProfile?.name || user?.displayName || 'there';
  const firstName = displayName.split(' ')[0];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto px-4 pt-safe pb-6">
          {/* Top Bar */}
          <div className="pt-3 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium">{getGreeting()}</p>
              <h1 className="text-xl font-bold mt-0.5">Hi, {firstName}! 👋</h1>
            </div>
            <Link href="/profile">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-600/30">
                {firstName.charAt(0).toUpperCase()}
              </div>
            </Link>
          </div>

          {/* Main Stat Card */}
          <div className="mt-5 bg-white/10 backdrop-blur rounded-2xl p-4">
            <p className="text-slate-400 text-xs font-medium">Total Income This Year</p>
            <p className="text-3xl font-bold mt-1 tracking-tight number-display">{formatCurrency(totalThisYear)}</p>

            {/* Stats Row */}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Taxable</p>
                  <p className="text-xs font-semibold text-white">{formatCurrency(taxableThisYear, { compact: true })}</p>
                </div>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Est. Tax</p>
                  <p className="text-xs font-semibold text-white">{formatCurrency(taxResult.totalTax, { compact: true })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple rounded bottom */}
        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 -mt-2">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="This Month"
            value={formatCurrency(totalThisMonth, { compact: true })}
            change={monthlyChange}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            }
            color="blue"
          />
          <StatCard
            label="Tax Rate"
            value={`${(taxResult.effectiveRate * 100).toFixed(1)}%`}
            subtitle={`${formatCurrency(taxResult.totalTax, { compact: true })} tax`}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 6l-9.5 9.5-5-5L1 18" />
                <path d="M17 6h6v6" />
              </svg>
            }
            color="amber"
          />
        </div>

        {/* Quick Actions */}
        <section className="mt-6">
          <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-2">
            <QuickAction href="/income/add" icon="plus" label="Add" color="blue" />
            <QuickAction href="/calculator" icon="calc" label="Calculate" color="emerald" />
            <QuickAction href="/history" icon="history" label="History" color="violet" />
            <QuickAction href="/income" icon="list" label="Income" color="amber" />
          </div>
        </section>

        {/* Tax Bracket Card */}
        <section className="mt-6">
          <div className="bg-blue-600 rounded-2xl p-5 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="text-[11px] font-medium text-blue-100 uppercase tracking-wider">Current Bracket</span>
                </div>
                <p className="text-2xl font-bold">
                  {taxResult.taxableIncome <= 800000
                    ? '0%'
                    : taxResult.taxableIncome <= 3000000
                      ? '15%'
                      : taxResult.taxableIncome <= 12000000
                        ? '18%'
                        : taxResult.taxableIncome <= 25000000
                          ? '21%'
                          : taxResult.taxableIncome <= 50000000
                            ? '23%'
                            : '25%'}
                  <span className="text-sm font-normal text-blue-200 ml-1.5">
                    {taxResult.taxableIncome <= 800000 ? 'Tax Free' : 'Rate'}
                  </span>
                </p>
                <p className="text-blue-100 text-sm mt-2">
                  Net: {formatCurrency(taxResult.netIncome, { compact: true })}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 6l-9.5 9.5-5-5L1 18" />
                  <path d="M17 6h6v6" />
                </svg>
              </div>
            </div>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-white hover:text-blue-100 transition-colors"
            >
              View breakdown
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Recent Income */}
        <section className="mt-6 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Recent Activity</h2>
            {recentIncomes.length > 0 && (
              <Link href="/income" className="text-xs font-semibold text-blue-600">
                View all →
              </Link>
            )}
          </div>

          {recentIncomes.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
              <div className="w-14 h-14 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                  <path d="M21 12V7H5a2 2 0 010-4h14v4" />
                  <path d="M3 5v14a2 2 0 002 2h16v-5" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium mt-4">No income yet</p>
              <p className="text-slate-400 text-sm mt-1">Start tracking your income</p>
              <Link
                href="/income/add"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Income
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recentIncomes.map((income, index) => (
                <IncomeItem key={income.id} income={income} index={index} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
  change,
  icon,
  color,
}: {
  label: string;
  value: string;
  subtitle?: string;
  change?: number;
  icon: React.ReactNode;
  color: 'blue' | 'amber' | 'emerald';
}) {
  const colorConfig = {
    blue: { iconBg: 'bg-blue-600', shadow: 'shadow-blue-600/20' },
    amber: { iconBg: 'bg-amber-500', shadow: 'shadow-amber-500/20' },
    emerald: { iconBg: 'bg-emerald-500', shadow: 'shadow-emerald-500/20' },
  };

  const config = colorConfig[color];

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${config.iconBg} shadow-md ${config.shadow}`}>
          {icon}
        </div>
      </div>
      <p className="text-xl font-bold text-slate-900 number-display">{value}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      {change !== undefined && change !== 0 && (
        <div className={`inline-flex items-center gap-1 mt-2 text-[10px] font-semibold ${change > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {change > 0 ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
          </svg>
          {Math.abs(Math.round(change))}% vs last month
        </div>
      )}
    </div>
  );
}

function QuickAction({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: 'plus' | 'calc' | 'history' | 'list';
  label: string;
  color: 'blue' | 'emerald' | 'violet' | 'amber';
}) {
  const colorConfig = {
    blue: 'bg-blue-600 shadow-blue-600/30',
    emerald: 'bg-emerald-600 shadow-emerald-600/30',
    violet: 'bg-violet-600 shadow-violet-600/30',
    amber: 'bg-amber-500 shadow-amber-500/30',
  };

  const icons = {
    plus: <path d="M12 5v14M5 12h14" />,
    calc: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h8M8 14h4" /></>,
    history: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>,
  };

  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 py-3 rounded-xl bg-white border border-slate-100 active:scale-95 transition-transform"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${colorConfig[color]}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icons[icon]}
        </svg>
      </div>
      <span className="text-[10px] font-semibold text-slate-600">{label}</span>
    </Link>
  );
}

function IncomeItem({ income, index }: { income: { id: string; source: string; amount: number; category: string; date: Date }; index: number }) {
  const bgColors = ['bg-amber-50', 'bg-emerald-50', 'bg-violet-50', 'bg-blue-50'];
  const iconColors = ['text-amber-600', 'text-emerald-600', 'text-violet-600', 'text-blue-600'];

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${bgColors[index % 4]}`}>
      <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${iconColors[index % 4]}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12V7H5a2 2 0 010-4h14v4" />
          <path d="M3 5v14a2 2 0 002 2h16v-5" />
          <path d="M18 12a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 text-sm truncate">{income.source}</p>
        <p className="text-xs text-slate-500">{getCategoryLabel(income.category)} • {formatDate(income.date, 'relative')}</p>
      </div>
      <p className="font-bold text-slate-800 text-sm number-display">{formatCurrency(income.amount, { compact: true })}</p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto px-4 pt-safe pb-6">
          <div className="pt-3 flex items-center justify-between">
            <div>
              <div className="h-3 w-20 bg-slate-700 rounded animate-pulse" />
              <div className="h-6 w-32 bg-slate-700 rounded mt-2 animate-pulse" />
            </div>
            <div className="w-10 h-10 bg-slate-700 rounded-full animate-pulse" />
          </div>
          <div className="mt-5 h-32 bg-slate-800 rounded-2xl animate-pulse" />
        </div>
        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </div>
      <div className="max-w-2xl mx-auto px-4 -mt-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="h-24 bg-white rounded-2xl animate-pulse" />
          <div className="h-24 bg-white rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
