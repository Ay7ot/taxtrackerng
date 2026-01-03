'use client';

import { useState } from 'react';
import { calculateTax, TAX_BANDS } from '@/lib/utils/tax-calculator';
import { formatCurrency } from '@/lib/utils/formatters';

export default function CalculatorPage() {
  const [income, setIncome] = useState<number>(0);
  const [deductions, setDeductions] = useState({
    annualRent: 0,
    pension: 0,
    nhf: 0,
    nhis: 0,
    lifeInsurance: 0,
  });
  const [showDeductions, setShowDeductions] = useState(false);

  const rentRelief = Math.min(deductions.annualRent * 0.2, 500000);
  const totalDeductions = rentRelief + deductions.pension + deductions.nhf + deductions.nhis + deductions.lifeInsurance;

  // Map calculator deductions to the expected format
  const deductionData = {
    pensionContributions: deductions.pension,
    nhfContributions: deductions.nhf,
    nhisContributions: deductions.nhis,
    lifeInsurance: deductions.lifeInsurance,
    annualRent: deductions.annualRent,
    mortgageInterest: 0, // Not used in this simplified calculator
  };

  const result = calculateTax(income, deductionData);

  const deductionItems = [
    { key: 'annualRent', label: 'Annual Rent', hint: '20% relief, max ₦500k', icon: '🏢' },
    { key: 'pension', label: 'Pension', hint: '8% of basic', icon: '🏦' },
    { key: 'nhf', label: 'NHF', hint: '2.5% of basic', icon: '🏠' },
    { key: 'nhis', label: 'NHIS', hint: 'Health insurance', icon: '🏥' },
    { key: 'lifeInsurance', label: 'Life Insurance', hint: 'Annual premium', icon: '🛡️' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto px-4 pt-safe pb-6">
          <div className="pt-3">
            <p className="text-slate-400 text-xs font-medium">Nigerian Tax Act 2026</p>
            <h1 className="text-xl font-bold mt-0.5">Tax Calculator</h1>
          </div>
        </div>
        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24">
        {/* Income Input */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Annual Gross Income
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">₦</span>
            <input
              type="text"
              inputMode="numeric"
              value={income ? income.toLocaleString('en-NG') : ''}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/[^0-9]/g, '');
                setIncome(parseInt(rawValue, 10) || 0);
              }}
              placeholder="0"
              className="w-full h-16 pl-12 pr-4 rounded-xl text-3xl font-bold text-slate-900 bg-slate-50 border-2 border-slate-200 focus:outline-none focus:bg-white focus:border-blue-500 placeholder:text-slate-300 number-display"
            />
          </div>
        </div>

        {/* Deductions Toggle */}
        <button
          onClick={() => setShowDeductions(!showDeductions)}
          className="w-full mt-4 bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-800 text-sm">Deductions</p>
              <p className="text-xs text-slate-500">
                {totalDeductions > 0 ? formatCurrency(totalDeductions, { compact: true }) : 'Add deductible amounts'}
              </p>
            </div>
          </div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            className={`transition-transform ${showDeductions ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Deductions Form */}
        {showDeductions && (
          <div className="mt-2 bg-white rounded-2xl p-5 border border-slate-100 space-y-4">
            {deductionItems.map((item) => (
              <div key={item.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                  <span className="text-xs text-slate-400">{item.hint}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₦</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={deductions[item.key as keyof typeof deductions] || ''}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, '');
                      setDeductions({
                        ...deductions,
                        [item.key]: parseInt(rawValue, 10) || 0,
                      });
                    }}
                    placeholder="0"
                    className="w-full h-11 pl-8 pr-4 rounded-lg text-slate-900 bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white focus:border-violet-500 placeholder:text-slate-300 number-display"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {income > 0 && (
          <div className="mt-6 space-y-4">
            {/* Main Result Card */}
            <div className="bg-emerald-600 rounded-2xl p-5 text-white">
              <p className="text-emerald-100 text-xs font-medium uppercase tracking-wider">Estimated Annual Tax</p>
              <p className="text-3xl font-bold mt-1 number-display">{formatCurrency(result.totalTax)}</p>
              <div className="flex gap-4 mt-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-emerald-100 text-[10px] uppercase tracking-wider">Effective Rate</p>
                  <p className="text-lg font-bold">{(result.effectiveRate * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-emerald-100 text-[10px] uppercase tracking-wider">Monthly Tax</p>
                  <p className="text-lg font-bold number-display">{formatCurrency(result.totalTax / 12, { compact: true })}</p>
                </div>
              </div>
            </div>

            {/* Income Breakdown */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100">
              <h3 className="font-semibold text-slate-800 text-sm mb-4">Income Breakdown</h3>
              <div className="space-y-3">
                <Row label="Gross Income" value={formatCurrency(result.grossIncome)} />
                <Row label="Total Deductions" value={`- ${formatCurrency(totalDeductions)}`} muted />
                <div className="h-px bg-slate-100 my-2" />
                <Row label="Taxable Income" value={formatCurrency(result.taxableIncome)} bold />
              </div>
            </div>

            {/* Tax Bands Applied */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100">
              <h3 className="font-semibold text-slate-800 text-sm mb-4">Tax Bands Applied</h3>
              <div className="space-y-2">
                {result.taxBreakdown.map((breakdownItem, i) => {
                  const colors = ['bg-emerald-100 text-emerald-700', 'bg-blue-100 text-blue-700', 'bg-violet-100 text-violet-700', 'bg-amber-100 text-amber-700', 'bg-orange-100 text-orange-700', 'bg-red-100 text-red-700'];
                  const colorIndex = breakdownItem.band.rate === 0 ? 0 : breakdownItem.band.rate === 0.15 ? 1 : breakdownItem.band.rate === 0.18 ? 2 : breakdownItem.band.rate === 0.21 ? 3 : breakdownItem.band.rate === 0.23 ? 4 : 5;

                  return (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${colors[colorIndex]}`}>
                      <span className="text-xs font-medium">
                        {(breakdownItem.band.rate * 100).toFixed(0)}% on {formatCurrency(breakdownItem.taxableInBand, { compact: true })}
                      </span>
                      <span className="text-xs font-bold number-display">{formatCurrency(breakdownItem.taxAmount)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Net Income */}
            <div className="bg-blue-600 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs">Annual Net Income</p>
                  <p className="text-2xl font-bold number-display">{formatCurrency(result.netIncome)}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-xs">Monthly Take-Home</p>
                  <p className="text-xl font-bold number-display">{formatCurrency(result.netIncome / 12)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tax Bands Reference */}
        <div className="mt-8">
          <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Tax Bands Reference</h3>
          <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100">
            {TAX_BANDS.map((band, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-slate-600">
                  {band.max === Infinity
                    ? `Above ${formatCurrency(band.min, { compact: true })}`
                    : `${formatCurrency(band.min, { compact: true })} - ${formatCurrency(band.max, { compact: true })}`}
                </span>
                <span className={`text-xs font-semibold ${band.rate === 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {band.rate === 0 ? 'Tax Free' : `${(band.rate * 100).toFixed(0)}%`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function Row({
  label,
  value,
  subtitle,
  bold,
  muted
}: {
  label: string;
  value: string;
  subtitle?: string;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <span className={`text-xs ${bold ? 'font-semibold text-slate-800' : muted ? 'text-slate-500' : 'text-slate-700'}`}>
          {label}
        </span>
        {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      <span className={`text-xs number-display ${bold ? 'font-bold text-slate-800' : muted ? 'text-slate-500' : 'font-medium text-slate-700'}`}>
        {value}
      </span>
    </div>
  );
}
